import { Favorie } from "./favorie.model";

export interface Client {
  id: number;
  adresse: string;
  nom: string;
  prenom: string;
  numero: string;
  favories?: Favorie[];
}
