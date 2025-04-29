export interface PaginatedResponse<Equipement> {
    content: Equipement[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  }
  