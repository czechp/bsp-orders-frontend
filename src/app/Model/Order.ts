import {AppUser} from './AppUser';
import {ItemInOrder} from './ItemInOrder';

export interface Order {
  id?: number;
  appUser?: AppUser;
  name?: string;
  itemsInOrder?: ItemInOrder[];
  creationDate?: Date;
  closedDate?: Date;
  orderStatus?: string;
  commentary?: string;
  orderNr?: string;
}
