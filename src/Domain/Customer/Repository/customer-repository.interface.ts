import { IRepositoryInterface } from "../../@shared/Repository/repository-interface";
import { Customer } from "../Entity/customer";

export interface ICustomerRepository extends IRepositoryInterface<Customer> {}
