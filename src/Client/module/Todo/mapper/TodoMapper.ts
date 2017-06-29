
import { TodoApi } from '../api/TodoApi';
import { Todo } from '../model/Todo';

export class TodoMapper {
  serialize(model: Todo): TodoApi.Entry {
    return {
      id: model.getId(),
      name: model.getName(),
      done: model.isDone()
    };
  }

  deserialize(entry: TodoApi.Entry): Todo {
    return new Todo({
      id: entry.id,
      name: entry.name,
      done: entry.done
    });
  }
}
