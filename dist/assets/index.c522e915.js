import { d as defineComponent, r as ref, o as openBlock, c as createElementBlock, a as createBaseVNode, t as toDisplayString, F as Fragment, p as pushScopeId, b as popScopeId, e as createTextVNode, f as createVNode, Q as QInput, g as createApp, h as Quasar } from "./vendor.ce6f4364.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
var materialIcons = "";
var index = "";
var _imports_0 = "/assets/logo.03d6d6da.png";
var HelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _withScopeId = (n) => (pushScopeId("data-v-8203a322"), n = n(), popScopeId(), n);
const _hoisted_1$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createTextVNode(" Recommended IDE setup: "),
  /* @__PURE__ */ createBaseVNode("a", {
    href: "https://code.visualstudio.com/",
    target: "_blank"
  }, "VSCode"),
  /* @__PURE__ */ createTextVNode(" + "),
  /* @__PURE__ */ createBaseVNode("a", {
    href: "https://github.com/johnsoncodehk/volar",
    target: "_blank"
  }, "Volar")
], -1));
const _hoisted_2$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createTextVNode("See "),
  /* @__PURE__ */ createBaseVNode("code", null, "README.md"),
  /* @__PURE__ */ createTextVNode(" for more information.")
], -1));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("a", {
    href: "https://vitejs.dev/guide/features.html",
    target: "_blank"
  }, " Vite Docs "),
  /* @__PURE__ */ createTextVNode(" | "),
  /* @__PURE__ */ createBaseVNode("a", {
    href: "https://v3.vuejs.org/",
    target: "_blank"
  }, "Vue 3 Docs")
], -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createTextVNode(" Edit "),
  /* @__PURE__ */ createBaseVNode("code", null, "components/HelloWorld.vue"),
  /* @__PURE__ */ createTextVNode(" to test hot module replacement. ")
], -1));
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    msg: null
  },
  setup(__props) {
    const count = ref(0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("h1", null, toDisplayString(__props.msg), 1),
        _hoisted_1$1,
        _hoisted_2$1,
        _hoisted_3,
        createBaseVNode("button", {
          type: "button",
          onClick: _cache[0] || (_cache[0] = ($event) => count.value++)
        }, "count is: " + toDisplayString(count.value), 1),
        _hoisted_4
      ], 64);
    };
  }
});
var HelloWorld = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8203a322"]]);
var App_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0
}, null, -1);
const _hoisted_2 = { style: { "width": "300px", "margin": "auto" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const textInput = ref("");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1,
        createVNode(HelloWorld, { msg: "Hello Vue 3 + TypeScript + Vite" }),
        createBaseVNode("div", _hoisted_2, [
          createVNode(QInput, {
            modelValue: textInput.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => textInput.value = $event),
            label: "Test"
          }, null, 8, ["modelValue"])
        ])
      ], 64);
    };
  }
});
const app = createApp(_sfc_main);
app.use(Quasar, {
  plugins: {}
});
app.mount("#app");
