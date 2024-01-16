import { Produit } from './produit.model';

export interface Vente {
  id: number;
  dateVente: Date;
  quantite: number;
  produit: Produit;
}
  