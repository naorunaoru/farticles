
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
    'use strict';

    const { min: min$4, max: max$4 } = Math;

    var limit = (x, low = 0, high = 1) => {
        return min$4(max$4(low, x), high);
    };

    var clip_rgb = (rgb) => {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for (let i = 0; i <= 3; i++) {
            if (i < 3) {
                if (rgb[i] < 0 || rgb[i] > 255) rgb._clipped = true;
                rgb[i] = limit(rgb[i], 0, 255);
            } else if (i === 3) {
                rgb[i] = limit(rgb[i], 0, 1);
            }
        }
        return rgb;
    };

    // ported from jQuery's $.type
    const classToType = {};
    for (let name of [
        'Boolean',
        'Number',
        'String',
        'Function',
        'Array',
        'Date',
        'RegExp',
        'Undefined',
        'Null'
    ]) {
        classToType[`[object ${name}]`] = name.toLowerCase();
    }
    function type (obj) {
        return classToType[Object.prototype.toString.call(obj)] || 'object';
    }

    var unpack = (args, keyOrder = null) => {
        // if called with more than 3 arguments, we return the arguments
        if (args.length >= 3) return Array.prototype.slice.call(args);
        // with less than 3 args we check if first arg is object
        // and use the keyOrder string to extract and sort properties
        if (type(args[0]) == 'object' && keyOrder) {
            return keyOrder
                .split('')
                .filter((k) => args[0][k] !== undefined)
                .map((k) => args[0][k]);
        }
        // otherwise we just return the first argument
        // (which we suppose is an array of args)
        return args[0].slice(0);
    };

    var last = (args) => {
        if (args.length < 2) return null;
        const l = args.length - 1;
        if (type(args[l]) == 'string') return args[l].toLowerCase();
        return null;
    };

    const { PI: PI$2, min: min$3, max: max$3 } = Math;

    const rnd2 = (a) => Math.round(a * 100) / 100;
    const rnd3 = (a) => Math.round(a * 100) / 100;

    const TWOPI = PI$2 * 2;
    const PITHIRD = PI$2 / 3;
    const DEG2RAD = PI$2 / 180;
    const RAD2DEG = 180 / PI$2;

    /**
     * Reverse the first three elements of an array
     *
     * @param {any[]} arr
     * @returns {any[]}
     */
    function reverse3(arr) {
        return [...arr.slice(0, 3).reverse(), ...arr.slice(3)];
    }

    var input = {
        format: {},
        autodetect: []
    };

    class Color {
        constructor(...args) {
            const me = this;
            if (
                type(args[0]) === 'object' &&
                args[0].constructor &&
                args[0].constructor === this.constructor
            ) {
                // the argument is already a Color instance
                return args[0];
            }
            // last argument could be the mode
            let mode = last(args);
            let autodetect = false;
            if (!mode) {
                autodetect = true;

                if (!input.sorted) {
                    input.autodetect = input.autodetect.sort((a, b) => b.p - a.p);
                    input.sorted = true;
                }

                // auto-detect format
                for (let chk of input.autodetect) {
                    mode = chk.test(...args);
                    if (mode) break;
                }
            }
            if (input.format[mode]) {
                const rgb = input.format[mode].apply(
                    null,
                    autodetect ? args : args.slice(0, -1)
                );
                me._rgb = clip_rgb(rgb);
            } else {
                throw new Error('unknown format: ' + args);
            }
            // add alpha channel
            if (me._rgb.length === 3) me._rgb.push(1);
        }
        toString() {
            if (type(this.hex) == 'function') return this.hex();
            return `[${this._rgb.join(',')}]`;
        }
    }

    // this gets updated automatically
    const version = '3.1.2';

    const chroma = (...args) => {
        return new Color(...args);
    };

    chroma.version = version;

    /**
    	X11 color names

    	http://www.w3.org/TR/css3-color/#svg-color
    */

    const w3cx11 = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        laserlemon: '#ffff54',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrod: '#fafad2',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        maroon2: '#7f0000',
        maroon3: '#b03060',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        purple2: '#7f007f',
        purple3: '#a020f0',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    };

    const RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

    const hex2rgb = (hex) => {
        if (hex.match(RE_HEX)) {
            // remove optional leading #
            if (hex.length === 4 || hex.length === 7) {
                hex = hex.substr(1);
            }
            // expand short-notation to full six-digit
            if (hex.length === 3) {
                hex = hex.split('');
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            const u = parseInt(hex, 16);
            const r = u >> 16;
            const g = (u >> 8) & 0xff;
            const b = u & 0xff;
            return [r, g, b, 1];
        }

        // match rgba hex format, eg #FF000077
        if (hex.match(RE_HEXA)) {
            if (hex.length === 5 || hex.length === 9) {
                // remove optional leading #
                hex = hex.substr(1);
            }
            // expand short-notation to full eight-digit
            if (hex.length === 4) {
                hex = hex.split('');
                hex =
                    hex[0] +
                    hex[0] +
                    hex[1] +
                    hex[1] +
                    hex[2] +
                    hex[2] +
                    hex[3] +
                    hex[3];
            }
            const u = parseInt(hex, 16);
            const r = (u >> 24) & 0xff;
            const g = (u >> 16) & 0xff;
            const b = (u >> 8) & 0xff;
            const a = Math.round(((u & 0xff) / 0xff) * 100) / 100;
            return [r, g, b, a];
        }

        // we used to check for css colors here
        // if _input.css? and rgb = _input.css hex
        //     return rgb

        throw new Error(`unknown hex color: ${hex}`);
    };

    const { round: round$5 } = Math;

    const rgb2hex = (...args) => {
        let [r, g, b, a] = unpack(args, 'rgba');
        let mode = last(args) || 'auto';
        if (a === undefined) a = 1;
        if (mode === 'auto') {
            mode = a < 1 ? 'rgba' : 'rgb';
        }
        r = round$5(r);
        g = round$5(g);
        b = round$5(b);
        const u = (r << 16) | (g << 8) | b;
        let str = '000000' + u.toString(16); //#.toUpperCase();
        str = str.substr(str.length - 6);
        let hxa = '0' + round$5(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch (mode.toLowerCase()) {
            case 'rgba':
                return `#${str}${hxa}`;
            case 'argb':
                return `#${hxa}${str}`;
            default:
                return `#${str}`;
        }
    };

    Color.prototype.name = function () {
        const hex = rgb2hex(this._rgb, 'rgb');
        for (let n of Object.keys(w3cx11)) {
            if (w3cx11[n] === hex) return n.toLowerCase();
        }
        return hex;
    };

    input.format.named = (name) => {
        name = name.toLowerCase();
        if (w3cx11[name]) return hex2rgb(w3cx11[name]);
        throw new Error('unknown color name: ' + name);
    };

    input.autodetect.push({
        p: 5,
        test: (h, ...rest) => {
            if (!rest.length && type(h) === 'string' && w3cx11[h.toLowerCase()]) {
                return 'named';
            }
        }
    });

    Color.prototype.alpha = function (a, mutate = false) {
        if (a !== undefined && type(a) === 'number') {
            if (mutate) {
                this._rgb[3] = a;
                return this;
            }
            return new Color([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
        }
        return this._rgb[3];
    };

    Color.prototype.clipped = function () {
        return this._rgb._clipped || false;
    };

    const labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,

        // D65 standard referent
        labWhitePoint: 'd65',
        Xn: 0.95047,
        Yn: 1,
        Zn: 1.08883,

        t0: 0.137931034, // 4 / 29
        t1: 0.206896552, // 6 / 29
        t2: 0.12841855, // 3 * t1 * t1
        t3: 0.008856452, // t1 * t1 * t1,

        kE: 216.0 / 24389.0,
        kKE: 8.0,
        kK: 24389.0 / 27.0,

        RefWhiteRGB: {
            // sRGB
            X: 0.95047,
            Y: 1,
            Z: 1.08883
        },

        MtxRGB2XYZ: {
            m00: 0.4124564390896922,
            m01: 0.21267285140562253,
            m02: 0.0193338955823293,
            m10: 0.357576077643909,
            m11: 0.715152155287818,
            m12: 0.11919202588130297,
            m20: 0.18043748326639894,
            m21: 0.07217499330655958,
            m22: 0.9503040785363679
        },

        MtxXYZ2RGB: {
            m00: 3.2404541621141045,
            m01: -0.9692660305051868,
            m02: 0.055643430959114726,
            m10: -1.5371385127977166,
            m11: 1.8760108454466942,
            m12: -0.2040259135167538,
            m20: -0.498531409556016,
            m21: 0.041556017530349834,
            m22: 1.0572251882231791
        },

        // used in rgb2xyz
        As: 0.9414285350000001,
        Bs: 1.040417467,
        Cs: 1.089532651,

        MtxAdaptMa: {
            m00: 0.8951,
            m01: -0.7502,
            m02: 0.0389,
            m10: 0.2664,
            m11: 1.7135,
            m12: -0.0685,
            m20: -0.1614,
            m21: 0.0367,
            m22: 1.0296
        },

        MtxAdaptMaI: {
            m00: 0.9869929054667123,
            m01: 0.43230526972339456,
            m02: -0.008528664575177328,
            m10: -0.14705425642099013,
            m11: 0.5183602715367776,
            m12: 0.04004282165408487,
            m20: 0.15996265166373125,
            m21: 0.0492912282128556,
            m22: 0.9684866957875502
        }
    };

    // taken from https://de.mathworks.com/help/images/ref/whitepoint.html
    const ILLUMINANTS = new Map([
        // ASTM E308-01
        ['a', [1.0985, 0.35585]],
        // Wyszecki & Stiles, p. 769
        ['b', [1.0985, 0.35585]],
        // C ASTM E308-01
        ['c', [0.98074, 1.18232]],
        // D50 (ASTM E308-01)
        ['d50', [0.96422, 0.82521]],
        // D55 (ASTM E308-01)
        ['d55', [0.95682, 0.92149]],
        // D65 (ASTM E308-01)
        ['d65', [0.95047, 1.08883]],
        // E (ASTM E308-01)
        ['e', [1, 1, 1]],
        // F2 (ASTM E308-01)
        ['f2', [0.99186, 0.67393]],
        // F7 (ASTM E308-01)
        ['f7', [0.95041, 1.08747]],
        // F11 (ASTM E308-01)
        ['f11', [1.00962, 0.6435]],
        ['icc', [0.96422, 0.82521]]
    ]);

    function setLabWhitePoint(name) {
        const ill = ILLUMINANTS.get(String(name).toLowerCase());
        if (!ill) {
            throw new Error('unknown Lab illuminant ' + name);
        }
        labConstants.labWhitePoint = name;
        labConstants.Xn = ill[0];
        labConstants.Zn = ill[1];
    }

    function getLabWhitePoint() {
        return labConstants.labWhitePoint;
    }

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    const lab2rgb = (...args) => {
        args = unpack(args, 'lab');
        const [L, a, b] = args;
        const [x, y, z] = lab2xyz(L, a, b);
        const [r, g, b_] = xyz2rgb(x, y, z);
        return [r, g, b_, args.length > 3 ? args[3] : 1];
    };

    const lab2xyz = (L, a, b) => {
        const { kE, kK, kKE, Xn, Yn, Zn } = labConstants;

        const fy = (L + 16.0) / 116.0;
        const fx = 0.002 * a + fy;
        const fz = fy - 0.005 * b;

        const fx3 = fx * fx * fx;
        const fz3 = fz * fz * fz;

        const xr = fx3 > kE ? fx3 : (116.0 * fx - 16.0) / kK;
        const yr = L > kKE ? Math.pow((L + 16.0) / 116.0, 3.0) : L / kK;
        const zr = fz3 > kE ? fz3 : (116.0 * fz - 16.0) / kK;

        const x = xr * Xn;
        const y = yr * Yn;
        const z = zr * Zn;

        return [x, y, z];
    };

    const compand = (linear) => {
        /* sRGB */
        const sign = Math.sign(linear);
        linear = Math.abs(linear);
        return (
            (linear <= 0.0031308
                ? linear * 12.92
                : 1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055) * sign
        );
    };

    const xyz2rgb = (x, y, z) => {
        const { MtxAdaptMa, MtxAdaptMaI, MtxXYZ2RGB, RefWhiteRGB, Xn, Yn, Zn } =
            labConstants;

        const As = Xn * MtxAdaptMa.m00 + Yn * MtxAdaptMa.m10 + Zn * MtxAdaptMa.m20;
        const Bs = Xn * MtxAdaptMa.m01 + Yn * MtxAdaptMa.m11 + Zn * MtxAdaptMa.m21;
        const Cs = Xn * MtxAdaptMa.m02 + Yn * MtxAdaptMa.m12 + Zn * MtxAdaptMa.m22;

        const Ad =
            RefWhiteRGB.X * MtxAdaptMa.m00 +
            RefWhiteRGB.Y * MtxAdaptMa.m10 +
            RefWhiteRGB.Z * MtxAdaptMa.m20;
        const Bd =
            RefWhiteRGB.X * MtxAdaptMa.m01 +
            RefWhiteRGB.Y * MtxAdaptMa.m11 +
            RefWhiteRGB.Z * MtxAdaptMa.m21;
        const Cd =
            RefWhiteRGB.X * MtxAdaptMa.m02 +
            RefWhiteRGB.Y * MtxAdaptMa.m12 +
            RefWhiteRGB.Z * MtxAdaptMa.m22;

        const X1 =
            (x * MtxAdaptMa.m00 + y * MtxAdaptMa.m10 + z * MtxAdaptMa.m20) *
            (Ad / As);
        const Y1 =
            (x * MtxAdaptMa.m01 + y * MtxAdaptMa.m11 + z * MtxAdaptMa.m21) *
            (Bd / Bs);
        const Z1 =
            (x * MtxAdaptMa.m02 + y * MtxAdaptMa.m12 + z * MtxAdaptMa.m22) *
            (Cd / Cs);

        const X2 =
            X1 * MtxAdaptMaI.m00 + Y1 * MtxAdaptMaI.m10 + Z1 * MtxAdaptMaI.m20;
        const Y2 =
            X1 * MtxAdaptMaI.m01 + Y1 * MtxAdaptMaI.m11 + Z1 * MtxAdaptMaI.m21;
        const Z2 =
            X1 * MtxAdaptMaI.m02 + Y1 * MtxAdaptMaI.m12 + Z1 * MtxAdaptMaI.m22;

        const r = compand(
            X2 * MtxXYZ2RGB.m00 + Y2 * MtxXYZ2RGB.m10 + Z2 * MtxXYZ2RGB.m20
        );
        const g = compand(
            X2 * MtxXYZ2RGB.m01 + Y2 * MtxXYZ2RGB.m11 + Z2 * MtxXYZ2RGB.m21
        );
        const b = compand(
            X2 * MtxXYZ2RGB.m02 + Y2 * MtxXYZ2RGB.m12 + Z2 * MtxXYZ2RGB.m22
        );

        return [r * 255, g * 255, b * 255];
    };

    const rgb2lab = (...args) => {
        const [r, g, b, ...rest] = unpack(args, 'rgb');
        const [x, y, z] = rgb2xyz(r, g, b);
        const [L, a, b_] = xyz2lab(x, y, z);
        return [L, a, b_, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
    };

    function xyz2lab(x, y, z) {
        const { Xn, Yn, Zn, kE, kK } = labConstants;
        const xr = x / Xn;
        const yr = y / Yn;
        const zr = z / Zn;

        const fx = xr > kE ? Math.pow(xr, 1.0 / 3.0) : (kK * xr + 16.0) / 116.0;
        const fy = yr > kE ? Math.pow(yr, 1.0 / 3.0) : (kK * yr + 16.0) / 116.0;
        const fz = zr > kE ? Math.pow(zr, 1.0 / 3.0) : (kK * zr + 16.0) / 116.0;

        return [116.0 * fy - 16.0, 500.0 * (fx - fy), 200.0 * (fy - fz)];
    }

    function gammaAdjustSRGB(companded) {
        const sign = Math.sign(companded);
        companded = Math.abs(companded);
        const linear =
            companded <= 0.04045
                ? companded / 12.92
                : Math.pow((companded + 0.055) / 1.055, 2.4);
        return linear * sign;
    }

    const rgb2xyz = (r, g, b) => {
        // normalize and gamma adjust
        r = gammaAdjustSRGB(r / 255);
        g = gammaAdjustSRGB(g / 255);
        b = gammaAdjustSRGB(b / 255);

        const { MtxRGB2XYZ, MtxAdaptMa, MtxAdaptMaI, Xn, Yn, Zn, As, Bs, Cs } =
            labConstants;

        let x = r * MtxRGB2XYZ.m00 + g * MtxRGB2XYZ.m10 + b * MtxRGB2XYZ.m20;
        let y = r * MtxRGB2XYZ.m01 + g * MtxRGB2XYZ.m11 + b * MtxRGB2XYZ.m21;
        let z = r * MtxRGB2XYZ.m02 + g * MtxRGB2XYZ.m12 + b * MtxRGB2XYZ.m22;

        const Ad = Xn * MtxAdaptMa.m00 + Yn * MtxAdaptMa.m10 + Zn * MtxAdaptMa.m20;
        const Bd = Xn * MtxAdaptMa.m01 + Yn * MtxAdaptMa.m11 + Zn * MtxAdaptMa.m21;
        const Cd = Xn * MtxAdaptMa.m02 + Yn * MtxAdaptMa.m12 + Zn * MtxAdaptMa.m22;

        let X = x * MtxAdaptMa.m00 + y * MtxAdaptMa.m10 + z * MtxAdaptMa.m20;
        let Y = x * MtxAdaptMa.m01 + y * MtxAdaptMa.m11 + z * MtxAdaptMa.m21;
        let Z = x * MtxAdaptMa.m02 + y * MtxAdaptMa.m12 + z * MtxAdaptMa.m22;

        X *= Ad / As;
        Y *= Bd / Bs;
        Z *= Cd / Cs;

        x = X * MtxAdaptMaI.m00 + Y * MtxAdaptMaI.m10 + Z * MtxAdaptMaI.m20;
        y = X * MtxAdaptMaI.m01 + Y * MtxAdaptMaI.m11 + Z * MtxAdaptMaI.m21;
        z = X * MtxAdaptMaI.m02 + Y * MtxAdaptMaI.m12 + Z * MtxAdaptMaI.m22;

        return [x, y, z];
    };

    Color.prototype.lab = function () {
        return rgb2lab(this._rgb);
    };

    const lab$1 = (...args) => new Color(...args, 'lab');
    Object.assign(chroma, { lab: lab$1, getLabWhitePoint, setLabWhitePoint });

    input.format.lab = lab2rgb;

    input.autodetect.push({
        p: 2,
        test: (...args) => {
            args = unpack(args, 'lab');
            if (type(args) === 'array' && args.length === 3) {
                return 'lab';
            }
        }
    });

    Color.prototype.darken = function (amount = 1) {
        const me = this;
        const lab = me.lab();
        lab[0] -= labConstants.Kn * amount;
        return new Color(lab, 'lab').alpha(me.alpha(), true);
    };

    Color.prototype.brighten = function (amount = 1) {
        return this.darken(-amount);
    };

    Color.prototype.darker = Color.prototype.darken;
    Color.prototype.brighter = Color.prototype.brighten;

    Color.prototype.get = function (mc) {
        const [mode, channel] = mc.split('.');
        const src = this[mode]();
        if (channel) {
            const i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
            if (i > -1) return src[i];
            throw new Error(`unknown channel ${channel} in mode ${mode}`);
        } else {
            return src;
        }
    };

    const { pow: pow$6 } = Math;

    const EPS = 1e-7;
    const MAX_ITER = 20;

    Color.prototype.luminance = function (lum, mode = 'rgb') {
        if (lum !== undefined && type(lum) === 'number') {
            if (lum === 0) {
                // return pure black
                return new Color([0, 0, 0, this._rgb[3]], 'rgb');
            }
            if (lum === 1) {
                // return pure white
                return new Color([255, 255, 255, this._rgb[3]], 'rgb');
            }
            // compute new color using...
            let cur_lum = this.luminance();
            let max_iter = MAX_ITER;

            const test = (low, high) => {
                const mid = low.interpolate(high, 0.5, mode);
                const lm = mid.luminance();
                if (Math.abs(lum - lm) < EPS || !max_iter--) {
                    // close enough
                    return mid;
                }
                return lm > lum ? test(low, mid) : test(mid, high);
            };

            const rgb = (
                cur_lum > lum
                    ? test(new Color([0, 0, 0]), this)
                    : test(this, new Color([255, 255, 255]))
            ).rgb();
            return new Color([...rgb, this._rgb[3]]);
        }
        return rgb2luminance(...this._rgb.slice(0, 3));
    };

    const rgb2luminance = (r, g, b) => {
        // relative luminance
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const luminance_x = (x) => {
        x /= 255;
        return x <= 0.03928 ? x / 12.92 : pow$6((x + 0.055) / 1.055, 2.4);
    };

    var index = {};

    var mix = (col1, col2, f = 0.5, ...rest) => {
        let mode = rest[0] || 'lrgb';
        if (!index[mode] && !rest.length) {
            // fall back to the first supported mode
            mode = Object.keys(index)[0];
        }
        if (!index[mode]) {
            throw new Error(`interpolation mode ${mode} is not defined`);
        }
        if (type(col1) !== 'object') col1 = new Color(col1);
        if (type(col2) !== 'object') col2 = new Color(col2);
        return index[mode](col1, col2, f).alpha(
            col1.alpha() + f * (col2.alpha() - col1.alpha())
        );
    };

    Color.prototype.mix = Color.prototype.interpolate = function (
        col2,
        f = 0.5,
        ...rest
    ) {
        return mix(this, col2, f, ...rest);
    };

    Color.prototype.premultiply = function (mutate = false) {
        const rgb = this._rgb;
        const a = rgb[3];
        if (mutate) {
            this._rgb = [rgb[0] * a, rgb[1] * a, rgb[2] * a, a];
            return this;
        } else {
            return new Color([rgb[0] * a, rgb[1] * a, rgb[2] * a, a], 'rgb');
        }
    };

    const { sin: sin$3, cos: cos$4 } = Math;

    const lch2lab = (...args) => {
        /*
        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
        These formulas were invented by David Dalrymple to obtain maximum contrast without going
        out of gamut if the parameters are in the range 0-1.

        A saturation multiplier was added by Gregor Aisch
        */
        let [l, c, h] = unpack(args, 'lch');
        if (isNaN(h)) h = 0;
        h = h * DEG2RAD;
        return [l, cos$4(h) * c, sin$3(h) * c];
    };

    const lch2rgb = (...args) => {
        args = unpack(args, 'lch');
        const [l, c, h] = args;
        const [L, a, b_] = lch2lab(l, c, h);
        const [r, g, b] = lab2rgb(L, a, b_);
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    const hcl2rgb = (...args) => {
        const hcl = reverse3(unpack(args, 'hcl'));
        return lch2rgb(...hcl);
    };

    const { sqrt: sqrt$4, atan2: atan2$2, round: round$4 } = Math;

    const lab2lch = (...args) => {
        const [l, a, b] = unpack(args, 'lab');
        const c = sqrt$4(a * a + b * b);
        let h = (atan2$2(b, a) * RAD2DEG + 360) % 360;
        if (round$4(c * 10000) === 0) h = Number.NaN;
        return [l, c, h];
    };

    const rgb2lch = (...args) => {
        const [r, g, b, ...rest] = unpack(args, 'rgb');
        const [l, a, b_] = rgb2lab(r, g, b);
        const [L, c, h] = lab2lch(l, a, b_);
        return [L, c, h, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
    };

    Color.prototype.lch = function () {
        return rgb2lch(this._rgb);
    };
    Color.prototype.hcl = function () {
        return reverse3(rgb2lch(this._rgb));
    };

    const lch$1 = (...args) => new Color(...args, 'lch');
    const hcl = (...args) => new Color(...args, 'hcl');

    Object.assign(chroma, { lch: lch$1, hcl });

    input.format.lch = lch2rgb;
    input.format.hcl = hcl2rgb;
    ['lch', 'hcl'].forEach((m) =>
        input.autodetect.push({
            p: 2,
            test: (...args) => {
                args = unpack(args, m);
                if (type(args) === 'array' && args.length === 3) {
                    return m;
                }
            }
        })
    );

    Color.prototype.saturate = function (amount = 1) {
        const me = this;
        const lch = me.lch();
        lch[1] += labConstants.Kn * amount;
        if (lch[1] < 0) lch[1] = 0;
        return new Color(lch, 'lch').alpha(me.alpha(), true);
    };

    Color.prototype.desaturate = function (amount = 1) {
        return this.saturate(-amount);
    };

    Color.prototype.set = function (mc, value, mutate = false) {
        const [mode, channel] = mc.split('.');
        const src = this[mode]();
        if (channel) {
            const i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
            if (i > -1) {
                if (type(value) == 'string') {
                    switch (value.charAt(0)) {
                        case '+':
                            src[i] += +value;
                            break;
                        case '-':
                            src[i] += +value;
                            break;
                        case '*':
                            src[i] *= +value.substr(1);
                            break;
                        case '/':
                            src[i] /= +value.substr(1);
                            break;
                        default:
                            src[i] = +value;
                    }
                } else if (type(value) === 'number') {
                    src[i] = value;
                } else {
                    throw new Error(`unsupported value for Color.set`);
                }
                const out = new Color(src, mode);
                if (mutate) {
                    this._rgb = out._rgb;
                    return this;
                }
                return out;
            }
            throw new Error(`unknown channel ${channel} in mode ${mode}`);
        } else {
            return src;
        }
    };

    Color.prototype.tint = function (f = 0.5, ...rest) {
        return mix(this, 'white', f, ...rest);
    };

    Color.prototype.shade = function (f = 0.5, ...rest) {
        return mix(this, 'black', f, ...rest);
    };

    const rgb$1 = (col1, col2, f) => {
        const xyz0 = col1._rgb;
        const xyz1 = col2._rgb;
        return new Color(
            xyz0[0] + f * (xyz1[0] - xyz0[0]),
            xyz0[1] + f * (xyz1[1] - xyz0[1]),
            xyz0[2] + f * (xyz1[2] - xyz0[2]),
            'rgb'
        );
    };

    // register interpolator
    index.rgb = rgb$1;

    const { sqrt: sqrt$3, pow: pow$5 } = Math;

    const lrgb = (col1, col2, f) => {
        const [x1, y1, z1] = col1._rgb;
        const [x2, y2, z2] = col2._rgb;
        return new Color(
            sqrt$3(pow$5(x1, 2) * (1 - f) + pow$5(x2, 2) * f),
            sqrt$3(pow$5(y1, 2) * (1 - f) + pow$5(y2, 2) * f),
            sqrt$3(pow$5(z1, 2) * (1 - f) + pow$5(z2, 2) * f),
            'rgb'
        );
    };

    // register interpolator
    index.lrgb = lrgb;

    const lab = (col1, col2, f) => {
        const xyz0 = col1.lab();
        const xyz1 = col2.lab();
        return new Color(
            xyz0[0] + f * (xyz1[0] - xyz0[0]),
            xyz0[1] + f * (xyz1[1] - xyz0[1]),
            xyz0[2] + f * (xyz1[2] - xyz0[2]),
            'lab'
        );
    };

    // register interpolator
    index.lab = lab;

    var interpolate_hsx = (col1, col2, f, m) => {
        let xyz0, xyz1;
        if (m === 'hsl') {
            xyz0 = col1.hsl();
            xyz1 = col2.hsl();
        } else if (m === 'hsv') {
            xyz0 = col1.hsv();
            xyz1 = col2.hsv();
        } else if (m === 'hcg') {
            xyz0 = col1.hcg();
            xyz1 = col2.hcg();
        } else if (m === 'hsi') {
            xyz0 = col1.hsi();
            xyz1 = col2.hsi();
        } else if (m === 'lch' || m === 'hcl') {
            m = 'hcl';
            xyz0 = col1.hcl();
            xyz1 = col2.hcl();
        } else if (m === 'oklch') {
            xyz0 = col1.oklch().reverse();
            xyz1 = col2.oklch().reverse();
        }

        let hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === 'h' || m === 'oklch') {
            [hue0, sat0, lbv0] = xyz0;
            [hue1, sat1, lbv1] = xyz1;
        }

        let sat, hue, lbv, dh;

        if (!isNaN(hue0) && !isNaN(hue1)) {
            // both colors have hue
            if (hue1 > hue0 && hue1 - hue0 > 180) {
                dh = hue1 - (hue0 + 360);
            } else if (hue1 < hue0 && hue0 - hue1 > 180) {
                dh = hue1 + 360 - hue0;
            } else {
                dh = hue1 - hue0;
            }
            hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
            hue = hue0;
            if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') sat = sat0;
        } else if (!isNaN(hue1)) {
            hue = hue1;
            if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') sat = sat1;
        } else {
            hue = Number.NaN;
        }

        if (sat === undefined) sat = sat0 + f * (sat1 - sat0);
        lbv = lbv0 + f * (lbv1 - lbv0);
        return m === 'oklch'
            ? new Color([lbv, sat, hue], m)
            : new Color([hue, sat, lbv], m);
    };

    const lch = (col1, col2, f) => {
        return interpolate_hsx(col1, col2, f, 'lch');
    };

    // register interpolator
    index.lch = lch;
    index.hcl = lch;

    const num2rgb = (num) => {
        if (type(num) == 'number' && num >= 0 && num <= 0xffffff) {
            const r = num >> 16;
            const g = (num >> 8) & 0xff;
            const b = num & 0xff;
            return [r, g, b, 1];
        }
        throw new Error('unknown num color: ' + num);
    };

    const rgb2num = (...args) => {
        const [r, g, b] = unpack(args, 'rgb');
        return (r << 16) + (g << 8) + b;
    };

    Color.prototype.num = function () {
        return rgb2num(this._rgb);
    };

    const num$1 = (...args) => new Color(...args, 'num');

    Object.assign(chroma, { num: num$1 });

    input.format.num = num2rgb;

    input.autodetect.push({
        p: 5,
        test: (...args) => {
            if (
                args.length === 1 &&
                type(args[0]) === 'number' &&
                args[0] >= 0 &&
                args[0] <= 0xffffff
            ) {
                return 'num';
            }
        }
    });

    const num = (col1, col2, f) => {
        const c1 = col1.num();
        const c2 = col2.num();
        return new Color(c1 + f * (c2 - c1), 'num');
    };

    // register interpolator
    index.num = num;

    const { floor: floor$3 } = Math;

    /*
     * this is basically just HSV with some minor tweaks
     *
     * hue.. [0..360]
     * chroma .. [0..1]
     * grayness .. [0..1]
     */

    const hcg2rgb = (...args) => {
        args = unpack(args, 'hcg');
        let [h, c, _g] = args;
        let r, g, b;
        _g = _g * 255;
        const _c = c * 255;
        if (c === 0) {
            r = g = b = _g;
        } else {
            if (h === 360) h = 0;
            if (h > 360) h -= 360;
            if (h < 0) h += 360;
            h /= 60;
            const i = floor$3(h);
            const f = h - i;
            const p = _g * (1 - c);
            const q = p + _c * (1 - f);
            const t = p + _c * f;
            const v = p + _c;
            switch (i) {
                case 0:
                    [r, g, b] = [v, t, p];
                    break;
                case 1:
                    [r, g, b] = [q, v, p];
                    break;
                case 2:
                    [r, g, b] = [p, v, t];
                    break;
                case 3:
                    [r, g, b] = [p, q, v];
                    break;
                case 4:
                    [r, g, b] = [t, p, v];
                    break;
                case 5:
                    [r, g, b] = [v, p, q];
                    break;
            }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    const rgb2hcg = (...args) => {
        const [r, g, b] = unpack(args, 'rgb');
        const minRgb = min$3(r, g, b);
        const maxRgb = max$3(r, g, b);
        const delta = maxRgb - minRgb;
        const c = (delta * 100) / 255;
        const _g = (minRgb / (255 - delta)) * 100;
        let h;
        if (delta === 0) {
            h = Number.NaN;
        } else {
            if (r === maxRgb) h = (g - b) / delta;
            if (g === maxRgb) h = 2 + (b - r) / delta;
            if (b === maxRgb) h = 4 + (r - g) / delta;
            h *= 60;
            if (h < 0) h += 360;
        }
        return [h, c, _g];
    };

    Color.prototype.hcg = function () {
        return rgb2hcg(this._rgb);
    };

    const hcg$1 = (...args) => new Color(...args, 'hcg');
    chroma.hcg = hcg$1;

    input.format.hcg = hcg2rgb;

    input.autodetect.push({
        p: 1,
        test: (...args) => {
            args = unpack(args, 'hcg');
            if (type(args) === 'array' && args.length === 3) {
                return 'hcg';
            }
        }
    });

    const hcg = (col1, col2, f) => {
        return interpolate_hsx(col1, col2, f, 'hcg');
    };

    // register interpolator
    index.hcg = hcg;

    const { cos: cos$3 } = Math;

    /*
     * hue [0..360]
     * saturation [0..1]
     * intensity [0..1]
     */
    const hsi2rgb = (...args) => {
        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
        */
        args = unpack(args, 'hsi');
        let [h, s, i] = args;
        let r, g, b;

        if (isNaN(h)) h = 0;
        if (isNaN(s)) s = 0;
        // normalize hue
        if (h > 360) h -= 360;
        if (h < 0) h += 360;
        h /= 360;
        if (h < 1 / 3) {
            b = (1 - s) / 3;
            r = (1 + (s * cos$3(TWOPI * h)) / cos$3(PITHIRD - TWOPI * h)) / 3;
            g = 1 - (b + r);
        } else if (h < 2 / 3) {
            h -= 1 / 3;
            r = (1 - s) / 3;
            g = (1 + (s * cos$3(TWOPI * h)) / cos$3(PITHIRD - TWOPI * h)) / 3;
            b = 1 - (r + g);
        } else {
            h -= 2 / 3;
            g = (1 - s) / 3;
            b = (1 + (s * cos$3(TWOPI * h)) / cos$3(PITHIRD - TWOPI * h)) / 3;
            r = 1 - (g + b);
        }
        r = limit(i * r * 3);
        g = limit(i * g * 3);
        b = limit(i * b * 3);
        return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
    };

    const { min: min$2, sqrt: sqrt$2, acos } = Math;

    const rgb2hsi = (...args) => {
        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
        */
        let [r, g, b] = unpack(args, 'rgb');
        r /= 255;
        g /= 255;
        b /= 255;
        let h;
        const min_ = min$2(r, g, b);
        const i = (r + g + b) / 3;
        const s = i > 0 ? 1 - min_ / i : 0;
        if (s === 0) {
            h = NaN;
        } else {
            h = (r - g + (r - b)) / 2;
            h /= sqrt$2((r - g) * (r - g) + (r - b) * (g - b));
            h = acos(h);
            if (b > g) {
                h = TWOPI - h;
            }
            h /= TWOPI;
        }
        return [h * 360, s, i];
    };

    Color.prototype.hsi = function () {
        return rgb2hsi(this._rgb);
    };

    const hsi$1 = (...args) => new Color(...args, 'hsi');
    chroma.hsi = hsi$1;

    input.format.hsi = hsi2rgb;

    input.autodetect.push({
        p: 2,
        test: (...args) => {
            args = unpack(args, 'hsi');
            if (type(args) === 'array' && args.length === 3) {
                return 'hsi';
            }
        }
    });

    const hsi = (col1, col2, f) => {
        return interpolate_hsx(col1, col2, f, 'hsi');
    };

    // register interpolator
    index.hsi = hsi;

    const hsl2rgb = (...args) => {
        args = unpack(args, 'hsl');
        const [h, s, l] = args;
        let r, g, b;
        if (s === 0) {
            r = g = b = l * 255;
        } else {
            const t3 = [0, 0, 0];
            const c = [0, 0, 0];
            const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const t1 = 2 * l - t2;
            const h_ = h / 360;
            t3[0] = h_ + 1 / 3;
            t3[1] = h_;
            t3[2] = h_ - 1 / 3;
            for (let i = 0; i < 3; i++) {
                if (t3[i] < 0) t3[i] += 1;
                if (t3[i] > 1) t3[i] -= 1;
                if (6 * t3[i] < 1) c[i] = t1 + (t2 - t1) * 6 * t3[i];
                else if (2 * t3[i] < 1) c[i] = t2;
                else if (3 * t3[i] < 2) c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
                else c[i] = t1;
            }
            [r, g, b] = [c[0] * 255, c[1] * 255, c[2] * 255];
        }
        if (args.length > 3) {
            // keep alpha channel
            return [r, g, b, args[3]];
        }
        return [r, g, b, 1];
    };

    /*
     * supported arguments:
     * - rgb2hsl(r,g,b)
     * - rgb2hsl(r,g,b,a)
     * - rgb2hsl([r,g,b])
     * - rgb2hsl([r,g,b,a])
     * - rgb2hsl({r,g,b,a})
     */
    const rgb2hsl$1 = (...args) => {
        args = unpack(args, 'rgba');
        let [r, g, b] = args;

        r /= 255;
        g /= 255;
        b /= 255;

        const minRgb = min$3(r, g, b);
        const maxRgb = max$3(r, g, b);

        const l = (maxRgb + minRgb) / 2;
        let s, h;

        if (maxRgb === minRgb) {
            s = 0;
            h = Number.NaN;
        } else {
            s =
                l < 0.5
                    ? (maxRgb - minRgb) / (maxRgb + minRgb)
                    : (maxRgb - minRgb) / (2 - maxRgb - minRgb);
        }

        if (r == maxRgb) h = (g - b) / (maxRgb - minRgb);
        else if (g == maxRgb) h = 2 + (b - r) / (maxRgb - minRgb);
        else if (b == maxRgb) h = 4 + (r - g) / (maxRgb - minRgb);

        h *= 60;
        if (h < 0) h += 360;
        if (args.length > 3 && args[3] !== undefined) return [h, s, l, args[3]];
        return [h, s, l];
    };

    Color.prototype.hsl = function () {
        return rgb2hsl$1(this._rgb);
    };

    const hsl$1 = (...args) => new Color(...args, 'hsl');
    chroma.hsl = hsl$1;

    input.format.hsl = hsl2rgb;

    input.autodetect.push({
        p: 2,
        test: (...args) => {
            args = unpack(args, 'hsl');
            if (type(args) === 'array' && args.length === 3) {
                return 'hsl';
            }
        }
    });

    const hsl = (col1, col2, f) => {
        return interpolate_hsx(col1, col2, f, 'hsl');
    };

    // register interpolator
    index.hsl = hsl;

    const { floor: floor$2 } = Math;

    const hsv2rgb = (...args) => {
        args = unpack(args, 'hsv');
        let [h, s, v] = args;
        let r, g, b;
        v *= 255;
        if (s === 0) {
            r = g = b = v;
        } else {
            if (h === 360) h = 0;
            if (h > 360) h -= 360;
            if (h < 0) h += 360;
            h /= 60;

            const i = floor$2(h);
            const f = h - i;
            const p = v * (1 - s);
            const q = v * (1 - s * f);
            const t = v * (1 - s * (1 - f));

            switch (i) {
                case 0:
                    [r, g, b] = [v, t, p];
                    break;
                case 1:
                    [r, g, b] = [q, v, p];
                    break;
                case 2:
                    [r, g, b] = [p, v, t];
                    break;
                case 3:
                    [r, g, b] = [p, q, v];
                    break;
                case 4:
                    [r, g, b] = [t, p, v];
                    break;
                case 5:
                    [r, g, b] = [v, p, q];
                    break;
            }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    const { min: min$1, max: max$2 } = Math;

    /*
     * supported arguments:
     * - rgb2hsv(r,g,b)
     * - rgb2hsv([r,g,b])
     * - rgb2hsv({r,g,b})
     */
    const rgb2hsl = (...args) => {
        args = unpack(args, 'rgb');
        let [r, g, b] = args;
        const min_ = min$1(r, g, b);
        const max_ = max$2(r, g, b);
        const delta = max_ - min_;
        let h, s, v;
        v = max_ / 255.0;
        if (max_ === 0) {
            h = Number.NaN;
            s = 0;
        } else {
            s = delta / max_;
            if (r === max_) h = (g - b) / delta;
            if (g === max_) h = 2 + (b - r) / delta;
            if (b === max_) h = 4 + (r - g) / delta;
            h *= 60;
            if (h < 0) h += 360;
        }
        return [h, s, v];
    };

    Color.prototype.hsv = function () {
        return rgb2hsl(this._rgb);
    };

    const hsv$1 = (...args) => new Color(...args, 'hsv');
    chroma.hsv = hsv$1;

    input.format.hsv = hsv2rgb;

    input.autodetect.push({
        p: 2,
        test: (...args) => {
            args = unpack(args, 'hsv');
            if (type(args) === 'array' && args.length === 3) {
                return 'hsv';
            }
        }
    });

    const hsv = (col1, col2, f) => {
        return interpolate_hsx(col1, col2, f, 'hsv');
    };

    // register interpolator
    index.hsv = hsv;

    // from https://www.w3.org/TR/css-color-4/multiply-matrices.js
    function multiplyMatrices(A, B) {
        let m = A.length;

        if (!Array.isArray(A[0])) {
            // A is vector, convert to [[a, b, c, ...]]
            A = [A];
        }

        if (!Array.isArray(B[0])) {
            // B is vector, convert to [[a], [b], [c], ...]]
            B = B.map((x) => [x]);
        }

        let p = B[0].length;
        let B_cols = B[0].map((_, i) => B.map((x) => x[i])); // transpose B
        let product = A.map((row) =>
            B_cols.map((col) => {
                if (!Array.isArray(row)) {
                    return col.reduce((a, c) => a + c * row, 0);
                }

                return row.reduce((a, c, i) => a + c * (col[i] || 0), 0);
            })
        );

        if (m === 1) {
            product = product[0]; // Avoid [[a, b, c, ...]]
        }

        if (p === 1) {
            return product.map((x) => x[0]); // Avoid [[a], [b], [c], ...]]
        }

        return product;
    }

    const oklab2rgb = (...args) => {
        args = unpack(args, 'lab');
        const [L, a, b, ...rest] = args;
        const [X, Y, Z] = OKLab_to_XYZ([L, a, b]);
        const [r, g, b_] = xyz2rgb(X, Y, Z);
        return [r, g, b_, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
    };

    // from https://www.w3.org/TR/css-color-4/#color-conversion-code
    function OKLab_to_XYZ(OKLab) {
        // Given OKLab, convert to XYZ relative to D65
        var LMStoXYZ = [
            [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
            [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
            [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816]
        ];
        var OKLabtoLMS = [
            [1.0, 0.3963377773761749, 0.2158037573099136],
            [1.0, -0.1055613458156586, -0.0638541728258133],
            [1.0, -0.0894841775298119, -1.2914855480194092]
        ];

        var LMSnl = multiplyMatrices(OKLabtoLMS, OKLab);
        return multiplyMatrices(
            LMStoXYZ,
            LMSnl.map((c) => c ** 3)
        );
    }

    const rgb2oklab = (...args) => {
        const [r, g, b, ...rest] = unpack(args, 'rgb');
        const xyz = rgb2xyz(r, g, b);
        const oklab = XYZ_to_OKLab(xyz);
        return [...oklab, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
    };

    // from https://www.w3.org/TR/css-color-4/#color-conversion-code
    function XYZ_to_OKLab(XYZ) {
        // Given XYZ relative to D65, convert to OKLab
        const XYZtoLMS = [
            [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
            [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
            [0.0481771893596242, 0.2642395317527308, 0.6335478284694309]
        ];
        const LMStoOKLab = [
            [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
            [1.9779985324311684, -2.4285922420485799, 0.450593709617411],
            [0.0259040424655478, 0.7827717124575296, -0.8086757549230774]
        ];

        const LMS = multiplyMatrices(XYZtoLMS, XYZ);
        // JavaScript Math.cbrt returns a sign-matched cube root
        // beware if porting to other languages
        // especially if tempted to use a general power function
        return multiplyMatrices(
            LMStoOKLab,
            LMS.map((c) => Math.cbrt(c))
        );
        // L in range [0,1]. For use in CSS, multiply by 100 and add a percent
    }

    Color.prototype.oklab = function () {
        return rgb2oklab(this._rgb);
    };

    const oklab$1 = (...args) => new Color(...args, 'oklab');
    Object.assign(chroma, { oklab: oklab$1 });

    input.format.oklab = oklab2rgb;

    input.autodetect.push({
        p: 2,
        test: (...args) => {
            args = unpack(args, 'oklab');
            if (type(args) === 'array' && args.length === 3) {
                return 'oklab';
            }
        }
    });

    const oklab = (col1, col2, f) => {
        const xyz0 = col1.oklab();
        const xyz1 = col2.oklab();
        return new Color(
            xyz0[0] + f * (xyz1[0] - xyz0[0]),
            xyz0[1] + f * (xyz1[1] - xyz0[1]),
            xyz0[2] + f * (xyz1[2] - xyz0[2]),
            'oklab'
        );
    };

    // register interpolator
    index.oklab = oklab;

    const oklch$1 = (col1, col2, f) => {
        return interpolate_hsx(col1, col2, f, 'oklch');
    };

    // register interpolator
    index.oklch = oklch$1;

    const { pow: pow$4, sqrt: sqrt$1, PI: PI$1, cos: cos$2, sin: sin$2, atan2: atan2$1 } = Math;

    var average = (colors, mode = 'lrgb', weights = null) => {
        const l = colors.length;
        if (!weights) weights = Array.from(new Array(l)).map(() => 1);
        // normalize weights
        const k =
            l /
            weights.reduce(function (a, b) {
                return a + b;
            });
        weights.forEach((w, i) => {
            weights[i] *= k;
        });
        // convert colors to Color objects
        colors = colors.map((c) => new Color(c));
        if (mode === 'lrgb') {
            return _average_lrgb(colors, weights);
        }
        const first = colors.shift();
        const xyz = first.get(mode);
        const cnt = [];
        let dx = 0;
        let dy = 0;
        // initial color
        for (let i = 0; i < xyz.length; i++) {
            xyz[i] = (xyz[i] || 0) * weights[0];
            cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
            if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
                const A = (xyz[i] / 180) * PI$1;
                dx += cos$2(A) * weights[0];
                dy += sin$2(A) * weights[0];
            }
        }

        let alpha = first.alpha() * weights[0];
        colors.forEach((c, ci) => {
            const xyz2 = c.get(mode);
            alpha += c.alpha() * weights[ci + 1];
            for (let i = 0; i < xyz.length; i++) {
                if (!isNaN(xyz2[i])) {
                    cnt[i] += weights[ci + 1];
                    if (mode.charAt(i) === 'h') {
                        const A = (xyz2[i] / 180) * PI$1;
                        dx += cos$2(A) * weights[ci + 1];
                        dy += sin$2(A) * weights[ci + 1];
                    } else {
                        xyz[i] += xyz2[i] * weights[ci + 1];
                    }
                }
            }
        });

        for (let i = 0; i < xyz.length; i++) {
            if (mode.charAt(i) === 'h') {
                let A = (atan2$1(dy / cnt[i], dx / cnt[i]) / PI$1) * 180;
                while (A < 0) A += 360;
                while (A >= 360) A -= 360;
                xyz[i] = A;
            } else {
                xyz[i] = xyz[i] / cnt[i];
            }
        }
        alpha /= l;
        return new Color(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };

    const _average_lrgb = (colors, weights) => {
        const l = colors.length;
        const xyz = [0, 0, 0, 0];
        for (let i = 0; i < colors.length; i++) {
            const col = colors[i];
            const f = weights[i] / l;
            const rgb = col._rgb;
            xyz[0] += pow$4(rgb[0], 2) * f;
            xyz[1] += pow$4(rgb[1], 2) * f;
            xyz[2] += pow$4(rgb[2], 2) * f;
            xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt$1(xyz[0]);
        xyz[1] = sqrt$1(xyz[1]);
        xyz[2] = sqrt$1(xyz[2]);
        if (xyz[3] > 0.9999999) xyz[3] = 1;
        return new Color(clip_rgb(xyz));
    };

    // minimal multi-purpose interface


    const { pow: pow$3 } = Math;

    function scale (colors) {
        // constructor
        let _mode = 'rgb';
        let _nacol = chroma('#ccc');
        let _spread = 0;
        // const _fixed = false;
        let _domain = [0, 1];
        let _pos = [];
        let _padding = [0, 0];
        let _classes = false;
        let _colors = [];
        let _out = false;
        let _min = 0;
        let _max = 1;
        let _correctLightness = false;
        let _colorCache = {};
        let _useCache = true;
        let _gamma = 1;

        // private methods

        const setColors = function (colors) {
            colors = colors || ['#fff', '#000'];
            if (
                colors &&
                type(colors) === 'string' &&
                chroma.brewer &&
                chroma.brewer[colors.toLowerCase()]
            ) {
                colors = chroma.brewer[colors.toLowerCase()];
            }
            if (type(colors) === 'array') {
                // handle single color
                if (colors.length === 1) {
                    colors = [colors[0], colors[0]];
                }
                // make a copy of the colors
                colors = colors.slice(0);
                // convert to chroma classes
                for (let c = 0; c < colors.length; c++) {
                    colors[c] = chroma(colors[c]);
                }
                // auto-fill color position
                _pos.length = 0;
                for (let c = 0; c < colors.length; c++) {
                    _pos.push(c / (colors.length - 1));
                }
            }
            resetCache();
            return (_colors = colors);
        };

        const getClass = function (value) {
            if (_classes != null) {
                const n = _classes.length - 1;
                let i = 0;
                while (i < n && value >= _classes[i]) {
                    i++;
                }
                return i - 1;
            }
            return 0;
        };

        let tMapLightness = (t) => t;
        let tMapDomain = (t) => t;

        // const classifyValue = function(value) {
        //     let val = value;
        //     if (_classes.length > 2) {
        //         const n = _classes.length-1;
        //         const i = getClass(value);
        //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
        //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
        //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
        //     }
        //     return val;
        // };

        const getColor = function (val, bypassMap) {
            let col, t;
            if (bypassMap == null) {
                bypassMap = false;
            }
            if (isNaN(val) || val === null) {
                return _nacol;
            }
            if (!bypassMap) {
                if (_classes && _classes.length > 2) {
                    // find the class
                    const c = getClass(val);
                    t = c / (_classes.length - 2);
                } else if (_max !== _min) {
                    // just interpolate between min/max
                    t = (val - _min) / (_max - _min);
                } else {
                    t = 1;
                }
            } else {
                t = val;
            }

            // domain map
            t = tMapDomain(t);

            if (!bypassMap) {
                t = tMapLightness(t); // lightness correction
            }

            if (_gamma !== 1) {
                t = pow$3(t, _gamma);
            }

            t = _padding[0] + t * (1 - _padding[0] - _padding[1]);

            t = limit(t, 0, 1);

            const k = Math.floor(t * 10000);

            if (_useCache && _colorCache[k]) {
                col = _colorCache[k];
            } else {
                if (type(_colors) === 'array') {
                    //for i in [0.._pos.length-1]
                    for (let i = 0; i < _pos.length; i++) {
                        const p = _pos[i];
                        if (t <= p) {
                            col = _colors[i];
                            break;
                        }
                        if (t >= p && i === _pos.length - 1) {
                            col = _colors[i];
                            break;
                        }
                        if (t > p && t < _pos[i + 1]) {
                            t = (t - p) / (_pos[i + 1] - p);
                            col = chroma.interpolate(
                                _colors[i],
                                _colors[i + 1],
                                t,
                                _mode
                            );
                            break;
                        }
                    }
                } else if (type(_colors) === 'function') {
                    col = _colors(t);
                }
                if (_useCache) {
                    _colorCache[k] = col;
                }
            }
            return col;
        };

        var resetCache = () => (_colorCache = {});

        setColors(colors);

        // public interface

        const f = function (v) {
            const c = chroma(getColor(v));
            if (_out && c[_out]) {
                return c[_out]();
            } else {
                return c;
            }
        };

        f.classes = function (classes) {
            if (classes != null) {
                if (type(classes) === 'array') {
                    _classes = classes;
                    _domain = [classes[0], classes[classes.length - 1]];
                } else {
                    const d = chroma.analyze(_domain);
                    if (classes === 0) {
                        _classes = [d.min, d.max];
                    } else {
                        _classes = chroma.limits(d, 'e', classes);
                    }
                }
                return f;
            }
            return _classes;
        };

        f.domain = function (domain) {
            if (!arguments.length) {
                return _domain;
            }
            _min = domain[0];
            _max = domain[domain.length - 1];
            _pos = [];
            const k = _colors.length;
            if (domain.length === k && _min !== _max) {
                // update positions
                for (let d of Array.from(domain)) {
                    _pos.push((d - _min) / (_max - _min));
                }
            } else {
                for (let c = 0; c < k; c++) {
                    _pos.push(c / (k - 1));
                }
                if (domain.length > 2) {
                    // set domain map
                    const tOut = domain.map((d, i) => i / (domain.length - 1));
                    const tBreaks = domain.map((d) => (d - _min) / (_max - _min));
                    if (!tBreaks.every((val, i) => tOut[i] === val)) {
                        tMapDomain = (t) => {
                            if (t <= 0 || t >= 1) return t;
                            let i = 0;
                            while (t >= tBreaks[i + 1]) i++;
                            const f =
                                (t - tBreaks[i]) / (tBreaks[i + 1] - tBreaks[i]);
                            const out = tOut[i] + f * (tOut[i + 1] - tOut[i]);
                            return out;
                        };
                    }
                }
            }
            _domain = [_min, _max];
            return f;
        };

        f.mode = function (_m) {
            if (!arguments.length) {
                return _mode;
            }
            _mode = _m;
            resetCache();
            return f;
        };

        f.range = function (colors, _pos) {
            setColors(colors);
            return f;
        };

        f.out = function (_o) {
            _out = _o;
            return f;
        };

        f.spread = function (val) {
            if (!arguments.length) {
                return _spread;
            }
            _spread = val;
            return f;
        };

        f.correctLightness = function (v) {
            if (v == null) {
                v = true;
            }
            _correctLightness = v;
            resetCache();
            if (_correctLightness) {
                tMapLightness = function (t) {
                    const L0 = getColor(0, true).lab()[0];
                    const L1 = getColor(1, true).lab()[0];
                    const pol = L0 > L1;
                    let L_actual = getColor(t, true).lab()[0];
                    const L_ideal = L0 + (L1 - L0) * t;
                    let L_diff = L_actual - L_ideal;
                    let t0 = 0;
                    let t1 = 1;
                    let max_iter = 20;
                    while (Math.abs(L_diff) > 1e-2 && max_iter-- > 0) {
                        (function () {
                            if (pol) {
                                L_diff *= -1;
                            }
                            if (L_diff < 0) {
                                t0 = t;
                                t += (t1 - t) * 0.5;
                            } else {
                                t1 = t;
                                t += (t0 - t) * 0.5;
                            }
                            L_actual = getColor(t, true).lab()[0];
                            return (L_diff = L_actual - L_ideal);
                        })();
                    }
                    return t;
                };
            } else {
                tMapLightness = (t) => t;
            }
            return f;
        };

        f.padding = function (p) {
            if (p != null) {
                if (type(p) === 'number') {
                    p = [p, p];
                }
                _padding = p;
                return f;
            } else {
                return _padding;
            }
        };

        f.colors = function (numColors, out) {
            // If no arguments are given, return the original colors that were provided
            if (arguments.length < 2) {
                out = 'hex';
            }
            let result = [];

            if (arguments.length === 0) {
                result = _colors.slice(0);
            } else if (numColors === 1) {
                result = [f(0.5)];
            } else if (numColors > 1) {
                const dm = _domain[0];
                const dd = _domain[1] - dm;
                result = __range__(0, numColors).map((i) =>
                    f(dm + (i / (numColors - 1)) * dd)
                );
            } else {
                // returns all colors based on the defined classes
                colors = [];
                let samples = [];
                if (_classes && _classes.length > 2) {
                    for (
                        let i = 1, end = _classes.length, asc = 1 <= end;
                        asc ? i < end : i > end;
                        asc ? i++ : i--
                    ) {
                        samples.push((_classes[i - 1] + _classes[i]) * 0.5);
                    }
                } else {
                    samples = _domain;
                }
                result = samples.map((v) => f(v));
            }

            if (chroma[out]) {
                result = result.map((c) => c[out]());
            }
            return result;
        };

        f.cache = function (c) {
            if (c != null) {
                _useCache = c;
                return f;
            } else {
                return _useCache;
            }
        };

        f.gamma = function (g) {
            if (g != null) {
                _gamma = g;
                return f;
            } else {
                return _gamma;
            }
        };

        f.nodata = function (d) {
            if (d != null) {
                _nacol = chroma(d);
                return f;
            } else {
                return _nacol;
            }
        };

        return f;
    }

    function __range__(left, right, inclusive) {
        let range = [];
        let ascending = left < right;
        let end = right ;
        for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
            range.push(i);
        }
        return range;
    }

    //
    // interpolates between a set of colors uzing a bezier spline
    //


    // nth row of the pascal triangle
    const binom_row = function (n) {
        let row = [1, 1];
        for (let i = 1; i < n; i++) {
            let newrow = [1];
            for (let j = 1; j <= row.length; j++) {
                newrow[j] = (row[j] || 0) + row[j - 1];
            }
            row = newrow;
        }
        return row;
    };

    const bezier = function (colors) {
        let I, lab0, lab1, lab2;
        colors = colors.map((c) => new Color(c));
        if (colors.length === 2) {
            // linear interpolation
            [lab0, lab1] = colors.map((c) => c.lab());
            I = function (t) {
                const lab = [0, 1, 2].map((i) => lab0[i] + t * (lab1[i] - lab0[i]));
                return new Color(lab, 'lab');
            };
        } else if (colors.length === 3) {
            // quadratic bezier interpolation
            [lab0, lab1, lab2] = colors.map((c) => c.lab());
            I = function (t) {
                const lab = [0, 1, 2].map(
                    (i) =>
                        (1 - t) * (1 - t) * lab0[i] +
                        2 * (1 - t) * t * lab1[i] +
                        t * t * lab2[i]
                );
                return new Color(lab, 'lab');
            };
        } else if (colors.length === 4) {
            // cubic bezier interpolation
            let lab3;
            [lab0, lab1, lab2, lab3] = colors.map((c) => c.lab());
            I = function (t) {
                const lab = [0, 1, 2].map(
                    (i) =>
                        (1 - t) * (1 - t) * (1 - t) * lab0[i] +
                        3 * (1 - t) * (1 - t) * t * lab1[i] +
                        3 * (1 - t) * t * t * lab2[i] +
                        t * t * t * lab3[i]
                );
                return new Color(lab, 'lab');
            };
        } else if (colors.length >= 5) {
            // general case (degree n bezier)
            let labs, row, n;
            labs = colors.map((c) => c.lab());
            n = colors.length - 1;
            row = binom_row(n);
            I = function (t) {
                const u = 1 - t;
                const lab = [0, 1, 2].map((i) =>
                    labs.reduce(
                        (sum, el, j) =>
                            sum + row[j] * u ** (n - j) * t ** j * el[i],
                        0
                    )
                );
                return new Color(lab, 'lab');
            };
        } else {
            throw new RangeError('No point in running bezier with only one color.');
        }
        return I;
    };

    var bezier$1 = (colors) => {
        const f = bezier(colors);
        f.scale = () => scale(f);
        return f;
    };

    const { round: round$3 } = Math;

    Color.prototype.rgb = function (rnd = true) {
        if (rnd === false) return this._rgb.slice(0, 3);
        return this._rgb.slice(0, 3).map(round$3);
    };

    Color.prototype.rgba = function (rnd = true) {
        return this._rgb.slice(0, 4).map((v, i) => {
            return i < 3 ? (rnd === false ? v : round$3(v)) : v;
        });
    };

    const rgb = (...args) => new Color(...args, 'rgb');
    Object.assign(chroma, { rgb });

    input.format.rgb = (...args) => {
        const rgba = unpack(args, 'rgba');
        if (rgba[3] === undefined) rgba[3] = 1;
        return rgba;
    };

    input.autodetect.push({
        p: 3,
        test: (...args) => {
            args = unpack(args, 'rgba');
            if (
                type(args) === 'array' &&
                (args.length === 3 ||
                    (args.length === 4 &&
                        type(args[3]) == 'number' &&
                        args[3] >= 0 &&
                        args[3] <= 1))
            ) {
                return 'rgb';
            }
        }
    });

    /*
     * interpolates between a set of colors uzing a bezier spline
     * blend mode formulas taken from https://web.archive.org/web/20180110014946/http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
     */


    const blend = (bottom, top, mode) => {
        if (!blend[mode]) {
            throw new Error('unknown blend mode ' + mode);
        }
        return blend[mode](bottom, top);
    };

    const blend_f = (f) => (bottom, top) => {
        const c0 = chroma(top).rgb();
        const c1 = chroma(bottom).rgb();
        return chroma.rgb(f(c0, c1));
    };

    const each = (f) => (c0, c1) => {
        const out = [];
        out[0] = f(c0[0], c1[0]);
        out[1] = f(c0[1], c1[1]);
        out[2] = f(c0[2], c1[2]);
        return out;
    };

    const normal = (a) => a;
    const multiply = (a, b) => (a * b) / 255;
    const darken = (a, b) => (a > b ? b : a);
    const lighten = (a, b) => (a > b ? a : b);
    const screen = (a, b) => 255 * (1 - (1 - a / 255) * (1 - b / 255));
    const overlay = (a, b) =>
        b < 128 ? (2 * a * b) / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
    const burn = (a, b) => 255 * (1 - (1 - b / 255) / (a / 255));
    const dodge = (a, b) => {
        if (a === 255) return 255;
        a = (255 * (b / 255)) / (1 - a / 255);
        return a > 255 ? 255 : a;
    };

    // # add = (a,b) ->
    // #     if (a + b > 255) then 255 else a + b

    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));

    // cubehelix interpolation
    // based on D.A. Green "A colour scheme for the display of astronomical intensity images"
    // http://astron-soc.in/bulletin/11June/289392011.pdf
    const { pow: pow$2, sin: sin$1, cos: cos$1 } = Math;

    function cubehelix (
        start = 300,
        rotations = -1.5,
        hue = 1,
        gamma = 1,
        lightness = [0, 1]
    ) {
        let dh = 0,
            dl;
        if (type(lightness) === 'array') {
            dl = lightness[1] - lightness[0];
        } else {
            dl = 0;
            lightness = [lightness, lightness];
        }
        const f = function (fract) {
            const a = TWOPI * ((start + 120) / 360 + rotations * fract);
            const l = pow$2(lightness[0] + dl * fract, gamma);
            const h = dh !== 0 ? hue[0] + fract * dh : hue;
            const amp = (h * l * (1 - l)) / 2;
            const cos_a = cos$1(a);
            const sin_a = sin$1(a);
            const r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
            const g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
            const b = l + amp * (+1.97294 * cos_a);
            return chroma(clip_rgb([r * 255, g * 255, b * 255, 1]));
        };
        f.start = function (s) {
            if (s == null) {
                return start;
            }
            start = s;
            return f;
        };
        f.rotations = function (r) {
            if (r == null) {
                return rotations;
            }
            rotations = r;
            return f;
        };
        f.gamma = function (g) {
            if (g == null) {
                return gamma;
            }
            gamma = g;
            return f;
        };
        f.hue = function (h) {
            if (h == null) {
                return hue;
            }
            hue = h;
            if (type(hue) === 'array') {
                dh = hue[1] - hue[0];
                if (dh === 0) {
                    hue = hue[1];
                }
            } else {
                dh = 0;
            }
            return f;
        };
        f.lightness = function (h) {
            if (h == null) {
                return lightness;
            }
            if (type(h) === 'array') {
                lightness = h;
                dl = h[1] - h[0];
            } else {
                lightness = [h, h];
                dl = 0;
            }
            return f;
        };
        f.scale = () => chroma.scale(f);
        f.hue(hue);
        return f;
    }

    const digits = '0123456789abcdef';

    const { floor: floor$1, random } = Math;

    var random$1 = () => {
        let code = '#';
        for (let i = 0; i < 6; i++) {
            code += digits.charAt(floor$1(random() * 16));
        }
        return new Color(code, 'hex');
    };

    const { log: log$1, pow: pow$1, floor, abs: abs$1 } = Math;

    function analyze(data, key = null) {
        const r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE * -1,
            sum: 0,
            values: [],
            count: 0
        };
        if (type(data) === 'object') {
            data = Object.values(data);
        }
        data.forEach((val) => {
            if (key && type(val) === 'object') val = val[key];
            if (val !== undefined && val !== null && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) r.min = val;
                if (val > r.max) r.max = val;
                r.count += 1;
            }
        });

        r.domain = [r.min, r.max];

        r.limits = (mode, num) => limits(r, mode, num);

        return r;
    }

    function limits(data, mode = 'equal', num = 7) {
        if (type(data) == 'array') {
            data = analyze(data);
        }
        const { min, max } = data;
        const values = data.values.sort((a, b) => a - b);

        if (num === 1) {
            return [min, max];
        }

        const limits = [];

        if (mode.substr(0, 1) === 'c') {
            // continuous
            limits.push(min);
            limits.push(max);
        }

        if (mode.substr(0, 1) === 'e') {
            // equal interval
            limits.push(min);
            for (let i = 1; i < num; i++) {
                limits.push(min + (i / num) * (max - min));
            }
            limits.push(max);
        } else if (mode.substr(0, 1) === 'l') {
            // log scale
            if (min <= 0) {
                throw new Error(
                    'Logarithmic scales are only possible for values > 0'
                );
            }
            const min_log = Math.LOG10E * log$1(min);
            const max_log = Math.LOG10E * log$1(max);
            limits.push(min);
            for (let i = 1; i < num; i++) {
                limits.push(pow$1(10, min_log + (i / num) * (max_log - min_log)));
            }
            limits.push(max);
        } else if (mode.substr(0, 1) === 'q') {
            // quantile scale
            limits.push(min);
            for (let i = 1; i < num; i++) {
                const p = ((values.length - 1) * i) / num;
                const pb = floor(p);
                if (pb === p) {
                    limits.push(values[pb]);
                } else {
                    // p > pb
                    const pr = p - pb;
                    limits.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
                }
            }
            limits.push(max);
        } else if (mode.substr(0, 1) === 'k') {
            // k-means clustering
            /*
            implementation based on
            http://code.google.com/p/figue/source/browse/trunk/figue.js#336
            simplified for 1-d input values
            */
            let cluster;
            const n = values.length;
            const assignments = new Array(n);
            const clusterSizes = new Array(num);
            let repeat = true;
            let nb_iters = 0;
            let centroids = null;

            // get seed values
            centroids = [];
            centroids.push(min);
            for (let i = 1; i < num; i++) {
                centroids.push(min + (i / num) * (max - min));
            }
            centroids.push(max);

            while (repeat) {
                // assignment step
                for (let j = 0; j < num; j++) {
                    clusterSizes[j] = 0;
                }
                for (let i = 0; i < n; i++) {
                    const value = values[i];
                    let mindist = Number.MAX_VALUE;
                    let best;
                    for (let j = 0; j < num; j++) {
                        const dist = abs$1(centroids[j] - value);
                        if (dist < mindist) {
                            mindist = dist;
                            best = j;
                        }
                        clusterSizes[best]++;
                        assignments[i] = best;
                    }
                }

                // update centroids step
                const newCentroids = new Array(num);
                for (let j = 0; j < num; j++) {
                    newCentroids[j] = null;
                }
                for (let i = 0; i < n; i++) {
                    cluster = assignments[i];
                    if (newCentroids[cluster] === null) {
                        newCentroids[cluster] = values[i];
                    } else {
                        newCentroids[cluster] += values[i];
                    }
                }
                for (let j = 0; j < num; j++) {
                    newCentroids[j] *= 1 / clusterSizes[j];
                }

                // check convergence
                repeat = false;
                for (let j = 0; j < num; j++) {
                    if (newCentroids[j] !== centroids[j]) {
                        repeat = true;
                        break;
                    }
                }

                centroids = newCentroids;
                nb_iters++;

                if (nb_iters > 200) {
                    repeat = false;
                }
            }

            // finished k-means clustering
            // the next part is borrowed from gabrielflor.it
            const kClusters = {};
            for (let j = 0; j < num; j++) {
                kClusters[j] = [];
            }
            for (let i = 0; i < n; i++) {
                cluster = assignments[i];
                kClusters[cluster].push(values[i]);
            }
            let tmpKMeansBreaks = [];
            for (let j = 0; j < num; j++) {
                tmpKMeansBreaks.push(kClusters[j][0]);
                tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
            }
            tmpKMeansBreaks = tmpKMeansBreaks.sort((a, b) => a - b);
            limits.push(tmpKMeansBreaks[0]);
            for (let i = 1; i < tmpKMeansBreaks.length; i += 2) {
                const v = tmpKMeansBreaks[i];
                if (!isNaN(v) && limits.indexOf(v) === -1) {
                    limits.push(v);
                }
            }
        }
        return limits;
    }

    var contrast = (a, b) => {
        // WCAG contrast ratio
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        a = new Color(a);
        b = new Color(b);
        const l1 = a.luminance();
        const l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };

    /**
     * @license
     *
     * The APCA contrast prediction algorithm is based of the formulas published
     * in the APCA-1.0.98G specification by Myndex. The specification is available at:
     * https://raw.githubusercontent.com/Myndex/apca-w3/master/images/APCAw3_0.1.17_APCA0.0.98G.svg
     *
     * Note that the APCA implementation is still beta, so please update to
     * future versions of chroma.js when they become available.
     *
     * You can read more about the APCA Readability Criterion at
     * https://readtech.org/ARC/
     */

    // constants
    const W_offset = 0.027;
    const P_in = 0.0005;
    const P_out = 0.1;
    const R_scale = 1.14;
    const B_threshold = 0.022;
    const B_exp = 1.414;

    var contrastAPCA = (text, bg) => {
        // parse input colors
        text = new Color(text);
        bg = new Color(bg);
        // if text color has alpha, blend against background
        if (text.alpha() < 1) {
            text = mix(bg, text, text.alpha(), 'rgb');
        }
        const l_text = lum(...text.rgb());
        const l_bg = lum(...bg.rgb());

        // soft clamp black levels
        const Y_text =
            l_text >= B_threshold
                ? l_text
                : l_text + Math.pow(B_threshold - l_text, B_exp);
        const Y_bg =
            l_bg >= B_threshold ? l_bg : l_bg + Math.pow(B_threshold - l_bg, B_exp);

        // normal polarity (dark text on light background)
        const S_norm = Math.pow(Y_bg, 0.56) - Math.pow(Y_text, 0.57);
        // reverse polarity (light text on dark background)
        const S_rev = Math.pow(Y_bg, 0.65) - Math.pow(Y_text, 0.62);
        // clamp noise then scale
        const C =
            Math.abs(Y_bg - Y_text) < P_in
                ? 0
                : Y_text < Y_bg
                  ? S_norm * R_scale
                  : S_rev * R_scale;
        // clamp minimum contrast then offset
        const S_apc = Math.abs(C) < P_out ? 0 : C > 0 ? C - W_offset : C + W_offset;
        // scale to 100
        return S_apc * 100;
    };

    function lum(r, g, b) {
        return (
            0.2126729 * Math.pow(r / 255, 2.4) +
            0.7151522 * Math.pow(g / 255, 2.4) +
            0.072175 * Math.pow(b / 255, 2.4)
        );
    }

    const { sqrt, pow, min, max: max$1, atan2, abs, cos, sin, exp, PI } = Math;

    function deltaE (a, b, Kl = 1, Kc = 1, Kh = 1) {
        // Delta E (CIE 2000)
        // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
        var rad2deg = function (rad) {
            return (360 * rad) / (2 * PI);
        };
        var deg2rad = function (deg) {
            return (2 * PI * deg) / 360;
        };
        a = new Color(a);
        b = new Color(b);
        const [L1, a1, b1] = Array.from(a.lab());
        const [L2, a2, b2] = Array.from(b.lab());
        const avgL = (L1 + L2) / 2;
        const C1 = sqrt(pow(a1, 2) + pow(b1, 2));
        const C2 = sqrt(pow(a2, 2) + pow(b2, 2));
        const avgC = (C1 + C2) / 2;
        const G = 0.5 * (1 - sqrt(pow(avgC, 7) / (pow(avgC, 7) + pow(25, 7))));
        const a1p = a1 * (1 + G);
        const a2p = a2 * (1 + G);
        const C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
        const C2p = sqrt(pow(a2p, 2) + pow(b2, 2));
        const avgCp = (C1p + C2p) / 2;
        const arctan1 = rad2deg(atan2(b1, a1p));
        const arctan2 = rad2deg(atan2(b2, a2p));
        const h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
        const h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
        const avgHp =
            abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
        const T =
            1 -
            0.17 * cos(deg2rad(avgHp - 30)) +
            0.24 * cos(deg2rad(2 * avgHp)) +
            0.32 * cos(deg2rad(3 * avgHp + 6)) -
            0.2 * cos(deg2rad(4 * avgHp - 63));
        let deltaHp = h2p - h1p;
        deltaHp =
            abs(deltaHp) <= 180
                ? deltaHp
                : h2p <= h1p
                  ? deltaHp + 360
                  : deltaHp - 360;
        deltaHp = 2 * sqrt(C1p * C2p) * sin(deg2rad(deltaHp) / 2);
        const deltaL = L2 - L1;
        const deltaCp = C2p - C1p;
        const sl = 1 + (0.015 * pow(avgL - 50, 2)) / sqrt(20 + pow(avgL - 50, 2));
        const sc = 1 + 0.045 * avgCp;
        const sh = 1 + 0.015 * avgCp * T;
        const deltaTheta = 30 * exp(-pow((avgHp - 275) / 25, 2));
        const Rc = 2 * sqrt(pow(avgCp, 7) / (pow(avgCp, 7) + pow(25, 7)));
        const Rt = -Rc * sin(2 * deg2rad(deltaTheta));
        const result = sqrt(
            pow(deltaL / (Kl * sl), 2) +
                pow(deltaCp / (Kc * sc), 2) +
                pow(deltaHp / (Kh * sh), 2) +
                Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh))
        );
        return max$1(0, min(100, result));
    }

    // simple Euclidean distance
    function distance (a, b, mode = 'lab') {
        // Delta E (CIE 1976)
        // see http://www.brucelindbloom.com/index.html?Equations.html
        a = new Color(a);
        b = new Color(b);
        const l1 = a.get(mode);
        const l2 = b.get(mode);
        let sum_sq = 0;
        for (let i in l1) {
            const d = (l1[i] || 0) - (l2[i] || 0);
            sum_sq += d * d;
        }
        return Math.sqrt(sum_sq);
    }

    var valid = (...args) => {
        try {
            new Color(...args);
            return true;
            // eslint-disable-next-line
        } catch (e) {
            return false;
        }
    };

    // some pre-defined color scales:

    var scales = {
        cool() {
            return scale([chroma.hsl(180, 1, 0.9), chroma.hsl(250, 0.7, 0.4)]);
        },
        hot() {
            return scale(['#000', '#f00', '#ff0', '#fff']).mode(
                'rgb'
            );
        }
    };

    /**
        ColorBrewer colors for chroma.js

        Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
        Pennsylvania State University.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed
        under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
        CONDITIONS OF ANY KIND, either express or implied. See the License for the
        specific language governing permissions and limitations under the License.
    */

    const colorbrewer = {
        // sequential
        OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
        PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
        BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
        Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
        BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
        YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
        YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
        Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
        RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
        Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
        YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
        Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
        GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
        Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
        YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
        PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
        Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
        PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
        Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],

        // diverging
        Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
        RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
        RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
        PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
        PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
        RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
        BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
        RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
        PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

        // qualitative
        Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
        Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
        Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
        Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
        Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
        Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
        Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
        Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
    };

    const colorbrewerTypes = Object.keys(colorbrewer);
    const typeMap = new Map(colorbrewerTypes.map((key) => [key.toLowerCase(), key]));

    // use Proxy to allow case-insensitive access to palettes
    const colorbrewerProxy =
        typeof Proxy === 'function'
            ? new Proxy(colorbrewer, {
                  get(target, prop) {
                      const lower = prop.toLowerCase();
                      if (typeMap.has(lower)) {
                          return target[typeMap.get(lower)];
                      }
                  },
                  getOwnPropertyNames() {
                      return Object.getOwnPropertyNames(colorbrewerTypes);
                  }
              })
            : colorbrewer;

    const cmyk2rgb = (...args) => {
        args = unpack(args, 'cmyk');
        const [c, m, y, k] = args;
        const alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) return [0, 0, 0, alpha];
        return [
            c >= 1 ? 0 : 255 * (1 - c) * (1 - k), // r
            m >= 1 ? 0 : 255 * (1 - m) * (1 - k), // g
            y >= 1 ? 0 : 255 * (1 - y) * (1 - k), // b
            alpha
        ];
    };

    const { max } = Math;

    const rgb2cmyk = (...args) => {
        let [r, g, b] = unpack(args, 'rgb');
        r = r / 255;
        g = g / 255;
        b = b / 255;
        const k = 1 - max(r, max(g, b));
        const f = k < 1 ? 1 / (1 - k) : 0;
        const c = (1 - r - k) * f;
        const m = (1 - g - k) * f;
        const y = (1 - b - k) * f;
        return [c, m, y, k];
    };

    Color.prototype.cmyk = function () {
        return rgb2cmyk(this._rgb);
    };

    const cmyk = (...args) => new Color(...args, 'cmyk');
    Object.assign(chroma, { cmyk });

    input.format.cmyk = cmyk2rgb;

    input.autodetect.push({
        p: 2,
        test: (...args) => {
            args = unpack(args, 'cmyk');
            if (type(args) === 'array' && args.length === 4) {
                return 'cmyk';
            }
        }
    });

    /*
     * supported arguments:
     * - hsl2css(h,s,l)
     * - hsl2css(h,s,l,a)
     * - hsl2css([h,s,l], mode)
     * - hsl2css([h,s,l,a], mode)
     * - hsl2css({h,s,l,a}, mode)
     */
    const hsl2css = (...args) => {
        const hsla = unpack(args, 'hsla');
        let mode = last(args) || 'lsa';
        hsla[0] = rnd2(hsla[0] || 0) + 'deg';
        hsla[1] = rnd2(hsla[1] * 100) + '%';
        hsla[2] = rnd2(hsla[2] * 100) + '%';
        if (mode === 'hsla' || (hsla.length > 3 && hsla[3] < 1)) {
            hsla[3] = '/ ' + (hsla.length > 3 ? hsla[3] : 1);
            mode = 'hsla';
        } else {
            hsla.length = 3;
        }
        return `${mode.substr(0, 3)}(${hsla.join(' ')})`;
    };

    /*
     * supported arguments:
     * - lab2css(l,a,b)
     * - lab2css(l,a,b,alpha)
     * - lab2css([l,a,b], mode)
     * - lab2css([l,a,b,alpha], mode)
     */
    const lab2css = (...args) => {
        const laba = unpack(args, 'lab');
        let mode = last(args) || 'lab';
        laba[0] = rnd2(laba[0]) + '%';
        laba[1] = rnd2(laba[1]);
        laba[2] = rnd2(laba[2]);
        if (mode === 'laba' || (laba.length > 3 && laba[3] < 1)) {
            laba[3] = '/ ' + (laba.length > 3 ? laba[3] : 1);
        } else {
            laba.length = 3;
        }
        return `lab(${laba.join(' ')})`;
    };

    /*
     * supported arguments:
     * - lab2css(l,a,b)
     * - lab2css(l,a,b,alpha)
     * - lab2css([l,a,b], mode)
     * - lab2css([l,a,b,alpha], mode)
     */
    const lch2css = (...args) => {
        const lcha = unpack(args, 'lch');
        let mode = last(args) || 'lab';
        lcha[0] = rnd2(lcha[0]) + '%';
        lcha[1] = rnd2(lcha[1]);
        lcha[2] = isNaN(lcha[2]) ? 'none' : rnd2(lcha[2]) + 'deg'; // add deg unit to hue
        if (mode === 'lcha' || (lcha.length > 3 && lcha[3] < 1)) {
            lcha[3] = '/ ' + (lcha.length > 3 ? lcha[3] : 1);
        } else {
            lcha.length = 3;
        }
        return `lch(${lcha.join(' ')})`;
    };

    const oklab2css = (...args) => {
        const laba = unpack(args, 'lab');
        laba[0] = rnd2(laba[0] * 100) + '%';
        laba[1] = rnd3(laba[1]);
        laba[2] = rnd3(laba[2]);
        if (laba.length > 3 && laba[3] < 1) {
            laba[3] = '/ ' + (laba.length > 3 ? laba[3] : 1);
        } else {
            laba.length = 3;
        }
        return `oklab(${laba.join(' ')})`;
    };

    const rgb2oklch = (...args) => {
        const [r, g, b, ...rest] = unpack(args, 'rgb');
        const [l, a, b_] = rgb2oklab(r, g, b);
        const [L, c, h] = lab2lch(l, a, b_);
        return [L, c, h, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
    };

    const oklch2css = (...args) => {
        const lcha = unpack(args, 'lch');
        lcha[0] = rnd2(lcha[0] * 100) + '%';
        lcha[1] = rnd3(lcha[1]);
        lcha[2] = isNaN(lcha[2]) ? 'none' : rnd2(lcha[2]) + 'deg'; // add deg unit to hue
        if (lcha.length > 3 && lcha[3] < 1) {
            lcha[3] = '/ ' + (lcha.length > 3 ? lcha[3] : 1);
        } else {
            lcha.length = 3;
        }
        return `oklch(${lcha.join(' ')})`;
    };

    const { round: round$2 } = Math;

    /*
     * supported arguments:
     * - rgb2css(r,g,b)
     * - rgb2css(r,g,b,a)
     * - rgb2css([r,g,b], mode)
     * - rgb2css([r,g,b,a], mode)
     * - rgb2css({r,g,b,a}, mode)
     */
    const rgb2css = (...args) => {
        const rgba = unpack(args, 'rgba');
        let mode = last(args) || 'rgb';
        if (mode.substr(0, 3) === 'hsl') {
            return hsl2css(rgb2hsl$1(rgba), mode);
        }
        if (mode.substr(0, 3) === 'lab') {
            // change to D50 lab whitepoint since this is what W3C is using for CSS Lab colors
            const prevWhitePoint = getLabWhitePoint();
            setLabWhitePoint('d50');
            const cssColor = lab2css(rgb2lab(rgba), mode);
            setLabWhitePoint(prevWhitePoint);
            return cssColor;
        }
        if (mode.substr(0, 3) === 'lch') {
            // change to D50 lab whitepoint since this is what W3C is using for CSS Lab colors
            const prevWhitePoint = getLabWhitePoint();
            setLabWhitePoint('d50');
            const cssColor = lch2css(rgb2lch(rgba), mode);
            setLabWhitePoint(prevWhitePoint);
            return cssColor;
        }
        if (mode.substr(0, 5) === 'oklab') {
            return oklab2css(rgb2oklab(rgba));
        }
        if (mode.substr(0, 5) === 'oklch') {
            return oklch2css(rgb2oklch(rgba));
        }
        rgba[0] = round$2(rgba[0]);
        rgba[1] = round$2(rgba[1]);
        rgba[2] = round$2(rgba[2]);
        if (mode === 'rgba' || (rgba.length > 3 && rgba[3] < 1)) {
            rgba[3] = '/ ' + (rgba.length > 3 ? rgba[3] : 1);
            mode = 'rgba';
        }
        return `${mode.substr(0, 3)}(${rgba.slice(0, mode === 'rgb' ? 3 : 4).join(' ')})`;
    };

    const oklch2rgb = (...args) => {
        args = unpack(args, 'lch');
        const [l, c, h, ...rest] = args;
        const [L, a, b_] = lch2lab(l, c, h);
        const [r, g, b] = oklab2rgb(L, a, b_);
        return [r, g, b, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
    };

    const INT_OR_PCT = /((?:-?\d+)|(?:-?\d+(?:\.\d+)?)%|none)/.source;
    const FLOAT_OR_PCT = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%?)|none)/.source;
    const PCT = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%)|none)/.source;
    const RE_S = /\s*/.source;
    const SEP = /\s+/.source;
    const COMMA = /\s*,\s*/.source;
    const ANLGE = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)(?:deg)?)|none)/.source;
    const ALPHA = /\s*(?:\/\s*((?:[01]|[01]?\.\d+)|\d+(?:\.\d+)?%))?/.source;

    // e.g. rgb(250 20 0), rgb(100% 50% 20%), rgb(100% 50% 20% / 0.5)
    const RE_RGB = new RegExp(
        '^rgba?\\(' +
            RE_S +
            [INT_OR_PCT, INT_OR_PCT, INT_OR_PCT].join(SEP) +
            ALPHA +
            '\\)$'
    );
    const RE_RGB_LEGACY = new RegExp(
        '^rgb\\(' +
            RE_S +
            [INT_OR_PCT, INT_OR_PCT, INT_OR_PCT].join(COMMA) +
            RE_S +
            '\\)$'
    );
    const RE_RGBA_LEGACY = new RegExp(
        '^rgba\\(' +
            RE_S +
            [INT_OR_PCT, INT_OR_PCT, INT_OR_PCT, FLOAT_OR_PCT].join(COMMA) +
            RE_S +
            '\\)$'
    );

    const RE_HSL = new RegExp(
        '^hsla?\\(' + RE_S + [ANLGE, PCT, PCT].join(SEP) + ALPHA + '\\)$'
    );
    const RE_HSL_LEGACY = new RegExp(
        '^hsl?\\(' + RE_S + [ANLGE, PCT, PCT].join(COMMA) + RE_S + '\\)$'
    );
    const RE_HSLA_LEGACY =
        /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;

    const RE_LAB = new RegExp(
        '^lab\\(' +
            RE_S +
            [FLOAT_OR_PCT, FLOAT_OR_PCT, FLOAT_OR_PCT].join(SEP) +
            ALPHA +
            '\\)$'
    );
    const RE_LCH = new RegExp(
        '^lch\\(' +
            RE_S +
            [FLOAT_OR_PCT, FLOAT_OR_PCT, ANLGE].join(SEP) +
            ALPHA +
            '\\)$'
    );
    const RE_OKLAB = new RegExp(
        '^oklab\\(' +
            RE_S +
            [FLOAT_OR_PCT, FLOAT_OR_PCT, FLOAT_OR_PCT].join(SEP) +
            ALPHA +
            '\\)$'
    );
    const RE_OKLCH = new RegExp(
        '^oklch\\(' +
            RE_S +
            [FLOAT_OR_PCT, FLOAT_OR_PCT, ANLGE].join(SEP) +
            ALPHA +
            '\\)$'
    );

    const { round: round$1 } = Math;

    const roundRGB = (rgb) => {
        return rgb.map((v, i) => (i <= 2 ? limit(round$1(v), 0, 255) : v));
    };

    const percentToAbsolute = (pct, min = 0, max = 100, signed = false) => {
        if (typeof pct === 'string' && pct.endsWith('%')) {
            pct = parseFloat(pct.substring(0, pct.length - 1)) / 100;
            if (signed) {
                // signed percentages are in the range -100% to 100%
                pct = min + (pct + 1) * 0.5 * (max - min);
            } else {
                pct = min + pct * (max - min);
            }
        }
        return +pct;
    };

    const noneToValue = (v, noneValue) => {
        return v === 'none' ? noneValue : v;
    };

    const css2rgb = (css) => {
        css = css.toLowerCase().trim();

        if (css === 'transparent') {
            return [0, 0, 0, 0];
        }

        let m;

        if (input.format.named) {
            try {
                return input.format.named(css);
                // eslint-disable-next-line
            } catch (e) {}
        }

        // rgb(250 20 0) or rgb(250,20,0)
        if ((m = css.match(RE_RGB)) || (m = css.match(RE_RGB_LEGACY))) {
            let rgb = m.slice(1, 4);
            for (let i = 0; i < 3; i++) {
                rgb[i] = +percentToAbsolute(noneToValue(rgb[i], 0), 0, 255);
            }
            rgb = roundRGB(rgb);
            const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
            rgb[3] = alpha; // default alpha
            return rgb;
        }

        // rgba(250,20,0,0.4)
        if ((m = css.match(RE_RGBA_LEGACY))) {
            const rgb = m.slice(1, 5);
            for (let i = 0; i < 4; i++) {
                rgb[i] = +percentToAbsolute(rgb[i], 0, 255);
            }
            return rgb;
        }

        // hsl(0,100%,50%)
        if ((m = css.match(RE_HSL)) || (m = css.match(RE_HSL_LEGACY))) {
            const hsl = m.slice(1, 4);
            hsl[0] = +noneToValue(hsl[0].replace('deg', ''), 0);
            hsl[1] = +percentToAbsolute(noneToValue(hsl[1], 0), 0, 100) * 0.01;
            hsl[2] = +percentToAbsolute(noneToValue(hsl[2], 0), 0, 100) * 0.01;
            const rgb = roundRGB(hsl2rgb(hsl));
            const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
            rgb[3] = alpha;
            return rgb;
        }

        // hsla(0,100%,50%,0.5)
        if ((m = css.match(RE_HSLA_LEGACY))) {
            const hsl = m.slice(1, 4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            const rgb = hsl2rgb(hsl);
            for (let i = 0; i < 3; i++) {
                rgb[i] = round$1(rgb[i]);
            }
            rgb[3] = +m[4]; // default alpha = 1
            return rgb;
        }

        if ((m = css.match(RE_LAB))) {
            const lab = m.slice(1, 4);
            lab[0] = percentToAbsolute(noneToValue(lab[0], 0), 0, 100);
            lab[1] = percentToAbsolute(noneToValue(lab[1], 0), -125, 125, true);
            lab[2] = percentToAbsolute(noneToValue(lab[2], 0), -125, 125, true);
            // convert to D50 Lab whitepoint
            const wp = getLabWhitePoint();
            setLabWhitePoint('d50');
            const rgb = roundRGB(lab2rgb(lab));
            // convert back to original Lab whitepoint
            setLabWhitePoint(wp);
            const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
            rgb[3] = alpha;
            return rgb;
        }

        if ((m = css.match(RE_LCH))) {
            const lch = m.slice(1, 4);
            lch[0] = percentToAbsolute(lch[0], 0, 100);
            lch[1] = percentToAbsolute(noneToValue(lch[1], 0), 0, 150, false);
            lch[2] = +noneToValue(lch[2].replace('deg', ''), 0);
            // convert to D50 Lab whitepoint
            const wp = getLabWhitePoint();
            setLabWhitePoint('d50');
            const rgb = roundRGB(lch2rgb(lch));
            // convert back to original Lab whitepoint
            setLabWhitePoint(wp);
            const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
            rgb[3] = alpha;
            return rgb;
        }

        if ((m = css.match(RE_OKLAB))) {
            const oklab = m.slice(1, 4);
            oklab[0] = percentToAbsolute(noneToValue(oklab[0], 0), 0, 1);
            oklab[1] = percentToAbsolute(noneToValue(oklab[1], 0), -0.4, 0.4, true);
            oklab[2] = percentToAbsolute(noneToValue(oklab[2], 0), -0.4, 0.4, true);
            const rgb = roundRGB(oklab2rgb(oklab));
            const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
            rgb[3] = alpha;
            return rgb;
        }

        if ((m = css.match(RE_OKLCH))) {
            const oklch = m.slice(1, 4);
            oklch[0] = percentToAbsolute(noneToValue(oklch[0], 0), 0, 1);
            oklch[1] = percentToAbsolute(noneToValue(oklch[1], 0), 0, 0.4, false);
            oklch[2] = +noneToValue(oklch[2].replace('deg', ''), 0);
            const rgb = roundRGB(oklch2rgb(oklch));
            const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
            rgb[3] = alpha;
            return rgb;
        }
    };

    css2rgb.test = (s) => {
        return (
            // modern
            RE_RGB.test(s) ||
            RE_HSL.test(s) ||
            RE_LAB.test(s) ||
            RE_LCH.test(s) ||
            RE_OKLAB.test(s) ||
            RE_OKLCH.test(s) ||
            // legacy
            RE_RGB_LEGACY.test(s) ||
            RE_RGBA_LEGACY.test(s) ||
            RE_HSL_LEGACY.test(s) ||
            RE_HSLA_LEGACY.test(s) ||
            s === 'transparent'
        );
    };

    Color.prototype.css = function (mode) {
        return rgb2css(this._rgb, mode);
    };

    const css = (...args) => new Color(...args, 'css');
    chroma.css = css;

    input.format.css = css2rgb;

    input.autodetect.push({
        p: 5,
        test: (h, ...rest) => {
            if (!rest.length && type(h) === 'string' && css2rgb.test(h)) {
                return 'css';
            }
        }
    });

    input.format.gl = (...args) => {
        const rgb = unpack(args, 'rgba');
        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
    };

    const gl = (...args) => new Color(...args, 'gl');
    chroma.gl = gl;

    Color.prototype.gl = function () {
        const rgb = this._rgb;
        return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
    };

    Color.prototype.hex = function (mode) {
        return rgb2hex(this._rgb, mode);
    };

    const hex = (...args) => new Color(...args, 'hex');
    chroma.hex = hex;

    input.format.hex = hex2rgb;
    input.autodetect.push({
        p: 4,
        test: (h, ...rest) => {
            if (
                !rest.length &&
                type(h) === 'string' &&
                [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0
            ) {
                return 'hex';
            }
        }
    });

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     */

    const { log } = Math;

    const temperature2rgb = (kelvin) => {
        const temp = kelvin / 100;
        let r, g, b;
        if (temp < 66) {
            r = 255;
            g =
                temp < 6
                    ? 0
                    : -155.25485562709179 -
                      0.44596950469579133 * (g = temp - 2) +
                      104.49216199393888 * log(g);
            b =
                temp < 20
                    ? 0
                    : -254.76935184120902 +
                      0.8274096064007395 * (b = temp - 10) +
                      115.67994401066147 * log(b);
        } else {
            r =
                351.97690566805693 +
                0.114206453784165 * (r = temp - 55) -
                40.25366309332127 * log(r);
            g =
                325.4494125711974 +
                0.07943456536662342 * (g = temp - 50) -
                28.0852963507957 * log(g);
            b = 255;
        }
        return [r, g, b, 1];
    };

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     **/

    const { round } = Math;

    const rgb2temperature = (...args) => {
        const rgb = unpack(args, 'rgb');
        const r = rgb[0],
            b = rgb[2];
        let minTemp = 1000;
        let maxTemp = 40000;
        const eps = 0.4;
        let temp;
        while (maxTemp - minTemp > eps) {
            temp = (maxTemp + minTemp) * 0.5;
            const rgb = temperature2rgb(temp);
            if (rgb[2] / rgb[0] >= b / r) {
                maxTemp = temp;
            } else {
                minTemp = temp;
            }
        }
        return round(temp);
    };

    Color.prototype.temp =
        Color.prototype.kelvin =
        Color.prototype.temperature =
            function () {
                return rgb2temperature(this._rgb);
            };

    const temp = (...args) => new Color(...args, 'temp');
    Object.assign(chroma, { temp, kelvin: temp, temperature: temp });

    input.format.temp =
        input.format.kelvin =
        input.format.temperature =
            temperature2rgb;

    Color.prototype.oklch = function () {
        return rgb2oklch(this._rgb);
    };

    const oklch = (...args) => new Color(...args, 'oklch');
    Object.assign(chroma, { oklch });

    input.format.oklch = oklch2rgb;

    input.autodetect.push({
        p: 2,
        test: (...args) => {
            args = unpack(args, 'oklch');
            if (type(args) === 'array' && args.length === 3) {
                return 'oklch';
            }
        }
    });

    // feel free to comment out anything to rollup
    // a smaller chroma.js bundle

    Object.assign(chroma, {
        analyze,
        average,
        bezier: bezier$1,
        blend,
        brewer: colorbrewerProxy,
        Color,
        colors: w3cx11,
        contrast,
        contrastAPCA,
        cubehelix,
        deltaE,
        distance,
        input,
        interpolate: mix,
        limits,
        mix,
        random: random$1,
        scale,
        scales,
        valid
    });

    const s=(t,s)=>(t=Math.ceil(t),s=Math.floor(s),Math.floor(Math.random()*(s-t+1))+t),i=(t,s)=>{const i=Math.random(),e=Math.random();return Math.sqrt(-2*Math.log(i))*Math.cos(2*Math.PI*e)*s+t};class e{constructor(t,{x:s,y:i}){this.system=t,this.initialX=s,this.initialY=i,this.reset();}reset(){this.baseColor=chroma((t=>{if(0===t.length)throw new Error("Cannot pick a random element from an empty array");return t[Math.floor(Math.random()*t.length)]})(this.system.config.baseColors)).rgb(),this.size=Math.max(i(this.system.config.baseSize,this.system.config.sizeDeviation),.1),this.maxOpacity=Math.min(1,this.system.config.baseSize/this.size),this.x=this.initialX,this.y=this.initialY,this.velocityX=0,this.velocityY=0,this.state="fadeIn",this.opacity=0,this.life=0,this.maxLife=i(this.system.config.baseLife,this.system.config.lifeDeviation);const s=Math.random()*Math.PI*2;this.velocityX=Math.cos(s)*this.system.config.driftSpeed,this.velocityY=Math.sin(s)*this.system.config.driftSpeed,this.annihilationRadius=i(this.system.config.baseAnnihilationRadius,1);}applyForce(t,s){this.velocityX+=t*this.system.config.mass,this.velocityY+=s*this.system.config.mass;}update(t){this.life+=t;const s=t/20;switch(this.state){case"fadeIn":this.opacity+=.002*t,this.opacity>=this.maxOpacity&&(this.opacity=this.maxOpacity,this.state="idle");break;case"idle":this.life>this.maxLife&&(this.state="fadeOut"),this.updatePhysics(s);break;case"fadeOut":this.opacity-=.001*t,this.updatePhysics(s),(this.opacity<=0||this.y<=5)&&this.reset();break;case"annihilation":this.opacity-=this.system.config.annihilationSpeed,this.velocityX*=.9,this.velocityY*=.9,this.x+=this.velocityX*s,this.y+=this.velocityY*s,this.opacity<=0&&this.reset();}}updatePhysics(t){if(this.applyForce(0,-this.system.config.upwardForce),this.system.isMouseOver){const t=this.system.mouseX-this.x,s=this.system.mouseY-this.y,i=t*t+s*s,e=Math.sqrt(i);if(e<this.system.config.attractionRadius){if(e<this.annihilationRadius&&"annihilation"!==this.state)return void(this.state="annihilation");const h=this.system.config.cursorGravity/Math.max(i,100),a=t*h,o=s*h;this.applyForce(a,o);}}this.velocityX*=this.system.config.friction,this.velocityY*=this.system.config.friction,this.x+=this.velocityX*t,this.y+=this.velocityY*t;}draw(){this.system.ctx.beginPath(),this.system.ctx.arc(this.x,this.y,this.size,0,2*Math.PI),this.system.ctx.fillStyle=`rgba(${this.baseColor[0]}, ${this.baseColor[1]}, ${this.baseColor[2]}, ${this.opacity})`,this.system.ctx.fill();}}const h={maxParticles:1e4,baseSize:.7,sizeDeviation:.8,baseLife:1e3,lifeDeviation:100,mass:1,cursorGravity:1,attractionRadius:100,upwardForce:.005,friction:.99,baseAnnihilationRadius:10,annihilationSpeed:.05,driftSpeed:.1,baseColors:["#d4e4ff","#bddaff"]};class a{constructor({canvas:t,svg:s,config:i={}}){this.canvas=t,this.svgObject=s,this.svg=this.svgObject.contentDocument.querySelectorAll("svg")[0],this.bbox=this.svg.getBoundingClientRect();const e=this.svg.viewBox.baseVal;this.scaleX=this.bbox.width/e.width,this.scaleY=this.bbox.height/e.height,this.config={...h,...i},this.ctx=null,this.mouseX=0,this.mouseY=0,this.particles=[],this.lastTime=performance.now(),this.isMouseOver=!1;}setupCanvasDPI=()=>{const t=window.devicePixelRatio||1,s=this.canvas.getBoundingClientRect();this.canvas.width=s.width*t,this.canvas.height=s.height*t,this.canvas.style.width=`${s.width}px`,this.canvas.style.height=`${s.height}px`,this.ctx.scale(t,t);};init=()=>{this.canvas&&this.svg?(this.spawnAreas=Array.from(this.svg.querySelectorAll("circle, rect, path, polygon, ellipse")),this.spawnAreas.length||console.error("No spawn areas detected"),this.ctx=this.canvas.getContext("2d"),this.setupCanvasDPI(),this.canvas.addEventListener("mousemove",this.handleMouseMove),this.canvas.addEventListener("mouseleave",this.handleMouseLeave),this.animate()):console.error("Required elements not found");};setConfig=t=>{this.config=Object.assign(this.config,t),t.maxParticles<this.particles.length&&(this.particles.length=t.maxParticles);};handleMouseMove=t=>{this.isMouseOver=!0;const s=this.canvas.getBoundingClientRect();this.mouseX=t.clientX-s.left,this.mouseY=t.clientY-s.top;};handleMouseLeave=()=>{this.isMouseOver=!1;};isPointInShape=t=>{const s=this.svg.createSVGPoint();s.x=t.x,s.y=t.y;return this.spawnAreas.map((t=>t.isPointInFill(s))).some(Boolean)};getRandomPointInShape=()=>{let t;do{t={x:this.bbox.x+Math.random()*this.bbox.width,y:this.bbox.y+Math.random()*this.bbox.height};}while(!this.isPointInShape(t));return {x:t.x*this.scaleX+this.svgObject.offsetLeft,y:t.y*this.scaleY+this.svgObject.offsetTop}};animate=()=>{const t=performance.now(),i=t-this.lastTime;if(this.lastTime=t,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.length<this.config.maxParticles){const t=Math.min(Math.floor(50*Math.random()),this.config.maxParticles-this.particles.length);for(let i=1;i<=t;i++){let t;t=this.spawnAreas.length?this.getRandomPointInShape():{x:s(0,this.canvas.width),y:s(0,this.canvas.height)},this.particles.push(new e(this,{x:t.x,y:t.y}));}}this.particles.forEach((t=>{t.update(i),t.draw();})),requestAnimationFrame(this.animate);}}

    /**
     * lil-gui
     * https://lil-gui.georgealways.com
     * @version 0.20.0
     * @author George Michael Brower
     * @license MIT
     */

    /**
     * Base class for all controllers.
     */
    class Controller {

    	constructor( parent, object, property, className, elementType = 'div' ) {

    		/**
    		 * The GUI that contains this controller.
    		 * @type {GUI}
    		 */
    		this.parent = parent;

    		/**
    		 * The object this controller will modify.
    		 * @type {object}
    		 */
    		this.object = object;

    		/**
    		 * The name of the property to control.
    		 * @type {string}
    		 */
    		this.property = property;

    		/**
    		 * Used to determine if the controller is disabled.
    		 * Use `controller.disable( true|false )` to modify this value.
    		 * @type {boolean}
    		 */
    		this._disabled = false;

    		/**
    		 * Used to determine if the Controller is hidden.
    		 * Use `controller.show()` or `controller.hide()` to change this.
    		 * @type {boolean}
    		 */
    		this._hidden = false;

    		/**
    		 * The value of `object[ property ]` when the controller was created.
    		 * @type {any}
    		 */
    		this.initialValue = this.getValue();

    		/**
    		 * The outermost container DOM element for this controller.
    		 * @type {HTMLElement}
    		 */
    		this.domElement = document.createElement( elementType );
    		this.domElement.classList.add( 'controller' );
    		this.domElement.classList.add( className );

    		/**
    		 * The DOM element that contains the controller's name.
    		 * @type {HTMLElement}
    		 */
    		this.$name = document.createElement( 'div' );
    		this.$name.classList.add( 'name' );

    		Controller.nextNameID = Controller.nextNameID || 0;
    		this.$name.id = `lil-gui-name-${++Controller.nextNameID}`;

    		/**
    		 * The DOM element that contains the controller's "widget" (which differs by controller type).
    		 * @type {HTMLElement}
    		 */
    		this.$widget = document.createElement( 'div' );
    		this.$widget.classList.add( 'widget' );

    		/**
    		 * The DOM element that receives the disabled attribute when using disable().
    		 * @type {HTMLElement}
    		 */
    		this.$disable = this.$widget;

    		this.domElement.appendChild( this.$name );
    		this.domElement.appendChild( this.$widget );

    		// Don't fire global key events while typing in a controller
    		this.domElement.addEventListener( 'keydown', e => e.stopPropagation() );
    		this.domElement.addEventListener( 'keyup', e => e.stopPropagation() );

    		this.parent.children.push( this );
    		this.parent.controllers.push( this );

    		this.parent.$children.appendChild( this.domElement );

    		this._listenCallback = this._listenCallback.bind( this );

    		this.name( property );

    	}

    	/**
    	 * Sets the name of the controller and its label in the GUI.
    	 * @param {string} name
    	 * @returns {this}
    	 */
    	name( name ) {
    		/**
    		 * The controller's name. Use `controller.name( 'Name' )` to modify this value.
    		 * @type {string}
    		 */
    		this._name = name;
    		this.$name.textContent = name;
    		return this;
    	}

    	/**
    	 * Pass a function to be called whenever the value is modified by this controller.
    	 * The function receives the new value as its first parameter. The value of `this` will be the
    	 * controller.
    	 *
    	 * For function controllers, the `onChange` callback will be fired on click, after the function
    	 * executes.
    	 * @param {Function} callback
    	 * @returns {this}
    	 * @example
    	 * const controller = gui.add( object, 'property' );
    	 *
    	 * controller.onChange( function( v ) {
    	 * 	console.log( 'The value is now ' + v );
    	 * 	console.assert( this === controller );
    	 * } );
    	 */
    	onChange( callback ) {
    		/**
    		 * Used to access the function bound to `onChange` events. Don't modify this value directly.
    		 * Use the `controller.onChange( callback )` method instead.
    		 * @type {Function}
    		 */
    		this._onChange = callback;
    		return this;
    	}

    	/**
    	 * Calls the onChange methods of this controller and its parent GUI.
    	 * @protected
    	 */
    	_callOnChange() {

    		this.parent._callOnChange( this );

    		if ( this._onChange !== undefined ) {
    			this._onChange.call( this, this.getValue() );
    		}

    		this._changed = true;

    	}

    	/**
    	 * Pass a function to be called after this controller has been modified and loses focus.
    	 * @param {Function} callback
    	 * @returns {this}
    	 * @example
    	 * const controller = gui.add( object, 'property' );
    	 *
    	 * controller.onFinishChange( function( v ) {
    	 * 	console.log( 'Changes complete: ' + v );
    	 * 	console.assert( this === controller );
    	 * } );
    	 */
    	onFinishChange( callback ) {
    		/**
    		 * Used to access the function bound to `onFinishChange` events. Don't modify this value
    		 * directly. Use the `controller.onFinishChange( callback )` method instead.
    		 * @type {Function}
    		 */
    		this._onFinishChange = callback;
    		return this;
    	}

    	/**
    	 * Should be called by Controller when its widgets lose focus.
    	 * @protected
    	 */
    	_callOnFinishChange() {

    		if ( this._changed ) {

    			this.parent._callOnFinishChange( this );

    			if ( this._onFinishChange !== undefined ) {
    				this._onFinishChange.call( this, this.getValue() );
    			}

    		}

    		this._changed = false;

    	}

    	/**
    	 * Sets the controller back to its initial value.
    	 * @returns {this}
    	 */
    	reset() {
    		this.setValue( this.initialValue );
    		this._callOnFinishChange();
    		return this;
    	}

    	/**
    	 * Enables this controller.
    	 * @param {boolean} enabled
    	 * @returns {this}
    	 * @example
    	 * controller.enable();
    	 * controller.enable( false ); // disable
    	 * controller.enable( controller._disabled ); // toggle
    	 */
    	enable( enabled = true ) {
    		return this.disable( !enabled );
    	}

    	/**
    	 * Disables this controller.
    	 * @param {boolean} disabled
    	 * @returns {this}
    	 * @example
    	 * controller.disable();
    	 * controller.disable( false ); // enable
    	 * controller.disable( !controller._disabled ); // toggle
    	 */
    	disable( disabled = true ) {

    		if ( disabled === this._disabled ) return this;

    		this._disabled = disabled;

    		this.domElement.classList.toggle( 'disabled', disabled );
    		this.$disable.toggleAttribute( 'disabled', disabled );

    		return this;

    	}

    	/**
    	 * Shows the Controller after it's been hidden.
    	 * @param {boolean} show
    	 * @returns {this}
    	 * @example
    	 * controller.show();
    	 * controller.show( false ); // hide
    	 * controller.show( controller._hidden ); // toggle
    	 */
    	show( show = true ) {

    		this._hidden = !show;

    		this.domElement.style.display = this._hidden ? 'none' : '';

    		return this;

    	}

    	/**
    	 * Hides the Controller.
    	 * @returns {this}
    	 */
    	hide() {
    		return this.show( false );
    	}

    	/**
    	 * Changes this controller into a dropdown of options.
    	 *
    	 * Calling this method on an option controller will simply update the options. However, if this
    	 * controller was not already an option controller, old references to this controller are
    	 * destroyed, and a new controller is added to the end of the GUI.
    	 * @example
    	 * // safe usage
    	 *
    	 * gui.add( obj, 'prop1' ).options( [ 'a', 'b', 'c' ] );
    	 * gui.add( obj, 'prop2' ).options( { Big: 10, Small: 1 } );
    	 * gui.add( obj, 'prop3' );
    	 *
    	 * // danger
    	 *
    	 * const ctrl1 = gui.add( obj, 'prop1' );
    	 * gui.add( obj, 'prop2' );
    	 *
    	 * // calling options out of order adds a new controller to the end...
    	 * const ctrl2 = ctrl1.options( [ 'a', 'b', 'c' ] );
    	 *
    	 * // ...and ctrl1 now references a controller that doesn't exist
    	 * assert( ctrl2 !== ctrl1 )
    	 * @param {object|Array} options
    	 * @returns {Controller}
    	 */
    	options( options ) {
    		const controller = this.parent.add( this.object, this.property, options );
    		controller.name( this._name );
    		this.destroy();
    		return controller;
    	}

    	/**
    	 * Sets the minimum value. Only works on number controllers.
    	 * @param {number} min
    	 * @returns {this}
    	 */
    	min( min ) {
    		return this;
    	}

    	/**
    	 * Sets the maximum value. Only works on number controllers.
    	 * @param {number} max
    	 * @returns {this}
    	 */
    	max( max ) {
    		return this;
    	}

    	/**
    	 * Values set by this controller will be rounded to multiples of `step`. Only works on number
    	 * controllers.
    	 * @param {number} step
    	 * @returns {this}
    	 */
    	step( step ) {
    		return this;
    	}

    	/**
    	 * Rounds the displayed value to a fixed number of decimals, without affecting the actual value
    	 * like `step()`. Only works on number controllers.
    	 * @example
    	 * gui.add( object, 'property' ).listen().decimals( 4 );
    	 * @param {number} decimals
    	 * @returns {this}
    	 */
    	decimals( decimals ) {
    		return this;
    	}

    	/**
    	 * Calls `updateDisplay()` every animation frame. Pass `false` to stop listening.
    	 * @param {boolean} listen
    	 * @returns {this}
    	 */
    	listen( listen = true ) {

    		/**
    		 * Used to determine if the controller is currently listening. Don't modify this value
    		 * directly. Use the `controller.listen( true|false )` method instead.
    		 * @type {boolean}
    		 */
    		this._listening = listen;

    		if ( this._listenCallbackID !== undefined ) {
    			cancelAnimationFrame( this._listenCallbackID );
    			this._listenCallbackID = undefined;
    		}

    		if ( this._listening ) {
    			this._listenCallback();
    		}

    		return this;

    	}

    	_listenCallback() {

    		this._listenCallbackID = requestAnimationFrame( this._listenCallback );

    		// To prevent framerate loss, make sure the value has changed before updating the display.
    		// Note: save() is used here instead of getValue() only because of ColorController. The !== operator
    		// won't work for color objects or arrays, but ColorController.save() always returns a string.

    		const curValue = this.save();

    		if ( curValue !== this._listenPrevValue ) {
    			this.updateDisplay();
    		}

    		this._listenPrevValue = curValue;

    	}

    	/**
    	 * Returns `object[ property ]`.
    	 * @returns {any}
    	 */
    	getValue() {
    		return this.object[ this.property ];
    	}

    	/**
    	 * Sets the value of `object[ property ]`, invokes any `onChange` handlers and updates the display.
    	 * @param {any} value
    	 * @returns {this}
    	 */
    	setValue( value ) {

    		if ( this.getValue() !== value ) {

    			this.object[ this.property ] = value;
    			this._callOnChange();
    			this.updateDisplay();

    		}

    		return this;

    	}

    	/**
    	 * Updates the display to keep it in sync with the current value. Useful for updating your
    	 * controllers when their values have been modified outside of the GUI.
    	 * @returns {this}
    	 */
    	updateDisplay() {
    		return this;
    	}

    	load( value ) {
    		this.setValue( value );
    		this._callOnFinishChange();
    		return this;
    	}

    	save() {
    		return this.getValue();
    	}

    	/**
    	 * Destroys this controller and removes it from the parent GUI.
    	 */
    	destroy() {
    		this.listen( false );
    		this.parent.children.splice( this.parent.children.indexOf( this ), 1 );
    		this.parent.controllers.splice( this.parent.controllers.indexOf( this ), 1 );
    		this.parent.$children.removeChild( this.domElement );
    	}

    }

    class BooleanController extends Controller {

    	constructor( parent, object, property ) {

    		super( parent, object, property, 'boolean', 'label' );

    		this.$input = document.createElement( 'input' );
    		this.$input.setAttribute( 'type', 'checkbox' );
    		this.$input.setAttribute( 'aria-labelledby', this.$name.id );

    		this.$widget.appendChild( this.$input );

    		this.$input.addEventListener( 'change', () => {
    			this.setValue( this.$input.checked );
    			this._callOnFinishChange();
    		} );

    		this.$disable = this.$input;

    		this.updateDisplay();

    	}

    	updateDisplay() {
    		this.$input.checked = this.getValue();
    		return this;
    	}

    }

    function normalizeColorString( string ) {

    	let match, result;

    	if ( match = string.match( /(#|0x)?([a-f0-9]{6})/i ) ) {

    		result = match[ 2 ];

    	} else if ( match = string.match( /rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/ ) ) {

    		result = parseInt( match[ 1 ] ).toString( 16 ).padStart( 2, 0 )
    			+ parseInt( match[ 2 ] ).toString( 16 ).padStart( 2, 0 )
    			+ parseInt( match[ 3 ] ).toString( 16 ).padStart( 2, 0 );

    	} else if ( match = string.match( /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i ) ) {

    		result = match[ 1 ] + match[ 1 ] + match[ 2 ] + match[ 2 ] + match[ 3 ] + match[ 3 ];

    	}

    	if ( result ) {
    		return '#' + result;
    	}

    	return false;

    }

    const STRING = {
    	isPrimitive: true,
    	match: v => typeof v === 'string',
    	fromHexString: normalizeColorString,
    	toHexString: normalizeColorString
    };

    const INT = {
    	isPrimitive: true,
    	match: v => typeof v === 'number',
    	fromHexString: string => parseInt( string.substring( 1 ), 16 ),
    	toHexString: value => '#' + value.toString( 16 ).padStart( 6, 0 )
    };

    const ARRAY = {
    	isPrimitive: false,

    	// The arrow function is here to appease tree shakers like esbuild or webpack.
    	// See https://esbuild.github.io/api/#tree-shaking
    	match: v => Array.isArray( v ),

    	fromHexString( string, target, rgbScale = 1 ) {

    		const int = INT.fromHexString( string );

    		target[ 0 ] = ( int >> 16 & 255 ) / 255 * rgbScale;
    		target[ 1 ] = ( int >> 8 & 255 ) / 255 * rgbScale;
    		target[ 2 ] = ( int & 255 ) / 255 * rgbScale;

    	},
    	toHexString( [ r, g, b ], rgbScale = 1 ) {

    		rgbScale = 255 / rgbScale;

    		const int = ( r * rgbScale ) << 16 ^
    			( g * rgbScale ) << 8 ^
    			( b * rgbScale ) << 0;

    		return INT.toHexString( int );

    	}
    };

    const OBJECT = {
    	isPrimitive: false,
    	match: v => Object( v ) === v,
    	fromHexString( string, target, rgbScale = 1 ) {

    		const int = INT.fromHexString( string );

    		target.r = ( int >> 16 & 255 ) / 255 * rgbScale;
    		target.g = ( int >> 8 & 255 ) / 255 * rgbScale;
    		target.b = ( int & 255 ) / 255 * rgbScale;

    	},
    	toHexString( { r, g, b }, rgbScale = 1 ) {

    		rgbScale = 255 / rgbScale;

    		const int = ( r * rgbScale ) << 16 ^
    			( g * rgbScale ) << 8 ^
    			( b * rgbScale ) << 0;

    		return INT.toHexString( int );

    	}
    };

    const FORMATS = [ STRING, INT, ARRAY, OBJECT ];

    function getColorFormat( value ) {
    	return FORMATS.find( format => format.match( value ) );
    }

    class ColorController extends Controller {

    	constructor( parent, object, property, rgbScale ) {

    		super( parent, object, property, 'color' );

    		this.$input = document.createElement( 'input' );
    		this.$input.setAttribute( 'type', 'color' );
    		this.$input.setAttribute( 'tabindex', -1 );
    		this.$input.setAttribute( 'aria-labelledby', this.$name.id );

    		this.$text = document.createElement( 'input' );
    		this.$text.setAttribute( 'type', 'text' );
    		this.$text.setAttribute( 'spellcheck', 'false' );
    		this.$text.setAttribute( 'aria-labelledby', this.$name.id );

    		this.$display = document.createElement( 'div' );
    		this.$display.classList.add( 'display' );

    		this.$display.appendChild( this.$input );
    		this.$widget.appendChild( this.$display );
    		this.$widget.appendChild( this.$text );

    		this._format = getColorFormat( this.initialValue );
    		this._rgbScale = rgbScale;

    		this._initialValueHexString = this.save();
    		this._textFocused = false;

    		this.$input.addEventListener( 'input', () => {
    			this._setValueFromHexString( this.$input.value );
    		} );

    		this.$input.addEventListener( 'blur', () => {
    			this._callOnFinishChange();
    		} );

    		this.$text.addEventListener( 'input', () => {
    			const tryParse = normalizeColorString( this.$text.value );
    			if ( tryParse ) {
    				this._setValueFromHexString( tryParse );
    			}
    		} );

    		this.$text.addEventListener( 'focus', () => {
    			this._textFocused = true;
    			this.$text.select();
    		} );

    		this.$text.addEventListener( 'blur', () => {
    			this._textFocused = false;
    			this.updateDisplay();
    			this._callOnFinishChange();
    		} );

    		this.$disable = this.$text;

    		this.updateDisplay();

    	}

    	reset() {
    		this._setValueFromHexString( this._initialValueHexString );
    		return this;
    	}

    	_setValueFromHexString( value ) {

    		if ( this._format.isPrimitive ) {

    			const newValue = this._format.fromHexString( value );
    			this.setValue( newValue );

    		} else {

    			this._format.fromHexString( value, this.getValue(), this._rgbScale );
    			this._callOnChange();
    			this.updateDisplay();

    		}

    	}

    	save() {
    		return this._format.toHexString( this.getValue(), this._rgbScale );
    	}

    	load( value ) {
    		this._setValueFromHexString( value );
    		this._callOnFinishChange();
    		return this;
    	}

    	updateDisplay() {
    		this.$input.value = this._format.toHexString( this.getValue(), this._rgbScale );
    		if ( !this._textFocused ) {
    			this.$text.value = this.$input.value.substring( 1 );
    		}
    		this.$display.style.backgroundColor = this.$input.value;
    		return this;
    	}

    }

    class FunctionController extends Controller {

    	constructor( parent, object, property ) {

    		super( parent, object, property, 'function' );

    		// Buttons are the only case where widget contains name
    		this.$button = document.createElement( 'button' );
    		this.$button.appendChild( this.$name );
    		this.$widget.appendChild( this.$button );

    		this.$button.addEventListener( 'click', e => {
    			e.preventDefault();
    			this.getValue().call( this.object );
    			this._callOnChange();
    		} );

    		// enables :active pseudo class on mobile
    		this.$button.addEventListener( 'touchstart', () => {}, { passive: true } );

    		this.$disable = this.$button;

    	}

    }

    class NumberController extends Controller {

    	constructor( parent, object, property, min, max, step ) {

    		super( parent, object, property, 'number' );

    		this._initInput();

    		this.min( min );
    		this.max( max );

    		const stepExplicit = step !== undefined;
    		this.step( stepExplicit ? step : this._getImplicitStep(), stepExplicit );

    		this.updateDisplay();

    	}

    	decimals( decimals ) {
    		this._decimals = decimals;
    		this.updateDisplay();
    		return this;
    	}

    	min( min ) {
    		this._min = min;
    		this._onUpdateMinMax();
    		return this;
    	}

    	max( max ) {
    		this._max = max;
    		this._onUpdateMinMax();
    		return this;
    	}

    	step( step, explicit = true ) {
    		this._step = step;
    		this._stepExplicit = explicit;
    		return this;
    	}

    	updateDisplay() {

    		const value = this.getValue();

    		if ( this._hasSlider ) {

    			let percent = ( value - this._min ) / ( this._max - this._min );
    			percent = Math.max( 0, Math.min( percent, 1 ) );

    			this.$fill.style.width = percent * 100 + '%';

    		}

    		if ( !this._inputFocused ) {
    			this.$input.value = this._decimals === undefined ? value : value.toFixed( this._decimals );
    		}

    		return this;

    	}

    	_initInput() {

    		this.$input = document.createElement( 'input' );
    		this.$input.setAttribute( 'type', 'text' );
    		this.$input.setAttribute( 'aria-labelledby', this.$name.id );

    		// On touch devices only, use input[type=number] to force a numeric keyboard.
    		// Ideally we could use one input type everywhere, but [type=number] has quirks
    		// on desktop, and [inputmode=decimal] has quirks on iOS.
    		// See https://github.com/georgealways/lil-gui/pull/16

    		const isTouch = window.matchMedia( '(pointer: coarse)' ).matches;

    		if ( isTouch ) {
    			this.$input.setAttribute( 'type', 'number' );
    			this.$input.setAttribute( 'step', 'any' );
    		}

    		this.$widget.appendChild( this.$input );

    		this.$disable = this.$input;

    		const onInput = () => {

    			let value = parseFloat( this.$input.value );

    			if ( isNaN( value ) ) return;

    			if ( this._stepExplicit ) {
    				value = this._snap( value );
    			}

    			this.setValue( this._clamp( value ) );

    		};

    		// Keys & mouse wheel
    		// ---------------------------------------------------------------------

    		const increment = delta => {

    			const value = parseFloat( this.$input.value );

    			if ( isNaN( value ) ) return;

    			this._snapClampSetValue( value + delta );

    			// Force the input to updateDisplay when it's focused
    			this.$input.value = this.getValue();

    		};

    		const onKeyDown = e => {
    			// Using `e.key` instead of `e.code` also catches NumpadEnter
    			if ( e.key === 'Enter' ) {
    				this.$input.blur();
    			}
    			if ( e.code === 'ArrowUp' ) {
    				e.preventDefault();
    				increment( this._step * this._arrowKeyMultiplier( e ) );
    			}
    			if ( e.code === 'ArrowDown' ) {
    				e.preventDefault();
    				increment( this._step * this._arrowKeyMultiplier( e ) * -1 );
    			}
    		};

    		const onWheel = e => {
    			if ( this._inputFocused ) {
    				e.preventDefault();
    				increment( this._step * this._normalizeMouseWheel( e ) );
    			}
    		};

    		// Vertical drag
    		// ---------------------------------------------------------------------

    		let testingForVerticalDrag = false,
    			initClientX,
    			initClientY,
    			prevClientY,
    			initValue,
    			dragDelta;

    		// Once the mouse is dragged more than DRAG_THRESH px on any axis, we decide
    		// on the user's intent: horizontal means highlight, vertical means drag.
    		const DRAG_THRESH = 5;

    		const onMouseDown = e => {

    			initClientX = e.clientX;
    			initClientY = prevClientY = e.clientY;
    			testingForVerticalDrag = true;

    			initValue = this.getValue();
    			dragDelta = 0;

    			window.addEventListener( 'mousemove', onMouseMove );
    			window.addEventListener( 'mouseup', onMouseUp );

    		};

    		const onMouseMove = e => {

    			if ( testingForVerticalDrag ) {

    				const dx = e.clientX - initClientX;
    				const dy = e.clientY - initClientY;

    				if ( Math.abs( dy ) > DRAG_THRESH ) {

    					e.preventDefault();
    					this.$input.blur();
    					testingForVerticalDrag = false;
    					this._setDraggingStyle( true, 'vertical' );

    				} else if ( Math.abs( dx ) > DRAG_THRESH ) {

    					onMouseUp();

    				}

    			}

    			// This isn't an else so that the first move counts towards dragDelta
    			if ( !testingForVerticalDrag ) {

    				const dy = e.clientY - prevClientY;

    				dragDelta -= dy * this._step * this._arrowKeyMultiplier( e );

    				// Clamp dragDelta so we don't have 'dead space' after dragging past bounds.
    				// We're okay with the fact that bounds can be undefined here.
    				if ( initValue + dragDelta > this._max ) {
    					dragDelta = this._max - initValue;
    				} else if ( initValue + dragDelta < this._min ) {
    					dragDelta = this._min - initValue;
    				}

    				this._snapClampSetValue( initValue + dragDelta );

    			}

    			prevClientY = e.clientY;

    		};

    		const onMouseUp = () => {
    			this._setDraggingStyle( false, 'vertical' );
    			this._callOnFinishChange();
    			window.removeEventListener( 'mousemove', onMouseMove );
    			window.removeEventListener( 'mouseup', onMouseUp );
    		};

    		// Focus state & onFinishChange
    		// ---------------------------------------------------------------------

    		const onFocus = () => {
    			this._inputFocused = true;
    		};

    		const onBlur = () => {
    			this._inputFocused = false;
    			this.updateDisplay();
    			this._callOnFinishChange();
    		};

    		this.$input.addEventListener( 'input', onInput );
    		this.$input.addEventListener( 'keydown', onKeyDown );
    		this.$input.addEventListener( 'wheel', onWheel, { passive: false } );
    		this.$input.addEventListener( 'mousedown', onMouseDown );
    		this.$input.addEventListener( 'focus', onFocus );
    		this.$input.addEventListener( 'blur', onBlur );

    	}

    	_initSlider() {

    		this._hasSlider = true;

    		// Build DOM
    		// ---------------------------------------------------------------------

    		this.$slider = document.createElement( 'div' );
    		this.$slider.classList.add( 'slider' );

    		this.$fill = document.createElement( 'div' );
    		this.$fill.classList.add( 'fill' );

    		this.$slider.appendChild( this.$fill );
    		this.$widget.insertBefore( this.$slider, this.$input );

    		this.domElement.classList.add( 'hasSlider' );

    		// Map clientX to value
    		// ---------------------------------------------------------------------

    		const map = ( v, a, b, c, d ) => {
    			return ( v - a ) / ( b - a ) * ( d - c ) + c;
    		};

    		const setValueFromX = clientX => {
    			const rect = this.$slider.getBoundingClientRect();
    			let value = map( clientX, rect.left, rect.right, this._min, this._max );
    			this._snapClampSetValue( value );
    		};

    		// Mouse drag
    		// ---------------------------------------------------------------------

    		const mouseDown = e => {
    			this._setDraggingStyle( true );
    			setValueFromX( e.clientX );
    			window.addEventListener( 'mousemove', mouseMove );
    			window.addEventListener( 'mouseup', mouseUp );
    		};

    		const mouseMove = e => {
    			setValueFromX( e.clientX );
    		};

    		const mouseUp = () => {
    			this._callOnFinishChange();
    			this._setDraggingStyle( false );
    			window.removeEventListener( 'mousemove', mouseMove );
    			window.removeEventListener( 'mouseup', mouseUp );
    		};

    		// Touch drag
    		// ---------------------------------------------------------------------

    		let testingForScroll = false, prevClientX, prevClientY;

    		const beginTouchDrag = e => {
    			e.preventDefault();
    			this._setDraggingStyle( true );
    			setValueFromX( e.touches[ 0 ].clientX );
    			testingForScroll = false;
    		};

    		const onTouchStart = e => {

    			if ( e.touches.length > 1 ) return;

    			// If we're in a scrollable container, we should wait for the first
    			// touchmove to see if the user is trying to slide or scroll.
    			if ( this._hasScrollBar ) {

    				prevClientX = e.touches[ 0 ].clientX;
    				prevClientY = e.touches[ 0 ].clientY;
    				testingForScroll = true;

    			} else {

    				// Otherwise, we can set the value straight away on touchstart.
    				beginTouchDrag( e );

    			}

    			window.addEventListener( 'touchmove', onTouchMove, { passive: false } );
    			window.addEventListener( 'touchend', onTouchEnd );

    		};

    		const onTouchMove = e => {

    			if ( testingForScroll ) {

    				const dx = e.touches[ 0 ].clientX - prevClientX;
    				const dy = e.touches[ 0 ].clientY - prevClientY;

    				if ( Math.abs( dx ) > Math.abs( dy ) ) {

    					// We moved horizontally, set the value and stop checking.
    					beginTouchDrag( e );

    				} else {

    					// This was, in fact, an attempt to scroll. Abort.
    					window.removeEventListener( 'touchmove', onTouchMove );
    					window.removeEventListener( 'touchend', onTouchEnd );

    				}

    			} else {

    				e.preventDefault();
    				setValueFromX( e.touches[ 0 ].clientX );

    			}

    		};

    		const onTouchEnd = () => {
    			this._callOnFinishChange();
    			this._setDraggingStyle( false );
    			window.removeEventListener( 'touchmove', onTouchMove );
    			window.removeEventListener( 'touchend', onTouchEnd );
    		};

    		// Mouse wheel
    		// ---------------------------------------------------------------------

    		// We have to use a debounced function to call onFinishChange because
    		// there's no way to tell when the user is "done" mouse-wheeling.
    		const callOnFinishChange = this._callOnFinishChange.bind( this );
    		const WHEEL_DEBOUNCE_TIME = 400;
    		let wheelFinishChangeTimeout;

    		const onWheel = e => {

    			// ignore vertical wheels if there's a scrollbar
    			const isVertical = Math.abs( e.deltaX ) < Math.abs( e.deltaY );
    			if ( isVertical && this._hasScrollBar ) return;

    			e.preventDefault();

    			// set value
    			const delta = this._normalizeMouseWheel( e ) * this._step;
    			this._snapClampSetValue( this.getValue() + delta );

    			// force the input to updateDisplay when it's focused
    			this.$input.value = this.getValue();

    			// debounce onFinishChange
    			clearTimeout( wheelFinishChangeTimeout );
    			wheelFinishChangeTimeout = setTimeout( callOnFinishChange, WHEEL_DEBOUNCE_TIME );

    		};

    		this.$slider.addEventListener( 'mousedown', mouseDown );
    		this.$slider.addEventListener( 'touchstart', onTouchStart, { passive: false } );
    		this.$slider.addEventListener( 'wheel', onWheel, { passive: false } );

    	}

    	_setDraggingStyle( active, axis = 'horizontal' ) {
    		if ( this.$slider ) {
    			this.$slider.classList.toggle( 'active', active );
    		}
    		document.body.classList.toggle( 'lil-gui-dragging', active );
    		document.body.classList.toggle( `lil-gui-${axis}`, active );
    	}

    	_getImplicitStep() {

    		if ( this._hasMin && this._hasMax ) {
    			return ( this._max - this._min ) / 1000;
    		}

    		return 0.1;

    	}

    	_onUpdateMinMax() {

    		if ( !this._hasSlider && this._hasMin && this._hasMax ) {

    			// If this is the first time we're hearing about min and max
    			// and we haven't explicitly stated what our step is, let's
    			// update that too.
    			if ( !this._stepExplicit ) {
    				this.step( this._getImplicitStep(), false );
    			}

    			this._initSlider();
    			this.updateDisplay();

    		}

    	}

    	_normalizeMouseWheel( e ) {

    		let { deltaX, deltaY } = e;

    		// Safari and Chrome report weird non-integral values for a notched wheel,
    		// but still expose actual lines scrolled via wheelDelta. Notched wheels
    		// should behave the same way as arrow keys.
    		if ( Math.floor( e.deltaY ) !== e.deltaY && e.wheelDelta ) {
    			deltaX = 0;
    			deltaY = -e.wheelDelta / 120;
    			deltaY *= this._stepExplicit ? 1 : 10;
    		}

    		const wheel = deltaX + -deltaY;

    		return wheel;

    	}

    	_arrowKeyMultiplier( e ) {

    		let mult = this._stepExplicit ? 1 : 10;

    		if ( e.shiftKey ) {
    			mult *= 10;
    		} else if ( e.altKey ) {
    			mult /= 10;
    		}

    		return mult;

    	}

    	_snap( value ) {

    		// Make the steps "start" at min or max.
    		let offset = 0;
    		if ( this._hasMin ) {
    			offset = this._min;
    		} else if ( this._hasMax ) {
    			offset = this._max;
    		}

    		value -= offset;

    		value = Math.round( value / this._step ) * this._step;

    		value += offset;

    		// Used to prevent "flyaway" decimals like 1.00000000000001
    		value = parseFloat( value.toPrecision( 15 ) );

    		return value;

    	}

    	_clamp( value ) {
    		// either condition is false if min or max is undefined
    		if ( value < this._min ) value = this._min;
    		if ( value > this._max ) value = this._max;
    		return value;
    	}

    	_snapClampSetValue( value ) {
    		this.setValue( this._clamp( this._snap( value ) ) );
    	}

    	get _hasScrollBar() {
    		const root = this.parent.root.$children;
    		return root.scrollHeight > root.clientHeight;
    	}

    	get _hasMin() {
    		return this._min !== undefined;
    	}

    	get _hasMax() {
    		return this._max !== undefined;
    	}

    }

    class OptionController extends Controller {

    	constructor( parent, object, property, options ) {

    		super( parent, object, property, 'option' );

    		this.$select = document.createElement( 'select' );
    		this.$select.setAttribute( 'aria-labelledby', this.$name.id );

    		this.$display = document.createElement( 'div' );
    		this.$display.classList.add( 'display' );

    		this.$select.addEventListener( 'change', () => {
    			this.setValue( this._values[ this.$select.selectedIndex ] );
    			this._callOnFinishChange();
    		} );

    		this.$select.addEventListener( 'focus', () => {
    			this.$display.classList.add( 'focus' );
    		} );

    		this.$select.addEventListener( 'blur', () => {
    			this.$display.classList.remove( 'focus' );
    		} );

    		this.$widget.appendChild( this.$select );
    		this.$widget.appendChild( this.$display );

    		this.$disable = this.$select;

    		this.options( options );

    	}

    	options( options ) {

    		this._values = Array.isArray( options ) ? options : Object.values( options );
    		this._names = Array.isArray( options ) ? options : Object.keys( options );

    		this.$select.replaceChildren();

    		this._names.forEach( name => {
    			const $option = document.createElement( 'option' );
    			$option.textContent = name;
    			this.$select.appendChild( $option );
    		} );

    		this.updateDisplay();

    		return this;

    	}

    	updateDisplay() {
    		const value = this.getValue();
    		const index = this._values.indexOf( value );
    		this.$select.selectedIndex = index;
    		this.$display.textContent = index === -1 ? value : this._names[ index ];
    		return this;
    	}

    }

    class StringController extends Controller {

    	constructor( parent, object, property ) {

    		super( parent, object, property, 'string' );

    		this.$input = document.createElement( 'input' );
    		this.$input.setAttribute( 'type', 'text' );
    		this.$input.setAttribute( 'spellcheck', 'false' );
    		this.$input.setAttribute( 'aria-labelledby', this.$name.id );

    		this.$input.addEventListener( 'input', () => {
    			this.setValue( this.$input.value );
    		} );

    		this.$input.addEventListener( 'keydown', e => {
    			if ( e.code === 'Enter' ) {
    				this.$input.blur();
    			}
    		} );

    		this.$input.addEventListener( 'blur', () => {
    			this._callOnFinishChange();
    		} );

    		this.$widget.appendChild( this.$input );

    		this.$disable = this.$input;

    		this.updateDisplay();

    	}

    	updateDisplay() {
    		this.$input.value = this.getValue();
    		return this;
    	}

    }

    var stylesheet = `.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;

    function _injectStyles( cssContent ) {
    	const injected = document.createElement( 'style' );
    	injected.innerHTML = cssContent;
    	const before = document.querySelector( 'head link[rel=stylesheet], head style' );
    	if ( before ) {
    		document.head.insertBefore( injected, before );
    	} else {
    		document.head.appendChild( injected );
    	}
    }


    let stylesInjected = false;

    class GUI {

    	/**
    	 * Creates a panel that holds controllers.
    	 * @example
    	 * new GUI();
    	 * new GUI( { container: document.getElementById( 'custom' ) } );
    	 *
    	 * @param {object} [options]
    	 * @param {boolean} [options.autoPlace=true]
    	 * Adds the GUI to `document.body` and fixes it to the top right of the page.
    	 *
    	 * @param {HTMLElement} [options.container]
    	 * Adds the GUI to this DOM element. Overrides `autoPlace`.
    	 *
    	 * @param {number} [options.width=245]
    	 * Width of the GUI in pixels, usually set when name labels become too long. Note that you can make
    	 * name labels wider in CSS with `.lil‑gui { ‑‑name‑width: 55% }`.
    	 *
    	 * @param {string} [options.title=Controls]
    	 * Name to display in the title bar.
    	 *
    	 * @param {boolean} [options.closeFolders=false]
    	 * Pass `true` to close all folders in this GUI by default.
    	 *
    	 * @param {boolean} [options.injectStyles=true]
    	 * Injects the default stylesheet into the page if this is the first GUI.
    	 * Pass `false` to use your own stylesheet.
    	 *
    	 * @param {number} [options.touchStyles=true]
    	 * Makes controllers larger on touch devices. Pass `false` to disable touch styles.
    	 *
    	 * @param {GUI} [options.parent]
    	 * Adds this GUI as a child in another GUI. Usually this is done for you by `addFolder()`.
    	 */
    	constructor( {
    		parent,
    		autoPlace = parent === undefined,
    		container,
    		width,
    		title = 'Controls',
    		closeFolders = false,
    		injectStyles = true,
    		touchStyles = true
    	} = {} ) {

    		/**
    		 * The GUI containing this folder, or `undefined` if this is the root GUI.
    		 * @type {GUI}
    		 */
    		this.parent = parent;

    		/**
    		 * The top level GUI containing this folder, or `this` if this is the root GUI.
    		 * @type {GUI}
    		 */
    		this.root = parent ? parent.root : this;

    		/**
    		 * The list of controllers and folders contained by this GUI.
    		 * @type {Array<GUI|Controller>}
    		 */
    		this.children = [];

    		/**
    		 * The list of controllers contained by this GUI.
    		 * @type {Array<Controller>}
    		 */
    		this.controllers = [];

    		/**
    		 * The list of folders contained by this GUI.
    		 * @type {Array<GUI>}
    		 */
    		this.folders = [];

    		/**
    		 * Used to determine if the GUI is closed. Use `gui.open()` or `gui.close()` to change this.
    		 * @type {boolean}
    		 */
    		this._closed = false;

    		/**
    		 * Used to determine if the GUI is hidden. Use `gui.show()` or `gui.hide()` to change this.
    		 * @type {boolean}
    		 */
    		this._hidden = false;

    		/**
    		 * The outermost container element.
    		 * @type {HTMLElement}
    		 */
    		this.domElement = document.createElement( 'div' );
    		this.domElement.classList.add( 'lil-gui' );

    		/**
    		 * The DOM element that contains the title.
    		 * @type {HTMLElement}
    		 */
    		this.$title = document.createElement( 'button' );
    		this.$title.classList.add( 'title' );
    		this.$title.setAttribute( 'aria-expanded', true );

    		this.$title.addEventListener( 'click', () => this.openAnimated( this._closed ) );

    		// enables :active pseudo class on mobile
    		this.$title.addEventListener( 'touchstart', () => {}, { passive: true } );

    		/**
    		 * The DOM element that contains children.
    		 * @type {HTMLElement}
    		 */
    		this.$children = document.createElement( 'div' );
    		this.$children.classList.add( 'children' );

    		this.domElement.appendChild( this.$title );
    		this.domElement.appendChild( this.$children );

    		this.title( title );

    		if ( this.parent ) {

    			this.parent.children.push( this );
    			this.parent.folders.push( this );

    			this.parent.$children.appendChild( this.domElement );

    			// Stop the constructor early, everything onward only applies to root GUI's
    			return;

    		}

    		this.domElement.classList.add( 'root' );

    		if ( touchStyles ) {
    			this.domElement.classList.add( 'allow-touch-styles' );
    		}

    		// Inject stylesheet if we haven't done that yet
    		if ( !stylesInjected && injectStyles ) {
    			_injectStyles( stylesheet );
    			stylesInjected = true;
    		}

    		if ( container ) {

    			container.appendChild( this.domElement );

    		} else if ( autoPlace ) {

    			this.domElement.classList.add( 'autoPlace' );
    			document.body.appendChild( this.domElement );

    		}

    		if ( width ) {
    			this.domElement.style.setProperty( '--width', width + 'px' );
    		}

    		this._closeFolders = closeFolders;

    	}

    	/**
    	 * Adds a controller to the GUI, inferring controller type using the `typeof` operator.
    	 * @example
    	 * gui.add( object, 'property' );
    	 * gui.add( object, 'number', 0, 100, 1 );
    	 * gui.add( object, 'options', [ 1, 2, 3 ] );
    	 *
    	 * @param {object} object The object the controller will modify.
    	 * @param {string} property Name of the property to control.
    	 * @param {number|object|Array} [$1] Minimum value for number controllers, or the set of
    	 * selectable values for a dropdown.
    	 * @param {number} [max] Maximum value for number controllers.
    	 * @param {number} [step] Step value for number controllers.
    	 * @returns {Controller}
    	 */
    	add( object, property, $1, max, step ) {

    		if ( Object( $1 ) === $1 ) {

    			return new OptionController( this, object, property, $1 );

    		}

    		const initialValue = object[ property ];

    		switch ( typeof initialValue ) {

    			case 'number':

    				return new NumberController( this, object, property, $1, max, step );

    			case 'boolean':

    				return new BooleanController( this, object, property );

    			case 'string':

    				return new StringController( this, object, property );

    			case 'function':

    				return new FunctionController( this, object, property );

    		}

    		console.error( `gui.add failed
	property:`, property, `
	object:`, object, `
	value:`, initialValue );

    	}

    	/**
    	 * Adds a color controller to the GUI.
    	 * @example
    	 * params = {
    	 * 	cssColor: '#ff00ff',
    	 * 	rgbColor: { r: 0, g: 0.2, b: 0.4 },
    	 * 	customRange: [ 0, 127, 255 ],
    	 * };
    	 *
    	 * gui.addColor( params, 'cssColor' );
    	 * gui.addColor( params, 'rgbColor' );
    	 * gui.addColor( params, 'customRange', 255 );
    	 *
    	 * @param {object} object The object the controller will modify.
    	 * @param {string} property Name of the property to control.
    	 * @param {number} rgbScale Maximum value for a color channel when using an RGB color. You may
    	 * need to set this to 255 if your colors are too bright.
    	 * @returns {Controller}
    	 */
    	addColor( object, property, rgbScale = 1 ) {
    		return new ColorController( this, object, property, rgbScale );
    	}

    	/**
    	 * Adds a folder to the GUI, which is just another GUI. This method returns
    	 * the nested GUI so you can add controllers to it.
    	 * @example
    	 * const folder = gui.addFolder( 'Position' );
    	 * folder.add( position, 'x' );
    	 * folder.add( position, 'y' );
    	 * folder.add( position, 'z' );
    	 *
    	 * @param {string} title Name to display in the folder's title bar.
    	 * @returns {GUI}
    	 */
    	addFolder( title ) {
    		const folder = new GUI( { parent: this, title } );
    		if ( this.root._closeFolders ) folder.close();
    		return folder;
    	}

    	/**
    	 * Recalls values that were saved with `gui.save()`.
    	 * @param {object} obj
    	 * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
    	 * @returns {this}
    	 */
    	load( obj, recursive = true ) {

    		if ( obj.controllers ) {

    			this.controllers.forEach( c => {

    				if ( c instanceof FunctionController ) return;

    				if ( c._name in obj.controllers ) {
    					c.load( obj.controllers[ c._name ] );
    				}

    			} );

    		}

    		if ( recursive && obj.folders ) {

    			this.folders.forEach( f => {

    				if ( f._title in obj.folders ) {
    					f.load( obj.folders[ f._title ] );
    				}

    			} );

    		}

    		return this;

    	}

    	/**
    	 * Returns an object mapping controller names to values. The object can be passed to `gui.load()` to
    	 * recall these values.
    	 * @example
    	 * {
    	 * 	controllers: {
    	 * 		prop1: 1,
    	 * 		prop2: 'value',
    	 * 		...
    	 * 	},
    	 * 	folders: {
    	 * 		folderName1: { controllers, folders },
    	 * 		folderName2: { controllers, folders }
    	 * 		...
    	 * 	}
    	 * }
    	 *
    	 * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
    	 * @returns {object}
    	 */
    	save( recursive = true ) {

    		const obj = {
    			controllers: {},
    			folders: {}
    		};

    		this.controllers.forEach( c => {

    			if ( c instanceof FunctionController ) return;

    			if ( c._name in obj.controllers ) {
    				throw new Error( `Cannot save GUI with duplicate property "${c._name}"` );
    			}

    			obj.controllers[ c._name ] = c.save();

    		} );

    		if ( recursive ) {

    			this.folders.forEach( f => {

    				if ( f._title in obj.folders ) {
    					throw new Error( `Cannot save GUI with duplicate folder "${f._title}"` );
    				}

    				obj.folders[ f._title ] = f.save();

    			} );

    		}

    		return obj;

    	}

    	/**
    	 * Opens a GUI or folder. GUI and folders are open by default.
    	 * @param {boolean} open Pass false to close.
    	 * @returns {this}
    	 * @example
    	 * gui.open(); // open
    	 * gui.open( false ); // close
    	 * gui.open( gui._closed ); // toggle
    	 */
    	open( open = true ) {

    		this._setClosed( !open );

    		this.$title.setAttribute( 'aria-expanded', !this._closed );
    		this.domElement.classList.toggle( 'closed', this._closed );

    		return this;

    	}

    	/**
    	 * Closes the GUI.
    	 * @returns {this}
    	 */
    	close() {
    		return this.open( false );
    	}

    	_setClosed( closed ) {
    		if ( this._closed === closed ) return;
    		this._closed = closed;
    		this._callOnOpenClose( this );
    	}

    	/**
    	 * Shows the GUI after it's been hidden.
    	 * @param {boolean} show
    	 * @returns {this}
    	 * @example
    	 * gui.show();
    	 * gui.show( false ); // hide
    	 * gui.show( gui._hidden ); // toggle
    	 */
    	show( show = true ) {

    		this._hidden = !show;

    		this.domElement.style.display = this._hidden ? 'none' : '';

    		return this;

    	}

    	/**
    	 * Hides the GUI.
    	 * @returns {this}
    	 */
    	hide() {
    		return this.show( false );
    	}

    	openAnimated( open = true ) {

    		// set state immediately
    		this._setClosed( !open );

    		this.$title.setAttribute( 'aria-expanded', !this._closed );

    		// wait for next frame to measure $children
    		requestAnimationFrame( () => {

    			// explicitly set initial height for transition
    			const initialHeight = this.$children.clientHeight;
    			this.$children.style.height = initialHeight + 'px';

    			this.domElement.classList.add( 'transition' );

    			const onTransitionEnd = e => {
    				if ( e.target !== this.$children ) return;
    				this.$children.style.height = '';
    				this.domElement.classList.remove( 'transition' );
    				this.$children.removeEventListener( 'transitionend', onTransitionEnd );
    			};

    			this.$children.addEventListener( 'transitionend', onTransitionEnd );

    			// todo: this is wrong if children's scrollHeight makes for a gui taller than maxHeight
    			const targetHeight = !open ? 0 : this.$children.scrollHeight;

    			this.domElement.classList.toggle( 'closed', !open );

    			requestAnimationFrame( () => {
    				this.$children.style.height = targetHeight + 'px';
    			} );

    		} );

    		return this;

    	}

    	/**
    	 * Change the title of this GUI.
    	 * @param {string} title
    	 * @returns {this}
    	 */
    	title( title ) {
    		/**
    		 * Current title of the GUI. Use `gui.title( 'Title' )` to modify this value.
    		 * @type {string}
    		 */
    		this._title = title;
    		this.$title.textContent = title;
    		return this;
    	}

    	/**
    	 * Resets all controllers to their initial values.
    	 * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
    	 * @returns {this}
    	 */
    	reset( recursive = true ) {
    		const controllers = recursive ? this.controllersRecursive() : this.controllers;
    		controllers.forEach( c => c.reset() );
    		return this;
    	}

    	/**
    	 * Pass a function to be called whenever a controller in this GUI changes.
    	 * @param {function({object:object, property:string, value:any, controller:Controller})} callback
    	 * @returns {this}
    	 * @example
    	 * gui.onChange( event => {
    	 * 	event.object     // object that was modified
    	 * 	event.property   // string, name of property
    	 * 	event.value      // new value of controller
    	 * 	event.controller // controller that was modified
    	 * } );
    	 */
    	onChange( callback ) {
    		/**
    		 * Used to access the function bound to `onChange` events. Don't modify this value
    		 * directly. Use the `gui.onChange( callback )` method instead.
    		 * @type {Function}
    		 */
    		this._onChange = callback;
    		return this;
    	}

    	_callOnChange( controller ) {

    		if ( this.parent ) {
    			this.parent._callOnChange( controller );
    		}

    		if ( this._onChange !== undefined ) {
    			this._onChange.call( this, {
    				object: controller.object,
    				property: controller.property,
    				value: controller.getValue(),
    				controller
    			} );
    		}
    	}

    	/**
    	 * Pass a function to be called whenever a controller in this GUI has finished changing.
    	 * @param {function({object:object, property:string, value:any, controller:Controller})} callback
    	 * @returns {this}
    	 * @example
    	 * gui.onFinishChange( event => {
    	 * 	event.object     // object that was modified
    	 * 	event.property   // string, name of property
    	 * 	event.value      // new value of controller
    	 * 	event.controller // controller that was modified
    	 * } );
    	 */
    	onFinishChange( callback ) {
    		/**
    		 * Used to access the function bound to `onFinishChange` events. Don't modify this value
    		 * directly. Use the `gui.onFinishChange( callback )` method instead.
    		 * @type {Function}
    		 */
    		this._onFinishChange = callback;
    		return this;
    	}

    	_callOnFinishChange( controller ) {

    		if ( this.parent ) {
    			this.parent._callOnFinishChange( controller );
    		}

    		if ( this._onFinishChange !== undefined ) {
    			this._onFinishChange.call( this, {
    				object: controller.object,
    				property: controller.property,
    				value: controller.getValue(),
    				controller
    			} );
    		}
    	}

    	/**
    	 * Pass a function to be called when this GUI or its descendants are opened or closed.
    	 * @param {function(GUI)} callback
    	 * @returns {this}
    	 * @example
    	 * gui.onOpenClose( changedGUI => {
    	 * 	console.log( changedGUI._closed );
    	 * } );
    	 */
    	onOpenClose( callback ) {
    		this._onOpenClose = callback;
    		return this;
    	}

    	_callOnOpenClose( changedGUI ) {
    		if ( this.parent ) {
    			this.parent._callOnOpenClose( changedGUI );
    		}

    		if ( this._onOpenClose !== undefined ) {
    			this._onOpenClose.call( this, changedGUI );
    		}
    	}

    	/**
    	 * Destroys all DOM elements and event listeners associated with this GUI.
    	 */
    	destroy() {

    		if ( this.parent ) {
    			this.parent.children.splice( this.parent.children.indexOf( this ), 1 );
    			this.parent.folders.splice( this.parent.folders.indexOf( this ), 1 );
    		}

    		if ( this.domElement.parentElement ) {
    			this.domElement.parentElement.removeChild( this.domElement );
    		}

    		Array.from( this.children ).forEach( c => c.destroy() );

    	}

    	/**
    	 * Returns an array of controllers contained by this GUI and its descendents.
    	 * @returns {Controller[]}
    	 */
    	controllersRecursive() {
    		let controllers = Array.from( this.controllers );
    		this.folders.forEach( f => {
    			controllers = controllers.concat( f.controllersRecursive() );
    		} );
    		return controllers;
    	}

    	/**
    	 * Returns an array of folders contained by this GUI and its descendents.
    	 * @returns {GUI[]}
    	 */
    	foldersRecursive() {
    		let folders = Array.from( this.folders );
    		this.folders.forEach( f => {
    			folders = folders.concat( f.foldersRecursive() );
    		} );
    		return folders;
    	}

    }

    function initializeGUI(particleSystem) {
      const gui = new GUI();

      // Particles
      const particleFolder = gui.addFolder("Particles");
      particleFolder
        .add(particleSystem.config, "maxParticles", 1000, 50000, 1000)
        .onChange((value) => {
          particleSystem.setConfig({ maxParticles: value });
        });
      particleFolder
        .add(particleSystem.config, "baseSize", 0.1, 2, 0.1)
        .onChange((value) => {
          particleSystem.setConfig({ baseSize: value });
        });
      particleFolder
        .add(particleSystem.config, "sizeDeviation", 0.1, 2, 0.1)
        .onChange((value) => {
          particleSystem.setConfig({ sizeDeviation: value });
        });
      particleFolder
        .add(particleSystem.config, "baseLife", 100, 5000, 100)
        .onChange((value) => {
          particleSystem.setConfig({ baseLife: value });
        });
      particleFolder
        .add(particleSystem.config, "lifeDeviation", 0, 1000, 50)
        .onChange((value) => {
          particleSystem.setConfig({ lifeDeviation: value });
        });

      // Physics
      const physicsFolder = gui.addFolder("Physics");
      physicsFolder
        .add(particleSystem.config, "mass", 0.1, 5, 0.1)
        .onChange((value) => {
          particleSystem.setConfig({ mass: value });
        });
      physicsFolder
        .add(particleSystem.config, "cursorGravity", 0, 5, 0.1)
        .onChange((value) => {
          particleSystem.setConfig({ cursorGravity: value });
        });
      physicsFolder
        .add(particleSystem.config, "attractionRadius", 10, 300, 10)
        .onChange((value) => {
          particleSystem.setConfig({ attractionRadius: value });
        });
      physicsFolder
        .add(particleSystem.config, "upwardForce", 0, 0.05, 0.001)
        .onChange((value) => {
          particleSystem.setConfig({ upwardForce: value });
        });
      physicsFolder
        .add(particleSystem.config, "friction", 0.8, 1, 0.01)
        .onChange((value) => {
          particleSystem.setConfig({ friction: value });
        });

      // Annihilation
      const annihilationFolder = gui.addFolder("Annihilation");
      annihilationFolder
        .add(particleSystem.config, "baseAnnihilationRadius", 1, 20, 1)
        .onChange((value) => {
          particleSystem.setConfig({ baseAnnihilationRadius: value });
        });
      annihilationFolder
        .add(particleSystem.config, "annihilationSpeed", 0, 0.2, 0.01)
        .onChange((value) => {
          particleSystem.setConfig({ annihilationSpeed: value });
        });

      // Movement
      const movementFolder = gui.addFolder("Movement");
      movementFolder
        .add(particleSystem.config, "driftSpeed", 0, 1, 0.05)
        .onChange((value) => {
          particleSystem.setConfig({ driftSpeed: value });
        });

      // Colors
      const colorsFolder = gui.addFolder("Colors");
      const colorConfig = {
        color1: particleSystem.config.baseColors[0],
        color2: particleSystem.config.baseColors[1],
      };

      colorsFolder.addColor(colorConfig, "color1").onChange((value) => {
        particleSystem.setConfig({
          baseColors: [value, particleSystem.config.baseColors[1]],
        });
      });
      colorsFolder.addColor(colorConfig, "color2").onChange((value) => {
        particleSystem.setConfig({
          baseColors: [particleSystem.config.baseColors[0], value],
        });
      });

      // Open folders by default
      particleFolder.open();
      physicsFolder.open();
      annihilationFolder.open();
      movementFolder.open();
      colorsFolder.open();

      return gui;
    }

    const svg = document.getElementById("constraint");
    const canvas = document.getElementById("particleCanvas");

    svg.addEventListener("load", () => {
      const system = new a({ canvas, svg });

      system.init();

      initializeGUI(system);
    });

})();
//# sourceMappingURL=bundle.js.map
