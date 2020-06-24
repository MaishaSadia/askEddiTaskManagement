//import { TaskStatus } from "../task.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTasksFilterDto{
    @IsOptional()//checks if its empty and ignores all the validators on the property
    @IsIn([
        TaskStatus.OPEN, 
        TaskStatus.IN_PROGRESS, 
        TaskStatus.DONE
    ]) //checks if value is in a array of allowed values
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}