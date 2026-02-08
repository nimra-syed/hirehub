"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import JobCard from "@/components/JobCard";
import Button from "@/components/ui/Button";

import { jobs as seedJobs } from "@/lib/jobs";
import { getStoredJobs, type StoredJob } from "@/lib/storage";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  applyUrl?: string;
};

export default function JobsPage() {
  const [storedJobs, setStoredJobs] = useState<StoredJob[]>([]);

  useEffect(() => {
    setStoredJobs(getStoredJobs());
  }, []);

  // convert stored jobs to the same shape JobCard expects
  const createdJobs: Job[] = storedJobs.map((j) => ({
    id: j.id,
    title: j.title,
    company: j.company,
    location: j.location,
    applyUrl: j.applyUrl,
  }));

  const allJobs: Job[] = [...createdJobs, ...seedJobs];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>

        <Link href="/jobs/new">
          <Button>New Job</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {allJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
