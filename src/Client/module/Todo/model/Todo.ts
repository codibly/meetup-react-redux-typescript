
import { Model } from 'immutable-models';

export namespace Todo {
  export interface Shape {
    id: number;
    name: string;
    done?: boolean;
  }
}

export class Todo extends Model<Todo.Shape> {
  getId(): number {
    return this.get('id');
  }

  getName(): string {
    return this.get('name');
  }

  setName(name: string): this {
    return this.set('name', name);
  }

  isDone(): boolean {
    return !!this.get('done', false);
  }

  done(): this {
    return this.set('done', true);
  }

  undone(): this {
    return this.set('done', false);
  }

  toggle(): this {
    return this.set('done', !this.get('done'));
  }

  setDone(done: boolean): this {
    return this.set('done', done);
  }
}
