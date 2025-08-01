import { Product } from "../Entity/product";
import { ProductService } from "./product.service";

describe('Product service', () => {

  it('should change all product price', () => {
    
    const products = [
      new Product('1', 'Product 1', 100),
      new Product('2', 'Product 2', 200),
      new Product('3', 'Product 3', 300)
    ];

    const updatedProducts = ProductService.changeAllProductPrice(products, 10);

    expect(updatedProducts).toEqual([
      new Product('1', 'Product 1', 110),
      new Product('2', 'Product 2', 220),
      new Product('3', 'Product 3', 330)
    ]);
  });

});