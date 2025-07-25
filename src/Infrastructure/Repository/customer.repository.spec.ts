import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { Address } from "../../Domain/Entity/address";
import { Customer } from "../../Domain/Entity/customer";
import { CustomerRepository } from "./customer.repository";

describe('Customer Repository', () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    beforeEach(async () => {
        await CustomerModel.destroy({ where: {} });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const customer =  new Customer('1', 'Customer 1');
        customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', 'ZipCode 1'));
        customer.addRewardPoints(100);
        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: '1' } });
        expect(customerModel).not.toBeNull();

        expect(customerModel!.toJSON()).toStrictEqual({
            id: '1',
            name: 'Customer 1',
            rewardPoints: 100,
            active: true,
            street: 'Street 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: 'ZipCode 1',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    });

    it('should find a customer by id', async () => {
        const customer = new Customer('2', 'Customer 2');
        customer.changeAddress(new Address('Street 2', 'City 2', 'State 2', 'ZipCode 2'));
        customer.addRewardPoints(200);
        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.findById('2');
        expect(foundCustomer).not.toBeNull();
        expect(foundCustomer!.id).toBe('2');
        expect(foundCustomer!.name).toBe('Customer 2');
        expect(foundCustomer!.rewardPoints).toBe(200);
        expect(foundCustomer!.address!.street).toBe('Street 2');
    });

    it('should find all customers', async () => {
        const customer1 = new Customer('3', 'Customer 3');
        customer1.changeAddress(new Address('Street 3', 'City 3', 'State 3', 'ZipCode 3'));
        customer1.addRewardPoints(300);
        const customer2 = new Customer('4', 'Customer 4');
        customer2.changeAddress(new Address('Street 4', 'City 4', 'State 4', 'ZipCode 4'));
        customer2.addRewardPoints(400);
        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();
        expect(customers).toHaveLength(2);
        expect(customers[0].id).toBe('3');
        expect(customers[1].id).toBe('4');
    });

    it('should update a customer', async () => {
        const customer = new Customer('5', 'Customer 5');
        customer.changeAddress(new Address('Street 5', 'City 5', 'State 5', 'ZipCode 5'));
        customer.addRewardPoints(500);
        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        customer.changeName('Updated Customer 5');
        customer.changeAddress(new Address('Updated Street 5', 'City 5', 'State 5', 'ZipCode 5'));
        await customerRepository.update(customer);

        const updatedCustomer = await customerRepository.findById('5');
        expect(updatedCustomer).not.toBeNull();
        expect(updatedCustomer!.name).toBe('Updated Customer 5');
        expect(updatedCustomer!.address!.street).toBe('Updated Street 5');
    });

    it('should delete a customer', async () => {
        const customer = new Customer('6', 'Customer 6');
        customer.changeAddress(new Address('Street 6', 'City 6', 'State 6', 'ZipCode 6'));
        customer.addRewardPoints(600);
        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        await customerRepository.delete('6');

        const deletedCustomer = await customerRepository.findById('6');
        expect(deletedCustomer).toBeNull();
    });

    it('should return null when customer is not found', async () => {
        const customerRepository = new CustomerRepository();
        const customer = await customerRepository.findById('non-existent-id');
        expect(customer).toBeNull();
    });
});
