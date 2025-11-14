export interface TodoType {
  id: number;
  title: string;
  date: string;
  priority: "Extreme" | "Moderate" | "Low";
  description: string;
}

export interface FilterOptions {
  deadlineToday: boolean;
  expires5Days: boolean;
  expires10Days: boolean;
  expires30Days: boolean;
}