import { ReactNode } from "react";

// src/types.ts
export type Candidate = {
  profile_picture: string;
  address: ReactNode;
  phone: ReactNode;
  email: ReactNode;
  links: any;
  skills: any;
  profile_summary: ReactNode;
  resume_url: ReactNode;
  image_url: string | undefined;
  full_name: any;
  job_roles: any;
  summary_pitch: string;
  id: number;
  name: string;
  role: string;
  imageUrl: string;
};
