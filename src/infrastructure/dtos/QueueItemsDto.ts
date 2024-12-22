
import { ActionDto } from "./ActionDto";
import { TaskDto } from "./TaskDto";

export interface QueueItem {
    _class: string;
    actions: ActionDto[];
    blocked: boolean;
    buildable: boolean;
    id: number;
    inQueueSince: number;
    params: string;
    stuck: boolean;
    task: TaskDto;
    url: string;
    why: string;
    buildableStartMilliseconds: number;
}
