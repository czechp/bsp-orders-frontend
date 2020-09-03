import {Item} from './Item';
import {AppUser} from './AppUser';

export interface ItemBorrowed extends Item {
  appUser: AppUser;
  amount: number;
  creationDate: Date;
  receiver: string;
}
