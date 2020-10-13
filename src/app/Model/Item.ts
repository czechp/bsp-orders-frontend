import {Producer} from './Producer';
import {Category} from './Category';
import {Provider} from './Provider';
import { ItemAccessory } from './ItemAccessory';

export interface Item {
  id?: number;
  name?: string;
  serialNumber?: string;
  description?: string;
  url?: string;
  producer?: Producer;
  provider?: Provider;
  itemCategory?: Category;
  accessories?: ItemAccessory[];
}
