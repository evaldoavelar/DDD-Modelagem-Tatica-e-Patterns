import { OrderItem } from '../../Domain/checkout/Entity/order-item';
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";
import { IOrderRepositoryInterface } from '../../Domain/checkout/Repository/order-repository.interface';
import { Order } from '../../Domain/checkout/Entity/order';

export class OrderRepository implements IOrderRepositoryInterface {

    async create(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id,
            customerId: order.customerId,
            total: order.total,
            items: order.ordersItems.map(item => ({
                id: item.id,
                orderId: item.orderId,
                productId: item.productId,
                price: item.price,
                quantity: item.quantity
            }))
        },
            { include: [OrderItemModel] });
    }

    async findById(id: string): Promise<Order | null> {
        const order = await OrderModel.findOne({
            where: { id },
            include: [{ model: OrderItemModel }]
        });
        return order ? new Order(
            order.id,
            order.customerId,
            order.items.map(item => new OrderItem(
                item.id,
                item.orderId,
                item.productId,
                item.price,
                item.quantity
            ))
        ) : null;
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll({
            include: [{ model: OrderItemModel }]
        });
        return orders.map(order => new Order(
            order.id,
            order.customerId,
            order.items.map(item => new OrderItem(
                item.id,
                item.orderId,
                item.productId,
                item.price,
                item.quantity
            ))
        ));
    }

    async update(order: Order): Promise<void> {
        const existingOrder = await OrderModel.findOne({ where: { id: order.id } });
        if (!existingOrder) throw new Error('Order not found');

        existingOrder.customerId = order.customerId;
        existingOrder.total = order.total;

        await existingOrder.save();

        await OrderItemModel.destroy({ where: { orderId: order.id } });
        await OrderItemModel.bulkCreate(order.ordersItems.map(item => ({
            id: item.id,
            orderId: item.orderId,
            productId: item.productId,
            price: item.price,
            quantity: item.quantity
        })));
    }   
}