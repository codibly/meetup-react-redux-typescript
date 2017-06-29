import { Children, Component, PropTypes, ReactElement, ValidationMap } from 'react';

export namespace ContainerProvider {
  export type Props = {
    container: any;
  };
  export type Context = {
    container: any;
  };
}

export class ContainerProvider extends Component<ContainerProvider.Props, {}> {
  static childContextTypes: ValidationMap<ContainerProvider.Context> = {
    container: PropTypes.object.isRequired
  };

  getChildContext(): ContainerProvider.Context {
    return {
      container: this.props.container
    };
  }

  render(): ReactElement<any> {
    return Children.only(this.props.children);
  }
}
