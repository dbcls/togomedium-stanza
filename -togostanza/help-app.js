import { d as defineComponent, o as openBlock, c as createBlock, b as createVNode, e as createCommentVNode, g as createTextVNode, t as toDisplayString, F as Fragment, a as renderList, h as ref, i as octicons, m as mergeProps, j as computed, r as resolveComponent, s as script$4, p as pushScopeId, k as popScopeId, l as withScopeId, n, f as createApp } from './Layout-87dda970.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/*!
  * Bootstrap data.js v5.0.0-beta2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

var data = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  module.exports = factory() ;
}(commonjsGlobal, (function () {
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta2): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var mapData = function () {
    var storeData = {};
    var id = 1;
    return {
      set: function set(element, key, data) {
        if (typeof element.bsKey === 'undefined') {
          element.bsKey = {
            key: key,
            id: id
          };
          id++;
        }

        storeData[element.bsKey.id] = data;
      },
      get: function get(element, key) {
        if (!element || typeof element.bsKey === 'undefined') {
          return null;
        }

        var keyProperties = element.bsKey;

        if (keyProperties.key === key) {
          return storeData[keyProperties.id];
        }

        return null;
      },
      delete: function _delete(element, key) {
        if (typeof element.bsKey === 'undefined') {
          return;
        }

        var keyProperties = element.bsKey;

        if (keyProperties.key === key) {
          delete storeData[keyProperties.id];
          delete element.bsKey;
        }
      }
    };
  }();

  var Data = {
    setData: function setData(instance, key, data) {
      mapData.set(instance, key, data);
    },
    getData: function getData(instance, key) {
      return mapData.get(instance, key);
    },
    removeData: function removeData(instance, key) {
      mapData.delete(instance, key);
    }
  };

  return Data;

})));

});

/*!
  * Bootstrap event-handler.js v5.0.0-beta2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

var eventHandler = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  module.exports = factory() ;
}(commonjsGlobal, (function () {
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta2): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  document.documentElement.dir === 'rtl';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta2): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {}; // Events storage

  var uidEvent = 1;
  var customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    var uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      var domElements = element.querySelectorAll(selector);

      for (var target = event.target; target && target !== this; target = target.parentNode) {
        for (var i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;

            if (handler.oneOff) {
              // eslint-disable-next-line unicorn/consistent-destructuring
              EventHandler.off(element, event.type, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler, delegationSelector) {
    if (delegationSelector === void 0) {
      delegationSelector = null;
    }

    var uidEventList = Object.keys(events);

    for (var i = 0, len = uidEventList.length; i < len; i++) {
      var event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    var delegation = typeof handler === 'string';
    var originalHandler = delegation ? delegationFn : handler; // allow to get the native events from namespaced events ('click.bs.button' --> 'click')

    var typeEvent = originalTypeEvent.replace(stripNameRegex, '');
    var custom = customEvents[typeEvent];

    if (custom) {
      typeEvent = custom;
    }

    var isNative = nativeEvents.has(typeEvent);

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    }

    var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
        delegation = _normalizeParams[0],
        originalHandler = _normalizeParams[1],
        typeEvent = _normalizeParams[2];

    var events = getEvent(element);
    var handlers = events[typeEvent] || (events[typeEvent] = {});
    var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    var fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (handlerKey) {
      if (handlerKey.includes(namespace)) {
        var event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  var EventHandler = {
    on: function on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },
    one: function one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },
    off: function off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      var _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn),
          delegation = _normalizeParams2[0],
          originalHandler = _normalizeParams2[1],
          typeEvent = _normalizeParams2[2];

      var inNamespace = typeEvent !== originalTypeEvent;
      var events = getEvent(element);
      var isNamespace = originalTypeEvent.startsWith('.');

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(function (elementEvent) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      var storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
        var handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          var event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },
    trigger: function trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      var $ = getjQuery();
      var typeEvent = event.replace(stripNameRegex, '');
      var inNamespace = event !== typeEvent;
      var isNative = nativeEvents.has(typeEvent);
      var jQueryEvent;
      var bubbles = true;
      var nativeDispatch = true;
      var defaultPrevented = false;
      var evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles: bubbles,
          cancelable: true
        });
      } // merge custom information in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(function (key) {
          Object.defineProperty(evt, key, {
            get: function get() {
              return args[key];
            }
          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }
  };

  return EventHandler;

})));

});

/*!
  * Bootstrap selector-engine.js v5.0.0-beta2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

var selectorEngine = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  module.exports = factory() ;
}(commonjsGlobal, (function () {
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta2): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NODE_TEXT = 3;
  var SelectorEngine = {
    find: function find(selector, element) {
      var _ref;

      if (element === void 0) {
        element = document.documentElement;
      }

      return (_ref = []).concat.apply(_ref, Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne: function findOne(selector, element) {
      if (element === void 0) {
        element = document.documentElement;
      }

      return Element.prototype.querySelector.call(element, selector);
    },
    children: function children(element, selector) {
      var _ref2;

      return (_ref2 = []).concat.apply(_ref2, element.children).filter(function (child) {
        return child.matches(selector);
      });
    },
    parents: function parents(element, selector) {
      var parents = [];
      var ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (ancestor.matches(selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },
    prev: function prev(element, selector) {
      var previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },
    next: function next(element, selector) {
      var next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    }
  };

  return SelectorEngine;

})));

});

/*!
  * Bootstrap base-component.js v5.0.0-beta2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

var baseComponent = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  module.exports = factory(data) ;
}(commonjsGlobal, (function (Data) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var VERSION = '5.0.0-beta2';

  var BaseComponent = /*#__PURE__*/function () {
    function BaseComponent(element) {
      if (!element) {
        return;
      }

      this._element = element;
      Data__default['default'].setData(element, this.constructor.DATA_KEY, this);
    }

    var _proto = BaseComponent.prototype;

    _proto.dispose = function dispose() {
      Data__default['default'].removeData(this._element, this.constructor.DATA_KEY);
      this._element = null;
    }
    /** Static */
    ;

    BaseComponent.getInstance = function getInstance(element) {
      return Data__default['default'].getData(element, this.DATA_KEY);
    };

    _createClass(BaseComponent, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return BaseComponent;
  }();

  return BaseComponent;

})));

});

/*!
  * Bootstrap tab.js v5.0.0-beta2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

createCommonjsModule(function (module, exports) {
(function (global, factory) {
  module.exports = factory(data, eventHandler, selectorEngine, baseComponent) ;
}(commonjsGlobal, (function (Data, EventHandler, SelectorEngine, BaseComponent) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
  var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  var SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
  var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-beta2): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var MILLISECONDS_MULTIPLIER = 1000;
  var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  var getSelector = function getSelector(element) {
    var selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
        hrefAttr = '#' + hrefAttr.split('#')[1];
      }

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  var getElementFromSelector = function getElementFromSelector(element) {
    var selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    var _window$getComputedSt = window.getComputedStyle(element),
        transitionDuration = _window$getComputedSt.transitionDuration,
        transitionDelay = _window$getComputedSt.transitionDelay;

    var floatTransitionDuration = Number.parseFloat(transitionDuration);
    var floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  var triggerTransitionEnd = function triggerTransitionEnd(element) {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  var emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
    var called = false;
    var durationPadding = 5;
    var emulatedDuration = duration + durationPadding;

    function listener() {
      called = true;
      element.removeEventListener(TRANSITION_END, listener);
    }

    element.addEventListener(TRANSITION_END, listener);
    setTimeout(function () {
      if (!called) {
        triggerTransitionEnd(element);
      }
    }, emulatedDuration);
  };

  var reflow = function reflow(element) {
    return element.offsetHeight;
  };

  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  var onDOMContentLoaded = function onDOMContentLoaded(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  document.documentElement.dir === 'rtl';

  var defineJQueryPlugin = function defineJQueryPlugin(name, plugin) {
    onDOMContentLoaded(function () {
      var $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        var JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = function () {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var EVENT_HIDE = "hide" + EVENT_KEY;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY;
  var EVENT_SHOW = "show" + EVENT_KEY;
  var EVENT_SHOWN = "shown" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ACTIVE_UL = ':scope > li > .active';
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = /*#__PURE__*/function (_BaseComponent) {
    _inheritsLoose(Tab, _BaseComponent);

    function Tab() {
      return _BaseComponent.apply(this, arguments) || this;
    }

    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE) || this._element.classList.contains(CLASS_NAME_DISABLED)) {
        return;
      }

      var previous;
      var target = getElementFromSelector(this._element);

      var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = SelectorEngine__default['default'].find(itemSelector, listElement);
        previous = previous[previous.length - 1];
      }

      var hideEvent = previous ? EventHandler__default['default'].trigger(previous, EVENT_HIDE, {
        relatedTarget: this._element
      }) : null;
      var showEvent = EventHandler__default['default'].trigger(this._element, EVENT_SHOW, {
        relatedTarget: previous
      });

      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        EventHandler__default['default'].trigger(previous, EVENT_HIDDEN, {
          relatedTarget: _this._element
        });
        EventHandler__default['default'].trigger(_this._element, EVENT_SHOWN, {
          relatedTarget: previous
        });
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine__default['default'].find(SELECTOR_ACTIVE_UL, container) : SelectorEngine__default['default'].children(container, SELECTOR_ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = getTransitionDurationFromElement(active);
        active.classList.remove(CLASS_NAME_SHOW);
        EventHandler__default['default'].one(active, 'transitionend', complete);
        emulateTransitionEnd(active, transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        active.classList.remove(CLASS_NAME_ACTIVE);
        var dropdownChild = SelectorEngine__default['default'].findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

        if (dropdownChild) {
          dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      element.classList.add(CLASS_NAME_ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE)) {
        element.classList.add(CLASS_NAME_SHOW);
      }

      if (element.parentNode && element.parentNode.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = element.closest(SELECTOR_DROPDOWN);

        if (dropdownElement) {
          SelectorEngine__default['default'].find(SELECTOR_DROPDOWN_TOGGLE).forEach(function (dropdown) {
            return dropdown.classList.add(CLASS_NAME_ACTIVE);
          });
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data__default['default'].getData(this, DATA_KEY) || new Tab(this);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "DATA_KEY",
      get: // Getters
      function get() {
        return DATA_KEY;
      }
    }]);

    return Tab;
  }(BaseComponent__default['default']);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler__default['default'].on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();
    var data = Data__default['default'].getData(this, DATA_KEY) || new Tab(this);
    data.show();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tab to jQuery only if jQuery is present
   */

  defineJQueryPlugin(NAME, Tab);

  return Tab;

})));

});

var script = defineComponent({
  props: [
    'choices',
    'helpText',
    'input',
    'label',
    'required',
    'type',
  ],

  setup(props) {
    return props;
  }
});

const _hoisted_1 = { class: "form-label" };
const _hoisted_2 = {
  key: 0,
  class: "text-danger"
};
const _hoisted_3 = { class: "input-group" };
const _hoisted_4 = { class: "form-text text-muted" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Fragment, null, [
    createVNode("label", _hoisted_1, [
      (_ctx.required)
        ? (openBlock(), createBlock("span", _hoisted_2, "*"))
        : createCommentVNode("v-if", true),
      createTextVNode(" " + toDisplayString(_ctx.label), 1 /* TEXT */)
    ]),
    createVNode("div", _hoisted_3, [
      (_ctx.type === 'single-choice')
        ? (openBlock(), createBlock("select", {
            key: 0,
            value: _ctx.input.ref.value,
            onChange: _cache[1] || (_cache[1] = $event => (_ctx.input.setValue($event.target.value))),
            class: "form-select"
          }, [
            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.choices, (choice) => {
              return (openBlock(), createBlock("option", {
                value: choice,
                key: choice
              }, toDisplayString(choice), 9 /* TEXT, PROPS */, ["value"]))
            }), 128 /* KEYED_FRAGMENT */))
          ], 40 /* PROPS, HYDRATE_EVENTS */, ["value"]))
        : (openBlock(), createBlock("input", {
            key: 1,
            type: _ctx.type,
            value: _ctx.input.ref.value,
            onInput: _cache[2] || (_cache[2] = $event => (_ctx.input.setValue($event.target.value))),
            class: ["form-control", {'form-control-color': _ctx.type === 'color'}]
          }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["type", "value"])),
      (_ctx.input.hasDefault)
        ? (openBlock(), createBlock("button", {
            key: 2,
            onClick: _cache[3] || (_cache[3] = $event => (_ctx.input.resetToDefault())),
            disabled: _ctx.input.isDefault.value,
            type: "button",
            class: "btn btn-light border"
          }, "Reset", 8 /* PROPS */, ["disabled"]))
        : createCommentVNode("v-if", true)
    ]),
    createVNode("small", _hoisted_4, toDisplayString(_ctx.helpText), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}

script.render = render;
script.__file = "node_modules/togostanza/src/components/FormField.vue";

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_debounce = debounce;

var script$1 = defineComponent({
  props: ['value'],

  setup(props) {
    const isCopiedShown = ref(false);

    const hideCopiedDebounced = lodash_debounce(() => {
      isCopiedShown.value = false;
    }, 1_500);

    async function copyToClipboard() {
      await navigator.clipboard.writeText(props.value);

      isCopiedShown.value = true;
      hideCopiedDebounced();
    }

    return {
      isCopiedShown,
      copyToClipboard,
      checkIcon: octicons.check
    };
  }
});

const _hoisted_1$1 = /*#__PURE__*/createTextVNode(" Copied ");
const _hoisted_2$1 = /*#__PURE__*/createTextVNode(" Copy to clipboard ");

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("button", mergeProps({
    type: "button",
    onClick: _cache[1] || (_cache[1] = $event => (_ctx.copyToClipboard()))
  }, _ctx.$attrs), [
    (_ctx.isCopiedShown)
      ? (openBlock(), createBlock(Fragment, { key: 0 }, [
          createVNode("span", {
            innerHTML: _ctx.checkIcon.toSVG({height: 19})
          }, null, 8 /* PROPS */, ["innerHTML"]),
          _hoisted_1$1
        ], 64 /* STABLE_FRAGMENT */))
      : (openBlock(), createBlock(Fragment, { key: 1 }, [
          _hoisted_2$1
        ], 64 /* STABLE_FRAGMENT */))
  ], 16 /* FULL_PROPS */))
}

script$1.render = render$1;
script$1.__file = "node_modules/togostanza/src/components/CopyButton.vue";

var utils = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

});

var exception = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      endLineNumber = undefined,
      column = undefined,
      endColumn = undefined;

  if (loc) {
    line = loc.start.line;
    endLineNumber = loc.end.line;
    column = loc.start.column;
    endColumn = loc.end.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;
      this.endLineNumber = endLineNumber;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
        Object.defineProperty(this, 'endColumn', {
          value: endColumn,
          enumerable: true
        });
      } else {
        this.column = column;
        this.endColumn = endColumn;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];

});

var blockHelperMissing = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = utils.createFrame(options.data);
        data.contextPath = utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];

});

var each = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





var _exception2 = _interopRequireDefault(exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else if (commonjsGlobal.Symbol && context[commonjsGlobal.Symbol.iterator]) {
        var newContext = [];
        var iterator = context[commonjsGlobal.Symbol.iterator]();
        for (var it = iterator.next(); !it.done; it = iterator.next()) {
          newContext.push(it.value);
        }
        context = newContext;
        for (var j = context.length; i < j; i++) {
          execIteration(i, i, i === context.length - 1);
        }
      } else {
        (function () {
          var priorKey = undefined;

          Object.keys(context).forEach(function (key) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          });
          if (priorKey !== undefined) {
            execIteration(priorKey, i - 1, true);
          }
        })();
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];

});

var helperMissing = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



var _exception2 = _interopRequireDefault(exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];

});

var _if = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





var _exception2 = _interopRequireDefault(exception);

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#if requires exactly one argument');
    }
    if (utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#unless requires exactly one argument');
    }
    return instance.helpers['if'].call(this, conditional, {
      fn: options.inverse,
      inverse: options.fn,
      hash: options.hash
    });
  });
};

module.exports = exports['default'];

});

var log = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];

});

var lookup = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field, options) {
    if (!obj) {
      // Note for 5.0: Change to "obj == null" in 5.0
      return obj;
    }
    return options.lookupProperty(obj, field);
  });
};

module.exports = exports['default'];

});

var _with = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





var _exception2 = _interopRequireDefault(exception);

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#with requires exactly one argument');
    }
    if (utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = utils.createFrame(options.data);
        data.contextPath = utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];

});

var registerDefaultHelpers_1 = registerDefaultHelpers;
var moveHelperToHooks_1 = moveHelperToHooks;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



var _helpersBlockHelperMissing2 = _interopRequireDefault(blockHelperMissing);



var _helpersEach2 = _interopRequireDefault(each);



var _helpersHelperMissing2 = _interopRequireDefault(helperMissing);



var _helpersIf2 = _interopRequireDefault(_if);



var _helpersLog2 = _interopRequireDefault(log);



var _helpersLookup2 = _interopRequireDefault(lookup);



var _helpersWith2 = _interopRequireDefault(_with);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}

function moveHelperToHooks(instance, helperName, keepHelper) {
  if (instance.helpers[helperName]) {
    instance.hooks[helperName] = instance.helpers[helperName];
    if (!keepHelper) {
      delete instance.helpers[helperName];
    }
  }
}


var helpers = /*#__PURE__*/Object.defineProperty({
	registerDefaultHelpers: registerDefaultHelpers_1,
	moveHelperToHooks: moveHelperToHooks_1
}, '__esModule', {value: true});

var inline = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];

});

var registerDefaultDecorators_1 = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault$1(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



var _decoratorsInline2 = _interopRequireDefault$1(inline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}


var decorators = /*#__PURE__*/Object.defineProperty({
	registerDefaultDecorators: registerDefaultDecorators_1
}, '__esModule', {value: true});

var logger_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      // eslint-disable-next-line no-console
      if (!console[method]) {
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];

});

var createNewLookupObject_2 = createNewLookupObject;



/**
 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
 * The resulting object can be used with "object[property]" to check if a property exists
 * @param {...object} sources a varargs parameter of source objects that will be merged
 * @returns {object}
 */

function createNewLookupObject() {
  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return utils.extend.apply(undefined, [Object.create(null)].concat(sources));
}


var createNewLookupObject_1 = /*#__PURE__*/Object.defineProperty({
	createNewLookupObject: createNewLookupObject_2
}, '__esModule', {value: true});

var createProtoAccessControl_1 = createProtoAccessControl;
var resultIsAllowed_1 = resultIsAllowed;
var resetLoggedProperties_1 = resetLoggedProperties;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }





var logger = _interopRequireWildcard(logger_1);

var loggedProperties = Object.create(null);

function createProtoAccessControl(runtimeOptions) {
  var defaultMethodWhiteList = Object.create(null);
  defaultMethodWhiteList['constructor'] = false;
  defaultMethodWhiteList['__defineGetter__'] = false;
  defaultMethodWhiteList['__defineSetter__'] = false;
  defaultMethodWhiteList['__lookupGetter__'] = false;

  var defaultPropertyWhiteList = Object.create(null);
  // eslint-disable-next-line no-proto
  defaultPropertyWhiteList['__proto__'] = false;

  return {
    properties: {
      whitelist: createNewLookupObject_1.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
      defaultValue: runtimeOptions.allowProtoPropertiesByDefault
    },
    methods: {
      whitelist: createNewLookupObject_1.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
      defaultValue: runtimeOptions.allowProtoMethodsByDefault
    }
  };
}

function resultIsAllowed(result, protoAccessControl, propertyName) {
  if (typeof result === 'function') {
    return checkWhiteList(protoAccessControl.methods, propertyName);
  } else {
    return checkWhiteList(protoAccessControl.properties, propertyName);
  }
}

function checkWhiteList(protoAccessControlForType, propertyName) {
  if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
    return protoAccessControlForType.whitelist[propertyName] === true;
  }
  if (protoAccessControlForType.defaultValue !== undefined) {
    return protoAccessControlForType.defaultValue;
  }
  logUnexpecedPropertyAccessOnce(propertyName);
  return false;
}

function logUnexpecedPropertyAccessOnce(propertyName) {
  if (loggedProperties[propertyName] !== true) {
    loggedProperties[propertyName] = true;
    logger.log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
  }
}

function resetLoggedProperties() {
  Object.keys(loggedProperties).forEach(function (propertyName) {
    delete loggedProperties[propertyName];
  });
}


var protoAccess = /*#__PURE__*/Object.defineProperty({
	createProtoAccessControl: createProtoAccessControl_1,
	resultIsAllowed: resultIsAllowed_1,
	resetLoggedProperties: resetLoggedProperties_1
}, '__esModule', {value: true});

var HandlebarsEnvironment_1 = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault$2(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





var _exception2 = _interopRequireDefault$2(exception);







var _logger2 = _interopRequireDefault$2(logger_1);



var VERSION = '4.7.7';
var VERSION_1 = VERSION;
var COMPILER_REVISION = 8;
var COMPILER_REVISION_1 = COMPILER_REVISION;
var LAST_COMPATIBLE_COMPILER_REVISION = 7;

var LAST_COMPATIBLE_COMPILER_REVISION_1 = LAST_COMPATIBLE_COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0 <4.3.0',
  8: '>= 4.3.0'
};

var REVISION_CHANGES_1 = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers$1, partials, decorators$1) {
  this.helpers = helpers$1 || {};
  this.partials = partials || {};
  this.decorators = decorators$1 || {};

  helpers.registerDefaultHelpers(this);
  decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (utils.toString.call(name) === objectType) {
      utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  },
  /**
   * Reset the memory of illegal property accesses that have already been logged.
   * @deprecated should only be used in handlebars test-cases
   */
  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
    protoAccess.resetLoggedProperties();
  }
};

var log$1 = _logger2['default'].log;

var log_1 = log$1;
var createFrame = utils.createFrame;
var logger$1 = _logger2['default'];


var base = /*#__PURE__*/Object.defineProperty({
	HandlebarsEnvironment: HandlebarsEnvironment_1,
	VERSION: VERSION_1,
	COMPILER_REVISION: COMPILER_REVISION_1,
	LAST_COMPATIBLE_COMPILER_REVISION: LAST_COMPATIBLE_COMPILER_REVISION_1,
	REVISION_CHANGES: REVISION_CHANGES_1,
	log: log_1,
	createFrame: createFrame,
	logger: logger$1
}, '__esModule', {value: true});

var safeString = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];

});

var wrapHelper_2 = wrapHelper;

function wrapHelper(helper, transformOptionsFn) {
  if (typeof helper !== 'function') {
    // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
    // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
    return helper;
  }
  var wrapper = function wrapper() /* dynamic arguments */{
    var options = arguments[arguments.length - 1];
    arguments[arguments.length - 1] = transformOptionsFn(options);
    return helper.apply(this, arguments);
  };
  return wrapper;
}


var wrapHelper_1 = /*#__PURE__*/Object.defineProperty({
	wrapHelper: wrapHelper_2
}, '__esModule', {value: true});

var checkRevision_1 = checkRevision;
var template_1 = template;
var wrapProgram_1 = wrapProgram;
var resolvePartial_1 = resolvePartial;
var invokePartial_1 = invokePartial;
var noop_1 = noop;
// istanbul ignore next

function _interopRequireDefault$3(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard$1(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }



var Utils = _interopRequireWildcard$1(utils);



var _exception2$1 = _interopRequireDefault$3(exception);









function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = base.COMPILER_REVISION;

  if (compilerRevision >= base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= base.COMPILER_REVISION) {
    return;
  }

  if (compilerRevision < base.LAST_COMPATIBLE_COMPILER_REVISION) {
    var runtimeVersions = base.REVISION_CHANGES[currentRevision],
        compilerVersions = base.REVISION_CHANGES[compilerRevision];
    throw new _exception2$1['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
  } else {
    // Use the embedded version info since the runtime doesn't know about this revision yet
    throw new _exception2$1['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2$1['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2$1['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as pseudo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
  var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }
    partial = env.VM.resolvePartial.call(this, partial, context, options);

    var extendedOptions = Utils.extend({}, options, {
      hooks: this.hooks,
      protoAccessControl: this.protoAccessControl
    });

    var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, extendedOptions);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2$1['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name, loc) {
      if (!obj || !(name in obj)) {
        throw new _exception2$1['default']('"' + name + '" not defined in ' + obj, {
          loc: loc
        });
      }
      return container.lookupProperty(obj, name);
    },
    lookupProperty: function lookupProperty(parent, propertyName) {
      var result = parent[propertyName];
      if (result == null) {
        return result;
      }
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return result;
      }

      if (protoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
        return result;
      }
      return undefined;
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        var result = depths[i] && container.lookupProperty(depths[i], name);
        if (result != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    mergeIfNeeded: function mergeIfNeeded(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }

    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }

  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
      wrapHelpersToPassLookupProperty(mergedHelpers, container);
      container.helpers = mergedHelpers;

      if (templateSpec.usePartial) {
        // Use mergeIfNeeded here to prevent compiling global partials multiple times
        container.partials = container.mergeIfNeeded(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = Utils.extend({}, env.decorators, options.decorators);
      }

      container.hooks = {};
      container.protoAccessControl = protoAccess.createProtoAccessControl(options);

      var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
      helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
      helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
    } else {
      container.protoAccessControl = options.protoAccessControl; // internal option
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
      container.hooks = options.hooks;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2$1['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2$1['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

/**
 * This is currently part of the official API, therefore implementation details should not be changed.
 */

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2$1['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}

function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
  Object.keys(mergedHelpers).forEach(function (helperName) {
    var helper = mergedHelpers[helperName];
    mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
  });
}

function passLookupPropertyOption(helper, container) {
  var lookupProperty = container.lookupProperty;
  return wrapHelper_1.wrapHelper(helper, function (options) {
    return Utils.extend({ lookupProperty: lookupProperty }, options);
  });
}


var runtime = /*#__PURE__*/Object.defineProperty({
	checkRevision: checkRevision_1,
	template: template_1,
	wrapProgram: wrapProgram_1,
	resolvePartial: resolvePartial_1,
	invokePartial: invokePartial_1,
	noop: noop_1
}, '__esModule', {value: true});

var noConflict = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];

});

var handlebars_runtime = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }



var base$1 = _interopRequireWildcard(base);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)



var _handlebarsSafeString2 = _interopRequireDefault(safeString);



var _handlebarsException2 = _interopRequireDefault(exception);



var Utils = _interopRequireWildcard(utils);



var runtime$1 = _interopRequireWildcard(runtime);



var _handlebarsNoConflict2 = _interopRequireDefault(noConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base$1.HandlebarsEnvironment();

  Utils.extend(hb, base$1);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime$1;
  hb.template = function (spec) {
    return runtime$1.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];

});

// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
var runtime$1 = handlebars_runtime['default'];

var Template = /*#__PURE__*/runtime$1.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<style>\n  "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"tagName") || (depth0 != null ? lookupProperty(depth0,"tagName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"tagName","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":15}}}) : helper))) != null ? stack1 : "")
    + " {\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"styleVars") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":4,"column":4},"end":{"line":6,"column":13}}})) != null ? stack1 : "")
    + "  }\n</style>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    "
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"name") : stack1), depth0)) != null ? stack1 : "")
    + ": "
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"value") : stack1), depth0)) != null ? stack1 : "")
    + ";\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"styleVars") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":1,"column":0},"end":{"line":9,"column":7}}})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
function styleSnippetTemplate(data, options, asString) {
  var html = Template(data, options);
  return (asString || true) ? html : $(html);
}

var Template$1 = /*#__PURE__*/runtime$1.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<"
    + alias4(((helper = (helper = lookupProperty(helpers,"tagName") || (depth0 != null ? lookupProperty(depth0,"tagName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tagName","hash":{},"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":2,"column":1},"end":{"line":2,"column":12}}}) : helper)))
    + "\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"params") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":3,"column":2},"end":{"line":5,"column":11}}})) != null ? stack1 : "")
    + "></"
    + alias4(((helper = (helper = lookupProperty(helpers,"tagName") || (depth0 != null ? lookupProperty(depth0,"tagName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tagName","hash":{},"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":6,"column":3},"end":{"line":6,"column":14}}}) : helper)))
    + ">\n";
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"value") : stack1), depth0))
    + "\"\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<"
    + alias4(((helper = (helper = lookupProperty(helpers,"tagName") || (depth0 != null ? lookupProperty(depth0,"tagName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tagName","hash":{},"data":data,"loc":{"source":"style-snippet.html.hbs","start":{"line":8,"column":1},"end":{"line":8,"column":12}}}) : helper)))
    + "></"
    + alias4(((helper = (helper = lookupProperty(helpers,"tagName") || (depth0 != null ? lookupProperty(depth0,"tagName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tagName","hash":{},"data":data,"loc":{"source":"style-snippet.html.hbs","start":{"line":8,"column":15},"end":{"line":8,"column":26}}}) : helper)))
    + ">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"params") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams),"inverse":container.program(4, data, 0, blockParams),"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":1,"column":0},"end":{"line":9,"column":7}}})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
function stanzaSnippetTemplate(data, options, asString) {
  var html = Template$1(data, options);
  return (asString || true) ? html : $(html);
}

var Template$2 = /*#__PURE__*/runtime$1.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<script type=\"module\" src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"scriptSrc") || (depth0 != null ? lookupProperty(depth0,"scriptSrc") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"scriptSrc","hash":{},"data":data,"loc":{"source":"style-snippet.html.hbs","start":{"line":1,"column":27},"end":{"line":1,"column":40}}}) : helper)))
    + "\" async></script>\n";
},"useData":true});
function loaderSnippetTemplate(data, options, asString) {
  var html = Template$2(data, options);
  return (asString || true) ? html : $(html);
}

var script$2 = defineComponent({
  props: ['metadata', 'params', 'styleVars'],

  components: {
    CopyButton: script$1
  },

  setup(props) {
    const id      = props.metadata['@id'];
    const tagName = `togostanza-${id}`;

    const stanzaSnippet = computed(() => {
      return stanzaSnippetTemplate({
        tagName,
        params: props.params
      });
    });

    const styleSnippet = computed(() => {
      return styleSnippetTemplate({
        tagName,
        styleVars: props.styleVars
      });
    });

    const scriptSrc     = new URL(`./${id}.js`, location.href).href;
    const loaderSnippet = loaderSnippetTemplate({scriptSrc});

    const combinedSnippet = computed(() => {
      return [
        loaderSnippet,
        styleSnippet.value,
        stanzaSnippet.value
      ].filter(Boolean).join('\n');
    });

    return {
      stanzaSnippet,
      styleSnippet,
      combinedSnippet
    };
  }
});

const _hoisted_1$2 = { class: "bg-dark" };
const _hoisted_2$2 = { class: "text-end p-2" };
const _hoisted_3$1 = { class: "overflow-auto p-3 pt-0 text-white" };
const _hoisted_4$1 = { class: "overflow-auto p-3 bg-light" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CopyButton = resolveComponent("CopyButton");

  return (openBlock(), createBlock(Fragment, null, [
    createVNode("div", _hoisted_1$2, [
      createVNode("div", _hoisted_2$2, [
        createVNode(_component_CopyButton, {
          value: _ctx.combinedSnippet,
          class: "btn btn-sm btn-light"
        }, null, 8 /* PROPS */, ["value"])
      ]),
      createVNode("pre", _hoisted_3$1, [
        createVNode("code", null, toDisplayString(_ctx.combinedSnippet), 1 /* TEXT */)
      ])
    ]),
    createVNode("div", _hoisted_4$1, [
      createVNode("div", { innerHTML: _ctx.styleSnippet }, null, 8 /* PROPS */, ["innerHTML"]),
      createVNode("div", { innerHTML: _ctx.stanzaSnippet }, null, 8 /* PROPS */, ["innerHTML"])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}

script$2.render = render$2;
script$2.__file = "node_modules/togostanza/src/components/StanzaPreviewer.vue";

var script$3 = defineComponent({
  components: {
    FormField: script,
    Layout: script$4,
    StanzaPreviewer: script$2
  },

  props: ['metadata', 'readme'],

  setup({metadata, readme}) {
    const paramFields = (metadata['stanza:parameter'] || []).map((param) => {
      return {
        param,
        input: useInput(param['stanza:example'], false)
      };
    });

    const aboutLinkPlacement = useInput(metadata['stanza:about-link-placement'] || 'bottom-right');

    const params = computed(() => {
      return [
        ...paramFields.map(({param, input}) => {
          return {
            name: param['stanza:key'],
            input
          };
        }),
        {
          name:  'togostanza-about-link-placement',
          input: aboutLinkPlacement
        }
      ].filter(({input}) => (
        !input.isDefault.value
      )).map(({name, input}) => {
        return {
          name,
          value: input.ref.value
        };
      });
    });

    const styleFields = (metadata['stanza:style'] || []).map((style) => {
      return {
        style,
        input: useInput(style['stanza:default'])
      };
    });

    const styleVars = computed(() => {
      return styleFields.filter(({input}) => (
        !input.isDefault.value
      )).map(({style, input}) => {
        return {
          name:  style['stanza:key'],
          value: input.ref.value
        };
      });
    });

    return {
      metadata,
      readme,
      paramFields,
      aboutLinkPlacement,
      params,
      styleFields,
      styleVars
    };
  }
});

function useInput(initValue, hasDefault = true) {
  const _ref      = ref(initValue);
  const isDefault = computed(() => hasDefault && (_ref.value === initValue));

  function setValue(newVal) {
    _ref.value = newVal;
  }

  function resetToDefault() {
    if (!hasDefault) { return; }

    _ref.value = initValue;
  }

  return {
    ref: _ref,
    setValue,
    hasDefault,
    isDefault,
    resetToDefault
  };
}

const _withId = /*#__PURE__*/withScopeId("data-v-0732abc2");

pushScopeId("data-v-0732abc2");
const _hoisted_1$3 = { class: "display-4" };
const _hoisted_2$3 = { class: "lead" };
const _hoisted_3$2 = { class: "row" };
const _hoisted_4$2 = { class: "col-lg-6" };
const _hoisted_5 = /*#__PURE__*/createVNode("nav", {
  class: "nav nav-tabs",
  role: "tablist"
}, [
  /*#__PURE__*/createVNode("a", {
    class: "nav-link active",
    href: "#overview",
    "data-bs-toggle": "tab",
    role: "tab"
  }, "Overview"),
  /*#__PURE__*/createVNode("a", {
    class: "nav-link",
    href: "#customize",
    "data-bs-toggle": "tab",
    role: "tab"
  }, "Customize")
], -1 /* HOISTED */);
const _hoisted_6 = { class: "tab-content mt-3" };
const _hoisted_7 = {
  class: "tab-pane active px-lg-5",
  id: "overview",
  role: "tabpanel"
};
const _hoisted_8 = { class: "table table-borderless border mb-1" };
const _hoisted_9 = /*#__PURE__*/createVNode("th", null, "Display", -1 /* HOISTED */);
const _hoisted_10 = /*#__PURE__*/createVNode("th", null, "Type", -1 /* HOISTED */);
const _hoisted_11 = /*#__PURE__*/createVNode("th", null, "Provider", -1 /* HOISTED */);
const _hoisted_12 = /*#__PURE__*/createVNode("th", null, "Author", -1 /* HOISTED */);
const _hoisted_13 = { class: "mb-0" };
const _hoisted_14 = /*#__PURE__*/createTextVNode(" <");
const _hoisted_15 = /*#__PURE__*/createTextVNode("> ");
const _hoisted_16 = /*#__PURE__*/createVNode("th", null, "Contributors", -1 /* HOISTED */);
const _hoisted_17 = {
  key: 0,
  class: "list-unstyled mb-0"
};
const _hoisted_18 = /*#__PURE__*/createTextVNode(" - ");
const _hoisted_19 = /*#__PURE__*/createVNode("th", null, "License", -1 /* HOISTED */);
const _hoisted_20 = /*#__PURE__*/createVNode("th", null, "Created", -1 /* HOISTED */);
const _hoisted_21 = /*#__PURE__*/createVNode("th", null, "Updated", -1 /* HOISTED */);
const _hoisted_22 = { class: "text-end" };
const _hoisted_23 = {
  class: "tab-pane",
  id: "customize",
  role: "tabpanel"
};
const _hoisted_24 = /*#__PURE__*/createVNode("h2", { class: "my-3" }, "Parameters", -1 /* HOISTED */);
const _hoisted_25 = { class: "row row-cols-1 row-cols-sm-2 row-cols-lg-1 row-cols-xl-2 gx-4 gy-3" };
const _hoisted_26 = { class: "col" };
const _hoisted_27 = /*#__PURE__*/createVNode("hr", { class: "mt-4 mb-3" }, null, -1 /* HOISTED */);
const _hoisted_28 = /*#__PURE__*/createVNode("h2", { class: "my-3" }, "Styles", -1 /* HOISTED */);
const _hoisted_29 = { class: "row row-cols-1 row-cols-sm-2 row-cols-lg-1 row-cols-xl-2 gx-4 gy-3" };
const _hoisted_30 = {
  key: 0,
  class: "font-italic"
};
const _hoisted_31 = { class: "col-lg-6" };
const _hoisted_32 = /*#__PURE__*/createVNode("hr", { class: "d-lg-none mb-4" }, null, -1 /* HOISTED */);
popScopeId();

const render$3 = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_FormField = resolveComponent("FormField");
  const _component_StanzaPreviewer = resolveComponent("StanzaPreviewer");
  const _component_Layout = resolveComponent("Layout");

  return (openBlock(), createBlock(_component_Layout, { containerClass: "container-fluid" }, {
    default: _withId(() => [
      createVNode("h1", _hoisted_1$3, toDisplayString(_ctx.metadata['stanza:label']), 1 /* TEXT */),
      createVNode("p", _hoisted_2$3, toDisplayString(_ctx.metadata['stanza:definition']), 1 /* TEXT */),
      createVNode("div", _hoisted_3$2, [
        createVNode("div", _hoisted_4$2, [
          _hoisted_5,
          createVNode("div", _hoisted_6, [
            createVNode("div", _hoisted_7, [
              createVNode("table", _hoisted_8, [
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    _hoisted_9,
                    createVNode("td", null, toDisplayString(_ctx.metadata['stanza:display'] || '-'), 1 /* TEXT */)
                  ]),
                  createVNode("tr", null, [
                    _hoisted_10,
                    createVNode("td", null, toDisplayString(_ctx.metadata['stanza:type'] || '-'), 1 /* TEXT */)
                  ]),
                  createVNode("tr", null, [
                    _hoisted_11,
                    createVNode("td", null, toDisplayString(_ctx.metadata['stanza:provider'] || '-'), 1 /* TEXT */)
                  ]),
                  createVNode("tr", null, [
                    _hoisted_12,
                    createVNode("td", null, [
                      createVNode("address", _hoisted_13, [
                        createTextVNode(toDisplayString(_ctx.metadata['stanza:author'] || '-') + " ", 1 /* TEXT */),
                        (_ctx.metadata['stanza:address'])
                          ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              _hoisted_14,
                              createVNode("a", {
                                href: `mailto:${_ctx.metadata['stanza:address']}`
                              }, toDisplayString(_ctx.metadata['stanza:address']), 9 /* TEXT, PROPS */, ["href"]),
                              _hoisted_15
                            ], 64 /* STABLE_FRAGMENT */))
                          : createCommentVNode("v-if", true)
                      ])
                    ])
                  ]),
                  createVNode("tr", null, [
                    _hoisted_16,
                    createVNode("td", null, [
                      (_ctx.metadata['stanza:contributor'] && _ctx.metadata['stanza:contributor'].length > 0)
                        ? (openBlock(), createBlock("ul", _hoisted_17, [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.metadata['stanza:contributor'], (contributor) => {
                              return (openBlock(), createBlock("li", { key: contributor }, toDisplayString(contributor), 1 /* TEXT */))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]))
                        : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            _hoisted_18
                          ], 64 /* STABLE_FRAGMENT */))
                    ])
                  ]),
                  createVNode("tr", null, [
                    _hoisted_19,
                    createVNode("td", null, toDisplayString(_ctx.metadata['stanza:license'] || '-'), 1 /* TEXT */)
                  ]),
                  createVNode("tr", null, [
                    _hoisted_20,
                    createVNode("td", null, toDisplayString(_ctx.metadata['stanza:created'] || '-'), 1 /* TEXT */)
                  ]),
                  createVNode("tr", null, [
                    _hoisted_21,
                    createVNode("td", null, toDisplayString(_ctx.metadata['stanza:updated'] || '-'), 1 /* TEXT */)
                  ])
                ])
              ]),
              createVNode("div", _hoisted_22, [
                createVNode("a", {
                  href: `./${_ctx.metadata['@id']}/metadata.json`
                }, "Download JSON", 8 /* PROPS */, ["href"])
              ]),
              createVNode("div", {
                innerHTML: _ctx.readme,
                class: "mt-4"
              }, null, 8 /* PROPS */, ["innerHTML"])
            ]),
            createVNode("div", _hoisted_23, [
              createVNode("section", null, [
                _hoisted_24,
                createVNode("div", _hoisted_25, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.paramFields, ({param, input}) => {
                    return (openBlock(), createBlock("div", {
                      key: param['stanza:key'],
                      class: "col"
                    }, [
                      createVNode(_component_FormField, {
                        input: input,
                        label: param['stanza:key'],
                        required: param['stanza:required'],
                        "help-text": param['stanza:description']
                      }, null, 8 /* PROPS */, ["input", "label", "required", "help-text"])
                    ]))
                  }), 128 /* KEYED_FRAGMENT */)),
                  createVNode("div", _hoisted_26, [
                    createVNode(_component_FormField, {
                      input: _ctx.aboutLinkPlacement,
                      label: 'togostanza-about-link-placement',
                      type: 'single-choice',
                      choices: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'none'],
                      "help-text": 'Placement of the information icon which links to this page.'
                    }, null, 8 /* PROPS */, ["input", "help-text"])
                  ])
                ])
              ]),
              _hoisted_27,
              createVNode("section", null, [
                _hoisted_28,
                createVNode("div", _hoisted_29, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.styleFields, ({style, input}) => {
                    return (openBlock(), createBlock("div", {
                      key: style['stanza:key'],
                      class: "col"
                    }, [
                      createVNode(_component_FormField, {
                        input: input,
                        label: style['stanza:key'],
                        type: style['stanza:type'],
                        choices: style['stanza:choice'],
                        "help-text": style['stanza:description']
                      }, null, 8 /* PROPS */, ["input", "label", "type", "choices", "help-text"])
                    ]))
                  }), 128 /* KEYED_FRAGMENT */))
                ]),
                (_ctx.styleFields.length === 0)
                  ? (openBlock(), createBlock("p", _hoisted_30, " No styles defined. "))
                  : createCommentVNode("v-if", true)
              ])
            ])
          ])
        ]),
        createVNode("div", _hoisted_31, [
          _hoisted_32,
          createVNode(_component_StanzaPreviewer, {
            metadata: _ctx.metadata,
            params: _ctx.params,
            styleVars: _ctx.styleVars
          }, null, 8 /* PROPS */, ["metadata", "params", "styleVars"])
        ])
      ])
    ]),
    _: 1 /* STABLE */
  }))
});

var css = "\nth[data-v-0732abc2] {\n  background-color: var(--bs-light);\n  text-align: center;\n  white-space: nowrap;\n  width: 1%;\n}\nth[data-v-0732abc2], td[data-v-0732abc2] {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n";
n(css,{});

script$3.render = render$3;
script$3.__scopeId = "data-v-0732abc2";
script$3.__file = "node_modules/togostanza/src/components/Help.vue";

function helpApp({metadata, readme}) {
  return createApp(script$3, {metadata, readme})
}

export default helpApp;
//# sourceMappingURL=help-app.js.map