/// <reference path="helpers.ts" />

module Meeo {
    class Conditional {
        hasOwnToStringMethod: boolean = true;

        private condition: boolean;

        private output: string;

        constructor(condition: boolean, whenTrue?: Function, whenFalse?: Function) {
            this.condition = condition;

            if (condition) {
                this.output = (whenTrue) ? whenTrue() : null;
            } else {
                this.output = (whenFalse) ? whenFalse() : null;
            }

            return this;
        }

        then(callback: Function): Conditional {
            if (this.condition) {
                this.output = callback();
            }

            return this;
        }

        elseif(condition: boolean, callback: Function) : Conditional {
            if (!this.condition && condition) {
                this.output = callback();
            }

            return this;
        }

        else(callback: Function) : string {
            if (!this.condition) {
                this.output = callback();
            }

            return this.toString();
        }

        toString () : string {
            return this.output;
        }
    }

    class RenderIterator {
        private obj: any;

        constructor(obj: any, callback?: Function) {
            this.obj = obj;
            callback && this.each(callback);
        }

        each (cb: Function) {
            var obj: any = this.obj,
                out: Array<any> = [],
                key: string,
                len: number,
                x: number;

            if (typeof obj !== 'object') return;

            if (obj instanceof Array) {
                len = obj.length;

                for (x = 0; x < len; x += 1) {
                    out.push(cb(obj[x], x));
                }
            } else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        out.push(cb(obj[key], key));
                    }
                }
            }

            return out.join('');
        }
    }

    Helpers.create('if', function(condition: any, whenTrue?: Function, whenFalse?: Function) {
        var cond: Conditional = new Conditional(condition, whenTrue, whenFalse);
        return cond;
    });

    Helpers.create('unless', function (condition: any, whenTrue?: Function, whenFalse?: Function) {
        var cond: Conditional = new Conditional(!condition, whenTrue, whenFalse);
        return cond;
    });

    Helpers.create('repeat', function(obj: any, cb: Function) {
        return (new RenderIterator(obj)).each(cb);
    });

    Helpers.create('forelse', function(obj: any, whenNotEmpty?: Function, whenEmpty?: Function) {
        var out: any,
            key: string;

        out = {
            hasOwnToStringMethod: true,
            obj: obj,
            output: '',
            isEmpty: true,

            then: function (callback: Function) {
                if (!this.isEmpty) {
                    this.output = (new RenderIterator(this.obj)).each(callback);
                }

                return this;
            },

            empty: function (callback: Function) {
                if (this.isEmpty) {
                    this.output = callback();
                }

                return this.toString();
            },

            toString: function () {
                return this.output;
            }
        }

        if (typeof obj === 'object') {
            if (obj instanceof Array) {
                out.isEmpty = (obj.length > 0) ? false : out.isEmpty;
            } else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        out.isEmpty = false;
                        break;
                    }
                }
            }
        }

        if (out.isEmpty) {
            whenEmpty && out.empty(whenEmpty);
        } else {
            whenNotEmpty && out.then(whenNotEmpty);
        }

        return out;
    });

    Helpers.create('escape', function(str: any) {
        var text: string,
            map: any;

        text = str.toString();
        map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return text.replace(/[&<>"']/g, function (m) { return map[m]; });
    });

    Helpers.create('classes', function(obj: any) {
        var key: string,
            out: string[] = [];

        for (key in obj) {
            if (obj.hasOwnProperty(key) && obj[key]) {
                out.push(key);
            }
        }

        return out.join('');
    });
}