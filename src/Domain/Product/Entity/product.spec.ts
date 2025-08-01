import { Product } from "./product";

describe('Product', () => {
    it('should create a product', () => {
        const product = new Product('1', 'Product 1', 100);
        expect(product).toBeDefined();
    });

    it('should throw an error if name is empty', () => {
        expect(() => {
            new Product('1', '', 100);
        }).toThrow('Product name is required');
    });

    it('should throw an error if price is zero or negative', () => {
        expect(() => {
            new Product('1', 'Product 1', 0);
        }).toThrow('Product price must be greater than zero');
    });

    it('should change the product name', () => {
        const product = new Product('1', 'Product 1', 100);
        product.changeName('Product 2');
        expect(product.name).toBe('Product 2');
    });

    it('should change the product price', () => {
        const product = new Product('1', 'Product 1', 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });
});
