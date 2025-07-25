import { Column, ForeignKey, PrimaryKey, Table, Model, BelongsTo } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { OrderModel } from "./order.model";

@Table({
    tableName: 'order_items',
    timestamps: false
})
export class OrderItemModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column({
        allowNull: false
    })
    @ForeignKey(() => OrderModel)
    declare orderId: string;

    @Column({
        allowNull: false
    })
    @ForeignKey(() => ProductModel)
    declare productId: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @Column({
        allowNull: false
    })
    declare quantity: number;

    @Column({
        allowNull: false
    })
    declare price: number;

}