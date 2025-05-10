import { Equipement } from "./equipement";
import { Projet } from "./projet";

export interface Plan {
    id: number;
    projet: Projet;
    equipement: Equipement;
    orderNumber: number;
    orderPrice: number;
    pamNumber: string;
    quantite: number;
    targetDate: Date;
    deliveryDate: Date;
    rprdate: Date;
    statut : string;
  }