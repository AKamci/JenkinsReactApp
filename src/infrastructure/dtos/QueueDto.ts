import { QueueItem } from "./QueueItemsDto";

export interface QueueDto {
    _class: string;
    discoverableItems: any[];
    items: QueueItem[];
}