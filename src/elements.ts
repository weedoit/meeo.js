/// <reference path="element.ts" />

module Meeo {
    export module Elements {
        var fetchAttributes: Function = function (params: IArguments): string {
            var first = params[0],
                key: string,
                cur: any,
                out: Array<string> = [];

            if (first instanceof Object) {
                for (key in first) {
                    if (first.hasOwnProperty(key)) {
                        cur = first[key];

                        if (cur === '' || cur === null || cur === undefined) {
                            out.push(key);
                        } else {
                            out.push(key + '="' + cur + '"');
                        }
                    }
                }

                return out.join(' ');
            }

            return null;
        }

        export function create(name: string) {
            var el: Element = new Element(name),
                render: any;

            render = function() {
                return Meeo.Elements.render(el, arguments);
            };

            render.isRender = true;
            methods[name] = render;
        }

        export function render(element: Element, params: IArguments): string {
            var attrs: string,
                paramsArray: Array<any> = Array.prototype.slice.call(<any>params);

            if (params.length === 0) {
                return ['<', element.name, '>'].join('');
            }

            if (params[0].hasOwnToStringMethod) {
                params[0] = params[0].toString();
            }

            attrs = fetchAttributes(params);

            if (attrs !== null) {
                paramsArray = paramsArray.slice(1);
            }

            return ['<', element.name, ' ', attrs, '>'].concat(paramsArray, ['</', element.name, '>']).join('');
        }
    }
}