var VueReactivity = (function (exports) {
  'use strict';

  const isObject = value => typeof value == 'object' && value !== null;
  const extend = Object.assign;
  const isArray = Array.isArray;
  const isIntegerKey = key => parseInt(key) + '' === key;
  let hasOwnpRroperty = Object.prototype.hasOwnProperty;
  const hasOwn = (target, key) => hasOwnpRroperty.call(target, key);
  const hasChanged = (oldValue, value) => oldValue !== value;

  function effect(fn, options = {}) {
      const effect = createReactiveEffect(fn, options);
      if (!options.lazy) {
          effect();
      }
      return effect;
  }
  let uid = 0;
  let activeEffect;
  const effectStack = [];
  function createReactiveEffect(fn, options) {
      const effect = function () {
          if (!effectStack.includes(effect)) {
              try {
                  effectStack.push(effect);
                  activeEffect = effect;
                  return fn();
              }
              finally {
                  effectStack.pop();
                  activeEffect = effectStack[effectStack.length - 1];
              }
          }
      };
      effect.id = uid++;
      effect._isEffect = true;
      effect.raw = fn;
      effect.options = options;
      return effect;
  }
  const targetMap = new WeakMap();
  function track(target, type, key) {
      // {}<WeakMap> => Map()
      // console.log(activeEffect)
      // console.log(target, type, key)
      if (!activeEffect) {
          // 不需要进行依赖收集
          return;
      }
      let depsMap = targetMap.get(target);
      if (!depsMap) {
          targetMap.set(target, (depsMap = new Map()));
      }
      let dep = depsMap.get(key);
      if (!dep) {
          depsMap.set(key, (dep = new Set()));
      }
      if (!dep.has(activeEffect)) {
          dep.add(activeEffect);
      }
      console.log('WeakMap', targetMap);
  }
  function trigger(target, type, key, newValue, oldValue) {
      console.log(target, type, key, newValue, oldValue);
      const effects = new Set();
      const add = effectsToAdd => {
          if (effectsToAdd) {
              effectsToAdd.forEach(effect => effects.add(effect));
          }
      };
      // 修改数组长度比较特殊
      let depsMap = targetMap.get(target); // 没有进行过依赖收集
      if (!depsMap) {
          return;
      }
      if (key === 'length' && isArray(target)) {
          depsMap.forEach((dep, k) => {
              // console.log('dep=>', dep, 'k==', k, 'newValu==', newValue)
              if (key === 'length' || k > newValue) {
                  // k 为依赖中访问的数组索引，当修改数组length 属性时 也需要更新
                  // 如果更改的长度 小于收集的索引，那么这个索引也需要触发effect重新执行
                  add(dep);
              }
          });
      }
      else {
          // 可能是对象
          if (key !== undefined) {
              // 这里肯定是修改， 不能是新增
              add(depsMap.get(key)); // 如果是新增
          }
          // 如果修改数组中的 某一个索引 怎么办？
          switch (type // 如果添加了一个索引就触发长度的更新
          ) {
              case 0 /* ADD */:
                  if (isArray(target) && isIntegerKey(key)) {
                      add(depsMap.get('length'));
                  }
          }
      }
      effects.forEach((effect) => effect());
  }

  const mutableHandlersGet = createGetter();
  const mutableHandlersSet = createSetter();
  const shallowReactiveHandlersGet = createGetter(false, true);
  const shallowReactiveHandlersSet = createSetter(true);
  const readonlyHandlersGet = createGetter(true); // 只读 非浅 不能设置新属性
  const shallowReadonlyHandlersGet = createGetter(true, true);
  const readOnlySet = {
      set: (target, key) => {
          console.warn(`set on key ${key} failed`);
      }
  };
  // 响应
  const mutableHandlers = {
      get: mutableHandlersGet,
      set: mutableHandlersSet
  };
  const shallowReactiveHandlers = {
      get: shallowReactiveHandlersGet,
      set: shallowReactiveHandlersSet
  };
  const readonlyHandlers = extend({
      get: readonlyHandlersGet
  }, readOnlySet);
  const shallowReadonlyHandlers = extend({
      get: shallowReadonlyHandlersGet
  }, readOnlySet);
  function createGetter(isReadonly = false, shallow = false) {
      return function (target, key, receiver) {
          const res = Reflect.get(target, key, receiver);
          if (!isReadonly) {
              //收集依赖
              console.log('依赖收集');
              track(target, 0 /* Get */, key);
          }
          if (shallow) {
              return res;
          }
          if (isObject(res)) {
              return isReadonly ? readonly(res) : reactive(res);
          }
          return res;
      };
  }
  function createSetter(shallow = false) {
      return function (target, key, value, receiver) {
          const oldValue = target[key]; // 获取老值
          // 是否存在此属性
          let hadKey = isArray(target) && isIntegerKey(key)
              ? Number(key) < target.length
              : hasOwn(target, key);
          const res = Reflect.set(target, key, value, receiver);
          if (!hadKey) {
              // 新增
              trigger(target, 0 /* ADD */, key, value);
          }
          else {
              trigger(target, 1 /* SET */, key, value, oldValue);
          }
          // console.log('set', target, key, receiver)
          // let dispatch = targetMap.get(target)
          // let effect
          // if (dispatch && (effect = dispatch.get(key)))
          // {
          //   console.log('3333', effect)
          //   effect.forEach(item => item())
          // }
          return res;
      };
  }
  // reactivity readonly  shallowReactive  shallowReadOnly

  function reactive(target) {
      return createReactiveObject(target, false, mutableHandlers);
  }
  function shallowReactive(target) {
      return createReactiveObject(target, false, shallowReactiveHandlers);
  }
  function shallowReadonly(target) {
      return createReactiveObject(target, true, shallowReadonlyHandlers);
  }
  function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers);
  }
  const reactiveMap = new WeakMap();
  const readonlyMap = new WeakMap();
  /**
   * target 目标
   * isReadonly 是否为只读
   * baseHandler 代理函数
   */
  function createReactiveObject(target, isReadonly, baseHandler) {
      if (!isObject(target)) {
          // 非对象直接返回
          return target;
      }
      const proxyMap = isReadonly ? readonlyMap : reactiveMap;
      const isExitProxy = proxyMap.get(target); // 是否已代理
      if (isExitProxy) {
          return isExitProxy;
      }
      const proxy = new Proxy(target, baseHandler);
      proxyMap.set(target, proxy);
      return proxy;
  }

  function ref(value) {
      return createRef(value);
  }
  function shallowRef(value) {
      return createRef(value, true);
  }
  const covert = value => (isObject(value) ? reactive(value) : value);
  class RefImpl {
      rawValue;
      shallow;
      __v_isRef = true;
      _value;
      constructor(rawValue, shallow) {
          this.rawValue = rawValue;
          this.shallow = shallow;
          this._value = shallow ? rawValue : covert(rawValue);
      }
      // 类的属性访问器
      get value() {
          track(this, 0 /* Get */, 'value');
          return this._value;
      }
      set value(newValue) {
          if (hasChanged(newValue, this.rawValue)) {
              this.rawValue = newValue;
              this._value = this.shallow ? newValue : covert(newValue);
              trigger(this, 1 /* SET */, 'value', newValue);
          }
      }
  }
  function createRef(rawValue, shallow = false) {
      return new RefImpl(rawValue, shallow);
  }
  class ObjectRefImpl {
      target;
      key;
      constructor(target, key) {
          this.target = target;
          this.key = key;
      }
      get value() {
          return this.target[this.key];
      }
      set value(newValue) {
          this.target[this.key] = newValue;
      }
  }
  function toRef(target, key) {
      return new ObjectRefImpl(target, key);
  }
  function toRefs(obj) {
      debugger;
      const ret = isArray(obj) ? new Array(obj.length) : {};
      for (let key in obj) {
          ret[key] = toRef(obj, key);
      }
      return ret;
  }

  exports.effect = effect;
  exports.reactive = reactive;
  exports.readonly = readonly;
  exports.ref = ref;
  exports.shallowReactive = shallowReactive;
  exports.shallowReadonly = shallowReadonly;
  exports.shallowRef = shallowRef;
  exports.toRef = toRef;
  exports.toRefs = toRefs;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=reactivity.global.js.map
