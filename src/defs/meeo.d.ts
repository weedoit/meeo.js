declare module Meeo {
    export var methods: any;
    export function meeo(cb: Function);

    export class Element {
        name: string;
        acceptNested: boolean;
        constructor(name: string);
    }

    export module Elements {
        export function create(name: string): void;
        export function render(element: Element, params: IArguments): string;
    }

    export module Components {
        export function create(name: string, def: Function): void;
    }

    export module Helpers {
        export function create(name: string, implementation: Function): void;
    }

    class Conditional {
        hasOwnToStringMethod: boolean;
        private condition: boolean;
        private output: string;
        constructor(condition: boolean, whenTrue?: Function, whenFalse?: Function);
        then(callback: Function): Conditional;
        elseif(condition: boolean, callback: Function): Conditional;
        else(callback: Function): string;
        toString(): string;
    }

    class RenderIterator {
        private obj: any;
        constructor(obj: any, callback?: Function);
        each(cb: Function);
    }
}