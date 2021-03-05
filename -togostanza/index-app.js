import { d as defineComponent, s as script$1, o as openBlock, c as createBlock, r as resolveComponent, w as withCtx, F as Fragment, a as renderList, b as createVNode, t as toDisplayString, e as createCommentVNode, f as createApp } from './Layout-ac5d2159.js';

var script = defineComponent({
  components: {
    Layout: script$1
  },

  props: ['allMetadata'],

  setup(props) {
    return props;
  }
});

const _hoisted_1 = /*#__PURE__*/createVNode("h1", { class: "display-4" }, "List of Stanzas", -1 /* HOISTED */);
const _hoisted_2 = {
  key: 0,
  class: "list-group mt-3"
};
const _hoisted_3 = {
  key: 0,
  class: "small text-muted text-truncate mt-1 mb-0"
};
const _hoisted_4 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Layout = resolveComponent("Layout");

  return (openBlock(), createBlock(_component_Layout, null, {
    default: withCtx(() => [
      _hoisted_1,
      (_ctx.allMetadata.length > 0)
        ? (openBlock(), createBlock("div", _hoisted_2, [
            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.allMetadata, (metadata) => {
              return (openBlock(), createBlock("a", {
                key: metadata['@id'],
                href: `./${metadata['@id']}.html`,
                class: "list-group-item list-group-item-action py-3"
              }, [
                createVNode("div", null, toDisplayString(metadata['stanza:label']), 1 /* TEXT */),
                (metadata['stanza:definition'])
                  ? (openBlock(), createBlock("p", _hoisted_3, toDisplayString(metadata['stanza:definition']), 1 /* TEXT */))
                  : createCommentVNode("v-if", true)
              ], 8 /* PROPS */, ["href"]))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
        : (openBlock(), createBlock("p", _hoisted_4, "No stanzas defined."))
    ]),
    _: 1 /* STABLE */
  }))
}

script.render = render;
script.__file = "node_modules/togostanza/src/components/Index.vue";

var allMetadata = [{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-gms-by-tid","stanza:label":"Gmdb gms by tid","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Table","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@yohak.design","stanza:contributor":[],"stanza:created":"2021-02-22","stanza:updated":"2021-02-22","stanza:parameter":[{"stanza:key":"t_id","stanza:example":"T00077,T00741,T03382,T03902,T02663,T03900,T00022,T02976,T05425","stanza:description":"KEGG organism identifier","stanza:required":true}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-medium-by-gmid","stanza:label":"Gmdb Medium By Gmid","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Table","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@gmail.com","stanza:contributor":[],"stanza:created":"2021-03-05","stanza:updated":"2021-03-05","stanza:parameter":[{"stanza:key":"gm_id","stanza:example":"166393","stanza:description":"","stanza:required":true}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-meta-list","stanza:label":"GMDB meta list","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Table","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@yohak.design","stanza:contributor":[],"stanza:created":"2021-02-19","stanza:updated":"2021-02-19","stanza:parameter":[{"stanza:key":"api_url","stanza:example":"http://growthmedium.org/sparqlist/api/gmdb_organisms_by_gmid?gm_id=HM_D00756b","stanza:description":"URL of the SPARQList API with queries","stanza:required":true},{"stanza:key":"limit","stanza:example":"10","stanza:description":"limit","stanza:required":true},{"stanza:key":"title","stanza:example":"Similar Growth Media of JCM M25","stanza:description":"title","stanza:required":false},{"stanza:key":"column_names","stanza:example":"true","stanza:description":"whether display column names","stanza:required":true}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--link-color","stanza:type":"color","stanza:default":"#6FA80C","stanza:description":"text color of greeting"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-roundtree","stanza:label":"Gmdb roundtree","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Graph","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@gmail.com","stanza:contributor":[],"stanza:created":"2021-02-20","stanza:updated":"2021-02-20","stanza:parameter":[{"stanza:key":"newick","stanza:example":"http://keggoc-rdf.dbcls.jp/tmp/phylo2.newick","stanza:description":"newick tree format","stanza:required":true}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"hello","stanza:label":"Hello","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Text","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@gmail.com","stanza:contributor":[],"stanza:created":"2021-03-03","stanza:updated":"2021-03-03","stanza:parameter":[{"stanza:key":"say-to","stanza:example":"world","stanza:description":"who to say hello to","stanza:required":false}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}]}];

createApp(script, {allMetadata}).mount('body');
//# sourceMappingURL=index-app.js.map
