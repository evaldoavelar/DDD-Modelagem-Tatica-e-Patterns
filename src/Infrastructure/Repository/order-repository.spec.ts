import { Sequelize } from "sequelize-typescript";
import { OrderModel } from '../db/sequelize/model/order.model';
import { OrderItem } from "../../Domain/Entity/order-item";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { ProductModel } from "../db/sequelize/model/product.model";
import { Customer } from "../../Domain/Entity/customer";
import { Address } from "../../Domain/Entity/address";
import { CustomerRepository } from './customer.repository';
import { ProductRepository } from './product.repository';
import { Product } from "../../Domain/Entity/product";
import { OrderRepository } from "./order-repository";
import { Order } from "../../Domain/Entity/order";
import { v4 as uuid, v4 } from 'uuid';

describe("Order Repository", () => {

    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        });
        sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
        await sequelize.sync();
    });

    beforeEach(async () => {
        await OrderItemModel.destroy({ where: {} });
        await OrderModel.destroy({ where: {} });
        await ProductModel.destroy({ where: {} });
        await CustomerModel.destroy({ where: {} });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create an order with items', async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        const customer = new Customer(uuid(), 'Customer 1');
        const address = new Address('Street 1', 'City 1', 'State 1', 'ZipCode 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const product = new Product(uuid(), 'Product 1', 100);
        await productRepository.create(product);

        const orderId = uuid();

        const orderItems = [
            new OrderItem(uuid(), orderId, product.id, product.price, 1),
            new OrderItem(uuid(), orderId, product.id, product.price, 1)
        ];

        const order = new Order(orderId, customer.id, orderItems);

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: orderId },
            include: [OrderItemModel]
        });

        expect(orderModel).not.toBeNull();

        expect(orderModel?.toJSON()).toEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total,
            items: [
                {
                    id: orderItems[0].id,
                    orderId: orderItems[0].orderId,
                    productId: orderItems[0].productId,
                    quantity: orderItems[0].quantity,
                    price: orderItems[0].price
                },
                {
                    id: orderItems[1].id,
                    orderId: orderItems[1].orderId,
                    productId: orderItems[1].productId,
                    quantity: orderItems[1].quantity,
                    price: orderItems[1].price
                }
            ]
        });
    });


    it('should find an order by id', async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        const customer = new Customer(uuid(), 'Customer 1');
        const address = new Address('Street 1', 'City 1', 'State 1', 'ZipCode 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const product = new Product(uuid(), 'Product 2', 100);
        await productRepository.create(product);

        const orderId = uuid();

        const orderItems = [
            new OrderItem(uuid(), orderId, product.id, product.price, 1),
            new OrderItem(uuid(), orderId, product.id, product.price, 1)
        ];

        const order = new Order(orderId, customer.id, orderItems);

        await orderRepository.create(order);

        const foundOrder = await orderRepository.findById(orderId);

        expect(foundOrder).not.toBeNull();

        const orderModel = await OrderModel.findOne({
            where: { id: orderId },
            include: [OrderItemModel]
        });

        expect(orderModel).not.toBeNull();
        expect(orderModel?.toJSON()).toEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total,
            items: [
                {
                    id: orderItems[0].id,
                    orderId: orderItems[0].orderId,
                    productId: orderItems[0].productId,
                    quantity: orderItems[0].quantity,
                    price: orderItems[0].price
                },
                {
                    id: orderItems[1].id,
                    orderId: orderItems[1].orderId,
                    productId: orderItems[1].productId,
                    quantity: orderItems[1].quantity,
                    price: orderItems[1].price
                }
            ]
        });
    });

    it('should find all orders', async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        const customer1 = new Customer(uuid(), 'Customer 1');
        const address1 = new Address('Street 1', 'City 1', 'State 1', 'ZipCode 1');
        customer1.changeAddress(address1);
        await customerRepository.create(customer1);

        const product1 = new Product(uuid(), 'Product 1', 100);
        await productRepository.create(product1);

        const orderId1 = uuid();

        const orderItems1 = [
            new OrderItem(uuid(), orderId1, product1.id, product1.price, 2)
        ];

        const order1 = new Order(orderId1, customer1.id, orderItems1);

        await orderRepository.create(order1);

        const customer2 = new Customer(uuid(), 'Customer 2');
        const address2 = new Address('Street 2', 'City 2', 'State 2', 'ZipCode 2');
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const product2 = new Product(uuid(), 'Product 2', 200);
        await productRepository.create(product2);

        const orderId2 = uuid();

        const orderItems2 = [
            new OrderItem(uuid(), orderId2, product2.id, product2.price, 3)
        ];

        const order2 = new Order(orderId2, customer2.id, orderItems2);

        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2);
    });

    it('should update an order', async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        const customer = new Customer(uuid(), 'Customer 1');
        const address = new Address('Street 1', 'City 1', 'State 1', 'ZipCode 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const product = new Product(uuid(), 'Product 1', 100);
        await productRepository.create(product);

        const orderId = uuid();

        const orderItems = [
            new OrderItem(uuid(), orderId, product.id, product.price, 1)
        ];

        const order = new Order(orderId, customer.id, orderItems);

        await orderRepository.create(order);

        orderItems.push(new OrderItem(uuid(), orderId, product.id, product.price, 2));

        const updatedOrder = new Order(orderId, customer.id, orderItems);

        await orderRepository.update(updatedOrder);

        const foundOrder = await OrderModel.findOne({
            where: { id: orderId },
            include: [OrderItemModel]
        });

        expect(foundOrder).not.toBeNull();

        expect(foundOrder?.toJSON()).toEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total,
            items: [
                {
                    id: orderItems[0].id,
                    orderId: orderItems[0].orderId,
                    productId: orderItems[0].productId,
                    quantity: orderItems[0].quantity,
                    price: orderItems[0].price
                },
                {
                    id: orderItems[1].id,
                    orderId: orderItems[1].orderId,
                    productId: orderItems[1].productId,
                    quantity: orderItems[1].quantity,
                    price: orderItems[1].price
                }
            ]
        });
    });

});
