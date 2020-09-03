
export type IClassParameter = boolean;
export type IClassNames = {[name : string]: boolean};

export function joinClasses(a : string, b : string) {
    return `${a}${a != undefined && b != undefined ? ' ' : ''}${b}`;
}

export function classNames(classes : IClassNames, always ?: string | string[]) : string {

    let pre : string;
    let conditional : string = Object.keys(classes).reduce((acc, key) => (classes[key] === true) ? `${acc}${acc !== '' ? ' ' : ''}${key}` : acc, '');

    if (typeof always === "string") {
        pre = always;
    }
    else if (Array.isArray(always)) {
        pre = (always ? (always.join(" ")) : '');
    }
    else {
        pre = "";
    }

    return `${pre}${(conditional.length > 0) ? (pre.length > 0 ? ' ' : '') + conditional : ''}`;
}

export function baseClassNames(classes : IBaseClasses) : IClassNames {
    return {
        'flat': classes.flat,
        'fill': classes.fill,
        'expand': classes.expand,
        'no-padding': classes.noPadding,
        'spacing': classes.spacing,
        'vertical': classes.vertical,
        'horizontal': classes.horizontal,
        'hover': classes.hover,
        'small': classes.small
    }
}

export function intentClassNames(classes : IIntentClasses) : IClassNames {
    return {
        'primary': classes.primary,
        'active': classes.active,
        'selected': classes.selected,
        'error': classes.error
    }
}

export type IBaseClasses = {
    flat?: IClassParameter,
    fill?: IClassParameter,
    expand?: IClassParameter,
    noPadding?: IClassParameter,
    spacing?: IClassParameter,
    vertical?: IClassParameter,
    horizontal?: IClassParameter,
    hover?: IClassParameter,
    small?: IClassParameter
}

export type IIntentClasses = {
    primary?: IClassParameter
    active?: IClassParameter
    selected?: IClassParameter
    error?: IClassParameter
}