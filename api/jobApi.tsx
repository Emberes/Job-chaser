export const fetchJobs = async (query: string, filters: { [key: string]: string; }) => {


  const apiUrl =  `https://jobsearch.api.jobtechdev.se/search`;

      const params = new URLSearchParams();
      if (query) {
        params.append("q", query);
      }
      params.append("limit", "10");
          for (const key in filters) {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      }
    
      try {
        const response = await fetch(`${apiUrl}?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.hits || [];
      } catch (error) {
        console.error(error);
        throw error;
      }
    };


  