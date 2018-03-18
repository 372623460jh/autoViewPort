/**
 * Created by jianghe on 2017/12/19.
 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px;
 * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
 */
;(function defineAutoViewPort(global, factory) {
    //初始化Vu
    var AutoViewPort = factory(global);
    if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
        global.AutoViewPort = AutoViewPort;
        module.exports = AutoViewPort; // CommonJS
    } else {
        global.AutoViewPort = AutoViewPort;
    }
})(window, function (global, undefined) {
    'use strict';
    var win = global;
    return function (baseFontSize, fontscale) {
        var _baseFontSize = baseFontSize || 100;
        var _fontscale = fontscale || 1;
        var doc = win.document;
        // userAgent 属性是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值。.
        var ua = navigator.userAgent;
        var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
        var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
        var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
        // appVersion 属性可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
        var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
        var dpr = win.devicePixelRatio || 1;
        if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
            // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
            dpr = 1;
        }
        //缩放比例
        var scale = 1 / dpr;
        /**
         * 设置html字体大小rem
         * @type {string}
         */
        var fontSize = 0;
        if (window.screen.width) {
            fontSize = window.screen.width * dpr / 10;
        } else {
            fontSize = _baseFontSize / 2 * dpr * _fontscale;
        }
        doc.documentElement.style.fontSize = fontSize + 'px';

        /**
         * 根据dpr设置视口缩放比例
         * @type {Element}
         */
        var metaEl = doc.querySelector('meta[name="viewport"]');
        if (!metaEl) {
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            doc.head.appendChild(metaEl);
        }
        metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);

        return {
            htmlFontSize: fontSize
        }
    }
});