export interface ParishEvent {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  start_date?: string;
  end_date?: string;
  meeting_location?: string;
  type: "EVENT" | "NEWS" | "PASTORAL" | "REGISTRATION";
  is_active: boolean;
  pastoral_id?: string;
  pastoral?: {
    name: string;
    slug: string;
  };
  author?: {
    full_name: string;
  };
}
