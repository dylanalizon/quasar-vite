var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value2) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target2 = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target2[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target2[prop] = source[prop];
    }
  return target2;
};
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value2) {
  return !!value2 || value2 === "";
}
function normalizeStyle(value2) {
  if (isArray(value2)) {
    const res = {};
    for (let i = 0; i < value2.length; i++) {
      const item = value2[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value2)) {
    return value2;
  } else if (isObject(value2)) {
    return value2;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value2) {
  let res = "";
  if (isString(value2)) {
    res = value2;
  } else if (isArray(value2)) {
    for (let i = 0; i < value2.length; i++) {
      const normalized = normalizeClass(value2[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value2)) {
    for (const name in value2) {
      if (value2[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove$1 = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value2) => objectToString.call(value2);
const toRawType = (value2) => {
  return toTypeString(value2).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value2, oldValue) => !Object.is(value2, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value2) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value: value2
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
let activeEffectScope;
const effectScopeStack = [];
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      try {
        this.on();
        return fn();
      } finally {
        this.off();
      }
    }
  }
  on() {
    if (this.active) {
      effectScopeStack.push(this);
      activeEffectScope = this;
    }
  }
  off() {
    if (this.active) {
      effectScopeStack.pop();
      activeEffectScope = effectScopeStack[effectScopeStack.length - 1];
    }
  }
  stop(fromParent) {
    if (this.active) {
      this.effects.forEach((e) => e.stop());
      this.cleanups.forEach((cleanup) => cleanup());
      if (this.scopes) {
        this.scopes.forEach((e) => e.stop(true));
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope) {
  scope = scope || activeEffectScope;
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    if (!effectStack.includes(this)) {
      try {
        effectStack.push(activeEffect = this);
        enableTracking();
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        resetTracking();
        effectStack.pop();
        const n = effectStack.length;
        activeEffect = n > 0 ? effectStack[n - 1] : void 0;
      }
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target2, type2, key) {
  if (!isTracking()) {
    return;
  }
  let depsMap = targetMap.get(target2);
  if (!depsMap) {
    targetMap.set(target2, depsMap = new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = createDep());
  }
  trackEffects(dep);
}
function isTracking() {
  return shouldTrack && activeEffect !== void 0;
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger$2(target2, type2, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target2);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type2 === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target2)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type2) {
      case "add":
        if (!isArray(target2)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target2)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target2)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target2)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target2)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect of isArray(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target2, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target2)) {
      return target2;
    }
    const targetIsArray = isArray(target2);
    if (!isReadonly2 && targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target2, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target2, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target2, key, value2, receiver) {
    let oldValue = target2[key];
    if (!shallow) {
      value2 = toRaw(value2);
      oldValue = toRaw(oldValue);
      if (!isArray(target2) && isRef(oldValue) && !isRef(value2)) {
        oldValue.value = value2;
        return true;
      }
    }
    const hadKey = isArray(target2) && isIntegerKey(key) ? Number(key) < target2.length : hasOwn$1(target2, key);
    const result = Reflect.set(target2, key, value2, receiver);
    if (target2 === toRaw(receiver)) {
      if (!hadKey) {
        trigger$2(target2, "add", key, value2);
      } else if (hasChanged(value2, oldValue)) {
        trigger$2(target2, "set", key, value2);
      }
    }
    return result;
  };
}
function deleteProperty(target2, key) {
  const hadKey = hasOwn$1(target2, key);
  target2[key];
  const result = Reflect.deleteProperty(target2, key);
  if (result && hadKey) {
    trigger$2(target2, "delete", key, void 0);
  }
  return result;
}
function has$1(target2, key) {
  const result = Reflect.has(target2, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target2, "has", key);
  }
  return result;
}
function ownKeys(target2) {
  track(target2, "iterate", isArray(target2) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target2);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target2, key) {
    return true;
  },
  deleteProperty(target2, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend$1({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value2) => value2;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1$1(target2, key, isReadonly2 = false, isShallow = false) {
  target2 = target2["__v_raw"];
  const rawTarget = toRaw(target2);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target2.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target2.get(rawKey));
  } else if (target2 !== rawTarget) {
    target2.get(key);
  }
}
function has$1$1(key, isReadonly2 = false) {
  const target2 = this["__v_raw"];
  const rawTarget = toRaw(target2);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target2.has(key) : target2.has(key) || target2.has(rawKey);
}
function size$1(target2, isReadonly2 = false) {
  target2 = target2["__v_raw"];
  !isReadonly2 && track(toRaw(target2), "iterate", ITERATE_KEY);
  return Reflect.get(target2, "size", target2);
}
function add(value2) {
  value2 = toRaw(value2);
  const target2 = toRaw(this);
  const proto = getProto(target2);
  const hadKey = proto.has.call(target2, value2);
  if (!hadKey) {
    target2.add(value2);
    trigger$2(target2, "add", value2, value2);
  }
  return this;
}
function set$1$1(key, value2) {
  value2 = toRaw(value2);
  const target2 = toRaw(this);
  const { has: has2, get: get2 } = getProto(target2);
  let hadKey = has2.call(target2, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target2, key);
  }
  const oldValue = get2.call(target2, key);
  target2.set(key, value2);
  if (!hadKey) {
    trigger$2(target2, "add", key, value2);
  } else if (hasChanged(value2, oldValue)) {
    trigger$2(target2, "set", key, value2);
  }
  return this;
}
function deleteEntry(key) {
  const target2 = toRaw(this);
  const { has: has2, get: get2 } = getProto(target2);
  let hadKey = has2.call(target2, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target2, key);
  }
  get2 ? get2.call(target2, key) : void 0;
  const result = target2.delete(key);
  if (hadKey) {
    trigger$2(target2, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target2 = toRaw(this);
  const hadItems = target2.size !== 0;
  const result = target2.clear();
  if (hadItems) {
    trigger$2(target2, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target2 = observed["__v_raw"];
    const rawTarget = toRaw(target2);
    const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target2.forEach((value2, key) => {
      return callback.call(thisArg, wrap(value2), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow) {
  return function(...args) {
    const target2 = this["__v_raw"];
    const rawTarget = toRaw(target2);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target2[method](...args);
    const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value: value2, done } = innerIterator.next();
        return done ? { value: value2, done } : {
          value: isPair ? [wrap(value2[0]), wrap(value2[1])] : wrap(value2),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type2) {
  return function(...args) {
    return type2 === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1$1(this, key);
    },
    get size() {
      return size$1(this);
    },
    has: has$1$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, false, true);
    },
    get size() {
      return size$1(this);
    },
    has: has$1$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has$1$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, true, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has$1$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target2, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target2;
    }
    return Reflect.get(hasOwn$1(instrumentations, key) && key in target2 ? instrumentations : target2, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value2) {
  return value2["__v_skip"] || !Object.isExtensible(value2) ? 0 : targetTypeMap(toRawType(value2));
}
function reactive(target2) {
  if (target2 && target2["__v_isReadonly"]) {
    return target2;
  }
  return createReactiveObject(target2, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target2) {
  return createReactiveObject(target2, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target2) {
  return createReactiveObject(target2, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target2, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target2)) {
    return target2;
  }
  if (target2["__v_raw"] && !(isReadonly2 && target2["__v_isReactive"])) {
    return target2;
  }
  const existingProxy = proxyMap.get(target2);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target2);
  if (targetType === 0) {
    return target2;
  }
  const proxy = new Proxy(target2, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target2, proxy);
  return proxy;
}
function isReactive(value2) {
  if (isReadonly(value2)) {
    return isReactive(value2["__v_raw"]);
  }
  return !!(value2 && value2["__v_isReactive"]);
}
function isReadonly(value2) {
  return !!(value2 && value2["__v_isReadonly"]);
}
function isProxy(value2) {
  return isReactive(value2) || isReadonly(value2);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value2) {
  def(value2, "__v_skip", true);
  return value2;
}
const toReactive = (value2) => isObject(value2) ? reactive(value2) : value2;
const toReadonly = (value2) => isObject(value2) ? readonly(value2) : value2;
function trackRefValue(ref2) {
  if (isTracking()) {
    ref2 = toRaw(ref2);
    if (!ref2.dep) {
      ref2.dep = createDep();
    }
    {
      trackEffects(ref2.dep);
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep);
    }
  }
}
function isRef(r) {
  return Boolean(r && r.__v_isRef === true);
}
function ref(value2) {
  return createRef(value2, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value2, _shallow) {
    this._shallow = _shallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = _shallow ? value2 : toRaw(value2);
    this._value = _shallow ? value2 : toReactive(value2);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this._shallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this._shallow ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target2, key, receiver) => unref(Reflect.get(target2, key, receiver)),
  set: (target2, key, value2, receiver) => {
    const oldValue = target2[key];
    if (isRef(oldValue) && !isRef(value2)) {
      oldValue.value = value2;
      return true;
    } else {
      return Reflect.set(target2, key, value2, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2) {
    this._setter = _setter;
    this.dep = void 0;
    this._dirty = true;
    this.__v_isRef = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter);
  return cRef;
}
Promise.resolve();
function emit$1(instance, event, ...rawArgs) {
  const props2 = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props2) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props2[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => a.trim());
    } else if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  let handlerName;
  let handler = props2[handlerName = toHandlerKey(event)] || props2[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props2[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props2[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend$1(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend$1(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id2) {
  currentScopeId = id2;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props: props2, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props2, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(render2.length > 1 ? render2(props2, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit
      } : { attrs, slots, emit }) : render2(props2, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props2) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props2)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits2 = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits2);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits2, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits2);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type2) => type2.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value2) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value2;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props2, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      const rawProps = toRaw(props2);
      const { mode } = rawProps;
      const child = children[0];
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props2, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props2;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        hook(el, done);
        if (hook.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        onLeave(el, done);
        if (onLeave.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props2, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment));
    } else if (keepComment || child.type !== Comment) {
      ret.push(child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
const KeepAliveImpl = {
  name: `KeepAlive`,
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(props2, { slots }) {
    const instance = getCurrentInstance();
    const sharedContext = instance.ctx;
    if (!sharedContext.renderer) {
      return slots.default;
    }
    const cache = new Map();
    const keys = new Set();
    let current = null;
    const parentSuspense = instance.suspense;
    const { renderer: { p: patch, m: move, um: _unmount, o: { createElement } } } = sharedContext;
    const storageContainer = createElement("div");
    sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
      const instance2 = vnode.component;
      move(vnode, container, anchor, 0, parentSuspense);
      patch(instance2.vnode, vnode, container, anchor, instance2, parentSuspense, isSVG, vnode.slotScopeIds, optimized);
      queuePostRenderEffect(() => {
        instance2.isDeactivated = false;
        if (instance2.a) {
          invokeArrayFns(instance2.a);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
      }, parentSuspense);
    };
    sharedContext.deactivate = (vnode) => {
      const instance2 = vnode.component;
      move(vnode, storageContainer, null, 1, parentSuspense);
      queuePostRenderEffect(() => {
        if (instance2.da) {
          invokeArrayFns(instance2.da);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
        instance2.isDeactivated = true;
      }, parentSuspense);
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, instance, parentSuspense);
    }
    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        const name = getComponentName(vnode.type);
        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }
    function pruneCacheEntry(key) {
      const cached = cache.get(key);
      if (!current || cached.type !== current.type) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
      cache.delete(key);
      keys.delete(key);
    }
    watch(() => [props2.include, props2.exclude], ([include, exclude]) => {
      include && pruneCache((name) => matches(include, name));
      exclude && pruneCache((name) => !matches(exclude, name));
    }, { flush: "post", deep: true });
    let pendingCacheKey = null;
    const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, getInnerChild(instance.subTree));
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach((cached) => {
        const { subTree, suspense } = instance;
        const vnode = getInnerChild(subTree);
        if (cached.type === vnode.type) {
          resetShapeFlag(vnode);
          const da = vnode.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }
        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;
      if (!slots.default) {
        return null;
      }
      const children = slots.default();
      const rawVNode = children[0];
      if (children.length > 1) {
        current = null;
        return children;
      } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
        current = null;
        return rawVNode;
      }
      let vnode = getInnerChild(rawVNode);
      const comp = vnode.type;
      const name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
      const { include, exclude, max } = props2;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        current = vnode;
        return rawVNode;
      }
      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key);
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (rawVNode.shapeFlag & 128) {
          rawVNode.ssContent = vnode;
        }
      }
      pendingCacheKey = key;
      if (cachedVNode) {
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          setTransitionHooks(vnode, vnode.transition);
        }
        vnode.shapeFlag |= 512;
        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key);
        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      }
      vnode.shapeFlag |= 256;
      current = vnode;
      return rawVNode;
    };
  }
};
const KeepAlive = KeepAliveImpl;
function matches(pattern, name) {
  if (isArray(pattern)) {
    return pattern.some((p2) => matches(p2, name));
  } else if (isString(pattern)) {
    return pattern.split(",").indexOf(name) > -1;
  } else if (pattern.test) {
    return pattern.test(name);
  }
  return false;
}
function onActivated(hook, target2) {
  registerKeepAliveHook(hook, "a", target2);
}
function onDeactivated(hook, target2) {
  registerKeepAliveHook(hook, "da", target2);
}
function registerKeepAliveHook(hook, type2, target2 = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target2;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    hook();
  });
  injectHook(type2, wrappedHook, target2);
  if (target2) {
    let current = target2.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type2, target2, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type2, target2, keepAliveRoot) {
  const injected = injectHook(type2, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove$1(keepAliveRoot[type2], injected);
  }, target2);
}
function resetShapeFlag(vnode) {
  let shapeFlag = vnode.shapeFlag;
  if (shapeFlag & 256) {
    shapeFlag -= 256;
  }
  if (shapeFlag & 512) {
    shapeFlag -= 512;
  }
  vnode.shapeFlag = shapeFlag;
}
function getInnerChild(vnode) {
  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}
function injectHook(type2, hook, target2 = currentInstance, prepend = false) {
  if (target2) {
    const hooks = target2[type2] || (target2[type2] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target2.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target2);
      const res = callWithAsyncErrorHandling(hook, target2, type2, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target2 = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target2);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target2 = currentInstance) {
  injectHook("ec", hook, target2);
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components: components2,
    directives: directives2,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components2)
    instance.components = components2;
  if (directives2)
    instance.directives = directives2;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type2) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type2);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend$1(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend$1(extend$1(Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend$1(Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props2 = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = Object.create(null);
  setFullProps(instance, rawProps, props2, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props2)) {
      props2[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props2 : shallowReactive(props2);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props2;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props: props2, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props2);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        const value2 = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value2 !== attrs[key]) {
              attrs[key] = value2;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props2[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value2, instance, false);
          }
        } else {
          if (value2 !== attrs[key]) {
            attrs[key] = value2;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props2, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn$1(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props2[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props2[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key)) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger$2(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props2, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value2 = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props2[camelKey] = value2;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value2;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (value2 !== attrs[key]) {
          attrs[key] = value2;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props2);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props2[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$1(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props2, key, value2, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value2 === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value2 = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value2 = propsDefaults[key] = defaultValue.call(null, props2);
          unsetCurrentInstance();
        }
      } else {
        value2 = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value2 = false;
      } else if (opt[1] && (value2 === "" || value2 === hyphenate(key))) {
        value2 = true;
      }
    }
  }
  return value2;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props2, keys] = normalizePropsOptions(raw2, appContext, true);
      extend$1(normalized, props2);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type2, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type2));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type2) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value2) => isArray(value2) ? value2.map(normalizeVNode) : [normalizeVNode(value2)];
const normalizeSlot = (key, rawSlot, ctx) => {
  const normalized = withCtx((...args) => {
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value2 = rawSlots[key];
    if (isFunction(value2)) {
      slots[key] = normalizeSlot(key, value2, ctx);
    } else if (value2 != null) {
      const normalized = normalizeSlotValue(value2);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type2 = children._;
    if (type2) {
      instance.slots = toRaw(children);
      def(children, "_", type2);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type2 = children._;
    if (type2) {
      if (optimized && type2 === 1) {
        needDeletionCheck = false;
      } else {
        extend$1(slots, children);
        if (!optimized && type2 === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function withDirectives(vnode, directives2) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives2.length; i++) {
    let [dir, value2, arg, modifiers = EMPTY_OBJ] = directives2[i];
    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }
    if (dir.deep) {
      traverse(value2);
    }
    bindings.push({
      dir,
      instance,
      value: value2,
      oldValue: void 0,
      arg,
      modifiers
    });
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
let uid$5 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = new Set();
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid$5++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else
          ;
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app2;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app2._container);
          delete app2._container.__vue_app__;
        }
      },
      provide(key, value2) {
        context.provides[key] = value2;
        return app2;
      }
    };
    return app2;
  };
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target2 = getGlobalThis();
  target2.__VUE__ = true;
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type: type2, ref: ref2, shapeFlag } = n2;
    switch (type2) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type2.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type2.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type: type2, props: props2, shapeFlag, transition, patchFlag, dirs } = vnode;
    if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
      el = vnode.el = hostCloneNode(vnode.el);
    } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props2 && props2.is, props2);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type2 !== "foreignObject", slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props2) {
        for (const key in props2) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props2[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props2) {
          hostPatchProp(el, "value", null, props2.value);
        }
        if (vnodeHook = props2.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props2 && props2.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props: props2 } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        effect.allowRecurse = false;
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        effect.allowRecurse = true;
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        effect.allowRecurse = false;
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        effect.allowRecurse = true;
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
      }
    };
    const effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
    const update2 = instance.update = effect.run.bind(effect);
    update2.id = instance.uid;
    effect.allowRecurse = update2.allowRecurse = true;
    update2();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(void 0, instance.update);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type: type2, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type2.move(vnode, container, anchor, internals);
      return;
    }
    if (type2 === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type2 === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type: type2, props: props2, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type2 !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type2 === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type: type2, el, anchor, transition } = vnode;
    if (type2 === Fragment) {
      removeFragment(el, anchor);
      return;
    }
    if (type2 === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update: update2, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update2) {
      update2.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value2 = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn$1(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isString(ref2)) {
    const doSet = () => {
      {
        refs[ref2] = value2;
      }
      if (hasOwn$1(setupState, ref2)) {
        setupState[ref2] = value2;
      }
    };
    if (value2) {
      doSet.id = -1;
      queuePostRenderEffect(doSet, parentSuspense);
    } else {
      doSet();
    }
  } else if (isRef(ref2)) {
    const doSet = () => {
      ref2.value = value2;
    };
    if (value2) {
      doSet.id = -1;
      queuePostRenderEffect(doSet, parentSuspense);
    } else {
      doSet();
    }
  } else if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value2, refs]);
  } else
    ;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type2) => type2.__isTeleport;
const isTeleportDisabled = (props2) => props2 && (props2.disabled || props2.disabled === "");
const isTargetSVG = (target2) => typeof SVGElement !== "undefined" && target2 instanceof SVGElement;
const resolveTarget = (props2, select) => {
  const targetSelector = props2 && props2.to;
  if (isString(targetSelector)) {
    if (!select) {
      return null;
    } else {
      const target2 = select(targetSelector);
      return target2;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (n1 == null) {
      const placeholder = n2.el = createText("");
      const mainAnchor = n2.anchor = createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target2 = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target2) {
        insert(targetAnchor, target2);
        isSVG = isSVG || isTargetSVG(target2);
      }
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target2) {
        mount(target2, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target2 = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target2;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target2);
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(n2, container, mainAnchor, internals, 1);
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
          if (nextTarget) {
            moveTeleport(n2, nextTarget, null, internals, 0);
          }
        } else if (wasDisabled) {
          moveTeleport(n2, target2, targetAnchor, internals, 1);
        }
      }
    }
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target: target2, props: props2 } = vnode;
    if (target2) {
      hostRemove(targetAnchor);
    }
    if (doRemove || !isTeleportDisabled(props2)) {
      hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
        }
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props: props2 } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props2)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, parentAnchor, 2);
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
  const target2 = vnode.target = resolveTarget(vnode.props, querySelector);
  if (target2) {
    const targetNode = target2._lpa || target2.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        vnode.targetAnchor = hydrateChildren(targetNode, vnode, target2, parentComponent, parentSuspense, slotScopeIds, optimized);
      }
      target2._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
    }
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
const NULL_DYNAMIC_COMPONENT = Symbol();
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value2) {
  isBlockTreeEnabled += value2;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type2, props2, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type2, props2, children, patchFlag, dynamicProps, shapeFlag, true));
}
function isVNode(value2) {
  return value2 ? value2.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2 }) => {
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2 } : ref2 : null;
};
function createBaseVNode(type2, props2 = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type2 === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type: type2,
    props: props2,
    key: props2 && normalizeKey(props2),
    ref: props2 && normalizeRef(props2),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type2.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type2, props2 = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type2 || type2 === NULL_DYNAMIC_COMPONENT) {
    type2 = Comment;
  }
  if (isVNode(type2)) {
    const cloned = cloneVNode(type2, props2, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    return cloned;
  }
  if (isClassComponent(type2)) {
    type2 = type2.__vccOpts;
  }
  if (props2) {
    props2 = guardReactiveProps(props2);
    let { class: klass, style } = props2;
    if (klass && !isString(klass)) {
      props2.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend$1({}, style);
      }
      props2.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type2) ? 1 : isSuspense(type2) ? 128 : isTeleport(type2) ? 64 : isObject(type2) ? 4 : isFunction(type2) ? 2 : 0;
  return createBaseVNode(type2, props2, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props2) {
  if (!props2)
    return null;
  return isProxy(props2) || InternalObjectKey in props2 ? extend$1({}, props2) : props2;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props: props2, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props2 || {}, extraProps) : props2;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(Fragment, null, child.slice());
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type2 = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type2 = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type2 = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type2 = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type2 = 16;
      children = [createTextVNode(children)];
    } else {
      type2 = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type2;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (existing !== incoming) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = extend$1(Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => () => queueJob(i.update),
  $nextTick: (i) => nextTick.bind(i.proxy),
  $watch: (i) => instanceWatch.bind(i)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props: props2, accessCache, type: type2, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 0:
            return setupState[key];
          case 1:
            return data[key];
          case 3:
            return ctx[key];
          case 2:
            return props2[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
        accessCache[key] = 0;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 1;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)) {
        accessCache[key] = 2;
        return props2[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 3;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 4;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type2.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 3;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value2) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
      setupState[key] = value2;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value2;
    } else if (hasOwn$1(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value2;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return accessCache[key] !== void 0 || data !== EMPTY_OBJ && hasOwn$1(data, key) || setupState !== EMPTY_OBJ && hasOwn$1(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  }
};
const emptyAppContext = createAppContext();
let uid$1$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type2 = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1$1++,
    vnode,
    type: type2,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type2, appContext),
    emitsOptions: normalizeEmitsOptions(type2, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type2.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props: props2, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props2, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend$1(extend$1({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target2, key) {
      track(instance, "get", "$attrs");
      return target2[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target2, key) {
        if (key in target2) {
          return target2[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
function getComponentName(Component) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name;
}
function isClassComponent(value2) {
  return isFunction(value2) && "__vccOpts" in value2;
}
function callWithErrorHandling(fn, instance, type2, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type2);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type2, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type2, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type2);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type2, args));
  }
  return values;
}
function handleError(err, instance, type2, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type2;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type2, contextVNode, throwInDev);
}
function logError(err, type2, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue$1 = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id2) {
  let start = flushIndex + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue$1[middle]);
    middleJobId < id2 ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue$1.length || !queue$1.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue$1.indexOf(job);
  if (i > flushIndex) {
    queue$1.splice(i, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index) {
  if (!isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  flushPreFlushCbs(seen);
  queue$1.sort((a, b) => getId(a) - getId(b));
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
      const job = queue$1[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue$1.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue$1.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = !!source._shallow;
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onInvalidate]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onInvalidate = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  if (isInSSRComponentSetup) {
    onInvalidate = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onInvalidate
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onInvalidate
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove$1(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value2, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value2)) {
    cb = value2;
  } else {
    cb = value2.handler;
    options = value2;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value2, seen) {
  if (!isObject(value2) || value2["__v_skip"]) {
    return value2;
  }
  seen = seen || new Set();
  if (seen.has(value2)) {
    return value2;
  }
  seen.add(value2);
  if (isRef(value2)) {
    traverse(value2.value, seen);
  } else if (isArray(value2)) {
    for (let i = 0; i < value2.length; i++) {
      traverse(value2[i], seen);
    }
  } else if (isSet(value2) || isMap(value2)) {
    value2.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject$1(value2)) {
    for (const key in value2) {
      traverse(value2[key], seen);
    }
  }
  return value2;
}
function h(type2, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type2, null, [propsOrChildren]);
      }
      return createVNode(type2, propsOrChildren);
    } else {
      return createVNode(type2, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type2, propsOrChildren, children);
  }
}
const version = "3.2.21";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const staticTemplateCache = new Map();
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props2) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props2 && props2.multiple != null) {
      el.setAttribute("multiple", props2.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id2) {
    el.setAttribute(id2, "");
  },
  cloneNode(el) {
    const cloned = el.cloneNode(true);
    if (`_value` in el) {
      cloned._value = el._value;
    }
    return cloned;
  },
  insertStaticContent(content, parent, anchor, isSVG) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    let template = staticTemplateCache.get(content);
    if (!template) {
      const t = doc.createElement("template");
      t.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      template = t.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      staticTemplateCache.set(content, template);
    }
    parent.insertBefore(template.cloneNode(true), anchor);
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value2, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value2 = (value2 ? [value2, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value2 == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value2);
  } else {
    el.className = value2;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes$1 = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes$1.length; i++) {
    const prefixed = prefixes$1[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value2, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value2 == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value2);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value2 == null || isBoolean && !includeBooleanAttr(value2)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value2);
    }
  }
}
function patchDOMProp(el, key, value2, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value2 == null ? "" : value2;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS") {
    el._value = value2;
    const newValue = value2 == null ? "" : value2;
    if (el.value !== newValue) {
      el.value = newValue;
    }
    if (value2 == null) {
      el.removeAttribute(key);
    }
    return;
  }
  if (value2 === "" || value2 == null) {
    const type2 = typeof el[key];
    if (type2 === "boolean") {
      el[key] = includeBooleanAttr(value2);
      return;
    } else if (value2 == null && type2 === "string") {
      el[key] = "";
      el.removeAttribute(key);
      return;
    } else if (type2 === "number") {
      try {
        el[key] = 0;
      } catch (_a) {
      }
      el.removeAttribute(key);
      return;
    }
  }
  try {
    el[key] = value2;
  } catch (e) {
  }
}
let _getNow = Date.now;
let skipTimestampCheck = false;
if (typeof window !== "undefined") {
  if (_getNow() > document.createEvent("Event").timeStamp) {
    _getNow = () => performance.now();
  }
  const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
  skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
}
let cachedNow = 0;
const p = Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  return [hyphenate(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    const timeStamp = e.timeStamp || _getNow();
    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value2) {
  if (isArray(value2)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value2.map((fn) => (e2) => !e2._stopped && fn(e2));
  } else {
    return value2;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value2, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value2)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value2)) {
    return false;
  }
  return key in el;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props2, { slots }) => h(BaseTransition, resolveTransitionProps(props2), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Transition.props = /* @__PURE__ */ extend$1({}, BaseTransition.props, DOMTransitionPropsValidators);
const callHook = (hook, args = []) => {
  if (isArray(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const { name = "v", type: type2, duration: duration2, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
  const durations = normalizeDuration(duration2);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type2, enterDuration, resolve);
        }
      });
    };
  };
  return extend$1(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      const resolve = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type2, leaveDuration, resolve);
        }
      });
      callHook(onLeave, [el, resolve]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration2) {
  if (duration2 == null) {
    return null;
  } else if (isObject(duration2)) {
    return [NumberOf(duration2.enter), NumberOf(duration2.leave)];
  } else {
    const n = NumberOf(duration2);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
  const id2 = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id2 === el._endId) {
      resolve();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type: type2, timeout: timeout2, propCount } = getTransitionInfo(el, expectedType);
  if (!type2) {
    return resolve();
  }
  const endEvent = type2 + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout2 + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(TRANSITION + "Delay");
  const transitionDurations = getStyleProperties(TRANSITION + "Duration");
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(ANIMATION + "Delay");
  const animationDurations = getStyleProperties(ANIMATION + "Duration");
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type2 = null;
  let timeout2 = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type2 = TRANSITION;
      timeout2 = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type2 = ANIMATION;
      timeout2 = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout2 = Math.max(transitionTimeout, animationTimeout);
    type2 = timeout2 > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type2 ? type2 === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type2 === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
  return {
    type: type2,
    timeout: timeout2,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const vShow = {
  beforeMount(el, { value: value2 }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value2) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value2);
    }
  },
  mounted(el, { value: value2 }, { transition }) {
    if (transition && value2) {
      transition.enter(el);
    }
  },
  updated(el, { value: value2, oldValue }, { transition }) {
    if (!value2 === !oldValue)
      return;
    if (transition) {
      if (value2) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value2);
    }
  },
  beforeUnmount(el, { value: value2 }) {
    setDisplay(el, value2);
  }
};
function setDisplay(el, value2) {
  el.style.display = value2 ? el._vod : "none";
}
const rendererOptions = extend$1({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app2._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
/*!
 * Quasar Framework v2.2.2
 * (c) 2015-present Razvan Stoenescu
 * Released under the MIT License.
 */
const isRuntimeSsrPreHydration$1 = ref(false);
let iosCorrection$1;
function getMatch$1(e, t) {
  const o = /(edge|edga|edgios)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(vivaldi)[\/]([\w.]+)/.exec(e) || /(chrome|crios)[\/]([\w.]+)/.exec(e) || /(iemobile)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(firefox|fxios)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
  return { browser: o[5] || o[3] || o[1] || "", version: o[2] || o[4] || "0", versionNumber: o[4] || o[2] || "0", platform: t[0] || "" };
}
function getPlatformMatch$1(e) {
  return /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(silk)/.exec(e) || /(android)/.exec(e) || /(win)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || /(playbook)/.exec(e) || /(bb)/.exec(e) || /(blackberry)/.exec(e) || [];
}
const hasTouch$1 = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function applyIosCorrection$1(e) {
  iosCorrection$1 = { is: __spreadValues({}, e) }, delete e.mac, delete e.desktop;
  const t = Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
  Object.assign(e, { mobile: true, ios: true, platform: t, [t]: true });
}
function getPlatform$1(e) {
  const t = e.toLowerCase(), o = getPlatformMatch$1(t), n = getMatch$1(t, o), a = {};
  n.browser && (a[n.browser] = true, a.version = n.version, a.versionNumber = parseInt(n.versionNumber, 10)), n.platform && (a[n.platform] = true);
  const l = a.android || a.ios || a.bb || a.blackberry || a.ipad || a.iphone || a.ipod || a.kindle || a.playbook || a.silk || a["windows phone"];
  return l === true || t.indexOf("mobile") > -1 ? (a.mobile = true, a.edga || a.edgios ? (a.edge = true, n.browser = "edge") : a.crios ? (a.chrome = true, n.browser = "chrome") : a.fxios && (a.firefox = true, n.browser = "firefox")) : a.desktop = true, (a.ipod || a.ipad || a.iphone) && (a.ios = true), a["windows phone"] && (a.winphone = true, delete a["windows phone"]), (a.chrome || a.opr || a.safari || a.vivaldi || a.mobile === true && a.ios !== true && l !== true) && (a.webkit = true), (a.safari && a.blackberry || a.bb) && (n.browser = "blackberry", a.blackberry = true), a.safari && a.playbook && (n.browser = "playbook", a.playbook = true), a.opr && (n.browser = "opera", a.opera = true), a.safari && a.android && (n.browser = "android", a.android = true), a.safari && a.kindle && (n.browser = "kindle", a.kindle = true), a.safari && a.silk && (n.browser = "silk", a.silk = true), a.vivaldi && (n.browser = "vivaldi", a.vivaldi = true), a.name = n.browser, a.platform = n.platform, t.indexOf("electron") > -1 ? a.electron = true : document.location.href.indexOf("-extension://") > -1 ? a.bex = true : (window.Capacitor !== void 0 ? (a.capacitor = true, a.nativeMobile = true, a.nativeMobileWrapper = "capacitor") : window._cordovaNative === void 0 && window.cordova === void 0 || (a.cordova = true, a.nativeMobile = true, a.nativeMobileWrapper = "cordova"), hasTouch$1 === true && a.mac === true && (a.desktop === true && a.safari === true || a.nativeMobile === true && a.android !== true && a.ios !== true && a.ipad !== true) && applyIosCorrection$1(a)), a;
}
const userAgent$1 = navigator.userAgent || navigator.vendor || window.opera, ssrClient$1 = { has: { touch: false, webStorage: false }, within: { iframe: false } }, client$1 = { userAgent: userAgent$1, is: getPlatform$1(userAgent$1), has: { touch: hasTouch$1 }, within: { iframe: window.self !== window.top } }, Platform$1 = { install(e) {
  const { $q: t } = e;
  isRuntimeSsrPreHydration$1.value === true ? (e.onSSRHydrated.push(() => {
    isRuntimeSsrPreHydration$1.value = false, Object.assign(t.platform, client$1), iosCorrection$1 = void 0;
  }), t.platform = reactive(this)) : t.platform = this;
} };
{
  let e;
  Object.defineProperty(client$1.has, "webStorage", { get: () => {
    if (e !== void 0)
      return e;
    try {
      if (window.localStorage)
        return e = true, true;
    } catch (e2) {
    }
    return e = false, false;
  } }), client$1.is.ios === true && window.navigator.vendor.toLowerCase().indexOf("apple"), isRuntimeSsrPreHydration$1.value === true ? Object.assign(Platform$1, client$1, iosCorrection$1, ssrClient$1) : Object.assign(Platform$1, client$1);
}
var defineReactivePlugin = (e, t) => {
  const o = {}, n = reactive(e);
  return Object.keys(e).forEach((e2) => {
    o[e2] = { get: () => n[e2], set: (t2) => {
      n[e2] = t2;
    } };
  }), Object.defineProperties(t, o), t;
};
const listenOpts$1 = { hasPassive: false, passiveCapture: true, notPassiveCapture: true };
try {
  const e = Object.defineProperty({}, "passive", { get() {
    Object.assign(listenOpts$1, { hasPassive: true, passive: { passive: true }, notPassive: { passive: false }, passiveCapture: { passive: true, capture: true }, notPassiveCapture: { passive: false, capture: true } });
  } });
  window.addEventListener("qtest", null, e), window.removeEventListener("qtest", null, e);
} catch (e) {
}
function noop() {
}
function leftClick(e) {
  return e.button === 0;
}
function position(e) {
  return e.touches && e.touches[0] ? e = e.touches[0] : e.changedTouches && e.changedTouches[0] ? e = e.changedTouches[0] : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]), { top: e.clientY, left: e.clientX };
}
function getEventPath(e) {
  if (e.path)
    return e.path;
  if (e.composedPath)
    return e.composedPath();
  const t = [];
  let o = e.target;
  while (o) {
    if (t.push(o), o.tagName === "HTML")
      return t.push(document), t.push(window), t;
    o = o.parentElement;
  }
}
function stop$1(e) {
  e.stopPropagation();
}
function prevent$1(e) {
  e.cancelable !== false && e.preventDefault();
}
function stopAndPrevent$1(e) {
  e.cancelable !== false && e.preventDefault(), e.stopPropagation();
}
function preventDraggable(e, t) {
  if (e === void 0 || t === true && e.__dragPrevented === true)
    return;
  const o = t === true ? (e2) => {
    e2.__dragPrevented = true, e2.addEventListener("dragstart", prevent$1, listenOpts$1.notPassiveCapture);
  } : (e2) => {
    delete e2.__dragPrevented, e2.removeEventListener("dragstart", prevent$1, listenOpts$1.notPassiveCapture);
  };
  e.querySelectorAll("a, img").forEach(o);
}
function addEvt(e, t, o) {
  const n = `__q_${t}_evt`;
  e[n] = e[n] !== void 0 ? e[n].concat(o) : o, o.forEach((t2) => {
    t2[0].addEventListener(t2[1], e[t2[2]], listenOpts$1[t2[3]]);
  });
}
function cleanEvt(e, t) {
  const o = `__q_${t}_evt`;
  e[o] !== void 0 && (e[o].forEach((t2) => {
    t2[0].removeEventListener(t2[1], e[t2[2]], listenOpts$1[t2[3]]);
  }), e[o] = void 0);
}
function debounce(e, t = 250, o) {
  let n;
  function a() {
    const a2 = arguments, l = () => {
      n = void 0, o !== true && e.apply(this, a2);
    };
    clearTimeout(n), o === true && n === void 0 && e.apply(this, a2), n = setTimeout(l, t);
  }
  return a.cancel = () => {
    clearTimeout(n);
  }, a;
}
const SIZE_LIST = ["sm", "md", "lg", "xl"], { passive: passive$3 } = listenOpts$1;
var Screen = defineReactivePlugin({ width: 0, height: 0, name: "xs", sizes: { sm: 600, md: 1024, lg: 1440, xl: 1920 }, lt: { sm: true, md: true, lg: true, xl: true }, gt: { xs: false, sm: false, md: false, lg: false }, xs: true, sm: false, md: false, lg: false, xl: false }, { setSizes: noop, setDebounce: noop, install({ $q: e, onSSRHydrated: t }) {
  if (e.screen = this, this.__installed === true)
    return void (e.config.screen !== void 0 && (e.config.screen.bodyClasses === false ? document.body.classList.remove(`screen--${this.name}`) : this.__update(true)));
  const o = e.config.screen !== void 0 && e.config.screen.bodyClasses === true;
  this.__update = (e2) => {
    const t2 = window.innerWidth, n2 = window.innerHeight;
    if (n2 !== this.height && (this.height = n2), t2 !== this.width)
      this.width = t2;
    else if (e2 !== true)
      return;
    let a2 = this.sizes;
    this.gt.xs = t2 >= a2.sm, this.gt.sm = t2 >= a2.md, this.gt.md = t2 >= a2.lg, this.gt.lg = t2 >= a2.xl, this.lt.sm = t2 < a2.sm, this.lt.md = t2 < a2.md, this.lt.lg = t2 < a2.lg, this.lt.xl = t2 < a2.xl, this.xs = this.lt.sm, this.sm = this.gt.xs === true && this.lt.md === true, this.md = this.gt.sm === true && this.lt.lg === true, this.lg = this.gt.md === true && this.lt.xl === true, this.xl = this.gt.lg, a2 = (this.xs === true ? "xs" : this.sm === true && "sm") || this.md === true && "md" || this.lg === true && "lg" || "xl", a2 !== this.name && (o === true && (document.body.classList.remove(`screen--${this.name}`), document.body.classList.add(`screen--${a2}`)), this.name = a2);
  };
  let n, a = {}, l = 16;
  this.setSizes = (e2) => {
    SIZE_LIST.forEach((t2) => {
      e2[t2] !== void 0 && (a[t2] = e2[t2]);
    });
  }, this.setDebounce = (e2) => {
    l = e2;
  };
  const i = () => {
    const e2 = getComputedStyle(document.body), t2 = window.visualViewport !== void 0 ? window.visualViewport : window;
    e2.getPropertyValue("--q-size-sm") && SIZE_LIST.forEach((t3) => {
      this.sizes[t3] = parseInt(e2.getPropertyValue(`--q-size-${t3}`), 10);
    }), this.setSizes = (e3) => {
      SIZE_LIST.forEach((t3) => {
        e3[t3] && (this.sizes[t3] = e3[t3]);
      }), this.__update(true);
    }, this.setDebounce = (e3) => {
      n !== void 0 && t2.removeEventListener("resize", n, passive$3), n = e3 > 0 ? debounce(this.__update, e3) : this.__update, t2.addEventListener("resize", n, passive$3);
    }, this.setDebounce(l), Object.keys(a).length > 0 ? (this.setSizes(a), a = void 0) : this.__update(), o === true && this.name === "xs" && document.body.classList.add("screen--xs");
  };
  isRuntimeSsrPreHydration$1.value === true ? t.push(i) : i();
} });
const Plugin$8 = defineReactivePlugin({ isActive: false, mode: false }, { __media: void 0, set(e) {
  Plugin$8.mode = e, e === "auto" ? (Plugin$8.__media === void 0 && (Plugin$8.__media = window.matchMedia("(prefers-color-scheme: dark)"), Plugin$8.__updateMedia = () => {
    Plugin$8.set("auto");
  }, Plugin$8.__media.addListener(Plugin$8.__updateMedia)), e = Plugin$8.__media.matches) : Plugin$8.__media !== void 0 && (Plugin$8.__media.removeListener(Plugin$8.__updateMedia), Plugin$8.__media = void 0), Plugin$8.isActive = e === true, document.body.classList.remove(`body--${e === true ? "light" : "dark"}`), document.body.classList.add(`body--${e === true ? "dark" : "light"}`);
}, toggle() {
  Plugin$8.set(Plugin$8.isActive === false);
}, install({ $q: e, onSSRHydrated: t, ssrContext: o }) {
  const { dark: n } = e.config;
  if (e.dark = this, this.__installed === true && n === void 0)
    return;
  this.isActive = n === true;
  const a = n !== void 0 && n;
  if (isRuntimeSsrPreHydration$1.value === true) {
    const e2 = (e3) => {
      this.__fromSSR = e3;
    }, o2 = this.set;
    this.set = e2, e2(a), t.push(() => {
      this.set = o2, this.set(this.__fromSSR);
    });
  } else
    this.set(a);
} }), getTrue = () => true;
function filterInvalidPath(e) {
  return typeof e === "string" && e !== "" && e !== "/" && e !== "#/";
}
function normalizeExitPath(e) {
  return e.startsWith("#") === true && (e = e.substr(1)), e.startsWith("/") === false && (e = "/" + e), e.endsWith("/") === true && (e = e.substr(0, e.length - 1)), "#" + e;
}
function getShouldExitFn(e) {
  if (e.backButtonExit === false)
    return () => false;
  if (e.backButtonExit === "*")
    return getTrue;
  const t = ["#/"];
  return Array.isArray(e.backButtonExit) === true && t.push(...e.backButtonExit.filter(filterInvalidPath).map(normalizeExitPath)), () => t.includes(window.location.hash);
}
var History = { __history: [], add: noop, remove: noop, install({ $q: e }) {
  if (this.__installed === true)
    return;
  const { cordova: t, capacitor: o } = client$1.is;
  if (t !== true && o !== true)
    return;
  const n = e.config[t === true ? "cordova" : "capacitor"];
  if (n !== void 0 && n.backButton === false)
    return;
  if (o === true && (window.Capacitor === void 0 || window.Capacitor.Plugins.App === void 0))
    return;
  this.add = (e2) => {
    e2.condition === void 0 && (e2.condition = getTrue), this.__history.push(e2);
  }, this.remove = (e2) => {
    const t2 = this.__history.indexOf(e2);
    t2 >= 0 && this.__history.splice(t2, 1);
  };
  const a = getShouldExitFn(Object.assign({ backButtonExit: true }, n)), l = () => {
    if (this.__history.length) {
      const e2 = this.__history[this.__history.length - 1];
      e2.condition() === true && (this.__history.pop(), e2.handler());
    } else
      a() === true ? navigator.app.exitApp() : window.history.back();
  };
  t === true ? document.addEventListener("deviceready", () => {
    document.addEventListener("backbutton", l, false);
  }) : window.Capacitor.Plugins.App.addListener("backButton", l);
} }, defaultLang = { isoName: "en-US", nativeName: "English (US)", label: { clear: "Clear", ok: "OK", cancel: "Cancel", close: "Close", set: "Set", select: "Select", reset: "Reset", remove: "Remove", update: "Update", create: "Create", search: "Search", filter: "Filter", refresh: "Refresh" }, date: { days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), firstDayOfWeek: 0, format24h: false, pluralDay: "days" }, table: { noData: "No data available", noResults: "No matching records found", loading: "Loading...", selectedRecords: (e) => e === 1 ? "1 record selected." : (e === 0 ? "No" : e) + " records selected.", recordsPerPage: "Records per page:", allRows: "All", pagination: (e, t, o) => e + "-" + t + " of " + o, columns: "Columns" }, editor: { url: "URL", bold: "Bold", italic: "Italic", strikethrough: "Strikethrough", underline: "Underline", unorderedList: "Unordered List", orderedList: "Ordered List", subscript: "Subscript", superscript: "Superscript", hyperlink: "Hyperlink", toggleFullscreen: "Toggle Fullscreen", quote: "Quote", left: "Left align", center: "Center align", right: "Right align", justify: "Justify align", print: "Print", outdent: "Decrease indentation", indent: "Increase indentation", removeFormat: "Remove formatting", formatting: "Formatting", fontSize: "Font Size", align: "Align", hr: "Insert Horizontal Rule", undo: "Undo", redo: "Redo", heading1: "Heading 1", heading2: "Heading 2", heading3: "Heading 3", heading4: "Heading 4", heading5: "Heading 5", heading6: "Heading 6", paragraph: "Paragraph", code: "Code", size1: "Very small", size2: "A bit small", size3: "Normal", size4: "Medium-large", size5: "Big", size6: "Very big", size7: "Maximum", defaultFont: "Default Font", viewSource: "View Source" }, tree: { noNodes: "No nodes available", noResults: "No matching nodes found" } };
function getLocale() {
  const e = Array.isArray(navigator.languages) === true && navigator.languages.length > 0 ? navigator.languages[0] : navigator.language;
  if (typeof e === "string")
    return e.split(/[-_]/).map((e2, t) => t === 0 ? e2.toLowerCase() : t > 1 || e2.length < 4 ? e2.toUpperCase() : e2[0].toUpperCase() + e2.slice(1).toLowerCase()).join("-");
}
const Plugin$7 = defineReactivePlugin({ __langPack: {} }, { getLocale, set(e = defaultLang, t) {
  const o = __spreadProps(__spreadValues({}, e), { rtl: e.rtl === true, getLocale });
  {
    const e2 = document.documentElement;
    e2.setAttribute("dir", o.rtl === true ? "rtl" : "ltr"), e2.setAttribute("lang", o.isoName), o.set = Plugin$7.set, Object.assign(Plugin$7.__langPack, o), Plugin$7.props = o, Plugin$7.isoName = o.isoName, Plugin$7.nativeName = o.nativeName;
  }
}, install({ $q: e, lang: t, ssrContext: o }) {
  e.lang = Plugin$7.__langPack, this.__installed === true ? t !== void 0 && this.set(t) : this.set(t || defaultLang);
} });
function setCssVar(e, t, o = document.body) {
  if (typeof e !== "string")
    throw new TypeError("Expected a string as propName");
  if (typeof t !== "string")
    throw new TypeError("Expected a string as value");
  if (!(o instanceof Element))
    throw new TypeError("Expected a DOM element");
  o.style.setProperty(`--q-${e}`, t);
}
let lastKeyCompositionStatus = false;
function onKeyDownComposition(e) {
  lastKeyCompositionStatus = e.isComposing === true;
}
function shouldIgnoreKey$1(e) {
  return lastKeyCompositionStatus === true || e !== Object(e) || e.isComposing === true || e.qKeyEvent === true;
}
function isKeyCode(e, t) {
  return shouldIgnoreKey$1(e) !== true && [].concat(t).includes(e.keyCode);
}
function getMobilePlatform(e) {
  return e.ios === true ? "ios" : e.android === true ? "android" : void 0;
}
function getBodyClasses({ is: e, has: t, within: o }, n) {
  const a = [e.desktop === true ? "desktop" : "mobile", `${t.touch === false ? "no-" : ""}touch`];
  if (e.mobile === true) {
    const t2 = getMobilePlatform(e);
    t2 !== void 0 && a.push("platform-" + t2);
  }
  if (e.nativeMobile === true) {
    const t2 = e.nativeMobileWrapper;
    a.push(t2), a.push("native-mobile"), e.ios !== true || n[t2] !== void 0 && n[t2].iosStatusBarPadding === false || a.push("q-ios-padding");
  } else
    e.electron === true ? a.push("electron") : e.bex === true && a.push("bex");
  return o.iframe === true && a.push("within-iframe"), a;
}
function applyClientSsrCorrections() {
  const e = document.body.className;
  let t = e;
  iosCorrection$1 !== void 0 && (t = t.replace("desktop", "platform-ios mobile")), client$1.has.touch === true && (t = t.replace("no-touch", "touch")), client$1.within.iframe === true && (t += " within-iframe"), e !== t && (document.body.className = t);
}
function setColors(e) {
  for (const t in e)
    setCssVar(t, e[t]);
}
var Body = { install(e) {
  const { $q: t } = e;
  if (t.config.brand !== void 0 && setColors(t.config.brand), this.__installed !== true) {
    if (isRuntimeSsrPreHydration$1.value === true)
      applyClientSsrCorrections();
    else {
      const e2 = getBodyClasses(client$1, t.config);
      document.body.classList.add.apply(document.body.classList, e2);
    }
    client$1.is.ios === true && document.body.addEventListener("touchstart", noop), window.addEventListener("keydown", onKeyDownComposition, true);
  }
} }, materialIcons = { name: "material-icons", type: { positive: "check_circle", negative: "warning", info: "info", warning: "priority_high" }, arrow: { up: "arrow_upward", right: "arrow_forward", down: "arrow_downward", left: "arrow_back", dropdown: "arrow_drop_down" }, chevron: { left: "chevron_left", right: "chevron_right" }, colorPicker: { spectrum: "gradient", tune: "tune", palette: "style" }, pullToRefresh: { icon: "refresh" }, carousel: { left: "chevron_left", right: "chevron_right", up: "keyboard_arrow_up", down: "keyboard_arrow_down", navigationIcon: "lens" }, chip: { remove: "cancel", selected: "check" }, datetime: { arrowLeft: "chevron_left", arrowRight: "chevron_right", now: "access_time", today: "today" }, editor: { bold: "format_bold", italic: "format_italic", strikethrough: "strikethrough_s", underline: "format_underlined", unorderedList: "format_list_bulleted", orderedList: "format_list_numbered", subscript: "vertical_align_bottom", superscript: "vertical_align_top", hyperlink: "link", toggleFullscreen: "fullscreen", quote: "format_quote", left: "format_align_left", center: "format_align_center", right: "format_align_right", justify: "format_align_justify", print: "print", outdent: "format_indent_decrease", indent: "format_indent_increase", removeFormat: "format_clear", formatting: "text_format", fontSize: "format_size", align: "format_align_left", hr: "remove", undo: "undo", redo: "redo", heading: "format_size", code: "code", size: "format_size", font: "font_download", viewSource: "code" }, expansionItem: { icon: "keyboard_arrow_down", denseIcon: "arrow_drop_down" }, fab: { icon: "add", activeIcon: "close" }, field: { clear: "cancel", error: "error" }, pagination: { first: "first_page", prev: "keyboard_arrow_left", next: "keyboard_arrow_right", last: "last_page" }, rating: { icon: "grade" }, stepper: { done: "check", active: "edit", error: "warning" }, tabs: { left: "chevron_left", right: "chevron_right", up: "keyboard_arrow_up", down: "keyboard_arrow_down" }, table: { arrowUp: "arrow_upward", warning: "warning", firstPage: "first_page", prevPage: "chevron_left", nextPage: "chevron_right", lastPage: "last_page" }, tree: { icon: "play_arrow" }, uploader: { done: "done", clear: "clear", add: "add_box", upload: "cloud_upload", removeQueue: "clear_all", removeUploaded: "done_all" } };
const Plugin$6 = defineReactivePlugin({ iconMapFn: null, __icons: {} }, { set(e, t) {
  const o = __spreadProps(__spreadValues({}, e), { rtl: e.rtl === true });
  o.set = Plugin$6.set, Object.assign(Plugin$6.__icons, o);
}, install({ $q: e, iconSet: t, ssrContext: o }) {
  e.config.iconMapFn !== void 0 && (this.iconMapFn = e.config.iconMapFn), e.iconSet = this.__icons, Object.defineProperty(e, "iconMapFn", { get: () => this.iconMapFn, set: (e2) => {
    this.iconMapFn = e2;
  } }), this.__installed === true ? t !== void 0 && this.set(t) : this.set(t || materialIcons);
} }), quasarKey = "_q_", timelineKey = "_q_t_", stepperKey = "_q_s_", layoutKey = "_q_l_", pageContainerKey = "_q_pc_", fabKey = "_q_f_", formKey$1 = "_q_fo_", tabsKey = "_q_tabs_", uploaderKey = "_q_u_", globalConfig = {};
let globalConfigIsFrozen = false;
function freezeGlobalConfig() {
  globalConfigIsFrozen = true;
}
const autoInstalledPlugins = [Platform$1, Body, Plugin$8, Screen, History, Plugin$7, Plugin$6];
function createChildApp(e, t) {
  const o = createApp(e);
  o.config.globalProperties = t.config.globalProperties;
  const _a = t._context, { reload: n } = _a, a = __objRest(_a, ["reload"]);
  return Object.assign(o._context, a), o;
}
function installPlugins(e, t) {
  t.forEach((t2) => {
    t2.install(e), t2.__installed = true;
  });
}
function prepareApp(e, t, o) {
  e.config.globalProperties.$q = o.$q, e.provide(quasarKey, o.$q), installPlugins(o, autoInstalledPlugins), t.components !== void 0 && Object.values(t.components).forEach((t2) => {
    Object(t2) === t2 && t2.name !== void 0 && e.component(t2.name, t2);
  }), t.directives !== void 0 && Object.values(t.directives).forEach((t2) => {
    Object(t2) === t2 && t2.name !== void 0 && e.directive(t2.name, t2);
  }), t.plugins !== void 0 && installPlugins(o, Object.values(t.plugins).filter((e2) => typeof e2.install === "function" && autoInstalledPlugins.includes(e2) === false)), isRuntimeSsrPreHydration$1.value === true && (o.$q.onSSRHydrated = () => {
    o.onSSRHydrated.forEach((e2) => {
      e2();
    }), o.$q.onSSRHydrated = () => {
    };
  });
}
var installQuasar = function(e, t = {}) {
  const o = { version: "2.2.2" };
  globalConfigIsFrozen === false ? (t.config !== void 0 && Object.assign(globalConfig, t.config), o.config = __spreadValues({}, globalConfig), freezeGlobalConfig()) : o.config = t.config || {}, prepareApp(e, t, { parentApp: e, $q: o, lang: t.lang, iconSet: t.iconSet, onSSRHydrated: [] });
};
const units = ["B", "KB", "MB", "GB", "TB", "PB"];
function humanStorageSize(e) {
  let t = 0;
  while (parseInt(e, 10) >= 1024 && t < units.length - 1)
    e /= 1024, ++t;
  return `${e.toFixed(1)}${units[t]}`;
}
function between(e, t, o) {
  return o <= t ? t : Math.min(o, Math.max(t, e));
}
function normalizeToInterval(e, t, o) {
  if (o <= t)
    return t;
  const n = o - t + 1;
  let a = t + (e - t) % n;
  return a < t && (a = n + a), a === 0 ? 0 : a;
}
function pad(e, t = 2, o = "0") {
  if (e === void 0 || e === null)
    return e;
  const n = "" + e;
  return n.length >= t ? n : new Array(t - n.length + 1).join(o) + n;
}
const xhr = XMLHttpRequest, send = xhr.prototype.send, stackStart = [], stackStop = [];
let highjackCount = 0;
function translate({ p: e, pos: t, active: o, horiz: n, reverse: a, dir: l }) {
  let i = 1, r = 1;
  return n ? (a && (i = -1), t === "bottom" && (r = -1), { transform: `translate3d(${i * (e - 100)}%,${o ? 0 : -200 * r}%,0)` }) : (a && (r = -1), t === "right" && (i = -1), { transform: `translate3d(${o ? 0 : l * i * -200}%,${r * (e - 100)}%,0)` });
}
function inc(e, t) {
  return typeof t !== "number" && (t = e < 25 ? 3 * Math.random() + 3 : e < 65 ? 3 * Math.random() : e < 85 ? 2 * Math.random() : e < 99 ? 0.6 : 0), between(e + t, 0, 100);
}
function highjackAjax(e, t) {
  function o() {
    stackStop.forEach((e2) => {
      e2();
    });
  }
  stackStart.push(e), stackStop.push(t), highjackCount++, highjackCount > 1 || (xhr.prototype.send = function() {
    stackStart.forEach((e2) => {
      e2();
    }), this.addEventListener("loadend", o, false), send.apply(this, arguments);
  });
}
function restoreAjax(e, t) {
  stackStart.splice(stackStart.indexOf(e), 1), stackStop.splice(stackStop.indexOf(t), 1), highjackCount = Math.max(0, highjackCount - 1), highjackCount === 0 && (xhr.prototype.send = send);
}
var QAjaxBar = defineComponent({ name: "QAjaxBar", props: { position: { type: String, default: "top", validator: (e) => ["top", "right", "bottom", "left"].includes(e) }, size: { type: String, default: "2px" }, color: String, skipHijack: Boolean, reverse: Boolean }, emits: ["start", "stop"], setup(e, { emit: t }) {
  const { proxy: o } = getCurrentInstance(), n = ref(0), a = ref(false), l = ref(true);
  let i, r, s = 0;
  const u = computed(() => `q-loading-bar q-loading-bar--${e.position}` + (e.color !== void 0 ? ` bg-${e.color}` : "") + (l.value === true ? "" : " no-transition")), c = computed(() => e.position === "top" || e.position === "bottom"), d = computed(() => c.value === true ? "height" : "width"), p2 = computed(() => {
    const t2 = a.value, l2 = translate({ p: n.value, pos: e.position, active: t2, horiz: c.value, reverse: o.$q.lang.rtl === true && ["top", "bottom"].includes(e.position) ? !e.reverse : e.reverse, dir: o.$q.lang.rtl === true ? -1 : 1 });
    return l2[d.value] = e.size, l2.opacity = t2 ? 1 : 0, l2;
  }), v = computed(() => a.value === true ? { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": n.value } : { "aria-hidden": "true" });
  function m(e2 = 300) {
    const o2 = r;
    r = Math.max(0, e2) || 0, s++, s > 1 ? o2 === 0 && e2 > 0 ? b() : o2 > 0 && e2 <= 0 && clearTimeout(i) : (clearTimeout(i), t("start"), n.value = 0, a.value !== true && (a.value = true, l.value = false, i = setTimeout(() => {
      l.value = true, e2 > 0 && b();
    }, 100)));
  }
  function f(e2) {
    s > 0 && (n.value = inc(n.value, e2));
  }
  function g() {
    if (s = Math.max(0, s - 1), s > 0)
      return;
    clearTimeout(i), t("stop");
    const e2 = () => {
      l.value = true, n.value = 100, i = setTimeout(() => {
        a.value = false;
      }, 1e3);
    };
    n.value === 0 ? i = setTimeout(e2, 1) : e2();
  }
  function b() {
    n.value < 100 && (i = setTimeout(() => {
      f(), b();
    }, r));
  }
  let y;
  return onMounted(() => {
    e.skipHijack !== true && (y = true, highjackAjax(m, g));
  }), onBeforeUnmount(() => {
    clearTimeout(i), y === true && restoreAjax(m, g);
  }), Object.assign(o, { start: m, stop: g, increment: f }), () => h("div", __spreadValues({ class: u.value, style: p2.value }, v.value));
} });
const useSizeDefaults$1 = { xs: 18, sm: 24, md: 32, lg: 38, xl: 46 }, useSizeProps$1 = { size: String };
function useSize$1(e, t = useSizeDefaults$1) {
  return computed(() => e.size !== void 0 ? { fontSize: e.size in t ? `${t[e.size]}px` : e.size } : null);
}
function hSlot$1(e, t) {
  return e !== void 0 && e() || t;
}
function hUniqueSlot(e, t) {
  if (e !== void 0) {
    const t2 = e();
    if (t2 !== void 0 && t2 !== null)
      return t2.slice();
  }
  return t;
}
function hMergeSlot$1(e, t) {
  return e !== void 0 ? t.concat(e()) : t;
}
function hMergeSlotSafely(e, t) {
  return e === void 0 ? t : t !== void 0 ? t.concat(e()) : e();
}
function hDir(e, t, o, n, a, l) {
  t.key = n + a;
  const i = h(e, t, o);
  return a === true ? withDirectives(i, l()) : i;
}
const sameFn$1 = (e) => e, ionFn$1 = (e) => `ionicons ${e}`, libMap$1 = { "icon-": sameFn$1, "bt-": (e) => `bt ${e}`, "eva-": (e) => `eva ${e}`, "ion-md": ionFn$1, "ion-ios": ionFn$1, "ion-logo": ionFn$1, "mdi-": (e) => `mdi ${e}`, "iconfont ": sameFn$1, "ti-": (e) => `themify-icon ${e}`, "bi-": (e) => `bootstrap-icons ${e}` }, matMap$1 = { o_: "-outlined", r_: "-round", s_: "-sharp" }, libRE$1 = new RegExp("^(" + Object.keys(libMap$1).join("|") + ")"), matRE$1 = new RegExp("^(" + Object.keys(matMap$1).join("|") + ")"), mRE$1 = /^M/, imgRE$1 = /^img:/, svgUseRE$1 = /^svguse:/, ionRE$1 = /^ion-/, faLaRE$1 = /^[l|f]a[s|r|l|b|d]? /;
var QIcon$1 = defineComponent({ name: "QIcon", props: __spreadProps(__spreadValues({}, useSizeProps$1), { tag: { type: String, default: "i" }, name: String, color: String, left: Boolean, right: Boolean }), setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = useSize$1(e), a = computed(() => "q-icon" + (e.left === true ? " on-left" : "") + (e.right === true ? " on-right" : "") + (e.color !== void 0 ? ` text-${e.color}` : "")), l = computed(() => {
    let t2, n2 = e.name;
    if (!n2)
      return { none: true, cls: a.value };
    if (o.iconMapFn !== null) {
      const e2 = o.iconMapFn(n2);
      if (e2 !== void 0) {
        if (e2.icon === void 0)
          return { cls: e2.cls + " " + a.value, content: e2.content !== void 0 ? e2.content : " " };
        n2 = e2.icon;
      }
    }
    if (mRE$1.test(n2) === true) {
      const [e2, t3] = n2.split("|");
      return { svg: true, cls: a.value, nodes: e2.split("&&").map((e3) => {
        const [t4, o2, n3] = e3.split("@@");
        return h("path", { style: o2, d: t4, transform: n3 });
      }), viewBox: t3 !== void 0 ? t3 : "0 0 24 24" };
    }
    if (imgRE$1.test(n2) === true)
      return { img: true, cls: a.value, src: n2.substring(4) };
    if (svgUseRE$1.test(n2) === true) {
      const [e2, t3] = n2.split("|");
      return { svguse: true, cls: a.value, src: e2.substring(7), viewBox: t3 !== void 0 ? t3 : "0 0 24 24" };
    }
    let l2 = " ";
    const i = n2.match(libRE$1);
    if (i !== null)
      t2 = libMap$1[i[1]](n2);
    else if (faLaRE$1.test(n2) === true)
      t2 = n2;
    else if (ionRE$1.test(n2) === true)
      t2 = `ionicons ion-${o.platform.is.ios === true ? "ios" : "md"}${n2.substr(3)}`;
    else {
      t2 = "notranslate material-icons";
      const e2 = n2.match(matRE$1);
      e2 !== null && (n2 = n2.substring(2), t2 += matMap$1[e2[1]]), l2 = n2;
    }
    return { cls: t2 + " " + a.value, content: l2 };
  });
  return () => {
    const o2 = { class: l.value.cls, style: n.value, "aria-hidden": "true", role: "presentation" };
    return l.value.none === true ? h(e.tag, o2, hSlot$1(t.default)) : l.value.img === true ? (o2.src = l.value.src, h("img", o2)) : l.value.svg === true ? (o2.viewBox = l.value.viewBox, h("svg", o2, hMergeSlot$1(t.default, l.value.nodes))) : l.value.svguse === true ? (o2.viewBox = l.value.viewBox, h("svg", o2, hMergeSlot$1(t.default, [h("use", { "xlink:href": l.value.src })]))) : h(e.tag, o2, hMergeSlot$1(t.default, [l.value.content]));
  };
} }), QAvatar = defineComponent({ name: "QAvatar", props: __spreadProps(__spreadValues({}, useSizeProps$1), { fontSize: String, color: String, textColor: String, icon: String, square: Boolean, rounded: Boolean }), setup(e, { slots: t }) {
  const o = useSize$1(e), n = computed(() => "q-avatar" + (e.color ? ` bg-${e.color}` : "") + (e.textColor ? ` text-${e.textColor} q-chip--colored` : "") + (e.square === true ? " q-avatar--square" : e.rounded === true ? " rounded-borders" : "")), a = computed(() => e.fontSize ? { fontSize: e.fontSize } : null);
  return () => {
    const l = e.icon !== void 0 ? [h(QIcon$1, { name: e.icon })] : void 0;
    return h("div", { class: n.value, style: o.value }, [h("div", { class: "q-avatar__content row flex-center overflow-hidden", style: a.value }, hMergeSlotSafely(t.default, l))]);
  };
} });
const alignValues$3 = ["top", "middle", "bottom"];
var QBadge = defineComponent({ name: "QBadge", props: { color: String, textColor: String, floating: Boolean, transparent: Boolean, multiLine: Boolean, outline: Boolean, rounded: Boolean, label: [Number, String], align: { type: String, validator: (e) => alignValues$3.includes(e) } }, setup(e, { slots: t }) {
  const o = computed(() => {
    return e.align !== void 0 ? { verticalAlign: e.align } : null;
  }), n = computed(() => {
    const t2 = e.outline === true && e.color || e.textColor;
    return `q-badge flex inline items-center no-wrap q-badge--${e.multiLine === true ? "multi" : "single"}-line` + (e.outline === true ? " q-badge--outline" : e.color !== void 0 ? ` bg-${e.color}` : "") + (t2 !== void 0 ? ` text-${t2}` : "") + (e.floating === true ? " q-badge--floating" : "") + (e.rounded === true ? " q-badge--rounded" : "") + (e.transparent === true ? " q-badge--transparent" : "");
  });
  return () => h("div", { class: n.value, style: o.value, role: "alert", "aria-label": e.label }, e.label !== void 0 ? e.label : hSlot$1(t.default));
} });
const useDarkProps$1 = { dark: { type: Boolean, default: null } };
function useDark$1(e, t) {
  return computed(() => e.dark === null ? t.dark.isActive : e.dark);
}
var QBanner = defineComponent({ name: "QBanner", props: __spreadProps(__spreadValues({}, useDarkProps$1), { inlineActions: Boolean, dense: Boolean, rounded: Boolean }), setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark$1(e, o.proxy.$q), a = computed(() => "q-banner row items-center" + (e.dense === true ? " q-banner--dense" : "") + (n.value === true ? " q-banner--dark q-dark" : "") + (e.rounded === true ? " rounded-borders" : "")), l = computed(() => `q-banner__actions row items-center justify-end col-${e.inlineActions === true ? "auto" : "all"}`);
  return () => {
    const o2 = [h("div", { class: "q-banner__avatar col-auto row items-center self-start" }, hSlot$1(t.avatar)), h("div", { class: "q-banner__content col text-body2" }, hSlot$1(t.default))], n2 = hSlot$1(t.action);
    return n2 !== void 0 && o2.push(h("div", { class: l.value }, n2)), h("div", { class: a.value + (e.inlineActions === false && n2 !== void 0 ? " q-banner--top-padding" : ""), role: "alert" }, o2);
  };
} }), QBar = defineComponent({ name: "QBar", props: __spreadProps(__spreadValues({}, useDarkProps$1), { dense: Boolean }), setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark$1(e, o.proxy.$q), a = computed(() => `q-bar row no-wrap items-center q-bar--${e.dense === true ? "dense" : "standard"}  q-bar--${n.value === true ? "dark" : "light"}`);
  return () => h("div", { class: a.value, role: "toolbar" }, hSlot$1(t.default));
} });
const alignMap = { left: "start", center: "center", right: "end", between: "between", around: "around", evenly: "evenly", stretch: "stretch" }, alignValues$2 = Object.keys(alignMap), useAlignProps = { align: { type: String, validator: (e) => alignValues$2.includes(e) } };
function useAlign(e) {
  return computed(() => {
    const t = e.align === void 0 ? e.vertical === true ? "stretch" : "left" : e.align;
    return `${e.vertical === true ? "items" : "justify"}-${alignMap[t]}`;
  });
}
function getParentVm(e) {
  if (e.$parent !== void 0 && e.$parent !== null)
    return e.$parent;
  e = e.$.parent;
  while (e !== void 0 && e !== null) {
    if (e.proxy !== void 0 && e.proxy !== null)
      return e.proxy;
    e = e.parent;
  }
}
function getNormalizedVNodes(e) {
  const t = new Set();
  return e.forEach((e2) => {
    typeof e2.type === "symbol" && Array.isArray(e2.children) === true ? e2.children.forEach((e3) => {
      t.add(e3);
    }) : t.add(e2);
  }), Array.from(t);
}
function vmHasRouter(e) {
  return e.appContext.config.globalProperties.$router !== void 0;
}
var QBreadcrumbs = defineComponent({ name: "QBreadcrumbs", props: __spreadProps(__spreadValues({}, useAlignProps), { separator: { type: String, default: "/" }, separatorColor: String, activeColor: { type: String, default: "primary" }, gutter: { type: String, validator: (e) => ["none", "xs", "sm", "md", "lg", "xl"].includes(e), default: "sm" } }), setup(e, { slots: t }) {
  const o = useAlign(e), n = computed(() => `flex items-center ${o.value}${e.gutter === "none" ? "" : ` q-gutter-${e.gutter}`}`), a = computed(() => e.separatorColor ? ` text-${e.separatorColor}` : ""), l = computed(() => `text-${e.activeColor}`);
  return () => {
    const o2 = getNormalizedVNodes(hSlot$1(t.default));
    if (o2 === void 0)
      return;
    let i = 1;
    const r = [], s = o2.filter((e2) => e2.type !== void 0 && e2.type.name === "QBreadcrumbsEl").length, u = t.separator !== void 0 ? t.separator : () => e.separator;
    return o2.forEach((e2) => {
      if (e2.type !== void 0 && e2.type.name === "QBreadcrumbsEl") {
        const t2 = i < s;
        i++, r.push(h("div", { class: "flex items-center " + (t2 === true ? l.value : "q-breadcrumbs--last") }, [e2])), t2 === true && r.push(h("div", { class: "q-breadcrumbs__separator" + a.value }, u()));
      } else
        r.push(e2);
    }), h("div", { class: "q-breadcrumbs" }, [h("div", { class: n.value }, r)]);
  };
} });
function getOriginalPath(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
function isSameRouteRecord(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function includesParams(e, t) {
  for (const o in t) {
    const n = t[o], a = e[o];
    if (typeof n === "string") {
      if (n !== a)
        return false;
    } else if (Array.isArray(a) === false || a.length !== n.length || n.some((e2, t2) => e2 !== a[t2]))
      return false;
  }
  return true;
}
function isEquivalentArray(e, t) {
  return Array.isArray(t) === true ? e.length === t.length && e.every((e2, o) => e2 === t[o]) : e.length === 1 && e[0] === t;
}
function isSameRouteLocationParamsValue(e, t) {
  return Array.isArray(e) === true ? isEquivalentArray(e, t) : Array.isArray(t) === true ? isEquivalentArray(t, e) : e === t;
}
function isSameRouteLocationParams(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return false;
  for (const o in e)
    if (isSameRouteLocationParamsValue(e[o], t[o]) === false)
      return false;
  return true;
}
const useRouterLinkProps = { to: [String, Object], replace: Boolean, exact: Boolean, activeClass: { type: String, default: "q-router-link--active" }, exactActiveClass: { type: String, default: "q-router-link--exact-active" }, disable: Boolean };
function useRouterLink() {
  const e = getCurrentInstance(), { props: t, attrs: o, proxy: n } = e, a = vmHasRouter(e), l = computed(() => a === true && t.disable !== true && t.to !== void 0 && t.to !== null && t.to !== ""), i = computed(() => {
    if (l.value === true)
      try {
        return n.$router.resolve(t.to);
      } catch (e2) {
      }
    return null;
  }), r = computed(() => i.value !== null), s = computed(() => r.value === true ? "a" : t.tag || "div"), u = computed(() => {
    if (r.value === false)
      return null;
    const { matched: e2 } = i.value, { length: t2 } = e2, o2 = e2[t2 - 1];
    if (o2 === void 0)
      return -1;
    const a2 = n.$route.matched;
    if (a2.length === 0)
      return -1;
    const l2 = a2.findIndex(isSameRouteRecord.bind(null, o2));
    if (l2 > -1)
      return l2;
    const s2 = getOriginalPath(e2[t2 - 2]);
    return t2 > 1 && getOriginalPath(o2) === s2 && a2[a2.length - 1].path !== s2 ? a2.findIndex(isSameRouteRecord.bind(null, e2[t2 - 2])) : l2;
  }), c = computed(() => r.value === true && u.value > -1 && includesParams(n.$route.params, i.value.params)), d = computed(() => c.value === true && u.value === n.$route.matched.length - 1 && isSameRouteLocationParams(n.$route.params, i.value.params)), p2 = computed(() => r.value === true ? d.value === true ? ` ${t.exactActiveClass} ${t.activeClass}` : t.exact === true ? "" : c.value === true ? ` ${t.activeClass}` : "" : ""), v = computed(() => r.value === true ? { href: i.value.href, target: o.target, role: "link" } : {});
  function m(e2) {
    return !(t.disable === true || e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey || e2.__qNavigate !== true && e2.defaultPrevented === true || e2.button !== void 0 && e2.button !== 0 || o.target === "_blank") && (prevent$1(e2), n.$router[t.replace === true ? "replace" : "push"](t.to).catch(() => {
    }));
  }
  return { hasLink: r, linkTag: s, linkRoute: i, linkIsActive: c, linkIsExactActive: d, linkClass: p2, linkProps: v, navigateToLink: m };
}
var QBreadcrumbsEl = defineComponent({ name: "QBreadcrumbsEl", props: __spreadProps(__spreadValues({}, useRouterLinkProps), { label: String, icon: String, tag: { type: String, default: "span" } }), setup(e, { slots: t }) {
  const { linkTag: o, linkProps: n, hasLink: a, navigateToLink: l } = useRouterLink(), i = computed(() => {
    const e2 = __spreadValues({}, n.value);
    return a.value === true && (e2.onClick = l), e2;
  }), r = computed(() => "q-breadcrumbs__el-icon" + (e.label !== void 0 ? " q-breadcrumbs__el-icon--with-label" : ""));
  return () => {
    const n2 = [];
    return e.icon !== void 0 && n2.push(h(QIcon$1, { class: r.value, name: e.icon })), e.label !== void 0 && n2.push(e.label), h(o.value, __spreadValues({ class: "q-breadcrumbs__el q-link flex inline items-center relative-position" }, i.value), hMergeSlot$1(t.default, n2));
  };
} });
const useSpinnerProps$1 = { size: { type: [Number, String], default: "1em" }, color: String };
function useSpinner$1(e) {
  return { cSize: computed(() => e.size in useSizeDefaults$1 ? `${useSizeDefaults$1[e.size]}px` : e.size), classes: computed(() => "q-spinner" + (e.color ? ` text-${e.color}` : "")) };
}
var QSpinner$1 = defineComponent({ name: "QSpinner", props: __spreadProps(__spreadValues({}, useSpinnerProps$1), { thickness: { type: Number, default: 5 } }), setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value + " q-spinner-mat", width: t.value, height: t.value, viewBox: "25 25 50 50" }, [h("circle", { class: "path", cx: "50", cy: "50", r: "20", fill: "none", stroke: "currentColor", "stroke-width": e.thickness, "stroke-miterlimit": "10" })]);
} });
function offset(e) {
  if (e === window)
    return { top: 0, left: 0 };
  const { top: t, left: o } = e.getBoundingClientRect();
  return { top: t, left: o };
}
function height(e) {
  return e === window ? window.innerHeight : e.getBoundingClientRect().height;
}
function css(e, t) {
  const o = e.style;
  Object.keys(t).forEach((e2) => {
    o[e2] = t[e2];
  });
}
function getElement$1(e) {
  if (e === void 0 || e === null)
    return;
  if (typeof e === "string")
    try {
      return document.querySelector(e) || void 0;
    } catch (e2) {
      return;
    }
  const t = isRef(e) === true ? e.value : e;
  return t ? t.$el || t : void 0;
}
function childHasFocus(e, t) {
  if (e === void 0 || e === null || e.contains(t) === true)
    return true;
  for (let o = e.nextElementSibling; o !== null; o = o.nextElementSibling)
    if (o.contains(t))
      return true;
  return false;
}
function throttle(e, t = 250) {
  let o, n = false;
  return function() {
    return n === false && (n = true, setTimeout(() => {
      n = false;
    }, t), o = e.apply(this, arguments)), o;
  };
}
function showRipple(e, t, o, n) {
  o.modifiers.stop === true && stop$1(e);
  const a = o.modifiers.color;
  let l = o.modifiers.center;
  l = l === true || n === true;
  const i = document.createElement("span"), r = document.createElement("span"), s = position(e), { left: u, top: c, width: d, height: p2 } = t.getBoundingClientRect(), v = Math.sqrt(d * d + p2 * p2), m = v / 2, f = `${(d - v) / 2}px`, h2 = l ? f : `${s.left - u - m}px`, g = `${(p2 - v) / 2}px`, b = l ? g : `${s.top - c - m}px`;
  r.className = "q-ripple__inner", css(r, { height: `${v}px`, width: `${v}px`, transform: `translate3d(${h2},${b},0) scale3d(.2,.2,1)`, opacity: 0 }), i.className = `q-ripple${a ? " text-" + a : ""}`, i.setAttribute("dir", "ltr"), i.appendChild(r), t.appendChild(i);
  const y = () => {
    i.remove(), clearTimeout(S);
  };
  o.abort.push(y);
  let S = setTimeout(() => {
    r.classList.add("q-ripple__inner--enter"), r.style.transform = `translate3d(${f},${g},0) scale3d(1,1,1)`, r.style.opacity = 0.2, S = setTimeout(() => {
      r.classList.remove("q-ripple__inner--enter"), r.classList.add("q-ripple__inner--leave"), r.style.opacity = 0, S = setTimeout(() => {
        i.remove(), o.abort.splice(o.abort.indexOf(y), 1);
      }, 275);
    }, 250);
  }, 50);
}
function updateModifiers$1(e, { modifiers: t, value: o, arg: n, instance: a }) {
  const l = Object.assign({}, a.$q.config.ripple, t, o);
  e.modifiers = { early: l.early === true, stop: l.stop === true, center: l.center === true, color: l.color || n, keyCodes: [].concat(l.keyCodes || 13) };
}
var Ripple = { name: "ripple", beforeMount(e, t) {
  const o = { enabled: t.value !== false, modifiers: {}, abort: [], start(t2) {
    o.enabled === true && t2.qSkipRipple !== true && (o.modifiers.early === true ? ["mousedown", "touchstart"].includes(t2.type) === true : t2.type === "click") && showRipple(t2, e, o, t2.qKeyEvent === true);
  }, keystart: throttle((t2) => {
    o.enabled === true && t2.qSkipRipple !== true && isKeyCode(t2, o.modifiers.keyCodes) === true && t2.type === `key${o.modifiers.early === true ? "down" : "up"}` && showRipple(t2, e, o, true);
  }, 300) };
  updateModifiers$1(o, t), e.__qripple = o, addEvt(o, "main", [[e, "mousedown", "start", "passive"], [e, "touchstart", "start", "passive"], [e, "click", "start", "passive"], [e, "keydown", "keystart", "passive"], [e, "keyup", "keystart", "passive"]]);
}, updated(e, t) {
  if (t.oldValue !== t.value) {
    const o = e.__qripple;
    o.enabled = t.value !== false, o.enabled === true && Object(t.value) === t.value && updateModifiers$1(o, t);
  }
}, beforeUnmount(e) {
  const t = e.__qripple;
  t.abort.forEach((e2) => {
    e2();
  }), cleanEvt(t, "main"), delete e._qripple;
} };
const padding = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }, defaultSizes$2 = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 }, useBtnProps = __spreadProps(__spreadValues(__spreadValues({}, useSizeProps$1), useRouterLinkProps), { type: { type: String, default: "button" }, label: [Number, String], icon: String, iconRight: String, round: Boolean, outline: Boolean, flat: Boolean, unelevated: Boolean, rounded: Boolean, push: Boolean, glossy: Boolean, size: String, fab: Boolean, fabMini: Boolean, padding: String, color: String, textColor: String, noCaps: Boolean, noWrap: Boolean, dense: Boolean, tabindex: [Number, String], ripple: { type: [Boolean, Object], default: true }, align: __spreadProps(__spreadValues({}, useAlignProps.align), { default: "center" }), stack: Boolean, stretch: Boolean, loading: { type: Boolean, default: null }, disable: Boolean });
function useBtn(e) {
  const t = useSize$1(e, defaultSizes$2), o = useAlign(e), { hasLink: n, linkProps: a, navigateToLink: l } = useRouterLink(), i = computed(() => {
    const o2 = e.fab === false && e.fabMini === false ? t.value : {};
    return e.padding !== void 0 ? Object.assign({}, o2, { padding: e.padding.split(/\s+/).map((e2) => e2 in padding ? padding[e2] + "px" : e2).join(" "), minWidth: "0", minHeight: "0" }) : o2;
  }), r = computed(() => e.rounded === true || e.fab === true || e.fabMini === true), s = computed(() => e.disable !== true && e.loading !== true), u = computed(() => s.value === true ? e.tabindex || 0 : -1), c = computed(() => e.type === "a" || n.value === true), d = computed(() => {
    return e.flat === true ? "flat" : e.outline === true ? "outline" : e.push === true ? "push" : e.unelevated === true ? "unelevated" : "standard";
  }), p2 = computed(() => {
    const t2 = { tabindex: u.value };
    return e.type === "a" || e.type === "button" && n.value === true || (t2.type = e.type), n.value === true ? (Object.assign(t2, a.value), t2.role = "link") : t2.role = e.type === "a" ? "link" : "button", e.loading === true && e.percentage !== void 0 && Object.assign(t2, { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": e.percentage }), e.disable === true && (t2.disabled = "", t2["aria-disabled"] = "true"), t2;
  }), v = computed(() => {
    let t2;
    return e.color !== void 0 ? t2 = e.flat === true || e.outline === true ? `text-${e.textColor || e.color}` : `bg-${e.color} text-${e.textColor || "white"}` : e.textColor && (t2 = `text-${e.textColor}`), `q-btn--${d.value} q-btn--${e.round === true ? "round" : `rectangle${r.value === true ? " q-btn--rounded" : ""}`}` + (t2 !== void 0 ? " " + t2 : "") + (s.value === true ? " q-btn--actionable q-focusable q-hoverable" : e.disable === true ? " disabled" : "") + (e.fab === true ? " q-btn--fab" : e.fabMini === true ? " q-btn--fab-mini" : "") + (e.noCaps === true ? " q-btn--no-uppercase" : "") + (e.dense === true ? " q-btn--dense" : "") + (e.stretch === true ? " no-border-radius self-stretch" : "") + (e.glossy === true ? " glossy" : "");
  }), m = computed(() => o.value + (e.stack === true ? " column" : " row") + (e.noWrap === true ? " no-wrap text-no-wrap" : "") + (e.loading === true ? " q-btn__content--hidden" : ""));
  return { classes: v, style: i, innerClasses: m, attributes: p2, hasLink: n, isLink: c, navigateToLink: l, isActionable: s };
}
const { passiveCapture } = listenOpts$1;
let touchTarget = null, keyboardTarget = null, mouseTarget = null;
var QBtn = defineComponent({ name: "QBtn", props: __spreadProps(__spreadValues({}, useBtnProps), { percentage: Number, darkPercentage: Boolean }), emits: ["click", "keydown", "touchstart", "mousedown", "keyup"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { classes: a, style: l, innerClasses: i, attributes: r, hasLink: s, isLink: u, navigateToLink: c, isActionable: d } = useBtn(e), p2 = ref(null), v = ref(null);
  let m, f, g = null;
  const b = computed(() => e.label !== void 0 && e.label !== null && e.label !== ""), y = computed(() => e.disable !== true && e.ripple !== false && __spreadValues({ keyCodes: u.value === true ? [13, 32] : [13] }, e.ripple === true ? {} : e.ripple)), S = computed(() => ({ center: e.round })), w = computed(() => {
    const t2 = Math.max(0, Math.min(100, e.percentage));
    return t2 > 0 ? { transition: "transform 0.6s", transform: `translateX(${t2 - 100}%)` } : {};
  }), x = computed(() => {
    return e.loading === true ? { onMousedown: M, onTouchstartPassive: M, onClick: M, onKeydown: M, onKeyup: M } : d.value === true ? { onClick: k, onKeydown: _, onMousedown: T, onTouchstartPassive: q } : { onClick: stopAndPrevent$1 };
  }), C = computed(() => __spreadValues(__spreadValues({ ref: p2, class: "q-btn q-btn-item non-selectable no-outline " + a.value, style: l.value }, r.value), x.value));
  function k(t2) {
    if (p2.value !== null) {
      if (t2 !== void 0) {
        if (t2.defaultPrevented === true)
          return;
        const o2 = document.activeElement;
        if (e.type === "submit" && o2 !== document.body && p2.value.contains(o2) === false && o2.contains(p2.value) === false) {
          p2.value.focus();
          const e2 = () => {
            document.removeEventListener("keydown", stopAndPrevent$1, true), document.removeEventListener("keyup", e2, passiveCapture), p2.value !== null && p2.value.removeEventListener("blur", e2, passiveCapture);
          };
          document.addEventListener("keydown", stopAndPrevent$1, true), document.addEventListener("keyup", e2, passiveCapture), p2.value.addEventListener("blur", e2, passiveCapture);
        }
      }
      if (s.value === true) {
        const e2 = () => {
          t2.__qNavigate = true, c(t2);
        };
        o("click", t2, e2), t2.defaultPrevented !== true && e2();
      } else
        o("click", t2);
    }
  }
  function _(e2) {
    p2.value !== null && (isKeyCode(e2, [13, 32]) === true && (stopAndPrevent$1(e2), keyboardTarget !== p2.value && (keyboardTarget !== null && $(), p2.value.focus(), keyboardTarget = p2.value, p2.value.classList.add("q-btn--active"), document.addEventListener("keyup", P, true), p2.value.addEventListener("blur", P, passiveCapture))), o("keydown", e2));
  }
  function q(e2) {
    p2.value !== null && (touchTarget !== p2.value && (touchTarget !== null && $(), touchTarget = p2.value, g = e2.target, g.addEventListener("touchcancel", P, passiveCapture), g.addEventListener("touchend", P, passiveCapture)), m = true, clearTimeout(f), f = setTimeout(() => {
      m = false;
    }, 200), o("touchstart", e2));
  }
  function T(e2) {
    p2.value !== null && (mouseTarget !== p2.value && (mouseTarget !== null && $(), mouseTarget = p2.value, p2.value.classList.add("q-btn--active"), document.addEventListener("mouseup", P, passiveCapture)), e2.qSkipRipple = m === true, o("mousedown", e2));
  }
  function P(e2) {
    if (p2.value !== null && (e2 === void 0 || e2.type !== "blur" || document.activeElement !== p2.value)) {
      if (e2 !== void 0 && e2.type === "keyup") {
        if (keyboardTarget === p2.value && isKeyCode(e2, [13, 32]) === true) {
          const t2 = new MouseEvent("click", e2);
          t2.qKeyEvent = true, e2.defaultPrevented === true && prevent$1(t2), e2.cancelBubble === true && stop$1(t2), p2.value.dispatchEvent(t2), stopAndPrevent$1(e2), e2.qKeyEvent = true;
        }
        o("keyup", e2);
      }
      $();
    }
  }
  function $(e2) {
    const t2 = v.value;
    e2 === true || touchTarget !== p2.value && mouseTarget !== p2.value || t2 === null || t2 === document.activeElement || (t2.setAttribute("tabindex", -1), t2.focus()), touchTarget === p2.value && (g !== null && (g.removeEventListener("touchcancel", P, passiveCapture), g.removeEventListener("touchend", P, passiveCapture)), touchTarget = g = null), mouseTarget === p2.value && (document.removeEventListener("mouseup", P, passiveCapture), mouseTarget = null), keyboardTarget === p2.value && (document.removeEventListener("keyup", P, true), p2.value !== null && p2.value.removeEventListener("blur", P, passiveCapture), keyboardTarget = null), p2.value !== null && p2.value.classList.remove("q-btn--active");
  }
  function M(e2) {
    e2.qSkipRipple = true;
  }
  return onBeforeUnmount(() => {
    $(true);
  }), Object.assign(n, { click: k }), () => {
    let o2 = [];
    e.icon !== void 0 && o2.push(h(QIcon$1, { name: e.icon, left: e.stack === false && b.value === true, role: "img", "aria-hidden": "true" })), b.value === true && o2.push(h("span", { class: "block" }, [e.label])), o2 = hMergeSlot$1(t.default, o2), e.iconRight !== void 0 && e.round === false && o2.push(h(QIcon$1, { name: e.iconRight, right: e.stack === false && b.value === true, role: "img", "aria-hidden": "true" }));
    const n2 = [h("span", { class: "q-focus-helper", ref: v })];
    return e.loading === true && e.percentage !== void 0 && n2.push(h("span", { class: "q-btn__progress absolute-full overflow-hidden" }, [h("span", { class: "q-btn__progress-indicator fit block" + (e.darkPercentage === true ? " q-btn__progress--dark" : ""), style: w.value })])), n2.push(h("span", { class: "q-btn__content text-center col items-center q-anchor--skip " + i.value }, o2)), e.loading !== null && n2.push(h(Transition, { name: "q-transition--fade" }, () => e.loading === true ? [h("span", { key: "loading", class: "absolute-full flex flex-center" }, t.loading !== void 0 ? t.loading() : [h(QSpinner$1)])] : null)), withDirectives(h(u.value === true ? "a" : "button", C.value, n2), [[Ripple, y.value, void 0, S.value]]);
  };
} }), QBtnGroup = defineComponent({ name: "QBtnGroup", props: { unelevated: Boolean, outline: Boolean, flat: Boolean, rounded: Boolean, push: Boolean, stretch: Boolean, glossy: Boolean, spread: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => {
    const t2 = ["unelevated", "outline", "flat", "rounded", "push", "stretch", "glossy"].filter((t3) => e[t3] === true).map((e2) => `q-btn-group--${e2}`).join(" ");
    return `q-btn-group row no-wrap${t2.length > 0 ? " " + t2 : ""}` + (e.spread === true ? " q-btn-group--spread" : " inline");
  });
  return () => h("div", { class: o.value }, hSlot$1(t.default));
} });
function clearSelection() {
  if (window.getSelection !== void 0) {
    const e = window.getSelection();
    e.empty !== void 0 ? e.empty() : e.removeAllRanges !== void 0 && (e.removeAllRanges(), Platform$1.is.mobile !== true && e.addRange(document.createRange()));
  } else
    document.selection !== void 0 && document.selection.empty();
}
const useAnchorProps = { target: { default: true }, noParentEvent: Boolean, contextMenu: Boolean };
function useAnchor({ showing: e, avoidEmit: t, configureAnchorEl: o }) {
  const { props: n, proxy: a, emit: l } = getCurrentInstance(), i = ref(null);
  let r;
  function s(e2) {
    return i.value !== null && (e2 === void 0 || e2.touches === void 0 || e2.touches.length <= 1);
  }
  const u = {};
  function c() {
    cleanEvt(u, "anchor");
  }
  function d(e2) {
    i.value = e2;
    while (i.value.classList.contains("q-anchor--skip"))
      i.value = i.value.parentNode;
    o();
  }
  function p2() {
    if (n.target === false || n.target === "")
      i.value = null;
    else if (n.target === true)
      d(a.$el.parentNode);
    else {
      let e2 = n.target;
      if (typeof n.target === "string")
        try {
          e2 = document.querySelector(n.target);
        } catch (t2) {
          e2 = void 0;
        }
      e2 !== void 0 && e2 !== null ? (i.value = e2.$el || e2, o()) : (i.value = null, console.error(`Anchor: target "${n.target}" not found`));
    }
  }
  return o === void 0 && (Object.assign(u, { hide(e2) {
    a.hide(e2);
  }, toggle(e2) {
    a.toggle(e2), e2.qAnchorHandled = true;
  }, toggleKey(e2) {
    isKeyCode(e2, 13) === true && u.toggle(e2);
  }, contextClick(e2) {
    a.hide(e2), prevent$1(e2), nextTick(() => {
      a.show(e2), e2.qAnchorHandled = true;
    });
  }, prevent: prevent$1, mobileTouch(e2) {
    if (u.mobileCleanup(e2), s(e2) !== true)
      return;
    a.hide(e2), i.value.classList.add("non-selectable");
    const t2 = e2.target;
    addEvt(u, "anchor", [[t2, "touchmove", "mobileCleanup", "passive"], [t2, "touchend", "mobileCleanup", "passive"], [t2, "touchcancel", "mobileCleanup", "passive"], [i.value, "contextmenu", "prevent", "notPassive"]]), r = setTimeout(() => {
      a.show(e2), e2.qAnchorHandled = true;
    }, 300);
  }, mobileCleanup(t2) {
    i.value.classList.remove("non-selectable"), clearTimeout(r), e.value === true && t2 !== void 0 && clearSelection();
  } }), o = function(e2 = n.contextMenu) {
    if (n.noParentEvent === true || i.value === null)
      return;
    let t2;
    t2 = e2 === true ? a.$q.platform.is.mobile === true ? [[i.value, "touchstart", "mobileTouch", "passive"]] : [[i.value, "mousedown", "hide", "passive"], [i.value, "contextmenu", "contextClick", "notPassive"]] : [[i.value, "click", "toggle", "passive"], [i.value, "keyup", "toggleKey", "passive"]], addEvt(u, "anchor", t2);
  }), watch(() => n.contextMenu, (e2) => {
    i.value !== null && (c(), o(e2));
  }), watch(() => n.target, () => {
    i.value !== null && c(), p2();
  }), watch(() => n.noParentEvent, (e2) => {
    i.value !== null && (e2 === true ? c() : o());
  }), onMounted(() => {
    p2(), t !== true && n.modelValue === true && i.value === null && l("update:modelValue", false);
  }), onBeforeUnmount(() => {
    clearTimeout(r), c();
  }), { anchorEl: i, canShow: s, anchorEvents: u };
}
function useScrollTarget(e, t) {
  const o = ref(null);
  let n;
  function a(e2, t2) {
    const o2 = `${t2 !== void 0 ? "add" : "remove"}EventListener`, a2 = t2 !== void 0 ? t2 : n;
    e2 !== window && e2[o2]("scroll", a2, listenOpts$1.passive), window[o2]("scroll", a2, listenOpts$1.passive), n = t2;
  }
  function l() {
    o.value !== null && (a(o.value), o.value = null);
  }
  const i = watch(() => e.noParentEvent, () => {
    o.value !== null && (l(), t());
  });
  return onBeforeUnmount(i), { localScrollTarget: o, unconfigureScrollTarget: l, changeScrollEvent: a };
}
const useModelToggleProps = { modelValue: { type: Boolean, default: null }, "onUpdate:modelValue": Function }, useModelToggleEmits = ["before-show", "show", "before-hide", "hide"];
function useModelToggle({ showing: e, canShow: t, hideOnRouteChange: o, handleShow: n, handleHide: a, processOnMount: l }) {
  const i = getCurrentInstance(), { props: r, emit: s, proxy: u } = i;
  let c;
  function d(t2) {
    e.value === true ? m(t2) : p2(t2);
  }
  function p2(e2) {
    if (r.disable === true || e2 !== void 0 && e2.qAnchorHandled === true || t !== void 0 && t(e2) !== true)
      return;
    const o2 = r["onUpdate:modelValue"] !== void 0;
    o2 === true && (s("update:modelValue", true), c = e2, nextTick(() => {
      c === e2 && (c = void 0);
    })), r.modelValue !== null && o2 !== false || v(e2);
  }
  function v(t2) {
    e.value !== true && (e.value = true, s("before-show", t2), n !== void 0 ? n(t2) : s("show", t2));
  }
  function m(e2) {
    if (r.disable === true)
      return;
    const t2 = r["onUpdate:modelValue"] !== void 0;
    t2 === true && (s("update:modelValue", false), c = e2, nextTick(() => {
      c === e2 && (c = void 0);
    })), r.modelValue !== null && t2 !== false || f(e2);
  }
  function f(t2) {
    e.value !== false && (e.value = false, s("before-hide", t2), a !== void 0 ? a(t2) : s("hide", t2));
  }
  function h2(t2) {
    if (r.disable === true && t2 === true)
      r["onUpdate:modelValue"] !== void 0 && s("update:modelValue", false);
    else if (t2 === true !== e.value) {
      const e2 = t2 === true ? v : f;
      e2(c);
    }
  }
  watch(() => r.modelValue, h2), o !== void 0 && vmHasRouter(i) === true && watch(() => u.$route, () => {
    o.value === true && e.value === true && m();
  }), l === true && onMounted(() => {
    h2(r.modelValue);
  });
  const g = { show: p2, hide: m, toggle: d };
  return Object.assign(u, g), g;
}
let queue = [];
const waitFlags$1 = [];
function addFocusWaitFlag(e) {
  waitFlags$1.push(e);
}
function removeFocusWaitFlag(e) {
  const t = waitFlags$1.indexOf(e);
  t !== -1 && waitFlags$1.splice(t, 1), waitFlags$1.length === 0 && queue.length > 0 && (queue[queue.length - 1](), queue = []);
}
function addFocusFn$1(e) {
  if (waitFlags$1.length !== 0)
    return queue.push(e), e;
  e();
}
function removeFocusFn(e) {
  const t = queue.indexOf(e);
  t !== -1 && queue.splice(t, 1);
}
const globalNodes = [];
let target = document.body;
function createGlobalNode(e) {
  const t = document.createElement("div");
  if (e !== void 0 && (t.id = e), globalConfig.globalNodes !== void 0) {
    const e2 = globalConfig.globalNodes.class;
    e2 !== void 0 && (t.className = e2);
  }
  return target.appendChild(t), globalNodes.push(t), t;
}
function removeGlobalNode(e) {
  globalNodes.splice(globalNodes.indexOf(e), 1), e.remove();
}
function changeGlobalNodesTarget(e) {
  e !== target && (target = e, globalNodes.forEach((e2) => {
    e2.contains(target) === false && target.appendChild(e2);
  }));
}
const portalList = [];
function getPortalVm(e) {
  return portalList.find((t) => t.__qPortalInnerRef.value !== null && t.__qPortalInnerRef.value.contains(e));
}
function closePortalMenus(e, t) {
  do {
    if (e.$options.name === "QMenu") {
      if (e.hide(t), e.$props.separateClosePopup === true)
        return getParentVm(e);
    } else if (e.__qPortalInnerRef !== void 0) {
      const o = getParentVm(e);
      return o !== void 0 && o.$options.name === "QPopupProxy" ? (e.hide(t), o) : e;
    }
    e = getParentVm(e);
  } while (e !== void 0 && e !== null);
}
function closePortals(e, t, o) {
  while (o !== 0 && e !== void 0 && e !== null) {
    if (e.__qPortalInnerRef !== void 0) {
      if (o--, e.$options.name === "QMenu") {
        e = closePortalMenus(e, t);
        continue;
      }
      e.hide(t);
    }
    e = getParentVm(e);
  }
}
function isOnGlobalDialog(e) {
  e = e.parent;
  while (e !== void 0 && e !== null) {
    if (e.type.name === "QGlobalDialog")
      return true;
    if (e.type.name === "QDialog" || e.type.name === "QMenu")
      return false;
    e = e.parent;
  }
  return false;
}
function usePortal(e, t, o, n) {
  const a = ref(false);
  let l = null;
  const i = {}, r = n === true && isOnGlobalDialog(e);
  function s(t2) {
    t2 !== true ? (r === false && l === null && (l = createGlobalNode()), a.value = true, portalList.push(e.proxy), addFocusWaitFlag(i)) : removeFocusWaitFlag(i);
  }
  function u() {
    removeFocusWaitFlag(i), a.value = false;
    const t2 = portalList.indexOf(e.proxy);
    t2 > -1 && portalList.splice(t2, 1), l !== null && (removeGlobalNode(l), l = null);
  }
  return onUnmounted(u), Object.assign(e.proxy, { __qPortalInnerRef: t }), { showPortal: s, hidePortal: u, portalIsActive: a, renderPortal: () => r === true ? o() : a.value === true ? [h(Teleport, { to: l }, o())] : void 0 };
}
const useTransitionProps = { transitionShow: { type: String, default: "fade" }, transitionHide: { type: String, default: "fade" }, transitionDuration: { type: [String, Number], default: 300 } };
function useTransition(e, t) {
  const o = ref(t.value);
  return watch(t, (e2) => {
    nextTick(() => {
      o.value = e2;
    });
  }), { transition: computed(() => "q-transition--" + (o.value === true ? e.transitionHide : e.transitionShow)), transitionStyle: computed(() => `--q-transition-duration: ${e.transitionDuration}ms`) };
}
function useTick() {
  let e;
  return onBeforeUnmount(() => {
    e = void 0;
  }), { registerTick(t) {
    e = t;
  }, removeTick() {
    e = void 0;
  }, prepareTick() {
    if (e !== void 0) {
      const t = e;
      nextTick(() => {
        e === t && (e(), e = void 0);
      });
    }
  } };
}
function useTimeout() {
  let e;
  return onBeforeUnmount(() => {
    clearTimeout(e);
  }), { registerTimeout(t, o) {
    clearTimeout(e), e = setTimeout(t, o);
  }, removeTimeout() {
    clearTimeout(e);
  } };
}
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(e, t) {
  let o = getElement$1(t);
  if (o === void 0) {
    if (e === void 0 || e === null)
      return window;
    o = e.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(o) ? window : o;
}
function getScrollHeight(e) {
  return (e === window ? document.body : e).scrollHeight;
}
function getVerticalScrollPosition(e) {
  return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop;
}
function getHorizontalScrollPosition(e) {
  return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft;
}
function animVerticalScrollTo(e, t, o = 0) {
  const n = arguments[3] === void 0 ? performance.now() : arguments[3], a = getVerticalScrollPosition(e);
  o <= 0 ? a !== t && setScroll$1(e, t) : requestAnimationFrame((l) => {
    const i = l - n, r = a + (t - a) / Math.max(i, o) * i;
    setScroll$1(e, r), r !== t && animVerticalScrollTo(e, t, o - i, l);
  });
}
function animHorizontalScrollTo(e, t, o = 0) {
  const n = arguments[3] === void 0 ? performance.now() : arguments[3], a = getHorizontalScrollPosition(e);
  o <= 0 ? a !== t && setHorizontalScroll(e, t) : requestAnimationFrame((l) => {
    const i = l - n, r = a + (t - a) / Math.max(i, o) * i;
    setHorizontalScroll(e, r), r !== t && animHorizontalScrollTo(e, t, o - i, l);
  });
}
function setScroll$1(e, t) {
  e !== window ? e.scrollTop = t : window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t);
}
function setHorizontalScroll(e, t) {
  e !== window ? e.scrollLeft = t : window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
}
function setVerticalScrollPosition(e, t, o) {
  o ? animVerticalScrollTo(e, t, o) : setScroll$1(e, t);
}
function setHorizontalScrollPosition(e, t, o) {
  o ? animHorizontalScrollTo(e, t, o) : setHorizontalScroll(e, t);
}
let size;
function getScrollbarWidth() {
  if (size !== void 0)
    return size;
  const e = document.createElement("p"), t = document.createElement("div");
  css(e, { width: "100%", height: "200px" }), css(t, { position: "absolute", top: "0px", left: "0px", visibility: "hidden", width: "200px", height: "150px", overflow: "hidden" }), t.appendChild(e), document.body.appendChild(t);
  const o = e.offsetWidth;
  t.style.overflow = "scroll";
  let n = e.offsetWidth;
  return o === n && (n = t.clientWidth), t.remove(), size = o - n, size;
}
function hasScrollbar(e, t = true) {
  return !(!e || e.nodeType !== Node.ELEMENT_NODE) && (t ? e.scrollHeight > e.clientHeight && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"])) : e.scrollWidth > e.clientWidth && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"])));
}
const handlers$1 = [];
let escDown;
function onKeydown(e) {
  escDown = e.keyCode === 27;
}
function onBlur() {
  escDown === true && (escDown = false);
}
function onKeyup(e) {
  escDown === true && (escDown = false, isKeyCode(e, 27) === true && handlers$1[handlers$1.length - 1](e));
}
function update$4(e) {
  window[e]("keydown", onKeydown), window[e]("blur", onBlur), window[e]("keyup", onKeyup), escDown = false;
}
function addEscapeKey(e) {
  client$1.is.desktop === true && (handlers$1.push(e), handlers$1.length === 1 && update$4("addEventListener"));
}
function removeEscapeKey(e) {
  const t = handlers$1.indexOf(e);
  t > -1 && (handlers$1.splice(t, 1), handlers$1.length === 0 && update$4("removeEventListener"));
}
const handlers = [];
function trigger$1(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(e) {
  client$1.is.desktop === true && (handlers.push(e), handlers.length === 1 && document.body.addEventListener("focusin", trigger$1));
}
function removeFocusout(e) {
  const t = handlers.indexOf(e);
  t > -1 && (handlers.splice(t, 1), handlers.length === 0 && document.body.removeEventListener("focusin", trigger$1));
}
let timer;
const { notPassiveCapture } = listenOpts$1, registeredList = [];
function globalHandler(e) {
  clearTimeout(timer);
  const t = e.target;
  if (t === void 0 || t.nodeType === 8 || t.classList.contains("no-pointer-events") === true)
    return;
  let o = portalList.length - 1;
  while (o >= 0) {
    const e2 = portalList[o].$;
    if (e2.type.name !== "QDialog")
      break;
    if (e2.props.seamless !== true)
      return;
    o--;
  }
  for (let n = registeredList.length - 1; n >= 0; n--) {
    const o2 = registeredList[n];
    if (o2.anchorEl.value !== null && o2.anchorEl.value.contains(t) !== false || t !== document.body && (o2.innerRef.value === null || o2.innerRef.value.contains(t) !== false))
      return;
    e.qClickOutside = true, o2.onClickOutside(e);
  }
}
function addClickOutside(e) {
  registeredList.push(e), registeredList.length === 1 && (document.addEventListener("mousedown", globalHandler, notPassiveCapture), document.addEventListener("touchstart", globalHandler, notPassiveCapture));
}
function removeClickOutside(e) {
  const t = registeredList.findIndex((t2) => t2 === e);
  t > -1 && (registeredList.splice(t, 1), registeredList.length === 0 && (clearTimeout(timer), document.removeEventListener("mousedown", globalHandler, notPassiveCapture), document.removeEventListener("touchstart", globalHandler, notPassiveCapture)));
}
let vpLeft, vpTop;
function validatePosition(e) {
  const t = e.split(" ");
  return t.length === 2 && (["top", "center", "bottom"].includes(t[0]) !== true ? (console.error("Anchor/Self position must start with one of top/center/bottom"), false) : ["left", "middle", "right", "start", "end"].includes(t[1]) === true || (console.error("Anchor/Self position must end with one of left/middle/right/start/end"), false));
}
function validateOffset(e) {
  return !e || e.length === 2 && (typeof e[0] === "number" && typeof e[1] === "number");
}
const horizontalPos = { "start#ltr": "left", "start#rtl": "right", "end#ltr": "right", "end#rtl": "left" };
function parsePosition(e, t) {
  const o = e.split(" ");
  return { vertical: o[0], horizontal: horizontalPos[`${o[1]}#${t === true ? "rtl" : "ltr"}`] };
}
function getAnchorProps(e, t) {
  let { top: o, left: n, right: a, bottom: l, width: i, height: r } = e.getBoundingClientRect();
  return t !== void 0 && (o -= t[1], n -= t[0], l += t[1], a += t[0], i += t[0], r += t[1]), { top: o, left: n, right: a, bottom: l, width: i, height: r, middle: n + (a - n) / 2, center: o + (l - o) / 2 };
}
function getTargetProps(e) {
  return { top: 0, center: e.offsetHeight / 2, bottom: e.offsetHeight, left: 0, middle: e.offsetWidth / 2, right: e.offsetWidth };
}
function setPosition(e) {
  if (client$1.is.ios === true && window.visualViewport !== void 0) {
    const e2 = document.body.style, { offsetLeft: t2, offsetTop: o2 } = window.visualViewport;
    t2 !== vpLeft && (e2.setProperty("--q-pe-left", t2 + "px"), vpLeft = t2), o2 !== vpTop && (e2.setProperty("--q-pe-top", o2 + "px"), vpTop = o2);
  }
  let t;
  const { scrollLeft: o, scrollTop: n } = e.el;
  if (e.absoluteOffset === void 0)
    t = getAnchorProps(e.anchorEl, e.cover === true ? [0, 0] : e.offset);
  else {
    const { top: o2, left: n2 } = e.anchorEl.getBoundingClientRect(), a2 = o2 + e.absoluteOffset.top, l2 = n2 + e.absoluteOffset.left;
    t = { top: a2, left: l2, width: 1, height: 1, right: l2 + 1, center: a2, middle: l2, bottom: a2 + 1 };
  }
  let a = { maxHeight: e.maxHeight, maxWidth: e.maxWidth, visibility: "visible" };
  e.fit !== true && e.cover !== true || (a.minWidth = t.width + "px", e.cover === true && (a.minHeight = t.height + "px")), Object.assign(e.el.style, a);
  const l = getTargetProps(e.el), i = { top: t[e.anchorOrigin.vertical] - l[e.selfOrigin.vertical], left: t[e.anchorOrigin.horizontal] - l[e.selfOrigin.horizontal] };
  applyBoundaries(i, t, l, e.anchorOrigin, e.selfOrigin), a = { top: i.top + "px", left: i.left + "px" }, i.maxHeight !== void 0 && (a.maxHeight = i.maxHeight + "px", t.height > i.maxHeight && (a.minHeight = a.maxHeight)), i.maxWidth !== void 0 && (a.maxWidth = i.maxWidth + "px", t.width > i.maxWidth && (a.minWidth = a.maxWidth)), Object.assign(e.el.style, a), e.el.scrollTop !== n && (e.el.scrollTop = n), e.el.scrollLeft !== o && (e.el.scrollLeft = o);
}
function applyBoundaries(e, t, o, n, a) {
  const l = o.bottom, i = o.right, r = getScrollbarWidth(), s = window.innerHeight - r, u = document.body.clientWidth;
  if (e.top < 0 || e.top + l > s)
    if (a.vertical === "center")
      e.top = t[n.vertical] > s / 2 ? Math.max(0, s - l) : 0, e.maxHeight = Math.min(l, s);
    else if (t[n.vertical] > s / 2) {
      const o2 = Math.min(s, n.vertical === "center" ? t.center : n.vertical === a.vertical ? t.bottom : t.top);
      e.maxHeight = Math.min(l, o2), e.top = Math.max(0, o2 - l);
    } else
      e.top = Math.max(0, n.vertical === "center" ? t.center : n.vertical === a.vertical ? t.top : t.bottom), e.maxHeight = Math.min(l, s - e.top);
  if (e.left < 0 || e.left + i > u)
    if (e.maxWidth = Math.min(i, u), a.horizontal === "middle")
      e.left = t[n.horizontal] > u / 2 ? Math.max(0, u - i) : 0;
    else if (t[n.horizontal] > u / 2) {
      const o2 = Math.min(u, n.horizontal === "middle" ? t.middle : n.horizontal === a.horizontal ? t.right : t.left);
      e.maxWidth = Math.min(i, o2), e.left = Math.max(0, o2 - e.maxWidth);
    } else
      e.left = Math.max(0, n.horizontal === "middle" ? t.middle : n.horizontal === a.horizontal ? t.left : t.right), e.maxWidth = Math.min(i, u - e.left);
}
["left", "middle", "right"].forEach((e) => {
  horizontalPos[`${e}#ltr`] = e, horizontalPos[`${e}#rtl`] = e;
});
var QMenu = defineComponent({ name: "QMenu", inheritAttrs: false, props: __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, useAnchorProps), useModelToggleProps), useDarkProps$1), useTransitionProps), { persistent: Boolean, autoClose: Boolean, separateClosePopup: Boolean, noRouteDismiss: Boolean, noRefocus: Boolean, noFocus: Boolean, fit: Boolean, cover: Boolean, square: Boolean, anchor: { type: String, validator: validatePosition }, self: { type: String, validator: validatePosition }, offset: { type: Array, validator: validateOffset }, scrollTarget: { default: void 0 }, touchPosition: Boolean, maxHeight: { type: String, default: null }, maxWidth: { type: String, default: null } }), emits: [...useModelToggleEmits, "click", "escape-key"], setup(e, { slots: t, emit: o, attrs: n }) {
  let a, l, i, r = null;
  const s = getCurrentInstance(), { proxy: u } = s, { $q: c } = u, d = ref(null), p2 = ref(false), v = computed(() => e.persistent !== true && e.noRouteDismiss !== true), m = useDark$1(e, c), { registerTick: f, removeTick: g, prepareTick: b } = useTick(), { registerTimeout: y, removeTimeout: S } = useTimeout(), { transition: w, transitionStyle: x } = useTransition(e, p2), { localScrollTarget: C, changeScrollEvent: k, unconfigureScrollTarget: _ } = useScrollTarget(e, I), { anchorEl: q, canShow: T } = useAnchor({ showing: p2 }), { hide: P } = useModelToggle({ showing: p2, canShow: T, handleShow: D, handleHide: V, hideOnRouteChange: v, processOnMount: true }), { showPortal: $, hidePortal: M, renderPortal: B } = usePortal(s, d, K), Q = { anchorEl: q, innerRef: d, onClickOutside(t2) {
    if (e.persistent !== true && p2.value === true)
      return P(t2), (t2.type === "touchstart" || t2.target.classList.contains("q-dialog__backdrop")) && stopAndPrevent$1(t2), true;
  } }, E = computed(() => parsePosition(e.anchor || (e.cover === true ? "center middle" : "bottom start"), c.lang.rtl)), O = computed(() => e.cover === true ? E.value : parsePosition(e.self || "top start", c.lang.rtl)), L = computed(() => (e.square === true ? " q-menu--square" : "") + (m.value === true ? " q-menu--dark q-dark" : "")), z = computed(() => e.autoClose === true ? { onClick: H } : {}), F = computed(() => p2.value === true && e.persistent !== true);
  function R() {
    addFocusFn$1(() => {
      let e2 = d.value;
      e2 && e2.contains(document.activeElement) !== true && (e2 = e2.querySelector("[autofocus], [data-autofocus]") || e2, e2.focus());
    });
  }
  function D(t2) {
    if (g(), S(), r = e.noRefocus === false ? document.activeElement : null, addFocusout(N), $(), I(), a = void 0, t2 !== void 0 && (e.touchPosition || e.contextMenu)) {
      const e2 = position(t2);
      if (e2.left !== void 0) {
        const { top: t3, left: o2 } = q.value.getBoundingClientRect();
        a = { left: e2.left - o2, top: e2.top - t3 };
      }
    }
    l === void 0 && (l = watch(() => c.screen.width + "|" + c.screen.height + "|" + e.self + "|" + e.anchor + "|" + c.lang.rtl, U)), e.noFocus !== true && document.activeElement.blur(), f(() => {
      U(), e.noFocus !== true && R();
    }), b(), y(() => {
      c.platform.is.ios === true && (i = e.autoClose, d.value.click()), U(), $(true), o("show", t2);
    }, e.transitionDuration);
  }
  function V(t2) {
    g(), S(), A(true), r === null || t2 !== void 0 && t2.qClickOutside === true || r.focus(), y(() => {
      M(), o("hide", t2);
    }, e.transitionDuration);
  }
  function A(e2) {
    a = void 0, l !== void 0 && (l(), l = void 0), e2 !== true && p2.value !== true || (removeFocusout(N), _(), removeClickOutside(Q), removeEscapeKey(j));
  }
  function I() {
    q.value === null && e.scrollTarget === void 0 || (C.value = getScrollTarget(q.value, e.scrollTarget), k(C.value, U));
  }
  function H(e2) {
    i !== true ? (closePortalMenus(u, e2), o("click", e2)) : i = false;
  }
  function N(e2) {
    F.value === true && childHasFocus(d.value, e2.target) !== true && R();
  }
  function j(e2) {
    o("escape-key"), P(e2);
  }
  function U() {
    const t2 = d.value;
    t2 !== null && q.value !== null && setPosition({ el: t2, offset: e.offset, anchorEl: q.value, anchorOrigin: E.value, selfOrigin: O.value, absoluteOffset: a, fit: e.fit, cover: e.cover, maxHeight: e.maxHeight, maxWidth: e.maxWidth });
  }
  function K() {
    return h(Transition, { name: w.value, appear: true }, () => p2.value === true ? h("div", __spreadValues(__spreadProps(__spreadValues({}, n), { ref: d, tabindex: -1, class: ["q-menu q-position-engine scroll" + L.value, n.class], style: [n.style, x.value] }), z.value), hSlot$1(t.default)) : null);
  }
  return watch(F, (e2) => {
    e2 === true ? (addEscapeKey(j), addClickOutside(Q)) : (removeEscapeKey(j), removeClickOutside(Q));
  }), onBeforeUnmount(A), Object.assign(u, { focus: R, updatePosition: U }), B;
} }), QBtnDropdown = defineComponent({ name: "QBtnDropdown", props: __spreadProps(__spreadValues({}, useBtnProps), { modelValue: Boolean, split: Boolean, dropdownIcon: String, contentClass: [Array, String, Object], contentStyle: [Array, String, Object], cover: Boolean, persistent: Boolean, noRouteDismiss: Boolean, autoClose: Boolean, menuAnchor: { type: String, default: "bottom end" }, menuSelf: { type: String, default: "top end" }, menuOffset: Array, disableMainBtn: Boolean, disableDropdown: Boolean, noIconAnimation: Boolean }), emits: ["update:modelValue", "click", "before-show", "show", "before-hide", "hide"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), a = ref(e.modelValue), l = ref(null), i = computed(() => {
    const t2 = { "aria-expanded": a.value === true ? "true" : "false", "aria-haspopup": "true" };
    return (e.disable === true || e.split === false && e.disableMainBtn === true || e.disableDropdown === true) && (t2["aria-disabled"] = "true"), t2;
  }), r = computed(() => "q-btn-dropdown__arrow" + (a.value === true && e.noIconAnimation === false ? " rotate-180" : "") + (e.split === false ? " q-btn-dropdown__arrow-container" : ""));
  function s(e2) {
    a.value = true, o("before-show", e2);
  }
  function u(e2) {
    o("show", e2), o("update:modelValue", true);
  }
  function c(e2) {
    a.value = false, o("before-hide", e2);
  }
  function d(e2) {
    o("hide", e2), o("update:modelValue", false);
  }
  function p2(e2) {
    o("click", e2);
  }
  function v(e2) {
    stop$1(e2), g(), o("click", e2);
  }
  function m(e2) {
    l.value !== null && l.value.toggle(e2);
  }
  function f(e2) {
    l.value !== null && l.value.show(e2);
  }
  function g(e2) {
    l.value !== null && l.value.hide(e2);
  }
  return watch(() => e.modelValue, (e2) => {
    l.value !== null && l.value[e2 ? "show" : "hide"]();
  }), watch(() => e.split, g), Object.assign(n, { show: f, hide: g, toggle: m }), onMounted(() => {
    e.modelValue === true && f();
  }), () => {
    const o2 = [h(QIcon$1, { class: r.value, name: e.dropdownIcon || n.$q.iconSet.arrow.dropdown })];
    return e.disableDropdown !== true && o2.push(h(QMenu, { ref: l, class: e.contentClass, style: e.contentStyle, cover: e.cover, fit: true, persistent: e.persistent, noRouteDismiss: e.noRouteDismiss, autoClose: e.autoClose, anchor: e.menuAnchor, self: e.menuSelf, offset: e.menuOffset, separateClosePopup: true, onBeforeShow: s, onShow: u, onBeforeHide: c, onHide: d }, t.default)), e.split === false ? h(QBtn, __spreadProps(__spreadValues(__spreadProps(__spreadValues({ class: "q-btn-dropdown q-btn-dropdown--simple" }, e), { disable: e.disable === true || e.disableMainBtn === true, noWrap: true, round: false }), i.value), { onClick: p2 }), () => hSlot$1(t.label, []).concat(o2)) : h(QBtnGroup, { class: "q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item", outline: e.outline, flat: e.flat, rounded: e.rounded, push: e.push, unelevated: e.unelevated, glossy: e.glossy, stretch: e.stretch }, () => [h(QBtn, __spreadProps(__spreadValues({ class: "q-btn-dropdown--current" }, e), { disable: e.disable === true || e.disableMainBtn === true, noWrap: true, iconRight: e.iconRight, round: false, onClick: v }), t.label), h(QBtn, __spreadProps(__spreadValues({ class: "q-btn-dropdown__arrow-container q-anchor--skip" }, i.value), { disable: e.disable === true || e.disableDropdown === true, outline: e.outline, flat: e.flat, rounded: e.rounded, push: e.push, size: e.size, color: e.color, textColor: e.textColor, dense: e.dense, ripple: e.ripple }), () => o2)]);
  };
} });
const useFormProps$1 = { name: String };
function useFormAttrs(e) {
  return computed(() => ({ type: "hidden", name: e.name, value: e.modelValue }));
}
function useFormInject(e = {}, t = {}) {
  return (o, n, a) => {
    o[n](h("input", __spreadValues(__spreadValues({ class: "hidden" + (a || "") }, e.value), t.value)));
  };
}
function useFormInputNameAttr$1(e) {
  return computed(() => e.name || e.for);
}
var QBtnToggle = defineComponent({ name: "QBtnToggle", props: __spreadProps(__spreadValues({}, useFormProps$1), { modelValue: { required: true }, options: { type: Array, required: true, validator: (e) => e.every((e2) => ("label" in e2 || "icon" in e2 || "slot" in e2) && "value" in e2) }, color: String, textColor: String, toggleColor: { type: String, default: "primary" }, toggleTextColor: String, outline: Boolean, flat: Boolean, unelevated: Boolean, rounded: Boolean, push: Boolean, glossy: Boolean, size: String, padding: String, noCaps: Boolean, noWrap: Boolean, dense: Boolean, readonly: Boolean, disable: Boolean, stack: Boolean, stretch: Boolean, spread: Boolean, clearable: Boolean, ripple: { type: [Boolean, Object], default: true } }), emits: ["update:modelValue", "clear", "click"], setup(e, { slots: t, emit: o }) {
  const n = computed(() => e.options.find((t2) => t2.value === e.modelValue) !== void 0), a = computed(() => ({ type: "hidden", name: e.name, value: e.modelValue })), l = useFormInject(a), i = computed(() => e.options.map((t2, o2) => {
    const _a = t2, { attrs: n2, value: a2, slot: l2 } = _a, i2 = __objRest(_a, ["attrs", "value", "slot"]);
    return { slot: l2, props: __spreadProps(__spreadValues(__spreadValues({ key: o2, onClick(e2) {
      r(a2, t2, e2);
    } }, n2), i2), { outline: e.outline, flat: e.flat, rounded: e.rounded, push: e.push, unelevated: e.unelevated, dense: e.dense, disable: e.disable === true || i2.disable === true, color: a2 === e.modelValue ? s(i2, "toggleColor") : s(i2, "color"), textColor: a2 === e.modelValue ? s(i2, "toggleTextColor") : s(i2, "textColor"), noCaps: s(i2, "noCaps") === true, noWrap: s(i2, "noWrap") === true, size: s(i2, "size"), padding: s(i2, "padding"), ripple: s(i2, "ripple"), stack: s(i2, "stack") === true, stretch: s(i2, "stretch") === true }) };
  }));
  function r(t2, n2, a2) {
    e.readonly !== true && (e.modelValue === t2 ? e.clearable === true && (o("update:modelValue", null, null), o("clear")) : o("update:modelValue", t2, n2), o("click", a2));
  }
  function s(t2, o2) {
    return t2[o2] === void 0 ? e[o2] : t2[o2];
  }
  function u() {
    const o2 = i.value.map((e2) => {
      return h(QBtn, e2.props, e2.slot !== void 0 ? t[e2.slot] : void 0);
    });
    return e.name !== void 0 && e.disable !== true && n.value === true && l(o2, "push"), hMergeSlot$1(t.default, o2);
  }
  return () => h(QBtnGroup, { class: "q-btn-toggle", outline: e.outline, flat: e.flat, rounded: e.rounded, push: e.push, stretch: e.stretch, unelevated: e.unelevated, glossy: e.glossy, spread: e.spread }, u);
} }), QCard = defineComponent({ name: "QCard", props: __spreadProps(__spreadValues({}, useDarkProps$1), { tag: { type: String, default: "div" }, square: Boolean, flat: Boolean, bordered: Boolean }), setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark$1(e, o.proxy.$q), a = computed(() => "q-card" + (n.value === true ? " q-card--dark q-dark" : "") + (e.bordered === true ? " q-card--bordered" : "") + (e.square === true ? " q-card--square no-border-radius" : "") + (e.flat === true ? " q-card--flat no-shadow" : ""));
  return () => h(e.tag, { class: a.value }, hSlot$1(t.default));
} }), QCardSection = defineComponent({ name: "QCardSection", props: { tag: { type: String, default: "div" }, horizontal: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => `q-card__section q-card__section--${e.horizontal === true ? "horiz row no-wrap" : "vert"}`);
  return () => h(e.tag, { class: o.value }, hSlot$1(t.default));
} }), QCardActions = defineComponent({ name: "QCardActions", props: __spreadProps(__spreadValues({}, useAlignProps), { vertical: Boolean }), setup(e, { slots: t }) {
  const o = useAlign(e), n = computed(() => `q-card__actions ${o.value} q-card__actions--${e.vertical === true ? "vert column" : "horiz row"}`);
  return () => h("div", { class: n.value }, hSlot$1(t.default));
} });
const modifiersAll = { left: true, right: true, up: true, down: true, horizontal: true, vertical: true }, directionList = Object.keys(modifiersAll);
function getModifierDirections(e) {
  const t = {};
  for (const o of directionList)
    e[o] === true && (t[o] = true);
  return Object.keys(t).length === 0 ? modifiersAll : (t.horizontal === true ? t.left = t.right = true : t.left === true && t.right === true && (t.horizontal = true), t.vertical === true ? t.up = t.down = true : t.up === true && t.down === true && (t.vertical = true), t.horizontal === true && t.vertical === true && (t.all = true), t);
}
function shouldStart(e, t) {
  return t.event === void 0 && e.target !== void 0 && e.target.draggable !== true && typeof t.handler === "function" && e.target.nodeName.toUpperCase() !== "INPUT" && (e.qClonedBy === void 0 || e.qClonedBy.indexOf(t.uid) === -1);
}
function parseArg(e) {
  const t = [0.06, 6, 50];
  return typeof e === "string" && e.length && e.split(":").forEach((e2, o) => {
    const n = parseFloat(e2);
    n && (t[o] = n);
  }), t;
}
modifiersAll.all = true;
var TouchSwipe = { name: "touch-swipe", beforeMount(e, { value: t, arg: o, modifiers: n }) {
  if (n.mouse !== true && client$1.has.touch !== true)
    return;
  const a = n.mouseCapture === true ? "Capture" : "", l = { handler: t, sensitivity: parseArg(o), direction: getModifierDirections(n), noop, mouseStart(e2) {
    shouldStart(e2, l) && leftClick(e2) && (addEvt(l, "temp", [[document, "mousemove", "move", `notPassive${a}`], [document, "mouseup", "end", "notPassiveCapture"]]), l.start(e2, true));
  }, touchStart(e2) {
    if (shouldStart(e2, l)) {
      const t2 = e2.target;
      addEvt(l, "temp", [[t2, "touchmove", "move", "notPassiveCapture"], [t2, "touchcancel", "end", "notPassiveCapture"], [t2, "touchend", "end", "notPassiveCapture"]]), l.start(e2);
    }
  }, start(t2, o2) {
    client$1.is.firefox === true && preventDraggable(e, true);
    const n2 = position(t2);
    l.event = { x: n2.left, y: n2.top, time: Date.now(), mouse: o2 === true, dir: false };
  }, move(e2) {
    if (l.event === void 0)
      return;
    if (l.event.dir !== false)
      return void stopAndPrevent$1(e2);
    const t2 = Date.now() - l.event.time;
    if (t2 === 0)
      return;
    const o2 = position(e2), n2 = o2.left - l.event.x, a2 = Math.abs(n2), i = o2.top - l.event.y, r = Math.abs(i);
    if (l.event.mouse !== true) {
      if (a2 < l.sensitivity[1] && r < l.sensitivity[1])
        return void l.end(e2);
    } else if (a2 < l.sensitivity[2] && r < l.sensitivity[2])
      return;
    const s = a2 / t2, u = r / t2;
    l.direction.vertical === true && a2 < r && a2 < 100 && u > l.sensitivity[0] && (l.event.dir = i < 0 ? "up" : "down"), l.direction.horizontal === true && a2 > r && r < 100 && s > l.sensitivity[0] && (l.event.dir = n2 < 0 ? "left" : "right"), l.direction.up === true && a2 < r && i < 0 && a2 < 100 && u > l.sensitivity[0] && (l.event.dir = "up"), l.direction.down === true && a2 < r && i > 0 && a2 < 100 && u > l.sensitivity[0] && (l.event.dir = "down"), l.direction.left === true && a2 > r && n2 < 0 && r < 100 && s > l.sensitivity[0] && (l.event.dir = "left"), l.direction.right === true && a2 > r && n2 > 0 && r < 100 && s > l.sensitivity[0] && (l.event.dir = "right"), l.event.dir !== false ? (stopAndPrevent$1(e2), l.event.mouse === true && (document.body.classList.add("no-pointer-events--children"), document.body.classList.add("non-selectable"), clearSelection(), l.styleCleanup = (e3) => {
      l.styleCleanup = void 0, document.body.classList.remove("non-selectable");
      const t3 = () => {
        document.body.classList.remove("no-pointer-events--children");
      };
      e3 === true ? setTimeout(t3, 50) : t3();
    }), l.handler({ evt: e2, touch: l.event.mouse !== true, mouse: l.event.mouse, direction: l.event.dir, duration: t2, distance: { x: a2, y: r } })) : l.end(e2);
  }, end(t2) {
    l.event !== void 0 && (cleanEvt(l, "temp"), client$1.is.firefox === true && preventDraggable(e, false), l.styleCleanup !== void 0 && l.styleCleanup(true), t2 !== void 0 && l.event.dir !== false && stopAndPrevent$1(t2), l.event = void 0);
  } };
  e.__qtouchswipe = l, n.mouse === true && addEvt(l, "main", [[e, "mousedown", "mouseStart", `passive${a}`]]), client$1.has.touch === true && addEvt(l, "main", [[e, "touchstart", "touchStart", `passive${n.capture === true ? "Capture" : ""}`], [e, "touchmove", "noop", "notPassiveCapture"]]);
}, updated(e, t) {
  const o = e.__qtouchswipe;
  o !== void 0 && (t.oldValue !== t.value && (typeof t.value !== "function" && o.end(), o.handler = t.value), o.direction = getModifierDirections(t.modifiers));
}, beforeUnmount(e) {
  const t = e.__qtouchswipe;
  t !== void 0 && (cleanEvt(t, "main"), cleanEvt(t, "temp"), client$1.is.firefox === true && preventDraggable(e, false), t.styleCleanup !== void 0 && t.styleCleanup(), delete e.__qtouchswipe);
} };
function useCache() {
  const e = new Map();
  return { getCache: function(t, o) {
    return e[t] === void 0 ? e[t] = o : e[t];
  }, getCacheWithFn: function(t, o) {
    return e[t] === void 0 ? e[t] = o() : e[t];
  } };
}
const usePanelChildProps = { name: { required: true }, disable: Boolean }, PanelWrapper$1 = { setup(e, { slots: t }) {
  return () => h("div", { class: "q-panel scroll", role: "tabpanel" }, hSlot$1(t.default));
} }, usePanelProps = { modelValue: { required: true }, animated: Boolean, infinite: Boolean, swipeable: Boolean, vertical: Boolean, transitionPrev: String, transitionNext: String, transitionDuration: { type: [String, Number], default: 300 }, keepAlive: Boolean, keepAliveInclude: [String, Array, RegExp], keepAliveExclude: [String, Array, RegExp], keepAliveMax: Number }, usePanelEmits = ["update:modelValue", "before-transition", "transition"];
function usePanel() {
  const { props: e, emit: t, proxy: o } = getCurrentInstance(), { getCacheWithFn: n } = useCache();
  let a, l;
  const i = ref(null), r = ref(null);
  function s(t2) {
    const n2 = e.vertical === true ? "up" : "left";
    k((o.$q.lang.rtl === true ? -1 : 1) * (t2.direction === n2 ? 1 : -1));
  }
  const u = computed(() => {
    return [[TouchSwipe, s, void 0, { horizontal: e.vertical !== true, vertical: e.vertical, mouse: true }]];
  }), c = computed(() => e.transitionPrev || `slide-${e.vertical === true ? "down" : "right"}`), d = computed(() => e.transitionNext || `slide-${e.vertical === true ? "up" : "left"}`), p2 = computed(() => `--q-transition-duration: ${e.transitionDuration}ms`), v = computed(() => typeof e.modelValue === "string" || typeof e.modelValue === "number" ? e.modelValue : String(e.modelValue)), m = computed(() => ({ include: e.keepAliveInclude, exclude: e.keepAliveExclude, max: e.keepAliveMax })), f = computed(() => e.keepAliveInclude !== void 0 || e.keepAliveExclude !== void 0);
  function g() {
    k(1);
  }
  function b() {
    k(-1);
  }
  function y(e2) {
    t("update:modelValue", e2);
  }
  function S(e2) {
    return e2 !== void 0 && e2 !== null && e2 !== "";
  }
  function w(e2) {
    return a.findIndex((t2) => {
      return t2.props.name === e2 && t2.props.disable !== "" && t2.props.disable !== true;
    });
  }
  function x() {
    return a.filter((e2) => {
      return e2.props.disable !== "" && e2.props.disable !== true;
    });
  }
  function C(t2) {
    const o2 = t2 !== 0 && e.animated === true && i.value !== -1 ? "q-transition--" + (t2 === -1 ? c.value : d.value) : null;
    r.value !== o2 && (r.value = o2);
  }
  function k(o2, n2 = i.value) {
    let r2 = n2 + o2;
    while (r2 > -1 && r2 < a.length) {
      const e2 = a[r2];
      if (e2 !== void 0 && e2.props.disable !== "" && e2.props.disable !== true)
        return C(o2), l = true, t("update:modelValue", e2.props.name), void setTimeout(() => {
          l = false;
        });
      r2 += o2;
    }
    e.infinite === true && a.length > 0 && n2 !== -1 && n2 !== a.length && k(o2, o2 === -1 ? a.length : -1);
  }
  function _() {
    const t2 = w(e.modelValue);
    return i.value !== t2 && (i.value = t2), true;
  }
  function q() {
    const t2 = S(e.modelValue) === true && _() && a[i.value];
    return e.keepAlive === true ? [h(KeepAlive, m.value, [h(f.value === true ? n(v.value, () => __spreadProps(__spreadValues({}, PanelWrapper$1), { name: v.value })) : PanelWrapper$1, { key: v.value, style: p2.value }, () => t2)])] : [h("div", { class: "q-panel scroll", style: p2.value, key: v.value, role: "tabpanel" }, [t2])];
  }
  function T() {
    if (a.length !== 0)
      return e.animated === true ? [h(Transition, { name: r.value }, q)] : q();
  }
  function P(e2) {
    return a = getNormalizedVNodes(hSlot$1(e2.default, [])).filter((e3) => e3.props !== null && e3.props.slot === void 0 && S(e3.props.name) === true), a.length;
  }
  function $() {
    return a;
  }
  return watch(() => e.modelValue, (e2, o2) => {
    const n2 = S(e2) === true ? w(e2) : -1;
    l !== true && C(n2 === -1 ? 0 : n2 < w(o2) ? -1 : 1), i.value !== n2 && (i.value = n2, t("before-transition", e2, o2), nextTick(() => {
      t("transition", e2, o2);
    }));
  }), Object.assign(o, { next: g, previous: b, goTo: y }), { panelIndex: i, panelDirectives: u, updatePanelsList: P, updatePanelIndex: _, getPanelContent: T, getEnabledPanels: x, getPanels: $, isValidPanelName: S, keepAliveProps: m, needsUniqueKeepAliveWrapper: f, goToPanelByOffset: k, goToPanel: y, nextPanel: g, previousPanel: b };
}
const useFullscreenProps = { fullscreen: Boolean, noRouteFullscreenExit: Boolean }, useFullscreenEmits = ["update:fullscreen", "fullscreen"];
function useFullscreen() {
  const e = getCurrentInstance(), { props: t, emit: o, proxy: n } = e;
  let a, l, i;
  const r = ref(false);
  function s() {
    r.value === true ? c() : u();
  }
  function u() {
    r.value !== true && (r.value = true, i = n.$el.parentNode, i.replaceChild(l, n.$el), document.body.appendChild(n.$el), document.body.classList.add("q-body--fullscreen-mixin"), a = { handler: c }, History.add(a));
  }
  function c() {
    r.value === true && (a !== void 0 && (History.remove(a), a = void 0), i.replaceChild(n.$el, l), document.body.classList.remove("q-body--fullscreen-mixin"), r.value = false, n.$el.scrollIntoView !== void 0 && setTimeout(() => {
      n.$el.scrollIntoView();
    }));
  }
  return vmHasRouter(e) === true && watch(() => n.$route, () => {
    t.noRouteFullscreenExit !== true && c();
  }), watch(() => t.fullscreen, (e2) => {
    r.value !== e2 && s();
  }), watch(r, (e2) => {
    o("update:fullscreen", e2), o("fullscreen", e2);
  }), onBeforeMount(() => {
    l = document.createElement("span");
  }), onMounted(() => {
    t.fullscreen === true && u();
  }), onBeforeUnmount(c), Object.assign(n, { toggleFullscreen: s, setFullscreen: u, exitFullscreen: c }), { inFullscreen: r, toggleFullscreen: s };
}
const hasMap = typeof Map === "function", hasSet = typeof Set === "function", hasArrayBuffer = typeof ArrayBuffer === "function";
function isDeepEqual(e, t) {
  if (e === t)
    return true;
  if (e !== null && t !== null && typeof e === "object" && typeof t === "object") {
    if (e.constructor !== t.constructor)
      return false;
    let o, n;
    if (e.constructor === Array) {
      if (o = e.length, o !== t.length)
        return false;
      for (n = o; n-- !== 0; )
        if (isDeepEqual(e[n], t[n]) !== true)
          return false;
      return true;
    }
    if (hasMap === true && e.constructor === Map) {
      if (e.size !== t.size)
        return false;
      n = e.entries().next();
      while (n.done !== true) {
        if (t.has(n.value[0]) !== true)
          return false;
        n = n.next();
      }
      n = e.entries().next();
      while (n.done !== true) {
        if (isDeepEqual(n.value[1], t.get(n.value[0])) !== true)
          return false;
        n = n.next();
      }
      return true;
    }
    if (hasSet === true && e.constructor === Set) {
      if (e.size !== t.size)
        return false;
      n = e.entries().next();
      while (n.done !== true) {
        if (t.has(n.value[0]) !== true)
          return false;
        n = n.next();
      }
      return true;
    }
    if (hasArrayBuffer === true && e.buffer != null && e.buffer.constructor === ArrayBuffer) {
      if (o = e.length, o !== t.length)
        return false;
      for (n = o; n-- !== 0; )
        if (e[n] !== t[n])
          return false;
      return true;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    const a = Object.keys(e);
    if (o = a.length, o !== Object.keys(t).length)
      return false;
    for (n = o; n-- !== 0; ) {
      const o2 = a[n];
      if (isDeepEqual(e[o2], t[o2]) !== true)
        return false;
    }
    return true;
  }
  return e !== e && t !== t;
}
function isDate(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function isNumber(e) {
  return typeof e === "number" && isFinite(e);
}
const navigationPositionOptions = ["top", "right", "bottom", "left"], controlTypeOptions = ["regular", "flat", "outline", "push", "unelevated"];
var QCarousel = defineComponent({ name: "QCarousel", props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useDarkProps$1), usePanelProps), useFullscreenProps), { transitionPrev: { type: String, default: "fade" }, transitionNext: { type: String, default: "fade" }, height: String, padding: Boolean, controlColor: String, controlTextColor: String, controlType: { type: String, validator: (e) => controlTypeOptions.includes(e), default: "flat" }, autoplay: [Number, Boolean], arrows: Boolean, prevIcon: String, nextIcon: String, navigation: Boolean, navigationPosition: { type: String, validator: (e) => navigationPositionOptions.includes(e) }, navigationIcon: String, navigationActiveIcon: String, thumbnails: Boolean }), emits: [...useFullscreenEmits, ...usePanelEmits], setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = useDark$1(e, o);
  let a, l;
  const { updatePanelsList: i, getPanelContent: r, panelDirectives: s, goToPanel: u, previousPanel: c, nextPanel: d, getEnabledPanels: p2, panelIndex: v } = usePanel(), { inFullscreen: m } = useFullscreen(), f = computed(() => m.value !== true && e.height !== void 0 ? { height: e.height } : {}), g = computed(() => e.vertical === true ? "vertical" : "horizontal"), b = computed(() => `q-carousel q-panel-parent q-carousel--with${e.padding === true ? "" : "out"}-padding` + (m.value === true ? " fullscreen" : "") + (n.value === true ? " q-carousel--dark q-dark" : "") + (e.arrows === true ? ` q-carousel--arrows-${g.value}` : "") + (e.navigation === true ? ` q-carousel--navigation-${x.value}` : "")), y = computed(() => {
    const t2 = [e.prevIcon || o.iconSet.carousel[e.vertical === true ? "up" : "left"], e.nextIcon || o.iconSet.carousel[e.vertical === true ? "down" : "right"]];
    return e.vertical === false && o.lang.rtl === true ? t2.reverse() : t2;
  }), S = computed(() => e.navigationIcon || o.iconSet.carousel.navigationIcon), w = computed(() => e.navigationActiveIcon || S.value), x = computed(() => e.navigationPosition || (e.vertical === true ? "right" : "bottom")), C = computed(() => ({ color: e.controlColor, textColor: e.controlTextColor, round: true, [e.controlType]: true, dense: true }));
  function k() {
    const t2 = isNumber(e.autoplay) === true ? e.autoplay : 5e3;
    a = setTimeout(t2 >= 0 ? d : c, Math.abs(t2));
  }
  function _(t2, o2) {
    return h("div", { class: `q-carousel__control q-carousel__navigation no-wrap absolute flex q-carousel__navigation--${t2} q-carousel__navigation--${x.value}` + (e.controlColor !== void 0 ? ` text-${e.controlColor}` : "") }, [h("div", { class: "q-carousel__navigation-inner flex flex-center no-wrap" }, p2().map(o2))]);
  }
  function q() {
    const o2 = [];
    if (e.navigation === true) {
      const e2 = t["navigation-icon"] !== void 0 ? t["navigation-icon"] : (e3) => h(QBtn, __spreadProps(__spreadValues({ key: "nav" + e3.name, class: `q-carousel__navigation-icon q-carousel__navigation-icon--${e3.active === true ? "" : "in"}active` }, e3.btnProps), { onClick: e3.onClick })), n2 = l - 1;
      o2.push(_("buttons", (t2, o3) => {
        const a2 = t2.props.name, l2 = v.value === o3;
        return e2({ index: o3, maxIndex: n2, name: a2, active: l2, btnProps: __spreadValues({ icon: l2 === true ? w.value : S.value, size: "sm" }, C.value), onClick: () => {
          u(a2);
        } });
      }));
    } else if (e.thumbnails === true) {
      const t2 = e.controlColor !== void 0 ? ` text-${e.controlColor}` : "";
      o2.push(_("thumbnails", (o3) => {
        const n2 = o3.props;
        return h("img", { key: "tmb#" + n2.name, class: `q-carousel__thumbnail q-carousel__thumbnail--${n2.name === e.modelValue ? "" : "in"}active` + t2, src: n2.imgSrc || n2["img-src"], onClick: () => {
          u(n2.name);
        } });
      }));
    }
    return e.arrows === true && v.value >= 0 && ((e.infinite === true || v.value > 0) && o2.push(h("div", { key: "prev", class: `q-carousel__control q-carousel__arrow q-carousel__prev-arrow q-carousel__prev-arrow--${g.value} absolute flex flex-center` }, [h(QBtn, __spreadProps(__spreadValues({ icon: y.value[0] }, C.value), { onClick: c }))])), (e.infinite === true || v.value < l - 1) && o2.push(h("div", { key: "next", class: `q-carousel__control q-carousel__arrow q-carousel__next-arrow q-carousel__next-arrow--${g.value} absolute flex flex-center` }, [h(QBtn, __spreadProps(__spreadValues({ icon: y.value[1] }, C.value), { onClick: d }))]))), hMergeSlot$1(t.control, o2);
  }
  return watch(() => e.modelValue, () => {
    e.autoplay && (clearInterval(a), k());
  }), watch(() => e.autoplay, (e2) => {
    e2 ? k() : clearInterval(a);
  }), onMounted(() => {
    e.autoplay && k();
  }), onBeforeUnmount(() => {
    clearInterval(a);
  }), () => {
    return l = i(t), h("div", { class: b.value, style: f.value }, [hDir("div", { class: "q-carousel__slides-container" }, r(), "sl-cont", e.swipeable, () => s.value)].concat(q()));
  };
} }), QCarouselSlide = defineComponent({ name: "QCarouselSlide", props: __spreadProps(__spreadValues({}, usePanelChildProps), { imgSrc: String }), setup(e, { slots: t }) {
  const o = computed(() => e.imgSrc ? { backgroundImage: `url("${e.imgSrc}")` } : {});
  return () => h("div", { class: "q-carousel__slide", style: o.value }, hSlot$1(t.default));
} }), QCarouselControl = defineComponent({ name: "QCarouselControl", props: { position: { type: String, default: "bottom-right", validator: (e) => ["top-right", "top-left", "bottom-right", "bottom-left", "top", "right", "bottom", "left"].includes(e) }, offset: { type: Array, default: () => [18, 18], validator: (e) => e.length === 2 } }, setup(e, { slots: t }) {
  const o = computed(() => `q-carousel__control absolute absolute-${e.position}`), n = computed(() => ({ margin: `${e.offset[1]}px ${e.offset[0]}px` }));
  return () => h("div", { class: o.value, style: n.value }, hSlot$1(t.default));
} }), QChatMessage = defineComponent({ name: "QChatMessage", props: { sent: Boolean, label: String, bgColor: String, textColor: String, name: String, avatar: String, text: Array, stamp: String, size: String, labelHtml: Boolean, nameHtml: Boolean, textHtml: Boolean, stampHtml: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => e.sent === true ? "sent" : "received"), n = computed(() => `q-message-text-content q-message-text-content--${o.value}` + (e.textColor !== void 0 ? ` text-${e.textColor}` : "")), a = computed(() => `q-message-text q-message-text--${o.value}` + (e.bgColor !== void 0 ? ` text-${e.bgColor}` : "")), l = computed(() => "q-message-container row items-end no-wrap" + (e.sent === true ? " reverse" : "")), i = computed(() => e.size !== void 0 ? `col-${e.size}` : ""), r = computed(() => ({ msg: e.textHtml === true ? "innerHTML" : "textContent", stamp: e.stampHtml === true ? "innerHTML" : "textContent", name: e.nameHtml === true ? "innerHTML" : "textContent", label: e.labelHtml === true ? "innerHTML" : "textContent" }));
  function s(o2) {
    return t.stamp !== void 0 ? [o2, h("div", { class: "q-message-stamp" }, t.stamp())] : e.stamp ? [o2, h("div", { class: "q-message-stamp", [r.value.stamp]: e.stamp })] : [o2];
  }
  function u(e2, t2) {
    const o2 = t2 === true ? e2.length > 1 ? (e3) => e3 : (e3) => h("div", [e3]) : (e3) => h("div", { [r.value.msg]: e3 });
    return e2.map((e3, t3) => h("div", { key: t3, class: a.value }, [h("div", { class: n.value }, s(o2(e3)))]));
  }
  return () => {
    const n2 = [];
    t.avatar !== void 0 ? n2.push(t.avatar()) : e.avatar !== void 0 && n2.push(h("img", { class: `q-message-avatar q-message-avatar--${o.value}`, src: e.avatar, "aria-hidden": "true" }));
    const a2 = [];
    t.name !== void 0 ? a2.push(h("div", { class: `q-message-name q-message-name--${o.value}` }, t.name())) : e.name !== void 0 && a2.push(h("div", { class: `q-message-name q-message-name--${o.value}`, [r.value.name]: e.name })), t.default !== void 0 ? a2.push(u(getNormalizedVNodes(t.default()), true)) : e.text !== void 0 && a2.push(u(e.text)), n2.push(h("div", { class: i.value }, a2));
    const s2 = [];
    return t.label !== void 0 ? s2.push(h("div", { class: "q-message-label" }, t.label())) : e.label !== void 0 && s2.push(h("div", { class: "q-message-label", [r.value.label]: e.label })), s2.push(h("div", { class: l.value }, n2)), h("div", { class: `q-message q-message-${o.value}` }, s2);
  };
} });
function useRefocusTarget(e, t) {
  const o = ref(null), n = computed(() => {
    return e.disable !== true ? null : h("span", { ref: o, class: "no-outline", tabindex: -1 });
  });
  function a(e2) {
    e2 !== void 0 && e2.type.indexOf("key") === 0 ? document.activeElement !== t.value && t.value.contains(document.activeElement) === true && t.value.focus() : e2 !== void 0 && t.value.contains(e2.target) !== true || o.value === null || o.value.focus();
  }
  return { refocusTargetEl: n, refocusTarget: a };
}
var optionSizes = { xs: 30, sm: 35, md: 40, lg: 50, xl: 60 };
const useCheckboxProps = __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useDarkProps$1), useSizeProps$1), useFormProps$1), { modelValue: { required: true, default: null }, val: {}, trueValue: { default: true }, falseValue: { default: false }, indeterminateValue: { default: null }, toggleOrder: { type: String, validator: (e) => e === "tf" || e === "ft" }, toggleIndeterminate: Boolean, label: String, leftLabel: Boolean, color: String, keepColor: Boolean, dense: Boolean, disable: Boolean, tabindex: [String, Number] }), useCheckboxEmits = ["update:modelValue"];
function useCheckbox(e, t) {
  const { props: o, slots: n, emit: a, proxy: l } = getCurrentInstance(), { $q: i } = l, r = useDark$1(o, i), s = ref(null), { refocusTargetEl: u, refocusTarget: c } = useRefocusTarget(o, s), d = useSize$1(o, optionSizes), p2 = computed(() => o.val !== void 0 && Array.isArray(o.modelValue)), v = computed(() => p2.value === true ? o.modelValue.indexOf(o.val) : -1), m = computed(() => p2.value === true ? v.value > -1 : o.modelValue === o.trueValue), f = computed(() => p2.value === true ? v.value === -1 : o.modelValue === o.falseValue), g = computed(() => m.value === false && f.value === false), b = computed(() => o.disable === true ? -1 : o.tabindex || 0), y = computed(() => `q-${e} cursor-pointer no-outline row inline no-wrap items-center` + (o.disable === true ? " disabled" : "") + (r.value === true ? ` q-${e}--dark` : "") + (o.dense === true ? ` q-${e}--dense` : "") + (o.leftLabel === true ? " reverse" : "")), S = computed(() => {
    const t2 = m.value === true ? "truthy" : f.value === true ? "falsy" : "indet", n2 = o.color === void 0 || o.keepColor !== true && (e === "toggle" ? m.value !== true : f.value === true) ? "" : ` text-${o.color}`;
    return `q-${e}__inner relative-position non-selectable q-${e}__inner--${t2}${n2}`;
  }), w = computed(() => {
    const e2 = { type: "checkbox" };
    return o.name !== void 0 && Object.assign(e2, { checked: m.value, name: o.name, value: p2.value === true ? o.val : o.trueValue }), e2;
  }), x = useFormInject(w), C = computed(() => {
    const e2 = { tabindex: b.value, role: "checkbox", "aria-label": o.label, "aria-checked": g.value === true ? "mixed" : m.value === true ? "true" : "false" };
    return o.disable === true && (e2["aria-disabled"] = "true"), e2;
  });
  function k(e2) {
    e2 !== void 0 && (stopAndPrevent$1(e2), c(e2)), o.disable !== true && a("update:modelValue", _(), e2);
  }
  function _() {
    if (p2.value === true) {
      if (m.value === true) {
        const e2 = o.modelValue.slice();
        return e2.splice(v.value, 1), e2;
      }
      return o.modelValue.concat([o.val]);
    }
    if (m.value === true) {
      if (o.toggleOrder !== "ft" || o.toggleIndeterminate === false)
        return o.falseValue;
    } else {
      if (f.value !== true)
        return o.toggleOrder !== "ft" ? o.trueValue : o.falseValue;
      if (o.toggleOrder === "ft" || o.toggleIndeterminate === false)
        return o.trueValue;
    }
    return o.indeterminateValue;
  }
  function q(e2) {
    e2.keyCode !== 13 && e2.keyCode !== 32 || stopAndPrevent$1(e2);
  }
  function T(e2) {
    e2.keyCode !== 13 && e2.keyCode !== 32 || k(e2);
  }
  const P = t(m, g);
  return Object.assign(l, { toggle: k }), () => {
    const t2 = P();
    o.disable !== true && x(t2, "unshift", ` q-${e}__native absolute q-ma-none q-pa-none`);
    const a2 = [h("div", { class: S.value, style: d.value }, t2)];
    u.value !== null && a2.push(u.value);
    const l2 = o.label !== void 0 ? hMergeSlot$1(n.default, [o.label]) : hSlot$1(n.default);
    return l2 !== void 0 && a2.push(h("div", { class: `q-${e}__label q-anchor--skip` }, l2)), h("div", __spreadProps(__spreadValues({ ref: s, class: y.value }, C.value), { onClick: k, onKeydown: q, onKeyup: T }), a2);
  };
}
const bgNode = h("div", { class: "q-checkbox__bg absolute" }, [h("svg", { class: "q-checkbox__svg fit absolute-full", viewBox: "0 0 24 24", "aria-hidden": "true" }, [h("path", { class: "q-checkbox__truthy", fill: "none", d: "M1.73,12.91 8.1,19.28 22.79,4.59" }), h("path", { class: "q-checkbox__indet", d: "M4,14H20V10H4" })])]);
var QCheckbox = defineComponent({ name: "QCheckbox", props: useCheckboxProps, emits: useCheckboxEmits, setup() {
  return useCheckbox("checkbox", () => () => [bgNode]);
} });
const defaultSizes$1 = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 };
var QChip = defineComponent({ name: "QChip", props: __spreadProps(__spreadValues(__spreadValues({}, useDarkProps$1), useSizeProps$1), { dense: Boolean, icon: String, iconRight: String, iconRemove: String, iconSelected: String, label: [String, Number], color: String, textColor: String, modelValue: { type: Boolean, default: true }, selected: { type: Boolean, default: null }, square: Boolean, outline: Boolean, clickable: Boolean, removable: Boolean, tabindex: [String, Number], disable: Boolean, ripple: { type: [Boolean, Object], default: true } }), emits: ["update:modelValue", "update:selected", "remove", "click"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = useDark$1(e, n), l = useSize$1(e, defaultSizes$1), i = computed(() => e.selected === true || e.icon !== void 0), r = computed(() => e.selected === true ? e.iconSelected || n.iconSet.chip.selected : e.icon), s = computed(() => e.iconRemove || n.iconSet.chip.remove), u = computed(() => e.disable === false && (e.clickable === true || e.selected !== null)), c = computed(() => {
    const t2 = e.outline === true && e.color || e.textColor;
    return "q-chip row inline no-wrap items-center" + (e.outline === false && e.color !== void 0 ? ` bg-${e.color}` : "") + (t2 ? ` text-${t2} q-chip--colored` : "") + (e.disable === true ? " disabled" : "") + (e.dense === true ? " q-chip--dense" : "") + (e.outline === true ? " q-chip--outline" : "") + (e.selected === true ? " q-chip--selected" : "") + (u.value === true ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (e.square === true ? " q-chip--square" : "") + (a.value === true ? " q-chip--dark q-dark" : "");
  }), d = computed(() => e.disable === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: e.tabindex || 0 });
  function p2(e2) {
    e2.keyCode === 13 && v(e2);
  }
  function v(t2) {
    e.disable || (o("update:selected", !e.selected), o("click", t2));
  }
  function m(t2) {
    t2.keyCode !== void 0 && t2.keyCode !== 13 || (stopAndPrevent$1(t2), e.disable === false && (o("update:modelValue", false), o("remove")));
  }
  function f() {
    const o2 = [];
    u.value === true && o2.push(h("div", { class: "q-focus-helper" })), i.value === true && o2.push(h(QIcon$1, { class: "q-chip__icon q-chip__icon--left", name: r.value }));
    const n2 = e.label !== void 0 ? [h("div", { class: "ellipsis" }, [e.label])] : void 0;
    return o2.push(h("div", { class: "q-chip__content col row no-wrap items-center q-anchor--skip" }, hMergeSlotSafely(t.default, n2))), e.iconRight && o2.push(h(QIcon$1, { class: "q-chip__icon q-chip__icon--right", name: e.iconRight })), e.removable === true && o2.push(h(QIcon$1, __spreadProps(__spreadValues({ class: "q-chip__icon q-chip__icon--remove cursor-pointer", name: s.value }, d.value), { onClick: m, onKeyup: m }))), o2;
  }
  return () => {
    if (e.modelValue === false)
      return;
    const t2 = { class: c.value, style: l.value };
    return u.value === true && Object.assign(t2, d.value, { onClick: v, onKeyup: p2 }), hDir("div", t2, f(), "ripple", e.ripple !== false && e.disable !== true, () => [[Ripple, e.ripple]]);
  };
} });
const useCircularCommonProps = __spreadProps(__spreadValues({}, useSizeProps$1), { min: { type: Number, default: 0 }, max: { type: Number, default: 100 }, color: String, centerColor: String, trackColor: String, fontSize: String, thickness: { type: Number, default: 0.2, validator: (e) => e >= 0 && e <= 1 }, angle: { type: Number, default: 0 }, showValue: Boolean, reverse: Boolean, instantFeedback: Boolean }), radius = 50, diameter = 2 * radius, circumference = diameter * Math.PI, strokeDashArray = Math.round(1e3 * circumference) / 1e3;
var QCircularProgress = defineComponent({ name: "QCircularProgress", props: __spreadProps(__spreadValues({}, useCircularCommonProps), { value: { type: Number, default: 0 }, indeterminate: Boolean }), setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = useSize$1(e), a = computed(() => {
    const t2 = (o.lang.rtl === true ? -1 : 1) * e.angle;
    return { transform: e.reverse !== (o.lang.rtl === true) ? `scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90 - t2}deg)` : `rotate3d(0, 0, 1, ${t2 - 90}deg)` };
  }), l = computed(() => e.instantFeedback !== true && e.indeterminate !== true ? { transition: "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease" } : ""), i = computed(() => diameter / (1 - e.thickness / 2)), r = computed(() => `${i.value / 2} ${i.value / 2} ${i.value} ${i.value}`), s = computed(() => between(e.value, e.min, e.max)), u = computed(() => circumference * (1 - (s.value - e.min) / (e.max - e.min))), c = computed(() => e.thickness / 2 * i.value);
  function d({ thickness: e2, offset: t2, color: o2, cls: n2 }) {
    return h("circle", { class: "q-circular-progress__" + n2 + (o2 !== void 0 ? ` text-${o2}` : ""), style: l.value, fill: "transparent", stroke: "currentColor", "stroke-width": e2, "stroke-dasharray": strokeDashArray, "stroke-dashoffset": t2, cx: i.value, cy: i.value, r: radius });
  }
  return () => {
    const o2 = [];
    e.centerColor !== void 0 && e.centerColor !== "transparent" && o2.push(h("circle", { class: `q-circular-progress__center text-${e.centerColor}`, fill: "currentColor", r: radius - c.value / 2, cx: i.value, cy: i.value })), e.trackColor !== void 0 && e.trackColor !== "transparent" && o2.push(d({ cls: "track", thickness: c.value, offset: 0, color: e.trackColor })), o2.push(d({ cls: "circle", thickness: c.value, offset: u.value, color: e.color }));
    const l2 = [h("svg", { class: "q-circular-progress__svg", style: a.value, viewBox: r.value, "aria-hidden": "true" }, o2)];
    return e.showValue === true && l2.push(h("div", { class: "q-circular-progress__text absolute-full row flex-center content-center", style: { fontSize: e.fontSize } }, t.default !== void 0 ? t.default() : [h("div", s.value)])), h("div", { class: `q-circular-progress q-circular-progress--${e.indeterminate === true ? "in" : ""}determinate`, style: n.value, role: "progressbar", "aria-valuemin": e.min, "aria-valuemax": e.max, "aria-valuenow": e.indeterminate === true ? void 0 : s.value }, hMergeSlotSafely(t.internal, l2));
  };
} });
function getChanges(e, t, o) {
  const n = position(e);
  let a, l = n.left - t.event.x, i = n.top - t.event.y, r = Math.abs(l), s = Math.abs(i);
  const u = t.direction;
  u.horizontal === true && u.vertical !== true ? a = l < 0 ? "left" : "right" : u.horizontal !== true && u.vertical === true ? a = i < 0 ? "up" : "down" : u.up === true && i < 0 ? (a = "up", r > s && (u.left === true && l < 0 ? a = "left" : u.right === true && l > 0 && (a = "right"))) : u.down === true && i > 0 ? (a = "down", r > s && (u.left === true && l < 0 ? a = "left" : u.right === true && l > 0 && (a = "right"))) : u.left === true && l < 0 ? (a = "left", r < s && (u.up === true && i < 0 ? a = "up" : u.down === true && i > 0 && (a = "down"))) : u.right === true && l > 0 && (a = "right", r < s && (u.up === true && i < 0 ? a = "up" : u.down === true && i > 0 && (a = "down")));
  let c = false;
  if (a === void 0 && o === false) {
    if (t.event.isFirst === true || t.event.lastDir === void 0)
      return {};
    a = t.event.lastDir, c = true, a === "left" || a === "right" ? (n.left -= l, r = 0, l = 0) : (n.top -= i, s = 0, i = 0);
  }
  return { synthetic: c, payload: { evt: e, touch: t.event.mouse !== true, mouse: t.event.mouse === true, position: n, direction: a, isFirst: t.event.isFirst, isFinal: o === true, duration: Date.now() - t.event.time, distance: { x: r, y: s }, offset: { x: l, y: i }, delta: { x: n.left - t.event.lastX, y: n.top - t.event.lastY } } };
}
let uid$4 = 0;
var TouchPan = { name: "touch-pan", beforeMount(e, { value: t, modifiers: o }) {
  if (o.mouse !== true && client$1.has.touch !== true)
    return;
  function n(e2, t2) {
    o.mouse === true && t2 === true ? stopAndPrevent$1(e2) : (o.stop === true && stop$1(e2), o.prevent === true && prevent$1(e2));
  }
  const a = { uid: "qvtp_" + uid$4++, handler: t, modifiers: o, direction: getModifierDirections(o), noop, mouseStart(e2) {
    shouldStart(e2, a) && leftClick(e2) && (addEvt(a, "temp", [[document, "mousemove", "move", "notPassiveCapture"], [document, "mouseup", "end", "passiveCapture"]]), a.start(e2, true));
  }, touchStart(e2) {
    if (shouldStart(e2, a)) {
      const t2 = e2.target;
      addEvt(a, "temp", [[t2, "touchmove", "move", "notPassiveCapture"], [t2, "touchcancel", "end", "passiveCapture"], [t2, "touchend", "end", "passiveCapture"]]), a.start(e2);
    }
  }, start(t2, n2) {
    if (client$1.is.firefox === true && preventDraggable(e, true), a.lastEvt = t2, n2 === true || o.stop === true) {
      if (a.direction.all !== true && (n2 !== true || a.modifiers.mouseAllDir !== true)) {
        const e2 = t2.type.indexOf("mouse") > -1 ? new MouseEvent(t2.type, t2) : new TouchEvent(t2.type, t2);
        t2.defaultPrevented === true && prevent$1(e2), t2.cancelBubble === true && stop$1(e2), Object.assign(e2, { qKeyEvent: t2.qKeyEvent, qClickOutside: t2.qClickOutside, qAnchorHandled: t2.qAnchorHandled, qClonedBy: t2.qClonedBy === void 0 ? [a.uid] : t2.qClonedBy.concat(a.uid) }), a.initialEvent = { target: t2.target, event: e2 };
      }
      stop$1(t2);
    }
    const { left: l, top: i } = position(t2);
    a.event = { x: l, y: i, time: Date.now(), mouse: n2 === true, detected: false, isFirst: true, isFinal: false, lastX: l, lastY: i };
  }, move(e2) {
    if (a.event === void 0)
      return;
    const t2 = position(e2), l = t2.left - a.event.x, i = t2.top - a.event.y;
    if (l === 0 && i === 0)
      return;
    a.lastEvt = e2;
    const r = a.event.mouse === true, s = () => {
      n(e2, r), o.preserveCursor !== true && (document.documentElement.style.cursor = "grabbing"), r === true && document.body.classList.add("no-pointer-events--children"), document.body.classList.add("non-selectable"), clearSelection(), a.styleCleanup = (e3) => {
        if (a.styleCleanup = void 0, o.preserveCursor !== true && (document.documentElement.style.cursor = ""), document.body.classList.remove("non-selectable"), r === true) {
          const t3 = () => {
            document.body.classList.remove("no-pointer-events--children");
          };
          e3 !== void 0 ? setTimeout(() => {
            t3(), e3();
          }, 50) : t3();
        } else
          e3 !== void 0 && e3();
      };
    };
    if (a.event.detected === true) {
      a.event.isFirst !== true && n(e2, a.event.mouse);
      const { payload: t3, synthetic: o2 } = getChanges(e2, a, false);
      return void (t3 !== void 0 && (a.handler(t3) === false ? a.end(e2) : (a.styleCleanup === void 0 && a.event.isFirst === true && s(), a.event.lastX = t3.position.left, a.event.lastY = t3.position.top, a.event.lastDir = o2 === true ? void 0 : t3.direction, a.event.isFirst = false)));
    }
    if (a.direction.all === true || r === true && a.modifiers.mouseAllDir === true)
      return s(), a.event.detected = true, void a.move(e2);
    const u = Math.abs(l), c = Math.abs(i);
    u !== c && (a.direction.horizontal === true && u > c || a.direction.vertical === true && u < c || a.direction.up === true && u < c && i < 0 || a.direction.down === true && u < c && i > 0 || a.direction.left === true && u > c && l < 0 || a.direction.right === true && u > c && l > 0 ? (a.event.detected = true, a.move(e2)) : a.end(e2, true));
  }, end(t2, o2) {
    if (a.event !== void 0) {
      if (cleanEvt(a, "temp"), client$1.is.firefox === true && preventDraggable(e, false), o2 === true)
        a.styleCleanup !== void 0 && a.styleCleanup(), a.event.detected !== true && a.initialEvent !== void 0 && a.initialEvent.target.dispatchEvent(a.initialEvent.event);
      else if (a.event.detected === true) {
        a.event.isFirst === true && a.handler(getChanges(t2 === void 0 ? a.lastEvt : t2, a).payload);
        const { payload: e2 } = getChanges(t2 === void 0 ? a.lastEvt : t2, a, true), o3 = () => {
          a.handler(e2);
        };
        a.styleCleanup !== void 0 ? a.styleCleanup(o3) : o3();
      }
      a.event = void 0, a.initialEvent = void 0, a.lastEvt = void 0;
    }
  } };
  e.__qtouchpan = a, o.mouse === true && addEvt(a, "main", [[e, "mousedown", "mouseStart", `passive${o.mouseCapture === true ? "Capture" : ""}`]]), client$1.has.touch === true && addEvt(a, "main", [[e, "touchstart", "touchStart", `passive${o.capture === true ? "Capture" : ""}`], [e, "touchmove", "noop", "notPassiveCapture"]]);
}, updated(e, t) {
  const o = e.__qtouchpan;
  o !== void 0 && (t.oldValue !== t.value && (typeof value !== "function" && o.end(), o.handler = t.value), o.direction = getModifierDirections(t.modifiers));
}, beforeUnmount(e) {
  const t = e.__qtouchpan;
  t !== void 0 && (t.event !== void 0 && t.end(), cleanEvt(t, "main"), cleanEvt(t, "temp"), client$1.is.firefox === true && preventDraggable(e, false), t.styleCleanup !== void 0 && t.styleCleanup(), delete e.__qtouchpan);
} };
const keyCodes$2 = [34, 37, 40, 33, 39, 38];
function getRatio(e, t, o, n) {
  const a = position(e), l = between(n === true ? (a.top - t.top) / t.height : (a.left - t.left) / t.width, 0, 1);
  return o === true ? 1 - l : l;
}
function getModel(e, t, o, n, a) {
  let l = t + e * (o - t);
  if (n > 0) {
    const e2 = (l - t) % n;
    l += (Math.abs(e2) >= n / 2 ? (e2 < 0 ? -1 : 1) * n : 0) - e2;
  }
  return a > 0 && (l = parseFloat(l.toFixed(a))), between(l, t, o);
}
const useSliderProps = __spreadProps(__spreadValues({}, useDarkProps$1), { min: { type: Number, default: 0 }, max: { type: Number, default: 100 }, step: { type: Number, default: 1, validator: (e) => e >= 0 }, color: String, labelColor: String, labelTextColor: String, dense: Boolean, label: Boolean, labelAlways: Boolean, markers: [Boolean, Number], snap: Boolean, vertical: Boolean, reverse: Boolean, disable: Boolean, readonly: Boolean, tabindex: [String, Number], thumbPath: { type: String, default: "M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0" } }), useSliderEmits = ["pan", "update:modelValue", "change"];
function useSlider({ updateValue: e, updatePosition: t, getDragging: o }) {
  const { props: n, emit: a, proxy: { $q: l } } = getCurrentInstance(), i = useDark$1(n, l), r = ref(false), s = ref(false), u = ref(false), c = ref(false), d = computed(() => n.vertical === true ? "--v" : "--h"), p2 = computed(() => n.vertical === true ? n.reverse === true : n.reverse !== (l.lang.rtl === true)), v = computed(() => n.disable !== true && n.readonly !== true && n.min < n.max), m = computed(() => `q-slider q-slider${d.value} q-slider--${r.value === true ? "" : "in"}active` + (p2.value === true ? " q-slider--reversed" : "") + (n.color !== void 0 ? ` text-${n.color}` : "") + (n.disable === true ? " disabled" : " q-slider--enabled" + (v.value === true ? " q-slider--editable" : "")) + (u.value === "both" ? " q-slider--focus" : "") + (n.label || n.labelAlways === true ? " q-slider--label" : "") + (n.labelAlways === true ? " q-slider--label-always" : "") + (i.value === true ? " q-slider--dark" : "") + (n.dense === true ? " q-slider--dense q-slider--dense" + d.value : "")), f = computed(() => (String(n.step).trim("0").split(".")[1] || "").length), g = computed(() => n.step === 0 ? 1 : n.step), b = computed(() => n.max - n.min), y = computed(() => isNumber(n.markers) === true ? n.markers : g.value), S = computed(() => {
    if (b.value !== 0) {
      const e2 = 100 * y.value / b.value;
      return { backgroundSize: n.vertical === true ? `2px ${e2}%` : `${e2}% 2px` };
    }
    return null;
  }), w = computed(() => v.value === true ? n.tabindex || 0 : -1), x = computed(() => n.vertical === true ? p2.value === true ? "bottom" : "top" : p2.value === true ? "right" : "left"), C = computed(() => n.vertical === true ? "height" : "width"), k = computed(() => n.vertical === true ? "vertical" : "horizontal"), _ = computed(() => {
    const e2 = { role: "slider", "aria-valuemin": n.min, "aria-valuemax": n.max, "aria-orientation": k.value, "data-step": n.step };
    return n.disable === true ? e2["aria-disabled"] = "true" : n.readonly === true && (e2["aria-readonly"] = "true"), e2;
  }), q = computed(() => {
    return [[TouchPan, $, void 0, { [k.value]: true, prevent: true, stop: true, mouse: true, mouseAllDir: true }]];
  });
  function T() {
    return h("svg", { class: "q-slider__thumb absolute", viewBox: "0 0 20 20", width: "20", height: "20", "aria-hidden": "true" }, [h("path", { d: n.thumbPath })]);
  }
  function P(e2, t2) {
    if (n.vertical === true)
      return {};
    const o2 = `${Math.ceil(20 * Math.abs(0.5 - t2))}px`;
    return { pin: { transformOrigin: `${l.lang.rtl === true ? o2 : `calc(100% - ${o2})`} 50%` }, pinTextContainer: { [l.lang.rtl === true ? "left" : "right"]: `${100 * e2}%`, transform: `translateX(${Math.ceil(20 * (l.lang.rtl === true ? -1 : 1) * e2)}px)` } };
  }
  function $(n2) {
    n2.isFinal ? (c.value !== void 0 && (t(n2.evt), n2.touch === true && e(true), c.value = void 0, a("pan", "end")), r.value = false) : n2.isFirst ? (c.value = o(n2.evt), t(n2.evt), e(), r.value = true, a("pan", "start")) : (t(n2.evt), e());
  }
  function M() {
    u.value = false;
  }
  function B(n2) {
    t(n2, o(n2)), e(), s.value = true, r.value = true, document.addEventListener("mouseup", Q, true);
  }
  function Q() {
    s.value = false, c.value === void 0 && (r.value = false), e(true), M(), document.removeEventListener("mouseup", Q, true);
  }
  function E(n2) {
    t(n2, o(n2)), e(true);
  }
  function O(t2) {
    keyCodes$2.includes(t2.keyCode) && e(true);
  }
  return onBeforeUnmount(() => {
    document.removeEventListener("mouseup", Q, true);
  }), { state: { active: r, focus: u, preventFocus: s, dragging: c, axis: d, isReversed: p2, editable: v, classes: m, decimals: f, step: g, minMaxDiff: b, markerStyle: S, tabindex: w, positionProp: x, sizeProp: C, attributes: _, panDirective: q }, methods: { onActivate: B, onMobileClick: E, onBlur: M, onKeyup: O, getThumbSvg: T, getPinStyle: P } };
}
var QSlider = defineComponent({ name: "QSlider", props: __spreadProps(__spreadValues(__spreadValues({}, useSliderProps), useFormProps$1), { modelValue: { required: true, default: null, validator: (e) => typeof e === "number" || e === null }, labelValue: [String, Number] }), emits: useSliderEmits, setup(e, { emit: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = useFormAttrs(e), a = useFormInject(n), l = ref(null), i = ref(e.modelValue === null ? e.min : e.modelValue), r = ref(0), { state: s, methods: u } = useSlider({ updateValue: w, updatePosition: C, getDragging: x }), c = computed(() => s.minMaxDiff.value === 0 ? 0 : (i.value - e.min) / s.minMaxDiff.value), d = computed(() => s.active.value === true ? r.value : c.value), p2 = computed(() => ({ [s.positionProp.value]: 0, [s.sizeProp.value]: `${100 * d.value}%` })), v = computed(() => ({ [s.positionProp.value]: `${100 * d.value}%` })), m = computed(() => s.preventFocus.value === false && s.focus.value === true ? " q-slider--focus" : ""), f = computed(() => e.labelColor !== void 0 ? `text-${e.labelColor}` : ""), g = computed(() => "q-slider__pin-value-marker-text" + (e.labelTextColor !== void 0 ? ` text-${e.labelTextColor}` : "")), b = computed(() => {
    return s.editable.value !== true ? {} : o.platform.is.mobile === true ? { onClick: u.onMobileClick } : { onMousedown: u.onActivate, onFocus: k, onBlur: u.onBlur, onKeydown: _, onKeyup: u.onKeyup };
  }), y = computed(() => e.labelValue !== void 0 ? e.labelValue : i.value), S = computed(() => {
    const t2 = e.reverse === true ? -d.value : d.value - 1;
    return u.getPinStyle(t2, d.value);
  });
  function w(o2) {
    i.value !== e.modelValue && t("update:modelValue", i.value), o2 === true && t("change", i.value);
  }
  function x() {
    return l.value.getBoundingClientRect();
  }
  function C(t2, o2 = s.dragging.value) {
    const n2 = getRatio(t2, o2, s.isReversed.value, e.vertical);
    i.value = getModel(n2, e.min, e.max, e.step, s.decimals.value), r.value = e.snap !== true || e.step === 0 ? n2 : s.minMaxDiff.value === 0 ? 0 : (i.value - e.min) / s.minMaxDiff.value;
  }
  function k() {
    s.focus.value = true;
  }
  function _(t2) {
    if (!keyCodes$2.includes(t2.keyCode))
      return;
    stopAndPrevent$1(t2);
    const o2 = ([34, 33].includes(t2.keyCode) ? 10 : 1) * s.step.value, n2 = [34, 37, 40].includes(t2.keyCode) ? -o2 : o2;
    i.value = between(parseFloat((i.value + n2).toFixed(s.decimals.value)), e.min, e.max), w();
  }
  return watch(() => e.modelValue, (t2) => {
    i.value = t2 === null ? 0 : between(t2, e.min, e.max);
  }), watch(() => e.min + e.max, () => {
    i.value = between(i.value, e.min, e.max);
  }), () => {
    const t2 = [u.getThumbSvg(), h("div", { class: "q-slider__focus-ring" })];
    e.label !== true && e.labelAlways !== true || t2.push(h("div", { class: `q-slider__pin q-slider__pin${s.axis.value} absolute ` + f.value, style: S.value.pin }, [h("div", { class: `q-slider__pin-text-container q-slider__pin-text-container${s.axis.value}`, style: S.value.pinTextContainer }, [h("span", { class: "q-slider__pin-text " + g.value }, [y.value])])]), h("div", { class: `q-slider__arrow q-slider__arrow${s.axis.value} ${f.value}` })), e.name !== void 0 && e.disable !== true && a(t2, "push");
    const o2 = [h("div", { class: `q-slider__track q-slider__track${s.axis.value} absolute`, style: p2.value })];
    e.markers !== false && o2.push(h("div", { class: `q-slider__track-markers q-slider__track-markers${s.axis.value} absolute-full fit`, style: s.markerStyle.value }));
    const n2 = [h("div", { class: `q-slider__track-container q-slider__track-container${s.axis.value} absolute` }, o2), h("div", { class: `q-slider__thumb-container q-slider__thumb-container${s.axis.value} absolute non-selectable` + m.value, style: v.value }, t2)], i2 = __spreadValues(__spreadProps(__spreadValues({ ref: l, class: s.classes.value + (e.modelValue === null ? " q-slider--no-value" : "") }, s.attributes.value), { "aria-valuenow": e.modelValue, tabindex: s.tabindex.value }), b.value);
    return hDir("div", i2, n2, "slide", s.editable.value, () => s.panDirective.value);
  };
} });
function useCanRender() {
  const e = ref(!isRuntimeSsrPreHydration$1.value);
  return e.value === false && onMounted(() => {
    e.value = true;
  }), e;
}
const hasObserver = typeof ResizeObserver !== "undefined", resizeProps = hasObserver === true ? {} : { style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;", url: "about:blank" };
var QResizeObserver = defineComponent({ name: "QResizeObserver", props: { debounce: { type: [String, Number], default: 100 } }, emits: ["resize"], setup(e, { emit: t }) {
  let o, n, a = { width: -1, height: -1 };
  function l(t2) {
    t2 === true || e.debounce === 0 || e.debounce === "0" ? i() : o || (o = setTimeout(i, e.debounce));
  }
  function i() {
    if (o = void 0, n) {
      const { offsetWidth: e2, offsetHeight: o2 } = n;
      e2 === a.width && o2 === a.height || (a = { width: e2, height: o2 }, t("resize", a));
    }
  }
  const r = getCurrentInstance();
  if (Object.assign(r.proxy, { trigger: l }), hasObserver === true) {
    let e2;
    return onMounted(() => {
      nextTick(() => {
        n = r.proxy.$el.parentNode, n && (e2 = new ResizeObserver(l), e2.observe(n), i());
      });
    }), onBeforeUnmount(() => {
      clearTimeout(o), e2 !== void 0 && (e2.disconnect !== void 0 ? e2.disconnect() : n && e2.unobserve(n));
    }), noop;
  }
  {
    let s = function() {
      clearTimeout(o), t2 !== void 0 && (t2.removeEventListener !== void 0 && t2.removeEventListener("resize", l, listenOpts$1.passive), t2 = void 0);
    }, u = function() {
      s(), n && n.contentDocument && (t2 = n.contentDocument.defaultView, t2.addEventListener("resize", l, listenOpts$1.passive), i());
    };
    const e2 = useCanRender();
    let t2;
    return onMounted(() => {
      nextTick(() => {
        n = r.proxy.$el, n && u();
      });
    }), onBeforeUnmount(s), () => {
      if (e2.value === true)
        return h("object", { style: resizeProps.style, tabindex: -1, type: "text/html", data: resizeProps.url, "aria-hidden": "true", onLoad: u });
    };
  }
} });
let rtlHasScrollBug = false;
{
  const e = document.createElement("div"), t = document.createElement("div");
  e.setAttribute("dir", "rtl"), e.style.width = "1px", e.style.height = "1px", e.style.overflow = "auto", t.style.width = "1000px", t.style.height = "1px", document.body.appendChild(e), e.appendChild(t), e.scrollLeft = -1e3, rtlHasScrollBug = e.scrollLeft >= 0, e.remove();
}
function getIndicatorClass(e, t, o) {
  const n = o === true ? ["left", "right"] : ["top", "bottom"];
  return `absolute-${t === true ? n[0] : n[1]}${e ? ` text-${e}` : ""}`;
}
const alignValues$1 = ["left", "center", "right", "justify"], emptyFn = () => {
};
var QTabs = defineComponent({ name: "QTabs", props: { modelValue: [Number, String], align: { type: String, default: "center", validator: (e) => alignValues$1.includes(e) }, breakpoint: { type: [String, Number], default: 600 }, vertical: Boolean, shrink: Boolean, stretch: Boolean, activeClass: String, activeColor: String, activeBgColor: String, indicatorColor: String, leftIcon: String, rightIcon: String, outsideArrows: Boolean, mobileArrows: Boolean, switchIndicator: Boolean, narrowIndicator: Boolean, inlineLabel: Boolean, noCaps: Boolean, dense: Boolean, contentClass: String, "onUpdate:modelValue": Function }, setup(e, { slots: t, emit: o }) {
  const n = getCurrentInstance(), { proxy: { $q: a } } = n, { registerTick: l, prepareTick: i } = useTick(), { registerTimeout: r } = useTimeout(), s = ref(null), u = ref(null), c = ref(e.modelValue), d = ref(false), p2 = ref(true), v = ref(false), m = ref(false), f = computed(() => a.platform.is.desktop === true || e.mobileArrows === true), g = [];
  let b, y, S, w = false, x = f.value === true ? O : noop;
  const C = computed(() => ({ activeClass: e.activeClass, activeColor: e.activeColor, activeBgColor: e.activeBgColor, indicatorClass: getIndicatorClass(e.indicatorColor, e.switchIndicator, e.vertical), narrowIndicator: e.narrowIndicator, inlineLabel: e.inlineLabel, noCaps: e.noCaps })), k = computed(() => {
    const t2 = d.value === true ? "left" : m.value === true ? "justify" : e.align;
    return `q-tabs__content--align-${t2}`;
  }), _ = computed(() => `q-tabs row no-wrap items-center q-tabs--${d.value === true ? "" : "not-"}scrollable q-tabs--${e.vertical === true ? "vertical" : "horizontal"} q-tabs__arrows--${f.value === true && e.outsideArrows === true ? "outside" : "inside"}` + (e.dense === true ? " q-tabs--dense" : "") + (e.shrink === true ? " col-shrink" : "") + (e.stretch === true ? " self-stretch" : "")), q = computed(() => "q-tabs__content row no-wrap items-center self-stretch hide-scrollbar " + k.value + (e.contentClass !== void 0 ? ` ${e.contentClass}` : "") + (a.platform.is.mobile === true ? " scroll" : "")), T = computed(() => e.vertical === true ? { container: "height", content: "offsetHeight", scroll: "scrollHeight" } : { container: "width", content: "offsetWidth", scroll: "scrollWidth" }), P = computed(() => e.vertical !== true && a.lang.rtl === true), $ = computed(() => rtlHasScrollBug === false && P.value === true);
  function M({ name: t2, setCurrent: n2, skipEmit: a2, fromRoute: l2 }) {
    c.value !== t2 && (a2 !== true && o("update:modelValue", t2), n2 !== true && e["onUpdate:modelValue"] !== void 0 || (E(c.value, t2), c.value = t2)), l2 !== void 0 && (w = l2);
  }
  function B() {
    l(() => {
      n.isDeactivated !== true && n.isUnmounted !== true && Q({ width: s.value.offsetWidth, height: s.value.offsetHeight });
    }), i();
  }
  function Q(t2) {
    if (T.value === void 0 || u.value === null)
      return;
    const o2 = t2[T.value.container], n2 = Math.min(u.value[T.value.scroll], Array.prototype.reduce.call(u.value.children, (e2, t3) => e2 + t3[T.value.content], 0)), a2 = o2 > 0 && n2 > o2;
    d.value !== a2 && (d.value = a2), a2 === true && nextTick(x);
    const l2 = o2 < parseInt(e.breakpoint, 10);
    m.value !== l2 && (m.value = l2);
  }
  function E(t2, o2) {
    const n2 = t2 !== void 0 && t2 !== null && t2 !== "" ? g.find((e2) => e2.name.value === t2) : null, a2 = o2 !== void 0 && o2 !== null && o2 !== "" ? g.find((e2) => e2.name.value === o2) : null;
    if (n2 && a2) {
      const t3 = n2.tabIndicatorRef.value, o3 = a2.tabIndicatorRef.value;
      clearTimeout(b), t3.style.transition = "none", t3.style.transform = "none", o3.style.transition = "none", o3.style.transform = "none";
      const l2 = t3.getBoundingClientRect(), i2 = o3.getBoundingClientRect();
      o3.style.transform = e.vertical === true ? `translate3d(0,${l2.top - i2.top}px,0) scale3d(1,${i2.height ? l2.height / i2.height : 1},1)` : `translate3d(${l2.left - i2.left}px,0,0) scale3d(${i2.width ? l2.width / i2.width : 1},1,1)`, nextTick(() => {
        b = setTimeout(() => {
          o3.style.transition = "transform .25s cubic-bezier(.4, 0, .2, 1)", o3.style.transform = "none";
        }, 70);
      });
    }
    if (a2 && d.value === true) {
      const { left: t3, width: o3, top: n3, height: l2 } = u.value.getBoundingClientRect(), i2 = a2.rootRef.value.getBoundingClientRect();
      let r2 = e.vertical === true ? i2.top - n3 : i2.left - t3;
      if (r2 < 0)
        return u.value[e.vertical === true ? "scrollTop" : "scrollLeft"] += Math.floor(r2), void x();
      r2 += e.vertical === true ? i2.height - l2 : i2.width - o3, r2 > 0 && (u.value[e.vertical === true ? "scrollTop" : "scrollLeft"] += Math.ceil(r2), x());
    }
  }
  function O() {
    const t2 = u.value;
    if (t2 !== null) {
      const o2 = t2.getBoundingClientRect(), n2 = e.vertical === true ? t2.scrollTop : Math.abs(t2.scrollLeft);
      P.value === true ? (p2.value = Math.ceil(n2 + o2.width) < t2.scrollWidth - 1, v.value = n2 > 0) : (p2.value = n2 > 0, v.value = e.vertical === true ? Math.ceil(n2 + o2.height) < t2.scrollHeight : Math.ceil(n2 + o2.width) < t2.scrollWidth);
    }
  }
  function L(e2) {
    R(), V(e2), y = setInterval(() => {
      V(e2) === true && R();
    }, 5);
  }
  function z() {
    L($.value === true ? 9999 : 0);
  }
  function F() {
    L($.value === true ? 0 : 9999);
  }
  function R() {
    clearInterval(y);
  }
  watch(P, x), watch(() => e.modelValue, (e2) => {
    M({ name: e2, setCurrent: true, skipEmit: true });
  }), watch(() => e.outsideArrows, () => {
    nextTick(B());
  }), watch(f, (e2) => {
    x = e2 === true ? O : noop, nextTick(B());
  });
  const D = computed(() => $.value === true ? { get: (e2) => Math.abs(e2.scrollLeft), set: (e2, t2) => {
    e2.scrollLeft = -t2;
  } } : e.vertical === true ? { get: (e2) => e2.scrollTop, set: (e2, t2) => {
    e2.scrollTop = t2;
  } } : { get: (e2) => e2.scrollLeft, set: (e2, t2) => {
    e2.scrollLeft = t2;
  } });
  function V(e2) {
    const t2 = u.value, { get: o2, set: n2 } = D.value;
    let a2 = false, l2 = o2(t2);
    const i2 = e2 < l2 ? -1 : 1;
    return l2 += 5 * i2, l2 < 0 ? (a2 = true, l2 = 0) : (i2 === -1 && l2 <= e2 || i2 === 1 && l2 >= e2) && (a2 = true, l2 = e2), n2(t2, l2), x(), a2;
  }
  function A() {
    return g.filter((e2) => e2.routerProps !== void 0 && e2.routerProps.hasLink.value === true);
  }
  function I() {
    let e2 = null, t2 = w;
    const o2 = { matchedLen: 0, hrefLen: 0, exact: false, found: false }, { hash: a2 } = n.proxy.$route, l2 = c.value;
    let i2 = t2 === true ? emptyFn : (e3) => {
      l2 === e3.name.value && (t2 = true, i2 = emptyFn);
    };
    const r2 = A();
    for (const n2 of r2) {
      const t3 = n2.routerProps.exact.value === true;
      if (n2.routerProps[t3 === true ? "linkIsExactActive" : "linkIsActive"].value !== true || o2.exact === true && t3 !== true) {
        i2(n2);
        continue;
      }
      const l3 = n2.routerProps.linkRoute.value, r3 = l3.hash;
      if (t3 === true) {
        if (a2 === r3) {
          e2 = n2.name.value;
          break;
        }
        if (a2 !== "" && r3 !== "") {
          i2(n2);
          continue;
        }
      }
      const s2 = l3.matched.length, u2 = l3.href.length - r3.length;
      (s2 === o2.matchedLen ? u2 > o2.hrefLen : s2 > o2.matchedLen) ? (e2 = n2.name.value, Object.assign(o2, { matchedLen: s2, hrefLen: u2, exact: t3 })) : i2(n2);
    }
    t2 !== true && e2 === null || M({ name: e2, setCurrent: true, fromRoute: true });
  }
  function H() {
    U.avoidRouteWatcher !== true && r(I);
  }
  function N(e2) {
    g.push(e2);
    const t2 = A();
    t2.length > 0 && (S === void 0 && (S = watch(() => n.proxy.$route, H)), H());
  }
  function j(e2) {
    if (g.splice(g.indexOf(e2), 1), S !== void 0) {
      const e3 = A();
      e3.length === 0 && (S(), S = void 0), H();
    }
  }
  const U = { currentModel: c, tabProps: C, registerTab: N, unregisterTab: j, verifyRouteModel: H, updateModel: M, recalculateScroll: B, avoidRouteWatcher: false };
  return provide(tabsKey, U), onBeforeUnmount(() => {
    clearTimeout(b), S !== void 0 && S();
  }), onActivated(B), () => {
    const o2 = [h(QResizeObserver, { onResize: Q }), h("div", { ref: u, class: q.value, onScroll: x }, hSlot$1(t.default))];
    return f.value === true && o2.push(h(QIcon$1, { class: "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" + (p2.value === true ? "" : " q-tabs__arrow--faded"), name: e.leftIcon || a.iconSet.tabs[e.vertical === true ? "up" : "left"], onMousedown: z, onTouchstartPassive: z, onMouseup: R, onMouseleave: R, onTouchend: R }), h(QIcon$1, { class: "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" + (v.value === true ? "" : " q-tabs__arrow--faded"), name: e.rightIcon || a.iconSet.tabs[e.vertical === true ? "down" : "right"], onMousedown: F, onTouchstartPassive: F, onMouseup: R, onMouseleave: R, onTouchend: R })), h("div", { ref: s, class: _.value, role: "tablist" }, o2);
  };
} });
let uid$3 = 0;
const useTabEmits = ["click", "keyup"], useTabProps = { icon: String, label: [Number, String], alert: [Boolean, String], alertIcon: String, name: { type: [Number, String], default: () => `t_${uid$3++}` }, noCaps: Boolean, tabindex: [String, Number], disable: Boolean, contentClass: String, ripple: { type: [Boolean, Object], default: true } };
function useTab(e, t, o, n) {
  const a = inject(tabsKey, () => {
    console.error("QTab/QRouteTab component needs to be child of QTabs");
  }), l = ref(null), i = ref(null), r = ref(null), s = computed(() => e.disable !== true && e.ripple), u = computed(() => a.currentModel.value === e.name), c = computed(() => "q-tab relative-position self-stretch flex flex-center text-center" + (u.value === true ? " q-tab--active" + (a.tabProps.value.activeClass ? " " + a.tabProps.value.activeClass : "") + (a.tabProps.value.activeColor ? ` text-${a.tabProps.value.activeColor}` : "") + (a.tabProps.value.activeBgColor ? ` bg-${a.tabProps.value.activeBgColor}` : "") : " q-tab--inactive") + (e.icon && e.label && a.tabProps.value.inlineLabel === false ? " q-tab--full" : "") + (e.noCaps === true || a.tabProps.value.noCaps === true ? " q-tab--no-caps" : "") + (e.disable === true ? " disabled" : " q-focusable q-hoverable cursor-pointer") + (n !== void 0 && n.linkClass.value !== "" ? ` ${n.linkClass.value}` : "")), d = computed(() => "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " + (a.tabProps.value.inlineLabel === true ? "row no-wrap q-tab__content--inline" : "column") + (e.contentClass !== void 0 ? ` ${e.contentClass}` : "")), p2 = computed(() => e.disable === true || u.value === true ? -1 : e.tabindex || 0);
  function v(t2, i2) {
    if (i2 !== true && l.value !== null && l.value.focus(), e.disable !== true) {
      let l2;
      if (n !== void 0) {
        if (n.hasLink.value !== true)
          return void o("click", t2);
        l2 = () => {
          t2.__qNavigate = true, a.avoidRouteWatcher = true;
          const o2 = n.navigateToLink(t2);
          o2 === false ? a.avoidRouteWatcher = false : o2.then(() => {
            a.avoidRouteWatcher = false, a.updateModel({ name: e.name, fromRoute: true });
          });
        };
      } else
        l2 = () => {
          a.updateModel({ name: e.name, fromRoute: false });
        };
      o("click", t2, l2), t2.defaultPrevented !== true && l2();
    }
  }
  function m(e2) {
    isKeyCode(e2, 13) === true && v(e2, true), o("keyup", e2);
  }
  function f() {
    const o2 = a.tabProps.value.narrowIndicator, n2 = [], i2 = h("div", { ref: r, class: ["q-tab__indicator", a.tabProps.value.indicatorClass] });
    e.icon !== void 0 && n2.push(h(QIcon$1, { class: "q-tab__icon", name: e.icon })), e.label !== void 0 && n2.push(h("div", { class: "q-tab__label" }, e.label)), e.alert !== false && n2.push(e.alertIcon !== void 0 ? h(QIcon$1, { class: "q-tab__alert-icon", color: e.alert !== true ? e.alert : void 0, name: e.alertIcon }) : h("div", { class: "q-tab__alert" + (e.alert !== true ? ` text-${e.alert}` : "") })), o2 === true && n2.push(i2);
    const s2 = [h("div", { class: "q-focus-helper", tabindex: -1, ref: l }), h("div", { class: d.value }, hMergeSlot$1(t.default, n2))];
    return o2 === false && s2.push(i2), s2;
  }
  const g = { name: computed(() => e.name), rootRef: i, tabIndicatorRef: r, routerProps: n };
  function b(t2, o2) {
    const n2 = __spreadValues({ ref: i, class: c.value, tabindex: p2.value, role: "tab", "aria-selected": u.value, "aria-disabled": e.disable === true ? "true" : void 0, onClick: v, onKeyup: m }, o2);
    return withDirectives(h(t2, n2, f()), [[Ripple, s.value]]);
  }
  return onBeforeUnmount(() => {
    a.unregisterTab(g), a.recalculateScroll();
  }), onMounted(() => {
    a.registerTab(g), a.recalculateScroll();
  }), { renderTab: b, $tabs: a };
}
var QTab = defineComponent({ name: "QTab", props: useTabProps, emits: useTabEmits, setup(e, { slots: t, emit: o }) {
  const { renderTab: n } = useTab(e, t, o);
  return () => n("div");
} }), QTabPanels = defineComponent({ name: "QTabPanels", props: __spreadValues(__spreadValues({}, usePanelProps), useDarkProps$1), emits: usePanelEmits, setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark$1(e, o.proxy.$q), { updatePanelsList: a, getPanelContent: l, panelDirectives: i } = usePanel(), r = computed(() => "q-tab-panels q-panel-parent" + (n.value === true ? " q-tab-panels--dark q-dark" : ""));
  return () => {
    return a(t), hDir("div", { class: r.value }, l(), "pan", e.swipeable, () => i.value);
  };
} }), QTabPanel = defineComponent({ name: "QTabPanel", props: usePanelChildProps, setup(e, { slots: t }) {
  return () => h("div", { class: "q-tab-panel" }, hSlot$1(t.default));
} });
const hex$1 = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa$1 = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa$1 = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb$1 = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba$1 = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/, testPattern$1 = { date: (e) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e), time: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e), fulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e), timeOrFulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e), hexColor: (e) => hex$1.test(e), hexaColor: (e) => hexa$1.test(e), hexOrHexaColor: (e) => hexOrHexa$1.test(e), rgbColor: (e) => rgb$1.test(e), rgbaColor: (e) => rgba$1.test(e), rgbOrRgbaColor: (e) => rgb$1.test(e) || rgba$1.test(e), hexOrRgbColor: (e) => hex$1.test(e) || rgb$1.test(e), hexaOrRgbaColor: (e) => hexa$1.test(e) || rgba$1.test(e), anyColor: (e) => hexOrHexa$1.test(e) || rgb$1.test(e) || rgba$1.test(e) };
const reRGBA = /^rgb(a)?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?([01]?\.?\d*?)?\)$/;
function rgbToHex({ r: e, g: t, b: o, a: n }) {
  const a = n !== void 0;
  if (e = Math.round(e), t = Math.round(t), o = Math.round(o), e > 255 || t > 255 || o > 255 || a && n > 100)
    throw new TypeError("Expected 3 numbers below 256 (and optionally one below 100)");
  return n = a ? (256 | Math.round(255 * n / 100)).toString(16).slice(1) : "", "#" + (o | t << 8 | e << 16 | 1 << 24).toString(16).slice(1) + n;
}
function rgbToString({ r: e, g: t, b: o, a: n }) {
  return `rgb${n !== void 0 ? "a" : ""}(${e},${t},${o}${n !== void 0 ? "," + n / 100 : ""})`;
}
function hexToRgb(e) {
  if (typeof e !== "string")
    throw new TypeError("Expected a string");
  e = e.replace(/^#/, ""), e.length === 3 ? e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : e.length === 4 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2] + e[3] + e[3]);
  const t = parseInt(e, 16);
  return e.length > 6 ? { r: t >> 24 & 255, g: t >> 16 & 255, b: t >> 8 & 255, a: Math.round((255 & t) / 2.55) } : { r: t >> 16, g: t >> 8 & 255, b: 255 & t };
}
function hsvToRgb({ h: e, s: t, v: o, a: n }) {
  let a, l, i;
  t /= 100, o /= 100, e /= 360;
  const r = Math.floor(6 * e), s = 6 * e - r, u = o * (1 - t), c = o * (1 - s * t), d = o * (1 - (1 - s) * t);
  switch (r % 6) {
    case 0:
      a = o, l = d, i = u;
      break;
    case 1:
      a = c, l = o, i = u;
      break;
    case 2:
      a = u, l = o, i = d;
      break;
    case 3:
      a = u, l = c, i = o;
      break;
    case 4:
      a = d, l = u, i = o;
      break;
    case 5:
      a = o, l = u, i = c;
      break;
  }
  return { r: Math.round(255 * a), g: Math.round(255 * l), b: Math.round(255 * i), a: n };
}
function rgbToHsv({ r: e, g: t, b: o, a: n }) {
  const a = Math.max(e, t, o), l = Math.min(e, t, o), i = a - l, r = a === 0 ? 0 : i / a, s = a / 255;
  let u;
  switch (a) {
    case l:
      u = 0;
      break;
    case e:
      u = t - o + i * (t < o ? 6 : 0), u /= 6 * i;
      break;
    case t:
      u = o - e + 2 * i, u /= 6 * i;
      break;
    case o:
      u = e - t + 4 * i, u /= 6 * i;
      break;
  }
  return { h: Math.round(360 * u), s: Math.round(100 * r), v: Math.round(100 * s), a: n };
}
function textToRgb(e) {
  if (typeof e !== "string")
    throw new TypeError("Expected a string");
  const t = e.replace(/ /g, ""), o = reRGBA.exec(t);
  if (o === null)
    return hexToRgb(t);
  const n = { r: Math.min(255, parseInt(o[2], 10)), g: Math.min(255, parseInt(o[3], 10)), b: Math.min(255, parseInt(o[4], 10)) };
  if (o[1]) {
    const e2 = parseFloat(o[5]);
    n.a = 100 * Math.min(1, isNaN(e2) === true ? 1 : e2);
  }
  return n;
}
function luminosity(e) {
  if (typeof e !== "string" && (!e || e.r === void 0))
    throw new TypeError("Expected a string or a {r, g, b} object as color");
  const t = typeof e === "string" ? textToRgb(e) : e, o = t.r / 255, n = t.g / 255, a = t.b / 255, l = o <= 0.03928 ? o / 12.92 : Math.pow((o + 0.055) / 1.055, 2.4), i = n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4), r = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * l + 0.7152 * i + 0.0722 * r;
}
const palette = ["rgb(255,204,204)", "rgb(255,230,204)", "rgb(255,255,204)", "rgb(204,255,204)", "rgb(204,255,230)", "rgb(204,255,255)", "rgb(204,230,255)", "rgb(204,204,255)", "rgb(230,204,255)", "rgb(255,204,255)", "rgb(255,153,153)", "rgb(255,204,153)", "rgb(255,255,153)", "rgb(153,255,153)", "rgb(153,255,204)", "rgb(153,255,255)", "rgb(153,204,255)", "rgb(153,153,255)", "rgb(204,153,255)", "rgb(255,153,255)", "rgb(255,102,102)", "rgb(255,179,102)", "rgb(255,255,102)", "rgb(102,255,102)", "rgb(102,255,179)", "rgb(102,255,255)", "rgb(102,179,255)", "rgb(102,102,255)", "rgb(179,102,255)", "rgb(255,102,255)", "rgb(255,51,51)", "rgb(255,153,51)", "rgb(255,255,51)", "rgb(51,255,51)", "rgb(51,255,153)", "rgb(51,255,255)", "rgb(51,153,255)", "rgb(51,51,255)", "rgb(153,51,255)", "rgb(255,51,255)", "rgb(255,0,0)", "rgb(255,128,0)", "rgb(255,255,0)", "rgb(0,255,0)", "rgb(0,255,128)", "rgb(0,255,255)", "rgb(0,128,255)", "rgb(0,0,255)", "rgb(128,0,255)", "rgb(255,0,255)", "rgb(245,0,0)", "rgb(245,123,0)", "rgb(245,245,0)", "rgb(0,245,0)", "rgb(0,245,123)", "rgb(0,245,245)", "rgb(0,123,245)", "rgb(0,0,245)", "rgb(123,0,245)", "rgb(245,0,245)", "rgb(214,0,0)", "rgb(214,108,0)", "rgb(214,214,0)", "rgb(0,214,0)", "rgb(0,214,108)", "rgb(0,214,214)", "rgb(0,108,214)", "rgb(0,0,214)", "rgb(108,0,214)", "rgb(214,0,214)", "rgb(163,0,0)", "rgb(163,82,0)", "rgb(163,163,0)", "rgb(0,163,0)", "rgb(0,163,82)", "rgb(0,163,163)", "rgb(0,82,163)", "rgb(0,0,163)", "rgb(82,0,163)", "rgb(163,0,163)", "rgb(92,0,0)", "rgb(92,46,0)", "rgb(92,92,0)", "rgb(0,92,0)", "rgb(0,92,46)", "rgb(0,92,92)", "rgb(0,46,92)", "rgb(0,0,92)", "rgb(46,0,92)", "rgb(92,0,92)", "rgb(255,255,255)", "rgb(205,205,205)", "rgb(178,178,178)", "rgb(153,153,153)", "rgb(127,127,127)", "rgb(102,102,102)", "rgb(76,76,76)", "rgb(51,51,51)", "rgb(25,25,25)", "rgb(0,0,0)"], thumbPath = "M5 5 h10 v10 h-10 v-10 z";
var QColor = defineComponent({ name: "QColor", props: __spreadProps(__spreadValues(__spreadValues({}, useDarkProps$1), useFormProps$1), { modelValue: String, defaultValue: String, defaultView: { type: String, default: "spectrum", validator: (e) => ["spectrum", "tune", "palette"].includes(e) }, formatModel: { type: String, default: "auto", validator: (e) => ["auto", "hex", "rgb", "hexa", "rgba"].includes(e) }, palette: Array, noHeader: Boolean, noHeaderTabs: Boolean, noFooter: Boolean, square: Boolean, flat: Boolean, bordered: Boolean, disable: Boolean, readonly: Boolean }), emits: ["update:modelValue", "change"], setup(e, { emit: t }) {
  const { proxy: o } = getCurrentInstance(), { $q: n } = o, a = useDark$1(e, n), { getCache: l } = useCache(), i = ref(null), r = ref(null), s = computed(() => e.formatModel === "auto" ? null : e.formatModel.indexOf("hex") > -1), u = computed(() => e.formatModel === "auto" ? null : e.formatModel.indexOf("a") > -1), c = ref(e.formatModel === "auto" ? e.modelValue === void 0 || e.modelValue === null || e.modelValue === "" || e.modelValue.startsWith("#") ? "hex" : "rgb" : e.formatModel.startsWith("hex") ? "hex" : "rgb"), d = ref(e.defaultView), p2 = ref($(e.modelValue || e.defaultValue)), v = computed(() => e.disable !== true && e.readonly !== true), m = computed(() => e.modelValue === void 0 || e.modelValue === null || e.modelValue === "" || e.modelValue.startsWith("#")), f = computed(() => s.value !== null ? s.value : m.value), g = computed(() => ({ type: "hidden", name: e.name, value: p2.value[f.value === true ? "hex" : "rgb"] })), b = useFormInject(g), y = computed(() => u.value !== null ? u.value : p2.value.a !== void 0), S = computed(() => ({ backgroundColor: p2.value.rgb || "#000" })), w = computed(() => {
    const e2 = p2.value.a !== void 0 && p2.value.a < 65 || luminosity(p2.value) > 0.4;
    return `q-color-picker__header-content q-color-picker__header-content--${e2 ? "light" : "dark"}`;
  }), x = computed(() => ({ background: `hsl(${p2.value.h},100%,50%)` })), C = computed(() => ({ top: `${100 - p2.value.v}%`, [n.lang.rtl === true ? "right" : "left"]: `${p2.value.s}%` })), k = computed(() => e.palette !== void 0 && e.palette.length > 0 ? e.palette : palette), _ = computed(() => "q-color-picker" + (e.bordered === true ? " q-color-picker--bordered" : "") + (e.square === true ? " q-color-picker--square no-border-radius" : "") + (e.flat === true ? " q-color-picker--flat no-shadow" : "") + (e.disable === true ? " disabled" : "") + (a.value === true ? " q-color-picker--dark q-dark" : "")), q = computed(() => {
    return e.disable === true ? { "aria-disabled": "true" } : e.readonly === true ? { "aria-readonly": "true" } : {};
  }), T = computed(() => {
    return [[TouchPan, L, void 0, { prevent: true, stop: true, mouse: true }]];
  });
  function P(e2, o2) {
    p2.value.hex = rgbToHex(e2), p2.value.rgb = rgbToString(e2), p2.value.r = e2.r, p2.value.g = e2.g, p2.value.b = e2.b, p2.value.a = e2.a;
    const n2 = p2.value[f.value === true ? "hex" : "rgb"];
    t("update:modelValue", n2), o2 === true && t("change", n2);
  }
  function $(t2) {
    const o2 = u.value !== void 0 ? u.value : e.formatModel === "auto" ? null : e.formatModel.indexOf("a") > -1;
    if (typeof t2 !== "string" || t2.length === 0 || testPattern$1.anyColor(t2.replace(/ /g, "")) !== true)
      return { h: 0, s: 0, v: 0, r: 0, g: 0, b: 0, a: o2 === true ? 100 : void 0, hex: void 0, rgb: void 0 };
    const n2 = textToRgb(t2);
    return o2 === true && n2.a === void 0 && (n2.a = 100), n2.hex = rgbToHex(n2), n2.rgb = rgbToString(n2), Object.assign(n2, rgbToHsv(n2));
  }
  function M(e2, t2, o2) {
    const a2 = i.value;
    if (a2 === null)
      return;
    const l2 = a2.clientWidth, r2 = a2.clientHeight, s2 = a2.getBoundingClientRect();
    let u2 = Math.min(l2, Math.max(0, e2 - s2.left));
    n.lang.rtl === true && (u2 = l2 - u2);
    const c2 = Math.min(r2, Math.max(0, t2 - s2.top)), d2 = Math.round(100 * u2 / l2), v2 = Math.round(100 * Math.max(0, Math.min(1, -c2 / r2 + 1))), m2 = hsvToRgb({ h: p2.value.h, s: d2, v: v2, a: y.value === true ? p2.value.a : void 0 });
    p2.value.s = d2, p2.value.v = v2, P(m2, o2);
  }
  function B(e2, t2) {
    const o2 = Math.round(e2), n2 = hsvToRgb({ h: o2, s: p2.value.s, v: p2.value.v, a: y.value === true ? p2.value.a : void 0 });
    p2.value.h = o2, P(n2, t2);
  }
  function Q(e2, t2, n2, a2, l2) {
    if (a2 !== void 0 && stop$1(a2), !/^[0-9]+$/.test(e2))
      return void (l2 === true && o.$forceUpdate());
    const i2 = Math.floor(Number(e2));
    if (i2 < 0 || i2 > n2)
      return void (l2 === true && o.$forceUpdate());
    const r2 = { r: t2 === "r" ? i2 : p2.value.r, g: t2 === "g" ? i2 : p2.value.g, b: t2 === "b" ? i2 : p2.value.b, a: y.value === true ? t2 === "a" ? i2 : p2.value.a : void 0 };
    if (t2 !== "a") {
      const e3 = rgbToHsv(r2);
      p2.value.h = e3.h, p2.value.s = e3.s, p2.value.v = e3.v;
    }
    if (P(r2, l2), a2 !== void 0 && l2 !== true && a2.target.selectionEnd !== void 0) {
      const e3 = a2.target.selectionEnd;
      nextTick(() => {
        a2.target.setSelectionRange(e3, e3);
      });
    }
  }
  function E(e2, t2) {
    let o2;
    const n2 = e2.target.value;
    if (stop$1(e2), c.value === "hex") {
      if (n2.length !== (y.value === true ? 9 : 7) || !/^#[0-9A-Fa-f]+$/.test(n2))
        return true;
      o2 = hexToRgb(n2);
    } else {
      let e3;
      if (!n2.endsWith(")"))
        return true;
      if (y.value !== true && n2.startsWith("rgb(")) {
        if (e3 = n2.substring(4, n2.length - 1).split(",").map((e4) => parseInt(e4, 10)), e3.length !== 3 || !/^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/.test(n2))
          return true;
      } else {
        if (y.value !== true || !n2.startsWith("rgba("))
          return true;
        {
          if (e3 = n2.substring(5, n2.length - 1).split(","), e3.length !== 4 || !/^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/.test(n2))
            return true;
          for (let o3 = 0; o3 < 3; o3++) {
            const t4 = parseInt(e3[o3], 10);
            if (t4 < 0 || t4 > 255)
              return true;
            e3[o3] = t4;
          }
          const t3 = parseFloat(e3[3]);
          if (t3 < 0 || t3 > 1)
            return true;
          e3[3] = t3;
        }
      }
      if (e3[0] < 0 || e3[0] > 255 || e3[1] < 0 || e3[1] > 255 || e3[2] < 0 || e3[2] > 255 || y.value === true && (e3[3] < 0 || e3[3] > 1))
        return true;
      o2 = { r: e3[0], g: e3[1], b: e3[2], a: y.value === true ? 100 * e3[3] : void 0 };
    }
    const a2 = rgbToHsv(o2);
    if (p2.value.h = a2.h, p2.value.s = a2.s, p2.value.v = a2.v, P(o2, t2), t2 !== true) {
      const t3 = e2.target.selectionEnd;
      nextTick(() => {
        e2.target.setSelectionRange(t3, t3);
      });
    }
  }
  function O(e2) {
    const t2 = $(e2), o2 = { r: t2.r, g: t2.g, b: t2.b, a: t2.a };
    o2.a === void 0 && (o2.a = p2.value.a), p2.value.h = t2.h, p2.value.s = t2.s, p2.value.v = t2.v, P(o2, true);
  }
  function L(e2) {
    e2.isFinal ? M(e2.position.left, e2.position.top, true) : z(e2);
  }
  watch(() => e.modelValue, (t2) => {
    const o2 = $(t2 || e.defaultValue);
    o2.hex !== p2.value.hex && (p2.value = o2);
  }), watch(() => e.defaultValue, (t2) => {
    if (!e.modelValue && t2) {
      const e2 = $(t2);
      e2.hex !== p2.value.hex && (p2.value = e2);
    }
  });
  const z = throttle((e2) => {
    M(e2.position.left, e2.position.top);
  }, 20);
  function F(e2) {
    M(e2.pageX - window.pageXOffset, e2.pageY - window.pageYOffset, true);
  }
  function R(e2) {
    M(e2.pageX - window.pageXOffset, e2.pageY - window.pageYOffset);
  }
  function D(e2) {
    r.value !== null && (r.value.$el.style.opacity = e2 ? 1 : 0);
  }
  function V() {
    const t2 = [];
    return e.noHeaderTabs !== true && t2.push(h(QTabs, __spreadValues({ class: "q-color-picker__header-tabs", modelValue: c.value, dense: true, align: "justify" }, l("topVTab", { "onUpdate:modelValue": (e2) => {
      c.value = e2;
    } })), () => [h(QTab, { label: "HEX" + (y.value === true ? "A" : ""), name: "hex", ripple: false }), h(QTab, { label: "RGB" + (y.value === true ? "A" : ""), name: "rgb", ripple: false })])), t2.push(h("div", { class: "q-color-picker__header-banner row flex-center no-wrap" }, [h("input", __spreadValues(__spreadValues({ class: "fit", value: p2.value[c.value] }, v.value !== true ? { readonly: true } : {}), l("topIn", { onInput: (e2) => {
      D(E(e2) === true);
    }, onChange: stop$1, onBlur: (e2) => {
      E(e2, true) === true && o.$forceUpdate(), D(false);
    } }))), h(QIcon$1, { ref: r, class: "q-color-picker__error-icon absolute no-pointer-events", name: n.iconSet.type.negative })])), h("div", { class: "q-color-picker__header relative-position overflow-hidden" }, [h("div", { class: "q-color-picker__header-bg absolute-full" }), h("div", { class: w.value, style: S.value }, t2)]);
  }
  function A() {
    return h(QTabPanels, { modelValue: d.value, animated: true }, () => [h(QTabPanel, { class: "q-color-picker__spectrum-tab overflow-hidden", name: "spectrum" }, H), h(QTabPanel, { class: "q-pa-md q-color-picker__tune-tab", name: "tune" }, N), h(QTabPanel, { class: "q-color-picker__palette-tab", name: "palette" }, j)]);
  }
  function I() {
    return h("div", { class: "q-color-picker__footer relative-position overflow-hidden" }, [h(QTabs, __spreadValues({ class: "absolute-full", modelValue: d.value, dense: true, align: "justify" }, l("ftIn", { "onUpdate:modelValue": (e2) => {
      d.value = e2;
    } })), () => [h(QTab, { icon: n.iconSet.colorPicker.spectrum, name: "spectrum", ripple: false }), h(QTab, { icon: n.iconSet.colorPicker.tune, name: "tune", ripple: false }), h(QTab, { icon: n.iconSet.colorPicker.palette, name: "palette", ripple: false })])]);
  }
  function H() {
    const e2 = __spreadValues({ ref: i, class: "q-color-picker__spectrum non-selectable relative-position cursor-pointer" + (v.value !== true ? " readonly" : ""), style: x.value }, v.value === true ? { onClick: F, onMousedown: R } : {}), t2 = [h("div", { style: { paddingBottom: "100%" } }), h("div", { class: "q-color-picker__spectrum-white absolute-full" }), h("div", { class: "q-color-picker__spectrum-black absolute-full" }), h("div", { class: "absolute", style: C.value }, [p2.value.hex !== void 0 ? h("div", { class: "q-color-picker__spectrum-circle" }) : null])], o2 = [h("div", { class: "q-color-picker__hue non-selectable" }, [h(QSlider, __spreadValues({ modelValue: p2.value.h, min: 0, max: 360, fillHandleAlways: true, readonly: v.value !== true, thumbPath, "onUpdate:modelValue": B }, l("lazyhue", { onChange: (e3) => B(e3, true) })))])];
    return y.value === true && o2.push(h("div", { class: "q-color-picker__alpha non-selectable" }, [h(QSlider, __spreadValues({ modelValue: p2.value.a, min: 0, max: 100, fillHandleAlways: true, readonly: v.value !== true, thumbPath }, l("alphaSlide", { "onUpdate:modelValue": (e3) => Q(e3, "a", 100), onChange: (e3) => Q(e3, "a", 100, void 0, true) })))])), [hDir("div", e2, t2, "spec", v.value, () => T.value), h("div", { class: "q-color-picker__sliders" }, o2)];
  }
  function N() {
    return [h("div", { class: "row items-center no-wrap" }, [h("div", "R"), h(QSlider, __spreadValues({ modelValue: p2.value.r, min: 0, max: 255, color: "red", dark: a.value, readonly: v.value !== true }, l("rSlide", { "onUpdate:modelValue": (e2) => Q(e2, "r", 255), onChange: (e2) => Q(e2, "r", 255, void 0, true) }))), h("input", __spreadValues({ value: p2.value.r, maxlength: 3, readonly: v.value !== true, onChange: stop$1 }, l("rIn", { onInput: (e2) => Q(e2.target.value, "r", 255, e2), onBlur: (e2) => Q(e2.target.value, "r", 255, e2, true) })))]), h("div", { class: "row items-center no-wrap" }, [h("div", "G"), h(QSlider, __spreadValues({ modelValue: p2.value.g, min: 0, max: 255, color: "green", dark: a.value, readonly: v.value !== true }, l("gSlide", { "onUpdate:modelValue": (e2) => Q(e2, "g", 255), onChange: (e2) => Q(e2, "g", 255, void 0, true) }))), h("input", __spreadValues({ value: p2.value.g, maxlength: 3, readonly: v.value !== true, onChange: stop$1 }, l("gIn", { onInput: (e2) => Q(e2.target.value, "g", 255, e2), onBlur: (e2) => Q(e2.target.value, "g", 255, e2, true) })))]), h("div", { class: "row items-center no-wrap" }, [h("div", "B"), h(QSlider, __spreadValues({ modelValue: p2.value.b, min: 0, max: 255, color: "blue", readonly: v.value !== true, dark: a.value }, l("bSlide", { "onUpdate:modelValue": (e2) => Q(e2, "b", 255), onChange: (e2) => Q(e2, "b", 255, void 0, true) }))), h("input", __spreadValues({ value: p2.value.b, maxlength: 3, readonly: v.value !== true, onChange: stop$1 }, l("bIn", { onInput: (e2) => Q(e2.target.value, "b", 255, e2), onBlur: (e2) => Q(e2.target.value, "b", 255, e2, true) })))]), y.value === true ? h("div", { class: "row items-center no-wrap" }, [h("div", "A"), h(QSlider, __spreadValues({ modelValue: p2.value.a, color: "grey", readonly: v.value !== true, dark: a.value }, l("aSlide", { "onUpdate:modelValue": (e2) => Q(e2, "a", 100), onChange: (e2) => Q(e2, "a", 100, void 0, true) }))), h("input", __spreadValues({ value: p2.value.a, maxlength: 3, readonly: v.value !== true, onChange: stop$1 }, l("aIn", { onInput: (e2) => Q(e2.target.value, "a", 100, e2), onBlur: (e2) => Q(e2.target.value, "a", 100, e2, true) })))]) : null];
  }
  function j() {
    const e2 = (e3) => h("div", __spreadValues({ class: "q-color-picker__cube col-auto", style: { backgroundColor: e3 } }, v.value === true ? l("palette#" + e3, { onClick: () => {
      O(e3);
    } }) : {}));
    return [h("div", { class: "row items-center q-color-picker__palette-rows" + (v.value === true ? " q-color-picker__palette-rows--editable" : "") }, k.value.map(e2))];
  }
  return () => {
    const t2 = [A()];
    return e.name !== void 0 && e.disable !== true && b(t2, "push"), e.noHeader !== true && t2.unshift(V()), e.noFooter !== true && t2.push(I()), h("div", __spreadValues({ class: _.value }, q.value), t2);
  };
} });
const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
function toJalaali(e, t, o) {
  return Object.prototype.toString.call(e) === "[object Date]" && (o = e.getDate(), t = e.getMonth() + 1, e = e.getFullYear()), d2j(g2d(e, t, o));
}
function toGregorian(e, t, o) {
  return d2g(j2d(e, t, o));
}
function isLeapJalaaliYear(e) {
  return jalCalLeap(e) === 0;
}
function jalaaliMonthLength(e, t) {
  return t <= 6 ? 31 : t <= 11 ? 30 : isLeapJalaaliYear(e) ? 30 : 29;
}
function jalCalLeap(e) {
  const t = breaks.length;
  let o, n, a, l, i, r = breaks[0];
  if (e < r || e >= breaks[t - 1])
    throw new Error("Invalid Jalaali year " + e);
  for (i = 1; i < t; i += 1) {
    if (o = breaks[i], n = o - r, e < o)
      break;
    r = o;
  }
  return l = e - r, n - l < 6 && (l = l - n + 33 * div(n + 4, 33)), a = mod(mod(l + 1, 33) - 1, 4), a === -1 && (a = 4), a;
}
function jalCal(e, t) {
  const o = breaks.length, n = e + 621;
  let a, l, i, r, s, u = -14, c = breaks[0];
  if (e < c || e >= breaks[o - 1])
    throw new Error("Invalid Jalaali year " + e);
  for (s = 1; s < o; s += 1) {
    if (a = breaks[s], l = a - c, e < a)
      break;
    u = u + 8 * div(l, 33) + div(mod(l, 33), 4), c = a;
  }
  r = e - c, u = u + 8 * div(r, 33) + div(mod(r, 33) + 3, 4), mod(l, 33) === 4 && l - r === 4 && (u += 1);
  const d = div(n, 4) - div(3 * (div(n, 100) + 1), 4) - 150, p2 = 20 + u - d;
  return t || (l - r < 6 && (r = r - l + 33 * div(l + 4, 33)), i = mod(mod(r + 1, 33) - 1, 4), i === -1 && (i = 4)), { leap: i, gy: n, march: p2 };
}
function j2d(e, t, o) {
  const n = jalCal(e, true);
  return g2d(n.gy, 3, n.march) + 31 * (t - 1) - div(t, 7) * (t - 7) + o - 1;
}
function d2j(e) {
  const t = d2g(e).gy;
  let o, n, a, l = t - 621;
  const i = jalCal(l, false), r = g2d(t, 3, i.march);
  if (a = e - r, a >= 0) {
    if (a <= 185)
      return n = 1 + div(a, 31), o = mod(a, 31) + 1, { jy: l, jm: n, jd: o };
    a -= 186;
  } else
    l -= 1, a += 179, i.leap === 1 && (a += 1);
  return n = 7 + div(a, 30), o = mod(a, 30) + 1, { jy: l, jm: n, jd: o };
}
function g2d(e, t, o) {
  let n = div(1461 * (e + div(t - 8, 6) + 100100), 4) + div(153 * mod(t + 9, 12) + 2, 5) + o - 34840408;
  return n = n - div(3 * div(e + 100100 + div(t - 8, 6), 100), 4) + 752, n;
}
function d2g(e) {
  let t = 4 * e + 139361631;
  t = t + 4 * div(3 * div(4 * e + 183187720, 146097), 4) - 3908;
  const o = 5 * div(mod(t, 1461), 4) + 308, n = div(mod(o, 153), 5) + 1, a = mod(div(o, 153), 12) + 1, l = div(t, 1461) - 100100 + div(8 - a, 6);
  return { gy: l, gm: a, gd: n };
}
function div(e, t) {
  return ~~(e / t);
}
function mod(e, t) {
  return e - ~~(e / t) * t;
}
const calendars = ["gregorian", "persian"], useDatetimeProps = { modelValue: { required: true }, mask: { type: String }, locale: Object, calendar: { type: String, validator: (e) => calendars.includes(e), default: "gregorian" }, landscape: Boolean, color: String, textColor: String, square: Boolean, flat: Boolean, bordered: Boolean, readonly: Boolean, disable: Boolean }, useDatetimeEmits = ["update:modelValue"];
function getDayHash(e) {
  return e.year + "/" + pad(e.month) + "/" + pad(e.day);
}
function useDatetime(e, t) {
  const o = computed(() => {
    return e.disable !== true && e.readonly !== true;
  }), n = computed(() => {
    return e.editable === true ? 0 : -1;
  }), a = computed(() => {
    const t2 = [];
    return e.color !== void 0 && t2.push(`bg-${e.color}`), e.textColor !== void 0 && t2.push(`text-${e.textColor}`), t2.join(" ");
  });
  function l() {
    return e.locale || t.lang.date;
  }
  function i(t2) {
    const o2 = new Date(), n2 = t2 === true ? null : 0;
    if (e.calendar === "persian") {
      const e2 = toJalaali(o2);
      return { year: e2.jy, month: e2.jm, day: e2.jd };
    }
    return { year: o2.getFullYear(), month: o2.getMonth() + 1, day: o2.getDate(), hour: n2, minute: n2, second: n2, millisecond: n2 };
  }
  return { editable: o, tabindex: n, headerClass: a, getLocale: l, getCurrentDate: i };
}
const MILLISECONDS_IN_DAY = 864e5, MILLISECONDS_IN_HOUR = 36e5, MILLISECONDS_IN_MINUTE = 6e4, defaultMask = "YYYY-MM-DDTHH:mm:ss.SSSZ", token = /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, reverseToken = /(\[[^\]]*\])|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, regexStore = {};
function getRegexData(e, t) {
  const o = "(" + t.days.join("|") + ")", n = e + o;
  if (regexStore[n] !== void 0)
    return regexStore[n];
  const a = "(" + t.daysShort.join("|") + ")", l = "(" + t.months.join("|") + ")", i = "(" + t.monthsShort.join("|") + ")", r = {};
  let s = 0;
  const u = e.replace(reverseToken, (e2) => {
    switch (s++, e2) {
      case "YY":
        return r.YY = s, "(-?\\d{1,2})";
      case "YYYY":
        return r.YYYY = s, "(-?\\d{1,4})";
      case "M":
        return r.M = s, "(\\d{1,2})";
      case "MM":
        return r.M = s, "(\\d{2})";
      case "MMM":
        return r.MMM = s, i;
      case "MMMM":
        return r.MMMM = s, l;
      case "D":
        return r.D = s, "(\\d{1,2})";
      case "Do":
        return r.D = s++, "(\\d{1,2}(st|nd|rd|th))";
      case "DD":
        return r.D = s, "(\\d{2})";
      case "H":
        return r.H = s, "(\\d{1,2})";
      case "HH":
        return r.H = s, "(\\d{2})";
      case "h":
        return r.h = s, "(\\d{1,2})";
      case "hh":
        return r.h = s, "(\\d{2})";
      case "m":
        return r.m = s, "(\\d{1,2})";
      case "mm":
        return r.m = s, "(\\d{2})";
      case "s":
        return r.s = s, "(\\d{1,2})";
      case "ss":
        return r.s = s, "(\\d{2})";
      case "S":
        return r.S = s, "(\\d{1})";
      case "SS":
        return r.S = s, "(\\d{2})";
      case "SSS":
        return r.S = s, "(\\d{3})";
      case "A":
        return r.A = s, "(AM|PM)";
      case "a":
        return r.a = s, "(am|pm)";
      case "aa":
        return r.aa = s, "(a\\.m\\.|p\\.m\\.)";
      case "ddd":
        return a;
      case "dddd":
        return o;
      case "Q":
      case "d":
      case "E":
        return "(\\d{1})";
      case "Qo":
        return "(1st|2nd|3rd|4th)";
      case "DDD":
      case "DDDD":
        return "(\\d{1,3})";
      case "w":
        return "(\\d{1,2})";
      case "ww":
        return "(\\d{2})";
      case "Z":
        return r.Z = s, "(Z|[+-]\\d{2}:\\d{2})";
      case "ZZ":
        return r.ZZ = s, "(Z|[+-]\\d{2}\\d{2})";
      case "X":
        return r.X = s, "(-?\\d+)";
      case "x":
        return r.x = s, "(-?\\d{4,})";
      default:
        return s--, e2[0] === "[" && (e2 = e2.substring(1, e2.length - 1)), e2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  }), c = { map: r, regex: new RegExp("^" + u) };
  return regexStore[n] = c, c;
}
function getDateLocale(e, t) {
  return e !== void 0 ? e : t !== void 0 ? t.date : defaultLang.date;
}
function formatTimezone(e, t = "") {
  const o = e > 0 ? "-" : "+", n = Math.abs(e), a = Math.floor(n / 60), l = n % 60;
  return o + pad(a) + t + pad(l);
}
function __splitDate(e, t, o, n, a) {
  const l = { year: null, month: null, day: null, hour: null, minute: null, second: null, millisecond: null, timezoneOffset: null, dateHash: null, timeHash: null };
  if (a !== void 0 && Object.assign(l, a), e === void 0 || e === null || e === "" || typeof e !== "string")
    return l;
  t === void 0 && (t = defaultMask);
  const i = getDateLocale(o, Plugin$7.props), r = i.months, s = i.monthsShort, { regex: u, map: c } = getRegexData(t, i), d = e.match(u);
  if (d === null)
    return l;
  let p2 = "";
  if (c.X !== void 0 || c.x !== void 0) {
    const e2 = parseInt(d[c.X !== void 0 ? c.X : c.x], 10);
    if (isNaN(e2) === true || e2 < 0)
      return l;
    const t2 = new Date(e2 * (c.X !== void 0 ? 1e3 : 1));
    l.year = t2.getFullYear(), l.month = t2.getMonth() + 1, l.day = t2.getDate(), l.hour = t2.getHours(), l.minute = t2.getMinutes(), l.second = t2.getSeconds(), l.millisecond = t2.getMilliseconds();
  } else {
    if (c.YYYY !== void 0)
      l.year = parseInt(d[c.YYYY], 10);
    else if (c.YY !== void 0) {
      const e2 = parseInt(d[c.YY], 10);
      l.year = e2 < 0 ? e2 : 2e3 + e2;
    }
    if (c.M !== void 0) {
      if (l.month = parseInt(d[c.M], 10), l.month < 1 || l.month > 12)
        return l;
    } else
      c.MMM !== void 0 ? l.month = s.indexOf(d[c.MMM]) + 1 : c.MMMM !== void 0 && (l.month = r.indexOf(d[c.MMMM]) + 1);
    if (c.D !== void 0) {
      if (l.day = parseInt(d[c.D], 10), l.year === null || l.month === null || l.day < 1)
        return l;
      const e2 = n !== "persian" ? new Date(l.year, l.month, 0).getDate() : jalaaliMonthLength(l.year, l.month);
      if (l.day > e2)
        return l;
    }
    c.H !== void 0 ? l.hour = parseInt(d[c.H], 10) % 24 : c.h !== void 0 && (l.hour = parseInt(d[c.h], 10) % 12, (c.A && d[c.A] === "PM" || c.a && d[c.a] === "pm" || c.aa && d[c.aa] === "p.m.") && (l.hour += 12), l.hour = l.hour % 24), c.m !== void 0 && (l.minute = parseInt(d[c.m], 10) % 60), c.s !== void 0 && (l.second = parseInt(d[c.s], 10) % 60), c.S !== void 0 && (l.millisecond = parseInt(d[c.S], 10) * 10 ** (3 - d[c.S].length)), c.Z === void 0 && c.ZZ === void 0 || (p2 = c.Z !== void 0 ? d[c.Z].replace(":", "") : d[c.ZZ], l.timezoneOffset = (p2[0] === "+" ? -1 : 1) * (60 * p2.slice(1, 3) + 1 * p2.slice(3, 5)));
  }
  return l.dateHash = l.year + "/" + pad(l.month) + "/" + pad(l.day), l.timeHash = pad(l.hour) + ":" + pad(l.minute) + ":" + pad(l.second) + p2, l;
}
function getWeekOfYear(e) {
  const t = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  t.setDate(t.getDate() - (t.getDay() + 6) % 7 + 3);
  const o = new Date(t.getFullYear(), 0, 4);
  o.setDate(o.getDate() - (o.getDay() + 6) % 7 + 3);
  const n = t.getTimezoneOffset() - o.getTimezoneOffset();
  t.setHours(t.getHours() - n);
  const a = (t - o) / (7 * MILLISECONDS_IN_DAY);
  return 1 + Math.floor(a);
}
function startOfDate(e, t, o) {
  const n = new Date(e), a = `set${o === true ? "UTC" : ""}`;
  switch (t) {
    case "year":
      n[`${a}Month`](0);
    case "month":
      n[`${a}Date`](1);
    case "day":
      n[`${a}Hours`](0);
    case "hour":
      n[`${a}Minutes`](0);
    case "minute":
      n[`${a}Seconds`](0);
    case "second":
      n[`${a}Milliseconds`](0);
  }
  return n;
}
function getDiff(e, t, o) {
  return (e.getTime() - e.getTimezoneOffset() * MILLISECONDS_IN_MINUTE - (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)) / o;
}
function getDateDiff(e, t, o = "days") {
  const n = new Date(e), a = new Date(t);
  switch (o) {
    case "years":
      return n.getFullYear() - a.getFullYear();
    case "months":
      return 12 * (n.getFullYear() - a.getFullYear()) + n.getMonth() - a.getMonth();
    case "days":
      return getDiff(startOfDate(n, "day"), startOfDate(a, "day"), MILLISECONDS_IN_DAY);
    case "hours":
      return getDiff(startOfDate(n, "hour"), startOfDate(a, "hour"), MILLISECONDS_IN_HOUR);
    case "minutes":
      return getDiff(startOfDate(n, "minute"), startOfDate(a, "minute"), MILLISECONDS_IN_MINUTE);
    case "seconds":
      return getDiff(startOfDate(n, "second"), startOfDate(a, "second"), 1e3);
  }
}
function getDayOfYear(e) {
  return getDateDiff(e, startOfDate(e, "year"), "days") + 1;
}
function getOrdinal(e) {
  if (e >= 11 && e <= 13)
    return `${e}th`;
  switch (e % 10) {
    case 1:
      return `${e}st`;
    case 2:
      return `${e}nd`;
    case 3:
      return `${e}rd`;
  }
  return `${e}th`;
}
const formatter = { YY(e, t, o) {
  const n = this.YYYY(e, t, o) % 100;
  return n > 0 ? pad(n) : "-" + pad(Math.abs(n));
}, YYYY(e, t, o) {
  return o !== void 0 && o !== null ? o : e.getFullYear();
}, M(e) {
  return e.getMonth() + 1;
}, MM(e) {
  return pad(e.getMonth() + 1);
}, MMM(e, t) {
  return t.monthsShort[e.getMonth()];
}, MMMM(e, t) {
  return t.months[e.getMonth()];
}, Q(e) {
  return Math.ceil((e.getMonth() + 1) / 3);
}, Qo(e) {
  return getOrdinal(this.Q(e));
}, D(e) {
  return e.getDate();
}, Do(e) {
  return getOrdinal(e.getDate());
}, DD(e) {
  return pad(e.getDate());
}, DDD(e) {
  return getDayOfYear(e);
}, DDDD(e) {
  return pad(getDayOfYear(e), 3);
}, d(e) {
  return e.getDay();
}, dd(e, t) {
  return this.dddd(e, t).slice(0, 2);
}, ddd(e, t) {
  return t.daysShort[e.getDay()];
}, dddd(e, t) {
  return t.days[e.getDay()];
}, E(e) {
  return e.getDay() || 7;
}, w(e) {
  return getWeekOfYear(e);
}, ww(e) {
  return pad(getWeekOfYear(e));
}, H(e) {
  return e.getHours();
}, HH(e) {
  return pad(e.getHours());
}, h(e) {
  const t = e.getHours();
  return t === 0 ? 12 : t > 12 ? t % 12 : t;
}, hh(e) {
  return pad(this.h(e));
}, m(e) {
  return e.getMinutes();
}, mm(e) {
  return pad(e.getMinutes());
}, s(e) {
  return e.getSeconds();
}, ss(e) {
  return pad(e.getSeconds());
}, S(e) {
  return Math.floor(e.getMilliseconds() / 100);
}, SS(e) {
  return pad(Math.floor(e.getMilliseconds() / 10));
}, SSS(e) {
  return pad(e.getMilliseconds(), 3);
}, A(e) {
  return this.H(e) < 12 ? "AM" : "PM";
}, a(e) {
  return this.H(e) < 12 ? "am" : "pm";
}, aa(e) {
  return this.H(e) < 12 ? "a.m." : "p.m.";
}, Z(e, t, o, n) {
  const a = n === void 0 || n === null ? e.getTimezoneOffset() : n;
  return formatTimezone(a, ":");
}, ZZ(e, t, o, n) {
  const a = n === void 0 || n === null ? e.getTimezoneOffset() : n;
  return formatTimezone(a);
}, X(e) {
  return Math.floor(e.getTime() / 1e3);
}, x(e) {
  return e.getTime();
} };
function formatDate(e, t, o, n, a) {
  if (e !== 0 && !e || e === 1 / 0 || e === -1 / 0)
    return;
  const l = new Date(e);
  if (isNaN(l))
    return;
  t === void 0 && (t = defaultMask);
  const i = getDateLocale(o, Plugin$7.props);
  return t.replace(token, (e2, t2) => e2 in formatter ? formatter[e2](l, i, n, a) : t2 === void 0 ? e2 : t2.split("\\]").join("]"));
}
const yearsInterval = 20, views = ["Calendar", "Years", "Months"], viewIsValid = (e) => views.includes(e), yearMonthValidator = (e) => /^-?[\d]+\/[0-1]\d$/.test(e), lineStr = " \u2014 ";
function getMonthHash(e) {
  return e.year + "/" + pad(e.month);
}
var QDate = defineComponent({ name: "QDate", props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useDatetimeProps), useFormProps$1), useDarkProps$1), { multiple: Boolean, range: Boolean, title: String, subtitle: String, mask: { default: "YYYY/MM/DD" }, defaultYearMonth: { type: String, validator: yearMonthValidator }, yearsInMonthView: Boolean, events: [Array, Function], eventColor: [String, Function], emitImmediately: Boolean, options: [Array, Function], navigationMinYearMonth: { type: String, validator: yearMonthValidator }, navigationMaxYearMonth: { type: String, validator: yearMonthValidator }, noUnset: Boolean, firstDayOfWeek: [String, Number], todayBtn: Boolean, minimal: Boolean, defaultView: { type: String, default: "Calendar", validator: viewIsValid } }), emits: [...useDatetimeEmits, "range-start", "range-end", "navigation"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = useDark$1(e, a), { getCache: i } = useCache(), { tabindex: r, headerClass: s, getLocale: u, getCurrentDate: c } = useDatetime(e, a);
  let d;
  const p2 = useFormAttrs(e), v = useFormInject(p2), m = ref(null), f = ref(de()), g = ref(u()), b = computed(() => de()), y = computed(() => u()), S = computed(() => c()), w = ref(ve(f.value, g.value)), x = ref(e.defaultView), C = a.lang.rtl === true ? "right" : "left", k = ref(C.value), _ = ref(C.value), q = w.value.year, T = ref(q - q % yearsInterval - (q < 0 ? yearsInterval : 0)), P = ref(null), $ = computed(() => {
    const t2 = e.landscape === true ? "landscape" : "portrait";
    return `q-date q-date--${t2} q-date--${t2}-${e.minimal === true ? "minimal" : "standard"}` + (l.value === true ? " q-date--dark q-dark" : "") + (e.bordered === true ? " q-date--bordered" : "") + (e.square === true ? " q-date--square no-border-radius" : "") + (e.flat === true ? " q-date--flat no-shadow" : "") + (e.disable === true ? " disabled" : e.readonly === true ? " q-date--readonly" : "");
  }), M = computed(() => {
    return e.color || "primary";
  }), B = computed(() => {
    return e.textColor || "white";
  }), Q = computed(() => e.emitImmediately === true && e.multiple !== true && e.range !== true), E = computed(() => Array.isArray(e.modelValue) === true ? e.modelValue : e.modelValue !== null && e.modelValue !== void 0 ? [e.modelValue] : []), O = computed(() => E.value.filter((e2) => typeof e2 === "string").map((e2) => pe(e2, f.value, g.value)).filter((e2) => e2.dateHash !== null)), L = computed(() => {
    const e2 = (e3) => pe(e3, f.value, g.value);
    return E.value.filter((e3) => Object(e3) === e3 && e3.from !== void 0 && e3.to !== void 0).map((t2) => ({ from: e2(t2.from), to: e2(t2.to) })).filter((e3) => e3.from.dateHash !== null && e3.to.dateHash !== null && e3.from.dateHash < e3.to.dateHash);
  }), z = computed(() => e.calendar !== "persian" ? (e2) => new Date(e2.year, e2.month - 1, e2.day) : (e2) => {
    const t2 = toGregorian(e2.year, e2.month, e2.day);
    return new Date(t2.gy, t2.gm - 1, t2.gd);
  }), F = computed(() => e.calendar === "persian" ? getDayHash : (e2, t2, o2) => formatDate(new Date(e2.year, e2.month - 1, e2.day, e2.hour, e2.minute, e2.second, e2.millisecond), t2 === void 0 ? f.value : t2, o2 === void 0 ? g.value : o2, e2.year, e2.timezoneOffset)), R = computed(() => O.value.length + L.value.reduce((e2, t2) => e2 + 1 + getDateDiff(z.value(t2.to), z.value(t2.from)), 0)), D = computed(() => {
    if (e.title !== void 0 && e.title !== null && e.title.length > 0)
      return e.title;
    if (P.value !== null) {
      const e2 = P.value.init, t3 = z.value(e2);
      return g.value.daysShort[t3.getDay()] + ", " + g.value.monthsShort[e2.month - 1] + " " + e2.day + lineStr + "?";
    }
    if (R.value === 0)
      return lineStr;
    if (R.value > 1)
      return `${R.value} ${g.value.pluralDay}`;
    const t2 = O.value[0], o2 = z.value(t2);
    return isNaN(o2.valueOf()) === true ? lineStr : g.value.headerTitle !== void 0 ? g.value.headerTitle(o2, t2) : g.value.daysShort[o2.getDay()] + ", " + g.value.monthsShort[t2.month - 1] + " " + t2.day;
  }), V = computed(() => {
    const e2 = O.value.concat(L.value.map((e3) => e3.from)).sort((e3, t2) => e3.year - t2.year || e3.month - t2.month);
    return e2[0];
  }), A = computed(() => {
    const e2 = O.value.concat(L.value.map((e3) => e3.to)).sort((e3, t2) => t2.year - e3.year || t2.month - e3.month);
    return e2[0];
  }), I = computed(() => {
    if (e.subtitle !== void 0 && e.subtitle !== null && e.subtitle.length > 0)
      return e.subtitle;
    if (R.value === 0)
      return lineStr;
    if (R.value > 1) {
      const e2 = V.value, t2 = A.value, o2 = g.value.monthsShort;
      return o2[e2.month - 1] + (e2.year !== t2.year ? " " + e2.year + lineStr + o2[t2.month - 1] + " " : e2.month !== t2.month ? lineStr + o2[t2.month - 1] : "") + " " + t2.year;
    }
    return O.value[0].year;
  }), H = computed(() => {
    const e2 = [a.iconSet.datetime.arrowLeft, a.iconSet.datetime.arrowRight];
    return a.lang.rtl === true ? e2.reverse() : e2;
  }), N = computed(() => e.firstDayOfWeek !== void 0 ? Number(e.firstDayOfWeek) : g.value.firstDayOfWeek), j = computed(() => {
    const e2 = g.value.daysShort, t2 = N.value;
    return t2 > 0 ? e2.slice(t2, 7).concat(e2.slice(0, t2)) : e2;
  }), U = computed(() => {
    const t2 = w.value;
    return e.calendar !== "persian" ? new Date(t2.year, t2.month, 0).getDate() : jalaaliMonthLength(t2.year, t2.month);
  }), K = computed(() => typeof e.eventColor === "function" ? e.eventColor : () => e.eventColor), W = computed(() => {
    if (e.navigationMinYearMonth === void 0)
      return null;
    const t2 = e.navigationMinYearMonth.split("/");
    return { year: parseInt(t2[0], 10), month: parseInt(t2[1], 10) };
  }), Y = computed(() => {
    if (e.navigationMaxYearMonth === void 0)
      return null;
    const t2 = e.navigationMaxYearMonth.split("/");
    return { year: parseInt(t2[0], 10), month: parseInt(t2[1], 10) };
  }), G = computed(() => {
    const e2 = { month: { prev: true, next: true }, year: { prev: true, next: true } };
    return W.value !== null && W.value.year >= w.value.year && (e2.year.prev = false, W.value.year === w.value.year && W.value.month >= w.value.month && (e2.month.prev = false)), Y.value !== null && Y.value.year <= w.value.year && (e2.year.next = false, Y.value.year === w.value.year && Y.value.month <= w.value.month && (e2.month.next = false)), e2;
  }), X = computed(() => {
    const e2 = {};
    return O.value.forEach((t2) => {
      const o2 = getMonthHash(t2);
      e2[o2] === void 0 && (e2[o2] = []), e2[o2].push(t2.day);
    }), e2;
  }), Z = computed(() => {
    const e2 = {};
    return L.value.forEach((t2) => {
      const o2 = getMonthHash(t2.from), n2 = getMonthHash(t2.to);
      if (e2[o2] === void 0 && (e2[o2] = []), e2[o2].push({ from: t2.from.day, to: o2 === n2 ? t2.to.day : void 0, range: t2 }), o2 < n2) {
        let o3;
        const { year: a2, month: l2 } = t2.from, i2 = l2 < 12 ? { year: a2, month: l2 + 1 } : { year: a2 + 1, month: 1 };
        while ((o3 = getMonthHash(i2)) <= n2)
          e2[o3] === void 0 && (e2[o3] = []), e2[o3].push({ from: void 0, to: o3 === n2 ? t2.to.day : void 0, range: t2 }), i2.month++, i2.month > 12 && (i2.year++, i2.month = 1);
      }
    }), e2;
  }), J = computed(() => {
    if (P.value === null)
      return;
    const { init: e2, initHash: t2, final: o2, finalHash: n2 } = P.value, [a2, l2] = t2 <= n2 ? [e2, o2] : [o2, e2], i2 = getMonthHash(a2), r2 = getMonthHash(l2);
    if (i2 !== ee.value && r2 !== ee.value)
      return;
    const s2 = {};
    return i2 === ee.value ? (s2.from = a2.day, s2.includeFrom = true) : s2.from = 1, r2 === ee.value ? (s2.to = l2.day, s2.includeTo = true) : s2.to = U.value, s2;
  }), ee = computed(() => getMonthHash(w.value)), te = computed(() => {
    const t2 = {};
    if (e.options === void 0) {
      for (let e2 = 1; e2 <= U.value; e2++)
        t2[e2] = true;
      return t2;
    }
    const o2 = typeof e.options === "function" ? e.options : (t3) => e.options.includes(t3);
    for (let e2 = 1; e2 <= U.value; e2++) {
      const n2 = ee.value + "/" + pad(e2);
      t2[e2] = o2(n2);
    }
    return t2;
  }), oe = computed(() => {
    const t2 = {};
    if (e.events === void 0)
      for (let e2 = 1; e2 <= U.value; e2++)
        t2[e2] = false;
    else {
      const o2 = typeof e.events === "function" ? e.events : (t3) => e.events.includes(t3);
      for (let e2 = 1; e2 <= U.value; e2++) {
        const n2 = ee.value + "/" + pad(e2);
        t2[e2] = o2(n2) === true && K.value(n2);
      }
    }
    return t2;
  }), ne = computed(() => {
    let t2, o2;
    const { year: n2, month: a2 } = w.value;
    if (e.calendar !== "persian")
      t2 = new Date(n2, a2 - 1, 1), o2 = new Date(n2, a2 - 1, 0).getDate();
    else {
      const e2 = toGregorian(n2, a2, 1);
      t2 = new Date(e2.gy, e2.gm - 1, e2.gd);
      let l2 = a2 - 1, i2 = n2;
      l2 === 0 && (l2 = 12, i2--), o2 = jalaaliMonthLength(i2, l2);
    }
    return { days: t2.getDay() - N.value - 1, endDay: o2 };
  }), ae = computed(() => {
    const e2 = [], { days: t2, endDay: o2 } = ne.value, n2 = t2 < 0 ? t2 + 7 : t2;
    if (n2 < 6)
      for (let i2 = o2 - n2; i2 <= o2; i2++)
        e2.push({ i: i2, fill: true });
    const a2 = e2.length;
    for (let i2 = 1; i2 <= U.value; i2++) {
      const t3 = { i: i2, event: oe.value[i2], classes: [] };
      te.value[i2] === true && (t3.in = true, t3.flat = true), e2.push(t3);
    }
    if (X.value[ee.value] !== void 0 && X.value[ee.value].forEach((t3) => {
      const o3 = a2 + t3 - 1;
      Object.assign(e2[o3], { selected: true, unelevated: true, flat: false, color: M.value, textColor: B.value });
    }), Z.value[ee.value] !== void 0 && Z.value[ee.value].forEach((t3) => {
      if (t3.from !== void 0) {
        const o3 = a2 + t3.from - 1, n3 = a2 + (t3.to || U.value) - 1;
        for (let a3 = o3; a3 <= n3; a3++)
          Object.assign(e2[a3], { range: t3.range, unelevated: true, color: M.value, textColor: B.value });
        Object.assign(e2[o3], { rangeFrom: true, flat: false }), t3.to !== void 0 && Object.assign(e2[n3], { rangeTo: true, flat: false });
      } else if (t3.to !== void 0) {
        const o3 = a2 + t3.to - 1;
        for (let n3 = a2; n3 <= o3; n3++)
          Object.assign(e2[n3], { range: t3.range, unelevated: true, color: M.value, textColor: B.value });
        Object.assign(e2[o3], { flat: false, rangeTo: true });
      } else {
        const o3 = a2 + U.value - 1;
        for (let n3 = a2; n3 <= o3; n3++)
          Object.assign(e2[n3], { range: t3.range, unelevated: true, color: M.value, textColor: B.value });
      }
    }), J.value !== void 0) {
      const t3 = a2 + J.value.from - 1, o3 = a2 + J.value.to - 1;
      for (let n3 = t3; n3 <= o3; n3++)
        e2[n3].color = M.value, e2[n3].editRange = true;
      J.value.includeFrom === true && (e2[t3].editRangeFrom = true), J.value.includeTo === true && (e2[o3].editRangeTo = true);
    }
    w.value.year === S.value.year && w.value.month === S.value.month && (e2[a2 + S.value.day - 1].today = true);
    const l2 = e2.length % 7;
    if (l2 > 0) {
      const t3 = 7 - l2;
      for (let o3 = 1; o3 <= t3; o3++)
        e2.push({ i: o3, fill: true });
    }
    return e2.forEach((e3) => {
      let t3 = "q-date__calendar-item ";
      e3.fill === true ? t3 += "q-date__calendar-item--fill" : (t3 += `q-date__calendar-item--${e3.in === true ? "in" : "out"}`, e3.range !== void 0 && (t3 += ` q-date__range${e3.rangeTo === true ? "-to" : e3.rangeFrom === true ? "-from" : ""}`), e3.editRange === true && (t3 += ` q-date__edit-range${e3.editRangeFrom === true ? "-from" : ""}${e3.editRangeTo === true ? "-to" : ""}`), e3.range === void 0 && e3.editRange !== true || (t3 += ` text-${e3.color}`)), e3.classes = t3;
    }), e2;
  }), le = computed(() => e.disable === true ? { "aria-disabled": "true" } : e.readonly === true ? { "aria-readonly": "true" } : {});
  function ie() {
    const e2 = S.value, t2 = X.value[getMonthHash(e2)];
    t2 !== void 0 && t2.includes(e2.day) !== false || qe(e2), ue(e2.year, e2.month);
  }
  function re(e2) {
    viewIsValid(e2) === true && (x.value = e2);
  }
  function se(e2, t2) {
    if (["month", "year"].includes(e2)) {
      const o2 = e2 === "month" ? fe : he;
      o2(t2 === true ? -1 : 1);
    }
  }
  function ue(e2, t2) {
    x.value = "Calendar", we(e2, t2);
  }
  function ce(t2, o2) {
    if (e.range === false || !t2)
      return void (P.value = null);
    const n2 = Object.assign(__spreadValues({}, w.value), t2), a2 = o2 !== void 0 ? Object.assign(__spreadValues({}, w.value), o2) : n2;
    P.value = { init: n2, initHash: getDayHash(n2), final: a2, finalHash: getDayHash(a2) }, ue(n2.year, n2.month);
  }
  function de() {
    return e.calendar === "persian" ? "YYYY/MM/DD" : e.mask;
  }
  function pe(t2, o2, n2) {
    return __splitDate(t2, o2, n2, e.calendar, { hour: 0, minute: 0, second: 0, millisecond: 0 });
  }
  function ve(t2, o2) {
    const n2 = Array.isArray(e.modelValue) === true ? e.modelValue : e.modelValue ? [e.modelValue] : [];
    if (n2.length === 0)
      return me();
    const a2 = pe(n2[0].from !== void 0 ? n2[0].from : n2[0], t2, o2);
    return a2.dateHash === null ? me() : a2;
  }
  function me() {
    let t2, o2;
    if (e.defaultYearMonth !== void 0) {
      const n2 = e.defaultYearMonth.split("/");
      t2 = parseInt(n2[0], 10), o2 = parseInt(n2[1], 10);
    } else {
      const e2 = S.value !== void 0 ? S.value : c();
      t2 = e2.year, o2 = e2.month;
    }
    return { year: t2, month: o2, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0, dateHash: t2 + "/" + pad(o2) + "/01" };
  }
  function fe(e2) {
    let t2 = w.value.year, o2 = Number(w.value.month) + e2;
    o2 === 13 ? (o2 = 1, t2++) : o2 === 0 && (o2 = 12, t2--), we(t2, o2), Q.value === true && Ce("month");
  }
  function he(e2) {
    const t2 = Number(w.value.year) + e2;
    we(t2, w.value.month), Q.value === true && Ce("year");
  }
  function ge(t2) {
    we(t2, w.value.month), x.value = e.defaultView === "Years" ? "Months" : "Calendar", Q.value === true && Ce("year");
  }
  function be(e2) {
    we(w.value.year, e2), x.value = "Calendar", Q.value === true && Ce("month");
  }
  function ye(e2, t2) {
    const o2 = X.value[t2], n2 = o2 !== void 0 && o2.includes(e2.day) === true ? Te : qe;
    n2(e2);
  }
  function Se(e2) {
    return { year: e2.year, month: e2.month, day: e2.day };
  }
  function we(e2, t2) {
    W.value !== null && e2 <= W.value.year && (e2 = W.value.year, t2 < W.value.month && (t2 = W.value.month)), Y.value !== null && e2 >= Y.value.year && (e2 = Y.value.year, t2 > Y.value.month && (t2 = Y.value.month));
    const o2 = e2 + "/" + pad(t2) + "/01";
    o2 !== w.value.dateHash && (k.value = w.value.dateHash < o2 === (a.lang.rtl !== true) ? "left" : "right", e2 !== w.value.year && (_.value = k.value), nextTick(() => {
      T.value = e2 - e2 % yearsInterval - (e2 < 0 ? yearsInterval : 0), Object.assign(w.value, { year: e2, month: t2, day: 1, dateHash: o2 });
    }));
  }
  function xe(t2, n2, a2) {
    const l2 = t2 !== null && t2.length === 1 && e.multiple === false ? t2[0] : t2;
    d = l2;
    const { reason: i2, details: r2 } = ke(n2, a2);
    o("update:modelValue", l2, i2, r2);
  }
  function Ce(t2) {
    const n2 = O.value[0] !== void 0 && O.value[0].dateHash !== null ? __spreadValues({}, O.value[0]) : __spreadValues({}, w.value);
    nextTick(() => {
      n2.year = w.value.year, n2.month = w.value.month;
      const a2 = e.calendar !== "persian" ? new Date(n2.year, n2.month, 0).getDate() : jalaaliMonthLength(n2.year, n2.month);
      n2.day = Math.min(Math.max(1, n2.day), a2);
      const l2 = _e(n2);
      d = l2;
      const { details: i2 } = ke("", n2);
      o("update:modelValue", l2, t2, i2);
    });
  }
  function ke(e2, t2) {
    return t2.from !== void 0 ? { reason: `${e2}-range`, details: __spreadProps(__spreadValues({}, Se(t2.target)), { from: Se(t2.from), to: Se(t2.to) }) } : { reason: `${e2}-day`, details: Se(t2) };
  }
  function _e(e2, t2, o2) {
    return e2.from !== void 0 ? { from: F.value(e2.from, t2, o2), to: F.value(e2.to, t2, o2) } : F.value(e2, t2, o2);
  }
  function qe(t2) {
    let o2;
    if (e.multiple === true)
      if (t2.from !== void 0) {
        const e2 = getDayHash(t2.from), n2 = getDayHash(t2.to), a2 = O.value.filter((t3) => t3.dateHash < e2 || t3.dateHash > n2), l2 = L.value.filter(({ from: t3, to: o3 }) => o3.dateHash < e2 || t3.dateHash > n2);
        o2 = a2.concat(l2).concat(t2).map((e3) => _e(e3));
      } else {
        const e2 = E.value.slice();
        e2.push(_e(t2)), o2 = e2;
      }
    else
      o2 = _e(t2);
    xe(o2, "add", t2);
  }
  function Te(t2) {
    if (e.noUnset === true)
      return;
    let o2 = null;
    if (e.multiple === true && Array.isArray(e.modelValue) === true) {
      const n2 = _e(t2);
      o2 = t2.from !== void 0 ? e.modelValue.filter((e2) => e2.from === void 0 || e2.from !== n2.from && e2.to !== n2.to) : e.modelValue.filter((e2) => e2 !== n2), o2.length === 0 && (o2 = null);
    }
    xe(o2, "remove", t2);
  }
  function Pe(t2, n2, a2) {
    const l2 = O.value.concat(L.value).map((e2) => _e(e2, t2, n2)).filter((e2) => {
      return e2.from !== void 0 ? e2.from.dateHash !== null && e2.to.dateHash !== null : e2.dateHash !== null;
    });
    o("update:modelValue", (e.multiple === true ? l2 : l2[0]) || null, a2);
  }
  function $e() {
    if (e.minimal !== true)
      return h("div", { class: "q-date__header " + s.value }, [h("div", { class: "relative-position" }, [h(Transition, { name: "q-transition--fade" }, () => h("div", __spreadValues({ key: "h-yr-" + I.value, class: "q-date__header-subtitle q-date__header-link " + (x.value === "Years" ? "q-date__header-link--active" : "cursor-pointer"), tabindex: r.value }, i("vY", { onClick() {
        x.value = "Years";
      }, onKeyup(e2) {
        e2.keyCode === 13 && (x.value = "Years");
      } })), [I.value]))]), h("div", { class: "q-date__header-title relative-position flex no-wrap" }, [h("div", { class: "relative-position col" }, [h(Transition, { name: "q-transition--fade" }, () => h("div", __spreadValues({ key: "h-sub" + D.value, class: "q-date__header-title-label q-date__header-link " + (x.value === "Calendar" ? "q-date__header-link--active" : "cursor-pointer"), tabindex: r.value }, i("vC", { onClick() {
        x.value = "Calendar";
      }, onKeyup(e2) {
        e2.keyCode === 13 && (x.value = "Calendar");
      } })), [D.value]))]), e.todayBtn === true ? h(QBtn, { class: "q-date__header-today self-start", icon: a.iconSet.datetime.today, flat: true, size: "sm", round: true, tabindex: r.value, onClick: ie }) : null])]);
  }
  function Me({ label: e2, type: t2, key: o2, dir: n2, goTo: a2, boundaries: l2, cls: s2 }) {
    return [h("div", { class: "row items-center q-date__arrow" }, [h(QBtn, __spreadValues({ round: true, dense: true, size: "sm", flat: true, icon: H.value[0], tabindex: r.value, disable: l2.prev === false }, i("go-#" + t2, { onClick() {
      a2(-1);
    } })))]), h("div", { class: "relative-position overflow-hidden flex flex-center" + s2 }, [h(Transition, { name: "q-transition--jump-" + n2 }, () => h("div", { key: o2 }, [h(QBtn, __spreadValues({ flat: true, dense: true, noCaps: true, label: e2, tabindex: r.value }, i("view#" + t2, { onClick: () => {
      x.value = t2;
    } })))]))]), h("div", { class: "row items-center q-date__arrow" }, [h(QBtn, __spreadValues({ round: true, dense: true, size: "sm", flat: true, icon: H.value[1], tabindex: r.value, disable: l2.next === false }, i("go+#" + t2, { onClick() {
      a2(1);
    } })))])];
  }
  watch(() => e.modelValue, (e2) => {
    if (d === e2)
      d = 0;
    else {
      const { year: e3, month: t2 } = ve(f.value, g.value);
      we(e3, t2);
    }
  }), watch(x, () => {
    m.value !== null && m.value.focus();
  }), watch(() => w.value.year, (e2) => {
    o("navigation", { year: e2, month: w.value.month });
  }), watch(() => w.value.month, (e2) => {
    o("navigation", { year: w.value.year, month: e2 });
  }), watch(b, (e2) => {
    Pe(e2, g.value, "mask"), f.value = e2;
  }), watch(y, (e2) => {
    Pe(f.value, e2, "locale"), g.value = e2;
  }), Object.assign(n, { setToday: ie, setView: re, offsetCalendar: se, setCalendarTo: ue, setEditingRange: ce });
  const Be = { Calendar: () => [h("div", { key: "calendar-view", class: "q-date__view q-date__calendar" }, [h("div", { class: "q-date__navigation row items-center no-wrap" }, Me({ label: g.value.months[w.value.month - 1], type: "Months", key: w.value.month, dir: k.value, goTo: fe, boundaries: G.value.month, cls: " col" }).concat(Me({ label: w.value.year, type: "Years", key: w.value.year, dir: _.value, goTo: he, boundaries: G.value.year, cls: "" }))), h("div", { class: "q-date__calendar-weekdays row items-center no-wrap" }, j.value.map((e2) => h("div", { class: "q-date__calendar-item" }, [h("div", e2)]))), h("div", { class: "q-date__calendar-days-container relative-position overflow-hidden" }, [h(Transition, { name: "q-transition--slide-" + k.value }, () => h("div", { key: ee.value, class: "q-date__calendar-days fit" }, ae.value.map((e2) => h("div", { class: e2.classes }, [e2.in === true ? h(QBtn, __spreadValues({ class: e2.today === true ? "q-date__today" : "", dense: true, flat: e2.flat, unelevated: e2.unelevated, color: e2.color, textColor: e2.textColor, label: e2.i, tabindex: r.value }, i("day#" + e2.i, { onClick: () => {
    Qe(e2.i);
  }, onMouseover: () => {
    Ee(e2.i);
  } })), e2.event !== false ? () => h("div", { class: "q-date__event bg-" + e2.event }) : null) : h("div", "" + e2.i)]))))])])], Months() {
    const t2 = w.value.year === S.value.year, o2 = (e2) => {
      return W.value !== null && w.value.year === W.value.year && W.value.month > e2 || Y.value !== null && w.value.year === Y.value.year && Y.value.month < e2;
    }, n2 = g.value.monthsShort.map((e2, n3) => {
      const a2 = w.value.month === n3 + 1;
      return h("div", { class: "q-date__months-item flex flex-center" }, [h(QBtn, __spreadValues({ class: t2 === true && S.value.month === n3 + 1 ? "q-date__today" : null, flat: a2 !== true, label: e2, unelevated: a2, color: a2 === true ? M.value : null, textColor: a2 === true ? B.value : null, tabindex: r.value, disable: o2(n3 + 1) }, i("month#" + n3, { onClick: () => {
        be(n3 + 1);
      } })))]);
    });
    return e.yearsInMonthView === true && n2.unshift(h("div", { class: "row no-wrap full-width" }, [Me({ label: w.value.year, type: "Years", key: w.value.year, dir: _.value, goTo: he, boundaries: G.value.year, cls: " col" })])), h("div", { key: "months-view", class: "q-date__view q-date__months flex flex-center" }, n2);
  }, Years() {
    const e2 = T.value, t2 = e2 + yearsInterval, o2 = [], n2 = (e3) => {
      return W.value !== null && W.value.year > e3 || Y.value !== null && Y.value.year < e3;
    };
    for (let a2 = e2; a2 <= t2; a2++) {
      const e3 = w.value.year === a2;
      o2.push(h("div", { class: "q-date__years-item flex flex-center" }, [h(QBtn, __spreadValues({ key: "yr" + a2, class: S.value.year === a2 ? "q-date__today" : null, flat: !e3, label: a2, dense: true, unelevated: e3, color: e3 === true ? M.value : null, textColor: e3 === true ? B.value : null, tabindex: r.value, disable: n2(a2) }, i("yr#" + a2, { onClick: () => {
        ge(a2);
      } })))]));
    }
    return h("div", { class: "q-date__view q-date__years flex flex-center" }, [h("div", { class: "col-auto" }, [h(QBtn, __spreadValues({ round: true, dense: true, flat: true, icon: H.value[0], tabindex: r.value, disable: n2(e2) }, i("y-", { onClick: () => {
      T.value -= yearsInterval;
    } })))]), h("div", { class: "q-date__years-content col self-stretch row items-center" }, o2), h("div", { class: "col-auto" }, [h(QBtn, __spreadValues({ round: true, dense: true, flat: true, icon: H.value[1], tabindex: r.value, disable: n2(t2) }, i("y+", { onClick: () => {
      T.value += yearsInterval;
    } })))])]);
  } };
  function Qe(t2) {
    const n2 = __spreadProps(__spreadValues({}, w.value), { day: t2 });
    if (e.range !== false)
      if (P.value === null) {
        const a2 = ae.value.find((e2) => e2.fill !== true && e2.i === t2);
        if (e.noUnset !== true && a2.range !== void 0)
          return void Te({ target: n2, from: a2.range.from, to: a2.range.to });
        if (a2.selected === true)
          return void Te(n2);
        const l2 = getDayHash(n2);
        P.value = { init: n2, initHash: l2, final: n2, finalHash: l2 }, o("range-start", Se(n2));
      } else {
        const e2 = P.value.initHash, t3 = getDayHash(n2), a2 = e2 <= t3 ? { from: P.value.init, to: n2 } : { from: n2, to: P.value.init };
        P.value = null, qe(e2 === t3 ? n2 : __spreadValues({ target: n2 }, a2)), o("range-end", { from: Se(a2.from), to: Se(a2.to) });
      }
    else
      ye(n2, ee.value);
  }
  function Ee(e2) {
    if (P.value !== null) {
      const t2 = __spreadProps(__spreadValues({}, w.value), { day: e2 });
      Object.assign(P.value, { final: t2, finalHash: getDayHash(t2) });
    }
  }
  return () => {
    const o2 = [h("div", { class: "q-date__content col relative-position" }, [h(Transition, { name: "q-transition--fade" }, Be[x.value])])], n2 = hSlot$1(t.default);
    return n2 !== void 0 && o2.push(h("div", { class: "q-date__actions" }, n2)), e.name !== void 0 && e.disable !== true && v(o2, "push"), h("div", __spreadValues({ class: $.value }, le.value), [$e(), h("div", { ref: m, class: "q-date__main col column", tabindex: -1 }, o2)]);
  };
} });
function useHistory(e, t, o) {
  let n;
  function a() {
    n !== void 0 && (History.remove(n), n = void 0);
  }
  return onBeforeUnmount(() => {
    e.value === true && a();
  }), { removeFromHistory: a, addToHistory() {
    n = { condition: () => o.value === true, handler: t }, History.add(n);
  } };
}
let scrollPositionX, scrollPositionY, maxScrollTop, bodyLeft, bodyTop, closeTimer, registered = 0, vpPendingUpdate = false;
function onWheel(e) {
  shouldPreventScroll(e) && stopAndPrevent$1(e);
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop"))
    return true;
  const t = getEventPath(e), o = e.shiftKey && !e.deltaX, n = !o && Math.abs(e.deltaX) <= Math.abs(e.deltaY), a = o || n ? e.deltaY : e.deltaX;
  for (let l = 0; l < t.length; l++) {
    const e2 = t[l];
    if (hasScrollbar(e2, n))
      return n ? a < 0 && e2.scrollTop === 0 || a > 0 && e2.scrollTop + e2.clientHeight === e2.scrollHeight : a < 0 && e2.scrollLeft === 0 || a > 0 && e2.scrollLeft + e2.clientWidth === e2.scrollWidth;
  }
  return true;
}
function onAppleScroll(e) {
  e.target === document && (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop);
}
function onAppleResize(e) {
  vpPendingUpdate !== true && (vpPendingUpdate = true, requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height: t } = e.target, { clientHeight: o, scrollTop: n } = document.scrollingElement;
    maxScrollTop !== void 0 && t === window.innerHeight || (maxScrollTop = o - t, document.scrollingElement.scrollTop = n), n > maxScrollTop && (document.scrollingElement.scrollTop -= Math.ceil((n - maxScrollTop) / 8));
  }));
}
function apply$1(e) {
  const t = document.body, o = window.visualViewport !== void 0;
  if (e === "add") {
    const { overflowY: e2, overflowX: n } = window.getComputedStyle(t);
    scrollPositionX = getHorizontalScrollPosition(window), scrollPositionY = getVerticalScrollPosition(window), bodyLeft = t.style.left, bodyTop = t.style.top, t.style.left = `-${scrollPositionX}px`, t.style.top = `-${scrollPositionY}px`, n !== "hidden" && (n === "scroll" || t.scrollWidth > window.innerWidth) && t.classList.add("q-body--force-scrollbar-x"), e2 !== "hidden" && (e2 === "scroll" || t.scrollHeight > window.innerHeight) && t.classList.add("q-body--force-scrollbar-y"), t.classList.add("q-body--prevent-scroll"), document.qScrollPrevented = true, client$1.is.ios === true && (o === true ? (window.scrollTo(0, 0), window.visualViewport.addEventListener("resize", onAppleResize, listenOpts$1.passiveCapture), window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts$1.passiveCapture), window.scrollTo(0, 0)) : window.addEventListener("scroll", onAppleScroll, listenOpts$1.passiveCapture));
  }
  client$1.is.desktop === true && client$1.is.mac === true && window[`${e}EventListener`]("wheel", onWheel, listenOpts$1.notPassive), e === "remove" && (client$1.is.ios === true && (o === true ? (window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts$1.passiveCapture), window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts$1.passiveCapture)) : window.removeEventListener("scroll", onAppleScroll, listenOpts$1.passiveCapture)), t.classList.remove("q-body--prevent-scroll"), t.classList.remove("q-body--force-scrollbar-x"), t.classList.remove("q-body--force-scrollbar-y"), document.qScrollPrevented = false, t.style.left = bodyLeft, t.style.top = bodyTop, window.scrollTo(scrollPositionX, scrollPositionY), maxScrollTop = void 0);
}
function preventScroll(e) {
  let t = "add";
  if (e === true) {
    if (registered++, closeTimer !== void 0)
      return clearTimeout(closeTimer), void (closeTimer = void 0);
    if (registered > 1)
      return;
  } else {
    if (registered === 0)
      return;
    if (registered--, registered > 0)
      return;
    if (t = "remove", client$1.is.ios === true && client$1.is.nativeMobile === true)
      return clearTimeout(closeTimer), void (closeTimer = setTimeout(() => {
        apply$1(t), closeTimer = void 0;
      }, 100));
  }
  apply$1(t);
}
function usePreventScroll() {
  let e;
  return { preventBodyScroll(t) {
    t === e || e === void 0 && t !== true || (e = t, preventScroll(t));
  } };
}
let maximizedModals = 0;
const positionClass$1 = { standard: "fixed-full flex-center", top: "fixed-top justify-center", bottom: "fixed-bottom justify-center", right: "fixed-right items-center", left: "fixed-left items-center" }, transitions = { standard: ["scale", "scale"], top: ["slide-down", "slide-up"], bottom: ["slide-up", "slide-down"], right: ["slide-left", "slide-right"], left: ["slide-right", "slide-left"] };
var QDialog = defineComponent({ name: "QDialog", inheritAttrs: false, props: __spreadProps(__spreadValues(__spreadValues({}, useModelToggleProps), useTransitionProps), { transitionShow: String, transitionHide: String, persistent: Boolean, autoClose: Boolean, noEscDismiss: Boolean, noBackdropDismiss: Boolean, noRouteDismiss: Boolean, noRefocus: Boolean, noFocus: Boolean, noShake: Boolean, seamless: Boolean, maximized: Boolean, fullWidth: Boolean, fullHeight: Boolean, square: Boolean, position: { type: String, default: "standard", validator: (e) => e === "standard" || ["top", "bottom", "left", "right"].includes(e) } }), emits: [...useModelToggleEmits, "shake", "click", "escape-key"], setup(e, { slots: t, emit: o, attrs: n }) {
  const a = getCurrentInstance(), l = ref(null), i = ref(false), r = ref(false), s = ref(false);
  let u, c, d, p2 = null;
  const v = computed(() => e.persistent !== true && e.noRouteDismiss !== true && e.seamless !== true), { preventBodyScroll: m } = usePreventScroll(), { registerTimeout: f, removeTimeout: g } = useTimeout(), { registerTick: b, removeTick: y, prepareTick: S } = useTick(), { showPortal: w, hidePortal: x, portalIsActive: C, renderPortal: k } = usePortal(a, l, U, true), { hide: _ } = useModelToggle({ showing: i, hideOnRouteChange: v, handleShow: z, handleHide: F, processOnMount: true }), { addToHistory: q, removeFromHistory: T } = useHistory(i, _, v), P = computed(() => `q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized === true ? "maximized" : "minimized"} q-dialog__inner--${e.position} ${positionClass$1[e.position]}` + (s.value === true ? " q-dialog__inner--animating" : "") + (e.fullWidth === true ? " q-dialog__inner--fullwidth" : "") + (e.fullHeight === true ? " q-dialog__inner--fullheight" : "") + (e.square === true ? " q-dialog__inner--square" : "")), $ = computed(() => "q-transition--" + (e.transitionShow === void 0 ? transitions[e.position][0] : e.transitionShow)), M = computed(() => "q-transition--" + (e.transitionHide === void 0 ? transitions[e.position][1] : e.transitionHide)), B = computed(() => r.value === true ? M.value : $.value), Q = computed(() => `--q-transition-duration: ${e.transitionDuration}ms`), E = computed(() => i.value === true && e.seamless !== true), O = computed(() => e.autoClose === true ? { onClick: H } : {}), L = computed(() => [`q-dialog fullscreen no-pointer-events q-dialog--${E.value === true ? "modal" : "seamless"}`, n.class]);
  function z(t2) {
    g(), y(), q(), p2 = e.noRefocus === false && document.activeElement !== null ? document.activeElement : null, I(e.maximized), w(), s.value = true, e.noFocus !== true && (document.activeElement !== null && document.activeElement.blur(), b(R), S()), f(() => {
      if (a.proxy.$q.platform.is.ios === true) {
        if (e.seamless !== true && document.activeElement) {
          const { top: e2, bottom: t3 } = document.activeElement.getBoundingClientRect(), { innerHeight: o2 } = window, n2 = window.visualViewport !== void 0 ? window.visualViewport.height : o2;
          e2 > 0 && t3 > n2 / 2 && (document.scrollingElement.scrollTop = Math.min(document.scrollingElement.scrollHeight - n2, t3 >= o2 ? 1 / 0 : Math.ceil(document.scrollingElement.scrollTop + t3 - n2 / 2))), document.activeElement.scrollIntoView();
        }
        d = true, l.value.click(), d = false;
      }
      w(true), s.value = false, o("show", t2);
    }, e.transitionDuration);
  }
  function F(t2) {
    g(), y(), T(), A(true), s.value = true, p2 !== null && p2.focus(), f(() => {
      x(), s.value = false, o("hide", t2);
    }, e.transitionDuration);
  }
  function R() {
    addFocusFn$1(() => {
      let e2 = l.value;
      e2 !== null && e2.contains(document.activeElement) !== true && (e2 = e2.querySelector("[autofocus], [data-autofocus]") || e2, e2.focus());
    });
  }
  function D() {
    R(), o("shake");
    const e2 = l.value;
    e2 !== null && (e2.classList.remove("q-animate--scale"), e2.classList.add("q-animate--scale"), clearTimeout(u), u = setTimeout(() => {
      l.value !== null && (e2.classList.remove("q-animate--scale"), R());
    }, 170));
  }
  function V() {
    e.seamless !== true && (e.persistent === true || e.noEscDismiss === true ? e.maximized !== true && e.noShake !== true && D() : (o("escape-key"), _()));
  }
  function A(t2) {
    clearTimeout(u), t2 !== true && i.value !== true || (I(false), e.seamless !== true && (m(false), removeFocusout(j), removeEscapeKey(V)));
  }
  function I(e2) {
    e2 === true ? c !== true && (maximizedModals < 1 && document.body.classList.add("q-body--dialog"), maximizedModals++, c = true) : c === true && (maximizedModals < 2 && document.body.classList.remove("q-body--dialog"), maximizedModals--, c = false);
  }
  function H(e2) {
    d !== true && (_(e2), o("click", e2));
  }
  function N(t2) {
    e.persistent !== true && e.noBackdropDismiss !== true ? _(t2) : e.noShake !== true && D();
  }
  function j(e2) {
    i.value === true && C.value === true && childHasFocus(l.value, e2.target) !== true && R();
  }
  function U() {
    return h("div", __spreadProps(__spreadValues({}, n), { class: L.value }), [h(Transition, { name: "q-transition--fade", appear: true }, () => E.value === true ? h("div", { class: "q-dialog__backdrop fixed-full", style: Q.value, "aria-hidden": "true", onMousedown: N }) : null), h(Transition, { name: B.value, appear: true }, () => i.value === true ? h("div", __spreadValues({ ref: l, class: P.value, style: Q.value, tabindex: -1 }, O.value), hSlot$1(t.default)) : null)]);
  }
  return watch(i, (e2) => {
    nextTick(() => {
      r.value = e2;
    });
  }), watch(() => e.maximized, (e2) => {
    i.value === true && I(e2);
  }), watch(E, (e2) => {
    m(e2), e2 === true ? (addFocusout(j), addEscapeKey(V)) : (removeFocusout(j), removeEscapeKey(V));
  }), Object.assign(a.proxy, { focus: R, shake: D, __updateRefocusTarget(e2) {
    p2 = e2 || null;
  } }), onBeforeUnmount(() => {
    A();
  }), k;
} });
const duration = 150;
var QDrawer = defineComponent({ name: "QDrawer", inheritAttrs: false, props: __spreadProps(__spreadValues(__spreadValues({}, useModelToggleProps), useDarkProps$1), { side: { type: String, default: "left", validator: (e) => ["left", "right"].includes(e) }, width: { type: Number, default: 300 }, mini: Boolean, miniToOverlay: Boolean, miniWidth: { type: Number, default: 57 }, breakpoint: { type: Number, default: 1023 }, showIfAbove: Boolean, behavior: { type: String, validator: (e) => ["default", "desktop", "mobile"].includes(e), default: "default" }, bordered: Boolean, elevated: Boolean, overlay: Boolean, persistent: Boolean, noSwipeOpen: Boolean, noSwipeClose: Boolean, noSwipeBackdrop: Boolean }), emits: [...useModelToggleEmits, "on-layout", "mini-state"], setup(e, { slots: t, emit: o, attrs: n }) {
  const a = getCurrentInstance(), { proxy: { $q: l } } = a, i = useDark$1(e, l), { preventBodyScroll: r } = usePreventScroll(), { registerTimeout: s } = useTimeout(), u = inject(layoutKey, () => {
    console.error("QDrawer needs to be child of QLayout");
  });
  let c, d, p2;
  const v = ref(e.behavior === "mobile" || e.behavior !== "desktop" && u.totalWidth.value <= e.breakpoint), m = computed(() => e.mini === true && v.value !== true), f = computed(() => m.value === true ? e.miniWidth : e.width), g = ref(e.showIfAbove === true && v.value === false || e.modelValue === true), b = computed(() => e.persistent !== true && (v.value === true || z.value === true));
  function y(e2, t2) {
    if (C(), e2 !== false && u.animate(), W(0), v.value === true) {
      const e3 = u.instances[Q.value];
      e3 !== void 0 && e3.belowBreakpoint === true && e3.hide(false), G(1), u.isContainer.value !== true && r(true);
    } else
      G(0), e2 !== false && X(false);
    s(() => {
      e2 !== false && X(true), t2 !== true && o("show", e2);
    }, duration);
  }
  function S(e2, t2) {
    k(), e2 !== false && u.animate(), G(0), W(T.value * f.value), te(), t2 !== true && s(() => {
      o("hide", e2);
    }, duration);
  }
  const { show: w, hide: x } = useModelToggle({ showing: g, hideOnRouteChange: b, handleShow: y, handleHide: S }), { addToHistory: C, removeFromHistory: k } = useHistory(g, x, b), _ = { belowBreakpoint: v, hide: x }, q = computed(() => e.side === "right"), T = computed(() => (l.lang.rtl === true ? -1 : 1) * (q.value === true ? 1 : -1)), P = ref(0), $ = ref(false), M = ref(false), B = ref(f.value * T.value), Q = computed(() => q.value === true ? "left" : "right"), E = computed(() => g.value === true && v.value === false && e.overlay === false ? e.miniToOverlay === true ? e.miniWidth : f.value : 0), O = computed(() => e.overlay === true || e.miniToOverlay === true || u.view.value.indexOf(q.value ? "R" : "L") > -1 || l.platform.is.ios === true && u.isContainer.value === true), L = computed(() => e.overlay === false && g.value === true && v.value === false), z = computed(() => e.overlay === true && g.value === true && v.value === false), F = computed(() => "fullscreen q-drawer__backdrop" + (g.value === false && $.value === false ? " hidden" : "")), R = computed(() => ({ backgroundColor: `rgba(0,0,0,${0.4 * P.value})` })), D = computed(() => q.value === true ? u.rows.value.top[2] === "r" : u.rows.value.top[0] === "l"), V = computed(() => q.value === true ? u.rows.value.bottom[2] === "r" : u.rows.value.bottom[0] === "l"), A = computed(() => {
    const e2 = {};
    return u.header.space === true && D.value === false && (O.value === true ? e2.top = `${u.header.offset}px` : u.header.space === true && (e2.top = `${u.header.size}px`)), u.footer.space === true && V.value === false && (O.value === true ? e2.bottom = `${u.footer.offset}px` : u.footer.space === true && (e2.bottom = `${u.footer.size}px`)), e2;
  }), I = computed(() => {
    const e2 = { width: `${f.value}px`, transform: `translateX(${B.value}px)` };
    return v.value === true ? e2 : Object.assign(e2, A.value);
  }), H = computed(() => "q-drawer__content fit " + (u.isContainer.value !== true ? "scroll" : "overflow-auto")), N = computed(() => `q-drawer q-drawer--${e.side}` + (M.value === true ? " q-drawer--mini-animate" : "") + (e.bordered === true ? " q-drawer--bordered" : "") + (i.value === true ? " q-drawer--dark q-dark" : "") + ($.value === true ? " no-transition" : g.value === true ? "" : " q-layout--prevent-focus") + (v.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${m.value === true ? "mini" : "standard"}` + (O.value === true || L.value !== true ? " fixed" : "") + (e.overlay === true || e.miniToOverlay === true ? " q-drawer--on-top" : "") + (D.value === true ? " q-drawer--top-padding" : ""))), j = computed(() => {
    const t2 = l.lang.rtl === true ? e.side : Q.value;
    return [[TouchPan, J, void 0, { [t2]: true, mouse: true }]];
  }), U = computed(() => {
    const t2 = l.lang.rtl === true ? Q.value : e.side;
    return [[TouchPan, ee, void 0, { [t2]: true, mouse: true }]];
  }), K = computed(() => {
    const t2 = l.lang.rtl === true ? Q.value : e.side;
    return [[TouchPan, ee, void 0, { [t2]: true, mouse: true, mouseAllDir: true }]];
  });
  function W(e2) {
    e2 === void 0 ? nextTick(() => {
      e2 = g.value === true ? 0 : f.value, W(T.value * e2);
    }) : (u.isContainer.value !== true || q.value !== true || v.value !== true && Math.abs(e2) !== f.value || (e2 += T.value * u.scrollbarWidth.value), B.value = e2);
  }
  function Y() {
    ne(v, e.behavior === "mobile" || e.behavior !== "desktop" && u.totalWidth.value <= e.breakpoint);
  }
  function G(e2) {
    P.value = e2;
  }
  function X(e2) {
    const t2 = e2 === true ? "remove" : u.isContainer.value !== true ? "add" : "";
    t2 !== "" && document.body.classList[t2]("q-body--drawer-toggle");
  }
  function Z() {
    clearTimeout(d), a.proxy && a.proxy.$el && a.proxy.$el.classList.add("q-drawer--mini-animate"), M.value = true, d = setTimeout(() => {
      M.value = false, a && a.proxy && a.proxy.$el && a.proxy.$el.classList.remove("q-drawer--mini-animate");
    }, 150);
  }
  function J(e2) {
    if (g.value !== false)
      return;
    const t2 = f.value, o2 = between(e2.distance.x, 0, t2);
    if (e2.isFinal === true) {
      const e3 = o2 >= Math.min(75, t2);
      return e3 === true ? w() : (u.animate(), G(0), W(T.value * t2)), void ($.value = false);
    }
    W((l.lang.rtl === true ? q.value !== true : q.value) ? Math.max(t2 - o2, 0) : Math.min(0, o2 - t2)), G(between(o2 / t2, 0, 1)), e2.isFirst === true && ($.value = true);
  }
  function ee(t2) {
    if (g.value !== true)
      return;
    const o2 = f.value, n2 = t2.direction === e.side, a2 = (l.lang.rtl === true ? n2 !== true : n2) ? between(t2.distance.x, 0, o2) : 0;
    if (t2.isFinal === true) {
      const e2 = Math.abs(a2) < Math.min(75, o2);
      return e2 === true ? (u.animate(), G(1), W(0)) : x(), void ($.value = false);
    }
    W(T.value * a2), G(between(1 - a2 / o2, 0, 1)), t2.isFirst === true && ($.value = true);
  }
  function te() {
    r(false), X(true);
  }
  function oe(t2, o2) {
    u.update(e.side, t2, o2);
  }
  function ne(e2, t2) {
    e2.value !== t2 && (e2.value = t2);
  }
  function ae(t2, o2) {
    oe("size", t2 === true ? e.miniWidth : o2);
  }
  return watch(v, (t2) => {
    t2 === true ? (c = g.value, g.value === true && x(false)) : e.overlay === false && e.behavior !== "mobile" && c !== false && (g.value === true ? (W(0), G(0), te()) : w(false));
  }), watch(u.totalWidth, (t2) => {
    ne(v, e.behavior === "mobile" || e.behavior !== "desktop" && t2 <= e.breakpoint);
  }), watch(() => e.side, (e2, t2) => {
    u.instances[t2] === _ && (u.instances[t2] = void 0, u[t2].space = false, u[t2].offset = 0), u.instances[e2] = _, u[e2].size = f.value, u[e2].space = L.value, u[e2].offset = E.value;
  }), watch(() => e.behavior + e.breakpoint, Y), watch(u.isContainer, (e2) => {
    g.value === true && r(e2 !== true);
  }), watch(u.scrollbarWidth, () => {
    W(g.value === true ? 0 : void 0);
  }), watch(E, (e2) => {
    oe("offset", e2);
  }), watch(L, (e2) => {
    o("on-layout", e2), oe("space", e2);
  }), watch(q, () => {
    W();
  }), watch(f, (t2) => {
    W(), ae(e.miniToOverlay, t2);
  }), watch(() => e.miniToOverlay, (e2) => {
    ae(e2, f.value);
  }), watch(() => l.lang.rtl, () => {
    W();
  }), watch(() => e.mini, () => {
    e.modelValue === true && (Z(), u.animate());
  }), watch(m, (e2) => {
    o("mini-state", e2);
  }), u.instances[e.side] = _, ae(e.miniToOverlay, f.value), oe("space", L.value), oe("offset", E.value), e.showIfAbove === true && e.modelValue !== true && g.value === true && e["onUpdate:modelValue"] !== void 0 && o("update:modelValue", true), onMounted(() => {
    o("on-layout", L.value), o("mini-state", m.value), c = e.showIfAbove === true;
    const t2 = () => {
      const e2 = g.value === true ? y : S;
      e2(false, true);
    };
    u.totalWidth.value === 0 ? p2 = watch(u.totalWidth, () => {
      p2(), p2 = void 0, g.value === false && e.showIfAbove === true && v.value === false ? w(false) : t2();
    }) : nextTick(t2);
  }), onBeforeUnmount(() => {
    p2 !== void 0 && p2(), clearTimeout(d), g.value === true && te(), u.instances[e.side] === _ && (u.instances[e.side] = void 0, oe("size", 0), oe("offset", 0), oe("space", false));
  }), () => {
    const o2 = [];
    v.value === true && (e.noSwipeOpen === false && o2.push(withDirectives(h("div", { key: "open", class: `q-drawer__opener fixed-${e.side}`, "aria-hidden": "true" }), j.value)), o2.push(hDir("div", { ref: "backdrop", class: F.value, style: R.value, "aria-hidden": "true", onClick: x }, void 0, "backdrop", e.noSwipeBackdrop !== true && g.value === true, () => K.value)));
    const a2 = m.value === true && t.mini !== void 0, l2 = [h("div", __spreadProps(__spreadValues({}, n), { key: "" + a2, class: [H.value, n.class] }), a2 === true ? t.mini() : hSlot$1(t.default))];
    return e.elevated === true && g.value === true && l2.push(h("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), o2.push(hDir("aside", { ref: "content", class: N.value, style: I.value }, l2, "contentclose", e.noSwipeClose !== true && v.value === true, () => U.value)), h("div", { class: "q-drawer-container" }, o2);
  };
} });
function getBlockElement(e, t) {
  if (t && e === t)
    return null;
  const o = e.nodeName.toLowerCase();
  if (["div", "li", "ul", "ol", "blockquote"].includes(o) === true)
    return e;
  const n = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle, a = n.display;
  return a === "block" || a === "table" ? e : getBlockElement(e.parentNode);
}
function isChildOf(e, t, o) {
  return !(!e || e === document.body) && (o === true && e === t || (t === document ? document.body : t).contains(e.parentNode));
}
function createRange(e, t, o) {
  if (o || (o = document.createRange(), o.selectNode(e), o.setStart(e, 0)), t.count === 0)
    o.setEnd(e, t.count);
  else if (t.count > 0)
    if (e.nodeType === Node.TEXT_NODE)
      e.textContent.length < t.count ? t.count -= e.textContent.length : (o.setEnd(e, t.count), t.count = 0);
    else
      for (let n = 0; t.count !== 0 && n < e.childNodes.length; n++)
        o = createRange(e.childNodes[n], t, o);
  return o;
}
const urlRegex = /^https?:\/\//;
class Caret {
  constructor(e, t) {
    this.el = e, this.eVm = t, this._range = null;
  }
  get selection() {
    if (this.el) {
      const e = document.getSelection();
      if (isChildOf(e.anchorNode, this.el, true) && isChildOf(e.focusNode, this.el, true))
        return e;
    }
    return null;
  }
  get hasSelection() {
    return this.selection !== null && this.selection.toString().length > 0;
  }
  get range() {
    const e = this.selection;
    return e !== null && e.rangeCount ? e.getRangeAt(0) : this._range;
  }
  get parent() {
    const e = this.range;
    if (e !== null) {
      const t = e.startContainer;
      return t.nodeType === document.ELEMENT_NODE ? t : t.parentNode;
    }
    return null;
  }
  get blockParent() {
    const e = this.parent;
    return e !== null ? getBlockElement(e, this.el) : null;
  }
  save(e = this.range) {
    e !== null && (this._range = e);
  }
  restore(e = this._range) {
    const t = document.createRange(), o = document.getSelection();
    e !== null ? (t.setStart(e.startContainer, e.startOffset), t.setEnd(e.endContainer, e.endOffset), o.removeAllRanges(), o.addRange(t)) : (o.selectAllChildren(this.el), o.collapseToEnd());
  }
  savePosition() {
    let e, t = -1;
    const o = document.getSelection(), n = this.el.parentNode;
    if (o.focusNode && isChildOf(o.focusNode, n)) {
      e = o.focusNode, t = o.focusOffset;
      while (e && e !== n)
        e !== this.el && e.previousSibling ? (e = e.previousSibling, t += e.textContent.length) : e = e.parentNode;
    }
    this.savedPos = t;
  }
  restorePosition(e = 0) {
    if (this.savedPos > 0 && this.savedPos < e) {
      const e2 = window.getSelection(), t = createRange(this.el, { count: this.savedPos });
      t && (t.collapse(false), e2.removeAllRanges(), e2.addRange(t));
    }
  }
  hasParent(e, t) {
    const o = t ? this.parent : this.blockParent;
    return o !== null && o.nodeName.toLowerCase() === e.toLowerCase();
  }
  hasParents(e, t, o = this.parent) {
    return o !== null && (o !== null && e.includes(o.nodeName.toLowerCase()) === true || t === true && this.hasParents(e, t, o.parentNode));
  }
  is(e, t) {
    if (this.selection === null)
      return false;
    switch (e) {
      case "formatBlock":
        return t === "DIV" && this.parent === this.el || this.hasParent(t, t === "PRE");
      case "link":
        return this.hasParent("A", true);
      case "fontSize":
        return document.queryCommandValue(e) === t;
      case "fontName":
        const o = document.queryCommandValue(e);
        return o === `"${t}"` || o === t;
      case "fullscreen":
        return this.eVm.inFullscreen.value;
      case "viewsource":
        return this.eVm.isViewingSource.value;
      case void 0:
        return false;
      default:
        const n = document.queryCommandState(e);
        return t !== void 0 ? n === t : n;
    }
  }
  getParentAttribute(e) {
    return this.parent !== null ? this.parent.getAttribute(e) : null;
  }
  can(e) {
    return e === "outdent" ? this.hasParents(["blockquote", "li"], true) : e === "indent" ? this.hasParents(["li"], true) : e === "link" ? this.selection !== null || this.is("link") : void 0;
  }
  apply(e, t, o = noop) {
    if (e === "formatBlock")
      ["BLOCKQUOTE", "H1", "H2", "H3", "H4", "H5", "H6"].includes(t) && this.is(e, t) && (e = "outdent", t = null), t === "PRE" && this.is(e, "PRE") && (t = "P");
    else {
      if (e === "print") {
        o();
        const e2 = window.open();
        return e2.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `), e2.print(), void e2.close();
      }
      if (e === "link") {
        const e2 = this.getParentAttribute("href");
        if (e2 === null) {
          const e3 = this.selectWord(this.selection), t2 = e3 ? e3.toString() : "";
          if (!t2.length && (!this.range || !this.range.cloneContents().querySelector("img")))
            return;
          this.eVm.editLinkUrl.value = urlRegex.test(t2) ? t2 : "https://", document.execCommand("createLink", false, this.eVm.editLinkUrl.value), this.save(e3.getRangeAt(0));
        } else
          this.eVm.editLinkUrl.value = e2, this.range.selectNodeContents(this.parent), this.save();
        return;
      }
      if (e === "fullscreen")
        return this.eVm.toggleFullscreen(), void o();
      if (e === "viewsource")
        return this.eVm.isViewingSource.value = this.eVm.isViewingSource.value === false, this.eVm.setContent(this.eVm.props.modelValue), void o();
    }
    document.execCommand(e, false, t), o();
  }
  selectWord(e) {
    if (e === null || e.isCollapsed !== true || e.modify === void 0)
      return e;
    const t = document.createRange();
    t.setStart(e.anchorNode, e.anchorOffset), t.setEnd(e.focusNode, e.focusOffset);
    const o = t.collapsed ? ["backward", "forward"] : ["forward", "backward"];
    t.detach();
    const n = e.focusNode, a = e.focusOffset;
    return e.collapse(e.anchorNode, e.anchorOffset), e.modify("move", o[0], "character"), e.modify("move", o[1], "word"), e.extend(n, a), e.modify("extend", o[1], "character"), e.modify("extend", o[0], "word"), e;
  }
}
var QTooltip = defineComponent({ name: "QTooltip", inheritAttrs: false, props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useAnchorProps), useModelToggleProps), useTransitionProps), { maxHeight: { type: String, default: null }, maxWidth: { type: String, default: null }, transitionShow: { default: "jump-down" }, transitionHide: { default: "jump-up" }, anchor: { type: String, default: "bottom middle", validator: validatePosition }, self: { type: String, default: "top middle", validator: validatePosition }, offset: { type: Array, default: () => [14, 14], validator: validateOffset }, scrollTarget: { default: void 0 }, delay: { type: Number, default: 0 }, hideDelay: { type: Number, default: 0 } }), emits: [...useModelToggleEmits], setup(e, { slots: t, emit: o, attrs: n }) {
  let a, l;
  const i = getCurrentInstance(), { proxy: { $q: r } } = i, s = ref(null), u = ref(false), c = computed(() => parsePosition(e.anchor, r.lang.rtl)), d = computed(() => parsePosition(e.self, r.lang.rtl)), p2 = computed(() => e.persistent !== true), { registerTick: v, removeTick: m, prepareTick: f } = useTick(), { registerTimeout: g, removeTimeout: b } = useTimeout(), { transition: y, transitionStyle: S } = useTransition(e, u), { localScrollTarget: w, changeScrollEvent: x, unconfigureScrollTarget: C } = useScrollTarget(e, D), { anchorEl: k, canShow: _, anchorEvents: q } = useAnchor({ showing: u, configureAnchorEl: R }), { show: T, hide: P } = useModelToggle({ showing: u, canShow: _, handleShow: Q, handleHide: E, hideOnRouteChange: p2, processOnMount: true });
  Object.assign(q, { delayShow: z, delayHide: F });
  const { showPortal: $, hidePortal: M, renderPortal: B } = usePortal(i, s, A);
  if (r.platform.is.mobile === true) {
    const t2 = { anchorEl: k, innerRef: s, onClickOutside(e2) {
      return P(e2), e2.target.classList.contains("q-dialog__backdrop") && stopAndPrevent$1(e2), true;
    } }, o2 = computed(() => e.modelValue === null && e.persistent !== true && u.value === true);
    watch(o2, (e2) => {
      const o3 = e2 === true ? addClickOutside : removeClickOutside;
      o3(t2);
    }), onBeforeUnmount(() => {
      removeClickOutside(t2);
    });
  }
  function Q(t2) {
    m(), b(), $(), v(() => {
      l = new MutationObserver(() => L()), l.observe(s.value, { attributes: false, childList: true, characterData: true, subtree: true }), L(), D();
    }), f(), a === void 0 && (a = watch(() => r.screen.width + "|" + r.screen.height + "|" + e.self + "|" + e.anchor + "|" + r.lang.rtl, L)), g(() => {
      $(true), o("show", t2);
    }, e.transitionDuration);
  }
  function E(t2) {
    m(), b(), O(), g(() => {
      M(), o("hide", t2);
    }, e.transitionDuration);
  }
  function O() {
    l !== void 0 && (l.disconnect(), l = void 0), a !== void 0 && (a(), a = void 0), C(), cleanEvt(q, "tooltipTemp");
  }
  function L() {
    const t2 = s.value;
    k.value !== null && t2 && setPosition({ el: t2, offset: e.offset, anchorEl: k.value, anchorOrigin: c.value, selfOrigin: d.value, maxHeight: e.maxHeight, maxWidth: e.maxWidth });
  }
  function z(t2) {
    if (r.platform.is.mobile === true) {
      clearSelection(), document.body.classList.add("non-selectable");
      const e2 = k.value, t3 = ["touchmove", "touchcancel", "touchend", "click"].map((t4) => [e2, t4, "delayHide", "passiveCapture"]);
      addEvt(q, "tooltipTemp", t3);
    }
    g(() => {
      T(t2);
    }, e.delay);
  }
  function F(t2) {
    b(), r.platform.is.mobile === true && (cleanEvt(q, "tooltipTemp"), clearSelection(), setTimeout(() => {
      document.body.classList.remove("non-selectable");
    }, 10)), g(() => {
      P(t2);
    }, e.hideDelay);
  }
  function R() {
    if (e.noParentEvent === true || k.value === null)
      return;
    const t2 = r.platform.is.mobile === true ? [[k.value, "touchstart", "delayShow", "passive"]] : [[k.value, "mouseenter", "delayShow", "passive"], [k.value, "mouseleave", "delayHide", "passive"]];
    addEvt(q, "anchor", t2);
  }
  function D() {
    if (k.value !== null || e.scrollTarget !== void 0) {
      w.value = getScrollTarget(k.value, e.scrollTarget);
      const t2 = e.noParentEvent === true ? L : P;
      x(w.value, t2);
    }
  }
  function V() {
    return u.value === true ? h("div", __spreadProps(__spreadValues({}, n), { ref: s, class: ["q-tooltip q-tooltip--style q-position-engine no-pointer-events", n.class], style: [n.style, S.value], role: "complementary" }), hSlot$1(t.default)) : null;
  }
  function A() {
    return h(Transition, { name: y.value, appear: true }, V);
  }
  return onBeforeUnmount(O), Object.assign(i.proxy, { updatePosition: L }), B;
} }), QItem = defineComponent({ name: "QItem", props: __spreadProps(__spreadValues(__spreadValues({}, useDarkProps$1), useRouterLinkProps), { tag: { type: String, default: "div" }, active: Boolean, clickable: Boolean, dense: Boolean, insetLevel: Number, tabindex: [String, Number], focused: Boolean, manualFocus: Boolean }), emits: ["click", "keyup"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = useDark$1(e, n), { hasLink: l, linkProps: i, linkClass: r, linkTag: s, navigateToLink: u } = useRouterLink(), c = ref(null), d = ref(null), p2 = computed(() => e.clickable === true || l.value === true || e.tag === "a" || e.tag === "label"), v = computed(() => e.disable !== true && p2.value === true), m = computed(() => "q-item q-item-type row no-wrap" + (e.dense === true ? " q-item--dense" : "") + (a.value === true ? " q-item--dark" : "") + (l.value === true ? r.value : e.active === true ? `${e.activeClass !== void 0 ? ` ${e.activeClass}` : ""} q-item--active` : "") + (e.disable === true ? " disabled" : "") + (v.value === true ? " q-item--clickable q-link cursor-pointer " + (e.manualFocus === true ? "q-manual-focusable" : "q-focusable q-hoverable") + (e.focused === true ? " q-manual-focusable--focused" : "") : "")), f = computed(() => {
    if (e.insetLevel === void 0)
      return null;
    const t2 = n.lang.rtl === true ? "Right" : "Left";
    return { ["padding" + t2]: 16 + 56 * e.insetLevel + "px" };
  });
  function g(e2) {
    v.value === true && (d.value !== null && (e2.qKeyEvent !== true && document.activeElement === c.value ? d.value.focus() : document.activeElement === d.value && c.value.focus()), l.value === true && u(e2), o("click", e2));
  }
  function b(e2) {
    if (v.value === true && isKeyCode(e2, 13) === true) {
      stopAndPrevent$1(e2), e2.qKeyEvent = true;
      const t2 = new MouseEvent("click", e2);
      t2.qKeyEvent = true, c.value.dispatchEvent(t2);
    }
    o("keyup", e2);
  }
  function y() {
    const e2 = hUniqueSlot(t.default, []);
    return v.value === true && e2.unshift(h("div", { class: "q-focus-helper", tabindex: -1, ref: d })), e2;
  }
  return () => {
    const t2 = { ref: c, class: m.value, style: f.value, onClick: g, onKeyup: b };
    return v.value === true ? (t2.tabindex = e.tabindex || "0", Object.assign(t2, i.value)) : p2.value === true && (t2["aria-disabled"] = "true"), h(s.value, t2, y());
  };
} }), QItemSection = defineComponent({ name: "QItemSection", props: { avatar: Boolean, thumbnail: Boolean, side: Boolean, top: Boolean, noWrap: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => `q-item__section column q-item__section--${e.avatar === true || e.side === true || e.thumbnail === true ? "side" : "main"}` + (e.top === true ? " q-item__section--top justify-start" : " justify-center") + (e.avatar === true ? " q-item__section--avatar" : "") + (e.thumbnail === true ? " q-item__section--thumbnail" : "") + (e.noWrap === true ? " q-item__section--nowrap" : ""));
  return () => h("div", { class: o.value }, hSlot$1(t.default));
} });
function run(e, t, o) {
  t.handler ? t.handler(e, o, o.caret) : o.runCmd(t.cmd, t.param);
}
function getGroup(e) {
  return h("div", { class: "q-editor__toolbar-group" }, e);
}
function getBtn(e, t, o, n = false) {
  const a = n || t.type === "toggle" && (t.toggled ? t.toggled(e) : t.cmd && e.caret.is(t.cmd, t.param)), l = [];
  if (t.tip && e.$q.platform.is.desktop) {
    const e2 = t.key ? h("div", [h("small", `(CTRL + ${String.fromCharCode(t.key)})`)]) : null;
    l.push(h(QTooltip, { delay: 1e3 }, () => [h("div", { innerHTML: t.tip }), e2]));
  }
  return h(QBtn, __spreadProps(__spreadValues({}, e.buttonProps.value), { icon: t.icon !== null ? t.icon : void 0, color: a ? t.toggleColor || e.props.toolbarToggleColor : t.color || e.props.toolbarColor, textColor: a && !e.props.toolbarPush ? null : t.textColor || e.props.toolbarTextColor, label: t.label, disable: !!t.disable && (typeof t.disable !== "function" || t.disable(e)), size: "sm", onClick(n2) {
    o && o(), run(n2, t, e);
  } }), () => l);
}
function getDropdown(e, t) {
  const o = t.list === "only-icons";
  let n, a, l = t.label, i = t.icon !== null ? t.icon : void 0;
  function r() {
    u.component.proxy.hide();
  }
  if (o)
    a = t.options.map((t2) => {
      const o2 = t2.type === void 0 && e.caret.is(t2.cmd, t2.param);
      return o2 && (l = t2.tip, i = t2.icon !== null ? t2.icon : void 0), getBtn(e, t2, r, o2);
    }), n = e.toolbarBackgroundClass.value, a = [getGroup(a)];
  else {
    const o2 = e.props.toolbarToggleColor !== void 0 ? `text-${e.props.toolbarToggleColor}` : null, s2 = e.props.toolbarTextColor !== void 0 ? `text-${e.props.toolbarTextColor}` : null, u2 = t.list === "no-icons";
    a = t.options.map((t2) => {
      const n2 = !!t2.disable && t2.disable(e), a2 = t2.type === void 0 && e.caret.is(t2.cmd, t2.param);
      a2 && (l = t2.tip, i = t2.icon !== null ? t2.icon : void 0);
      const c = t2.htmlTip;
      return h(QItem, { active: a2, activeClass: o2, clickable: true, disable: n2, dense: true, onClick(o3) {
        r(), e.contentRef.value !== null && e.contentRef.value.focus(), e.caret.restore(), run(o3, t2, e);
      } }, () => [u2 === true ? null : h(QItemSection, { class: a2 ? o2 : s2, side: true }, () => h(QIcon$1, { name: t2.icon !== null ? t2.icon : void 0 })), h(QItemSection, c ? () => h("div", { class: "text-no-wrap", innerHTML: t2.htmlTip }) : t2.tip ? () => h("div", { class: "text-no-wrap" }, t2.tip) : void 0)]);
    }), n = [e.toolbarBackgroundClass.value, s2];
  }
  const s = t.highlight && l !== t.label, u = h(QBtnDropdown, __spreadProps(__spreadValues({}, e.buttonProps.value), { noCaps: true, noWrap: true, color: s ? e.props.toolbarToggleColor : e.props.toolbarColor, textColor: s && !e.props.toolbarPush ? null : e.props.toolbarTextColor, label: t.fixedLabel ? t.label : l, icon: t.fixedIcon ? t.icon !== null ? t.icon : void 0 : i, contentClass: n }), () => a);
  return u;
}
function getToolbar(e) {
  if (e.caret)
    return e.buttons.value.filter((t) => {
      return !e.isViewingSource.value || t.find((e2) => e2.cmd === "viewsource");
    }).map((t) => getGroup(t.map((t2) => {
      return (!e.isViewingSource.value || t2.cmd === "viewsource") && (t2.type === "slot" ? hSlot$1(e.slots[t2.slot]) : t2.type === "dropdown" ? getDropdown(e, t2) : getBtn(e, t2));
    })));
}
function getFonts(e, t, o, n = {}) {
  const a = Object.keys(n);
  if (a.length === 0)
    return {};
  const l = { default_font: { cmd: "fontName", param: e, icon: o, tip: t } };
  return a.forEach((e2) => {
    const t2 = n[e2];
    l[e2] = { cmd: "fontName", param: t2, icon: o, tip: t2, htmlTip: `<font face="${t2}">${t2}</font>` };
  }), l;
}
function getLinkEditor(e) {
  if (e.caret) {
    const t = e.props.toolbarColor || e.props.toolbarTextColor;
    let o = e.editLinkUrl.value;
    const n = () => {
      e.caret.restore(), o !== e.editLinkUrl.value && document.execCommand("createLink", false, o === "" ? " " : o), e.editLinkUrl.value = null;
    };
    return [h("div", { class: `q-mx-xs text-${t}` }, `${e.$q.lang.editor.url}: `), h("input", { key: "qedt_btm_input", class: "col q-editor__link-input", value: o, onInput: (e2) => {
      stop$1(e2), o = e2.target.value;
    }, onKeydown: (t2) => {
      if (shouldIgnoreKey$1(t2) !== true)
        switch (t2.keyCode) {
          case 13:
            return prevent$1(t2), n();
          case 27:
            prevent$1(t2), e.caret.restore(), e.editLinkUrl.value && e.editLinkUrl.value !== "https://" || document.execCommand("unlink"), e.editLinkUrl.value = null;
            break;
        }
    } }), getGroup([h(QBtn, __spreadProps(__spreadValues({ key: "qedt_btm_rem", tabindex: -1 }, e.buttonProps.value), { label: e.$q.lang.label.remove, noCaps: true, onClick: () => {
      e.caret.restore(), document.execCommand("unlink"), e.editLinkUrl.value = null;
    } })), h(QBtn, __spreadProps(__spreadValues({ key: "qedt_btm_upd" }, e.buttonProps.value), { label: e.$q.lang.label.update, noCaps: true, onClick: n }))])];
  }
}
const listenerRE$1 = /^on[A-Z]/;
function useSplitAttrs$1(e) {
  const t = { listeners: ref({}), attributes: ref({}) };
  function o() {
    const o2 = {}, n = {};
    Object.keys(e).forEach((t2) => {
      listenerRE$1.test(t2) === true ? o2[t2] = e[t2] : t2 !== "class" && t2 !== "style" && (n[t2] = e[t2]);
    }), t.listeners.value = o2, t.attributes.value = n;
  }
  return onBeforeUpdate(o), o(), t;
}
const toString = Object.prototype.toString, hasOwn = Object.prototype.hasOwnProperty, class2type = {};
function type(e) {
  return e === null ? String(e) : class2type[toString.call(e)] || "object";
}
function isPlainObject(e) {
  if (!e || type(e) !== "object")
    return false;
  if (e.constructor && !hasOwn.call(e, "constructor") && !hasOwn.call(e.constructor.prototype, "isPrototypeOf"))
    return false;
  let t;
  for (t in e)
    ;
  return t === void 0 || hasOwn.call(e, t);
}
function extend() {
  let e, t, o, n, a, l, i = arguments[0] || {}, r = 1, s = false;
  const u = arguments.length;
  for (typeof i === "boolean" && (s = i, i = arguments[1] || {}, r = 2), Object(i) !== i && type(i) !== "function" && (i = {}), u === r && (i = this, r--); r < u; r++)
    if ((e = arguments[r]) !== null)
      for (t in e)
        o = i[t], n = e[t], i !== n && (s && n && (isPlainObject(n) || (a = type(n) === "array")) ? (a ? (a = false, l = o && type(o) === "array" ? o : []) : l = o && isPlainObject(o) ? o : {}, i[t] = extend(s, l, n)) : n !== void 0 && (i[t] = n));
  return i;
}
"Boolean Number String Function Array Date RegExp Object".split(" ").forEach((e) => {
  class2type["[object " + e + "]"] = e.toLowerCase();
});
var QEditor = defineComponent({ name: "QEditor", props: __spreadProps(__spreadValues(__spreadValues({}, useDarkProps$1), useFullscreenProps), { modelValue: { type: String, required: true }, readonly: Boolean, disable: Boolean, minHeight: { type: String, default: "10rem" }, maxHeight: String, height: String, definitions: Object, fonts: Object, placeholder: String, toolbar: { type: Array, validator: (e) => e.length === 0 || e.every((e2) => e2.length), default() {
  return [["left", "center", "right", "justify"], ["bold", "italic", "underline", "strike"], ["undo", "redo"]];
} }, toolbarColor: String, toolbarBg: String, toolbarTextColor: String, toolbarToggleColor: { type: String, default: "primary" }, toolbarOutline: Boolean, toolbarPush: Boolean, toolbarRounded: Boolean, paragraphTag: { type: String, validator: (e) => ["div", "p"].includes(e), default: "div" }, contentStyle: Object, contentClass: [Object, Array, String], square: Boolean, flat: Boolean, dense: Boolean }), emits: [...useFullscreenEmits, "update:modelValue", "keydown", "click", "mouseup", "keyup", "touchend", "focus", "blur"], setup(e, { slots: t, emit: o, attrs: n }) {
  const { proxy: a } = getCurrentInstance(), { $q: l } = a, i = useDark$1(e, l), { inFullscreen: r, toggleFullscreen: s } = useFullscreen(), u = useSplitAttrs$1(n), c = ref(null), d = ref(null), p2 = ref(null), v = ref(false), m = computed(() => !e.readonly && !e.disable);
  let f, g, b = e.modelValue;
  document.execCommand("defaultParagraphSeparator", false, e.paragraphTag), f = window.getComputedStyle(document.body).fontFamily;
  const y = computed(() => e.toolbarBg ? ` bg-${e.toolbarBg}` : ""), S = computed(() => {
    const t2 = e.toolbarOutline !== true && e.toolbarPush !== true;
    return { type: "a", flat: t2, noWrap: true, outline: e.toolbarOutline, push: e.toolbarPush, rounded: e.toolbarRounded, dense: true, color: e.toolbarColor, disable: !m.value, size: "sm" };
  }), w = computed(() => {
    const t2 = l.lang.editor, o2 = l.iconSet.editor;
    return { bold: { cmd: "bold", icon: o2.bold, tip: t2.bold, key: 66 }, italic: { cmd: "italic", icon: o2.italic, tip: t2.italic, key: 73 }, strike: { cmd: "strikeThrough", icon: o2.strikethrough, tip: t2.strikethrough, key: 83 }, underline: { cmd: "underline", icon: o2.underline, tip: t2.underline, key: 85 }, unordered: { cmd: "insertUnorderedList", icon: o2.unorderedList, tip: t2.unorderedList }, ordered: { cmd: "insertOrderedList", icon: o2.orderedList, tip: t2.orderedList }, subscript: { cmd: "subscript", icon: o2.subscript, tip: t2.subscript, htmlTip: "x<subscript>2</subscript>" }, superscript: { cmd: "superscript", icon: o2.superscript, tip: t2.superscript, htmlTip: "x<superscript>2</superscript>" }, link: { cmd: "link", disable: (e2) => e2.caret && !e2.caret.can("link"), icon: o2.hyperlink, tip: t2.hyperlink, key: 76 }, fullscreen: { cmd: "fullscreen", icon: o2.toggleFullscreen, tip: t2.toggleFullscreen, key: 70 }, viewsource: { cmd: "viewsource", icon: o2.viewSource, tip: t2.viewSource }, quote: { cmd: "formatBlock", param: "BLOCKQUOTE", icon: o2.quote, tip: t2.quote, key: 81 }, left: { cmd: "justifyLeft", icon: o2.left, tip: t2.left }, center: { cmd: "justifyCenter", icon: o2.center, tip: t2.center }, right: { cmd: "justifyRight", icon: o2.right, tip: t2.right }, justify: { cmd: "justifyFull", icon: o2.justify, tip: t2.justify }, print: { type: "no-state", cmd: "print", icon: o2.print, tip: t2.print, key: 80 }, outdent: { type: "no-state", disable: (e2) => e2.caret && !e2.caret.can("outdent"), cmd: "outdent", icon: o2.outdent, tip: t2.outdent }, indent: { type: "no-state", disable: (e2) => e2.caret && !e2.caret.can("indent"), cmd: "indent", icon: o2.indent, tip: t2.indent }, removeFormat: { type: "no-state", cmd: "removeFormat", icon: o2.removeFormat, tip: t2.removeFormat }, hr: { type: "no-state", cmd: "insertHorizontalRule", icon: o2.hr, tip: t2.hr }, undo: { type: "no-state", cmd: "undo", icon: o2.undo, tip: t2.undo, key: 90 }, redo: { type: "no-state", cmd: "redo", icon: o2.redo, tip: t2.redo, key: 89 }, h1: { cmd: "formatBlock", param: "H1", icon: o2.heading1 || o2.heading, tip: t2.heading1, htmlTip: `<h1 class="q-ma-none">${t2.heading1}</h1>` }, h2: { cmd: "formatBlock", param: "H2", icon: o2.heading2 || o2.heading, tip: t2.heading2, htmlTip: `<h2 class="q-ma-none">${t2.heading2}</h2>` }, h3: { cmd: "formatBlock", param: "H3", icon: o2.heading3 || o2.heading, tip: t2.heading3, htmlTip: `<h3 class="q-ma-none">${t2.heading3}</h3>` }, h4: { cmd: "formatBlock", param: "H4", icon: o2.heading4 || o2.heading, tip: t2.heading4, htmlTip: `<h4 class="q-ma-none">${t2.heading4}</h4>` }, h5: { cmd: "formatBlock", param: "H5", icon: o2.heading5 || o2.heading, tip: t2.heading5, htmlTip: `<h5 class="q-ma-none">${t2.heading5}</h5>` }, h6: { cmd: "formatBlock", param: "H6", icon: o2.heading6 || o2.heading, tip: t2.heading6, htmlTip: `<h6 class="q-ma-none">${t2.heading6}</h6>` }, p: { cmd: "formatBlock", param: e.paragraphTag, icon: o2.heading, tip: t2.paragraph }, code: { cmd: "formatBlock", param: "PRE", icon: o2.code, htmlTip: `<code>${t2.code}</code>` }, "size-1": { cmd: "fontSize", param: "1", icon: o2.size1 || o2.size, tip: t2.size1, htmlTip: `<font size="1">${t2.size1}</font>` }, "size-2": { cmd: "fontSize", param: "2", icon: o2.size2 || o2.size, tip: t2.size2, htmlTip: `<font size="2">${t2.size2}</font>` }, "size-3": { cmd: "fontSize", param: "3", icon: o2.size3 || o2.size, tip: t2.size3, htmlTip: `<font size="3">${t2.size3}</font>` }, "size-4": { cmd: "fontSize", param: "4", icon: o2.size4 || o2.size, tip: t2.size4, htmlTip: `<font size="4">${t2.size4}</font>` }, "size-5": { cmd: "fontSize", param: "5", icon: o2.size5 || o2.size, tip: t2.size5, htmlTip: `<font size="5">${t2.size5}</font>` }, "size-6": { cmd: "fontSize", param: "6", icon: o2.size6 || o2.size, tip: t2.size6, htmlTip: `<font size="6">${t2.size6}</font>` }, "size-7": { cmd: "fontSize", param: "7", icon: o2.size7 || o2.size, tip: t2.size7, htmlTip: `<font size="7">${t2.size7}</font>` } };
  }), x = computed(() => {
    const t2 = e.definitions || {}, o2 = e.definitions || e.fonts ? extend(true, {}, w.value, t2, getFonts(f, l.lang.editor.defaultFont, l.iconSet.editor.font, e.fonts)) : w.value;
    return e.toolbar.map((e2) => e2.map((e3) => {
      if (e3.options)
        return { type: "dropdown", icon: e3.icon, label: e3.label, size: "sm", dense: true, fixedLabel: e3.fixedLabel, fixedIcon: e3.fixedIcon, highlight: e3.highlight, list: e3.list, options: e3.options.map((e4) => o2[e4]) };
      const n2 = o2[e3];
      return n2 ? n2.type === "no-state" || t2[e3] && (n2.cmd === void 0 || w.value[n2.cmd] && w.value[n2.cmd].type === "no-state") ? n2 : Object.assign({ type: "toggle" }, n2) : { type: "slot", slot: e3 };
    }));
  }), C = { $q: l, props: e, slots: t, inFullscreen: r, toggleFullscreen: s, runCmd: H, isViewingSource: v, editLinkUrl: p2, toolbarBackgroundClass: y, buttonProps: S, contentRef: d, buttons: x, setContent: I };
  watch(() => e.modelValue, (e2) => {
    b !== e2 && (b = e2, I(e2, true));
  });
  const k = computed(() => e.toolbar && e.toolbar.length > 0), _ = computed(() => {
    const e2 = {}, t2 = (t3) => {
      t3.key && (e2[t3.key] = { cmd: t3.cmd, param: t3.param });
    };
    return x.value.forEach((e3) => {
      e3.forEach((e4) => {
        e4.options ? e4.options.forEach(t2) : t2(e4);
      });
    }), e2;
  }), q = computed(() => r.value ? e.contentStyle : [{ minHeight: e.minHeight, height: e.height, maxHeight: e.maxHeight }, e.contentStyle]), T = computed(() => `q-editor q-editor--${v.value === true ? "source" : "default"}` + (e.disable === true ? " disabled" : "") + (r.value === true ? " fullscreen column" : "") + (e.square === true ? " q-editor--square no-border-radius" : "") + (e.flat === true ? " q-editor--flat" : "") + (e.dense === true ? " q-editor--dense" : "") + (i.value === true ? " q-editor--dark q-dark" : "")), P = computed(() => [e.contentClass, "q-editor__content", { col: r.value, "overflow-auto": r.value || e.maxHeight }]), $ = computed(() => e.disable === true ? { "aria-disabled": "true" } : e.readonly === true ? { "aria-readonly": "true" } : {});
  function M() {
    if (d.value !== null) {
      const t2 = `inner${v.value === true ? "Text" : "HTML"}`, n2 = d.value[t2];
      n2 !== e.modelValue && (b = n2, o("update:modelValue", n2));
    }
  }
  function B(e2) {
    if (o("keydown", e2), e2.ctrlKey !== true || shouldIgnoreKey$1(e2) === true)
      return void N();
    const t2 = e2.keyCode, n2 = _.value[t2];
    if (n2 !== void 0) {
      const { cmd: t3, param: o2 } = n2;
      stopAndPrevent$1(e2), H(t3, o2, false);
    }
  }
  function Q(e2) {
    N(), o("click", e2);
  }
  function E(e2) {
    if (d.value !== null) {
      const { scrollTop: e3, scrollHeight: t2 } = d.value;
      g = t2 - e3;
    }
    C.caret.save(), o("blur", e2);
  }
  function O(e2) {
    nextTick(() => {
      d.value !== null && g !== void 0 && (d.value.scrollTop = d.value.scrollHeight - g);
    }), o("focus", e2);
  }
  function L(e2) {
    if (c.value.contains(e2.target) === true && (e2.relatedTarget === null || c.value.contains(e2.relatedTarget) !== true)) {
      const e3 = `inner${v.value === true ? "Text" : "HTML"}`;
      C.caret.restorePosition(d.value[e3].length), N();
    }
  }
  function z(e2) {
    c.value.contains(e2.target) !== true || e2.relatedTarget !== null && c.value.contains(e2.relatedTarget) === true || (C.caret.savePosition(), N());
  }
  function F() {
    g = void 0;
  }
  function R(e2) {
    C.caret.save(), o("mouseup", e2);
  }
  function D() {
    g = void 0;
  }
  function V(e2) {
    C.caret.save(), o("keyup", e2);
  }
  function A(e2) {
    C.caret.save(), o("touchend", e2);
  }
  function I(e2, t2) {
    if (d.value !== null) {
      t2 === true && C.caret.savePosition();
      const o2 = `inner${v.value === true ? "Text" : "HTML"}`;
      d.value[o2] = e2, t2 === true && (C.caret.restorePosition(d.value[o2].length), N());
    }
  }
  function H(e2, t2, o2 = true) {
    j(), C.caret.restore(), C.caret.apply(e2, t2, () => {
      j(), C.caret.save(), o2 && N();
    });
  }
  function N() {
    setTimeout(() => {
      p2.value = null, a.$forceUpdate();
    }, 1);
  }
  function j() {
    addFocusFn$1(() => {
      d.value !== null && d.value.focus();
    });
  }
  function U() {
    return d.value;
  }
  return Object.assign(a, { runCmd: H, refreshToolbar: N, focus: j, getContentEl: U }), onMounted(() => {
    C.caret = a.caret = new Caret(d.value, C), I(e.modelValue), N();
  }), () => {
    let t2;
    if (k.value) {
      const e2 = [h("div", { key: "qedt_top", class: "q-editor__toolbar row no-wrap scroll-x" + y.value }, getToolbar(C))];
      p2.value !== null && e2.push(h("div", { key: "qedt_btm", class: "q-editor__toolbar row no-wrap items-center scroll-x" + y.value }, getLinkEditor(C))), t2 = h("div", { key: "toolbar_ctainer", class: "q-editor__toolbars-container" }, e2);
    }
    return h("div", __spreadProps(__spreadValues({ ref: c, class: T.value, style: { height: r.value === true ? "100vh" : null } }, $.value), { onFocusin: L, onFocusout: z }), [t2, h("div", __spreadProps(__spreadValues(__spreadValues({ ref: d, style: q.value, class: P.value, contenteditable: m.value, placeholder: e.placeholder }, {}), u.listeners.value), { onInput: M, onKeydown: B, onClick: Q, onBlur: E, onFocus: O, onMousedown: F, onTouchstartPassive: D, onMouseup: R, onKeyup: V, onTouchend: A }))]);
  };
} }), QItemLabel = defineComponent({ name: "QItemLabel", props: { overline: Boolean, caption: Boolean, header: Boolean, lines: [Number, String] }, setup(e, { slots: t }) {
  const o = computed(() => parseInt(e.lines, 10)), n = computed(() => "q-item__label" + (e.overline === true ? " q-item__label--overline text-overline" : "") + (e.caption === true ? " q-item__label--caption text-caption" : "") + (e.header === true ? " q-item__label--header" : "") + (o.value === 1 ? " ellipsis" : "")), a = computed(() => {
    return e.lines !== void 0 && o.value > 1 ? { overflow: "hidden", display: "-webkit-box", "-webkit-box-orient": "vertical", "-webkit-line-clamp": o.value } : null;
  });
  return () => h("div", { style: a.value, class: n.value }, hSlot$1(t.default));
} }), QSlideTransition = defineComponent({ name: "QSlideTransition", props: { appear: Boolean, duration: { type: Number, default: 300 } }, emits: ["show", "hide"], setup(e, { slots: t, emit: o }) {
  let n, a, l, i, r, s, u = false;
  function c() {
    n && n(), n = null, u = false, clearTimeout(l), clearTimeout(i), a !== void 0 && a.removeEventListener("transitionend", r), r = null;
  }
  function d(t2, o2, a2) {
    t2.style.overflowY = "hidden", o2 !== void 0 && (t2.style.height = `${o2}px`), t2.style.transition = `height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`, u = true, n = a2;
  }
  function p2(e2, t2) {
    e2.style.overflowY = null, e2.style.height = null, e2.style.transition = null, c(), t2 !== s && o(t2);
  }
  function v(t2, o2) {
    let n2 = 0;
    a = t2, u === true ? (c(), n2 = t2.offsetHeight === t2.scrollHeight ? 0 : void 0) : s = "hide", d(t2, n2, o2), l = setTimeout(() => {
      t2.style.height = `${t2.scrollHeight}px`, r = (e2) => {
        Object(e2) === e2 && e2.target !== t2 || p2(t2, "show");
      }, t2.addEventListener("transitionend", r), i = setTimeout(r, 1.1 * e.duration);
    }, 100);
  }
  function m(t2, o2) {
    let n2;
    a = t2, u === true ? c() : (s = "show", n2 = t2.scrollHeight), d(t2, n2, o2), l = setTimeout(() => {
      t2.style.height = 0, r = (e2) => {
        Object(e2) === e2 && e2.target !== t2 || p2(t2, "hide");
      }, t2.addEventListener("transitionend", r), i = setTimeout(r, 1.1 * e.duration);
    }, 100);
  }
  return onBeforeUnmount(() => {
    u === true && c();
  }), () => h(Transition, { css: false, appear: e.appear, onEnter: v, onLeave: m }, t.default);
} });
const insetMap = { true: "inset", item: "item-inset", "item-thumbnail": "item-thumbnail-inset" }, margins = { xs: 2, sm: 4, md: 8, lg: 16, xl: 24 };
var QSeparator = defineComponent({ name: "QSeparator", props: __spreadProps(__spreadValues({}, useDarkProps$1), { spaced: [Boolean, String], inset: [Boolean, String], vertical: Boolean, color: String, size: String }), setup(e) {
  const t = getCurrentInstance(), o = useDark$1(e, t.proxy.$q), n = computed(() => e.vertical === true ? "vertical" : "horizontal"), a = computed(() => ` q-separator--${n.value}`), l = computed(() => e.inset !== false ? `${a.value}-${insetMap[e.inset]}` : ""), i = computed(() => `q-separator${a.value}${l.value}` + (e.color !== void 0 ? ` bg-${e.color}` : "") + (o.value === true ? " q-separator--dark" : "")), r = computed(() => {
    const t2 = {};
    if (e.size !== void 0 && (t2[e.vertical === true ? "width" : "height"] = e.size), e.spaced !== false) {
      const o2 = e.spaced === true ? `${margins.md}px` : e.spaced in margins ? `${margins[e.spaced]}px` : e.spaced, n2 = e.vertical === true ? ["Left", "Right"] : ["Top", "Bottom"];
      t2[`margin${n2[0]}`] = t2[`margin${n2[1]}`] = o2;
    }
    return t2;
  });
  return () => h("hr", { class: i.value, style: r.value, "aria-orientation": n.value });
} });
let buf$1, bufIdx$1 = 0;
const hexBytes$1 = new Array(256);
for (let e = 0; e < 256; e++)
  hexBytes$1[e] = (e + 256).toString(16).substr(1);
const randomBytes$1 = (() => {
  const e = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (e !== void 0) {
    if (e.randomBytes !== void 0)
      return e.randomBytes;
    if (e.getRandomValues !== void 0)
      return (t) => {
        const o = new Uint8Array(t);
        return e.getRandomValues(o), o;
      };
  }
  return (e2) => {
    const t = [];
    for (let o = e2; o > 0; o--)
      t.push(Math.floor(256 * Math.random()));
    return t;
  };
})(), BUFFER_SIZE$1 = 4096;
function uid$2() {
  (buf$1 === void 0 || bufIdx$1 + 16 > BUFFER_SIZE$1) && (bufIdx$1 = 0, buf$1 = randomBytes$1(BUFFER_SIZE$1));
  const e = Array.prototype.slice.call(buf$1, bufIdx$1, bufIdx$1 += 16);
  return e[6] = 15 & e[6] | 64, e[8] = 63 & e[8] | 128, hexBytes$1[e[0]] + hexBytes$1[e[1]] + hexBytes$1[e[2]] + hexBytes$1[e[3]] + "-" + hexBytes$1[e[4]] + hexBytes$1[e[5]] + "-" + hexBytes$1[e[6]] + hexBytes$1[e[7]] + "-" + hexBytes$1[e[8]] + hexBytes$1[e[9]] + "-" + hexBytes$1[e[10]] + hexBytes$1[e[11]] + hexBytes$1[e[12]] + hexBytes$1[e[13]] + hexBytes$1[e[14]] + hexBytes$1[e[15]];
}
const itemGroups = shallowReactive({}), LINK_PROPS = Object.keys(useRouterLinkProps);
var QExpansionItem = defineComponent({ name: "QExpansionItem", props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useRouterLinkProps), useModelToggleProps), useDarkProps$1), { icon: String, label: String, labelLines: [Number, String], caption: String, captionLines: [Number, String], dense: Boolean, expandIcon: String, expandedIcon: String, expandIconClass: [Array, String, Object], duration: Number, headerInsetLevel: Number, contentInsetLevel: Number, expandSeparator: Boolean, defaultOpened: Boolean, expandIconToggle: Boolean, switchToggleSide: Boolean, denseToggle: Boolean, group: String, popup: Boolean, headerStyle: [Array, String, Object], headerClass: [Array, String, Object] }), emits: [...useModelToggleEmits, "click", "after-show", "after-hide"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = useDark$1(e, n), l = ref(e.modelValue !== null ? e.modelValue : e.defaultOpened), i = ref(null), { hide: r, toggle: s } = useModelToggle({ showing: l });
  let u, c;
  const d = computed(() => `q-expansion-item q-item-type q-expansion-item--${l.value === true ? "expanded" : "collapsed"} q-expansion-item--${e.popup === true ? "popup" : "standard"}`), p2 = computed(() => {
    if (e.contentInsetLevel === void 0)
      return null;
    const t2 = n.lang.rtl === true ? "Right" : "Left";
    return { ["padding" + t2]: 56 * e.contentInsetLevel + "px" };
  }), v = computed(() => e.disable !== true && e.to !== void 0 && e.to !== null && e.to !== ""), m = computed(() => {
    const t2 = {};
    return LINK_PROPS.forEach((o2) => {
      t2[o2] = e[o2];
    }), t2;
  }), f = computed(() => v.value === true || e.expandIconToggle !== true), g = computed(() => e.expandedIcon !== void 0 && l.value === true ? e.expandedIcon : e.expandIcon || n.iconSet.expansionItem[e.denseToggle === true ? "denseIcon" : "icon"]), b = computed(() => e.disable !== true && (v.value === true || e.expandIconToggle === true));
  function y(e2) {
    v.value !== true && s(e2), o("click", e2);
  }
  function S(e2) {
    e2.keyCode === 13 && w(e2, true);
  }
  function w(e2, t2) {
    t2 !== true && i.value !== null && i.value.focus(), s(e2), stopAndPrevent$1(e2);
  }
  function x() {
    o("after-show");
  }
  function C() {
    o("after-hide");
  }
  function k() {
    u === void 0 && (u = uid$2()), l.value === true && (itemGroups[e.group] = u);
    const t2 = watch(l, (t3) => {
      t3 === true ? itemGroups[e.group] = u : itemGroups[e.group] === u && delete itemGroups[e.group];
    }), o2 = watch(() => itemGroups[e.group], (e2, t3) => {
      t3 === u && e2 !== void 0 && e2 !== u && r();
    });
    c = () => {
      t2(), o2(), itemGroups[e.group] === u && delete itemGroups[e.group], c = void 0;
    };
  }
  function _() {
    const t2 = { class: [`q-focusable relative-position cursor-pointer${e.denseToggle === true && e.switchToggleSide === true ? " items-end" : ""}`, e.expandIconClass], side: e.switchToggleSide !== true, avatar: e.switchToggleSide }, o2 = [h(QIcon$1, { class: "q-expansion-item__toggle-icon" + (e.expandedIcon === void 0 && l.value === true ? " q-expansion-item__toggle-icon--rotated" : ""), name: g.value })];
    return b.value === true && (Object.assign(t2, { tabindex: 0, onClick: w, onKeyup: S }), o2.unshift(h("div", { ref: i, class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded", tabindex: -1 }))), h(QItemSection, t2, () => o2);
  }
  function q() {
    let o2;
    return t.header !== void 0 ? o2 = [].concat(t.header()) : (o2 = [h(QItemSection, () => [h(QItemLabel, { lines: e.labelLines }, () => e.label || ""), e.caption ? h(QItemLabel, { lines: e.captionLines, caption: true }, () => e.caption) : null])], e.icon && o2[e.switchToggleSide === true ? "push" : "unshift"](h(QItemSection, { side: e.switchToggleSide === true, avatar: e.switchToggleSide !== true }, () => h(QIcon$1, { name: e.icon })))), e.disable !== true && o2[e.switchToggleSide === true ? "unshift" : "push"](_()), o2;
  }
  function T() {
    const t2 = { ref: "item", style: e.headerStyle, class: e.headerClass, dark: a.value, disable: e.disable, dense: e.dense, insetLevel: e.headerInsetLevel };
    return f.value === true && (t2.clickable = true, t2.onClick = y, v.value === true && Object.assign(t2, m.value)), h(QItem, t2, q);
  }
  function P() {
    return withDirectives(h("div", { key: "e-content", class: "q-expansion-item__content relative-position", style: p2.value }, hSlot$1(t.default)), [[vShow, l.value]]);
  }
  function $() {
    const t2 = [T(), h(QSlideTransition, { duration: e.duration, onShow: x, onHide: C }, P)];
    return e.expandSeparator === true && t2.push(h(QSeparator, { class: "q-expansion-item__border q-expansion-item__border--top absolute-top", dark: a.value }), h(QSeparator, { class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom", dark: a.value })), t2;
  }
  return watch(() => e.group, (e2) => {
    c !== void 0 && c(), e2 !== void 0 && k();
  }), e.group !== void 0 && k(), onBeforeUnmount(() => {
    c !== void 0 && c();
  }), () => h("div", { class: d.value }, [h("div", { class: "q-expansion-item__container relative-position" }, $())]);
} });
const labelPositions = ["top", "right", "bottom", "left"], useFabProps = { type: { type: String, default: "a" }, outline: Boolean, push: Boolean, flat: Boolean, unelevated: Boolean, color: String, textColor: String, glossy: Boolean, square: Boolean, padding: String, label: { type: [String, Number], default: "" }, labelPosition: { type: String, default: "right", validator: (e) => labelPositions.includes(e) }, externalLabel: Boolean, hideLabel: { type: Boolean }, labelClass: [Array, String, Object], labelStyle: [Array, String, Object], disable: Boolean, tabindex: [Number, String] };
function useFab(e, t) {
  return { formClass: computed(() => `q-fab--form-${e.square === true ? "square" : "rounded"}`), stacked: computed(() => e.externalLabel === false && ["top", "bottom"].includes(e.labelPosition)), labelProps: computed(() => {
    if (e.externalLabel === true) {
      const o = e.hideLabel === null ? t.value === false : e.hideLabel;
      return { action: "push", data: { class: [e.labelClass, `q-fab__label q-tooltip--style q-fab__label--external q-fab__label--external-${e.labelPosition}` + (o === true ? " q-fab__label--external-hidden" : "")], style: e.labelStyle } };
    }
    return { action: ["left", "top"].includes(e.labelPosition) ? "unshift" : "push", data: { class: [e.labelClass, `q-fab__label q-fab__label--internal q-fab__label--internal-${e.labelPosition}` + (e.hideLabel === true ? " q-fab__label--internal-hidden" : "")], style: e.labelStyle } };
  }) };
}
const directions = ["up", "right", "down", "left"], alignValues = ["left", "center", "right"];
var QFab = defineComponent({ name: "QFab", props: __spreadProps(__spreadValues(__spreadValues({}, useFabProps), useModelToggleProps), { icon: String, activeIcon: String, hideIcon: Boolean, hideLabel: { default: null }, direction: { type: String, default: "right", validator: (e) => directions.includes(e) }, persistent: Boolean, verticalActionsAlign: { type: String, default: "center", validator: (e) => alignValues.includes(e) } }), emits: useModelToggleEmits, setup(e, { slots: t }) {
  const o = ref(null), n = ref(e.modelValue === true), { proxy: { $q: a } } = getCurrentInstance(), { formClass: l, labelProps: i } = useFab(e, n), r = computed(() => e.persistent !== true), { hide: s, toggle: u } = useModelToggle({ showing: n, hideOnRouteChange: r }), c = computed(() => `q-fab z-fab row inline justify-center q-fab--align-${e.verticalActionsAlign} ${l.value}` + (n.value === true ? " q-fab--opened" : " q-fab--closed")), d = computed(() => `q-fab__actions flex no-wrap inline q-fab__actions--${e.direction} q-fab__actions--${n.value === true ? "opened" : "closed"}`), p2 = computed(() => `q-fab__icon-holder  q-fab__icon-holder--${n.value === true ? "opened" : "closed"}`);
  function v() {
    const o2 = [];
    return e.hideIcon !== true && o2.push(h("div", { class: p2.value }, [h(QIcon$1, { class: "q-fab__icon absolute-full", name: e.icon || a.iconSet.fab.icon }), h(QIcon$1, { class: "q-fab__active-icon absolute-full", name: e.activeIcon || a.iconSet.fab.activeIcon })])), e.label !== "" && o2[i.value.action](h("div", i.value.data, [e.label])), hMergeSlot$1(t.tooltip, o2);
  }
  return provide(fabKey, { showing: n, onChildClick(e2) {
    s(e2), o.value !== null && o.value.$el.focus();
  } }), () => h("div", { class: c.value }, [h(QBtn, __spreadProps(__spreadValues({ ref: o, class: l.value }, e), { noWrap: true, stack: e.stacked, align: void 0, icon: void 0, label: void 0, noCaps: true, fab: true, "aria-expanded": n.value === true ? "true" : "false", "aria-haspopup": "true", onClick: u }), v), h("div", { class: d.value }, hSlot$1(t.default))]);
} });
const anchorMap = { start: "self-end", center: "self-center", end: "self-start" }, anchorValues = Object.keys(anchorMap);
var QFabAction = defineComponent({ name: "QFabAction", props: __spreadProps(__spreadValues({}, useFabProps), { icon: { type: String, default: "" }, anchor: { type: String, validator: (e) => anchorValues.includes(e) }, to: [String, Object], replace: Boolean }), emits: ["click"], setup(e, { slots: t, emit: o }) {
  const n = inject(fabKey, () => ({ showing: { value: true }, onChildClick: noop })), { formClass: a, labelProps: l } = useFab(e, n.showing), i = computed(() => {
    const t2 = anchorMap[e.anchor];
    return a.value + (t2 !== void 0 ? ` ${t2}` : "");
  }), r = computed(() => e.disable === true || n.showing.value !== true);
  function s(e2) {
    n.onChildClick(e2), o("click", e2);
  }
  function u() {
    const o2 = [];
    return e.icon !== "" && o2.push(h(QIcon$1, { name: e.icon })), e.label !== "" && o2[l.value.action](h("div", l.value.data, [e.label])), hMergeSlot$1(t.default, o2);
  }
  const c = getCurrentInstance();
  return Object.assign(c.proxy, { click: s }), () => h(QBtn, __spreadProps(__spreadValues({ class: i.value }, e), { noWrap: true, stack: e.stacked, icon: void 0, label: void 0, noCaps: true, fabMini: true, disable: r.value, onClick: s }), u);
} });
function useFormChild$1({ validate: e, resetValidation: t, requiresQForm: o }) {
  const n = inject(formKey$1, false);
  if (n !== false) {
    const { props: o2, proxy: a } = getCurrentInstance();
    Object.assign(a, { validate: e, resetValidation: t }), watch(() => o2.disable, (e2) => {
      e2 === true ? (typeof t === "function" && t(), n.unbindComponent(a)) : n.bindComponent(a);
    }), o2.disable !== true && n.bindComponent(a), onBeforeUnmount(() => {
      o2.disable !== true && n.unbindComponent(a);
    });
  } else
    o === true && console.error("Parent QForm not found on useFormChild()!");
}
const lazyRulesValues$1 = [true, false, "ondemand"], useValidateProps$1 = { modelValue: {}, error: { type: Boolean, default: null }, errorMessage: String, noErrorIcon: Boolean, rules: Array, reactiveRules: Boolean, lazyRules: { type: [Boolean, String], validator: (e) => lazyRulesValues$1.includes(e) } };
function useValidate$1(e, t) {
  const { props: o, proxy: n } = getCurrentInstance(), a = ref(false), l = ref(null), i = ref(null);
  useFormChild$1({ validate: v, resetValidation: p2 });
  let r, s = 0;
  const u = computed(() => o.rules !== void 0 && o.rules !== null && o.rules.length > 0), c = computed(() => o.error === true || a.value === true), d = computed(() => typeof o.errorMessage === "string" && o.errorMessage.length > 0 ? o.errorMessage : l.value);
  function p2() {
    s++, t.value = false, i.value = null, a.value = false, l.value = null;
  }
  function v(e2 = o.modelValue) {
    if (u.value !== true)
      return true;
    s++, t.value !== true && o.lazyRules !== true && (i.value = true);
    const n2 = (e3, o2) => {
      a.value !== e3 && (a.value = e3);
      const n3 = o2 || void 0;
      l.value !== n3 && (l.value = n3), t.value !== false && (t.value = false);
    }, r2 = [];
    for (let t2 = 0; t2 < o.rules.length; t2++) {
      const a2 = o.rules[t2];
      let l2;
      if (typeof a2 === "function" ? l2 = a2(e2) : typeof a2 === "string" && testPattern$1[a2] !== void 0 && (l2 = testPattern$1[a2](e2)), l2 === false || typeof l2 === "string")
        return n2(true, l2), false;
      l2 !== true && l2 !== void 0 && r2.push(l2);
    }
    if (r2.length === 0)
      return n2(false), true;
    t.value !== true && (t.value = true);
    const c2 = s;
    return Promise.all(r2).then((e3) => {
      if (c2 !== s)
        return true;
      if (e3 === void 0 || Array.isArray(e3) === false || e3.length === 0)
        return n2(false), true;
      const t2 = e3.find((e4) => e4 === false || typeof e4 === "string");
      return n2(t2 !== void 0, t2), t2 === void 0;
    }, (e3) => {
      return c2 !== s || (console.error(e3), n2(true), false);
    });
  }
  function m(e2) {
    u.value === true && o.lazyRules !== "ondemand" && (i.value === true || o.lazyRules !== true && e2 !== true) && v();
  }
  return watch(() => o.modelValue, () => {
    m();
  }), watch(() => o.reactiveRules, (e2) => {
    e2 === true ? r === void 0 && (r = watch(() => o.rules, () => {
      m(true);
    })) : r !== void 0 && (r(), r = void 0);
  }, { immediate: true }), watch(e, (e2) => {
    o.lazyRules !== "ondemand" && (e2 === true ? i.value === null && (i.value = false) : i.value === false && u.value === true && (i.value = true, v()));
  }), onBeforeUnmount(() => {
    r !== void 0 && r();
  }), Object.assign(n, { resetValidation: p2, validate: v }), Object.defineProperty(n, "hasError", { get: () => c.value }), { isDirtyModel: i, hasRules: u, hasError: c, computedErrorMessage: d, validate: v, resetValidation: p2 };
}
function getTargetUid$1(e) {
  return e === void 0 ? `f_${uid$2()}` : e;
}
function fieldValueIsFilled$1(e) {
  return e !== void 0 && e !== null && ("" + e).length > 0;
}
const useFieldProps$1 = __spreadProps(__spreadValues(__spreadValues({}, useDarkProps$1), useValidateProps$1), { label: String, stackLabel: Boolean, hint: String, hideHint: Boolean, prefix: String, suffix: String, labelColor: String, color: String, bgColor: String, filled: Boolean, outlined: Boolean, borderless: Boolean, standout: [Boolean, String], square: Boolean, loading: Boolean, labelSlot: Boolean, bottomSlots: Boolean, hideBottomSpace: Boolean, rounded: Boolean, dense: Boolean, itemAligned: Boolean, counter: Boolean, clearable: Boolean, clearIcon: String, disable: Boolean, readonly: Boolean, autofocus: Boolean, for: String, maxlength: [Number, String] }), useFieldEmits$1 = ["update:modelValue", "clear", "focus", "blur", "popup-show", "popup-hide"];
function useFieldState$1() {
  const { props: e, attrs: t, proxy: o } = getCurrentInstance(), n = useDark$1(e, o.$q);
  return { isDark: n, editable: computed(() => e.disable !== true && e.readonly !== true), innerLoading: ref(false), focused: ref(false), hasPopupOpen: ref(false), splitAttrs: useSplitAttrs$1(t), targetUid: ref(getTargetUid$1(e.for)), rootRef: ref(null), targetRef: ref(null), controlRef: ref(null) };
}
function useField$1(e) {
  const { props: t, emit: o, slots: n, attrs: a, proxy: l } = getCurrentInstance(), { $q: i } = l;
  let r;
  e.hasValue === void 0 && (e.hasValue = computed(() => fieldValueIsFilled$1(t.modelValue))), e.emitValue === void 0 && (e.emitValue = (e2) => {
    o("update:modelValue", e2);
  }), e.controlEvents === void 0 && (e.controlEvents = { onFocusin: q, onFocusout: T }), Object.assign(e, { clearValue: P, onControlFocusin: q, onControlFocusout: T, focus: k }), e.computedCounter === void 0 && (e.computedCounter = computed(() => {
    if (t.counter !== false) {
      const e2 = typeof t.modelValue === "string" || typeof t.modelValue === "number" ? ("" + t.modelValue).length : Array.isArray(t.modelValue) === true ? t.modelValue.length : 0, o2 = t.maxlength !== void 0 ? t.maxlength : t.maxValues;
      return e2 + (o2 !== void 0 ? " / " + o2 : "");
    }
  }));
  const { isDirtyModel: s, hasRules: u, hasError: c, computedErrorMessage: d, resetValidation: p2 } = useValidate$1(e.focused, e.innerLoading), v = e.floatingLabel !== void 0 ? computed(() => t.stackLabel === true || e.focused.value === true || e.floatingLabel.value === true) : computed(() => t.stackLabel === true || e.focused.value === true || e.hasValue.value === true), m = computed(() => t.bottomSlots === true || t.hint !== void 0 || u.value === true || t.counter === true || t.error !== null), f = computed(() => {
    return t.filled === true ? "filled" : t.outlined === true ? "outlined" : t.borderless === true ? "borderless" : t.standout ? "standout" : "standard";
  }), g = computed(() => `q-field row no-wrap items-start q-field--${f.value}` + (e.fieldClass !== void 0 ? ` ${e.fieldClass.value}` : "") + (t.rounded === true ? " q-field--rounded" : "") + (t.square === true ? " q-field--square" : "") + (v.value === true ? " q-field--float" : "") + (y.value === true ? " q-field--labeled" : "") + (t.dense === true ? " q-field--dense" : "") + (t.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (e.isDark.value === true ? " q-field--dark" : "") + (e.getControl === void 0 ? " q-field--auto-height" : "") + (e.focused.value === true ? " q-field--focused" : "") + (c.value === true ? " q-field--error" : "") + (c.value === true || e.focused.value === true ? " q-field--highlighted" : "") + (t.hideBottomSpace !== true && m.value === true ? " q-field--with-bottom" : "") + (t.disable === true ? " q-field--disabled" : t.readonly === true ? " q-field--readonly" : "")), b = computed(() => "q-field__control relative-position row no-wrap" + (t.bgColor !== void 0 ? ` bg-${t.bgColor}` : "") + (c.value === true ? " text-negative" : typeof t.standout === "string" && t.standout.length > 0 && e.focused.value === true ? ` ${t.standout}` : t.color !== void 0 ? ` text-${t.color}` : "")), y = computed(() => t.labelSlot === true || t.label !== void 0), S = computed(() => "q-field__label no-pointer-events absolute ellipsis" + (t.labelColor !== void 0 && c.value !== true ? ` text-${t.labelColor}` : "")), w = computed(() => ({ id: e.targetUid.value, editable: e.editable.value, focused: e.focused.value, floatingLabel: v.value, modelValue: t.modelValue, emitValue: e.emitValue })), x = computed(() => {
    const o2 = { for: e.targetUid.value };
    return t.disable === true ? o2["aria-disabled"] = "true" : t.readonly === true && (o2["aria-readonly"] = "true"), o2;
  });
  let C;
  function k() {
    C !== void 0 && removeFocusFn(C), C = addFocusFn$1(() => {
      C = void 0;
      const t2 = document.activeElement;
      let o2 = e.targetRef !== void 0 && e.targetRef.value;
      !o2 || t2 !== null && t2.id === e.targetUid.value || (o2.hasAttribute("tabindex") === true || (o2 = o2.querySelector("[tabindex]")), o2 && o2 !== t2 && o2.focus());
    });
  }
  function _() {
    C !== void 0 && removeFocusFn(C);
    const t2 = document.activeElement;
    t2 !== null && e.rootRef.value.contains(t2) && t2.blur();
  }
  function q(t2) {
    e.editable.value === true && e.focused.value === false && (e.focused.value = true, o("focus", t2));
  }
  function T(t2, n2) {
    clearTimeout(r), r = setTimeout(() => {
      (document.hasFocus() !== true || e.hasPopupOpen.value !== true && (e.controlRef === void 0 || e.controlRef.value !== null && e.controlRef.value.contains(document.activeElement) === false)) && (e.focused.value === true && (e.focused.value = false, o("blur", t2)), n2 !== void 0 && n2());
    });
  }
  function P(n2) {
    if (stopAndPrevent$1(n2), i.platform.is.mobile !== true) {
      const t2 = e.targetRef !== void 0 && e.targetRef.value || e.rootRef.value;
      t2.focus();
    } else
      e.rootRef.value.contains(document.activeElement) === true && document.activeElement.blur();
    t.type === "file" && (e.inputRef.value.value = null), o("update:modelValue", null), o("clear", t.modelValue), nextTick(() => {
      p2(), t.lazyRules !== "ondemand" && i.platform.is.mobile !== true && (s.value = false);
    });
  }
  function $() {
    const o2 = [];
    return n.prepend !== void 0 && o2.push(h("div", { class: "q-field__prepend q-field__marginal row no-wrap items-center", key: "prepend", onClick: prevent$1 }, n.prepend())), o2.push(h("div", { class: "q-field__control-container col relative-position row no-wrap q-anchor--skip" }, M())), n.append !== void 0 && o2.push(h("div", { class: "q-field__append q-field__marginal row no-wrap items-center", key: "append", onClick: prevent$1 }, n.append())), c.value === true && t.noErrorIcon === false && o2.push(Q("error", [h(QIcon$1, { name: i.iconSet.field.error, color: "negative" })])), t.loading === true || e.innerLoading.value === true ? o2.push(Q("inner-loading-append", n.loading !== void 0 ? n.loading() : [h(QSpinner$1, { color: t.color })])) : t.clearable === true && e.hasValue.value === true && e.editable.value === true && o2.push(Q("inner-clearable-append", [h(QIcon$1, { class: "q-field__focusable-action", tag: "button", name: t.clearIcon || i.iconSet.field.clear, tabindex: 0, type: "button", onClick: P })])), e.getInnerAppend !== void 0 && o2.push(Q("inner-append", e.getInnerAppend())), e.getControlChild !== void 0 && o2.push(e.getControlChild()), o2;
  }
  function M() {
    const o2 = [];
    return t.prefix !== void 0 && t.prefix !== null && o2.push(h("div", { class: "q-field__prefix no-pointer-events row items-center" }, t.prefix)), e.getShadowControl !== void 0 && e.hasShadow.value === true && o2.push(e.getShadowControl()), e.getControl !== void 0 ? o2.push(e.getControl()) : n.rawControl !== void 0 ? o2.push(n.rawControl()) : n.control !== void 0 && o2.push(h("div", __spreadProps(__spreadValues({ ref: e.targetRef, class: "q-field__native row" }, e.splitAttrs.attributes.value), { "data-autofocus": t.autofocus === true || void 0 }), n.control(w.value))), y.value === true && o2.push(h("div", { class: S.value }, hSlot$1(n.label, t.label))), t.suffix !== void 0 && t.suffix !== null && o2.push(h("div", { class: "q-field__suffix no-pointer-events row items-center" }, t.suffix)), o2.concat(hSlot$1(n.default));
  }
  function B() {
    let o2, a2;
    c.value === true ? d.value !== null ? (o2 = [h("div", { role: "alert" }, d.value)], a2 = `q--slot-error-${d.value}`) : (o2 = hSlot$1(n.error), a2 = "q--slot-error") : t.hideHint === true && e.focused.value !== true || (t.hint !== void 0 ? (o2 = [h("div", t.hint)], a2 = `q--slot-hint-${t.hint}`) : (o2 = hSlot$1(n.hint), a2 = "q--slot-hint"));
    const l2 = t.counter === true || n.counter !== void 0;
    if (t.hideBottomSpace === true && l2 === false && o2 === void 0)
      return;
    const i2 = h("div", { key: a2, class: "q-field__messages col" }, o2);
    return h("div", { class: "q-field__bottom row items-start q-field__bottom--" + (t.hideBottomSpace !== true ? "animated" : "stale") }, [t.hideBottomSpace === true ? i2 : h(Transition, { name: "q-transition--field-message" }, () => i2), l2 === true ? h("div", { class: "q-field__counter" }, n.counter !== void 0 ? n.counter() : e.computedCounter.value) : null]);
  }
  function Q(e2, t2) {
    return t2 === null ? null : h("div", { key: e2, class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip" }, t2);
  }
  return watch(() => t.for, (t2) => {
    e.targetUid.value = getTargetUid$1(t2);
  }), Object.assign(l, { focus: k, blur: _ }), onMounted(() => {
    isRuntimeSsrPreHydration$1.value === true && t.for === void 0 && (e.targetUid.value = getTargetUid$1()), t.autofocus === true && l.focus();
  }), onBeforeUnmount(() => {
    clearTimeout(r);
  }), function() {
    return h("label", __spreadValues({ ref: e.rootRef, class: [g.value, a.class], style: a.style }, x.value), [n.before !== void 0 ? h("div", { class: "q-field__before q-field__marginal row no-wrap items-center", onClick: prevent$1 }, n.before()) : null, h("div", { class: "q-field__inner relative-position col self-stretch" }, [h("div", __spreadValues({ ref: e.controlRef, class: b.value, tabindex: -1 }, e.controlEvents), $()), m.value === true ? B() : null]), n.after !== void 0 ? h("div", { class: "q-field__after q-field__marginal row no-wrap items-center", onClick: prevent$1 }, n.after()) : null]);
  };
}
var QField = defineComponent({ name: "QField", inheritAttrs: false, props: useFieldProps$1, emits: useFieldEmits$1, setup() {
  return useField$1(useFieldState$1());
} });
function filterFiles(e, t, o, n) {
  const a = [];
  return e.forEach((e2) => {
    n(e2) === true ? a.push(e2) : t.push({ failedPropValidation: o, file: e2 });
  }), a;
}
function stopAndPreventDrag(e) {
  e && e.dataTransfer && (e.dataTransfer.dropEffect = "copy"), stopAndPrevent$1(e);
}
const useFileProps = { multiple: Boolean, accept: String, capture: String, maxFileSize: [Number, String], maxTotalSize: [Number, String], maxFiles: [Number, String], filter: Function }, useFileEmits = ["rejected"];
function useFile({ editable: e, dnd: t, getFileInput: o, addFilesToQueue: n }) {
  const { props: a, emit: l, proxy: i } = getCurrentInstance(), r = computed(() => a.accept !== void 0 ? a.accept.split(",").map((e2) => {
    return e2 = e2.trim(), e2 === "*" ? "*/" : (e2.endsWith("/*") && (e2 = e2.slice(0, e2.length - 1)), e2.toUpperCase());
  }) : null), s = computed(() => parseInt(a.maxFiles, 10)), u = computed(() => parseInt(a.maxTotalSize, 10));
  function c(t2) {
    if (e.value) {
      const e2 = o();
      e2 && e2.click(t2);
    }
  }
  function d(t2) {
    e.value && t2 && n(null, t2);
  }
  function p2(e2, t2, o2, n2) {
    let i2 = Array.from(t2 || e2.target.files);
    const c2 = [], d2 = () => {
      c2.length > 0 && l("rejected", c2);
    };
    if (a.accept !== void 0 && r.value.indexOf("*/") === -1 && (i2 = filterFiles(i2, c2, "accept", (e3) => {
      return r.value.some((t3) => e3.type.toUpperCase().startsWith(t3) || e3.name.toUpperCase().endsWith(t3));
    }), i2.length === 0))
      return d2();
    if (a.maxFileSize !== void 0) {
      const e3 = parseInt(a.maxFileSize, 10);
      if (i2 = filterFiles(i2, c2, "max-file-size", (t3) => {
        return t3.size <= e3;
      }), i2.length === 0)
        return d2();
    }
    if (a.multiple !== true && (i2 = [i2[0]]), a.maxTotalSize !== void 0) {
      let e3 = n2 === true ? o2.reduce((e4, t3) => e4 + t3.size, 0) : 0;
      if (i2 = filterFiles(i2, c2, "max-total-size", (t3) => {
        return e3 += t3.size, e3 <= u.value;
      }), i2.length === 0)
        return d2();
    }
    if (typeof a.filter === "function") {
      const e3 = a.filter(i2);
      i2 = filterFiles(i2, c2, "filter", (t3) => {
        return e3.includes(t3);
      });
    }
    if (a.maxFiles !== void 0) {
      let e3 = n2 === true ? o2.length : 0;
      if (i2 = filterFiles(i2, c2, "max-files", () => {
        return e3++, e3 <= s.value;
      }), i2.length === 0)
        return d2();
    }
    return d2(), i2.length > 0 ? i2 : void 0;
  }
  function v(e2) {
    stopAndPreventDrag(e2), t.value !== true && (t.value = true);
  }
  function m(e2) {
    stopAndPrevent$1(e2), t.value = false;
  }
  function f(e2) {
    stopAndPreventDrag(e2);
    const o2 = e2.dataTransfer.files;
    o2.length > 0 && n(null, o2), t.value = false;
  }
  function g(e2) {
    if (t.value === true)
      return h("div", { class: `q-${e2}__dnd absolute-full`, onDragenter: stopAndPreventDrag, onDragover: stopAndPreventDrag, onDragleave: m, onDrop: f });
  }
  return Object.assign(i, { pickFiles: c, addFiles: d }), { pickFiles: c, addFiles: d, onDragover: v, processFiles: p2, getDndNode: g, maxFilesNumber: s, maxTotalSizeNumber: u };
}
function useFileFormDomProps$1(e, t) {
  function o() {
    const t2 = e.modelValue;
    try {
      const e2 = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      return Object(t2) === t2 && ("length" in t2 ? Array.from(t2) : [t2]).forEach((t3) => {
        e2.items.add(t3);
      }), { files: e2.files };
    } catch (e2) {
      return { files: void 0 };
    }
  }
  return computed(t === true ? () => {
    if (e.type === "file")
      return o();
  } : o);
}
var QFile = defineComponent({ name: "QFile", inheritAttrs: false, props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useFieldProps$1), useFormProps$1), useFileProps), { modelValue: [File, FileList, Array], append: Boolean, useChips: Boolean, displayValue: [String, Number], tabindex: { type: [String, Number], default: 0 }, counterLabel: Function, inputClass: [Array, String, Object], inputStyle: [Array, String, Object] }), emits: [...useFieldEmits$1, ...useFileEmits], setup(e, { slots: t, emit: o, attrs: n }) {
  const { proxy: a } = getCurrentInstance(), l = useFieldState$1(), i = ref(null), r = ref(false), s = useFormInputNameAttr$1(e), { pickFiles: u, onDragover: c, processFiles: d, getDndNode: p2 } = useFile({ editable: l.editable, dnd: r, getFileInput: q, addFilesToQueue: T }), v = useFileFormDomProps$1(e), m = computed(() => Object(e.modelValue) === e.modelValue ? "length" in e.modelValue ? Array.from(e.modelValue) : [e.modelValue] : []), f = computed(() => fieldValueIsFilled$1(m.value)), g = computed(() => m.value.map((e2) => e2.name).join(", ")), b = computed(() => humanStorageSize(m.value.reduce((e2, t2) => e2 + t2.size, 0))), y = computed(() => ({ totalSize: b.value, filesNumber: m.value.length, maxFiles: e.maxFiles })), S = computed(() => __spreadProps(__spreadValues({ tabindex: -1, type: "file", title: "", accept: e.accept, capture: e.capture, name: s.value }, n), { id: l.targetUid.value, disabled: l.editable.value !== true })), w = computed(() => e.multiple === true && e.append === true);
  function x(e2) {
    const t2 = m.value.slice();
    t2.splice(e2, 1), k(t2);
  }
  function C(e2) {
    const t2 = m.value.findIndex(e2);
    t2 > -1 && x(t2);
  }
  function k(t2) {
    o("update:modelValue", e.multiple === true ? t2 : t2[0]);
  }
  function _(e2) {
    e2.keyCode === 13 && u(e2);
  }
  function q() {
    return i.value;
  }
  function T(t2, o2) {
    const n2 = d(t2, o2, m.value, w.value);
    n2 !== void 0 && ((e.multiple === true ? e.modelValue && n2.every((e2) => m.value.includes(e2)) : e.modelValue === n2[0]) || k(w.value === true ? m.value.concat(n2) : n2));
  }
  function P() {
    return [h("input", { class: [e.inputClass, "q-file__filler"], style: e.inputStyle, tabindex: -1 })];
  }
  function $() {
    if (t.file !== void 0)
      return m.value.length === 0 ? P() : m.value.map((e2, o3) => t.file({ index: o3, file: e2, ref: this }));
    if (t.selected !== void 0)
      return m.value.length === 0 ? P() : t.selected({ files: m.value, ref: this });
    if (e.useChips === true)
      return m.value.length === 0 ? P() : m.value.map((t2, o3) => h(QChip, { key: "file-" + o3, removable: l.editable.value, dense: true, textColor: e.color, tabindex: e.tabindex, onRemove: () => {
        x(o3);
      } }, () => h("span", { class: "ellipsis", textContent: t2.name })));
    const o2 = e.displayValue !== void 0 ? e.displayValue : g.value;
    return o2.length > 0 ? [h("div", { class: e.inputClass, style: e.inputStyle, textContent: o2 })] : P();
  }
  function M() {
    const t2 = __spreadProps(__spreadValues(__spreadValues({ ref: i }, S.value), v.value), { class: "q-field__input fit absolute-full cursor-pointer", onChange: T });
    return e.multiple === true && (t2.multiple = true), h("input", t2);
  }
  return Object.assign(l, { fieldClass: { value: "q-file q-field--auto-height" }, emitValue: k, hasValue: f, inputRef: i, innerValue: m, floatingLabel: computed(() => f.value === true || fieldValueIsFilled$1(e.displayValue)), computedCounter: computed(() => {
    if (e.counterLabel !== void 0)
      return e.counterLabel(y.value);
    const t2 = e.maxFiles;
    return `${m.value.length}${t2 !== void 0 ? " / " + t2 : ""} (${b.value})`;
  }), getControlChild: () => p2("file"), getControl: () => {
    const t2 = { ref: l.targetRef, class: "q-field__native row items-center cursor-pointer", tabindex: e.tabindex };
    return l.editable.value === true && Object.assign(t2, { onDragover: c, onKeyup: _ }), h("div", t2, [M()].concat($()));
  } }), Object.assign(a, { removeAtIndex: x, removeFile: C, getNativeElement: () => i.value }), useField$1(l);
} }), QFooter = defineComponent({ name: "QFooter", props: { modelValue: { type: Boolean, default: true }, reveal: Boolean, bordered: Boolean, elevated: Boolean, heightHint: { type: [String, Number], default: 50 } }, emits: ["reveal", "focusin"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = inject(layoutKey, () => {
    console.error("QFooter needs to be child of QLayout");
  }), l = ref(parseInt(e.heightHint, 10)), i = ref(true), r = ref(isRuntimeSsrPreHydration$1.value === true || a.isContainer.value === true ? 0 : window.innerHeight), s = computed(() => e.reveal === true || a.view.value.indexOf("F") > -1 || a.isContainer.value === true), u = computed(() => a.isContainer.value === true ? a.containerHeight.value : r.value), c = computed(() => {
    if (e.modelValue !== true)
      return 0;
    if (s.value === true)
      return i.value === true ? l.value : 0;
    const t2 = a.scroll.value.position + u.value + l.value - a.height.value;
    return t2 > 0 ? t2 : 0;
  }), d = computed(() => e.modelValue !== true || s.value === true && i.value !== true), p2 = computed(() => e.modelValue === true && d.value === true && e.reveal === true), v = computed(() => "q-footer q-layout__section--marginal " + (s.value === true ? "fixed" : "absolute") + "-bottom" + (e.bordered === true ? " q-footer--bordered" : "") + (d.value === true ? " q-footer--hidden" : "") + (e.modelValue !== true ? " q-layout--prevent-focus" + (s.value !== true ? " hidden" : "") : "")), m = computed(() => {
    const e2 = a.rows.value.bottom, t2 = {};
    return e2[0] === "l" && a.left.space === true && (t2[n.lang.rtl === true ? "right" : "left"] = `${a.left.size}px`), e2[2] === "r" && a.right.space === true && (t2[n.lang.rtl === true ? "left" : "right"] = `${a.right.size}px`), t2;
  });
  function f(e2, t2) {
    a.update("footer", e2, t2);
  }
  function g(e2, t2) {
    e2.value !== t2 && (e2.value = t2);
  }
  function b({ height: e2 }) {
    g(l, e2), f("size", e2);
  }
  function y() {
    if (e.reveal !== true)
      return;
    const { direction: t2, position: o2, inflectionPoint: n2 } = a.scroll.value;
    g(i, t2 === "up" || o2 - n2 < 100 || a.height.value - u.value - o2 - l.value < 300);
  }
  function S(e2) {
    p2.value === true && g(i, true), o("focusin", e2);
  }
  watch(() => e.modelValue, (e2) => {
    f("space", e2), g(i, true), a.animate();
  }), watch(c, (e2) => {
    f("offset", e2);
  }), watch(() => e.reveal, (t2) => {
    t2 === false && g(i, e.modelValue);
  }), watch(i, (e2) => {
    a.animate(), o("reveal", e2);
  }), watch([l, a.scroll, a.height], y), watch(() => n.screen.height, (e2) => {
    a.isContainer.value !== true && g(r, e2);
  });
  const w = {};
  return a.instances.footer = w, e.modelValue === true && f("size", l.value), f("space", e.modelValue), f("offset", c.value), onBeforeUnmount(() => {
    a.instances.footer === w && (a.instances.footer = void 0, f("size", 0), f("offset", 0), f("space", false));
  }), () => {
    const o2 = hMergeSlot$1(t.default, [h(QResizeObserver, { debounce: 0, onResize: b })]);
    return e.elevated === true && o2.push(h("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), h("footer", { class: v.value, style: m.value, onFocusin: S }, o2);
  };
} }), QForm = defineComponent({ name: "QForm", props: { autofocus: Boolean, noErrorFocus: Boolean, noResetFocus: Boolean, greedy: Boolean, onSubmit: Function }, emits: ["reset", "validation-success", "validation-error"], setup(e, { slots: t, emit: o }) {
  const n = getCurrentInstance(), a = ref(null);
  let l = 0;
  const i = [];
  function r(t2) {
    const n2 = [], a2 = typeof t2 === "boolean" ? t2 : e.noErrorFocus !== true;
    l++;
    const r2 = (e2, t3) => {
      o("validation-" + (e2 === true ? "success" : "error"), t3);
    };
    for (let o2 = 0; o2 < i.length; o2++) {
      const t3 = i[o2], l2 = t3.validate();
      if (typeof l2.then === "function")
        n2.push(l2.then((e2) => ({ valid: e2, comp: t3 }), (e2) => ({ valid: false, comp: t3, error: e2 })));
      else if (l2 !== true) {
        if (e.greedy === false)
          return r2(false, t3), a2 === true && typeof t3.focus === "function" && t3.focus(), Promise.resolve(false);
        n2.push({ valid: false, comp: t3 });
      }
    }
    if (n2.length === 0)
      return r2(true), Promise.resolve(true);
    const s2 = l;
    return Promise.all(n2).then((e2) => {
      if (s2 === l) {
        const t3 = e2.filter((e3) => e3.valid !== true);
        if (t3.length === 0)
          return r2(true), true;
        const { valid: o2, comp: n3 } = t3[0];
        return r2(false, n3), a2 === true && o2 !== true && typeof n3.focus === "function" && n3.focus(), false;
      }
    });
  }
  function s() {
    l++, i.forEach((e2) => {
      typeof e2.resetValidation === "function" && e2.resetValidation();
    });
  }
  function u(t2) {
    t2 !== void 0 && stopAndPrevent$1(t2), r().then((n2) => {
      n2 === true && (e.onSubmit !== void 0 ? o("submit", t2) : t2 !== void 0 && t2.target !== void 0 && typeof t2.target.submit === "function" && t2.target.submit());
    });
  }
  function c(t2) {
    t2 !== void 0 && stopAndPrevent$1(t2), o("reset"), nextTick(() => {
      s(), e.autofocus === true && e.noResetFocus !== true && d();
    });
  }
  function d() {
    addFocusFn$1(() => {
      if (a.value === null)
        return;
      const e2 = a.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(a.value.querySelectorAll("[tabindex]"), (e3) => e3.tabIndex > -1);
      e2 !== null && e2 !== void 0 && e2.focus();
    });
  }
  return provide(formKey$1, { bindComponent(e2) {
    i.push(e2);
  }, unbindComponent(e2) {
    const t2 = i.indexOf(e2);
    t2 > -1 && i.splice(t2, 1);
  } }), onMounted(() => {
    e.autofocus === true && d();
  }), Object.assign(n.proxy, { validate: r, resetValidation: s, submit: u, reset: c, focus: d, getValidationComponents: () => i }), () => h("form", { class: "q-form", ref: a, onSubmit: u, onReset: c }, hSlot$1(t.default));
} }), QFormChildMixin = { inject: { [formKey$1]: { default: noop } }, watch: { disable(e) {
  const t = this.$.provides[formKey$1];
  t !== void 0 && (e === true ? (this.resetValidation(), t.unbindComponent(this)) : t.bindComponent(this));
} }, methods: { validate() {
}, resetValidation() {
} }, created() {
  const e = this.$.provides[formKey$1];
  e !== void 0 && this.disable !== true && e.bindComponent(this);
}, beforeUnmount() {
  const e = this.$.provides[formKey$1];
  e !== void 0 && this.disable !== true && e.unbindComponent(this);
} }, QHeader = defineComponent({ name: "QHeader", props: { modelValue: { type: Boolean, default: true }, reveal: Boolean, revealOffset: { type: Number, default: 250 }, bordered: Boolean, elevated: Boolean, heightHint: { type: [String, Number], default: 50 } }, emits: ["reveal", "focusin"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = inject(layoutKey, () => {
    console.error("QHeader needs to be child of QLayout");
  }), l = ref(parseInt(e.heightHint, 10)), i = ref(true), r = computed(() => e.reveal === true || a.view.value.indexOf("H") > -1 || a.isContainer.value === true), s = computed(() => {
    if (e.modelValue !== true)
      return 0;
    if (r.value === true)
      return i.value === true ? l.value : 0;
    const t2 = l.value - a.scroll.value.position;
    return t2 > 0 ? t2 : 0;
  }), u = computed(() => e.modelValue !== true || r.value === true && i.value !== true), c = computed(() => e.modelValue === true && u.value === true && e.reveal === true), d = computed(() => "q-header q-layout__section--marginal " + (r.value === true ? "fixed" : "absolute") + "-top" + (e.bordered === true ? " q-header--bordered" : "") + (u.value === true ? " q-header--hidden" : "") + (e.modelValue !== true ? " q-layout--prevent-focus" : "")), p2 = computed(() => {
    const e2 = a.rows.value.top, t2 = {};
    return e2[0] === "l" && a.left.space === true && (t2[n.lang.rtl === true ? "right" : "left"] = `${a.left.size}px`), e2[2] === "r" && a.right.space === true && (t2[n.lang.rtl === true ? "left" : "right"] = `${a.right.size}px`), t2;
  });
  function v(e2, t2) {
    a.update("header", e2, t2);
  }
  function m(e2, t2) {
    e2.value !== t2 && (e2.value = t2);
  }
  function f({ height: e2 }) {
    m(l, e2), v("size", e2);
  }
  function g(e2) {
    c.value === true && m(i, true), o("focusin", e2);
  }
  watch(() => e.modelValue, (e2) => {
    v("space", e2), m(i, true), a.animate();
  }), watch(s, (e2) => {
    v("offset", e2);
  }), watch(() => e.reveal, (t2) => {
    t2 === false && m(i, e.modelValue);
  }), watch(i, (e2) => {
    a.animate(), o("reveal", e2);
  }), watch(a.scroll, (t2) => {
    e.reveal === true && m(i, t2.direction === "up" || t2.position <= e.revealOffset || t2.position - t2.inflectionPoint < 100);
  });
  const b = {};
  return a.instances.header = b, e.modelValue === true && v("size", l.value), v("space", e.modelValue), v("offset", s.value), onBeforeUnmount(() => {
    a.instances.header === b && (a.instances.header = void 0, v("size", 0), v("offset", 0), v("space", false));
  }), () => {
    const o2 = hUniqueSlot(t.default, []);
    return e.elevated === true && o2.push(h("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), o2.push(h(QResizeObserver, { debounce: 0, onResize: f })), h("header", { class: d.value, style: p2.value, onFocusin: g }, o2);
  };
} });
const useRatioProps = { ratio: [String, Number] };
function useRatio(e, t) {
  return computed(() => {
    const o = Number(e.ratio || (t !== void 0 ? t.value : void 0));
    return isNaN(o) !== true && o > 0 ? { paddingBottom: `${100 / o}%` } : null;
  });
}
const defaultRatio = 16 / 9;
var QImg = defineComponent({ name: "QImg", props: __spreadProps(__spreadValues({}, useRatioProps), { src: String, srcset: String, sizes: String, alt: String, crossorigin: String, decoding: String, referrerpolicy: String, draggable: Boolean, loading: { type: String, default: "lazy" }, width: String, height: String, initialRatio: { type: [Number, String], default: defaultRatio }, placeholderSrc: String, fit: { type: String, default: "cover" }, position: { type: String, default: "50% 50%" }, imgClass: String, imgStyle: Object, noSpinner: Boolean, noNativeMenu: Boolean, noTransition: Boolean, spinnerColor: String, spinnerSize: String }), emits: ["load", "error"], setup(e, { slots: t, emit: o }) {
  const n = ref(e.initialRatio), a = useRatio(e, n);
  let l;
  const i = [ref(null), ref(e.placeholderSrc !== void 0 ? { src: e.placeholderSrc } : null)], r = ref(0), s = ref(false), u = ref(false), c = computed(() => `q-img q-img--${e.noNativeMenu === true ? "no-" : ""}menu`), d = computed(() => ({ width: e.width, height: e.height })), p2 = computed(() => `q-img__image ${e.imgClass !== void 0 ? e.imgClass + " " : ""}q-img__image--with${e.noTransition === true ? "out" : ""}-transition`), v = computed(() => __spreadProps(__spreadValues({}, e.imgStyle), { objectFit: e.fit, objectPosition: e.position }));
  function m() {
    return e.src || e.srcset || e.sizes ? { src: e.src, srcset: e.srcset, sizes: e.sizes } : null;
  }
  function f(e2) {
    if (clearTimeout(l), u.value = false, e2 === null)
      return s.value = false, i[0].value = null, void (i[1].value = null);
    s.value = true, i[r.value].value = e2;
  }
  function g({ target: e2 }) {
    l !== null && (clearTimeout(l), n.value = e2.naturalHeight === 0 ? 0.5 : e2.naturalWidth / e2.naturalHeight, b(e2, 1));
  }
  function b(e2, t2) {
    l !== null && t2 !== 1e3 && (e2.complete === true ? y(e2) : l = setTimeout(() => {
      b(e2, t2 + 1);
    }, 50));
  }
  function y(e2) {
    l !== null && (r.value = r.value === 1 ? 0 : 1, i[r.value].value = null, s.value = false, u.value = false, o("load", e2.currentSrc || e2.src));
  }
  function S(e2) {
    clearTimeout(l), s.value = false, u.value = true, i[0].value = null, i[1].value = null, o("error", e2);
  }
  function w(e2, t2) {
    return h("div", { class: "q-img__container absolute-full", key: e2 }, t2);
  }
  function x(t2) {
    const o2 = i[t2].value, n2 = __spreadValues({ key: "img_" + t2, class: p2.value, style: v.value, crossorigin: e.crossorigin, decoding: e.decoding, referrerpolicy: e.referrerpolicy, height: e.height, width: e.width, loading: e.loading, "aria-hidden": "true", draggable: e.draggable }, o2);
    return r.value === t2 ? (n2.class += " q-img__image--waiting", Object.assign(n2, { onLoad: g, onError: S })) : n2.class += " q-img__image--loaded", w("img" + t2, h("img", n2));
  }
  function C() {
    return s.value !== true ? h("div", { key: "content", class: "q-img__content absolute-full q-anchor--skip" }, hSlot$1(t[u.value === true ? "error" : "default"])) : h("div", { key: "loading", class: "q-img__loading absolute-full flex flex-center" }, t.loading !== void 0 ? t.loading() : e.noSpinner === true ? void 0 : [h(QSpinner$1, { color: e.spinnerColor, size: e.spinnerSize })]);
  }
  return watch(() => m(), f), f(m()), onBeforeUnmount(() => {
    clearTimeout(l), l = null;
  }), () => {
    const t2 = [];
    return a.value !== null && t2.push(h("div", { key: "filler", style: a.value })), u.value !== true && (i[0].value !== null && t2.push(x(0)), i[1].value !== null && t2.push(x(1))), t2.push(h(Transition, { name: "q-transition--fade" }, C)), h("div", { class: c.value, style: d.value, role: "img", "aria-label": e.alt }, t2);
  };
} }), QInfiniteScroll = defineComponent({ name: "QInfiniteScroll", props: { offset: { type: Number, default: 500 }, debounce: { type: [String, Number], default: 100 }, scrollTarget: { default: void 0 }, initialIndex: Number, disable: Boolean, reverse: Boolean }, emits: ["load"], setup(e, { slots: t, emit: o }) {
  const n = ref(false), a = ref(null);
  let l, i, r = e.initialIndex || 0, s = true;
  const u = computed(() => "q-infinite-scroll__loading" + (n.value === true ? "" : " invisible"));
  function c() {
    if (e.disable === true || n.value === true || s === false)
      return;
    const t2 = getScrollHeight(l), o2 = getVerticalScrollPosition(l), a2 = height(l);
    e.reverse === false ? o2 + a2 + e.offset >= t2 && d() : o2 < e.offset && d();
  }
  function d() {
    if (e.disable === true || n.value === true || s === false)
      return;
    r++, n.value = true;
    const t2 = getScrollHeight(l);
    o("load", r, (o2) => {
      s === true && (n.value = false, nextTick(() => {
        if (e.reverse === true) {
          const e2 = getScrollHeight(l), o3 = getVerticalScrollPosition(l), n2 = e2 - t2;
          setVerticalScrollPosition(l, o3 + n2);
        }
        o2 === true ? m() : a.value && a.value.closest("body") && i();
      }));
    });
  }
  function p2() {
    r = 0;
  }
  function v() {
    s === false && (s = true, l.addEventListener("scroll", i, listenOpts$1.passive)), c();
  }
  function m() {
    s === true && (s = false, n.value = false, l.removeEventListener("scroll", i, listenOpts$1.passive));
  }
  function f() {
    l && s === true && l.removeEventListener("scroll", i, listenOpts$1.passive), l = getScrollTarget(a.value, e.scrollTarget), s === true && l.addEventListener("scroll", i, listenOpts$1.passive);
  }
  function g(e2) {
    r = e2;
  }
  const b = getCurrentInstance();
  function y(e2) {
    e2 = parseInt(e2, 10);
    const t2 = i;
    i = e2 <= 0 ? c : debounce(c, isNaN(e2) === true ? 100 : e2), l && s === true && (t2 !== void 0 && l.removeEventListener("scroll", t2, listenOpts$1.passive), l.addEventListener("scroll", i, listenOpts$1.passive));
  }
  return Object.assign(b.proxy, { poll: () => {
    i !== void 0 && i();
  }, trigger: d, stop: m, reset: p2, resume: v, setIndex: g }), watch(() => e.disable, (e2) => {
    e2 === true ? m() : v();
  }), watch(() => e.scrollTarget, f), watch(() => e.debounce, y), onBeforeUnmount(() => {
    s === true && l.removeEventListener("scroll", i, listenOpts$1.passive);
  }), onMounted(() => {
    if (y(e.debounce), f(), e.reverse === true) {
      const e2 = getScrollHeight(l), t2 = height(l);
      setVerticalScrollPosition(l, e2 - t2);
    }
    c();
  }), () => {
    const o2 = hUniqueSlot(t.default, []);
    return e.disable !== true && s === true && o2[e.reverse === false ? "push" : "unshift"](h("div", { class: u.value }, hSlot$1(t.loading))), h("div", { class: "q-infinite-scroll", ref: a }, o2);
  };
} }), QInnerLoading = defineComponent({ name: "QInnerLoading", props: __spreadProps(__spreadValues(__spreadValues({}, useDarkProps$1), useTransitionProps), { showing: Boolean, color: String, size: { type: [String, Number], default: 42 }, label: String, labelClass: String, labelStyle: [String, Array, Object] }), setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark$1(e, o.proxy.$q), { transition: a, transitionStyle: l } = useTransition(e, computed(() => e.showing)), i = computed(() => "q-inner-loading absolute-full column flex-center" + (n.value === true ? " q-inner-loading--dark" : "")), r = computed(() => "q-inner-loading__label" + (e.labelClass !== void 0 ? ` ${e.labelClass}` : ""));
  function s() {
    const t2 = [h(QSpinner$1, { size: e.size, color: e.color })];
    return e.label !== void 0 && t2.push(h("div", { class: r.value, style: e.labelStyle }, [e.label])), t2;
  }
  function u() {
    return e.showing === true ? h("div", { class: i.value, style: l.value }, t.default !== void 0 ? t.default() : s()) : null;
  }
  return () => h(Transition, { name: a.value, appear: true }, u);
} });
const NAMED_MASKS$1 = { date: "####/##/##", datetime: "####/##/## ##:##", time: "##:##", fulltime: "##:##:##", phone: "(###) ### - ####", card: "#### #### #### ####" }, TOKENS$1 = { "#": { pattern: "[\\d]", negate: "[^\\d]" }, S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" }, N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" }, A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (e) => e.toLocaleUpperCase() }, a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (e) => e.toLocaleLowerCase() }, X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (e) => e.toLocaleUpperCase() }, x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (e) => e.toLocaleLowerCase() } }, KEYS$1 = Object.keys(TOKENS$1);
KEYS$1.forEach((e) => {
  TOKENS$1[e].regex = new RegExp(TOKENS$1[e].pattern);
});
const tokenRegexMask$1 = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS$1.join("") + "])|(.)", "g"), escRegex$1 = /[.*+?^${}()|[\]\\]/g, MARKER$1 = String.fromCharCode(1), useMaskProps$1 = { mask: String, reverseFillMask: Boolean, fillMask: [Boolean, String], unmaskedValue: Boolean };
function useMask$1(e, t, o, n) {
  let a, l, i, r;
  const s = ref(null), u = ref(d());
  function c() {
    return e.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(e.type);
  }
  function d() {
    if (v(), s.value === true) {
      const t2 = b(S(e.modelValue));
      return e.fillMask !== false ? w(t2) : t2;
    }
    return e.modelValue;
  }
  function p2(e2) {
    if (e2 < a.length)
      return a.slice(-e2);
    let t2 = "", o2 = a;
    const n2 = o2.indexOf(MARKER$1);
    if (n2 > -1) {
      for (let n3 = e2 - o2.length; n3 > 0; n3--)
        t2 += MARKER$1;
      o2 = o2.slice(0, n2) + t2 + o2.slice(n2);
    }
    return o2;
  }
  function v() {
    if (s.value = e.mask !== void 0 && e.mask.length > 0 && c(), s.value === false)
      return r = void 0, a = "", void (l = "");
    const t2 = NAMED_MASKS$1[e.mask] === void 0 ? e.mask : NAMED_MASKS$1[e.mask], o2 = typeof e.fillMask === "string" && e.fillMask.length > 0 ? e.fillMask.slice(0, 1) : "_", n2 = o2.replace(escRegex$1, "\\$&"), u2 = [], d2 = [], p3 = [];
    let v2 = e.reverseFillMask === true, m2 = "", f2 = "";
    t2.replace(tokenRegexMask$1, (e2, t3, o3, n3, a2) => {
      if (n3 !== void 0) {
        const e3 = TOKENS$1[n3];
        p3.push(e3), f2 = e3.negate, v2 === true && (d2.push("(?:" + f2 + "+)?(" + e3.pattern + "+)?(?:" + f2 + "+)?(" + e3.pattern + "+)?"), v2 = false), d2.push("(?:" + f2 + "+)?(" + e3.pattern + ")?");
      } else if (o3 !== void 0)
        m2 = "\\" + (o3 === "\\" ? "" : o3), p3.push(o3), u2.push("([^" + m2 + "]+)?" + m2 + "?");
      else {
        const e3 = t3 !== void 0 ? t3 : a2;
        m2 = e3 === "\\" ? "\\\\\\\\" : e3.replace(escRegex$1, "\\\\$&"), p3.push(e3), u2.push("([^" + m2 + "]+)?" + m2 + "?");
      }
    });
    const h3 = new RegExp("^" + u2.join("") + "(" + (m2 === "" ? "." : "[^" + m2 + "]") + "+)?$"), g2 = d2.length - 1, b2 = d2.map((t3, o3) => {
      return o3 === 0 && e.reverseFillMask === true ? new RegExp("^" + n2 + "*" + t3) : o3 === g2 ? new RegExp("^" + t3 + "(" + (f2 === "" ? "." : f2) + "+)?" + (e.reverseFillMask === true ? "$" : n2 + "*")) : new RegExp("^" + t3);
    });
    i = p3, r = (e2) => {
      const t3 = h3.exec(e2);
      t3 !== null && (e2 = t3.slice(1).join(""));
      const o3 = [], n3 = b2.length;
      for (let a2 = 0, l2 = e2; a2 < n3; a2++) {
        const e3 = b2[a2].exec(l2);
        if (e3 === null)
          break;
        l2 = l2.slice(e3.shift().length), o3.push(...e3);
      }
      return o3.length > 0 ? o3.join("") : e2;
    }, a = p3.map((e2) => typeof e2 === "string" ? e2 : MARKER$1).join(""), l = a.split(MARKER$1).join(o2);
  }
  function m(t2, i2, r2) {
    const s2 = n.value, c2 = s2.selectionEnd, d2 = s2.value.length - c2, p3 = S(t2);
    i2 === true && v();
    const m2 = b(p3), f2 = e.fillMask !== false ? w(m2) : m2, g2 = u.value !== f2;
    s2.value !== f2 && (s2.value = f2), g2 === true && (u.value = f2), document.activeElement === s2 && nextTick(() => {
      if (f2 !== l)
        if (r2 !== "insertFromPaste" || e.reverseFillMask === true)
          if (["deleteContentBackward", "deleteContentForward"].indexOf(r2) > -1) {
            const t3 = e.reverseFillMask === true ? c2 === 0 ? f2.length > m2.length ? 1 : 0 : Math.max(0, f2.length - (f2 === l ? 0 : Math.min(m2.length, d2) + 1)) + 1 : c2;
            s2.setSelectionRange(t3, t3, "forward");
          } else if (e.reverseFillMask === true)
            if (g2 === true) {
              const e2 = Math.max(0, f2.length - (f2 === l ? 0 : Math.min(m2.length, d2 + 1)));
              e2 === 1 && c2 === 1 ? s2.setSelectionRange(e2, e2, "forward") : h2.rightReverse(s2, e2, e2);
            } else {
              const e2 = f2.length - d2;
              s2.setSelectionRange(e2, e2, "backward");
            }
          else if (g2 === true) {
            const e2 = Math.max(0, a.indexOf(MARKER$1), Math.min(m2.length, c2) - 1);
            h2.right(s2, e2, e2);
          } else {
            const e2 = c2 - 1;
            h2.right(s2, e2, e2);
          }
        else {
          const e2 = c2 - 1;
          h2.right(s2, e2, e2);
        }
      else {
        const t3 = e.reverseFillMask === true ? l.length : 0;
        s2.setSelectionRange(t3, t3, "forward");
      }
    });
    const y2 = e.unmaskedValue === true ? S(f2) : f2;
    e.modelValue !== y2 && o(y2, true);
  }
  function f(e2, t2, o2) {
    const n2 = b(S(e2.value));
    t2 = Math.max(0, a.indexOf(MARKER$1), Math.min(n2.length, t2)), e2.setSelectionRange(t2, o2, "forward");
  }
  watch(() => e.type + e.autogrow, v), watch(() => e.mask, (o2) => {
    if (o2 !== void 0)
      m(u.value, true);
    else {
      const o3 = S(u.value);
      v(), e.modelValue !== o3 && t("update:modelValue", o3);
    }
  }), watch(() => e.fillMask + e.reverseFillMask, () => {
    s.value === true && m(u.value, true);
  }), watch(() => e.unmaskedValue, () => {
    s.value === true && m(u.value);
  });
  const h2 = { left(e2, t2, o2, n2) {
    const l2 = a.slice(t2 - 1).indexOf(MARKER$1) === -1;
    let i2 = Math.max(0, t2 - 1);
    for (; i2 >= 0; i2--)
      if (a[i2] === MARKER$1) {
        t2 = i2, l2 === true && t2++;
        break;
      }
    if (i2 < 0 && a[t2] !== void 0 && a[t2] !== MARKER$1)
      return h2.right(e2, 0, 0);
    t2 >= 0 && e2.setSelectionRange(t2, n2 === true ? o2 : t2, "backward");
  }, right(e2, t2, o2, n2) {
    const l2 = e2.value.length;
    let i2 = Math.min(l2, o2 + 1);
    for (; i2 <= l2; i2++) {
      if (a[i2] === MARKER$1) {
        o2 = i2;
        break;
      }
      a[i2 - 1] === MARKER$1 && (o2 = i2);
    }
    if (i2 > l2 && a[o2 - 1] !== void 0 && a[o2 - 1] !== MARKER$1)
      return h2.left(e2, l2, l2);
    e2.setSelectionRange(n2 ? t2 : o2, o2, "forward");
  }, leftReverse(e2, t2, o2, n2) {
    const a2 = p2(e2.value.length);
    let l2 = Math.max(0, t2 - 1);
    for (; l2 >= 0; l2--) {
      if (a2[l2 - 1] === MARKER$1) {
        t2 = l2;
        break;
      }
      if (a2[l2] === MARKER$1 && (t2 = l2, l2 === 0))
        break;
    }
    if (l2 < 0 && a2[t2] !== void 0 && a2[t2] !== MARKER$1)
      return h2.rightReverse(e2, 0, 0);
    t2 >= 0 && e2.setSelectionRange(t2, n2 === true ? o2 : t2, "backward");
  }, rightReverse(e2, t2, o2, n2) {
    const a2 = e2.value.length, l2 = p2(a2), i2 = l2.slice(0, o2 + 1).indexOf(MARKER$1) === -1;
    let r2 = Math.min(a2, o2 + 1);
    for (; r2 <= a2; r2++)
      if (l2[r2 - 1] === MARKER$1) {
        o2 = r2, o2 > 0 && i2 === true && o2--;
        break;
      }
    if (r2 > a2 && l2[o2 - 1] !== void 0 && l2[o2 - 1] !== MARKER$1)
      return h2.leftReverse(e2, a2, a2);
    e2.setSelectionRange(n2 === true ? t2 : o2, o2, "forward");
  } };
  function g(t2) {
    if (shouldIgnoreKey$1(t2) === true)
      return;
    const o2 = n.value, a2 = o2.selectionStart, l2 = o2.selectionEnd;
    if (t2.keyCode === 37 || t2.keyCode === 39) {
      const n2 = h2[(t2.keyCode === 39 ? "right" : "left") + (e.reverseFillMask === true ? "Reverse" : "")];
      t2.preventDefault(), n2(o2, a2, l2, t2.shiftKey);
    } else
      t2.keyCode === 8 && e.reverseFillMask !== true && a2 === l2 ? h2.left(o2, a2, l2, true) : t2.keyCode === 46 && e.reverseFillMask === true && a2 === l2 && h2.rightReverse(o2, a2, l2, true);
  }
  function b(t2) {
    if (t2 === void 0 || t2 === null || t2 === "")
      return "";
    if (e.reverseFillMask === true)
      return y(t2);
    const o2 = i;
    let n2 = 0, a2 = "";
    for (let e2 = 0; e2 < o2.length; e2++) {
      const l2 = t2[n2], i2 = o2[e2];
      if (typeof i2 === "string")
        a2 += i2, l2 === i2 && n2++;
      else {
        if (l2 === void 0 || !i2.regex.test(l2))
          return a2;
        a2 += i2.transform !== void 0 ? i2.transform(l2) : l2, n2++;
      }
    }
    return a2;
  }
  function y(e2) {
    const t2 = i, o2 = a.indexOf(MARKER$1);
    let n2 = e2.length - 1, l2 = "";
    for (let a2 = t2.length - 1; a2 >= 0 && n2 > -1; a2--) {
      const i2 = t2[a2];
      let r2 = e2[n2];
      if (typeof i2 === "string")
        l2 = i2 + l2, r2 === i2 && n2--;
      else {
        if (r2 === void 0 || !i2.regex.test(r2))
          return l2;
        do {
          l2 = (i2.transform !== void 0 ? i2.transform(r2) : r2) + l2, n2--, r2 = e2[n2];
        } while (o2 === a2 && r2 !== void 0 && i2.regex.test(r2));
      }
    }
    return l2;
  }
  function S(e2) {
    return typeof e2 !== "string" || r === void 0 ? typeof e2 === "number" ? r("" + e2) : e2 : r(e2);
  }
  function w(t2) {
    return l.length - t2.length <= 0 ? t2 : e.reverseFillMask === true && t2.length > 0 ? l.slice(0, -t2.length) + t2 : t2 + l.slice(t2.length);
  }
  return { innerValue: u, hasMask: s, moveCursorForPaste: f, updateMaskValue: m, onMaskedKeydown: g };
}
const isJapanese$1 = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/, isChinese$1 = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u, isKorean$1 = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
function useKeyComposition$1(e) {
  return function(t) {
    if (t.type === "compositionend" || t.type === "change") {
      if (t.target.composing !== true)
        return;
      t.target.composing = false, e(t);
    } else
      t.type === "compositionupdate" ? typeof t.data === "string" && isJapanese$1.test(t.data) === false && isChinese$1.test(t.data) === false && isKorean$1.test(t.data) === false && (t.target.composing = false) : t.target.composing = true;
  };
}
var QInput$1 = defineComponent({ name: "QInput", inheritAttrs: false, props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useFieldProps$1), useMaskProps$1), useFormProps$1), { modelValue: { required: false }, shadowText: String, type: { type: String, default: "text" }, debounce: [String, Number], autogrow: Boolean, inputClass: [Array, String, Object], inputStyle: [Array, String, Object] }), emits: [...useFieldEmits$1, "paste", "change"], setup(e, { emit: t, attrs: o }) {
  const n = {};
  let a, l, i, r, s = NaN;
  const u = ref(null), c = useFormInputNameAttr$1(e), { innerValue: d, hasMask: p2, moveCursorForPaste: v, updateMaskValue: m, onMaskedKeydown: f } = useMask$1(e, t, $, u), g = useFileFormDomProps$1(e, true), b = computed(() => fieldValueIsFilled$1(d.value)), y = useKeyComposition$1(P), S = useFieldState$1(), w = computed(() => e.type === "textarea" || e.autogrow === true), x = computed(() => w.value === true || ["text", "search", "url", "tel", "password"].includes(e.type)), C = computed(() => {
    const t2 = __spreadProps(__spreadValues({}, S.splitAttrs.listeners.value), { onInput: P, onPaste: T, onChange: B, onBlur: Q, onFocus: stop$1 });
    return t2.onCompositionstart = t2.onCompositionupdate = t2.onCompositionend = y, p2.value === true && (t2.onKeydown = f), e.autogrow === true && (t2.onAnimationend = M), t2;
  }), k = computed(() => {
    const t2 = __spreadProps(__spreadValues({ tabindex: 0, "data-autofocus": e.autofocus === true || void 0, rows: e.type === "textarea" ? 6 : void 0, "aria-label": e.label, name: c.value }, S.splitAttrs.attributes.value), { id: S.targetUid.value, maxlength: e.maxlength, disabled: e.disable === true, readonly: e.readonly === true });
    return w.value === false && (t2.type = e.type), e.autogrow === true && (t2.rows = 1), t2;
  });
  function _() {
    addFocusFn$1(() => {
      const e2 = document.activeElement;
      u.value === null || u.value === e2 || e2 !== null && e2.id === S.targetUid.value || u.value.focus();
    });
  }
  function q() {
    u.value !== null && u.value.select();
  }
  function T(o2) {
    if (p2.value === true && e.reverseFillMask !== true) {
      const e2 = o2.target;
      v(e2, e2.selectionStart, e2.selectionEnd);
    }
    t("paste", o2);
  }
  function P(o2) {
    if (!o2 || !o2.target || o2.target.composing === true)
      return;
    if (e.type === "file")
      return void t("update:modelValue", o2.target.files);
    const n2 = o2.target.value;
    if (p2.value === true)
      m(n2, false, o2.inputType);
    else if ($(n2), x.value === true && o2.target === document.activeElement) {
      const { selectionStart: e2, selectionEnd: t2 } = o2.target;
      e2 !== void 0 && t2 !== void 0 && nextTick(() => {
        o2.target === document.activeElement && n2.indexOf(o2.target.value) === 0 && o2.target.setSelectionRange(e2, t2);
      });
    }
    e.autogrow === true && M();
  }
  function $(o2, u2) {
    r = () => {
      e.type !== "number" && n.hasOwnProperty("value") === true && delete n.value, e.modelValue !== o2 && s !== o2 && (u2 === true && (l = true), t("update:modelValue", o2), nextTick(() => {
        s === o2 && (s = NaN);
      })), r = void 0;
    }, e.type === "number" && (a = true, n.value = o2), e.debounce !== void 0 ? (clearTimeout(i), n.value = o2, i = setTimeout(r, e.debounce)) : r();
  }
  function M() {
    const e2 = u.value;
    if (e2 !== null) {
      const t2 = e2.parentNode.style;
      t2.marginBottom = e2.scrollHeight - 1 + "px", e2.style.height = "1px", e2.style.height = e2.scrollHeight + "px", t2.marginBottom = "";
    }
  }
  function B(e2) {
    y(e2), clearTimeout(i), r !== void 0 && r(), t("change", e2.target.value);
  }
  function Q(t2) {
    t2 !== void 0 && stop$1(t2), clearTimeout(i), r !== void 0 && r(), a = false, l = false, delete n.value, e.type !== "file" && setTimeout(() => {
      u.value !== null && (u.value.value = d.value !== void 0 ? d.value : "");
    });
  }
  function E() {
    return n.hasOwnProperty("value") === true ? n.value : d.value !== void 0 ? d.value : "";
  }
  watch(() => e.modelValue, (t2) => {
    if (p2.value === true) {
      if (l === true)
        return void (l = false);
      m(t2);
    } else
      d.value !== t2 && (d.value = t2, e.type === "number" && n.hasOwnProperty("value") === true && (a === true ? a = false : delete n.value));
    e.autogrow === true && nextTick(M);
  }), watch(() => e.autogrow, (e2) => {
    e2 === true ? nextTick(M) : u.value !== null && o.rows > 0 && (u.value.style.height = "auto");
  }), watch(() => e.dense, () => {
    e.autogrow === true && nextTick(M);
  }), onBeforeUnmount(() => {
    Q();
  }), onMounted(() => {
    e.autogrow === true && M();
  }), Object.assign(S, { innerValue: d, fieldClass: computed(() => `q-${w.value === true ? "textarea" : "input"}` + (e.autogrow === true ? " q-textarea--autogrow" : "")), hasShadow: computed(() => e.type !== "file" && typeof e.shadowText === "string" && e.shadowText.length > 0), inputRef: u, emitValue: $, hasValue: b, floatingLabel: computed(() => b.value === true || fieldValueIsFilled$1(e.displayValue)), getControl: () => {
    return h(w.value === true ? "textarea" : "input", __spreadValues(__spreadValues(__spreadValues({ ref: u, class: ["q-field__native q-placeholder", e.inputClass], style: e.inputStyle }, k.value), C.value), e.type !== "file" ? { value: E() } : g.value));
  }, getShadowControl: () => {
    return h("div", { class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (w.value === true ? "" : " text-no-wrap") }, [h("span", { class: "invisible" }, E()), h("span", e.shadowText)]);
  } });
  const O = useField$1(S), L = getCurrentInstance();
  return Object.assign(L.proxy, { focus: _, select: q, getNativeElement: () => u.value }), O;
} });
const defaultCfg$1 = { threshold: 0, root: null, rootMargin: "0px" };
function update$3(e, t, o) {
  let n, a, l;
  typeof o === "function" ? (n = o, a = defaultCfg$1, l = t.cfg === void 0) : (n = o.handler, a = Object.assign({}, defaultCfg$1, o.cfg), l = t.cfg === void 0 || isDeepEqual(t.cfg, a) === false), t.handler !== n && (t.handler = n), l === true && (t.cfg = a, t.observer !== void 0 && t.observer.unobserve(e), t.observer = new IntersectionObserver(([o2]) => {
    if (typeof t.handler === "function") {
      if (o2.rootBounds === null && document.body.contains(e) === true)
        return t.observer.unobserve(e), void t.observer.observe(e);
      const n2 = t.handler(o2, t.observer);
      (n2 === false || t.once === true && o2.isIntersecting === true) && destroy$1(e);
    }
  }, a), t.observer.observe(e));
}
function destroy$1(e) {
  const t = e.__qvisible;
  t !== void 0 && (t.observer !== void 0 && t.observer.unobserve(e), delete e.__qvisible);
}
var Intersection = { name: "intersection", mounted(e, { modifiers: t, value: o }) {
  const n = { once: t.once === true };
  update$3(e, n, o), e.__qvisible = n;
}, updated(e, t) {
  const o = e.__qvisible;
  o !== void 0 && update$3(e, o, t.value);
}, beforeUnmount: destroy$1 }, QIntersection = defineComponent({ name: "QIntersection", props: { tag: { type: String, default: "div" }, once: Boolean, transition: String, ssrPrerender: Boolean, margin: String, threshold: [Number, Array], root: { default: null }, disable: Boolean, onVisibility: Function }, setup(e, { slots: t, emit: o }) {
  const n = ref(isRuntimeSsrPreHydration$1.value === true && e.ssrPrerender), a = computed(() => e.root !== void 0 || e.margin !== void 0 || e.threshold !== void 0 ? { handler: r, cfg: { root: e.root, rootMargin: e.margin, threshold: e.threshold } } : r), l = computed(() => e.disable !== true && (isRuntimeSsrPreHydration$1.value !== true || e.once !== true || e.ssrPrerender !== true)), i = computed(() => {
    return [[Intersection, a.value, void 0, { once: e.once }]];
  });
  function r(t2) {
    n.value !== t2.isIntersecting && (n.value = t2.isIntersecting, e.onVisibility !== void 0 && o("visibility", n.value));
  }
  function s() {
    return n.value === true ? [h("div", { key: "content" }, hSlot$1(t.default))] : void 0;
  }
  return () => {
    const t2 = e.transition ? [h(Transition, { name: "q-transition--" + e.transition }, s)] : s();
    return hDir(e.tag, { class: "q-intersection" }, t2, "main", l.value, () => i.value);
  };
} }), QList = defineComponent({ name: "QList", props: __spreadProps(__spreadValues({}, useDarkProps$1), { bordered: Boolean, dense: Boolean, separator: Boolean, padding: Boolean }), setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark$1(e, o.proxy.$q), a = computed(() => "q-list" + (e.bordered === true ? " q-list--bordered" : "") + (e.dense === true ? " q-list--dense" : "") + (e.separator === true ? " q-list--separator" : "") + (n.value === true ? " q-list--dark" : "") + (e.padding === true ? " q-list--padding" : ""));
  return () => h("div", { class: a.value }, hSlot$1(t.default));
} });
const keyCodes$1 = [34, 37, 40, 33, 39, 38], commonPropsName = Object.keys(useCircularCommonProps);
var QKnob = defineComponent({ name: "QKnob", props: __spreadProps(__spreadValues(__spreadValues({}, useFormProps$1), useCircularCommonProps), { modelValue: { type: Number, required: true }, step: { type: Number, default: 1, validator: (e) => e >= 0 }, tabindex: { type: [Number, String], default: 0 }, disable: Boolean, readonly: Boolean }), emits: ["update:modelValue", "change", "drag-value"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = ref(e.modelValue), i = ref(false);
  let r, s;
  watch(() => e.modelValue, (t2) => {
    if (t2 < e.min)
      l.value = e.min;
    else {
      if (!(t2 > e.max))
        return void (t2 !== l.value && (l.value = t2));
      l.value = e.max;
    }
    l.value !== e.modelValue && (o("update:modelValue", l.value), o("change", l.value));
  });
  const u = computed(() => e.disable === false && e.readonly === false), c = computed(() => "q-knob non-selectable" + (u.value === true ? " q-knob--editable" : e.disable === true ? " disabled" : "")), d = computed(() => (String(e.step).trim("0").split(".")[1] || "").length), p2 = computed(() => e.step === 0 ? 1 : e.step), v = computed(() => e.instantFeedback === true || i.value === true), m = a.platform.is.mobile === true ? computed(() => u.value === true ? { onClick: x } : {}) : computed(() => u.value === true ? { onMousedown: w, onClick: x, onKeydown: C, onKeyup: _ } : {}), f = computed(() => u.value === true ? { tabindex: e.tabindex } : { [`aria-${e.disable === true ? "disabled" : "readonly"}`]: "true" }), g = computed(() => {
    const t2 = {};
    return commonPropsName.forEach((o2) => {
      t2[o2] = e[o2];
    }), t2;
  });
  function b(e2) {
    e2.isFinal ? (k(e2.evt, true), i.value = false) : e2.isFirst ? (S(), i.value = true, k(e2.evt)) : k(e2.evt);
  }
  const y = computed(() => {
    return [[TouchPan, b, void 0, { prevent: true, stop: true, mouse: true }]];
  });
  function S() {
    const { top: e2, left: t2, width: o2, height: n2 } = s.getBoundingClientRect();
    r = { top: e2 + n2 / 2, left: t2 + o2 / 2 };
  }
  function w(e2) {
    S(), k(e2);
  }
  function x(e2) {
    S(), k(e2, true);
  }
  function C(t2) {
    if (!keyCodes$1.includes(t2.keyCode))
      return;
    stopAndPrevent$1(t2);
    const o2 = ([34, 33].includes(t2.keyCode) ? 10 : 1) * p2.value, n2 = [34, 37, 40].includes(t2.keyCode) ? -o2 : o2;
    l.value = between(parseFloat((l.value + n2).toFixed(d.value)), e.min, e.max), q();
  }
  function k(t2, n2) {
    const i2 = position(t2), s2 = Math.abs(i2.top - r.top), u2 = Math.sqrt(s2 ** 2 + Math.abs(i2.left - r.left) ** 2);
    let c2 = Math.asin(s2 / u2) * (180 / Math.PI);
    c2 = i2.top < r.top ? r.left < i2.left ? 90 - c2 : 270 + c2 : r.left < i2.left ? c2 + 90 : 270 - c2, e.angle && (c2 = normalizeToInterval(c2 - e.angle, 0, 360)), a.lang.rtl === true && (c2 = 360 - c2);
    let v2 = e.min + c2 / 360 * (e.max - e.min);
    if (p2.value !== 0) {
      const e2 = v2 % p2.value;
      v2 = v2 - e2 + (Math.abs(e2) >= p2.value / 2 ? (e2 < 0 ? -1 : 1) * p2.value : 0), v2 = parseFloat(v2.toFixed(d.value));
    }
    v2 = between(v2, e.min, e.max), o("drag-value", v2), l.value !== v2 && (l.value = v2), q(n2);
  }
  function _(e2) {
    keyCodes$1.includes(e2.keyCode) && q(true);
  }
  function q(t2) {
    e.modelValue !== l.value && o("update:modelValue", l.value), t2 === true && o("change", l.value);
  }
  const T = useFormAttrs(e);
  function P() {
    return h("input", T.value);
  }
  return onMounted(() => {
    s = n.$el;
  }), () => {
    const o2 = __spreadValues(__spreadProps(__spreadValues(__spreadValues({ class: c.value, role: "slider", "aria-valuemin": e.min, "aria-valuemax": e.max, "aria-valuenow": e.modelValue }, f.value), g.value), { value: l.value, instantFeedback: v.value }), m.value), n2 = { default: t.default };
    return u.value === true ? (e.name !== void 0 && (n2.internal = P), withDirectives(h(QCircularProgress, o2, n2), y.value)) : h(QCircularProgress, o2, n2);
  };
} });
const { passive: passive$2 } = listenOpts$1, axisValues = ["both", "horizontal", "vertical"];
var QScrollObserver = defineComponent({ name: "QScrollObserver", props: { axis: { type: String, validator: (e) => axisValues.includes(e), default: "vertical" }, debounce: [String, Number], scrollTarget: { default: void 0 } }, emits: ["scroll"], setup(e, { emit: t }) {
  const o = { position: { top: 0, left: 0 }, direction: "down", directionChanged: false, delta: { top: 0, left: 0 }, inflectionPoint: { top: 0, left: 0 } };
  let n, a, l = null;
  function i() {
    l = null;
    const a2 = Math.max(0, getVerticalScrollPosition(n)), i2 = getHorizontalScrollPosition(n), r2 = { top: a2 - o.position.top, left: i2 - o.position.left };
    if (e.axis === "vertical" && r2.top === 0 || e.axis === "horizontal" && r2.left === 0)
      return;
    const s2 = Math.abs(r2.top) >= Math.abs(r2.left) ? r2.top < 0 ? "up" : "down" : r2.left < 0 ? "left" : "right";
    o.position = { top: a2, left: i2 }, o.directionChanged = o.direction !== s2, o.delta = r2, o.directionChanged === true && (o.direction = s2, o.inflectionPoint = o.position), t("scroll", __spreadValues({}, o));
  }
  function r() {
    n = getScrollTarget(a, e.scrollTarget), n.addEventListener("scroll", u, passive$2), u(true);
  }
  function s() {
    n !== void 0 && (n.removeEventListener("scroll", u, passive$2), n = void 0);
  }
  function u(t2) {
    t2 === true || e.debounce === 0 || e.debounce === "0" ? i() : l === null && (l = e.debounce ? setTimeout(i, e.debounce) : requestAnimationFrame(i));
  }
  watch(() => e.scrollTarget, () => {
    s(), r();
  });
  const c = getCurrentInstance();
  return onMounted(() => {
    a = c.proxy.$el.parentNode, r();
  }), onBeforeUnmount(() => {
    clearTimeout(l), cancelAnimationFrame(l), s();
  }), Object.assign(c.proxy, { trigger: u, getPosition: () => o }), noop;
} }), QLayout = defineComponent({ name: "QLayout", props: { container: Boolean, view: { type: String, default: "hhh lpr fff", validator: (e) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase()) }, onScroll: Function, onScrollHeight: Function, onResize: Function }, setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = ref(null), l = ref(n.screen.height), i = ref(e.container === true ? 0 : n.screen.width), r = ref({ position: 0, direction: "down", inflectionPoint: 0 }), s = ref(0), u = ref(isRuntimeSsrPreHydration$1.value === true ? 0 : getScrollbarWidth()), c = computed(() => "q-layout q-layout--" + (e.container === true ? "containerized" : "standard")), d = computed(() => e.container === false ? { minHeight: n.screen.height + "px" } : null), p2 = computed(() => u.value !== 0 ? { [n.lang.rtl === true ? "left" : "right"]: `${u.value}px` } : null), v = computed(() => u.value !== 0 ? { [n.lang.rtl === true ? "right" : "left"]: 0, [n.lang.rtl === true ? "left" : "right"]: `-${u.value}px`, width: `calc(100% + ${u.value}px)` } : null);
  function m(t2) {
    if (e.container === true || document.qScrollPrevented !== true) {
      const n2 = { position: t2.position.top, direction: t2.direction, directionChanged: t2.directionChanged, inflectionPoint: t2.inflectionPoint.top, delta: t2.delta.top };
      r.value = n2, e.onScroll !== void 0 && o("scroll", n2);
    }
  }
  function f(t2) {
    const { height: n2, width: a2 } = t2;
    let r2 = false;
    l.value !== n2 && (r2 = true, l.value = n2, e.onScrollHeight !== void 0 && o("scroll-height", n2), b()), i.value !== a2 && (r2 = true, i.value = a2), r2 === true && e.onResize !== void 0 && o("resize", t2);
  }
  function g({ height: e2 }) {
    s.value !== e2 && (s.value = e2, b());
  }
  function b() {
    if (e.container === true) {
      const e2 = l.value > s.value ? getScrollbarWidth() : 0;
      u.value !== e2 && (u.value = e2);
    }
  }
  let y;
  const S = { instances: {}, view: computed(() => e.view), isContainer: computed(() => e.container), rootRef: a, height: l, containerHeight: s, scrollbarWidth: u, totalWidth: computed(() => i.value + u.value), rows: computed(() => {
    const t2 = e.view.toLowerCase().split(" ");
    return { top: t2[0].split(""), middle: t2[1].split(""), bottom: t2[2].split("") };
  }), header: reactive({ size: 0, offset: 0, space: false }), right: reactive({ size: 300, offset: 0, space: false }), footer: reactive({ size: 0, offset: 0, space: false }), left: reactive({ size: 300, offset: 0, space: false }), scroll: r, animate() {
    y !== void 0 ? clearTimeout(y) : document.body.classList.add("q-body--layout-animate"), y = setTimeout(() => {
      document.body.classList.remove("q-body--layout-animate"), y = void 0;
    }, 155);
  }, update(e2, t2, o2) {
    S[e2][t2] = o2;
  } };
  return provide(layoutKey, S), () => {
    const o2 = hMergeSlot$1(t.default, [h(QScrollObserver, { onScroll: m }), h(QResizeObserver, { onResize: f })]), n2 = h("div", { class: c.value, style: d.value, ref: e.container === true ? void 0 : a }, o2);
    return e.container === true ? h("div", { class: "q-layout-container overflow-hidden", ref: a }, [h(QResizeObserver, { onResize: g }), h("div", { class: "absolute-full", style: p2.value }, [h("div", { class: "scroll", style: v.value }, [n2])])]) : n2;
  };
} });
const separatorValues = ["horizontal", "vertical", "cell", "none"];
var QMarkupTable = defineComponent({ name: "QMarkupTable", props: __spreadProps(__spreadValues({}, useDarkProps$1), { dense: Boolean, flat: Boolean, bordered: Boolean, square: Boolean, wrapCells: Boolean, separator: { type: String, default: "horizontal", validator: (e) => separatorValues.includes(e) } }), setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark$1(e, o.proxy.$q), a = computed(() => `q-markup-table q-table__container q-table__card q-table--${e.separator}-separator` + (n.value === true ? " q-table--dark q-table__card--dark q-dark" : "") + (e.dense === true ? " q-table--dense" : "") + (e.flat === true ? " q-table--flat" : "") + (e.bordered === true ? " q-table--bordered" : "") + (e.square === true ? " q-table--square" : "") + (e.wrapCells === false ? " q-table--no-wrap" : ""));
  return () => h("div", { class: a.value }, [h("table", { class: "q-table" }, hSlot$1(t.default))]);
} }), QNoSsr = defineComponent({ name: "QNoSsr", props: { tag: { type: String, default: "div" }, placeholder: String }, setup(e, { slots: t }) {
  const o = useCanRender();
  return () => {
    const n = {};
    if (o.value === true) {
      const o2 = hSlot$1(t.default);
      return o2 === void 0 ? o2 : o2.length > 1 ? h(e.tag, n, o2) : o2[0];
    }
    n.class = "q-no-ssr-placeholder";
    const a = hSlot$1(t.placeholder);
    return a !== void 0 ? a.length > 1 ? h(e.tag, n, a) : a[0] : e.placeholder !== void 0 ? h(e.tag, n, e.placeholder) : void 0;
  };
} });
const svg$m = h("svg", { class: "q-radio__bg absolute non-selectable", viewBox: "0 0 24 24", "aria-hidden": "true" }, [h("path", { d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12" }), h("path", { class: "q-radio__check", d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6" })]);
var QRadio = defineComponent({ name: "QRadio", props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useDarkProps$1), useSizeProps$1), useFormProps$1), { modelValue: { required: true }, val: { required: true }, label: String, leftLabel: Boolean, color: String, keepColor: Boolean, dense: Boolean, disable: Boolean, tabindex: [String, Number] }), emits: ["update:modelValue"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), a = useDark$1(e, n.$q), l = useSize$1(e, optionSizes), i = ref(null), { refocusTargetEl: r, refocusTarget: s } = useRefocusTarget(e, i), u = computed(() => e.modelValue === e.val), c = computed(() => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (e.disable === true ? " disabled" : "") + (a.value === true ? " q-radio--dark" : "") + (e.dense === true ? " q-radio--dense" : "") + (e.leftLabel === true ? " reverse" : "")), d = computed(() => {
    const t2 = e.color === void 0 || e.keepColor !== true && u.value !== true ? "" : ` text-${e.color}`;
    return `q-radio__inner relative-position q-radio__inner--${u.value === true ? "truthy" : "falsy"}${t2}`;
  }), p2 = computed(() => e.disable === true ? -1 : e.tabindex || 0), v = computed(() => {
    const t2 = { type: "radio" };
    return e.name !== void 0 && Object.assign(t2, { name: e.name, value: e.val }), t2;
  }), m = computed(() => e.name !== void 0 && u.value === true ? { checked: true } : {}), f = useFormInject(v, m);
  function g(t2) {
    t2 !== void 0 && (stopAndPrevent$1(t2), s(t2)), e.disable !== true && u.value !== true && o("update:modelValue", e.val, t2);
  }
  function b(e2) {
    e2.keyCode !== 13 && e2.keyCode !== 32 || stopAndPrevent$1(e2);
  }
  function y(e2) {
    e2.keyCode !== 13 && e2.keyCode !== 32 || g(e2);
  }
  return Object.assign(n, { set: g }), () => {
    const o2 = [svg$m];
    e.disable !== true && f(o2, "unshift", " q-radio__native q-ma-none q-pa-none");
    const n2 = [h("div", { class: d.value, style: l.value }, o2)];
    r.value !== null && n2.push(r.value);
    const a2 = e.label !== void 0 ? hMergeSlot$1(t.default, [e.label]) : hSlot$1(t.default);
    return a2 !== void 0 && n2.push(h("div", { class: "q-radio__label q-anchor--skip" }, a2)), h("div", { ref: i, class: c.value, tabindex: p2.value, role: "radio", "aria-label": e.label, "aria-checked": u.value === true ? "true" : "false", "aria-disabled": e.disable === true ? "true" : void 0, onClick: g, onKeydown: b, onKeyup: y }, n2);
  };
} }), QToggle = defineComponent({ name: "QToggle", props: __spreadProps(__spreadValues({}, useCheckboxProps), { icon: String, checkedIcon: String, uncheckedIcon: String, indeterminateIcon: String, iconColor: String }), emits: useCheckboxEmits, setup(e) {
  function t(t2, o) {
    const n = computed(() => (t2.value === true ? e.checkedIcon : o.value === true ? e.indeterminateIcon : e.uncheckedIcon) || e.icon), a = computed(() => {
      if (t2.value === true)
        return e.iconColor;
    });
    return () => [h("div", { class: "q-toggle__track" }), h("div", { class: "q-toggle__thumb absolute flex flex-center no-wrap" }, n.value !== void 0 ? [h(QIcon$1, { name: n.value, color: a.value })] : void 0)];
  }
  return useCheckbox("toggle", t);
} });
const components$1 = { radio: QRadio, checkbox: QCheckbox, toggle: QToggle }, typeValues = Object.keys(components$1);
var QOptionGroup = defineComponent({ name: "QOptionGroup", props: __spreadProps(__spreadValues({}, useDarkProps$1), { modelValue: { required: true }, options: { type: Array, validator: (e) => e.every((e2) => "value" in e2 && "label" in e2) }, name: String, type: { default: "radio", validator: (e) => typeValues.includes(e) }, color: String, keepColor: Boolean, dense: Boolean, size: String, leftLabel: Boolean, inline: Boolean, disable: Boolean }), emits: ["update:modelValue"], setup(e, { emit: t, slots: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = Array.isArray(e.modelValue);
  e.type === "radio" ? a === true && console.error("q-option-group: model should not be array") : a === false && console.error("q-option-group: model should be array in your case");
  const l = useDark$1(e, n), i = computed(() => components$1[e.type]), r = computed(() => "q-option-group q-gutter-x-sm" + (e.inline === true ? " q-option-group--inline" : "")), s = computed(() => {
    const t2 = {};
    return e.type === "radio" && (t2.role = "radiogroup", e.disable === true && (t2["aria-disabled"] = "true")), t2;
  });
  function u(e2) {
    t("update:modelValue", e2);
  }
  return () => h("div", __spreadValues({ class: r.value }, s.value), e.options.map((t2, n2) => {
    const a2 = o["label-" + n2] !== void 0 ? () => o["label-" + n2](t2) : o.label !== void 0 ? () => o.label(t2) : void 0;
    return h("div", [h(i.value, { modelValue: e.modelValue, val: t2.value, name: t2.name === void 0 ? e.name : t2.name, disable: e.disable || t2.disable, label: a2 === void 0 ? t2.label : null, leftLabel: t2.leftLabel === void 0 ? e.leftLabel : t2.leftLabel, color: t2.color === void 0 ? e.color : t2.color, checkedIcon: t2.checkedIcon, uncheckedIcon: t2.uncheckedIcon, dark: t2.dark || l.value, size: t2.size === void 0 ? e.size : t2.size, dense: e.dense, keepColor: t2.keepColor === void 0 ? e.keepColor : t2.keepColor, "onUpdate:modelValue": u }, a2)]);
  }));
} }), QPage = defineComponent({ name: "QPage", props: { padding: Boolean, styleFn: Function }, setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = inject(layoutKey);
  inject(pageContainerKey, () => {
    console.error("QPage needs to be child of QPageContainer");
  });
  const a = computed(() => {
    const t2 = (n.header.space === true ? n.header.size : 0) + (n.footer.space === true ? n.footer.size : 0);
    if (typeof e.styleFn === "function") {
      const a2 = n.isContainer.value === true ? n.containerHeight.value : o.screen.height;
      return e.styleFn(t2, a2);
    }
    return { minHeight: n.isContainer.value === true ? n.containerHeight.value - t2 + "px" : o.screen.height === 0 ? t2 !== 0 ? `calc(100vh - ${t2}px)` : "100vh" : o.screen.height - t2 + "px" };
  }), l = computed(() => `q-page ${e.padding === true ? " q-layout-padding" : ""}`);
  return () => h("main", { class: l.value, style: a.value }, hSlot$1(t.default));
} }), QPageContainer = defineComponent({ name: "QPageContainer", setup(e, { slots: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = inject(layoutKey, () => {
    console.error("QPageContainer needs to be child of QLayout");
  });
  provide(pageContainerKey, true);
  const a = computed(() => {
    const e2 = {};
    return n.header.space === true && (e2.paddingTop = `${n.header.size}px`), n.right.space === true && (e2[`padding${o.lang.rtl === true ? "Left" : "Right"}`] = `${n.right.size}px`), n.footer.space === true && (e2.paddingBottom = `${n.footer.size}px`), n.left.space === true && (e2[`padding${o.lang.rtl === true ? "Right" : "Left"}`] = `${n.left.size}px`), e2;
  });
  return () => h("div", { class: "q-page-container", style: a.value }, hSlot$1(t.default));
} });
const usePageStickyProps = { position: { type: String, default: "bottom-right", validator: (e) => ["top-right", "top-left", "bottom-right", "bottom-left", "top", "right", "bottom", "left"].includes(e) }, offset: { type: Array, validator: (e) => e.length === 2 }, expand: Boolean };
function usePageSticky() {
  const { props: e, proxy: t } = getCurrentInstance(), { $q: o } = t, n = inject(layoutKey, () => {
    console.error("QPageSticky needs to be child of QLayout");
  }), a = computed(() => {
    const t2 = e.position;
    return { top: t2.indexOf("top") > -1, right: t2.indexOf("right") > -1, bottom: t2.indexOf("bottom") > -1, left: t2.indexOf("left") > -1, vertical: t2 === "top" || t2 === "bottom", horizontal: t2 === "left" || t2 === "right" };
  }), l = computed(() => n.header.offset), i = computed(() => n.right.offset), r = computed(() => n.footer.offset), s = computed(() => n.left.offset), u = computed(() => {
    let t2 = 0, n2 = 0;
    const u2 = a.value, c2 = o.lang.rtl === true ? -1 : 1;
    u2.top === true && l.value !== 0 ? n2 = `${l.value}px` : u2.bottom === true && r.value !== 0 && (n2 = `${-r.value}px`), u2.left === true && s.value !== 0 ? t2 = `${c2 * s.value}px` : u2.right === true && i.value !== 0 && (t2 = `${-c2 * i.value}px`);
    const d2 = { transform: `translate(${t2}, ${n2})` };
    return e.offset && (d2.margin = `${e.offset[1]}px ${e.offset[0]}px`), u2.vertical === true ? (s.value !== 0 && (d2[o.lang.rtl === true ? "right" : "left"] = `${s.value}px`), i.value !== 0 && (d2[o.lang.rtl === true ? "left" : "right"] = `${i.value}px`)) : u2.horizontal === true && (l.value !== 0 && (d2.top = `${l.value}px`), r.value !== 0 && (d2.bottom = `${r.value}px`)), d2;
  }), c = computed(() => `q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand === true ? "expand" : "shrink"}`);
  function d(t2) {
    const o2 = hSlot$1(t2.default);
    return h("div", { class: c.value, style: u.value }, e.expand === true ? o2 : [h("div", o2)]);
  }
  return { $layout: n, getStickyContent: d };
}
var QPageScroller = defineComponent({ name: "QPageScroller", props: __spreadProps(__spreadValues({}, usePageStickyProps), { scrollOffset: { type: Number, default: 1e3 }, reverse: Boolean, duration: { type: Number, default: 300 }, offset: { default: () => [18, 18] } }), emits: ["click"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), { $layout: a, getStickyContent: l } = usePageSticky(), i = ref(null);
  let r;
  const s = computed(() => a.height.value - (a.isContainer.value === true ? a.containerHeight.value : n.screen.height));
  function u() {
    return e.reverse === true ? s.value - a.scroll.value.position > e.scrollOffset : a.scroll.value.position > e.scrollOffset;
  }
  const c = ref(u());
  function d() {
    const e2 = u();
    c.value !== e2 && (c.value = e2);
  }
  function p2() {
    e.reverse === true ? r === void 0 && (r = watch(s, d)) : v();
  }
  function v() {
    r !== void 0 && (r(), r = void 0);
  }
  function m(t2) {
    const n2 = getScrollTarget(a.isContainer.value === true ? i.value : a.rootRef.value);
    setVerticalScrollPosition(n2, e.reverse === true ? a.height.value : 0, e.duration), o("click", t2);
  }
  function f() {
    return c.value === true ? h("div", { ref: i, class: "q-page-scroller", onClick: m }, l(t)) : null;
  }
  return watch(a.scroll, d), watch(() => e.reverse, p2), p2(), onBeforeUnmount(v), () => h(Transition, { name: "q-transition--fade" }, f);
} }), QPageSticky = defineComponent({ name: "QPageSticky", props: usePageStickyProps, setup(e, { slots: t }) {
  const { getStickyContent: o } = usePageSticky();
  return () => o(t);
} }), QPagination = defineComponent({ name: "QPagination", props: __spreadProps(__spreadValues({}, useDarkProps$1), { modelValue: { type: Number, required: true }, min: { type: Number, default: 1 }, max: { type: Number, required: true }, color: { type: String, default: "primary" }, textColor: String, activeColor: String, activeTextColor: String, inputStyle: [Array, String, Object], inputClass: [Array, String, Object], size: String, disable: Boolean, input: Boolean, iconPrev: String, iconNext: String, iconFirst: String, iconLast: String, toFn: Function, boundaryLinks: { type: Boolean, default: null }, boundaryNumbers: { type: Boolean, default: null }, directionLinks: { type: Boolean, default: null }, ellipses: { type: Boolean, default: null }, maxPages: { type: Number, default: 0, validator: (e) => e >= 0 }, ripple: { type: [Boolean, Object], default: null }, round: Boolean, rounded: Boolean, flat: Boolean, outline: Boolean, unelevated: Boolean, push: Boolean, glossy: Boolean, dense: Boolean, padding: { type: String, default: "3px 2px" } }), emits: ["update:modelValue"], setup(e, { emit: t }) {
  const { proxy: o } = getCurrentInstance(), { $q: n } = o, a = useDark$1(e, n), l = ref(null), i = computed({ get: () => e.modelValue, set: (o2) => {
    if (o2 = parseInt(o2, 10), e.disable || isNaN(o2))
      return;
    const n2 = between(o2, e.min, e.max);
    e.modelValue !== n2 && t("update:modelValue", n2);
  } });
  function r(e2, t2) {
    return [true, false].includes(e2) ? e2 : t2;
  }
  watch(() => e.min + e.max, () => {
    i.value = e.modelValue;
  });
  const s = computed(() => "q-pagination row no-wrap items-center" + (e.disable === true ? " disabled" : "")), u = computed(() => i.value + " / " + e.max), c = computed(() => r(e.boundaryLinks, e.input)), d = computed(() => r(e.boundaryNumbers, !e.input)), p2 = computed(() => r(e.directionLinks, e.input)), v = computed(() => r(e.ellipses, !e.input)), m = computed(() => {
    const t2 = [e.iconFirst || n.iconSet.pagination.first, e.iconPrev || n.iconSet.pagination.prev, e.iconNext || n.iconSet.pagination.next, e.iconLast || n.iconSet.pagination.last];
    return n.lang.rtl === true ? t2.reverse() : t2;
  }), f = computed(() => e.disable === true ? { "aria-disabled": "true" } : {}), g = computed(() => ({ round: e.round, rounded: e.rounded, outline: e.outline, unelevated: e.unelevated, push: e.push, glossy: e.glossy, dense: e.dense, padding: e.padding, color: e.color, flat: true, size: e.size, ripple: e.ripple === null || e.ripple })), b = computed(() => ({ flat: e.flat, color: e.activeColor || e.color, textColor: e.activeTextColor || e.textColor }));
  function y(e2) {
    i.value = e2;
  }
  function S(e2) {
    i.value = i.value + e2;
  }
  function w() {
    i.value = l.value, l.value = null;
  }
  function x(t2, o2) {
    const n2 = __spreadValues(__spreadValues({}, g.value), t2);
    return o2 !== void 0 && (e.toFn !== void 0 ? n2.to = e.toFn(o2) : n2.onClick = () => y(o2)), h(QBtn, n2);
  }
  return Object.assign(o, { set: y, setByOffset: S }), () => {
    const t2 = [], o2 = [], n2 = [];
    if (c.value && (t2.push(x({ key: "bls", disable: e.disable || e.modelValue <= e.min, icon: m.value[0] }, e.min)), o2.unshift(x({ key: "ble", disable: e.disable || e.modelValue >= e.max, icon: m.value[3] }, e.max))), p2.value && (t2.push(x({ key: "bdp", disable: e.disable || e.modelValue <= e.min, icon: m.value[1] }, e.modelValue - 1)), o2.unshift(x({ key: "bdn", disable: e.disable || e.modelValue >= e.max, icon: m.value[2] }, e.modelValue + 1))), e.input === true)
      n2.push(h(QInput$1, { class: "inline", style: { width: `${u.value.length / 1.5}em` }, type: "number", dense: true, value: l.value, disable: e.disable, dark: a.value, borderless: true, inputClass: e.inputClass, inputStyle: e.inputStyle, placeholder: u.value, min: e.min, max: e.max, "onUpdate:modelValue"(e2) {
        l.value = e2;
      }, onKeyup(e2) {
        isKeyCode(e2, 13) === true && w();
      }, onBlur: w }));
    else {
      let a2 = Math.max(e.maxPages, 1 + (v.value ? 2 : 0) + (d.value ? 2 : 0)), l2 = e.min, i2 = e.max, r2 = false, s2 = false, u2 = false, c2 = false;
      e.maxPages && a2 < e.max - e.min + 1 && (a2 = 1 + 2 * Math.floor(a2 / 2), l2 = Math.max(e.min, Math.min(e.max - a2 + 1, e.modelValue - Math.floor(a2 / 2))), i2 = Math.min(e.max, l2 + a2 - 1), d.value && (u2 = true, l2 += 1), v.value && l2 > e.min + (d.value ? 1 : 0) && (r2 = true, l2 += 1), d.value && (c2 = true, i2 -= 1), v.value && i2 < e.max - (d.value ? 1 : 0) && (s2 = true, i2 -= 1));
      const p3 = { minWidth: `${Math.max(2, String(e.max).length)}em` };
      if (u2) {
        const o3 = e.min === e.modelValue;
        t2.push(x({ key: "bns", style: p3, disable: e.disable, flat: !o3, textColor: o3 ? e.textColor : void 0, label: e.min }, e.min));
      }
      if (c2) {
        const t3 = e.max === e.modelValue;
        o2.unshift(x({ key: "bne", style: p3, disable: e.disable, flat: !t3, textColor: t3 ? e.textColor : void 0, label: e.max }, e.max));
      }
      r2 && t2.push(x({ key: "bes", style: p3, disable: e.disable, label: "\u2026", ripple: false }, l2 - 1)), s2 && o2.unshift(x({ key: "bee", style: p3, disable: e.disable, label: "\u2026", ripple: false }, i2 + 1));
      for (let t3 = l2; t3 <= i2; t3++) {
        const o3 = { key: `bpg${t3}`, style: p3, disable: e.disable, label: t3 };
        t3 === e.modelValue && Object.assign(o3, b.value), n2.push(x(o3, t3));
      }
    }
    return h("div", __spreadValues({ class: s.value }, f.value), [t2, h("div", { class: "row justify-center" }, [n2]), o2]);
  };
} });
function frameDebounce(e) {
  let t, o, n = false;
  function a() {
    o = arguments, n !== true && (n = true, t = requestAnimationFrame(() => {
      e.apply(this, o), o = void 0, n = false;
    }));
  }
  return a.cancel = () => {
    window.cancelAnimationFrame(t), n = false;
  }, a;
}
const { passive: passive$1 } = listenOpts$1;
var QParallax = defineComponent({ name: "QParallax", props: { src: String, height: { type: Number, default: 500 }, speed: { type: Number, default: 1, validator: (e) => e >= 0 && e <= 1 }, scrollTarget: { default: void 0 }, onScroll: Function }, setup(e, { slots: t, emit: o }) {
  const n = ref(0), a = ref(null), l = ref(null), i = ref(null);
  let r, s, u, c, d, p2;
  watch(() => e.height, () => {
    r === true && m();
  }), watch(() => e.scrollTarget, () => {
    r === true && (y(), b());
  });
  let v = (t2) => {
    n.value = t2, e.onScroll !== void 0 && o("scroll", t2);
  };
  function m() {
    let t2, o2, n2;
    p2 === window ? (t2 = 0, o2 = window.innerHeight, n2 = o2) : (t2 = offset(p2).top, o2 = height(p2), n2 = t2 + o2);
    const l2 = offset(a.value).top, i2 = l2 + e.height;
    if (d !== void 0 || i2 > t2 && l2 < n2) {
      const t3 = (n2 - l2) / (e.height + o2);
      f((u - e.height) * t3 * e.speed), v(t3);
    }
  }
  let f = (e2) => {
    s.style.transform = `translate3d(-50%,${Math.round(e2)}px,0)`;
  };
  function g() {
    u = s.naturalHeight || s.videoHeight || height(s), r === true && m();
  }
  function b() {
    r = true, p2 = getScrollTarget(a.value, e.scrollTarget), p2.addEventListener("scroll", m, passive$1), window.addEventListener("resize", c, passive$1), m();
  }
  function y() {
    r === true && (r = false, p2.removeEventListener("scroll", m, passive$1), window.removeEventListener("resize", c, passive$1), p2 = void 0);
  }
  return onMounted(() => {
    f = frameDebounce(f), v = frameDebounce(v), c = frameDebounce(g), s = t.media !== void 0 ? l.value.children[0] : i.value, s.onload = s.onloadstart = s.loadedmetadata = g, g(), s.style.display = "initial", window.IntersectionObserver !== void 0 ? (d = new IntersectionObserver((e2) => {
      const t2 = e2[0].isIntersecting === true ? b : y;
      t2();
    }), d.observe(a.value)) : b();
  }), onBeforeUnmount(() => {
    y(), d !== void 0 && d.disconnect(), s.onload = s.onloadstart = s.loadedmetadata = null;
  }), () => {
    return h("div", { ref: a, class: "q-parallax", style: { height: `${e.height}px` } }, [h("div", { ref: l, class: "q-parallax__media absolute-full" }, t.media !== void 0 ? t.media() : [h("img", { ref: i, src: e.src })]), h("div", { class: "q-parallax__content absolute-full column flex-center" }, t.content !== void 0 ? t.content({ percentScrolled: n.value }) : hSlot$1(t.default))]);
  };
} });
function clone(e) {
  const t = JSON.stringify(e);
  if (t)
    return JSON.parse(t);
}
var QPopupEdit = defineComponent({ name: "QPopupEdit", props: { modelValue: { required: true }, title: String, buttons: Boolean, labelSet: String, labelCancel: String, color: { type: String, default: "primary" }, validate: { type: Function, default: () => true }, autoSave: Boolean, cover: { type: Boolean, default: true }, disable: Boolean }, emits: ["update:modelValue", "save", "cancel", "before-show", "show", "before-hide", "hide"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = ref(null), i = ref(""), r = ref("");
  let s = false;
  const u = computed(() => {
    const t2 = { initialValue: i.value, validate: e.validate, set: c, cancel: d, updatePosition: p2 };
    return Object.defineProperty(t2, "value", { get: () => r.value, set: (e2) => {
      r.value = e2;
    } }), t2;
  });
  function c() {
    e.validate(r.value) !== false && (v() === true && (o("save", r.value, i.value), o("update:modelValue", r.value)), m());
  }
  function d() {
    v() === true && o("cancel", r.value, i.value), m();
  }
  function p2() {
    nextTick(() => {
      l.value.updatePosition();
    });
  }
  function v() {
    return isDeepEqual(r.value, i.value) === false;
  }
  function m() {
    s = true, l.value.hide();
  }
  function f() {
    s = false, i.value = clone(e.modelValue), r.value = clone(e.modelValue), o("before-show");
  }
  function g() {
    o("show");
  }
  function b() {
    s === false && v() === true && (e.autoSave === true && e.validate(r.value) === true ? (o("save", r.value, i.value), o("update:modelValue", r.value)) : o("cancel", r.value, i.value)), o("before-hide");
  }
  function y() {
    o("hide");
  }
  function S() {
    const o2 = t.default !== void 0 ? [].concat(t.default(u.value)) : [];
    return e.title && o2.unshift(h("div", { class: "q-dialog__title q-mt-sm q-mb-sm" }, e.title)), e.buttons === true && o2.push(h("div", { class: "q-popup-edit__buttons row justify-center no-wrap" }, [h(QBtn, { flat: true, color: e.color, label: e.labelCancel || a.lang.label.cancel, onClick: d }), h(QBtn, { flat: true, color: e.color, label: e.labelSet || a.lang.label.set, onClick: c })])), o2;
  }
  return Object.assign(n, { set: c, cancel: d, show(e2) {
    l.value !== null && l.value.show(e2);
  }, hide(e2) {
    l.value !== null && l.value.hide(e2);
  }, updatePosition: p2 }), () => {
    if (e.disable !== true)
      return h(QMenu, { ref: l, class: "q-popup-edit", cover: e.cover, onBeforeShow: f, onShow: g, onBeforeHide: b, onHide: y, onEscapeKey: d }, S);
  };
} }), QPopupProxy = defineComponent({ name: "QPopupProxy", props: __spreadProps(__spreadValues({}, useAnchorProps), { breakpoint: { type: [String, Number], default: 450 } }), emits: ["show", "hide"], setup(e, { slots: t, emit: o, attrs: n }) {
  const { proxy: a } = getCurrentInstance(), { $q: l } = a, i = ref(false), r = ref(null), s = computed(() => parseInt(e.breakpoint, 10)), { canShow: u } = useAnchor({ showing: i });
  function c() {
    return l.screen.width < s.value || l.screen.height < s.value ? "dialog" : "menu";
  }
  const d = ref(c());
  function p2(e2) {
    i.value = true, o("show", e2);
  }
  function v(e2) {
    i.value = false, d.value = c(), o("hide", e2);
  }
  return watch(() => c(), (e2) => {
    i.value !== true && (d.value = e2);
  }), Object.assign(a, { show(e2) {
    u(e2) === true && r.value.show(e2);
  }, hide(e2) {
    r.value.hide(e2);
  }, toggle(e2) {
    r.value.toggle(e2);
  } }), () => {
    const o2 = hSlot$1(t.default), a2 = d.value === "menu" && o2 !== void 0 && o2[0] !== void 0 && o2[0].type !== void 0 && ["QDate", "QTime", "QCarousel", "QColor"].includes(o2[0].type.name) ? { cover: true, maxHeight: "99vh" } : {}, l2 = __spreadProps(__spreadValues(__spreadValues({ ref: r }, a2), n), { onShow: p2, onHide: v });
    let i2;
    return d.value === "dialog" ? i2 = QDialog : (i2 = QMenu, Object.assign(l2, { target: e.target, contextMenu: e.contextMenu, noParentEvent: true, separateClosePopup: true })), h(i2, l2, () => o2);
  };
} });
const defaultSizes = { xs: 2, sm: 4, md: 6, lg: 10, xl: 14 };
function width(e, t, o) {
  return { transform: t === true ? `translateX(${o.lang.rtl === true ? "-" : ""}100%) scale3d(${-e},1,1)` : `scale3d(${e},1,1)` };
}
var QLinearProgress = defineComponent({ name: "QLinearProgress", props: __spreadProps(__spreadValues(__spreadValues({}, useDarkProps$1), useSizeProps$1), { value: { type: Number, default: 0 }, buffer: Number, color: String, trackColor: String, reverse: Boolean, stripe: Boolean, indeterminate: Boolean, query: Boolean, rounded: Boolean, instantFeedback: Boolean }), setup(e, { slots: t }) {
  const { proxy: o } = getCurrentInstance(), n = useDark$1(e, o.$q), a = useSize$1(e, defaultSizes), l = computed(() => e.indeterminate === true || e.query === true), i = computed(() => "q-linear-progress" + (e.color !== void 0 ? ` text-${e.color}` : "") + (e.reverse === true || e.query === true ? " q-linear-progress--reverse" : "") + (e.rounded === true ? " rounded-borders" : "")), r = computed(() => width(e.buffer !== void 0 ? e.buffer : 1, e.reverse, o.$q)), s = computed(() => `q-linear-progress__track absolute-full q-linear-progress__track--with${e.instantFeedback === true ? "out" : ""}-transition q-linear-progress__track--${n.value === true ? "dark" : "light"}` + (e.trackColor !== void 0 ? ` bg-${e.trackColor}` : "")), u = computed(() => width(l.value === true ? 1 : e.value, e.reverse, o.$q)), c = computed(() => `q-linear-progress__model absolute-full q-linear-progress__model--with${e.instantFeedback === true ? "out" : ""}-transition q-linear-progress__model--${l.value === true ? "in" : ""}determinate`), d = computed(() => ({ width: `${100 * e.value}%` })), p2 = computed(() => `q-linear-progress__stripe absolute-${e.reverse === true ? "right" : "left"}`);
  return () => {
    const o2 = [h("div", { class: s.value, style: r.value }), h("div", { class: c.value, style: u.value })];
    return e.stripe === true && l.value === false && o2.push(h("div", { class: p2.value, style: d.value })), h("div", { class: i.value, style: a.value, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 1, "aria-valuenow": e.indeterminate === true ? void 0 : e.value }, hMergeSlot$1(t.default, o2));
  };
} });
const PULLER_HEIGHT = 40, OFFSET_TOP = 20;
var QPullToRefresh = defineComponent({ name: "QPullToRefresh", props: { color: String, bgColor: String, icon: String, noMouse: Boolean, disable: Boolean, scrollTarget: { default: void 0 } }, emits: ["refresh"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = ref("pull"), i = ref(0), r = ref(false), s = ref(-PULLER_HEIGHT), u = ref(false), c = ref({}), d = computed(() => ({ opacity: i.value, transform: `translateY(${s.value}px) rotate(${360 * i.value}deg)` })), p2 = computed(() => "q-pull-to-refresh__puller row flex-center" + (u.value === true ? " q-pull-to-refresh__puller--animating" : "") + (e.bgColor !== void 0 ? ` bg-${e.bgColor}` : ""));
  function v(e2) {
    if (e2.isFinal === true)
      return void (r.value === true && (r.value = false, l.value === "pulled" ? (l.value = "refreshing", b({ pos: OFFSET_TOP }), g()) : l.value === "pull" && b({ pos: -PULLER_HEIGHT, ratio: 0 })));
    if (u.value === true || l.value === "refreshing")
      return false;
    if (e2.isFirst === true) {
      if (getVerticalScrollPosition(S) !== 0 || e2.direction !== "down")
        return r.value === true && (r.value = false, l.value = "pull", b({ pos: -PULLER_HEIGHT, ratio: 0 })), false;
      r.value = true;
      const { top: t3, left: o3 } = y.getBoundingClientRect();
      c.value = { top: t3 + "px", left: o3 + "px", width: window.getComputedStyle(y).getPropertyValue("width") };
    }
    prevent$1(e2.evt);
    const t2 = Math.min(140, Math.max(0, e2.distance.y));
    s.value = t2 - PULLER_HEIGHT, i.value = between(t2 / (OFFSET_TOP + PULLER_HEIGHT), 0, 1);
    const o2 = s.value > OFFSET_TOP ? "pulled" : "pull";
    l.value !== o2 && (l.value = o2);
  }
  const m = computed(() => {
    const t2 = { down: true, mightPrevent: true };
    return e.noMouse !== true && (t2.mouse = true), [[TouchPan, v, void 0, t2]];
  }), f = computed(() => `q-pull-to-refresh__content${r.value === true ? " no-pointer-events" : ""}`);
  function g() {
    o("refresh", () => {
      b({ pos: -PULLER_HEIGHT, ratio: 0 }, () => {
        l.value = "pull";
      });
    });
  }
  function b({ pos: e2, ratio: t2 }, o2) {
    u.value = true, s.value = e2, t2 !== void 0 && (i.value = t2), clearTimeout(w), w = setTimeout(() => {
      u.value = false, o2 && o2();
    }, 300);
  }
  let y, S, w;
  function x() {
    S = getScrollTarget(y, e.scrollTarget);
  }
  return Object.assign(n, { trigger: g, updateScrollTarget: x }), watch(() => e.scrollTarget, x), onMounted(() => {
    y = n.$el, x();
  }), onBeforeUnmount(() => {
    clearTimeout(w);
  }), () => {
    const o2 = [h("div", { class: f.value }, hSlot$1(t.default)), h("div", { class: "q-pull-to-refresh__puller-container fixed row flex-center no-pointer-events z-top", style: c.value }, [h("div", { class: p2.value, style: d.value }, [l.value !== "refreshing" ? h(QIcon$1, { name: e.icon || a.iconSet.pullToRefresh.icon, color: e.color, size: "32px" }) : h(QSpinner$1, { size: "24px", color: e.color })])])];
    return hDir("div", { class: "q-pull-to-refresh" }, o2, "main", e.disable === false, () => m.value);
  };
} });
const dragType = { MIN: 0, RANGE: 1, MAX: 2 };
var QRange = defineComponent({ name: "QRange", props: __spreadProps(__spreadValues(__spreadValues({}, useFormProps$1), useSliderProps), { modelValue: { type: Object, default: () => ({ min: null, max: null }), validator(e) {
  return "min" in e && "max" in e;
} }, name: String, dragRange: Boolean, dragOnlyRange: Boolean, leftLabelColor: String, leftLabelTextColor: String, rightLabelColor: String, rightLabelTextColor: String, leftLabelValue: [String, Number], rightLabelValue: [String, Number] }), emits: useSliderEmits, setup(e, { emit: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = computed(() => {
    return { type: "hidden", name: e.name, value: `${e.modelValue.min}|${e.modelValue.max}` };
  }), a = useFormInject(n), l = ref(null), i = ref({ min: e.modelValue.min === null ? e.min : e.modelValue.min, max: e.modelValue.max === null ? e.max : e.modelValue.max }), r = ref(null), s = ref(0), u = ref(0), { state: c, methods: d } = useSlider({ updateValue: w, updatePosition: C, getDragging: x }), p2 = computed(() => c.minMaxDiff.value === 0 ? 0 : (i.value.min - e.min) / c.minMaxDiff.value), v = computed(() => c.active.value === true ? s.value : p2.value), m = computed(() => c.minMaxDiff.value === 0 ? 0 : (i.value.max - e.min) / c.minMaxDiff.value), f = computed(() => c.active.value === true ? u.value : m.value), g = computed(() => ({ [c.positionProp.value]: `${100 * v.value}%`, [c.sizeProp.value]: `${100 * (f.value - v.value)}%` })), b = computed(() => {
    if (c.editable.value !== true)
      return {};
    if (o.platform.is.mobile === true)
      return { onClick: d.onMobileClick };
    const t2 = { onMousedown: d.onActivate };
    return e.dragOnlyRange === true && Object.assign(t2, { onFocus: () => {
      k("both");
    }, onBlur: d.onBlur, onKeydown: _, onKeyup: d.onKeyup }), t2;
  }), y = { domRef: ref(null), events: computed(() => c.editable.value === true && o.platform.is.mobile !== true && e.dragOnlyRange !== true ? { onFocus: () => {
    k("min");
  }, onBlur: d.onBlur, onKeydown: _, onKeyup: d.onKeyup } : {}), thumbStyle: computed(() => ({ [c.positionProp.value]: `${100 * v.value}%`, "z-index": r.value === "min" ? 2 : void 0 })), thumbClass: computed(() => c.preventFocus.value === false && c.focus.value === "min" ? " q-slider--focus" : ""), pinClass: computed(() => {
    const t2 = e.leftLabelColor || e.labelColor;
    return t2 ? ` text-${t2}` : "";
  }), pinTextClass: computed(() => {
    const t2 = e.leftLabelTextColor || e.labelTextColor;
    return t2 ? ` text-${t2}` : "";
  }), pinStyle: computed(() => {
    const t2 = e.reverse === true ? -v.value : v.value - 1;
    return d.getPinStyle(t2, v.value);
  }), label: computed(() => e.leftLabelValue !== void 0 ? e.leftLabelValue : i.value.min) }, S = { domRef: ref(null), events: computed(() => c.editable.value === true && o.platform.is.mobile !== true && e.dragOnlyRange !== true ? { onFocus: () => {
    k("max");
  }, onBlur: d.onBlur, onKeydown: _, onKeyup: d.onKeyup } : {}), thumbStyle: computed(() => ({ [c.positionProp.value]: `${100 * f.value}%` })), thumbClass: computed(() => c.preventFocus.value === false && c.focus.value === "max" ? " q-slider--focus" : ""), pinClass: computed(() => {
    const t2 = e.rightLabelColor || e.labelColor;
    return t2 ? ` text-${t2}` : "";
  }), pinTextClass: computed(() => {
    const t2 = e.rightLabelTextColor || e.labelTextColor;
    return t2 ? ` text-${t2}` : "";
  }), pinStyle: computed(() => {
    const t2 = e.reverse === true ? -f.value : f.value - 1;
    return d.getPinStyle(t2, f.value);
  }), label: computed(() => e.rightLabelValue !== void 0 ? e.rightLabelValue : i.value.max) };
  function w(o2) {
    i.value.min === e.modelValue.min && i.value.max === e.modelValue.max || t("update:modelValue", __spreadValues({}, i.value)), o2 === true && t("change", __spreadValues({}, i.value));
  }
  function x(t2) {
    const { left: o2, top: n2, width: a2, height: s2 } = l.value.getBoundingClientRect(), u2 = e.dragOnlyRange === true ? 0 : e.vertical === true ? y.domRef.value.offsetHeight / (2 * s2) : y.domRef.value.offsetWidth / (2 * a2), d2 = { left: o2, top: n2, width: a2, height: s2, valueMin: i.value.min, valueMax: i.value.max, ratioMin: p2.value, ratioMax: m.value }, v2 = getRatio(t2, d2, c.isReversed.value, e.vertical);
    let f2;
    return e.dragOnlyRange !== true && v2 < d2.ratioMin + u2 ? f2 = dragType.MIN : e.dragOnlyRange === true || v2 < d2.ratioMax - u2 ? e.dragRange === true || e.dragOnlyRange === true ? (f2 = dragType.RANGE, Object.assign(d2, { offsetRatio: v2, offsetModel: getModel(v2, e.min, e.max, e.step, c.decimals.value), rangeValue: d2.valueMax - d2.valueMin, rangeRatio: d2.ratioMax - d2.ratioMin })) : f2 = d2.ratioMax - v2 < v2 - d2.ratioMin ? dragType.MAX : dragType.MIN : f2 = dragType.MAX, d2.type = f2, r.value = null, d2;
  }
  function C(t2, o2 = c.dragging.value) {
    const n2 = getRatio(t2, o2, c.isReversed.value, e.vertical), a2 = getModel(n2, e.min, e.max, e.step, c.decimals.value);
    let l2;
    switch (o2.type) {
      case dragType.MIN:
        n2 <= o2.ratioMax ? (l2 = { minR: n2, maxR: o2.ratioMax, min: a2, max: o2.valueMax }, r.value = "min") : (l2 = { minR: o2.ratioMax, maxR: n2, min: o2.valueMax, max: a2 }, r.value = "max");
        break;
      case dragType.MAX:
        n2 >= o2.ratioMin ? (l2 = { minR: o2.ratioMin, maxR: n2, min: o2.valueMin, max: a2 }, r.value = "max") : (l2 = { minR: n2, maxR: o2.ratioMin, min: a2, max: o2.valueMin }, r.value = "min");
        break;
      case dragType.RANGE:
        const t3 = n2 - o2.offsetRatio, i2 = between(o2.ratioMin + t3, 0, 1 - o2.rangeRatio), s2 = a2 - o2.offsetModel, u2 = between(o2.valueMin + s2, e.min, e.max - o2.rangeValue);
        l2 = { minR: i2, maxR: i2 + o2.rangeRatio, min: parseFloat(u2.toFixed(c.decimals.value)), max: parseFloat((u2 + o2.rangeValue).toFixed(c.decimals.value)) };
        break;
    }
    i.value = { min: l2.min, max: l2.max }, i.value.min !== null && i.value.max !== null || (i.value.min = l2.min || e.min, i.value.max = l2.max || e.max), e.snap !== true || e.step === 0 ? (s.value = l2.minR, u.value = l2.maxR) : (s.value = c.minMaxDiff.value === 0 ? 0 : (i.value.min - e.min) / c.minMaxDiff.value, u.value = c.minMaxDiff.value === 0 ? 0 : (i.value.max - e.min) / c.minMaxDiff.value);
  }
  function k(e2) {
    c.focus.value = e2;
  }
  function _(t2) {
    if (!keyCodes$2.includes(t2.keyCode))
      return;
    stopAndPrevent$1(t2);
    const o2 = ([34, 33].includes(t2.keyCode) ? 10 : 1) * e.step, n2 = [34, 37, 40].includes(t2.keyCode) ? -o2 : o2;
    if (e.dragOnlyRange) {
      const t3 = e.dragOnlyRange ? i.value.max - i.value.min : 0, o3 = between(parseFloat((i.value.min + n2).toFixed(c.decimals.value)), e.min, e.max - t3);
      i.value = { min: o3, max: parseFloat((o3 + t3).toFixed(c.decimals.value)) };
    } else {
      if (c.focus.value === false)
        return;
      {
        const t3 = c.focus.value;
        i.value = __spreadProps(__spreadValues({}, i.value), { [t3]: between(parseFloat((i.value[t3] + n2).toFixed(c.decimals.value)), t3 === "min" ? e.min : i.value.min, t3 === "max" ? e.max : i.value.max) });
      }
    }
    w();
  }
  function q(t2) {
    const o2 = [d.getThumbSvg(), h("div", { class: "q-slider__focus-ring" })];
    return e.label !== true && e.labelAlways !== true || o2.push(h("div", { class: `q-slider__pin q-slider__pin${c.axis.value} absolute` + t2.pinClass.value, style: t2.pinStyle.value.pin }, [h("div", { class: `q-slider__pin-text-container q-slider__pin-text-container${c.axis.value}`, style: t2.pinStyle.value.pinTextContainer }, [h("span", { class: "q-slider__pin-text" + t2.pinTextClass.value }, t2.label.value)])]), h("div", { class: `q-slider__arrow q-slider__arrow${c.axis.value}` + t2.pinClass.value })), h("div", __spreadProps(__spreadValues({ ref: t2.domRef, class: `q-slider__thumb-container q-slider__thumb-container${c.axis.value} absolute non-selectable` + t2.thumbClass.value, style: t2.thumbStyle.value }, t2.events.value), { tabindex: e.dragOnlyRange !== true ? c.tabindex.value : null }), o2);
  }
  return watch(() => e.modelValue.min, (t2) => {
    i.value.min = t2 === null ? e.min : t2;
  }), watch(() => e.modelValue.max, (t2) => {
    i.value.max = t2 === null ? e.max : t2;
  }), watch(() => e.min, (e2) => {
    i.value.min < e2 && (i.value.min = e2), i.value.max < e2 && (i.value.max = e2);
  }), watch(() => e.max, (e2) => {
    i.value.min > e2 && (i.value.min = e2), i.value.max > e2 && (i.value.max = e2);
  }), () => {
    const t2 = [h("div", { class: `q-slider__track q-slider__track${c.axis.value} absolute`, style: g.value })];
    e.markers !== false && t2.push(h("div", { class: `q-slider__track-markers q-slider__track-markers${c.axis.value} absolute-full fit`, style: c.markerStyle.value }));
    const n2 = [h("div", { class: `q-slider__track-container q-slider__track-container${c.axis.value} absolute` }, t2), q(y), q(S)];
    e.name !== void 0 && e.disable !== true && a(n2, "push");
    const i2 = __spreadValues(__spreadProps(__spreadValues({ ref: l, class: "q-range " + c.classes.value + (e.modelValue.min === null || e.modelValue.max === null ? " q-slider--no-value" : "") }, c.attributes.value), { "aria-valuenow": e.modelValue.min + "|" + e.modelValue.max, tabindex: e.dragOnlyRange === true && o.platform.is.mobile !== true ? c.tabindex.value : null }), b.value);
    return hDir("div", i2, n2, "slide", c.editable.value, () => c.panDirective.value);
  };
} }), QRating = defineComponent({ name: "QRating", props: __spreadProps(__spreadValues(__spreadValues({}, useSizeProps$1), useFormProps$1), { modelValue: { type: Number, required: true }, max: { type: [String, Number], default: 5 }, icon: [String, Array], iconHalf: [String, Array], iconSelected: [String, Array], color: [String, Array], colorHalf: [String, Array], colorSelected: [String, Array], noReset: Boolean, noDimming: Boolean, readonly: Boolean, disable: Boolean }), emits: ["update:modelValue"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = useSize$1(e), l = useFormAttrs(e), i = useFormInject(l), r = ref(0);
  let s = {};
  const u = computed(() => e.readonly !== true && e.disable !== true), c = computed(() => `q-rating row inline items-center q-rating--${u.value === true ? "" : "non-"}editable` + (e.noDimming === true ? " q-rating--no-dimming" : "") + (e.disable === true ? " disabled" : "") + (e.color !== void 0 && Array.isArray(e.color) === false ? ` text-${e.color}` : "")), d = computed(() => {
    const t2 = Array.isArray(e.icon) === true ? e.icon.length : 0, o2 = Array.isArray(e.iconSelected) === true ? e.iconSelected.length : 0, n2 = Array.isArray(e.iconHalf) === true ? e.iconHalf.length : 0, a2 = Array.isArray(e.color) === true ? e.color.length : 0, l2 = Array.isArray(e.colorSelected) === true ? e.colorSelected.length : 0, i2 = Array.isArray(e.colorHalf) === true ? e.colorHalf.length : 0;
    return { iconLen: t2, icon: t2 > 0 ? e.icon[t2 - 1] : e.icon, selIconLen: o2, selIcon: o2 > 0 ? e.iconSelected[o2 - 1] : e.iconSelected, halfIconLen: n2, halfIcon: n2 > 0 ? e.iconHalf[o2 - 1] : e.iconHalf, colorLen: a2, color: a2 > 0 ? e.color[a2 - 1] : e.color, selColorLen: l2, selColor: l2 > 0 ? e.colorSelected[l2 - 1] : e.colorSelected, halfColorLen: i2, halfColor: i2 > 0 ? e.colorHalf[i2 - 1] : e.colorHalf };
  }), p2 = computed(() => {
    const t2 = [], o2 = d.value, a2 = Math.ceil(e.modelValue), l2 = e.iconHalf === void 0 || a2 === e.modelValue ? -1 : a2;
    for (let i2 = 1; i2 <= e.max; i2++) {
      const s2 = r.value === 0 && e.modelValue >= i2 || r.value > 0 && r.value >= i2, u2 = l2 === i2 && r.value < i2, c2 = r.value > 0 && (u2 === true ? a2 : e.modelValue) >= i2 && r.value < i2, d2 = u2 === true ? i2 <= o2.halfColorLen ? e.colorHalf[i2 - 1] : o2.halfColor : o2.selColor !== void 0 && s2 === true ? i2 <= o2.selColorLen ? e.colorSelected[i2 - 1] : o2.selColor : i2 <= o2.colorLen ? e.color[i2 - 1] : o2.color;
      t2.push({ name: (u2 === true ? i2 <= o2.halfIconLen ? e.iconHalf[i2 - 1] : o2.halfIcon : o2.selIcon === void 0 || s2 !== true && c2 !== true ? i2 <= o2.iconLen ? e.icon[i2 - 1] : o2.icon : i2 <= o2.selIconLen ? e.iconSelected[i2 - 1] : o2.selIcon) || n.iconSet.rating.icon, classes: "q-rating__icon" + (s2 === true || u2 === true ? " q-rating__icon--active" : "") + (c2 === true ? " q-rating__icon--exselected" : "") + (r.value === i2 ? " q-rating__icon--hovered" : "") + (d2 !== void 0 ? ` text-${d2}` : "") });
    }
    return t2;
  }), v = computed(() => {
    return e.disable === true ? { "aria-disabled": "true" } : e.readonly === true ? { "aria-readonly": "true" } : void 0;
  }), m = computed(() => u.value === true ? 0 : null);
  function f(t2) {
    if (u.value === true) {
      const n2 = between(parseInt(t2, 10), 1, parseInt(e.max, 10)), a2 = e.noReset !== true && e.modelValue === n2 ? 0 : n2;
      a2 !== e.modelValue && o("update:modelValue", a2), r.value = 0;
    }
  }
  function g(e2) {
    u.value === true && (r.value = e2);
  }
  function b(e2, t2) {
    switch (e2.keyCode) {
      case 13:
      case 32:
        return f(t2), stopAndPrevent$1(e2);
      case 37:
      case 40:
        return s[`rt${t2 - 1}`] && s[`rt${t2 - 1}`].$el.focus(), stopAndPrevent$1(e2);
      case 39:
      case 38:
        return s[`rt${t2 + 1}`] && s[`rt${t2 + 1}`].$el.focus(), stopAndPrevent$1(e2);
    }
  }
  function y() {
    r.value = 0;
  }
  return onBeforeUpdate(() => {
    s = {};
  }), () => {
    const o2 = [];
    return p2.value.forEach(({ classes: e2, name: n2 }, a2) => {
      const l2 = a2 + 1;
      o2.push(h("div", { key: l2, ref: (e3) => {
        s[`rt${l2}`] = e3;
      }, class: "q-rating__icon-container flex flex-center", tabindex: m.value, onClick() {
        f(l2);
      }, onMouseover() {
        g(l2);
      }, onMouseout: y, onFocus() {
        g(l2);
      }, onBlur: y, onKeyup(e3) {
        b(e3, l2);
      } }, hMergeSlot$1(t[`tip-${l2}`], [h(QIcon$1, { class: e2, name: n2 })])));
    }), e.name !== void 0 && e.disable !== true && i(o2, "push"), h("div", __spreadValues({ class: c.value, style: a.value }, v.value), o2);
  };
} }), QResponsive = defineComponent({ name: "QResponsive", props: useRatioProps, setup(e, { slots: t }) {
  const o = useRatio(e);
  return () => h("div", { class: "q-responsive" }, [h("div", { class: "q-responsive__filler overflow-hidden" }, [h("div", { style: o.value })]), h("div", { class: "q-responsive__content absolute-full fit" }, hSlot$1(t.default))]);
} });
const axisList = ["vertical", "horizontal"], dirProps = { vertical: { offset: "offsetY", scroll: "scrollTop", dir: "down", dist: "y" }, horizontal: { offset: "offsetX", scroll: "scrollLeft", dir: "right", dist: "x" } };
var QScrollArea = defineComponent({ name: "QScrollArea", props: __spreadProps(__spreadValues({}, useDarkProps$1), { thumbStyle: Object, verticalThumbStyle: Object, horizontalThumbStyle: Object, barStyle: [Array, String, Object], verticalBarStyle: [Array, String, Object], horizontalBarStyle: [Array, String, Object], contentStyle: [Array, String, Object], contentActiveStyle: [Array, String, Object], delay: { type: [String, Number], default: 1e3 }, visible: { type: Boolean, default: null }, tabindex: [String, Number], onScroll: Function }), setup(e, { slots: t, emit: o }) {
  const n = ref(false), a = ref(false), l = ref(false), i = { vertical: ref(0), horizontal: ref(0) }, r = { vertical: { ref: ref(null), position: ref(0), size: ref(0) }, horizontal: { ref: ref(null), position: ref(0), size: ref(0) } }, s = getCurrentInstance(), u = useDark$1(e, s.proxy.$q);
  let c, d;
  const p2 = ref(null), v = computed(() => "q-scrollarea" + (u.value === true ? " q-scrollarea--dark" : ""));
  r.vertical.percentage = computed(() => {
    const e2 = r.vertical.size.value - i.vertical.value;
    if (e2 <= 0)
      return 0;
    const t2 = between(r.vertical.position.value / e2, 0, 1);
    return Math.round(1e4 * t2) / 1e4;
  }), r.vertical.thumbHidden = computed(() => (e.visible === null ? l.value : e.visible) !== true && n.value === false && a.value === false || r.vertical.size.value <= i.vertical.value + 1), r.vertical.thumbSize = computed(() => Math.round(between(i.vertical.value * i.vertical.value / r.vertical.size.value, 50, i.vertical.value))), r.vertical.style = computed(() => {
    const t2 = r.vertical.thumbSize.value, o2 = r.vertical.percentage.value * (i.vertical.value - t2);
    return __spreadProps(__spreadValues(__spreadValues({}, e.thumbStyle), e.verticalThumbStyle), { top: `${o2}px`, height: `${t2}px` });
  }), r.vertical.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" + (r.vertical.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : "")), r.vertical.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--v absolute-right" + (r.vertical.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : "")), r.horizontal.percentage = computed(() => {
    const e2 = r.horizontal.size.value - i.horizontal.value;
    if (e2 <= 0)
      return 0;
    const t2 = between(r.horizontal.position.value / e2, 0, 1);
    return Math.round(1e4 * t2) / 1e4;
  }), r.horizontal.thumbHidden = computed(() => (e.visible === null ? l.value : e.visible) !== true && n.value === false && a.value === false || r.horizontal.size.value <= i.horizontal.value + 1), r.horizontal.thumbSize = computed(() => Math.round(between(i.horizontal.value * i.horizontal.value / r.horizontal.size.value, 50, i.horizontal.value))), r.horizontal.style = computed(() => {
    const t2 = r.horizontal.thumbSize.value, o2 = r.horizontal.percentage.value * (i.horizontal.value - t2);
    return __spreadProps(__spreadValues(__spreadValues({}, e.thumbStyle), e.horizontalThumbStyle), { left: `${o2}px`, width: `${t2}px` });
  }), r.horizontal.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (r.horizontal.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : "")), r.horizontal.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (r.horizontal.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : ""));
  const m = computed(() => r.vertical.thumbHidden.value === true || r.horizontal.thumbHidden.value === true ? e.contentStyle : e.contentActiveStyle), f = [[TouchPan, (e2) => {
    k(e2, "vertical");
  }, void 0, { vertical: true, prevent: true, mouse: true, mouseAllDir: true }]], g = [[TouchPan, (e2) => {
    k(e2, "horizontal");
  }, void 0, { horizontal: true, prevent: true, mouse: true, mouseAllDir: true }]];
  function b() {
    const e2 = {};
    return axisList.forEach((t2) => {
      const o2 = r[t2];
      e2[t2 + "Position"] = o2.position.value, e2[t2 + "Percentage"] = o2.percentage.value, e2[t2 + "Size"] = o2.size.value, e2[t2 + "ContainerSize"] = i[t2].value;
    }), e2;
  }
  const y = debounce(() => {
    const e2 = b();
    e2.ref = s.proxy, o("scroll", e2);
  }, 0);
  function S(e2, t2, o2) {
    if (axisList.includes(e2) === false)
      return void console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
    const n2 = e2 === "vertical" ? setVerticalScrollPosition : setHorizontalScrollPosition;
    n2(p2.value, t2, o2);
  }
  function w({ height: e2, width: t2 }) {
    let o2 = false;
    i.vertical.value !== e2 && (i.vertical.value = e2, o2 = true), i.horizontal.value !== t2 && (i.horizontal.value = t2, o2 = true), o2 === true && P();
  }
  function x({ position: e2 }) {
    let t2 = false;
    r.vertical.position.value !== e2.top && (r.vertical.position.value = e2.top, t2 = true), r.horizontal.position.value !== e2.left && (r.horizontal.position.value = e2.left, t2 = true), t2 === true && P();
  }
  function C({ height: e2, width: t2 }) {
    r.horizontal.size.value !== t2 && (r.horizontal.size.value = t2, P()), r.vertical.size.value !== e2 && (r.vertical.size.value = e2, P());
  }
  function k(e2, t2) {
    const o2 = r[t2];
    if (e2.isFirst === true) {
      if (o2.thumbHidden.value === true)
        return;
      d = o2.position.value, a.value = true;
    } else if (a.value !== true)
      return;
    e2.isFinal === true && (a.value = false);
    const n2 = dirProps[t2], l2 = i[t2].value, s2 = (o2.size.value - l2) / (l2 - o2.thumbSize.value), u2 = e2.distance[n2.dist], c2 = d + (e2.direction === n2.dir ? 1 : -1) * u2 * s2;
    $(c2, t2);
  }
  function _(e2, t2) {
    const o2 = r[t2];
    if (o2.thumbHidden.value !== true) {
      const n2 = e2[dirProps[t2].offset] - o2.thumbSize.value / 2;
      $(n2 / i[t2].value * o2.size.value, t2), o2.ref.value !== null && o2.ref.value.dispatchEvent(new MouseEvent(e2.type, e2));
    }
  }
  function q(e2) {
    _(e2, "vertical");
  }
  function T(e2) {
    _(e2, "horizontal");
  }
  function P() {
    n.value === true ? clearTimeout(c) : n.value = true, c = setTimeout(() => {
      n.value = false;
    }, e.delay), e.onScroll !== void 0 && y();
  }
  function $(e2, t2) {
    p2.value[dirProps[t2].scroll] = e2;
  }
  function M() {
    l.value = true;
  }
  function B() {
    l.value = false;
  }
  return Object.assign(s.proxy, { getScrollTarget: () => p2.value, getScroll: b, getScrollPosition: () => ({ top: r.vertical.position.value, left: r.horizontal.position.value }), getScrollPercentage: () => ({ top: r.vertical.percentage.value, left: r.horizontal.percentage.value }), setScrollPosition: S, setScrollPercentage(e2, t2, o2) {
    S(e2, t2 * (r[e2].size.value - i[e2].value), o2);
  } }), () => {
    return h("div", { class: v.value, onMouseenter: M, onMouseleave: B }, [h("div", { ref: p2, class: "q-scrollarea__container scroll relative-position fit hide-scrollbar", tabindex: e.tabindex !== void 0 ? e.tabindex : void 0 }, [h("div", { class: "q-scrollarea__content absolute", style: m.value }, hMergeSlot$1(t.default, [h(QResizeObserver, { onResize: C })])), h(QScrollObserver, { axis: "both", onScroll: x })]), h(QResizeObserver, { onResize: w }), h("div", { class: r.vertical.barClass.value, style: [e.barStyle, e.verticalBarStyle], "aria-hidden": "true", onMousedown: q }), h("div", { class: r.horizontal.barClass.value, style: [e.barStyle, e.horizontalBarStyle], "aria-hidden": "true", onMousedown: T }), withDirectives(h("div", { ref: r.vertical.ref, class: r.vertical.thumbClass.value, style: r.vertical.style.value, "aria-hidden": "true" }), f), withDirectives(h("div", { ref: r.horizontal.ref, class: r.horizontal.thumbClass.value, style: r.horizontal.style.value, "aria-hidden": "true" }), g)]);
  };
} });
const aggBucketSize = 1e3, scrollToEdges = ["start", "center", "end", "start-force", "center-force", "end-force"], slice = Array.prototype.slice;
let id$1 = 1;
const setOverflowAnchor = window.getComputedStyle(document.body).overflowAnchor === void 0 ? noop : function(e, t) {
  const o = e + "_ss";
  let n = document.getElementById(o);
  n === null && (n = document.createElement("style"), n.type = "text/css", n.id = o, document.head.appendChild(n)), n.qChildIndex !== t && (n.qChildIndex = t, n.innerHTML = `#${e} > *:nth-child(${t}) { overflow-anchor: auto }`);
};
function sumFn(e, t) {
  return e + t;
}
function getScrollDetails(e, t, o, n, a, l, i, r) {
  const s = e === window ? document.scrollingElement || document.documentElement : e, u = a === true ? "offsetWidth" : "offsetHeight", c = { scrollStart: 0, scrollViewSize: -i - r, scrollMaxSize: 0, offsetStart: -i, offsetEnd: -r };
  if (a === true ? (e === window ? (c.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, c.scrollViewSize += window.innerWidth) : (c.scrollStart = s.scrollLeft, c.scrollViewSize += s.clientWidth), c.scrollMaxSize = s.scrollWidth, l === true && (c.scrollStart = (rtlHasScrollBug === true ? c.scrollMaxSize - c.scrollViewSize : 0) - c.scrollStart)) : (e === window ? (c.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0, c.scrollViewSize += window.innerHeight) : (c.scrollStart = s.scrollTop, c.scrollViewSize += s.clientHeight), c.scrollMaxSize = s.scrollHeight), o !== null)
    for (let d = o.previousElementSibling; d !== null; d = d.previousElementSibling)
      d.classList.contains("q-virtual-scroll--skip") === false && (c.offsetStart += d[u]);
  if (n !== null)
    for (let d = n.nextElementSibling; d !== null; d = d.nextElementSibling)
      d.classList.contains("q-virtual-scroll--skip") === false && (c.offsetEnd += d[u]);
  if (t !== e) {
    const o2 = s.getBoundingClientRect(), n2 = t.getBoundingClientRect();
    a === true ? (c.offsetStart += n2.left - o2.left, c.offsetEnd -= n2.width) : (c.offsetStart += n2.top - o2.top, c.offsetEnd -= n2.height), e !== window && (c.offsetStart += c.scrollStart), c.offsetEnd += c.scrollMaxSize - c.offsetStart;
  }
  return c;
}
function setScroll(e, t, o, n) {
  e === window ? o === true ? (n === true && (t = (rtlHasScrollBug === true ? document.body.scrollWidth - window.innerWidth : 0) - t), window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0)) : window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t) : o === true ? (n === true && (t = (rtlHasScrollBug === true ? e.scrollWidth - e.offsetWidth : 0) - t), e.scrollLeft = t) : e.scrollTop = t;
}
function sumSize(e, t, o, n) {
  if (o >= n)
    return 0;
  const a = t.length, l = Math.floor(o / aggBucketSize), i = Math.floor((n - 1) / aggBucketSize) + 1;
  let r = e.slice(l, i).reduce(sumFn, 0);
  return o % aggBucketSize !== 0 && (r -= t.slice(l * aggBucketSize, o).reduce(sumFn, 0)), n % aggBucketSize !== 0 && n !== a && (r -= t.slice(n, i * aggBucketSize).reduce(sumFn, 0)), r;
}
const commonVirtScrollProps = { virtualScrollSliceSize: { type: [Number, String], default: null }, virtualScrollSliceRatioBefore: { type: [Number, String], default: 1 }, virtualScrollSliceRatioAfter: { type: [Number, String], default: 1 }, virtualScrollItemSize: { type: [Number, String], default: 24 }, virtualScrollStickySizeStart: { type: [Number, String], default: 0 }, virtualScrollStickySizeEnd: { type: [Number, String], default: 0 }, tableColspan: [Number, String] }, commonVirtPropsList = Object.keys(commonVirtScrollProps), useVirtualScrollProps = __spreadValues({ virtualScrollHorizontal: Boolean, onVirtualScroll: Function }, commonVirtScrollProps);
function useVirtualScroll({ virtualScrollLength: e, getVirtualScrollTarget: t, getVirtualScrollEl: o, virtualScrollItemSizeComputed: n }) {
  const a = getCurrentInstance(), { props: l, emit: i, proxy: r } = a, { $q: s } = r;
  let u, c, d, p2, v = [];
  const m = "qvs_" + id$1++, f = ref(0), g = ref(0), b = ref({}), y = ref(null), S = ref(null), w = ref(null), x = ref({ from: 0, to: 0 }), C = computed(() => l.tableColspan !== void 0 ? l.tableColspan : 100);
  n === void 0 && (n = computed(() => l.virtualScrollItemSize));
  const k = computed(() => n.value + ";" + l.virtualScrollHorizontal), _ = computed(() => k.value + ";" + l.virtualScrollSliceRatioBefore + ";" + l.virtualScrollSliceRatioAfter);
  function q() {
    Q(c, true);
  }
  function T(e2) {
    Q(e2 === void 0 ? c : e2);
  }
  function P(n2, a2) {
    const i2 = t();
    if (i2 === void 0 || i2 === null || i2.nodeType === 8)
      return;
    const r2 = getScrollDetails(i2, o(), y.value, S.value, l.virtualScrollHorizontal, s.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd);
    d !== r2.scrollViewSize && E(r2.scrollViewSize), M(i2, r2, Math.min(e.value - 1, Math.max(0, parseInt(n2, 10) || 0)), 0, scrollToEdges.indexOf(a2) > -1 ? a2 : c > -1 && n2 > c ? "end" : "start");
  }
  function $() {
    const n2 = t();
    if (n2 === void 0 || n2 === null || n2.nodeType === 8)
      return;
    const a2 = getScrollDetails(n2, o(), y.value, S.value, l.virtualScrollHorizontal, s.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd), i2 = e.value - 1, r2 = a2.scrollMaxSize - a2.offsetStart - a2.offsetEnd - g.value;
    if (u === a2.scrollStart)
      return;
    if (a2.scrollMaxSize <= 0)
      return void M(n2, a2, 0, 0);
    d !== a2.scrollViewSize && E(a2.scrollViewSize), B(x.value.from);
    const c2 = Math.floor(a2.scrollMaxSize - Math.max(a2.scrollViewSize, a2.offsetEnd) - Math.min(p2[i2], a2.scrollViewSize / 2));
    if (c2 > 0 && Math.ceil(a2.scrollStart) >= c2)
      return void M(n2, a2, i2, a2.scrollMaxSize - a2.offsetEnd - v.reduce(sumFn, 0));
    let m2 = 0, h2 = a2.scrollStart - a2.offsetStart, b2 = h2;
    if (h2 <= r2 && h2 + a2.scrollViewSize >= f.value)
      h2 -= f.value, m2 = x.value.from, b2 = h2;
    else
      for (let e2 = 0; h2 >= v[e2] && m2 < i2; e2++)
        h2 -= v[e2], m2 += aggBucketSize;
    while (h2 > 0 && m2 < i2)
      h2 -= p2[m2], h2 > -a2.scrollViewSize ? (m2++, b2 = h2) : b2 = p2[m2] + h2;
    M(n2, a2, m2, b2);
  }
  function M(t2, o2, n2, a2, i2) {
    const r2 = typeof i2 === "string" && i2.indexOf("-force") > -1, c2 = r2 === true ? i2.replace("-force", "") : i2, d2 = c2 !== void 0 ? c2 : "start";
    let h2 = Math.max(0, n2 - b.value[d2]), y2 = h2 + b.value.total;
    y2 > e.value && (y2 = e.value, h2 = Math.max(0, y2 - b.value.total)), u = o2.scrollStart;
    const S2 = h2 !== x.value.from || y2 !== x.value.to;
    if (S2 === false && c2 === void 0)
      return void L(n2);
    const { activeElement: C2 } = document;
    if (S2 === true && w.value !== null && w.value !== C2 && w.value.contains(C2) === true) {
      const e2 = () => {
        w.value.focus();
      };
      C2.addEventListener("blur", e2, true), requestAnimationFrame(() => {
        C2.removeEventListener("blur", e2, true);
      });
    }
    setOverflowAnchor(m, n2 - h2 + 1);
    const k2 = c2 !== void 0 ? p2.slice(h2, n2).reduce(sumFn, 0) : 0;
    if (S2 === true) {
      const t3 = y2 >= x.value.from && h2 <= x.value.to ? x.value.to : y2;
      x.value = { from: h2, to: t3 }, f.value = sumSize(v, p2, 0, h2), g.value = sumSize(v, p2, y2, e.value), requestAnimationFrame(() => {
        x.value.to !== y2 && u === o2.scrollStart && (x.value = { from: x.value.from, to: y2 }, g.value = sumSize(v, p2, y2, e.value));
      });
    }
    requestAnimationFrame(() => {
      if (u !== o2.scrollStart)
        return;
      S2 === true && B(h2);
      const e2 = p2.slice(h2, n2).reduce(sumFn, 0), i3 = e2 + o2.offsetStart + f.value, d3 = i3 + p2[n2];
      let v2 = i3 + a2;
      if (c2 !== void 0) {
        const t3 = e2 - k2, a3 = o2.scrollStart + t3;
        v2 = r2 !== true && a3 < i3 && d3 < a3 + o2.scrollViewSize ? a3 : c2 === "end" ? d3 - o2.scrollViewSize : i3 - (c2 === "start" ? 0 : Math.round((o2.scrollViewSize - p2[n2]) / 2));
      }
      u = v2, setScroll(t2, v2, l.virtualScrollHorizontal, s.lang.rtl), L(n2);
    });
  }
  function B(e2) {
    const t2 = w.value;
    if (t2) {
      const o2 = slice.call(t2.children).filter((e3) => e3.classList.contains("q-virtual-scroll--skip") === false), n2 = o2.length, a2 = l.virtualScrollHorizontal === true ? (e3) => e3.getBoundingClientRect().width : (e3) => e3.offsetHeight;
      let i2, r2, s2 = e2;
      for (let e3 = 0; e3 < n2; ) {
        i2 = a2(o2[e3]), e3++;
        while (e3 < n2 && o2[e3].classList.contains("q-virtual-scroll--with-prev") === true)
          i2 += a2(o2[e3]), e3++;
        r2 = i2 - p2[s2], r2 !== 0 && (p2[s2] += r2, v[Math.floor(s2 / aggBucketSize)] += r2), s2++;
      }
    }
  }
  function Q(t2, o2) {
    const a2 = 1 * n.value;
    o2 !== true && Array.isArray(p2) !== false || (p2 = []);
    const l2 = p2.length;
    p2.length = e.value;
    for (let n2 = e.value - 1; n2 >= l2; n2--)
      p2[n2] = a2;
    const i2 = Math.floor((e.value - 1) / aggBucketSize);
    v = [];
    for (let n2 = 0; n2 <= i2; n2++) {
      let t3 = 0;
      const o3 = Math.min((n2 + 1) * aggBucketSize, e.value);
      for (let e2 = n2 * aggBucketSize; e2 < o3; e2++)
        t3 += p2[e2];
      v.push(t3);
    }
    c = -1, u = void 0, t2 >= 0 ? (B(x.value.from), nextTick(() => {
      P(t2);
    })) : (f.value = sumSize(v, p2, 0, x.value.from), g.value = sumSize(v, p2, x.value.to, e.value), z());
  }
  function E(e2) {
    if (e2 === void 0 && typeof window !== "undefined") {
      const n2 = t();
      n2 !== void 0 && n2 !== null && n2.nodeType !== 8 && (e2 = getScrollDetails(n2, o(), y.value, S.value, l.virtualScrollHorizontal, s.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd).scrollViewSize);
    }
    d = e2;
    const a2 = 1 + l.virtualScrollSliceRatioBefore + l.virtualScrollSliceRatioAfter, i2 = e2 === void 0 || e2 <= 0 ? 1 : Math.ceil(e2 / n.value), r2 = Math.max(10, i2, Math.ceil(l.virtualScrollSliceSize / a2));
    b.value = { total: Math.ceil(r2 * a2), start: Math.ceil(r2 * l.virtualScrollSliceRatioBefore), center: Math.ceil(r2 * (0.5 + l.virtualScrollSliceRatioBefore)), end: Math.ceil(r2 * (1 + l.virtualScrollSliceRatioBefore)), view: i2 };
  }
  function O(e2, t2) {
    const o2 = l.virtualScrollHorizontal === true ? "width" : "height", a2 = { ["--q-virtual-scroll-item-" + o2]: n.value + "px" };
    return [e2 === "tbody" ? h(e2, { class: "q-virtual-scroll__padding", key: "before", ref: y }, [h("tr", [h("td", { style: __spreadValues({ [o2]: `${f.value}px` }, a2), colspan: C.value })])]) : h(e2, { class: "q-virtual-scroll__padding", key: "before", ref: y, style: __spreadValues({ [o2]: `${f.value}px` }, a2) }), h(e2, { class: "q-virtual-scroll__content", key: "content", ref: w, id: m, tabindex: -1 }, t2.flat()), e2 === "tbody" ? h(e2, { class: "q-virtual-scroll__padding", key: "after", ref: S }, [h("tr", [h("td", { style: __spreadValues({ [o2]: `${g.value}px` }, a2), colspan: C.value })])]) : h(e2, { class: "q-virtual-scroll__padding", key: "after", ref: S, style: __spreadValues({ [o2]: `${g.value}px` }, a2) })];
  }
  function L(e2) {
    c !== e2 && (l.onVirtualScroll !== void 0 && i("virtual-scroll", { index: e2, from: x.value.from, to: x.value.to - 1, direction: e2 < c ? "decrease" : "increase", ref: r }), c = e2);
  }
  watch(_, () => {
    E();
  }), watch(k, q), E();
  const z = debounce($, s.platform.is.ios === true ? 120 : 35);
  return onBeforeMount(() => {
    E();
  }), setOverflowAnchor !== noop && onBeforeUnmount(() => {
    const e2 = document.getElementById(m + "_ss");
    e2 !== null && e2.remove();
  }), Object.assign(r, { scrollTo: P, reset: q, refresh: T }), { virtualScrollSliceRange: x, virtualScrollSliceSizeComputed: b, setVirtualScrollSize: E, onVirtualScrollEvt: z, localResetVirtualScroll: Q, padVirtualScroll: O, scrollTo: P, reset: q, refresh: T };
}
const validateNewValueMode = (e) => ["add", "add-unique", "toggle"].includes(e), reEscapeList = ".*+?^${}()|[]\\", fieldPropsList = Object.keys(useFieldProps$1);
var QSelect = defineComponent({ name: "QSelect", inheritAttrs: false, props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useVirtualScrollProps), useFormProps$1), useFieldProps$1), { modelValue: { required: true }, multiple: Boolean, displayValue: [String, Number], displayValueHtml: Boolean, dropdownIcon: String, options: { type: Array, default: () => [] }, optionValue: [Function, String], optionLabel: [Function, String], optionDisable: [Function, String], hideSelected: Boolean, hideDropdownIcon: Boolean, fillInput: Boolean, maxValues: [Number, String], optionsDense: Boolean, optionsDark: { type: Boolean, default: null }, optionsSelectedClass: String, optionsHtml: Boolean, optionsCover: Boolean, menuShrink: Boolean, menuAnchor: String, menuSelf: String, menuOffset: Array, popupContentClass: String, popupContentStyle: [String, Array, Object], useInput: Boolean, useChips: Boolean, newValueMode: { type: String, validator: validateNewValueMode }, mapOptions: Boolean, emitValue: Boolean, inputDebounce: { type: [Number, String], default: 500 }, inputClass: [Array, String, Object], inputStyle: [Array, String, Object], tabindex: { type: [String, Number], default: 0 }, autocomplete: String, transitionShow: String, transitionHide: String, transitionDuration: [String, Number], behavior: { type: String, validator: (e) => ["default", "menu", "dialog"].includes(e), default: "default" }, virtualScrollItemSize: { type: [Number, String], default: void 0 }, onNewValue: Function, onFilter: Function }), emits: [...useFieldEmits$1, "add", "remove", "input-value", "keyup", "keypress", "keydown", "filter-abort"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = ref(false), i = ref(false), r = ref(-1), s = ref(""), u = ref(false), c = ref(false);
  let d, p2, v, m, f, g, b, y, S;
  const w = ref(null), x = ref(null), C = ref(null), k = ref(null), _ = ref(null), q = useFormInputNameAttr$1(e), T = useKeyComposition$1(Te), P = computed(() => Array.isArray(e.options) ? e.options.length : 0), $ = computed(() => e.virtualScrollItemSize === void 0 ? e.dense === true ? 24 : 48 : e.virtualScrollItemSize), { virtualScrollSliceRange: M, virtualScrollSliceSizeComputed: B, localResetVirtualScroll: Q, padVirtualScroll: E, onVirtualScrollEvt: O, scrollTo: L, setVirtualScrollSize: z } = useVirtualScroll({ virtualScrollLength: P, getVirtualScrollTarget: Ce, getVirtualScrollEl: xe, virtualScrollItemSizeComputed: $ }), F = useFieldState$1(), R = computed(() => {
    const t2 = e.mapOptions === true && e.multiple !== true, o2 = e.modelValue === void 0 || e.modelValue === null && t2 !== true ? [] : e.multiple === true && Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue];
    if (e.mapOptions === true && Array.isArray(e.options) === true) {
      const n2 = e.mapOptions === true && p2 !== void 0 ? p2 : [], a2 = o2.map((e2) => me(e2, n2));
      return e.modelValue === null && t2 === true ? a2.filter((e2) => e2 !== null) : a2;
    }
    return o2;
  }), D = computed(() => {
    const t2 = {};
    return fieldPropsList.forEach((o2) => {
      const n2 = e[o2];
      n2 !== void 0 && (t2[o2] = n2);
    }), t2;
  }), V = computed(() => e.optionsDark === null ? F.isDark.value : e.optionsDark), A = computed(() => fieldValueIsFilled$1(R.value)), I = computed(() => {
    let t2 = "q-field__input q-placeholder col";
    return e.hideSelected === true || R.value.length === 0 ? [t2, e.inputClass] : (t2 += " q-field__input--padding", e.inputClass === void 0 ? t2 : [t2, e.inputClass]);
  }), H = computed(() => (e.virtualScrollHorizontal === true ? "q-virtual-scroll--horizontal" : "") + (e.popupContentClass ? " " + e.popupContentClass : "")), N = computed(() => P.value === 0), j = computed(() => R.value.map((e2) => ne.value(e2)).join(", ")), U = computed(() => e.optionsHtml === true ? () => true : (e2) => e2 !== void 0 && e2 !== null && e2.html === true), K = computed(() => e.displayValueHtml === true || e.displayValue === void 0 && (e.optionsHtml === true || R.value.some(U.value))), W = computed(() => F.focused.value === true ? e.tabindex : -1), Y = computed(() => ({ tabindex: e.tabindex, role: "combobox", "aria-label": e.label, "aria-autocomplete": e.useInput === true ? "list" : "none", "aria-expanded": l.value === true ? "true" : "false", "aria-owns": `${F.targetUid.value}_lb`, "aria-controls": `${F.targetUid.value}_lb` })), G = computed(() => {
    const t2 = { id: `${F.targetUid.value}_lb`, role: "listbox", "aria-multiselectable": e.multiple === true ? "true" : "false" };
    return r.value >= 0 && (t2["aria-activedescendant"] = `${F.targetUid.value}_${r.value}`), t2;
  }), X = computed(() => {
    return R.value.map((e2, t2) => ({ index: t2, opt: e2, html: U.value(e2), selected: true, removeAtIndex: ue, toggleOption: de, tabindex: W.value }));
  }), Z = computed(() => {
    if (P.value === 0)
      return [];
    const { from: t2, to: o2 } = M.value;
    return e.options.slice(t2, o2).map((o3, n2) => {
      const l2 = ae.value(o3) === true, i2 = t2 + n2, s2 = { clickable: true, active: false, activeClass: te.value, manualFocus: true, focused: false, disable: l2, tabindex: -1, dense: e.optionsDense, dark: V.value, role: "option", id: `${F.targetUid.value}_${i2}`, onClick: () => {
        de(o3);
      } };
      return l2 !== true && (he(o3) === true && (s2.active = true), r.value === i2 && (s2.focused = true), s2["aria-selected"] = s2.active === true ? "true" : "false", a.platform.is.desktop === true && (s2.onMousemove = () => {
        pe(i2);
      })), { index: i2, opt: o3, html: U.value(o3), label: ne.value(o3), selected: s2.active, focused: s2.focused, toggleOption: de, setOptionIndex: pe, itemProps: s2 };
    });
  }), J = computed(() => e.dropdownIcon !== void 0 ? e.dropdownIcon : a.iconSet.arrow.dropdown), ee = computed(() => e.optionsCover === false && e.outlined !== true && e.standout !== true && e.borderless !== true && e.rounded !== true), te = computed(() => e.optionsSelectedClass !== void 0 ? e.optionsSelectedClass : e.color !== void 0 ? `text-${e.color}` : ""), oe = computed(() => fe(e.optionValue, "value")), ne = computed(() => fe(e.optionLabel, "label")), ae = computed(() => fe(e.optionDisable, "disable")), le = computed(() => R.value.map((e2) => oe.value(e2))), ie = computed(() => {
    const e2 = { onInput: Te, onChange: T, onKeydown: we, onKeyup: ye, onKeypress: Se, onFocus: ge, onClick(e3) {
      v === true && stop$1(e3);
    } };
    return e2.onCompositionstart = e2.onCompositionupdate = e2.onCompositionend = T, e2;
  });
  function re(t2) {
    return e.emitValue === true ? oe.value(t2) : t2;
  }
  function se(t2) {
    if (t2 > -1 && t2 < R.value.length)
      if (e.multiple === true) {
        const n2 = e.modelValue.slice();
        o("remove", { index: t2, value: n2.splice(t2, 1)[0] }), o("update:modelValue", n2);
      } else
        o("update:modelValue", null);
  }
  function ue(e2) {
    se(e2), F.focus();
  }
  function ce(t2, n2) {
    const a2 = re(t2);
    if (e.multiple !== true)
      return e.fillInput === true && $e(ne.value(t2), true, true), void o("update:modelValue", a2);
    if (R.value.length === 0)
      return o("add", { index: 0, value: a2 }), void o("update:modelValue", e.multiple === true ? [a2] : a2);
    if (n2 === true && he(t2) === true)
      return;
    if (e.maxValues !== void 0 && e.modelValue.length >= e.maxValues)
      return;
    const l2 = e.modelValue.slice();
    o("add", { index: l2.length, value: a2 }), l2.push(a2), o("update:modelValue", l2);
  }
  function de(t2, n2) {
    if (F.editable.value !== true || t2 === void 0 || ae.value(t2) === true)
      return;
    const a2 = oe.value(t2);
    if (e.multiple !== true)
      return n2 !== true && ($e(e.fillInput === true ? ne.value(t2) : "", true, true), Ie()), x.value !== null && x.value.focus(), void (isDeepEqual(oe.value(R.value[0]), a2) !== true && o("update:modelValue", e.emitValue === true ? a2 : t2));
    if ((v !== true || u.value === true) && F.focus(), ge(), R.value.length === 0) {
      const n3 = e.emitValue === true ? a2 : t2;
      return o("add", { index: 0, value: n3 }), void o("update:modelValue", e.multiple === true ? [n3] : n3);
    }
    const l2 = e.modelValue.slice(), i2 = le.value.findIndex((e2) => isDeepEqual(e2, a2));
    if (i2 > -1)
      o("remove", { index: i2, value: l2.splice(i2, 1)[0] });
    else {
      if (e.maxValues !== void 0 && l2.length >= e.maxValues)
        return;
      const n3 = e.emitValue === true ? a2 : t2;
      o("add", { index: l2.length, value: n3 }), l2.push(n3);
    }
    o("update:modelValue", l2);
  }
  function pe(e2) {
    if (a.platform.is.desktop !== true)
      return;
    const t2 = e2 > -1 && e2 < P.value ? e2 : -1;
    r.value !== t2 && (r.value = t2);
  }
  function ve(t2 = 1, o2) {
    if (l.value === true) {
      let n2 = r.value;
      do {
        n2 = normalizeToInterval(n2 + t2, -1, P.value - 1);
      } while (n2 !== -1 && n2 !== r.value && ae.value(e.options[n2]) === true);
      r.value !== n2 && (pe(n2), L(n2), o2 !== true && e.useInput === true && e.fillInput === true && Pe(n2 >= 0 ? ne.value(e.options[n2]) : g));
    }
  }
  function me(t2, o2) {
    const n2 = (e2) => isDeepEqual(oe.value(e2), t2);
    return e.options.find(n2) || o2.find(n2) || t2;
  }
  function fe(e2, t2) {
    const o2 = e2 !== void 0 ? e2 : t2;
    return typeof o2 === "function" ? o2 : (e3) => Object(e3) === e3 && o2 in e3 ? e3[o2] : e3;
  }
  function he(e2) {
    const t2 = oe.value(e2);
    return le.value.find((e3) => isDeepEqual(e3, t2)) !== void 0;
  }
  function ge() {
    e.useInput === true && x.value !== null && x.value.select();
  }
  function be(e2) {
    isKeyCode(e2, 27) === true && l.value === true && (stop$1(e2), Ie(), He()), o("keyup", e2);
  }
  function ye(t2) {
    const { value: o2 } = t2.target;
    if (t2.keyCode === void 0)
      if (t2.target.value = "", clearTimeout(d), He(), typeof o2 === "string" && o2.length > 0) {
        const t3 = o2.toLocaleLowerCase();
        let n2 = (e2) => oe.value(e2).toLocaleLowerCase() === t3, a2 = e.options.find(n2);
        a2 !== void 0 ? R.value.indexOf(a2) === -1 ? de(a2) : Ie() : (n2 = (e2) => ne.value(e2).toLocaleLowerCase() === t3, a2 = e.options.find(n2), a2 !== void 0 ? R.value.indexOf(a2) === -1 ? de(a2) : Ie() : Me(o2, true));
      } else
        F.clearValue(t2);
    else
      be(t2);
  }
  function Se(e2) {
    o("keypress", e2);
  }
  function we(t2) {
    if (o("keydown", t2), shouldIgnoreKey$1(t2) === true)
      return;
    const n2 = s.value.length > 0 && (e.newValueMode !== void 0 || e.onNewValue !== void 0), a2 = t2.shiftKey !== true && e.multiple !== true && (r.value > -1 || n2 === true);
    if (t2.keyCode === 27)
      return void prevent$1(t2);
    if (t2.keyCode === 9 && a2 === false)
      return void Ve();
    if (t2.target === void 0 || t2.target.id !== F.targetUid.value)
      return;
    if (t2.keyCode === 40 && F.innerLoading.value !== true && l.value === false)
      return stopAndPrevent$1(t2), void Ae();
    if (t2.keyCode === 8 && e.hideSelected !== true && s.value.length === 0)
      return void (e.multiple === true && Array.isArray(e.modelValue) === true ? se(e.modelValue.length - 1) : e.multiple !== true && e.modelValue !== null && o("update:modelValue", null));
    t2.keyCode !== 35 && t2.keyCode !== 36 || typeof s.value === "string" && s.value.length !== 0 || (stopAndPrevent$1(t2), r.value = -1, ve(t2.keyCode === 36 ? 1 : -1, e.multiple)), t2.keyCode !== 33 && t2.keyCode !== 34 || B.value === void 0 || (stopAndPrevent$1(t2), r.value = Math.max(-1, Math.min(P.value, r.value + (t2.keyCode === 33 ? -1 : 1) * B.value.view)), ve(t2.keyCode === 33 ? 1 : -1, e.multiple)), t2.keyCode !== 38 && t2.keyCode !== 40 || (stopAndPrevent$1(t2), ve(t2.keyCode === 38 ? -1 : 1, e.multiple));
    const i2 = P.value;
    if ((y === void 0 || S < Date.now()) && (y = ""), i2 > 0 && e.useInput !== true && t2.key !== void 0 && t2.key.length === 1 && t2.altKey === t2.ctrlKey && (t2.keyCode !== 32 || y.length > 0)) {
      l.value !== true && Ae(t2);
      const o2 = t2.key.toLocaleLowerCase(), n3 = y.length === 1 && y[0] === o2;
      S = Date.now() + 1500, n3 === false && (stopAndPrevent$1(t2), y += o2);
      const a3 = new RegExp("^" + y.split("").map((e2) => reEscapeList.indexOf(e2) > -1 ? "\\" + e2 : e2).join(".*"), "i");
      let s2 = r.value;
      if (n3 === true || s2 < 0 || a3.test(ne.value(e.options[s2])) !== true)
        do {
          s2 = normalizeToInterval(s2 + 1, -1, i2 - 1);
        } while (s2 !== r.value && (ae.value(e.options[s2]) === true || a3.test(ne.value(e.options[s2])) !== true));
      r.value !== s2 && nextTick(() => {
        pe(s2), L(s2), s2 >= 0 && e.useInput === true && e.fillInput === true && Pe(ne.value(e.options[s2]));
      });
    } else if (t2.keyCode === 13 || t2.keyCode === 32 && e.useInput !== true && y === "" || t2.keyCode === 9 && a2 !== false)
      if (t2.keyCode !== 9 && stopAndPrevent$1(t2), r.value > -1 && r.value < i2)
        de(e.options[r.value]);
      else {
        if (n2 === true) {
          const t3 = (t4, o2) => {
            if (o2) {
              if (validateNewValueMode(o2) !== true)
                return;
            } else
              o2 = e.newValueMode;
            if (t4 === void 0 || t4 === null)
              return;
            $e("", e.multiple !== true, true);
            const n3 = o2 === "toggle" ? de : ce;
            n3(t4, o2 === "add-unique"), e.multiple !== true && (x.value !== null && x.value.focus(), Ie());
          };
          if (e.onNewValue !== void 0 ? o("new-value", s.value, t3) : t3(s.value), e.multiple !== true)
            return;
        }
        l.value === true ? Ve() : F.innerLoading.value !== true && Ae();
      }
  }
  function xe() {
    return v === true ? _.value : C.value !== null && C.value.__qPortalInnerRef.value !== null ? C.value.__qPortalInnerRef.value : void 0;
  }
  function Ce() {
    return xe();
  }
  function ke() {
    return e.hideSelected === true ? [] : t["selected-item"] !== void 0 ? X.value.map((e2) => t["selected-item"](e2)).slice() : t.selected !== void 0 ? [].concat(t.selected()) : e.useChips === true ? X.value.map((t2, o2) => h(QChip, { key: "option-" + o2, removable: F.editable.value === true && ae.value(t2.opt) !== true, dense: true, textColor: e.color, tabindex: W.value, onRemove() {
      t2.removeAtIndex(o2);
    } }, () => h("span", { class: "ellipsis", [t2.html === true ? "innerHTML" : "textContent"]: ne.value(t2.opt) }))) : [h("span", { [K.value === true ? "innerHTML" : "textContent"]: e.displayValue !== void 0 ? e.displayValue : j.value })];
  }
  function _e() {
    const e2 = t.option !== void 0 ? t.option : (e3) => {
      return h(QItem, __spreadValues({ key: e3.index }, e3.itemProps), () => {
        return h(QItemSection, () => h(QItemLabel, () => h("span", { [e3.html === true ? "innerHTML" : "textContent"]: e3.label })));
      });
    };
    let o2 = E("div", Z.value.map(e2));
    return t["before-options"] !== void 0 && (o2 = t["before-options"]().concat(o2)), hMergeSlot$1(t["after-options"], o2);
  }
  function qe(t2, o2) {
    const n2 = __spreadValues(__spreadProps(__spreadValues(__spreadValues({ ref: o2 === true ? x : void 0, key: "i_t", class: I.value, style: e.inputStyle, value: s.value !== void 0 ? s.value : "", type: "search" }, Y.value), F.splitAttrs.attributes.value), { id: F.targetUid.value, maxlength: e.maxlength, autocomplete: e.autocomplete, "data-autofocus": t2 !== true && e.autofocus === true || void 0, disabled: e.disable === true, readonly: e.readonly === true }), ie.value);
    return t2 !== true && v === true && (Array.isArray(n2.class) === true ? n2.class[0] += " no-pointer-events" : n2.class += " no-pointer-events"), h("input", n2);
  }
  function Te(t2) {
    clearTimeout(d), t2 && t2.target && t2.target.composing === true || (Pe(t2.target.value || ""), m = true, g = s.value, F.focused.value === true || v === true && u.value !== true || F.focus(), e.onFilter !== void 0 && (d = setTimeout(() => {
      Me(s.value);
    }, e.inputDebounce)));
  }
  function Pe(e2) {
    s.value !== e2 && (s.value = e2, o("input-value", e2));
  }
  function $e(t2, o2, n2) {
    m = n2 !== true, e.useInput === true && (Pe(t2), o2 !== true && n2 === true || (g = t2), o2 !== true && Me(t2));
  }
  function Me(t2, a2) {
    if (e.onFilter === void 0 || a2 !== true && F.focused.value !== true)
      return;
    F.innerLoading.value === true ? o("filter-abort") : (F.innerLoading.value = true, c.value = true), t2 !== "" && e.multiple !== true && R.value.length > 0 && m !== true && t2 === ne.value(R.value[0]) && (t2 = "");
    const i2 = setTimeout(() => {
      l.value === true && (l.value = false);
    }, 10);
    clearTimeout(f), f = i2, o("filter", t2, (e2, t3) => {
      a2 !== true && F.focused.value !== true || f !== i2 || (clearTimeout(f), typeof e2 === "function" && e2(), c.value = false, nextTick(() => {
        F.innerLoading.value = false, F.editable.value === true && (a2 === true ? l.value === true && Ie() : l.value === true ? Ne(true) : l.value = true), typeof t3 === "function" && nextTick(() => {
          t3(n);
        });
      }));
    }, () => {
      F.focused.value === true && f === i2 && (clearTimeout(f), F.innerLoading.value = false, c.value = false), l.value === true && (l.value = false);
    });
  }
  function Be() {
    const o2 = N.value === true ? t["no-option"] !== void 0 ? () => t["no-option"]({ inputValue: s.value }) : void 0 : _e;
    return h(QMenu, __spreadProps(__spreadValues({ ref: C, class: H.value, style: e.popupContentStyle, modelValue: l.value, fit: e.menuShrink !== true, cover: e.optionsCover === true && N.value !== true && e.useInput !== true, anchor: e.menuAnchor, self: e.menuSelf, offset: e.menuOffset, dark: V.value, noParentEvent: true, noRefocus: true, noFocus: true, square: ee.value, transitionShow: e.transitionShow, transitionHide: e.transitionHide, transitionDuration: e.transitionDuration, separateClosePopup: true }, G.value), { onScrollPassive: O, onBeforeShow: Ue, onBeforeHide: Qe, onShow: Ee }), o2);
  }
  function Qe(e2) {
    Ke(e2), Ve();
  }
  function Ee() {
    z();
  }
  function Oe(e2) {
    stop$1(e2), x.value !== null && x.value.focus(), u.value = true, window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
  }
  function Le(e2) {
    stop$1(e2), nextTick(() => {
      u.value = false;
    });
  }
  function ze() {
    const o2 = [h(QField, __spreadProps(__spreadValues(__spreadProps(__spreadValues({ class: `col-auto ${F.fieldClass}` }, D.value), { for: F.targetUid.value, dark: V.value, square: true, loading: c.value, itemAligned: false, filled: true, stackLabel: s.value.length > 0 }), F.splitAttrs.listeners.value), { onFocus: Oe, onBlur: Le }), __spreadProps(__spreadValues({}, t), { rawControl: () => F.getControl(true), before: void 0, after: void 0 }))];
    return l.value === true && o2.push(h("div", __spreadProps(__spreadValues({ ref: _, class: H.value + " scroll", style: e.popupContentStyle }, G.value), { onClick: prevent$1, onScrollPassive: O }), N.value === true ? t["no-option"] !== void 0 ? t["no-option"]({ inputValue: s.value }) : null : _e())), h(QDialog, { ref: k, modelValue: i.value, position: e.useInput === true ? "top" : void 0, transitionShow: b, transitionHide: e.transitionHide, transitionDuration: e.transitionDuration, onBeforeShow: Ue, onBeforeHide: Fe, onHide: Re, onShow: De }, () => h("div", { class: "q-select__dialog" + (V.value === true ? " q-select__dialog--dark q-dark" : "") + (u.value === true ? " q-select__dialog--focused" : "") }, o2));
  }
  function Fe(e2) {
    Ke(e2), k.value !== null && k.value.__updateRefocusTarget(F.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")), F.focused.value = false;
  }
  function Re(e2) {
    Ie(), F.focused.value === false && o("blur", e2), He();
  }
  function De() {
    const e2 = document.activeElement;
    e2 !== null && e2.id === F.targetUid.value || x.value === null || x.value === e2 || x.value.focus(), z();
  }
  function Ve() {
    i.value !== true && (r.value = -1, l.value === true && (l.value = false), F.focused.value === false && (clearTimeout(f), f = void 0, F.innerLoading.value === true && (o("filter-abort"), F.innerLoading.value = false, c.value = false)));
  }
  function Ae(o2) {
    F.editable.value === true && (v === true ? (F.onControlFocusin(o2), i.value = true, nextTick(() => {
      F.focus();
    })) : F.focus(), e.onFilter !== void 0 ? Me(s.value) : N.value === true && t["no-option"] === void 0 || (l.value = true));
  }
  function Ie() {
    i.value = false, Ve();
  }
  function He() {
    e.useInput === true && $e(e.multiple !== true && e.fillInput === true && R.value.length > 0 && ne.value(R.value[0]) || "", true, true);
  }
  function Ne(t2) {
    let o2 = -1;
    if (t2 === true) {
      if (R.value.length > 0) {
        const t3 = oe.value(R.value[0]);
        o2 = e.options.findIndex((e2) => isDeepEqual(oe.value(e2), t3));
      }
      Q(o2);
    }
    pe(o2);
  }
  function je() {
    i.value === false && C.value !== null && C.value.updatePosition();
  }
  function Ue(e2) {
    e2 !== void 0 && stop$1(e2), o("popup-show", e2), F.hasPopupOpen.value = true, F.onControlFocusin(e2);
  }
  function Ke(e2) {
    e2 !== void 0 && stop$1(e2), o("popup-hide", e2), F.hasPopupOpen.value = false, F.onControlFocusout(e2);
  }
  function We() {
    v = (a.platform.is.mobile === true || e.behavior === "dialog") && (e.behavior !== "menu" && (e.useInput !== true || (t["no-option"] !== void 0 || e.onFilter !== void 0 || N.value === false))), b = a.platform.is.ios === true && v === true && e.useInput === true ? "fade" : e.transitionShow;
  }
  return watch(R, (t2) => {
    p2 = t2, e.useInput === true && e.fillInput === true && e.multiple !== true && F.innerLoading.value !== true && (i.value !== true && l.value !== true || A.value !== true) && (m !== true && He(), i.value !== true && l.value !== true || Me(""));
  }, { immediate: true }), watch(() => e.fillInput, He), watch(l, Ne), onBeforeUpdate(We), onUpdated(je), We(), onBeforeUnmount(() => {
    clearTimeout(d);
  }), Object.assign(n, { showPopup: Ae, hidePopup: Ie, removeAtIndex: se, add: ce, toggleOption: de, setOptionIndex: pe, moveOptionSelection: ve, filter: Me, updateMenuPosition: je, updateInputValue: $e, isOptionSelected: he, getEmittingOptionValue: re, isOptionDisabled: (...e2) => ae.value.apply(null, e2), getOptionValue: (...e2) => oe.value.apply(null, e2), getOptionLabel: (...e2) => ne.value.apply(null, e2) }), Object.assign(F, { innerValue: R, fieldClass: computed(() => `q-select q-field--auto-height q-select--with${e.useInput !== true ? "out" : ""}-input q-select--with${e.useChips !== true ? "out" : ""}-chips q-select--${e.multiple === true ? "multiple" : "single"}`), inputRef: w, targetRef: x, hasValue: A, showPopup: Ae, floatingLabel: computed(() => (e.hideSelected === true ? s.value.length > 0 : A.value === true) || fieldValueIsFilled$1(e.displayValue)), getControlChild: () => {
    if (F.editable.value !== false && (i.value === true || N.value !== true || t["no-option"] !== void 0))
      return v === true ? ze() : Be();
  }, controlEvents: { onFocusin(e2) {
    F.onControlFocusin(e2);
  }, onFocusout(e2) {
    F.onControlFocusout(e2, () => {
      He(), Ve();
    });
  }, onClick(e2) {
    if (prevent$1(e2), v !== true && l.value === true)
      return Ve(), void (x.value !== null && x.value.focus());
    Ae(e2);
  } }, getControl: (t2) => {
    const o2 = ke(), n2 = t2 === true || i.value !== true || v !== true;
    if (e.useInput === true ? o2.push(qe(t2, n2)) : F.editable.value === true && n2 === true && (o2.push(h("div", __spreadProps(__spreadValues({ ref: x, key: "d_t", class: "no-outline", id: F.targetUid.value }, Y.value), { onKeydown: we, onKeyup: be, onKeypress: Se }))), typeof e.autocomplete === "string" && e.autocomplete.length > 0 && o2.push(h("input", { class: "q-select__autocomplete-input no-outline", autocomplete: e.autocomplete, onKeyup: ye }))), q.value !== void 0 && e.disable !== true && le.value.length > 0) {
      const t3 = le.value.map((e2) => h("option", { value: e2, selected: true }));
      o2.push(h("select", { class: "hidden", name: q.value, multiple: e.multiple }, t3));
    }
    return h("div", __spreadValues({ class: "q-field__native row items-center" }, F.splitAttrs.attributes.value), o2);
  }, getInnerAppend: () => e.loading !== true && c.value !== true && e.hideDropdownIcon !== true ? [h(QIcon$1, { class: "q-select__dropdown-icon" + (l.value === true ? " rotate-180" : ""), name: J.value })] : null }), useField$1(F);
} });
const skeletonTypes = ["text", "rect", "circle", "QBtn", "QBadge", "QChip", "QToolbar", "QCheckbox", "QRadio", "QToggle", "QSlider", "QRange", "QInput", "QAvatar"], skeletonAnimations = ["wave", "pulse", "pulse-x", "pulse-y", "fade", "blink", "none"];
var QSkeleton = defineComponent({ name: "QSkeleton", props: __spreadProps(__spreadValues({}, useDarkProps$1), { tag: { type: String, default: "div" }, type: { type: String, validator: (e) => skeletonTypes.includes(e), default: "rect" }, animation: { type: String, validator: (e) => skeletonAnimations.includes(e), default: "wave" }, animationSpeed: { type: [String, Number], default: 1500 }, square: Boolean, bordered: Boolean, size: String, width: String, height: String }), setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark$1(e, o.proxy.$q), a = computed(() => {
    const t2 = e.size !== void 0 ? [e.size, e.size] : [e.width, e.height];
    return { "--q-skeleton-speed": `${e.animationSpeed}ms`, width: t2[0], height: t2[1] };
  }), l = computed(() => `q-skeleton q-skeleton--${n.value === true ? "dark" : "light"} q-skeleton--type-${e.type}` + (e.animation !== "none" ? ` q-skeleton--anim q-skeleton--anim-${e.animation}` : "") + (e.square === true ? " q-skeleton--square" : "") + (e.bordered === true ? " q-skeleton--bordered" : ""));
  return () => h(e.tag, { class: l.value, style: a.value }, hSlot$1(t.default));
} });
const slotsDef = [["left", "center", "start", "width"], ["right", "center", "end", "width"], ["top", "start", "center", "height"], ["bottom", "end", "center", "height"]];
var QSlideItem = defineComponent({ name: "QSlideItem", props: __spreadProps(__spreadValues({}, useDarkProps$1), { leftColor: String, rightColor: String, topColor: String, bottomColor: String, onSlide: Function }), emits: ["action", "top", "right", "bottom", "left"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = useDark$1(e, a), { getCacheWithFn: i } = useCache(), r = ref(null);
  let s, u = {}, c = {}, d = {};
  const p2 = computed(() => a.lang.rtl === true ? { left: "right", right: "left" } : { left: "left", right: "right" }), v = computed(() => "q-slide-item q-item-type overflow-hidden" + (l.value === true ? " q-slide-item--dark q-dark" : ""));
  function m() {
    r.value.style.transform = "translate(0,0)";
  }
  function f(t2, n2, a2) {
    e.onSlide !== void 0 && o("slide", { side: t2, ratio: n2, isReset: a2 });
  }
  function g(e2) {
    const n2 = r.value;
    if (e2.isFirst)
      u = { dir: null, size: { left: 0, right: 0, top: 0, bottom: 0 }, scale: 0 }, n2.classList.add("no-transition"), slotsDef.forEach((e3) => {
        if (t[e3[0]] !== void 0) {
          const t2 = d[e3[0]];
          t2.style.transform = "scale(1)", u.size[e3[0]] = t2.getBoundingClientRect()[e3[3]];
        }
      }), u.axis = e2.direction === "up" || e2.direction === "down" ? "Y" : "X";
    else {
      if (e2.isFinal)
        return n2.classList.remove("no-transition"), void (u.scale === 1 ? (n2.style.transform = `translate${u.axis}(${100 * u.dir}%)`, s = setTimeout(() => {
          o(u.showing, { reset: m }), o("action", { side: u.showing, reset: m });
        }, 230)) : (n2.style.transform = "translate(0,0)", f(u.showing, 0, true)));
      e2.direction = u.axis === "X" ? e2.offset.x < 0 ? "left" : "right" : e2.offset.y < 0 ? "up" : "down";
    }
    if (t.left === void 0 && e2.direction === p2.value.right || t.right === void 0 && e2.direction === p2.value.left || t.top === void 0 && e2.direction === "down" || t.bottom === void 0 && e2.direction === "up")
      return void (n2.style.transform = "translate(0,0)");
    let a2, l2, i2;
    u.axis === "X" ? (l2 = e2.direction === "left" ? -1 : 1, a2 = l2 === 1 ? p2.value.left : p2.value.right, i2 = e2.distance.x) : (l2 = e2.direction === "up" ? -2 : 2, a2 = l2 === 2 ? "top" : "bottom", i2 = e2.distance.y), u.dir !== null && Math.abs(l2) !== Math.abs(u.dir) || (u.dir !== l2 && (["left", "right", "top", "bottom"].forEach((e3) => {
      c[e3] && (c[e3].style.visibility = a2 === e3 ? "visible" : "hidden");
    }), u.showing = a2, u.dir = l2), u.scale = Math.max(0, Math.min(1, (i2 - 40) / u.size[a2])), n2.style.transform = `translate${u.axis}(${i2 * l2 / Math.abs(l2)}px)`, d[a2].style.transform = `scale(${u.scale})`, f(a2, u.scale, false));
  }
  return onBeforeUpdate(() => {
    c = {}, d = {};
  }), onBeforeUnmount(() => {
    clearTimeout(s);
  }), Object.assign(n, { reset: m }), () => {
    const o2 = [], n2 = { left: t[p2.value.right] !== void 0, right: t[p2.value.left] !== void 0, up: t.bottom !== void 0, down: t.top !== void 0 }, a2 = Object.keys(n2).filter((e2) => n2[e2] === true);
    slotsDef.forEach((n3) => {
      const a3 = n3[0];
      t[a3] !== void 0 && o2.push(h("div", { ref: (e2) => {
        c[a3] = e2;
      }, class: `q-slide-item__${a3} absolute-full row no-wrap items-${n3[1]} justify-${n3[2]}` + (e[a3 + "Color"] !== void 0 ? ` bg-${e[a3 + "Color"]}` : "") }, [h("div", { ref: (e2) => {
        d[a3] = e2;
      } }, t[a3]())]));
    });
    const l2 = h("div", { key: `${a2.length === 0 ? "only-" : ""} content`, ref: r, class: "q-slide-item__content" }, hSlot$1(t.default));
    return a2.length === 0 ? o2.push(l2) : o2.push(withDirectives(l2, i("dir#" + a2.join(""), () => {
      const e2 = { prevent: true, stop: true, mouse: true };
      return a2.forEach((t2) => {
        e2[t2] = true;
      }), [[TouchPan, g, void 0, e2]];
    }))), h("div", { class: v.value }, o2);
  };
} });
const space = h("div", { class: "q-space" });
var QSpace = defineComponent({ name: "QSpace", setup() {
  return () => space;
} });
const svg$l = [h("g", { transform: "matrix(1 0 0 -1 0 80)" }, [h("rect", { width: "10", height: "20", rx: "3" }, [h("animate", { attributeName: "height", begin: "0s", dur: "4.3s", values: "20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "15", width: "10", height: "80", rx: "3" }, [h("animate", { attributeName: "height", begin: "0s", dur: "2s", values: "80;55;33;5;75;23;73;33;12;14;60;80", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "30", width: "10", height: "50", rx: "3" }, [h("animate", { attributeName: "height", begin: "0s", dur: "1.4s", values: "50;34;78;23;56;23;34;76;80;54;21;50", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "45", width: "10", height: "30", rx: "3" }, [h("animate", { attributeName: "height", begin: "0s", dur: "2s", values: "30;45;13;80;56;72;45;76;34;23;67;30", calcMode: "linear", repeatCount: "indefinite" })])])];
var QSpinnerAudio = defineComponent({ name: "QSpinnerAudio", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, fill: "currentColor", width: t.value, height: t.value, viewBox: "0 0 55 80", xmlns: "http://www.w3.org/2000/svg" }, svg$l);
} });
const svg$k = [h("g", { transform: "translate(1 1)", "stroke-width": "2", fill: "none", "fill-rule": "evenodd" }, [h("circle", { cx: "5", cy: "50", r: "5" }, [h("animate", { attributeName: "cy", begin: "0s", dur: "2.2s", values: "50;5;50;50", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "cx", begin: "0s", dur: "2.2s", values: "5;27;49;5", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "27", cy: "5", r: "5" }, [h("animate", { attributeName: "cy", begin: "0s", dur: "2.2s", from: "5", to: "5", values: "5;50;50;5", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "cx", begin: "0s", dur: "2.2s", from: "27", to: "27", values: "27;49;5;27", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "49", cy: "50", r: "5" }, [h("animate", { attributeName: "cy", begin: "0s", dur: "2.2s", values: "50;50;5;50", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "cx", from: "49", to: "49", begin: "0s", dur: "2.2s", values: "49;5;27;49", calcMode: "linear", repeatCount: "indefinite" })])])];
var QSpinnerBall = defineComponent({ name: "QSpinnerBall", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, stroke: "currentColor", width: t.value, height: t.value, viewBox: "0 0 57 57", xmlns: "http://www.w3.org/2000/svg" }, svg$k);
} });
const svg$j = [h("rect", { y: "10", width: "15", height: "120", rx: "6" }, [h("animate", { attributeName: "height", begin: "0.5s", dur: "1s", values: "120;110;100;90;80;70;60;50;40;140;120", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "y", begin: "0.5s", dur: "1s", values: "10;15;20;25;30;35;40;45;50;0;10", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "30", y: "10", width: "15", height: "120", rx: "6" }, [h("animate", { attributeName: "height", begin: "0.25s", dur: "1s", values: "120;110;100;90;80;70;60;50;40;140;120", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "y", begin: "0.25s", dur: "1s", values: "10;15;20;25;30;35;40;45;50;0;10", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "60", width: "15", height: "140", rx: "6" }, [h("animate", { attributeName: "height", begin: "0s", dur: "1s", values: "120;110;100;90;80;70;60;50;40;140;120", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "y", begin: "0s", dur: "1s", values: "10;15;20;25;30;35;40;45;50;0;10", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "90", y: "10", width: "15", height: "120", rx: "6" }, [h("animate", { attributeName: "height", begin: "0.25s", dur: "1s", values: "120;110;100;90;80;70;60;50;40;140;120", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "y", begin: "0.25s", dur: "1s", values: "10;15;20;25;30;35;40;45;50;0;10", calcMode: "linear", repeatCount: "indefinite" })]), h("rect", { x: "120", y: "10", width: "15", height: "120", rx: "6" }, [h("animate", { attributeName: "height", begin: "0.5s", dur: "1s", values: "120;110;100;90;80;70;60;50;40;140;120", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "y", begin: "0.5s", dur: "1s", values: "10;15;20;25;30;35;40;45;50;0;10", calcMode: "linear", repeatCount: "indefinite" })])];
var QSpinnerBars = defineComponent({ name: "QSpinnerBars", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, fill: "currentColor", width: t.value, height: t.value, viewBox: "0 0 135 140", xmlns: "http://www.w3.org/2000/svg" }, svg$j);
} });
const svg$i = [h("rect", { x: "25", y: "25", width: "50", height: "50", fill: "none", "stroke-width": "4", stroke: "currentColor" }, [h("animateTransform", { id: "spinnerBox", attributeName: "transform", type: "rotate", from: "0 50 50", to: "180 50 50", dur: "0.5s", begin: "rectBox.end" })]), h("rect", { x: "27", y: "27", width: "46", height: "50", fill: "currentColor" }, [h("animate", { id: "rectBox", attributeName: "height", begin: "0s;spinnerBox.end", dur: "1.3s", from: "50", to: "0", fill: "freeze" })])];
var QSpinnerBox = defineComponent({ name: "QSpinnerBox", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$i);
} });
const svg$h = [h("circle", { cx: "50", cy: "50", r: "48", fill: "none", "stroke-width": "4", "stroke-miterlimit": "10", stroke: "currentColor" }), h("line", { "stroke-linecap": "round", "stroke-width": "4", "stroke-miterlimit": "10", stroke: "currentColor", x1: "50", y1: "50", x2: "85", y2: "50.5" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "2s", repeatCount: "indefinite" })]), h("line", { "stroke-linecap": "round", "stroke-width": "4", "stroke-miterlimit": "10", stroke: "currentColor", x1: "50", y1: "50", x2: "49.5", y2: "74" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "15s", repeatCount: "indefinite" })])];
var QSpinnerClock = defineComponent({ name: "QSpinnerClock", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$h);
} });
const svg$g = [h("rect", { x: "0", y: "0", width: " 100", height: "100", fill: "none" }), h("path", { d: "M78,19H22c-6.6,0-12,5.4-12,12v31c0,6.6,5.4,12,12,12h37.2c0.4,3,1.8,5.6,3.7,7.6c2.4,2.5,5.1,4.1,9.1,4 c-1.4-2.1-2-7.2-2-10.3c0-0.4,0-0.8,0-1.3h8c6.6,0,12-5.4,12-12V31C90,24.4,84.6,19,78,19z", fill: "currentColor" }), h("circle", { cx: "30", cy: "47", r: "5", fill: "#fff" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", values: "0;1;1", keyTimes: "0;0.2;1", dur: "1s", repeatCount: "indefinite" })]), h("circle", { cx: "50", cy: "47", r: "5", fill: "#fff" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", values: "0;0;1;1", keyTimes: "0;0.2;0.4;1", dur: "1s", repeatCount: "indefinite" })]), h("circle", { cx: "70", cy: "47", r: "5", fill: "#fff" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", values: "0;0;1;1", keyTimes: "0;0.4;0.6;1", dur: "1s", repeatCount: "indefinite" })])];
var QSpinnerComment = defineComponent({ name: "QSpinnerComment", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, svg$g);
} });
const svg$f = [h("rect", { x: "0", y: "0", width: " 100", height: "100", fill: "none" }), h("g", { transform: "translate(25 25)" }, [h("rect", { x: "-20", y: "-20", width: " 40", height: "40", fill: "currentColor", opacity: "0.9" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "1.5", to: "1", repeatCount: "indefinite", begin: "0s", dur: "1s", calcMode: "spline", keySplines: "0.2 0.8 0.2 0.8", keyTimes: "0;1" })])]), h("g", { transform: "translate(75 25)" }, [h("rect", { x: "-20", y: "-20", width: " 40", height: "40", fill: "currentColor", opacity: "0.8" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "1.5", to: "1", repeatCount: "indefinite", begin: "0.1s", dur: "1s", calcMode: "spline", keySplines: "0.2 0.8 0.2 0.8", keyTimes: "0;1" })])]), h("g", { transform: "translate(25 75)" }, [h("rect", { x: "-20", y: "-20", width: " 40", height: "40", fill: "currentColor", opacity: "0.7" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "1.5", to: "1", repeatCount: "indefinite", begin: "0.3s", dur: "1s", calcMode: "spline", keySplines: "0.2 0.8 0.2 0.8", keyTimes: "0;1" })])]), h("g", { transform: "translate(75 75)" }, [h("rect", { x: "-20", y: "-20", width: " 40", height: "40", fill: "currentColor", opacity: "0.6" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "1.5", to: "1", repeatCount: "indefinite", begin: "0.2s", dur: "1s", calcMode: "spline", keySplines: "0.2 0.8 0.2 0.8", keyTimes: "0;1" })])])];
var QSpinnerCube = defineComponent({ name: "QSpinnerCube", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, svg$f);
} });
const svg$e = [h("circle", { cx: "15", cy: "15", r: "15" }, [h("animate", { attributeName: "r", from: "15", to: "15", begin: "0s", dur: "0.8s", values: "15;9;15", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "fill-opacity", from: "1", to: "1", begin: "0s", dur: "0.8s", values: "1;.5;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "60", cy: "15", r: "9", "fill-opacity": ".3" }, [h("animate", { attributeName: "r", from: "9", to: "9", begin: "0s", dur: "0.8s", values: "9;15;9", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "fill-opacity", from: ".5", to: ".5", begin: "0s", dur: "0.8s", values: ".5;1;.5", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "105", cy: "15", r: "15" }, [h("animate", { attributeName: "r", from: "15", to: "15", begin: "0s", dur: "0.8s", values: "15;9;15", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "fill-opacity", from: "1", to: "1", begin: "0s", dur: "0.8s", values: "1;.5;1", calcMode: "linear", repeatCount: "indefinite" })])];
var QSpinnerDots = defineComponent({ name: "QSpinnerDots", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, fill: "currentColor", width: t.value, height: t.value, viewBox: "0 0 120 30", xmlns: "http://www.w3.org/2000/svg" }, svg$e);
} });
const svg$d = [h("g", { transform: "translate(20 50)" }, [h("rect", { x: "-10", y: "-30", width: " 20", height: "60", fill: "currentColor", opacity: "0.6" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "2", to: "1", begin: "0s", repeatCount: "indefinite", dur: "1s", calcMode: "spline", keySplines: "0.1 0.9 0.4 1", keyTimes: "0;1", values: "2;1" })])]), h("g", { transform: "translate(50 50)" }, [h("rect", { x: "-10", y: "-30", width: " 20", height: "60", fill: "currentColor", opacity: "0.8" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "2", to: "1", begin: "0.1s", repeatCount: "indefinite", dur: "1s", calcMode: "spline", keySplines: "0.1 0.9 0.4 1", keyTimes: "0;1", values: "2;1" })])]), h("g", { transform: "translate(80 50)" }, [h("rect", { x: "-10", y: "-30", width: " 20", height: "60", fill: "currentColor", opacity: "0.9" }, [h("animateTransform", { attributeName: "transform", type: "scale", from: "2", to: "1", begin: "0.2s", repeatCount: "indefinite", dur: "1s", calcMode: "spline", keySplines: "0.1 0.9 0.4 1", keyTimes: "0;1", values: "2;1" })])])];
var QSpinnerFacebook = defineComponent({ name: "QSpinnerFacebook", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid" }, svg$d);
} });
const svg$c = [h("g", { transform: "translate(-20,-20)" }, [h("path", { d: "M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z", fill: "currentColor" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "90 50 50", to: "0 50 50", dur: "1s", repeatCount: "indefinite" })])]), h("g", { transform: "translate(20,20) rotate(15 50 50)" }, [h("path", { d: "M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z", fill: "currentColor" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "90 50 50", dur: "1s", repeatCount: "indefinite" })])])];
var QSpinnerGears = defineComponent({ name: "QSpinnerGears", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$c);
} });
const svg$b = [h("circle", { cx: "12.5", cy: "12.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "0s", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "12.5", cy: "52.5", r: "12.5", "fill-opacity": ".5" }, [h("animate", { attributeName: "fill-opacity", begin: "100ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "52.5", cy: "12.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "300ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "52.5", cy: "52.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "600ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "92.5", cy: "12.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "800ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "92.5", cy: "52.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "400ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "12.5", cy: "92.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "700ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "52.5", cy: "92.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "500ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "92.5", cy: "92.5", r: "12.5" }, [h("animate", { attributeName: "fill-opacity", begin: "200ms", dur: "1s", values: "1;.2;1", calcMode: "linear", repeatCount: "indefinite" })])];
var QSpinnerGrid = defineComponent({ name: "QSpinnerGrid", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, fill: "currentColor", width: t.value, height: t.value, viewBox: "0 0 105 105", xmlns: "http://www.w3.org/2000/svg" }, svg$b);
} });
const svg$a = [h("path", { d: "M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.716-6.002 11.47-7.65 17.304-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z", "fill-opacity": ".5" }, [h("animate", { attributeName: "fill-opacity", begin: "0s", dur: "1.4s", values: "0.5;1;0.5", calcMode: "linear", repeatCount: "indefinite" })]), h("path", { d: "M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.593-2.32 17.308 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z", "fill-opacity": ".5" }, [h("animate", { attributeName: "fill-opacity", begin: "0.7s", dur: "1.4s", values: "0.5;1;0.5", calcMode: "linear", repeatCount: "indefinite" })]), h("path", { d: "M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z" })];
var QSpinnerHearts = defineComponent({ name: "QSpinnerHearts", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, fill: "currentColor", width: t.value, height: t.value, viewBox: "0 0 140 64", xmlns: "http://www.w3.org/2000/svg" }, svg$a);
} });
const svg$9 = [h("g", [h("path", { fill: "none", stroke: "currentColor", "stroke-width": "5", "stroke-miterlimit": "10", d: "M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z" }), h("clipPath", { id: "uil-hourglass-clip1" }, [h("rect", { x: "15", y: "20", width: " 70", height: "25" }, [h("animate", { attributeName: "height", from: "25", to: "0", dur: "1s", repeatCount: "indefinite", values: "25;0;0", keyTimes: "0;0.5;1" }), h("animate", { attributeName: "y", from: "20", to: "45", dur: "1s", repeatCount: "indefinite", values: "20;45;45", keyTimes: "0;0.5;1" })])]), h("clipPath", { id: "uil-hourglass-clip2" }, [h("rect", { x: "15", y: "55", width: " 70", height: "25" }, [h("animate", { attributeName: "height", from: "0", to: "25", dur: "1s", repeatCount: "indefinite", values: "0;25;25", keyTimes: "0;0.5;1" }), h("animate", { attributeName: "y", from: "80", to: "55", dur: "1s", repeatCount: "indefinite", values: "80;55;55", keyTimes: "0;0.5;1" })])]), h("path", { d: "M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z", "clip-path": "url(#uil-hourglass-clip1)", fill: "currentColor" }), h("path", { d: "M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z", "clip-path": "url(#uil-hourglass-clip2)", fill: "currentColor" }), h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "180 50 50", repeatCount: "indefinite", dur: "1s", values: "0 50 50;0 50 50;180 50 50", keyTimes: "0;0.7;1" })])];
var QSpinnerHourglass = defineComponent({ name: "QSpinnerHourglass", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$9);
} });
const svg$8 = [h("path", { d: "M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z", fill: "none", stroke: "currentColor", "stroke-width": "8", "stroke-dasharray": "10.691205342610678 10.691205342610678", "stroke-dashoffset": "0" }, [h("animate", { attributeName: "stroke-dashoffset", from: "0", to: "21.382410685221355", begin: "0", dur: "2s", repeatCount: "indefinite", fill: "freeze" })])];
var QSpinnerInfinity = defineComponent({ name: "QSpinnerInfinity", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, svg$8);
} });
const svg$7 = [h("g", { "stroke-width": "4", "stroke-linecap": "round" }, [h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(180)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: "1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(210)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: "0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(240)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(270)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(300)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(330)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(0)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(30)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(60)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(90)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(120)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: ".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85", repeatCount: "indefinite" })]), h("line", { y1: "17", y2: "29", transform: "translate(32,32) rotate(150)" }, [h("animate", { attributeName: "stroke-opacity", dur: "750ms", values: "1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1", repeatCount: "indefinite" })])])];
var QSpinnerIos = defineComponent({ name: "QSpinnerIos", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, stroke: "currentColor", fill: "currentColor", viewBox: "0 0 64 64" }, svg$7);
} });
const svg$6 = [h("circle", { cx: "50", cy: "50", r: "44", fill: "none", "stroke-width": "4", "stroke-opacity": ".5", stroke: "currentColor" }), h("circle", { cx: "8", cy: "54", r: "6", fill: "currentColor", "stroke-width": "3", stroke: "currentColor" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 48", to: "360 50 52", dur: "2s", repeatCount: "indefinite" })])];
var QSpinnerOrbit = defineComponent({ name: "QSpinnerOrbit", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$6);
} });
const svg$5 = [h("g", { transform: "translate(1 1)", "stroke-width": "2", fill: "none", "fill-rule": "evenodd" }, [h("circle", { "stroke-opacity": ".5", cx: "18", cy: "18", r: "18" }), h("path", { d: "M36 18c0-9.94-8.06-18-18-18" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "1s", repeatCount: "indefinite" })])])];
var QSpinnerOval = defineComponent({ name: "QSpinnerOval", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, stroke: "currentColor", width: t.value, height: t.value, viewBox: "0 0 38 38", xmlns: "http://www.w3.org/2000/svg" }, svg$5);
} });
const svg$4 = [h("path", { d: "M0 50A50 50 0 0 1 50 0L50 50L0 50", fill: "currentColor", opacity: "0.5" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "0.8s", repeatCount: "indefinite" })]), h("path", { d: "M50 0A50 50 0 0 1 100 50L50 50L50 0", fill: "currentColor", opacity: "0.5" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "1.6s", repeatCount: "indefinite" })]), h("path", { d: "M100 50A50 50 0 0 1 50 100L50 50L100 50", fill: "currentColor", opacity: "0.5" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "2.4s", repeatCount: "indefinite" })]), h("path", { d: "M50 100A50 50 0 0 1 0 50L50 50L50 100", fill: "currentColor", opacity: "0.5" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 50 50", to: "360 50 50", dur: "3.2s", repeatCount: "indefinite" })])];
var QSpinnerPie = defineComponent({ name: "QSpinnerPie", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$4);
} });
const svg$3 = [h("g", { fill: "none", "fill-rule": "evenodd", "stroke-width": "2" }, [h("circle", { cx: "22", cy: "22", r: "1" }, [h("animate", { attributeName: "r", begin: "0s", dur: "1.8s", values: "1; 20", calcMode: "spline", keyTimes: "0; 1", keySplines: "0.165, 0.84, 0.44, 1", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-opacity", begin: "0s", dur: "1.8s", values: "1; 0", calcMode: "spline", keyTimes: "0; 1", keySplines: "0.3, 0.61, 0.355, 1", repeatCount: "indefinite" })]), h("circle", { cx: "22", cy: "22", r: "1" }, [h("animate", { attributeName: "r", begin: "-0.9s", dur: "1.8s", values: "1; 20", calcMode: "spline", keyTimes: "0; 1", keySplines: "0.165, 0.84, 0.44, 1", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-opacity", begin: "-0.9s", dur: "1.8s", values: "1; 0", calcMode: "spline", keyTimes: "0; 1", keySplines: "0.3, 0.61, 0.355, 1", repeatCount: "indefinite" })])])];
var QSpinnerPuff = defineComponent({ name: "QSpinnerPuff", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, stroke: "currentColor", width: t.value, height: t.value, viewBox: "0 0 44 44", xmlns: "http://www.w3.org/2000/svg" }, svg$3);
} });
const svg$2 = [h("g", { transform: "scale(0.55)" }, [h("circle", { cx: "30", cy: "150", r: "30", fill: "currentColor" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", dur: "1s", begin: "0", repeatCount: "indefinite", keyTimes: "0;0.5;1", values: "0;1;1" })]), h("path", { d: "M90,150h30c0-49.7-40.3-90-90-90v30C63.1,90,90,116.9,90,150z", fill: "currentColor" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", dur: "1s", begin: "0.1", repeatCount: "indefinite", keyTimes: "0;0.5;1", values: "0;1;1" })]), h("path", { d: "M150,150h30C180,67.2,112.8,0,30,0v30C96.3,30,150,83.7,150,150z", fill: "currentColor" }, [h("animate", { attributeName: "opacity", from: "0", to: "1", dur: "1s", begin: "0.2", repeatCount: "indefinite", keyTimes: "0;0.5;1", values: "0;1;1" })])])];
var QSpinnerRadio = defineComponent({ name: "QSpinnerRadio", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", xmlns: "http://www.w3.org/2000/svg" }, svg$2);
} });
const svg$1 = [h("g", { fill: "none", "fill-rule": "evenodd", transform: "translate(1 1)", "stroke-width": "2" }, [h("circle", { cx: "22", cy: "22", r: "6" }, [h("animate", { attributeName: "r", begin: "1.5s", dur: "3s", values: "6;22", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-opacity", begin: "1.5s", dur: "3s", values: "1;0", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-width", begin: "1.5s", dur: "3s", values: "2;0", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "22", cy: "22", r: "6" }, [h("animate", { attributeName: "r", begin: "3s", dur: "3s", values: "6;22", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-opacity", begin: "3s", dur: "3s", values: "1;0", calcMode: "linear", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-width", begin: "3s", dur: "3s", values: "2;0", calcMode: "linear", repeatCount: "indefinite" })]), h("circle", { cx: "22", cy: "22", r: "8" }, [h("animate", { attributeName: "r", begin: "0s", dur: "1.5s", values: "6;1;2;3;4;5;6", calcMode: "linear", repeatCount: "indefinite" })])])];
var QSpinnerRings = defineComponent({ name: "QSpinnerRings", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, stroke: "currentColor", width: t.value, height: t.value, viewBox: "0 0 45 45", xmlns: "http://www.w3.org/2000/svg" }, svg$1);
} });
const svg = [h("defs", [h("linearGradient", { x1: "8.042%", y1: "0%", x2: "65.682%", y2: "23.865%", id: "a" }, [h("stop", { "stop-color": "currentColor", "stop-opacity": "0", offset: "0%" }), h("stop", { "stop-color": "currentColor", "stop-opacity": ".631", offset: "63.146%" }), h("stop", { "stop-color": "currentColor", offset: "100%" })])]), h("g", { transform: "translate(1 1)", fill: "none", "fill-rule": "evenodd" }, [h("path", { d: "M36 18c0-9.94-8.06-18-18-18", stroke: "url(#a)", "stroke-width": "2" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "0.9s", repeatCount: "indefinite" })]), h("circle", { fill: "currentColor", cx: "36", cy: "18", r: "1" }, [h("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "0.9s", repeatCount: "indefinite" })])])];
var QSpinnerTail = defineComponent({ name: "QSpinnerTail", props: useSpinnerProps$1, setup(e) {
  const { cSize: t, classes: o } = useSpinner$1(e);
  return () => h("svg", { class: o.value, width: t.value, height: t.value, viewBox: "0 0 38 38", xmlns: "http://www.w3.org/2000/svg" }, svg);
} }), QSplitter = defineComponent({ name: "QSplitter", props: __spreadProps(__spreadValues({}, useDarkProps$1), { modelValue: { type: Number, required: true }, reverse: Boolean, unit: { type: String, default: "%", validator: (e) => ["%", "px"].includes(e) }, limits: { type: Array, validator: (e) => {
  return e.length === 2 && (typeof e[0] === "number" && typeof e[1] === "number" && (e[0] >= 0 && e[0] <= e[1]));
} }, emitImmediately: Boolean, horizontal: Boolean, disable: Boolean, beforeClass: [Array, String, Object], afterClass: [Array, String, Object], separatorClass: [Array, String, Object], separatorStyle: [Array, String, Object] }), emits: ["update:modelValue"], setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = useDark$1(e, n), l = ref(null), i = { before: ref(null), after: ref(null) }, r = computed(() => `q-splitter no-wrap ${e.horizontal === true ? "q-splitter--horizontal column" : "q-splitter--vertical row"} q-splitter--${e.disable === true ? "disabled" : "workable"}` + (a.value === true ? " q-splitter--dark" : "")), s = computed(() => e.horizontal === true ? "height" : "width"), u = computed(() => e.reverse !== true ? "before" : "after"), c = computed(() => e.limits !== void 0 ? e.limits : e.unit === "%" ? [10, 90] : [50, 1 / 0]);
  function d(t2) {
    return (e.unit === "%" ? t2 : Math.round(t2)) + e.unit;
  }
  const p2 = computed(() => ({ [u.value]: { [s.value]: d(e.modelValue) } }));
  let v, m, f, g, b;
  function y(t2) {
    if (t2.isFirst === true) {
      const t3 = l.value.getBoundingClientRect()[s.value];
      return v = e.horizontal === true ? "up" : "left", m = e.unit === "%" ? 100 : t3, f = Math.min(m, c.value[1], Math.max(c.value[0], e.modelValue)), g = (e.reverse !== true ? 1 : -1) * (e.horizontal === true ? 1 : n.lang.rtl === true ? -1 : 1) * (e.unit === "%" ? t3 === 0 ? 0 : 100 / t3 : 1), void l.value.classList.add("q-splitter--active");
    }
    if (t2.isFinal === true)
      return b !== e.modelValue && o("update:modelValue", b), void l.value.classList.remove("q-splitter--active");
    const a2 = f + g * (t2.direction === v ? -1 : 1) * t2.distance[e.horizontal === true ? "y" : "x"];
    b = Math.min(m, c.value[1], Math.max(c.value[0], a2)), i[u.value].value.style[s.value] = d(b), e.emitImmediately === true && e.modelValue !== b && o("update:modelValue", b);
  }
  const S = computed(() => {
    return [[TouchPan, y, void 0, { [e.horizontal === true ? "vertical" : "horizontal"]: true, prevent: true, stop: true, mouse: true, mouseAllDir: true }]];
  });
  function w(e2, t2) {
    e2 < t2[0] ? o("update:modelValue", t2[0]) : e2 > t2[1] && o("update:modelValue", t2[1]);
  }
  return watch(() => e.modelValue, (e2) => {
    w(e2, c.value);
  }), watch(() => e.limits, () => {
    nextTick(() => {
      w(e.modelValue, c.value);
    });
  }), () => {
    const o2 = [h("div", { ref: i.before, class: ["q-splitter__panel q-splitter__before" + (e.reverse === true ? " col" : ""), e.beforeClass], style: p2.value.before }, hSlot$1(t.before)), h("div", { class: ["q-splitter__separator", e.separatorClass], style: e.separatorStyle, "aria-disabled": e.disable === true ? "true" : void 0 }, [hDir("div", { class: "q-splitter__separator-area absolute-full" }, hSlot$1(t.separator), "sep", e.disable !== true, () => S.value)]), h("div", { ref: i.after, class: ["q-splitter__panel q-splitter__after" + (e.reverse === true ? "" : " col"), e.afterClass], style: p2.value.after }, hSlot$1(t.after))];
    return h("div", { class: r.value, ref: l }, hMergeSlot$1(t.default, o2));
  };
} }), StepHeader = defineComponent({ name: "StepHeader", props: { stepper: {}, step: {}, goToPanel: Function }, setup(e, { attrs: t }) {
  const { proxy: { $q: o } } = getCurrentInstance(), n = ref(null), a = computed(() => e.stepper.modelValue === e.step.name), l = computed(() => {
    const t2 = e.step.disable;
    return t2 === true || t2 === "";
  }), i = computed(() => {
    const t2 = e.step.error;
    return t2 === true || t2 === "";
  }), r = computed(() => {
    const t2 = e.step.done;
    return l.value === false && (t2 === true || t2 === "");
  }), s = computed(() => {
    const t2 = e.step.headerNav, o2 = t2 === true || t2 === "" || t2 === void 0;
    return l.value === false && e.stepper.headerNav && o2;
  }), u = computed(() => {
    return e.step.prefix && a.value === false && i.value === false && r.value === false;
  }), c = computed(() => {
    return a.value === true ? e.step.activeIcon || e.stepper.activeIcon || o.iconSet.stepper.active : i.value === true ? e.step.errorIcon || e.stepper.errorIcon || o.iconSet.stepper.error : l.value === false && r.value === true ? e.step.doneIcon || e.stepper.doneIcon || o.iconSet.stepper.done : e.step.icon || e.stepper.inactiveIcon;
  }), d = computed(() => {
    const t2 = i.value === true ? e.step.errorColor || e.stepper.errorColor : void 0;
    if (a.value === true) {
      const o2 = e.step.activeColor || e.stepper.activeColor || e.step.color;
      return o2 !== void 0 ? o2 : t2;
    }
    return t2 !== void 0 ? t2 : l.value === false && r.value === true ? e.step.doneColor || e.stepper.doneColor || e.step.color || e.stepper.inactiveColor : e.step.color || e.stepper.inactiveColor;
  }), p2 = computed(() => {
    return "q-stepper__tab col-grow flex items-center no-wrap relative-position" + (d.value !== void 0 ? ` text-${d.value}` : "") + (i.value === true ? " q-stepper__tab--error" : "") + (a.value === true ? " q-stepper__tab--active" : "") + (r.value === true ? " q-stepper__tab--done" : "") + (s.value === true ? " q-stepper__tab--navigation q-focusable q-hoverable" : "") + (l.value === true ? " q-stepper__tab--disabled" : "");
  }), v = computed(() => e.stepper.headerNav === true && s.value);
  function m() {
    n.value !== null && n.value.focus(), a.value === false && e.goToPanel(e.step.name);
  }
  function f(t2) {
    t2.keyCode === 13 && a.value === false && e.goToPanel(e.step.name);
  }
  return () => {
    const o2 = { class: p2.value };
    s.value === true && (o2.onClick = m, o2.onKeyup = f, Object.assign(o2, l.value === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: t.tabindex || 0 }));
    const a2 = [h("div", { class: "q-focus-helper", tabindex: -1, ref: n }), h("div", { class: "q-stepper__dot row flex-center q-stepper__line relative-position" }, [h("span", { class: "row flex-center" }, [u.value === true ? e.step.prefix : h(QIcon$1, { name: c.value })])])];
    if (e.step.title !== void 0 && e.step.title !== null) {
      const t2 = [h("div", { class: "q-stepper__title" }, e.step.title)];
      e.step.caption !== void 0 && e.step.caption !== null && t2.push(h("div", { class: "q-stepper__caption" }, e.step.caption)), a2.push(h("div", { class: "q-stepper__label q-stepper__line relative-position" }, t2));
    }
    return withDirectives(h("div", o2, a2), [[Ripple, v.value]]);
  };
} });
function getStepWrapper(e) {
  return h("div", { class: "q-stepper__step-content" }, [h("div", { class: "q-stepper__step-inner" }, hSlot$1(e.default))]);
}
const PanelWrapper = { setup(e, { slots: t }) {
  return () => getStepWrapper(t);
} };
var QStep = defineComponent({ name: "QStep", props: __spreadProps(__spreadValues({}, usePanelChildProps), { icon: String, color: String, title: { type: String, required: true }, caption: String, prefix: [String, Number], doneIcon: String, doneColor: String, activeIcon: String, activeColor: String, errorIcon: String, errorColor: String, headerNav: { type: Boolean, default: true }, done: Boolean, error: Boolean }), setup(e, { slots: t }) {
  const o = inject(stepperKey, () => {
    console.error("QStep needs to be child of QStepper");
  }), { getCacheWithFn: n } = useCache(), a = ref(null), l = computed(() => o.value.modelValue === e.name);
  watch(l, (e2) => {
    e2 === true && o.value.vertical === true && nextTick(() => {
      a.value !== null && (a.value.scrollTop = 0);
    });
  });
  const i = computed(() => typeof e.name === "string" || typeof e.name === "number" ? e.name : String(e.name));
  function r() {
    const e2 = o.value.vertical;
    return e2 === true && o.value.keepAlive === true ? h(KeepAlive, o.value.keepAliveProps.value, l.value === true ? [h(o.value.needsUniqueKeepAliveWrapper.value === true ? n(i.value, () => __spreadProps(__spreadValues({}, PanelWrapper), { name: i.value })) : PanelWrapper, { key: i.value }, t.default)] : void 0) : e2 !== true || l.value === true ? getStepWrapper(t) : void 0;
  }
  return () => h("div", { ref: a, class: "q-stepper__step" }, o.value.vertical === true ? [h(StepHeader, { stepper: o.value, step: e, goToPanel: o.value.goToPanel }), o.value.animated === true ? h(QSlideTransition, r) : r()] : [r()]);
} });
const camelRE = /(-\w)/g;
function camelizeProps(e) {
  const t = {};
  return Object.keys(e).forEach((o) => {
    const n = o.replace(camelRE, (e2) => e2[1].toUpperCase());
    t[n] = e[o];
  }), t;
}
var QStepper = defineComponent({ name: "QStepper", props: __spreadProps(__spreadValues(__spreadValues({}, useDarkProps$1), usePanelProps), { flat: Boolean, bordered: Boolean, alternativeLabels: Boolean, headerNav: Boolean, contracted: Boolean, headerClass: String, inactiveColor: String, inactiveIcon: String, doneIcon: String, doneColor: String, activeIcon: String, activeColor: String, errorIcon: String, errorColor: String }), emits: usePanelEmits, setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark$1(e, o.proxy.$q), { updatePanelsList: a, isValidPanelName: l, updatePanelIndex: i, getPanelContent: r, getPanels: s, panelDirectives: u, goToPanel: c, keepAliveProps: d, needsUniqueKeepAliveWrapper: p2 } = usePanel();
  provide(stepperKey, computed(() => __spreadValues({ goToPanel: c, keepAliveProps: d, needsUniqueKeepAliveWrapper: p2 }, e)));
  const v = computed(() => `q-stepper q-stepper--${e.vertical === true ? "vertical" : "horizontal"}` + (e.flat === true || n.value === true ? " q-stepper--flat no-shadow" : "") + (e.bordered === true || n.value === true && e.flat === false ? " q-stepper--bordered" : "") + (e.contracted === true ? " q-stepper--contracted" : "") + (n.value === true ? " q-stepper--dark q-dark" : "")), m = computed(() => `q-stepper__header row items-stretch justify-between q-stepper__header--${e.alternativeLabels === true ? "alternative" : "standard"}-labels` + (e.flat === false || e.bordered === true ? " q-stepper__header--border" : "") + (e.headerClass !== void 0 ? ` ${e.headerClass}` : ""));
  function f() {
    const o2 = hSlot$1(t.message, []);
    if (e.vertical === true) {
      l(e.modelValue) && i();
      const n2 = h("div", { class: "q-stepper__content" }, hSlot$1(t.default));
      return o2 === void 0 ? [n2] : o2.concat(n2);
    }
    return [h("div", { class: m.value }, s().map((t2) => {
      const o3 = camelizeProps(t2.props);
      return h(StepHeader, { key: o3.name, stepper: e, step: o3, goToPanel: c });
    })), o2, hDir("div", { class: "q-stepper__content q-panel-parent" }, r(), "cont", e.swipeable, () => u.value)];
  }
  return () => {
    return a(t), h("div", { class: v.value }, hMergeSlot$1(t.navigation, f()));
  };
} }), QStepperNavigation = defineComponent({ name: "QStepperNavigation", setup(e, { slots: t }) {
  return () => h("div", { class: "q-stepper__nav" }, hSlot$1(t.default));
} }), QTh = defineComponent({ name: "QTh", props: { props: Object, autoWidth: Boolean }, emits: ["click"], setup(e, { slots: t, emit: o }) {
  const n = getCurrentInstance(), { proxy: { $q: a } } = n;
  return () => {
    if (e.props === void 0)
      return h("th", { class: e.autoWidth === true ? "q-table--col-auto-width" : "" }, hSlot$1(t.default));
    let l, i;
    const r = n.vnode.key;
    if (r) {
      if (l = e.props.colsMap[r], l === void 0)
        return;
    } else
      l = e.props.col;
    if (l.sortable === true) {
      const e2 = l.align === "right" ? "unshift" : "push";
      i = hUniqueSlot(t.default, []), i[e2](h(QIcon$1, { class: l.__iconClass, name: a.iconSet.table.arrowUp }));
    } else
      i = hSlot$1(t.default);
    const s = { class: l.__thClass + (e.autoWidth === true ? " q-table--col-auto-width" : ""), style: l.headerStyle, onClick: (t2) => {
      l.sortable === true && e.props.sort(l), o("click", t2);
    } };
    return h("th", s, i);
  };
} });
function getTableMiddle(e, t) {
  return h("div", e, [h("table", { class: "q-table" }, t)]);
}
const comps = { list: QList, table: QMarkupTable }, typeOptions = ["list", "table", "__qtable"];
var QVirtualScroll = defineComponent({ name: "QVirtualScroll", props: __spreadProps(__spreadValues({}, useVirtualScrollProps), { type: { type: String, default: "list", validator: (e) => typeOptions.includes(e) }, items: { type: Array, default: () => [] }, itemsFn: Function, itemsSize: Number, scrollTarget: { default: void 0 } }), setup(e, { slots: t, attrs: o }) {
  let n;
  const a = ref(null), l = computed(() => e.itemsSize >= 0 && e.itemsFn !== void 0 ? parseInt(e.itemsSize, 10) : Array.isArray(e.items) ? e.items.length : 0), { virtualScrollSliceRange: i, localResetVirtualScroll: r, padVirtualScroll: s, onVirtualScrollEvt: u } = useVirtualScroll({ virtualScrollLength: l, getVirtualScrollTarget: m, getVirtualScrollEl: v }), c = computed(() => {
    if (l.value === 0)
      return [];
    const t2 = (e2, t3) => ({ index: i.value.from + t3, item: e2 });
    return e.itemsFn === void 0 ? e.items.slice(i.value.from, i.value.to).map(t2) : e.itemsFn(i.value.from, i.value.to - i.value.from).map(t2);
  }), d = computed(() => "q-virtual-scroll q-virtual-scroll" + (e.virtualScrollHorizontal === true ? "--horizontal" : "--vertical") + (e.scrollTarget !== void 0 ? "" : " scroll")), p2 = computed(() => e.scrollTarget !== void 0 ? {} : { tabindex: 0 });
  function v() {
    return a.value.$el || a.value;
  }
  function m() {
    return n;
  }
  function f() {
    n = getScrollTarget(v(), e.scrollTarget), n.addEventListener("scroll", u, listenOpts$1.passive);
  }
  function g() {
    n !== void 0 && (n.removeEventListener("scroll", u, listenOpts$1.passive), n = void 0);
  }
  function b() {
    let o2 = s(e.type === "list" ? "div" : "tbody", c.value.map(t.default));
    return t.before !== void 0 && (o2 = t.before().concat(o2)), hMergeSlot$1(t.after, o2);
  }
  return watch(l, () => {
    r();
  }), watch(() => e.scrollTarget, () => {
    g(), f();
  }), onBeforeMount(() => {
    r();
  }), onMounted(() => {
    f();
  }), onBeforeUnmount(() => {
    g();
  }), () => {
    if (t.default !== void 0)
      return e.type === "__qtable" ? getTableMiddle({ ref: a, class: "q-table__middle " + d.value }, b()) : h(comps[e.type], __spreadValues(__spreadProps(__spreadValues({}, o), { ref: a, class: [o.class, d.value] }), p2.value), b);
    console.error("QVirtualScroll: default scoped slot is required for rendering");
  };
} });
function sortDate(e, t) {
  return new Date(e) - new Date(t);
}
const useTableSortProps = { sortMethod: Function, binaryStateSort: Boolean, columnSortOrder: { type: String, validator: (e) => e === "ad" || e === "da", default: "ad" } };
function useTableSort(e, t, o, n) {
  const a = computed(() => {
    const { sortBy: e2 } = t.value;
    return e2 && o.value.find((t2) => t2.name === e2) || null;
  }), l = computed(() => e.sortMethod !== void 0 ? e.sortMethod : (e2, t2, n2) => {
    const a2 = o.value.find((e3) => e3.name === t2);
    if (a2 === void 0 || a2.field === void 0)
      return e2;
    const l2 = n2 === true ? -1 : 1, i2 = typeof a2.field === "function" ? (e3) => a2.field(e3) : (e3) => e3[a2.field];
    return e2.sort((e3, t3) => {
      let o2 = i2(e3), n3 = i2(t3);
      return o2 === null || o2 === void 0 ? -1 * l2 : n3 === null || n3 === void 0 ? 1 * l2 : a2.sort !== void 0 ? a2.sort(o2, n3, e3, t3) * l2 : isNumber(o2) === true && isNumber(n3) === true ? (o2 - n3) * l2 : isDate(o2) === true && isDate(n3) === true ? sortDate(o2, n3) * l2 : typeof o2 === "boolean" && typeof n3 === "boolean" ? (o2 - n3) * l2 : ([o2, n3] = [o2, n3].map((e4) => (e4 + "").toLocaleString().toLowerCase()), o2 < n3 ? -1 * l2 : o2 === n3 ? 0 : l2);
    });
  });
  function i(a2) {
    let l2 = e.columnSortOrder;
    if (a2 === Object(a2))
      a2.sortOrder && (l2 = a2.sortOrder), a2 = a2.name;
    else {
      const e2 = o.value.find((e3) => e3.name === a2);
      e2 !== void 0 && e2.sortOrder && (l2 = e2.sortOrder);
    }
    let { sortBy: i2, descending: r } = t.value;
    i2 !== a2 ? (i2 = a2, r = l2 === "da") : e.binaryStateSort === true ? r = !r : r === true ? l2 === "ad" ? i2 = null : r = false : l2 === "ad" ? r = true : i2 = null, n({ sortBy: i2, descending: r, page: 1 });
  }
  return { columnToSort: a, computedSortMethod: l, sort: i };
}
const useTableFilterProps = { filter: [String, Object], filterMethod: Function };
function useTableFilter(e, t) {
  const o = computed(() => e.filterMethod !== void 0 ? e.filterMethod : (e2, t2, o2, n) => {
    const a = t2 ? t2.toLowerCase() : "";
    return e2.filter((e3) => o2.some((t3) => {
      const o3 = n(t3, e3) + "", l = o3 === "undefined" || o3 === "null" ? "" : o3.toLowerCase();
      return l.indexOf(a) !== -1;
    }));
  });
  return watch(() => e.filter, () => {
    nextTick(() => {
      t({ page: 1 }, true);
    });
  }, { deep: true }), { computedFilterMethod: o };
}
function samePagination(e, t) {
  for (const o in t)
    if (t[o] !== e[o])
      return false;
  return true;
}
function fixPagination(e) {
  return e.page < 1 && (e.page = 1), e.rowsPerPage !== void 0 && e.rowsPerPage < 1 && (e.rowsPerPage = 0), e;
}
const useTablePaginationProps = { pagination: Object, rowsPerPageOptions: { type: Array, default: () => [5, 7, 10, 15, 20, 25, 50, 0] }, "onUpdate:pagination": Function };
function useTablePaginationState(e, t) {
  const { props: o, emit: n } = e, a = ref(Object.assign({ sortBy: null, descending: false, page: 1, rowsPerPage: o.rowsPerPageOptions.length > 0 ? o.rowsPerPageOptions[0] : 5 }, o.pagination)), l = computed(() => {
    const e2 = o["onUpdate:pagination"] !== void 0 ? __spreadValues(__spreadValues({}, a.value), o.pagination) : a.value;
    return fixPagination(e2);
  }), i = computed(() => l.value.rowsNumber !== void 0);
  function r(e2) {
    s({ pagination: e2, filter: o.filter });
  }
  function s(e2 = {}) {
    nextTick(() => {
      n("request", { pagination: e2.pagination || l.value, filter: e2.filter || o.filter, getCellValue: t });
    });
  }
  function u(e2, t2) {
    const s2 = fixPagination(__spreadValues(__spreadValues({}, l.value), e2));
    samePagination(l.value, s2) ? i.value === true && t2 === true && r(s2) : i.value !== true ? o.pagination !== void 0 && o["onUpdate:pagination"] !== void 0 ? n("update:pagination", s2) : a.value = s2 : r(s2);
  }
  return { innerPagination: a, computedPagination: l, isServerSide: i, requestServerInteraction: s, setPagination: u };
}
function useTablePagination(e, t, o, n, a, l) {
  const { props: i, emit: r, proxy: { $q: s } } = e, u = computed(() => n.value === true ? o.value.rowsNumber || 0 : l.value), c = computed(() => {
    const { page: e2, rowsPerPage: t2 } = o.value;
    return (e2 - 1) * t2;
  }), d = computed(() => {
    const { page: e2, rowsPerPage: t2 } = o.value;
    return e2 * t2;
  }), p2 = computed(() => o.value.page === 1), v = computed(() => o.value.rowsPerPage === 0 ? 1 : Math.max(1, Math.ceil(u.value / o.value.rowsPerPage))), m = computed(() => d.value === 0 || o.value.page >= v.value), f = computed(() => {
    const e2 = i.rowsPerPageOptions.includes(t.value.rowsPerPage) ? i.rowsPerPageOptions : [t.value.rowsPerPage].concat(i.rowsPerPageOptions);
    return e2.map((e3) => ({ label: e3 === 0 ? s.lang.table.allRows : "" + e3, value: e3 }));
  });
  function h2() {
    a({ page: 1 });
  }
  function g() {
    const { page: e2 } = o.value;
    e2 > 1 && a({ page: e2 - 1 });
  }
  function b() {
    const { page: e2, rowsPerPage: t2 } = o.value;
    d.value > 0 && e2 * t2 < u.value && a({ page: e2 + 1 });
  }
  function y() {
    a({ page: v.value });
  }
  return watch(v, (e2, t2) => {
    if (e2 === t2)
      return;
    const n2 = o.value.page;
    e2 && !n2 ? a({ page: 1 }) : e2 < n2 && a({ page: e2 });
  }), i["onUpdate:pagination"] !== void 0 && r("update:pagination", __spreadValues({}, o.value)), { firstRowIndex: c, lastRowIndex: d, isFirstPage: p2, isLastPage: m, pagesNumber: v, computedRowsPerPageOptions: f, computedRowsNumber: u, firstPage: h2, prevPage: g, nextPage: b, lastPage: y };
}
const useTableRowSelectionProps = { selection: { type: String, default: "none", validator: (e) => ["single", "multiple", "none"].includes(e) }, selected: { type: Array, default: () => [] } }, useTableRowSelectionEmits = ["update:selected", "selection"];
function useTableRowSelection(e, t, o, n) {
  const a = computed(() => {
    const t2 = {};
    return e.selected.map(n.value).forEach((e2) => {
      t2[e2] = true;
    }), t2;
  }), l = computed(() => {
    return e.selection !== "none";
  }), i = computed(() => {
    return e.selection === "single";
  }), r = computed(() => {
    return e.selection === "multiple";
  }), s = computed(() => o.value.length > 0 && o.value.every((e2) => a.value[n.value(e2)] === true)), u = computed(() => s.value !== true && o.value.some((e2) => a.value[n.value(e2)] === true)), c = computed(() => e.selected.length);
  function d(e2) {
    return a.value[e2] === true;
  }
  function p2() {
    t("update:selected", []);
  }
  function v(o2, a2, l2, r2) {
    t("selection", { rows: a2, added: l2, keys: o2, evt: r2 });
    const s2 = i.value === true ? l2 === true ? a2 : [] : l2 === true ? e.selected.concat(a2) : e.selected.filter((e2) => o2.includes(n.value(e2)) === false);
    t("update:selected", s2);
  }
  return { hasSelectionMode: l, singleSelection: i, multipleSelection: r, allRowsSelected: s, someRowsSelected: u, rowsSelectedNumber: c, isRowSelected: d, clearSelection: p2, updateSelection: v };
}
function getVal(e) {
  return Array.isArray(e) ? e.slice() : [];
}
const useTableRowExpandProps = { expanded: Array }, useTableRowExpandEmits = ["update:expanded"];
function useTableRowExpand(e, t) {
  const o = ref(getVal(e.expanded));
  function n(e2) {
    return o.value.includes(e2);
  }
  function a(n2) {
    e.expanded !== void 0 ? t("update:expanded", n2) : o.value = n2;
  }
  function l(e2, t2) {
    const n2 = o.value.slice(), l2 = n2.indexOf(e2);
    t2 === true ? l2 === -1 && (n2.push(e2), a(n2)) : l2 !== -1 && (n2.splice(l2, 1), a(n2));
  }
  return watch(() => e.expanded, (e2) => {
    o.value = getVal(e2);
  }), { isRowExpanded: n, setExpanded: a, updateExpanded: l };
}
const useTableColumnSelectionProps = { visibleColumns: Array };
function useTableColumnSelection(e, t, o) {
  const n = computed(() => {
    if (e.columns !== void 0)
      return e.columns;
    const t2 = e.rows[0];
    return t2 !== void 0 ? Object.keys(t2).map((e2) => ({ name: e2, label: e2.toUpperCase(), field: e2, align: isNumber(t2[e2]) ? "right" : "left", sortable: true })) : [];
  }), a = computed(() => {
    const { sortBy: o2, descending: a2 } = t.value, l2 = e.visibleColumns !== void 0 ? n.value.filter((t2) => t2.required === true || e.visibleColumns.includes(t2.name) === true) : n.value;
    return l2.map((e2) => {
      const t2 = e2.align || "right", n2 = `text-${t2}`;
      return __spreadProps(__spreadValues({}, e2), { align: t2, __iconClass: `q-table__sort-icon q-table__sort-icon--${t2}`, __thClass: n2 + (e2.headerClasses !== void 0 ? " " + e2.headerClasses : "") + (e2.sortable === true ? " sortable" : "") + (e2.name === o2 ? ` sorted ${a2 === true ? "sort-desc" : ""}` : ""), __tdStyle: e2.style !== void 0 ? typeof e2.style !== "function" ? () => e2.style : e2.style : () => null, __tdClass: e2.classes !== void 0 ? typeof e2.classes !== "function" ? () => n2 + " " + e2.classes : (t3) => n2 + " " + e2.classes(t3) : () => n2 });
    });
  }), l = computed(() => {
    const e2 = {};
    return a.value.forEach((t2) => {
      e2[t2.name] = t2;
    }), e2;
  }), i = computed(() => {
    return e.tableColspan !== void 0 ? e.tableColspan : a.value.length + (o.value === true ? 1 : 0);
  });
  return { colList: n, computedCols: a, computedColsMap: l, computedColspan: i };
}
const bottomClass = "q-table__bottom row items-center", commonVirtPropsObj = {};
commonVirtPropsList.forEach((e) => {
  commonVirtPropsObj[e] = {};
});
var QTable = defineComponent({ name: "QTable", props: __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadProps(__spreadValues({ rows: { type: Array, default: () => [] }, rowKey: { type: [String, Function], default: "id" }, columns: Array, loading: Boolean, iconFirstPage: String, iconPrevPage: String, iconNextPage: String, iconLastPage: String, title: String, hideHeader: Boolean, grid: Boolean, gridHeader: Boolean, dense: Boolean, flat: Boolean, bordered: Boolean, square: Boolean, separator: { type: String, default: "horizontal", validator: (e) => ["horizontal", "vertical", "cell", "none"].includes(e) }, wrapCells: Boolean, virtualScroll: Boolean }, commonVirtPropsObj), { noDataLabel: String, noResultsLabel: String, loadingLabel: String, selectedRowsLabel: Function, rowsPerPageLabel: String, paginationLabel: Function, color: { type: String, default: "grey-8" }, titleClass: [String, Array, Object], tableStyle: [String, Array, Object], tableClass: [String, Array, Object], tableHeaderStyle: [String, Array, Object], tableHeaderClass: [String, Array, Object], cardContainerClass: [String, Array, Object], cardContainerStyle: [String, Array, Object], cardStyle: [String, Array, Object], cardClass: [String, Array, Object], hideBottom: Boolean, hideSelectedBanner: Boolean, hideNoData: Boolean, hidePagination: Boolean, onRowClick: Function, onRowDblclick: Function, onRowContextmenu: Function }), useDarkProps$1), useFullscreenProps), useTableColumnSelectionProps), useTableFilterProps), useTablePaginationProps), useTableRowExpandProps), useTableRowSelectionProps), useTableSortProps), emits: ["request", "virtual-scroll", ...useFullscreenEmits, ...useTableRowExpandEmits, ...useTableRowSelectionEmits], setup(e, { slots: t, emit: o }) {
  const n = getCurrentInstance(), { proxy: { $q: a } } = n, l = useDark$1(e, a), { inFullscreen: i, toggleFullscreen: r } = useFullscreen(), s = computed(() => typeof e.rowKey === "function" ? e.rowKey : (t2) => t2[e.rowKey]), u = ref(null), c = ref(null), d = computed(() => e.grid !== true && e.virtualScroll === true), p2 = computed(() => " q-table__card" + (l.value === true ? " q-table__card--dark q-dark" : "") + (e.square === true ? " q-table--square" : "") + (e.flat === true ? " q-table--flat" : "") + (e.bordered === true ? " q-table--bordered" : "")), v = computed(() => `q-table__container q-table--${e.separator}-separator column no-wrap` + (e.loading === true ? " q-table--loading" : "") + (e.grid === true ? " q-table--grid" : p2.value) + (l.value === true ? " q-table--dark" : "") + (e.dense === true ? " q-table--dense" : "") + (e.wrapCells === false ? " q-table--no-wrap" : "") + (i.value === true ? " fullscreen scroll" : "")), m = computed(() => v.value + (e.loading === true ? " q-table--loading" : ""));
  watch(() => e.tableStyle + e.tableClass + e.tableHeaderStyle + e.tableHeaderClass + v.value, () => {
    d.value === true && c.value !== null && c.value.reset();
  });
  const { innerPagination: f, computedPagination: g, isServerSide: b, requestServerInteraction: y, setPagination: S } = useTablePaginationState(n, me), { computedFilterMethod: w } = useTableFilter(e, S), { isRowExpanded: x, setExpanded: C, updateExpanded: k } = useTableRowExpand(e, o), _ = computed(() => {
    let t2 = e.rows;
    if (b.value === true || t2.length === 0)
      return t2;
    const { sortBy: o2, descending: n2 } = g.value;
    return e.filter && (t2 = w.value(t2, e.filter, R.value, me)), A.value !== null && (t2 = I.value(e.rows === t2 ? t2.slice() : t2, o2, n2)), t2;
  }), q = computed(() => _.value.length), T = computed(() => {
    let t2 = _.value;
    if (b.value === true)
      return t2;
    const { rowsPerPage: o2 } = g.value;
    return o2 !== 0 && (N.value === 0 && e.rows !== t2 ? t2.length > j.value && (t2 = t2.slice(0, j.value)) : t2 = t2.slice(N.value, j.value)), t2;
  }), { hasSelectionMode: P, singleSelection: $, multipleSelection: M, allRowsSelected: B, someRowsSelected: Q, rowsSelectedNumber: E, isRowSelected: O, clearSelection: L, updateSelection: z } = useTableRowSelection(e, o, T, s), { colList: F, computedCols: R, computedColsMap: D, computedColspan: V } = useTableColumnSelection(e, g, P), { columnToSort: A, computedSortMethod: I, sort: H } = useTableSort(e, g, F, S), { firstRowIndex: N, lastRowIndex: j, isFirstPage: U, isLastPage: K, pagesNumber: W, computedRowsPerPageOptions: Y, computedRowsNumber: G, firstPage: X, prevPage: Z, nextPage: J, lastPage: ee } = useTablePagination(n, f, g, b, S, q), te = computed(() => T.value.length === 0), oe = computed(() => {
    const t2 = {};
    return commonVirtPropsList.forEach((o2) => {
      t2[o2] = e[o2];
    }), t2.virtualScrollItemSize === void 0 && (t2.virtualScrollItemSize = e.dense === true ? 28 : 48), t2;
  });
  function ne() {
    d.value === true && c.value.reset();
  }
  function ae() {
    if (e.grid === true)
      return Te();
    const o2 = e.hideHeader !== true ? be : null;
    if (d.value === true) {
      const n3 = t["top-row"], a2 = t["bottom-row"], l2 = { default: (e2) => se(e2.item, t.body, e2.index) };
      if (n3 !== void 0) {
        const e2 = h("tbody", n3({ cols: R.value }));
        l2.before = o2 === null ? () => e2 : () => [o2()].concat(e2);
      } else
        o2 !== null && (l2.before = o2);
      return a2 !== void 0 && (l2.after = () => h("tbody", a2({ cols: R.value }))), h(QVirtualScroll, __spreadProps(__spreadValues({ ref: c, class: e.tableClass, style: e.tableStyle }, oe.value), { items: T.value, type: "__qtable", tableColspan: V.value, onVirtualScroll: ie }), l2);
    }
    const n2 = [ue()];
    return o2 !== null && n2.unshift(o2()), getTableMiddle({ class: ["q-table__middle scroll", e.tableClass], style: e.tableStyle }, n2);
  }
  function le(e2, t2) {
    if (c.value !== null)
      return void c.value.scrollTo(e2, t2);
    e2 = parseInt(e2, 10);
    const n2 = u.value.querySelector(`tbody tr:nth-of-type(${e2 + 1})`);
    if (n2 !== null) {
      const t3 = u.value.querySelector(".q-table__middle.scroll"), { offsetTop: a2 } = n2, l2 = a2 < t3.scrollTop ? "decrease" : "increase";
      t3.scrollTop = a2, o("virtual-scroll", { index: e2, from: 0, to: f.value.rowsPerPage - 1, direction: l2 });
    }
  }
  function ie(e2) {
    o("virtual-scroll", e2);
  }
  function re() {
    return [h(QLinearProgress, { class: "q-table__linear-progress", color: e.color, dark: l.value, indeterminate: true, trackColor: "transparent" })];
  }
  function se(n2, a2, i2) {
    const r2 = s.value(n2), u2 = O(r2);
    if (a2 !== void 0)
      return a2(ce({ key: r2, row: n2, pageIndex: i2, __trClass: u2 ? "selected" : "" }));
    const c2 = t["body-cell"], d2 = R.value.map((e2) => {
      const o2 = t[`body-cell-${e2.name}`], a3 = o2 !== void 0 ? o2 : c2;
      return a3 !== void 0 ? a3(de({ key: r2, row: n2, pageIndex: i2, col: e2 })) : h("td", { class: e2.__tdClass(n2), style: e2.__tdStyle(n2) }, me(e2, n2));
    });
    if (P.value === true) {
      const o2 = t["body-selection"], a3 = o2 !== void 0 ? o2(pe({ key: r2, row: n2, pageIndex: i2 })) : [h(QCheckbox, { modelValue: u2, color: e.color, dark: l.value, dense: e.dense, "onUpdate:modelValue": (e2, t2) => {
        z([r2], [n2], e2, t2);
      } })];
      d2.unshift(h("td", { class: "q-table--col-auto-width" }, a3));
    }
    const p3 = { key: r2, class: { selected: u2 } };
    return e.onRowClick !== void 0 && (p3.class["cursor-pointer"] = true, p3.onClick = (e2) => {
      o("RowClick", e2, n2, i2);
    }), e.onRowDblclick !== void 0 && (p3.class["cursor-pointer"] = true, p3.onDblclick = (e2) => {
      o("RowDblclick", e2, n2, i2);
    }), e.onRowContextmenu !== void 0 && (p3.class["cursor-pointer"] = true, p3.onContextmenu = (e2) => {
      o("RowContextmenu", e2, n2, i2);
    }), h("tr", p3, d2);
  }
  function ue() {
    const e2 = t.body, o2 = t["top-row"], n2 = t["bottom-row"];
    let a2 = T.value.map((t2, o3) => se(t2, e2, o3));
    return o2 !== void 0 && (a2 = o2({ cols: R.value }).concat(a2)), n2 !== void 0 && (a2 = a2.concat(n2({ cols: R.value }))), h("tbody", a2);
  }
  function ce(e2) {
    return ve(e2), e2.cols = e2.cols.map((t2) => {
      const o2 = __spreadValues({}, t2);
      return Object.defineProperty(o2, "value", { get: () => me(t2, e2.row), configurable: true, enumerable: true }), o2;
    }), e2;
  }
  function de(e2) {
    return ve(e2), Object.defineProperty(e2, "value", { get: () => me(e2.col, e2.row), configurable: true, enumerable: true }), e2;
  }
  function pe(e2) {
    return ve(e2), e2;
  }
  function ve(t2) {
    Object.assign(t2, { cols: R.value, colsMap: D.value, sort: H, rowIndex: N.value + t2.pageIndex, color: e.color, dark: l.value, dense: e.dense }), P.value === true && Object.defineProperty(t2, "selected", { get: () => O(t2.key), set: (e2, o2) => {
      z([t2.key], [t2.row], e2, o2);
    }, configurable: true, enumerable: true }), Object.defineProperty(t2, "expand", { get: () => x(t2.key), set: (e2) => {
      k(t2.key, e2);
    }, configurable: true, enumerable: true });
  }
  function me(e2, t2) {
    const o2 = typeof e2.field === "function" ? e2.field(t2) : t2[e2.field];
    return e2.format !== void 0 ? e2.format(o2, t2) : o2;
  }
  const fe = computed(() => ({ pagination: g.value, pagesNumber: W.value, isFirstPage: U.value, isLastPage: K.value, firstPage: X, prevPage: Z, nextPage: J, lastPage: ee, inFullscreen: i.value, toggleFullscreen: r }));
  function he() {
    const o2 = t.top, n2 = t["top-left"], a2 = t["top-right"], l2 = t["top-selection"], i2 = P.value === true && l2 !== void 0 && E.vaue > 0, r2 = "q-table__top relative-position row items-center";
    if (o2 !== void 0)
      return h("div", { class: r2 }, [o2(fe.value)]);
    let s2;
    return i2 === true ? s2 = l2(fe.value).slice() : (s2 = [], n2 !== void 0 ? s2.push(h("div", { class: "q-table-control" }, [n2(fe.value)])) : e.title && s2.push(h("div", { class: "q-table__control" }, [h("div", { class: ["q-table__title", e.titleClass] }, e.title)]))), a2 !== void 0 && (s2.push(h("div", { class: "q-table__separator col" })), s2.push(h("div", { class: "q-table__control" }, [a2(fe.value)]))), s2.length !== 0 ? h("div", { class: r2 }, s2) : void 0;
  }
  const ge = computed(() => Q.value === true ? null : B.value);
  function be() {
    const o2 = ye();
    return e.loading === true && t.loading === void 0 && o2.push(h("tr", { class: "q-table__progress" }, [h("th", { class: "relative-position", colspan: V.value }, re())])), h("thead", o2);
  }
  function ye() {
    const o2 = t.header, n2 = t["header-cell"];
    if (o2 !== void 0)
      return o2(Se({ header: true })).slice();
    const a2 = R.value.map((e2) => {
      const o3 = t[`header-cell-${e2.name}`], a3 = o3 !== void 0 ? o3 : n2, l2 = Se({ col: e2 });
      return a3 !== void 0 ? a3(l2) : h(QTh, { key: e2.name, props: l2 }, () => e2.label);
    });
    if ($.value === true && e.grid !== true)
      a2.unshift(h("th", { class: "q-table--col-auto-width" }, " "));
    else if (M.value === true) {
      const o3 = t["header-selection"], n3 = o3 !== void 0 ? o3(Se({})) : [h(QCheckbox, { color: e.color, modelValue: ge.value, dark: l.value, dense: e.dense, "onUpdate:modelValue": we })];
      a2.unshift(h("th", { class: "q-table--col-auto-width" }, n3));
    }
    return [h("tr", { class: e.tableHeaderClass, style: e.tableHeaderStyle }, a2)];
  }
  function Se(t2) {
    return Object.assign(t2, { cols: R.value, sort: H, colsMap: D.value, color: e.color, dark: l.value, dense: e.dense }), M.value === true && Object.defineProperty(t2, "selected", { get: () => ge.value, set: we, configurable: true, enumerable: true }), t2;
  }
  function we(e2) {
    Q.value === true && (e2 = false), z(T.value.map(s.value), T.value, e2);
  }
  const xe = computed(() => {
    const t2 = [e.iconFirstPage || a.iconSet.table.firstPage, e.iconPrevPage || a.iconSet.table.prevPage, e.iconNextPage || a.iconSet.table.nextPage, e.iconLastPage || a.iconSet.table.lastPage];
    return a.lang.rtl === true ? t2.reverse() : t2;
  });
  function Ce() {
    if (e.hideBottom === true)
      return;
    if (te.value === true) {
      if (e.hideNoData === true)
        return;
      const o3 = e.loading === true ? e.loadingLabel || a.lang.table.loading : e.filter ? e.noResultsLabel || a.lang.table.noResults : e.noDataLabel || a.lang.table.noData, n3 = t["no-data"], l2 = n3 !== void 0 ? [n3({ message: o3, icon: a.iconSet.table.warning, filter: e.filter })] : [h(QIcon$1, { class: "q-table__bottom-nodata-icon", name: a.iconSet.table.warning }), o3];
      return h("div", { class: bottomClass + " q-table__bottom--nodata" }, l2);
    }
    const o2 = t.bottom;
    if (o2 !== void 0)
      return h("div", { class: bottomClass }, [o2(fe.value)]);
    const n2 = e.hideSelectedBanner !== true && P.value === true && E.value > 0 ? [h("div", { class: "q-table__control" }, [h("div", [(e.selectedRowsLabel || a.lang.table.selectedRecords)(E.value)])])] : [];
    return e.hidePagination !== true ? h("div", { class: bottomClass + " justify-end" }, _e(n2)) : n2.length > 0 ? h("div", { class: bottomClass }, n2) : void 0;
  }
  function ke(e2) {
    S({ page: 1, rowsPerPage: e2.value });
  }
  function _e(o2) {
    let n2;
    const { rowsPerPage: i2 } = g.value, r2 = e.paginationLabel || a.lang.table.pagination, s2 = t.pagination, u2 = e.rowsPerPageOptions.length > 1;
    if (o2.push(h("div", { class: "q-table__separator col" })), u2 === true && o2.push(h("div", { class: "q-table__control" }, [h("span", { class: "q-table__bottom-item" }, [e.rowsPerPageLabel || a.lang.table.recordsPerPage]), h(QSelect, { class: "q-table__select inline q-table__bottom-item", color: e.color, modelValue: i2, options: Y.value, displayValue: i2 === 0 ? a.lang.table.allRows : i2, dark: l.value, borderless: true, dense: true, optionsDense: true, optionsCover: true, "onUpdate:modelValue": ke })])), s2 !== void 0)
      n2 = s2(fe.value);
    else if (n2 = [h("span", i2 !== 0 ? { class: "q-table__bottom-item" } : {}, [i2 ? r2(N.value + 1, Math.min(j.value, G.value), G.value) : r2(1, q.value, G.value)])], i2 !== 0 && W.value > 1) {
      const t2 = { color: e.color, round: true, dense: true, flat: true };
      e.dense === true && (t2.size = "sm"), W.value > 2 && n2.push(h(QBtn, __spreadProps(__spreadValues({ key: "pgFirst" }, t2), { icon: xe.value[0], disable: U.value, onClick: X }))), n2.push(h(QBtn, __spreadProps(__spreadValues({ key: "pgPrev" }, t2), { icon: xe.value[1], disable: U.value, onClick: Z })), h(QBtn, __spreadProps(__spreadValues({ key: "pgNext" }, t2), { icon: xe.value[2], disable: K.value, onClick: J }))), W.value > 2 && n2.push(h(QBtn, __spreadProps(__spreadValues({ key: "pgLast" }, t2), { icon: xe.value[3], disable: K.value, onClick: ee })));
    }
    return o2.push(h("div", { class: "q-table__control" }, n2)), o2;
  }
  function qe() {
    const o2 = e.gridHeader === true ? [h("table", { class: "q-table" }, [be()])] : e.loading === true && t.loading === void 0 ? re() : void 0;
    return h("div", { class: "q-table__middle" }, o2);
  }
  function Te() {
    const n2 = t.item !== void 0 ? t.item : (n3) => {
      const a2 = n3.cols.map((e2) => h("div", { class: "q-table__grid-item-row" }, [h("div", { class: "q-table__grid-item-title" }, [e2.label]), h("div", { class: "q-table__grid-item-value" }, [e2.value])]));
      if (P.value === true) {
        const o2 = t["body-selection"], i3 = o2 !== void 0 ? o2(n3) : [h(QCheckbox, { modelValue: n3.selected, color: e.color, dark: l.value, dense: e.dense, "onUpdate:modelValue": (e2, t2) => {
          z([n3.key], [n3.row], e2, t2);
        } })];
        a2.unshift(h("div", { class: "q-table__grid-item-row" }, i3), h(QSeparator, { dark: l.value }));
      }
      const i2 = { class: ["q-table__grid-item-card" + p2.value, e.cardClass], style: e.cardStyle };
      return e.onRowClick === void 0 && e.onRowDblclick === void 0 || (i2.class[0] += " cursor-pointer", e.onRowClick !== void 0 && (i2.onClick = (e2) => {
        o("RowClick", e2, n3.row, n3.pageIndex);
      }), e.onRowDblclick !== void 0 && (i2.onDblclick = (e2) => {
        o("RowDblclick", e2, n3.row, n3.pageIndex);
      })), h("div", { class: "q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3" + (n3.selected === true ? "q-table__grid-item--selected" : "") }, [h("div", i2, a2)]);
    };
    return h("div", { class: ["q-table__grid-content row", e.cardContainerClass], style: e.cardContainerStyle }, T.value.map((e2, t2) => {
      return n2(ce({ key: s.value(e2), row: e2, pageIndex: t2 }));
    }));
  }
  return Object.assign(n.proxy, { requestServerInteraction: y, setPagination: S, firstPage: X, prevPage: Z, nextPage: J, lastPage: ee, isRowSelected: O, clearSelection: L, isRowExpanded: x, setExpanded: C, sort: H, resetVirtualScroll: ne, scrollTo: le, getCellValue: me }), Object.defineProperty(n.proxy, "filteredSortedRows", { get: () => _.value, enumerable: true }), Object.defineProperty(n.proxy, "computedRows", { get: () => T.value, enumerable: true }), Object.defineProperty(n.proxy, "computedRowsNumber", { get: () => G.value, enumerable: true }), () => {
    const o2 = [he()], n2 = { ref: u, class: m.value };
    return e.grid === true ? o2.push(qe()) : Object.assign(n2, { class: [n2.class, e.cardClass], style: e.cardStyle }), o2.push(ae(), Ce()), e.loading === true && t.loading !== void 0 && o2.push(t.loading()), h("div", n2, o2);
  };
} }), QTr = defineComponent({ name: "QTr", props: { props: Object, noHover: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => "q-tr" + (e.props === void 0 || e.props.header === true ? "" : " " + e.props.__trClass) + (e.noHover === true ? " q-tr--no-hover" : ""));
  return () => h("tr", { class: o.value }, hSlot$1(t.default));
} }), QTd = defineComponent({ name: "QTd", props: { props: Object, autoWidth: Boolean, noHover: Boolean }, setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = computed(() => "q-td" + (e.autoWidth === true ? " q-table--col-auto-width" : "") + (e.noHover === true ? " q-td--no-hover" : "") + " ");
  return () => {
    if (e.props === void 0)
      return h("td", { class: n.value }, hSlot$1(t.default));
    const a = o.vnode.key, l = (e.props.colsMap !== void 0 ? e.props.colsMap[a] : null) || e.props.col;
    if (l === void 0)
      return;
    const { row: i } = e.props;
    return h("td", { class: n.value + l.__tdClass(i), style: l.__tdStyle(i) }, hSlot$1(t.default));
  };
} }), QRouteTab = defineComponent({ name: "QRouteTab", props: __spreadProps(__spreadValues(__spreadValues({}, useRouterLinkProps), useTabProps), { to: { required: true } }), emits: useTabEmits, setup(e, { slots: t, emit: o }) {
  const n = useRouterLink(), { renderTab: a, $tabs: l } = useTab(e, t, o, __spreadValues({ exact: computed(() => e.exact) }, n));
  return watch(() => e.name + e.exact + (n.linkRoute.value || {}).href, () => {
    l.verifyRouteModel();
  }), () => a(n.linkTag.value, n.linkProps.value);
} });
function getViewByModel(e, t) {
  if (e.hour !== null) {
    if (e.minute === null)
      return "minute";
    if (t === true && e.second === null)
      return "second";
  }
  return "hour";
}
function getCurrentTime() {
  const e = new Date();
  return { hour: e.getHours(), minute: e.getMinutes(), second: e.getSeconds(), millisecond: e.getMilliseconds() };
}
var QTime = defineComponent({ name: "QTime", props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useDarkProps$1), useFormProps$1), useDatetimeProps), { mask: { default: null }, format24h: { type: Boolean, default: null }, defaultDate: { type: String, validator: (e) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e) }, options: Function, hourOptions: Array, minuteOptions: Array, secondOptions: Array, withSeconds: Boolean, nowBtn: Boolean }), emits: useDatetimeEmits, setup(e, { slots: t, emit: o }) {
  const { proxy: { $q: n } } = getCurrentInstance(), a = useDark$1(e, n), { tabindex: l, headerClass: i, getLocale: r, getCurrentDate: s } = useDatetime(e, n), u = useFormAttrs(e), c = useFormInject(u);
  let d, p2;
  const v = ref(null), m = computed(() => A()), f = computed(() => r()), g = __splitDate(e.modelValue, A(), r(), e.calendar, I()), b = ref(getViewByModel(g)), y = ref(g), S = ref(g.hour === null || g.hour < 12), w = computed(() => `q-time q-time--${e.landscape === true ? "landscape" : "portrait"}` + (a.value === true ? " q-time--dark q-dark" : "") + (e.disable === true ? " disabled" : e.readonly === true ? " q-time--readonly" : "") + (e.bordered === true ? " q-time--bordered" : "") + (e.square === true ? " q-time--square no-border-radius" : "") + (e.flat === true ? " q-time--flat no-shadow" : "")), x = computed(() => {
    const e2 = y.value;
    return { hour: e2.hour === null ? "--" : k.value === true ? pad(e2.hour) : String(S.value === true ? e2.hour === 0 ? 12 : e2.hour : e2.hour > 12 ? e2.hour - 12 : e2.hour), minute: e2.minute === null ? "--" : pad(e2.minute), second: e2.second === null ? "--" : pad(e2.second) };
  }), C = computed(() => I()), k = computed(() => e.format24h !== null ? e.format24h : n.lang.date.format24h), _ = computed(() => {
    const e2 = b.value === "hour", t2 = e2 === true ? 12 : 60, o2 = y.value[b.value], n2 = Math.round(o2 * (360 / t2)) - 180;
    let a2 = `rotate(${n2}deg) translateX(-50%)`;
    return e2 === true && k.value === true && y.value.hour >= 12 && (a2 += " scale(.7)"), { transform: a2 };
  }), q = computed(() => y.value.hour !== null), T = computed(() => q.value === true && y.value.minute !== null), P = computed(() => e.hourOptions !== void 0 ? (t2) => e.hourOptions.includes(t2) : e.options !== void 0 ? (t2) => e.options(t2, null, null) : null), $ = computed(() => e.minuteOptions !== void 0 ? (t2) => e.minuteOptions.includes(t2) : e.options !== void 0 ? (t2) => e.options(y.value.hour, t2, null) : null), M = computed(() => e.secondOptions !== void 0 ? (t2) => e.secondOptions.includes(t2) : e.options !== void 0 ? (t2) => e.options(y.value.hour, y.value.minute, t2) : null), B = computed(() => {
    if (P.value === null)
      return null;
    const e2 = R(0, 11, P.value), t2 = R(12, 11, P.value);
    return { am: e2, pm: t2, values: e2.values.concat(t2.values) };
  }), Q = computed(() => $.value !== null ? R(0, 59, $.value) : null), E = computed(() => M.value !== null ? R(0, 59, M.value) : null), O = computed(() => {
    switch (b.value) {
      case "hour":
        return B.value;
      case "minute":
        return Q.value;
      case "second":
        return E.value;
    }
  }), L = computed(() => {
    let e2, t2, o2 = 0, n2 = 1;
    const a2 = O.value !== null ? O.value.values : void 0;
    b.value === "hour" ? k.value === true ? (e2 = 0, t2 = 23) : (e2 = 0, t2 = 11, S.value === false && (o2 = 12)) : (e2 = 0, t2 = 55, n2 = 5);
    const l2 = [];
    for (let i2 = e2, r2 = e2; i2 <= t2; i2 += n2, r2++) {
      const e3 = i2 + o2, t3 = a2 !== void 0 && a2.includes(e3) === false, n3 = b.value === "hour" && i2 === 0 ? k.value === true ? "00" : "12" : i2;
      l2.push({ val: e3, index: r2, disable: t3, label: n3 });
    }
    return l2;
  }), z = computed(() => {
    return [[TouchPan, j, void 0, { stop: true, prevent: true, mouse: true }]];
  });
  function F() {
    const e2 = __spreadValues(__spreadValues({}, s()), getCurrentTime());
    ue(e2), Object.assign(y.value, e2), b.value = "hour";
  }
  function R(e2, t2, o2) {
    const n2 = Array.apply(null, { length: t2 + 1 }).map((t3, n3) => {
      const a2 = n3 + e2;
      return { index: a2, val: o2(a2) === true };
    }).filter((e3) => e3.val === true).map((e3) => e3.index);
    return { min: n2[0], max: n2[n2.length - 1], values: n2, threshold: t2 + 1 };
  }
  function D(e2, t2, o2) {
    const n2 = Math.abs(e2 - t2);
    return Math.min(n2, o2 - n2);
  }
  function V(e2, { min: t2, max: o2, values: n2, threshold: a2 }) {
    if (e2 === t2)
      return t2;
    if (e2 < t2 || e2 > o2)
      return D(e2, t2, a2) <= D(e2, o2, a2) ? t2 : o2;
    const l2 = n2.findIndex((t3) => e2 <= t3), i2 = n2[l2 - 1], r2 = n2[l2];
    return e2 - i2 <= r2 - e2 ? i2 : r2;
  }
  function A() {
    return e.calendar !== "persian" && e.mask !== null ? e.mask : `HH:mm${e.withSeconds === true ? ":ss" : ""}`;
  }
  function I() {
    if (typeof e.defaultDate !== "string") {
      const e2 = s(true);
      return e2.dateHash = getDayHash(e2), e2;
    }
    return __splitDate(e.defaultDate, "YYYY/MM/DD", void 0, e.calendar);
  }
  function H() {
    return ce.isDeactivated === true || ce.isUnmounted === true || O.value !== null && (O.value.values.length === 0 || b.value === "hour" && k.value !== true && B.value[S.value === true ? "am" : "pm"].values.length === 0);
  }
  function N() {
    const e2 = v.value, { top: t2, left: o2, width: n2 } = e2.getBoundingClientRect(), a2 = n2 / 2;
    return { top: t2 + a2, left: o2 + a2, dist: 0.7 * a2 };
  }
  function j(e2) {
    if (H() !== true) {
      if (e2.isFirst === true)
        return d = N(), void (p2 = K(e2.evt, d));
      p2 = K(e2.evt, d, p2), e2.isFinal === true && (d = false, p2 = null, U());
    }
  }
  function U() {
    b.value === "hour" ? b.value = "minute" : e.withSeconds && b.value === "minute" && (b.value = "second");
  }
  function K(e2, t2, o2) {
    const n2 = position(e2), a2 = Math.abs(n2.top - t2.top), l2 = Math.sqrt(Math.pow(Math.abs(n2.top - t2.top), 2) + Math.pow(Math.abs(n2.left - t2.left), 2));
    let i2, r2 = Math.asin(a2 / l2) * (180 / Math.PI);
    if (r2 = n2.top < t2.top ? t2.left < n2.left ? 90 - r2 : 270 + r2 : t2.left < n2.left ? r2 + 90 : 270 - r2, b.value === "hour") {
      if (i2 = r2 / 30, B.value !== null) {
        const e3 = k.value !== true ? S.value === true : B.value.am.values.length > 0 && B.value.pm.values.length > 0 ? l2 >= t2.dist : B.value.am.values.length > 0;
        i2 = V(i2 + (e3 === true ? 0 : 12), B.value[e3 === true ? "am" : "pm"]);
      } else
        i2 = Math.round(i2), k.value === true ? l2 < t2.dist ? i2 < 12 && (i2 += 12) : i2 === 12 && (i2 = 0) : S.value === true && i2 === 12 ? i2 = 0 : S.value === false && i2 !== 12 && (i2 += 12);
      k.value === true && (S.value = i2 < 12);
    } else
      i2 = Math.round(r2 / 6) % 60, b.value === "minute" && Q.value !== null ? i2 = V(i2, Q.value) : b.value === "second" && E.value !== null && (i2 = V(i2, E.value));
    return o2 !== i2 && le[b.value](i2), i2;
  }
  watch(() => e.modelValue, (t2) => {
    const o2 = __splitDate(t2, m.value, f.value, e.calendar, C.value);
    o2.dateHash === y.value.dateHash && o2.timeHash === y.value.timeHash || (y.value = o2, o2.hour === null ? b.value = "hour" : S.value = o2.hour < 12);
  }), watch([m, f], () => {
    nextTick(() => {
      ue();
    });
  });
  const W = { hour() {
    b.value = "hour";
  }, minute() {
    b.value = "minute";
  }, second() {
    b.value = "second";
  } };
  function Y(e2) {
    e2.keyCode === 13 && ie();
  }
  function G(e2) {
    e2.keyCode === 13 && re();
  }
  function X(e2) {
    H() !== true && (n.platform.is.desktop !== true && K(e2, N()), U());
  }
  function Z(e2) {
    H() !== true && K(e2, N());
  }
  function J(e2) {
    if (e2.keyCode === 13)
      b.value = "hour";
    else if ([37, 39].includes(e2.keyCode)) {
      const t2 = e2.keyCode === 37 ? -1 : 1;
      if (B.value !== null) {
        const e3 = k.value === true ? B.value.values : B.value[S.value === true ? "am" : "pm"].values;
        if (e3.length === 0)
          return;
        if (y.value.hour === null)
          oe(e3[0]);
        else {
          const o2 = (e3.length + e3.indexOf(y.value.hour) + t2) % e3.length;
          oe(e3[o2]);
        }
      } else {
        const e3 = k.value === true ? 24 : 12, o2 = k.value !== true && S.value === false ? 12 : 0, n2 = y.value.hour === null ? -t2 : y.value.hour;
        oe(o2 + (24 + n2 + t2) % e3);
      }
    }
  }
  function ee(e2) {
    if (e2.keyCode === 13)
      b.value = "minute";
    else if ([37, 39].includes(e2.keyCode)) {
      const t2 = e2.keyCode === 37 ? -1 : 1;
      if (Q.value !== null) {
        const e3 = Q.value.values;
        if (e3.length === 0)
          return;
        if (y.value.minute === null)
          ne(e3[0]);
        else {
          const o2 = (e3.length + e3.indexOf(y.value.minute) + t2) % e3.length;
          ne(e3[o2]);
        }
      } else {
        const e3 = y.value.minute === null ? -t2 : y.value.minute;
        ne((60 + e3 + t2) % 60);
      }
    }
  }
  function te(e2) {
    if (e2.keyCode === 13)
      b.value = "second";
    else if ([37, 39].includes(e2.keyCode)) {
      const t2 = e2.keyCode === 37 ? -1 : 1;
      if (E.value !== null) {
        const e3 = E.value.values;
        if (e3.length === 0)
          return;
        if (y.value.seconds === null)
          ae(e3[0]);
        else {
          const o2 = (e3.length + e3.indexOf(y.value.second) + t2) % e3.length;
          ae(e3[o2]);
        }
      } else {
        const e3 = y.value.second === null ? -t2 : y.value.second;
        ae((60 + e3 + t2) % 60);
      }
    }
  }
  function oe(e2) {
    y.value.hour !== e2 && (y.value.hour = e2, y.value.minute = null, y.value.second = null);
  }
  function ne(t2) {
    y.value.minute !== t2 && (y.value.minute = t2, y.value.second = null, e.withSeconds !== true && ue({ minute: t2 }));
  }
  function ae(e2) {
    y.value.second !== e2 && ue({ second: e2 });
  }
  const le = { hour: oe, minute: ne, second: ae };
  function ie() {
    S.value === false && (S.value = true, y.value.hour !== null && (y.value.hour -= 12, se()));
  }
  function re() {
    S.value === true && (S.value = false, y.value.hour !== null && (y.value.hour += 12, se()));
  }
  function se() {
    return P.value !== null && P.value(y.value.hour) !== true ? (y.value = __splitDate(), void (b.value = "hour")) : $.value !== null && $.value(y.value.minute) !== true ? (y.value.minute = null, y.value.second = null, void (b.value = "minute")) : e.withSeconds === true && M.value !== null && M.value(y.value.second) !== true ? (y.value.second = null, void (b.value = "second")) : void (y.value.hour === null || y.value.minute === null || e.withSeconds === true && y.value.second === null || ue());
  }
  function ue(t2) {
    const n2 = Object.assign(__spreadValues({}, y.value), t2), a2 = e.calendar === "persian" ? pad(n2.hour) + ":" + pad(n2.minute) + (e.withSeconds === true ? ":" + pad(n2.second) : "") : formatDate(new Date(n2.year, n2.month === null ? null : n2.month - 1, n2.day, n2.hour, n2.minute, n2.second, n2.millisecond), m.value, f.value, n2.year, n2.timezoneOffset);
    n2.changed = a2 !== e.modelValue, o("update:modelValue", a2, n2);
  }
  const ce = getCurrentInstance();
  function de() {
    const t2 = [h("div", { class: "q-time__link " + (b.value === "hour" ? "q-time__link--active" : "cursor-pointer"), tabindex: l.value, onClick: W.hour, onKeyup: J }, x.value.hour), h("div", ":"), h("div", q.value === true ? { class: "q-time__link " + (b.value === "minute" ? "q-time__link--active" : "cursor-pointer"), tabindex: l.value, onKeyup: ee, onClick: W.minute } : { class: "q-time__link" }, x.value.minute)];
    e.withSeconds === true && t2.push(h("div", ":"), h("div", T.value === true ? { class: "q-time__link " + (b.value === "second" ? "q-time__link--active" : "cursor-pointer"), tabindex: l.value, onKeyup: te, onClick: W.second } : { class: "q-time__link" }, x.value.second));
    const o2 = [h("div", { class: "q-time__header-label row items-center no-wrap", dir: "ltr" }, t2)];
    return k.value === false && o2.push(h("div", { class: "q-time__header-ampm column items-between no-wrap" }, [h("div", { class: "q-time__link " + (S.value === true ? "q-time__link--active" : "cursor-pointer"), tabindex: l.value, onClick: ie, onKeyup: Y }, "AM"), h("div", { class: "q-time__link " + (S.value !== true ? "q-time__link--active" : "cursor-pointer"), tabindex: l.value, onClick: re, onKeyup: G }, "PM")])), h("div", { class: "q-time__header flex flex-center no-wrap " + i.value }, o2);
  }
  function pe() {
    const t2 = y.value[b.value];
    return h("div", { class: "q-time__content col relative-position" }, [h(Transition, { name: "q-transition--scale" }, () => h("div", { key: "clock" + b.value, class: "q-time__container-parent absolute-full" }, [h("div", { ref: v, class: "q-time__container-child fit overflow-hidden" }, [withDirectives(h("div", { class: "q-time__clock cursor-pointer non-selectable", onClick: X, onMousedown: Z }, [h("div", { class: "q-time__clock-circle fit" }, [h("div", { class: "q-time__clock-pointer" + (y.value[b.value] === null ? " hidden" : e.color !== void 0 ? ` text-${e.color}` : ""), style: _.value }), L.value.map((e2) => h("div", { class: `q-time__clock-position row flex-center q-time__clock-pos-${e2.index}` + (e2.val === t2 ? " q-time__clock-position--active " + i.value : e2.disable === true ? " q-time__clock-position--disable" : "") }, [h("span", e2.label)]))])]), z.value)])])), e.nowBtn === true ? h(QBtn, { class: "q-time__now-button absolute", icon: n.iconSet.datetime.now, unelevated: true, size: "sm", round: true, color: e.color, textColor: e.textColor, tabindex: l.value, onClick: F }) : null]);
  }
  return Object.assign(ce.proxy, { setNow: F }), () => {
    const o2 = [pe()], n2 = hSlot$1(t.default);
    return n2 !== void 0 && o2.push(h("div", { class: "q-time__actions" }, n2)), e.name !== void 0 && e.disable !== true && c(o2, "push"), h("div", { class: w.value, tabindex: -1 }, [de(), h("div", { class: "q-time__main col overflow-auto" }, o2)]);
  };
} }), QTimeline = defineComponent({ name: "QTimeline", props: __spreadProps(__spreadValues({}, useDarkProps$1), { color: { type: String, default: "primary" }, side: { type: String, default: "right", validator: (e) => ["left", "right"].includes(e) }, layout: { type: String, default: "dense", validator: (e) => ["dense", "comfortable", "loose"].includes(e) } }), setup(e, { slots: t }) {
  const o = getCurrentInstance(), n = useDark$1(e, o.proxy.$q);
  provide(timelineKey, e);
  const a = computed(() => `q-timeline q-timeline--${e.layout} q-timeline--${e.layout}--${e.side}` + (n.value === true ? " q-timeline--dark" : ""));
  return () => h("ul", { class: a.value }, hSlot$1(t.default));
} }), QTimelineEntry = defineComponent({ name: "QTimelineEntry", props: { heading: Boolean, tag: { type: String, default: "h3" }, side: { type: String, default: "right", validator: (e) => ["left", "right"].includes(e) }, icon: String, avatar: String, color: String, title: String, subtitle: String, body: String }, setup(e, { slots: t }) {
  const o = inject(timelineKey, () => {
    console.error("QTimelineEntry needs to be child of QTimeline");
  }), n = computed(() => `q-timeline__entry q-timeline__entry--${e.side}` + (e.icon !== void 0 || e.avatar !== void 0 ? " q-timeline__entry--icon" : "")), a = computed(() => `q-timeline__dot text-${e.color || o.color}`), l = computed(() => o.layout === "comfortable" && o.side === "left");
  return () => {
    const o2 = hUniqueSlot(t.default, []);
    if (e.body !== void 0 && o2.unshift(e.body), e.heading === true) {
      const t2 = [h("div"), h("div"), h(e.tag, { class: "q-timeline__heading-title" }, o2)];
      return h("div", { class: "q-timeline__heading" }, l.value === true ? t2.reverse() : t2);
    }
    let i;
    e.icon !== void 0 ? i = [h(QIcon$1, { class: "row items-center justify-center", name: e.icon })] : e.avatar !== void 0 && (i = [h("img", { class: "q-timeline__dot-img", src: e.avatar })]);
    const r = [h("div", { class: "q-timeline__subtitle" }, [h("span", {}, hSlot$1(t.subtitle, [e.subtitle]))]), h("div", { class: a.value }, i), h("div", { class: "q-timeline__content" }, [h("h6", { class: "q-timeline__title" }, hSlot$1(t.title, [e.title]))].concat(o2))];
    return h("li", { class: n.value }, l.value === true ? r.reverse() : r);
  };
} }), QToolbar = defineComponent({ name: "QToolbar", props: { inset: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => "q-toolbar row no-wrap items-center" + (e.inset === true ? " q-toolbar--inset" : ""));
  return () => h("div", { class: o.value }, hSlot$1(t.default));
} }), QToolbarTitle = defineComponent({ name: "QToolbarTitle", props: { shrink: Boolean }, setup(e, { slots: t }) {
  const o = computed(() => "q-toolbar__title ellipsis" + (e.shrink === true ? " col-shrink" : ""));
  return () => h("div", { class: o.value }, hSlot$1(t.default));
} }), QTree = defineComponent({ name: "QTree", props: __spreadProps(__spreadValues({}, useDarkProps$1), { nodes: { type: Array, required: true }, nodeKey: { type: String, required: true }, labelKey: { type: String, default: "label" }, childrenKey: { type: String, default: "children" }, color: String, controlColor: String, textColor: String, selectedColor: String, icon: String, tickStrategy: { type: String, default: "none", validator: (e) => ["none", "strict", "leaf", "leaf-filtered"].includes(e) }, ticked: Array, expanded: Array, selected: {}, defaultExpandAll: Boolean, accordion: Boolean, filter: String, filterMethod: Function, duration: Number, noConnectors: Boolean, noNodesLabel: String, noResultsLabel: String }), emits: ["update:expanded", "update:ticked", "update:selected", "lazy-load", "after-show", "after-hide"], setup(e, { slots: t, emit: o }) {
  const { proxy: n } = getCurrentInstance(), { $q: a } = n, l = useDark$1(e, a), i = ref({}), r = ref(e.ticked || []), s = ref(e.expanded || []);
  let u = {};
  onBeforeUpdate(() => {
    u = {};
  });
  const c = computed(() => "q-tree" + (e.noConnectors === true ? " q-tree--no-connectors" : "") + (l.value === true ? " q-tree--dark" : "") + (e.color !== void 0 ? ` text-${e.color}` : "")), d = computed(() => e.selected !== void 0), p2 = computed(() => e.icon || a.iconSet.tree.icon), v = computed(() => e.controlColor || e.color), m = computed(() => e.textColor !== void 0 ? ` text-${e.textColor}` : ""), f = computed(() => {
    const t2 = e.selectedColor || e.color;
    return t2 ? ` text-${t2}` : "";
  }), g = computed(() => e.filterMethod !== void 0 ? e.filterMethod : (t2, o2) => {
    const n2 = o2.toLowerCase();
    return t2[e.labelKey] && t2[e.labelKey].toLowerCase().indexOf(n2) > -1;
  }), b = computed(() => {
    const t2 = {}, o2 = (n2, a2) => {
      const l2 = n2.tickStrategy || (a2 ? a2.tickStrategy : e.tickStrategy), u2 = n2[e.nodeKey], c2 = n2[e.childrenKey] && n2[e.childrenKey].length > 0, p3 = c2 !== true, v2 = n2.disabled !== true && d.value === true && n2.selectable !== false, m2 = n2.disabled !== true && n2.expandable !== false, f2 = l2 !== "none", h2 = l2 === "strict", b2 = l2 === "leaf-filtered", y2 = l2 === "leaf" || l2 === "leaf-filtered";
      let S2 = n2.disabled !== true && n2.tickable !== false;
      y2 === true && S2 === true && a2 && a2.tickable !== true && (S2 = false);
      let w2 = n2.lazy;
      w2 === true && i.value[u2] !== void 0 && Array.isArray(n2[e.childrenKey]) === true && (w2 = i.value[u2]);
      const x2 = { key: u2, parent: a2, isParent: c2, isLeaf: p3, lazy: w2, disabled: n2.disabled, link: n2.disabled !== true && (v2 === true || m2 === true && (c2 === true || w2 === true)), children: [], matchesFilter: !e.filter || g.value(n2, e.filter), selected: u2 === e.selected && v2 === true, selectable: v2, expanded: c2 === true && s.value.includes(u2), expandable: m2, noTick: n2.noTick === true || h2 !== true && w2 && w2 !== "loaded", tickable: S2, tickStrategy: l2, hasTicking: f2, strictTicking: h2, leafFilteredTicking: b2, leafTicking: y2, ticked: h2 === true ? r.value.includes(u2) : p3 === true && r.value.includes(u2) };
      if (t2[u2] = x2, c2 === true && (x2.children = n2[e.childrenKey].map((e2) => o2(e2, x2)), e.filter && (x2.matchesFilter !== true ? x2.matchesFilter = x2.children.some((e2) => e2.matchesFilter) : x2.noTick !== true && x2.disabled !== true && x2.tickable === true && b2 === true && x2.children.every((e2) => e2.matchesFilter !== true || e2.noTick === true || e2.tickable !== true) === true && (x2.tickable = false)), x2.matchesFilter === true && (x2.noTick !== true && h2 !== true && x2.children.every((e2) => e2.noTick) === true && (x2.noTick = true), y2))) {
        if (x2.ticked = false, x2.indeterminate = x2.children.some((e2) => e2.indeterminate === true), x2.tickable = x2.tickable === true && x2.children.some((e2) => e2.tickable), x2.indeterminate !== true) {
          const e2 = x2.children.reduce((e3, t3) => t3.ticked === true ? e3 + 1 : e3, 0);
          e2 === x2.children.length ? x2.ticked = true : e2 > 0 && (x2.indeterminate = true);
        }
        x2.indeterminate === true && (x2.indeterminateNextState = x2.children.every((e2) => e2.tickable !== true || e2.ticked !== true));
      }
      return x2;
    };
    return e.nodes.forEach((e2) => o2(e2, null)), t2;
  });
  function y(t2) {
    const o2 = [].reduce, n2 = (a2, l2) => {
      return a2 || !l2 ? a2 : Array.isArray(l2) === true ? o2.call(Object(l2), n2, a2) : l2[e.nodeKey] === t2 ? l2 : l2[e.childrenKey] ? n2(null, l2[e.childrenKey]) : void 0;
    };
    return n2(null, e.nodes);
  }
  function S() {
    return r.value.map((e2) => y(e2));
  }
  function w() {
    return s.value.map((e2) => y(e2));
  }
  function x(e2) {
    return !(!e2 || !b.value[e2]) && b.value[e2].expanded;
  }
  function C() {
    e.expanded !== void 0 ? o("update:expanded", []) : s.value = [];
  }
  function k() {
    const t2 = s.value, n2 = (o2) => {
      o2[e.childrenKey] && o2[e.childrenKey].length > 0 && o2.expandable !== false && o2.disabled !== true && (t2.push(o2[e.nodeKey]), o2[e.childrenKey].forEach(n2));
    };
    e.nodes.forEach(n2), e.expanded !== void 0 ? o("update:expanded", t2) : s.value = t2;
  }
  function _(t2, n2, a2 = y(t2), l2 = b.value[t2]) {
    if (l2.lazy && l2.lazy !== "loaded") {
      if (l2.lazy === "loading")
        return;
      i.value[t2] = "loading", Array.isArray(a2[e.childrenKey]) !== true && (a2[e.childrenKey] = []), o("lazy-load", { node: a2, key: t2, done: (o2) => {
        i.value[t2] = "loaded", a2[e.childrenKey] = Array.isArray(o2) === true ? o2 : [], nextTick(() => {
          const e2 = b.value[t2];
          e2 && e2.isParent === true && q(t2, true);
        });
      }, fail: () => {
        delete i.value[t2], a2[e.childrenKey].length === 0 && delete a2[e.childrenKey];
      } });
    } else
      l2.isParent === true && l2.expandable === true && q(t2, n2);
  }
  function q(t2, n2) {
    let a2 = s.value;
    const l2 = e.expanded !== void 0;
    if (l2 === true && (a2 = a2.slice()), n2) {
      if (e.accordion && b.value[t2]) {
        const o2 = [];
        b.value[t2].parent ? b.value[t2].parent.children.forEach((e2) => {
          e2.key !== t2 && e2.expandable === true && o2.push(e2.key);
        }) : e.nodes.forEach((n3) => {
          const a3 = n3[e.nodeKey];
          a3 !== t2 && o2.push(a3);
        }), o2.length > 0 && (a2 = a2.filter((e2) => o2.includes(e2) === false));
      }
      a2 = a2.concat([t2]).filter((e2, t3, o2) => o2.indexOf(e2) === t3);
    } else
      a2 = a2.filter((e2) => e2 !== t2);
    l2 === true ? o("update:expanded", a2) : s.value = a2;
  }
  function T(e2) {
    return !(!e2 || !b.value[e2]) && b.value[e2].ticked;
  }
  function P(t2, n2) {
    let a2 = r.value;
    const l2 = e.ticked !== void 0;
    l2 === true && (a2 = a2.slice()), a2 = n2 ? a2.concat(t2).filter((e2, t3, o2) => o2.indexOf(e2) === t3) : a2.filter((e2) => t2.includes(e2) === false), l2 === true && o("update:ticked", a2);
  }
  function $(t2, o2, a2) {
    const i2 = { tree: n, node: t2, key: a2, color: e.color, dark: l.value };
    return Object.defineProperty(i2, "expanded", { get: () => {
      return o2.expanded;
    }, set: (e2) => {
      e2 !== o2.expanded && _(a2, e2);
    }, configurable: true, enumerable: true }), Object.defineProperty(i2, "ticked", { get: () => {
      return o2.ticked;
    }, set: (e2) => {
      e2 !== o2.ticked && P([a2], e2);
    }, configurable: true, enumerable: true }), i2;
  }
  function M(t2) {
    return (e.filter ? t2.filter((t3) => b.value[t3[e.nodeKey]].matchesFilter) : t2).map((e2) => O(e2));
  }
  function B(e2) {
    if (e2.icon !== void 0)
      return h(QIcon$1, { class: "q-tree__icon q-mr-sm", name: e2.icon, color: e2.iconColor });
    const t2 = e2.img || e2.avatar;
    return t2 ? h("img", { class: `q-tree__${e2.img ? "img" : "avatar"} q-mr-sm`, src: t2 }) : void 0;
  }
  function Q() {
    o("after-show");
  }
  function E() {
    o("after-hide");
  }
  function O(o2) {
    const n2 = o2[e.nodeKey], a2 = b.value[n2], i2 = o2.header && t[`header-${o2.header}`] || t["default-header"], r2 = a2.isParent === true ? M(o2[e.childrenKey]) : [], s2 = r2.length > 0 || a2.lazy && a2.lazy !== "loaded";
    let c2 = o2.body && t[`body-${o2.body}`] || t["default-body"];
    const d2 = i2 !== void 0 || c2 !== void 0 ? $(o2, a2, n2) : null;
    return c2 !== void 0 && (c2 = h("div", { class: "q-tree__node-body relative-position" }, [h("div", { class: m.value }, [c2(d2)])])), h("div", { key: n2, class: `q-tree__node relative-position q-tree__node--${s2 === true ? "parent" : "child"}` }, [h("div", { class: "q-tree__node-header relative-position row no-wrap items-center" + (a2.link === true ? " q-tree__node--link q-hoverable q-focusable" : "") + (a2.selected === true ? " q-tree__node--selected" : "") + (a2.disabled === true ? " q-tree__node--disabled" : ""), tabindex: a2.link === true ? 0 : -1, onClick: (e2) => {
      z(o2, a2, e2);
    }, onKeypress(e2) {
      shouldIgnoreKey$1(e2) !== true && (e2.keyCode === 13 ? z(o2, a2, e2, true) : e2.keyCode === 32 && F(o2, a2, e2, true));
    } }, [h("div", { class: "q-focus-helper", tabindex: -1, ref: (e2) => {
      u[a2.key] = e2;
    } }), a2.lazy === "loading" ? h(QSpinner$1, { class: "q-tree__spinner q-mr-xs", color: v.value }) : s2 === true ? h(QIcon$1, { class: "q-tree__arrow q-mr-xs" + (a2.expanded === true ? " q-tree__arrow--rotate" : ""), name: p2.value, onClick(e2) {
      F(o2, a2, e2);
    } }) : null, a2.hasTicking === true && a2.noTick !== true ? h(QCheckbox, { class: "q-mr-xs", modelValue: a2.indeterminate === true ? null : a2.ticked, color: v.value, dark: l.value, dense: true, keepColor: true, disable: a2.tickable !== true, onKeydown: stopAndPrevent$1, "onUpdate:modelValue": (e2) => {
      R(a2, e2);
    } }) : null, h("div", { class: "q-tree__node-header-content col row no-wrap items-center" + (a2.selected === true ? f.value : m.value) }, [i2 ? i2(d2) : [B(o2), h("div", o2[e.labelKey])]])]), s2 === true ? h(QSlideTransition, { duration: e.duration, onShow: Q, onHide: E }, () => withDirectives(h("div", { class: "q-tree__node-collapsible" + m.value, key: `${n2}__q` }, [c2, h("div", { class: "q-tree__children" + (a2.disabled === true ? " q-tree__node--disabled" : "") }, r2)]), [[vShow, a2.expanded]])) : c2]);
  }
  function L(e2) {
    const t2 = u[e2];
    t2 && t2.focus();
  }
  function z(t2, n2, a2, l2) {
    l2 !== true && L(n2.key), d.value ? n2.selectable && o("update:selected", n2.key !== e.selected ? n2.key : null) : F(t2, n2, a2, l2), typeof t2.handler === "function" && t2.handler(t2);
  }
  function F(e2, t2, o2, n2) {
    o2 !== void 0 && stopAndPrevent$1(o2), n2 !== true && L(t2.key), _(t2.key, !t2.expanded, e2, t2);
  }
  function R(e2, t2) {
    if (e2.indeterminate === true && (t2 = e2.indeterminateNextState), e2.strictTicking)
      P([e2.key], t2);
    else if (e2.leafTicking) {
      const o2 = [], n2 = (e3) => {
        e3.isParent ? (t2 !== true && e3.noTick !== true && e3.tickable === true && o2.push(e3.key), e3.leafTicking === true && e3.children.forEach(n2)) : e3.noTick === true || e3.tickable !== true || e3.leafFilteredTicking === true && e3.matchesFilter !== true || o2.push(e3.key);
      };
      n2(e2), P(o2, t2);
    }
  }
  return watch(() => e.ticked, (e2) => {
    r.value = e2;
  }), watch(() => e.expanded, (e2) => {
    s.value = e2;
  }), Object.assign(n, { getNodeByKey: y, getTickedNodes: S, getExpandedNodes: w, isExpanded: x, collapseAll: C, expandAll: k, setExpanded: _, isTicked: T, setTicked: P }), e.defaultExpandAll === true && k(), () => {
    const t2 = M(e.nodes);
    return h("div", { class: c.value }, t2.length === 0 ? e.filter ? e.noResultsLabel || a.lang.tree.noResults : e.noNodesLabel || a.lang.tree.noNodes : t2);
  };
} });
function getProgressLabel(e) {
  return (100 * e).toFixed(2) + "%";
}
const coreProps = __spreadProps(__spreadValues(__spreadValues({}, useDarkProps$1), useFileProps), { label: String, color: String, textColor: String, square: Boolean, flat: Boolean, bordered: Boolean, noThumbnails: Boolean, autoUpload: Boolean, hideUploadBtn: Boolean, disable: Boolean, readonly: Boolean }), coreEmits = [...useFileEmits, "start", "finish", "added", "removed"];
function getRenderer(e) {
  const t = getCurrentInstance(), { props: o, slots: n, emit: a, proxy: l } = t, { $q: i } = l, r = useDark$1(o, i);
  function s(e2, t2, o2) {
    if (e2.__status = t2, t2 === "idle")
      return e2.__uploaded = 0, e2.__progress = 0, e2.__sizeLabel = humanStorageSize(e2.size), void (e2.__progressLabel = "0.00%");
    t2 !== "failed" ? (e2.__uploaded = t2 === "uploaded" ? e2.size : o2, e2.__progress = t2 === "uploaded" ? 1 : Math.min(0.9999, e2.__uploaded / e2.size), e2.__progressLabel = getProgressLabel(e2.__progress), l.$forceUpdate()) : l.$forceUpdate();
  }
  const u = { files: ref([]), queuedFiles: ref([]), uploadedFiles: ref([]), uploadedSize: ref(0), updateFileStatus: s, isAlive() {
    return t.isDeactivated !== true && t.isUnmounted !== true;
  } };
  Object.assign(u, e({ props: o, slots: n, emit: a, helpers: u }));
  const c = ref(0), d = computed(() => o.disable !== true && o.readonly !== true);
  u.isBusy === void 0 && (u.isBusy = ref(false));
  const p2 = ref(false), v = ref(null), m = ref(null);
  provide(uploaderKey, V);
  const { pickFiles: f, addFiles: g, onDragover: b, processFiles: y, getDndNode: S, maxFilesNumber: w, maxTotalSizeNumber: x } = useFile({ editable: d, dnd: p2, getFileInput: z, addFilesToQueue: F }), C = computed(() => d.value === true && u.isUploading.value !== true && (o.multiple === true || u.queuedFiles.value.length === 0) && (o.maxFiles === void 0 || u.files.value.length < w.value) && (o.maxTotalSize === void 0 || c.value < x.value)), k = computed(() => d.value === true && u.isBusy.value !== true && u.isUploading.value !== true && u.queuedFiles.value.length > 0), _ = computed(() => c.value === 0 ? 0 : u.uploadedSize.value / c.value), q = computed(() => getProgressLabel(_.value)), T = computed(() => humanStorageSize(c.value)), P = computed(() => "q-uploader column no-wrap" + (r.value === true ? " q-uploader--dark q-dark" : "") + (o.bordered === true ? " q-uploader--bordered" : "") + (o.square === true ? " q-uploader--square no-border-radius" : "") + (o.flat === true ? " q-uploader--flat no-shadow" : "") + (o.disable === true ? " disabled q-uploader--disable" : "")), $ = computed(() => "q-uploader__header" + (o.color !== void 0 ? ` bg-${o.color}` : "") + (o.textColor !== void 0 ? ` text-${o.textColor}` : ""));
  function M() {
    o.disable === false && (u.abort(), u.uploadedSize.value = 0, c.value = 0, L(), u.files.value = [], u.queuedFiles.value = [], u.uploadedFiles.value = []);
  }
  function B() {
    o.disable === false && E(["uploaded"], () => {
      u.uploadedFiles.value = [];
    });
  }
  function Q() {
    E(["idle", "failed"], ({ size: e2 }) => {
      c.value -= e2, u.queuedFiles.value = [];
    });
  }
  function E(e2, t2) {
    if (o.disable === true)
      return;
    const n2 = { files: [], size: 0 }, l2 = u.files.value.filter((t3) => {
      return e2.indexOf(t3.__status) === -1 || (n2.size += t3.size, n2.files.push(t3), t3._img !== void 0 && window.URL.revokeObjectURL(t3._img.src), false);
    });
    n2.files.length > 0 && (u.files.value = l2, t2(n2), a("removed", n2.files));
  }
  function O(e2) {
    o.disable || (e2.__status === "uploaded" ? u.uploadedFiles.value = u.uploadedFiles.value.filter((t2) => t2.name !== e2.name) : e2.__status === "uploading" ? e2.__abort() : c.value -= e2.size, u.files.value = u.files.value.filter((t2) => {
      return t2.name !== e2.name || (t2._img !== void 0 && window.URL.revokeObjectURL(t2._img.src), false);
    }), u.queuedFiles.value = u.queuedFiles.value.filter((t2) => t2.name !== e2.name), a("removed", [e2]));
  }
  function L() {
    u.files.value.forEach((e2) => {
      e2._img !== void 0 && window.URL.revokeObjectURL(e2._img.src);
    });
  }
  function z() {
    return m.value || v.value.getElementsByClassName("q-uploader__input")[0];
  }
  function F(e2, t2) {
    const n2 = y(e2, t2, u.files.value, true);
    if (n2 === void 0)
      return;
    const l2 = n2.filter((e3) => u.files.value.findIndex((t3) => e3.name === t3.name) === -1), i2 = z();
    i2 !== void 0 && i2 !== null && (i2.value = ""), l2 !== void 0 && (l2.forEach((e3) => {
      if (u.updateFileStatus(e3, "idle"), c.value += e3.size, o.noThumbnails !== true && e3.type.toUpperCase().startsWith("IMAGE")) {
        const t3 = new Image();
        t3.src = window.URL.createObjectURL(e3), e3.__img = t3;
      }
    }), u.files.value = u.files.value.concat(l2), u.queuedFiles.value = u.queuedFiles.value.concat(l2), a("added", l2), o.autoUpload === true && u.upload());
  }
  function R() {
    k.value === true && u.upload();
  }
  function D(e2, t2, o2) {
    if (e2 === true) {
      const e3 = { type: "a", key: t2, icon: i.iconSet.uploader[t2], flat: true, dense: true };
      let n2 = void 0;
      return t2 === "add" ? n2 = V : e3.onClick = o2, h(QBtn, e3, n2);
    }
  }
  function V() {
    return h("input", { ref: m, class: "q-uploader__input overflow-hidden absolute-full", tabindex: -1, type: "file", title: "", accept: o.accept, multiple: o.multiple === true ? "multiple" : void 0, capture: o.capture, onMousedown: stop$1, onChange: F });
  }
  function A() {
    return n.header !== void 0 ? n.header(N.value) : [h("div", { class: "q-uploader__header-content flex flex-center no-wrap q-gutter-xs" }, [D(u.queuedFiles.value.length > 0, "removeQueue", Q), D(u.uploadedFiles.value.length > 0, "removeUploaded", B), u.isUploading.value === true ? h(QSpinner$1, { class: "q-uploader__spinner" }) : null, h("div", { class: "col column justify-center" }, [o.label !== void 0 ? h("div", { class: "q-uploader__title" }, [o.label]) : null, h("div", { class: "q-uploader__subtitle" }, [T.value + " / " + q.value])]), D(C.value, "add"), D(o.hideUploadBtn === false && k.value === true, "upload", u.upload), D(u.isUploading.value, "clear", u.abort)])];
  }
  function I() {
    return n.list !== void 0 ? n.list(N.value) : u.files.value.map((e2) => h("div", { key: e2.name, class: "q-uploader__file relative-position" + (o.noThumbnails !== true && e2.__img !== void 0 ? " q-uploader__file--img" : "") + (e2.__status === "failed" ? " q-uploader__file--failed" : e2.__status === "uploaded" ? " q-uploader__file--uploaded" : ""), style: o.noThumbnails !== true && e2.__img !== void 0 ? { backgroundImage: 'url("' + e2.__img.src + '")' } : null }, [h("div", { class: "q-uploader__file-header row flex-center no-wrap" }, [e2.__status === "failed" ? h(QIcon$1, { class: "q-uploader__file-status", name: i.iconSet.type.negative, color: "negative" }) : null, h("div", { class: "q-uploader__file-header-content col" }, [h("div", { class: "q-uploader__title" }, [e2.name]), h("div", { class: "q-uploader__subtitle row items-center no-wrap" }, [e2.__sizeLabel + " / " + e2.__progressLabel])]), e2.__status === "uploading" ? h(QCircularProgress, { value: e2.__progress, min: 0, max: 1, indeterminate: e2.__progress === 0 }) : h(QBtn, { round: true, dense: true, flat: true, icon: i.iconSet.uploader[e2.__status === "uploaded" ? "done" : "clear"], onClick: () => {
      O(e2);
    } })])]));
  }
  watch(u.isUploading, (e2, t2) => {
    t2 === false && e2 === true ? a("start") : t2 === true && e2 === false && a("finish");
  }), onBeforeUnmount(() => {
    u.isUploading.value === true && u.abort(), u.files.value.length > 0 && L();
  });
  const H = { pickFiles: f, addFiles: g, reset: M, removeUploadedFiles: B, removeQueuedFiles: Q, removeFile: O, upload: R, abort: u.abort }, N = computed(() => {
    const e2 = { canAddFiles: C.value, canUpload: k.value, uploadSizeLabel: T.value, uploadProgressLabel: q.value };
    return Object.keys(u).forEach((t2) => {
      e2[t2] = isRef(u[t2]) === true ? u[t2].value : u[t2];
    }), __spreadValues(__spreadValues({}, e2), H);
  });
  return Object.assign(l, H), () => {
    const e2 = [h("div", { class: $.value }, A()), h("div", { class: "q-uploader__list scroll" }, I()), S("uploader")];
    u.isBusy.value === true && e2.push(h("div", { class: "q-uploader__overlay absolute-full flex flex-center" }, [h(QSpinner$1)]));
    const t2 = { ref: v, class: P.value };
    return C.value === true && (t2.onDragover = b), h("div", t2, e2);
  };
}
var createUploaderComponent = ({ name: e, props: t, emits: o, injectPlugin: n }) => defineComponent({ name: e, props: __spreadValues(__spreadValues({}, coreProps), t), emits: [...coreEmits, ...o], setup() {
  return getRenderer(n);
} });
function getFn(e) {
  return typeof e === "function" ? e : () => e;
}
const props$2 = { url: [Function, String], method: { type: [Function, String], default: "POST" }, fieldName: { type: [Function, String], default: () => {
  return (e) => e.name;
} }, headers: [Function, Array], formFields: [Function, Array], withCredentials: [Function, Boolean], sendRaw: [Function, Boolean], batch: [Function, Boolean], factory: Function }, emits = ["factory-failed", "uploaded", "failed", "uploading"];
function injectPlugin({ props: e, emit: t, helpers: o }) {
  const n = ref([]), a = ref([]), l = ref(0), i = computed(() => ({ url: getFn(e.url), method: getFn(e.method), headers: getFn(e.headers), formFields: getFn(e.formFields), fieldName: getFn(e.fieldName), withCredentials: getFn(e.withCredentials), sendRaw: getFn(e.sendRaw), batch: getFn(e.batch) })), r = computed(() => l.value > 0), s = computed(() => a.value.length > 0);
  let u;
  function c() {
    n.value.forEach((e2) => {
      e2.abort();
    }), a.value.length > 0 && (u = true);
  }
  function d() {
    const e2 = o.queuedFiles.value.slice(0);
    o.queuedFiles.value = [], i.value.batch(e2) ? p2(e2) : e2.forEach((e3) => {
      p2([e3]);
    });
  }
  function p2(n2) {
    if (l.value++, typeof e.factory !== "function")
      return void v(n2, {});
    const i2 = e.factory(n2);
    if (i2)
      if (typeof i2.catch === "function" && typeof i2.then === "function") {
        a.value.push(i2);
        const e2 = (e3) => {
          o.isAlive() === true && (a.value = a.value.filter((e4) => e4 !== i2), a.value.length === 0 && (u = false), o.queuedFiles.value = o.queuedFiles.value.concat(n2), n2.forEach((e4) => {
            o.updateFileStatus(e4, "failed");
          }), t("factory-failed", e3, n2), l.value--);
        };
        i2.then((t2) => {
          u === true ? e2(new Error("Aborted")) : o.isAlive() === true && (a.value = a.value.filter((e3) => e3 !== i2), v(n2, t2));
        }).catch(e2);
      } else
        v(n2, i2 || {});
    else
      t("factory-failed", new Error("QUploader: factory() does not return properly"), n2), l.value--;
  }
  function v(e2, a2) {
    const r2 = new FormData(), s2 = new XMLHttpRequest(), u2 = (e3, t2) => {
      return a2[e3] !== void 0 ? getFn(a2[e3])(t2) : i.value[e3](t2);
    }, c2 = u2("url", e2);
    if (!c2)
      return console.error("q-uploader: invalid or no URL specified"), void l.value--;
    const d2 = u2("formFields", e2);
    d2 !== void 0 && d2.forEach((e3) => {
      r2.append(e3.name, e3.value);
    });
    let p3, v2 = 0, m = 0, f = 0, h2 = 0;
    s2.upload.addEventListener("progress", (t2) => {
      if (p3 === true)
        return;
      const n2 = Math.min(h2, t2.loaded);
      o.uploadedSize.value += n2 - f, f = n2;
      let a3 = f - m;
      for (let l2 = v2; a3 > 0 && l2 < e2.length; l2++) {
        const t3 = e2[l2], n3 = a3 > t3.size;
        if (!n3)
          return void o.updateFileStatus(t3, "uploading", a3);
        a3 -= t3.size, v2++, m += t3.size, o.updateFileStatus(t3, "uploading", t3.size);
      }
    }, false), s2.onreadystatechange = () => {
      s2.readyState < 4 || (s2.status && s2.status < 400 ? (o.uploadedFiles.value = o.uploadedFiles.value.concat(e2), e2.forEach((e3) => {
        o.updateFileStatus(e3, "uploaded");
      }), t("uploaded", { files: e2, xhr: s2 })) : (p3 = true, o.uploadedSize.value -= f, o.queuedFiles.value = o.queuedFiles.value.concat(e2), e2.forEach((e3) => {
        o.updateFileStatus(e3, "failed");
      }), t("failed", { files: e2, xhr: s2 })), l.value--, n.value = n.value.filter((e3) => e3 !== s2));
    }, s2.open(u2("method", e2), c2), u2("withCredentials", e2) === true && (s2.withCredentials = true);
    const g = u2("headers", e2);
    g !== void 0 && g.forEach((e3) => {
      s2.setRequestHeader(e3.name, e3.value);
    });
    const b = u2("sendRaw", e2);
    e2.forEach((e3) => {
      o.updateFileStatus(e3, "uploading", 0), b !== true && r2.append(u2("fieldName", e3), e3, e3.name), e3.xhr = s2, e3.__abort = () => {
        s2.abort();
      }, h2 += e3.size;
    }), t("uploading", { files: e2, xhr: s2 }), n.value.push(s2), b === true ? s2.send(new Blob(e2)) : s2.send(r2);
  }
  return { isUploading: r, isBusy: s, abort: c, upload: d };
}
var xhrUploaderPlugin = { name: "QUploader", props: props$2, emits, injectPlugin }, QUploader = createUploaderComponent(xhrUploaderPlugin), QUploaderAddTrigger = defineComponent({ name: "QUploaderAddTrigger", setup() {
  return inject(uploaderKey, () => {
    console.error("QUploaderAddTrigger needs to be child of QUploader");
  });
} }), QVideo = defineComponent({ name: "QVideo", props: __spreadProps(__spreadValues({}, useRatioProps), { src: { type: String, required: true } }), setup(e) {
  const t = useRatio(e), o = computed(() => "q-video" + (e.ratio !== void 0 ? " q-video--responsive" : ""));
  return () => h("div", { class: o.value, style: t.value }, [h("iframe", { src: e.src, frameborder: "0", allowfullscreen: true })]);
} }), components = Object.freeze({ __proto__: null, QAjaxBar, QAvatar, QBadge, QBanner, QBar, QBreadcrumbs, QBreadcrumbsEl, QBtn, QBtnDropdown, QBtnGroup, QBtnToggle, QCard, QCardSection, QCardActions, QCarousel, QCarouselSlide, QCarouselControl, QChatMessage, QCheckbox, QChip, QCircularProgress, QColor, QDate, QDialog, QDrawer, QEditor, QExpansionItem, QFab, QFabAction, QField, QFile, QFooter, QForm, QFormChildMixin, QHeader, QIcon: QIcon$1, QImg, QInfiniteScroll, QInnerLoading, QInput: QInput$1, QIntersection, QList, QItem, QItemSection, QItemLabel, QKnob, QLayout, QMarkupTable, QMenu, QNoSsr, QOptionGroup, QPage, QPageContainer, QPageScroller, QPageSticky, QPagination, QParallax, QPopupEdit, QPopupProxy, QLinearProgress, QPullToRefresh, QRadio, QRange, QRating, QResizeObserver, QResponsive, QScrollArea, QScrollObserver, QSelect, QSeparator, QSkeleton, QSlideItem, QSlideTransition, QSlider, QSpace, QSpinner: QSpinner$1, QSpinnerAudio, QSpinnerBall, QSpinnerBars, QSpinnerBox, QSpinnerClock, QSpinnerComment, QSpinnerCube, QSpinnerDots, QSpinnerFacebook, QSpinnerGears, QSpinnerGrid, QSpinnerHearts, QSpinnerHourglass, QSpinnerInfinity, QSpinnerIos, QSpinnerOrbit, QSpinnerOval, QSpinnerPie, QSpinnerPuff, QSpinnerRadio, QSpinnerRings, QSpinnerTail, QSplitter, QStep, QStepper, QStepperNavigation, QTabPanels, QTabPanel, QTable, QTh, QTr, QTd, QTabs, QTab, QRouteTab, QTime, QTimeline, QTimelineEntry, QToggle, QToolbar, QToolbarTitle, QTooltip, QTree, QUploader, QUploaderAddTrigger, QVideo, QVirtualScroll });
function getDepth(e) {
  if (e === false)
    return 0;
  if (e === true || e === void 0)
    return 1;
  const t = parseInt(e, 10);
  return isNaN(t) ? 0 : t;
}
var ClosePopup = { name: "close-popup", beforeMount(e, { value: t }) {
  const o = { depth: getDepth(t), handler(t2) {
    o.depth !== 0 && setTimeout(() => {
      const n = getPortalVm(e);
      n !== void 0 && closePortals(n, t2, o.depth);
    });
  }, handlerKey(e2) {
    isKeyCode(e2, 13) === true && o.handler(e2);
  } };
  e.__qclosepopup = o, e.addEventListener("click", o.handler), e.addEventListener("keyup", o.handlerKey);
}, updated(e, { value: t, oldValue: o }) {
  t !== o && (e.__qclosepopup.depth = getDepth(t));
}, beforeUnmount(e) {
  const t = e.__qclosepopup;
  e.removeEventListener("click", t.handler), e.removeEventListener("keyup", t.handlerKey), delete e.__qclosepopup;
} };
let id = 0, offsetBase = void 0;
function getAbsolutePosition(e, t) {
  offsetBase === void 0 && (offsetBase = document.createElement("div"), offsetBase.style.cssText = "position: absolute; left: 0; top: 0", document.body.appendChild(offsetBase));
  const o = e.getBoundingClientRect(), n = offsetBase.getBoundingClientRect(), { marginLeft: a, marginRight: l, marginTop: i, marginBottom: r } = window.getComputedStyle(e), s = parseInt(a, 10) + parseInt(l, 10), u = parseInt(i, 10) + parseInt(r, 10);
  return { left: o.left - n.left, top: o.top - n.top, width: o.right - o.left, height: o.bottom - o.top, widthM: o.right - o.left + (t === true ? 0 : s), heightM: o.bottom - o.top + (t === true ? 0 : u), marginH: t === true ? s : 0, marginV: t === true ? u : 0 };
}
function getAbsoluteSize(e) {
  return { width: e.scrollWidth, height: e.scrollHeight };
}
const styleEdges = ["Top", "Right", "Bottom", "Left"], styleBorderRadiuses = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], reStyleSkipKey = /-block|-inline|block-|inline-/, reStyleSkipRule = /(-block|-inline|block-|inline-).*:/;
function getComputedStyle$1(e, t) {
  const o = window.getComputedStyle(e), n = {};
  for (let a = 0; a < t.length; a++) {
    const e2 = t[a];
    if (o[e2] === "")
      if (e2 === "cssText") {
        const t2 = o.length;
        let a2 = "";
        for (let e3 = 0; e3 < t2; e3++)
          reStyleSkipKey.test(o[e3]) !== true && (a2 += o[e3] + ": " + o[o[e3]] + "; ");
        n[e2] = a2;
      } else if (["borderWidth", "borderStyle", "borderColor"].indexOf(e2) > -1) {
        const t2 = e2.replace("border", "");
        let a2 = "";
        for (let e3 = 0; e3 < styleEdges.length; e3++) {
          const n2 = "border" + styleEdges[e3] + t2;
          a2 += o[n2] + " ";
        }
        n[e2] = a2;
      } else if (e2 === "borderRadius") {
        let t2 = "", a2 = "";
        for (let e3 = 0; e3 < styleBorderRadiuses.length; e3++) {
          const n2 = o[styleBorderRadiuses[e3]].split(" ");
          t2 += n2[0] + " ", a2 += (n2[1] === void 0 ? n2[0] : n2[1]) + " ";
        }
        n[e2] = t2 + "/ " + a2;
      } else
        n[e2] = o[e2];
    else
      n[e2] = e2 === "cssText" ? o[e2].split(";").filter((e3) => reStyleSkipRule.test(e3) !== true).join(";") : o[e2];
  }
  return n;
}
const zIndexPositions = ["absolute", "fixed", "relative", "sticky"];
function getMaxZIndex(e) {
  let t = e, o = 0;
  while (t !== null && t !== document) {
    const { position: n, zIndex: a } = window.getComputedStyle(t), l = Number(a);
    l > o && (t === e || zIndexPositions.includes(n) === true) && (o = l), t = t.parentNode;
  }
  return o;
}
function normalizeElements(e) {
  return { from: e.from, to: e.to !== void 0 ? e.to : e.from };
}
function normalizeOptions(e) {
  return typeof e === "number" ? e = { duration: e } : typeof e === "function" && (e = { onEnd: e }), __spreadProps(__spreadValues({}, e), { waitFor: e.waitFor === void 0 ? 0 : e.waitFor, duration: isNaN(e.duration) === true ? 300 : parseInt(e.duration, 10), easing: typeof e.easing === "string" && e.easing.length > 0 ? e.easing : "ease-in-out", delay: isNaN(e.delay) === true ? 0 : parseInt(e.delay, 10), fill: typeof e.fill === "string" && e.fill.length > 0 ? e.fill : "none", resize: e.resize === true, useCSS: e.useCSS === true, hideFromClone: e.hideFromClone === true, keepToClone: e.keepToClone === true, tween: e.tween === true, tweenFromOpacity: isNaN(e.tweenFromOpacity) === true ? 0.6 : parseFloat(e.tweenFromOpacity), tweenToOpacity: isNaN(e.tweenToOpacity) === true ? 0.5 : parseFloat(e.tweenToOpacity) });
}
function getElement(e) {
  const t = typeof e;
  return t === "function" ? e() : t === "string" ? document.querySelector(e) : e;
}
function isValidElement(e) {
  return e && e.ownerDocument === document && e.parentNode !== null;
}
function morph(e) {
  let t = () => false, o = false, n = true;
  const a = normalizeElements(e), l = normalizeOptions(e), i = getElement(a.from);
  if (isValidElement(i) !== true)
    return t;
  typeof i.qMorphCancel === "function" && i.qMorphCancel();
  let r = void 0, s = void 0, u = void 0, c = void 0;
  const d = i.parentNode, p2 = i.nextElementSibling, v = getAbsolutePosition(i, l.resize), { width: m, height: f } = getAbsoluteSize(d), { borderWidth: h2, borderStyle: g, borderColor: b, borderRadius: y, backgroundColor: S, transform: w, position: x, cssText: C } = getComputedStyle$1(i, ["borderWidth", "borderStyle", "borderColor", "borderRadius", "backgroundColor", "transform", "position", "cssText"]), k = i.classList.toString(), _ = i.style.cssText, q = i.cloneNode(true), T = l.tween === true ? i.cloneNode(true) : void 0;
  T !== void 0 && (T.className = T.classList.toString().split(" ").filter((e2) => /^bg-/.test(e2) === false).join(" ")), l.hideFromClone === true && q.classList.add("q-morph--internal"), q.setAttribute("aria-hidden", "true"), q.style.transition = "none", q.style.animation = "none", q.style.pointerEvents = "none", d.insertBefore(q, p2), i.qMorphCancel = () => {
    o = true, q.remove(), T !== void 0 && T.remove(), l.hideFromClone === true && q.classList.remove("q-morph--internal"), i.qMorphCancel = void 0;
  };
  const P = () => {
    const e2 = getElement(a.to);
    if (o === true || isValidElement(e2) !== true)
      return void (typeof i.qMorphCancel === "function" && i.qMorphCancel());
    i !== e2 && typeof e2.qMorphCancel === "function" && e2.qMorphCancel(), l.keepToClone !== true && e2.classList.add("q-morph--internal"), q.classList.add("q-morph--internal");
    const { width: p3, height: P2 } = getAbsoluteSize(d), { width: $, height: M } = getAbsoluteSize(e2.parentNode);
    l.hideFromClone !== true && q.classList.remove("q-morph--internal"), e2.qMorphCancel = () => {
      o = true, q.remove(), T !== void 0 && T.remove(), l.hideFromClone === true && q.classList.remove("q-morph--internal"), l.keepToClone !== true && e2.classList.remove("q-morph--internal"), i.qMorphCancel = void 0, e2.qMorphCancel = void 0;
    };
    const B = () => {
      if (o === true)
        return void (typeof e2.qMorphCancel === "function" && e2.qMorphCancel());
      l.hideFromClone !== true && (q.classList.add("q-morph--internal"), q.innerHTML = "", q.style.left = 0, q.style.right = "unset", q.style.top = 0, q.style.bottom = "unset", q.style.transform = "none"), l.keepToClone !== true && e2.classList.remove("q-morph--internal");
      const a2 = e2.parentNode, { width: B2, height: Q } = getAbsoluteSize(a2), E = e2.cloneNode(l.keepToClone);
      E.setAttribute("aria-hidden", "true"), l.keepToClone !== true && (E.style.left = 0, E.style.right = "unset", E.style.top = 0, E.style.bottom = "unset", E.style.transform = "none", E.style.pointerEvents = "none"), E.classList.add("q-morph--internal");
      const O = e2 === i && d === a2 ? q : e2.nextElementSibling;
      a2.insertBefore(E, O);
      const { borderWidth: L, borderStyle: z, borderColor: F, borderRadius: R, backgroundColor: D, transform: V, position: A, cssText: I } = getComputedStyle$1(e2, ["borderWidth", "borderStyle", "borderColor", "borderRadius", "backgroundColor", "transform", "position", "cssText"]), H = e2.classList.toString(), N = e2.style.cssText;
      e2.style.cssText = I, e2.style.transform = "none", e2.style.animation = "none", e2.style.transition = "none", e2.className = H.split(" ").filter((e3) => /^bg-/.test(e3) === false).join(" ");
      const j = getAbsolutePosition(e2, l.resize), U = v.left - j.left, K = v.top - j.top, W = v.width / (j.width > 0 ? j.width : 10), Y = v.height / (j.height > 0 ? j.height : 100), G = m - p3, X = f - P2, Z = B2 - $, J = Q - M, ee = Math.max(v.widthM, G), te = Math.max(v.heightM, X), oe = Math.max(j.widthM, Z), ne = Math.max(j.heightM, J), ae = i === e2 && ["absolute", "fixed"].includes(A) === false && ["absolute", "fixed"].includes(x) === false;
      let le = A === "fixed", ie = a2;
      while (le !== true && ie !== document)
        le = window.getComputedStyle(ie).position === "fixed", ie = ie.parentNode;
      if (l.hideFromClone !== true && (q.style.display = "block", q.style.flex = "0 0 auto", q.style.opacity = 0, q.style.minWidth = "unset", q.style.maxWidth = "unset", q.style.minHeight = "unset", q.style.maxHeight = "unset", q.classList.remove("q-morph--internal")), l.keepToClone !== true && (E.style.display = "block", E.style.flex = "0 0 auto", E.style.opacity = 0, E.style.minWidth = "unset", E.style.maxWidth = "unset", E.style.minHeight = "unset", E.style.maxHeight = "unset"), E.classList.remove("q-morph--internal"), typeof l.classes === "string" && (e2.className += " " + l.classes), typeof l.style === "string")
        e2.style.cssText += " " + l.style;
      else if (l.style === Object(l.style))
        for (const t2 in l.style)
          e2.style[t2] = l.style[t2];
      const re = getMaxZIndex(q), se = getMaxZIndex(e2), ue = le === true ? document.documentElement : { scrollLeft: 0, scrollTop: 0 };
      e2.style.position = le === true ? "fixed" : "absolute", e2.style.left = `${j.left - ue.scrollLeft}px`, e2.style.right = "unset", e2.style.top = `${j.top - ue.scrollTop}px`, e2.style.margin = 0, l.resize === true && (e2.style.minWidth = "unset", e2.style.maxWidth = "unset", e2.style.minHeight = "unset", e2.style.maxHeight = "unset", e2.style.overflow = "hidden", e2.style.overflowX = "hidden", e2.style.overflowY = "hidden"), document.body.appendChild(e2), T !== void 0 && (T.style.cssText = C, T.style.transform = "none", T.style.animation = "none", T.style.transition = "none", T.style.position = e2.style.position, T.style.left = `${v.left - ue.scrollLeft}px`, T.style.right = "unset", T.style.top = `${v.top - ue.scrollTop}px`, T.style.margin = 0, T.style.pointerEvents = "none", l.resize === true && (T.style.minWidth = "unset", T.style.maxWidth = "unset", T.style.minHeight = "unset", T.style.maxHeight = "unset", T.style.overflow = "hidden", T.style.overflowX = "hidden", T.style.overflowY = "hidden"), document.body.appendChild(T));
      const ce = (o2) => {
        i === e2 && n !== true ? (e2.style.cssText = _, e2.className = k) : (e2.style.cssText = N, e2.className = H), E.parentNode === a2 && a2.insertBefore(e2, E), q.remove(), E.remove(), T !== void 0 && T.remove(), t = () => false, i.qMorphCancel = void 0, e2.qMorphCancel = void 0, typeof l.onEnd === "function" && l.onEnd(n === true ? "to" : "from", o2 === true);
      };
      if (l.useCSS !== true && typeof e2.animate === "function") {
        const a3 = l.resize === true ? { transform: `translate(${U}px, ${K}px)`, width: `${ee}px`, height: `${te}px` } : { transform: `translate(${U}px, ${K}px) scale(${W}, ${Y})` }, d2 = l.resize === true ? { width: `${oe}px`, height: `${ne}px` } : {}, p4 = l.resize === true ? { width: `${ee}px`, height: `${te}px` } : {}, m2 = l.resize === true ? { transform: `translate(${-1 * U}px, ${-1 * K}px)`, width: `${oe}px`, height: `${ne}px` } : { transform: `translate(${-1 * U}px, ${-1 * K}px) scale(${1 / W}, ${1 / Y})` }, f2 = T !== void 0 ? { opacity: l.tweenToOpacity } : { backgroundColor: S }, x2 = T !== void 0 ? { opacity: 1 } : { backgroundColor: D };
        c = e2.animate([__spreadValues(__spreadValues({ margin: 0, borderWidth: h2, borderStyle: g, borderColor: b, borderRadius: y, zIndex: re, transformOrigin: "0 0" }, a3), f2), __spreadValues(__spreadValues({ margin: 0, borderWidth: L, borderStyle: z, borderColor: F, borderRadius: R, zIndex: se, transformOrigin: "0 0", transform: V }, d2), x2)], { duration: l.duration, easing: l.easing, fill: l.fill, delay: l.delay }), s = T === void 0 ? void 0 : T.animate([__spreadValues({ opacity: l.tweenFromOpacity, margin: 0, borderWidth: h2, borderStyle: g, borderColor: b, borderRadius: y, zIndex: re, transformOrigin: "0 0", transform: w }, p4), __spreadValues({ opacity: 0, margin: 0, borderWidth: L, borderStyle: z, borderColor: F, borderRadius: R, zIndex: se, transformOrigin: "0 0" }, m2)], { duration: l.duration, easing: l.easing, fill: l.fill, delay: l.delay }), r = l.hideFromClone === true || ae === true ? void 0 : q.animate([{ margin: `${X < 0 ? X / 2 : 0}px ${G < 0 ? G / 2 : 0}px`, width: `${ee + v.marginH}px`, height: `${te + v.marginV}px` }, { margin: 0, width: 0, height: 0 }], { duration: l.duration, easing: l.easing, fill: l.fill, delay: l.delay }), u = l.keepToClone === true ? void 0 : E.animate([ae === true ? { margin: `${X < 0 ? X / 2 : 0}px ${G < 0 ? G / 2 : 0}px`, width: `${ee + v.marginH}px`, height: `${te + v.marginV}px` } : { margin: 0, width: 0, height: 0 }, { margin: `${J < 0 ? J / 2 : 0}px ${Z < 0 ? Z / 2 : 0}px`, width: `${oe + j.marginH}px`, height: `${ne + j.marginV}px` }], { duration: l.duration, easing: l.easing, fill: l.fill, delay: l.delay });
        const C2 = (e3) => {
          r !== void 0 && r.cancel(), s !== void 0 && s.cancel(), u !== void 0 && u.cancel(), c.cancel(), c.removeEventListener("finish", C2), c.removeEventListener("cancel", C2), ce(e3), r = void 0, s = void 0, u = void 0, c = void 0;
        };
        i.qMorphCancel = () => {
          i.qMorphCancel = void 0, o = true, C2();
        }, e2.qMorphCancel = () => {
          e2.qMorphCancel = void 0, o = true, C2();
        }, c.addEventListener("finish", C2), c.addEventListener("cancel", C2), t = (e3) => {
          return o !== true && c !== void 0 && (e3 === true ? (C2(true), true) : (n = n !== true, r !== void 0 && r.reverse(), s !== void 0 && s.reverse(), u !== void 0 && u.reverse(), c.reverse(), true));
        };
      } else {
        const a3 = `q-morph-anim-${++id}`, r2 = document.createElement("style"), s2 = l.resize === true ? `
            transform: translate(${U}px, ${K}px);
            width: ${ee}px;
            height: ${te}px;
          ` : `transform: translate(${U}px, ${K}px) scale(${W}, ${Y});`, u2 = l.resize === true ? `
            width: ${oe}px;
            height: ${ne}px;
          ` : "", c2 = l.resize === true ? `
            width: ${ee}px;
            height: ${te}px;
          ` : "", d2 = l.resize === true ? `
            transform: translate(${-1 * U}px, ${-1 * K}px);
            width: ${oe}px;
            height: ${ne}px;
          ` : `transform: translate(${-1 * U}px, ${-1 * K}px) scale(${1 / W}, ${1 / Y});`, p4 = T !== void 0 ? `opacity: ${l.tweenToOpacity};` : `background-color: ${S};`, m2 = T !== void 0 ? "opacity: 1;" : `background-color: ${D};`, f2 = T === void 0 ? "" : `
            @keyframes ${a3}-from-tween {
              0% {
                opacity: ${l.tweenFromOpacity};
                margin: 0;
                border-width: ${h2};
                border-style: ${g};
                border-color: ${b};
                border-radius: ${y};
                z-index: ${re};
                transform-origin: 0 0;
                transform: ${w};
                ${c2}
              }

              100% {
                opacity: 0;
                margin: 0;
                border-width: ${L};
                border-style: ${z};
                border-color: ${F};
                border-radius: ${R};
                z-index: ${se};
                transform-origin: 0 0;
                ${d2}
              }
            }
          `, x2 = l.hideFromClone === true || ae === true ? "" : `
            @keyframes ${a3}-from {
              0% {
                margin: ${X < 0 ? X / 2 : 0}px ${G < 0 ? G / 2 : 0}px;
                width: ${ee + v.marginH}px;
                height: ${te + v.marginV}px;
              }

              100% {
                margin: 0;
                width: 0;
                height: 0;
              }
            }
          `, C2 = ae === true ? `
            margin: ${X < 0 ? X / 2 : 0}px ${G < 0 ? G / 2 : 0}px;
            width: ${ee + v.marginH}px;
            height: ${te + v.marginV}px;
          ` : "\n            margin: 0;\n            width: 0;\n            height: 0;\n          ", k2 = l.keepToClone === true ? "" : `
            @keyframes ${a3}-to {
              0% {
                ${C2}
              }

              100% {
                margin: ${J < 0 ? J / 2 : 0}px ${Z < 0 ? Z / 2 : 0}px;
                width: ${oe + j.marginH}px;
                height: ${ne + j.marginV}px;
              }
            }
          `;
        r2.innerHTML = `
          @keyframes ${a3} {
            0% {
              margin: 0;
              border-width: ${h2};
              border-style: ${g};
              border-color: ${b};
              border-radius: ${y};
              background-color: ${S};
              z-index: ${re};
              transform-origin: 0 0;
              ${s2}
              ${p4}
            }

            100% {
              margin: 0;
              border-width: ${L};
              border-style: ${z};
              border-color: ${F};
              border-radius: ${R};
              background-color: ${D};
              z-index: ${se};
              transform-origin: 0 0;
              transform: ${V};
              ${u2}
              ${m2}
            }
          }

          ${x2}

          ${f2}

          ${k2}
        `, document.head.appendChild(r2);
        let _2 = "normal";
        q.style.animation = `${l.duration}ms ${l.easing} ${l.delay}ms ${_2} ${l.fill} ${a3}-from`, T !== void 0 && (T.style.animation = `${l.duration}ms ${l.easing} ${l.delay}ms ${_2} ${l.fill} ${a3}-from-tween`), E.style.animation = `${l.duration}ms ${l.easing} ${l.delay}ms ${_2} ${l.fill} ${a3}-to`, e2.style.animation = `${l.duration}ms ${l.easing} ${l.delay}ms ${_2} ${l.fill} ${a3}`;
        const P3 = (t2) => {
          t2 === Object(t2) && t2.animationName !== a3 || (e2.removeEventListener("animationend", P3), e2.removeEventListener("animationcancel", P3), ce(), r2.remove());
        };
        i.qMorphCancel = () => {
          i.qMorphCancel = void 0, o = true, P3();
        }, e2.qMorphCancel = () => {
          e2.qMorphCancel = void 0, o = true, P3();
        }, e2.addEventListener("animationend", P3), e2.addEventListener("animationcancel", P3), t = (t2) => {
          return !!(o !== true && e2 && q && E) && (t2 === true ? (P3(), true) : (n = n !== true, _2 = _2 === "normal" ? "reverse" : "normal", q.style.animationDirection = _2, T.style.animationDirection = _2, E.style.animationDirection = _2, e2.style.animationDirection = _2, true));
        };
      }
    };
    if (l.waitFor > 0 || l.waitFor === "transitionend" || l.waitFor === Object(l.waitFor) && typeof l.waitFor.then === "function") {
      const t2 = l.waitFor > 0 ? new Promise((e3) => setTimeout(e3, l.waitFor)) : l.waitFor === "transitionend" ? new Promise((t3) => {
        const o2 = setTimeout(() => {
          n2();
        }, 400), n2 = (a2) => {
          clearTimeout(o2), e2 && (e2.removeEventListener("transitionend", n2), e2.removeEventListener("transitioncancel", n2)), t3();
        };
        e2.addEventListener("transitionend", n2), e2.addEventListener("transitioncancel", n2);
      }) : l.waitFor;
      t2.then(B).catch(() => {
        typeof e2.qMorphCancel === "function" && e2.qMorphCancel();
      });
    } else
      B();
  };
  return typeof e.onToggle === "function" && e.onToggle(), requestAnimationFrame(P), (e2) => t(e2);
}
const morphGroups = {}, props$1 = ["duration", "delay", "easing", "fill", "classes", "style", "duration", "resize", "useCSS", "hideFromClone", "keepToClone", "tween", "tweenFromOpacity", "tweenToOpacity", "waitFor", "onEnd"], mods = ["resize", "useCSS", "hideFromClone", "keepToClone", "tween"];
function changeClass(e, t) {
  e.clsAction !== t && (e.clsAction = t, e.el.classList[t]("q-morph--invisible"));
}
function trigger(e) {
  if (e.animating === true || e.queue.length < 2)
    return;
  const [t, o] = e.queue;
  e.animating = true, t.animating = true, o.animating = true, changeClass(t, "remove"), changeClass(o, "remove");
  const n = morph(__spreadProps(__spreadValues({ from: t.el, to: o.el, onToggle() {
    changeClass(t, "add"), changeClass(o, "remove");
  } }, o.opts), { onEnd(n2, a) {
    o.opts.onEnd !== void 0 && o.opts.onEnd(n2, a), a !== true && (t.animating = false, o.animating = false, e.animating = false, e.cancel = void 0, e.queue.shift(), trigger(e));
  } }));
  e.cancel = () => {
    n(true), e.cancel = void 0;
  };
}
function updateModifiers(e, t) {
  const o = t.opts;
  mods.forEach((t2) => {
    o[t2] = e[t2] === true;
  });
}
function insertArgs(e, t) {
  const o = typeof e === "string" && e.length > 0 ? e.split(":") : [];
  t.name = o[0], t.group = o[1], Object.assign(t.opts, { duration: isNaN(o[2]) === true ? 300 : parseFloat(o[2]), waitFor: o[3] });
}
function updateArgs(e, t) {
  e.group !== void 0 && (t.group = e.group), e.name !== void 0 && (t.name = e.name);
  const o = t.opts;
  props$1.forEach((t2) => {
    e[t2] !== void 0 && (o[t2] = e[t2]);
  });
}
function updateModel(e, t) {
  if (t.name !== e)
    t.animating === false && changeClass(t, "add");
  else {
    const o = morphGroups[t.group];
    o === void 0 ? (morphGroups[t.group] = { name: t.group, model: e, queue: [t], animating: false }, changeClass(t, "remove")) : o.model !== e && (o.model = e, o.queue.push(t), o.animating === false && o.queue.length === 2 && trigger(o));
  }
}
function updateValue(e, t) {
  let o;
  Object(t) === t ? (o = "" + t.model, updateArgs(t, e), updateModifiers(t, e)) : o = "" + t, o !== e.model ? (e.model = o, updateModel(o, e)) : e.animating === false && e.clsAction !== void 0 && e.el.classList[e.clsAction]("q-morph--invisible");
}
var Morph = { name: "morph", mounted(e, t) {
  const o = { el: e, animating: false, opts: {} };
  updateModifiers(t.modifiers, o), insertArgs(t.arg, o), updateValue(o, t.value), e.__qmorph = o;
}, updated(e, t) {
  updateValue(e.__qmorph, t.value);
}, beforeUnmount(e) {
  const t = e.__qmorph, o = morphGroups[t.group];
  if (o !== void 0) {
    const e2 = o.queue.indexOf(t);
    e2 !== -1 && (o.queue = o.queue.filter((e3) => e3 !== t), o.queue.length === 0 && (o.cancel !== void 0 && o.cancel(), delete morphGroups[t.group]));
  }
  t.clsAction === "add" && e.classList.remove("q-morph--invisible"), delete e.__qmorph;
} };
const defaultCfg = { childList: true, subtree: true, attributes: true, characterData: true, attributeOldValue: true, characterDataOldValue: true };
function update$2(e, t, o) {
  t.handler = o, t.observer !== void 0 && t.observer.disconnect(), t.observer = new MutationObserver((o2) => {
    if (typeof t.handler === "function") {
      const n = t.handler(o2);
      n !== false && t.once !== true || destroy(e);
    }
  }), t.observer.observe(e, t.opts);
}
function destroy(e) {
  const t = e.__qmutation;
  t !== void 0 && (t.observer !== void 0 && t.observer.disconnect(), delete e.__qmutation);
}
var Mutation = { name: "mutation", mounted(e, _a) {
  var _b = _a, { modifiers: _c } = _b, _d = _c, { once: t } = _d, o = __objRest(_d, ["once"]), { value: n } = _b;
  const a = { once: t, opts: Object.keys(o).length === 0 ? defaultCfg : o };
  update$2(e, a, n), e.__qmutation = a;
}, updated(e, { oldValue: t, value: o }) {
  const n = e.__qmutation;
  n !== void 0 && t !== o && update$2(e, n, o);
}, beforeUnmount: destroy };
const { passive } = listenOpts$1;
function update$1(e, { value: t, oldValue: o }) {
  typeof t === "function" ? (e.handler = t, typeof o !== "function" && (e.scrollTarget.addEventListener("scroll", e.scroll, passive), e.scroll())) : e.scrollTarget.removeEventListener("scroll", e.scroll, passive);
}
var ScrollFire = { name: "scroll-fire", mounted(e, t) {
  const o = { scrollTarget: getScrollTarget(e), scroll: debounce(() => {
    let t2, n;
    o.scrollTarget === window ? (n = e.getBoundingClientRect().bottom, t2 = window.innerHeight) : (n = offset(e).top + height(e), t2 = offset(o.scrollTarget).top + height(o.scrollTarget)), n > 0 && n < t2 && (o.scrollTarget.removeEventListener("scroll", o.scroll, passive), o.handler(e));
  }, 25) };
  update$1(o, t), e.__qscrollfire = o;
}, updated(e, t) {
  t.value !== t.oldValue && update$1(e.__qscrollfire, t);
}, beforeUnmount(e) {
  const t = e.__qscrollfire;
  t.scrollTarget.removeEventListener("scroll", t.scroll, passive), delete e.__qscrollfire;
} };
function update(e, { value: t, oldValue: o }) {
  typeof t === "function" ? (e.handler = t, typeof o !== "function" && e.scrollTarget.addEventListener("scroll", e.scroll, listenOpts$1.passive)) : e.scrollTarget.removeEventListener("scroll", e.scroll, listenOpts$1.passive);
}
var Scroll = { name: "scroll", mounted(e, t) {
  const o = { scrollTarget: getScrollTarget(e), scroll() {
    o.handler(getVerticalScrollPosition(o.scrollTarget), getHorizontalScrollPosition(o.scrollTarget));
  } };
  update(o, t), e.__qscroll = o;
}, updated(e, t) {
  e.__qscroll !== void 0 && t.oldValue !== t.value && update(e.__qscroll, t);
}, beforeUnmount(e) {
  const t = e.__qscroll;
  t.scrollTarget.removeEventListener("scroll", t.scroll, listenOpts$1.passive), delete e.__qscroll;
} }, TouchHold = { name: "touch-hold", beforeMount(e, t) {
  const { modifiers: o } = t;
  if (o.mouse !== true && client$1.has.touch !== true)
    return;
  const n = { handler: t.value, noop, mouseStart(e2) {
    typeof n.handler === "function" && leftClick(e2) === true && (addEvt(n, "temp", [[document, "mousemove", "move", "passiveCapture"], [document, "click", "end", "notPassiveCapture"]]), n.start(e2, true));
  }, touchStart(e2) {
    if (e2.target !== void 0 && typeof n.handler === "function") {
      const t2 = e2.target;
      addEvt(n, "temp", [[t2, "touchmove", "move", "passiveCapture"], [t2, "touchcancel", "end", "notPassiveCapture"], [t2, "touchend", "end", "notPassiveCapture"]]), n.start(e2);
    }
  }, start(e2, t2) {
    n.origin = position(e2);
    const o2 = Date.now();
    client$1.is.mobile === true && (document.body.classList.add("non-selectable"), clearSelection(), n.styleCleanup = (e3) => {
      n.styleCleanup = void 0;
      const t3 = () => {
        document.body.classList.remove("non-selectable");
      };
      e3 === true ? (clearSelection(), setTimeout(t3, 10)) : t3();
    }), n.triggered = false, n.sensitivity = t2 === true ? n.mouseSensitivity : n.touchSensitivity, n.timer = setTimeout(() => {
      clearSelection(), n.triggered = true, n.handler({ evt: e2, touch: t2 !== true, mouse: t2 === true, position: n.origin, duration: Date.now() - o2 });
    }, n.duration);
  }, move(e2) {
    const { top: t2, left: o2 } = position(e2);
    (Math.abs(o2 - n.origin.left) >= n.sensitivity || Math.abs(t2 - n.origin.top) >= n.sensitivity) && clearTimeout(n.timer);
  }, end(e2) {
    cleanEvt(n, "temp"), n.styleCleanup !== void 0 && n.styleCleanup(n.triggered), n.triggered === true ? e2 !== void 0 && stopAndPrevent$1(e2) : clearTimeout(n.timer);
  } }, a = [600, 5, 7];
  typeof t.arg === "string" && t.arg.length > 0 && t.arg.split(":").forEach((e2, t2) => {
    const o2 = parseInt(e2, 10);
    o2 && (a[t2] = o2);
  }), [n.duration, n.touchSensitivity, n.mouseSensitivity] = a, e.__qtouchhold = n, o.mouse === true && addEvt(n, "main", [[e, "mousedown", "mouseStart", `passive${o.mouseCapture === true ? "Capture" : ""}`]]), client$1.has.touch === true && addEvt(n, "main", [[e, "touchstart", "touchStart", `passive${o.capture === true ? "Capture" : ""}`], [e, "touchend", "noop", "notPassiveCapture"]]);
}, updated(e, t) {
  const o = e.__qtouchhold;
  o !== void 0 && t.oldValue !== t.value && (typeof t.value !== "function" && o.end(), o.handler = t.value);
}, beforeUnmount(e) {
  const t = e.__qtouchhold;
  t !== void 0 && (cleanEvt(t, "main"), cleanEvt(t, "temp"), clearTimeout(t.timer), t.styleCleanup !== void 0 && t.styleCleanup(), delete e.__qtouchhold);
} };
const keyCodes = { esc: 27, tab: 9, enter: 13, space: 32, up: 38, left: 37, right: 39, down: 40, delete: [8, 46] }, keyRegex = new RegExp(`^([\\d+]+|${Object.keys(keyCodes).join("|")})$`, "i");
function shouldEnd(e, t) {
  const { top: o, left: n } = position(e);
  return Math.abs(n - t.left) >= 7 || Math.abs(o - t.top) >= 7;
}
var TouchRepeat = { name: "touch-repeat", beforeMount(e, { modifiers: t, value: o, arg: n }) {
  const a = Object.keys(t).reduce((e2, t2) => {
    if (keyRegex.test(t2) === true) {
      const o2 = isNaN(parseInt(t2, 10)) ? keyCodes[t2.toLowerCase()] : parseInt(t2, 10);
      o2 >= 0 && e2.push(o2);
    }
    return e2;
  }, []);
  if (t.mouse !== true && client$1.has.touch !== true && a.length === 0)
    return;
  const l = typeof n === "string" && n.length > 0 ? n.split(":").map((e2) => parseInt(e2, 10)) : [0, 600, 300], i = l.length - 1, r = { keyboard: a, handler: o, noop, mouseStart(e2) {
    r.event === void 0 && typeof r.handler === "function" && leftClick(e2) === true && (addEvt(r, "temp", [[document, "mousemove", "move", "passiveCapture"], [document, "click", "end", "notPassiveCapture"]]), r.start(e2, true));
  }, keyboardStart(t2) {
    if (typeof r.handler === "function" && isKeyCode(t2, a) === true) {
      if ((l[0] === 0 || r.event !== void 0) && (stopAndPrevent$1(t2), e.focus(), r.event !== void 0))
        return;
      addEvt(r, "temp", [[document, "keyup", "end", "notPassiveCapture"], [document, "click", "end", "notPassiveCapture"]]), r.start(t2, false, true);
    }
  }, touchStart(e2) {
    if (e2.target !== void 0 && typeof r.handler === "function") {
      const t2 = e2.target;
      addEvt(r, "temp", [[t2, "touchmove", "move", "passiveCapture"], [t2, "touchcancel", "end", "notPassiveCapture"], [t2, "touchend", "end", "notPassiveCapture"]]), r.start(e2);
    }
  }, start(e2, t2, o2) {
    function n2(e3) {
      r.styleCleanup = void 0, document.documentElement.style.cursor = "";
      const t3 = () => {
        document.body.classList.remove("non-selectable");
      };
      e3 === true ? (clearSelection(), setTimeout(t3, 10)) : t3();
    }
    o2 !== true && (r.origin = position(e2)), client$1.is.mobile === true && (document.body.classList.add("non-selectable"), clearSelection(), r.styleCleanup = n2), r.event = { touch: t2 !== true && o2 !== true, mouse: t2 === true, keyboard: o2 === true, startTime: Date.now(), repeatCount: 0 };
    const a2 = () => {
      if (r.event === void 0)
        return;
      r.event.repeatCount === 0 && (r.event.evt = e2, o2 === true ? r.event.keyCode = e2.keyCode : r.event.position = position(e2), client$1.is.mobile !== true && (document.documentElement.style.cursor = "pointer", document.body.classList.add("non-selectable"), clearSelection(), r.styleCleanup = n2)), r.event.duration = Date.now() - r.event.startTime, r.event.repeatCount += 1, r.handler(r.event);
      const t3 = i < r.event.repeatCount ? i : r.event.repeatCount;
      r.timer = setTimeout(a2, l[t3]);
    };
    l[0] === 0 ? a2() : r.timer = setTimeout(a2, l[0]);
  }, move(e2) {
    r.event !== void 0 && shouldEnd(e2, r.origin) === true && clearTimeout(r.timer);
  }, end(e2) {
    r.event !== void 0 && (r.styleCleanup !== void 0 && r.styleCleanup(true), e2 !== void 0 && r.event.repeatCount > 0 && stopAndPrevent$1(e2), cleanEvt(r, "temp"), clearTimeout(r.timer), r.event = void 0);
  } };
  e.__qtouchrepeat = r, t.mouse === true && addEvt(r, "main", [[e, "mousedown", "mouseStart", `passive${t.mouseCapture === true ? "Capture" : ""}`]]), client$1.has.touch === true && addEvt(r, "main", [[e, "touchstart", "touchStart", `passive${t.capture === true ? "Capture" : ""}`], [e, "touchend", "noop", "notPassiveCapture"]]), a.length > 0 && addEvt(r, "main", [[e, "keydown", "keyboardStart", `notPassive${t.keyCapture === true ? "Capture" : ""}`]]);
}, updated(e, { oldValue: t, value: o }) {
  const n = e.__qtouchrepeat;
  n !== void 0 && t !== o && (typeof o !== "function" && n.end(), n.handler = o);
}, beforeUnmount(e) {
  const t = e.__qtouchrepeat;
  t !== void 0 && (clearTimeout(t.timer), cleanEvt(t, "main"), cleanEvt(t, "temp"), t.styleCleanup !== void 0 && t.styleCleanup(), delete e.__qtouchrepeat);
} }, directives = Object.freeze({ __proto__: null, ClosePopup, Intersection, Morph, Mutation, Ripple, ScrollFire, Scroll, TouchHold, TouchPan, TouchRepeat, TouchSwipe });
function getCssVar(e, t = document.body) {
  if (typeof e !== "string")
    throw new TypeError("Expected a string as propName");
  if (!(t instanceof Element))
    throw new TypeError("Expected a DOM element");
  return getComputedStyle(t).getPropertyValue(`--q-${e}`).trim() || null;
}
let metaValue;
function getProp() {
  return client$1.is.winphone ? "msapplication-navbutton-color" : client$1.is.safari ? "apple-mobile-web-app-status-bar-style" : "theme-color";
}
function getMetaTag(e) {
  const t = document.getElementsByTagName("META");
  for (const o in t)
    if (t[o].name === e)
      return t[o];
}
function setColor(e) {
  metaValue === void 0 && (metaValue = getProp());
  let t = getMetaTag(metaValue);
  const o = t === void 0;
  o && (t = document.createElement("meta"), t.setAttribute("name", metaValue)), t.setAttribute("content", e), o && document.head.appendChild(t);
}
({ set: client$1.is.mobile !== true || client$1.is.nativeMobile !== true && client$1.is.winphone !== true && client$1.is.safari !== true && client$1.is.webkit !== true && client$1.is.vivaldi !== true ? noop : (e) => {
  const t = e || getCssVar("primary");
  client$1.is.nativeMobile === true && window.StatusBar ? window.StatusBar.backgroundColorByHexString(t) : setColor(t);
}, install({ $q: e }) {
  e.addressbarColor = this, e.config.addressbarColor && this.set(e.config.addressbarColor);
} });
const prefixes = {};
function getFullscreenElement() {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
}
function promisify(e, t) {
  try {
    const o = e[t]();
    return o === void 0 ? Promise.resolve() : o;
  } catch (e2) {
    return Promise.reject(e2);
  }
}
const Plugin$5 = defineReactivePlugin({ isActive: false, activeEl: null }, { isCapable: false, request(e) {
  if (Plugin$5.isCapable === true && Plugin$5.isActive === false) {
    const t = e || document.documentElement;
    return promisify(t, prefixes.request);
  }
  return Plugin$5.__getErr();
}, exit() {
  return Plugin$5.isCapable === true && Plugin$5.isActive === true ? promisify(document, prefixes.exit) : Plugin$5.__getErr();
}, toggle(e) {
  return Plugin$5.isActive === true ? Plugin$5.exit() : Plugin$5.request(e);
}, install({ $q: e }) {
  e.fullscreen = this;
} });
{
  let init = function() {
    prefixes.request = ["requestFullscreen", "msRequestFullscreen", "mozRequestFullScreen", "webkitRequestFullscreen"].find((e) => document.documentElement[e] !== void 0), Plugin$5.isCapable = prefixes.request !== void 0, Plugin$5.isCapable !== false ? (Plugin$5.__getErr = () => Promise.resolve(), prefixes.exit = ["exitFullscreen", "msExitFullscreen", "mozCancelFullScreen", "webkitExitFullscreen"].find((e) => document[e]), Plugin$5.isActive = !!getFullscreenElement(), ["onfullscreenchange", "onmsfullscreenchange", "onwebkitfullscreenchange"].forEach((e) => {
      document[e] = () => {
        Plugin$5.isActive = Plugin$5.isActive === false, Plugin$5.isActive === false ? (Plugin$5.activeEl = null, changeGlobalNodesTarget(document.body)) : (Plugin$5.activeEl = getFullscreenElement(), changeGlobalNodesTarget(Plugin$5.activeEl === document.documentElement ? document.body : Plugin$5.activeEl));
      };
    })) : Plugin$5.__getErr = () => Promise.reject("Not capable");
  };
  init();
}
const Plugin$4 = defineReactivePlugin({ appVisible: true }, { install({ $q: e }) {
  Object.defineProperty(e, "appVisible", { get: () => this.appVisible });
} });
{
  let e, t;
  if (typeof document.hidden !== "undefined" ? (e = "hidden", t = "visibilitychange") : typeof document.msHidden !== "undefined" ? (e = "msHidden", t = "msvisibilitychange") : typeof document.webkitHidden !== "undefined" && (e = "webkitHidden", t = "webkitvisibilitychange"), t && typeof document[e] !== "undefined") {
    const o = () => {
      Plugin$4.appVisible = !document[e];
    };
    document.addEventListener(t, o, false);
  }
}
defineComponent({ name: "BottomSheetPlugin", props: __spreadProps(__spreadValues({}, useDarkProps$1), { title: String, message: String, actions: Array, grid: Boolean, cardClass: [String, Array, Object], cardStyle: [String, Array, Object] }), emits: ["ok", "hide"], setup(e, { emit: t }) {
  const { proxy: o } = getCurrentInstance(), n = useDark$1(e, o.$q), a = ref(null);
  function l() {
    a.value.show();
  }
  function i() {
    a.value.hide();
  }
  function r(e2) {
    t("ok", e2), i();
  }
  function s() {
    t("hide");
  }
  function u() {
    return e.actions.map((e2) => {
      const t2 = e2.avatar || e2.img;
      return e2.label === void 0 ? h(QSeparator, { class: "col-all", dark: n.value }) : h("div", { class: ["q-bottom-sheet__item q-hoverable q-focusable cursor-pointer relative-position", e2.class], tabindex: 0, onClick() {
        r(e2);
      }, onKeyup(t3) {
        t3.keyCode === 13 && r(e2);
      } }, [h("div", { class: "q-focus-helper" }), e2.icon ? h(QIcon$1, { name: e2.icon, color: e2.color }) : t2 ? h("img", { class: e2.avatar ? "q-bottom-sheet__avatar" : "", src: t2 }) : h("div", { class: "q-bottom-sheet__empty-icon" }), h("div", e2.label)]);
    });
  }
  function c() {
    return e.actions.map((e2) => {
      const t2 = e2.avatar || e2.img;
      return e2.label === void 0 ? h(QSeparator, { spaced: true, dark: n.value }) : h(QItem, { class: ["q-bottom-sheet__item", e2.classes], tabindex: 0, clickable: true, dark: n.value, onClick() {
        r(e2);
      }, onKeyup(t3) {
        t3.keyCode === 13 && r(e2);
      } }, () => [h(QItemSection, { avatar: true }, () => e2.icon ? h(QIcon$1, { name: e2.icon, color: e2.color }) : t2 ? h("img", { class: e2.avatar ? "q-bottom-sheet__avatar" : "", src: t2 }) : null), h(QItemSection, () => e2.label)]);
    });
  }
  function d() {
    const t2 = [];
    return e.title && t2.push(h(QCardSection, { class: "q-dialog__title" }, () => e.title)), e.message && t2.push(h(QCardSection, { class: "q-dialog__message" }, () => e.message)), t2.push(e.grid === true ? h("div", { class: "row items-stretch justify-start" }, u()) : h("div", c())), t2;
  }
  function p2() {
    return [h(QCard, { class: [`q-bottom-sheet q-bottom-sheet--${e.grid === true ? "grid" : "list"}` + (n.value === true ? " q-bottom-sheet--dark q-dark" : ""), e.cardClass], style: e.cardStyle }, d)];
  }
  return Object.assign(o, { show: l, hide: i }), () => h(QDialog, { ref: a, position: "bottom", onHide: s }, p2);
} });
function encode$1(e) {
  return encodeURIComponent(e);
}
function decode$1(e) {
  return decodeURIComponent(e);
}
function stringifyCookieValue(e) {
  return encode$1(e === Object(e) ? JSON.stringify(e) : "" + e);
}
function read(e) {
  if (e === "")
    return e;
  e.indexOf('"') === 0 && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")), e = decode$1(e.replace(/\+/g, " "));
  try {
    e = JSON.parse(e);
  } catch (e2) {
  }
  return e;
}
function getString(e) {
  const t = new Date();
  return t.setMilliseconds(t.getMilliseconds() + e), t.toUTCString();
}
function parseExpireString(e) {
  let t = 0;
  const o = e.match(/(\d+)d/), n = e.match(/(\d+)h/), a = e.match(/(\d+)m/), l = e.match(/(\d+)s/);
  return o && (t += 864e5 * o[1]), n && (t += 36e5 * n[1]), a && (t += 6e4 * a[1]), l && (t += 1e3 * l[1]), t === 0 ? e : getString(t);
}
function set(e, t, o = {}, n) {
  let a, l;
  o.expires !== void 0 && (Object.prototype.toString.call(o.expires) === "[object Date]" ? a = o.expires.toUTCString() : typeof o.expires === "string" ? a = parseExpireString(o.expires) : (l = parseFloat(o.expires), a = isNaN(l) === false ? getString(864e5 * l) : o.expires));
  const i = `${encode$1(e)}=${stringifyCookieValue(t)}`, r = [i, a !== void 0 ? "; Expires=" + a : "", o.path ? "; Path=" + o.path : "", o.domain ? "; Domain=" + o.domain : "", o.sameSite ? "; SameSite=" + o.sameSite : "", o.httpOnly ? "; HttpOnly" : "", o.secure ? "; Secure" : "", o.other ? "; " + o.other : ""].join("");
  if (n) {
    n.req.qCookies ? n.req.qCookies.push(r) : n.req.qCookies = [r], n.res.setHeader("Set-Cookie", n.req.qCookies);
    let t2 = n.req.headers.cookie || "";
    if (a !== void 0 && l < 0) {
      const o2 = get(e, n);
      o2 !== void 0 && (t2 = t2.replace(`${e}=${o2}; `, "").replace(`; ${e}=${o2}`, "").replace(`${e}=${o2}`, ""));
    } else
      t2 = t2 ? `${i}; ${t2}` : r;
    n.req.headers.cookie = t2;
  } else
    document.cookie = r;
}
function get(e, t) {
  const o = t ? t.req.headers : document, n = o.cookie ? o.cookie.split("; ") : [], a = n.length;
  let l, i, r, s = e ? null : {}, u = 0;
  for (; u < a; u++)
    if (l = n[u].split("="), i = decode$1(l.shift()), r = l.join("="), e) {
      if (e === i) {
        s = read(r);
        break;
      }
    } else
      s[i] = r;
  return s;
}
function remove(e, t, o) {
  set(e, "", __spreadValues({ expires: -1 }, t), o);
}
function has(e, t) {
  return get(e, t) !== null;
}
function getObject(e) {
  return { get: (t) => get(t, e), set: (t, o, n) => set(t, o, n, e), has: (t) => has(t, e), remove: (t, o) => remove(t, o, e), getAll: () => get(null, e) };
}
const Plugin$3 = { install({ $q: e, ssrContext: t }) {
  e.cookies = this;
} };
Object.assign(Plugin$3, getObject());
defineComponent({ name: "DialogPlugin", props: __spreadProps(__spreadValues({}, useDarkProps$1), { title: String, message: String, prompt: Object, options: Object, progress: [Boolean, Object], html: Boolean, ok: { type: [String, Object, Boolean], default: true }, cancel: [String, Object, Boolean], focus: { type: String, default: "ok", validator: (e) => ["ok", "cancel", "none"].includes(e) }, stackButtons: Boolean, color: String, cardClass: [String, Array, Object], cardStyle: [String, Array, Object] }), emits: ["ok", "hide"], setup(e, { emit: t }) {
  const { proxy: o } = getCurrentInstance(), { $q: n } = o, a = useDark$1(e, n), l = ref(null), i = ref(e.prompt !== void 0 ? e.prompt.model : e.options !== void 0 ? e.options.model : void 0), r = computed(() => "q-dialog-plugin" + (a.value === true ? " q-dialog-plugin--dark q-dark" : "") + (e.progress !== false ? " q-dialog-plugin--progress" : "")), s = computed(() => e.color || (a.value === true ? "amber" : "primary")), u = computed(() => e.progress === false ? null : Object(e.progress) === e.progress ? { component: e.progress.spinner || QSpinner$1, props: { color: e.progress.color || s.value } } : { component: QSpinner$1, props: { color: s.value } }), c = computed(() => e.prompt !== void 0 || e.options !== void 0), d = computed(() => {
    if (c.value !== true)
      return {};
    const _a = e.prompt !== void 0 ? e.prompt : e.options, { model: t2, isValid: o2, items: n2 } = _a, a2 = __objRest(_a, ["model", "isValid", "items"]);
    return a2;
  }), p2 = computed(() => Object(e.ok) === e.ok ? n.lang.label.ok : e.ok === true ? n.lang.label.ok : e.ok), v = computed(() => Object(e.cancel) === e.cancel ? n.lang.label.cancel : e.cancel === true ? n.lang.label.cancel : e.cancel), m = computed(() => {
    return e.prompt !== void 0 ? e.prompt.isValid !== void 0 && e.prompt.isValid(i.value) !== true : e.options !== void 0 && (e.options.isValid !== void 0 && e.options.isValid(i.value) !== true);
  }), f = computed(() => __spreadProps(__spreadValues({ color: s.value, label: p2.value, ripple: false }, Object(e.ok) === e.ok ? e.ok : { flat: true }), { disable: m.value, "data-autofocus": e.focus === "ok" && c.value !== true || void 0, onClick: S })), g = computed(() => __spreadProps(__spreadValues({ color: s.value, label: v.value, ripple: false }, Object(e.cancel) === e.cancel ? e.cancel : { flat: true }), { "data-autofocus": e.focus === "cancel" && c.value !== true || void 0, onClick: w }));
  function b() {
    l.value.show();
  }
  function y() {
    l.value.hide();
  }
  function S() {
    t("ok", toRaw(i.value)), y();
  }
  function w() {
    y();
  }
  function x() {
    t("hide");
  }
  function C(e2) {
    i.value = e2;
  }
  function k(t2) {
    m.value !== true && e.prompt.type !== "textarea" && isKeyCode(t2, 13) === true && S();
  }
  function _(t2, o2) {
    return e.html === true ? h(QCardSection, { class: t2, innerHTML: o2 }) : h(QCardSection, { class: t2 }, () => o2);
  }
  function q() {
    return [h(QInput$1, __spreadProps(__spreadValues({ modelValue: i.value }, d.value), { color: s.value, dense: true, autofocus: true, dark: a.value, "onUpdate:modelValue": C, onKeyup: k }))];
  }
  function T() {
    return [h(QOptionGroup, __spreadProps(__spreadValues({ modelValue: i.value }, d.value), { color: s.value, options: e.options.items, dark: a.value, "onUpdate:modelValue": C }))];
  }
  function P() {
    const t2 = [];
    return e.cancel && t2.push(h(QBtn, g.value)), e.ok && t2.push(h(QBtn, f.value)), h(QCardActions, { class: e.stackButtons === true ? "items-end" : "", vertical: e.stackButtons, align: "right" }, () => t2);
  }
  function $() {
    const t2 = [];
    return e.title && t2.push(_("q-dialog__title", e.title)), e.progress !== false && t2.push(h(QCardSection, { class: "q-dialog__progress" }, () => h(u.value.component, u.value.props))), e.message && t2.push(_("q-dialog__message", e.message)), e.prompt !== void 0 ? t2.push(h(QCardSection, { class: "scroll q-dialog-plugin__form" }, q)) : e.options !== void 0 && t2.push(h(QSeparator, { dark: a.value }), h(QCardSection, { class: "scroll q-dialog-plugin__form" }, T), h(QSeparator, { dark: a.value })), (e.ok || e.cancel) && t2.push(P()), t2;
  }
  function M() {
    return [h(QCard, { class: [r.value, e.cardClass], style: e.cardStyle, dark: a.value }, $)];
  }
  return watch(() => e.prompt && e.prompt.model, C), watch(() => e.options && e.options.model, C), Object.assign(o, { show: b, hide: y }), () => h(QDialog, { ref: l, onHide: x }, M);
} });
const reqProps = { ref: "bar" };
defineReactivePlugin({ isActive: false }, { start: noop, stop: noop, increment: noop, setDefaults: noop, install({ $q: e, parentApp: t }) {
  if (e.loadingBar = this, this.__installed === true)
    return void (e.config.loadingBar !== void 0 && this.setDefaults(e.config.loadingBar));
  const o = ref(e.config.loadingBar !== void 0 ? __spreadValues(__spreadValues({}, e.config.loadingBar), reqProps) : __spreadValues({}, reqProps)), n = createGlobalNode("q-loading-bar"), a = createChildApp({ name: "LoadingBar", devtools: { hide: true }, setup: () => () => h(QAjaxBar, o.value) }, t).mount(n);
  Object.assign(this, { start: (e2) => {
    const t2 = a.$refs.bar;
    t2.start(e2), this.isActive = t2.calls > 0;
  }, stop: () => {
    const e2 = a.$refs.bar;
    e2.stop(), this.isActive = e2.calls > 0;
  }, increment() {
    const e2 = a.$refs.bar;
    e2.increment.apply(null, arguments);
  }, setDefaults: (e2) => {
    e2 === Object(e2) && (o.value = __spreadValues(__spreadValues(__spreadValues({}, o.value), e2), reqProps));
  } });
} });
let app, vm, timeout, uid$1 = 0, props = {};
const originalDefaults = { delay: 0, message: false, html: false, spinnerSize: 80, spinnerColor: "", messageColor: "", backgroundColor: "", boxClass: "", spinner: QSpinner$1, customClass: "" }, defaults$1 = __spreadValues({}, originalDefaults), Plugin$2 = defineReactivePlugin({ isActive: false }, { show(e) {
  if (props = e === Object(e) && e.ignoreDefaults === true ? __spreadValues(__spreadValues({}, originalDefaults), e) : __spreadValues(__spreadValues({}, defaults$1), e), Plugin$2.isActive = true, app !== void 0)
    return props.uid = uid$1, void vm.$forceUpdate();
  props.uid = ++uid$1, clearTimeout(timeout), timeout = setTimeout(() => {
    timeout = void 0;
    const e2 = createGlobalNode("q-loading");
    app = createApp({ name: "QLoading", setup() {
      function t() {
        Plugin$2.isActive !== true && app !== void 0 && (preventScroll(false), app.unmount(e2), removeGlobalNode(e2), app = void 0, vm = void 0);
      }
      function o() {
        if (Plugin$2.isActive !== true)
          return null;
        const e3 = [h(props.spinner, { class: "q-loading__spinner", color: props.spinnerColor, size: props.spinnerSize })];
        return props.message && e3.push(h("div", { class: "q-loading__message" + (props.messageColor ? ` text-${props.messageColor}` : ""), [props.html === true ? "innerHTML" : "textContent"]: props.message })), h("div", { class: "q-loading fullscreen flex flex-center z-max " + props.customClass.trim(), key: props.uid }, [h("div", { class: "q-loading__backdrop" + (props.backgroundColor ? ` bg-${props.backgroundColor}` : "") }), h("div", { class: "q-loading__box column items-center " + props.boxClass }, e3)]);
      }
      return onMounted(() => {
        preventScroll(true);
      }), () => h(Transition, { name: "q-transition--fade", appear: true, onAfterLeave: t }, o);
    } }), vm = app.mount(e2);
  }, props.delay);
}, hide() {
  Plugin$2.isActive === true && (timeout !== void 0 && (clearTimeout(timeout), timeout = void 0), Plugin$2.isActive = false);
}, setDefaults(e) {
  e === Object(e) && Object.assign(defaults$1, e);
}, install({ $q: e }) {
  e.loading = this, e.config.loading !== void 0 && this.setDefaults(e.config.loading);
} });
function encode(e) {
  return Object.prototype.toString.call(e) === "[object Date]" ? "__q_date|" + e.toUTCString() : Object.prototype.toString.call(e) === "[object RegExp]" ? "__q_expr|" + e.source : typeof e === "number" ? "__q_numb|" + e : typeof e === "boolean" ? "__q_bool|" + (e ? "1" : "0") : typeof e === "string" ? "__q_strn|" + e : typeof e === "function" ? "__q_strn|" + e.toString() : e === Object(e) ? "__q_objt|" + JSON.stringify(e) : e;
}
function decode(e) {
  const t = e.length;
  if (t < 9)
    return e;
  const o = e.substr(0, 8), n = e.substring(9);
  switch (o) {
    case "__q_date":
      return new Date(n);
    case "__q_expr":
      return new RegExp(n);
    case "__q_numb":
      return Number(n);
    case "__q_bool":
      return Boolean(n === "1");
    case "__q_strn":
      return "" + n;
    case "__q_objt":
      return JSON.parse(n);
    default:
      return e;
  }
}
function getEmptyStorage() {
  const e = () => null;
  return { has: () => false, getLength: () => 0, getItem: e, getIndex: e, getKey: e, getAll: () => {
  }, getAllKeys: () => [], set: noop, remove: noop, clear: noop, isEmpty: () => true };
}
function getStorage(e) {
  const t = window[e + "Storage"], o = (e2) => {
    const o2 = t.getItem(e2);
    return o2 ? decode(o2) : null;
  };
  return { has: (e2) => t.getItem(e2) !== null, getLength: () => t.length, getItem: o, getIndex: (e2) => {
    return e2 < t.length ? o(t.key(e2)) : null;
  }, getKey: (e2) => {
    return e2 < t.length ? t.key(e2) : null;
  }, getAll: () => {
    let e2;
    const n = {}, a = t.length;
    for (let l = 0; l < a; l++)
      e2 = t.key(l), n[e2] = o(e2);
    return n;
  }, getAllKeys: () => {
    const e2 = [], o2 = t.length;
    for (let n = 0; n < o2; n++)
      e2.push(t.key(n));
    return e2;
  }, set: (e2, o2) => {
    t.setItem(e2, encode(o2));
  }, remove: (e2) => {
    t.removeItem(e2);
  }, clear: () => {
    t.clear();
  }, isEmpty: () => t.length === 0 };
}
const storage$1 = client$1.has.webStorage === false ? getEmptyStorage() : getStorage("local"), Plugin$1 = { install({ $q: e }) {
  e.localStorage = storage$1;
} };
Object.assign(Plugin$1, storage$1);
const storage = client$1.has.webStorage === false ? getEmptyStorage() : getStorage("session"), Plugin = { install({ $q: e }) {
  e.sessionStorage = storage;
} };
Object.assign(Plugin, storage);
const Quasar = { version: "2.2.2", install(e, t, o) {
  installQuasar(e, __spreadValues({ components, directives }, t));
}, lang: Plugin$7, iconSet: Plugin$6 };
const isRuntimeSsrPreHydration = ref(false);
let iosCorrection;
function getMatch(userAgent2, platformMatch) {
  const match = /(edge|edga|edgios)\/([\w.]+)/.exec(userAgent2) || /(opr)[\/]([\w.]+)/.exec(userAgent2) || /(vivaldi)[\/]([\w.]+)/.exec(userAgent2) || /(chrome|crios)[\/]([\w.]+)/.exec(userAgent2) || /(iemobile)[\/]([\w.]+)/.exec(userAgent2) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent2) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent2) || /(firefox|fxios)[\/]([\w.]+)/.exec(userAgent2) || /(webkit)[\/]([\w.]+)/.exec(userAgent2) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(userAgent2) || /(msie) ([\w.]+)/.exec(userAgent2) || userAgent2.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(userAgent2) || userAgent2.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent2) || [];
  return {
    browser: match[5] || match[3] || match[1] || "",
    version: match[2] || match[4] || "0",
    versionNumber: match[4] || match[2] || "0",
    platform: platformMatch[0] || ""
  };
}
function getPlatformMatch(userAgent2) {
  return /(ipad)/.exec(userAgent2) || /(ipod)/.exec(userAgent2) || /(windows phone)/.exec(userAgent2) || /(iphone)/.exec(userAgent2) || /(kindle)/.exec(userAgent2) || /(silk)/.exec(userAgent2) || /(android)/.exec(userAgent2) || /(win)/.exec(userAgent2) || /(mac)/.exec(userAgent2) || /(linux)/.exec(userAgent2) || /(cros)/.exec(userAgent2) || /(playbook)/.exec(userAgent2) || /(bb)/.exec(userAgent2) || /(blackberry)/.exec(userAgent2) || [];
}
const hasTouch = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function applyIosCorrection(is) {
  iosCorrection = { is: __spreadValues({}, is) };
  delete is.mac;
  delete is.desktop;
  const platform = Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
  Object.assign(is, {
    mobile: true,
    ios: true,
    platform,
    [platform]: true
  });
}
function getPlatform(UA) {
  const userAgent2 = UA.toLowerCase(), platformMatch = getPlatformMatch(userAgent2), matched = getMatch(userAgent2, platformMatch), browser = {};
  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.versionNumber, 10);
  }
  if (matched.platform) {
    browser[matched.platform] = true;
  }
  const knownMobiles = browser.android || browser.ios || browser.bb || browser.blackberry || browser.ipad || browser.iphone || browser.ipod || browser.kindle || browser.playbook || browser.silk || browser["windows phone"];
  if (knownMobiles === true || userAgent2.indexOf("mobile") > -1) {
    browser.mobile = true;
    if (browser.edga || browser.edgios) {
      browser.edge = true;
      matched.browser = "edge";
    } else if (browser.crios) {
      browser.chrome = true;
      matched.browser = "chrome";
    } else if (browser.fxios) {
      browser.firefox = true;
      matched.browser = "firefox";
    }
  } else {
    browser.desktop = true;
  }
  if (browser.ipod || browser.ipad || browser.iphone) {
    browser.ios = true;
  }
  if (browser["windows phone"]) {
    browser.winphone = true;
    delete browser["windows phone"];
  }
  if (browser.chrome || browser.opr || browser.safari || browser.vivaldi || browser.mobile === true && browser.ios !== true && knownMobiles !== true) {
    browser.webkit = true;
  }
  if (browser.safari && browser.blackberry || browser.bb) {
    matched.browser = "blackberry";
    browser.blackberry = true;
  }
  if (browser.safari && browser.playbook) {
    matched.browser = "playbook";
    browser.playbook = true;
  }
  if (browser.opr) {
    matched.browser = "opera";
    browser.opera = true;
  }
  if (browser.safari && browser.android) {
    matched.browser = "android";
    browser.android = true;
  }
  if (browser.safari && browser.kindle) {
    matched.browser = "kindle";
    browser.kindle = true;
  }
  if (browser.safari && browser.silk) {
    matched.browser = "silk";
    browser.silk = true;
  }
  if (browser.vivaldi) {
    matched.browser = "vivaldi";
    browser.vivaldi = true;
  }
  browser.name = matched.browser;
  browser.platform = matched.platform;
  {
    if (userAgent2.indexOf("electron") > -1) {
      browser.electron = true;
    } else if (document.location.href.indexOf("-extension://") > -1) {
      browser.bex = true;
    } else {
      if (window.Capacitor !== void 0) {
        browser.capacitor = true;
        browser.nativeMobile = true;
        browser.nativeMobileWrapper = "capacitor";
      } else if (window._cordovaNative !== void 0 || window.cordova !== void 0) {
        browser.cordova = true;
        browser.nativeMobile = true;
        browser.nativeMobileWrapper = "cordova";
      }
      if (hasTouch === true && browser.mac === true && (browser.desktop === true && browser.safari === true || browser.nativeMobile === true && browser.android !== true && browser.ios !== true && browser.ipad !== true)) {
        applyIosCorrection(browser);
      }
    }
  }
  return browser;
}
const userAgent = navigator.userAgent || navigator.vendor || window.opera;
const ssrClient = {
  has: {
    touch: false,
    webStorage: false
  },
  within: { iframe: false }
};
const client = {
  userAgent,
  is: getPlatform(userAgent),
  has: {
    touch: hasTouch
  },
  within: {
    iframe: window.self !== window.top
  }
};
const Platform = {
  install(opts) {
    const { $q } = opts;
    if (isRuntimeSsrPreHydration.value === true) {
      opts.onSSRHydrated.push(() => {
        isRuntimeSsrPreHydration.value = false;
        Object.assign($q.platform, client);
        iosCorrection = void 0;
      });
      $q.platform = reactive(this);
    } else {
      $q.platform = this;
    }
  }
};
{
  let hasWebStorage;
  Object.defineProperty(client.has, "webStorage", {
    get: () => {
      if (hasWebStorage !== void 0) {
        return hasWebStorage;
      }
      try {
        if (window.localStorage) {
          hasWebStorage = true;
          return true;
        }
      } catch (e) {
      }
      hasWebStorage = false;
      return false;
    }
  });
  client.is.ios === true && window.navigator.vendor.toLowerCase().indexOf("apple") === -1;
  if (isRuntimeSsrPreHydration.value === true) {
    Object.assign(Platform, client, iosCorrection, ssrClient);
  } else {
    Object.assign(Platform, client);
  }
}
const useSizeDefaults = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
};
const useSizeProps = {
  size: String
};
function useSize(props2, sizes = useSizeDefaults) {
  return computed(() => props2.size !== void 0 ? { fontSize: props2.size in sizes ? `${sizes[props2.size]}px` : props2.size } : null);
}
function hSlot(slot, otherwise) {
  return slot !== void 0 ? slot() || otherwise : otherwise;
}
function hMergeSlot(slot, source) {
  return slot !== void 0 ? source.concat(slot()) : source;
}
const sameFn = (i) => i;
const ionFn = (i) => `ionicons ${i}`;
const libMap = {
  "icon-": sameFn,
  "bt-": (i) => `bt ${i}`,
  "eva-": (i) => `eva ${i}`,
  "ion-md": ionFn,
  "ion-ios": ionFn,
  "ion-logo": ionFn,
  "mdi-": (i) => `mdi ${i}`,
  "iconfont ": sameFn,
  "ti-": (i) => `themify-icon ${i}`,
  "bi-": (i) => `bootstrap-icons ${i}`
};
const matMap = {
  o_: "-outlined",
  r_: "-round",
  s_: "-sharp"
};
const libRE = new RegExp("^(" + Object.keys(libMap).join("|") + ")");
const matRE = new RegExp("^(" + Object.keys(matMap).join("|") + ")");
const mRE = /^M/;
const imgRE = /^img:/;
const svgUseRE = /^svguse:/;
const ionRE = /^ion-/;
const faLaRE = /^[l|f]a[s|r|l|b|d]? /;
var QIcon = defineComponent({
  name: "QIcon",
  props: __spreadProps(__spreadValues({}, useSizeProps), {
    tag: {
      type: String,
      default: "i"
    },
    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  }),
  setup(props2, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props2);
    const classes = computed(() => "q-icon" + (props2.left === true ? " on-left" : "") + (props2.right === true ? " on-right" : "") + (props2.color !== void 0 ? ` text-${props2.color}` : ""));
    const type2 = computed(() => {
      let cls;
      let icon = props2.name;
      if (!icon) {
        return {
          none: true,
          cls: classes.value
        };
      }
      if ($q.iconMapFn !== null) {
        const res = $q.iconMapFn(icon);
        if (res !== void 0) {
          if (res.icon !== void 0) {
            icon = res.icon;
          } else {
            return {
              cls: res.cls + " " + classes.value,
              content: res.content !== void 0 ? res.content : " "
            };
          }
        }
      }
      if (mRE.test(icon) === true) {
        const [def2, viewBox] = icon.split("|");
        return {
          svg: true,
          cls: classes.value,
          nodes: def2.split("&&").map((path) => {
            const [d, style, transform] = path.split("@@");
            return h("path", {
              style,
              d,
              transform
            });
          }),
          viewBox: viewBox !== void 0 ? viewBox : "0 0 24 24"
        };
      }
      if (imgRE.test(icon) === true) {
        return {
          img: true,
          cls: classes.value,
          src: icon.substring(4)
        };
      }
      if (svgUseRE.test(icon) === true) {
        const [def2, viewBox] = icon.split("|");
        return {
          svguse: true,
          cls: classes.value,
          src: def2.substring(7),
          viewBox: viewBox !== void 0 ? viewBox : "0 0 24 24"
        };
      }
      let content = " ";
      const matches2 = icon.match(libRE);
      if (matches2 !== null) {
        cls = libMap[matches2[1]](icon);
      } else if (faLaRE.test(icon) === true) {
        cls = icon;
      } else if (ionRE.test(icon) === true) {
        cls = `ionicons ion-${$q.platform.is.ios === true ? "ios" : "md"}${icon.substr(3)}`;
      } else {
        cls = "notranslate material-icons";
        const matches3 = icon.match(matRE);
        if (matches3 !== null) {
          icon = icon.substring(2);
          cls += matMap[matches3[1]];
        }
        content = icon;
      }
      return {
        cls: cls + " " + classes.value,
        content
      };
    });
    return () => {
      const data = {
        class: type2.value.cls,
        style: sizeStyle.value,
        "aria-hidden": "true",
        role: "presentation"
      };
      if (type2.value.none === true) {
        return h(props2.tag, data, hSlot(slots.default));
      }
      if (type2.value.img === true) {
        data.src = type2.value.src;
        return h("img", data);
      }
      if (type2.value.svg === true) {
        data.viewBox = type2.value.viewBox;
        return h("svg", data, hMergeSlot(slots.default, type2.value.nodes));
      }
      if (type2.value.svguse === true) {
        data.viewBox = type2.value.viewBox;
        return h("svg", data, hMergeSlot(slots.default, [h("use", { "xlink:href": type2.value.src })]));
      }
      return h(props2.tag, data, hMergeSlot(slots.default, [
        type2.value.content
      ]));
    };
  }
});
const useSpinnerProps = {
  size: {
    type: [Number, String],
    default: "1em"
  },
  color: String
};
function useSpinner(props2) {
  return {
    cSize: computed(() => props2.size in useSizeDefaults ? `${useSizeDefaults[props2.size]}px` : props2.size),
    classes: computed(() => "q-spinner" + (props2.color ? ` text-${props2.color}` : ""))
  };
}
var QSpinner = defineComponent({
  name: "QSpinner",
  props: __spreadProps(__spreadValues({}, useSpinnerProps), {
    thickness: {
      type: Number,
      default: 5
    }
  }),
  setup(props2) {
    const { cSize, classes } = useSpinner(props2);
    return () => h("svg", {
      class: classes.value + " q-spinner-mat",
      width: cSize.value,
      height: cSize.value,
      viewBox: "25 25 50 50"
    }, [
      h("circle", {
        class: "path",
        cx: "50",
        cy: "50",
        r: "20",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props2.thickness,
        "stroke-miterlimit": "10"
      })
    ]);
  }
});
const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};
function useDark(props2, $q) {
  return computed(() => props2.dark === null ? $q.dark.isActive : props2.dark);
}
const formKey = "_q_fo_";
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props: props2, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props2.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    props2.disable !== true && $form.bindComponent(proxy);
    onBeforeUnmount(() => {
      props2.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props: props2, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(null);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(() => props2.rules !== void 0 && props2.rules !== null && props2.rules.length > 0);
  const hasError = computed(() => props2.error === true || innerError.value === true);
  const computedErrorMessage = computed(() => typeof props2.errorMessage === "string" && props2.errorMessage.length > 0 ? props2.errorMessage : innerErrorMessage.value);
  watch(() => props2.modelValue, () => {
    validateIfNeeded();
  });
  watch(() => props2.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props2.rules, () => {
          validateIfNeeded(true);
        });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(focused, (val) => {
    if (props2.lazyRules !== "ondemand") {
      if (val === true) {
        if (isDirtyModel.value === null) {
          isDirtyModel.value = false;
        }
      } else if (isDirtyModel.value === false && hasRules.value === true) {
        isDirtyModel.value = true;
        validate();
      }
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = null;
    innerError.value = false;
    innerErrorMessage.value = null;
  }
  function validate(val = props2.modelValue) {
    if (hasRules.value !== true) {
      return true;
    }
    validateIndex++;
    if (innerLoading.value !== true && props2.lazyRules !== true) {
      isDirtyModel.value = true;
    }
    const update2 = (err, msg) => {
      if (innerError.value !== err) {
        innerError.value = err;
      }
      const m = msg || void 0;
      if (innerErrorMessage.value !== m) {
        innerErrorMessage.value = m;
      }
      if (innerLoading.value !== false) {
        innerLoading.value = false;
      }
    };
    const promises = [];
    for (let i = 0; i < props2.rules.length; i++) {
      const rule = props2.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update2(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update2(false);
      return true;
    }
    if (innerLoading.value !== true) {
      innerLoading.value = true;
    }
    const index = validateIndex;
    return Promise.all(promises).then((res) => {
      if (index !== validateIndex) {
        return true;
      }
      if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
        update2(false);
        return true;
      }
      const msg = res.find((r) => r === false || typeof r === "string");
      update2(msg !== void 0, msg);
      return msg === void 0;
    }, (e) => {
      if (index === validateIndex) {
        console.error(e);
        update2(true);
        return false;
      }
      return true;
    });
  }
  function validateIfNeeded(changedRules) {
    if (hasRules.value === true && props2.lazyRules !== "ondemand" && (isDirtyModel.value === true || props2.lazyRules !== true && changedRules !== true)) {
      validate();
    }
  }
  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
  });
  Object.assign(proxy, { resetValidation, validate });
  Object.defineProperty(proxy, "hasError", {
    get: () => hasError.value
  });
  return {
    isDirtyModel,
    hasRules,
    hasError,
    computedErrorMessage,
    validate,
    resetValidation
  };
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs(attrs) {
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update2() {
    const listeners = {};
    const attributes = {};
    Object.keys(attrs).forEach((key) => {
      if (listenerRE.test(key) === true) {
        listeners[key] = attrs[key];
      } else if (key !== "class" && key !== "style") {
        attributes[key] = attrs[key];
      }
    });
    acc.listeners.value = listeners;
    acc.attributes.value = attributes;
  }
  onBeforeUpdate(update2);
  update2();
  return acc;
}
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substr(1);
}
const randomBytes = (() => {
  const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes;
    }
    if (lib.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uid() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
}
const listenOpts = {
  hasPassive: false,
  passiveCapture: true,
  notPassiveCapture: true
};
try {
  const opts = Object.defineProperty({}, "passive", {
    get() {
      Object.assign(listenOpts, {
        hasPassive: true,
        passive: { passive: true },
        notPassive: { passive: false },
        passiveCapture: { passive: true, capture: true },
        notPassiveCapture: { passive: false, capture: true }
      });
    }
  });
  window.addEventListener("qtest", null, opts);
  window.removeEventListener("qtest", null, opts);
} catch (e) {
}
function stop(e) {
  e.stopPropagation();
}
function prevent(e) {
  e.cancelable !== false && e.preventDefault();
}
function stopAndPrevent(e) {
  e.cancelable !== false && e.preventDefault();
  e.stopPropagation();
}
const waitFlags = [];
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    return fn;
  }
}
function getTargetUid(val) {
  return val === void 0 ? `f_${uid()}` : val;
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length > 0;
}
const useFieldProps = __spreadProps(__spreadValues(__spreadValues({}, useDarkProps), useValidateProps), {
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String,
  maxlength: [Number, String]
});
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popup-show", "popup-hide"];
function useFieldState() {
  const { props: props2, attrs, proxy } = getCurrentInstance();
  const isDark = useDark(props2, proxy.$q);
  return {
    isDark,
    editable: computed(() => props2.disable !== true && props2.readonly !== true),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: ref(false),
    splitAttrs: useSplitAttrs(attrs),
    targetUid: ref(getTargetUid(props2.for)),
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
  };
}
function useField(state) {
  const { props: props2, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props2.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value2) => {
      emit("update:modelValue", value2);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props2.counter !== false) {
        const len = typeof props2.modelValue === "string" || typeof props2.modelValue === "number" ? ("" + props2.modelValue).length : Array.isArray(props2.modelValue) === true ? props2.modelValue.length : 0;
        const max = props2.maxlength !== void 0 ? props2.maxlength : props2.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    computedErrorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props2.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props2.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(() => props2.bottomSlots === true || props2.hint !== void 0 || hasRules.value === true || props2.counter === true || props2.error !== null);
  const styleType = computed(() => {
    if (props2.filled === true) {
      return "filled";
    }
    if (props2.outlined === true) {
      return "outlined";
    }
    if (props2.borderless === true) {
      return "borderless";
    }
    if (props2.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(() => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props2.rounded === true ? " q-field--rounded" : "") + (props2.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props2.dense === true ? " q-field--dense" : "") + (props2.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props2.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props2.disable === true ? " q-field--disabled" : props2.readonly === true ? " q-field--readonly" : ""));
  const contentClass = computed(() => "q-field__control relative-position row no-wrap" + (props2.bgColor !== void 0 ? ` bg-${props2.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props2.standout === "string" && props2.standout.length > 0 && state.focused.value === true ? ` ${props2.standout}` : props2.color !== void 0 ? ` text-${props2.color}` : ""));
  const hasLabel = computed(() => props2.labelSlot === true || props2.label !== void 0);
  const labelClass = computed(() => "q-field__label no-pointer-events absolute ellipsis" + (props2.labelColor !== void 0 && hasError.value !== true ? ` text-${props2.labelColor}` : ""));
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props2.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {
      for: state.targetUid.value
    };
    if (props2.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props2.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  watch(() => props2.for, (val) => {
    state.targetUid.value = getTargetUid(val);
  });
  function focus() {
    addFocusFn(() => {
      const el = document.activeElement;
      let target2 = state.targetRef !== void 0 && state.targetRef.value;
      if (target2 && (el === null || el.id !== state.targetUid.value)) {
        target2.hasAttribute("tabindex") === true || (target2 = target2.querySelector("[tabindex]"));
        if (target2 && target2 !== el) {
          target2.focus();
        }
      }
    });
  }
  function blur() {
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      if (document.hasFocus() === true && (state.hasPopupOpen.value === true || state.controlRef !== void 0 && (state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false))) {
        return;
      }
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props2.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    emit("clear", props2.modelValue);
    nextTick(() => {
      resetValidation();
      if (props2.lazyRules !== "ondemand" && $q.platform.is.mobile !== true) {
        isDirtyModel.value = false;
      }
    });
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(h("div", {
      class: "q-field__prepend q-field__marginal row no-wrap items-center",
      key: "prepend",
      onClick: prevent
    }, slots.prepend()));
    node.push(h("div", {
      class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
    }, getControlContainer()));
    slots.append !== void 0 && node.push(h("div", {
      class: "q-field__append q-field__marginal row no-wrap items-center",
      key: "append",
      onClick: prevent
    }, slots.append()));
    hasError.value === true && props2.noErrorIcon === false && node.push(getInnerAppendNode("error", [
      h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
    ]));
    if (props2.loading === true || state.innerLoading.value === true) {
      node.push(getInnerAppendNode("inner-loading-append", slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props2.color })]));
    } else if (props2.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(getInnerAppendNode("inner-clearable-append", [
        h(QIcon, {
          class: "q-field__focusable-action",
          tag: "button",
          name: props2.clearIcon || $q.iconSet.field.clear,
          tabindex: 0,
          type: "button",
          onClick: clearValue
        })
      ]));
    }
    state.getInnerAppend !== void 0 && node.push(getInnerAppendNode("inner-append", state.getInnerAppend()));
    state.getControlChild !== void 0 && node.push(state.getControlChild());
    return node;
  }
  function getControlContainer() {
    const node = [];
    props2.prefix !== void 0 && props2.prefix !== null && node.push(h("div", {
      class: "q-field__prefix no-pointer-events row items-center"
    }, props2.prefix));
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(state.getShadowControl());
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(h("div", __spreadProps(__spreadValues({
        ref: state.targetRef,
        class: "q-field__native row"
      }, state.splitAttrs.attributes.value), {
        "data-autofocus": props2.autofocus === true || void 0
      }), slots.control(controlSlotScope.value)));
    }
    hasLabel.value === true && node.push(h("div", {
      class: labelClass.value
    }, hSlot(slots.label, props2.label)));
    props2.suffix !== void 0 && props2.suffix !== null && node.push(h("div", {
      class: "q-field__suffix no-pointer-events row items-center"
    }, props2.suffix));
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (computedErrorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, computedErrorMessage.value)];
        key = `q--slot-error-${computedErrorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props2.hideHint !== true || state.focused.value === true) {
      if (props2.hint !== void 0) {
        msg = [h("div", props2.hint)];
        key = `q--slot-hint-${props2.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props2.counter === true || slots.counter !== void 0;
    if (props2.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return;
    }
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props2.hideBottomSpace !== true ? "animated" : "stale")
    }, [
      props2.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  Object.assign(proxy, { focus, blur });
  onMounted(() => {
    if (isRuntimeSsrPreHydration.value === true && props2.for === void 0) {
      state.targetUid.value = getTargetUid();
    }
    props2.autofocus === true && proxy.focus();
  });
  onBeforeUnmount(() => {
    clearTimeout(focusoutTimer);
  });
  return function renderField() {
    return h("label", __spreadValues({
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style
    }, attributes.value), [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", __spreadValues({
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1
        }, state.controlEvents), getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
function shouldIgnoreKey(evt) {
  return evt !== Object(evt) || evt.isComposing === true || evt.qKeyEvent === true;
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props2, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props2.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props2.type);
  }
  watch(() => props2.type + props2.autogrow, updateMaskInternals);
  watch(() => props2.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props2.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props2.fillMask + props2.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props2.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props2.modelValue));
      return props2.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props2.modelValue;
  }
  function getPaddedMaskMarked(size2) {
    if (size2 < maskMarked.length) {
      return maskMarked.slice(-size2);
    }
    let pad2 = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos > -1) {
      for (let i = size2 - localMaskMarked.length; i > 0; i--) {
        pad2 += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad2 + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props2.mask !== void 0 && props2.mask.length > 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props2.mask] === void 0 ? props2.mask : NAMED_MASKS[props2.mask], fillChar = typeof props2.fillMask === "string" && props2.fillMask.length > 0 ? props2.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props2.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token2, char2) => {
      if (token2 !== void 0) {
        const c = TOKENS[token2];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp("^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?$"), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props2.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp("^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props2.reverseFillMask === true ? "$" : fillCharEscaped + "*"));
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(val);
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length > 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props2.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props2.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props2.reverseFillMask !== true) {
        const cursor = end - 1;
        moveCursor.right(inp, cursor, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) > -1) {
        const cursor = props2.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props2.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor, cursor);
        }
      }
    });
    const val = props2.unmaskedValue === true ? unmaskValue(masked) : masked;
    props2.modelValue !== val && emitValue(val, true);
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, start, end, selection) {
      const noMarkBefore = maskMarked.slice(start - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          start = i;
          noMarkBefore === true && start++;
          break;
        }
      }
      if (i < 0 && maskMarked[start] !== void 0 && maskMarked[start] !== MARKER) {
        return moveCursor.right(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(start, selection === true ? end : start, "backward");
    },
    right(inp, start, end, selection) {
      const limit = inp.value.length;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          end = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          end = i;
        }
      }
      if (i > limit && maskMarked[end - 1] !== void 0 && maskMarked[end - 1] !== MARKER) {
        return moveCursor.left(inp, limit, limit);
      }
      inp.setSelectionRange(selection ? start : end, end, "forward");
    },
    leftReverse(inp, start, end, selection) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          start = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          start = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[start] !== void 0 && localMaskMarked[start] !== MARKER) {
        return moveCursor.rightReverse(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(start, selection === true ? end : start, "backward");
    },
    rightReverse(inp, start, end, selection) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, end + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          end = i;
          end > 0 && noMarkBefore === true && end--;
          break;
        }
      }
      if (i > limit && localMaskMarked[end - 1] !== void 0 && localMaskMarked[end - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit, limit);
      }
      inp.setSelectionRange(selection === true ? start : end, end, "forward");
    }
  };
  function onMaskedKeydown(e) {
    if (shouldIgnoreKey(e) === true) {
      return;
    }
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (e.keyCode === 37 || e.keyCode === 39) {
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props2.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, start, end, e.shiftKey);
    } else if (e.keyCode === 8 && props2.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start, end, true);
    } else if (e.keyCode === 46 && props2.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, start, end, true);
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props2.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex > -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props2.reverseFillMask === true && val.length > 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown
  };
}
const useFormProps = {
  name: String
};
function useFormInputNameAttr(props2) {
  return computed(() => props2.name || props2.for);
}
function useFileFormDomProps(props2, typeGuard) {
  function getFormDomProps() {
    const model = props2.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props2.type !== "file") {
      return;
    }
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.composing !== true) {
        return;
      }
      e.target.composing = false;
      onInput(e);
    } else if (e.type === "compositionupdate") {
      if (typeof e.data === "string" && isJapanese.test(e.data) === false && isChinese.test(e.data) === false && isKorean.test(e.data) === false) {
        e.target.composing = false;
      }
    } else {
      e.target.composing = true;
    }
  };
}
var QInput = defineComponent({
  name: "QInput",
  inheritAttrs: false,
  props: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, useFieldProps), useMaskProps), useFormProps), {
    modelValue: { required: false },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  }),
  emits: [
    ...useFieldEmits,
    "paste",
    "change"
  ],
  setup(props2, { emit, attrs }) {
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props2);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown
    } = useMask(props2, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(props2, true);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState();
    const isTextarea = computed(() => props2.type === "textarea" || props2.autogrow === true);
    const isTypeText = computed(() => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props2.type));
    const onEvents = computed(() => {
      const evt = __spreadProps(__spreadValues({}, state.splitAttrs.listeners.value), {
        onInput,
        onPaste,
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      });
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
      }
      if (props2.autogrow === true) {
        evt.onAnimationend = adjustHeight;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = __spreadProps(__spreadValues({
        tabindex: 0,
        "data-autofocus": props2.autofocus === true || void 0,
        rows: props2.type === "textarea" ? 6 : void 0,
        "aria-label": props2.label,
        name: nameProp.value
      }, state.splitAttrs.attributes.value), {
        id: state.targetUid.value,
        maxlength: props2.maxlength,
        disabled: props2.disable === true,
        readonly: props2.readonly === true
      });
      if (isTextarea.value === false) {
        attrs2.type = props2.type;
      }
      if (props2.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props2.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          return;
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props2.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props2.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props2.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props2.dense, () => {
      props2.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus();
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props2.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target || e.target.composing === true) {
        return;
      }
      if (props2.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props2.autogrow === true && adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        if (props2.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props2.modelValue !== val && emitCachedValue !== val) {
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props2.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props2.debounce !== void 0) {
        clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props2.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      const inp = inputRef.value;
      if (inp !== null) {
        const parentStyle = inp.parentNode.style;
        parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
        inp.style.height = "1px";
        inp.style.height = inp.scrollHeight + "px";
        parentStyle.marginBottom = "";
      }
    }
    function onChange(e) {
      onComposition(e);
      clearTimeout(emitTimer);
      emitValueFn !== void 0 && emitValueFn();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      clearTimeout(emitTimer);
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props2.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props2.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(() => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props2.autogrow === true ? " q-textarea--autogrow" : "")),
      hasShadow: computed(() => props2.type !== "file" && typeof props2.shadowText === "string" && props2.shadowText.length > 0),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(() => hasValue.value === true || fieldValueIsFilled(props2.displayValue)),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", __spreadValues(__spreadValues(__spreadValues({
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props2.inputClass
          ],
          style: props2.inputStyle
        }, inputAttrs.value), onEvents.value), props2.type !== "file" ? { value: getCurValue() } : formDomProps.value));
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props2.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    const vm2 = getCurrentInstance();
    Object.assign(vm2.proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
    });
    return renderFn;
  }
});
export { Fragment as F, QInput as Q, createBaseVNode as a, popScopeId as b, createElementBlock as c, defineComponent as d, createTextVNode as e, createVNode as f, createApp as g, Quasar as h, openBlock as o, pushScopeId as p, ref as r, toDisplayString as t };
