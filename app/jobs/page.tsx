"use client";

import React, { useEffect, useState } from "react";
import JobList, { Job } from "../../components/joblist";
import Loader from "../../components/loader";
import SearchBar from "../../components/searchbar";
import { fetchJobs } from "../../api/jobApi";
import { supabase } from "../../backend/supabaseClient";

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [user, setUser] = useState<unknown>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(savedTheme === "true");
      document.documentElement.setAttribute("data-theme", savedTheme === "true" ? "dark" : "light");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.setAttribute("data-theme", newDarkMode ? "dark" : "light");
    localStorage.setItem("darkMode", String(newDarkMode));
  };

  useEffect(() => {
    const fetchInitialJobs = async () => {
      setIsLoading(true);
      setError("");
      try {
        const jobResults = await fetchJobs("", {});
        console.log("Initial Job Results:", jobResults);
        setJobs(jobResults);
      } catch (error) {
        console.error("Fel vid hämtning av jobb:", error);
        setError("Misslyckades att hämta jobb. Försök igen.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialJobs();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.trim() === "") return;

      setIsLoading(true);
      setError("");
      setSearchPerformed(true);
      try {
        const jobResults = await fetchJobs(searchTerm, {});
        console.log("Job Results:", jobResults);

        if (!jobResults || jobResults.length === 0) {
          setError(`Det finns inga jobb som matchar söktermen "${searchTerm}".`);
          setJobs([]);
        } else {
          setJobs(jobResults);
        }
      } catch (error) {
        console.error("Fel vid hämtning av jobb:", error);
        setError("Misslyckades att hämta jobb. Försök igen.");
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, [searchTerm]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  function handleSearchInput(_query: string): void {
    setSearchTerm(_query);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="flex justify-between items-center p-5 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-2xl font-bold">Job Chaser!</h1>
        <div className="flex items-center gap-4">
          {user ? (
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Logga ut</button>
          ) : (
            <>
            <a href="./signin" className="px-4 py-2 bg-green-500 text-white rounded">Logga in</a>
            <a href="./signup" className="px-4 py-2 bg-green-500 text-white rounded">Registrera dig</a>
          </>

          )}
          <button onClick={toggleDarkMode} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>
      <h3 className="text-center text-lg">Hitta ditt nya drömjobb snabbt och enkelt! 🐱‍💻</h3>
      <SearchBar onSearch={handleSearchInput} />
      {isLoading && (
        <div className="loading-container">
          <p>Söker jobb...</p>
          <Loader />
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {searchPerformed && !isLoading && !error && jobs.length === 0 && <p>Det finns inga jobb som matchar {searchTerm}.</p>}
      <JobList jobs={jobs} userId={""} />
    </div>
  );
};

export default JobsPage;