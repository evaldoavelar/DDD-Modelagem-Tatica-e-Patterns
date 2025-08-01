
import { Order } from "./order";
import { OrderItem } from "./order-item";
import { Product } from "../../Product/Entity/product";

describe('Order', () => {
    it('should create an order', () => {
        const orderId = '1';
        const order = new Order(orderId, '123', [
            new OrderItem('item1', orderId,  '456', 100, 2),
            new OrderItem('item2', orderId,  '789', 50, 1),
            new OrderItem('item3', orderId,  '101', 75, 3)

        ]);
        expect(order).toBeDefined();
    });

    it('should validate order with valid data', () => {
        const order = new Order('1', '123',  [new OrderItem('item1', '1', '456', 100, 2)]);
        expect(() => order.validate()).not.toThrow();
    });

    it('should throw an error if customer ID is empty', () => {
        expect(() => {
            new Order('1', '',   [new OrderItem('item1', '1', '456', 100, 2)]);
        }).toThrow('Customer ID is required');
    });

    it('should throw an error if no order items are provided', () => {
        expect(() => {
            new Order('1', '123',  []);
        }).toThrow('At least one order item is required');
    });

    it('should throw an error if quantity is zero or negative', () => {
        expect(() => {
            new Order('1', '123',  [new OrderItem('item1', '1', '456', 100, 0)]);
        }).toThrow('Quantity must be greater than zero');
    });

    it('should calculate total price', () => {
        const order = new Order('1', '123',  [new OrderItem('item1', '1', '456', 100, 2)]);
        expect(order.total).toBe(200);
    });

    it('should return the correct total', () => {
        const order = new Order('1', '123', [
            new OrderItem('item1', '1', '456', 100, 2),
            new OrderItem('item2', '1', '789', 50, 1)]);
        expect(order.total).toBe(250);
    });
});
