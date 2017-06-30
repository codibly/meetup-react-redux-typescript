
import { Model } from 'immutable-models';

type TodoShape = {
  content: string;
  done: boolean;
};

export class Todo extends Model<TodoShape> {
  getContent(): string {
    return this.get('content', '');
  }

  setContent(content: string): this {
    return this.set('content', content);
  }

  isDone(): boolean {
    return this.get('done', false);
  }

  toggle(): this {
    return this.set('done', !this.get('done'));
  }
}
