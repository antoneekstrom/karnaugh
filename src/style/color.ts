import { IColor } from "./types";

export function rgbToHex(r : number, g : number, b : number, a : number) : string {
    return colToHex(rgbToCol(r, g, b, a));
}

export function rgbToCol(r : number, g : number, b : number, a : number) : IColor {
    return {r, g, b, a};
}

export function colToHex(color : IColor) : string {
    let r = color.r.toString(16);
    let g = color.g.toString(16);
    let b = color.b.toString(16);
    let a = Math.round(color.a * 255).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    if (a.length == 1)
        a = "0" + a;

    return "#" + r + g + b + a;
}

export function hexToCol(hex : string) : IColor {
    let r : string;
    let g : string;
    let b : string;
    let a : string;

    if (hex.length != 7) {
        throw `Invalid hex format (length: ${hex.length}).`;
    }

    return {
        r: Number.parseInt(hex[1] + hex[2], 16),
        g: Number.parseInt(hex[3] + hex[4], 16),
        b: Number.parseInt(hex[5] + hex[6], 16),
        a: 1
    };
}