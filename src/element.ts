/// <reference path="meeo.ts" />

module Meeo {
    export class Element {
        name: string = null;
        acceptNested: boolean = true;

        constructor(name: string) {
            var markup = document.createElement(name).outerHTML;
            this.name = name;
            this.acceptNested = markup.indexOf('><') > 0;
        }
    }
}