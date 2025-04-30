import { Plan } from "./plan";

export interface PaginatedPlanResponse<Plan> {
    content: Plan[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
  }