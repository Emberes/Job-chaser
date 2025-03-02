import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faSave } from "@fortawesome/free-solid-svg-icons";
import { saveJob } from "../backend/saveJobs";


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

const JobList: React.FC<JobListProps> = ({ jobs = [], userId}) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

  const handleSaveJob = async (jobId: string) => {
    console.log("job ID:", jobId, "user ID:", userId);
    if (!jobId) {
      console.error("Error: userId or jobId is missing!");
      return;
    }
    try {
      await saveJob(userId, jobId);
      alert("Job saved successfully!");
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Failed to save job.");
    }
  };

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id} className="job-card" onClick={() => handleJobClick(job)}>
          <div className="job-card-content">
            <h2>{job.headline}</h2>
            {job.description.requirements && <p>Requirements: {job.description.requirements}</p>}
            {job.workplace_address.city && <p>City: {job.workplace_address.city}</p>}
            {job.workplace_address.region && <p>Region: {job.workplace_address.region}</p>}          </div>
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
              <h4>Description</h4>
              <p>{selectedJob.description.text}</p>
            </div>
            {selectedJob.description.needs && (
              <div className="job-section">
                <h4>Needs</h4>
                <p>{selectedJob.description.needs}</p>
              </div>
            )}
            {selectedJob.description.requirements && (
              <div className="job-section">
                <h4>Requirements</h4>
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
              <h4>Location</h4>
              {selectedJob.workplace_address.city && <p>City: {selectedJob.workplace_address.city}</p>}
              {selectedJob.workplace_address.region && <p>Region: {selectedJob.workplace_address.region}</p>}
            </div>
            <div className="job-section">
              <h4>Employer</h4>
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