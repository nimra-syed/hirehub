export const APPLICATIONS_KEY = "hirehub:applications";
export const JOBS_KEY = "hirehub_jobs";

export type StoredJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  applyUrl?: string;
  createdAt: string;
};

export function getStoredJobs(): StoredJob[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(JOBS_KEY) || "[]") as StoredJob[];
}

export function saveStoredJobs(jobs: StoredJob[]) {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

export function updateStoredJob(updated: StoredJob) {
  const jobs = getStoredJobs();
  const next = jobs.map((j) => (j.id === updated.id ? updated : j));
  saveStoredJobs(next);
}

export function getStoredJobById(id: string): StoredJob | undefined {
  return getStoredJobs().find((j) => j.id === id);
}
