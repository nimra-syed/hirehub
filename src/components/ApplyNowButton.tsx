"use client";

import { APPLICATIONS_KEY } from "@/lib/storage";

type App = {
  id: string;
  title: string;
  company: string;
  location: string;
  status: "Interested" | "Applied" | "Interview" | "Offer" | "Rejected";
  dateSaved: string;
};

export default function ApplyNowButton({
  job,
}: {
  job: { id: string; title: string; company: string; location: string };
}) {
  const onApply = () => {
    const existing = JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || "[]") as App[];

    if (existing.some((a) => a.id === job.id)) {
      alert("Already saved!");
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

    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify([...existing, newApp]));
    alert("Application saved!");
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
