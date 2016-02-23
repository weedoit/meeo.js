/// <reference path="elements.ts" />

module Meeo {

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


    HTML5Elements.map(function(element) {
        Meeo.Elements.create(element);
    });

}