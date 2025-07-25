import { Product } from "../Entity/product";

export class ProductService {

  static changeAllProductPrice(products: Product[], percentage: number): Product[] {
    return products.map(product => {
      if (!(product instanceof Product)) {
        throw new Error('Invalid product instance');
      }

      const updatedPrice = product.price + (product.price * (percentage / 100));
      
      product.changePrice(updatedPrice);

      return product;
    });
  }

}