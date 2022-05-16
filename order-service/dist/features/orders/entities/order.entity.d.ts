import { BaseEntity } from 'typeorm';
export declare class Order extends BaseEntity {
    id: number;
    status: string;
    customerId?: number;
    totalQuantity: number;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}
