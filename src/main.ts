import { Address } from './Domain/Entity/address';
import { Customer } from './Domain/Entity/customer';
import { OrderItem } from './Domain/Entity/order-item';
import { Order } from './Domain/Entity/order';
console.log('Hello, DDD!');

let customer = new Customer(
    '123',
    'John Doe'
);
customer.changeAddress(
    new Address(
        '123 Main St',
        'Anytown',
        'Anystate',
        '12345'
    )
);
customer.activate();
console.log(customer);

const item1 = new OrderItem(
    '1',
    '123',
    '456',
    2,
    50
);

const item2 = new OrderItem(
    '2',
    '123',
    '789',
    1,
    100
);
const orderItems = [item1, item2];

let order = new Order(
    '123',
    customer.id,
    orderItems
);


console.log(order);