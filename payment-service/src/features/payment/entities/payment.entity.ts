import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PaymentStatus } from '../enum/payment.enum';

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({   
        type: "enum",
        enum: PaymentStatus
    })
    status: string;

    @Column()
    orderId?: number;

    @Column()
    totalAmount?: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}
