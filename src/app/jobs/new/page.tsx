"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import JobForm from "@/components/forms/JobForm";
import type { JobFormValues } from "@/lib/validation";

export default function NewJobPage() {
  const router = useRouter();

  const onSubmit = async (values: JobFormValues) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: values.company,
          role: values.title, // JobForm uses "title" but DB uses "role"
          status: "Applied", // default for now (we’ll make it selectable later)
          location: values.location,
          applyUrl: values.applyUrl || "",
        }),
      });

      const json = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(json?.error || "Failed to create job");
      }

      toast.success("Job created!");
      router.push("/jobs");
      router.refresh(); // makes sure /jobs refetches immediately
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Job</h1>
      <JobForm onSubmit={onSubmit} />
    </div>
  );
}
