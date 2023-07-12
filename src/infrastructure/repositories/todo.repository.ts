import { InjectRepository } from '@nestjs/typeorm';
import { TodoM } from 'src/domain/model/todo';
import { Repository } from 'typeorm';
import { ITodoRepository } from 'src/domain/repositories/todoRepository.interface';
import { Todo } from '../entities/todo.entity';

export class TodoRepository implements ITodoRepository {
  /**
   *
   */
  constructor(
    @InjectRepository(Todo) private readonly _repository: Repository<Todo>,
  ) {}

  async List(): Promise<TodoM[]> {
    const list = await this._repository.find();
    return list;
  }
  async Insert(todo: TodoM): Promise<void> {
    const todoEntity = this.toTodoEntity(todo);
    await this._repository.insert(todoEntity);
  }
  async Update(id: number, isDone: boolean): Promise<void> {
    await this._repository.update(
      {
        id: id,
      },
      { isDone: isDone },
    );
  }
  async Delete(id: number): Promise<void> {
    await this._repository.delete({ id: id });
  }
  async Find(id: number): Promise<TodoM> {
    const todoEntity = await this._repository.findOneByOrFail({ id: id });
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
