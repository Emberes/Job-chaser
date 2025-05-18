"use client";

import React, { useEffect, useState } from "react";
import JobList, { Job } from "../../components/joblist";
import { getSavedJobs } from "../../backend/saveJobs";
import { supabase } from "../../backend/supabaseClient";
import { fetchJobById } from "../../api/jobApi";
import { useAuth } from "@/context/AuthContext";


// import { User } from "@supabase/auth-js";


const SavedJobsPage: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
  
    useEffect(() => {
        const fetchUser = async () => {
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            console.error("Error fetching user:", error);
            setError("Failed to fetch user. Please try again.");
            return;
          }
          if (data.user) {
            setUserId(data.user.id);
          } else {
            setError("You need to be logged in to view saved jobs.");
          }
        };
    
        fetchUser();
      }, []);

      
      useEffect(() => {
        const fetchSavedJobs = async () => {
          if (!user?.id) return;
      
          setIsLoading(true);
          setError("");
      
          try {
            let failedCount = 0;

            const savedJobIds = await getSavedJobs(user.id);
            const jobData = await Promise.all(
              savedJobIds.map(async (id) => {
                try {
                  return await fetchJobById(id);
                } catch (error) {
                  console.error(`Error fetching job with ID ${id}:`, error);
                  failedCount++
                  return null;
                }
              })
            );
      
            const filteredJobs = jobData.filter((job): job is Job => job !== null);
            setJobs(filteredJobs);
            if (failedCount > 0) {
              setError(`${failedCount} sparade jobb kunde inte hämtas (de kan ha tagits bort från Jobtech).`);
            }
          } catch (error) {
            console.error("Error fetching saved jobs:", error);
            setError("Misslyckades att hämta sparade jobb. Försök igen.");
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchSavedJobs();
      }, [user]);

      if (!isAuthenticated) {
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold">Du måste vara inloggad för att se dina sparade jobb.</h2>
          </div>
        );
      }

      return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <header className="header flex justify-between items-center p-5 bg-gray-100 dark:bg-gray-800">
            <h1 className="text-2xl font-bold">Saved Jobs</h1>
          </header>
          {isLoading && (
            <div className="loading-container">
              <p>Loading saved jobs...</p>
            </div>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!isLoading && !error && jobs.length === 0 && <p>No saved jobs found.</p>}
          <JobList jobs={jobs} userId={userId || ""} />
        </div>
      );
    };
    
    export default SavedJobsPage;