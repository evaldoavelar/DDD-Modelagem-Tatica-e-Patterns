
import { Model } from 'sequelize-typescript';
import { Column, PrimaryKey, Table } from 'sequelize-typescript';

@Table(
    {
        tableName: 'customers',
        timestamps: true
    }
)
export class CustomerModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column({
        allowNull: false
    })
    declare name: string;

    @Column({
        allowNull: false
    })
    declare rewardPoints: number;

    @Column({
        allowNull: false
    })
    declare active: boolean;

    @Column
    declare street: string;

    @Column
    declare city: string;

    @Column
    declare state: string;

    @Column
    declare zipCode: string;
}
