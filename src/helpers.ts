/// <reference path="meeo.ts" />

module Meeo {
    export module Helpers {
        export function create(name: string, implementation: Function): void {
            Meeo.methods[name] = implementation;
        }
    }
}