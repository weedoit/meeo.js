var Meeo;
(function (Meeo) {
    Meeo.methods = {};
    var meeo = function (cb) {
        var res = cb(Meeo.methods);
        if (res instanceof Array) {
            res = res.join('');
        }
        return res;
    };
    window.meeo = meeo;
    window._ = window._ || meeo;
})(Meeo || (Meeo = {}));
var Meeo;
(function (Meeo) {
    var Element = (function () {
        function Element(name) {
            this.name = null;
            this.acceptNested = true;
            var markup = document.createElement(name).outerHTML;
            this.name = name;
            this.acceptNested = markup.indexOf('><') > 0;
        }
        return Element;
    })();
    Meeo.Element = Element;
})(Meeo || (Meeo = {}));
var Meeo;
(function (Meeo) {
    var Elements;
    (function (Elements) {
        var fetchAttributes = function (params) {
            var first = params[0], key, cur, out = [];
            if (first instanceof Object) {
                for (key in first) {
                    if (first.hasOwnProperty(key)) {
                        cur = first[key];
                        if (cur === '' || cur === null || cur === undefined) {
                            out.push(key);
                        }
                        else {
                            out.push(key + '="' + cur + '"');
                        }
                    }
                }
                return out.join(' ');
            }
            return null;
        };
        function create(name) {
            var el = new Meeo.Element(name), render;
            render = function () {
                return Meeo.Elements.render(el, arguments);
            };
            render.isRender = true;
            Meeo.methods[name] = render;
        }
        Elements.create = create;
        function render(element, params) {
            var attrs, paramsArray = Array.prototype.slice.call(params);
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
        Elements.render = render;
    })(Elements = Meeo.Elements || (Meeo.Elements = {}));
})(Meeo || (Meeo = {}));
var Meeo;
(function (Meeo) {
    var Components;
    (function (Components) {
        function create(name, def) {
            Meeo.methods[name] = function () {
                var scope = null, args = Array.prototype.slice.call(arguments);
                if (typeof args[0] === 'object') {
                    scope = args[0];
                    args = args.slice(1);
                }
                return def(Meeo.methods, scope, args.join(''));
            };
        }
        Components.create = create;
    })(Components = Meeo.Components || (Meeo.Components = {}));
})(Meeo || (Meeo = {}));
var Meeo;
(function (Meeo) {
    var Helpers;
    (function (Helpers) {
        function create(name, implementation) {
            Meeo.methods[name] = implementation;
        }
        Helpers.create = create;
    })(Helpers = Meeo.Helpers || (Meeo.Helpers = {}));
})(Meeo || (Meeo = {}));
var Meeo;
(function (Meeo) {
    var HTML5Elements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'blockquote', 'br',
        'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data',
        'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset',
        'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'i',
        'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map',
        'mark', 'menu', 'meta', 'menuitem', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup',
        'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp',
        'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary',
        'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time',
        'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];
    HTML5Elements.map(function (element) {
        Meeo.Elements.create(element);
    });
})(Meeo || (Meeo = {}));
var Meeo;
(function (Meeo) {
    var Conditional = (function () {
        function Conditional(condition, whenTrue, whenFalse) {
            this.hasOwnToStringMethod = true;
            this.condition = condition;
            if (condition) {
                this.output = (whenTrue) ? whenTrue() : null;
            }
            else {
                this.output = (whenFalse) ? whenFalse() : null;
            }
            return this;
        }
        Conditional.prototype.then = function (callback) {
            if (this.condition) {
                this.output = callback();
            }
            return this;
        };
        Conditional.prototype.elseif = function (condition, callback) {
            if (!this.condition && condition) {
                this.output = callback();
            }
            return this;
        };
        Conditional.prototype.else = function (callback) {
            if (!this.condition) {
                this.output = callback();
            }
            return this.toString();
        };
        Conditional.prototype.toString = function () {
            return this.output;
        };
        return Conditional;
    })();
    var RenderIterator = (function () {
        function RenderIterator(obj, callback) {
            this.obj = obj;
            callback && this.each(callback);
        }
        RenderIterator.prototype.each = function (cb) {
            var obj = this.obj, out = [], key, len, x;
            if (typeof obj !== 'object')
                return;
            if (obj instanceof Array) {
                len = obj.length;
                for (x = 0; x < len; x += 1) {
                    out.push(cb(obj[x], x));
                }
            }
            else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        out.push(cb(obj[key], key));
                    }
                }
            }
            return out.join('');
        };
        return RenderIterator;
    })();
    Meeo.Helpers.create('if', function (condition, whenTrue, whenFalse) {
        var cond = new Conditional(condition, whenTrue, whenFalse);
        return cond;
    });
    Meeo.Helpers.create('unless', function (condition, whenTrue, whenFalse) {
        var cond = new Conditional(!condition, whenTrue, whenFalse);
        return cond;
    });
    Meeo.Helpers.create('repeat', function (obj, cb) {
        return (new RenderIterator(obj)).each(cb);
    });
    Meeo.Helpers.create('forelse', function (obj, whenNotEmpty, whenEmpty) {
        var out, key;
        out = {
            hasOwnToStringMethod: true,
            obj: obj,
            output: '',
            isEmpty: true,
            then: function (callback) {
                if (!this.isEmpty) {
                    this.output = (new RenderIterator(this.obj)).each(callback);
                }
                return this;
            },
            empty: function (callback) {
                if (this.isEmpty) {
                    this.output = callback();
                }
                return this.toString();
            },
            toString: function () {
                return this.output;
            }
        };
        if (typeof obj === 'object') {
            if (obj instanceof Array) {
                out.isEmpty = (obj.length > 0) ? false : out.isEmpty;
            }
            else {
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
        }
        else {
            whenNotEmpty && out.then(whenNotEmpty);
        }
        return out;
    });
    Meeo.Helpers.create('escape', function (str) {
        var text, map;
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
    Meeo.Helpers.create('classes', function (obj) {
        var key, out = [];
        for (key in obj) {
            if (obj.hasOwnProperty(key) && obj[key]) {
                out.push(key);
            }
        }
        return out.join('');
    });
})(Meeo || (Meeo = {}));

//# sourceMappingURL=meeo.js.map
