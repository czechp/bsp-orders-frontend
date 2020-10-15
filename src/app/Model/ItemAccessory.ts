import { Category } from './Category';
import { Item } from './Item';
import { Producer } from './Producer';
import { Provider } from './Provider';

export interface ItemAccessory {
    id: number;
    name: string;
    serialNumber: string;
    description: string;
    url: string;
    producer: Producer;
    provider: Provider;
    itemCategory: Category;
}