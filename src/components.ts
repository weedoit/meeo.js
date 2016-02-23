/// <reference path="meeo.ts" />

module Meeo {

    export module Components {


        export function create (name: string, def: Function) {

            Meeo.methods[name] = function () {
                var scope: any = null,
                    args = Array.prototype.slice.call(arguments);

                if (typeof args[0] === 'object') {
                    scope = args[0];
                    args = args.slice(1);
                }

                return def(Meeo.methods, scope, args.join(''));
            }

        }

    }

}