
import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import { Resource } from '../../model/Resource';
import { Loader } from '../Loader/Loader';

export namespace ResourceLoader {
  export type Props<C> = {
    resource: Resource<C>;
    optimistic?: boolean;
    content: (content?: C) => ReactElement<any>;
    loader?: ReactElement<any>;
    error?: ReactElement<any>;
    void?: ReactElement<any>;
  };
}

export class ResourceLoader extends PureComponent<ResourceLoader.Props<any>> {
  render(): ReactElement<any> {
    switch (this.props.resource.getStatus()) {
      case Resource.RESOLVED:
        return this.renderContent();

      case Resource.VOID:
        return this.renderVoid() || this.renderLoader();

      case Resource.PENDING:
        if (this.props.optimistic && this.props.content) {
          return this.renderContent() || this.renderLoader();
        }
        return this.renderLoader();

      case Resource.REJECTED:
        return this.renderError();
    }
  }

  private renderContent(): ReactElement<any> {
    const content = this.props.content ? this.props.content(this.props.resource.getContent()) : null;

    return content ? React.Children.only(content) : null;
  }

  private renderVoid(): ReactElement<any> {
    return this.props.void ? React.Children.only(this.props.void) : null;
  }

  private renderLoader(): ReactElement<any> {
    return this.props.loader ? React.Children.only(this.props.loader) : <Loader/>;
  }

  private renderError(): ReactElement<any> {
    return this.props.error ? React.Children.only(this.props.error) : <span>Cannot load resource...</span>;
  }
}
