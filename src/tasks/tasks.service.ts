//business logic related to task

import { Injectable, NotFoundException } from '@nestjs/common';
//import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User
        ): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto, user);
    }

    //service is going to store the tasks in ther memory for now
    // private tasks: Task[] = [];//the array is going to be the property of the class, private so that any other components from outside cannot manupulate the array, only services should have the previlage to do any manupulation to the task

    // // in order to allow the controller to have access to the tasks a method is created, and within this method this tasks array is returned,this sort of of proxies to the array of tasks
    // getAllTasks(): Task[]{
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
    //     const{ status, search } = filterDto;
    //     //storing all tasks in this tasks local variable and by filtering if necessary and then returning the result
    //     //reference to the task array
    //     let tasks = this.getAllTasks();

    //     //if the task status is == to the task that is provided here
    //     if(status){
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     //for each task, if task title or description includes search, indcludes is a helper emthod for strings which can be provoded with a substring which is serch in this case adn is that string includes that substring in any form then itwill retrun true 
    //     if(search){
    //         tasks = tasks.filter(task => 
    //             task.title.includes(search)||
    //             task.description.includes(search),
    //         );
    //     }
        

    //     return tasks;
    // }
    
    //because it a  asynchronus method so we don't know when will it end therefore we need 
    async getTaskById(id: number,
        user: User,
        ): Promise<Task>{
        //await stops the executio and waits for asynchronus operation, then feeds the found variable with the operation which will cointain a task
        const found = await this.taskRepository.findOne({where: { id, userId: user.id}}); //finds the specific id
        
       if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;

    }

    // getTaskById(id:string): Task{
    //     //arry find method is applied here
    //     const found = this.tasks.find(task => task.id === id); //the task in individual task argument, if thr task id is equal to the id achieved in the getTaskById method is evaluated to true, this indicates that is it the correct task
    //     if(!found){
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }

    //     return found;
    // }


    async createTask(createTaskDto: CreateTaskDto,
        user: User,
        ): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto, user);
    }
    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const {title, description} = createTaskDto;//desturcting the dto object, therefore, if we want to have an object that contians certain key value pairs we can used this syntaxt to extract only the keys required which will bw available within the current scope(this is like a variable defination)
    //     const task: Task = {
    //         id: uuidv4(),
    //         title, //object literal syntax, where a property for an object where the keys are the same as the variables used to define the value, then if the key of only defined then the javaScript will do the rest of the task for the developer
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task; //this will reduce the load on the application, so the fornt end does not consume the back end of the app
    // }

    async deleteTask(
        id: number,
        user:User,
        ): Promise<void>{
        const result = await this.taskRepository.delete({id, userId: user.id});
        if(result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    // deleteTask(id:string): void{
    //     //retriving the task by call getTaskById
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);//this function will be executed for each task in the array and if the function turns false then that task will be filtered out of the array which means that the id that was not being called will remain in the memory/array
    // }

    async updataTaskStatus(
        id: number, 
        status: TaskStatus, 
        user: User): Promise<Task>{
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }

    // updateTaskStatus(id:string, status: TaskStatus): Task{
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

}
