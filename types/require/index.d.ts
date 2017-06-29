
interface IWebpackRequireContext {
  (path: string): any;
  (paths: string[], callback: (...modules: any[]) => void): void;
  id: number;
  resolve: (path: string) => string;
  keys: () => string[];
}

interface IWebpackRequireEnsure {
  <T>(require: IWebpackRequire): T;
}

interface IWebpackRequire extends IWebpackRequireContext {
  ensure: <T>(paths: string[], callback?: IWebpackRequireEnsure, fileName?: string) => Promise<T>;
  context: (directory: string, useSubdirectories?: boolean, regExp?: RegExp) => IWebpackRequireContext;
}

declare const require: IWebpackRequire;

declare const global: any;

declare const module: any;

declare module '*.scss' {
  const style: any;
  export = style;
}

declare module '*.svg' {
  const url: string;
  export = url;
}

declare module '*.intl' {
  const translations: any;
  export = translations;
}