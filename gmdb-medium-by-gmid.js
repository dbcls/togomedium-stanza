import { c as createCommonjsModule, a as getDefaultExportFromCjs, d as defineStanzaElement } from './stanza-element-30b71100.js';
import { g as getData_1 } from './get-data-0bfc4761.js';
import { v as variables } from './variables-9f76df9f.js';
import { s as stanza } from './stanza-2f6b2733.js';

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
		"stanza:example": "NBRC_M249",
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
    + "</a>\n      </span>\n    </p>\n    <p class=\"title\">\n      <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":16,"column":26},"end":{"line":16,"column":34}}}) : helper)))
    + "</span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"ph") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":6},"end":{"line":19,"column":13}}})) != null ? stack1 : "")
    + "    </p>\n    <div class=\"recipe\">\n      <h3>Components</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"components") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":6},"end":{"line":60,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <span class=\"ph\"> (pH"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"ph") || (depth0 != null ? lookupProperty(depth0,"ph") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ph","hash":{},"data":data,"loc":{"start":{"line":18,"column":29},"end":{"line":18,"column":35}}}) : helper)))
    + ")</span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":8},"end":{"line":56,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"comment") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":8},"end":{"line":59,"column":15}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"subcomponent_name") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":10},"end":{"line":27,"column":17}}})) != null ? stack1 : "")
    + "          <table class=\"component-table\">\n            <tr>\n              <th class=\"id\">GMO ID</th>\n              <th class=\"name\">GMO Label</th>\n              <th class=\"name\">Component</th>\n              <th class=\"volume\"></th>\n              <th class=\"volume\"></th>\n            </tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":12},"end":{"line":54,"column":21}}})) != null ? stack1 : "")
    + "          </table>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <h4>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"subcomponent_name") || (depth0 != null ? lookupProperty(depth0,"subcomponent_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"subcomponent_name","hash":{},"data":data,"loc":{"start":{"line":26,"column":16},"end":{"line":26,"column":37}}}) : helper)))
    + "</h4>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "              <tr>\n                <td class=\"id\">\n                  <a href=\"/component/"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":39,"column":38},"end":{"line":39,"column":48}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":39,"column":50},"end":{"line":39,"column":60}}}) : helper)))
    + "</a>\n                </td>\n                <td class=\"name\">\n                  <span class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_wrap_label") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":31},"end":{"line":42,"column":68}}})) != null ? stack1 : "")
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":42,"column":70},"end":{"line":42,"column":79}}}) : helper)))
    + "</span>\n                </td>\n                <td class=\"name\">\n                  <span class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_wrap_name") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":31},"end":{"line":45,"column":67}}})) != null ? stack1 : "")
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"component_name") || (depth0 != null ? lookupProperty(depth0,"component_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"component_name","hash":{},"data":data,"loc":{"start":{"line":45,"column":69},"end":{"line":45,"column":87}}}) : helper)))
    + "</span>\n                </td>\n                <td class=\"volume\">\n                  <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"volume") || (depth0 != null ? lookupProperty(depth0,"volume") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"volume","hash":{},"data":data,"loc":{"start":{"line":48,"column":24},"end":{"line":48,"column":34}}}) : helper)))
    + "</span><span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"unit") || (depth0 != null ? lookupProperty(depth0,"unit") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"unit","hash":{},"data":data,"loc":{"start":{"line":48,"column":47},"end":{"line":48,"column":55}}}) : helper)))
    + "</span>\n                </td>\n                <td class=\"volume\">\n                  <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"conc_value") || (depth0 != null ? lookupProperty(depth0,"conc_value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"conc_value","hash":{},"data":data,"loc":{"start":{"line":51,"column":24},"end":{"line":51,"column":38}}}) : helper)))
    + "</span><span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"conc_unit") || (depth0 != null ? lookupProperty(depth0,"conc_unit") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"conc_unit","hash":{},"data":data,"loc":{"start":{"line":51,"column":51},"end":{"line":51,"column":64}}}) : helper)))
    + "</span>\n                </td>\n              </tr>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "can-wrap";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <p>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"comment") || (depth0 != null ? lookupProperty(depth0,"comment") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"comment","hash":{},"data":data,"loc":{"start":{"line":58,"column":13},"end":{"line":58,"column":26}}}) : helper))) != null ? stack1 : "")
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
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":62,"column":13}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true}]
];

var css = "/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n  line-height: 1;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\nbody {\n  line-height: 1;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\na {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\n/* change colours to suit your needs */\nins {\n  background-color: #ff9;\n  color: #000;\n  text-decoration: none;\n}\n\n/* change colours to suit your needs */\nmark {\n  background-color: #ff9;\n  color: #000;\n  font-style: italic;\n  font-weight: bold;\n}\n\ndel {\n  text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n  border-bottom: 1px dotted;\n  cursor: help;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* change border colour to suit your needs */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #cccccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\ninput, select {\n  vertical-align: middle;\n}\n\n.wrapper {\n  font-size: 16px;\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  padding: 16px;\n  background-color: #FFFFFF;\n  border-radius: 5px;\n  font-weight: 300;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  color: #333333;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n}\n\nheader h2 {\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  -webkit-font-smoothing: antialiased;\n  font-size: 24px;\n  font-weight: 600;\n  margin-bottom: 8px;\n  padding-left: 8px;\n}\n\na {\n  color: #6FA80C;\n  text-decoration: underline;\n}\n\na:hover {\n  text-decoration: none;\n}\n\n.error {\n  color: #990000;\n}\n\n.gm-id .value {\n  margin: 0 16px 0 4px;\n  line-height: 1.5;\n}\n.gm-id .links {\n  position: relative;\n  margin-top: 4px;\n  white-space: nowrap;\n}\n.gm-id .links a {\n  background-color: #8FC31F;\n  color: #FFFFFF;\n  padding: 4px 8px 2px;\n  border-radius: 3px;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 600;\n  display: inline-block;\n  line-height: 1;\n}\n\np.title {\n  font-size: 40px;\n  margin: 24px 0 16px;\n}\np.title .ph {\n  font-size: 24px;\n}\n\nh3 {\n  font-weight: 600;\n  margin-top: 24px;\n  margin-bottom: 8px;\n  font-size: 20px;\n}\n\n.recipe h4 {\n  font-size: 16px;\n  margin-top: 8px;\n}\n.recipe p {\n  margin: 4px 0;\n  line-height: 1.2;\n}\n\n.component-table {\n  margin-top: 8px;\n  border: 1px solid #ddd;\n  width: 100%;\n}\n.component-table th {\n  font-weight: 600;\n  text-align: left;\n}\n.component-table th, .component-table td {\n  border: 1px solid #ddd;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.component-table .name {\n  width: 35%;\n}\n.component-table .id {\n  width: 10%;\n  white-space: nowrap;\n}\n.component-table .volume {\n  width: 10%;\n}\n.component-table .volume span:first-child {\n  display: inline-block;\n  width: 60%;\n  text-align: right;\n  box-sizing: border-box;\n  padding-right: 4px;\n}\n.component-table .volume span:last-child {\n  display: inline-block;\n  width: 40%;\n  text-align: left;\n}\n.component-table .properties span {\n  border: 1px solid #6FA80C;\n  border-radius: 3px;\n  font-size: 13px;\n  font-weight: 600;\n  padding: 3px;\n  display: inline-block;\n}\n.component-table .functions span {\n  font-size: 13px;\n  font-weight: 600;\n}";

defineStanzaElement(main, {metadata, templates, css, url: import.meta.url});
//# sourceMappingURL=gmdb-medium-by-gmid.js.map
