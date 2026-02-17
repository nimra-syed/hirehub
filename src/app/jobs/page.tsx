"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import JobCard from "@/components/JobCard";
import Button from "@/components/ui/Button";

type Job = {
  id: string;
  title: string; // what JobCard expects
  company: string;
  location: string;
  applyUrl?: string;
};

type ApiJob = {
  id: string;
  company?: string;
  role?: string;
  status?: string;
  location?: string;
  applyUrl?: string;
  url?: string;
};

type LoadState = "loading" | "success" | "empty" | "error";

export default function JobsPage() {
  const [state, setState] = useState<LoadState>("loading");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  async function loadJobs() {
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/jobs", { cache: "no-store" });
      const json = (await res.json()) as {
        data?: ApiJob[];
        error?: string;
      };

      if (!res.ok) {
        throw new Error(json?.error || "Failed to load jobs");
      }

      const raw: ApiJob[] = json?.data ?? [];

      const mapped: Job[] = raw.map((j) => ({
        id: j.id,
        title: j.role ?? "Untitled role",
        company: j.company ?? "Unknown company",
        location: j.location ?? "",
        applyUrl: j.applyUrl ?? j.url ?? undefined,
      }));

      setJobs(mapped);
      setState(mapped.length ? "success" : "empty");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setErrorMsg(message);
      setState("error");
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>

        <Link href="/jobs/new">
          <Button>New Job</Button>
        </Link>
      </div>

      {state === "loading" && (
        <p className="text-sm text-gray-500">Loading jobs…</p>
      )}

      {state === "error" && (
        <div className="space-y-3">
          <p className="text-sm text-red-600">Couldn’t load jobs: {errorMsg}</p>
          <Button onClick={loadJobs}>Retry</Button>
        </div>
      )}

      {state === "empty" && (
        <div className="space-y-2">
          <p className="text-gray-900 font-medium">No jobs yet</p>
          <p className="text-sm text-gray-500">
            Create your first job to start tracking.
          </p>
        </div>
      )}

      {state === "success" && (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
