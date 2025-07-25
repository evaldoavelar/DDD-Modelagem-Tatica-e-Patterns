import { Product } from "../Entity/product";
import { IRepositoryInterface } from "./repository-interface";

export interface IProductRepository extends IRepositoryInterface<Product> {
  findByName(name: string): Promise<Product | null>;
}
