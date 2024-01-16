import { Client } from './client.model';
import { Produit } from './produit.model';

export interface Favorie {
  id: number;
  produit: Produit;
  client: Client;
  date: Date;
}
