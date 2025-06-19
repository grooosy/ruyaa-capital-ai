import { LucideIcon } from "lucide-react";

export interface Agent {
  id: string;
  icon: LucideIcon;
  label: string;
  desc: string;
  angle: number;
  color: string;
}
