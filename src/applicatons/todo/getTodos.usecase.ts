import { TodoM } from '../../domain/model/todo';
import { ITodoRepository } from '../../domain/repositories/todoRepository.interface';

export class GetTodosUseCases {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async list(): Promise<TodoM[]> {
    return await this.todoRepository.List();
  }
  async insert(): Promise<TodoM[]> {
    return await this.todoRepository.List();
  }
  async update(): Promise<TodoM[]> {
    return await this.todoRepository.List();
  }
  async delete(): Promise<TodoM[]> {
    return await this.todoRepository.List();
  }
}
