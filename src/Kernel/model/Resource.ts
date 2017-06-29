
import { Model } from 'immutable-models';
import { AsyncModel } from './AsyncModel';

/**
 * Resource as a placeholder for model.
 */
export interface ResourceContentAware<C> {
  hasContent(): boolean;
  getContent(notSetContent?: C): C;
  setContent(content: C): this;
  updateContent(updater: Model.Updater<C>, notSetContent?: C): this;
  removeContent(): this;
}

export interface ResourceParametrized<P> {
  hasParameters(): boolean;
  hasOptimisticParameters(): boolean;
  getParameters(notSetParameters?: P): P;
  getOptimisticParameters(): P;
  setParameters(parameters: P): this;
  setOptimisticParameters(parameters: P): this;
  removeParameters(): this;
  removeOptimisticParameters(): this;
}

export namespace Resource {
  export interface Shape<P = void> extends AsyncModel.Shape<any> {
    parameters?: P;
    optimisticParameters?: P;
  }
}

/**
 * ResourceBase
 */
export class Resource<C, P = void, S extends Resource.Shape<P> = Resource.Shape<P>>
  extends AsyncModel<S>
  implements ResourceContentAware<C>, ResourceParametrized<P> {

  // built-in action
  static readonly FETCH: string = 'FETCH';

  // other usable actions
  static readonly SAVE: string = 'SAVE';
  static readonly REMOVE: string = 'REMOVE';

  /**
   * Create resource resolved with optional content.
   */
  static resolve<C, P = void>(content?: C, parameters?: P): Resource<C, P> {
    return new Resource<C, P>().resolve(content, parameters);
  }

  /**
   * Create resource rejected with optional error.
   */
  static reject<C = any, P = void>(error?: any): Resource<C, P> {
    return new Resource<C, P>().reject(error);
  }

  /**
   * Create resource pending.
   */
  static pending<C = any, P = void>(): Resource<C, P> {
    return new Resource<C, P>().begin();
  }

  /**
   * Create void resource (without content and with VOID status)
   */
  static void<C = any, P = void>(): Resource<C, P> {
    return new Resource<C, P>();
  }

  /**
   * Combine resources and propagate error. Combined resource doesn't have content.
   * The strategy is:
   *  1. if there is some REJECTED resource - REJECTED + propagate error
   *  2. if there is some PENDING resource - PENDING
   *  3. if all resources are RESOLVED - RESOLVED
   *  4. otherwise - VOID
   */
  static combine(...resources: Resource<any, any>[]): Resource<any, any> {
    let combinedResource = Resource.void();

    // remove empty resources from list (for convenient reason)
    resources = resources.filter(resource => resource instanceof Resource);

    if (resources.some(resource => resource.isRejected())) {
      const combinedError = new Error(
        'Combined error:\n' +
        resources
          .map(resource => resource.getError())
          .filter(error => !!error)
          .map((error, index) => `${index + 1}. ${error.toString()}`)
          .join('\n')
      );

      combinedResource = combinedResource.reject(combinedError);
    } else if (resources.some(resource => resource.isPending())) {
      combinedResource = combinedResource.begin();
    } else if (resources.every(resource => resource.isResolved())) {
      combinedResource = combinedResource.resolve();
    }

    return combinedResource;
  }

  constructor(data: Model.Data<S> = {} as Model.Data<S>) {
    super(data);
  }

  hasContent(): boolean {
    return this.hasAsyncResult(Resource.FETCH);
  }

  getContent(notSetContent?: C): C {
    return this.getAsyncResult(Resource.FETCH, notSetContent);
  }

  setContent(content: C): this {
    return this.setAsyncResult(Resource.FETCH, content);
  }

  updateContent(updater: Model.Updater<C>, notSetValue?: C): this {
    return this.updateAsyncResult(Resource.FETCH, updater, notSetValue);
  }

  removeContent(): this {
    return this.removeAsyncResult(Resource.FETCH);
  }

  hasParameters(): boolean {
    return this.has('parameters');
  }

  hasOptimisticParameters(): boolean {
    return this.has('optimisticParameters');
  }

  getParameters(notSetParameters?: P): P {
    return this.get('parameters', notSetParameters);
  }

  getOptimisticParameters(notSetParameters?: P): P {
    return this.get('optimisticParameters', notSetParameters);
  }

  setParameters(parameters: P): this {
    return this.set('parameters', parameters);
  }

  setOptimisticParameters(parameters: P): this {
    return this.set('optimisticParameters', parameters);
  }

  removeParameters(): this {
    return this.remove('parameters');
  }

  removeOptimisticParameters(): this {
    return this.remove('optimisticParameters');
  }

  getStatus(): AsyncModel.Status {
    return this.getAsyncStatus(Resource.FETCH);
  }

  hasError(): boolean {
    return this.hasAsyncError(Resource.FETCH);
  }

  getError(): any {
    return this.getAsyncError(Resource.FETCH);
  }

  setError(error: any): this {
    return this.setAsyncError(Resource.FETCH, error);
  }

  /**
   * Begin resource fetching:
   *  - set statis to PENDING for Resource.FETCH action
   *  - set optimistic parameters if provided
   */
  begin(optimisticParameters?: P): this {
    let next = this.beginAsync(Resource.FETCH);

    if (optimisticParameters) {
      next = next.setOptimisticParameters(optimisticParameters);
    }

    return next;
  }

  /**
   * Cancel resource fetching:
   *  - set status to VOID for Resource.FETCH action
   *  - remove optimistic parameters
   */
  cancel(): this {
    return this
      .cancelAsync(Resource.FETCH)
      .removeOptimisticParameters();
  }

  /**
   * Resolve resource fetching:
   *  - set status to RESOLVED for Resource.FETCH action
   *  - set content if provided for Resource.FETCH action
   *  - set parameters if provided (default are optimistic parameters)
   *  - remove optimistic parameters
   */
  resolve(content?: C, parameters: P = this.getOptimisticParameters()): this {
    let next = this.resolveAsync(Resource.FETCH, content);

    if (undefined !== parameters) {
      next = next.setParameters(parameters);
    }

    if (next.hasOptimisticParameters()) {
      next = next.removeOptimisticParameters();
    }

    return next;
  }

  /**
   * Reject resource fetching:
   *  - set status to REJECTED for Resource.FETCH action
   *  - set error if provided for Resource.FETCH action
   *  - set parameters if provided (default are optimistic parameters)
   *  - remove optimistic parameters
   */
  reject(error?: any, parameters: P = this.getOptimisticParameters()): this {
    let next = this.rejectAsync(Resource.FETCH, error);

    if (undefined !== parameters) {
      next = next.setParameters(parameters);
    }

    if (next.hasOptimisticParameters()) {
      next = next.removeOptimisticParameters();
    }

    return next;
  }

  /**
   * Reset resource fetching:
   *  - set status to VOID for Resource.FETCH action
   *  - remove result for Resource.FETCH action
   *  - remove error for Resource.FETCH action
   *  - remove parameters (optimistic also)
   */
  reset(): this {
    return this
      .resetAsync(Resource.FETCH)
      .removeParameters();
  }

  isVoid(): boolean {
    return this.isAsyncVoid(Resource.FETCH);
  }

  isPending(): boolean {
    return this.isAsyncPending(Resource.FETCH);
  }

  isResolved(): boolean {
    return this.isAsyncResolved(Resource.FETCH);
  }

  isRejected(): boolean {
    return this.isAsyncRejected(Resource.FETCH);
  }

  isFulfilled(): boolean {
    return this.isAsyncFulfilled(Resource.FETCH);
  }
}
