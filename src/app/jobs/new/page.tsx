"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import JobForm from "@/components/forms/JobForm";
import type { JobFormValues } from "@/lib/validation";
import { getStoredJobs, saveStoredJobs, type StoredJob } from "@/lib/storage";

export default function NewJobPage() {
  const router = useRouter();

  const onSubmit = (values: JobFormValues) => {
    const existing = getStoredJobs();

    const newJob: StoredJob = {
      id: crypto.randomUUID(),
      title: values.title,
      company: values.company,
      location: values.location,
      applyUrl: values.applyUrl || undefined,
      createdAt: new Date().toISOString(),
    };

    saveStoredJobs([newJob, ...existing]);
    toast.success("Job created!");
    router.push("/jobs");
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Job</h1>
      <JobForm onSubmit={onSubmit} />
    </div>
  );
}
