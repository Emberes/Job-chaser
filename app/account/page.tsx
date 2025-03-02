"use client";

import React, { useEffect, useState } from "react";
import JobList, { Job } from "../../components/joblist";
import { getSavedJobs } from "../../backend/saveJobs";
import { supabase } from "../../backend/supabaseClient";
// import { User } from "@supabase/auth-js";


const SavedJobsPage: React.FC = () => {
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
          if (!userId) return;
    
          setIsLoading(true);
          setError("");
          try {
            const savedJobs = await getSavedJobs(userId);
            setJobs(savedJobs);
          } catch (error) {
            console.error("Error fetching saved jobs:", error);
            setError("Failed to fetch saved jobs. Please try again.");
          } finally {
            setIsLoading(false);
          }
        };
        fetchSavedJobs();
      }, [userId]);


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