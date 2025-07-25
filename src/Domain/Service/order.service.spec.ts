import { Order } from "../Entity/order";
import { OrderItem } from "../Entity/order-item";
import { OrderService } from "./order.service";
import { Customer } from '../Entity/customer';
import { Address } from "../Entity/address";

describe('Order service', () => {

    it('should get total all orders', () => {
        var order1 = new Order(
            '1',
            '123',
            [
                new OrderItem('1', '123', '456', 2, 50),
                new OrderItem('2', '123', '789', 1, 100)
            ]
        );
        var order2 = new Order(
            '2',
            '123',
            [
                new OrderItem('3', '123', '101', 1, 200)
            ]
        );

        const orders = [order1, order2];

        var total = OrderService.getTotalOrders(orders);

        expect(total).toBe(400);
    });

    it(' should place an order', () => {

        let customer = new Customer('123', 'John Doe');
        let address = new Address('123 Main St', 'Anytown', 'Anystate', '12345');
        customer.changeAddress(address);

        let orderItems = [
            new OrderItem('1', '123', '456', 2, 50),
            new OrderItem('2', '123', '789', 1, 100)
        ];

        let order = OrderService.placeOrder(customer, orderItems);

        expect(customer.rewardPoints).toBe(20);
        expect(order.total).toBe(200);
    });
});