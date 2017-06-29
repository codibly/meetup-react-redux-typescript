import * as hoistStatics from 'hoist-non-react-statics';
import * as React from 'react';
import { Component, ComponentClass, PropTypes, ReactElement, StatelessComponent, ValidationMap } from 'react';
import { Dispatch, Store } from 'redux';
import { ContainerProvider } from './ContainerProvider';

interface ComponentDecorator<TOwnProps> {
  (component: ComponentClass<TOwnProps> | StatelessComponent<TOwnProps>): ComponentClass<TOwnProps>;
}

interface MapContainerToProps<TContainerProps, TOwnProps> {
  (container: any, dispatch: Dispatch<any>, ownProps: TOwnProps): TContainerProps;
}

interface MergeProps<TContainerProps, TOwnProps> {
  (containerProps: TContainerProps, ownProps: TOwnProps): TContainerProps;
}

/**
 * Similar to react-redux's connect method - maps container to component props to inject services into component.
 * To use this decorator, you have to provide container and optionally store by `<ContainerProvider>` and `<Provider>` from `react-redux`
 */
export function injectService<TContainerProps, TOwnProps>(
  mapContainerToProps: MapContainerToProps<TContainerProps, TOwnProps>,
  mergeProps?: MergeProps<TContainerProps, TOwnProps>
): ComponentDecorator<TOwnProps> {
  if (!mergeProps) {
    mergeProps = (containerProps: any, ownProps: any) => ({ ...ownProps, ...containerProps });
  }

  return function wrapWithInjectService(
    WrappedComponent: ComponentClass<TOwnProps> | StatelessComponent<TOwnProps>
  ): ComponentClass<TOwnProps> {
    const wrappedComponentName: string = WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';

    class Injected extends Component<any, any> {
      static WrappedComponent: ComponentClass<TOwnProps> | StatelessComponent<TOwnProps> = WrappedComponent;
      static displayName: string = `Inject(${wrappedComponentName})`;
      static contextTypes: ValidationMap<ContainerProvider.Context & { store: Store<any> }> = {
        container: PropTypes.object.isRequired,
        store: PropTypes.object
      };

      context: ContainerProvider.Context & { store?: Store<any> };

      render(): ReactElement<any> | null {
        if (!this.context.container) {
          // tslint:disable-next-line:no-console
          console.error(
            `Missing container in '${wrappedComponentName}' component context. Did you forget about <ContainerProvider/>?`
          );

          return null;
        }

        return React.createElement(
          WrappedComponent as ComponentClass<any>,
          mergeProps(
            mapContainerToProps(
              this.context.container,
              this.context.store ? this.context.store.dispatch : this.handleNoDispatch,
              this.props
            ),
            this.props
          )
        );
      }

      private handleNoDispatch(action: any): any {
        // tslint:disable-next-line:no-console
        console.error(`There is no provided store to dispatch action in injectService for '${wrappedComponentName}' component.`);

        return action;
      }
    }

    return hoistStatics(Injected, WrappedComponent);
  };
}
