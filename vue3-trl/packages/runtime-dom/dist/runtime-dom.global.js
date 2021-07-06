var VueRuntimeDOM = (function (exports) {
  'use strict';

  const isObject = value => typeof value == 'object' && value !== null;
  const extend = Object.assign;
  const isArray = Array.isArray;
  const isString = value => typeof value === 'string';

  const createVNode = (type, props, children = null) => {
      const shapeFlag = isString(type)
          ? 1 /* ELEMENT */
          : isObject(type)
              ? 4 /* STATEFUL_COMPONENT */
              : 0;
      const vnode = {
          type,
          props,
          children,
          key: props && props.key,
          el: null,
          shapeFlag // 自己是什么类型
      };
      normalizeChildren(vnode, children); // 根据子节点计算孩子类型
      return vnode;
  };
  function normalizeChildren(vnode, children) {
      let type = 0;
      if (children == null) ;
      else if (isArray(children)) {
          type = 16 /* ARRAY_CHILDREN */; // 数组
      }
      else {
          type = 8 /* TEXT_CHILDREN */; // 文本
      }
      vnode.shapeFlag |= type;
  }

  function createAppAPI(render) {
      return function createApp(rootComponent, rootProps) {
          const app = {
              _props: rootProps,
              _component: rootComponent,
              _container: null,
              mount(rootContainer) {
                  const vnode = createVNode(rootComponent, rootProps);
                  console.log('vnode', vnode);
                  render(vnode, rootContainer);
                  app._container = rootContainer;
              }
          };
          return app;
      };
  }

  const createRender = renderOptions => {
      const render = (vnode, container) => {
          console.log(vnode, container);
      };
      return {
          createApp: createAppAPI(render)
      };
  };

  const nodeOps = {
      createElement: tagName => document.createElement(tagName),
      remove: child => {
          const parent = child.parentNode;
          if (parent) {
              parent.removeChild(child);
          }
      },
      insert: (child, parent, anchor = null) => {
          parent.insertBefore(child, anchor);
      },
      querySelector: selector => document.querySelector(selector),
      setElementText: (el, text) => (el.textContent = text),
      createText: text => document.createTextNode(text),
      setText: (node, text) => (node.nodeValue = text)
  };

  const patchAttr = (el, key, value) => {
      if (value === null) {
          el.removeAttribute(key);
      }
      else {
          el.setAttribute(key, value);
      }
  };

  const patchClass = (el, value) => {
      if (value == null) {
          value = '';
      }
      el.className = value;
  };

  const patchEvents = (el, key, value) => {
      const invokes = el._vei || (el._vei = {});
      const exists = invokes[key]; // 拿老事件
      if (value && exists) ;
      else {
          const eventName = key.slice(2).toLowerCase();
          if (value) {
              let invoker = (invokes[key] = createInvoker(value));
              el.addEventListener(eventName, invoker);
          }
          else {
              el.removeEventListener(eventName, exists);
              invokes[key] = undefined;
          }
      }
  };
  function createInvoker(value) {
      const invoker = e => {
          invoker.value(e);
      };
      invoker.value = value;
      return invoker;
  }

  const patchStyle = (el, prev, next) => {
      const style = el.style; // 获取样式
      if (next == null) {
          el.removeAttribute('style');
      }
      else {
          if (prev) {
              for (let key in prev) {
                  if (!next[key]) {
                      style[key] = '';
                  }
              }
          }
          for (let key in next) {
              style[key] = next[key];
          }
      }
  };

  const patchProp = (el, key, prevValue, nextValue) => {
      switch (key) {
          case 'class':
              patchClass(el, nextValue);
              break;
          case 'style':
              patchStyle(el, prevValue, nextValue);
              break;
          default:
              if (/^on[^A-Z]/.test(key)) {
                  patchEvents(el, key, nextValue);
              }
              else {
                  patchAttr(el, key, nextValue);
              }
      }
  };

  extend({ patchProp }, nodeOps);
  const createApp = (rootComponent, rootProps = null) => {
      console.log(rootComponent, rootProps);
      const app = createRender().createApp(rootComponent, rootProps);
      const { mount } = app;
      app.mount = function (container) {
          mount(container);
          container = document.querySelector(container);
          container.innerHTML = '';
      };
      return app;
  };

  exports.createApp = createApp;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=runtime-dom.global.js.map
