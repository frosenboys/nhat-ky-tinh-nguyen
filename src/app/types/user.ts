export interface User {
  studentId: string;
  fullName: string;
  email: string;
  className?: string;
  unionGroup?: string;
  position?: string;
  role: "STUDENT" | "TEACHER";
  points?: number;
  avatarUrl?: string;
}
