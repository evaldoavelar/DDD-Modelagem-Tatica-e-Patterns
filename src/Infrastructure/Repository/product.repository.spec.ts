import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../db/sequelize/model/product.model";
import { Product } from "../../Domain/Product/Entity/product";
import { ProductRepository } from "./product.repository";

describe('Product Repository', () => {
  
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        
        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 100);

        await productRepository.create(product);

        let productModel = await ProductModel.findOne({ where: { id: '1' } });
        expect(productModel).not.toBeNull();

        expect(productModel!.toJSON()).toStrictEqual({
            id: '1',
            name: 'Product 1',
            price: 100
        });
    });


    it('should find a product by id', async () => {
        
        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 100);

        await productRepository.create(product);

        const foundProduct = await productRepository.findById('1');
        expect(foundProduct).not.toBeNull();

        expect(foundProduct).toEqual(
            new Product('1', 'Product 1', 100)
        );
    });


    it('should return null if product not found by id', async () => {
        
        const productRepository = new ProductRepository();
        const foundProduct = await productRepository.findById('non-existing-id');
        expect(foundProduct).toBeNull();
    });

    it('should find a product by name', async () => {

        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 100);

        await productRepository.create(product);

        const foundProduct = await productRepository.findByName('Product 1');
        expect(foundProduct).toEqual(product);
    });

    it('should return null if product not found by name', async () => {

        const productRepository = new ProductRepository();
        const foundProduct = await productRepository.findByName('non-existing-name');
        expect(foundProduct).toBeNull();
    });

    it('should update a product', async () => {
        
        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 100);

        await productRepository.create(product);

        product.changeName('Updated Product');
        product.changePrice(150);

        await productRepository.update(product);

        const updatedProduct = await productRepository.findById('1');
        expect(updatedProduct).toEqual(product);
    });

    it('should find all products', async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product('1', 'Product 1', 100);
        const product2 = new Product('2', 'Product 2', 200);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const products = await productRepository.findAll();
        expect(products).toHaveLength(2);
        expect(products).toContainEqual(product1);
        expect(products).toContainEqual(product2);
    });
});
