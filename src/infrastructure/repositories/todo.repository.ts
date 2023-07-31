// import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TodoM } from 'src/domain/model/todo';
// import { Repository } from 'typeorm';
import { ITodoRepository } from 'src/domain/repositories/todoRepository.interface';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoRepository implements ITodoRepository {
  // constructor(@InjectRepository(Todo) private readonly _repository: Repository<Todo>) {}
  constructor() {}
  private TodoArray: Array<Todo> = new Array();

  async List(): Promise<TodoM[]> {
    // const list = await this._repository.find();
    let todo1 = new Todo();
    todo1.id = 1;
    todo1.content = 'Sopa';
    todo1.isDone = false;
    todo1.createDate = new Date();
    todo1.udateDate = null;

    const list = [todo1, new Todo()];
    return list;
  }

  async Insert(todo: TodoM): Promise<void> {
    const todoEntity = this.toTodoEntity(todo);
    this.TodoArray.push(todoEntity);
    // await this._repository.insert(todoEntity);
  }

  async Update(id: number, isDone: boolean): Promise<void> {
    let index = this.TodoArray.findIndex((todo) => todo.id === id);
    this.TodoArray[index].isDone = isDone;
    this.TodoArray[index].udateDate = new Date();
    // await this._repository.update(
    //   {
    //     id: id,
    //   },
    //   { isDone: isDone },
    // );
  }

  async Delete(id: number): Promise<void> {
    let index = this.TodoArray.findIndex((todo) => todo.id === id);
    this.TodoArray.splice(index, 1);
    // await this._repository.delete({ id: id });
  }

  async Find(id: number): Promise<TodoM> {
    // const todoEntity = await this._repository.findOneByOrFail({ id: id });
    let index = this.TodoArray.findIndex((todo) => todo.id === id);
    const todoEntity = this.TodoArray[index];
    return this.toTodo(todoEntity);
  }

  private toTodo(todoEntity: Todo): TodoM {
    const todo: TodoM = new TodoM();

    todo.id = todoEntity.id;
    todo.content = todoEntity.content;
    todo.isDone = todoEntity.isDone;
    // todo.createdate = todoEntity.createdate;
    // todo.updateddate = todoEntity.updateddate;

    return todo;
  }

  private toTodoEntity(todo: TodoM): Todo {
    const todoEntity: Todo = new Todo();

    todoEntity.id = todo.id;
    todoEntity.content = todo.content;
    todoEntity.isDone = todo.isDone;

    return todoEntity;
  }
}
