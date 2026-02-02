"use client";

import { APPLICATIONS_KEY } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
};

export default function ApplyNowButton({ job }: { job: Job }) {
  const router = useRouter();

  const onApply = () => {
    const existing = JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || "[]");

    const alreadySaved = existing.some((a: any) => a.id === job.id);
    if (alreadySaved) {
      toast.message("You already applied to this one.");
      router.push("/applications");
      return;
    }

    const newApp = {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      status: "Interested",
      dateSaved: new Date().toISOString(),
    };

    localStorage.setItem(
      APPLICATIONS_KEY,
      JSON.stringify([...existing, newApp])
    );
    toast.success("Application saved!");
    router.push("/applications");
  };

  return (
    <button
      onClick={onApply}
      className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
    >
      Apply Now
    </button>
  );
}
