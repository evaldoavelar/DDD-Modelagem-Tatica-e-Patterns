import { Product } from "../../Domain/Entity/product";
import { IProductRepository } from "../../Domain/Repository/product-repository.interface";
import { ProductModel } from "../db/sequelize/model/product.model";

export class ProductRepository implements IProductRepository{
 
    async create(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price
        });
    }

    async findById(id: string): Promise<Product | null> {
        const productModel = await ProductModel.findOne({ where: { id } });
        return productModel ? new Product(productModel.id, productModel.name, productModel.price) : null;
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        return productModels.map(model => new Product(model.id, model.name, model.price));
    }

    async update(product: Product): Promise<void> {
        await ProductModel.update(
            {
                name: product.name,
                price: product.price
            }, 
            { where: { id: product.id } }
        );
    }

    async delete(id: string): Promise<void> {
        await ProductModel.destroy({ where: { id } });
    }

    async findByName(name: string): Promise<Product | null> {
        const productModel = await ProductModel.findOne({ where: { name } });
        return productModel ? new Product(productModel.id, productModel.name, productModel.price) : null;
    }
}