'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isObject = value => typeof value == 'object' && value !== null;
const extend = Object.assign;

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
    return function (target, key, receiver) {
        const res = Reflect.set(target, key, receiver);
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

exports.reactive = reactive;
exports.readonly = readonly;
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
//# sourceMappingURL=reactivity.cjs.js.map
