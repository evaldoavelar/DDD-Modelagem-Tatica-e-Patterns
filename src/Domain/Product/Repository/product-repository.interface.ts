import { IRepositoryInterface } from "../../@shared/Repository/repository-interface";
import { Product } from "../Entity/product";

export interface IProductRepository extends IRepositoryInterface<Product> {
  findByName(name: string): Promise<Product | null>;
}
