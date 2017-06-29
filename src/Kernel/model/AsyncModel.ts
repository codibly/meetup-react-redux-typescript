
import { Map } from 'immutable';
import { Model } from 'immutable-models';

export namespace AsyncModel {
  export type Status = 'VOID' | 'PENDING' | 'RESOLVED' | 'REJECTED';

  export interface Shape<A> {
    asyncStatuses?: Map<A, Status>;
    asyncResults?: Map<A, any>;
    asyncErrors?: Map<A, any>;
  }
}

export class AsyncModel<T, A = any, S extends AsyncModel.Shape<A> = AsyncModel.Shape<A>>
  extends Model<T & S> {

  static readonly VOID: AsyncModel.Status = 'VOID';
  static readonly PENDING: AsyncModel.Status = 'PENDING';
  static readonly RESOLVED: AsyncModel.Status = 'RESOLVED';
  static readonly REJECTED: AsyncModel.Status = 'REJECTED';

  setAsyncStatus(action: A, status: AsyncModel.Status): this {
    return this.update('asyncStatuses', (statuses = Map<A, AsyncModel.Status>()) => statuses.set(action, status));
  }

  setAsyncResult(action: A, result: any): this {
    return this.update('asyncResults', (results = Map<A, any>()) => results.set(action, result));
  }

  updateAsyncResult<T>(action: A, updater: Model.Updater<T>, notSetResult?: T): this {
    return this.update('asyncResults', (results = Map<A, any>()) => results.update(action, notSetResult, updater));
  }

  setAsyncError(action: A, error: any): this {
    return this.update('asyncErrors', (errors = Map<A, any>()) => errors.set(action, error));
  }

  removeAsyncResult(action: A): this {
    return this.has('asyncResults') ? this.update('asyncResults', results => results.remove(action)) : this;
  }

  removeAsyncError(action: A): this {
    return this.has('asyncErrors') ? this.update('asyncErrors', errors => errors.remove(action)) : this;
  }

  getAsyncStatus(action: A, notSetStatus: AsyncModel.Status = AsyncModel.VOID): AsyncModel.Status {
    return this.has('asyncStatuses') ? this.get('asyncStatuses').get(action, notSetStatus) : notSetStatus;
  }

  getAsyncResult<T = any>(action: A, notSetResult?: T): T {
    return this.has('asyncResults') ? this.get('asyncResults').get(action, notSetResult) : notSetResult;
  }

  getAsyncError(action: A, notSetError?: any): any {
    return this.has('asyncErrors') ? this.get('asyncErrors').get(action, notSetError) : notSetError;
  }

  hasAsyncStatus(action: A, status: AsyncModel.Status): boolean {
    return this.getAsyncStatus(action) === status;
  }

  hasAsyncResult(action: A): boolean {
    return this.has('asyncResults') && this.get('asyncResults').has(action);
  }

  hasAsyncError(action: A): boolean {
    return this.has('asyncErrors') && this.get('asyncErrors').has(action);
  }

  beginAsync(action: A): this {
    return this.setAsyncStatus(action, AsyncModel.PENDING);
  }

  resolveAsync<T = any>(action: A, result?: T): this {
    return this.withMutations(data => {
      data.set('asyncStatuses', (data.get('asyncStatuses') || Map<A, AsyncModel.Status>()).set(action, AsyncModel.RESOLVED));

      if (result !== undefined) {
        data.set('asyncResults', (data.get('asyncResults') || Map<A, any>()).set(action, result));
      }
    });
  }

  rejectAsync(action: A, error?: any): this {
    return this.withMutations(data => {
      data.set('asyncStatuses', (data.get('asyncStatuses') || Map<A, AsyncModel.Status>()).set(action, AsyncModel.REJECTED));

      if (error !== undefined) {
        data.set('asyncErrors', (data.get('asyncErrors') || Map<A, any>()).set(action, error));
      }
    });
  }

  cancelAsync(action: A): this {
    return this.setAsyncStatus(action, AsyncModel.VOID);
  }

  resetAsync(action: A): this {
    return this.withMutations(data => {
      data.set('asyncStatuses', (data.get('asyncStatuses') || Map<A, AsyncModel.Status>()).set(action, AsyncModel.VOID));

      if (data.has('asyncResults')) {
        data.set('asyncResults', data.get('asyncResults').remove(action));
      }
      if (data.has('asyncErrors')) {
        data.set('asyncErrors', data.get('asyncErrors').remove(action));
      }
    });
  }

  isAsyncVoid(action: A): boolean {
    return this.hasAsyncStatus(action, AsyncModel.VOID);
  }

  isAsyncPending(action: A): boolean {
    return this.hasAsyncStatus(action, AsyncModel.PENDING);
  }

  isAsyncResolved(action: A): boolean {
    return this.hasAsyncStatus(action, AsyncModel.RESOLVED);
  }

  isAsyncRejected(action: A): boolean {
    return this.hasAsyncStatus(action, AsyncModel.REJECTED);
  }

  isAsyncFulfilled(action: A): boolean {
    return this.isAsyncResolved(action) && this.hasAsyncResult(action);
  }
}
