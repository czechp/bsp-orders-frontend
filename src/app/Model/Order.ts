import { AppUser } from './AppUser';
import { ItemInOrder } from './ItemInOrder';

export interface Order {
    id: number;
    user: AppUser;
    name: string;
    itemsInOrder: ItemInOrder[];
    creationDate: Date;
    closedDate: Date;
    orderStatus: string;
}