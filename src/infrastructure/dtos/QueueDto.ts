import { ItemsDto } from "./ItemsDto";

export interface QueueDto{

    _class:string;
    discoverableItems: string[];
    items: ItemsDto[];

}
