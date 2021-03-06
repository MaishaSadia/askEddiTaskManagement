//to provide a shape to the model, the model can be defined as a class or interface
//Interfaces are typeScript concept that simply enforeces the shape of an object upon compilation, therefore after compilation interfaces are not preserved as interfaces anymore
//on contrasts, classes already exists in the javaScript, thus even after post compliation the classes can still be preserved, it is useful when an obeject is generated based on a blueprint and some self-contained functionality can be added, for instance methods

//defining a task model
export interface Task{
    id: string; //autogenerated
    title: string;
    description: string;
    status: TaskStatus;
}

//creating a customised datatype
//typeScript enumation

export enum TaskStatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

