import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto{
    //retrive the data from the handeller in the controller
    
    //for the validation 
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}