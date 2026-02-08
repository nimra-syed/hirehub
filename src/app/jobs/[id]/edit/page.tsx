"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import JobForm from "@/components/forms/JobForm";
import Button from "@/components/ui/Button";

import type { JobFormValues } from "@/lib/validation";
import {
  getStoredJobById,
  updateStoredJob,
  type StoredJob,
} from "@/lib/storage";

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [job, setJob] = useState<StoredJob | null>(null);

  useEffect(() => {
    const found = getStoredJobById(id);
    if (!found) {
      toast.message("That job can’t be edited (only jobs you created).");
      router.push("/jobs");
      return;
    }
    setJob(found);
  }, [id, router]);

  const defaultValues = useMemo(() => {
    if (!job) return undefined;
    return {
      title: job.title,
      company: job.company,
      location: job.location,
      applyUrl: job.applyUrl ?? "",
    };
  }, [job]);

  const onSubmit = (values: JobFormValues) => {
    if (!job) return;

    const updated: StoredJob = {
      ...job,
      title: values.title,
      company: values.company,
      location: values.location,
      applyUrl: values.applyUrl || undefined,
    };

    updateStoredJob(updated);
    toast.success("Job updated!");
    router.push("/jobs");
  };

  if (!job) return null;

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Job</h1>
        <Button variant="secondary" onClick={() => router.push("/jobs")}>
          Cancel
        </Button>
      </div>

      <JobForm defaultValues={defaultValues} onSubmit={onSubmit} />
    </div>
  );
}
