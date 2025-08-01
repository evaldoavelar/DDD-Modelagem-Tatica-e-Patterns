import { Customer } from "../../Customer/Entity/customer";
import { OrderItem } from "../Entity/order-item";
import { v4 as uuid, v4 } from 'uuid';
import { Order } from "../Entity/order";

export class OrderService {

  static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {

    let orderid = uuid(); // Assuming you have a way to generate unique IDs
    let order = new Order(orderid, customer.id, orderItems);

    let rewardPoints = order.total * 0.1;
    
    customer.addRewardPoints(rewardPoints);

    return order;
  }

  static getTotalOrders(orders: Order[]): number {
    if (!Array.isArray(orders) || orders.length === 0) {
      throw new Error('No orders provided');
    }

    return orders.reduce((total, order) => {
      if (!(order instanceof Order)) {
        throw new Error('Invalid order instance');
      }
      return total + order.total;
    }, 0);
  }

}