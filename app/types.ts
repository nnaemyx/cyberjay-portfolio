export interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category: "Web2" | "Mobile" | "Other";
  featured: boolean;
  order: number;
}

export interface WorkExperience {
  _id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  order: number;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
}
