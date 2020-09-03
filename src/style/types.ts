import { EnumType } from "typescript";
import { CSSProperties } from "react";

export interface IColor {
    r : number;
    g : number;
    b : number;
    a : number;
}

export interface ITheme extends CSSProperties {
    [propertyName : string]: string | number;
}