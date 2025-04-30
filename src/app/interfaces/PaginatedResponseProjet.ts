import { Projet } from "./projet";

export interface PaginatedResponseProjet<Projet> {
    content: Projet[];
    currentPage: number;
    totalElements: number;
    totalPages: number;
  }
  