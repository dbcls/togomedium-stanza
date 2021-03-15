import { c as createCommonjsModule, a as getDefaultExportFromCjs, d as defineStanzaElement } from './stanza-element-e185656b.js';
import { g as getData_1 } from './get-data-bf06c788.js';
import { v as variables } from './variables-f1b7e272.js';
import { s as stanza } from './stanza-32f0aee1.js';

var gmdbMediumByGmid_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.__TEST__ = void 0;



async function gmdbMediumByGmid(stanza$1, params) {
    if (!params.gm_id) {
        return;
    }
    const apiName = "gmdb_medium_by_gmid";
    const result = await getData_1.getData(`${variables.API_GROWTH_MEDIUM}${apiName}`, {
        gm_id: params.gm_id,
    });
    const data = parseData(result, params);
    stanza$1.render({
        template: "stanza.html.hbs",
        parameters: data,
    });
    stanza.importWebFontForTogoMedium(stanza$1);
}
exports.default = gmdbMediumByGmid;
const parseData = (data, params) => {
    switch (true) {
        case data.status !== 200:
            return makeErrorData(`Error ${data.status}<br />${data.message}`);
        case data.body.meta === null:
            return makeErrorData(`No Medium Found with ${params.gm_id}`);
        default:
            return makeSuccessData(data.body);
    }
};
const makeErrorData = (msg) => {
    return {
        id: null,
        name: null,
        src_url: null,
        src_label: null,
        ph: null,
        components: [],
        error: true,
        statusText: msg,
    };
};
const makeSuccessData = (body) => {
    return {
        id: body.meta.gm.split("/").pop(),
        name: body.meta.name,
        src_label: getSrcLabel(body.meta.src_url),
        src_url: body.meta.src_url,
        ph: body.meta.ph,
        components: [
            ...processComponentTables(body.components),
            ...processComponentComments(body.comments),
        ].sort((a, b) => a.paragraph_index - b.paragraph_index),
    };
};
const processComponentTables = (tables) => {
    return tables.map((table) => ({
        ...table,
        items: table.items.map((item) => {
            var _a, _b;
            return ({
                ...item,
                can_wrap_label: ((_a = item.label) === null || _a === void 0 ? void 0 : _a.length) >= 20,
                can_wrap_name: ((_b = item.component_name) === null || _b === void 0 ? void 0 : _b.length) >= 20,
                properties: item.properties.map((property) => ({
                    ...property,
                    displayLabel: getShortPropertyLabel(property.label),
                })),
            });
        }),
    }));
};
const processComponentComments = (comments) => {
    return comments.map((item) => ({
        ...item,
        comment: item.comment ? item.comment : "&nbsp;",
    }));
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
    if (!dic[str]) {
        console.warn("no short property label found:", str);
    }
    return dic[str] ? dic[str] : "ERR";
}
const getSrcLabel = (str) => {
    switch (true) {
        case str.match(/jcm.*riken/) !== null:
            return "JCM";
        case str.match(/nite.*nbrc/) !== null:
            return "NBRC";
        case str.match(/dsmz\.de/) !== null:
            return "DSMZ";
        case str.match(/atcc\.org/) !== null:
            return "ATCC";
        default:
            return "SRC";
    }
};
exports.__TEST__ = { getSrcLabel };

});

var main = /*@__PURE__*/getDefaultExportFromCjs(gmdbMediumByGmid_1);

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
		"stanza:example": "JCM_M",
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
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <p class=\"error\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"statusText") || (depth0 != null ? lookupProperty(depth0,"statusText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"statusText","hash":{},"data":data,"loc":{"start":{"line":4,"column":21},"end":{"line":4,"column":37}}}) : helper))) != null ? stack1 : "")
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
    + "</span>\n      <span class=\"ph\"> (pH"
    + alias4(((helper = (helper = lookupProperty(helpers,"ph") || (depth0 != null ? lookupProperty(depth0,"ph") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ph","hash":{},"data":data,"loc":{"start":{"line":17,"column":27},"end":{"line":17,"column":33}}}) : helper)))
    + ")</span>\n    </p>\n    <div class=\"recipe\">\n      <h3>Components</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"components") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":6},"end":{"line":70,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":8},"end":{"line":66,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"comment") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":8},"end":{"line":69,"column":15}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"subcomponent_name") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":10},"end":{"line":25,"column":17}}})) != null ? stack1 : "")
    + "          <table class=\"component-table\">\n            <tr>\n              <th class=\"component\">Component</th>\n              <th class=\"volume\">Volume</th>\n              <th class=\"id\">GMO ID</th>\n              <th class=\"name\">Name</th>\n              <th class=\"properties\">Properties</th>\n              <th class=\"functions\">Functions</th>\n            </tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":12},"end":{"line":64,"column":21}}})) != null ? stack1 : "")
    + "          </table>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <h4>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"subcomponent_name") || (depth0 != null ? lookupProperty(depth0,"subcomponent_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"subcomponent_name","hash":{},"data":data,"loc":{"start":{"line":24,"column":16},"end":{"line":24,"column":37}}}) : helper)))
    + "</h4>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "              <tr>\n                <td class=\"name\">\n                  <span class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_wrap_name") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":31},"end":{"line":38,"column":67}}})) != null ? stack1 : "")
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"component_name") || (depth0 != null ? lookupProperty(depth0,"component_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"component_name","hash":{},"data":data,"loc":{"start":{"line":38,"column":69},"end":{"line":38,"column":87}}}) : helper)))
    + "</span>\n                </td>\n                <td class=\"volume\">\n                  <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"volume") || (depth0 != null ? lookupProperty(depth0,"volume") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"volume","hash":{},"data":data,"loc":{"start":{"line":41,"column":24},"end":{"line":41,"column":34}}}) : helper)))
    + "</span><span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"unit") || (depth0 != null ? lookupProperty(depth0,"unit") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"unit","hash":{},"data":data,"loc":{"start":{"line":41,"column":47},"end":{"line":41,"column":55}}}) : helper)))
    + "</span>\n                </td>\n                <td class=\"id\">\n                  <a href=\"/component/"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":44,"column":38},"end":{"line":44,"column":48}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":44,"column":50},"end":{"line":44,"column":60}}}) : helper)))
    + "</a>\n                </td>\n                <td class=\"name\">\n                  <span class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_wrap_label") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":31},"end":{"line":47,"column":68}}})) != null ? stack1 : "")
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":47,"column":70},"end":{"line":47,"column":79}}}) : helper)))
    + "</span>\n                </td>\n                <td class=\"properties\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":18},"end":{"line":54,"column":25}}})) != null ? stack1 : "")
    + "                </td>\n                <td class=\"functions\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"roles") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":18},"end":{"line":61,"column":25}}})) != null ? stack1 : "")
    + "                </td>\n              </tr>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "can-wrap";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":20},"end":{"line":53,"column":29}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                      <span>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"displayLabel") || (depth0 != null ? lookupProperty(depth0,"displayLabel") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"displayLabel","hash":{},"data":data,"loc":{"start":{"line":52,"column":28},"end":{"line":52,"column":44}}}) : helper)))
    + "</span>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"roles") : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":58,"column":20},"end":{"line":60,"column":29}}})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                      <span>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":59,"column":28},"end":{"line":59,"column":37}}}) : helper)))
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":59,"column":37},"end":{"line":59,"column":67}}})) != null ? stack1 : "")
    + "</span>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return ", ";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <p>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"comment") || (depth0 != null ? lookupProperty(depth0,"comment") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"comment","hash":{},"data":data,"loc":{"start":{"line":68,"column":13},"end":{"line":68,"column":26}}}) : helper))) != null ? stack1 : "")
    + "</p>\n";
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
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":72,"column":13}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true}]
];

var css = "/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\nbody {\n  line-height: 1;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\na {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\n/* change colours to suit your needs */\nins {\n  background-color: #ff9;\n  color: #000;\n  text-decoration: none;\n}\n\n/* change colours to suit your needs */\nmark {\n  background-color: #ff9;\n  color: #000;\n  font-style: italic;\n  font-weight: bold;\n}\n\ndel {\n  text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n  border-bottom: 1px dotted;\n  cursor: help;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* change border colour to suit your needs */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #cccccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\ninput, select {\n  vertical-align: middle;\n}\n\n.wrapper {\n  font-size: 16px;\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 5px;\n  font-weight: 300;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n  color: #333;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n}\n\na {\n  color: #6FA80C;\n}\n\n.link-btn {\n  background-color: #8FC31F;\n  color: #FFF;\n  padding: 4px 8px 2px;\n  border-radius: 3px;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 600;\n  display: inline-block;\n  line-height: 1;\n}\n\n.tax-id .value {\n  margin: 0 16px 0 4px;\n  line-height: 1.5;\n}\n\n.tax-id .links {\n  position: relative;\n  top: -2px;\n  margin-top: 4px;\n  white-space: nowrap;\n}\n\n.name {\n  margin: 24px 0 16px;\n}\n.name .value {\n  font-size: 40px;\n}\n.name .ph {\n  font-size: 24px;\n}\n\nh3 {\n  font-weight: 600;\n  margin-top: 24px;\n  font-size: 20px;\n}\n\n.simple-list {\n  line-height: 1.2;\n  margin-top: 8px;\n}\n\n.recipe h4 {\n  font-size: 16px;\n  margin-top: 8px;\n}\n.recipe p {\n  margin: 4px 0;\n}\n\n.component-table {\n  margin-top: 8px;\n  border: 1px solid #ddd;\n  width: 100%;\n}\n.component-table th {\n  font-weight: 600;\n  text-align: left;\n}\n.component-table th, .component-table td {\n  border: 1px solid #ddd;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.component-table .component {\n  width: 25%;\n}\n.component-table .name {\n  width: 23%;\n}\n.component-table .properties {\n  width: 20%;\n}\n.component-table .functions {\n  width: 12%;\n}\n.component-table .id {\n  width: 12%;\n}\n.component-table .volume {\n  width: 8%;\n}\n.component-table .properties span {\n  border: 1px solid #6FA80C;\n  border-radius: 3px;\n  font-size: 13px;\n  font-weight: 600;\n  padding: 3px;\n  display: inline-block;\n}\n.component-table .functions span {\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.error {\n  color: #990000;\n}";

defineStanzaElement(main, {metadata, templates, css, url: import.meta.url});
//# sourceMappingURL=gmdb-medium-by-gmid.js.map
