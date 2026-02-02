"use client";

import { APPLICATIONS_KEY } from "@/lib/storage";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ApplicationStatus =
  | "Interested"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

type Application = {
  id: string;
  title: string;
  company: string;
  location: string;
  status: ApplicationStatus;
  dateSaved: string; // ISO string
  note?: string;
};

const STORAGE_KEY = APPLICATIONS_KEY;

function statusColor(status: ApplicationStatus) {
  switch (status) {
    case "Interested":
      return "bg-blue-100 text-blue-700";
    case "Applied":
      return "bg-yellow-100 text-yellow-700";
    case "Interview":
      return "bg-purple-100 text-purple-700";
    case "Offer":
      return "bg-green-100 text-green-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function loadApps(): Application[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Application[]) : [];
  } catch {
    return [];
  }
}

function saveApps(apps: Application[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [filter, setFilter] = useState<ApplicationStatus | "All">("All");

  useEffect(() => {
    const sync = () => setApps(loadApps());

    sync(); // initial load

    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    window.addEventListener("hirehub:appsUpdated", sync as EventListener);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
      window.removeEventListener("hirehub:appsUpdated", sync as EventListener);
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return apps;
    return apps.filter((a) => a.status === filter);
  }, [apps, filter]);

  function updateApp(id: string, patch: Partial<Application>) {
    setApps((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, ...patch } : a));
      saveApps(next);
      return next;
    });
  }

  function removeApp(id: string) {
    setApps((prev) => {
      const next = prev.filter((a) => a.id !== id);
      saveApps(next);
      return next;
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
        <Link className="text-sm text-gray-700 hover:underline" href="/jobs">
          Browse jobs →
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-700">Filter:</span>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as ApplicationStatus | "All")
          }
          className="border rounded-md px-3 py-2 text-sm bg-white"
        >
          <option value="All">All</option>
          <option value="Interested">Interested</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border rounded-lg p-6 text-gray-700">
          No saved applications yet. Go to{" "}
          <Link className="underline" href="/jobs">
            Jobs
          </Link>{" "}
          and click “Apply Now”.
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((a) => (
            <div key={a.id} className="bg-white border rounded-lg p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold text-gray-900">
                    {a.title}
                  </div>
                  <div className="text-gray-700">{a.company}</div>
                  <div className="text-gray-500 text-sm">{a.location}</div>
                  <div className="text-gray-500 text-sm mt-1">
                    Saved: {new Date(a.dateSaved).toLocaleDateString()}
                  </div>
                </div>

                <button
                  onClick={() => removeApp(a.id)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Remove
                </button>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">Status</span>

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(
                      a.status
                    )}`}
                  >
                    {a.status}
                  </span>

                  <select
                    value={a.status}
                    onChange={(e) =>
                      updateApp(a.id, {
                        status: e.target.value as ApplicationStatus,
                      })
                    }
                    className="border rounded-md px-3 py-2 text-sm bg-white"
                  >
                    <option value="Interested">Interested</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <div className="text-sm text-gray-700 mb-1">Notes</div>
                  <textarea
                    value={a.note ?? ""}
                    onChange={(e) => updateApp(a.id, { note: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    rows={3}
                    placeholder="Add interview date, recruiter name, link, anything…"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
