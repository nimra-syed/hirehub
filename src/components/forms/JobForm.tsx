"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FormField from "@/components/ui/FormField";

import { jobFormSchema, type JobFormValues } from "@/lib/validation";

export default function JobForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<JobFormValues>;
  onSubmit: (values: JobFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      applyUrl: "",
      ...defaultValues,
    },
  });

  // ⭐ Unsaved Changes Protection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // don't warn if nothing changed OR form is submitting
      if (!isDirty || isSubmitting) return;

      e.preventDefault();
      e.returnValue = ""; // required for browser warning
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, isSubmitting]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField label="Title" required>
        <Input
          placeholder="Software Engineer"
          error={errors.title?.message}
          {...register("title")}
        />
      </FormField>

      <FormField label="Company" required>
        <Input
          placeholder="Capital One"
          error={errors.company?.message}
          {...register("company")}
        />
      </FormField>

      <FormField label="Location" required>
        <Input
          placeholder="Remote / New York, NY"
          error={errors.location?.message}
          {...register("location")}
        />
      </FormField>

      <FormField label="Apply URL">
        <Input
          placeholder="https://company.com/apply"
          error={errors.applyUrl?.message}
          {...register("applyUrl")}
        />
      </FormField>

      <div className="flex gap-3">
        <Button type="submit" isLoading={isSubmitting}>
          Save Job
        </Button>
      </div>
    </form>
  );
}
