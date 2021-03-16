import { d as defineStanzaElement } from './stanza-element-30b71100.js';
import { g as getData_1 } from './get-data-0bfc4761.js';
import { v as variables } from './variables-9f76df9f.js';
import { s as stanza } from './stanza-2f6b2733.js';

async function gmdbComponentByGmoid(stanza$1, params) {
    if (!params.gmo_id) {
        return;
    }
    const apiName = "gmdb_component_by_gmoid";
    const result = await getData_1.getData(`${variables.API_GROWTH_MEDIUM}${apiName}`, {
        gmo_id: params.gmo_id,
    });
    const data = parseData(result);
    stanza$1.render({
        template: "stanza.html.hbs",
        parameters: data,
    });
    stanza.importWebFontForTogoMedium(stanza$1);
}
var _default = gmdbComponentByGmoid;
const parseData = (data) => {
    return makeSuccessData(data.body);
};
const makeSuccessData = (body) => {
    return {
        pref_label: body.pref_label,
        gmo_id: body.id,
        alt_labels: body.alt_labels_en,
        properties: body.properties,
        roles: body.roles,
        super_classes: body.super_classes,
        sub_classes: body.sub_classes,
        links: body.links
            .map((str) => ({
            label: getLinkLabel(str),
            uri: str,
        }))
            .filter((item) => !!item.label),
    };
};
const getLinkLabel = (link) => {
    switch (true) {
        case /pccompound/.test(link):
            return "PubChem";
        case /wikipedia/.test(link):
            return "Wikipedia";
        case /ncicb/.test(link):
            return "NCI Thesaurus";
        case /CHEBI/.test(link):
            return "ChEBI";
        case /SNOMEDCT/.test(link):
            return "SNOMED-CT";
        default:
            return "";
    }
};

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-component-by-gmoid",
	"stanza:label": "Gmdb component by gmoid",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Text",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@gmail.com",
	"stanza:contributor": [
],
	"stanza:created": "2021-03-07",
	"stanza:updated": "2021-03-07",
	"stanza:parameter": [
	{
		"stanza:key": "gmo_id",
		"stanza:example": "GMO_001005",
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
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <p class=\"simple-iteration\">Alternative labels:<br>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"alt_labels_en") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":6},"end":{"line":14,"column":15}}})) != null ? stack1 : "")
    + "    </p>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <span>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":22},"end":{"line":13,"column":52}}})) != null ? stack1 : "")
    + "</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return ", ";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <h3>Properties</h3>\n    <p class=\"simple-iteration\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":6},"end":{"line":25,"column":15}}})) != null ? stack1 : "")
    + "    </p>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <span>\n            "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label_en") || (depth0 != null ? lookupProperty(depth0,"label_en") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"label_en","hash":{},"data":data,"loc":{"start":{"line":23,"column":12},"end":{"line":23,"column":24}}}) : helper)))
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":24},"end":{"line":23,"column":54}}})) != null ? stack1 : "")
    + "\n          </span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <h3>Functions</h3>\n    <ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"roles") : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":6},"end":{"line":36,"column":15}}})) != null ? stack1 : "")
    + "    </ul>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li>\n          "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label_en") || (depth0 != null ? lookupProperty(depth0,"label_en") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label_en","hash":{},"data":data,"loc":{"start":{"line":34,"column":10},"end":{"line":34,"column":22}}}) : helper)))
    + "\n        </li>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <h3>Super classes</h3>\n    <ul class=\"id-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"super_classes") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":6},"end":{"line":48,"column":15}}})) != null ? stack1 : "")
    + "    </ul>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li>\n          <span><a href=\"/component/"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":45,"column":36},"end":{"line":45,"column":46}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":45,"column":48},"end":{"line":45,"column":58}}}) : helper)))
    + "</a></span>\n          <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"label_en") || (depth0 != null ? lookupProperty(depth0,"label_en") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_en","hash":{},"data":data,"loc":{"start":{"line":46,"column":16},"end":{"line":46,"column":28}}}) : helper)))
    + " </span>\n        </li>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <h3>Sub classes</h3>\n    <ul class=\"id-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"sub_classes") : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":55,"column":6},"end":{"line":60,"column":15}}})) != null ? stack1 : "")
    + "    </ul>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li>\n          <span><a href=\"/component/"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":57,"column":36},"end":{"line":57,"column":46}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":57,"column":48},"end":{"line":57,"column":58}}}) : helper)))
    + "</a></span>\n          <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"label_en") || (depth0 != null ? lookupProperty(depth0,"label_en") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label_en","hash":{},"data":data,"loc":{"start":{"line":58,"column":16},"end":{"line":58,"column":28}}}) : helper)))
    + "</span>\n        </li>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <h3>Links</h3>\n    <p>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"links") : depth0),{"name":"each","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":68,"column":6},"end":{"line":70,"column":15}}})) != null ? stack1 : "")
    + "    </p>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a class=\"link-btn\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"uri") || (depth0 != null ? lookupProperty(depth0,"uri") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uri","hash":{},"data":data,"loc":{"start":{"line":69,"column":34},"end":{"line":69,"column":41}}}) : helper)))
    + "\" target=\"_blank\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":69,"column":59},"end":{"line":69,"column":68}}}) : helper)))
    + "</a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"wrapper\">\n  <p class=\"gmo-id\">\n    <span class=\"key\">GMO ID: </span>\n    <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":4,"column":24},"end":{"line":4,"column":34}}}) : helper)))
    + "</span>\n  </p>\n  <p class=\"name\">\n    <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"pref_label") || (depth0 != null ? lookupProperty(depth0,"pref_label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pref_label","hash":{},"data":data,"loc":{"start":{"line":7,"column":24},"end":{"line":7,"column":38}}}) : helper)))
    + "</span>\n  </p>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"alt_labels_en") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":2},"end":{"line":16,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":2},"end":{"line":27,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"roles") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":2},"end":{"line":38,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"super_classes") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":2},"end":{"line":50,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"sub_classes") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":52,"column":2},"end":{"line":62,"column":9}}})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"links") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":65,"column":2},"end":{"line":72,"column":9}}})) != null ? stack1 : "")
    + "\n</div>\n";
},"useData":true}]
];

var css = "/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n  line-height: 1;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\nbody {\n  line-height: 1;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\na {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\n/* change colours to suit your needs */\nins {\n  background-color: #ff9;\n  color: #000;\n  text-decoration: none;\n}\n\n/* change colours to suit your needs */\nmark {\n  background-color: #ff9;\n  color: #000;\n  font-style: italic;\n  font-weight: bold;\n}\n\ndel {\n  text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n  border-bottom: 1px dotted;\n  cursor: help;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* change border colour to suit your needs */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #cccccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\ninput, select {\n  vertical-align: middle;\n}\n\n.wrapper {\n  font-size: 16px;\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  padding: 16px;\n  background-color: #FFFFFF;\n  border-radius: 5px;\n  font-weight: 300;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  color: #333333;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n}\n\nheader h2 {\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  -webkit-font-smoothing: antialiased;\n  font-size: 24px;\n  font-weight: 600;\n  margin-bottom: 8px;\n  padding-left: 8px;\n}\n\na {\n  color: #6FA80C;\n  text-decoration: underline;\n}\n\na:hover {\n  text-decoration: none;\n}\n\n.error {\n  color: #990000;\n}\n\n.name {\n  font-size: 40px;\n  margin: 24px 0 16px;\n}\n\nh3 {\n  font-weight: 600;\n  margin-top: 24px;\n  margin-bottom: 8px;\n  font-size: 20px;\n}\n\na.link-btn {\n  background-color: #8FC31F;\n  color: #FFFFFF;\n  padding: 4px 8px 2px;\n  border-radius: 3px;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 600;\n  display: inline-block;\n  line-height: 1;\n}\n\n.id-list {\n  line-height: 1.2;\n  margin-top: 8px;\n}\n.id-list li {\n  margin-top: 5px;\n  display: flex;\n  flex-wrap: wrap;\n}\n.id-list span:first-child {\n  margin-right: 10px;\n}";

defineStanzaElement(_default, {metadata, templates, css, url: import.meta.url});
//# sourceMappingURL=gmdb-component-by-gmoid.js.map
