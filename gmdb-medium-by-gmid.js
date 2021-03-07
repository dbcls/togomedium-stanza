import { d as defineStanzaElement } from './stanza-element-e185656b.js';
import { g as getData_1 } from './get-data-bf06c788.js';
import { v as variables } from './variables-56399012.js';
import { s as stanza } from './stanza-f722959e.js';

async function gmdbMediumByGmid(stanza$1, params) {
    const apiName = "gmdb_medium_by_gmid";
    const result = await getData_1.getData(`${variables.API_GROWTH_MEDIUM}${apiName}`, {
        gm_id: params.gm_id,
    });
    const data = parseData(result);
    stanza$1.render({
        template: "stanza.html.hbs",
        parameters: data,
    });
    stanza.importWebFontForGrowthMedium(stanza$1);
}
var _default = gmdbMediumByGmid;
const parseData = (data) => {
    return makeSuccessData(data.body);
};
const makeSuccessData = (body) => {
    const id = body.gm.split("/").pop();
    const name = body.name;
    const src_label = getSrcLabel(body.src_url);
    const src_url = body.src_url;
    const components = body.components.map((item) => {
        var _a, _b;
        return ({
            gmo_id: item.gmo_id,
            label_en: item.label_en,
            can_wrap: item.label_en.length >= 20,
            properties: (_a = item.properties) === null || _a === void 0 ? void 0 : _a.map((prop) => ({
                short_label: getShortPropertyLabel(prop.label_en),
            })),
            roles: (_b = item.roles) === null || _b === void 0 ? void 0 : _b.map((role) => ({
                label_en: role.label_en,
            })),
        });
    });
    return {
        id,
        name,
        src_label,
        src_url,
        components,
    };
};
function getShortPropertyLabel(str) {
    const dic = {
        "Simple component": "Simple",
        "Complex component": "Complex",
        "Defined component": "Defined",
        "Undefined component": "Undefined",
        "Inorganic compound": "Inorganic",
        "Organic compound": "Organic",
        Solution: "Solution",
    };
    return dic[str] ? dic[str] : "ERR";
}
const getSrcLabel = (str) => {
    switch (true) {
        case str.match(/jcm\.riken/) !== null:
            return "JCM";
        case str.match(/nbrc\.nite/) !== null:
            return "NBRC";
        case str.match(/dsmz\.de/) !== null:
            return "DSMZ";
        case str.match(/atcc\.org/) !== null:
            return "ATCC";
        default:
            return "SRC";
    }
};

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-medium-by-gmid",
	"stanza:label": "Gmdb Medium By Gmid",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@gmail.com",
	"stanza:contributor": [
],
	"stanza:created": "2021-03-05",
	"stanza:updated": "2021-03-05",
	"stanza:parameter": [
	{
		"stanza:key": "gm_id",
		"stanza:example": "JCM_M13",
		"stanza:description": "",
		"stanza:required": true
	}
],
	"stanza:about-link-placement": "bottom-right",
	"stanza:style": [
	{
		"stanza:key": "--greeting-color",
		"stanza:type": "color",
		"stanza:default": "#eb7900",
		"stanza:description": "text color of greeting"
	},
	{
		"stanza:key": "--greeting-align",
		"stanza:type": "single-choice",
		"stanza:choice": [
			"left",
			"center",
			"right"
		],
		"stanza:default": "center",
		"stanza:description": "text align of greeting"
	}
]
};

var templates = [
  ["stanza.html.hbs", {"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <p>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"msg") || (depth0 != null ? lookupProperty(depth0,"msg") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"msg","hash":{},"data":data,"loc":{"start":{"line":4,"column":7},"end":{"line":4,"column":14}}}) : helper)))
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <p class=\"gm-id\">\n      <span class=\"key\">Growth Medium ID: </span>\n      <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":10,"column":26},"end":{"line":10,"column":32}}}) : helper)))
    + "</span>\n      <span class=\"links\">\n        <a class=\"link-btn\" target=\"_blank\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"src_url") || (depth0 != null ? lookupProperty(depth0,"src_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src_url","hash":{},"data":data,"loc":{"start":{"line":12,"column":50},"end":{"line":12,"column":61}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"src_label") || (depth0 != null ? lookupProperty(depth0,"src_label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src_label","hash":{},"data":data,"loc":{"start":{"line":12,"column":63},"end":{"line":12,"column":76}}}) : helper)))
    + "</a>\n      </span>\n    </p>\n    <p class=\"name\">\n      <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":16,"column":26},"end":{"line":16,"column":34}}}) : helper)))
    + "</span>\n    </p>\n    <h3>Components</h3>\n    <table class=\"component-table\">\n      <tr>\n        <th class=\"id\">GMO ID</th>\n        <th class=\"name\">Name</th>\n        <th class=\"properties\">Properties</th>\n        <th class=\"functions\">Functions</th>\n      </tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"components") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":6},"end":{"line":49,"column":15}}})) != null ? stack1 : "")
    + "    </table>\n\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <tr>\n          <td class=\"id\">\n            <a href=\"/component/"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":29,"column":32},"end":{"line":29,"column":42}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":29,"column":44},"end":{"line":29,"column":54}}}) : helper)))
    + "</a>\n          </td>\n          <td class=\"name\">\n            <span class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_wrap") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":25},"end":{"line":32,"column":56}}})) != null ? stack1 : "")
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label_en") || (depth0 != null ? lookupProperty(depth0,"label_en") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_en","hash":{},"data":data,"loc":{"start":{"line":32,"column":58},"end":{"line":32,"column":70}}}) : helper)))
    + "</span>\n          </td>\n          <td class=\"properties\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":12},"end":{"line":39,"column":19}}})) != null ? stack1 : "")
    + "          </td>\n          <td class=\"functions\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"roles") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":12},"end":{"line":46,"column":19}}})) != null ? stack1 : "")
    + "          </td>\n        </tr>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "can-wrap";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":14},"end":{"line":38,"column":23}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"short_label") || (depth0 != null ? lookupProperty(depth0,"short_label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"short_label","hash":{},"data":data,"loc":{"start":{"line":37,"column":22},"end":{"line":37,"column":37}}}) : helper)))
    + "</span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"roles") : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":14},"end":{"line":45,"column":23}}})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label_en") || (depth0 != null ? lookupProperty(depth0,"label_en") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"label_en","hash":{},"data":data,"loc":{"start":{"line":44,"column":22},"end":{"line":44,"column":34}}}) : helper)))
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":34},"end":{"line":44,"column":64}}})) != null ? stack1 : "")
    + "</span>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return ", ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"wrapper\">\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":5,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":52,"column":13}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true}]
];

var css = "/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\nbody {\n  line-height: 1;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\na {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\n/* change colours to suit your needs */\nins {\n  background-color: #ff9;\n  color: #000;\n  text-decoration: none;\n}\n\n/* change colours to suit your needs */\nmark {\n  background-color: #ff9;\n  color: #000;\n  font-style: italic;\n  font-weight: bold;\n}\n\ndel {\n  text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n  border-bottom: 1px dotted;\n  cursor: help;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* change border colour to suit your needs */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #cccccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\ninput, select {\n  vertical-align: middle;\n}\n\n.wrapper {\n  font-size: 16px;\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 5px;\n  font-weight: 300;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: antialiased;\n  font-smoothing: antialiased;\n  color: #333;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n}\n\na {\n  color: #6FA80C;\n}\n\n.link-btn {\n  background-color: #8FC31F;\n  color: #FFF;\n  padding: 4px 8px 2px;\n  border-radius: 3px;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 600;\n  display: inline-block;\n  line-height: 1;\n}\n\n.tax-id .value {\n  margin: 0 16px 0 4px;\n  line-height: 1.5;\n}\n\n.tax-id .links {\n  position: relative;\n  top: -2px;\n  margin-top: 4px;\n  white-space: nowrap;\n}\n\n.name {\n  margin: 24px 0 16px;\n}\n\n.name .value {\n  font-size: 40px;\n}\n\nh3 {\n  font-weight: 600;\n  margin-top: 24px;\n  font-size: 20px;\n}\n\n.simple-list {\n  line-height: 1.2;\n  margin-top: 8px;\n}\n\n.component-table {\n  margin-top: 8px;\n  border: 1px solid #ddd;\n  width: 100%;\n}\n\n.component-table th {\n  font-weight: 600;\n  text-align: left;\n}\n\n.component-table td, th {\n  border: 1px solid #ddd;\n  padding: 8px 8px;\n}\n\n.properties span {\n  border: 1px solid #6FA80C;\n  border-radius: 3px;\n  font-size: 13px;\n  font-weight: 600;\n  padding: 3px;\n}\n\n.functions span {\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.component-table span {\n  white-space: nowrap;\n}\n\n.component-table span.can-wrap {\n  white-space: normal;\n}";

defineStanzaElement(_default, {metadata, templates, css, url: import.meta.url});
//# sourceMappingURL=gmdb-medium-by-gmid.js.map
