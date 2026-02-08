"use client";

import { APPLICATIONS_KEY } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/ui/Button";

type AppStatus = "Interested" | "Applied" | "Interview" | "Offer" | "Rejected";

type App = {
  id: string;
  title: string;
  company: string;
  location: string;
  status: AppStatus;
  dateSaved: string;
};

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
};

export default function ApplyNowButton({ job }: { job: Job }) {
  const router = useRouter();

  const onApply = () => {
    const existing = JSON.parse(
      localStorage.getItem(APPLICATIONS_KEY) || "[]"
    ) as App[];

    const alreadySaved = existing.some((a) => a.id === job.id);
    if (alreadySaved) {
      toast.message("You already applied to this one.");
      router.push("/applications");
      return;
    }

    const newApp: App = {
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
    <Button onClick={onApply} className="mt-6" size="lg">
      Apply Now
    </Button>
  );
}
