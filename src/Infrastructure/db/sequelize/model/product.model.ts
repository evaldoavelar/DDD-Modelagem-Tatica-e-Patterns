import { Model } from 'sequelize-typescript';
import { Column, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    tableName: 'products',
    timestamps: false
})
export class ProductModel extends Model{

    @PrimaryKey
    @Column({
        allowNull: false,
    })
    declare id: string;

    @Column({
        allowNull: false,
    })
    declare name: string;

    @Column({
        allowNull: false,
    })
    declare price: number;
} 