import { Job } from "../components/joblist";

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
        throw error;
      }
    };

    export const fetchJobById = async (id: string): Promise<Job> => {
      const res = await fetch(`https://jobsearch.api.jobtechdev.se/job/${id}`);
    
      if (!res.ok) {
        throw new Error(`Kunde inte hämta jobb med id: ${id}`);
      }
    
      const data = await res.json();
      return data as Job;
    };

  