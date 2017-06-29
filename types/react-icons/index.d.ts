
declare module 'react-icons' {
  import * as React from 'react';

  type IconProps = ReactIcons.IconProps;
  type ReactIconsContext = ReactIcons.ReactIconsContext;

  interface ReactIconsContextProvider {
    getChildContext(): ReactIconsContext;
  }

  namespace ReactIcons {
    type IconProps = {
      size?: number;
      color?: string;
      style?: CSSStyleDeclaration;
      [key: string]: any;
    }

    type ReactIconsContext = {
      reactIconBase: IconProps
    }

    class Icon extends React.Component<IconProps, {}> {}
  }
}

declare module 'react-icons/*' {
  import { ReactIcons } from 'react-icons';
  const Icon: typeof ReactIcons.Icon; export = Icon;
}
