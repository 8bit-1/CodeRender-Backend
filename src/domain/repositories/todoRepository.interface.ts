import { TodoM } from '../model/todo';

export interface ITodoRepository {
  List(): Promise<TodoM[]>;
  Insert(todo: TodoM): Promise<void>;
  Update(id: number, done: boolean): Promise<void>;
  Delete(id: number): Promise<void>;
  Find(id: number): Promise<TodoM>;
  // Find(id: number): Promise<DataWrapper<TodoM>>;
}
