import { Address } from "../../Domain/Customer/Entity/address";
import { Customer } from "../../Domain/Customer/Entity/customer";
import { ICustomerRepository } from "../../Domain/Customer/Repository/customer-repository.interface";
import { CustomerModel } from "../db/sequelize/model/customer.model";

export class CustomerRepository implements ICustomerRepository {

    async create(customer: Customer): Promise<void> {
        await CustomerModel.create({
            id: customer.id,
            name: customer.name,
            rewardPoints: customer.rewardPoints,
            active: customer.isActive,
            street: customer.address!.street,
            city: customer.address!.city,
            state: customer.address!.state,
            zipCode: customer.address!.zipCode
        });
    }

    async findById(id: string): Promise<Customer | null> {
        const customerModel = await CustomerModel.findByPk(id);
        if (!customerModel) {
            return null;
        }

        const customer = new Customer(
            customerModel.id,
            customerModel.name);

        customer.changeAddress(new Address(
            customerModel.street,
            customerModel.city,
            customerModel.state,
            customerModel.zipCode
        ));

        customer.addRewardPoints(customerModel.rewardPoints);
        if (!customerModel.active) {
            customer.deactivate();
        }

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map(model => {
            const customer = new Customer(model.id, model.name);
            customer.changeAddress(new Address(
                model.street,
                model.city,
                model.state,
                model.zipCode
            ));

            customer.addRewardPoints(model.rewardPoints);
            if (!model.active) {
                customer.deactivate();
            }

            return customer;
        });
    }

    async update(customer: Customer): Promise<void> {
        const customerModel = await CustomerModel.findByPk(customer.id);
        if (customerModel) {
            customerModel.name = customer.name;
            customerModel.rewardPoints = customer.rewardPoints;
            customerModel.active = customer.isActive;
            customerModel.street = customer.address!.street;
            customerModel.city = customer.address!.city;
            customerModel.state = customer.address!.state;
            customerModel.zipCode = customer.address!.zipCode;
            await customerModel.save();
        }
    }

    async delete(id: string): Promise<void> {
        const customerModel = await CustomerModel.findByPk(id);
        if (customerModel) {
            await customerModel.destroy();
        }
    }

}
