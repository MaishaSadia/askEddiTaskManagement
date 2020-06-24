import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";
export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    transform(value: any) {
        value = value.toUpperCase();

        //if not valid which means isStatusValid is false for value
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        
        return value;
    }

    private isStatusValid(status:any){
        const idx = this.allowedStatuses.indexOf(status); //indexOf will allow to retun -1 if the status doesnot exist within this array
        return idx !== -1;
    }
    
}