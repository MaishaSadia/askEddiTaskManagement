import { BaseEntity, Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
//import { TaskStatus } from './task.model';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn() //makind the id as primary key
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(type => User, user => user.tasks, {eager: false})
    user: User;

    @Column()
    userId:number;
}

