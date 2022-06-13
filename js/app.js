(() => {
    var __webpack_modules__ = {
        615: function(module) {
            /*!
* fullPage 4.0.7
* https://github.com/alvarotrigo/fullPage.js
*
* @license GPLv3 for open source use only
* or Fullpage Commercial License for commercial use
* http://alvarotrigo.com/fullPage/pricing/
*
* Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
*/
            (function(global, factory) {
                true ? module.exports = factory() : 0;
            })(0, (function() {
                "use strict";
                if (!Array.prototype.find) Object.defineProperty(Array.prototype, "find", {
                    value: function value(predicate) {
                        if (null == this) throw new TypeError('"this" is null or not defined');
                        var o = Object(this);
                        var len = o.length >>> 0;
                        if ("function" !== typeof predicate) throw new TypeError("predicate must be a function");
                        var thisArg = arguments[1];
                        var k = 0;
                        while (k < len) {
                            var kValue = o[k];
                            if (predicate.call(thisArg, kValue, k, o)) return kValue;
                            k++;
                        }
                        return;
                    }
                });
                if (!Array.from) Array.from = function() {
                    var toStr = Object.prototype.toString;
                    var isCallable = function isCallable(fn) {
                        return "function" === typeof fn || "[object Function]" === toStr.call(fn);
                    };
                    var toInteger = function toInteger(value) {
                        var number = Number(value);
                        if (isNaN(number)) return 0;
                        if (0 === number || !isFinite(number)) return number;
                        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
                    };
                    var maxSafeInteger = Math.pow(2, 53) - 1;
                    var toLength = function toLength(value) {
                        var len = toInteger(value);
                        return Math.min(Math.max(len, 0), maxSafeInteger);
                    };
                    return function from(arrayLike) {
                        var C = this;
                        var items = Object(arrayLike);
                        if (null == arrayLike) throw new TypeError("Array.from requires an array-like object - not null or undefined");
                        var mapFn = arguments.length > 1 ? arguments[1] : void void 0;
                        var T;
                        if ("undefined" !== typeof mapFn) {
                            if (!isCallable(mapFn)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                            if (arguments.length > 2) T = arguments[2];
                        }
                        var len = toLength(items.length);
                        var A = isCallable(C) ? Object(new C(len)) : new Array(len);
                        var k = 0;
                        var kValue;
                        while (k < len) {
                            kValue = items[k];
                            if (mapFn) A[k] = "undefined" === typeof T ? mapFn(kValue, k) : mapFn.call(T, kValue, k); else A[k] = kValue;
                            k += 1;
                        }
                        A.length = len;
                        return A;
                    };
                }();
                var win = window;
                var doc = document;
                var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
                var isMacDevice = /(Mac|iPhone|iPod|iPad)/i.test(win.navigator.userAgent);
                var isTouch = "ontouchstart" in win || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints;
                var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
                var FP = {
                    test: {},
                    shared: {}
                };
                var extensions = [ "parallax", "scrollOverflowReset", "dragAndMove", "offsetSections", "fadingEffect", "responsiveSlides", "continuousHorizontal", "interlockedSlides", "scrollHorizontally", "resetSliders", "cards", "dropEffect", "waterEffect" ];
                if (win.NodeList && !NodeList.prototype.forEach) NodeList.prototype.forEach = function(callback, thisArg) {
                    thisArg = thisArg || window;
                    for (var i = 0; i < this.length; i++) callback.call(thisArg, this[i], i, this);
                };
                if ("function" != typeof Object.assign) Object.defineProperty(Object, "assign", {
                    value: function assign(target, varArgs) {
                        if (null == target) throw new TypeError("Cannot convert undefined or null to object");
                        var to = Object(target);
                        for (var index = 1; index < arguments.length; index++) {
                            var nextSource = arguments[index];
                            if (null != nextSource) for (var nextKey in nextSource) if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) to[nextKey] = nextSource[nextKey];
                        }
                        return to;
                    },
                    writable: true,
                    configurable: true
                });
                function showError(type, text) {
                    win.console && win.console[type] && win.console[type]("fullPage: " + text);
                }
                function isVisible(el) {
                    var style = win.getComputedStyle(el);
                    return "none" !== style.display;
                }
                function getVisible(elements) {
                    return Array.from(elements).filter((function(e) {
                        return isVisible(e);
                    }));
                }
                function $(selector, context) {
                    context = arguments.length > 1 ? context : document;
                    return context ? context.querySelectorAll(selector) : null;
                }
                function deepExtend(out) {
                    out = out || {};
                    for (var i = 1, len = arguments.length; i < len; ++i) {
                        var obj = arguments[i];
                        if (!obj) continue;
                        for (var key in obj) {
                            if (!obj.hasOwnProperty(key) || "__proto__" == key || "constructor" == key) continue;
                            if ("[object Object]" === Object.prototype.toString.call(obj[key])) {
                                out[key] = deepExtend(out[key], obj[key]);
                                continue;
                            }
                            out[key] = obj[key];
                        }
                    }
                    return out;
                }
                function hasClass(el, className) {
                    if (null == el) return false;
                    return el.classList.contains(className);
                }
                function getWindowHeight() {
                    return "innerHeight" in win ? win.innerHeight : doc.documentElement.offsetHeight;
                }
                function getWindowWidth() {
                    return win.innerWidth;
                }
                function css(items, props) {
                    items = getList(items);
                    var key;
                    for (key in props) if (props.hasOwnProperty(key)) if (null !== key) for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        item.style[key] = props[key];
                    }
                    return items;
                }
                function prev(item) {
                    return item.previousElementSibling;
                }
                function next(item) {
                    return item.nextElementSibling;
                }
                function last(item) {
                    return item[item.length - 1];
                }
                function index(item, selector) {
                    item = isArrayOrList(item) ? item[0] : item;
                    var children = null != selector ? $(selector, item.parentNode) : item.parentNode.childNodes;
                    var num = 0;
                    for (var i = 0; i < children.length; i++) {
                        if (children[i] == item) return num;
                        if (1 == children[i].nodeType) num++;
                    }
                    return -1;
                }
                function getList(item) {
                    return !isArrayOrList(item) ? [ item ] : item;
                }
                function hide(el) {
                    el = getList(el);
                    for (var i = 0; i < el.length; i++) el[i].style.display = "none";
                    return el;
                }
                function show(el) {
                    el = getList(el);
                    for (var i = 0; i < el.length; i++) el[i].style.display = "block";
                    return el;
                }
                function isArrayOrList(el) {
                    return "[object Array]" === Object.prototype.toString.call(el) || "[object NodeList]" === Object.prototype.toString.call(el);
                }
                function addClass(el, className) {
                    el = getList(el);
                    for (var i = 0; i < el.length; i++) {
                        var item = el[i];
                        item.classList.add(className);
                    }
                    return el;
                }
                function removeClass(el, className) {
                    el = getList(el);
                    var classNames = className.split(" ");
                    for (var a = 0; a < classNames.length; a++) {
                        className = classNames[a];
                        for (var i = 0; i < el.length; i++) {
                            var item = el[i];
                            item.classList.remove(className);
                        }
                    }
                    return el;
                }
                function appendTo(el, parent) {
                    parent.appendChild(el);
                }
                function wrap(toWrap, wrapper, isWrapAll) {
                    var newParent;
                    wrapper = wrapper || doc.createElement("div");
                    for (var i = 0; i < toWrap.length; i++) {
                        var item = toWrap[i];
                        if (isWrapAll && !i || !isWrapAll) {
                            newParent = wrapper.cloneNode(true);
                            item.parentNode.insertBefore(newParent, item);
                        }
                        newParent.appendChild(item);
                    }
                    return toWrap;
                }
                function wrapAll(toWrap, wrapper) {
                    wrap(toWrap, wrapper, true);
                }
                function unwrap(wrapper) {
                    var wrapperContent = doc.createDocumentFragment();
                    while (wrapper.firstChild) wrapperContent.appendChild(wrapper.firstChild);
                    wrapper.parentNode.replaceChild(wrapperContent, wrapper);
                }
                function closest(el, selector) {
                    if (el && 1 === el.nodeType) {
                        if (matches(el, selector)) return el;
                        return closest(el.parentNode, selector);
                    }
                    return null;
                }
                function after(reference, el) {
                    insertBefore(reference, reference.nextSibling, el);
                }
                function before(reference, el) {
                    insertBefore(reference, reference, el);
                }
                function insertBefore(reference, beforeElement, el) {
                    if (!isArrayOrList(el)) {
                        if ("string" == typeof el) el = createElementFromHTML(el);
                        el = [ el ];
                    }
                    for (var i = 0; i < el.length; i++) reference.parentNode.insertBefore(el[i], beforeElement);
                }
                function getScrollTop(options) {
                    if ("undefined" !== typeof options && options.fitToSection) return doc.body.scrollTop;
                    var docElement = doc.documentElement;
                    return (win.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0);
                }
                function siblings(el) {
                    return Array.prototype.filter.call(el.parentNode.children, (function(child) {
                        return child !== el;
                    }));
                }
                function preventDefault(event) {
                    event.preventDefault();
                }
                function getAttr(el, attr) {
                    return el.getAttribute(attr);
                }
                function docAddEvent(event, callback, options) {
                    doc.addEventListener(event, callback, "undefined" === options ? null : options);
                }
                function windowAddEvent(event, callback, options) {
                    win.addEventListener(event, callback, "undefined" === options ? null : options);
                }
                function docRemoveEvent(event, callback, options) {
                    doc.removeEventListener(event, callback, "undefined" === options ? null : options);
                }
                function windowRemoveEvent(event, callback, options) {
                    win.removeEventListener(event, callback, "undefined" === options ? null : options);
                }
                function isFunction(item) {
                    if ("function" === typeof item) return true;
                    var type = Object.prototype.toString.call(item);
                    return "[object Function]" === type || "[object GeneratorFunction]" === type;
                }
                function trigger(el, eventName, data) {
                    var event;
                    data = "undefined" === typeof data ? {} : data;
                    if ("function" === typeof win.CustomEvent) event = new CustomEvent(eventName, {
                        detail: data
                    }); else {
                        event = doc.createEvent("CustomEvent");
                        event.initCustomEvent(eventName, true, true, data);
                    }
                    el.dispatchEvent(event);
                }
                function matches(el, selector) {
                    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
                }
                function toggle(el, value) {
                    if ("boolean" === typeof value) for (var i = 0; i < el.length; i++) el[i].style.display = value ? "block" : "none";
                    return el;
                }
                function createElementFromHTML(htmlString) {
                    var div = doc.createElement("div");
                    div.innerHTML = htmlString.trim();
                    return div.firstChild;
                }
                function remove(items) {
                    items = getList(items);
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item && item.parentElement) item.parentNode.removeChild(item);
                    }
                }
                function untilAll(item, selector, fn) {
                    var sibling = item[fn];
                    var siblings = [];
                    while (sibling) {
                        if (matches(sibling, selector) || null == selector) siblings.push(sibling);
                        sibling = sibling[fn];
                    }
                    return siblings;
                }
                function nextAll(item, selector) {
                    return untilAll(item, selector, "nextElementSibling");
                }
                function prevAll(item, selector) {
                    return untilAll(item, selector, "previousElementSibling");
                }
                function toArray(objectData) {
                    return Object.keys(objectData).map((function(key) {
                        return objectData[key];
                    }));
                }
                function getLast(items) {
                    return items[items.length - 1];
                }
                function getAverage(elements, number) {
                    var sum = 0;
                    var lastElements = elements.slice(Math.max(elements.length - number, 1));
                    for (var i = 0; i < lastElements.length; i++) sum += lastElements[i];
                    return Math.ceil(sum / number);
                }
                function setSrc(element, attribute) {
                    element.setAttribute(attribute, getAttr(element, "data-" + attribute));
                    element.removeAttribute("data-" + attribute);
                }
                function getParentsUntil(item, topParentSelector) {
                    var parents = [ item ];
                    do {
                        item = item.parentNode;
                        parents.push(item);
                    } while (!matches(item, topParentSelector));
                    return parents;
                }
                window["fp_utils"] = {
                    $,
                    deepExtend,
                    hasClass,
                    getWindowHeight,
                    css,
                    prev,
                    next,
                    last,
                    index,
                    getList,
                    hide,
                    show,
                    isArrayOrList,
                    addClass,
                    removeClass,
                    appendTo,
                    wrap,
                    wrapAll,
                    unwrap,
                    closest,
                    after,
                    before,
                    insertBefore,
                    getScrollTop,
                    siblings,
                    preventDefault,
                    isFunction,
                    trigger,
                    matches,
                    toggle,
                    createElementFromHTML,
                    remove,
                    untilAll,
                    nextAll,
                    prevAll,
                    showError
                };
                function _typeof(obj) {
                    "@babel/helpers - typeof";
                    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) _typeof = function(obj) {
                        return typeof obj;
                    }; else _typeof = function(obj) {
                        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                    return _typeof(obj);
                }
                var EventEmitter = {
                    events: {},
                    on: function on(event, listener) {
                        var _this = this;
                        if ("object" !== _typeof(this.events[event])) this.events[event] = [];
                        this.events[event].push(listener);
                        return function() {
                            return _this.removeListener(event, listener);
                        };
                    },
                    removeListener: function removeListener(event, listener) {
                        if ("object" === _typeof(this.events[event])) {
                            var idx = this.events[event].indexOf(listener);
                            if (idx > -1) this.events[event].splice(idx, 1);
                        }
                    },
                    emit: function emit(event) {
                        var _this2 = this;
                        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
                        if ("object" === _typeof(this.events[event])) this.events[event].forEach((function(listener) {
                            return listener.apply(_this2, args);
                        }));
                    },
                    once: function once(event, listener) {
                        var _this3 = this;
                        var remove = this.on(event, (function() {
                            remove();
                            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                            listener.apply(_this3, args);
                        }));
                    }
                };
                var state = {
                    numSections: 0,
                    numSlides: 0,
                    slides: [],
                    sections: [],
                    activeSection: null,
                    scrollTrigger: null,
                    isBeyondFullpage: false,
                    aboutToScrollToFullPage: false,
                    slideMoving: false,
                    isResizing: false,
                    isScrolling: false,
                    lastScrolledDestiny: void 0,
                    lastScrolledSlide: void 0,
                    activeAnimation: false,
                    canScroll: true,
                    touchDirection: "none",
                    wheelDirection: "none",
                    isGrabbing: false,
                    isUsingWheel: false,
                    isWindowFocused: true,
                    previousDestTop: 0,
                    windowsHeight: getWindowHeight(),
                    isDoingContinousVertical: false,
                    timeouts: {},
                    scrollY: 0,
                    scrollX: 0
                };
                win.state = state;
                function setState(props) {
                    Object.assign(state, props);
                }
                function getState() {
                    return state;
                }
                EventEmitter.on("bindEvents", bindEvents$d);
                function bindEvents$d() {
                    [ "click", "touchstart" ].forEach((function(eventName) {
                        docAddEvent(eventName, delegatedEvents);
                    }));
                    windowAddEvent("focus", focusHandler);
                    internalEvents();
                }
                function internalEvents() {
                    EventEmitter.on("onDestroy", onDestroy$9);
                }
                function delegatedEvents(e) {
                    EventEmitter.emit("onClickOrTouch", {
                        e,
                        target: e.target
                    });
                }
                function onDestroy$9() {
                    [ "click", "touchstart" ].forEach((function(eventName) {
                        docRemoveEvent(eventName, delegatedEvents);
                    }));
                }
                function focusHandler() {
                    setState({
                        isWindowFocused: true
                    });
                }
                var WRAPPER = "fullpage-wrapper";
                var WRAPPER_SEL = "." + WRAPPER;
                var RESPONSIVE = "fp-responsive";
                var NO_TRANSITION = "fp-notransition";
                var DESTROYED = "fp-destroyed";
                var ENABLED = "fp-enabled";
                var VIEWING_PREFIX = "fp-viewing";
                var ACTIVE = "active";
                var ACTIVE_SEL = "." + ACTIVE;
                var COMPLETELY = "fp-completely";
                var COMPLETELY_SEL = "." + COMPLETELY;
                var SNAPS = "fp-snaps";
                var SECTION_DEFAULT_SEL = ".section";
                var SECTION = "fp-section";
                var SECTION_SEL = "." + SECTION;
                var SECTION_ACTIVE_SEL = SECTION_SEL + ACTIVE_SEL;
                var TABLE_CELL = "fp-tableCell";
                var TABLE_CELL_SEL = "." + TABLE_CELL;
                var AUTO_HEIGHT = "fp-auto-height";
                var AUTO_HEIGHT_SEL = "." + AUTO_HEIGHT;
                var AUTO_HEIGHT_RESPONSIVE = "fp-auto-height-responsive";
                var AUTO_HEIGHT_RESPONSIVE_SEL = "." + AUTO_HEIGHT_RESPONSIVE;
                var NORMAL_SCROLL = "fp-normal-scroll";
                var SECTION_NAV = "fp-nav";
                var SECTION_NAV_SEL = "#" + SECTION_NAV;
                var SECTION_NAV_TOOLTIP = "fp-tooltip";
                var SECTION_NAV_TOOLTIP_SEL = "." + SECTION_NAV_TOOLTIP;
                var SHOW_ACTIVE_TOOLTIP = "fp-show-active";
                var SLIDE_DEFAULT_SEL = ".slide";
                var SLIDE = "fp-slide";
                var SLIDE_SEL = "." + SLIDE;
                var SLIDE_ACTIVE_SEL = SLIDE_SEL + ACTIVE_SEL;
                var SLIDES_WRAPPER = "fp-slides";
                var SLIDES_WRAPPER_SEL = "." + SLIDES_WRAPPER;
                var SLIDES_CONTAINER = "fp-slidesContainer";
                var SLIDES_CONTAINER_SEL = "." + SLIDES_CONTAINER;
                var TABLE = "fp-table";
                var OVERFLOW = "fp-overflow";
                var OVERFLOW_SEL = "." + OVERFLOW;
                var SLIDES_NAV = "fp-slidesNav";
                var SLIDES_NAV_SEL = "." + SLIDES_NAV;
                var SLIDES_NAV_LINK_SEL = SLIDES_NAV_SEL + " a";
                var SLIDES_STYLED_ARROW = "fp-arrow";
                var SLIDES_ARROW = "fp-controlArrow";
                var SLIDES_ARROW_SEL = "." + SLIDES_ARROW;
                var SLIDES_PREV = "fp-prev";
                var SLIDES_PREV_SEL = "." + SLIDES_PREV;
                var SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL;
                var SLIDES_NEXT = "fp-next";
                var SLIDES_NEXT_SEL = "." + SLIDES_NEXT;
                var SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL;
                var defaultOptions = {
                    menu: false,
                    anchors: [],
                    lockAnchors: false,
                    navigation: false,
                    navigationPosition: "right",
                    navigationTooltips: [],
                    showActiveTooltip: false,
                    slidesNavigation: false,
                    slidesNavPosition: "bottom",
                    scrollBar: false,
                    hybrid: false,
                    licenseKey: "",
                    credits: {
                        enabled: true,
                        label: "Made with fullPage.js",
                        position: "right"
                    },
                    css3: true,
                    scrollingSpeed: 700,
                    autoScrolling: true,
                    fitToSection: true,
                    easing: "easeInOutCubic",
                    easingcss3: "ease",
                    loopBottom: false,
                    loopTop: false,
                    loopHorizontal: true,
                    continuousVertical: false,
                    continuousHorizontal: false,
                    scrollHorizontally: false,
                    interlockedSlides: false,
                    dragAndMove: false,
                    offsetSections: false,
                    resetSliders: false,
                    fadingEffect: false,
                    normalScrollElements: null,
                    scrollOverflow: true,
                    scrollOverflowReset: false,
                    touchSensitivity: 5,
                    touchWrapper: null,
                    bigSectionsDestination: null,
                    keyboardScrolling: true,
                    animateAnchor: true,
                    recordHistory: true,
                    allowCorrectDirection: false,
                    scrollOverflowMacStyle: true,
                    controlArrows: true,
                    controlArrowsHTML: [ '<div class="' + SLIDES_STYLED_ARROW + '"></div>', '<div class="' + SLIDES_STYLED_ARROW + '"></div>' ],
                    controlArrowColor: "#fff",
                    verticalCentered: true,
                    sectionsColor: [],
                    paddingTop: 0,
                    paddingBottom: 0,
                    fixedElements: null,
                    responsive: 0,
                    responsiveWidth: 0,
                    responsiveHeight: 0,
                    responsiveSlides: false,
                    parallax: false,
                    parallaxOptions: {
                        type: "reveal",
                        percentage: 62,
                        property: "translate"
                    },
                    cards: false,
                    cardsOptions: {
                        perspective: 100,
                        fadeContent: true,
                        fadeBackground: true
                    },
                    sectionSelector: SECTION_DEFAULT_SEL,
                    slideSelector: SLIDE_DEFAULT_SEL,
                    afterLoad: null,
                    beforeLeave: null,
                    onLeave: null,
                    afterRender: null,
                    afterResize: null,
                    afterReBuild: null,
                    afterSlideLoad: null,
                    onSlideLeave: null,
                    afterResponsive: null,
                    onScrollOverflow: null,
                    lazyLoading: true,
                    observer: true
                };
                var container = null;
                var g_initialAnchorsInDom = false;
                var originals = deepExtend({}, defaultOptions);
                var g_options = null;
                function getInitialAnchorsInDom() {
                    return g_initialAnchorsInDom;
                }
                function setContainer(value) {
                    container = value;
                }
                function getContainer(value) {
                    return container;
                }
                function getOptions() {
                    return g_options || defaultOptions;
                }
                function setOptions(options) {
                    g_options = deepExtend({}, defaultOptions, options);
                    originals = Object.assign({}, g_options);
                }
                function getOriginals() {
                    return originals;
                }
                function setOption(name, value) {
                    defaultOptions[name] = value;
                }
                function setVariableState(variable, value, type) {
                    g_options[variable] = value;
                    if ("internal" !== type) originals[variable] = value;
                }
                function setOptionsFromDOM() {
                    if (!getOptions().anchors.length) {
                        var anchorsAttribute = "[data-anchor]";
                        var anchors = $(getOptions().sectionSelector.split(",").join(anchorsAttribute + ",") + anchorsAttribute, container);
                        if (anchors.length && anchors.length === $(getOptions().sectionSelector, container).length) {
                            g_initialAnchorsInDom = true;
                            anchors.forEach((function(item) {
                                getOptions().anchors.push(getAttr(item, "data-anchor").toString());
                            }));
                        }
                    }
                    if (!getOptions().navigationTooltips.length) {
                        var tooltipsAttribute = "[data-tooltip]";
                        var tooltips = $(getOptions().sectionSelector.split(",").join(tooltipsAttribute + ",") + tooltipsAttribute, container);
                        if (tooltips.length) tooltips.forEach((function(item) {
                            getOptions().navigationTooltips.push(getAttr(item, "data-tooltip").toString());
                        }));
                    }
                }
                var plainItem = function plainItem(panel) {
                    this.anchor = panel.anchor;
                    this.item = panel.item;
                    this.index = panel.index();
                    this.isLast = this.index === panel.item.parentElement.querySelectorAll(panel.selector).length - 1;
                    this.isFirst = !this.index;
                    this.isActive = panel.isActive;
                };
                var Item = function Item(el, selector) {
                    this.parent = this.parent || null;
                    this.selector = selector;
                    this.anchor = getAttr(el, "data-anchor") || getOptions().anchors[index(el, getOptions().sectionSelector)];
                    this.item = el;
                    this.isVisible = isVisible(el);
                    this.isActive = hasClass(el, ACTIVE);
                    this.hasScroll = hasClass(el, OVERFLOW);
                    this.isSection = selector === getOptions().sectionSelector;
                    this.container = closest(el, SLIDES_CONTAINER_SEL) || closest(el, WRAPPER_SEL);
                    this.index = function() {
                        return this.siblings().indexOf(this);
                    };
                };
                Item.prototype.siblings = function() {
                    if (this.isSection) if (this.isVisible) return state.sections; else return state.sectionsIncludingHidden;
                    return this.parent ? this.parent.slides : 0;
                };
                Item.prototype.prev = function() {
                    var siblings = this.siblings();
                    var currentIndex = this.isSection ? siblings.indexOf(this) : this.parent.slides.indexOf(this);
                    var prevIndex = currentIndex - 1;
                    if (prevIndex >= 0) return siblings[prevIndex];
                    return null;
                };
                Item.prototype.next = function() {
                    var siblings = this.siblings();
                    var currentIndex = this.isSection ? siblings.indexOf(this) : this.parent.slides.indexOf(this);
                    var nextIndex = currentIndex + 1;
                    if (nextIndex < siblings.length) return siblings[nextIndex];
                    return null;
                };
                Item.prototype.getSiblings = function() {
                    if (this.isSection) return state.sections;
                    return state.panels;
                };
                function getNodes(panels) {
                    return panels.map((function(panel) {
                        return panel.item;
                    }));
                }
                function getPanelByElement(panels, el) {
                    return panels.find((function(panel) {
                        return panel.item === el;
                    }));
                }
                var Section = function Section(el) {
                    plainItem.call(this, el);
                };
                var Slide = function Slide(el) {
                    plainItem.call(this, el);
                };
                function getSlideOrSection(destiny) {
                    var slide = $(SLIDE_ACTIVE_SEL, destiny);
                    if (slide.length) destiny = slide[0];
                    return destiny;
                }
                function isFullPageAbove() {
                    return getContainer().getBoundingClientRect().bottom >= 0;
                }
                function getScrollSettings(top) {
                    var options = getOptions();
                    var position;
                    var element;
                    if (options.autoScrolling && !options.scrollBar) {
                        position = -top;
                        element = $(WRAPPER_SEL)[0];
                    } else if (options.fitToSection) {
                        position = top;
                        element = doc.body;
                    } else {
                        position = top;
                        element = window;
                    }
                    return {
                        options: position,
                        element
                    };
                }
                function setScrolling(element, val) {
                    if (!getOptions().autoScrolling || getOptions().scrollBar || element.self != window && hasClass(element, SLIDES_WRAPPER)) if (element.self != window && hasClass(element, SLIDES_WRAPPER)) element.scrollLeft = val; else element.scrollTo(0, val); else element.style.top = val + "px";
                }
                function addAnimation(element) {
                    var transition = "transform " + getOptions().scrollingSpeed + "ms " + getOptions().easingcss3;
                    removeClass(element, NO_TRANSITION);
                    return css(element, {
                        "-webkit-transition": transition,
                        transition
                    });
                }
                function getYmovement(activeSection, destiny) {
                    var fromIndex = activeSection.index();
                    var toIndex = index(destiny, SECTION_SEL);
                    if (fromIndex == toIndex) return "none";
                    if (fromIndex > toIndex) return "up";
                    return "down";
                }
                function removeAnimation(element) {
                    return addClass(element, NO_TRANSITION);
                }
                function getTransforms(translate3d) {
                    return {
                        "-webkit-transform": translate3d,
                        "-moz-transform": translate3d,
                        "-ms-transform": translate3d,
                        transform: translate3d
                    };
                }
                var silentScrollId;
                function transformContainer(translate3d, animated) {
                    if (animated) addAnimation(getContainer()); else removeAnimation(getContainer());
                    clearTimeout(silentScrollId);
                    css(getContainer(), getTransforms(translate3d));
                    FP.test.translate3d = translate3d;
                    silentScrollId = setTimeout((function() {
                        removeClass(getContainer(), NO_TRANSITION);
                    }), 10);
                }
                function silentScroll(top) {
                    var roundedTop = Math.round(top);
                    if (getOptions().css3 && getOptions().autoScrolling && !getOptions().scrollBar) {
                        var translate3d = "translate3d(0px, -" + roundedTop + "px, 0px)";
                        transformContainer(translate3d, false);
                    } else if (getOptions().autoScrolling && !getOptions().scrollBar) {
                        css(getContainer(), {
                            top: -roundedTop + "px"
                        });
                        FP.test.top = -roundedTop + "px";
                    } else {
                        var scrollSettings = getScrollSettings(roundedTop);
                        setScrolling(scrollSettings.element, scrollSettings.options);
                    }
                }
                FP.setScrollingSpeed = setScrollingSpeed;
                function setScrollingSpeed(value, type) {
                    setVariableState("scrollingSpeed", value, type);
                }
                var g_animateScrollId;
                EventEmitter.on("bindEvents", bindEvents$c);
                function bindEvents$c() {
                    EventEmitter.on("onDestroy", onDestroy$8);
                }
                function onDestroy$8() {
                    clearTimeout(g_animateScrollId);
                }
                function scrollTo(element, to, duration, callback) {
                    var start = getScrolledPosition(element);
                    var change = to - start;
                    var currentTime = 0;
                    var increment = 20;
                    var isCallbackFired = false;
                    setState({
                        activeAnimation: true
                    });
                    if (element === doc.body) css(doc.body, {
                        "scroll-snap-type": "none"
                    });
                    var animateScroll = function animateScroll() {
                        if (state.activeAnimation) {
                            var val = to;
                            currentTime += increment;
                            if (duration) val = win.fp_easings[getOptions().easing](currentTime, start, change, duration);
                            setScrolling(element, val);
                            if (currentTime < duration) {
                                clearTimeout(g_animateScrollId);
                                g_animateScrollId = setTimeout(animateScroll, increment);
                            } else if ("undefined" !== typeof callback && !isCallbackFired) {
                                callback();
                                isCallbackFired = true;
                            }
                        } else if (currentTime < duration && !isCallbackFired) {
                            callback();
                            isCallbackFired = true;
                        }
                    };
                    animateScroll();
                }
                function getScrolledPosition(element) {
                    var position;
                    if (element.self != win && hasClass(element, SLIDES_WRAPPER)) position = element.scrollLeft; else if (!getOptions().autoScrolling || getOptions().scrollBar) position = getScrollTop(getOptions()); else position = element.offsetTop;
                    return position;
                }
                function nullOrSection(el) {
                    if (el && !el.item) return new Section(new SectionPanel(el));
                    return el ? new Section(el) : null;
                }
                function nullOrSlide(el) {
                    return el ? new Slide(el) : null;
                }
                function fireCallback(eventName, v) {
                    var eventData = getEventData(eventName, v);
                    trigger(getContainer(), eventName, eventData);
                    if (false === getOptions()[eventName].apply(eventData[Object.keys(eventData)[0]], toArray(eventData))) return false;
                    return true;
                }
                function getEventData(eventName, v) {
                    var paramsPerEvent = {
                        afterRender: function afterRender() {
                            return {
                                section: nullOrSection(getState().activeSection),
                                slide: nullOrSlide(getState().activeSection.activeSlide)
                            };
                        },
                        onLeave: function onLeave() {
                            return {
                                origin: nullOrSection(v.items.origin),
                                destination: nullOrSection(v.items.destination),
                                direction: v.direction,
                                trigger: getState().scrollTrigger
                            };
                        },
                        afterLoad: function afterLoad() {
                            return paramsPerEvent.onLeave();
                        },
                        afterSlideLoad: function afterSlideLoad() {
                            return {
                                section: nullOrSection(v.items.section),
                                origin: nullOrSection(v.items.origin),
                                destination: nullOrSection(v.items.destination),
                                direction: v.direction,
                                trigger: getState().scrollTrigger
                            };
                        },
                        onSlideLeave: function onSlideLeave() {
                            return paramsPerEvent.afterSlideLoad();
                        },
                        beforeLeave: function beforeLeave() {
                            return paramsPerEvent.onLeave();
                        },
                        onScrollOverflow: function onScrollOverflow() {
                            return {
                                section: nullOrSection(getState().activeSection),
                                slide: nullOrSlide(getState().activeSection.activeSlide),
                                position: v.position,
                                direction: v.direction
                            };
                        }
                    };
                    return paramsPerEvent[eventName]();
                }
                function playMedia(destiny) {
                    var panel = getSlideOrSection(destiny);
                    $("video, audio", panel).forEach((function(element) {
                        if (element.hasAttribute("data-autoplay") && "function" === typeof element.play) element.play();
                    }));
                    $('iframe[src*="youtube.com/embed/"]', panel).forEach((function(element) {
                        if (element.hasAttribute("data-autoplay")) playYoutube(element);
                        element.onload = function() {
                            if (element.hasAttribute("data-autoplay")) playYoutube(element);
                        };
                    }));
                }
                function playYoutube(element) {
                    element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                }
                function stopMedia(destiny) {
                    var panel = getSlideOrSection(destiny);
                    $("video, audio", panel).forEach((function(element) {
                        if (!element.hasAttribute("data-keepplaying") && "function" === typeof element.pause) element.pause();
                    }));
                    $('iframe[src*="youtube.com/embed/"]', panel).forEach((function(element) {
                        if (/youtube\.com\/embed\//.test(getAttr(element, "src")) && !element.hasAttribute("data-keepplaying")) element.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                    }));
                }
                function enableYoutubeAPI() {
                    $('iframe[src*="youtube.com/embed/"]', getContainer()).forEach((function(item) {
                        addURLParam(item, "enablejsapi=1");
                    }));
                }
                function addURLParam(element, newParam) {
                    var originalSrc = getAttr(element, "src");
                    element.setAttribute("src", originalSrc + getUrlParamSign(originalSrc) + newParam);
                }
                function getUrlParamSign(url) {
                    return !/\?/.test(url) ? "?" : "&";
                }
                function lazyLoad(destiny) {
                    if (!getOptions().lazyLoading) return;
                    var panel = getSlideOrSection(destiny);
                    $("img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]", panel).forEach((function(element) {
                        [ "src", "srcset" ].forEach((function(type) {
                            var attribute = getAttr(element, "data-" + type);
                            if (null != attribute && attribute) {
                                setSrc(element, type);
                                element.addEventListener("load", (function() {}));
                            }
                        }));
                        if (matches(element, "source")) {
                            var elementToPlay = closest(element, "video, audio");
                            if (elementToPlay) {
                                elementToPlay.load();
                                elementToPlay.onloadeddata = function() {};
                            }
                        }
                    }));
                }
                var $body = null;
                var $html = null;
                var $htmlBody = null;
                function setCache() {
                    $body = $("body")[0];
                    $html = $("html")[0];
                    $htmlBody = $("html, body");
                }
                function setBodyClass() {
                    var section = getState().activeSection.item;
                    var slide = getState().activeSection.activeSlide;
                    var sectionAnchor = getAnchor(section);
                    var text = String(sectionAnchor);
                    if (slide) {
                        var slideAnchor = getAnchor(slide.item);
                        text = text + "-" + slideAnchor;
                    }
                    text = text.replace("/", "-").replace("#", "");
                    var classRe = new RegExp("\\b\\s?" + VIEWING_PREFIX + "-[^\\s]+\\b", "g");
                    $body.className = $body.className.replace(classRe, "");
                    addClass($body, VIEWING_PREFIX + "-" + text);
                }
                function getAnchor(element) {
                    if (!element) return null;
                    var anchor = getAttr(element, "data-anchor");
                    var elementIndex = index(element);
                    if (null == anchor) anchor = elementIndex;
                    return anchor;
                }
                function setPageStatus(slideIndex, slideAnchor, anchorLink) {
                    var sectionHash = "";
                    if (getOptions().anchors.length && !getOptions().lockAnchors) if (slideIndex) {
                        if (null != anchorLink) sectionHash = anchorLink;
                        if (null == slideAnchor) slideAnchor = slideIndex;
                        setState({
                            lastScrolledSlide: slideAnchor
                        });
                        setUrlHash(sectionHash + "/" + slideAnchor);
                    } else if (null != slideIndex) {
                        setState({
                            lastScrolledSlide: slideAnchor
                        });
                        setUrlHash(anchorLink);
                    } else setUrlHash(anchorLink);
                    setBodyClass();
                }
                function setUrlHash(url) {
                    if (getOptions().recordHistory) location.hash = url; else if (isTouchDevice || isTouch) win.history.replaceState(void 0, void 0, "#" + url); else {
                        var baseUrl = win.location.href.split("#")[0];
                        win.location.replace(baseUrl + "#" + url);
                    }
                }
                function getBulletLinkName(i, defaultName, item) {
                    var anchor = "Section" === defaultName ? getOptions().anchors[i] : getAttr(item, "data-anchor");
                    return encodeURI(getOptions().navigationTooltips[i] || anchor || defaultName + " " + (i + 1));
                }
                function slideBulletHandler(e) {
                    preventDefault(e);
                    setState({
                        scrollTrigger: "horizontalNav"
                    });
                    var sectionElem = closest(this, SECTION_SEL);
                    var slides = $(SLIDES_WRAPPER_SEL, closest(this, SECTION_SEL))[0];
                    var section = getPanelByElement(getState().sections, sectionElem);
                    var destiny = section.slides[index(closest(this, "li"))];
                    EventEmitter.emit("landscapeScroll", {
                        slides,
                        destination: destiny.item
                    });
                }
                function activeSlidesNavigation(slidesNav, slideIndex) {
                    if (getOptions().slidesNavigation && null != slidesNav) {
                        removeClass($(ACTIVE_SEL, slidesNav), ACTIVE);
                        addClass($("a", $("li", slidesNav)[slideIndex]), ACTIVE);
                    }
                }
                function addSlidesNavigation(section) {
                    var sectionElem = section.item;
                    var numSlides = section.slides.length;
                    appendTo(createElementFromHTML('<div class="' + SLIDES_NAV + '"><ul></ul></div>'), sectionElem);
                    var nav = $(SLIDES_NAV_SEL, sectionElem)[0];
                    addClass(nav, "fp-" + getOptions().slidesNavPosition);
                    for (var i = 0; i < numSlides; i++) {
                        var slide = $(SLIDE_SEL, sectionElem)[i];
                        appendTo(createElementFromHTML('<li><a href="#"><span class="fp-sr-only">' + getBulletLinkName(i, "Slide", slide) + "</span><span></span></a></li>"), $("ul", nav)[0]);
                    }
                    css(nav, {
                        "margin-left": "-" + nav.innerWidth / 2 + "px"
                    });
                    var activeSlideIndex = section.activeSlide ? section.activeSlide.index() : 0;
                    addClass($("a", $("li", nav)[activeSlideIndex]), ACTIVE);
                }
                var isScrollAllowed = {};
                isScrollAllowed.m = {
                    up: true,
                    down: true,
                    left: true,
                    right: true
                };
                isScrollAllowed.k = deepExtend({}, isScrollAllowed.m);
                function setIsScrollAllowed(value, direction, type) {
                    if ("all" !== direction) isScrollAllowed[type][direction] = value; else Object.keys(isScrollAllowed[type]).forEach((function(key) {
                        isScrollAllowed[type][key] = value;
                    }));
                }
                function getIsScrollAllowed() {
                    return isScrollAllowed;
                }
                EventEmitter.on("onClickOrTouch", onClickOrTouch$2);
                function onClickOrTouch$2(params) {
                    var target = params.target;
                    if (matches(target, SLIDES_ARROW_SEL) || closest(target, SLIDES_ARROW_SEL)) slideArrowHandler.call(target, params);
                }
                function slideArrowHandler() {
                    var section = closest(this, SECTION_SEL);
                    if (hasClass(this, SLIDES_PREV)) {
                        if (getIsScrollAllowed().m.left) {
                            setState({
                                scrollTrigger: "slideArrow"
                            });
                            EventEmitter.emit("moveSlideLeft", {
                                section
                            });
                        }
                    } else if (getIsScrollAllowed().m.right) {
                        setState({
                            scrollTrigger: "slideArrow"
                        });
                        EventEmitter.emit("moveSlideRight", {
                            section
                        });
                    }
                }
                function createSlideArrows(section) {
                    var sectionElem = section.item;
                    var arrows = [ createElementFromHTML(getOptions().controlArrowsHTML[0]), createElementFromHTML(getOptions().controlArrowsHTML[1]) ];
                    after($(SLIDES_WRAPPER_SEL, sectionElem)[0], arrows);
                    addClass(arrows, SLIDES_ARROW);
                    addClass(arrows[0], SLIDES_PREV);
                    addClass(arrows[1], SLIDES_NEXT);
                    if ("#fff" !== getOptions().controlArrowColor) {
                        css($(SLIDES_ARROW_NEXT_SEL, sectionElem), {
                            "border-color": "transparent transparent transparent " + getOptions().controlArrowColor
                        });
                        css($(SLIDES_ARROW_PREV_SEL, sectionElem), {
                            "border-color": "transparent " + getOptions().controlArrowColor + " transparent transparent"
                        });
                    }
                    if (!getOptions().loopHorizontal) hide($(SLIDES_ARROW_PREV_SEL, sectionElem));
                }
                function toggleControlArrows(v) {
                    if (!getOptions().loopHorizontal && getOptions().controlArrows) {
                        toggle($(SLIDES_ARROW_PREV_SEL, v.section), 0 !== v.slideIndex);
                        toggle($(SLIDES_ARROW_NEXT_SEL, v.section), null != next(v.destiny));
                    }
                }
                var g_afterSlideLoadsId;
                FP.landscapeScroll = landscapeScroll;
                EventEmitter.on("bindEvents", bindEvents$b);
                function bindEvents$b() {
                    EventEmitter.on("onPerformMovement", onPerformMovement);
                }
                function onPerformMovement() {
                    clearTimeout(g_afterSlideLoadsId);
                }
                function landscapeScroll(slides, destiny, direction) {
                    var sectionElem = closest(slides, SECTION_SEL);
                    var section = getState().sections.filter((function(section) {
                        return section.item == sectionElem;
                    }))[0];
                    var slide = section.slides.filter((function(slide) {
                        return slide.item == destiny;
                    }))[0];
                    var v = {
                        slides,
                        destiny,
                        direction,
                        destinyPos: {
                            left: destiny.offsetLeft
                        },
                        slideIndex: slide.index(),
                        section: sectionElem,
                        sectionIndex: section.index(),
                        anchorLink: section.anchor,
                        slidesNav: $(SLIDES_NAV_SEL, sectionElem)[0],
                        slideAnchor: slide.anchor,
                        prevSlide: section.activeSlide.item,
                        prevSlideIndex: section.activeSlide.index(),
                        items: {
                            section,
                            origin: section.activeSlide,
                            destination: slide
                        },
                        localIsResizing: state.isResizing
                    };
                    v.xMovement = getXmovement(v.prevSlideIndex, v.slideIndex);
                    v.direction = v.direction ? v.direction : v.xMovement;
                    if (!v.localIsResizing) setState({
                        canScroll: false
                    });
                    if (getOptions().onSlideLeave) if (!v.localIsResizing && "none" !== v.xMovement) if (isFunction(getOptions().onSlideLeave)) if (false === fireCallback("onSlideLeave", v)) {
                        setState({
                            slideMoving: false
                        });
                        return;
                    }
                    addClass(destiny, ACTIVE);
                    removeClass(siblings(destiny), ACTIVE);
                    updateState();
                    if (!v.localIsResizing) {
                        stopMedia(v.prevSlide);
                        lazyLoad(destiny);
                    }
                    toggleControlArrows(v);
                    if (section.isActive && !v.localIsResizing) setPageStatus(v.slideIndex, v.slideAnchor, v.anchorLink);
                    performHorizontalMove(slides, v, true);
                }
                function performHorizontalMove(slides, v, fireCallback) {
                    var destinyPos = v.destinyPos;
                    activeSlidesNavigation(v.slidesNav, v.slideIndex);
                    setState({
                        scrollX: Math.round(destinyPos.left)
                    });
                    if (getOptions().css3) {
                        var translate3d = "translate3d(-" + Math.round(destinyPos.left) + "px, 0px, 0px)";
                        FP.test.translate3dH[v.sectionIndex] = translate3d;
                        css(addAnimation($(SLIDES_CONTAINER_SEL, slides)), getTransforms(translate3d));
                        clearTimeout(g_afterSlideLoadsId);
                        g_afterSlideLoadsId = setTimeout((function() {
                            if (fireCallback) afterSlideLoads(v);
                        }), getOptions().scrollingSpeed);
                    } else {
                        FP.test.left[v.sectionIndex] = Math.round(destinyPos.left);
                        scrollTo(slides, Math.round(destinyPos.left), getOptions().scrollingSpeed, (function() {
                            if (fireCallback) afterSlideLoads(v);
                        }));
                    }
                }
                function getXmovement(fromIndex, toIndex) {
                    if (fromIndex == toIndex) return "none";
                    if (fromIndex > toIndex) return "left";
                    return "right";
                }
                function onDestroy$7() {
                    clearTimeout(g_afterSlideLoadsId);
                }
                function afterSlideLoads(v) {
                    if (!v.localIsResizing) {
                        if (isFunction(getOptions().afterSlideLoad)) fireCallback("afterSlideLoad", v);
                        setState({
                            canScroll: true
                        });
                        playMedia(v.destiny);
                    }
                    setState({
                        slideMoving: false
                    });
                }
                function silentLandscapeScroll(activeSlide, noCallbacks) {
                    setScrollingSpeed(0, "internal");
                    if ("undefined" !== typeof noCallbacks) setState({
                        isResizing: true
                    });
                    landscapeScroll(closest(activeSlide, SLIDES_WRAPPER_SEL), activeSlide);
                    if ("undefined" !== typeof noCallbacks) setState({
                        isResizing: false
                    });
                    setScrollingSpeed(getOriginals().scrollingSpeed, "internal");
                }
                var g_prevActiveSectionIndex = null;
                var g_prevActiveSlideIndex = null;
                function updateState() {
                    state.activeSection = null;
                    state.sections.map((function(section) {
                        var isActive = hasClass(section.item, ACTIVE);
                        section.isActive = isActive;
                        section.hasScroll = hasClass(section.item, OVERFLOW);
                        if (isActive) state.activeSection = section;
                        if (section.slides.length) {
                            section.activeSlide = null;
                            section.slides.map((function(slide) {
                                var isActiveSlide = hasClass(slide.item, ACTIVE);
                                slide.hasScroll = hasClass(slide.item, OVERFLOW);
                                slide.isActive = isActiveSlide;
                                if (isActiveSlide) section.activeSlide = slide;
                            }));
                        }
                    }));
                    scrollToNewActivePanel();
                }
                function updateStructuralState() {
                    var allSectionItems = $(getOptions().sectionSelector, getContainer());
                    var sectionsItems = getVisible(allSectionItems);
                    var allSections = Array.from(allSectionItems).map((function(item) {
                        return new SectionPanel(item);
                    }));
                    var sections = allSections.filter((function(item) {
                        return item.isVisible;
                    }));
                    var slides = sections.reduce((function(acc, section) {
                        return acc.concat(section.slides);
                    }), []);
                    g_prevActiveSectionIndex = getPrevActivePanelIndex(state.activeSection);
                    g_prevActiveSlideIndex = getPrevActivePanelIndex(state.activeSection ? state.activeSection.activeSlide : null);
                    state.numSections = sectionsItems.length;
                    state.numSlides = sections.reduce((function(acc, section) {
                        return acc + section.slides.length;
                    }), 0);
                    state.sections = sections;
                    state.sectionsIncludingHidden = allSections;
                    state.slides = slides;
                    state.panels = state.sections.concat(state.slides);
                }
                function getPrevActivePanelIndex(activePanel) {
                    if (!activePanel) return null;
                    var prevActivePanelItem = activePanel ? activePanel.item : null;
                    var hiddenPanels = activePanel.isSection ? state.sectionsIncludingHidden : state.activeSection.slidesIncludingHidden;
                    if (prevActivePanelItem) {
                        var panel = getPanelByElement(hiddenPanels, prevActivePanelItem);
                        return panel ? panel.index() : null;
                    }
                    return null;
                }
                function scrollToNewActivePanel() {
                    var activeSection = state.activeSection;
                    var activeSectionHasSlides = state.activeSection ? state.activeSection.slides.length : false;
                    var activeSlide = state.activeSection ? state.activeSection.activeSlide : null;
                    if (!activeSection && state.sections.length && !getState().isBeyondFullpage && g_prevActiveSectionIndex) {
                        var newActiveSection = getNewActivePanel(g_prevActiveSectionIndex, state.sections);
                        if (newActiveSection) {
                            state.activeSection = newActiveSection;
                            state.activeSection.isActive = true;
                            addClass(state.activeSection.item, ACTIVE);
                        }
                        if (state.activeSection) silentScroll(state.activeSection.item.offsetTop);
                    }
                    if (activeSectionHasSlides && !activeSlide && g_prevActiveSlideIndex) {
                        var newActiveSlide = getNewActivePanel(g_prevActiveSlideIndex, state.activeSection.slides);
                        if (newActiveSlide) {
                            state.activeSection.activeSlide = newActiveSlide;
                            state.activeSection.activeSlide.isActive = true;
                            addClass(state.activeSection.activeSlide.item, ACTIVE);
                        }
                        if (state.activeSection.activeSlide) silentLandscapeScroll(state.activeSection.activeSlide.item, "internal");
                    }
                }
                function getNewActivePanel(prevActivePanelIndex, siblings) {
                    var newActiveSection;
                    var prevIndex = prevActivePanelIndex - 1;
                    var nextIndex = prevActivePanelIndex;
                    do {
                        newActiveSection = siblings[prevIndex] || siblings[nextIndex];
                        if (newActiveSection) break;
                        prevIndex -= 1;
                        nextIndex += 1;
                    } while (prevIndex >= 0 || nextIndex < siblings.length);
                    return newActiveSection;
                }
                var SectionPanel = function SectionPanel(el) {
                    var _this = this;
                    [].push.call(arguments, getOptions().sectionSelector);
                    Item.apply(this, arguments);
                    this.allSlidesItems = $(getOptions().slideSelector, el);
                    this.slidesIncludingHidden = Array.from(this.allSlidesItems).map((function(item) {
                        return new SlidePanel(item, _this);
                    }));
                    this.slides = this.slidesIncludingHidden.filter((function(slidePanel) {
                        return slidePanel.isVisible;
                    }));
                    this.activeSlide = this.slides.length ? this.slides.filter((function(slide) {
                        return slide.isActive;
                    }))[0] || this.slides[0] : null;
                };
                SectionPanel.prototype = Item.prototype;
                SectionPanel.prototype.constructor = SectionPanel;
                var SlidePanel = function SlidePanel(el, section) {
                    this.parent = section;
                    Item.call(this, el, getOptions().slideSelector);
                };
                SlidePanel.prototype = Item.prototype;
                SlidePanel.prototype.constructor = SectionPanel;
                function addInternalSelectors() {
                    addClass($(getOptions().sectionSelector, getContainer()), SECTION);
                    addClass($(getOptions().slideSelector, getContainer()), SLIDE);
                }
                function tooltipTextHandler() {
                    trigger(prev(this), "click");
                }
                function activateNavDots(name, sectionIndex) {
                    var nav = $(SECTION_NAV_SEL)[0];
                    if (getOptions().navigation && null != nav && "none" !== nav.style.display) {
                        removeClass($(ACTIVE_SEL, nav), ACTIVE);
                        if (name) addClass($('a[href="#' + name + '"]', nav), ACTIVE); else addClass($("a", $("li", nav)[sectionIndex]), ACTIVE);
                    }
                }
                function addVerticalNavigation() {
                    remove($(SECTION_NAV_SEL));
                    var navigation = doc.createElement("div");
                    navigation.setAttribute("id", SECTION_NAV);
                    var divUl = doc.createElement("ul");
                    navigation.appendChild(divUl);
                    appendTo(navigation, $body);
                    var nav = $(SECTION_NAV_SEL)[0];
                    addClass(nav, "fp-" + getOptions().navigationPosition);
                    if (getOptions().showActiveTooltip) addClass(nav, SHOW_ACTIVE_TOOLTIP);
                    var li = "";
                    for (var i = 0; i < getState().sections.length; i++) {
                        var section = getState().sections[i];
                        var link = "";
                        if (getOptions().anchors.length) link = section.anchor;
                        li += '<li><a href="#' + encodeURI(link) + '"><span class="fp-sr-only">' + getBulletLinkName(section.index(), "Section") + "</span><span></span></a>";
                        var tooltip = getOptions().navigationTooltips[section.index()];
                        if ("undefined" !== typeof tooltip && "" !== tooltip) li += '<div class="' + SECTION_NAV_TOOLTIP + " fp-" + getOptions().navigationPosition + '">' + tooltip + "</div>";
                        li += "</li>";
                    }
                    $("ul", nav)[0].innerHTML = li;
                    var bullet = $("li", $(SECTION_NAV_SEL)[0])[getState().activeSection.index()];
                    addClass($("a", bullet), ACTIVE);
                }
                function sectionBulletHandler(e) {
                    if (e.preventDefault) preventDefault(e);
                    setState({
                        scrollTrigger: "verticalNav"
                    });
                    var indexBullet = index(closest(this, SECTION_NAV_SEL + " li"));
                    EventEmitter.emit("scrollPage", {
                        destination: getState().sections[indexBullet]
                    });
                }
                FP.setRecordHistory = setRecordHistory;
                function setRecordHistory(value, type) {
                    setVariableState("recordHistory", value, type);
                }
                FP.setAutoScrolling = setAutoScrolling;
                FP.test.setAutoScrolling = setAutoScrolling;
                function setAutoScrolling(value, type) {
                    if (!value) silentScroll(0);
                    setVariableState("autoScrolling", value, type);
                    var element = getState().activeSection.item;
                    if (getOptions().autoScrolling && !getOptions().scrollBar) {
                        css($htmlBody, {
                            overflow: "hidden",
                            height: "100%"
                        });
                        removeClass($body, "fp-scrollable");
                        setRecordHistory(getOriginals().recordHistory, "internal");
                        css(getContainer(), {
                            "-ms-touch-action": "none",
                            "touch-action": "none"
                        });
                        if (null != element) silentScroll(element.offsetTop);
                    } else {
                        css($htmlBody, {
                            overflow: "visible",
                            height: "initial"
                        });
                        addClass($body, "fp-scrollable");
                        var recordHistory = !getOptions().autoScrolling ? false : getOriginals().recordHistory;
                        setRecordHistory(recordHistory, "internal");
                        css(getContainer(), {
                            "-ms-touch-action": "",
                            "touch-action": ""
                        });
                        if (null != element) {
                            css($htmlBody, {
                                "scroll-behavior": "unset"
                            });
                            var scrollSettings = getScrollSettings(element.offsetTop);
                            scrollSettings.element.scrollTo(0, scrollSettings.options);
                        }
                    }
                }
                FP.setFitToSection = setFitToSection;
                FP.fitToSection = fitToSection;
                var g_isCssSnapsSupported = function() {
                    return isCssSnapsSupported();
                }();
                function setFitToSection(value, type) {
                    toggleCssSnapsWhenPossible(value);
                    setVariableState("fitToSection", value, type);
                }
                function toggleCssSnapsWhenPossible(value) {
                    if (g_isCssSnapsSupported) {
                        var canAddSnaps = getOptions().fitToSection && (!getOptions().autoScrolling || getOptions().scrollBar) && value;
                        var toggleFunction = canAddSnaps ? addClass : removeClass;
                        toggleFunction($html, SNAPS);
                    }
                }
                function isCssSnapsSupported() {
                    var style = doc.documentElement.style;
                    return "scrollSnapAlign" in style || "webkitScrollSnapAlign" in style || "msScrollSnapAlign" in style;
                }
                function fitToSection() {}
                FP.setResponsive = setResponsive;
                function responsive() {
                    var widthLimit = getOptions().responsive || getOptions().responsiveWidth;
                    var heightLimit = getOptions().responsiveHeight;
                    var isBreakingPointWidth = widthLimit && win.innerWidth < widthLimit;
                    var isBreakingPointHeight = heightLimit && win.innerHeight < heightLimit;
                    if (widthLimit && heightLimit) setResponsive(isBreakingPointWidth || isBreakingPointHeight); else if (widthLimit) setResponsive(isBreakingPointWidth); else if (heightLimit) setResponsive(isBreakingPointHeight);
                }
                function setResponsive(active) {
                    var isResponsive = isResponsiveMode();
                    if (active) {
                        if (!isResponsive) {
                            setAutoScrolling(false, "internal");
                            setFitToSection(false, "internal");
                            hide($(SECTION_NAV_SEL));
                            addClass($body, RESPONSIVE);
                            if (isFunction(getOptions().afterResponsive)) getOptions().afterResponsive.call(getContainer(), active);
                        }
                    } else if (isResponsive) {
                        setAutoScrolling(getOriginals().autoScrolling, "internal");
                        setFitToSection(getOriginals().autoScrolling, "internal");
                        show($(SECTION_NAV_SEL));
                        removeClass($body, RESPONSIVE);
                        if (isFunction(getOptions().afterResponsive)) getOptions().afterResponsive.call(getContainer(), active);
                    }
                }
                function isResponsiveMode() {
                    return hasClass($body, RESPONSIVE);
                }
                EventEmitter.on("bindEvents", bindEvents$a);
                function bindEvents$a() {
                    win.addEventListener("load", (function() {
                        if (getOptions().scrollOverflow && !getOptions().scrollBar) {
                            scrollOverflowHandler.makeScrollable();
                            scrollOverflowHandler.afterSectionLoads();
                        }
                    }));
                    if (getOptions().scrollOverflow) getNodes(getState().panels).forEach((function(el) {
                        el.addEventListener("scroll", scrollOverflowHandler.onPanelScroll);
                        el.addEventListener("wheel", scrollOverflowHandler.preventScrollWhileMoving);
                        el.addEventListener("keydown", scrollOverflowHandler.preventScrollWhileMoving);
                        el.addEventListener("keydown", scrollOverflowHandler.blurFocusOnAfterLoad);
                    }));
                }
                var scrollOverflowHandler = {
                    focusedElem: null,
                    timeBeforeReachingLimit: null,
                    timeLastScroll: null,
                    preventScrollWhileMoving: function preventScrollWhileMoving(e) {
                        if (!state.canScroll) {
                            preventDefault(e);
                            return false;
                        }
                    },
                    afterSectionLoads: function afterSectionLoads() {
                        if (doc.activeElement === this.focusedElem) this.focusedElem.blur();
                        if ($(OVERFLOW_SEL + ACTIVE_SEL, getState().activeSection.item)[0]) {
                            this.focusedElem = $(OVERFLOW_SEL, getState().activeSection.item)[0];
                            this.focusedElem.focus();
                        }
                    },
                    makeScrollable: function makeScrollable() {
                        if (getOptions().scrollOverflowMacStyle && !isMacDevice) addClass($body, "fp-scroll-mac");
                        getState().panels.forEach((function(el) {
                            if (hasClass(el.item, "fp-noscroll") || hasClass(el.item, AUTO_HEIGHT) || hasClass(el.item, AUTO_HEIGHT_RESPONSIVE) && isResponsiveMode()) return; else {
                                var item = scrollOverflowHandler.scrollable(el.item);
                                var shouldBeScrollable = scrollOverflowHandler.shouldBeScrollable(el.item);
                                if (shouldBeScrollable) {
                                    addClass(item, OVERFLOW);
                                    item.setAttribute("tabindex", "-1");
                                } else {
                                    removeClass(item, OVERFLOW);
                                    item.removeAttribute("tabindex");
                                }
                                el.hasScroll = shouldBeScrollable;
                            }
                        }));
                    },
                    scrollable: function scrollable(sectionItem) {
                        return $(SLIDE_ACTIVE_SEL, sectionItem)[0] || sectionItem;
                    },
                    isScrollable: function isScrollable(panel) {
                        return panel.isSection && panel.activeSlide ? panel.activeSlide.hasScroll : panel.hasScroll;
                    },
                    shouldBeScrollable: function shouldBeScrollable(item) {
                        return item.scrollHeight > win.innerHeight;
                    },
                    isScrolled: function isScrolled(direction, el) {
                        if (!state.canScroll) return false;
                        if (!getOptions().scrollOverflow) return true;
                        var scrollableItem = scrollOverflowHandler.scrollable(el);
                        var positionY = scrollableItem.scrollTop;
                        var isTopReached = "up" === direction && positionY <= 0;
                        var isBottomReached = "down" === direction && scrollableItem.scrollHeight <= scrollableItem.offsetHeight + positionY;
                        var isScrolled = isTopReached || isBottomReached;
                        if (!isScrolled) this.timeBeforeReachingLimit = (new Date).getTime();
                        return isScrolled;
                    },
                    shouldMovePage: function shouldMovePage() {
                        this.timeLastScroll = (new Date).getTime();
                        var timeDiff = this.timeLastScroll - scrollOverflowHandler.timeBeforeReachingLimit;
                        var isUsingTouch = isTouchDevice || isTouch;
                        var isGrabbing = isUsingTouch && state.isGrabbing;
                        var isNotFirstTimeReachingLimit = state.isUsingWheel && timeDiff > 600;
                        return isGrabbing && timeDiff > 400 || isNotFirstTimeReachingLimit;
                    },
                    onPanelScroll: function() {
                        var prevPosition = 0;
                        return function(e) {
                            var currentPosition = e.target.scrollTop;
                            var direction = "none" !== state.touchDirection ? state.touchDirection : prevPosition < currentPosition ? "down" : "up";
                            prevPosition = currentPosition;
                            if (isFunction(getOptions().onScrollOverflow)) fireCallback("onScrollOverflow", {
                                position: currentPosition,
                                direction
                            });
                            if (hasClass(e.target, OVERFLOW) && state.canScroll) if (scrollOverflowHandler.isScrolled(direction, e.target) && scrollOverflowHandler.shouldMovePage()) EventEmitter.emit("onScrollOverflowScrolled", {
                                direction
                            });
                        };
                    }()
                };
                function addTableClass(element) {
                    if (!getOptions().verticalCentered) return;
                    if (!scrollOverflowHandler.isScrollable(element)) if (!hasClass(element.item, TABLE)) addClass(element.item, TABLE);
                }
                function styleSlides(section) {
                    var numSlides = section.slides.length;
                    var slidesElems = section.allSlidesItems;
                    var slides = section.slides;
                    var sliderWidth = 100 * numSlides;
                    var slideWidth = 100 / numSlides;
                    if (!$(SLIDES_WRAPPER_SEL, section.item)[0]) {
                        var slidesWrapper = doc.createElement("div");
                        slidesWrapper.className = SLIDES_WRAPPER;
                        wrapAll(slidesElems, slidesWrapper);
                        var slidesContainer = doc.createElement("div");
                        slidesContainer.className = SLIDES_CONTAINER;
                        wrapAll(slidesElems, slidesContainer);
                    }
                    css($(SLIDES_CONTAINER_SEL, section.item), {
                        width: sliderWidth + "%"
                    });
                    if (numSlides > 1) {
                        if (getOptions().controlArrows) createSlideArrows(section);
                        if (getOptions().slidesNavigation) addSlidesNavigation(section);
                    }
                    slides.forEach((function(slide) {
                        css(slide.item, {
                            width: slideWidth + "%"
                        });
                        if (getOptions().verticalCentered) addTableClass(slide);
                    }));
                    var startingSlide = section.activeSlide || null;
                    if (null != startingSlide && state.activeSection && (0 !== state.activeSection.index() || 0 === state.activeSection.index() && 0 !== startingSlide.index())) silentLandscapeScroll(startingSlide.item, "internal"); else addClass(slidesElems[0], ACTIVE);
                }
                var startingSection = null;
                FP.getActiveSection = getActiveSection;
                function getStartingSection() {
                    return startingSection;
                }
                function styleSection(section) {
                    var sectionElem = section.item;
                    var hasSlides = section.allSlidesItems.length;
                    var index = section.index();
                    if (!getState().activeSection && section.isVisible) {
                        addClass(sectionElem, ACTIVE);
                        updateState();
                    }
                    startingSection = getState().activeSection.item;
                    if (getOptions().paddingTop) css(sectionElem, {
                        "padding-top": getOptions().paddingTop
                    });
                    if (getOptions().paddingBottom) css(sectionElem, {
                        "padding-bottom": getOptions().paddingBottom
                    });
                    if ("undefined" !== typeof getOptions().sectionsColor[index]) css(sectionElem, {
                        "background-color": getOptions().sectionsColor[index]
                    });
                    if ("undefined" !== typeof getOptions().anchors[index]) sectionElem.setAttribute("data-anchor", section.anchor);
                    if (!hasSlides) addTableClass(section);
                }
                function getActiveSection() {
                    return getState().activeSection;
                }
                var g_wrapperObserver;
                var g_wrapperObserveConfig = {
                    attributes: false,
                    subtree: true,
                    childList: true,
                    characterData: true
                };
                EventEmitter.on("bindEvents", bindEvents$9);
                FP.render = onContentChange;
                function bindEvents$9() {
                    if (getOptions().observer && "MutationObserver" in window) g_wrapperObserver = createObserver($(WRAPPER_SEL)[0], onContentChange, g_wrapperObserveConfig);
                    EventEmitter.on("contentChanged", onContentChange);
                }
                function createObserver(target, callback, config) {
                    var observer = new MutationObserver(callback);
                    observer.observe(target, config);
                    return observer;
                }
                function didSlidesChange() {
                    return getVisible($(getOptions().slideSelector, getContainer())).length !== getState().numSlides;
                }
                function didSectionsChange() {
                    return getVisible($(getOptions().sectionSelector, getContainer())).length !== getState().numSections;
                }
                function didSectionsOrSlidesChange() {
                    return didSlidesChange() || didSectionsChange();
                }
                function onContentChange(mutations) {
                    var _didSlidesChange = didSlidesChange();
                    if (didSectionsOrSlidesChange() && !state.isDoingContinousVertical) {
                        if (getOptions().observer && g_wrapperObserver) g_wrapperObserver.disconnect();
                        updateStructuralState();
                        updateState();
                        getOptions().anchors = [];
                        remove($(SECTION_NAV_SEL));
                        addInternalSelectors();
                        setOptionsFromDOM();
                        if (getOptions().navigation) addVerticalNavigation();
                        if (_didSlidesChange) {
                            remove($(SLIDES_NAV_SEL));
                            remove($(SLIDES_ARROW_SEL));
                        }
                        getState().sections.forEach((function(section) {
                            if (section.slides.length) {
                                if (_didSlidesChange) styleSlides(section);
                            } else styleSection(section);
                        }));
                    }
                    if (getOptions().observer && g_wrapperObserver) g_wrapperObserver.observe($(WRAPPER_SEL)[0], g_wrapperObserveConfig);
                }
                var supportsPassiveEvents = function() {
                    var g_supportsPassive = false;
                    try {
                        var opts = Object.defineProperty({}, "passive", {
                            get: function get() {
                                g_supportsPassive = true;
                            }
                        });
                        windowAddEvent("testPassive", null, opts);
                        windowRemoveEvent("testPassive", null, opts);
                    } catch (e) {}
                    return function() {
                        return g_supportsPassive;
                    };
                }();
                function getPassiveOptionsIfPossible() {
                    return supportsPassiveEvents() ? {
                        passive: false
                    } : false;
                }
                (new Date).getTime();
                var oncePerScroll = function() {
                    var canTriggerEvent = true;
                    var prevWheelTime = (new Date).getTime();
                    var result;
                    return function(scrollTrigger, callback) {
                        var currentTime = (new Date).getTime();
                        var timeThreshold = "wheel" === scrollTrigger ? getOptions().scrollingSpeed : 100;
                        canTriggerEvent = currentTime - prevWheelTime >= timeThreshold;
                        if (canTriggerEvent) {
                            result = callback();
                            prevWheelTime = currentTime;
                        }
                        return "undefined" !== typeof result ? result : true;
                    };
                }();
                var wheelDataHandler = function() {
                    var _prevTime = (new Date).getTime();
                    var _scrollings = [];
                    var isScrollingVertically;
                    var direction;
                    return {
                        registerEvent: function registerEvent(e) {
                            e = e || win.event;
                            var value = e.wheelDelta || -e.deltaY || -e.detail;
                            var delta = Math.max(-1, Math.min(1, value));
                            var horizontalDetection = "undefined" !== typeof e.wheelDeltaX || "undefined" !== typeof e.deltaX;
                            isScrollingVertically = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection;
                            var curTime = (new Date).getTime();
                            direction = delta < 0 ? "down" : "up";
                            if (_scrollings.length > 149) _scrollings.shift();
                            _scrollings.push(Math.abs(value));
                            var timeDiff = curTime - _prevTime;
                            _prevTime = curTime;
                            if (timeDiff > 200) _scrollings = [];
                        },
                        isAccelerating: function isAccelerating() {
                            var averageEnd = getAverage(_scrollings, 10);
                            var averageMiddle = getAverage(_scrollings, 70);
                            var isAccelerating = averageEnd >= averageMiddle;
                            return _scrollings.length ? isAccelerating && isScrollingVertically : false;
                        },
                        getDirection: function getDirection() {
                            return direction;
                        }
                    };
                }();
                function scrollBeyondFullPage() {
                    var dtop = getDestinationOffset();
                    var scrollSettings = getScrollSettings(dtop);
                    FP.test.top = -dtop + "px";
                    css(doc.body, {
                        "scroll-snap-type": "none"
                    });
                    css($htmlBody, {
                        "scroll-behavior": "unset"
                    });
                    setState({
                        canScroll: false
                    });
                    scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, (function() {
                        setTimeout((function() {
                            setState({
                                isBeyondFullpage: true
                            });
                            setState({
                                canScroll: true
                            });
                        }), 30);
                    }));
                }
                function onKeyDown() {
                    if (!isFullPageAbove()) return; else scrollUpToFullpage();
                }
                function scrollUpToFullpage() {
                    var scrollSettings = getScrollSettings(getLast(getState().sections).item.offsetTop);
                    setState({
                        canScroll: false
                    });
                    scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, (function() {
                        setState({
                            canScroll: true
                        });
                        setState({
                            isBeyondFullpage: false
                        });
                        setState({
                            isAboutToScrollToFullPage: false
                        });
                    }));
                }
                function getDestinationOffset() {
                    if (!getOptions().css3) return getLast(getState().sections).item.offsetTop + getLast(getState().sections).item.offsetHeight;
                    return getScrollTop(getOptions()) + getWindowHeight();
                }
                function beyondFullPageHandler(container, e) {
                    (new Date).getTime();
                    var pauseScroll = getState().isBeyondFullpage && container.getBoundingClientRect().bottom >= 0 && "up" === wheelDataHandler.getDirection();
                    var g_isAboutToScrollToFullPage = getState().isAboutToScrollToFullPage;
                    if (g_isAboutToScrollToFullPage) {
                        preventDefault(e);
                        return false;
                    }
                    if (getState().isBeyondFullpage) {
                        if (!pauseScroll) keyframeTime("set", "beyondFullpage", 1e3); else {
                            var shouldSetFixedPosition = !g_isAboutToScrollToFullPage && (!keyframeTime("isNewKeyframe", "beyondFullpage") || !wheelDataHandler.isAccelerating());
                            var scrollSettings;
                            if (shouldSetFixedPosition) {
                                scrollSettings = getScrollSettings(getLast(getState().sections).item.offsetTop + getLast(getState().sections).item.offsetHeight);
                                scrollSettings.element.scrollTo(0, scrollSettings.options);
                                setState({
                                    isAboutToScrollToFullPage: false
                                });
                                preventDefault(e);
                                return false;
                            } else if (wheelDataHandler.isAccelerating()) {
                                pauseScroll = false;
                                setState({
                                    isAboutToScrollToFullPage: true
                                });
                                setState({
                                    scrollTrigger: "wheel"
                                });
                                scrollUpToFullpage();
                                preventDefault(e);
                                return false;
                            }
                        }
                        if (!g_isAboutToScrollToFullPage) if (!pauseScroll) return true;
                    }
                }
                var keyframeTime = function() {
                    var isNew = false;
                    var frames = {};
                    var timeframes = {};
                    return function(action, name, timeframe) {
                        switch (action) {
                          case "set":
                            frames[name] = (new Date).getTime();
                            timeframes[name] = timeframe;
                            break;

                          case "isNewKeyframe":
                            var current = (new Date).getTime();
                            isNew = current - frames[name] > timeframes[name];
                            break;
                        }
                        return isNew;
                    };
                }();
                function createInfiniteSections(v) {
                    setState({
                        isDoingContinousVertical: true
                    });
                    var activeSectionItem = getState().activeSection.item;
                    if (!v.isMovementUp) after(activeSectionItem, prevAll(activeSectionItem, SECTION_SEL).reverse()); else before(activeSectionItem, nextAll(activeSectionItem, SECTION_SEL));
                    silentScroll(getState().activeSection.item.offsetTop);
                    keepSlidesPosition$1();
                    v.wrapAroundElements = activeSectionItem;
                    v.dtop = v.element.offsetTop;
                    v.yMovement = getYmovement(getState().activeSection, v.element);
                    return v;
                }
                function keepSlidesPosition$1() {
                    var activeSlides = $(SLIDE_ACTIVE_SEL);
                    for (var i = 0; i < activeSlides.length; i++) silentLandscapeScroll(activeSlides[i], "internal");
                }
                function keepSlidesPosition() {
                    var activeSlides = $(SLIDE_ACTIVE_SEL);
                    for (var i = 0; i < activeSlides.length; i++) silentLandscapeScroll(activeSlides[i], "internal");
                }
                function continuousVerticalFixSectionOrder(v) {
                    if (null == v.wrapAroundElements) return;
                    if (v.isMovementUp) before($(SECTION_SEL)[0], v.wrapAroundElements); else after($(SECTION_SEL)[getState().sections.length - 1], v.wrapAroundElements);
                    silentScroll(getState().activeSection.item.offsetTop);
                    keepSlidesPosition();
                    setState({
                        isDoingContinousVertical: false
                    });
                }
                function lazyLoadOthers() {
                    var hasAutoHeightSections = $(AUTO_HEIGHT_SEL)[0] || isResponsiveMode() && $(AUTO_HEIGHT_RESPONSIVE_SEL)[0];
                    if (!getOptions().lazyLoading || !hasAutoHeightSections) return;
                    $(SECTION_SEL + ":not(" + ACTIVE_SEL + ")").forEach((function(section) {
                        if (isSectionInViewport(section)) lazyLoad(section);
                    }));
                }
                function isSectionInViewport(el) {
                    var rect = el.getBoundingClientRect();
                    var top = rect.top;
                    var bottom = rect.bottom;
                    var pixelOffset = 2;
                    var isTopInView = top + pixelOffset < state.windowsHeight && top > 0;
                    var isBottomInView = bottom > pixelOffset && bottom < state.windowsHeight;
                    return isTopInView || isBottomInView;
                }
                function activateMenuAndNav(anchor, index) {
                    activateMenuElement(anchor);
                    activateNavDots(anchor, index);
                }
                function activateMenuElement(name) {
                    if (getOptions().menu && getOptions().menu.length) $(getOptions().menu).forEach((function(menu) {
                        if (null != menu) {
                            removeClass($(ACTIVE_SEL, menu), ACTIVE);
                            addClass($('[data-menuanchor="' + name + '"]', menu), ACTIVE);
                        }
                    }));
                }
                function fireCallbackOncePerScroll(callbackName, params) {
                    if (!isFunction(getOptions().beforeLeave)) return;
                    var result = oncePerScroll(getState().scrollTrigger, (function() {
                        return fireCallback(callbackName, params);
                    }));
                    return result;
                }
                FP.moveTo = moveTo;
                FP.getScrollY = function() {
                    return state.scrollY;
                };
                var g_afterSectionLoadsId;
                var g_transitionLapseId;
                EventEmitter.on("onDestroy", onDestroy$6);
                function scrollPage(section, callback, isMovementUp) {
                    var element = section.item;
                    if (null == element) return;
                    var dtop = getDestinationPosition(element);
                    var slideAnchorLink;
                    var slideIndex;
                    var v = {
                        element,
                        callback,
                        isMovementUp,
                        dtop,
                        yMovement: getYmovement(getState().activeSection, element),
                        anchorLink: section.anchor,
                        sectionIndex: section.index(),
                        activeSlide: section.activeSlide ? section.activeSlide.item : null,
                        leavingSection: getState().activeSection.index() + 1,
                        localIsResizing: state.isResizing,
                        items: {
                            origin: getState().activeSection,
                            destination: section
                        },
                        direction: null
                    };
                    if (getState().activeSection.item == element && !state.isResizing || getOptions().scrollBar && getScrollTop(getOptions()) === v.dtop && !hasClass(element, AUTO_HEIGHT)) return;
                    if (null != v.activeSlide) {
                        slideAnchorLink = getAttr(v.activeSlide, "data-anchor");
                        slideIndex = index(v.activeSlide, null);
                    }
                    if (!v.localIsResizing) {
                        var direction = v.yMovement;
                        if ("undefined" !== typeof isMovementUp) direction = isMovementUp ? "up" : "down";
                        v.direction = direction;
                        if (isFunction(getOptions().beforeLeave)) if (false === fireCallbackOncePerScroll("beforeLeave", v)) return;
                        if (isFunction(getOptions().onLeave)) if (!fireCallback("onLeave", v)) return;
                    }
                    if (getOptions().autoScrolling && getOptions().continuousVertical && "undefined" !== typeof v.isMovementUp && (!v.isMovementUp && "up" == v.yMovement || v.isMovementUp && "down" == v.yMovement)) v = createInfiniteSections(v);
                    if (!v.localIsResizing) stopMedia(getState().activeSection.item);
                    addClass(element, ACTIVE);
                    removeClass(siblings(element), ACTIVE);
                    updateState();
                    lazyLoad(element);
                    setState({
                        canScroll: FP.test.isTesting
                    });
                    setPageStatus(slideIndex, slideAnchorLink, v.anchorLink);
                    performMovement(v);
                    setState({
                        lastScrolledDestiny: v.anchorLink
                    });
                    activateMenuAndNav(v.anchorLink, v.sectionIndex);
                }
                function onDestroy$6() {
                    clearTimeout(g_afterSectionLoadsId);
                    clearTimeout(g_transitionLapseId);
                }
                function getDestinationPosition(element) {
                    var elementHeight = element.offsetHeight;
                    var elementTop = element.offsetTop;
                    var position = elementTop;
                    var isScrollingDown = elementTop > state.previousDestTop;
                    var sectionBottom = position - getWindowHeight() + elementHeight;
                    var bigSectionsDestination = getOptions().bigSectionsDestination;
                    if (elementHeight > getWindowHeight()) {
                        if (!isScrollingDown && !bigSectionsDestination || "bottom" === bigSectionsDestination) position = sectionBottom;
                    } else if (isScrollingDown || state.isResizing && null == next(element)) position = sectionBottom;
                    setState({
                        previousDestTop: position
                    });
                    return position;
                }
                function performMovement(v) {
                    var isFastSpeed = getOptions().scrollingSpeed < 700;
                    var transitionLapse = isFastSpeed ? 700 : getOptions().scrollingSpeed;
                    setState({
                        touchDirection: "none",
                        scrollY: Math.round(v.dtop)
                    });
                    EventEmitter.emit("onPerformMovement");
                    if (getOptions().css3 && getOptions().autoScrolling && !getOptions().scrollBar) {
                        var translate3d = "translate3d(0px, -" + Math.round(v.dtop) + "px, 0px)";
                        transformContainer(translate3d, true);
                        if (getOptions().scrollingSpeed) {
                            clearTimeout(g_afterSectionLoadsId);
                            g_afterSectionLoadsId = setTimeout((function() {
                                afterSectionLoads(v);
                                setState({
                                    canScroll: !isFastSpeed || FP.test.isTesting
                                });
                            }), getOptions().scrollingSpeed);
                        } else afterSectionLoads(v);
                    } else {
                        var scrollSettings = getScrollSettings(v.dtop);
                        FP.test.top = -v.dtop + "px";
                        css($htmlBody, {
                            "scroll-behavior": "unset"
                        });
                        clearTimeout(g_afterSectionLoadsId);
                        scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, (function() {
                            if (getOptions().scrollBar) g_afterSectionLoadsId = setTimeout((function() {
                                afterSectionLoads(v);
                            }), 30); else {
                                afterSectionLoads(v);
                                setState({
                                    canScroll: !isFastSpeed || FP.test.isTesting
                                });
                            }
                        }));
                    }
                    if (isFastSpeed) {
                        clearTimeout(g_transitionLapseId);
                        g_transitionLapseId = setTimeout((function() {
                            setState({
                                canScroll: true
                            });
                        }), transitionLapse);
                    }
                }
                function afterSectionLoads(v) {
                    if (getOptions().fitToSection) if (hasClass($(SECTION_ACTIVE_SEL)[0], AUTO_HEIGHT)) css(doc.body, {
                        "scroll-snap-type": "none"
                    });
                    setState({
                        isBeyondFullpage: false
                    });
                    continuousVerticalFixSectionOrder(v);
                    if (isFunction(getOptions().afterLoad) && !v.localIsResizing) fireCallback("afterLoad", v);
                    updateState();
                    if (!v.localIsResizing) playMedia(v.element);
                    addClass(v.element, COMPLETELY);
                    removeClass(siblings(v.element), COMPLETELY);
                    lazyLoadOthers();
                    scrollOverflowHandler.afterSectionLoads();
                    setState({
                        canScroll: true
                    });
                    if (isFunction(v.callback)) v.callback();
                }
                FP.moveSectionDown = moveSectionDown;
                function moveSectionDown() {
                    var next = getState().activeSection.next();
                    if (!next && (getOptions().loopBottom || getOptions().continuousVertical)) next = getState().sections[0];
                    if (null != next) scrollPage(next, null, false); else if (hasContentBeyondFullPage()) EventEmitter.emit("scrollBeyondFullpage");
                }
                function hasContentBeyondFullPage() {
                    return getContainer().scrollHeight < $body.scrollHeight;
                }
                FP.moveSectionUp = moveSectionUp;
                function moveSectionUp() {
                    var prev = getState().activeSection.prev();
                    if (!prev && (getOptions().loopTop || getOptions().continuousVertical)) prev = getLast(getState().sections);
                    if (null != prev) scrollPage(prev, null, true);
                }
                var oldPageY = 0;
                function mouseMoveHandler(e) {
                    if (!getOptions().autoScrolling) return;
                    if (state.canScroll) if (e.pageY < oldPageY && getIsScrollAllowed().m.up) moveSectionUp(); else if (e.pageY > oldPageY && getIsScrollAllowed().m.down) moveSectionDown();
                    oldPageY = e.pageY;
                }
                function setOldPageY(value) {
                    oldPageY = value;
                }
                function scrolling(type) {
                    if (!getIsScrollAllowed().m[type]) return;
                    var scrollSection = "down" === type ? moveSectionDown : moveSectionUp;
                    if (getOptions().scrollOverflow && scrollOverflowHandler.isScrollable(getState().activeSection)) {
                        if (scrollOverflowHandler.isScrolled(type, getState().activeSection.item) && scrollOverflowHandler.shouldMovePage()) scrollSection();
                    } else scrollSection();
                }
                var touchStartY = 0;
                var touchStartX = 0;
                var touchEndY = 0;
                var touchEndX = 0;
                var MSPointer = getMSPointer();
                var events = {
                    touchmove: "ontouchmove" in window ? "touchmove" : MSPointer.move,
                    touchstart: "ontouchstart" in window ? "touchstart" : MSPointer.down
                };
                function addTouchHandler() {
                    if (isTouchDevice || isTouch) {
                        if (getOptions().autoScrolling) {
                            $body.removeEventListener(events.touchmove, preventBouncing, {
                                passive: false
                            });
                            $body.addEventListener(events.touchmove, preventBouncing, {
                                passive: false
                            });
                        }
                        var touchWrapper = getOptions().touchWrapper;
                        touchWrapper.removeEventListener(events.touchstart, touchStartHandler);
                        touchWrapper.removeEventListener(events.touchmove, touchMoveHandler, {
                            passive: false
                        });
                        touchWrapper.addEventListener(events.touchstart, touchStartHandler);
                        touchWrapper.addEventListener(events.touchmove, touchMoveHandler, {
                            passive: false
                        });
                    }
                }
                function removeTouchHandler() {
                    if (isTouchDevice || isTouch) {
                        if (getOptions().autoScrolling) {
                            $body.removeEventListener(events.touchmove, touchMoveHandler, {
                                passive: false
                            });
                            $body.removeEventListener(events.touchmove, preventBouncing, {
                                passive: false
                            });
                        }
                        var touchWrapper = getOptions().touchWrapper;
                        touchWrapper.removeEventListener(events.touchstart, touchStartHandler);
                        touchWrapper.removeEventListener(events.touchmove, touchMoveHandler, {
                            passive: false
                        });
                    }
                }
                function touchMoveHandler(e) {
                    var activeSection = closest(e.target, SECTION_SEL) || getState().activeSection.item;
                    var hasActiveSectionOverflow = scrollOverflowHandler.isScrollable(getState().activeSection);
                    if (isReallyTouch(e)) {
                        setState({
                            isGrabbing: true,
                            isUsingWheel: false
                        });
                        if (getOptions().autoScrolling) if (!hasActiveSectionOverflow || hasActiveSectionOverflow && !state.canScroll) preventDefault(e);
                        var touchEvents = getEventsPage(e);
                        touchEndY = touchEvents.y;
                        touchEndX = touchEvents.x;
                        var isVerticalMovementEnough = Math.abs(touchStartY - touchEndY) > win.innerHeight / 100 * getOptions().touchSensitivity;
                        var isHorizontalMovementEnough = Math.abs(touchStartX - touchEndX) > getWindowWidth() / 100 * getOptions().touchSensitivity;
                        var isHorizontalPredominantMove = $(SLIDES_WRAPPER_SEL, activeSection).length && Math.abs(touchStartX - touchEndX) > Math.abs(touchStartY - touchEndY);
                        var directionH = touchStartX > touchEndX ? "right" : "left";
                        var directionV = touchStartY > touchEndY ? "down" : "up";
                        var direction = isHorizontalPredominantMove ? directionH : directionV;
                        setState({
                            touchDirection: direction
                        });
                        if (isHorizontalPredominantMove) {
                            if (!state.slideMoving && isHorizontalMovementEnough) if (touchStartX > touchEndX) {
                                if (getIsScrollAllowed().m.right) EventEmitter.emit("moveSlideRight", {
                                    section: activeSection
                                });
                            } else if (getIsScrollAllowed().m.left) EventEmitter.emit("moveSlideLeft", {
                                section: activeSection
                            });
                        } else if (getOptions().autoScrolling && state.canScroll) if (isVerticalMovementEnough) scrolling(directionV);
                    }
                }
                function isReallyTouch(e) {
                    return "undefined" === typeof e.pointerType || "mouse" != e.pointerType;
                }
                function touchStartHandler(e) {
                    if (getOptions().fitToSection) setState({
                        activeAnimation: false
                    });
                    if (isReallyTouch(e)) {
                        var touchEvents = getEventsPage(e);
                        touchStartY = touchEvents.y;
                        touchStartX = touchEvents.x;
                    }
                    windowAddEvent("touchend", touchEndHandler);
                }
                function touchEndHandler() {
                    windowRemoveEvent("touchend", touchEndHandler);
                    setState({
                        isGrabbing: false
                    });
                }
                function getEventsPage(e) {
                    var events = {};
                    events.y = "undefined" !== typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY;
                    events.x = "undefined" !== typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX;
                    if (isTouch && isReallyTouch(e) && getOptions().scrollBar && "undefined" !== typeof e.touches) {
                        events.y = e.touches[0].pageY;
                        events.x = e.touches[0].pageX;
                    }
                    return events;
                }
                function getMSPointer() {
                    var pointer;
                    if (win.PointerEvent) pointer = {
                        down: "pointerdown",
                        move: "pointermove"
                    };
                    return pointer;
                }
                function preventBouncing(e) {
                    if (getOptions().autoScrolling && isReallyTouch(e) && getIsScrollAllowed().m.up) if (!state.canScroll) preventDefault(e);
                }
                FP.moveSlideLeft = moveSlideLeft;
                FP.moveSlideRight = moveSlideRight;
                function moveSlide(direction, section) {
                    var activeSectionItem = null == section ? getState().activeSection.item : section;
                    var activeSection = getPanelByElement(state.sections, activeSectionItem);
                    var slides = $(SLIDES_WRAPPER_SEL, activeSectionItem)[0];
                    if (null == slides || state.slideMoving || activeSection.slides.length < 2) return;
                    var currentSlide = activeSection.activeSlide;
                    var destiny = "left" === direction ? currentSlide.prev() : currentSlide.next();
                    if (!destiny) {
                        if (!getOptions().loopHorizontal) return;
                        destiny = "left" === direction ? getLast(activeSection.slides) : activeSection.slides[0];
                    }
                    setState({
                        slideMoving: !FP.test.isTesting
                    });
                    landscapeScroll(slides, destiny.item, direction);
                }
                function moveSlideLeft(section) {
                    moveSlide("left", section);
                }
                function moveSlideRight(section) {
                    moveSlide("right", section);
                }
                function getSectionByAnchor(sectionAnchor) {
                    var section = getState().sections.filter((function(section) {
                        return section.anchor === sectionAnchor;
                    }))[0];
                    if (!section) {
                        var sectionIndex = "undefined" !== typeof sectionAnchor ? sectionAnchor - 1 : 0;
                        section = getState().sections[sectionIndex];
                    }
                    return section;
                }
                function scrollSlider(slideElem) {
                    if (null != slideElem) landscapeScroll(closest(slideElem, SLIDES_WRAPPER_SEL), slideElem);
                }
                function scrollPageAndSlide(sectionAnchor, slideAnchor) {
                    var section = getSectionByAnchor(sectionAnchor);
                    if (null == section) return;
                    var slideElem = getSlideByAnchor(slideAnchor, section);
                    if (section.anchor !== state.lastScrolledDestiny && !hasClass(section.item, ACTIVE)) scrollPage(section, (function() {
                        scrollSlider(slideElem);
                    })); else scrollSlider(slideElem);
                }
                function getSlideByAnchor(slideAnchor, section) {
                    var slide = section.slides.filter((function(slide) {
                        return slide.anchor === slideAnchor;
                    }))[0];
                    if (null == slide) {
                        slideAnchor = "undefined" !== typeof slideAnchor ? slideAnchor : 0;
                        slide = section.slides[slideAnchor];
                    }
                    return slide ? slide.item : null;
                }
                FP.moveTo = moveTo$1;
                function moveTo$1(sectionAnchor, slideAnchor) {
                    var destiny = getSectionByAnchor(sectionAnchor);
                    if ("undefined" !== typeof slideAnchor) scrollPageAndSlide(sectionAnchor, slideAnchor); else if (null != destiny) scrollPage(destiny);
                }
                var g_controlPressed;
                var g_keydownId;
                EventEmitter.on("bindEvents", bindEvents$8);
                function bindEvents$8() {
                    windowAddEvent("blur", blurHandler);
                    docAddEvent("keydown", keydownHandler);
                    $body.addEventListener("keydown", onBodyClick);
                    docAddEvent("keyup", keyUpHandler);
                    EventEmitter.on("onDestroy", onDestroy$5);
                }
                function onDestroy$5() {
                    clearTimeout(g_keydownId);
                    docRemoveEvent("keydown", keydownHandler);
                    docRemoveEvent("keyup", keyUpHandler);
                }
                function isInsideInput() {
                    var activeElement = doc.activeElement;
                    return matches(activeElement, "textarea") || matches(activeElement, "input") || matches(activeElement, "select") || "true" == getAttr(activeElement, "contentEditable") || "" == getAttr(activeElement, "contentEditable");
                }
                function keydownHandler(e) {
                    clearTimeout(g_keydownId);
                    var keyCode = e.keyCode;
                    var isPressingHorizontalArrows = [ 37, 39 ].indexOf(keyCode) > -1;
                    var canScrollWithKeyboard = getOptions().autoScrolling || isPressingHorizontalArrows;
                    if (9 === keyCode) onTab(e); else if (!isInsideInput() && getOptions().keyboardScrolling && canScrollWithKeyboard) {
                        g_controlPressed = e.ctrlKey;
                        g_keydownId = setTimeout((function() {
                            onkeydown(e);
                        }), 0);
                    }
                }
                function onkeydown(e) {
                    var shiftPressed = e.shiftKey;
                    var activeElement = doc.activeElement;
                    var isMediaFocused = matches(activeElement, "video") || matches(activeElement, "audio");
                    var isScrolled = {
                        up: scrollOverflowHandler.isScrolled("up", getState().activeSection.item),
                        down: scrollOverflowHandler.isScrolled("down", getState().activeSection.item)
                    };
                    var isUsingHorizontalArrowKeys = [ 37, 39 ].indexOf(e.keyCode) > -1;
                    cancelDirectionKeyEvents(e);
                    if (!state.canScroll && !isUsingHorizontalArrowKeys) return;
                    setState({
                        scrollTrigger: "keydown"
                    });
                    switch (e.keyCode) {
                      case 38:
                      case 33:
                        if (getIsScrollAllowed().k.up && isScrolled.up) if (state.isBeyondFullpage) EventEmitter.emit("onKeyDown", {
                            e
                        }); else moveSectionUp();
                        break;

                      case 32:
                        if (shiftPressed && getIsScrollAllowed().k.up && !isMediaFocused && isScrolled.up) {
                            moveSectionUp();
                            break;
                        }

                      case 40:
                      case 34:
                        if (getIsScrollAllowed().k.down && isScrolled.down) {
                            if (state.isBeyondFullpage) return;
                            if (32 !== e.keyCode || !isMediaFocused) moveSectionDown();
                        }
                        break;

                      case 36:
                        if (getIsScrollAllowed().k.up) moveTo$1(1);
                        break;

                      case 35:
                        if (getIsScrollAllowed().k.down) moveTo$1(getState().sections.length);
                        break;

                      case 37:
                        if (getIsScrollAllowed().k.left) moveSlideLeft();
                        break;

                      case 39:
                        if (getIsScrollAllowed().k.right) moveSlideRight();
                        break;

                      default:
                        return;
                    }
                }
                function keyUpHandler(e) {
                    if (state.isWindowFocused) g_controlPressed = e.ctrlKey;
                }
                function blurHandler() {
                    setState({
                        isWindowFocused: false
                    });
                    g_controlPressed = false;
                }
                function onTab(e) {
                    var isShiftPressed = e.shiftKey;
                    var activeElement = doc.activeElement;
                    var focusableElements = getFocusables(getSlideOrSection(getState().activeSection.item));
                    function preventAndFocusFirst(e) {
                        preventDefault(e);
                        return focusableElements[0] ? focusableElements[0].focus() : null;
                    }
                    if (isFocusOutside(e)) return;
                    if (activeElement) {
                        if (null == closest(activeElement, SECTION_ACTIVE_SEL + "," + SECTION_ACTIVE_SEL + " " + SLIDE_ACTIVE_SEL)) activeElement = preventAndFocusFirst(e);
                    } else preventAndFocusFirst(e);
                    if (!isShiftPressed && activeElement == focusableElements[focusableElements.length - 1] || isShiftPressed && activeElement == focusableElements[0]) preventDefault(e);
                }
                function getFocusables(el) {
                    return [].slice.call($(focusableElementsString, el)).filter((function(item) {
                        return "-1" !== getAttr(item, "tabindex") && null !== item.offsetParent;
                    }));
                }
                function isFocusOutside(e) {
                    var allFocusables = getFocusables(doc);
                    var currentFocusIndex = allFocusables.indexOf(doc.activeElement);
                    var focusDestinationIndex = e.shiftKey ? currentFocusIndex - 1 : currentFocusIndex + 1;
                    var focusDestination = allFocusables[focusDestinationIndex];
                    var destinationItemSlide = closest(focusDestination, SLIDE_SEL);
                    var destinationItemSection = closest(focusDestination, SECTION_SEL);
                    return !destinationItemSlide && !destinationItemSection;
                }
                function shouldCancelKeyboardNavigation(e) {
                    var keyControls = [ 40, 38, 32, 33, 34 ];
                    return keyControls.indexOf(e.keyCode) > -1 && !state.isBeyondFullpage;
                }
                function onBodyClick(e) {
                    if (!isInsideInput()) cancelDirectionKeyEvents(e);
                }
                function cancelDirectionKeyEvents(e) {
                    if (shouldCancelKeyboardNavigation(e) && !closest(e.target, OVERFLOW_SEL)) e.preventDefault();
                }
                function getControlPressed() {
                    return g_controlPressed;
                }
                var prevTime = (new Date).getTime();
                var scrollings = [];
                FP.setMouseWheelScrolling = setMouseWheelScrolling;
                function setMouseWheelScrolling(value) {
                    if (value) {
                        addMouseWheelHandler();
                        addMiddleWheelHandler();
                    } else {
                        removeMouseWheelHandler();
                        removeMiddleWheelHandler();
                    }
                }
                function addMouseWheelHandler() {
                    var prefix = "";
                    var _addEventListener;
                    if (win.addEventListener) _addEventListener = "addEventListener"; else {
                        _addEventListener = "attachEvent";
                        prefix = "on";
                    }
                    var support = "onwheel" in doc.createElement("div") ? "wheel" : void 0 !== doc.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                    var passiveEvent = getPassiveOptionsIfPossible();
                    if ("DOMMouseScroll" == support) doc[_addEventListener](prefix + "MozMousePixelScroll", MouseWheelHandler, passiveEvent); else doc[_addEventListener](prefix + support, MouseWheelHandler, passiveEvent);
                }
                function addMiddleWheelHandler() {
                    getContainer().addEventListener("mousedown", mouseDownHandler);
                    getContainer().addEventListener("mouseup", mouseUpHandler);
                }
                function removeMouseWheelHandler() {
                    if (doc.addEventListener) {
                        docRemoveEvent("mousewheel", MouseWheelHandler, false);
                        docRemoveEvent("wheel", MouseWheelHandler, false);
                        docRemoveEvent("MozMousePixelScroll", MouseWheelHandler, false);
                    } else doc.detachEvent("onmousewheel", MouseWheelHandler);
                }
                function removeMiddleWheelHandler() {
                    getContainer().removeEventListener("mousedown", mouseDownHandler);
                    getContainer().removeEventListener("mouseup", mouseUpHandler);
                }
                function MouseWheelHandler(e) {
                    var curTime = (new Date).getTime();
                    var isNormalScroll = hasClass($(COMPLETELY_SEL)[0], NORMAL_SCROLL);
                    var isScrollAllowedBeyondFullPage = beyondFullPageHandler(getContainer(), e);
                    if (!state.isUsingWheel) setState({
                        isGrabbing: false,
                        isUsingWheel: true,
                        touchDirection: "none"
                    });
                    if (!getIsScrollAllowed().m.down && !getIsScrollAllowed().m.up) {
                        preventDefault(e);
                        return false;
                    }
                    if (isScrollAllowedBeyondFullPage) return true; else if (false === isScrollAllowedBeyondFullPage) {
                        preventDefault(e);
                        return false;
                    }
                    if (getOptions().autoScrolling && !getControlPressed() && !isNormalScroll) {
                        e = e || win.event;
                        var value = e.wheelDelta || -e.deltaY || -e.detail;
                        var delta = Math.max(-1, Math.min(1, value));
                        var horizontalDetection = "undefined" !== typeof e.wheelDeltaX || "undefined" !== typeof e.deltaX;
                        var isScrollingVertically = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection;
                        var direction = delta < 0 ? "down" : delta > 0 ? "up" : "none";
                        if (scrollings.length > 149) scrollings.shift();
                        scrollings.push(Math.abs(value));
                        if (getOptions().scrollBar) preventDefault(e);
                        var timeDiff = curTime - prevTime;
                        prevTime = curTime;
                        if (timeDiff > 200) scrollings = [];
                        setState({
                            wheelDirection: direction
                        });
                        if (state.canScroll) {
                            var averageEnd = getAverage(scrollings, 10);
                            var averageMiddle = getAverage(scrollings, 70);
                            var isAccelerating = averageEnd >= averageMiddle;
                            if (isAccelerating && isScrollingVertically) {
                                setState({
                                    scrollTrigger: "wheel"
                                });
                                if (delta < 0) scrolling("down"); else scrolling("up");
                            }
                        }
                        return false;
                    }
                    if (getOptions().fitToSection) setState({
                        activeAnimation: false
                    });
                }
                function mouseDownHandler(e) {
                    if (2 == e.which) {
                        setOldPageY(e.pageY);
                        getContainer().addEventListener("mousemove", mouseMoveHandler);
                    }
                }
                function mouseUpHandler(e) {
                    if (2 == e.which) getContainer().removeEventListener("mousemove", mouseMoveHandler);
                }
                function setMouseHijack(value) {
                    if (value) {
                        setMouseWheelScrolling(true);
                        addTouchHandler();
                    } else {
                        setMouseWheelScrolling(false);
                        removeTouchHandler();
                    }
                }
                var g_canFireMouseEnterNormalScroll = true;
                EventEmitter.on("bindEvents", bindEvents$7);
                function bindEvents$7() {
                    if (getOptions().normalScrollElements) {
                        [ "mouseenter", "touchstart" ].forEach((function(eventName) {
                            forMouseLeaveOrTouch(eventName, false);
                        }));
                        [ "mouseleave", "touchend" ].forEach((function(eventName) {
                            forMouseLeaveOrTouch(eventName, true);
                        }));
                    }
                    EventEmitter.on("onDestroy", onDestroy$4);
                }
                function onDestroy$4() {
                    [ "mouseenter", "touchstart", "mouseleave", "touchend" ].forEach((function(eventName) {
                        docRemoveEvent(eventName, onMouseEnterOrLeave, true);
                    }));
                }
                function forMouseLeaveOrTouch(eventName, allowScrolling) {
                    document["fp_" + eventName] = allowScrolling;
                    docAddEvent(eventName, onMouseEnterOrLeave, true);
                }
                function onMouseEnterOrLeave(e) {
                    var type = e.type;
                    var isInsideOneNormalScroll = false;
                    var target = "mouseleave" === type ? e.toElement || e.relatedTarget : e.target;
                    if (target == document || !target) {
                        setMouseHijack(true);
                        return;
                    }
                    if ("touchend" === type) {
                        g_canFireMouseEnterNormalScroll = false;
                        setTimeout((function() {
                            g_canFireMouseEnterNormalScroll = true;
                        }), 800);
                    }
                    if ("mouseenter" === type && !g_canFireMouseEnterNormalScroll) return;
                    var normalSelectors = getOptions().normalScrollElements.split(",");
                    normalSelectors.forEach((function(normalSelector) {
                        if (!isInsideOneNormalScroll) {
                            var isNormalScrollTarget = matches(target, normalSelector);
                            var isNormalScrollChildFocused = closest(target, normalSelector);
                            if (isNormalScrollTarget || isNormalScrollChildFocused) {
                                if (!FP.shared.isNormalScrollElement) setMouseHijack(false);
                                FP.shared.isNormalScrollElement = true;
                                isInsideOneNormalScroll = true;
                            }
                        }
                    }));
                    if (!isInsideOneNormalScroll && FP.shared.isNormalScrollElement) {
                        setMouseHijack(true);
                        FP.shared.isNormalScrollElement = false;
                    }
                }
                FP.silentMoveTo = silentMoveTo;
                function silentMoveTo(sectionAnchor, slideAnchor) {
                    setScrollingSpeed(0, "internal");
                    moveTo$1(sectionAnchor, slideAnchor);
                    setScrollingSpeed(getOriginals().scrollingSpeed, "internal");
                }
                var previousHeight = getWindowHeight();
                var windowsWidth = getWindowWidth();
                var g_resizeId;
                var g_isConsecutiveResize = false;
                FP.reBuild = reBuild;
                EventEmitter.on("bindEvents", bindEvents$6);
                function bindEvents$6() {
                    windowAddEvent("resize", resizeHandler);
                    EventEmitter.on("onDestroy", onDestroy$3);
                }
                function onDestroy$3() {
                    clearTimeout(g_resizeId);
                    windowRemoveEvent("resize", resizeHandler);
                }
                function resizeHandler() {
                    if (!g_isConsecutiveResize) if (getOptions().autoScrolling && !getOptions().scrollBar || !getOptions().fitToSection) setSectionsHeight(getWindowHeight());
                    g_isConsecutiveResize = true;
                    clearTimeout(g_resizeId);
                    g_resizeId = setTimeout((function() {
                        resizeActions();
                        g_isConsecutiveResize = false;
                    }), 400);
                }
                function resizeActions() {
                    setState({
                        isResizing: true
                    });
                    setSectionsHeight("");
                    if (getOptions().fitToSection && !getOptions().autoScrolling && !state.isBeyondFullpage) setVhUnits();
                    EventEmitter.emit("contentChanged");
                    updateState();
                    responsive();
                    if (isTouchDevice) {
                        var activeElement = doc.activeElement;
                        if (!matches(activeElement, "textarea") && !matches(activeElement, "input") && !matches(activeElement, "select")) {
                            var currentHeight = getWindowHeight();
                            if (Math.abs(currentHeight - previousHeight) > 20 * Math.max(previousHeight, currentHeight) / 100) {
                                reBuild(true);
                                previousHeight = currentHeight;
                            }
                        }
                    } else adjustToNewViewport();
                    setState({
                        isResizing: false
                    });
                }
                function reBuild(resizing) {
                    if (hasClass(getContainer(), DESTROYED)) return;
                    setState({
                        isResizing: true,
                        windowsHeight: getWindowHeight(),
                        windowsWidth: getWindowWidth()
                    });
                    var sections = getState().sections;
                    for (var i = 0; i < sections.length; ++i) {
                        var section = sections[i];
                        var slidesWrap = $(SLIDES_WRAPPER_SEL, section.item)[0];
                        var slides = section.slides;
                        if (slides.length > 1) landscapeScroll(slidesWrap, section.activeSlide.item);
                    }
                    if (getOptions().scrollOverflow) scrollOverflowHandler.makeScrollable();
                    var sectionIndex = getState().activeSection.index();
                    if (!state.isBeyondFullpage) if (sectionIndex) silentMoveTo(sectionIndex + 1);
                    setState({
                        isResizing: false
                    });
                    if (isFunction(getOptions().afterResize) && resizing) getOptions().afterResize.call(getContainer(), win.innerWidth, win.innerHeight);
                    if (isFunction(getOptions().afterReBuild) && !resizing) getOptions().afterReBuild.call(getContainer());
                    trigger(getContainer(), "afterRebuild");
                }
                function adjustToNewViewport() {
                    var newWindowHeight = getWindowHeight();
                    var newWindowWidth = getWindowWidth();
                    if (state.windowsHeight !== newWindowHeight || windowsWidth !== newWindowWidth) {
                        setState({
                            windowsHeight: newWindowHeight
                        });
                        windowsWidth = newWindowWidth;
                        reBuild(true);
                    }
                }
                function setSectionsHeight(value) {
                    var propertyValue = "" === value ? "" : value + "px";
                    getState().sections.forEach((function(section) {
                        css(section.item, {
                            height: propertyValue
                        });
                    }));
                }
                function setVhUnits() {
                    if (!getOptions().autoScrolling || getOptions().scrollBar) {
                        var vh = .01 * win.innerHeight;
                        doc.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
                    }
                }
                function getAnchorsURL() {
                    var section;
                    var slide;
                    var hash = win.location.hash;
                    if (hash.length) {
                        var anchorsParts = hash.replace("#", "").split("/");
                        var isFunkyAnchor = hash.indexOf("#/") > -1;
                        section = isFunkyAnchor ? "/" + anchorsParts[1] : decodeURIComponent(anchorsParts[0]);
                        var slideAnchor = isFunkyAnchor ? anchorsParts[2] : anchorsParts[1];
                        if (slideAnchor && slideAnchor.length) slide = decodeURIComponent(slideAnchor);
                    }
                    return {
                        section,
                        slide
                    };
                }
                FP.setLockAnchors = setLockAnchors;
                EventEmitter.on("bindEvents", bindEvents$5);
                function bindEvents$5() {
                    windowAddEvent("hashchange", hashChangeHandler);
                    EventEmitter.on("onDestroy", onDestroy$2);
                }
                function onDestroy$2() {
                    windowRemoveEvent("hashchange", hashChangeHandler);
                }
                function setLockAnchors(value) {
                    getOptions().lockAnchors = value;
                }
                function hashChangeHandler() {
                    if (!state.isScrolling && !getOptions().lockAnchors) {
                        var anchors = getAnchorsURL();
                        var sectionAnchor = anchors.section;
                        var slideAnchor = anchors.slide;
                        var isFirstSlideMove = "undefined" === typeof state.lastScrolledDestiny;
                        var isFirstScrollMove = "undefined" === typeof state.lastScrolledDestiny && "undefined" === typeof slideAnchor && !state.slideMoving;
                        if (sectionAnchor && sectionAnchor.length) if (sectionAnchor && sectionAnchor !== state.lastScrolledDestiny && !isFirstSlideMove || isFirstScrollMove || !state.slideMoving && state.lastScrolledSlide != slideAnchor) EventEmitter.emit("onScrollPageAndSlide", {
                            sectionAnchor,
                            slideAnchor
                        });
                    }
                }
                EventEmitter.on("bindEvents", bindEvents$4);
                function bindEvents$4() {
                    docAddEvent("wheel", wheelDataHandler.registerEvent, getPassiveOptionsIfPossible());
                    EventEmitter.on("scrollBeyondFullpage", scrollBeyondFullPage);
                    EventEmitter.on("onKeyDown", onKeyDown);
                }
                EventEmitter.on("bindEvents", bindEvents$3);
                function bindEvents$3() {
                    EventEmitter.on("onClickOrTouch", onClickOrTouch$1);
                }
                function onClickOrTouch$1(params) {
                    var target = params.target;
                    if (closest(target, getOptions().menu + " [data-menuanchor]")) menuItemsHandler.call(target, params);
                }
                function menuItemsHandler(e) {
                    setState({
                        scrollTrigger: "menu"
                    });
                    if ($(getOptions().menu)[0] && (getOptions().lockAnchors || !getOptions().anchors.length)) {
                        preventDefault(e);
                        EventEmitter.emit("onMenuClick", {
                            anchor: getAttr(this, "data-menuanchor")
                        });
                    }
                }
                EventEmitter.on("bindEvents", bindEvents$2);
                function bindEvents$2() {
                    EventEmitter.on("onClickOrTouch", onClickOrTouch);
                }
                function onClickOrTouch(params) {
                    var target = params.target;
                    if (target && closest(target, SECTION_NAV_SEL + " a")) sectionBulletHandler.call(target, params.e); else if (matches(target, SECTION_NAV_TOOLTIP_SEL)) tooltipTextHandler.call(target); else if (matches(target, SLIDES_NAV_LINK_SEL) || null != closest(target, SLIDES_NAV_LINK_SEL)) slideBulletHandler.call(target, params.e);
                }
                var lastScroll = 0;
                var g_scrollId;
                var g_scrollId2;
                EventEmitter.on("onDestroy", onDestroy$1);
                function scrollHandler(e) {
                    var currentSection;
                    var currentSectionElem;
                    if (state.isResizing || !getState().activeSection) return;
                    getLast(getState().sections);
                    if (getState().isBeyondFullpage || getState().isAboutToScrollToFullPage) return;
                    if (!getOptions().autoScrolling || getOptions().scrollBar) {
                        var currentScroll = getScrollTop(getOptions());
                        var scrollDirection = getScrollDirection(currentScroll);
                        var visibleSectionIndex = 0;
                        var screen_mid = currentScroll + getWindowHeight() / 2;
                        var isAtBottom = $body.scrollHeight - getWindowHeight() === currentScroll;
                        var sections = getState().sections;
                        setState({
                            scrollY: currentScroll
                        });
                        if (isAtBottom) visibleSectionIndex = sections.length - 1; else if (!currentScroll) visibleSectionIndex = 0; else for (var i = 0; i < sections.length; ++i) {
                            var section = sections[i].item;
                            if (section.offsetTop <= screen_mid) visibleSectionIndex = i;
                        }
                        if (isCompletelyInViewPort(scrollDirection)) if (!hasClass(getState().activeSection.item, COMPLETELY)) {
                            addClass(getState().activeSection.item, COMPLETELY);
                            removeClass(siblings(getState().activeSection.item), COMPLETELY);
                        }
                        currentSection = sections[visibleSectionIndex];
                        currentSectionElem = currentSection.item;
                        if (!currentSection.isActive) {
                            setState({
                                isScrolling: true
                            });
                            var leavingSection = getState().activeSection.item;
                            var leavingSectionIndex = getState().activeSection.index() + 1;
                            var yMovement = getYmovement(getState().activeSection, currentSectionElem);
                            var anchorLink = currentSection.anchor;
                            var sectionIndex = currentSection.index() + 1;
                            var activeSlide = currentSection.activeSlide;
                            var slideIndex;
                            var slideAnchorLink;
                            var callbacksParams = {
                                activeSection: leavingSection,
                                sectionIndex: sectionIndex - 1,
                                anchorLink,
                                element: currentSectionElem,
                                leavingSection: leavingSectionIndex,
                                direction: yMovement,
                                items: {
                                    origin: getState().activeSection,
                                    destination: currentSection
                                }
                            };
                            if (activeSlide) {
                                slideAnchorLink = activeSlide.anchor;
                                slideIndex = activeSlide.index();
                            }
                            if (state.canScroll) {
                                addClass(currentSectionElem, ACTIVE);
                                removeClass(siblings(currentSectionElem), ACTIVE);
                                if (isFunction(getOptions().beforeLeave)) fireCallbackOncePerScroll("beforeLeave", callbacksParams);
                                if (isFunction(getOptions().onLeave)) fireCallback("onLeave", callbacksParams);
                                if (isFunction(getOptions().afterLoad)) fireCallback("afterLoad", callbacksParams);
                                stopMedia(leavingSection);
                                lazyLoad(currentSectionElem);
                                playMedia(currentSectionElem);
                                activateMenuAndNav(anchorLink, sectionIndex - 1);
                                if (getOptions().anchors.length) setState({
                                    lastScrolledDestiny: anchorLink
                                });
                                setPageStatus(slideIndex, slideAnchorLink, anchorLink);
                                updateState();
                            }
                            if (getOptions().fitToSection) {
                                clearTimeout(g_scrollId);
                                g_scrollId = setTimeout((function() {
                                    setState({
                                        isScrolling: false
                                    });
                                    var fixedSections = state.sections.filter((function(section) {
                                        var sectionValues = section.item.getBoundingClientRect();
                                        return Math.round(sectionValues.bottom) === Math.round(getWindowHeight()) || 0 === Math.round(sectionValues.top);
                                    }));
                                    if (!fixedSections.length) css(doc.body, {
                                        "scroll-snap-type": "y mandatory"
                                    });
                                }), 300);
                            }
                        }
                    }
                }
                function onDestroy$1() {
                    clearTimeout(g_scrollId);
                    clearTimeout(g_scrollId2);
                }
                function getScrollDirection(currentScroll) {
                    var direction = currentScroll > lastScroll ? "down" : "up";
                    lastScroll = currentScroll;
                    setState({
                        previousDestTop: currentScroll
                    });
                    return direction;
                }
                function isCompletelyInViewPort(movement) {
                    var top = getState().activeSection.item.offsetTop;
                    var bottom = top + getWindowHeight();
                    if ("up" == movement) return bottom >= getScrollTop(getOptions()) + getWindowHeight();
                    return top <= getScrollTop(getOptions());
                }
                EventEmitter.on("bindEvents", bindEvents$1);
                EventEmitter.on("onDestroy", onDestroy);
                function onDestroy() {
                    windowRemoveEvent("scroll", scrollHandler);
                }
                function bindEvents$1() {
                    windowAddEvent("scroll", scrollHandler);
                    doc.body.addEventListener("scroll", scrollHandler);
                    EventEmitter.on("onScrollPageAndSlide", (function(params) {
                        scrollPageAndSlide(params.sectionAnchor, params.slideAnchor);
                    }));
                    EventEmitter.on("onMenuClick", (function(params) {
                        moveTo$1(params.anchor, void 0);
                    }));
                    EventEmitter.on("onScrollOverflowScrolled", (function(params) {
                        var scrollSection = "down" === params.direction ? moveSectionDown : moveSectionUp;
                        scrollSection();
                    }));
                    EventEmitter.on("scrollPage", (function(params) {
                        scrollPage(params.destination);
                    }));
                }
                FP.getActiveSlide = getActiveSlide;
                FP.getScrollX = function() {
                    return state.scrollX;
                };
                EventEmitter.on("bindEvents", bindEvents);
                function bindEvents() {
                    EventEmitter.on("onDestroy", onDestroy$7);
                    EventEmitter.on("landscapeScroll", (function(params) {
                        landscapeScroll(params.slides, params.destination);
                    }));
                    EventEmitter.on("moveSlideRight", (function(params) {
                        moveSlideRight(params.section);
                    }));
                    EventEmitter.on("moveSlideLeft", (function(params) {
                        moveSlideLeft(params.section);
                    }));
                }
                function getActiveSlide() {
                    return nullOrSlide(getState().activeSection.activeSlide);
                }
                EventEmitter.on("bindEvents", init$1);
                function init$1() {
                    var position = getOptions().credits.position;
                    var positionStyle = [ "left", "right" ].indexOf(position) > -1 ? "".concat(position, ": 0;") : "";
                    var waterMark = '\n        <div class="fp-watermark" style="'.concat(positionStyle, '">\n            <a href="https://alvarotrigo.com/fullPage/" \n                rel="nofollow noopener" \n                target="_blank" \n                style="text-decoration:none; color: #000;">\n                    ').concat(getOptions().credits.label, "\n            </a>\n        </div>\n    ");
                    var lastSection = getLast(state.sections);
                    var shouldUseWaterMark = getOptions().credits.enabled && !state.isValid;
                    if (lastSection && lastSection.item && shouldUseWaterMark) lastSection.item.insertAdjacentHTML("beforeend", waterMark);
                }
                !function() {
                    EventEmitter.on("onInitialise", (function() {
                        var n, s;
                        setState({
                            isValid: (getOptions().licenseKey, n = getOptions().licenseKey, s = function(n) {
                                var e = parseInt("514").toString(16);
                                if (!n || n.length < 29 || 4 === n.split(t[0]).length) return null;
                                var i = [ "Each", "for" ][r()]().join(""), s = n[[ "split" ]]("-"), l = [];
                                s[i]((function(t, n) {
                                    if (n < 4) {
                                        var i = function(t) {
                                            var n = t[t.length - 1], e = [ "NaN", "is" ][r()]().join("");
                                            return window[e](n) ? o(n) : function(t) {
                                                return t - ACTIVE.length;
                                            }(n);
                                        }(t);
                                        l.push(i);
                                        var a = o(t[i]);
                                        if (1 === n) {
                                            var s = [ "pa", "dS", "t", "art" ].join("");
                                            a = a.toString()[s](2, "0");
                                        }
                                        e += a, 0 !== n && 1 !== n || (e += "-");
                                    }
                                }));
                                var p = 0, c = "";
                                return n.split("-").forEach((function(t, n) {
                                    if (n < 4) {
                                        var _r = 0;
                                        for (var e = 0; e < 4; e++) e !== l[n] && (_r += Math.abs(o(t[e])), isNaN(t[e]) || p++);
                                        var i = a(_r);
                                        c += i;
                                    }
                                })), c += a(p), {
                                    v: new Date(e + "T00:00"),
                                    o: e.split("-")[2] === 8 * (ACTIVE.length - 2) + "",
                                    l: c
                                };
                            }(n), s && (getOptions().credits && s && e <= s.v && s.l === n.split(t[0])[4] || function(t) {
                                var n = i[r()]().join("");
                                return t && 0 === n.indexOf(t) && t.length === n.length;
                            }(n) || s.o) || !1)
                        });
                    }));
                    var t = [ "-" ];
                    var n = "2022-4-9".split("-"), e = new Date(n[0], n[1], n[2]), i = [ "se", "licen", "-", "v3", "l", "gp" ];
                    function r() {
                        return [ [ "re", "verse" ].join("") ]["".length];
                    }
                    function o(t) {
                        return t ? isNaN(t) ? t.charCodeAt(0) - 72 : t : "";
                    }
                    function a(t) {
                        var n = 72 + t;
                        return n > 90 && n < 97 && (n += 15), String.fromCharCode(n).toUpperCase();
                    }
                }();
                FP.setKeyboardScrolling = setKeyboardScrolling;
                function setKeyboardScrolling(value, directions) {
                    if ("undefined" !== typeof directions) {
                        directions = directions.replace(/ /g, "").split(",");
                        directions.forEach((function(direction) {
                            setIsScrollAllowed(value, direction, "k");
                        }));
                    } else {
                        setIsScrollAllowed(value, "all", "k");
                        getOptions().keyboardScrolling = value;
                    }
                }
                function styleMenu(section) {
                    var index = section.index();
                    if ("undefined" !== typeof getOptions().anchors[index]) if (section.isActive) activateMenuAndNav(getOptions().anchors[index], index);
                    if (getOptions().menu && getOptions().css3 && null != closest($(getOptions().menu)[0], WRAPPER_SEL)) $(getOptions().menu).forEach((function(menu) {
                        $body.appendChild(menu);
                    }));
                }
                function prepareDom() {
                    css(getParentsUntil(getContainer(), "body"), {
                        height: "100%",
                        position: "relative"
                    });
                    addClass(getContainer(), WRAPPER);
                    addClass($html, ENABLED);
                    setState({
                        windowsHeight: getWindowHeight()
                    });
                    removeClass(getContainer(), DESTROYED);
                    addInternalSelectors();
                    var sections = getState().sectionsIncludingHidden;
                    for (var i = 0; i < sections.length; i++) {
                        var section = sections[i];
                        var slides = section.allSlidesItems;
                        section.item.setAttribute("data-fp-styles", getAttr(section.item, "style"));
                        styleSection(section);
                        styleMenu(section);
                        if (slides.length > 0) styleSlides(section);
                    }
                    if (getOptions().fixedElements && getOptions().css3) $(getOptions().fixedElements).forEach((function(item) {
                        $body.appendChild(item);
                    }));
                    if (getOptions().navigation) addVerticalNavigation();
                    enableYoutubeAPI();
                }
                FP.shared.afterRenderActions = afterRenderActions;
                function afterRenderActions() {
                    var section = getState().activeSection;
                    var sectionElem = getState().activeSection.item;
                    addClass(sectionElem, COMPLETELY);
                    lazyLoad(sectionElem);
                    lazyLoadOthers();
                    playMedia(sectionElem);
                    if (isDestinyTheStartingSection() && isFunction(getOptions().afterLoad)) fireCallback("afterLoad", {
                        activeSection: sectionElem,
                        element: sectionElem,
                        direction: null,
                        anchorLink: section.anchor,
                        sectionIndex: section.index(),
                        items: {
                            origin: getState().activeSection,
                            destination: getState().activeSection
                        }
                    });
                    if (isFunction(getOptions().afterRender)) fireCallback("afterRender");
                }
                function isDestinyTheStartingSection() {
                    var anchor = getAnchorsURL();
                    var destinationSection = getSectionByAnchor(anchor.section);
                    return !anchor.section || !destinationSection || "undefined" !== typeof destinationSection && destinationSection.index() === index(getStartingSection());
                }
                FP.setAllowScrolling = setAllowScrolling;
                function setAllowScrolling(value, directions) {
                    if ("undefined" !== typeof directions) {
                        directions = directions.replace(/ /g, "").split(",");
                        directions.forEach((function(direction) {
                            setIsScrollAllowed(value, direction, "m");
                        }));
                    } else setIsScrollAllowed(value, "all", "m");
                }
                function scrollToAnchor() {
                    var anchors = getAnchorsURL();
                    var sectionAnchor = anchors.section;
                    var slideAnchor = anchors.slide;
                    if (sectionAnchor) if (getOptions().animateAnchor) scrollPageAndSlide(sectionAnchor, slideAnchor); else silentMoveTo(sectionAnchor, slideAnchor);
                }
                function destroyStructure() {
                    silentScroll(0);
                    $("img[data-src], source[data-src], audio[data-src], iframe[data-src]", getContainer()).forEach((function(item) {
                        setSrc(item, "src");
                    }));
                    $("img[data-srcset]").forEach((function(item) {
                        setSrc(item, "srcset");
                    }));
                    remove($(SECTION_NAV_SEL + ", " + SLIDES_NAV_SEL + ", " + SLIDES_ARROW_SEL));
                    css(getNodes(getState().sections), {
                        height: "",
                        "background-color": "",
                        padding: ""
                    });
                    css(getNodes(getState().slides), {
                        width: ""
                    });
                    css(getContainer(), {
                        height: "",
                        position: "",
                        "-ms-touch-action": "",
                        "touch-action": ""
                    });
                    css($htmlBody, {
                        overflow: "",
                        height: ""
                    });
                    removeClass($html, ENABLED);
                    removeClass($body, RESPONSIVE);
                    $body.className.split(/\s+/).forEach((function(className) {
                        if (0 === className.indexOf(VIEWING_PREFIX)) removeClass($body, className);
                    }));
                    getNodes(getState().panels).forEach((function(item) {
                        if (getOptions().scrollOverflow) removeClass(item, OVERFLOW);
                        removeClass(item, TABLE + " " + ACTIVE + " " + COMPLETELY);
                        var previousStyles = getAttr(item, "data-fp-styles");
                        if (previousStyles) item.setAttribute("style", getAttr(item, "data-fp-styles"));
                        if (hasClass(item, SECTION) && !getInitialAnchorsInDom()) item.removeAttribute("data-anchor");
                    }));
                    removeAnimation(getContainer());
                    [ TABLE_CELL_SEL, SLIDES_CONTAINER_SEL, SLIDES_WRAPPER_SEL ].forEach((function(selector) {
                        $(selector, getContainer()).forEach((function(item) {
                            unwrap(item);
                        }));
                    }));
                    css(getContainer(), {
                        "-webkit-transition": "none",
                        transition: "none"
                    });
                    win.scrollTo(0, 0);
                    var usedSelectors = [ SECTION, SLIDE, SLIDES_CONTAINER ];
                    usedSelectors.forEach((function(item) {
                        removeClass($("." + item), item);
                    }));
                }
                FP.destroy = destroy;
                function init() {
                    updateStructuralState();
                    updateState();
                    getOptions().scrollBar = getOptions().scrollBar || getOptions().hybrid;
                    setOptionsFromDOM();
                    prepareDom();
                    toggleCssSnapsWhenPossible(true);
                    setAllowScrolling(true);
                    setMouseHijack(true);
                    setAutoScrolling(getOptions().autoScrolling, "internal");
                    responsive();
                    setBodyClass();
                    if ("complete" === doc.readyState) scrollToAnchor();
                    windowAddEvent("load", scrollToAnchor);
                    afterRenderActions();
                    updateStructuralState();
                    updateState();
                }
                function destroy(all) {
                    setAutoScrolling(false, "internal");
                    setAllowScrolling(true);
                    setMouseHijack(false);
                    setKeyboardScrolling(false);
                    addClass(getContainer(), DESTROYED);
                    EventEmitter.emit("onDestroy");
                    if (all) destroyStructure();
                }
                var isOK = function isOK() {
                    return getOptions() && state.isValid || doc.domain.indexOf("al" + "varotri" + "go" + "." + "com") > -1;
                };
                function displayWarnings() {
                    var l = getOptions()["li" + "c" + "enseK" + "e" + "y"];
                    var msgStyle = "font-size: 15px;background:yellow;";
                    if (!isOK()) {
                        showError("error", "Fullpage.js requires a `licenseKey` option. Read about it on the following URL:");
                        showError("error", "https://github.com/alvarotrigo/fullPage.js#options");
                    } else if (l && l.length < 20) {
                        console.warn("%c This website was made using fullPage.js slider. More info on the following website:", msgStyle);
                        console.warn("%c https://alvarotrigo.com/fullPage/", msgStyle);
                    }
                    if (hasClass($html, ENABLED)) {
                        showError("error", "Fullpage.js can only be initialized once and you are doing it multiple times!");
                        return;
                    }
                    if (getOptions().continuousVertical && (getOptions().loopTop || getOptions().loopBottom)) {
                        getOptions().continuousVertical = false;
                        showError("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled");
                    }
                    if (getOptions().scrollOverflow && (getOptions().scrollBar || !getOptions().autoScrolling)) showError("warn", "Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox");
                    if (getOptions().continuousVertical && (getOptions().scrollBar || !getOptions().autoScrolling)) {
                        getOptions().continuousVertical = false;
                        showError("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled");
                    }
                    extensions.forEach((function(extension) {
                        if (getOptions()[extension]) showError("warn", "fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: " + extension);
                    }));
                    getOptions().anchors.forEach((function(name) {
                        var nameAttr = [].slice.call($("[name]")).filter((function(item) {
                            return getAttr(item, "name") && getAttr(item, "name").toLowerCase() == name.toLowerCase();
                        }));
                        var idAttr = [].slice.call($("[id]")).filter((function(item) {
                            return getAttr(item, "id") && getAttr(item, "id").toLowerCase() == name.toLowerCase();
                        }));
                        if (idAttr.length || nameAttr.length) {
                            showError("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).");
                            var propertyName = idAttr.length ? "id" : "name";
                            if (idAttr.length || nameAttr.length) showError("error", '"' + name + '" is is being used by another element `' + propertyName + "` property");
                        }
                    }));
                }
                function fullpage(containerSelector, options) {
                    setCache();
                    if (hasClass($html, ENABLED)) {
                        displayWarnings();
                        return;
                    }
                    setOption("touchWrapper", "string" === typeof containerSelector ? $(containerSelector)[0] : containerSelector);
                    setOptions(options);
                    setContainer("string" === typeof containerSelector ? $(containerSelector)[0] : containerSelector);
                    EventEmitter.emit("onInitialise");
                    displayWarnings();
                    setAPI();
                    if (getContainer()) {
                        EventEmitter.emit("beforeInit");
                        init();
                        EventEmitter.emit("bindEvents");
                    }
                    return win.fullpage_api;
                }
                function setAPI() {
                    FP.getFullpageData = function() {
                        return {
                            options: getOptions()
                        };
                    };
                    FP.version = "4.0.7";
                    FP.test = Object.assign(FP.test, {
                        top: "0px",
                        translate3d: "translate3d(0px, 0px, 0px)",
                        translate3dH: function() {
                            var a = [];
                            for (var i = 0; i < $(getOptions().sectionSelector, getContainer()).length; i++) a.push("translate3d(0px, 0px, 0px)");
                            return a;
                        }(),
                        left: function() {
                            var a = [];
                            for (var i = 0; i < $(getOptions().sectionSelector, getContainer()).length; i++) a.push(0);
                            return a;
                        }(),
                        options: getOptions(),
                        setAutoScrolling: null
                    });
                    FP.shared = Object.assign(FP.shared, {
                        afterRenderActions: null,
                        isNormalScrollElement: false
                    });
                    win.fullpage_api = FP;
                }
                win.fp_easings = deepExtend(win.fp_easings, {
                    easeInOutCubic: function easeInOutCubic(t, b, c, d) {
                        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                        return c / 2 * ((t -= 2) * t * t + 2) + b;
                    }
                });
                if (win.jQuery) (function($, fullpage) {
                    if (!$ || !fullpage) {
                        showError("error", "jQuery is required to use the jQuery fullpage adapter!");
                        return;
                    }
                    $.fn.fullpage = function(options) {
                        options = $.extend({}, options, {
                            $
                        });
                        new fullpage(this[0], options);
                        Object.keys(FP).forEach((function(key) {
                            getOptions().$.fn.fullpage[key] = FP[key];
                        }));
                    };
                })(win.jQuery, fullpage);
                return fullpage;
            }));
        },
        732: function(module) {
            !function(n, t) {
                true ? module.exports = t() : 0;
            }(0, (function() {
                "use strict";
                function n() {
                    return n = Object.assign || function(n) {
                        for (var t = 1; t < arguments.length; t++) {
                            var e = arguments[t];
                            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
                        }
                        return n;
                    }, n.apply(this, arguments);
                }
                var t = "undefined" != typeof window, e = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), o = t && "IntersectionObserver" in window, i = t && "classList" in document.createElement("p"), a = t && window.devicePixelRatio > 1, r = {
                    elements_selector: ".lazy",
                    container: e || t ? document : null,
                    threshold: 300,
                    thresholds: null,
                    data_src: "src",
                    data_srcset: "srcset",
                    data_sizes: "sizes",
                    data_bg: "bg",
                    data_bg_hidpi: "bg-hidpi",
                    data_bg_multi: "bg-multi",
                    data_bg_multi_hidpi: "bg-multi-hidpi",
                    data_bg_set: "bg-set",
                    data_poster: "poster",
                    class_applied: "applied",
                    class_loading: "loading",
                    class_loaded: "loaded",
                    class_error: "error",
                    class_entered: "entered",
                    class_exited: "exited",
                    unobserve_completed: !0,
                    unobserve_entered: !1,
                    cancel_on_exit: !0,
                    callback_enter: null,
                    callback_exit: null,
                    callback_applied: null,
                    callback_loading: null,
                    callback_loaded: null,
                    callback_error: null,
                    callback_finish: null,
                    callback_cancel: null,
                    use_native: !1,
                    restore_on_error: !1
                }, c = function(t) {
                    return n({}, r, t);
                }, u = function(n, t) {
                    var e, o = "LazyLoad::Initialized", i = new n(t);
                    try {
                        e = new CustomEvent(o, {
                            detail: {
                                instance: i
                            }
                        });
                    } catch (n) {
                        (e = document.createEvent("CustomEvent")).initCustomEvent(o, !1, !1, {
                            instance: i
                        });
                    }
                    window.dispatchEvent(e);
                }, l = "src", s = "srcset", f = "sizes", d = "poster", _ = "llOriginalAttrs", g = "data", v = "loading", b = "loaded", p = "applied", m = "error", h = "native", E = "data-", I = "ll-status", y = function(n, t) {
                    return n.getAttribute(E + t);
                }, k = function(n) {
                    return y(n, I);
                }, A = function(n, t) {
                    return function(n, t, e) {
                        var o = "data-ll-status";
                        null !== e ? n.setAttribute(o, e) : n.removeAttribute(o);
                    }(n, 0, t);
                }, w = function(n) {
                    return A(n, null);
                }, L = function(n) {
                    return null === k(n);
                }, O = function(n) {
                    return k(n) === h;
                }, x = [ v, b, p, m ], C = function(n, t, e, o) {
                    n && (void 0 === o ? void 0 === e ? n(t) : n(t, e) : n(t, e, o));
                }, N = function(n, t) {
                    i ? n.classList.add(t) : n.className += (n.className ? " " : "") + t;
                }, M = function(n, t) {
                    i ? n.classList.remove(t) : n.className = n.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
                }, z = function(n) {
                    return n.llTempImage;
                }, T = function(n, t) {
                    if (t) {
                        var e = t._observer;
                        e && e.unobserve(n);
                    }
                }, R = function(n, t) {
                    n && (n.loadingCount += t);
                }, G = function(n, t) {
                    n && (n.toLoadCount = t);
                }, j = function(n) {
                    for (var t, e = [], o = 0; t = n.children[o]; o += 1) "SOURCE" === t.tagName && e.push(t);
                    return e;
                }, D = function(n, t) {
                    var e = n.parentNode;
                    e && "PICTURE" === e.tagName && j(e).forEach(t);
                }, V = function(n, t) {
                    j(n).forEach(t);
                }, F = [ l ], B = [ l, d ], J = [ l, s, f ], P = [ g ], S = function(n) {
                    return !!n[_];
                }, U = function(n) {
                    return n[_];
                }, $ = function(n) {
                    return delete n[_];
                }, q = function(n, t) {
                    if (!S(n)) {
                        var e = {};
                        t.forEach((function(t) {
                            e[t] = n.getAttribute(t);
                        })), n[_] = e;
                    }
                }, H = function(n, t) {
                    if (S(n)) {
                        var e = U(n);
                        t.forEach((function(t) {
                            !function(n, t, e) {
                                e ? n.setAttribute(t, e) : n.removeAttribute(t);
                            }(n, t, e[t]);
                        }));
                    }
                }, K = function(n, t, e) {
                    N(n, t.class_applied), A(n, p), e && (t.unobserve_completed && T(n, t), C(t.callback_applied, n, e));
                }, Q = function(n, t, e) {
                    N(n, t.class_loading), A(n, v), e && (R(e, 1), C(t.callback_loading, n, e));
                }, W = function(n, t, e) {
                    e && n.setAttribute(t, e);
                }, X = function(n, t) {
                    W(n, f, y(n, t.data_sizes)), W(n, s, y(n, t.data_srcset)), W(n, l, y(n, t.data_src));
                }, Y = {
                    IMG: function(n, t) {
                        D(n, (function(n) {
                            q(n, J), X(n, t);
                        })), q(n, J), X(n, t);
                    },
                    IFRAME: function(n, t) {
                        q(n, F), W(n, l, y(n, t.data_src));
                    },
                    VIDEO: function(n, t) {
                        V(n, (function(n) {
                            q(n, F), W(n, l, y(n, t.data_src));
                        })), q(n, B), W(n, d, y(n, t.data_poster)), W(n, l, y(n, t.data_src)), n.load();
                    },
                    OBJECT: function(n, t) {
                        q(n, P), W(n, g, y(n, t.data_src));
                    }
                }, Z = [ "IMG", "IFRAME", "VIDEO", "OBJECT" ], nn = function(n, t) {
                    !t || function(n) {
                        return n.loadingCount > 0;
                    }(t) || function(n) {
                        return n.toLoadCount > 0;
                    }(t) || C(n.callback_finish, t);
                }, tn = function(n, t, e) {
                    n.addEventListener(t, e), n.llEvLisnrs[t] = e;
                }, en = function(n, t, e) {
                    n.removeEventListener(t, e);
                }, on = function(n) {
                    return !!n.llEvLisnrs;
                }, an = function(n) {
                    if (on(n)) {
                        var t = n.llEvLisnrs;
                        for (var e in t) {
                            var o = t[e];
                            en(n, e, o);
                        }
                        delete n.llEvLisnrs;
                    }
                }, rn = function(n, t, e) {
                    !function(n) {
                        delete n.llTempImage;
                    }(n), R(e, -1), function(n) {
                        n && (n.toLoadCount -= 1);
                    }(e), M(n, t.class_loading), t.unobserve_completed && T(n, e);
                }, cn = function(n, t, e) {
                    var o = z(n) || n;
                    on(o) || function(n, t, e) {
                        on(n) || (n.llEvLisnrs = {});
                        var o = "VIDEO" === n.tagName ? "loadeddata" : "load";
                        tn(n, o, t), tn(n, "error", e);
                    }(o, (function(i) {
                        !function(n, t, e, o) {
                            var i = O(t);
                            rn(t, e, o), N(t, e.class_loaded), A(t, b), C(e.callback_loaded, t, o), i || nn(e, o);
                        }(0, n, t, e), an(o);
                    }), (function(i) {
                        !function(n, t, e, o) {
                            var i = O(t);
                            rn(t, e, o), N(t, e.class_error), A(t, m), C(e.callback_error, t, o), e.restore_on_error && H(t, J), 
                            i || nn(e, o);
                        }(0, n, t, e), an(o);
                    }));
                }, un = function(n, t, e) {
                    !function(n) {
                        return Z.indexOf(n.tagName) > -1;
                    }(n) ? function(n, t, e) {
                        !function(n) {
                            n.llTempImage = document.createElement("IMG");
                        }(n), cn(n, t, e), function(n) {
                            S(n) || (n[_] = {
                                backgroundImage: n.style.backgroundImage
                            });
                        }(n), function(n, t, e) {
                            var o = y(n, t.data_bg), i = y(n, t.data_bg_hidpi), r = a && i ? i : o;
                            r && (n.style.backgroundImage = 'url("'.concat(r, '")'), z(n).setAttribute(l, r), 
                            Q(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var o = y(n, t.data_bg_multi), i = y(n, t.data_bg_multi_hidpi), r = a && i ? i : o;
                            r && (n.style.backgroundImage = r, K(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var o = y(n, t.data_bg_set);
                            if (o) {
                                var i = o.split("|"), a = i.map((function(n) {
                                    return "image-set(".concat(n, ")");
                                }));
                                n.style.backgroundImage = a.join(), "" === n.style.backgroundImage && (a = i.map((function(n) {
                                    return "-webkit-image-set(".concat(n, ")");
                                })), n.style.backgroundImage = a.join()), K(n, t, e);
                            }
                        }(n, t, e);
                    }(n, t, e) : function(n, t, e) {
                        cn(n, t, e), function(n, t, e) {
                            var o = Y[n.tagName];
                            o && (o(n, t), Q(n, t, e));
                        }(n, t, e);
                    }(n, t, e);
                }, ln = function(n) {
                    n.removeAttribute(l), n.removeAttribute(s), n.removeAttribute(f);
                }, sn = function(n) {
                    D(n, (function(n) {
                        H(n, J);
                    })), H(n, J);
                }, fn = {
                    IMG: sn,
                    IFRAME: function(n) {
                        H(n, F);
                    },
                    VIDEO: function(n) {
                        V(n, (function(n) {
                            H(n, F);
                        })), H(n, B), n.load();
                    },
                    OBJECT: function(n) {
                        H(n, P);
                    }
                }, dn = function(n, t) {
                    (function(n) {
                        var t = fn[n.tagName];
                        t ? t(n) : function(n) {
                            if (S(n)) {
                                var t = U(n);
                                n.style.backgroundImage = t.backgroundImage;
                            }
                        }(n);
                    })(n), function(n, t) {
                        L(n) || O(n) || (M(n, t.class_entered), M(n, t.class_exited), M(n, t.class_applied), 
                        M(n, t.class_loading), M(n, t.class_loaded), M(n, t.class_error));
                    }(n, t), w(n), $(n);
                }, _n = [ "IMG", "IFRAME", "VIDEO" ], gn = function(n) {
                    return n.use_native && "loading" in HTMLImageElement.prototype;
                }, vn = function(n, t, e) {
                    n.forEach((function(n) {
                        return function(n) {
                            return n.isIntersecting || n.intersectionRatio > 0;
                        }(n) ? function(n, t, e, o) {
                            var i = function(n) {
                                return x.indexOf(k(n)) >= 0;
                            }(n);
                            A(n, "entered"), N(n, e.class_entered), M(n, e.class_exited), function(n, t, e) {
                                t.unobserve_entered && T(n, e);
                            }(n, e, o), C(e.callback_enter, n, t, o), i || un(n, e, o);
                        }(n.target, n, t, e) : function(n, t, e, o) {
                            L(n) || (N(n, e.class_exited), function(n, t, e, o) {
                                e.cancel_on_exit && function(n) {
                                    return k(n) === v;
                                }(n) && "IMG" === n.tagName && (an(n), function(n) {
                                    D(n, (function(n) {
                                        ln(n);
                                    })), ln(n);
                                }(n), sn(n), M(n, e.class_loading), R(o, -1), w(n), C(e.callback_cancel, n, t, o));
                            }(n, t, e, o), C(e.callback_exit, n, t, o));
                        }(n.target, n, t, e);
                    }));
                }, bn = function(n) {
                    return Array.prototype.slice.call(n);
                }, pn = function(n) {
                    return n.container.querySelectorAll(n.elements_selector);
                }, mn = function(n) {
                    return function(n) {
                        return k(n) === m;
                    }(n);
                }, hn = function(n, t) {
                    return function(n) {
                        return bn(n).filter(L);
                    }(n || pn(t));
                }, En = function(n, e) {
                    var i = c(n);
                    this._settings = i, this.loadingCount = 0, function(n, t) {
                        o && !gn(n) && (t._observer = new IntersectionObserver((function(e) {
                            vn(e, n, t);
                        }), function(n) {
                            return {
                                root: n.container === document ? null : n.container,
                                rootMargin: n.thresholds || n.threshold + "px"
                            };
                        }(n)));
                    }(i, this), function(n, e) {
                        t && window.addEventListener("online", (function() {
                            !function(n, t) {
                                var e;
                                (e = pn(n), bn(e).filter(mn)).forEach((function(t) {
                                    M(t, n.class_error), w(t);
                                })), t.update();
                            }(n, e);
                        }));
                    }(i, this), this.update(e);
                };
                return En.prototype = {
                    update: function(n) {
                        var t, i, a = this._settings, r = hn(n, a);
                        G(this, r.length), !e && o ? gn(a) ? function(n, t, e) {
                            n.forEach((function(n) {
                                -1 !== _n.indexOf(n.tagName) && function(n, t, e) {
                                    n.setAttribute("loading", "lazy"), cn(n, t, e), function(n, t) {
                                        var e = Y[n.tagName];
                                        e && e(n, t);
                                    }(n, t), A(n, h);
                                }(n, t, e);
                            })), G(e, 0);
                        }(r, a, this) : (i = r, function(n) {
                            n.disconnect();
                        }(t = this._observer), function(n, t) {
                            t.forEach((function(t) {
                                n.observe(t);
                            }));
                        }(t, i)) : this.loadAll(r);
                    },
                    destroy: function() {
                        this._observer && this._observer.disconnect(), pn(this._settings).forEach((function(n) {
                            $(n);
                        })), delete this._observer, delete this._settings, delete this.loadingCount, delete this.toLoadCount;
                    },
                    loadAll: function(n) {
                        var t = this, e = this._settings;
                        hn(n, e).forEach((function(n) {
                            T(n, t), un(n, e, t);
                        }));
                    },
                    restoreAll: function() {
                        var n = this._settings;
                        pn(n).forEach((function(t) {
                            dn(t, n);
                        }));
                    }
                }, En.load = function(n, t) {
                    var e = c(t);
                    un(n, e);
                }, En.resetStatus = function(n) {
                    w(n);
                }, t && function(n, t) {
                    if (t) if (t.length) for (var e, o = 0; e = t[o]; o += 1) u(n, e); else u(n, t);
                }(En, window.lazyLoadOptions), En;
            }));
        },
        630: function(module, exports) {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(global, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ module, exports ], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, 
                __WEBPACK_AMD_DEFINE_RESULT__ = "function" === typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); else ;
            })(0, (function(module, exports) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                var _class, _temp;
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                var _createClass = function() {
                    function defineProperties(target, props) {
                        for (var i = 0; i < props.length; i++) {
                            var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || false;
                            descriptor.configurable = true;
                            if ("value" in descriptor) descriptor.writable = true;
                            Object.defineProperty(target, descriptor.key, descriptor);
                        }
                    }
                    return function(Constructor, protoProps, staticProps) {
                        if (protoProps) defineProperties(Constructor.prototype, protoProps);
                        if (staticProps) defineProperties(Constructor, staticProps);
                        return Constructor;
                    };
                }();
                function isIn(needle, haystack) {
                    return haystack.indexOf(needle) >= 0;
                }
                function extend(custom, defaults) {
                    for (var key in defaults) if (null == custom[key]) {
                        var value = defaults[key];
                        custom[key] = value;
                    }
                    return custom;
                }
                function isMobile(agent) {
                    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
                }
                function createEvent(event) {
                    var bubble = arguments.length <= 1 || void 0 === arguments[1] ? false : arguments[1];
                    var cancel = arguments.length <= 2 || void 0 === arguments[2] ? false : arguments[2];
                    var detail = arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3];
                    var customEvent = void 0;
                    if (null != document.createEvent) {
                        customEvent = document.createEvent("CustomEvent");
                        customEvent.initCustomEvent(event, bubble, cancel, detail);
                    } else if (null != document.createEventObject) {
                        customEvent = document.createEventObject();
                        customEvent.eventType = event;
                    } else customEvent.eventName = event;
                    return customEvent;
                }
                function emitEvent(elem, event) {
                    if (null != elem.dispatchEvent) elem.dispatchEvent(event); else if (event in (null != elem)) elem[event](); else if ("on" + event in (null != elem)) elem["on" + event]();
                }
                function addEvent(elem, event, fn) {
                    if (null != elem.addEventListener) elem.addEventListener(event, fn, false); else if (null != elem.attachEvent) elem.attachEvent("on" + event, fn); else elem[event] = fn;
                }
                function removeEvent(elem, event, fn) {
                    if (null != elem.removeEventListener) elem.removeEventListener(event, fn, false); else if (null != elem.detachEvent) elem.detachEvent("on" + event, fn); else delete elem[event];
                }
                function getInnerHeight() {
                    if ("innerHeight" in window) return window.innerHeight;
                    return document.documentElement.clientHeight;
                }
                var WeakMap = window.WeakMap || window.MozWeakMap || function() {
                    function WeakMap() {
                        _classCallCheck(this, WeakMap);
                        this.keys = [];
                        this.values = [];
                    }
                    _createClass(WeakMap, [ {
                        key: "get",
                        value: function get(key) {
                            for (var i = 0; i < this.keys.length; i++) {
                                var item = this.keys[i];
                                if (item === key) return this.values[i];
                            }
                            return;
                        }
                    }, {
                        key: "set",
                        value: function set(key, value) {
                            for (var i = 0; i < this.keys.length; i++) {
                                var item = this.keys[i];
                                if (item === key) {
                                    this.values[i] = value;
                                    return this;
                                }
                            }
                            this.keys.push(key);
                            this.values.push(value);
                            return this;
                        }
                    } ]);
                    return WeakMap;
                }();
                var MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (_temp = _class = function() {
                    function MutationObserver() {
                        _classCallCheck(this, MutationObserver);
                        if ("undefined" !== typeof console && null !== console) {
                            console.warn("MutationObserver is not supported by your browser.");
                            console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.");
                        }
                    }
                    _createClass(MutationObserver, [ {
                        key: "observe",
                        value: function observe() {}
                    } ]);
                    return MutationObserver;
                }(), _class.notSupported = true, _temp);
                var getComputedStyle = window.getComputedStyle || function getComputedStyle(el) {
                    var getComputedStyleRX = /(\-([a-z]){1})/g;
                    return {
                        getPropertyValue: function getPropertyValue(prop) {
                            if ("float" === prop) prop = "styleFloat";
                            if (getComputedStyleRX.test(prop)) prop.replace(getComputedStyleRX, (function(_, _char) {
                                return _char.toUpperCase();
                            }));
                            var currentStyle = el.currentStyle;
                            return (null != currentStyle ? currentStyle[prop] : void 0) || null;
                        }
                    };
                };
                var WOW = function() {
                    function WOW() {
                        var options = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                        _classCallCheck(this, WOW);
                        this.defaults = {
                            boxClass: "wow",
                            animateClass: "animated",
                            offset: 0,
                            mobile: true,
                            live: true,
                            callback: null,
                            scrollContainer: null
                        };
                        this.animate = function animateFactory() {
                            if ("requestAnimationFrame" in window) return function(callback) {
                                return window.requestAnimationFrame(callback);
                            };
                            return function(callback) {
                                return callback();
                            };
                        }();
                        this.vendors = [ "moz", "webkit" ];
                        this.start = this.start.bind(this);
                        this.resetAnimation = this.resetAnimation.bind(this);
                        this.scrollHandler = this.scrollHandler.bind(this);
                        this.scrollCallback = this.scrollCallback.bind(this);
                        this.scrolled = true;
                        this.config = extend(options, this.defaults);
                        if (null != options.scrollContainer) this.config.scrollContainer = document.querySelector(options.scrollContainer);
                        this.animationNameCache = new WeakMap;
                        this.wowEvent = createEvent(this.config.boxClass);
                    }
                    _createClass(WOW, [ {
                        key: "init",
                        value: function init() {
                            this.element = window.document.documentElement;
                            if (isIn(document.readyState, [ "interactive", "complete" ])) this.start(); else addEvent(document, "DOMContentLoaded", this.start);
                            this.finished = [];
                        }
                    }, {
                        key: "start",
                        value: function start() {
                            var _this = this;
                            this.stopped = false;
                            this.boxes = [].slice.call(this.element.querySelectorAll("." + this.config.boxClass));
                            this.all = this.boxes.slice(0);
                            if (this.boxes.length) if (this.disabled()) this.resetStyle(); else for (var i = 0; i < this.boxes.length; i++) {
                                var box = this.boxes[i];
                                this.applyStyle(box, true);
                            }
                            if (!this.disabled()) {
                                addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler);
                                addEvent(window, "resize", this.scrollHandler);
                                this.interval = setInterval(this.scrollCallback, 50);
                            }
                            if (this.config.live) {
                                var mut = new MutationObserver((function(records) {
                                    for (var j = 0; j < records.length; j++) {
                                        var record = records[j];
                                        for (var k = 0; k < record.addedNodes.length; k++) {
                                            var node = record.addedNodes[k];
                                            _this.doSync(node);
                                        }
                                    }
                                    return;
                                }));
                                mut.observe(document.body, {
                                    childList: true,
                                    subtree: true
                                });
                            }
                        }
                    }, {
                        key: "stop",
                        value: function stop() {
                            this.stopped = true;
                            removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler);
                            removeEvent(window, "resize", this.scrollHandler);
                            if (null != this.interval) clearInterval(this.interval);
                        }
                    }, {
                        key: "sync",
                        value: function sync() {
                            if (MutationObserver.notSupported) this.doSync(this.element);
                        }
                    }, {
                        key: "doSync",
                        value: function doSync(element) {
                            if ("undefined" === typeof element || null === element) element = this.element;
                            if (1 !== element.nodeType) return;
                            element = element.parentNode || element;
                            var iterable = element.querySelectorAll("." + this.config.boxClass);
                            for (var i = 0; i < iterable.length; i++) {
                                var box = iterable[i];
                                if (!isIn(box, this.all)) {
                                    this.boxes.push(box);
                                    this.all.push(box);
                                    if (this.stopped || this.disabled()) this.resetStyle(); else this.applyStyle(box, true);
                                    this.scrolled = true;
                                }
                            }
                        }
                    }, {
                        key: "show",
                        value: function show(box) {
                            this.applyStyle(box);
                            box.className = box.className + " " + this.config.animateClass;
                            if (null != this.config.callback) this.config.callback(box);
                            emitEvent(box, this.wowEvent);
                            addEvent(box, "animationend", this.resetAnimation);
                            addEvent(box, "oanimationend", this.resetAnimation);
                            addEvent(box, "webkitAnimationEnd", this.resetAnimation);
                            addEvent(box, "MSAnimationEnd", this.resetAnimation);
                            return box;
                        }
                    }, {
                        key: "applyStyle",
                        value: function applyStyle(box, hidden) {
                            var _this2 = this;
                            var duration = box.getAttribute("data-wow-duration");
                            var delay = box.getAttribute("data-wow-delay");
                            var iteration = box.getAttribute("data-wow-iteration");
                            return this.animate((function() {
                                return _this2.customStyle(box, hidden, duration, delay, iteration);
                            }));
                        }
                    }, {
                        key: "resetStyle",
                        value: function resetStyle() {
                            for (var i = 0; i < this.boxes.length; i++) {
                                var box = this.boxes[i];
                                box.style.visibility = "visible";
                            }
                            return;
                        }
                    }, {
                        key: "resetAnimation",
                        value: function resetAnimation(event) {
                            if (event.type.toLowerCase().indexOf("animationend") >= 0) {
                                var target = event.target || event.srcElement;
                                target.className = target.className.replace(this.config.animateClass, "").trim();
                            }
                        }
                    }, {
                        key: "customStyle",
                        value: function customStyle(box, hidden, duration, delay, iteration) {
                            if (hidden) this.cacheAnimationName(box);
                            box.style.visibility = hidden ? "hidden" : "visible";
                            if (duration) this.vendorSet(box.style, {
                                animationDuration: duration
                            });
                            if (delay) this.vendorSet(box.style, {
                                animationDelay: delay
                            });
                            if (iteration) this.vendorSet(box.style, {
                                animationIterationCount: iteration
                            });
                            this.vendorSet(box.style, {
                                animationName: hidden ? "none" : this.cachedAnimationName(box)
                            });
                            return box;
                        }
                    }, {
                        key: "vendorSet",
                        value: function vendorSet(elem, properties) {
                            for (var name in properties) if (properties.hasOwnProperty(name)) {
                                var value = properties[name];
                                elem["" + name] = value;
                                for (var i = 0; i < this.vendors.length; i++) {
                                    var vendor = this.vendors[i];
                                    elem["" + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value;
                                }
                            }
                        }
                    }, {
                        key: "vendorCSS",
                        value: function vendorCSS(elem, property) {
                            var style = getComputedStyle(elem);
                            var result = style.getPropertyCSSValue(property);
                            for (var i = 0; i < this.vendors.length; i++) {
                                var vendor = this.vendors[i];
                                result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
                            }
                            return result;
                        }
                    }, {
                        key: "animationName",
                        value: function animationName(box) {
                            var aName = void 0;
                            try {
                                aName = this.vendorCSS(box, "animation-name").cssText;
                            } catch (error) {
                                aName = getComputedStyle(box).getPropertyValue("animation-name");
                            }
                            if ("none" === aName) return "";
                            return aName;
                        }
                    }, {
                        key: "cacheAnimationName",
                        value: function cacheAnimationName(box) {
                            return this.animationNameCache.set(box, this.animationName(box));
                        }
                    }, {
                        key: "cachedAnimationName",
                        value: function cachedAnimationName(box) {
                            return this.animationNameCache.get(box);
                        }
                    }, {
                        key: "scrollHandler",
                        value: function scrollHandler() {
                            this.scrolled = true;
                        }
                    }, {
                        key: "scrollCallback",
                        value: function scrollCallback() {
                            if (this.scrolled) {
                                this.scrolled = false;
                                var results = [];
                                for (var i = 0; i < this.boxes.length; i++) {
                                    var box = this.boxes[i];
                                    if (box) {
                                        if (this.isVisible(box)) {
                                            this.show(box);
                                            continue;
                                        }
                                        results.push(box);
                                    }
                                }
                                this.boxes = results;
                                if (!this.boxes.length && !this.config.live) this.stop();
                            }
                        }
                    }, {
                        key: "offsetTop",
                        value: function offsetTop(element) {
                            while (void 0 === element.offsetTop) element = element.parentNode;
                            var top = element.offsetTop;
                            while (element.offsetParent) {
                                element = element.offsetParent;
                                top += element.offsetTop;
                            }
                            return top;
                        }
                    }, {
                        key: "isVisible",
                        value: function isVisible(box) {
                            var offset = box.getAttribute("data-wow-offset") || this.config.offset;
                            var viewTop = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset;
                            var viewBottom = viewTop + Math.min(this.element.clientHeight, getInnerHeight()) - offset;
                            var top = this.offsetTop(box);
                            var bottom = top + box.clientHeight;
                            return top <= viewBottom && bottom >= viewTop;
                        }
                    }, {
                        key: "disabled",
                        value: function disabled() {
                            return !this.config.mobile && isMobile(navigator.userAgent);
                        }
                    } ]);
                    return WOW;
                }();
                exports.default = WOW;
                module.exports = exports["default"];
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        const modules_flsModules = {};
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
            }
        };
        function addTouchClass() {
            if (isMobile.any()) document.documentElement.classList.add("touch");
        }
        function addLoadedClass() {
            window.addEventListener("load", (function() {
                setTimeout((function() {
                    document.documentElement.classList.add("loaded");
                }), 0);
            }));
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function spollers() {
            const spollersArray = document.querySelectorAll("[data-spollers]");
            if (spollersArray.length > 0) {
                const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                    return !item.dataset.spollers.split(",")[0];
                }));
                if (spollersRegular.length) initSpollers(spollersRegular);
                let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                function initSpollers(spollersArray, matchMedia = false) {
                    spollersArray.forEach((spollersBlock => {
                        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                        if (matchMedia.matches || !matchMedia) {
                            spollersBlock.classList.add("_spoller-init");
                            initSpollerBody(spollersBlock);
                            spollersBlock.addEventListener("click", setSpollerAction);
                        } else {
                            spollersBlock.classList.remove("_spoller-init");
                            initSpollerBody(spollersBlock, false);
                            spollersBlock.removeEventListener("click", setSpollerAction);
                        }
                    }));
                }
                function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                    let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                    if (spollerTitles.length) {
                        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                        spollerTitles.forEach((spollerTitle => {
                            if (hideSpollerBody) {
                                spollerTitle.removeAttribute("tabindex");
                                if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                            } else {
                                spollerTitle.setAttribute("tabindex", "-1");
                                spollerTitle.nextElementSibling.hidden = false;
                            }
                        }));
                    }
                }
                function setSpollerAction(e) {
                    const el = e.target;
                    if (el.closest("[data-spoller]")) {
                        const spollerTitle = el.closest("[data-spoller]");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                        }
                        e.preventDefault();
                    }
                }
                function hideSpollersBody(spollersBlock) {
                    const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                        spollerActiveTitle.classList.remove("_spoller-active");
                        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    }
                }
                const spollersClose = document.querySelectorAll("[data-spoller-close]");
                if (spollersClose.length) document.addEventListener("click", (function(e) {
                    const el = e.target;
                    if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        if (spollersBlock.classList.contains("_spoller-init")) {
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                        }
                    }));
                }));
            }
        }
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        function formFieldsInit(options = {
            viewPass: false,
            autoHeight: false
        }) {
            const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
            if (formFields.length) formFields.forEach((formField => {
                if (!formField.hasAttribute("data-placeholder-nohide")) formField.dataset.placeholder = formField.placeholder;
            }));
            document.body.addEventListener("focusin", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = "";
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.add("_form-focus");
                        targetElement.parentElement.classList.add("_form-focus");
                    }
                    formValidate.removeError(targetElement);
                }
            }));
            document.body.addEventListener("focusout", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = targetElement.dataset.placeholder;
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.remove("_form-focus");
                        targetElement.parentElement.classList.remove("_form-focus");
                    }
                    if (targetElement.hasAttribute("data-validate")) formValidate.validateInput(targetElement);
                }
            }));
            if (options.viewPass) document.addEventListener("click", (function(e) {
                let targetElement = e.target;
                if (targetElement.closest('[class*="__viewpass"]')) {
                    let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
                    targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
                    targetElement.classList.toggle("_viewpass-active");
                }
            }));
            if (options.autoHeight) {
                const textareas = document.querySelectorAll("textarea[data-autoheight]");
                if (textareas.length) {
                    textareas.forEach((textarea => {
                        const startHeight = textarea.hasAttribute("data-autoheight-min") ? Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
                        const maxHeight = textarea.hasAttribute("data-autoheight-max") ? Number(textarea.dataset.autoheightMax) : 1 / 0;
                        setHeight(textarea, Math.min(startHeight, maxHeight));
                        textarea.addEventListener("input", (() => {
                            if (textarea.scrollHeight > startHeight) {
                                textarea.style.height = `auto`;
                                setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
                            }
                        }));
                    }));
                    function setHeight(textarea, height) {
                        textarea.style.height = `${height}px`;
                    }
                }
            }
        }
        let formValidate = {
            getErrors(form) {
                let error = 0;
                let formRequiredItems = form.querySelectorAll("*[data-required]");
                if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                    if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
                }));
                return error;
            },
            validateInput(formRequiredItem) {
                let error = 0;
                if ("email" === formRequiredItem.dataset.required) {
                    formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                    if (this.emailTest(formRequiredItem)) {
                        this.addError(formRequiredItem);
                        error++;
                    } else this.removeError(formRequiredItem);
                } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                    this.addError(formRequiredItem);
                    error++;
                } else if (!formRequiredItem.value.trim()) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
                return error;
            },
            addError(formRequiredItem) {
                formRequiredItem.classList.add("_form-error");
                formRequiredItem.parentElement.classList.add("_form-error");
                let inputError = formRequiredItem.parentElement.querySelector(".form__error");
                if (inputError) formRequiredItem.parentElement.removeChild(inputError);
                if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            },
            removeError(formRequiredItem) {
                formRequiredItem.classList.remove("_form-error");
                formRequiredItem.parentElement.classList.remove("_form-error");
                if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
            },
            formClean(form) {
                form.reset();
                setTimeout((() => {
                    let inputs = form.querySelectorAll("input,textarea");
                    for (let index = 0; index < inputs.length; index++) {
                        const el = inputs[index];
                        el.parentElement.classList.remove("_form-focus");
                        el.classList.remove("_form-focus");
                        formValidate.removeError(el);
                    }
                    let checkboxes = form.querySelectorAll(".checkbox__input");
                    if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                        const checkbox = checkboxes[index];
                        checkbox.checked = false;
                    }
                    if (modules_flsModules.select) {
                        let selects = form.querySelectorAll(".select");
                        if (selects.length) for (let index = 0; index < selects.length; index++) {
                            const select = selects[index].querySelector("select");
                            modules_flsModules.select.selectBuild(select);
                        }
                    }
                }), 0);
            },
            emailTest(formRequiredItem) {
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
            }
        };
        var lazyload_min = __webpack_require__(732);
        new lazyload_min({
            elements_selector: "[data-src],[data-srcset]",
            class_loaded: "_lazy-loaded",
            use_native: true
        });
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }), this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            }));
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                    return item.breakpoint === mediaBreakpoint;
                }));
                matchMedia.addListener((function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = оbjects.length - 1; i >= 0; i--) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if ("last" === place || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if ("first" === place) {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return -1;
                    if ("last" === a.place || "first" === b.place) return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                Array.prototype.sort.call(arr, (function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return 1;
                        if ("last" === a.place || "first" === b.place) return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
        var wow = __webpack_require__(630);
        __webpack_require__(615);
        $(".whatit__slider").slick({
            prevArrow: '<button class="slider-btn slider-btn__left icon-chevron-left" type="button"></button>',
            nextArrow: '<button class="slider-btn slider-btn__right icon-chevron-right" type="button"></button>'
        });
        (new wow).init();
        $("#fullpage").fullpage({
            autoScrolling: true,
            scrollHorizontally: true,
            sectionSelector: ".page-section",
            scrollOverflow: true,
            lazyLoading: false,
            credits: {
                enabled: false,
                label: "Made with fullPage.js",
                position: "right"
            },
            menu: "#header__nav",
            anchors: [ "main", "whatit", "advant", "charac", "question", "contacts" ]
        });
        window["FLS"] = true;
        isWebp();
        addTouchClass();
        addLoadedClass();
        menuInit();
        spollers();
        formFieldsInit({
            viewPass: false,
            autoHeight: false
        });
    })();
})();