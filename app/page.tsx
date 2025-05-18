"use client";

import React, { useEffect, useState } from "react";
import JobList from "../components/joblist";
import Loader from "../components/loader";
import SearchBar from "../components/searchbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchJobsThunk, setSearchTerm } from "../redux/features/job/jobSlice";
import { toggleTheme, setTheme } from "@/redux/features/theme/themeSlice";
import { supabase } from "../backend/supabaseClient";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
    const { jobs, isLoading, error, searchTerm, searchPerformed } = useAppSelector((state) => state.jobs);
    const [user, setUser] = useState<unknown>(null);
    const [darkMode] = useState<boolean>(false);
  
    useEffect(() => {
      const savedTheme = localStorage.getItem("darkMode");
      if (savedTheme !== null) {
        dispatch(setTheme(savedTheme === "true"));
        document.documentElement.setAttribute("data-theme", savedTheme === "true" ? "dark" : "light");
      }
    }, [dispatch]);
  
    const handleToggleDarkMode = () => {
      dispatch(toggleTheme());
    };
  
    useEffect(() => {
      dispatch(fetchJobsThunk({ searchTerm: "" }));
    }, [dispatch]);
  
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
  
    const handleSearchInput = (query: string) => {
      dispatch(setSearchTerm(query));
      dispatch(fetchJobsThunk({ searchTerm: query }));
    };
  
    return (
      <div className="min-h-screen custom-background text-custom-text">
      <header className="flex flex-col lg:flex-row justify-between items-center p-5 custom-header text-center lg:text-left">
        <h1 className="text-2xl font-bold">Job Chaser!</h1>
        <h3 className="text-center text-lg">Hitta ditt nya drömjobb snabbt och enkelt! 🐱‍💻</h3>
        <div className="flex items-center gap-4">
          {user ? (
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Logga ut</button>
          ) : (
            <div className="flex gap-2">
              <a href="/signin" className="px-4 py-2 bg-green-500 text-white rounded">Logga in</a>
              <a href="/signup" className="px-4 py-2 bg-green-500 text-white rounded">Registrera dig</a>
            </div>
          )}
          <button onClick={handleToggleDarkMode} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
            {darkMode ? "☀️" : "🌙"}
          </button>
          
        </div>
      </header>
      <SearchBar onSearch={handleSearchInput} />
      {isLoading && (
        <div className="loading-container">
          <p>Söker jobb...</p>
          <Loader />
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {searchPerformed && !isLoading && !error && jobs.length === 0 && <p>Det finns inga jobb som matchar {searchTerm}.</p>}
      <div className="card-container">
      <JobList jobs={jobs} userId={""} />
      </div>
    </div>
  );
  };

export default HomePage;