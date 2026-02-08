import Link from "next/link";
import { Job } from "@/lib/jobs";
import Button from "@/components/ui/Button";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-200">
      {/* Clickable content */}
      <Link
        href={`/jobs/${job.id}`}
        className="block hover:-translate-y-1 transition-all"
      >
        <div className="text-xl font-semibold text-gray-900">{job.title}</div>

        <div className="text-gray-700">{job.company}</div>

        <div className="text-gray-500 text-sm">{job.location}</div>
      </Link>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <Link href={`/jobs/${job.id}/edit`}>
          <Button size="sm" variant="secondary">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
