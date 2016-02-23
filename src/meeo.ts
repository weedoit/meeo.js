declare interface Window {
    _: any;
    meeo: Function;
}

module Meeo {
    export var methods: any = {};

    var meeo: Function = function (cb: Function) {
        var res: any = cb(Meeo.methods);

        if (res instanceof Array) {
            res = res.join('');
        }

        return res;
    };

    // No conflict
    window.meeo = meeo;
    window._ = window._ || meeo;
}