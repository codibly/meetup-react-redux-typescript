
// Module Augmentation
declare module 'material-colors' {
  type BasicShadesObject = {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
  };
  type AShadesObject = {
    A100: string;
    A200: string;
    A400: string;
    A700: string;
  };
  type TextShadesObject = {
    primary: string;
    secondary: string;
    disabled: string;
    dividers: string;
  };
  type IconsShadesObject = {
    active: string;
    inactive: string;
  };
  type AllShadesObject = BasicShadesObject & AShadesObject;

  type ColorsAllShadesObject = {
    red: AllShadesObject;
    pink: AllShadesObject;
    purple: AllShadesObject;
    deepPurple: AllShadesObject;
    indigo: AllShadesObject;
    blue: AllShadesObject;
    lightBlue: AllShadesObject;
    cyan: AllShadesObject;
    teal: AllShadesObject;
    green: AllShadesObject;
    lightGreen: AllShadesObject;
    lime: AllShadesObject;
    yellow: AllShadesObject;
    amber: AllShadesObject;
    orange: AllShadesObject;
    deepOrange: AllShadesObject;
  };

  type ColorsBasicShadesObject = {
    brown: BasicShadesObject;
    grey: BasicShadesObject;
    blueGrey: BasicShadesObject;
  };

  type ColorsTextShadesObject = {
    darkText: TextShadesObject;
    lightText: TextShadesObject;
  };

  type ColorsIconShadesObject = {
    darkIcons: IconsShadesObject;
    lightIcons: IconsShadesObject;
  };

  type ColorsNoShadesObject = {
    black: string;
    white: string;
  };

  type ColorsObject =
    ColorsAllShadesObject & ColorsBasicShadesObject & ColorsTextShadesObject & ColorsIconShadesObject & ColorsNoShadesObject;

  namespace colors {
    export type MaterialShade = keyof BasicShadesObject;
    export type MaterialAShade = keyof AShadesObject;
    export type MaterialTextShade = keyof TextShadesObject;
    export type MaterialIconsShade = keyof IconsShadesObject;
    export type MaterialColor = keyof ColorsObject;

    export namespace MaterialColor {
      export type WithAllShades = keyof ColorsAllShadesObject;
      export type WithBasicShades = WithAllShades | keyof ColorsBasicShadesObject;
      export type WithTextShades = keyof ColorsTextShadesObject;
      export type WithIconShades = keyof ColorsIconShadesObject;
      export type WithNoShades = keyof ColorsNoShadesObject;
    }
  }

  const colors: ColorsObject;

  export = colors;
}
