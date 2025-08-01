import { Address } from "./address";
import { Customer } from "./customer";

describe('Customer', () => {
    it('should create a customer', () => {
        const customer = new Customer('123', 'John Doe');
        customer.changeAddress(new Address('123 Main St', 'Anytown', 'CA', '12345'));
        expect(customer).toBeDefined();
    });

    it('should activate a customer', () => {
        const customer = new Customer('123', 'John Doe');
        customer.changeAddress(new Address('123 Main St', 'Anytown', 'CA', '12345'));
        customer.activate();
        expect(customer.isActive).toBe(true);
    });

    it('should deactivate a customer', () => {
        const customer = new Customer('123', 'John Doe');
        customer.changeAddress(new Address('123 Main St', 'Anytown', 'CA', '12345'));
        customer.deactivate();
        expect(customer.isActive).toBe(false);
    });

    it('should change the name of a customer', () => {
        const customer = new Customer('123', 'John Doe');
        customer.changeAddress(new Address('123 Main St', 'Anytown', 'CA', '12345'));
        customer.changeName('Jane Doe');
        expect(customer.name).toBe('Jane Doe');
    });

    it('should throw an error if name is empty', () => {
        expect(() => {
            const customer = new Customer('123', '');
        }).toThrow('Name is required');
    });


    it('should add reward points', () => {
        const customer = new Customer('123', 'John Doe');
        customer.changeAddress(new Address('123 Main St', 'Anytown', 'CA', '12345'));
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(5);
        expect(customer.rewardPoints).toBe(15);
    });

});
