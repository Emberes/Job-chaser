import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faSave } from "@fortawesome/free-solid-svg-icons";
// import { saveJob } from "../backend/saveJobs";
import { supabase } from "@/backend/supabaseClient";


export interface Job {
  id: string;
  headline: string;
  description: {
    text: string;
    text_formatted: string;
    company_information: {
      name: string;
      organization_number: string;
    } | null;
    needs: string | null;
    requirements: string | null;
    conditions: string | null;
  };
  employer: {
    name: string;
    url: string;
  };
  workplace_address: {
    city: string | null;
    region: string | null;
    country: string | null;
    municipality: string | null;
  };
}

export interface JobListProps {
  jobs: Job[];
  userId: string;
}

const JobList: React.FC<JobListProps> = ({ jobs = []}) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

  const handleSaveJob = async ( jobId: string ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      console.error("Ingen användare inloggad");
      return;
    }
  
    const { data, error } = await supabase
      .from("Saved_jobs")
      .insert([
        {
          user_id: user.id,
          job_id: jobId,
        },
      ]);
  
    if (error) {
      console.error("Fel vid sparning:", error.message);
    } else {
      console.log("Jobb sparat:", data);
    }
  };

  

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id} className="job-card" onClick={() => handleJobClick(job)}>
          <div className="job-card-content">
            <h2>{job.headline}</h2>
            <p className="text-sm text-black-500">Jobb ID: {job.id}</p>
            {job.description.requirements && <p>Krav: {job.description.requirements}</p>}
            {job.workplace_address.city && <p>Stad: {job.workplace_address.city}</p>}
            {job.workplace_address.region && <p>Region: {job.workplace_address.region}</p>} 
            </div>
          <FontAwesomeIcon icon={faExpand} />
          <FontAwesomeIcon icon={faSave} onClick={() => handleSaveJob(job.id)} />
        </div>
      ))}

      {selectedJob && (
        <div className="job-modal">
          <div className="job-modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <h2>{selectedJob.headline}</h2>
            {selectedJob.description.company_information && (
              <h3>{selectedJob.description.company_information.name}</h3>
            )}
            <div className="job-section">
              <h4>Beskrivning</h4>
              <p>{selectedJob.description.text}</p>
            </div>
            {selectedJob.description.needs && (
              <div className="job-section">
                <h4>Kvalifikationer</h4>
                <p>{selectedJob.description.needs}</p>
              </div>
            )}
            {selectedJob.description.requirements && (
              <div className="job-section">
                <h4>Krav</h4>
                <p>{selectedJob.description.requirements}</p>
              </div>
            )}
            {selectedJob.description.conditions && (
              <div className="job-section">
                <h4>Conditions</h4>
                <p>{selectedJob.description.conditions}</p>
              </div>
            )}
             <div className="job-section">
              <h4>Plats</h4>
              {selectedJob.workplace_address.city && <p>Stad: {selectedJob.workplace_address.city}</p>}
              {selectedJob.workplace_address.region && <p>Region: {selectedJob.workplace_address.region}</p>}
            </div>
            <div className="job-section">
              <h4>Arbetsgivare</h4>
              <p>{selectedJob.employer.name}</p>
              <p>Website: <a href={selectedJob.employer.url} target="_blank" rel="noopener noreferrer">{selectedJob.employer.url}</a></p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;