export interface User {
  id: string;
  full_name: string | null;
  email: string;
  role: "USER" | "COORDENADOR" | "PADRE" | "ADMIN";
}
