import Link from "next/link";
import { Job } from "@/lib/jobs";


export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block rounded-xl border bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <div className="text-xl font-semibold text-gray-900">
        {job.title}
      </div>

      <div className="text-gray-700">{job.company}</div>

      <div className="text-gray-500 text-sm">
        {job.location}
      </div>
    </Link>
  );
}
