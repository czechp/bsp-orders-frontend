import { Item } from './Item';

export interface ItemInOrder extends Item{
    orderDate: Date;
    deliverDate: Date;
    isOrdered: boolean;
    isDelivered: boolean;
    amount: number;
}