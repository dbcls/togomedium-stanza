import { R as React, _ as _extends, r as react } from './index-6aec0cc7.js';
import { R as ReactDOM, i as isHostComponent, h as capitalize, k as createChainedFunction, l as createSvgIcon$1, m as debounce, n as isMuiElement, o as ownerDocument, p as ownerWindow, s as setRef, u as useEnhancedEffect, q as useId, r as useControlled, t as useEventCallback, v as useForkRef, w as useIsFocusVisible, x as ClassNameGenerator, y as jsxRuntime, z as newStyled, A as generateUtilityClass, B as generateUtilityClasses, D as styled, P as Popper, G as alpha, H as useThemeProps, _ as _objectWithoutPropertiesLoose, I as useTheme, J as clsx, K as composeClasses, L as Grow } from './EmotionCacheProvider-d90cd57a.js';
import { g as getAugmentedNamespace } from './stanza-f44e302d.js';

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

function err(message) {
  const error = new Error(message); // In V8, Error objects keep the closure scope chain alive until the
  // err.stack property is accessed.

  if (error.stack === undefined) {
    // IE sets the stack only if error is thrown
    try {
      throw error;
    } catch (_) {} // eslint-disable-line fb-www/no-unused-catch-bindings, no-empty

  }

  return error;
}

var err_1 = err;

// @oss-only


var Recoil_err = err_1;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

// Split declaration and implementation to allow this function to pretend to
// check for actual instance of Promise instead of something with a `then`
// method.
// eslint-disable-next-line no-redeclare
function isPromise(p) {
  return !!p && typeof p.then === 'function';
}

var Recoil_isPromise = isPromise;

function nullthrows(x, message) {
  if (x != null) {
    return x;
  }

  throw Recoil_err(message !== null && message !== void 0 ? message : 'Got unexpected null or undefined');
}

var Recoil_nullthrows = nullthrows;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class BaseLoadable {
  getValue() {
    throw Recoil_err('BaseLoadable');
  }

  toPromise() {
    throw Recoil_err('BaseLoadable');
  }

  valueMaybe() {
    throw Recoil_err('BaseLoadable');
  }

  valueOrThrow() {
    // $FlowFixMe[prop-missing]
    throw Recoil_err(`Loadable expected value, but in "${this.state}" state`);
  }

  promiseMaybe() {
    throw Recoil_err('BaseLoadable');
  }

  promiseOrThrow() {
    // $FlowFixMe[prop-missing]
    throw Recoil_err(`Loadable expected promise, but in "${this.state}" state`);
  }

  errorMaybe() {
    throw Recoil_err('BaseLoadable');
  }

  errorOrThrow() {
    // $FlowFixMe[prop-missing]
    throw Recoil_err(`Loadable expected error, but in "${this.state}" state`);
  }

  is(other) {
    // $FlowFixMe[prop-missing]
    return other.state === this.state && other.contents === this.contents;
  }

  map(_map) {
    throw Recoil_err('BaseLoadable');
  }

}

class ValueLoadable extends BaseLoadable {
  constructor(value) {
    super();

    _defineProperty(this, "state", 'hasValue');

    _defineProperty(this, "contents", void 0);

    this.contents = value;
  }

  getValue() {
    return this.contents;
  }

  toPromise() {
    return Promise.resolve(this.contents);
  }

  valueMaybe() {
    return this.contents;
  }

  valueOrThrow() {
    return this.contents;
  }

  promiseMaybe() {
    return undefined;
  }

  errorMaybe() {
    return undefined;
  }

  map(map) {
    try {
      const next = map(this.contents);
      return Recoil_isPromise(next) ? loadableWithPromise(next) : isLoadable(next) ? next : loadableWithValue(next);
    } catch (e) {
      return Recoil_isPromise(e) ? // If we "suspended", then try again.
      // errors and subsequent retries will be handled in 'loading' case
      loadableWithPromise(e.next(() => this.map(map))) : loadableWithError(e);
    }
  }

}

class ErrorLoadable extends BaseLoadable {
  constructor(error) {
    super();

    _defineProperty(this, "state", 'hasError');

    _defineProperty(this, "contents", void 0);

    this.contents = error;
  }

  getValue() {
    throw this.contents;
  }

  toPromise() {
    return Promise.reject(this.contents);
  }

  valueMaybe() {
    return undefined;
  }

  promiseMaybe() {
    return undefined;
  }

  errorMaybe() {
    return this.contents;
  }

  errorOrThrow() {
    return this.contents;
  }

  map(_map) {
    // $FlowIssue[incompatible-return]
    return this;
  }

}

class LoadingLoadable extends BaseLoadable {
  constructor(promise) {
    super();

    _defineProperty(this, "state", 'loading');

    _defineProperty(this, "contents", void 0);

    this.contents = promise;
  }

  getValue() {
    throw this.contents;
  }

  toPromise() {
    return this.contents;
  }

  valueMaybe() {
    return undefined;
  }

  promiseMaybe() {
    return this.contents;
  }

  promiseOrThrow() {
    return this.contents;
  }

  errorMaybe() {
    return undefined;
  }

  map(map) {
    return loadableWithPromise(this.contents.then(value => {
      const next = map(value);

      if (isLoadable(next)) {
        const nextLoadable = next;

        switch (nextLoadable.state) {
          case 'hasValue':
            return nextLoadable.contents;

          case 'hasError':
            throw nextLoadable.contents;

          case 'loading':
            return nextLoadable.contents;
        }
      } // $FlowIssue[incompatible-return]


      return next;
    }).catch(e => {
      if (Recoil_isPromise(e)) {
        // we were "suspended," try again
        return e.then(() => this.map(map).contents);
      }

      throw e;
    }));
  }

}

function loadableWithValue(value) {
  return Object.freeze(new ValueLoadable(value));
}

function loadableWithError(error) {
  return Object.freeze(new ErrorLoadable(error));
}

function loadableWithPromise(promise) {
  return Object.freeze(new LoadingLoadable(promise));
}

function loadableLoading() {
  return Object.freeze(new LoadingLoadable(new Promise(() => {})));
}

function loadableAllArray(inputs) {
  return inputs.every(i => i.state === 'hasValue') ? loadableWithValue(inputs.map(i => i.contents)) : inputs.some(i => i.state === 'hasError') ? loadableWithError(Recoil_nullthrows(inputs.find(i => i.state === 'hasError'), 'Invalid loadable passed to loadableAll').contents) : loadableWithPromise(Promise.all(inputs.map(i => i.contents)));
}

function loadableAll(inputs) {
  const unwrapedInputs = Array.isArray(inputs) ? inputs : Object.getOwnPropertyNames(inputs).map(key => inputs[key]);
  const output = loadableAllArray(unwrapedInputs);
  return Array.isArray(inputs) ? // $FlowIssue[incompatible-return]
  output : // Object.getOwnPropertyNames() has consistent key ordering with ES6
  // $FlowIssue[incompatible-call]
  output.map(outputs => Object.getOwnPropertyNames(inputs).reduce((out, key, idx) => ({ ...out,
    [key]: outputs[idx]
  }), {}));
}

function isLoadable(x) {
  return x instanceof BaseLoadable;
}

const LoadableStaticInterface = {
  of: value => Recoil_isPromise(value) ? loadableWithPromise(value) : loadableWithValue(value),
  error: error => loadableWithError(error),
  // $FlowIssue[unclear-type]
  all: loadableAll,
  isLoadable
};
var Recoil_Loadable = {
  loadableWithValue,
  loadableWithError,
  loadableWithPromise,
  loadableLoading,
  loadableAll,
  isLoadable,
  RecoilLoadable: LoadableStaticInterface
};

var Recoil_Loadable_1 = Recoil_Loadable.loadableWithValue;
var Recoil_Loadable_2 = Recoil_Loadable.loadableWithError;
var Recoil_Loadable_3 = Recoil_Loadable.loadableWithPromise;
var Recoil_Loadable_4 = Recoil_Loadable.loadableLoading;
var Recoil_Loadable_5 = Recoil_Loadable.loadableAll;
var Recoil_Loadable_6 = Recoil_Loadable.isLoadable;
var Recoil_Loadable_7 = Recoil_Loadable.RecoilLoadable;

var Recoil_Loadable$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadableWithValue: Recoil_Loadable_1,
  loadableWithError: Recoil_Loadable_2,
  loadableWithPromise: Recoil_Loadable_3,
  loadableLoading: Recoil_Loadable_4,
  loadableAll: Recoil_Loadable_5,
  isLoadable: Recoil_Loadable_6,
  RecoilLoadable: Recoil_Loadable_7
});

var _useMutableSource;

 // FIXME T2710559282599660


const useMutableSource = // flowlint-line unclear-type:off
(_useMutableSource = React.useMutableSource) !== null && _useMutableSource !== void 0 ? _useMutableSource : React.unstable_useMutableSource; // flowlint-line unclear-type:off

function mutableSourceExists() {
  return useMutableSource && !(typeof window !== 'undefined' && window.$disableRecoilValueMutableSource_TEMP_HACK_DO_NOT_USE);
}

var Recoil_mutableSource = {
  mutableSourceExists,
  useMutableSource
};

const {
  mutableSourceExists: mutableSourceExists$1
} = Recoil_mutableSource;

const gks = new Map().set('recoil_hamt_2020', true).set('recoil_memory_managament_2020', true).set('recoil_suppress_rerender_in_callback', true);

function Recoil_gkx(gk) {
  var _gks$get;

  if (gk === 'recoil_early_rendering_2021' && !mutableSourceExists$1()) {
    return false;
  }

  return (_gks$get = gks.get(gk)) !== null && _gks$get !== void 0 ? _gks$get : false;
}

Recoil_gkx.setPass = gk => {
  gks.set(gk, true);
};

Recoil_gkx.setFail = gk => {
  gks.set(gk, false);
};

var Recoil_gkx_1 = Recoil_gkx; // @oss-only

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */
/**
 * Creates a new iterable whose output is generated by passing the input
 * iterable's values through the mapper function.
 */

function mapIterable(iterable, callback) {
  // Use generator to create iterable/iterator
  return function* () {
    let index = 0;

    for (const value of iterable) {
      yield callback(value, index++);
    }
  }();
}

var Recoil_mapIterable = mapIterable;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

function recoverableViolation(message, projectName, {
  error
} = {}) {

  return null;
}

var recoverableViolation_1 = recoverableViolation;

// @oss-only


var Recoil_recoverableViolation = recoverableViolation_1;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

// eslint-disable-next-line no-unused-vars
class AbstractRecoilValue {
  constructor(newKey) {
    _defineProperty(this, "key", void 0);

    this.key = newKey;
  }

}

class RecoilState extends AbstractRecoilValue {}

class RecoilValueReadOnly extends AbstractRecoilValue {}

function isRecoilValue(x) {
  return x instanceof RecoilState || x instanceof RecoilValueReadOnly;
}

var Recoil_RecoilValue = {
  AbstractRecoilValue,
  RecoilState,
  RecoilValueReadOnly,
  isRecoilValue
};

var Recoil_RecoilValue_1 = Recoil_RecoilValue.AbstractRecoilValue;
var Recoil_RecoilValue_2 = Recoil_RecoilValue.RecoilState;
var Recoil_RecoilValue_3 = Recoil_RecoilValue.RecoilValueReadOnly;
var Recoil_RecoilValue_4 = Recoil_RecoilValue.isRecoilValue;

var Recoil_RecoilValue$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AbstractRecoilValue: Recoil_RecoilValue_1,
  RecoilState: Recoil_RecoilValue_2,
  RecoilValueReadOnly: Recoil_RecoilValue_3,
  isRecoilValue: Recoil_RecoilValue_4
});

class DefaultValue {}

const DEFAULT_VALUE = new DefaultValue();

class RecoilValueNotReady extends Error {
  constructor(key) {
    super(`Tried to set the value of Recoil selector ${key} using an updater function, but it is an async selector in a pending or error state; this is not supported.`);
  }

}

// flowlint-next-line unclear-type:off
const nodes = new Map(); // flowlint-next-line unclear-type:off

const recoilValues = new Map();
/* eslint-disable no-redeclare */

function recoilValuesForKeys(keys) {
  return Recoil_mapIterable(keys, key => Recoil_nullthrows(recoilValues.get(key)));
}

function registerNode(node) {
  if (nodes.has(node.key)) {
    const message = `Duplicate atom key "${node.key}". This is a FATAL ERROR in
      production. But it is safe to ignore this warning if it occurred because of
      hot module replacement.`; // TODO Need to figure out if there is a standard/open-source equivalent to see if hot module replacement is happening:
    // prettier-ignore
    // @fb-only: if (__DEV__) {
    // @fb-only: const isAcceptingUpdate = require('__debug').isAcceptingUpdate;
    // prettier-ignore
    // @fb-only: if (typeof isAcceptingUpdate !== 'function' || !isAcceptingUpdate()) {
    // @fb-only: expectationViolation(message, 'recoil');
    // @fb-only: }
    // prettier-ignore
    // @fb-only: } else {
    // @fb-only: recoverableViolation(message, 'recoil');
    // @fb-only: }

    console.warn(message); // @oss-only
  }

  nodes.set(node.key, node);
  const recoilValue = node.set == null ? new Recoil_RecoilValue$1.RecoilValueReadOnly(node.key) : new Recoil_RecoilValue$1.RecoilState(node.key);
  recoilValues.set(node.key, recoilValue);
  return recoilValue;
}
/* eslint-enable no-redeclare */


class NodeMissingError extends Error {} // flowlint-next-line unclear-type:off


function getNode(key) {
  const node = nodes.get(key);

  if (node == null) {
    throw new NodeMissingError(`Missing definition for RecoilValue: "${key}""`);
  }

  return node;
} // flowlint-next-line unclear-type:off


function getNodeMaybe(key) {
  return nodes.get(key);
}

const configDeletionHandlers = new Map();

function deleteNodeConfigIfPossible(key) {
  var _node$shouldDeleteCon;

  if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
    return;
  }

  const node = nodes.get(key);

  if (node === null || node === void 0 ? void 0 : (_node$shouldDeleteCon = node.shouldDeleteConfigOnRelease) === null || _node$shouldDeleteCon === void 0 ? void 0 : _node$shouldDeleteCon.call(node)) {
    var _getConfigDeletionHan;

    nodes.delete(key);
    (_getConfigDeletionHan = getConfigDeletionHandler(key)) === null || _getConfigDeletionHan === void 0 ? void 0 : _getConfigDeletionHan();
    configDeletionHandlers.delete(key);
  }
}

function setConfigDeletionHandler(key, fn) {
  if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
    return;
  }

  if (fn === undefined) {
    configDeletionHandlers.delete(key);
  } else {
    configDeletionHandlers.set(key, fn);
  }
}

function getConfigDeletionHandler(key) {
  return configDeletionHandlers.get(key);
}

var Recoil_Node = {
  nodes,
  recoilValues,
  registerNode,
  getNode,
  getNodeMaybe,
  deleteNodeConfigIfPossible,
  setConfigDeletionHandler,
  getConfigDeletionHandler,
  recoilValuesForKeys,
  NodeMissingError,
  DefaultValue,
  DEFAULT_VALUE,
  RecoilValueNotReady
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

function enqueueExecution(s, f) {
  f();
}

var Recoil_Queue = {
  enqueueExecution
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var hamt_1 = createCommonjsModule(function (module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
/**
    @fileOverview Hash Array Mapped Trie.

    Code based on: https://github.com/exclipy/pdata
*/


var hamt = {}; // export

/* Configuration
 ******************************************************************************/

var SIZE = 5;
var BUCKET_SIZE = Math.pow(2, SIZE);
var MASK = BUCKET_SIZE - 1;
var MAX_INDEX_NODE = BUCKET_SIZE / 2;
var MIN_ARRAY_NODE = BUCKET_SIZE / 4;
/*
 ******************************************************************************/

var nothing = {};

var constant = function constant(x) {
  return function () {
    return x;
  };
};
/**
    Get 32 bit hash of string.

    Based on:
    http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
*/


var hash = hamt.hash = function (str) {
  var type = typeof str === 'undefined' ? 'undefined' : _typeof(str);
  if (type === 'number') return str;
  if (type !== 'string') str += '';
  var hash = 0;

  for (var i = 0, len = str.length; i < len; ++i) {
    var c = str.charCodeAt(i);
    hash = (hash << 5) - hash + c | 0;
  }

  return hash;
};
/* Bit Ops
 ******************************************************************************/

/**
    Hamming weight.

    Taken from: http://jsperf.com/hamming-weight
*/


var popcount = function popcount(x) {
  x -= x >> 1 & 0x55555555;
  x = (x & 0x33333333) + (x >> 2 & 0x33333333);
  x = x + (x >> 4) & 0x0f0f0f0f;
  x += x >> 8;
  x += x >> 16;
  return x & 0x7f;
};

var hashFragment = function hashFragment(shift, h) {
  return h >>> shift & MASK;
};

var toBitmap = function toBitmap(x) {
  return 1 << x;
};

var fromBitmap = function fromBitmap(bitmap, bit) {
  return popcount(bitmap & bit - 1);
};
/* Array Ops
 ******************************************************************************/

/**
    Set a value in an array.

    @param mutate Should the input array be mutated?
    @param at Index to change.
    @param v New value
    @param arr Array.
*/


var arrayUpdate = function arrayUpdate(mutate, at, v, arr) {
  var out = arr;

  if (!mutate) {
    var len = arr.length;
    out = new Array(len);

    for (var i = 0; i < len; ++i) {
      out[i] = arr[i];
    }
  }

  out[at] = v;
  return out;
};
/**
    Remove a value from an array.

    @param mutate Should the input array be mutated?
    @param at Index to remove.
    @param arr Array.
*/


var arraySpliceOut = function arraySpliceOut(mutate, at, arr) {
  var newLen = arr.length - 1;
  var i = 0;
  var g = 0;
  var out = arr;

  if (mutate) {
    i = g = at;
  } else {
    out = new Array(newLen);

    while (i < at) {
      out[g++] = arr[i++];
    }
  }

  ++i;

  while (i <= newLen) {
    out[g++] = arr[i++];
  }

  if (mutate) {
    out.length = newLen;
  }

  return out;
};
/**
    Insert a value into an array.

    @param mutate Should the input array be mutated?
    @param at Index to insert at.
    @param v Value to insert,
    @param arr Array.
*/


var arraySpliceIn = function arraySpliceIn(mutate, at, v, arr) {
  var len = arr.length;

  if (mutate) {
    var _i = len;

    while (_i >= at) {
      arr[_i--] = arr[_i];
    }

    arr[at] = v;
    return arr;
  }

  var i = 0,
      g = 0;
  var out = new Array(len + 1);

  while (i < at) {
    out[g++] = arr[i++];
  }

  out[at] = v;

  while (i < len) {
    out[++g] = arr[i++];
  }

  return out;
};
/* Node Structures
 ******************************************************************************/


var LEAF = 1;
var COLLISION = 2;
var INDEX = 3;
var ARRAY = 4;
/**
    Empty node.
*/

var empty = {
  __hamt_isEmpty: true
};

var isEmptyNode = function isEmptyNode(x) {
  return x === empty || x && x.__hamt_isEmpty;
};
/**
    Leaf holding a value.

    @member edit Edit of the node.
    @member hash Hash of key.
    @member key Key.
    @member value Value stored.
*/


var Leaf = function Leaf(edit, hash, key, value) {
  return {
    type: LEAF,
    edit: edit,
    hash: hash,
    key: key,
    value: value,
    _modify: Leaf__modify
  };
};
/**
    Leaf holding multiple values with the same hash but different keys.

    @member edit Edit of the node.
    @member hash Hash of key.
    @member children Array of collision children node.
*/


var Collision = function Collision(edit, hash, children) {
  return {
    type: COLLISION,
    edit: edit,
    hash: hash,
    children: children,
    _modify: Collision__modify
  };
};
/**
    Internal node with a sparse set of children.

    Uses a bitmap and array to pack children.

  @member edit Edit of the node.
    @member mask Bitmap that encode the positions of children in the array.
    @member children Array of child nodes.
*/


var IndexedNode = function IndexedNode(edit, mask, children) {
  return {
    type: INDEX,
    edit: edit,
    mask: mask,
    children: children,
    _modify: IndexedNode__modify
  };
};
/**
    Internal node with many children.

    @member edit Edit of the node.
    @member size Number of children.
    @member children Array of child nodes.
*/


var ArrayNode = function ArrayNode(edit, size, children) {
  return {
    type: ARRAY,
    edit: edit,
    size: size,
    children: children,
    _modify: ArrayNode__modify
  };
};
/**
    Is `node` a leaf node?
*/


var isLeaf = function isLeaf(node) {
  return node === empty || node.type === LEAF || node.type === COLLISION;
};
/* Internal node operations.
 ******************************************************************************/

/**
    Expand an indexed node into an array node.

  @param edit Current edit.
    @param frag Index of added child.
    @param child Added child.
    @param mask Index node mask before child added.
    @param subNodes Index node children before child added.
*/


var expand = function expand(edit, frag, child, bitmap, subNodes) {
  var arr = [];
  var bit = bitmap;
  var count = 0;

  for (var i = 0; bit; ++i) {
    if (bit & 1) arr[i] = subNodes[count++];
    bit >>>= 1;
  }

  arr[frag] = child;
  return ArrayNode(edit, count + 1, arr);
};
/**
    Collapse an array node into a indexed node.

  @param edit Current edit.
    @param count Number of elements in new array.
    @param removed Index of removed element.
    @param elements Array node children before remove.
*/


var pack = function pack(edit, count, removed, elements) {
  var children = new Array(count - 1);
  var g = 0;
  var bitmap = 0;

  for (var i = 0, len = elements.length; i < len; ++i) {
    if (i !== removed) {
      var elem = elements[i];

      if (elem && !isEmptyNode(elem)) {
        children[g++] = elem;
        bitmap |= 1 << i;
      }
    }
  }

  return IndexedNode(edit, bitmap, children);
};
/**
    Merge two leaf nodes.

    @param shift Current shift.
    @param h1 Node 1 hash.
    @param n1 Node 1.
    @param h2 Node 2 hash.
    @param n2 Node 2.
*/


var mergeLeaves = function mergeLeaves(edit, shift, h1, n1, h2, n2) {
  if (h1 === h2) return Collision(edit, h1, [n2, n1]);
  var subH1 = hashFragment(shift, h1);
  var subH2 = hashFragment(shift, h2);
  return IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), subH1 === subH2 ? [mergeLeaves(edit, shift + SIZE, h1, n1, h2, n2)] : subH1 < subH2 ? [n1, n2] : [n2, n1]);
};
/**
    Update an entry in a collision list.

    @param mutate Should mutation be used?
    @param edit Current edit.
    @param keyEq Key compare function.
    @param hash Hash of collision.
    @param list Collision list.
    @param f Update function.
    @param k Key to update.
    @param size Size ref.
*/


var updateCollisionList = function updateCollisionList(mutate, edit, keyEq, h, list, f, k, size) {
  var len = list.length;

  for (var i = 0; i < len; ++i) {
    var child = list[i];

    if (keyEq(k, child.key)) {
      var value = child.value;

      var _newValue = f(value);

      if (_newValue === value) return list;

      if (_newValue === nothing) {
        --size.value;
        return arraySpliceOut(mutate, i, list);
      }

      return arrayUpdate(mutate, i, Leaf(edit, h, k, _newValue), list);
    }
  }

  var newValue = f();
  if (newValue === nothing) return list;
  ++size.value;
  return arrayUpdate(mutate, len, Leaf(edit, h, k, newValue), list);
};

var canEditNode = function canEditNode(edit, node) {
  return edit === node.edit;
};
/* Editing
 ******************************************************************************/


var Leaf__modify = function Leaf__modify(edit, keyEq, shift, f, h, k, size) {
  if (keyEq(k, this.key)) {
    var _v = f(this.value);

    if (_v === this.value) return this;else if (_v === nothing) {
      --size.value;
      return empty;
    }

    if (canEditNode(edit, this)) {
      this.value = _v;
      return this;
    }

    return Leaf(edit, h, k, _v);
  }

  var v = f();
  if (v === nothing) return this;
  ++size.value;
  return mergeLeaves(edit, shift, this.hash, this, h, Leaf(edit, h, k, v));
};

var Collision__modify = function Collision__modify(edit, keyEq, shift, f, h, k, size) {
  if (h === this.hash) {
    var canEdit = canEditNode(edit, this);
    var list = updateCollisionList(canEdit, edit, keyEq, this.hash, this.children, f, k, size);
    if (list === this.children) return this;
    return list.length > 1 ? Collision(edit, this.hash, list) : list[0]; // collapse single element collision list
  }

  var v = f();
  if (v === nothing) return this;
  ++size.value;
  return mergeLeaves(edit, shift, this.hash, this, h, Leaf(edit, h, k, v));
};

var IndexedNode__modify = function IndexedNode__modify(edit, keyEq, shift, f, h, k, size) {
  var mask = this.mask;
  var children = this.children;
  var frag = hashFragment(shift, h);
  var bit = toBitmap(frag);
  var indx = fromBitmap(mask, bit);
  var exists = mask & bit;
  var current = exists ? children[indx] : empty;

  var child = current._modify(edit, keyEq, shift + SIZE, f, h, k, size);

  if (current === child) return this;
  var canEdit = canEditNode(edit, this);
  var bitmap = mask;
  var newChildren = void 0;

  if (exists && isEmptyNode(child)) {
    // remove
    bitmap &= ~bit;
    if (!bitmap) return empty;
    if (children.length <= 2 && isLeaf(children[indx ^ 1])) return children[indx ^ 1]; // collapse

    newChildren = arraySpliceOut(canEdit, indx, children);
  } else if (!exists && !isEmptyNode(child)) {
    // add
    if (children.length >= MAX_INDEX_NODE) return expand(edit, frag, child, mask, children);
    bitmap |= bit;
    newChildren = arraySpliceIn(canEdit, indx, child, children);
  } else {
    // modify
    newChildren = arrayUpdate(canEdit, indx, child, children);
  }

  if (canEdit) {
    this.mask = bitmap;
    this.children = newChildren;
    return this;
  }

  return IndexedNode(edit, bitmap, newChildren);
};

var ArrayNode__modify = function ArrayNode__modify(edit, keyEq, shift, f, h, k, size) {
  var count = this.size;
  var children = this.children;
  var frag = hashFragment(shift, h);
  var child = children[frag];

  var newChild = (child || empty)._modify(edit, keyEq, shift + SIZE, f, h, k, size);

  if (child === newChild) return this;
  var canEdit = canEditNode(edit, this);
  var newChildren = void 0;

  if (isEmptyNode(child) && !isEmptyNode(newChild)) {
    // add
    ++count;
    newChildren = arrayUpdate(canEdit, frag, newChild, children);
  } else if (!isEmptyNode(child) && isEmptyNode(newChild)) {
    // remove
    --count;
    if (count <= MIN_ARRAY_NODE) return pack(edit, count, frag, children);
    newChildren = arrayUpdate(canEdit, frag, empty, children);
  } else {
    // modify
    newChildren = arrayUpdate(canEdit, frag, newChild, children);
  }

  if (canEdit) {
    this.size = count;
    this.children = newChildren;
    return this;
  }

  return ArrayNode(edit, count, newChildren);
};

empty._modify = function (edit, keyEq, shift, f, h, k, size) {
  var v = f();
  if (v === nothing) return empty;
  ++size.value;
  return Leaf(edit, h, k, v);
};
/*
 ******************************************************************************/


function Map(editable, edit, config, root, size) {
  this._editable = editable;
  this._edit = edit;
  this._config = config;
  this._root = root;
  this._size = size;
}

Map.prototype.setTree = function (newRoot, newSize) {
  if (this._editable) {
    this._root = newRoot;
    this._size = newSize;
    return this;
  }

  return newRoot === this._root ? this : new Map(this._editable, this._edit, this._config, newRoot, newSize);
};
/* Queries
 ******************************************************************************/

/**
    Lookup the value for `key` in `map` using a custom `hash`.

    Returns the value or `alt` if none.
*/


var tryGetHash = hamt.tryGetHash = function (alt, hash, key, map) {
  var node = map._root;
  var shift = 0;
  var keyEq = map._config.keyEq;

  while (true) {
    switch (node.type) {
      case LEAF:
        {
          return keyEq(key, node.key) ? node.value : alt;
        }

      case COLLISION:
        {
          if (hash === node.hash) {
            var children = node.children;

            for (var i = 0, len = children.length; i < len; ++i) {
              var child = children[i];
              if (keyEq(key, child.key)) return child.value;
            }
          }

          return alt;
        }

      case INDEX:
        {
          var frag = hashFragment(shift, hash);
          var bit = toBitmap(frag);

          if (node.mask & bit) {
            node = node.children[fromBitmap(node.mask, bit)];
            shift += SIZE;
            break;
          }

          return alt;
        }

      case ARRAY:
        {
          node = node.children[hashFragment(shift, hash)];

          if (node) {
            shift += SIZE;
            break;
          }

          return alt;
        }

      default:
        return alt;
    }
  }
};

Map.prototype.tryGetHash = function (alt, hash, key) {
  return tryGetHash(alt, hash, key, this);
};
/**
    Lookup the value for `key` in `map` using internal hash function.

    @see `tryGetHash`
*/


var tryGet = hamt.tryGet = function (alt, key, map) {
  return tryGetHash(alt, map._config.hash(key), key, map);
};

Map.prototype.tryGet = function (alt, key) {
  return tryGet(alt, key, this);
};
/**
    Lookup the value for `key` in `map` using a custom `hash`.

    Returns the value or `undefined` if none.
*/


var getHash = hamt.getHash = function (hash, key, map) {
  return tryGetHash(undefined, hash, key, map);
};

Map.prototype.getHash = function (hash, key) {
  return getHash(hash, key, this);
};
/**
    Lookup the value for `key` in `map` using internal hash function.

    @see `get`
*/


hamt.get = function (key, map) {
  return tryGetHash(undefined, map._config.hash(key), key, map);
};

Map.prototype.get = function (key, alt) {
  return tryGet(alt, key, this);
};
/**
    Does an entry exist for `key` in `map`? Uses custom `hash`.
*/


var hasHash = hamt.has = function (hash, key, map) {
  return tryGetHash(nothing, hash, key, map) !== nothing;
};

Map.prototype.hasHash = function (hash, key) {
  return hasHash(hash, key, this);
};
/**
    Does an entry exist for `key` in `map`? Uses internal hash function.
*/


var has = hamt.has = function (key, map) {
  return hasHash(map._config.hash(key), key, map);
};

Map.prototype.has = function (key) {
  return has(key, this);
};

var defKeyCompare = function defKeyCompare(x, y) {
  return x === y;
};
/**
    Create an empty map.

    @param config Configuration.
*/


hamt.make = function (config) {
  return new Map(0, 0, {
    keyEq: config && config.keyEq || defKeyCompare,
    hash: config && config.hash || hash
  }, empty, 0);
};
/**
    Empty map.
*/


hamt.empty = hamt.make();
/**
    Does `map` contain any elements?
*/

var isEmpty = hamt.isEmpty = function (map) {
  return map && !!isEmptyNode(map._root);
};

Map.prototype.isEmpty = function () {
  return isEmpty(this);
};
/* Updates
 ******************************************************************************/

/**
    Alter the value stored for `key` in `map` using function `f` using
    custom hash.

    `f` is invoked with the current value for `k` if it exists,
    or no arguments if no such value exists. `modify` will always either
    update or insert a value into the map.

    Returns a map with the modified value. Does not alter `map`.
*/


var modifyHash = hamt.modifyHash = function (f, hash, key, map) {
  var size = {
    value: map._size
  };

  var newRoot = map._root._modify(map._editable ? map._edit : NaN, map._config.keyEq, 0, f, hash, key, size);

  return map.setTree(newRoot, size.value);
};

Map.prototype.modifyHash = function (hash, key, f) {
  return modifyHash(f, hash, key, this);
};
/**
    Alter the value stored for `key` in `map` using function `f` using
    internal hash function.

    @see `modifyHash`
*/


var modify = hamt.modify = function (f, key, map) {
  return modifyHash(f, map._config.hash(key), key, map);
};

Map.prototype.modify = function (key, f) {
  return modify(f, key, this);
};
/**
    Store `value` for `key` in `map` using custom `hash`.

    Returns a map with the modified value. Does not alter `map`.
*/


var setHash = hamt.setHash = function (hash, key, value, map) {
  return modifyHash(constant(value), hash, key, map);
};

Map.prototype.setHash = function (hash, key, value) {
  return setHash(hash, key, value, this);
};
/**
    Store `value` for `key` in `map` using internal hash function.

    @see `setHash`
*/


var set = hamt.set = function (key, value, map) {
  return setHash(map._config.hash(key), key, value, map);
};

Map.prototype.set = function (key, value) {
  return set(key, value, this);
};
/**
    Remove the entry for `key` in `map`.

    Returns a map with the value removed. Does not alter `map`.
*/


var del = constant(nothing);

var removeHash = hamt.removeHash = function (hash, key, map) {
  return modifyHash(del, hash, key, map);
};

Map.prototype.removeHash = Map.prototype.deleteHash = function (hash, key) {
  return removeHash(hash, key, this);
};
/**
    Remove the entry for `key` in `map` using internal hash function.

    @see `removeHash`
*/


var remove = hamt.remove = function (key, map) {
  return removeHash(map._config.hash(key), key, map);
};

Map.prototype.remove = Map.prototype.delete = function (key) {
  return remove(key, this);
};
/* Mutation
 ******************************************************************************/

/**
    Mark `map` as mutable.
 */


var beginMutation = hamt.beginMutation = function (map) {
  return new Map(map._editable + 1, map._edit + 1, map._config, map._root, map._size);
};

Map.prototype.beginMutation = function () {
  return beginMutation(this);
};
/**
    Mark `map` as immutable.
 */


var endMutation = hamt.endMutation = function (map) {
  map._editable = map._editable && map._editable - 1;
  return map;
};

Map.prototype.endMutation = function () {
  return endMutation(this);
};
/**
    Mutate `map` within the context of `f`.
    @param f
    @param map HAMT
*/


var mutate = hamt.mutate = function (f, map) {
  var transient = beginMutation(map);
  f(transient);
  return endMutation(transient);
};

Map.prototype.mutate = function (f) {
  return mutate(f, this);
};
/* Traversal
 ******************************************************************************/

/**
    Apply a continuation.
*/


var appk = function appk(k) {
  return k && lazyVisitChildren(k[0], k[1], k[2], k[3], k[4]);
};
/**
    Recursively visit all values stored in an array of nodes lazily.
*/


var lazyVisitChildren = function lazyVisitChildren(len, children, i, f, k) {
  while (i < len) {
    var child = children[i++];
    if (child && !isEmptyNode(child)) return lazyVisit(child, f, [len, children, i, f, k]);
  }

  return appk(k);
};
/**
    Recursively visit all values stored in `node` lazily.
*/


var lazyVisit = function lazyVisit(node, f, k) {
  switch (node.type) {
    case LEAF:
      return {
        value: f(node),
        rest: k
      };

    case COLLISION:
    case ARRAY:
    case INDEX:
      var children = node.children;
      return lazyVisitChildren(children.length, children, 0, f, k);

    default:
      return appk(k);
  }
};

var DONE = {
  done: true
};
/**
    Javascript iterator over a map.
*/

function MapIterator(v) {
  this.v = v;
}

MapIterator.prototype.next = function () {
  if (!this.v) return DONE;
  var v0 = this.v;
  this.v = appk(v0.rest);
  return v0;
};

MapIterator.prototype[Symbol.iterator] = function () {
  return this;
};
/**
    Lazily visit each value in map with function `f`.
*/


var visit = function visit(map, f) {
  return new MapIterator(lazyVisit(map._root, f));
};
/**
    Get a Javascsript iterator of `map`.

    Iterates over `[key, value]` arrays.
*/


var buildPairs = function buildPairs(x) {
  return [x.key, x.value];
};

var entries = hamt.entries = function (map) {
  return visit(map, buildPairs);
};

Map.prototype.entries = Map.prototype[Symbol.iterator] = function () {
  return entries(this);
};
/**
    Get array of all keys in `map`.

    Order is not guaranteed.
*/


var buildKeys = function buildKeys(x) {
  return x.key;
};

var keys = hamt.keys = function (map) {
  return visit(map, buildKeys);
};

Map.prototype.keys = function () {
  return keys(this);
};
/**
    Get array of all values in `map`.

    Order is not guaranteed, duplicates are preserved.
*/


var buildValues = function buildValues(x) {
  return x.value;
};

var values = hamt.values = Map.prototype.values = function (map) {
  return visit(map, buildValues);
};

Map.prototype.values = function () {
  return values(this);
};
/* Fold
 ******************************************************************************/

/**
    Visit every entry in the map, aggregating data.

    Order of nodes is not guaranteed.

    @param f Function mapping accumulated value, value, and key to new value.
    @param z Starting value.
    @param m HAMT
*/


var fold = hamt.fold = function (f, z, m) {
  var root = m._root;
  if (root.type === LEAF) return f(z, root.value, root.key);
  var toVisit = [root.children];
  var children = void 0;

  while (children = toVisit.pop()) {
    for (var i = 0, len = children.length; i < len;) {
      var child = children[i++];

      if (child && child.type) {
        if (child.type === LEAF) z = f(z, child.value, child.key);else toVisit.push(child.children);
      }
    }
  }

  return z;
};

Map.prototype.fold = function (f, z) {
  return fold(f, z, this);
};
/**
    Visit every entry in the map, aggregating data.

    Order of nodes is not guaranteed.

    @param f Function invoked with value and key
    @param map HAMT
*/


var forEach = hamt.forEach = function (f, map) {
  return fold(function (_, value, key) {
    return f(value, key, map);
  }, null, map);
};

Map.prototype.forEach = function (f) {
  return forEach(f, this);
};
/* Aggregate
 ******************************************************************************/

/**
    Get the number of entries in `map`.
*/


var count = hamt.count = function (map) {
  return map._size;
};

Map.prototype.count = function () {
  return count(this);
};

Object.defineProperty(Map.prototype, 'size', {
  get: Map.prototype.count
});
/* Export
 ******************************************************************************/

if ( module.exports) {
  module.exports = hamt;
} else {
  undefined.hamt = hamt;
}
});

class BuiltInMap {
  constructor(existing) {
    _defineProperty(this, "_map", void 0);

    this._map = new Map(existing === null || existing === void 0 ? void 0 : existing.entries());
  }

  keys() {
    return this._map.keys();
  }

  entries() {
    return this._map.entries();
  }

  get(k) {
    return this._map.get(k);
  }

  has(k) {
    return this._map.has(k);
  }

  set(k, v) {
    this._map.set(k, v);

    return this;
  }

  delete(k) {
    this._map.delete(k);

    return this;
  }

  clone() {
    return persistentMap(this);
  }

  toMap() {
    return new Map(this._map);
  }

}

class HashArrayMappedTrieMap {
  // Because hamt.empty is not a function there is no way to introduce type
  // parameters on it, so empty is typed as HAMTPlusMap<string, mixed>.
  // $FlowIssue
  constructor(existing) {
    _defineProperty(this, "_hamt", hamt_1.empty.beginMutation());

    if (existing instanceof HashArrayMappedTrieMap) {
      const h = existing._hamt.endMutation();

      existing._hamt = h.beginMutation();
      this._hamt = h.beginMutation();
    } else if (existing) {
      for (const [k, v] of existing.entries()) {
        this._hamt.set(k, v);
      }
    }
  }

  keys() {
    return this._hamt.keys();
  }

  entries() {
    return this._hamt.entries();
  }

  get(k) {
    return this._hamt.get(k);
  }

  has(k) {
    return this._hamt.has(k);
  }

  set(k, v) {
    this._hamt.set(k, v);

    return this;
  }

  delete(k) {
    this._hamt.delete(k);

    return this;
  }

  clone() {
    return persistentMap(this);
  }

  toMap() {
    return new Map(this._hamt);
  }

}

function persistentMap(existing) {
  if (Recoil_gkx_1('recoil_hamt_2020')) {
    return new HashArrayMappedTrieMap(existing);
  } else {
    return new BuiltInMap(existing);
  }
}

var Recoil_PersistentMap = {
  persistentMap
};

var Recoil_PersistentMap_1 = Recoil_PersistentMap.persistentMap;

var Recoil_PersistentMap$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  persistentMap: Recoil_PersistentMap_1
});

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */
/**
 * Returns a set containing all of the values from the first set that are not
 * present in any of the subsequent sets.
 *
 * Note: this is written procedurally (i.e., without filterSet) for performant
 * use in tight loops.
 */

function differenceSets(set, ...setsWithValuesToRemove) {
  const ret = new Set();

  FIRST: for (const value of set) {
    for (const otherSet of setsWithValuesToRemove) {
      if (otherSet.has(value)) {
        continue FIRST;
      }
    }

    ret.add(value);
  }

  return ret;
}

var Recoil_differenceSets = differenceSets;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */
/**
 * Returns a new Map object with the same keys as the original, but with the
 * values replaced with the output of the given callback function.
 */

function mapMap(map, callback) {
  const result = new Map();
  map.forEach((value, key) => {
    result.set(key, callback(value, key));
  });
  return result;
}

var Recoil_mapMap = mapMap;

function graph() {
  return {
    nodeDeps: new Map(),
    nodeToNodeSubscriptions: new Map()
  };
}

function cloneGraph(graph) {
  return {
    nodeDeps: Recoil_mapMap(graph.nodeDeps, s => new Set(s)),
    nodeToNodeSubscriptions: Recoil_mapMap(graph.nodeToNodeSubscriptions, s => new Set(s))
  };
} // Note that this overwrites the deps of existing nodes, rather than unioning
// the new deps with the old deps.


function mergeDependencyMapIntoGraph(deps, graph, // If olderGraph is given then we will not overwrite changes made to the given
// graph compared with olderGraph:
olderGraph) {
  const {
    nodeDeps,
    nodeToNodeSubscriptions
  } = graph;
  deps.forEach((upstreams, downstream) => {
    const existingUpstreams = nodeDeps.get(downstream);

    if (existingUpstreams && olderGraph && existingUpstreams !== olderGraph.nodeDeps.get(downstream)) {
      return;
    } // Update nodeDeps:


    nodeDeps.set(downstream, new Set(upstreams)); // Add new deps to nodeToNodeSubscriptions:

    const addedUpstreams = existingUpstreams == null ? upstreams : Recoil_differenceSets(upstreams, existingUpstreams);
    addedUpstreams.forEach(upstream => {
      if (!nodeToNodeSubscriptions.has(upstream)) {
        nodeToNodeSubscriptions.set(upstream, new Set());
      }

      const existing = Recoil_nullthrows(nodeToNodeSubscriptions.get(upstream));
      existing.add(downstream);
    }); // Remove removed deps from nodeToNodeSubscriptions:

    if (existingUpstreams) {
      const removedUpstreams = Recoil_differenceSets(existingUpstreams, upstreams);
      removedUpstreams.forEach(upstream => {
        if (!nodeToNodeSubscriptions.has(upstream)) {
          return;
        }

        const existing = Recoil_nullthrows(nodeToNodeSubscriptions.get(upstream));
        existing.delete(downstream);

        if (existing.size === 0) {
          nodeToNodeSubscriptions.delete(upstream);
        }
      });
    }
  });
}

function saveDependencyMapToStore(dependencyMap, store, version) {
  var _storeState$nextTree, _storeState$previousT, _storeState$previousT2, _storeState$previousT3;

  const storeState = store.getState();

  if (!(version === storeState.currentTree.version || version === ((_storeState$nextTree = storeState.nextTree) === null || _storeState$nextTree === void 0 ? void 0 : _storeState$nextTree.version) || version === ((_storeState$previousT = storeState.previousTree) === null || _storeState$previousT === void 0 ? void 0 : _storeState$previousT.version))) ; // Merge the dependencies discovered into the store's dependency map
  // for the version that was read:


  const graph = store.getGraph(version);
  mergeDependencyMapIntoGraph(dependencyMap, graph); // If this version is not the latest version, also write these dependencies
  // into later versions if they don't already have their own:

  if (version === ((_storeState$previousT2 = storeState.previousTree) === null || _storeState$previousT2 === void 0 ? void 0 : _storeState$previousT2.version)) {
    const currentGraph = store.getGraph(storeState.currentTree.version);
    mergeDependencyMapIntoGraph(dependencyMap, currentGraph, graph);
  }

  if (version === ((_storeState$previousT3 = storeState.previousTree) === null || _storeState$previousT3 === void 0 ? void 0 : _storeState$previousT3.version) || version === storeState.currentTree.version) {
    var _storeState$nextTree2;

    const nextVersion = (_storeState$nextTree2 = storeState.nextTree) === null || _storeState$nextTree2 === void 0 ? void 0 : _storeState$nextTree2.version;

    if (nextVersion !== undefined) {
      const nextGraph = store.getGraph(nextVersion);
      mergeDependencyMapIntoGraph(dependencyMap, nextGraph, graph);
    }
  }
}

function mergeDepsIntoDependencyMap(from, into) {
  from.forEach((upstreamDeps, downstreamNode) => {
    if (!into.has(downstreamNode)) {
      into.set(downstreamNode, new Set());
    }

    const deps = Recoil_nullthrows(into.get(downstreamNode));
    upstreamDeps.forEach(dep => deps.add(dep));
  });
}

function addToDependencyMap(downstream, upstream, dependencyMap) {
  if (!dependencyMap.has(downstream)) {
    dependencyMap.set(downstream, new Set());
  }

  Recoil_nullthrows(dependencyMap.get(downstream)).add(upstream);
}

var Recoil_Graph = {
  addToDependencyMap,
  cloneGraph,
  graph,
  mergeDepsIntoDependencyMap,
  saveDependencyMapToStore
};

const {
  persistentMap: persistentMap$1
} = Recoil_PersistentMap$1;

const {
  graph: graph$1
} = Recoil_Graph;

let nextTreeStateVersion = 0;

const getNextTreeStateVersion = () => nextTreeStateVersion++;

function makeEmptyTreeState() {
  const version = getNextTreeStateVersion();
  return {
    version,
    stateID: version,
    transactionMetadata: {},
    dirtyAtoms: new Set(),
    atomValues: persistentMap$1(),
    nonvalidatedAtoms: persistentMap$1()
  };
}

function makeEmptyStoreState() {
  const currentTree = makeEmptyTreeState();
  return {
    currentTree,
    nextTree: null,
    previousTree: null,
    commitDepth: 0,
    knownAtoms: new Set(),
    knownSelectors: new Set(),
    transactionSubscriptions: new Map(),
    nodeTransactionSubscriptions: new Map(),
    nodeToComponentSubscriptions: new Map(),
    queuedComponentCallbacks_DEPRECATED: [],
    suspendedComponentResolvers: new Set(),
    graphsByVersion: new Map().set(currentTree.version, graph$1()),
    versionsUsedByComponent: new Map(),
    retention: {
      referenceCounts: new Map(),
      nodesRetainedByZone: new Map(),
      retainablesToCheckForRelease: new Set()
    },
    nodeCleanupFunctions: new Map()
  };
}

var Recoil_State = {
  makeEmptyTreeState,
  makeEmptyStoreState,
  getNextTreeStateVersion
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

function unionSets(...sets) {
  const result = new Set();

  for (const set of sets) {
    for (const value of set) {
      result.add(value);
    }
  }

  return result;
}

var Recoil_unionSets = unionSets;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Utilities for working with built-in Maps and Sets without mutating them.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

function setByAddingToSet(set, v) {
  const next = new Set(set);
  next.add(v);
  return next;
}

function setByDeletingFromSet(set, v) {
  const next = new Set(set);
  next.delete(v);
  return next;
}

function mapBySettingInMap(map, k, v) {
  const next = new Map(map);
  next.set(k, v);
  return next;
}

function mapByUpdatingInMap(map, k, updater) {
  const next = new Map(map);
  next.set(k, updater(next.get(k)));
  return next;
}

function mapByDeletingFromMap(map, k) {
  const next = new Map(map);
  next.delete(k);
  return next;
}

function mapByDeletingMultipleFromMap(map, ks) {
  const next = new Map(map);
  ks.forEach(k => next.delete(k));
  return next;
}

var Recoil_CopyOnWrite = {
  setByAddingToSet,
  setByDeletingFromSet,
  mapBySettingInMap,
  mapByUpdatingInMap,
  mapByDeletingFromMap,
  mapByDeletingMultipleFromMap
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */
/**
 * Creates a new iterable whose output is generated by passing the input
 * iterable's values through the filter function.
 */

function* filterIterable(iterable, predicate) {
  // Use generator to create iterable/iterator
  let index = 0;

  for (const value of iterable) {
    if (predicate(value, index++)) {
      yield value;
    }
  }
}

var Recoil_filterIterable = filterIterable;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

class RetentionZone {}

function retentionZone() {
  return new RetentionZone();
}

var Recoil_RetentionZone = {
  RetentionZone,
  retentionZone
};

const {
  setByAddingToSet: setByAddingToSet$1
} = Recoil_CopyOnWrite;







const {
  getNode: getNode$1,
  getNodeMaybe: getNodeMaybe$1,
  recoilValuesForKeys: recoilValuesForKeys$1
} = Recoil_Node;

const {
  RetentionZone: RetentionZone$1
} = Recoil_RetentionZone; // flowlint-next-line unclear-type:off


const emptySet = Object.freeze(new Set());

class ReadOnlyRecoilValueError extends Error {}

function initializeRetentionForNode(store, nodeKey, retainedBy) {
  if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
    return () => undefined;
  }

  const {
    nodesRetainedByZone
  } = store.getState().retention;

  function addToZone(zone) {
    let set = nodesRetainedByZone.get(zone);

    if (!set) {
      nodesRetainedByZone.set(zone, set = new Set());
    }

    set.add(nodeKey);
  }

  if (retainedBy instanceof RetentionZone$1) {
    addToZone(retainedBy);
  } else if (Array.isArray(retainedBy)) {
    for (const zone of retainedBy) {
      addToZone(zone);
    }
  }

  return () => {
    if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
      return;
    }

    const nodesRetainedByZone = store.getState().retention.nodesRetainedByZone;

    function deleteFromZone(zone) {
      const set = nodesRetainedByZone.get(zone);

      if (set) {
        set.delete(nodeKey);
      }

      if (set && set.size === 0) {
        nodesRetainedByZone.delete(zone);
      }
    }

    if (retainedBy instanceof RetentionZone$1) {
      deleteFromZone(retainedBy);
    } else if (Array.isArray(retainedBy)) {
      for (const zone of retainedBy) {
        deleteFromZone(zone);
      }
    }
  };
}

function initializeNodeIfNewToStore(store, treeState, key, trigger) {
  const storeState = store.getState();

  if (storeState.nodeCleanupFunctions.has(key)) {
    return;
  }

  const config = getNode$1(key);
  const retentionCleanup = initializeRetentionForNode(store, key, config.retainedBy);
  const nodeCleanup = config.init(store, treeState, trigger);
  storeState.nodeCleanupFunctions.set(key, () => {
    nodeCleanup();
    retentionCleanup();
  });
}

function cleanUpNode(store, key) {
  var _state$nodeCleanupFun;

  const state = store.getState();
  (_state$nodeCleanupFun = state.nodeCleanupFunctions.get(key)) === null || _state$nodeCleanupFun === void 0 ? void 0 : _state$nodeCleanupFun();
  state.nodeCleanupFunctions.delete(key);
} // Get the current value loadable of a node and update the state.
// Update dependencies and subscriptions for selectors.
// Update saved value validation for atoms.


function getNodeLoadable(store, state, key) {
  initializeNodeIfNewToStore(store, state, key, 'get');
  return getNode$1(key).get(store, state);
} // Peek at the current value loadable for a node without any evaluation or state change


function peekNodeLoadable(store, state, key) {
  return getNode$1(key).peek(store, state);
} // Write value directly to state bypassing the Node interface as the node
// definitions may not have been loaded yet when processing the initial snapshot.


function setUnvalidatedAtomValue_DEPRECATED(state, key, newValue) {
  var _node$invalidate;

  const node = getNodeMaybe$1(key);
  node === null || node === void 0 ? void 0 : (_node$invalidate = node.invalidate) === null || _node$invalidate === void 0 ? void 0 : _node$invalidate.call(node, state);
  return { ...state,
    atomValues: state.atomValues.clone().delete(key),
    nonvalidatedAtoms: state.nonvalidatedAtoms.clone().set(key, newValue),
    dirtyAtoms: setByAddingToSet$1(state.dirtyAtoms, key)
  };
} // Return the discovered dependencies and values to be written by setting
// a node value. (Multiple values may be written due to selectors getting to
// set upstreams; deps may be discovered because of reads in updater functions.)


function setNodeValue(store, state, key, newValue) {
  const node = getNode$1(key);

  if (node.set == null) {
    throw new ReadOnlyRecoilValueError(`Attempt to set read-only RecoilValue: ${key}`);
  }

  const set = node.set; // so flow doesn't lose the above refinement.

  initializeNodeIfNewToStore(store, state, key, 'set');
  return set(store, state, newValue);
}

function peekNodeInfo(store, state, key) {
  var _graph$nodeDeps$get, _storeState$nodeToCom, _storeState$nodeToCom2;

  const storeState = store.getState();
  const graph = store.getGraph(state.version);
  const type = storeState.knownAtoms.has(key) ? 'atom' : storeState.knownSelectors.has(key) ? 'selector' : undefined;
  const downstreamNodes = Recoil_filterIterable(getDownstreamNodes(store, state, new Set([key])), nodeKey => nodeKey !== key);
  return {
    loadable: peekNodeLoadable(store, state, key),
    isActive: storeState.knownAtoms.has(key) || storeState.knownSelectors.has(key),
    isSet: type === 'selector' ? false : state.atomValues.has(key),
    isModified: state.dirtyAtoms.has(key),
    type,
    // Report current dependencies.  If the node hasn't been evaluated, then
    // dependencies may be missing based on the current state.
    deps: recoilValuesForKeys$1((_graph$nodeDeps$get = graph.nodeDeps.get(key)) !== null && _graph$nodeDeps$get !== void 0 ? _graph$nodeDeps$get : []),
    // Reportsall "current" subscribers.  Evaluating other nodes or
    // previous in-progress async evaluations may introduce new subscribers.
    subscribers: {
      nodes: recoilValuesForKeys$1(downstreamNodes),
      components: Recoil_mapIterable((_storeState$nodeToCom = (_storeState$nodeToCom2 = storeState.nodeToComponentSubscriptions.get(key)) === null || _storeState$nodeToCom2 === void 0 ? void 0 : _storeState$nodeToCom2.values()) !== null && _storeState$nodeToCom !== void 0 ? _storeState$nodeToCom : [], ([name]) => ({
        name
      }))
    }
  };
} // Find all of the recursively dependent nodes


function getDownstreamNodes(store, state, keys) {
  const visitedNodes = new Set();
  const visitingNodes = Array.from(keys);
  const graph = store.getGraph(state.version);

  for (let key = visitingNodes.pop(); key; key = visitingNodes.pop()) {
    var _graph$nodeToNodeSubs;

    visitedNodes.add(key);
    const subscribedNodes = (_graph$nodeToNodeSubs = graph.nodeToNodeSubscriptions.get(key)) !== null && _graph$nodeToNodeSubs !== void 0 ? _graph$nodeToNodeSubs : emptySet;

    for (const downstreamNode of subscribedNodes) {
      if (!visitedNodes.has(downstreamNode)) {
        visitingNodes.push(downstreamNode);
      }
    }
  }

  return visitedNodes;
}

var Recoil_FunctionalCore = {
  getNodeLoadable,
  peekNodeLoadable,
  setNodeValue,
  cleanUpNode,
  setUnvalidatedAtomValue_DEPRECATED,
  peekNodeInfo,
  getDownstreamNodes,
  initializeNodeIfNewToStore
};

const {
  getDownstreamNodes: getDownstreamNodes$1,
  getNodeLoadable: getNodeLoadable$1,
  setNodeValue: setNodeValue$1
} = Recoil_FunctionalCore;

const {
  getNodeMaybe: getNodeMaybe$2
} = Recoil_Node;

const {
  DefaultValue: DefaultValue$1,
  RecoilValueNotReady: RecoilValueNotReady$1
} = Recoil_Node;

const {
  AbstractRecoilValue: AbstractRecoilValue$1,
  RecoilState: RecoilState$1,
  RecoilValueReadOnly: RecoilValueReadOnly$1,
  isRecoilValue: isRecoilValue$1
} = Recoil_RecoilValue$1;

function getRecoilValueAsLoadable(store, {
  key
}, treeState = store.getState().currentTree) {
  var _storeState$nextTree, _storeState$previousT;

  // Reading from an older tree can cause bugs because the dependencies that we
  // discover during the read are lost.
  const storeState = store.getState();

  if (!(treeState.version === storeState.currentTree.version || treeState.version === ((_storeState$nextTree = storeState.nextTree) === null || _storeState$nextTree === void 0 ? void 0 : _storeState$nextTree.version) || treeState.version === ((_storeState$previousT = storeState.previousTree) === null || _storeState$previousT === void 0 ? void 0 : _storeState$previousT.version))) ;

  const loadable = getNodeLoadable$1(store, treeState, key);

  if (loadable.state === 'loading') {
    loadable.contents.catch(() => {
      /**
       * HACK: intercept thrown error here to prevent an uncaught promise exception. Ideally this would happen closer to selector
       * execution (perhaps introducing a new ERROR class to be resolved by async selectors that are in an error state)
       */
      return;
    });
  }

  return loadable;
}

function applyAtomValueWrites(atomValues, writes) {
  const result = atomValues.clone();
  writes.forEach((v, k) => {
    if (v.state === 'hasValue' && v.contents instanceof DefaultValue$1) {
      result.delete(k);
    } else {
      result.set(k, v);
    }
  });
  return result;
}

function valueFromValueOrUpdater(store, state, {
  key
}, valueOrUpdater) {
  if (typeof valueOrUpdater === 'function') {
    // Updater form: pass in the current value. Throw if the current value
    // is unavailable (namely when updating an async selector that's
    // pending or errored):
    const current = getNodeLoadable$1(store, state, key);

    if (current.state === 'loading') {
      throw new RecoilValueNotReady$1(key);
    } else if (current.state === 'hasError') {
      throw current.contents;
    } // T itself may be a function, so our refinement is not sufficient:


    return valueOrUpdater(current.contents); // flowlint-line unclear-type:off
  } else {
    return valueOrUpdater;
  }
}

function applyAction(store, state, action) {
  if (action.type === 'set') {
    const {
      recoilValue,
      valueOrUpdater
    } = action;
    const newValue = valueFromValueOrUpdater(store, state, recoilValue, valueOrUpdater);
    const writes = setNodeValue$1(store, state, recoilValue.key, newValue);

    for (const [key, loadable] of writes.entries()) {
      writeLoadableToTreeState(state, key, loadable);
    }
  } else if (action.type === 'setLoadable') {
    const {
      recoilValue: {
        key
      },
      loadable
    } = action;
    writeLoadableToTreeState(state, key, loadable);
  } else if (action.type === 'markModified') {
    const {
      recoilValue: {
        key
      }
    } = action;
    state.dirtyAtoms.add(key);
  } else if (action.type === 'setUnvalidated') {
    var _node$invalidate;

    // Write value directly to state bypassing the Node interface as the node
    // definitions may not have been loaded yet when processing the initial snapshot.
    const {
      recoilValue: {
        key
      },
      unvalidatedValue
    } = action;
    const node = getNodeMaybe$2(key);
    node === null || node === void 0 ? void 0 : (_node$invalidate = node.invalidate) === null || _node$invalidate === void 0 ? void 0 : _node$invalidate.call(node, state);
    state.atomValues.delete(key);
    state.nonvalidatedAtoms.set(key, unvalidatedValue);
    state.dirtyAtoms.add(key);
  } else {
    Recoil_recoverableViolation(`Unknown action ${action.type}`);
  }
}

function writeLoadableToTreeState(state, key, loadable) {
  if (loadable.state === 'hasValue' && loadable.contents instanceof DefaultValue$1) {
    state.atomValues.delete(key);
  } else {
    state.atomValues.set(key, loadable);
  }

  state.dirtyAtoms.add(key);
  state.nonvalidatedAtoms.delete(key);
}

function applyActionsToStore(store, actions) {
  store.replaceState(state => {
    const newState = copyTreeState(state);

    for (const action of actions) {
      applyAction(store, newState, action);
    }

    invalidateDownstreams(store, newState);
    return newState;
  });
}

function queueOrPerformStateUpdate(store, action) {
  if (batchStack.length) {
    const actionsByStore = batchStack[batchStack.length - 1];
    let actions = actionsByStore.get(store);

    if (!actions) {
      actionsByStore.set(store, actions = []);
    }

    actions.push(action);
  } else {
    applyActionsToStore(store, [action]);
  }
}

const batchStack = [];

function batchStart() {
  const actionsByStore = new Map();
  batchStack.push(actionsByStore);
  return () => {
    for (const [store, actions] of actionsByStore) {
      applyActionsToStore(store, actions);
    }

    batchStack.pop();
  };
}

function copyTreeState(state) {
  return { ...state,
    atomValues: state.atomValues.clone(),
    nonvalidatedAtoms: state.nonvalidatedAtoms.clone(),
    dirtyAtoms: new Set(state.dirtyAtoms)
  };
}

function invalidateDownstreams(store, state) {
  // Inform any nodes that were changed or downstream of changes so that they
  // can clear out any caches as needed due to the update:
  const downstreams = getDownstreamNodes$1(store, state, state.dirtyAtoms);

  for (const key of downstreams) {
    var _getNodeMaybe, _getNodeMaybe$invalid;

    (_getNodeMaybe = getNodeMaybe$2(key)) === null || _getNodeMaybe === void 0 ? void 0 : (_getNodeMaybe$invalid = _getNodeMaybe.invalidate) === null || _getNodeMaybe$invalid === void 0 ? void 0 : _getNodeMaybe$invalid.call(_getNodeMaybe, state);
  }
}

function setRecoilValue(store, recoilValue, valueOrUpdater) {
  queueOrPerformStateUpdate(store, {
    type: 'set',
    recoilValue,
    valueOrUpdater
  });
}

function setRecoilValueLoadable(store, recoilValue, loadable) {
  if (loadable instanceof DefaultValue$1) {
    return setRecoilValue(store, recoilValue, loadable);
  }

  queueOrPerformStateUpdate(store, {
    type: 'setLoadable',
    recoilValue,
    loadable: loadable
  });
}

function markRecoilValueModified(store, recoilValue) {
  queueOrPerformStateUpdate(store, {
    type: 'markModified',
    recoilValue
  });
}

function setUnvalidatedRecoilValue(store, recoilValue, unvalidatedValue) {
  queueOrPerformStateUpdate(store, {
    type: 'setUnvalidated',
    recoilValue,
    unvalidatedValue
  });
}

let subscriptionID = 0;

function subscribeToRecoilValue(store, {
  key
}, callback, componentDebugName = null) {
  const subID = subscriptionID++;
  const storeState = store.getState();

  if (!storeState.nodeToComponentSubscriptions.has(key)) {
    storeState.nodeToComponentSubscriptions.set(key, new Map());
  }

  Recoil_nullthrows(storeState.nodeToComponentSubscriptions.get(key)).set(subID, [componentDebugName !== null && componentDebugName !== void 0 ? componentDebugName : '<not captured>', callback]); // Handle the case that, during the same tick that we are subscribing, an atom
  // has been updated by some effect handler. Otherwise we will miss the update.

  if (Recoil_gkx_1('recoil_early_rendering_2021')) {
    const nextTree = store.getState().nextTree;

    if (nextTree && nextTree.dirtyAtoms.has(key)) {
      callback(nextTree);
    }
  }

  return {
    release: () => {
      const storeState = store.getState();
      const subs = storeState.nodeToComponentSubscriptions.get(key);

      if (subs === undefined || !subs.has(subID)) {
        return;
      }

      subs.delete(subID);

      if (subs.size === 0) {
        storeState.nodeToComponentSubscriptions.delete(key);
      }
    }
  };
}

var Recoil_RecoilValueInterface = {
  RecoilValueReadOnly: RecoilValueReadOnly$1,
  AbstractRecoilValue: AbstractRecoilValue$1,
  RecoilState: RecoilState$1,
  getRecoilValueAsLoadable,
  setRecoilValue,
  setRecoilValueLoadable,
  markRecoilValueModified,
  setUnvalidatedRecoilValue,
  subscribeToRecoilValue,
  isRecoilValue: isRecoilValue$1,
  applyAtomValueWrites,
  // TODO Remove export when deprecating initialStoreState_DEPRECATED in RecoilRoot
  batchStart,
  writeLoadableToTreeState,
  invalidateDownstreams,
  copyTreeState,
  invalidateDownstreams_FOR_TESTING: invalidateDownstreams
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */
/**
 * The someSet() method tests whether some elements in the given Set pass the
 * test implemented by the provided function.
 */

function someSet(set, callback, context) {
  const iterator = set.entries();
  let current = iterator.next();

  while (!current.done) {
    const entry = current.value;

    if (callback.call(context, entry[1], entry[0], set)) {
      return true;
    }

    current = iterator.next();
  }

  return false;
}

var Recoil_someSet = someSet;

const {
  cleanUpNode: cleanUpNode$1
} = Recoil_FunctionalCore;

const {
  deleteNodeConfigIfPossible: deleteNodeConfigIfPossible$1,
  getNode: getNode$2
} = Recoil_Node;

const {
  RetentionZone: RetentionZone$2
} = Recoil_RetentionZone; // Components that aren't mounted after suspending for this long will be assumed
// to be discarded and their resources released.


const SUSPENSE_TIMEOUT_MS = 120000;
const emptySet$1 = new Set();

function releaseRetainablesNowOnCurrentTree(store, retainables) {
  const storeState = store.getState();
  const treeState = storeState.currentTree;

  if (storeState.nextTree) {
    return; // leak memory rather than erase something that's about to be used.
  }

  const nodes = new Set();

  for (const r of retainables) {
    if (r instanceof RetentionZone$2) {
      for (const n of nodesRetainedByZone(storeState, r)) {
        nodes.add(n);
      }
    } else {
      nodes.add(r);
    }
  }

  const releasableNodes = findReleasableNodes(store, nodes);

  for (const node of releasableNodes) {
    releaseNode(store, treeState, node);
  }
}

function findReleasableNodes(store, searchFromNodes) {
  const storeState = store.getState();
  const treeState = storeState.currentTree;
  const graph = store.getGraph(treeState.version);
  const releasableNodes = new Set(); // mutated to collect answer

  const nonReleasableNodes = new Set();
  findReleasableNodesInner(searchFromNodes);
  return releasableNodes;

  function findReleasableNodesInner(searchFromNodes) {
    const releasableNodesFoundThisIteration = new Set();
    const downstreams = getDownstreamNodesInTopologicalOrder(store, treeState, searchFromNodes, releasableNodes, // don't descend into these
    nonReleasableNodes // don't descend into these
    ); // Find which of the downstream nodes are releasable and which are not:

    for (const node of downstreams) {
      var _storeState$retention;

      // Not releasable if configured to be retained forever:
      if (getNode$2(node).retainedBy === 'recoilRoot') {
        nonReleasableNodes.add(node);
        continue;
      } // Not releasable if retained directly by a component:


      if (((_storeState$retention = storeState.retention.referenceCounts.get(node)) !== null && _storeState$retention !== void 0 ? _storeState$retention : 0) > 0) {
        nonReleasableNodes.add(node);
        continue;
      } // Not releasable if retained by a zone:


      if (zonesThatCouldRetainNode(node).some(z => storeState.retention.referenceCounts.get(z))) {
        nonReleasableNodes.add(node);
        continue;
      } // Not releasable if it has a non-releasable child (which will already be in
      // nonReleasableNodes because we are going in topological order):


      const nodeChildren = graph.nodeToNodeSubscriptions.get(node);

      if (nodeChildren && Recoil_someSet(nodeChildren, child => nonReleasableNodes.has(child))) {
        nonReleasableNodes.add(node);
        continue;
      }

      releasableNodes.add(node);
      releasableNodesFoundThisIteration.add(node);
    } // If we found any releasable nodes, we need to walk UP from those nodes to
    // find whether their parents can now be released as well:


    const parents = new Set();

    for (const node of releasableNodesFoundThisIteration) {
      for (const parent of (_graph$nodeDeps$get = graph.nodeDeps.get(node)) !== null && _graph$nodeDeps$get !== void 0 ? _graph$nodeDeps$get : emptySet$1) {
        var _graph$nodeDeps$get;

        if (!releasableNodes.has(parent)) {
          parents.add(parent);
        }
      }
    }

    if (parents.size) {
      findReleasableNodesInner(parents);
    }
  }
} // Children before parents


function getDownstreamNodesInTopologicalOrder(store, treeState, nodes, // Mutable set is destroyed in place
doNotDescendInto1, doNotDescendInto2) {
  const graph = store.getGraph(treeState.version);
  const answer = [];
  const visited = new Set();

  while (nodes.size > 0) {
    visit(Recoil_nullthrows(nodes.values().next().value));
  }

  return answer;

  function visit(node) {
    if (doNotDescendInto1.has(node) || doNotDescendInto2.has(node)) {
      nodes.delete(node);
      return;
    }

    if (visited.has(node)) {
      return;
    }

    const children = graph.nodeToNodeSubscriptions.get(node);

    if (children) {
      for (const child of children) {
        visit(child);
      }
    }

    visited.add(node);
    nodes.delete(node);
    answer.push(node);
  }
}

function releaseNode(store, treeState, node) {
  if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
    return;
  } // Atom effects, in-closure caches, etc.:


  cleanUpNode$1(store, node); // Delete from store state:

  const storeState = store.getState();
  storeState.knownAtoms.delete(node);
  storeState.knownSelectors.delete(node);
  storeState.nodeTransactionSubscriptions.delete(node);
  storeState.retention.referenceCounts.delete(node);
  const zones = zonesThatCouldRetainNode(node);

  for (const zone of zones) {
    var _storeState$retention2;

    (_storeState$retention2 = storeState.retention.nodesRetainedByZone.get(zone)) === null || _storeState$retention2 === void 0 ? void 0 : _storeState$retention2.delete(node);
  } // Note that we DO NOT delete from nodeToComponentSubscriptions because this
  // already happens when the last component that was retaining the node unmounts,
  // and this could happen either before or after that.
  // Delete from TreeState and dep graph:


  treeState.atomValues.delete(node);
  treeState.dirtyAtoms.delete(node);
  treeState.nonvalidatedAtoms.delete(node);
  const graph = storeState.graphsByVersion.get(treeState.version);

  if (graph) {
    const deps = graph.nodeDeps.get(node);

    if (deps !== undefined) {
      graph.nodeDeps.delete(node);

      for (const dep of deps) {
        var _graph$nodeToNodeSubs;

        (_graph$nodeToNodeSubs = graph.nodeToNodeSubscriptions.get(dep)) === null || _graph$nodeToNodeSubs === void 0 ? void 0 : _graph$nodeToNodeSubs.delete(node);
      }
    } // No need to delete sub's deps as there should be no subs at this point.
    // But an invariant would require deleting nodes in topological order.


    graph.nodeToNodeSubscriptions.delete(node);
  } // Node config (for family members only as their configs can be recreated, and
  // only if they are not retained within any other Stores):


  deleteNodeConfigIfPossible$1(node);
}

function nodesRetainedByZone(storeState, zone) {
  var _storeState$retention3;

  return (_storeState$retention3 = storeState.retention.nodesRetainedByZone.get(zone)) !== null && _storeState$retention3 !== void 0 ? _storeState$retention3 : emptySet$1;
}

function zonesThatCouldRetainNode(node) {
  const retainedBy = getNode$2(node).retainedBy;

  if (retainedBy === undefined || retainedBy === 'components' || retainedBy === 'recoilRoot') {
    return [];
  } else if (retainedBy instanceof RetentionZone$2) {
    return [retainedBy];
  } else {
    return retainedBy; // it's an array of zones
  }
}

function scheduleOrPerformPossibleReleaseOfRetainable(store, retainable) {
  const state = store.getState();

  if (state.nextTree) {
    state.retention.retainablesToCheckForRelease.add(retainable);
  } else {
    releaseRetainablesNowOnCurrentTree(store, new Set([retainable]));
  }
}

function updateRetainCount(store, retainable, delta) {
  var _map$get;

  if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
    return;
  }

  const map = store.getState().retention.referenceCounts;
  const newCount = ((_map$get = map.get(retainable)) !== null && _map$get !== void 0 ? _map$get : 0) + delta;

  if (newCount === 0) {
    updateRetainCountToZero(store, retainable);
  } else {
    map.set(retainable, newCount);
  }
}

function updateRetainCountToZero(store, retainable) {
  if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
    return;
  }

  const map = store.getState().retention.referenceCounts;
  map.delete(retainable);
  scheduleOrPerformPossibleReleaseOfRetainable(store, retainable);
}

function releaseScheduledRetainablesNow(store) {
  if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
    return;
  }

  const state = store.getState();
  releaseRetainablesNowOnCurrentTree(store, state.retention.retainablesToCheckForRelease);
  state.retention.retainablesToCheckForRelease.clear();
}

function retainedByOptionWithDefault(r) {
  // The default will change from 'recoilRoot' to 'components' in the future.
  return r === undefined ? 'recoilRoot' : r;
}

var Recoil_Retention = {
  SUSPENSE_TIMEOUT_MS,
  updateRetainCount,
  updateRetainCountToZero,
  releaseScheduledRetainablesNow,
  retainedByOptionWithDefault
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */
/**
 * Combines multiple Iterables into a single Iterable.
 * Traverses the input Iterables in the order provided and maintains the order
 * of their elements.
 *
 * Example:
 * ```
 * const r = Array.from(concatIterables(['a', 'b'], ['c'], ['d', 'e', 'f']));
 * r == ['a', 'b', 'c', 'd', 'e', 'f'];
 * ```
 */

function* concatIterables(iters) {
  for (const iter of iters) {
    for (const val of iter) {
      yield val;
    }
  }
}

var Recoil_concatIterables = concatIterables;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

const isSSR = typeof window === 'undefined';
const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative'; // eslint-disable-line fb-www/typeof-undefined

var Recoil_Environment = {
  isSSR,
  isReactNative
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 *
 * This is to export esstiential functions from react-dom
 * for our web build
 */
const {
  unstable_batchedUpdates
} = ReactDOM;

var ReactBatchedUpdates = {
  unstable_batchedUpdates
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 *
 * This is to export esstiential functions from react-dom
 * for our web build
 */
// @fb-only: const {unstable_batchedUpdates} = require('ReactDOMComet');
// prettier-ignore
const {
  unstable_batchedUpdates: unstable_batchedUpdates$1
} = ReactBatchedUpdates; // @oss-only


var Recoil_ReactBatchedUpdates = {
  unstable_batchedUpdates: unstable_batchedUpdates$1
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */
const {
  batchStart: batchStart$1
} = Recoil_RecoilValueInterface;

const {
  unstable_batchedUpdates: unstable_batchedUpdates$2
} = Recoil_ReactBatchedUpdates;

let batcher = unstable_batchedUpdates$2; // flowlint-next-line unclear-type:off

/**
 * Sets the provided batcher function as the batcher function used by Recoil.
 *
 * Set the batcher to a custom batcher for your renderer,
 * if you use a renderer other than React DOM or React Native.
 */
const setBatcher = newBatcher => {
  batcher = newBatcher;
};
/**
 * Returns the current batcher function.
 */


const getBatcher = () => batcher;
/**
 * Calls the current batcher function and passes the
 * provided callback function.
 */


const batchUpdates = callback => {
  batcher(() => {
    let batchEnd = () => undefined;

    try {
      batchEnd = batchStart$1();
      callback();
    } finally {
      batchEnd();
    }
  });
};

var Recoil_Batching = {
  getBatcher,
  setBatcher,
  batchUpdates
};

const {
  isSSR: isSSR$1
} = Recoil_Environment;











const {
  batchUpdates: batchUpdates$1
} = Recoil_Batching;

const {
  initializeNodeIfNewToStore: initializeNodeIfNewToStore$1,
  peekNodeInfo: peekNodeInfo$1
} = Recoil_FunctionalCore;

const {
  graph: graph$2
} = Recoil_Graph;

const {
  DEFAULT_VALUE: DEFAULT_VALUE$1,
  recoilValues: recoilValues$1,
  recoilValuesForKeys: recoilValuesForKeys$2
} = Recoil_Node;

const {
  AbstractRecoilValue: AbstractRecoilValue$2,
  getRecoilValueAsLoadable: getRecoilValueAsLoadable$1,
  setRecoilValue: setRecoilValue$1,
  setUnvalidatedRecoilValue: setUnvalidatedRecoilValue$1
} = Recoil_RecoilValueInterface;

const {
  updateRetainCount: updateRetainCount$1
} = Recoil_Retention;

const {
  getNextTreeStateVersion: getNextTreeStateVersion$1,
  makeEmptyStoreState: makeEmptyStoreState$1
} = Recoil_State; // Opaque at this surface because it's part of the public API from here.
// However, the data-flow-graph and selector values may evolve as selector
// evaluation functions are executed and async selectors resolve.

class Snapshot {
  constructor(storeState) {
    _defineProperty(this, "_store", void 0);

    _defineProperty(this, "_refCount", 0);

    _defineProperty(this, "getLoadable", recoilValue => {
      this.checkRefCount_INTERNAL();
      return getRecoilValueAsLoadable$1(this._store, recoilValue);
    });

    _defineProperty(this, "getPromise", recoilValue => {
      this.checkRefCount_INTERNAL();
      return this.getLoadable(recoilValue).toPromise();
    });

    _defineProperty(this, "getNodes_UNSTABLE", opt => {
      this.checkRefCount_INTERNAL(); // TODO Deal with modified selectors

      if ((opt === null || opt === void 0 ? void 0 : opt.isModified) === true) {
        if ((opt === null || opt === void 0 ? void 0 : opt.isInitialized) === false) {
          return [];
        }

        const state = this._store.getState().currentTree;

        return recoilValuesForKeys$2(state.dirtyAtoms);
      }

      const knownAtoms = this._store.getState().knownAtoms;

      const knownSelectors = this._store.getState().knownSelectors;

      return (opt === null || opt === void 0 ? void 0 : opt.isInitialized) == null ? recoilValues$1.values() : opt.isInitialized === true ? recoilValuesForKeys$2(Recoil_concatIterables([this._store.getState().knownAtoms, this._store.getState().knownSelectors])) : Recoil_filterIterable(recoilValues$1.values(), ({
        key
      }) => !knownAtoms.has(key) && !knownSelectors.has(key));
    });

    _defineProperty(this, "getInfo_UNSTABLE", ({
      key
    }) => {
      this.checkRefCount_INTERNAL();
      return peekNodeInfo$1(this._store, this._store.getState().currentTree, key);
    });

    _defineProperty(this, "map", mapper => {
      this.checkRefCount_INTERNAL();
      const mutableSnapshot = new MutableSnapshot(this, batchUpdates$1);
      mapper(mutableSnapshot); // if removing batchUpdates from `set` add it here

      return cloneSnapshot(mutableSnapshot.getStore_INTERNAL());
    });

    _defineProperty(this, "asyncMap", async mapper => {
      this.checkRefCount_INTERNAL();
      const mutableSnapshot = new MutableSnapshot(this, batchUpdates$1);
      await mapper(mutableSnapshot);
      return cloneSnapshot(mutableSnapshot.getStore_INTERNAL());
    });

    this._store = {
      getState: () => storeState,
      replaceState: replacer => {
        storeState.currentTree = replacer(storeState.currentTree); // no batching so nextTree is never active
      },
      getGraph: version => {
        const graphs = storeState.graphsByVersion;

        if (graphs.has(version)) {
          return Recoil_nullthrows(graphs.get(version));
        }

        const newGraph = graph$2();
        graphs.set(version, newGraph);
        return newGraph;
      },
      subscribeToTransactions: () => ({
        release: () => {}
      }),
      addTransactionMetadata: () => {
        throw Recoil_err('Cannot subscribe to Snapshots');
      }
    }; // Initialize any nodes that are live in the parent store (primarily so that this
    // snapshot gets counted towards the node's live stores count).

    for (const nodeKey of this._store.getState().nodeCleanupFunctions.keys()) {
      initializeNodeIfNewToStore$1(this._store, storeState.currentTree, nodeKey, 'get');
      updateRetainCount$1(this._store, nodeKey, 1);
    }

    this.retain();
    this.autorelease_INTERNAL();
  }

  retain() {
    if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
      return () => undefined;
    }

    this._refCount++;
    let released = false;
    return () => {
      if (!released) {
        released = true;
        this.release_INTERNAL();
      }
    };
  }

  autorelease_INTERNAL() {
    if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
      return;
    }

    if (!isSSR$1) {
      window.setTimeout(() => this.release_INTERNAL(), 0);
    }
  }

  release_INTERNAL() {
    if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
      return;
    }

    this._refCount--;

    if (this._refCount === 0) ;
  }

  checkRefCount_INTERNAL() {
    if (Recoil_gkx_1('recoil_memory_managament_2020') && this._refCount <= 0) ;
  }

  getStore_INTERNAL() {
    this.checkRefCount_INTERNAL();
    return this._store;
  }

  getID() {
    this.checkRefCount_INTERNAL();
    return this.getID_INTERNAL();
  }

  getID_INTERNAL() {
    this.checkRefCount_INTERNAL();
    return this._store.getState().currentTree.stateID;
  } // We want to allow the methods to be destructured and used as accessors
  // eslint-disable-next-line fb-www/extra-arrow-initializer


}

function cloneStoreState(store, treeState, bumpVersion = false) {
  const storeState = store.getState();
  const version = bumpVersion ? getNextTreeStateVersion$1() : treeState.version;
  return {
    currentTree: bumpVersion ? {
      // TODO snapshots shouldn't really have versions because a new version number
      // is always assigned when the snapshot is gone to.
      version,
      stateID: version,
      transactionMetadata: { ...treeState.transactionMetadata
      },
      dirtyAtoms: new Set(treeState.dirtyAtoms),
      atomValues: treeState.atomValues.clone(),
      nonvalidatedAtoms: treeState.nonvalidatedAtoms.clone()
    } : treeState,
    commitDepth: 0,
    nextTree: null,
    previousTree: null,
    knownAtoms: new Set(storeState.knownAtoms),
    // FIXME here's a copy
    knownSelectors: new Set(storeState.knownSelectors),
    // FIXME here's a copy
    transactionSubscriptions: new Map(),
    nodeTransactionSubscriptions: new Map(),
    nodeToComponentSubscriptions: new Map(),
    queuedComponentCallbacks_DEPRECATED: [],
    suspendedComponentResolvers: new Set(),
    graphsByVersion: new Map().set(version, store.getGraph(treeState.version)),
    versionsUsedByComponent: new Map(),
    retention: {
      referenceCounts: new Map(),
      nodesRetainedByZone: new Map(),
      retainablesToCheckForRelease: new Set()
    },
    nodeCleanupFunctions: new Map()
  };
} // Factory to build a fresh snapshot


function freshSnapshot(initializeState) {
  const snapshot = new Snapshot(makeEmptyStoreState$1());
  return initializeState != null ? snapshot.map(initializeState) : snapshot;
} // Factory to clone a snapahot state


function cloneSnapshot(store, version = 'current') {
  const storeState = store.getState();
  const treeState = version === 'current' ? storeState.currentTree : Recoil_nullthrows(storeState.previousTree);
  return new Snapshot(cloneStoreState(store, treeState));
}

class MutableSnapshot extends Snapshot {
  constructor(snapshot, batch) {
    super(cloneStoreState(snapshot.getStore_INTERNAL(), snapshot.getStore_INTERNAL().getState().currentTree, true));

    _defineProperty(this, "_batch", void 0);

    _defineProperty(this, "set", (recoilState, newValueOrUpdater) => {
      this.checkRefCount_INTERNAL();
      const store = this.getStore_INTERNAL(); // This batchUpdates ensures this `set` is applied immediately and you can
      // read the written value after calling `set`. I would like to remove this
      // behavior and only batch in `Snapshot.map`, but this would be a breaking
      // change potentially.

      this._batch(() => {
        updateRetainCount$1(store, recoilState.key, 1);
        setRecoilValue$1(this.getStore_INTERNAL(), recoilState, newValueOrUpdater);
      });
    });

    _defineProperty(this, "reset", recoilState => {
      this.checkRefCount_INTERNAL();
      const store = this.getStore_INTERNAL(); // See note at `set` about batched updates.

      this._batch(() => {
        updateRetainCount$1(store, recoilState.key, 1);
        setRecoilValue$1(this.getStore_INTERNAL(), recoilState, DEFAULT_VALUE$1);
      });
    });

    _defineProperty(this, "setUnvalidatedAtomValues_DEPRECATED", values => {
      this.checkRefCount_INTERNAL();
      const store = this.getStore_INTERNAL(); // See note at `set` about batched updates.

      batchUpdates$1(() => {
        for (const [k, v] of values.entries()) {
          updateRetainCount$1(store, k, 1);
          setUnvalidatedRecoilValue$1(store, new AbstractRecoilValue$2(k), v);
        }
      });
    });

    this._batch = batch;
  } // We want to allow the methods to be destructured and used as accessors
  // eslint-disable-next-line fb-www/extra-arrow-initializer


}

var Recoil_Snapshot = {
  Snapshot,
  MutableSnapshot,
  freshSnapshot,
  cloneSnapshot
};

var Recoil_Snapshot_1 = Recoil_Snapshot.Snapshot;
var Recoil_Snapshot_2 = Recoil_Snapshot.MutableSnapshot;
var Recoil_Snapshot_3 = Recoil_Snapshot.freshSnapshot;
var Recoil_Snapshot_4 = Recoil_Snapshot.cloneSnapshot;

var Recoil_Snapshot$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Snapshot: Recoil_Snapshot_1,
  MutableSnapshot: Recoil_Snapshot_2,
  freshSnapshot: Recoil_Snapshot_3,
  cloneSnapshot: Recoil_Snapshot_4
});

// @fb-only: const RecoilusagelogEvent = require('RecoilusagelogEvent');
// @fb-only: const RecoilUsageLogFalcoEvent = require('RecoilUsageLogFalcoEvent');
// @fb-only: const URI = require('URI');


const {
  getNextTreeStateVersion: getNextTreeStateVersion$2,
  makeEmptyStoreState: makeEmptyStoreState$2
} = Recoil_State;













const {
  cleanUpNode: cleanUpNode$2,
  getDownstreamNodes: getDownstreamNodes$2,
  setNodeValue: setNodeValue$2,
  setUnvalidatedAtomValue_DEPRECATED: setUnvalidatedAtomValue_DEPRECATED$1
} = Recoil_FunctionalCore;

const {
  graph: graph$3
} = Recoil_Graph;

const {
  cloneGraph: cloneGraph$1
} = Recoil_Graph;

const {
  applyAtomValueWrites: applyAtomValueWrites$1
} = Recoil_RecoilValueInterface;

const {
  releaseScheduledRetainablesNow: releaseScheduledRetainablesNow$1
} = Recoil_Retention;

const {
  freshSnapshot: freshSnapshot$1
} = Recoil_Snapshot$1;



const {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} = React;

function notInAContext() {
  throw Recoil_err('This component must be used inside a <RecoilRoot> component.');
}

const defaultStore = Object.freeze({
  getState: notInAContext,
  replaceState: notInAContext,
  getGraph: notInAContext,
  subscribeToTransactions: notInAContext,
  addTransactionMetadata: notInAContext
});
let stateReplacerIsBeingExecuted = false;

function startNextTreeIfNeeded(store) {
  if (stateReplacerIsBeingExecuted) {
    throw Recoil_err('An atom update was triggered within the execution of a state updater function. State updater functions provided to Recoil must be pure functions.');
  }

  const storeState = store.getState();

  if (storeState.nextTree === null) {
    if (Recoil_gkx_1('recoil_memory_managament_2020') && Recoil_gkx_1('recoil_release_on_cascading_update_killswitch_2021')) {
      // If this is a cascading update (that is, rendering due to one state change
      // invokes a second state change), we won't have cleaned up retainables yet
      // because this normally happens after notifying components. Do it before
      // proceeding with the cascading update so that it remains predictable:
      if (storeState.commitDepth > 0) {
        releaseScheduledRetainablesNow$1(store);
      }
    }

    const version = storeState.currentTree.version;
    const nextVersion = getNextTreeStateVersion$2();
    storeState.nextTree = { ...storeState.currentTree,
      version: nextVersion,
      stateID: nextVersion,
      dirtyAtoms: new Set(),
      transactionMetadata: {}
    };
    storeState.graphsByVersion.set(nextVersion, cloneGraph$1(Recoil_nullthrows(storeState.graphsByVersion.get(version))));
  }
}

const AppContext = React.createContext({
  current: defaultStore
});

const useStoreRef = () => useContext(AppContext);

const MutableSourceContext = React.createContext(null); // TODO T2710559282599660

function useRecoilMutableSource() {
  const mutableSource = useContext(MutableSourceContext);

  return mutableSource;
}

function notifyComponents(store, storeState, treeState) {
  const dependentNodes = getDownstreamNodes$2(store, treeState, treeState.dirtyAtoms);

  for (const key of dependentNodes) {
    const comps = storeState.nodeToComponentSubscriptions.get(key);

    if (comps) {
      for (const [_subID, [_debugName, callback]] of comps) {
        callback(treeState);
      }
    }
  }
}

function sendEndOfBatchNotifications(store) {
  const storeState = store.getState();
  const treeState = storeState.currentTree; // Inform transaction subscribers of the transaction:

  const dirtyAtoms = treeState.dirtyAtoms;

  if (dirtyAtoms.size) {
    // Execute Node-specific subscribers before global subscribers
    for (const [key, subscriptions] of storeState.nodeTransactionSubscriptions) {
      if (dirtyAtoms.has(key)) {
        for (const [_, subscription] of subscriptions) {
          subscription(store);
        }
      }
    }

    for (const [_, subscription] of storeState.transactionSubscriptions) {
      subscription(store);
    }

    if (!Recoil_gkx_1('recoil_early_rendering_2021') || storeState.suspendedComponentResolvers.size) {
      // Notifying components is needed to wake from suspense, even when using
      // early rendering.
      notifyComponents(store, storeState, treeState); // Wake all suspended components so the right one(s) can try to re-render.
      // We need to wake up components not just when some asynchronous selector
      // resolved, but also when changing synchronous values because this may cause
      // a selector to change from asynchronous to synchronous, in which case there
      // would be no follow-up asynchronous resolution to wake us up.
      // TODO OPTIMIZATION Only wake up related downstream components

      storeState.suspendedComponentResolvers.forEach(cb => cb());
      storeState.suspendedComponentResolvers.clear();
    }
  } // Special behavior ONLY invoked by useInterface.
  // FIXME delete queuedComponentCallbacks_DEPRECATED when deleting useInterface.


  storeState.queuedComponentCallbacks_DEPRECATED.forEach(cb => cb(treeState));
  storeState.queuedComponentCallbacks_DEPRECATED.splice(0, storeState.queuedComponentCallbacks_DEPRECATED.length);
}

function endBatch(storeRef) {
  const storeState = storeRef.current.getState();
  storeState.commitDepth++;

  try {
    const {
      nextTree
    } = storeState; // Ignore commits that are not because of Recoil transactions -- namely,
    // because something above RecoilRoot re-rendered:

    if (nextTree === null) {
      return;
    } // nextTree is now committed -- note that copying and reset occurs when
    // a transaction begins, in startNextTreeIfNeeded:


    storeState.previousTree = storeState.currentTree;
    storeState.currentTree = nextTree;
    storeState.nextTree = null;
    sendEndOfBatchNotifications(storeRef.current);

    if (storeState.previousTree != null) {
      storeState.graphsByVersion.delete(storeState.previousTree.version);
    } else {
      Recoil_recoverableViolation('Ended batch with no previous state, which is unexpected', 'recoil');
    }

    storeState.previousTree = null;

    if (Recoil_gkx_1('recoil_memory_managament_2020')) {
      releaseScheduledRetainablesNow$1(storeRef.current);
    }
  } finally {
    storeState.commitDepth--;
  }
}
/*
 * The purpose of the Batcher is to observe when React batches end so that
 * Recoil state changes can be batched. Whenever Recoil state changes, we call
 * setState on the batcher. Then we wait for that change to be committed, which
 * signifies the end of the batch. That's when we respond to the Recoil change.
 */


function Batcher({
  setNotifyBatcherOfChange
}) {
  const storeRef = useStoreRef();
  const [_, setState] = useState([]);
  setNotifyBatcherOfChange(() => setState({}));
  useEffect(() => {
    // enqueueExecution runs this function immediately; it is only used to
    // manipulate the order of useEffects during tests, since React seems to
    // call useEffect in an unpredictable order sometimes.
    Recoil_Queue.enqueueExecution('Batcher', () => {
      endBatch(storeRef);
    });
  }); // If an asynchronous selector resolves after the Batcher is unmounted,
  // notifyBatcherOfChange will still be called. An error gets thrown whenever
  // setState is called after a component is already unmounted, so this sets
  // notifyBatcherOfChange to be a no-op.

  useEffect(() => {
    return () => {
      setNotifyBatcherOfChange(() => {});
    };
  }, [setNotifyBatcherOfChange]);
  return null;
}
// which will no longer be needed.


function initialStoreState_DEPRECATED(store, initializeState) {
  const initial = makeEmptyStoreState$2();
  initializeState({
    // $FlowFixMe[escaped-generic]
    set: (atom, value) => {
      const state = initial.currentTree;
      const writes = setNodeValue$2(store, state, atom.key, value);
      const writtenNodes = new Set(writes.keys());
      const nonvalidatedAtoms = state.nonvalidatedAtoms.clone();

      for (const n of writtenNodes) {
        nonvalidatedAtoms.delete(n);
      }

      initial.currentTree = { ...state,
        dirtyAtoms: Recoil_unionSets(state.dirtyAtoms, writtenNodes),
        atomValues: applyAtomValueWrites$1(state.atomValues, writes),
        // NB: PLEASE un-export applyAtomValueWrites when deleting this code
        nonvalidatedAtoms
      };
    },
    setUnvalidatedAtomValues: atomValues => {
      // FIXME replace this with a mutative loop
      atomValues.forEach((v, k) => {
        initial.currentTree = setUnvalidatedAtomValue_DEPRECATED$1(initial.currentTree, k, v);
      });
    }
  });
  return initial;
}

function initialStoreState(initializeState) {
  const snapshot = freshSnapshot$1().map(initializeState);
  return snapshot.getStore_INTERNAL().getState();
}

let nextID = 0;

function RecoilRoot_INTERNAL({
  initializeState_DEPRECATED,
  initializeState,
  store_INTERNAL: storeProp,
  // For use with React "context bridging"
  children
}) {
  var _createMutableSource;

  // prettier-ignore
  // @fb-only: useEffect(() => {
  // @fb-only: if (gkx('recoil_usage_logging')) {
  // @fb-only: try {
  // @fb-only: RecoilUsageLogFalcoEvent.log(() => ({
  // @fb-only: type: RecoilusagelogEvent.RECOIL_ROOT_MOUNTED,
  // @fb-only: path: URI.getRequestURI().getPath(),
  // @fb-only: }));
  // @fb-only: } catch {
  // @fb-only: recoverableViolation(
  // @fb-only: 'Error when logging Recoil Usage event',
  // @fb-only: 'recoil',
  // @fb-only: );
  // @fb-only: }
  // @fb-only: }
  // @fb-only: }, []);
  let storeState; // eslint-disable-line prefer-const

  const getGraph = version => {
    const graphs = storeState.current.graphsByVersion;

    if (graphs.has(version)) {
      return Recoil_nullthrows(graphs.get(version));
    }

    const newGraph = graph$3();
    graphs.set(version, newGraph);
    return newGraph;
  };

  const subscribeToTransactions = (callback, key) => {
    if (key == null) {
      // Global transaction subscriptions
      const {
        transactionSubscriptions
      } = storeRef.current.getState();
      const id = nextID++;
      transactionSubscriptions.set(id, callback);
      return {
        release: () => {
          transactionSubscriptions.delete(id);
        }
      };
    } else {
      // Node-specific transaction subscriptions:
      const {
        nodeTransactionSubscriptions
      } = storeRef.current.getState();

      if (!nodeTransactionSubscriptions.has(key)) {
        nodeTransactionSubscriptions.set(key, new Map());
      }

      const id = nextID++;
      Recoil_nullthrows(nodeTransactionSubscriptions.get(key)).set(id, callback);
      return {
        release: () => {
          const subs = nodeTransactionSubscriptions.get(key);

          if (subs) {
            subs.delete(id);

            if (subs.size === 0) {
              nodeTransactionSubscriptions.delete(key);
            }
          }
        }
      };
    }
  };

  const addTransactionMetadata = metadata => {
    startNextTreeIfNeeded(storeRef.current);

    for (const k of Object.keys(metadata)) {
      Recoil_nullthrows(storeRef.current.getState().nextTree).transactionMetadata[k] = metadata[k];
    }
  };

  const replaceState = replacer => {
    const storeState = storeRef.current.getState();
    startNextTreeIfNeeded(storeRef.current); // Use replacer to get the next state:

    const nextTree = Recoil_nullthrows(storeState.nextTree);
    let replaced;

    try {
      stateReplacerIsBeingExecuted = true;
      replaced = replacer(nextTree);
    } finally {
      stateReplacerIsBeingExecuted = false;
    }

    if (replaced === nextTree) {
      return;
    }


    storeState.nextTree = replaced;

    if (Recoil_gkx_1('recoil_early_rendering_2021')) {
      notifyComponents(store, storeState, replaced);
    }

    Recoil_nullthrows(notifyBatcherOfChange.current)();
  };

  const notifyBatcherOfChange = useRef(null);
  const setNotifyBatcherOfChange = useCallback(x => {
    notifyBatcherOfChange.current = x;
  }, [notifyBatcherOfChange]); // FIXME T2710559282599660

  const createMutableSource = (_createMutableSource = React.createMutableSource) !== null && _createMutableSource !== void 0 ? _createMutableSource : // flowlint-line unclear-type:off
  React.unstable_createMutableSource; // flowlint-line unclear-type:off

  const store = storeProp !== null && storeProp !== void 0 ? storeProp : {
    getState: () => storeState.current,
    replaceState,
    getGraph,
    subscribeToTransactions,
    addTransactionMetadata
  };
  const storeRef = useRef(store);
  storeState = useRef(initializeState_DEPRECATED != null ? initialStoreState_DEPRECATED(store, initializeState_DEPRECATED) : initializeState != null ? initialStoreState(initializeState) : makeEmptyStoreState$2());
  const mutableSource = useMemo(() => createMutableSource ? createMutableSource(storeState, () => storeState.current.currentTree.version) : null, [createMutableSource, storeState]); // Cleanup when the <RecoilRoot> is unmounted

  useEffect(() => () => {
    for (const atomKey of storeRef.current.getState().knownAtoms) {
      cleanUpNode$2(storeRef.current, atomKey);
    }
  }, []);
  return /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: storeRef
  }, /*#__PURE__*/React.createElement(MutableSourceContext.Provider, {
    value: mutableSource
  }, /*#__PURE__*/React.createElement(Batcher, {
    setNotifyBatcherOfChange: setNotifyBatcherOfChange
  }), children));
}

function RecoilRoot(props) {
  const {
    override,
    ...propsExceptOverride
  } = props;
  const ancestorStoreRef = useStoreRef();

  if (override === false && ancestorStoreRef.current !== defaultStore) {
    // If ancestorStoreRef.current !== defaultStore, it means that this
    // RecoilRoot is not nested within another.
    return props.children;
  }

  return /*#__PURE__*/React.createElement(RecoilRoot_INTERNAL, propsExceptOverride);
}

var Recoil_RecoilRoot_react = {
  useStoreRef,
  useRecoilMutableSource,
  RecoilRoot,
  notifyComponents_FOR_TESTING: notifyComponents,
  sendEndOfBatchNotifications_FOR_TESTING: sendEndOfBatchNotifications
};

const {
  useRef: useRef$1
} = React;

function useComponentName() {
  useRef$1();


  return '<component name not available>'; // @oss-only
}

var Recoil_useComponentName = useComponentName;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

function shallowArrayEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

var Recoil_shallowArrayEqual = shallowArrayEqual;

const {
  useEffect: useEffect$1,
  useRef: useRef$2
} = React;

function usePrevious(value) {
  const ref = useRef$2();
  useEffect$1(() => {
    ref.current = value;
  });
  return ref.current;
}

var Recoil_usePrevious = usePrevious;

const {
  useStoreRef: useStoreRef$1
} = Recoil_RecoilRoot_react;

const {
  SUSPENSE_TIMEOUT_MS: SUSPENSE_TIMEOUT_MS$1
} = Recoil_Retention;

const {
  updateRetainCount: updateRetainCount$2
} = Recoil_Retention;

const {
  RetentionZone: RetentionZone$3
} = Recoil_RetentionZone;

const {
  isSSR: isSSR$2
} = Recoil_Environment;







const {
  useEffect: useEffect$2,
  useRef: useRef$3
} = React; // I don't see a way to avoid the any type here because we want to accept readable
// and writable values with any type parameter, but normally with writable ones
// RecoilState<SomeT> is not a subtype of RecoilState<mixed>.


// flowlint-line unclear-type:off
function useRetain(toRetain) {
  if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
    return;
  } // eslint-disable-next-line fb-www/react-hooks


  return useRetain_ACTUAL(toRetain);
}

function useRetain_ACTUAL(toRetain) {
  const array = Array.isArray(toRetain) ? toRetain : [toRetain];
  const retainables = array.map(a => a instanceof RetentionZone$3 ? a : a.key);
  const storeRef = useStoreRef$1();
  useEffect$2(() => {
    if (!Recoil_gkx_1('recoil_memory_managament_2020')) {
      return;
    }

    const store = storeRef.current;

    if (timeoutID.current && !isSSR$2) {
      // Already performed a temporary retain on render, simply cancel the release
      // of that temporary retain.
      window.clearTimeout(timeoutID.current);
      timeoutID.current = null;
    } else {
      for (const r of retainables) {
        updateRetainCount$2(store, r, 1);
      }
    }

    return () => {
      for (const r of retainables) {
        updateRetainCount$2(store, r, -1);
      }
    }; // eslint-disable-next-line fb-www/react-hooks-deps
  }, [storeRef, ...retainables]); // We want to retain if the component suspends. This is terrible but the Suspense
  // API affords us no better option. If we suspend and never commit after some
  // seconds, then release. The 'actual' retain/release in the effect above
  // cancels this.

  const timeoutID = useRef$3();
  const previousRetainables = Recoil_usePrevious(retainables);

  if (!isSSR$2 && (previousRetainables === undefined || !Recoil_shallowArrayEqual(previousRetainables, retainables))) {
    const store = storeRef.current;

    for (const r of retainables) {
      updateRetainCount$2(store, r, 1);
    }

    if (previousRetainables) {
      for (const r of previousRetainables) {
        updateRetainCount$2(store, r, -1);
      }
    }

    if (timeoutID.current) {
      window.clearTimeout(timeoutID.current);
    }

    timeoutID.current = window.setTimeout(() => {
      timeoutID.current = null;

      for (const r of retainables) {
        updateRetainCount$2(store, r, -1);
      }
    }, SUSPENSE_TIMEOUT_MS$1);
  }
}

var Recoil_useRetain = useRetain;

const {
  batchUpdates: batchUpdates$2
} = Recoil_Batching;

const {
  DEFAULT_VALUE: DEFAULT_VALUE$2
} = Recoil_Node;

const {
  useRecoilMutableSource: useRecoilMutableSource$1,
  useStoreRef: useStoreRef$2
} = Recoil_RecoilRoot_react;

const {
  AbstractRecoilValue: AbstractRecoilValue$3,
  getRecoilValueAsLoadable: getRecoilValueAsLoadable$2,
  setRecoilValue: setRecoilValue$2,
  setUnvalidatedRecoilValue: setUnvalidatedRecoilValue$2,
  subscribeToRecoilValue: subscribeToRecoilValue$1
} = Recoil_RecoilValueInterface;

const {
  setByAddingToSet: setByAddingToSet$2
} = Recoil_CopyOnWrite;









const {
  mutableSourceExists: mutableSourceExists$2,
  useMutableSource: useMutableSource$1
} = Recoil_mutableSource;





const {
  useCallback: useCallback$1,
  useEffect: useEffect$3,
  useMemo: useMemo$1,
  useRef: useRef$4,
  useState: useState$1
} = React;

function handleLoadable(loadable, recoilValue, storeRef) {
  // We can't just throw the promise we are waiting on to Suspense.  If the
  // upstream dependencies change it may produce a state in which the component
  // can render, but it would still be suspended on a Promise that may never resolve.
  if (loadable.state === 'hasValue') {
    return loadable.contents;
  } else if (loadable.state === 'loading') {
    const promise = new Promise(resolve => {
      storeRef.current.getState().suspendedComponentResolvers.add(resolve);
    }); // $FlowFixMe Flow(prop-missing) for integrating with tools that inspect thrown promises @fb-only
    // @fb-only: promise.displayName = `Recoil State: ${recoilValue.key}`;

    throw promise;
  } else if (loadable.state === 'hasError') {
    throw loadable.contents;
  } else {
    throw Recoil_err(`Invalid value of loadable atom "${recoilValue.key}"`);
  }
}

/**
 * Various things are broken with useRecoilInterface, particularly concurrent mode
 * and memory management. They will not be fixed.
 * */
function useRecoilInterface_DEPRECATED() {
  const storeRef = useStoreRef$2();
  const [, forceUpdate] = useState$1([]);
  const recoilValuesUsed = useRef$4(new Set());
  recoilValuesUsed.current = new Set(); // Track the RecoilValues used just during this render

  const previousSubscriptions = useRef$4(new Set());
  const subscriptions = useRef$4(new Map());
  const unsubscribeFrom = useCallback$1(key => {
    const sub = subscriptions.current.get(key);

    if (sub) {
      sub.release();
      subscriptions.current.delete(key);
    }
  }, [subscriptions]);
  const componentName = Recoil_useComponentName();
  useEffect$3(() => {
    const store = storeRef.current;

    function updateState(_state, key) {
      if (!subscriptions.current.has(key)) {
        return;
      }

      forceUpdate([]);
    }

    Recoil_differenceSets(recoilValuesUsed.current, previousSubscriptions.current).forEach(key => {
      if (subscriptions.current.has(key)) {
        return;
      }

      const sub = subscribeToRecoilValue$1(store, new AbstractRecoilValue$3(key), state => {
        updateState(state, key);
      }, componentName);
      subscriptions.current.set(key, sub);
      /**
       * Since we're subscribing in an effect we need to update to the latest
       * value of the atom since it may have changed since we rendered. We can
       * go ahead and do that now, unless we're in the middle of a batch --
       * in which case we should do it at the end of the batch, due to the
       * following edge case: Suppose an atom is updated in another useEffect
       * of this same component. Then the following sequence of events occur:
       * 1. Atom is updated and subs fired (but we may not be subscribed
       *    yet depending on order of effects, so we miss this) Updated value
       *    is now in nextTree, but not currentTree.
       * 2. This effect happens. We subscribe and update.
       * 3. From the update we re-render and read currentTree, with old value.
       * 4. Batcher's effect sets currentTree to nextTree.
       * In this sequence we miss the update. To avoid that, add the update
       * to queuedComponentCallback if a batch is in progress.
       */
      // FIXME delete queuedComponentCallbacks_DEPRECATED when deleting useInterface.

      const state = store.getState();

      if (state.nextTree) {
        store.getState().queuedComponentCallbacks_DEPRECATED.push(() => {
          updateState(store.getState(), key);
        });
      } else {
        updateState(store.getState(), key);
      }
    });
    Recoil_differenceSets(previousSubscriptions.current, recoilValuesUsed.current).forEach(key => {
      unsubscribeFrom(key);
    });
    previousSubscriptions.current = recoilValuesUsed.current;
  });
  useEffect$3(() => {
    const subs = subscriptions.current;
    return () => subs.forEach((_, key) => unsubscribeFrom(key));
  }, [unsubscribeFrom]);
  return useMemo$1(() => {
    // eslint-disable-next-line no-shadow
    function useSetRecoilState(recoilState) {

      return newValueOrUpdater => {
        setRecoilValue$2(storeRef.current, recoilState, newValueOrUpdater);
      };
    } // eslint-disable-next-line no-shadow


    function useResetRecoilState(recoilState) {

      return () => setRecoilValue$2(storeRef.current, recoilState, DEFAULT_VALUE$2);
    } // eslint-disable-next-line no-shadow


    function useRecoilValueLoadable(recoilValue) {
      var _storeState$nextTree;

      if (!recoilValuesUsed.current.has(recoilValue.key)) {
        recoilValuesUsed.current = setByAddingToSet$2(recoilValuesUsed.current, recoilValue.key);
      } // TODO Restore optimization to memoize lookup


      const storeState = storeRef.current.getState();
      return getRecoilValueAsLoadable$2(storeRef.current, recoilValue, Recoil_gkx_1('recoil_early_rendering_2021') ? (_storeState$nextTree = storeState.nextTree) !== null && _storeState$nextTree !== void 0 ? _storeState$nextTree : storeState.currentTree : storeState.currentTree);
    } // eslint-disable-next-line no-shadow


    function useRecoilValue(recoilValue) {

      const loadable = useRecoilValueLoadable(recoilValue);
      return handleLoadable(loadable, recoilValue, storeRef);
    } // eslint-disable-next-line no-shadow


    function useRecoilState(recoilState) {

      return [useRecoilValue(recoilState), useSetRecoilState(recoilState)];
    } // eslint-disable-next-line no-shadow


    function useRecoilStateLoadable(recoilState) {

      return [useRecoilValueLoadable(recoilState), useSetRecoilState(recoilState)];
    }

    return {
      getRecoilValue: useRecoilValue,
      getRecoilValueLoadable: useRecoilValueLoadable,
      getRecoilState: useRecoilState,
      getRecoilStateLoadable: useRecoilStateLoadable,
      getSetRecoilState: useSetRecoilState,
      getResetRecoilState: useResetRecoilState
    };
  }, [recoilValuesUsed, storeRef]);
}

const recoilComponentGetRecoilValueCount_FOR_TESTING = {
  current: 0
};

function useRecoilValueLoadable_MUTABLESOURCE(recoilValue) {

  const storeRef = useStoreRef$2();
  const getLoadable = useCallback$1(() => {
    var _storeState$nextTree2;

    const store = storeRef.current;
    const storeState = store.getState();
    const treeState = Recoil_gkx_1('recoil_early_rendering_2021') ? (_storeState$nextTree2 = storeState.nextTree) !== null && _storeState$nextTree2 !== void 0 ? _storeState$nextTree2 : storeState.currentTree : storeState.currentTree;
    return getRecoilValueAsLoadable$2(store, recoilValue, treeState);
  }, [storeRef, recoilValue]);
  const getLoadableWithTesting = useCallback$1(() => {

    return getLoadable();
  }, [getLoadable]);
  const componentName = Recoil_useComponentName();
  const subscribe = useCallback$1((_storeState, callback) => {
    const store = storeRef.current;
    const subscription = subscribeToRecoilValue$1(store, recoilValue, () => {
      if (!Recoil_gkx_1('recoil_suppress_rerender_in_callback')) {
        return callback();
      } // Only re-render if the value has changed.
      // This will evaluate the atom/selector now as well as when the
      // component renders, but that may help with prefetching.


      const newLoadable = getLoadable();

      if (!prevLoadableRef.current.is(newLoadable)) {
        callback();
      } // If the component is suspended then the effect setting prevLoadableRef
      // will not run.  So, set the previous value here when its subscription
      // is fired to wake it up.  We can't just rely on this, though, because
      // this only executes when an atom/selector is dirty and the atom/selector
      // passed to the hook can dynamically change.


      prevLoadableRef.current = newLoadable;
    }, componentName);
    return subscription.release;
  }, [storeRef, recoilValue, componentName, getLoadable]);
  const source = useRecoilMutableSource$1();
  const loadable = useMutableSource$1(source, getLoadableWithTesting, subscribe);
  const prevLoadableRef = useRef$4(loadable);
  useEffect$3(() => {
    prevLoadableRef.current = loadable;
  });
  return loadable;
}

function useRecoilValueLoadable_LEGACY(recoilValue) {

  const storeRef = useStoreRef$2();
  const [_, forceUpdate] = useState$1([]);
  const componentName = Recoil_useComponentName();
  useEffect$3(() => {
    const store = storeRef.current;
    const storeState = store.getState();
    const subscription = subscribeToRecoilValue$1(store, recoilValue, _state => {
      var _prevLoadableRef$curr;

      if (!Recoil_gkx_1('recoil_suppress_rerender_in_callback')) {
        return forceUpdate([]);
      }

      const newLoadable = getRecoilValueAsLoadable$2(store, recoilValue, store.getState().currentTree);

      if (!((_prevLoadableRef$curr = prevLoadableRef.current) === null || _prevLoadableRef$curr === void 0 ? void 0 : _prevLoadableRef$curr.is(newLoadable))) {
        forceUpdate(newLoadable);
      }

      prevLoadableRef.current = newLoadable;
    }, componentName);
    /**
     * Since we're subscribing in an effect we need to update to the latest
     * value of the atom since it may have changed since we rendered. We can
     * go ahead and do that now, unless we're in the middle of a batch --
     * in which case we should do it at the end of the batch, due to the
     * following edge case: Suppose an atom is updated in another useEffect
     * of this same component. Then the following sequence of events occur:
     * 1. Atom is updated and subs fired (but we may not be subscribed
     *    yet depending on order of effects, so we miss this) Updated value
     *    is now in nextTree, but not currentTree.
     * 2. This effect happens. We subscribe and update.
     * 3. From the update we re-render and read currentTree, with old value.
     * 4. Batcher's effect sets currentTree to nextTree.
     * In this sequence we miss the update. To avoid that, add the update
     * to queuedComponentCallback if a batch is in progress.
     */

    if (storeState.nextTree) {
      store.getState().queuedComponentCallbacks_DEPRECATED.push(() => {
        prevLoadableRef.current = null;
        forceUpdate([]);
      });
    } else {
      var _prevLoadableRef$curr2;

      if (!Recoil_gkx_1('recoil_suppress_rerender_in_callback')) {
        return forceUpdate([]);
      }

      const newLoadable = getRecoilValueAsLoadable$2(store, recoilValue, store.getState().currentTree);

      if (!((_prevLoadableRef$curr2 = prevLoadableRef.current) === null || _prevLoadableRef$curr2 === void 0 ? void 0 : _prevLoadableRef$curr2.is(newLoadable))) {
        forceUpdate(newLoadable);
      }

      prevLoadableRef.current = newLoadable;
    }

    return subscription.release;
  }, [componentName, recoilValue, storeRef]);
  const loadable = getRecoilValueAsLoadable$2(storeRef.current, recoilValue);
  const prevLoadableRef = useRef$4(loadable);
  useEffect$3(() => {
    prevLoadableRef.current = loadable;
  });
  return loadable;
}
/**
  Like useRecoilValue(), but either returns the value if available or
  just undefined if not available for any reason, such as pending or error.
*/


function useRecoilValueLoadable(recoilValue) {
  if (Recoil_gkx_1('recoil_memory_managament_2020')) {
    // eslint-disable-next-line fb-www/react-hooks
    Recoil_useRetain(recoilValue);
  }

  if (mutableSourceExists$2()) {
    // eslint-disable-next-line fb-www/react-hooks
    return useRecoilValueLoadable_MUTABLESOURCE(recoilValue);
  } else {
    // eslint-disable-next-line fb-www/react-hooks
    return useRecoilValueLoadable_LEGACY(recoilValue);
  }
}
/**
  Returns the value represented by the RecoilValue.
  If the value is pending, it will throw a Promise to suspend the component,
  if the value is an error it will throw it for the nearest React error boundary.
  This will also subscribe the component for any updates in the value.
  */


function useRecoilValue(recoilValue) {

  const storeRef = useStoreRef$2();
  const loadable = useRecoilValueLoadable(recoilValue);
  return handleLoadable(loadable, recoilValue, storeRef);
}
/**
  Returns a function that allows the value of a RecoilState to be updated, but does
  not subscribe the component to changes to that RecoilState.
*/


function useSetRecoilState(recoilState) {

  const storeRef = useStoreRef$2();
  return useCallback$1(newValueOrUpdater => {
    setRecoilValue$2(storeRef.current, recoilState, newValueOrUpdater);
  }, [storeRef, recoilState]);
}
/**
  Returns a function that will reset the value of a RecoilState to its default
*/


function useResetRecoilState(recoilState) {

  const storeRef = useStoreRef$2();
  return useCallback$1(() => {
    setRecoilValue$2(storeRef.current, recoilState, DEFAULT_VALUE$2);
  }, [storeRef, recoilState]);
}
/**
  Equivalent to useState(). Allows the value of the RecoilState to be read and written.
  Subsequent updates to the RecoilState will cause the component to re-render. If the
  RecoilState is pending, this will suspend the component and initiate the
  retrieval of the value. If evaluating the RecoilState resulted in an error, this will
  throw the error so that the nearest React error boundary can catch it.
*/


function useRecoilState(recoilState) {

  return [useRecoilValue(recoilState), useSetRecoilState(recoilState)];
}
/**
  Like useRecoilState(), but does not cause Suspense or React error handling. Returns
  an object that indicates whether the RecoilState is available, pending, or
  unavailable due to an error.
*/


function useRecoilStateLoadable(recoilState) {

  return [useRecoilValueLoadable(recoilState), useSetRecoilState(recoilState)];
}

function useSetUnvalidatedAtomValues() {
  const storeRef = useStoreRef$2();
  return (values, transactionMetadata = {}) => {
    batchUpdates$2(() => {
      storeRef.current.addTransactionMetadata(transactionMetadata);
      values.forEach((value, key) => setUnvalidatedRecoilValue$2(storeRef.current, new AbstractRecoilValue$3(key), value));
    });
  };
}

var Recoil_Hooks = {
  recoilComponentGetRecoilValueCount_FOR_TESTING,
  useRecoilInterface: useRecoilInterface_DEPRECATED,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
  useSetUnvalidatedAtomValues
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */
/**
 * Returns a map containing all of the keys + values from the original map where
 * the given callback returned true.
 */

function filterMap(map, callback) {
  const result = new Map();

  for (const [key, value] of map) {
    if (callback(value, key)) {
      result.set(key, value);
    }
  }

  return result;
}

var Recoil_filterMap = filterMap;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */
/**
 * Returns a set containing all of the values from the original set where
 * the given callback returned true.
 */

function filterSet(set, callback) {
  const result = new Set();

  for (const value of set) {
    if (callback(value)) {
      result.add(value);
    }
  }

  return result;
}

var Recoil_filterSet = filterSet;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

function mergeMaps(...maps) {
  const result = new Map();

  for (let i = 0; i < maps.length; i++) {
    const iterator = maps[i].keys();
    let nextKey;

    while (!(nextKey = iterator.next()).done) {
      // $FlowFixMe[incompatible-call] - map/iterator knows nothing about flow types
      result.set(nextKey.value, maps[i].get(nextKey.value));
    }
  }
  /* $FlowFixMe[incompatible-return] (>=0.66.0 site=www,mobile) This comment
   * suppresses an error found when Flow v0.66 was deployed. To see the error
   * delete this comment and run Flow. */


  return result;
}

var Recoil_mergeMaps = mergeMaps;

const {
  batchUpdates: batchUpdates$3
} = Recoil_Batching;

const {
  DEFAULT_VALUE: DEFAULT_VALUE$3,
  getNode: getNode$3,
  nodes: nodes$1
} = Recoil_Node;

const {
  useStoreRef: useStoreRef$3
} = Recoil_RecoilRoot_react;

const {
  AbstractRecoilValue: AbstractRecoilValue$4,
  setRecoilValueLoadable: setRecoilValueLoadable$1
} = Recoil_RecoilValueInterface;

const {
  SUSPENSE_TIMEOUT_MS: SUSPENSE_TIMEOUT_MS$2
} = Recoil_Retention;

const {
  Snapshot: Snapshot$1,
  cloneSnapshot: cloneSnapshot$1
} = Recoil_Snapshot$1;

const {
  isSSR: isSSR$3
} = Recoil_Environment;















const {
  useCallback: useCallback$2,
  useEffect: useEffect$4,
  useRef: useRef$5,
  useState: useState$2
} = React;

function useTransactionSubscription(callback) {
  const storeRef = useStoreRef$3();
  useEffect$4(() => {
    const sub = storeRef.current.subscribeToTransactions(callback);
    return sub.release;
  }, [callback, storeRef]);
}

function externallyVisibleAtomValuesInState(state) {
  const atomValues = state.atomValues.toMap();
  const persistedAtomContentsValues = Recoil_mapMap(Recoil_filterMap(atomValues, (v, k) => {
    const node = getNode$3(k);
    const persistence = node.persistence_UNSTABLE;
    return persistence != null && persistence.type !== 'none' && v.state === 'hasValue';
  }), v => v.contents); // Merge in nonvalidated atoms; we may not have defs for them but they will
  // all have persistence on or they wouldn't be there in the first place.

  return Recoil_mergeMaps(state.nonvalidatedAtoms.toMap(), persistedAtomContentsValues);
}

/**
  Calls the given callback after any atoms have been modified and the consequent
  component re-renders have been committed. This is intended for persisting
  the values of the atoms to storage. The stored values can then be restored
  using the useSetUnvalidatedAtomValues hook.

  The callback receives the following info:

  atomValues: The current value of every atom that is both persistable (persistence
              type not set to 'none') and whose value is available (not in an
              error or loading state).

  previousAtomValues: The value of every persistable and available atom before
               the transaction began.

  atomInfo: A map containing the persistence settings for each atom. Every key
            that exists in atomValues will also exist in atomInfo.

  modifiedAtoms: The set of atoms that were written to during the transaction.

  transactionMetadata: Arbitrary information that was added via the
          useSetUnvalidatedAtomValues hook. Useful for ignoring the useSetUnvalidatedAtomValues
          transaction, to avoid loops.
*/
function useTransactionObservation_DEPRECATED(callback) {
  useTransactionSubscription(useCallback$2(store => {
    let previousTree = store.getState().previousTree;
    const currentTree = store.getState().currentTree;

    if (!previousTree) {
      previousTree = store.getState().currentTree; // attempt to trundle on
    }

    const atomValues = externallyVisibleAtomValuesInState(currentTree);
    const previousAtomValues = externallyVisibleAtomValuesInState(previousTree);
    const atomInfo = Recoil_mapMap(nodes$1, node => {
      var _node$persistence_UNS, _node$persistence_UNS2, _node$persistence_UNS3, _node$persistence_UNS4;

      return {
        persistence_UNSTABLE: {
          type: (_node$persistence_UNS = (_node$persistence_UNS2 = node.persistence_UNSTABLE) === null || _node$persistence_UNS2 === void 0 ? void 0 : _node$persistence_UNS2.type) !== null && _node$persistence_UNS !== void 0 ? _node$persistence_UNS : 'none',
          backButton: (_node$persistence_UNS3 = (_node$persistence_UNS4 = node.persistence_UNSTABLE) === null || _node$persistence_UNS4 === void 0 ? void 0 : _node$persistence_UNS4.backButton) !== null && _node$persistence_UNS3 !== void 0 ? _node$persistence_UNS3 : false
        }
      };
    }); // Filter on existance in atomValues so that externally-visible rules
    // are also applied to modified atoms (specifically exclude selectors):

    const modifiedAtoms = Recoil_filterSet(currentTree.dirtyAtoms, k => atomValues.has(k) || previousAtomValues.has(k));
    callback({
      atomValues,
      previousAtomValues,
      atomInfo,
      modifiedAtoms,
      transactionMetadata: { ...currentTree.transactionMetadata
      }
    });
  }, [callback]));
}

function useRecoilTransactionObserver(callback) {
  useTransactionSubscription(useCallback$2(store => {
    const snapshot = cloneSnapshot$1(store, 'current');
    const previousSnapshot = cloneSnapshot$1(store, 'previous');
    callback({
      snapshot,
      previousSnapshot
    });
  }, [callback]));
} // Return a snapshot of the current state and subscribe to all state changes


function useRecoilSnapshot() {
  const storeRef = useStoreRef$3();
  const [snapshot, setSnapshot] = useState$2(() => cloneSnapshot$1(storeRef.current));
  const previousSnapshot = Recoil_usePrevious(snapshot);
  const timeoutID = useRef$5();
  useEffect$4(() => {
    if (timeoutID.current && !isSSR$3) {
      window.clearTimeout(timeoutID.current);
    }

    return snapshot.retain();
  }, [snapshot]);
  useTransactionSubscription(useCallback$2(store => setSnapshot(cloneSnapshot$1(store)), []));

  if (previousSnapshot !== snapshot && !isSSR$3) {
    if (timeoutID.current) {
      previousSnapshot === null || previousSnapshot === void 0 ? void 0 : previousSnapshot.release_INTERNAL();
      window.clearTimeout(timeoutID.current);
    }

    snapshot.retain();
    timeoutID.current = window.setTimeout(() => {
      snapshot.release_INTERNAL();
      timeoutID.current = null;
    }, SUSPENSE_TIMEOUT_MS$2);
  }

  return snapshot;
}

function useGotoRecoilSnapshot() {
  const storeRef = useStoreRef$3();
  return useCallback$2(snapshot => {
    var _storeState$nextTree;

    const storeState = storeRef.current.getState();
    const prev = (_storeState$nextTree = storeState.nextTree) !== null && _storeState$nextTree !== void 0 ? _storeState$nextTree : storeState.currentTree;
    const next = snapshot.getStore_INTERNAL().getState().currentTree;
    batchUpdates$3(() => {
      const keysToUpdate = new Set();

      for (const keys of [prev.atomValues.keys(), next.atomValues.keys()]) {
        for (const key of keys) {
          var _prev$atomValues$get, _next$atomValues$get;

          if (((_prev$atomValues$get = prev.atomValues.get(key)) === null || _prev$atomValues$get === void 0 ? void 0 : _prev$atomValues$get.contents) !== ((_next$atomValues$get = next.atomValues.get(key)) === null || _next$atomValues$get === void 0 ? void 0 : _next$atomValues$get.contents) && getNode$3(key).shouldRestoreFromSnapshots) {
            keysToUpdate.add(key);
          }
        }
      }

      keysToUpdate.forEach(key => {
        setRecoilValueLoadable$1(storeRef.current, new AbstractRecoilValue$4(key), next.atomValues.has(key) ? Recoil_nullthrows(next.atomValues.get(key)) : DEFAULT_VALUE$3);
      });
      storeRef.current.replaceState(state => {
        return { ...state,
          stateID: snapshot.getID_INTERNAL()
        };
      });
    });
  }, [storeRef]);
}

var Recoil_SnapshotHooks = {
  useRecoilSnapshot,
  useGotoRecoilSnapshot,
  useRecoilTransactionObserver,
  useTransactionObservation_DEPRECATED,
  useTransactionSubscription_DEPRECATED: useTransactionSubscription
};

const {
  peekNodeInfo: peekNodeInfo$2
} = Recoil_FunctionalCore;

const {
  useStoreRef: useStoreRef$4
} = Recoil_RecoilRoot_react;

function useGetRecoilValueInfo() {
  const storeRef = useStoreRef$4();
  return ({
    key
  }) => peekNodeInfo$2(storeRef.current, storeRef.current.getState().currentTree, key);
}

var Recoil_useGetRecoilValueInfo = useGetRecoilValueInfo;

const {
  RecoilRoot: RecoilRoot$1,
  useStoreRef: useStoreRef$5
} = Recoil_RecoilRoot_react;



const {
  useMemo: useMemo$2
} = React;

function useRecoilBridgeAcrossReactRoots() {
  const store = useStoreRef$5().current;
  return useMemo$2(() => {
    // eslint-disable-next-line no-shadow
    function RecoilBridge({
      children
    }) {
      return /*#__PURE__*/React.createElement(RecoilRoot$1, {
        store_INTERNAL: store
      }, children);
    }

    return RecoilBridge;
  }, [store]);
}

var Recoil_useRecoilBridgeAcrossReactRoots = useRecoilBridgeAcrossReactRoots;

const {
  loadableWithValue: loadableWithValue$1
} = Recoil_Loadable$1;

const {
  DEFAULT_VALUE: DEFAULT_VALUE$4,
  getNode: getNode$4
} = Recoil_Node;

const {
  copyTreeState: copyTreeState$1,
  getRecoilValueAsLoadable: getRecoilValueAsLoadable$3,
  invalidateDownstreams: invalidateDownstreams$1,
  writeLoadableToTreeState: writeLoadableToTreeState$1
} = Recoil_RecoilValueInterface;



function isAtom(recoilValue) {
  return getNode$4(recoilValue.key).nodeType === 'atom';
}

class TransactionInterfaceImpl {
  constructor(store, treeState) {
    _defineProperty(this, "_store", void 0);

    _defineProperty(this, "_treeState", void 0);

    _defineProperty(this, "_changes", void 0);

    _defineProperty(this, "get", recoilValue => {
      if (this._changes.has(recoilValue.key)) {
        // $FlowFixMe[incompatible-return]
        return this._changes.get(recoilValue.key);
      }

      if (!isAtom(recoilValue)) {
        throw Recoil_err('Reading selectors within atomicUpdate is not supported');
      }

      const loadable = getRecoilValueAsLoadable$3(this._store, recoilValue, this._treeState);

      if (loadable.state === 'hasValue') {
        return loadable.contents;
      } else if (loadable.state === 'hasError') {
        throw loadable.contents;
      } else {
        throw Recoil_err(`Expected Recoil atom ${recoilValue.key} to have a value, but it is in a loading state.`);
      }
    });

    _defineProperty(this, "set", (recoilState, valueOrUpdater) => {
      if (!isAtom(recoilState)) {
        throw Recoil_err('Setting selectors within atomicUpdate is not supported');
      }

      if (typeof valueOrUpdater === 'function') {
        const current = this.get(recoilState);

        this._changes.set(recoilState.key, valueOrUpdater(current)); // flowlint-line unclear-type:off

      } else {
        this._changes.set(recoilState.key, valueOrUpdater);
      }
    });

    _defineProperty(this, "reset", recoilState => {
      this.set(recoilState, DEFAULT_VALUE$4);
    });

    this._store = store;
    this._treeState = treeState;
    this._changes = new Map();
  } // Allow destructing
  // eslint-disable-next-line fb-www/extra-arrow-initializer


  newTreeState_INTERNAL() {
    if (this._changes.size === 0) {
      return this._treeState;
    }

    const newState = copyTreeState$1(this._treeState);

    for (const [k, v] of this._changes) {
      writeLoadableToTreeState$1(newState, k, loadableWithValue$1(v));
    }

    invalidateDownstreams$1(this._store, newState);
    return newState;
  }

}

function atomicUpdater(store) {
  return fn => {
    store.replaceState(treeState => {
      const changeset = new TransactionInterfaceImpl(store, treeState);
      fn(changeset);
      return changeset.newTreeState_INTERNAL();
    });
  };
}

var Recoil_AtomicUpdates = {
  atomicUpdater
};

var Recoil_AtomicUpdates_1 = Recoil_AtomicUpdates.atomicUpdater;

var Recoil_AtomicUpdates$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  atomicUpdater: Recoil_AtomicUpdates_1
});

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

var invariant_1 = invariant;

// @oss-only


var Recoil_invariant = invariant_1;

const {
  atomicUpdater: atomicUpdater$1
} = Recoil_AtomicUpdates$1;

const {
  batchUpdates: batchUpdates$4
} = Recoil_Batching;

const {
  DEFAULT_VALUE: DEFAULT_VALUE$5
} = Recoil_Node;

const {
  useStoreRef: useStoreRef$6
} = Recoil_RecoilRoot_react;

const {
  setRecoilValue: setRecoilValue$3
} = Recoil_RecoilValueInterface;

const {
  Snapshot: Snapshot$2,
  cloneSnapshot: cloneSnapshot$2
} = Recoil_Snapshot$1;





const {
  useGotoRecoilSnapshot: useGotoRecoilSnapshot$1
} = Recoil_SnapshotHooks;

const {
  useCallback: useCallback$3
} = React;

class Sentinel {}

const SENTINEL = new Sentinel();

function useRecoilCallback(fn, deps) {
  const storeRef = useStoreRef$6();
  const gotoSnapshot = useGotoRecoilSnapshot$1();
  return useCallback$3((...args) => {
    function set(recoilState, newValueOrUpdater) {
      setRecoilValue$3(storeRef.current, recoilState, newValueOrUpdater);
    }

    function reset(recoilState) {
      setRecoilValue$3(storeRef.current, recoilState, DEFAULT_VALUE$5);
    } // Use currentTree for the snapshot to show the currently committed state


    const snapshot = cloneSnapshot$2(storeRef.current); // FIXME massive gains from doing this lazily

    const atomicUpdate = atomicUpdater$1(storeRef.current);
    let ret = SENTINEL;
    batchUpdates$4(() => {
      const errMsg = 'useRecoilCallback expects a function that returns a function: ' + 'it accepts a function of the type (RecoilInterface) => T = R ' + 'and returns a callback function T => R, where RecoilInterface is an ' + 'object {snapshot, set, ...} and T and R are the argument and return ' + 'types of the callback you want to create.  Please see the docs ' + 'at recoiljs.org for details.';

      if (typeof fn !== 'function') {
        throw Recoil_err(errMsg);
      } // flowlint-next-line unclear-type:off


      const cb = fn({
        set,
        reset,
        snapshot,
        gotoSnapshot,
        transact_UNSTABLE: atomicUpdate
      });

      if (typeof cb !== 'function') {
        throw Recoil_err(errMsg);
      }

      ret = cb(...args);
    });
    !!(ret instanceof Sentinel) ? Recoil_invariant(false) : void 0;
    return ret;
  }, deps != null ? [...deps, storeRef] : undefined // eslint-disable-line fb-www/react-hooks-deps
  );
}

var Recoil_useRecoilCallback = useRecoilCallback;

const {
  getNode: getNode$5
} = Recoil_Node;

const {
  useStoreRef: useStoreRef$7
} = Recoil_RecoilRoot_react;

const {
  useCallback: useCallback$4
} = React;

function useRecoilRefresher(recoilValue) {
  const storeRef = useStoreRef$7();
  return useCallback$4(() => {
    var _node$clearCache;

    const store = storeRef.current;
    const {
      currentTree
    } = store.getState();
    const node = getNode$5(recoilValue.key);
    (_node$clearCache = node.clearCache) === null || _node$clearCache === void 0 ? void 0 : _node$clearCache.call(node, store, currentTree);
  }, [recoilValue, storeRef]);
}

var Recoil_useRecoilRefresher = useRecoilRefresher;

const {
  atomicUpdater: atomicUpdater$2
} = Recoil_AtomicUpdates$1;

const {
  useStoreRef: useStoreRef$8
} = Recoil_RecoilRoot_react;

const {
  useMemo: useMemo$3
} = React;

function useRecoilTransaction(fn, deps) {
  const storeRef = useStoreRef$8();
  return useMemo$3(() => (...args) => {
    const atomicUpdate = atomicUpdater$2(storeRef.current);
    atomicUpdate(transactionInterface => {
      fn(transactionInterface)(...args);
    });
  }, deps != null ? [...deps, storeRef] : undefined // eslint-disable-line fb-www/react-hooks-deps
  );
}

var Recoil_useRecoilTransaction = useRecoilTransaction;

function stringify(x, opt, key) {
  // A optimization to avoid the more expensive JSON.stringify() for simple strings
  // This may lose protection for u2028 and u2029, though.
  if (typeof x === 'string' && !x.includes('"') && !x.includes('\\')) {
    return `"${x}"`;
  } // Handle primitive types


  switch (typeof x) {
    case 'undefined':
      return '';
    // JSON.stringify(undefined) returns undefined, but we always want to return a string

    case 'boolean':
      return x ? 'true' : 'false';

    case 'number':
    case 'symbol':
      // case 'bigint': // BigInt is not supported in www
      return String(x);

    case 'string':
      // Add surrounding quotes and escape internal quotes
      return JSON.stringify(x);

    case 'function':
      if ((opt === null || opt === void 0 ? void 0 : opt.allowFunctions) !== true) {
        throw Recoil_err('Attempt to serialize function in a Recoil cache key');
      }

      return `__FUNCTION(${x.name})__`;
  }

  if (x === null) {
    return 'null';
  } // Fallback case for unknown types


  if (typeof x !== 'object') {
    var _JSON$stringify;

    return (_JSON$stringify = JSON.stringify(x)) !== null && _JSON$stringify !== void 0 ? _JSON$stringify : '';
  } // Deal with all promises as equivalent for now.


  if (Recoil_isPromise(x)) {
    return '__PROMISE__';
  } // Arrays handle recursive stringification


  if (Array.isArray(x)) {
    return `[${x.map((v, i) => stringify(v, opt, i.toString()))}]`;
  } // If an object defines a toJSON() method, then use that to override the
  // serialization.  This matches the behavior of JSON.stringify().
  // Pass the key for compatibility.
  // Immutable.js collections define this method to allow us to serialize them.


  if (typeof x.toJSON === 'function') {
    // flowlint-next-line unclear-type: off
    return stringify(x.toJSON(key), opt, key);
  } // For built-in Maps, sort the keys in a stable order instead of the
  // default insertion order.  Support non-string keys.


  if (x instanceof Map) {
    const obj = {};

    for (const [k, v] of x) {
      // Stringify will escape any nested quotes
      obj[typeof k === 'string' ? k : stringify(k, opt)] = v;
    }

    return stringify(obj, opt, key);
  } // For built-in Sets, sort the keys in a stable order instead of the
  // default insertion order.


  if (x instanceof Set) {
    return stringify(Array.from(x).sort((a, b) => stringify(a, opt).localeCompare(stringify(b, opt))), opt, key);
  } // Anything else that is iterable serialize as an Array.


  if (Symbol !== undefined && x[Symbol.iterator] != null && typeof x[Symbol.iterator] === 'function') {
    // flowlint-next-line unclear-type: off
    return stringify(Array.from(x), opt, key);
  } // For all other Objects, sort the keys in a stable order.


  return `{${Object.keys(x).filter(k => x[k] !== undefined).sort() // stringify the key to add quotes and escape any nested slashes or quotes.
  .map(k => `${stringify(k, opt)}:${stringify(x[k], opt, k)}`).join(',')}}`;
} // Utility similar to JSON.stringify() except:
// * Serialize built-in Sets as an Array
// * Serialize built-in Maps as an Object.  Supports non-string keys.
// * Serialize other iterables as arrays
// * Sort the keys of Objects and Maps to have a stable order based on string conversion.
//    This overrides their default insertion order.
// * Still uses toJSON() of any object to override serialization
// * Support Symbols (though don't guarantee uniqueness)
// * We could support BigInt, but Flow doesn't seem to like it.
// See Recoil_stableStringify-test.js for examples


function stableStringify(x, opt = {
  allowFunctions: false
}) {

  return stringify(x, opt);
}

var Recoil_stableStringify = stableStringify;

class TreeCache {
  constructor(options) {
    var _options$onHit, _options$onSet, _options$mapNodeValue;

    _defineProperty(this, "_numLeafs", void 0);

    _defineProperty(this, "_root", void 0);

    _defineProperty(this, "_onHit", void 0);

    _defineProperty(this, "_onSet", void 0);

    _defineProperty(this, "_mapNodeValue", void 0);

    this._numLeafs = 0;
    this._root = null;
    this._onHit = (_options$onHit = options === null || options === void 0 ? void 0 : options.onHit) !== null && _options$onHit !== void 0 ? _options$onHit : () => {};
    this._onSet = (_options$onSet = options === null || options === void 0 ? void 0 : options.onSet) !== null && _options$onSet !== void 0 ? _options$onSet : () => {};
    this._mapNodeValue = (_options$mapNodeValue = options === null || options === void 0 ? void 0 : options.mapNodeValue) !== null && _options$mapNodeValue !== void 0 ? _options$mapNodeValue : val => val;
  }

  size() {
    return this._numLeafs;
  } // TODO: nodeCount(): number


  root() {
    return this._root;
  }

  get(getNodeValue, handlers) {
    var _this$getLeafNode;

    return (_this$getLeafNode = this.getLeafNode(getNodeValue, handlers)) === null || _this$getLeafNode === void 0 ? void 0 : _this$getLeafNode.value;
  }

  getLeafNode(getNodeValue, handlers) {
    return findLeaf(this.root(), nodeKey => this._mapNodeValue(getNodeValue(nodeKey)), {
      onNodeVisit: node => {
        handlers === null || handlers === void 0 ? void 0 : handlers.onNodeVisit(node);

        if (node.type === 'leaf') {
          this._onHit(node);
        }
      }
    });
  }

  set(route, value, handlers) {
    let leafNode;
    let newRoot = null;

    const setRetryablePart = () => {
      newRoot = addLeaf(this.root(), route.map(([nodeKey, nodeValue]) => [nodeKey, this._mapNodeValue(nodeValue)]), null, value, null, {
        onNodeVisit: node => {
          handlers === null || handlers === void 0 ? void 0 : handlers.onNodeVisit(node);

          if (node.type === 'leaf') {
            leafNode = node;
          }
        }
      }, () => {
        this.clear();
        setRetryablePart();
      });
    };

    setRetryablePart();

    if (!this.root()) {
      this._root = newRoot;
    }

    this._numLeafs++;

    this._onSet(Recoil_nullthrows(leafNode));
  }

  delete(node) {
    if (!this.root()) {
      return false;
    }

    const root = Recoil_nullthrows(this.root());
    const existsInTree = pruneNodeFromTree(root, node, node.parent);

    if (!existsInTree) {
      return false;
    }

    if (node === root || root.type === 'branch' && !root.branches.size) {
      this._root = null;
      this._numLeafs = 0;
      return true;
    }

    this._numLeafs -= countDownstreamLeaves(node);
    return true;
  }

  clear() {
    this._numLeafs = 0;
    this._root = null;
  }

}

const findLeaf = (root, getNodeValue, handlers) => {
  var _handlers$onNodeVisit;

  if (root == null) {
    return undefined;
  }

  handlers === null || handlers === void 0 ? void 0 : (_handlers$onNodeVisit = handlers.onNodeVisit) === null || _handlers$onNodeVisit === void 0 ? void 0 : _handlers$onNodeVisit.call(handlers, root);

  if (root.type === 'leaf') {
    return root;
  }

  const nodeValue = getNodeValue(root.nodeKey);
  return findLeaf(root.branches.get(nodeValue), getNodeValue, handlers);
};

const addLeaf = (root, route, parent, value, branchKey, handlers, onAbort) => {
  var _handlers$onNodeVisit2;

  let node;

  if (root == null) {
    if (route.length === 0) {
      node = {
        type: 'leaf',
        value,
        parent,
        branchKey
      };
    } else {
      const [path, ...rest] = route;
      const [nodeKey, nodeValue] = path;
      node = {
        type: 'branch',
        nodeKey,
        parent,
        branches: new Map(),
        branchKey
      };
      node.branches.set(nodeValue, addLeaf(null, rest, node, value, nodeValue, handlers, onAbort));
    }
  } else {
    node = root;

    if (route.length) {
      const [path, ...rest] = route;
      const [nodeKey, nodeValue] = path;

      if (root.type !== 'branch' || root.nodeKey !== nodeKey) {
        onAbort();
        return node; // ignored
      }

      root.branches.set(nodeValue, addLeaf(root.branches.get(nodeValue), rest, root, value, nodeValue, handlers, onAbort));
    }
  }

  handlers === null || handlers === void 0 ? void 0 : (_handlers$onNodeVisit2 = handlers.onNodeVisit) === null || _handlers$onNodeVisit2 === void 0 ? void 0 : _handlers$onNodeVisit2.call(handlers, node);
  return node;
};

const pruneNodeFromTree = (root, node, parent) => {
  if (!parent) {
    return root === node;
  }

  parent.branches.delete(node.branchKey);
  return pruneUpstreamBranches(root, parent, parent.parent);
};

const pruneUpstreamBranches = (root, branchNode, parent) => {
  if (!parent) {
    return root === branchNode;
  }

  if (branchNode.branches.size === 0) {
    parent.branches.delete(branchNode.branchKey);
  }

  return pruneUpstreamBranches(root, parent, parent.parent);
};

const countDownstreamLeaves = node => node.type === 'leaf' ? 1 : Array.from(node.branches.values()).reduce((sum, currNode) => sum + countDownstreamLeaves(currNode), 0);

var Recoil_TreeCache = {
  TreeCache
};

var Recoil_TreeCache_1 = Recoil_TreeCache.TreeCache;

var Recoil_TreeCache$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  TreeCache: Recoil_TreeCache_1
});

class LRUCache {
  constructor(options) {
    var _options$mapKey;

    _defineProperty(this, "_maxSize", void 0);

    _defineProperty(this, "_size", void 0);

    _defineProperty(this, "_head", void 0);

    _defineProperty(this, "_tail", void 0);

    _defineProperty(this, "_map", void 0);

    _defineProperty(this, "_keyMapper", void 0);

    this._maxSize = options.maxSize;
    this._size = 0;
    this._head = null;
    this._tail = null;
    this._map = new Map();
    this._keyMapper = (_options$mapKey = options.mapKey) !== null && _options$mapKey !== void 0 ? _options$mapKey : v => v;
  }

  head() {
    return this._head;
  }

  tail() {
    return this._tail;
  }

  size() {
    return this._size;
  }

  maxSize() {
    return this._maxSize;
  }

  has(key) {
    return this._map.has(this._keyMapper(key));
  }

  get(key) {
    const mappedKey = this._keyMapper(key);

    const node = this._map.get(mappedKey);

    if (!node) {
      return undefined;
    }

    this.set(key, node.value);
    return node.value;
  }

  set(key, val) {
    const mappedKey = this._keyMapper(key);

    const existingNode = this._map.get(mappedKey);

    if (existingNode) {
      this.delete(key);
    }

    const head = this.head();
    const node = {
      key,
      right: head,
      left: null,
      value: val
    };

    if (head) {
      head.left = node;
    } else {
      this._tail = node;
    }

    this._map.set(mappedKey, node);

    this._head = node;
    this._size++;

    this._maybeDeleteLRU();
  }

  _maybeDeleteLRU() {
    if (this.size() > this.maxSize()) {
      this.deleteLru();
    }
  }

  deleteLru() {
    const tail = this.tail();

    if (tail) {
      this.delete(tail.key);
    }
  }

  delete(key) {
    const mappedKey = this._keyMapper(key);

    if (!this._size || !this._map.has(mappedKey)) {
      return;
    }

    const node = Recoil_nullthrows(this._map.get(mappedKey));
    const right = node.right;
    const left = node.left;

    if (right) {
      right.left = node.left;
    }

    if (left) {
      left.right = node.right;
    }

    if (node === this.head()) {
      this._head = right;
    }

    if (node === this.tail()) {
      this._tail = left;
    }

    this._map.delete(mappedKey);

    this._size--;
  }

  clear() {
    this._size = 0;
    this._head = null;
    this._tail = null;
    this._map = new Map();
  }

}

var Recoil_LRUCache = {
  LRUCache
};

var Recoil_LRUCache_1 = Recoil_LRUCache.LRUCache;

var Recoil_LRUCache$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  LRUCache: Recoil_LRUCache_1
});

const {
  LRUCache: LRUCache$1
} = Recoil_LRUCache$1;

const {
  TreeCache: TreeCache$1
} = Recoil_TreeCache$1;

function treeCacheLRU(maxSize, mapNodeValue = v => v) {
  const lruCache = new LRUCache$1({
    maxSize
  });
  const cache = new TreeCache$1({
    mapNodeValue,
    onHit: node => {
      lruCache.set(node, true);
    },
    onSet: node => {
      const lruNode = lruCache.tail();
      lruCache.set(node, true);

      if (lruNode && cache.size() > maxSize) {
        cache.delete(lruNode.key);
      }
    }
  }); // $FlowFixMe[method-unbinding]

  return cache;
}

var Recoil_treeCacheLRU = treeCacheLRU;

const {
  TreeCache: TreeCache$2
} = Recoil_TreeCache$1;



const defaultPolicy = {
  equality: 'reference',
  eviction: 'keep-all',
  maxSize: Infinity
};

function treeCacheFromPolicy({
  equality = defaultPolicy.equality,
  eviction = defaultPolicy.eviction,
  maxSize = defaultPolicy.maxSize
} = defaultPolicy) {
  const valueMapper = getValueMapper(equality);
  const treeCache = getTreeCache(eviction, maxSize, valueMapper);
  return treeCache;
}

function getValueMapper(equality) {
  switch (equality) {
    case 'reference':
      return val => val;

    case 'value':
      return val => Recoil_stableStringify(val);
  }

  throw Recoil_err(`Unrecognized equality policy ${equality}`);
}

function getTreeCache(eviction, maxSize, mapNodeValue) {
  switch (eviction) {
    case 'keep-all':
      // $FlowFixMe[method-unbinding]
      return new TreeCache$2({
        mapNodeValue
      });

    case 'lru':
      return Recoil_treeCacheLRU(Recoil_nullthrows(maxSize), mapNodeValue);

    case 'most-recent':
      return Recoil_treeCacheLRU(1, mapNodeValue);
  }

  throw Recoil_err(`Unrecognized eviction policy ${eviction}`);
}

var Recoil_treeCacheFromPolicy = treeCacheFromPolicy;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 *
 * This is a stub for some integration into FB internal stuff
 */
function startPerfBlock(_id) {
  return () => null;
}

var Recoil_PerformanceTimings = {
  startPerfBlock
};

const {
  loadableWithError: loadableWithError$1,
  loadableWithPromise: loadableWithPromise$1,
  loadableWithValue: loadableWithValue$2
} = Recoil_Loadable$1;



const {
  getNodeLoadable: getNodeLoadable$2,
  peekNodeLoadable: peekNodeLoadable$1,
  setNodeValue: setNodeValue$3
} = Recoil_FunctionalCore;

const {
  saveDependencyMapToStore: saveDependencyMapToStore$1
} = Recoil_Graph;

const {
  DEFAULT_VALUE: DEFAULT_VALUE$6,
  RecoilValueNotReady: RecoilValueNotReady$2,
  getConfigDeletionHandler: getConfigDeletionHandler$1,
  getNode: getNode$6,
  registerNode: registerNode$1
} = Recoil_Node;

const {
  isRecoilValue: isRecoilValue$3
} = Recoil_RecoilValue$1;

const {
  AbstractRecoilValue: AbstractRecoilValue$5
} = Recoil_RecoilValue$1;

const {
  markRecoilValueModified: markRecoilValueModified$1,
  setRecoilValueLoadable: setRecoilValueLoadable$2
} = Recoil_RecoilValueInterface;

const {
  retainedByOptionWithDefault: retainedByOptionWithDefault$1
} = Recoil_Retention;

const {
  cloneSnapshot: cloneSnapshot$3
} = Recoil_Snapshot$1;













const {
  startPerfBlock: startPerfBlock$1
} = Recoil_PerformanceTimings;



class Canceled {}

const CANCELED = new Canceled();
/**
 * An ExecutionId is an arbitrary ID that lets us distinguish executions from
 * each other. This is necessary as we need a way of solving this problem:
 * "given 3 async executions, only update state for the 'latest' execution when
 * it finishes running regardless of when the other 2 finish". ExecutionIds
 * provide a convenient way of identifying executions so that we can track and
 * manage them over time.
 */

const dependencyStack = []; // for detecting circular dependencies.

const waitingStores = new Map();
/* eslint-disable no-redeclare */

const getNewExecutionId = (() => {
  let executionId = 0;
  return () => executionId++;
})();

function getInitialExecutionInfo() {
  return {
    depValuesDiscoveredSoFarDuringAsyncWork: null,
    latestLoadable: null,
    latestExecutionId: null,
    stateVersion: null
  };
}

function selector(options) {
  let recoilValue = null;
  const {
    key,
    get,
    cachePolicy_UNSTABLE: cachePolicy
  } = options;
  const set = options.set != null ? options.set : undefined; // flow


  const discoveredDependencyNodeKeys = new Set();
  const cache = Recoil_treeCacheFromPolicy(cachePolicy !== null && cachePolicy !== void 0 ? cachePolicy : {
    equality: 'reference',
    eviction: 'keep-all'
  });
  const retainedBy = retainedByOptionWithDefault$1(options.retainedBy_UNSTABLE);
  const executionInfoMap = new Map();
  let liveStoresCount = 0;

  function selectorIsLive() {
    return !Recoil_gkx_1('recoil_memory_managament_2020') || liveStoresCount > 0;
  }

  function getExecutionInfo(store) {
    if (!executionInfoMap.has(store)) {
      executionInfoMap.set(store, getInitialExecutionInfo());
    }

    return Recoil_nullthrows(executionInfoMap.get(store));
  }

  function selectorInit(store) {
    liveStoresCount++;
    store.getState().knownSelectors.add(key); // FIXME remove knownSelectors?

    return () => {
      liveStoresCount--;
      store.getState().knownSelectors.delete(key);
      executionInfoMap.delete(store);
    };
  }

  function selectorShouldDeleteConfigOnRelease() {
    return getConfigDeletionHandler$1(key) !== undefined && !selectorIsLive();
  }

  function notifyStoreWhenAsyncSettles(store, loadable, executionId) {
    if (loadable.state === 'loading') {
      let stores = waitingStores.get(executionId);

      if (stores == null) {
        waitingStores.set(executionId, stores = new Set());
      }

      stores.add(store);
    }
  }

  function notifyStoresOfSettledAsync(newLoadable, executionId) {
    const stores = waitingStores.get(executionId);

    if (stores !== undefined) {
      for (const store of stores) {
        setRecoilValueLoadable$2(store, new AbstractRecoilValue$5(key), newLoadable);
      }

      waitingStores.delete(executionId);
    }
  }

  function getCachedNodeLoadable(store, state, nodeKey) {
    const isKeyPointingToSelector = store.getState().knownSelectors.has(nodeKey);
    /**
     * It's important that we don't bypass calling getNodeLoadable for atoms
     * as getNodeLoadable has side effects in state
     */

    if (isKeyPointingToSelector && state.atomValues.has(nodeKey)) {
      return Recoil_nullthrows(state.atomValues.get(nodeKey));
    }

    const loadable = getNodeLoadable$2(store, state, nodeKey);

    if (loadable.state !== 'loading' && isKeyPointingToSelector) {
      state.atomValues.set(nodeKey, loadable);
    }

    return loadable;
  }
  /**
   * This function attaches a then() and a catch() to a promise that was
   * returned from a selector's get() (either explicitly or implicitly by
   * running a function that uses the "async" keyword). If a selector's get()
   * returns a promise, we have two possibilities:
   *
   * 1. The promise will resolve, in which case it will have completely finished
   *    executing without any remaining pending dependencies. No more retries
   *    are needed and we can proceed with updating the cache and notifying
   *    subscribers (if it is the latest execution, otherwise only the cache
   *    will be updated and subscriptions will not be fired). This is the case
   *    handled by the attached then() handler.
   *
   * 2. The promise will throw because it either has an error or it came across
   *    an async dependency that has not yet resolved, in which case we will
   *    call wrapDepdencyPromise(), whose responsibility is to handle dependency
   *    promises. This case is handled by the attached catch() handler.
   *
   * Both branches will eventually resolve to the final result of the selector
   * (or an error if a real error occurred).
   *
   * The execution will run to completion even if it is stale, and its value
   * will be cached. But stale executions will not update global state or update
   * executionInfo as that is the responsibility of the 'latest' execution.
   *
   * Note this function should not be passed a promise that was thrown--AKA a
   * dependency promise. Dependency promises should be passed to
   * wrapPendingDependencyPromise()).
   */


  function wrapPendingPromise(store, promise, state, depValues, executionId, loadingDepsState) {
    return promise.then(value => {
      if (!selectorIsLive()) {
        // The selector was released since the request began; ignore the response.
        clearExecutionInfo(store, executionId);
        throw CANCELED;
      }

      const loadable = loadableWithValue$2(value);
      setCache(state, depValuesToDepRoute(depValues), loadable);
      setDepsInStore(store, state, new Set(depValues.keys()), executionId);
      setLoadableInStoreToNotifyDeps(store, loadable, executionId);
      return value;
    }).catch(errorOrPromise => {
      if (!selectorIsLive()) {
        // The selector was released since the request began; ignore the response.
        clearExecutionInfo(store, executionId);
        throw CANCELED;
      }

      if (isLatestExecution(store, executionId)) {
        updateExecutionInfoDepValues(depValues, store, executionId);
      }

      if (Recoil_isPromise(errorOrPromise)) {
        return wrapPendingDependencyPromise(store, errorOrPromise, state, depValues, executionId, loadingDepsState);
      }

      const loadable = loadableWithError$1(errorOrPromise);
      setCache(state, depValuesToDepRoute(depValues), loadable);
      setDepsInStore(store, state, new Set(depValues.keys()), executionId);
      setLoadableInStoreToNotifyDeps(store, loadable, executionId);
      throw errorOrPromise;
    });
  }
  /**
   * This function attaches a then() and a catch() to a promise that was
   * thrown from a selector's get(). If a selector's get() throws a promise,
   * we have two possibilities:
   *
   * 1. The promise will resolve, meaning one of our selector's dependencies is
   *    now available and we should "retry" our get() by running it again. This
   *    is the case handled by the attached then() handler.
   *
   * 2. The promise will throw because something went wrong with the dependency
   *    promise (in other words a real error occurred). This case is handled by
   *    the attached catch() handler. If the dependency promise throws, it is
   *    _always_ a real error and not another dependency promise (any dependency
   *    promises would have been handled upstream).
   *
   * The then() branch will eventually resolve to the final result of the
   * selector (or an error if a real error occurs), and the catch() will always
   * resolve to an error because the dependency promise is a promise that was
   * wrapped upstream, meaning it will only resolve to its real value or to a
   * real error.
   *
   * The execution will run to completion even if it is stale, and its value
   * will be cached. But stale executions will not update global state or update
   * executionInfo as that is the responsibility of the 'latest' execution.
   *
   * Note this function should not be passed a promise that was returned from
   * get(). The intention is that this function is only passed promises that
   * were thrown due to a pending dependency. Promises returned by get() should
   * be passed to wrapPendingPromise() instead.
   */


  function wrapPendingDependencyPromise(store, promise, state, existingDeps, executionId, loadingDepsState) {
    return promise.then(resolvedDep => {
      if (!selectorIsLive()) {
        // The selector was released since the request began; ignore the response.
        clearExecutionInfo(store, executionId);
        throw CANCELED;
      } // Check if we are handling a pending Recoil dependency or if the user
      // threw their own Promise to "suspend" a selector evaluation.  We need
      // to check that the loadingDepPromise actually matches the promise that
      // we caught in case the selector happened to catch the promise we threw
      // for a pending Recoil dependency from `getRecoilValue()` and threw
      // their own promise instead.


      if (loadingDepsState.loadingDepKey != null && loadingDepsState.loadingDepPromise === promise) {
        /**
         * Note for async atoms, this means we are changing the atom's value
         * in the store for the given version. This should be alright because
         * the version of state is now stale and a new version will have
         * already been triggered by the atom being resolved (see this logic
         * in Recoil_atom.js)
         */
        state.atomValues.set(loadingDepsState.loadingDepKey, loadableWithValue$2(resolvedDep));
      } else {
        /**
         * If resolvedDepKey is not defined, the promise was a user-thrown
         * promise. User-thrown promises are an advanced feature and they
         * should be avoided in almost all cases. Using `loadable.map()` inside
         * of selectors for loading loadables and then throwing that mapped
         * loadable's promise is an example of a user-thrown promise.
         *
         * When we hit a user-thrown promise, we have to bail out of an optimization
         * where we bypass calculating selector cache keys for selectors that
         * have been previously seen for a given state (these selectors are saved in
         * state.atomValues) to avoid stale state as we have no way of knowing
         * what state changes happened (if any) in result to the promise resolving.
         *
         * Ideally we would only bail out selectors that are in the chain of
         * dependencies for this selector, but there's currently no way to get
         * a full list of a selector's downstream nodes because the state that
         * is executing may be a discarded tree (so store.getGraph(state.version)
         * will be empty), and the full dep tree may not be in the selector
         * caches in the case where the selector's cache was cleared. To solve
         * for this we would have to keep track  of all running selector
         * executions and their downstream deps. Because this only covers edge
         * cases, that complexity might not be justifyable.
         */
        store.getState().knownSelectors.forEach(nodeKey => {
          state.atomValues.delete(nodeKey);
        });
      }
      /**
       * Optimization: Now that the dependency has resolved, let's try hitting
       * the cache in case the dep resolved to a value we have previously seen.
       *
       * TODO:
       * Note this optimization is not perfect because it only prevents re-executions
       * _after_ the point where an async dependency is found. Any code leading
       * up to the async dependency may have run unnecessarily. The ideal case
       * would be to wait for the async dependency to resolve first, check the
       * cache, and prevent _any_ execution of the selector if the resulting
       * value of the dependency leads to a path that is found in the cache.
       * The ideal case is more difficult to implement as it would require that
       * we capture and wait for the the async dependency right after checking
       * the cache. The current approach takes advantage of the fact that running
       * the selector already has a code path that lets us exit early when
       * an async dep resolves.
       */


      const cachedLoadable = getValFromCacheAndUpdatedDownstreamDeps(store, state);

      if (cachedLoadable && cachedLoadable.state === 'hasValue') {
        setExecutionInfo(cachedLoadable, store);
        return cachedLoadable.contents;
      }
      /**
       * If this execution is stale, let's check to see if there is some in
       * progress execution with a matching state. If we find a match, then
       * we can take the value from that in-progress execution. Note this may
       * sound like an edge case, but may be very common in cases where a
       * loading dependency resolves from loading to having a value (thus
       * possibly triggering a re-render), and React re-renders before the
       * chained .then() functions run, thus starting a new execution as the
       * dep has changed value. Without this check we will run the selector
       * twice (once in the new execution and once again in this .then(), so
       * this check is necessary to keep unnecessary re-executions to a
       * minimum).
       *
       * Also note this code does not check across all executions that may be
       * running. It only optimizes for the _latest_ execution per store as
       * we currently do not maintain a list of all currently running executions.
       * This means in some cases we may run selectors more than strictly
       * necessary when there are multiple executions running for the same
       * selector. This may be a valid tradeoff as checking for dep changes
       * across all in-progress executions may take longer than just
       * re-running the selector. This will be app-dependent, and maybe in the
       * future we can make the behavior configurable. An ideal fix may be
       * to extend the tree cache to support caching loading states.
       */


      if (!isLatestExecution(store, executionId)) {
        var _executionInfo$latest;

        const executionInfo = getExecutionInfoOfInProgressExecution(state);

        if ((executionInfo === null || executionInfo === void 0 ? void 0 : (_executionInfo$latest = executionInfo.latestLoadable) === null || _executionInfo$latest === void 0 ? void 0 : _executionInfo$latest.state) === 'loading') {
          /**
           * Returning promise here without wrapping as the wrapper logic was
           * already done upstream when this promise was generated.
           */
          return executionInfo.latestLoadable.contents;
        }
      }

      const [loadable, depValues] = evaluateSelectorGetter(store, state, executionId);

      if (isLatestExecution(store, executionId)) {
        updateExecutionInfoDepValues(depValues, store, executionId);
      }

      if (loadable.state !== 'loading') {
        setCache(state, depValuesToDepRoute(depValues), loadable);
        setDepsInStore(store, state, new Set(depValues.keys()), executionId);
        setLoadableInStoreToNotifyDeps(store, loadable, executionId);
      }

      if (loadable.state === 'hasError') {
        throw loadable.contents;
      }
      /**
       * Returning any promises here without wrapping as the wrapepr logic was
       * already done when we called evaluateSelectorGetter() to get this
       * loadable
       */


      return loadable.contents;
    }).catch(error => {
      if (error instanceof Canceled) {
        throw CANCELED;
      }

      if (!selectorIsLive()) {
        // The selector was released since the request began; ignore the response.
        clearExecutionInfo(store, executionId);
        throw CANCELED;
      }

      const loadable = loadableWithError$1(error);
      setCache(state, depValuesToDepRoute(existingDeps), loadableWithError$1(error));
      setDepsInStore(store, state, new Set(existingDeps.keys()), executionId);
      setLoadableInStoreToNotifyDeps(store, loadable, executionId);
      throw error;
    });
  }

  function setLoadableInStoreToNotifyDeps(store, loadable, executionId) {
    if (isLatestExecution(store, executionId)) {
      setExecutionInfo(loadable, store);
      notifyStoresOfSettledAsync(loadable, executionId);
    }
  }

  function setDepsInStore(store, state, deps, executionId) {
    var _store$getState, _store$getState$curre, _store$getState2, _store$getState2$next;

    if (isLatestExecution(store, executionId) || state.version === ((_store$getState = store.getState()) === null || _store$getState === void 0 ? void 0 : (_store$getState$curre = _store$getState.currentTree) === null || _store$getState$curre === void 0 ? void 0 : _store$getState$curre.version) || state.version === ((_store$getState2 = store.getState()) === null || _store$getState2 === void 0 ? void 0 : (_store$getState2$next = _store$getState2.nextTree) === null || _store$getState2$next === void 0 ? void 0 : _store$getState2$next.version)) {
      var _store$getState$nextT, _store$getState3, _store$getState3$next;

      saveDependencyMapToStore$1(new Map([[key, deps]]), store, (_store$getState$nextT = (_store$getState3 = store.getState()) === null || _store$getState3 === void 0 ? void 0 : (_store$getState3$next = _store$getState3.nextTree) === null || _store$getState3$next === void 0 ? void 0 : _store$getState3$next.version) !== null && _store$getState$nextT !== void 0 ? _store$getState$nextT : store.getState().currentTree.version);
    }
  }

  function setNewDepInStore(store, state, deps, newDepKey, executionId) {
    deps.add(newDepKey);
    setDepsInStore(store, state, deps, executionId);
  }

  function evaluateSelectorGetter(store, state, executionId) {
    const endPerfBlock = startPerfBlock$1(key); // TODO T63965866: use execution ID here

    let result;
    let resultIsError = false;
    let loadable;
    const loadingDepsState = {
      loadingDepKey: null,
      loadingDepPromise: null
    };
    const depValues = new Map();
    /**
     * Starting a fresh set of deps that we'll be using to update state. We're
     * starting a new set versus adding it in existing state deps because
     * the version of state that we update deps for may be a more recent version
     * than the version the selector was called with. This is because the latest
     * execution will update the deps of the current/latest version of state (
     * this is safe to do because the fact that the selector is the latest
     * execution means the deps we discover below are our best guess at the
     * deps for the current/latest state in the store)
     */

    const deps = new Set();
    setDepsInStore(store, state, deps, executionId);

    function getRecoilValue(dep) {
      const {
        key: depKey
      } = dep;
      setNewDepInStore(store, state, deps, depKey, executionId);
      const depLoadable = getCachedNodeLoadable(store, state, depKey);
      depValues.set(depKey, depLoadable);

      switch (depLoadable.state) {
        case 'hasValue':
          return depLoadable.contents;

        case 'hasError':
          throw depLoadable.contents;

        case 'loading':
          loadingDepsState.loadingDepKey = depKey;
          loadingDepsState.loadingDepPromise = depLoadable.contents;
          throw depLoadable.contents;
      }

      throw Recoil_err('Invalid Loadable state');
    }

    let gateCallback = false;

    const getCallback = fn => {
      return (...args) => {
        if (!gateCallback) {
          throw Recoil_err('getCallback() should only be called asynchronously after the selector is evalutated.  It can be used for selectors to return objects with callbacks that can obtain the current Recoil state without a subscription.');
        }

        const snapshot = cloneSnapshot$3(store);
        const cb = fn({
          snapshot
        });

        if (typeof cb !== 'function') {
          throw Recoil_err('getCallback() expects a function that returns a function.');
        }

        return cb(...args);
      };
    };

    try {
      result = get({
        get: getRecoilValue,
        getCallback
      });
      result = isRecoilValue$3(result) ? getRecoilValue(result) : result;
      gateCallback = true;

      if (Recoil_isPromise(result)) {
        result = wrapPendingPromise(store, result, state, depValues, executionId, loadingDepsState).finally(endPerfBlock);
      } else {
        endPerfBlock();
      }
    } catch (errorOrDepPromise) {
      result = errorOrDepPromise;

      if (Recoil_isPromise(result)) {
        result = wrapPendingDependencyPromise(store, result, state, depValues, executionId, loadingDepsState).finally(endPerfBlock);
      } else {
        resultIsError = true;
        endPerfBlock();
      }
    }

    if (resultIsError) {
      loadable = loadableWithError$1(result);
    } else if (Recoil_isPromise(result)) {
      loadable = loadableWithPromise$1(result);
    } else {
      loadable = loadableWithValue$2(result);
    }

    if (loadable.state !== 'loading') {
      maybeFreezeValue(loadable.contents);
    }

    return [loadable, depValues];
  }

  function getValFromCacheAndUpdatedDownstreamDeps(store, state) {
    const depsAfterCacheDone = new Set();
    const executionInfo = getExecutionInfo(store);
    let cachedVal;

    try {
      cachedVal = cache.get(nodeKey => {
        !(typeof nodeKey === 'string') ? "production" !== "production" ? Recoil_invariant(false, 'Cache nodeKey is type string') : Recoil_invariant(false) : void 0;
        const loadable = getCachedNodeLoadable(store, state, nodeKey);
        return loadable.contents;
      }, {
        onNodeVisit: node => {
          if (node.type === 'branch' && node.nodeKey !== key && typeof node.nodeKey === 'string') {
            depsAfterCacheDone.add(node.nodeKey);
            discoveredDependencyNodeKeys.add(node.nodeKey);
          }
        }
      });
    } catch (error) {
      throw Recoil_err(`Problem with cache lookup for selector "${key}": ${error.message}`);
    }
    /**
     * Ensure store contains correct dependencies if we hit the cache so that
     * the store deps and cache are in sync for a given state. This is important
     * because store deps are normally updated when new executions are created,
     * but cache hits don't trigger new executions but they still _may_ signifiy
     * a change in deps in the store if the store deps for this state are empty
     * or stale.
     */


    if (cachedVal) {
      setDepsInStore(store, state, depsAfterCacheDone, executionInfo.latestExecutionId);
    }

    return cachedVal;
  }
  /**
   * FIXME: dep keys should take into account the state of the loadable to
   * prevent the edge case where a loadable with an error and a loadable with
   * an error as a value are treated as the same thing incorrectly. For example
   * these two should be treated differently:
   *
   * selector({key: '', get: () => new Error('hi')});
   * selector({key: '', get () => {throw new Error('hi')}});
   *
   * With current implementation they are treated the same
   */


  function depValuesToDepRoute(depValues) {
    return Array.from(depValues.entries()).map(([depKey, valLoadable]) => [depKey, valLoadable.contents]);
  }

  function getValFromRunningNewExecutionAndUpdatedDeps(store, state) {
    const newExecutionId = getNewExecutionId();
    const [loadable, newDepValues] = evaluateSelectorGetter(store, state, newExecutionId);
    setExecutionInfo(loadable, store, newDepValues, newExecutionId, state);
    maybeSetCacheWithLoadable(state, depValuesToDepRoute(newDepValues), loadable);
    notifyStoreWhenAsyncSettles(store, loadable, newExecutionId);
    return loadable;
  }
  /**
   * Given a tree state, this function returns the "selector result", which is
   * defined as a size-2 tuple of [DependencyMap, Loadable<T>].
   *
   * The selector's get() function will only be re-evaluated if _both_ of the
   * following statements are true:
   *
   * 1. The current dep values from the given state produced a cache key that
   *    was not found in the cache.
   * 2. There is no currently running async execution OR there is an
   *    async execution that is running, but after comparing the dep values in
   *    the given state with the dep values that the execution has discovered so
   *    far we find that at least one dep value has changed, in which case we
   *    start a new execution (the previously running execution will continue to
   *    run to completion, but only the new execution will be deemed the
   *    'latest' execution, meaning it will be the only execution that will
   *    update global state when it is finished. Any non-latest executions will
   *    run to completion and update the selector cache but not global state).
   */


  function getSelectorValAndUpdatedDeps(store, state) {
    const cachedVal = getValFromCacheAndUpdatedDownstreamDeps(store, state);

    if (cachedVal != null) {
      setExecutionInfo(cachedVal, store);
      return cachedVal;
    }

    const inProgressExecutionInfo = getExecutionInfoOfInProgressExecution(state); // FIXME: this won't work with custom caching b/c it uses separate cache

    if (inProgressExecutionInfo) {
      const executionInfo = inProgressExecutionInfo;
      notifyStoreWhenAsyncSettles(store, Recoil_nullthrows(executionInfo.latestLoadable), Recoil_nullthrows(executionInfo.latestExecutionId)); // FIXME: check after the fact to see if we made the right choice by waiting

      return Recoil_nullthrows(executionInfo.latestLoadable);
    }

    return getValFromRunningNewExecutionAndUpdatedDeps(store, state);
  }
  /**
   * Searches execution info across all stores to see if there is an in-progress
   * execution whose dependency values match the values of the requesting store.
   */


  function getExecutionInfoOfInProgressExecution(state) {
    var _Array$from$find;

    const [, executionInfo] = (_Array$from$find = Array.from(executionInfoMap.entries()).find(([store, execInfo]) => {
      return execInfo.latestLoadable != null && execInfo.latestExecutionId != null && !haveAsyncDepsChanged(store, state);
    })) !== null && _Array$from$find !== void 0 ? _Array$from$find : [];
    return executionInfo;
  }

  const mapOfCheckedVersions = new Map();

  function haveAsyncDepsChanged(store, state) {
    var _executionInfo$depVal, _mapOfCheckedVersions;

    const executionInfo = getExecutionInfo(store);
    const oldDepValues = (_executionInfo$depVal = executionInfo.depValuesDiscoveredSoFarDuringAsyncWork) !== null && _executionInfo$depVal !== void 0 ? _executionInfo$depVal : new Map();
    const cachedDepValuesCheckedForThisVersion = Array(((_mapOfCheckedVersions = mapOfCheckedVersions.get(state.version)) !== null && _mapOfCheckedVersions !== void 0 ? _mapOfCheckedVersions : new Map()).entries());
    const isCachedVersionSame = mapOfCheckedVersions.has(state.version) && cachedDepValuesCheckedForThisVersion.length === oldDepValues.size && cachedDepValuesCheckedForThisVersion.every(([nodeKey, nodeVal]) => {
      return oldDepValues.get(nodeKey) === nodeVal;
    });

    if (oldDepValues == null || state.version === executionInfo.stateVersion || isCachedVersionSame) {
      return false;
    }

    mapOfCheckedVersions.set(state.version, new Map(oldDepValues));
    return Array.from(oldDepValues).some(([nodeKey, oldVal]) => {
      const loadable = getCachedNodeLoadable(store, state, nodeKey);
      return loadable.contents !== oldVal.contents;
    });
  }
  /**
   * This function will update the selector's execution info when the selector
   * has either finished running an execution or has started a new execution. If
   * the given loadable is in a 'loading' state, the intention is that a new
   * execution has started. Otherwise, the intention is that an execution has
   * just finished.
   */


  function setExecutionInfo(loadable, store, depValues, newExecutionId, state) {
    const executionInfo = getExecutionInfo(store);

    if (loadable.state === 'loading') {
      executionInfo.depValuesDiscoveredSoFarDuringAsyncWork = depValues;
      executionInfo.latestExecutionId = newExecutionId;
      executionInfo.latestLoadable = loadable;
      executionInfo.stateVersion = state === null || state === void 0 ? void 0 : state.version;
    } else {
      executionInfo.depValuesDiscoveredSoFarDuringAsyncWork = null;
      executionInfo.latestExecutionId = null;
      executionInfo.latestLoadable = null;
      executionInfo.stateVersion = null;
    }
  }
  /**
   * Conditionally updates the cache with a given loadable.
   *
   * We only cache loadables that are not loading because our cache keys are
   * based on dep values, which are in an unfinished state for loadables that
   * have a 'loading' state (new deps may be discovered while the selector
   * runs its async code). We never want to cache partial dependencies b/c it
   * could lead to errors, such as prematurely returning the result based on a
   * partial list of deps-- we need the full list of deps to ensure that we
   * are returning the correct result from cache.
   */


  function maybeSetCacheWithLoadable(state, depRoute, loadable) {
    if (loadable.state !== 'loading') {
      setCache(state, depRoute, loadable);
    }
  }

  function updateExecutionInfoDepValues(depValues, store, executionId) {
    const executionInfo = getExecutionInfo(store);

    if (isLatestExecution(store, executionId)) {
      executionInfo.depValuesDiscoveredSoFarDuringAsyncWork = depValues;
    }
  }

  function clearExecutionInfo(store, executionId) {
    if (isLatestExecution(store, executionId)) {
      executionInfoMap.delete(store);
    }
  }

  function isLatestExecution(store, executionId) {
    const executionInfo = getExecutionInfo(store);
    return executionId === executionInfo.latestExecutionId;
  }

  function maybeFreezeValue(val) {
  }

  function setCache(state, cacheRoute, loadable) {
    state.atomValues.set(key, loadable);

    try {
      cache.set(cacheRoute, loadable);
    } catch (error) {
      throw Recoil_err(`Problem with setting cache for selector "${key}": ${error.message}`);
    }
  }

  function detectCircularDependencies(fn) {
    if (dependencyStack.includes(key)) {
      const message = `Recoil selector has circular dependencies: ${dependencyStack.slice(dependencyStack.indexOf(key)).join(' \u2192 ')}`;
      return loadableWithError$1(Recoil_err(message));
    }

    dependencyStack.push(key);

    try {
      return fn();
    } finally {
      dependencyStack.pop();
    }
  }

  function selectorPeek(store, state) {
    const cacheVal = cache.get(nodeKey => {
      !(typeof nodeKey === 'string') ? Recoil_invariant(false) : void 0;
      const peek = peekNodeLoadable$1(store, state, nodeKey);
      return peek === null || peek === void 0 ? void 0 : peek.contents;
    });
    return cacheVal;
  }

  function selectorGet(store, state) {
    return detectCircularDependencies(() => getSelectorValAndUpdatedDeps(store, state));
  }

  function invalidateSelector(state) {
    state.atomValues.delete(key);
  }

  function clearSelectorCache(store, treeState) {
    !(recoilValue != null) ? Recoil_invariant(false) : void 0;

    for (const nodeKey of discoveredDependencyNodeKeys) {
      var _node$clearCache;

      const node = getNode$6(nodeKey);
      (_node$clearCache = node.clearCache) === null || _node$clearCache === void 0 ? void 0 : _node$clearCache.call(node, store, treeState);
    }

    invalidateSelector(treeState);
    cache.clear();
    markRecoilValueModified$1(store, recoilValue);
  }

  if (set != null) {
    /**
     * ES5 strict mode prohibits defining non-top-level function declarations,
     * so don't use function declaration syntax here
     */
    const selectorSet = (store, state, newValue) => {
      let syncSelectorSetFinished = false;
      const writes = new Map();

      function getRecoilValue({
        key: depKey
      }) {
        if (syncSelectorSetFinished) {
          throw Recoil_err('Recoil: Async selector sets are not currently supported.');
        }

        const loadable = getCachedNodeLoadable(store, state, depKey);

        if (loadable.state === 'hasValue') {
          return loadable.contents;
        } else if (loadable.state === 'loading') {
          throw new RecoilValueNotReady$2(depKey);
        } else {
          throw loadable.contents;
        }
      }

      function setRecoilState(recoilState, valueOrUpdater) {
        if (syncSelectorSetFinished) {
          throw Recoil_err('Recoil: Async selector sets are not currently supported.');
        }

        const setValue = typeof valueOrUpdater === 'function' ? // cast to any because we can't restrict type S from being a function itself without losing support for opaque types
        // flowlint-next-line unclear-type:off
        valueOrUpdater(getRecoilValue(recoilState)) : valueOrUpdater;
        const upstreamWrites = setNodeValue$3(store, state, recoilState.key, setValue);
        upstreamWrites.forEach((v, k) => writes.set(k, v));
      }

      function resetRecoilState(recoilState) {
        setRecoilState(recoilState, DEFAULT_VALUE$6);
      }

      const ret = set({
        set: setRecoilState,
        get: getRecoilValue,
        reset: resetRecoilState
      }, newValue); // set should be a void method, but if the user makes it `async`, then it
      // will return a Promise, which we don't currently support.

      if (ret !== undefined) {
        throw Recoil_isPromise(ret) ? Recoil_err('Recoil: Async selector sets are not currently supported.') : Recoil_err('Recoil: selector set should be a void function.');
      }

      syncSelectorSetFinished = true;
      return writes;
    };

    return recoilValue = registerNode$1({
      key,
      nodeType: 'selector',
      peek: selectorPeek,
      get: selectorGet,
      set: selectorSet,
      init: selectorInit,
      invalidate: invalidateSelector,
      clearCache: clearSelectorCache,
      shouldDeleteConfigOnRelease: selectorShouldDeleteConfigOnRelease,
      dangerouslyAllowMutability: options.dangerouslyAllowMutability,
      shouldRestoreFromSnapshots: false,
      retainedBy
    });
  } else {
    return recoilValue = registerNode$1({
      key,
      nodeType: 'selector',
      peek: selectorPeek,
      get: selectorGet,
      init: selectorInit,
      invalidate: invalidateSelector,
      clearCache: clearSelectorCache,
      shouldDeleteConfigOnRelease: selectorShouldDeleteConfigOnRelease,
      dangerouslyAllowMutability: options.dangerouslyAllowMutability,
      shouldRestoreFromSnapshots: false,
      retainedBy
    });
  }
}
/* eslint-enable no-redeclare */


var Recoil_selector = selector;

// @fb-only: const {scopedAtom} = require('Recoil_ScopedAtom');
const {
  loadableWithError: loadableWithError$2,
  loadableWithPromise: loadableWithPromise$2,
  loadableWithValue: loadableWithValue$3
} = Recoil_Loadable$1;

const {
  peekNodeInfo: peekNodeInfo$3
} = Recoil_FunctionalCore;

const {
  DEFAULT_VALUE: DEFAULT_VALUE$7,
  DefaultValue: DefaultValue$2,
  getConfigDeletionHandler: getConfigDeletionHandler$2,
  registerNode: registerNode$2,
  setConfigDeletionHandler: setConfigDeletionHandler$1
} = Recoil_Node;

const {
  isRecoilValue: isRecoilValue$4
} = Recoil_RecoilValue$1;

const {
  getRecoilValueAsLoadable: getRecoilValueAsLoadable$4,
  markRecoilValueModified: markRecoilValueModified$2,
  setRecoilValue: setRecoilValue$4,
  setRecoilValueLoadable: setRecoilValueLoadable$3
} = Recoil_RecoilValueInterface;

const {
  retainedByOptionWithDefault: retainedByOptionWithDefault$2
} = Recoil_Retention;















function baseAtom(options) {
  const {
    key,
    persistence_UNSTABLE: persistence
  } = options;
  const retainedBy = retainedByOptionWithDefault$2(options.retainedBy_UNSTABLE);
  let liveStoresCount = 0;
  let defaultLoadable = Recoil_isPromise(options.default) ? loadableWithPromise$2(options.default.then(value => {
    defaultLoadable = loadableWithValue$3(value);
    return value;
  }).catch(error => {
    defaultLoadable = loadableWithError$2(error);
    throw error;
  })) : loadableWithValue$3(options.default);
  maybeFreezeValueOrPromise(options.default);
  let cachedAnswerForUnvalidatedValue = undefined; // Cleanup handlers for this atom
  // Rely on stable reference equality of the store to use it as a key per <RecoilRoot>

  const cleanupEffectsByStore = new Map();

  function maybeFreezeValueOrPromise(valueOrPromise) {

    return valueOrPromise;
  }

  function wrapPendingPromise(store, promise) {
    const wrappedPromise = promise.then(value => {
      var _store$getState$nextT, _state$atomValues$get;

      const state = (_store$getState$nextT = store.getState().nextTree) !== null && _store$getState$nextT !== void 0 ? _store$getState$nextT : store.getState().currentTree;

      if (((_state$atomValues$get = state.atomValues.get(key)) === null || _state$atomValues$get === void 0 ? void 0 : _state$atomValues$get.contents) === wrappedPromise) {
        setRecoilValue$4(store, node, value);
      }

      return value;
    }).catch(error => {
      var _store$getState$nextT2, _state$atomValues$get2;

      const state = (_store$getState$nextT2 = store.getState().nextTree) !== null && _store$getState$nextT2 !== void 0 ? _store$getState$nextT2 : store.getState().currentTree;

      if (((_state$atomValues$get2 = state.atomValues.get(key)) === null || _state$atomValues$get2 === void 0 ? void 0 : _state$atomValues$get2.contents) === wrappedPromise) {
        setRecoilValueLoadable$3(store, node, loadableWithError$2(error));
      }

      throw error;
    });
    return wrappedPromise;
  }

  function initAtom(store, initState, trigger) {
    liveStoresCount++;
    const alreadyKnown = store.getState().knownAtoms.has(key);
    store.getState().knownAtoms.add(key); // Setup async defaults to notify subscribers when they resolve

    if (defaultLoadable.state === 'loading') {
      const notifyDefaultSubscribers = () => {
        var _store$getState$nextT3;

        const state = (_store$getState$nextT3 = store.getState().nextTree) !== null && _store$getState$nextT3 !== void 0 ? _store$getState$nextT3 : store.getState().currentTree;

        if (!state.atomValues.has(key)) {
          markRecoilValueModified$2(store, node);
        }
      };

      defaultLoadable.contents.then(notifyDefaultSubscribers).catch(notifyDefaultSubscribers);
    } // Run Atom Effects
    // This state is scoped by Store, since this is in the initAtom() closure


    let initValue = DEFAULT_VALUE$7;
    let pendingSetSelf = null;

    if (options.effects_UNSTABLE != null && !alreadyKnown) {
      let duringInit = true;

      function getLoadable(recoilValue) {
        // Normally we can just get the current value of another atom.
        // But for our own value we need to check if there is a pending
        // initialized value or get the fallback default value.
        if (duringInit && recoilValue.key === key && !(initValue instanceof DefaultValue$2)) {
          // Cast T to S
          const retValue = initValue; // flowlint-line unclear-type:off

          return retValue instanceof DefaultValue$2 ? defaultLoadable : // flowlint-line unclear-type:off
          Recoil_isPromise(retValue) ? loadableWithPromise$2(retValue.then(v => v instanceof DefaultValue$2 ? // Cast T to S
          defaultLoadable.toPromise() // flowlint-line unclear-type:off
          : v)) : loadableWithValue$3(retValue);
        }

        return getRecoilValueAsLoadable$4(store, recoilValue);
      }

      function getPromise(recoilValue) {
        return getLoadable(recoilValue).toPromise();
      }

      function getInfo_UNSTABLE(recoilValue) {
        var _store$getState$nextT4;

        const info = peekNodeInfo$3(store, (_store$getState$nextT4 = store.getState().nextTree) !== null && _store$getState$nextT4 !== void 0 ? _store$getState$nextT4 : store.getState().currentTree, recoilValue.key);
        return duringInit && recoilValue.key === key && !(initValue instanceof DefaultValue$2) ? { ...info,
          isSet: true,
          loadable: getLoadable(recoilValue)
        } : info;
      }

      const setSelf = effect => valueOrUpdater => {
        if (duringInit) {
          const currentValue = initValue instanceof DefaultValue$2 || Recoil_isPromise(initValue) ? defaultLoadable.state === 'hasValue' ? defaultLoadable.contents : DEFAULT_VALUE$7 : initValue;
          initValue = typeof valueOrUpdater === 'function' ? // cast to any because we can't restrict T from being a function without losing support for opaque types
          valueOrUpdater(currentValue) // flowlint-line unclear-type:off
          : valueOrUpdater;

          if (Recoil_isPromise(initValue)) {
            initValue = initValue.then(value => {
              // Avoid calling onSet() when setSelf() initializes with a Promise
              pendingSetSelf = {
                effect,
                value
              };
              return value;
            });
          }
        } else {
          if (Recoil_isPromise(valueOrUpdater)) {
            throw Recoil_err('Setting atoms to async values is not implemented.');
          }

          if (typeof valueOrUpdater !== 'function') {
            pendingSetSelf = {
              effect,
              value: valueOrUpdater
            };
          }

          setRecoilValue$4(store, node, typeof valueOrUpdater === 'function' ? currentValue => {
            const newValue = // cast to any because we can't restrict T from being a function without losing support for opaque types
            valueOrUpdater(currentValue); // flowlint-line unclear-type:off

            pendingSetSelf = {
              effect,
              value: newValue
            };
            return newValue;
          } : valueOrUpdater);
        }
      };

      const resetSelf = effect => () => setSelf(effect)(DEFAULT_VALUE$7);

      const onSet = effect => handler => {
        store.subscribeToTransactions(currentStore => {
          var _currentTree$atomValu;

          // eslint-disable-next-line prefer-const
          let {
            currentTree,
            previousTree
          } = currentStore.getState();

          if (!previousTree) {
            previousTree = currentTree; // attempt to trundle on
          }

          const newLoadable = (_currentTree$atomValu = currentTree.atomValues.get(key)) !== null && _currentTree$atomValu !== void 0 ? _currentTree$atomValu : defaultLoadable;

          if (newLoadable.state === 'hasValue') {
            var _previousTree$atomVal, _pendingSetSelf, _pendingSetSelf2, _pendingSetSelf3;

            const newValue = newLoadable.contents;
            const oldLoadable = (_previousTree$atomVal = previousTree.atomValues.get(key)) !== null && _previousTree$atomVal !== void 0 ? _previousTree$atomVal : defaultLoadable;
            const oldValue = oldLoadable.state === 'hasValue' ? oldLoadable.contents : DEFAULT_VALUE$7; // TODO This isn't actually valid, use as a placeholder for now.
            // Ignore atom value changes that were set via setSelf() in the same effect.
            // We will still properly call the handler if there was a subsequent
            // set from something other than an atom effect which was batched
            // with the `setSelf()` call.  However, we may incorrectly ignore
            // the handler if the subsequent batched call happens to set the
            // atom to the exact same value as the `setSelf()`.   But, in that
            // case, it was kind of a noop, so the semantics are debatable..

            if (((_pendingSetSelf = pendingSetSelf) === null || _pendingSetSelf === void 0 ? void 0 : _pendingSetSelf.effect) !== effect || ((_pendingSetSelf2 = pendingSetSelf) === null || _pendingSetSelf2 === void 0 ? void 0 : _pendingSetSelf2.value) !== newValue) {
              handler(newValue, oldValue, !currentTree.atomValues.has(key));
            } else if (((_pendingSetSelf3 = pendingSetSelf) === null || _pendingSetSelf3 === void 0 ? void 0 : _pendingSetSelf3.effect) === effect) {
              pendingSetSelf = null;
            }
          }
        }, key);
      };

      for (const effect of (_options$effects_UNST = options.effects_UNSTABLE) !== null && _options$effects_UNST !== void 0 ? _options$effects_UNST : []) {
        var _options$effects_UNST;

        const cleanup = effect({
          node,
          trigger,
          setSelf: setSelf(effect),
          resetSelf: resetSelf(effect),
          onSet: onSet(effect),
          getPromise,
          getLoadable,
          getInfo_UNSTABLE
        });

        if (cleanup != null) {
          var _cleanupEffectsByStor;

          cleanupEffectsByStore.set(store, [...((_cleanupEffectsByStor = cleanupEffectsByStore.get(store)) !== null && _cleanupEffectsByStor !== void 0 ? _cleanupEffectsByStor : []), cleanup]);
        }
      }

      duringInit = false;
    } // Mutate initial state in place since we know there are no other subscribers
    // since we are the ones initializing on first use.


    if (!(initValue instanceof DefaultValue$2)) {
      var _store$getState$nextT5;

      const frozenInitValue = maybeFreezeValueOrPromise(initValue);
      const initLoadable = Recoil_isPromise(frozenInitValue) ? loadableWithPromise$2(wrapPendingPromise(store, frozenInitValue)) : loadableWithValue$3(frozenInitValue);
      initState.atomValues.set(key, initLoadable); // If there is a pending transaction, then also mutate the next state tree.
      // This could happen if the atom was first initialized in an action that
      // also updated some other atom's state.

      (_store$getState$nextT5 = store.getState().nextTree) === null || _store$getState$nextT5 === void 0 ? void 0 : _store$getState$nextT5.atomValues.set(key, initLoadable);
    }

    return () => {
      var _cleanupEffectsByStor2;

      liveStoresCount--;
      (_cleanupEffectsByStor2 = cleanupEffectsByStore.get(store)) === null || _cleanupEffectsByStor2 === void 0 ? void 0 : _cleanupEffectsByStor2.forEach(cleanup => cleanup());
      cleanupEffectsByStore.delete(store);
      store.getState().knownAtoms.delete(key); // FIXME remove knownAtoms?
    };
  }

  function peekAtom(_store, state) {
    var _ref, _state$atomValues$get3;

    return (_ref = (_state$atomValues$get3 = state.atomValues.get(key)) !== null && _state$atomValues$get3 !== void 0 ? _state$atomValues$get3 : cachedAnswerForUnvalidatedValue) !== null && _ref !== void 0 ? _ref : defaultLoadable;
  }

  function getAtom(_store, state) {
    if (state.atomValues.has(key)) {
      // Atom value is stored in state:
      return Recoil_nullthrows(state.atomValues.get(key));
    } else if (state.nonvalidatedAtoms.has(key)) {
      // Atom value is stored but needs validation before use.
      // We might have already validated it and have a cached validated value:
      if (cachedAnswerForUnvalidatedValue != null) {
        return cachedAnswerForUnvalidatedValue;
      }

      if (persistence == null) {
        return defaultLoadable;
      }

      const nonvalidatedValue = state.nonvalidatedAtoms.get(key);
      const validatorResult = persistence.validator(nonvalidatedValue, DEFAULT_VALUE$7);
      const validatedValueLoadable = validatorResult instanceof DefaultValue$2 ? defaultLoadable : loadableWithValue$3(validatorResult);
      cachedAnswerForUnvalidatedValue = validatedValueLoadable;
      return cachedAnswerForUnvalidatedValue;
    } else {
      return defaultLoadable;
    }
  }

  function invalidateAtom() {
    cachedAnswerForUnvalidatedValue = undefined;
  }

  function setAtom(_store, state, newValue) {
    // Bail out if we're being set to the existing value, or if we're being
    // reset but have no stored value (validated or unvalidated) to reset from:
    if (state.atomValues.has(key)) {
      const existing = Recoil_nullthrows(state.atomValues.get(key));

      if (existing.state === 'hasValue' && newValue === existing.contents) {
        return new Map();
      }
    } else if (!state.nonvalidatedAtoms.has(key) && newValue instanceof DefaultValue$2) {
      return new Map();
    }
    cachedAnswerForUnvalidatedValue = undefined; // can be released now if it was previously in use

    return new Map().set(key, loadableWithValue$3(newValue));
  }

  function shouldDeleteConfigOnReleaseAtom() {
    return getConfigDeletionHandler$2(key) !== undefined && liveStoresCount <= 0;
  }

  const node = registerNode$2({
    key,
    nodeType: 'atom',
    peek: peekAtom,
    get: getAtom,
    set: setAtom,
    init: initAtom,
    invalidate: invalidateAtom,
    shouldDeleteConfigOnRelease: shouldDeleteConfigOnReleaseAtom,
    dangerouslyAllowMutability: options.dangerouslyAllowMutability,
    persistence_UNSTABLE: options.persistence_UNSTABLE ? {
      type: options.persistence_UNSTABLE.type,
      backButton: options.persistence_UNSTABLE.backButton
    } : undefined,
    shouldRestoreFromSnapshots: true,
    retainedBy
  });
  return node;
} // prettier-ignore


function atom(options) {

  const {
    default: optionsDefault,
    // @fb-only: scopeRules_APPEND_ONLY_READ_THE_DOCS,
    ...restOptions
  } = options;

  if (isRecoilValue$4(optionsDefault) // Continue to use atomWithFallback for promise defaults for scoped atoms
  // for now, since scoped atoms don't support async defaults
  // @fb-only: || (isPromise(optionsDefault) && scopeRules_APPEND_ONLY_READ_THE_DOCS)
  ) {
      return atomWithFallback({ ...restOptions,
        default: optionsDefault // @fb-only: scopeRules_APPEND_ONLY_READ_THE_DOCS,

      }); // @fb-only: } else if (scopeRules_APPEND_ONLY_READ_THE_DOCS && !isPromise(optionsDefault)) {
      // @fb-only: return scopedAtom<T>({
      // @fb-only: ...restOptions,
      // @fb-only: default: optionsDefault,
      // @fb-only: scopeRules_APPEND_ONLY_READ_THE_DOCS,
      // @fb-only: });
    } else {
    return baseAtom({ ...restOptions,
      default: optionsDefault
    });
  }
}

function atomWithFallback(options) {
  const base = atom({ ...options,
    default: DEFAULT_VALUE$7,
    persistence_UNSTABLE: options.persistence_UNSTABLE === undefined ? undefined : { ...options.persistence_UNSTABLE,
      validator: storedValue => storedValue instanceof DefaultValue$2 ? storedValue : Recoil_nullthrows(options.persistence_UNSTABLE).validator(storedValue, DEFAULT_VALUE$7)
    },
    // TODO Hack for now.
    // flowlint-next-line unclear-type: off
    effects_UNSTABLE: options.effects_UNSTABLE
  });
  const sel = Recoil_selector({
    key: `${options.key}__withFallback`,
    get: ({
      get
    }) => {
      const baseValue = get(base);
      return baseValue instanceof DefaultValue$2 ? options.default : baseValue;
    },
    set: ({
      set
    }, newValue) => set(base, newValue),
    dangerouslyAllowMutability: options.dangerouslyAllowMutability
  });
  setConfigDeletionHandler$1(sel.key, getConfigDeletionHandler$2(options.key));
  return sel;
}

var Recoil_atom = atom;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

class MapCache {
  constructor(options) {
    var _options$mapKey;

    _defineProperty(this, "_map", void 0);

    _defineProperty(this, "_keyMapper", void 0);

    this._map = new Map();
    this._keyMapper = (_options$mapKey = options === null || options === void 0 ? void 0 : options.mapKey) !== null && _options$mapKey !== void 0 ? _options$mapKey : v => v;
  }

  size() {
    return this._map.size;
  }

  has(key) {
    return this._map.has(this._keyMapper(key));
  }

  get(key) {
    return this._map.get(this._keyMapper(key));
  }

  set(key, val) {
    this._map.set(this._keyMapper(key), val);
  }

  delete(key) {
    this._map.delete(this._keyMapper(key));
  }

  clear() {
    this._map.clear();
  }

}

var Recoil_MapCache = {
  MapCache
};

var Recoil_MapCache_1 = Recoil_MapCache.MapCache;

var Recoil_MapCache$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MapCache: Recoil_MapCache_1
});

const {
  LRUCache: LRUCache$2
} = Recoil_LRUCache$1;

const {
  MapCache: MapCache$1
} = Recoil_MapCache$1;

const defaultPolicy$1 = {
  equality: 'reference',
  eviction: 'none',
  maxSize: Infinity
};

function cacheFromPolicy({
  equality = defaultPolicy$1.equality,
  eviction = defaultPolicy$1.eviction,
  maxSize = defaultPolicy$1.maxSize
} = defaultPolicy$1) {
  const valueMapper = getValueMapper$1(equality);
  const cache = getCache(eviction, maxSize, valueMapper);
  return cache;
}

function getValueMapper$1(equality) {
  switch (equality) {
    case 'reference':
      return val => val;

    case 'value':
      return val => Recoil_stableStringify(val);
  }

  throw Recoil_err(`Unrecognized equality policy ${equality}`);
}

function getCache(eviction, maxSize, mapKey) {
  switch (eviction) {
    case 'keep-all':
      // $FlowFixMe[method-unbinding]
      return new MapCache$1({
        mapKey
      });

    case 'lru':
      // $FlowFixMe[method-unbinding]
      return new LRUCache$2({
        mapKey,
        maxSize: Recoil_nullthrows(maxSize)
      });

    case 'most-recent':
      // $FlowFixMe[method-unbinding]
      return new LRUCache$2({
        mapKey,
        maxSize: 1
      });
  }

  throw Recoil_err(`Unrecognized eviction policy ${eviction}`);
}

var Recoil_cacheFromPolicy = cacheFromPolicy;

const {
  setConfigDeletionHandler: setConfigDeletionHandler$2
} = Recoil_Node;





// Process scopeRules to handle any entries which are functions taking parameters
// prettier-ignore
// @fb-only: function mapScopeRules<P>(
// @fb-only: scopeRules?: ParameterizedScopeRules<P>,
// @fb-only: param: P,
// @fb-only: ): ScopeRules | void {
// @fb-only: return scopeRules?.map(rule =>
// @fb-only: Array.isArray(rule)
// @fb-only: ? rule.map(entry => (typeof entry === 'function' ? entry(param) : entry))
// @fb-only: : rule,
// @fb-only: );
// @fb-only: }

/*
A function which returns an atom based on the input parameter.

Each unique parameter returns a unique atom. E.g.,

  const f = atomFamily(...);
  f({a: 1}) => an atom
  f({a: 2}) => a different atom

This allows components to persist local, private state using atoms.  Each
instance of the component may have a different key, which it uses as the
parameter for a family of atoms; in this way, each component will have
its own atom not shared by other instances.  These state keys may be composed
into children's state keys as well.
*/
function atomFamily(options) {
  var _options$cachePolicyF, _options$cachePolicyF2;

  const atomCache = Recoil_cacheFromPolicy({
    equality: (_options$cachePolicyF = (_options$cachePolicyF2 = options.cachePolicyForParams_UNSTABLE) === null || _options$cachePolicyF2 === void 0 ? void 0 : _options$cachePolicyF2.equality) !== null && _options$cachePolicyF !== void 0 ? _options$cachePolicyF : 'value',
    eviction: 'keep-all'
  }); // Simple atomFamily implementation to cache individual atoms based
  // on the parameter value equality.

  return params => {
    var _stableStringify;

    const cachedAtom = atomCache.get(params);

    if (cachedAtom != null) {
      return cachedAtom;
    }

    const {
      cachePolicyForParams_UNSTABLE,
      ...atomOptions
    } = options;
    const newAtom = Recoil_atom({ ...atomOptions,
      key: `${options.key}__${(_stableStringify = Recoil_stableStringify(params)) !== null && _stableStringify !== void 0 ? _stableStringify : 'void'}`,
      default: typeof options.default === 'function' ? // The default was parameterized
      // Flow doesn't know that T isn't a function, so we need to case to any
      options.default(params) // flowlint-line unclear-type:off
      : // Default may be a static value, promise, or RecoilValue
      options.default,
      retainedBy_UNSTABLE: typeof options.retainedBy_UNSTABLE === 'function' ? options.retainedBy_UNSTABLE(params) : options.retainedBy_UNSTABLE,
      effects_UNSTABLE: typeof options.effects_UNSTABLE === 'function' ? options.effects_UNSTABLE(params) : options.effects_UNSTABLE // prettier-ignore
      // @fb-only: scopeRules_APPEND_ONLY_READ_THE_DOCS: mapScopeRules(
      // @fb-only: options.scopeRules_APPEND_ONLY_READ_THE_DOCS,
      // @fb-only: params,
      // @fb-only: ),

    });
    atomCache.set(params, newAtom);
    setConfigDeletionHandler$2(newAtom.key, () => {
      atomCache.delete(params);
    });
    return newAtom;
  };
}

var Recoil_atomFamily = atomFamily;

const {
  setConfigDeletionHandler: setConfigDeletionHandler$3
} = Recoil_Node;



 // Keep in mind the parameter needs to be serializable as a cahche key
// using Recoil_stableStringify


// Add a unique index to each selector in case the cache implementation allows
// duplicate keys based on equivalent stringified parameters
let nextIndex = 0;
/* eslint-disable no-redeclare */

// Return a function that returns members of a family of selectors of the same type
// E.g.,
//
// const s = selectorFamily(...);
// s({a: 1}) => a selector
// s({a: 2}) => a different selector
//
// By default, the selectors are distinguished by distinct values of the
// parameter based on value equality, not reference equality.  This allows using
// object literals or other equivalent objects at callsites to not create
// duplicate cache entries.  This behavior may be overridden with the
// cacheImplementationForParams option.
function selectorFamily(options) {
  var _options$cachePolicyF, _options$cachePolicyF2;

  const selectorCache = Recoil_cacheFromPolicy({
    equality: (_options$cachePolicyF = (_options$cachePolicyF2 = options.cachePolicyForParams_UNSTABLE) === null || _options$cachePolicyF2 === void 0 ? void 0 : _options$cachePolicyF2.equality) !== null && _options$cachePolicyF !== void 0 ? _options$cachePolicyF : 'value',
    eviction: 'keep-all'
  });
  return params => {
    var _stableStringify;

    const cachedSelector = selectorCache.get(params);

    if (cachedSelector != null) {
      return cachedSelector;
    }

    const myKey = `${options.key}__selectorFamily/${(_stableStringify = Recoil_stableStringify(params, {
      // It is possible to use functions in parameters if the user uses
      // a cache with reference equality thanks to the incrementing index.
      allowFunctions: true
    })) !== null && _stableStringify !== void 0 ? _stableStringify : 'void'}/${nextIndex++}`; // Append index in case values serialize to the same key string

    const myGet = callbacks => options.get(params)(callbacks);

    const myCachePolicy = options.cachePolicy_UNSTABLE;
    const retainedBy = typeof options.retainedBy_UNSTABLE === 'function' ? options.retainedBy_UNSTABLE(params) : options.retainedBy_UNSTABLE;
    let newSelector;

    if (options.set != null) {
      const set = options.set;

      const mySet = (callbacks, newValue) => set(params)(callbacks, newValue);

      newSelector = Recoil_selector({
        key: myKey,
        get: myGet,
        set: mySet,
        cachePolicy_UNSTABLE: myCachePolicy,
        dangerouslyAllowMutability: options.dangerouslyAllowMutability,
        retainedBy_UNSTABLE: retainedBy
      });
    } else {
      newSelector = Recoil_selector({
        key: myKey,
        get: myGet,
        cachePolicy_UNSTABLE: myCachePolicy,
        dangerouslyAllowMutability: options.dangerouslyAllowMutability,
        retainedBy_UNSTABLE: retainedBy
      });
    }

    selectorCache.set(params, newSelector);
    setConfigDeletionHandler$3(newSelector.key, () => {
      selectorCache.delete(params);
    });
    return newSelector;
  };
}
/* eslint-enable no-redeclare */


var Recoil_selectorFamily = selectorFamily;

// flowlint-next-line unclear-type:off


const constantSelector = Recoil_selectorFamily({
  key: '__constant',
  get: constant => () => constant,
  cachePolicyForParams_UNSTABLE: {
    equality: 'reference'
  }
}); // Function that returns a selector which always produces the
// same constant value.  It may be called multiple times with the
// same value, based on reference equality, and will provide the
// same selector.

function constSelector(constant) {
  return constantSelector(constant);
}

var Recoil_constSelector = constSelector;

// flowlint-next-line unclear-type:off


const throwingSelector = Recoil_selectorFamily({
  key: '__error',
  get: message => () => {
    throw Recoil_err(message);
  },
  // TODO Why?
  cachePolicyForParams_UNSTABLE: {
    equality: 'reference'
  }
}); // Function that returns a selector which always throws an error
// with the provided message.

function errorSelector(message) {
  return throwingSelector(message);
}

var Recoil_errorSelector = errorSelector;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Wraps another recoil value and prevents writing to it.
 *
 * @emails oncall+recoil
 * 
 * @format
 */

function readOnlySelector(atom) {
  // flowlint-next-line unclear-type: off
  return atom;
}

var Recoil_readOnlySelector = readOnlySelector;

const {
  loadableWithError: loadableWithError$3,
  loadableWithPromise: loadableWithPromise$3,
  loadableWithValue: loadableWithValue$4
} = Recoil_Loadable$1;



 /////////////////
//  TRUTH TABLE
/////////////////
// Dependencies        waitForNone         waitForAny        waitForAll       waitForAllSettled
//  [loading, loading]  [Promise, Promise]  Promise           Promise         Promise
//  [value, loading]    [value, Promise]    [value, Promise]  Promise         Promise
//  [value, value]      [value, value]      [value, value]    [value, value]  [value, value]
//
//  [error, loading]    [Error, Promise]    [Error, Promise]  Error           Promise
//  [error, error]      [Error, Error]      [Error, Error]    Error           [error, error]
//  [value, error]      [value, Error]      [value, Error]    Error           [value, error]
// Issue parallel requests for all dependencies and return the current
// status if they have results, have some error, or are still pending.


function concurrentRequests(getRecoilValue, deps) {
  const results = Array(deps.length).fill(undefined);
  const exceptions = Array(deps.length).fill(undefined);

  for (const [i, dep] of deps.entries()) {
    try {
      results[i] = getRecoilValue(dep);
    } catch (e) {
      // exceptions can either be Promises of pending results or real errors
      exceptions[i] = e;
    }
  }

  return [results, exceptions];
}

function isError(exp) {
  return exp != null && !Recoil_isPromise(exp);
}

function unwrapDependencies(dependencies) {
  return Array.isArray(dependencies) ? dependencies : Object.getOwnPropertyNames(dependencies).map(key => dependencies[key]);
}

function wrapResults(dependencies, results) {
  return Array.isArray(dependencies) ? results : // Object.getOwnPropertyNames() has consistent key ordering with ES6
  Object.getOwnPropertyNames(dependencies).reduce((out, key, idx) => ({ ...out,
    [key]: results[idx]
  }), {});
}

function wrapLoadables(dependencies, results, exceptions) {
  const output = exceptions.map((exception, idx) => exception == null ? loadableWithValue$4(results[idx]) : Recoil_isPromise(exception) ? loadableWithPromise$3(exception) : loadableWithError$3(exception));
  return wrapResults(dependencies, output);
}

function combineAsyncResultsWithSyncResults(syncResults, asyncResults) {
  return asyncResults.map((result, idx) =>
  /**
   * it's important we use === undefined as opposed to == null, because the
   * resolved value of the async promise could be `null`, in which case we
   * don't want to use syncResults[idx], which would be undefined. If async
   * promise resolves to `undefined`, that's ok because `syncResults[idx]`
   * will also be `undefined`. That's a little hacky, but it works.
   */
  result === undefined ? syncResults[idx] : result);
} // Selector that requests all dependencies in parallel and immediately returns
// current results without waiting.


const waitForNone = Recoil_selectorFamily({
  key: '__waitForNone',
  get: dependencies => ({
    get
  }) => {
    // Issue requests for all dependencies in parallel.
    const deps = unwrapDependencies(dependencies);
    const [results, exceptions] = concurrentRequests(get, deps); // Always return the current status of the results; never block.

    return wrapLoadables(dependencies, results, exceptions);
  },
  dangerouslyAllowMutability: true
}); // Selector that requests all dependencies in parallel and waits for at least
// one to be available before returning results.  It will only error if all
// dependencies have errors.

const waitForAny = Recoil_selectorFamily({
  key: '__waitForAny',
  get: dependencies => ({
    get
  }) => {
    // Issue requests for all dependencies in parallel.
    // Exceptions can either be Promises of pending results or real errors
    const deps = unwrapDependencies(dependencies);
    const [results, exceptions] = concurrentRequests(get, deps); // If any results are available, value or error, return the current status

    if (exceptions.some(exp => !Recoil_isPromise(exp))) {
      return wrapLoadables(dependencies, results, exceptions);
    } // Otherwise, return a promise that will resolve when the next result is
    // available, whichever one happens to be next.  But, if all pending
    // dependencies end up with errors, then reject the promise.


    return new Promise(resolve => {
      for (const [i, exp] of exceptions.entries()) {
        if (Recoil_isPromise(exp)) {
          exp.then(result => {
            results[i] = result;
            exceptions[i] = undefined;
            resolve(wrapLoadables(dependencies, results, exceptions));
          }).catch(error => {
            exceptions[i] = error;
            resolve(wrapLoadables(dependencies, results, exceptions));
          });
        }
      }
    });
  },
  dangerouslyAllowMutability: true
}); // Selector that requests all dependencies in parallel and waits for all to be
// available before returning a value.  It will error if any dependencies error.

const waitForAll = Recoil_selectorFamily({
  key: '__waitForAll',
  get: dependencies => ({
    get
  }) => {
    // Issue requests for all dependencies in parallel.
    // Exceptions can either be Promises of pending results or real errors
    const deps = unwrapDependencies(dependencies);
    const [results, exceptions] = concurrentRequests(get, deps); // If all results are available, return the results

    if (exceptions.every(exp => exp == null)) {
      return wrapResults(dependencies, results);
    } // If we have any errors, throw the first error


    const error = exceptions.find(isError);

    if (error != null) {
      throw error;
    } // Otherwise, return a promise that will resolve when all results are available


    return Promise.all(exceptions).then(exceptionResults => wrapResults(dependencies, combineAsyncResultsWithSyncResults(results, exceptionResults)));
  },
  dangerouslyAllowMutability: true
});
const waitForAllSettled = Recoil_selectorFamily({
  key: '__waitForAllSettled',
  get: dependencies => ({
    get
  }) => {
    // Issue requests for all dependencies in parallel.
    // Exceptions can either be Promises of pending results or real errors
    const deps = unwrapDependencies(dependencies);
    const [results, exceptions] = concurrentRequests(get, deps); // If all results are available, return the results

    if (exceptions.every(exp => !Recoil_isPromise(exp))) {
      return wrapLoadables(dependencies, results, exceptions);
    } // Wait for all results to settle


    return Promise.all(exceptions.map((exp, i) => Recoil_isPromise(exp) ? exp.then(result => {
      results[i] = result;
      exceptions[i] = undefined;
    }).catch(error => {
      results[i] = undefined;
      exceptions[i] = error;
    }) : null)) // Then wrap them as loadables
    .then(() => wrapLoadables(dependencies, results, exceptions));
  },
  dangerouslyAllowMutability: true
});
const noWait = Recoil_selectorFamily({
  key: '__noWait',
  get: dependency => ({
    get
  }) => {
    try {
      return loadableWithValue$4(get(dependency));
    } catch (exception) {
      return Recoil_isPromise(exception) ? loadableWithPromise$3(exception) : loadableWithError$3(exception);
    }
  },
  dangerouslyAllowMutability: true
});
var Recoil_WaitFor = {
  waitForNone,
  waitForAny,
  waitForAll,
  waitForAllSettled,
  noWait
};

const {
  RecoilLoadable
} = Recoil_Loadable$1;

const {
  DefaultValue: DefaultValue$3
} = Recoil_Node;

const {
  RecoilRoot: RecoilRoot$2
} = Recoil_RecoilRoot_react;

const {
  isRecoilValue: isRecoilValue$5
} = Recoil_RecoilValue$1;

const {
  retentionZone: retentionZone$1
} = Recoil_RetentionZone;

const {
  freshSnapshot: freshSnapshot$2
} = Recoil_Snapshot$1;

const {
  useRecoilState: useRecoilState$1,
  useRecoilStateLoadable: useRecoilStateLoadable$1,
  useRecoilValue: useRecoilValue$1,
  useRecoilValueLoadable: useRecoilValueLoadable$1,
  useResetRecoilState: useResetRecoilState$1,
  useSetRecoilState: useSetRecoilState$1,
  useSetUnvalidatedAtomValues: useSetUnvalidatedAtomValues$1
} = Recoil_Hooks;

const {
  useGotoRecoilSnapshot: useGotoRecoilSnapshot$2,
  useRecoilSnapshot: useRecoilSnapshot$1,
  useRecoilTransactionObserver: useRecoilTransactionObserver$1,
  useTransactionObservation_DEPRECATED: useTransactionObservation_DEPRECATED$1
} = Recoil_SnapshotHooks;



























const {
  noWait: noWait$1,
  waitForAll: waitForAll$1,
  waitForAllSettled: waitForAllSettled$1,
  waitForAny: waitForAny$1,
  waitForNone: waitForNone$1
} = Recoil_WaitFor;

var Recoil_index = {
  // Types
  DefaultValue: DefaultValue$3,
  isRecoilValue: isRecoilValue$5,
  RecoilLoadable,
  // Recoil Root
  RecoilRoot: RecoilRoot$2,
  useRecoilBridgeAcrossReactRoots_UNSTABLE: Recoil_useRecoilBridgeAcrossReactRoots,
  // Atoms/Selectors
  atom: Recoil_atom,
  selector: Recoil_selector,
  // Convenience Atoms/Selectors
  atomFamily: Recoil_atomFamily,
  selectorFamily: Recoil_selectorFamily,
  constSelector: Recoil_constSelector,
  errorSelector: Recoil_errorSelector,
  readOnlySelector: Recoil_readOnlySelector,
  // Concurrency Helpers for Atoms/Selectors
  noWait: noWait$1,
  waitForNone: waitForNone$1,
  waitForAny: waitForAny$1,
  waitForAll: waitForAll$1,
  waitForAllSettled: waitForAllSettled$1,
  // Hooks for Atoms/Selectors
  useRecoilValue: useRecoilValue$1,
  useRecoilValueLoadable: useRecoilValueLoadable$1,
  useRecoilState: useRecoilState$1,
  useRecoilStateLoadable: useRecoilStateLoadable$1,
  useSetRecoilState: useSetRecoilState$1,
  useResetRecoilState: useResetRecoilState$1,
  useGetRecoilValueInfo_UNSTABLE: Recoil_useGetRecoilValueInfo,
  useRecoilRefresher_UNSTABLE: Recoil_useRecoilRefresher,
  // Hooks for complex operations
  useRecoilCallback: Recoil_useRecoilCallback,
  useRecoilTransaction_UNSTABLE: Recoil_useRecoilTransaction,
  // Snapshots
  useGotoRecoilSnapshot: useGotoRecoilSnapshot$2,
  useRecoilSnapshot: useRecoilSnapshot$1,
  useRecoilTransactionObserver_UNSTABLE: useRecoilTransactionObserver$1,
  useTransactionObservation_UNSTABLE: useTransactionObservation_DEPRECATED$1,
  useSetUnvalidatedAtomValues_UNSTABLE: useSetUnvalidatedAtomValues$1,
  snapshot_UNSTABLE: freshSnapshot$2,
  // Memory Management
  useRetain: Recoil_useRetain,
  retentionZone: retentionZone$1
};
var Recoil_index_4 = Recoil_index.RecoilRoot;
var Recoil_index_6 = Recoil_index.atom;
var Recoil_index_18 = Recoil_index.useRecoilValue;
var Recoil_index_22 = Recoil_index.useSetRecoilState;

var AddBoxOutlined = {};

var interopRequireDefault = {exports: {}};

(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(interopRequireDefault));

var createSvgIcon = {};

function deprecatedPropType(validator, reason) {
  {
    return () => null;
  }
}

function requirePropFactory(componentNameInError, Component) {
  {
    return () => null;
  } // eslint-disable-next-line react/forbid-foreign-prop-types
}

function unsupportedProp(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}

/**
 * Appends the ownerState object to the props, merging with the existing one if necessary.
 *
 * @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node, `ownerState` are not applied.
 * @param existingProps Props of the element.
 * @param ownerState
 */

function appendOwnerState(elementType, existingProps = {}, ownerState) {
  if (isHostComponent(elementType)) {
    return existingProps;
  }

  return _extends({}, existingProps, {
    ownerState: _extends({}, existingProps.ownerState, ownerState)
  });
}

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  capitalize: capitalize,
  createChainedFunction: createChainedFunction,
  createSvgIcon: createSvgIcon$1,
  debounce: debounce,
  deprecatedPropType: deprecatedPropType,
  isMuiElement: isMuiElement,
  ownerDocument: ownerDocument,
  ownerWindow: ownerWindow,
  requirePropFactory: requirePropFactory,
  setRef: setRef,
  unstable_useEnhancedEffect: useEnhancedEffect,
  unstable_useId: useId,
  unsupportedProp: unsupportedProp,
  useControlled: useControlled,
  useEventCallback: useEventCallback,
  useForkRef: useForkRef,
  useIsFocusVisible: useIsFocusVisible,
  unstable_ClassNameGenerator: ClassNameGenerator
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(utils);

(function (exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _utils.createSvgIcon;
  }
});

var _utils = require$$0;
}(createSvgIcon));

var _interopRequireDefault$2 = interopRequireDefault.exports;

Object.defineProperty(AddBoxOutlined, "__esModule", {
  value: true
});
var default_1$2 = AddBoxOutlined.default = void 0;

var _createSvgIcon$2 = _interopRequireDefault$2(createSvgIcon);

var _jsxRuntime$2 = jsxRuntime.exports;

var _default$2 = (0, _createSvgIcon$2.default)( /*#__PURE__*/(0, _jsxRuntime$2.jsx)("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"
}), 'AddBoxOutlined');

default_1$2 = AddBoxOutlined.default = _default$2;

var AdjustOutlined = {};

var _interopRequireDefault$1 = interopRequireDefault.exports;

Object.defineProperty(AdjustOutlined, "__esModule", {
  value: true
});
var default_1$1 = AdjustOutlined.default = void 0;

var _createSvgIcon$1 = _interopRequireDefault$1(createSvgIcon);

var _jsxRuntime$1 = jsxRuntime.exports;

var _default$1 = (0, _createSvgIcon$1.default)( /*#__PURE__*/(0, _jsxRuntime$1.jsx)("path", {
  d: "M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"
}), 'AdjustOutlined');

default_1$1 = AdjustOutlined.default = _default$1;

var IndeterminateCheckBoxOutlined = {};

var _interopRequireDefault = interopRequireDefault.exports;

Object.defineProperty(IndeterminateCheckBoxOutlined, "__esModule", {
  value: true
});
var default_1 = IndeterminateCheckBoxOutlined.default = void 0;

var _createSvgIcon = _interopRequireDefault(createSvgIcon);

var _jsxRuntime = jsxRuntime.exports;

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 11h10v2H7z"
}), 'IndeterminateCheckBoxOutlined');

default_1 = IndeterminateCheckBoxOutlined.default = _default;

const IconExpand = default_1$2;
const IconCompact = default_1;
const IconNoChildren = default_1$1;
const IconBlank = newStyled.span({
    width: 24,
    height: 24,
});

const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

function getTooltipUtilityClass(slot) {
  return generateUtilityClass('MuiTooltip', slot);
}
const tooltipClasses = generateUtilityClasses('MuiTooltip', ['popper', 'popperInteractive', 'popperArrow', 'popperClose', 'tooltip', 'tooltipArrow', 'touch', 'tooltipPlacementLeft', 'tooltipPlacementRight', 'tooltipPlacementTop', 'tooltipPlacementBottom', 'arrow']);
var tooltipClasses$1 = tooltipClasses;

const _excluded = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"];

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

const useUtilityClasses = ownerState => {
  const {
    classes,
    disableInteractive,
    arrow,
    touch,
    placement
  } = ownerState;
  const slots = {
    popper: ['popper', !disableInteractive && 'popperInteractive', arrow && 'popperArrow'],
    tooltip: ['tooltip', arrow && 'tooltipArrow', touch && 'touch', `tooltipPlacement${capitalize(placement.split('-')[0])}`],
    arrow: ['arrow']
  };
  return composeClasses(slots, getTooltipUtilityClass, classes);
};

const TooltipPopper = styled(Popper, {
  name: 'MuiTooltip',
  slot: 'Popper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.popper, !ownerState.disableInteractive && styles.popperInteractive, ownerState.arrow && styles.popperArrow, !ownerState.open && styles.popperClose];
  }
})(({
  theme,
  ownerState,
  open
}) => _extends({
  zIndex: theme.zIndex.tooltip,
  pointerEvents: 'none'
}, !ownerState.disableInteractive && {
  pointerEvents: 'auto'
}, !open && {
  pointerEvents: 'none'
}, ownerState.arrow && {
  [`&[data-popper-placement*="bottom"] .${tooltipClasses$1.arrow}`]: {
    top: 0,
    marginTop: '-0.71em',
    '&::before': {
      transformOrigin: '0 100%'
    }
  },
  [`&[data-popper-placement*="top"] .${tooltipClasses$1.arrow}`]: {
    bottom: 0,
    marginBottom: '-0.71em',
    '&::before': {
      transformOrigin: '100% 0'
    }
  },
  [`&[data-popper-placement*="right"] .${tooltipClasses$1.arrow}`]: _extends({}, !ownerState.isRtl ? {
    left: 0,
    marginLeft: '-0.71em'
  } : {
    right: 0,
    marginRight: '-0.71em'
  }, {
    height: '1em',
    width: '0.71em',
    '&::before': {
      transformOrigin: '100% 100%'
    }
  }),
  [`&[data-popper-placement*="left"] .${tooltipClasses$1.arrow}`]: _extends({}, !ownerState.isRtl ? {
    right: 0,
    marginRight: '-0.71em'
  } : {
    left: 0,
    marginLeft: '-0.71em'
  }, {
    height: '1em',
    width: '0.71em',
    '&::before': {
      transformOrigin: '0 0'
    }
  })
}));
const TooltipTooltip = styled('div', {
  name: 'MuiTooltip',
  slot: 'Tooltip',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.tooltip, ownerState.touch && styles.touch, ownerState.arrow && styles.tooltipArrow, styles[`tooltipPlacement${capitalize(ownerState.placement.split('-')[0])}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  backgroundColor: alpha(theme.palette.grey[700], 0.92),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  fontFamily: theme.typography.fontFamily,
  padding: '4px 8px',
  fontSize: theme.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: 'break-word',
  fontWeight: theme.typography.fontWeightMedium
}, ownerState.arrow && {
  position: 'relative',
  margin: 0
}, ownerState.touch && {
  padding: '8px 16px',
  fontSize: theme.typography.pxToRem(14),
  lineHeight: `${round(16 / 14)}em`,
  fontWeight: theme.typography.fontWeightRegular
}, {
  [`.${tooltipClasses$1.popper}[data-popper-placement*="left"] &`]: _extends({
    transformOrigin: 'right center'
  }, !ownerState.isRtl ? _extends({
    marginRight: '14px'
  }, ownerState.touch && {
    marginRight: '24px'
  }) : _extends({
    marginLeft: '14px'
  }, ownerState.touch && {
    marginLeft: '24px'
  })),
  [`.${tooltipClasses$1.popper}[data-popper-placement*="right"] &`]: _extends({
    transformOrigin: 'left center'
  }, !ownerState.isRtl ? _extends({
    marginLeft: '14px'
  }, ownerState.touch && {
    marginLeft: '24px'
  }) : _extends({
    marginRight: '14px'
  }, ownerState.touch && {
    marginRight: '24px'
  })),
  [`.${tooltipClasses$1.popper}[data-popper-placement*="top"] &`]: _extends({
    transformOrigin: 'center bottom',
    marginBottom: '14px'
  }, ownerState.touch && {
    marginBottom: '24px'
  }),
  [`.${tooltipClasses$1.popper}[data-popper-placement*="bottom"] &`]: _extends({
    transformOrigin: 'center top',
    marginTop: '14px'
  }, ownerState.touch && {
    marginTop: '24px'
  })
}));
const TooltipArrow = styled('span', {
  name: 'MuiTooltip',
  slot: 'Arrow',
  overridesResolver: (props, styles) => styles.arrow
})(({
  theme
}) => ({
  overflow: 'hidden',
  position: 'absolute',
  width: '1em',
  height: '0.71em'
  /* = width / sqrt(2) = (length of the hypotenuse) */
  ,
  boxSizing: 'border-box',
  color: alpha(theme.palette.grey[700], 0.9),
  '&::before': {
    content: '""',
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundColor: 'currentColor',
    transform: 'rotate(45deg)'
  }
}));
let hystersisOpen = false;
let hystersisTimer = null;

function composeEventHandler(handler, eventHandler) {
  return event => {
    if (eventHandler) {
      eventHandler(event);
    }

    handler(event);
  };
} // TODO v6: Remove PopperComponent, PopperProps, TransitionComponent and TransitionProps.


const Tooltip = /*#__PURE__*/react.exports.forwardRef(function Tooltip(inProps, ref) {
  var _components$Popper, _ref, _components$Transitio, _components$Tooltip, _components$Arrow, _componentsProps$popp;

  const props = useThemeProps({
    props: inProps,
    name: 'MuiTooltip'
  });

  const {
    arrow = false,
    children,
    components = {},
    componentsProps = {},
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableInteractive: disableInteractiveProp = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    followCursor = false,
    id: idProp,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = 'bottom',
    PopperComponent: PopperComponentProp,
    PopperProps = {},
    title,
    TransitionComponent: TransitionComponentProp = Grow,
    TransitionProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';
  const [childNode, setChildNode] = react.exports.useState();
  const [arrowRef, setArrowRef] = react.exports.useState(null);
  const ignoreNonTouchEvents = react.exports.useRef(false);
  const disableInteractive = disableInteractiveProp || followCursor;
  const closeTimer = react.exports.useRef();
  const enterTimer = react.exports.useRef();
  const leaveTimer = react.exports.useRef();
  const touchTimer = react.exports.useRef();
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open'
  });
  let open = openState;

  const id = useId(idProp);
  const prevUserSelect = react.exports.useRef();
  const stopTouchInteraction = react.exports.useCallback(() => {
    if (prevUserSelect.current !== undefined) {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = undefined;
    }

    clearTimeout(touchTimer.current);
  }, []);
  react.exports.useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      stopTouchInteraction();
    };
  }, [stopTouchInteraction]);

  const handleOpen = event => {
    clearTimeout(hystersisTimer);
    hystersisOpen = true; // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.

    setOpenState(true);

    if (onOpen && !open) {
      onOpen(event);
    }
  };

  const handleClose = useEventCallback(
  /**
   * @param {React.SyntheticEvent | Event} event
   */
  event => {
    clearTimeout(hystersisTimer);
    hystersisTimer = setTimeout(() => {
      hystersisOpen = false;
    }, 800 + leaveDelay);
    setOpenState(false);

    if (onClose && open) {
      onClose(event);
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      ignoreNonTouchEvents.current = false;
    }, theme.transitions.duration.shortest);
  });

  const handleEnter = event => {
    if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
      return;
    } // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).


    if (childNode) {
      childNode.removeAttribute('title');
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);

    if (enterDelay || hystersisOpen && enterNextDelay) {
      enterTimer.current = setTimeout(() => {
        handleOpen(event);
      }, hystersisOpen ? enterNextDelay : enterDelay);
    } else {
      handleOpen(event);
    }
  };

  const handleLeave = event => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveDelay);
  };

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible(); // We don't necessarily care about the focusVisible state (which is safe to access via ref anyway).
  // We just need to re-render the Tooltip if the focus-visible state changes.

  const [, setChildIsFocusVisible] = react.exports.useState(false);

  const handleBlur = event => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setChildIsFocusVisible(false);
      handleLeave(event);
    }
  };

  const handleFocus = event => {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setChildIsFocusVisible(true);
      handleEnter(event);
    }
  };

  const detectTouchStart = event => {
    ignoreNonTouchEvents.current = true;
    const childrenProps = children.props;

    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  const handleMouseOver = handleEnter;
  const handleMouseLeave = handleLeave;

  const handleTouchStart = event => {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    stopTouchInteraction();
    prevUserSelect.current = document.body.style.WebkitUserSelect; // Prevent iOS text selection on long-tap.

    document.body.style.WebkitUserSelect = 'none';
    touchTimer.current = setTimeout(() => {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      handleEnter(event);
    }, enterTouchDelay);
  };

  const handleTouchEnd = event => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    stopTouchInteraction();
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveTouchDelay);
  };

  react.exports.useEffect(() => {
    if (!open) {
      return undefined;
    }
    /**
     * @param {KeyboardEvent} nativeEvent
     */


    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        handleClose(nativeEvent);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, open]);
  const handleUseRef = useForkRef(setChildNode, ref);
  const handleFocusRef = useForkRef(focusVisibleRef, handleUseRef);
  const handleRef = useForkRef(children.ref, handleFocusRef); // There is no point in displaying an empty tooltip.

  if (title === '') {
    open = false;
  }

  const positionRef = react.exports.useRef({
    x: 0,
    y: 0
  });
  const popperRef = react.exports.useRef();

  const handleMouseMove = event => {
    const childrenProps = children.props;

    if (childrenProps.onMouseMove) {
      childrenProps.onMouseMove(event);
    }

    positionRef.current = {
      x: event.clientX,
      y: event.clientY
    };

    if (popperRef.current) {
      popperRef.current.update();
    }
  };

  const nameOrDescProps = {};
  const titleIsString = typeof title === 'string';

  if (describeChild) {
    nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps['aria-describedby'] = open ? id : null;
  } else {
    nameOrDescProps['aria-label'] = titleIsString ? title : null;
    nameOrDescProps['aria-labelledby'] = open && !titleIsString ? id : null;
  }

  const childrenProps = _extends({}, nameOrDescProps, other, children.props, {
    className: clsx(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef
  }, followCursor ? {
    onMouseMove: handleMouseMove
  } : {});

  const interactiveWrapperListeners = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
    childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);

    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);

    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }

  const popperOptions = react.exports.useMemo(() => {
    var _PopperProps$popperOp;

    let tooltipModifiers = [{
      name: 'arrow',
      enabled: Boolean(arrowRef),
      options: {
        element: arrowRef,
        padding: 4
      }
    }];

    if ((_PopperProps$popperOp = PopperProps.popperOptions) != null && _PopperProps$popperOp.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(PopperProps.popperOptions.modifiers);
    }

    return _extends({}, PopperProps.popperOptions, {
      modifiers: tooltipModifiers
    });
  }, [arrowRef, PopperProps]);

  const ownerState = _extends({}, props, {
    isRtl,
    arrow,
    disableInteractive,
    placement,
    PopperComponentProp,
    touch: ignoreNonTouchEvents.current
  });

  const classes = useUtilityClasses(ownerState);
  const PopperComponent = (_components$Popper = components.Popper) != null ? _components$Popper : TooltipPopper;
  const TransitionComponent = (_ref = (_components$Transitio = components.Transition) != null ? _components$Transitio : TransitionComponentProp) != null ? _ref : Grow;
  const TooltipComponent = (_components$Tooltip = components.Tooltip) != null ? _components$Tooltip : TooltipTooltip;
  const ArrowComponent = (_components$Arrow = components.Arrow) != null ? _components$Arrow : TooltipArrow;
  const popperProps = appendOwnerState(PopperComponent, _extends({}, PopperProps, componentsProps.popper), ownerState);
  const transitionProps = appendOwnerState(TransitionComponent, _extends({}, TransitionProps, componentsProps.transition), ownerState);
  const tooltipProps = appendOwnerState(TooltipComponent, _extends({}, componentsProps.tooltip), ownerState);
  const tooltipArrowProps = appendOwnerState(ArrowComponent, _extends({}, componentsProps.arrow), ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsxs(react.exports.Fragment, {
    children: [/*#__PURE__*/react.exports.cloneElement(children, childrenProps), /*#__PURE__*/jsxRuntime.exports.jsx(PopperComponent, _extends({
      as: PopperComponentProp != null ? PopperComponentProp : Popper,
      placement: placement,
      anchorEl: followCursor ? {
        getBoundingClientRect: () => ({
          top: positionRef.current.y,
          left: positionRef.current.x,
          right: positionRef.current.x,
          bottom: positionRef.current.y,
          width: 0,
          height: 0
        })
      } : childNode,
      popperRef: popperRef,
      open: childNode ? open : false,
      id: id,
      transition: true
    }, interactiveWrapperListeners, popperProps, {
      className: clsx(classes.popper, PopperProps == null ? void 0 : PopperProps.className, (_componentsProps$popp = componentsProps.popper) == null ? void 0 : _componentsProps$popp.className),
      popperOptions: popperOptions,
      children: ({
        TransitionProps: TransitionPropsInner
      }) => {
        var _componentsProps$tool, _componentsProps$arro;

        return /*#__PURE__*/jsxRuntime.exports.jsx(TransitionComponent, _extends({
          timeout: theme.transitions.duration.shorter
        }, TransitionPropsInner, transitionProps, {
          children: /*#__PURE__*/jsxRuntime.exports.jsxs(TooltipComponent, _extends({}, tooltipProps, {
            className: clsx(classes.tooltip, (_componentsProps$tool = componentsProps.tooltip) == null ? void 0 : _componentsProps$tool.className),
            children: [title, arrow ? /*#__PURE__*/jsxRuntime.exports.jsx(ArrowComponent, _extends({}, tooltipArrowProps, {
              className: clsx(classes.arrow, (_componentsProps$arro = componentsProps.arrow) == null ? void 0 : _componentsProps$arro.className),
              ref: setArrowRef
            })) : null]
          }))
        }));
      }
    }))]
  });
});
var Tooltip$1 = Tooltip;

const PATH_BASE = "http://growthmedium.org";
const PATH_MEDIUM = `${PATH_BASE}/medium/`;
const PATH_ORGANISM = `${PATH_BASE}/organism/`;
const PATH_COMPONENT = `${PATH_BASE}/components/`;

const PATH_API = `http://growthmedium.org/sparqlist/api/`;
const API_MEDIA_ALIMENT = `${PATH_API}gmdb_media_alignment_by_gm_ids`;
const API_ALL_COMPONENTS = `${PATH_API}gmdb_all_components`;
const API_MEDIA_BY_ATTRIBUTES = `${PATH_API}gmdb_media_by_attributes`;
const API_MEDIA_BY_TAXON = `${PATH_API}gmdb_media_by_taxon`;
const API_TAXONOMY_CHILDREN = `${PATH_API}gmdb_taxonomy_children`;
const API_ORGANISMS_BY_PHENOTYPES = `${PATH_API}gmdb_organisms_by_phenotypes`;

export { API_MEDIA_ALIMENT as A, IconCompact as I, PATH_COMPONENT as P, Recoil_index_6 as R, Tooltip$1 as T, Recoil_index_18 as a, Recoil_index_22 as b, clone as c, IconExpand as d, IconBlank as e, PATH_MEDIUM as f, PATH_ORGANISM as g, Recoil_index_4 as h, API_ALL_COMPONENTS as i, API_MEDIA_BY_ATTRIBUTES as j, API_ORGANISMS_BY_PHENOTYPES as k, API_MEDIA_BY_TAXON as l, IconNoChildren as m, API_TAXONOMY_CHILDREN as n };
//# sourceMappingURL=paths-0099bcd1.js.map
