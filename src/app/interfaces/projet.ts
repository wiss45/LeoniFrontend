import { Equipement } from "./equipement";


export interface Projet {
  id: number;
  name: string;
  customer: string;
  deravative: string;
  maxQuantite: number;
  a_samples: string;    
  b_samples: string;
  c_samples: string;
  d_samples: string;
  sop: string;
  sop_1: string;
  responsable: string;
  status: string;
  sommePrevisionnel: number;
  sommeReel: number;
  equipements: Equipement[];
}
