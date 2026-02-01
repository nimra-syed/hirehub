import Link from "next/link";
import { jobs } from "@/lib/jobs";
import JobCard from "@/components/JobCard";


export default function JobsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Jobs</h1>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
