import { Customer } from "../Entity/customer";
import { IRepositoryInterface } from "./repository-interface";

export interface ICustomerRepository extends IRepositoryInterface<Customer> {}
