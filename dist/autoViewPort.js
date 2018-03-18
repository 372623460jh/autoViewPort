;(function defineAutoViewPort(global, factory) {
    var AutoViewPort = factory(global);
    if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
        global.AutoViewPort = AutoViewPort;
        module.exports = AutoViewPort
    } else {
        global.AutoViewPort = AutoViewPort
    }
})(window, function (global, undefined) {
    'use strict';
    var win = global;
    return function (baseFontSize, fontscale) {
        var _baseFontSize = baseFontSize || 100;
        var _fontscale = fontscale || 1;
        var doc = win.document;
        var ua = navigator.userAgent;
        var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
        var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
        var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
        var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
        var dpr = win.devicePixelRatio || 1;
        if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
            dpr = 1
        }
        var scale = 1 / dpr;
        var fontSize = 0;
        if (window.screen.width) {
            fontSize = window.screen.width * dpr / 10
        } else {
            fontSize = _baseFontSize / 2 * dpr * _fontscale
        }
        doc.documentElement.style.fontSize = fontSize + 'px';
        var metaEl = doc.querySelector('meta[name="viewport"]');
        if (!metaEl) {
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            doc.head.appendChild(metaEl)
        }
        metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
        return {htmlFontSize: fontSize}
    }
});