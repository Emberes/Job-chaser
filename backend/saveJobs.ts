import { supabase } from "./supabaseClient";
// import { auth.signIn } from "@supabase/supabase-js";

export const saveJob = async (userId: string, jobId: string) => {
  if (!userId || !jobId) {
    console.error("Error: userId or jobId is missing!");
    return;
  }

  const { data, error } = await supabase
    .from("Saved_jobs")
    .insert([{ user_id: userId, job_id: jobId }]);

  console.log("Attempting to save job:", { userId, jobId });

  if (error) {
    throw error;
  }

  return data;
};

export const getSavedJobs = async (userId: string) => {
  const { data: savedJobs, error: savedJobsError } = await supabase
    .from("Saved_jobs")
    .select("job_id")
    .eq("user_id", userId);

  if (savedJobsError) {
    throw savedJobsError;
  }

  const jobIds = savedJobs.map((savedJob) => savedJob.job_id);

  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("*")
    .in("id", jobIds);

  if (jobsError) {
    throw jobsError;
  }

  return jobs;
};
