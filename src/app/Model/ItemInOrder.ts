import {Item} from './Item';
import { Order } from './Order';

export interface ItemInOrder extends Item {
  orderDate: Date;
  deliverDate: Date;
  isOrdered: boolean;
  isDelivered: boolean;
  amount: number;
  order: Order;
}
