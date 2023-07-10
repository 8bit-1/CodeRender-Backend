import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  isDone: boolean;

  @Column()
  createDate: Date;

  @Column()
  udateDate: Date;
}
