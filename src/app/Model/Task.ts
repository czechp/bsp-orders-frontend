import {AppUser} from './AppUser';

export interface Task {
  id?: number;
  name?: string;
  creatingDate?: Date;
  appUser?: AppUser;
}
