import { Categorie } from './categorie.model';
import { Vente } from './vente.model';
import { Favorie } from './favorie.model';

// Assuming your Produit type looks something like this
export interface Produit {
  id: number;
  designation: string;
  code: string;
  prix: number;
  quantite: number;
  date_achat: Date;
  categorie_id: Categorie;
  ventes: any[]; // Update this to match your actual type
  favoris: any[]; // Update this to match your actual type

}
