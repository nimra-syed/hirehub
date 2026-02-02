import { jobs } from "@/lib/jobs";
import Link from "next/link";
import ApplyNowButton from "./ApplyNowButton";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return <div className="text-xl text-gray-900">Job not found.</div>;
  }

  return (
    <div>
      <Link
        href="/jobs"
        className="text-gray-800 font-medium hover:text-black mb-4 inline-block"
      >
        ← All Jobs
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
      <p className="text-lg text-gray-700">{job.company}</p>
      <p className="text-gray-500 mb-6">{job.location}</p>

      <div className="bg-white p-6 rounded-lg border">
        <p className="text-gray-500 mb-6">
          This is where the full job description will go.
        </p>
        <ApplyNowButton job={job} />
      </div>
    </div>
  );
}
