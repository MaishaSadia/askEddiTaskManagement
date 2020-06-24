import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksModule } from './tasks.module';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService){} //we have a prameter here in the constructor named taskService of type TasksService,the service that we have created, nestJs will use this information, by instanciating this controller to look for the TasksService object, which is this one object that is circulating thoughout this module, it is going to find it or create it if this does not exist already, and then it is going to assign it as an argument to taskService, and by making it private it will allow it to be called within the class as nestJs creates a private property the class taskService  
    
    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: User,
        ): Promise<Task[]>{ 
        return this.taskService.getTasks(filterDto, user);
    }
    

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[]{ //when this handeller is executed it should have the query parameter as an object
    //     //console.log(filterDto);
    //     //if the query paparmeters have any values in them then this method will be called, getTasksWithFilters from the service, on the other hand, if it emply then getAllTask will be called instead
    //     if(Object.keys(filterDto).length){//if the filterDto has some length
    //         return this.taskService.getTasksWithFilters(filterDto);
    //     }
    //     else{
    //         return this.taskService.getAllTasks();
    //     }
    // }

    @Get('/:id') //this is the url decorator, this handeler will handle any incoming request to task/ the specific id
    getTaskById(@Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    ):Promise<Task>{ // inorder to extract this parameter and make it available within the method during execution a new parameter called id is introduced, the @Param decorator has the id which corresponds to the url
        return this.taskService.getTaskById(id, user);
    }

    // @Get('/:id') //this is the url decorator, this handeler will handle any incoming request to task/ the specific id
    // getTaskById(@Param('id') id:string):Task{ // inorder to extract this parameter and make it available within the method during execution a new parameter called id is introduced, the @Param decorator has the id which corresponds to the url
    //     return this.taskService.getTaskById(id);
    // }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number,
    @GetUser() user:User,
    ): Promise<void>{
        return this.taskService.deleteTask(id, user);
    }
    
    // @Delete('/:id')
    // deleteTask(@Param('id') id:string): void{
    //     this.taskService.deleteTask(id);
    // }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.taskService.updataTaskStatus(id, status, user);
    }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id:string,// as we are retriving the task id from the url praram therefore the param decorator is used
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    // ): Task {
    //     return this.taskService.updateTaskStatus(id, status);
    // }


    @Post()
    @UsePipes(ValidationPipe)

    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
        ): Promise<Task>{
        return this.taskService.createTask(createTaskDto, user);
    }
    // @Post() //any POST request coming to task will be handelled by this handeler
    // //to retirive the request parameters which are the title and the description, nestJs provides two option to achiceve that that uses the body decorators 
    // //first way----
    // //to achieve the entire request body, so when this handeller is called after the http request nestJs will call the entire request body and put it in the parameter body as an argument
 
    // // createTask(@Body() body) {
    // //     console.log('body',body);
    // // }
    
    // //second way---y parameters
    // //specifically extract specific body parameters that is being requested
    
    // @UsePipes(ValidationPipe)
    // createTask(
    //     //before using dto
    //     // @Body('title') title: string, //in here with each parameter the exact key can be specified that we want to extract, so the nestJs will pass the request bpdy ans will extract specifiacally those keys that we define
    //     // @Body('description') description: string,
    //     @Body() createTaskDto: CreateTaskDto  //this paramerter will contain the entire request body and is expected to be shape create task detail which is the case if 
    //     ): Task { //the return of this method will be a task
    //     // console.log('title',title);
    //     // console.log('description',description);
    //     return this.taskService.createTask(createTaskDto);
    // }

}
