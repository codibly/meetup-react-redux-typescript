
import { List } from 'immutable';
import { TodoApi } from '../api/TodoApi';
import { TodoMapper } from '../mapper/TodoMapper';
import { Todo } from '../model/Todo';

export class TodoRepository {
  constructor(
    private todoApi: TodoApi,
    private todoMapper: TodoMapper
  ) {
  }

  getList(): Promise<List<Todo>> {
    return this.todoApi.getList()
    .then((list = []) => List(list.map(entry => this.todoMapper.deserialize(entry))));
  }
}
