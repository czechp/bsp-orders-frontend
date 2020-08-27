import {Producer} from './Producer';
import {Category} from './Category';
import {Provider} from './Provider';

export interface Item {
  id: number;
  name: string;
  serialNumber: string;
  description: string;
  url: string;
  producer: Producer;
  provider: Provider;
  itemCategory: Category;

}
