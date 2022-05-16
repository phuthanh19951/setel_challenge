import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderStatus } from '../enum/order.enum';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({   
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.CREATED
    })
    status: string;

    @Column()
    customerId?: number;

    @Column()
    totalQuantity: number;

    @Column()
    totalAmount: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}
