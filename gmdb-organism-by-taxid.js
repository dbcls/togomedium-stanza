import { c as createCommonjsModule, a as getDefaultExportFromCjs, d as defineStanzaElement } from './stanza-element-e185656b.js';
import { g as getData_1 } from './get-data-bf06c788.js';
import { v as variables } from './variables-56399012.js';
import { s as stanza } from './stanza-32f0aee1.js';
import { s as string } from './string-ca3486e9.js';

var gmdbOrganismByTaxid_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.__TEST__ = void 0;




async function gmdbOrganismByTaxid(stanza$1, params) {
    if (!params.tax_id) {
        return;
    }
    const apiName = "gmdb_organism_by_taxid";
    const result = await getData_1.getData(`${variables.API_DBCLS}${apiName}`, {
        tax_id: params.tax_id,
    });
    const data = parseData(result);
    stanza$1.render({
        template: "stanza.html.hbs",
        parameters: data,
    });
    stanza.importWebFontForTogoMedium(stanza$1);
}
exports.default = gmdbOrganismByTaxid;
const parseData = (data) => {
    return makeSuccessData(data.body);
};
const makeSuccessData = (body) => ({
    taxid: body.taxid,
    scientific_name: body.scientific_name,
    authority_name: string.unescapeJsonString(body.authority_name),
    lineage: body.lineage,
    type_material: body.type_material,
    other_type_material: parseOtherTypeMaterial(body.other_type_material),
});
const parseOtherTypeMaterial = (data) => {
    return data
        .map((obj) => obj.name)
        .reduce((a, b) => {
        if (a.indexOf(b) < 0) {
            a.push(b);
        }
        return a;
    }, [])
        .map((key) => ({
        key,
        labels: data.filter((item) => item.name === key).map((elm) => elm.label),
    }));
};
exports.__TEST__ = { parseOtherTypeMaterial };

});

var main = /*@__PURE__*/getDefaultExportFromCjs(gmdbOrganismByTaxid_1);

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-organism-by-taxid",
	"stanza:label": "Gmdb organism by taxid",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@gmail.com",
	"stanza:contributor": [
],
	"stanza:created": "2021-03-06",
	"stanza:updated": "2021-03-06",
	"stanza:parameter": [
	{
		"stanza:key": "tax_id",
		"stanza:example": "1254",
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

  return "    <p class=\"tax-id\">\n      <span class=\"key\">Taxonomy ID: </span>\n      <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"taxid") || (depth0 != null ? lookupProperty(depth0,"taxid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taxid","hash":{},"data":data,"loc":{"start":{"line":10,"column":26},"end":{"line":10,"column":35}}}) : helper)))
    + "</span>\n      <span class=\"links\">\n        <a class=\"link-btn\" target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id="
    + alias4(((helper = (helper = lookupProperty(helpers,"taxid") || (depth0 != null ? lookupProperty(depth0,"taxid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taxid","hash":{},"data":data,"loc":{"start":{"line":12,"column":120},"end":{"line":12,"column":129}}}) : helper)))
    + "\">NCBI</a>\n        <a class=\"link-btn\" target=\"_blank\" href=\"http://togogenome.org/organism/"
    + alias4(((helper = (helper = lookupProperty(helpers,"taxid") || (depth0 != null ? lookupProperty(depth0,"taxid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taxid","hash":{},"data":data,"loc":{"start":{"line":13,"column":81},"end":{"line":13,"column":90}}}) : helper)))
    + "\">TogoGenome</a>\n      </span>\n\n\n    </p>\n    <p class=\"name\">\n      <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"scientific_name") || (depth0 != null ? lookupProperty(depth0,"scientific_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scientific_name","hash":{},"data":data,"loc":{"start":{"line":19,"column":26},"end":{"line":19,"column":45}}}) : helper)))
    + "</span>\n    </p>\n    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"authority_name") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":4},"end":{"line":21,"column":72}}})) != null ? stack1 : "")
    + "\n\n    <h3>Lineage</h3>\n    <ul class=\"lineage-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"lineage") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":6},"end":{"line":33,"column":15}}})) != null ? stack1 : "")
    + "    </ul>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"type_material") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":4},"end":{"line":43,"column":11}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"other_type_material") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":4},"end":{"line":57,"column":11}}})) != null ? stack1 : "")
    + "\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " Authority name:<br>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"authority_name") || (depth0 != null ? lookupProperty(depth0,"authority_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"authority_name","hash":{},"data":data,"loc":{"start":{"line":21,"column":46},"end":{"line":21,"column":64}}}) : helper)))
    + " ";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li class=\"list-group-item\">\n          <span class=\"rank\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"rank") || (depth0 != null ? lookupProperty(depth0,"rank") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rank","hash":{},"data":data,"loc":{"start":{"line":27,"column":29},"end":{"line":27,"column":37}}}) : helper)))
    + "</span>\n          <span class=\"label\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":28,"column":30},"end":{"line":28,"column":39}}}) : helper)))
    + "\n            <a class=\"link-btn\" target=\"_blank\"\n               href=\"https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id="
    + alias4(((helper = (helper = lookupProperty(helpers,"taxid") || (depth0 != null ? lookupProperty(depth0,"taxid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taxid","hash":{},"data":data,"loc":{"start":{"line":30,"column":91},"end":{"line":30,"column":100}}}) : helper)))
    + "\">NCBI</a>\n          </span>\n        </li>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <h3>Type strains</h3>\n      <ul class=\"capsule-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"type_material") : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":8},"end":{"line":41,"column":17}}})) != null ? stack1 : "")
    + "      </ul>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <li>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data,"loc":{"start":{"line":40,"column":14},"end":{"line":40,"column":23}}}) : helper)))
    + "</li>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"other_type_material") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":6},"end":{"line":56,"column":15}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <h3>Heterotypic synonyms: "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":47,"column":34},"end":{"line":47,"column":41}}}) : helper)))
    + "</h3>\n        <div class=\"synonyms\">\n          <h4>Type strains</h4>\n          <ul class=\"capsule-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"labels") : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":12},"end":{"line":53,"column":21}}})) != null ? stack1 : "")
    + "          </ul>\n        </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "              <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\n";
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
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":59,"column":13}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true}]
];

var css = "/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\nbody {\n  line-height: 1;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\na {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\n/* change colours to suit your needs */\nins {\n  background-color: #ff9;\n  color: #000;\n  text-decoration: none;\n}\n\n/* change colours to suit your needs */\nmark {\n  background-color: #ff9;\n  color: #000;\n  font-style: italic;\n  font-weight: bold;\n}\n\ndel {\n  text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n  border-bottom: 1px dotted;\n  cursor: help;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* change border colour to suit your needs */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #cccccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\ninput, select {\n  vertical-align: middle;\n}\n\n.wrapper {\n  font-size: 16px;\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 5px;\n  font-weight: 300;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: antialiased;\n  font-smoothing: antialiased;\n  color: #333;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n}\n\na {\n  color: #6FA80C;\n}\n\n.link-btn {\n  background-color: #8FC31F;\n  color: #FFF;\n  padding: 4px 8px 2px;\n  border-radius: 3px;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 600;\n  display: inline-block;\n  line-height: 1;\n}\n\n.tax-id .value {\n  margin: 0 16px 0 4px;\n  line-height: 1.5;\n}\n\n.tax-id .links {\n  position: relative;\n  top: -2px;\n  margin-top: 4px;\n  white-space: nowrap;\n}\n\n.name {\n  margin: 24px 0 16px;\n}\n\n.name .value {\n  font-size: 40px;\n}\n\nh3 {\n  font-weight: 600;\n  margin-top: 24px;\n  font-size: 20px;\n}\n\n.simple-list {\n  line-height: 1.2;\n  margin-top: 8px;\n}\n\n.lineage-list {\n  display: flex;\n  margin-top: 8px;\n  flex-wrap: wrap;\n  margin-bottom: -8px;\n}\n\n.lineage-list li {\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  margin-right: 16px;\n  margin-bottom: 8px;\n  border: 1px solid #ddd;\n  border-radius: 5px;\n}\n\n.lineage-list .rank {\n  border-bottom: 1px solid #ddd;\n  padding: 4px 8px;\n}\n\n.lineage-list .label {\n  padding: 4px 8px;\n}\n\n.capsule-list {\n  margin-top: 8px;\n  margin-bottom: -8px;\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.capsule-list li {\n  border: 1px solid #6FA80C;\n  padding: 5px 10px;\n  border-radius: 20px;\n  margin-right: 8px;\n  margin-bottom: 8px;\n}\n\n.synonyms {\n  margin-left: 20px;\n  margin-top: 8px;\n}";

defineStanzaElement(main, {metadata, templates, css, url: import.meta.url});
//# sourceMappingURL=gmdb-organism-by-taxid.js.map
