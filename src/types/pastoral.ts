import { LucideIcon } from "lucide-react";

export interface Pastoral {
  id: string;
  slug: string;
  name: string;
  tag: string;
  description: string;
  icon?: LucideIcon;
  logoUrl?: string;
  location?: string;
  email?: string;
  instagram?: string;
  image_url?: string;
  meeting_location?: string;
  coordinators?: {
    name: string;
    phone?: string;
  }[];
}
