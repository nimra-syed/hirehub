export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
};

export const jobs: Job[] = [
  {
    id: "1",
    title: "Software Engineer Intern",
    company: "Google",
    location: "Mountain View, CA",
  },
  {
    id: "2",
    title: "Frontend Engineer",
    company: "Stripe",
    location: "Remote",
  },
  {
    id: "3",
    title: "Full Stack Engineer",
    company: "Vercel",
    location: "San Francisco, CA",
  },
];
