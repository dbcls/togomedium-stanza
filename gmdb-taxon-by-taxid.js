import { c as createCommonjsModule, d as defineStanzaElement } from './stanza-element-e185656b.js';
import { g as getData_1 } from './get-data-bf06c788.js';
import { v as variables } from './variables-f1b7e272.js';
import { s as stanza } from './stanza-32f0aee1.js';
import { s as string } from './string-ca3486e9.js';

var taxon = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextTaxon = exports.getRankLevel = exports.availableRanks = exports.TAXON_RANK = void 0;
var TAXON_RANK;
(function (TAXON_RANK) {
    TAXON_RANK["_0_KINGDOM"] = "Kingdom";
    TAXON_RANK["_1_PHYLUM"] = "Phylum";
    TAXON_RANK["_2_CLASS"] = "Class";
    TAXON_RANK["_3_ORDER"] = "Order";
    TAXON_RANK["_4_FAMILY"] = "Family";
    TAXON_RANK["_5_TRIBE"] = "Tribe";
    TAXON_RANK["_6_GENUS"] = "Genus";
    TAXON_RANK["_7_SECTION"] = "Section";
    TAXON_RANK["_8_SERIES"] = "Series";
    TAXON_RANK["_9_SPECIES"] = "Species";
    TAXON_RANK["_10_VARIETY"] = "Variety";
    TAXON_RANK["_11_FORM"] = "Form";
})(TAXON_RANK = exports.TAXON_RANK || (exports.TAXON_RANK = {}));
exports.availableRanks = [
    TAXON_RANK._0_KINGDOM,
    TAXON_RANK._1_PHYLUM,
    TAXON_RANK._2_CLASS,
    TAXON_RANK._3_ORDER,
    TAXON_RANK._4_FAMILY,
    TAXON_RANK._6_GENUS,
    TAXON_RANK._9_SPECIES,
];
const getRankLevel = (rank) => {
    return exports.availableRanks.indexOf(rank);
};
exports.getRankLevel = getRankLevel;
const getNextTaxon = (rank) => {
    const rankLevel = exports.getRankLevel(rank);
    if (rankLevel === -1) {
        return undefined;
    }
    return exports.availableRanks[rankLevel + 1];
};
exports.getNextTaxon = getNextTaxon;

});

async function gmdbTaxonByTaxid(stanza$1, params) {
    if (!params.tax_id) {
        return;
    }
    const apiName = "gmdb_taxonomic_rank_by_taxid";
    const result = await getData_1.getData(`${variables.API_GROWTH_MEDIUM}${apiName}`, {
        tax_id: params.tax_id,
    });
    const data = parseData(result);
    const dataWithRankChildren = await addRankChildren(data);
    stanza$1.render({
        template: "stanza.html.hbs",
        parameters: dataWithRankChildren,
    });
    stanza.importWebFontForTogoMedium(stanza$1);
}
var _default = gmdbTaxonByTaxid;
const addRankChildren = async (data) => {
    if (!data.rank) {
        return data;
    }
    const rank = data.rank === "Superkingdom"
        ? taxon.TAXON_RANK._0_KINGDOM
        : data.rank;
    const nextRank = taxon.getNextTaxon(rank);
    const response = await getData_1.getData(`${variables.API_GROWTH_MEDIUM}list_taxons_by_rank`, {
        tax_id: data.taxid,
        rank: nextRank,
    });
    const getId = (str) => str.split("/").pop();
    const subClasses = response.body
        .sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    })
        .map((item) => ({
        label: item.name,
        link: makeLineageLink(getId(item.id), nextRank),
        rank: nextRank,
        togoGenomeUrl: string.makeTogoGenomeOrganismLink(getId(item.id)),
        ncbiUrl: string.makeNcbiOrganismLink(getId(item.id)),
    }));
    return { ...data, lineage: [...data.lineage, ...subClasses] };
};
const parseData = (data) => {
    return makeSuccessData(data.body);
};
const makeSuccessData = (body) => {
    return {
        scientific_name: body.scientific_name,
        taxid: body.taxid,
        togoGenomeUrl: string.makeTogoGenomeOrganismLink(body.taxid),
        ncbiUrl: string.makeNcbiOrganismLink(body.taxid),
        rank: parseRank(body.rank),
        authority_name: string.unescapeJsonString(body.authority_name),
        lineage: [
            ...body.lineage
                .filter((item) => item.taxid !== "NA")
                .map((item) => ({
                link: makeLineageLink(item.taxid, item.rank),
                rank: string.capitalizeFirstLetter(item.rank),
                label: item.label,
                togoGenomeUrl: string.makeTogoGenomeOrganismLink(item.taxid),
                ncbiUrl: string.makeNcbiOrganismLink(item.taxid),
            })),
            {
                link: makeLineageLink(body.taxid, body.rank),
                rank: parseRank(body.rank),
                label: body.scientific_name,
                togoGenomeUrl: string.makeTogoGenomeOrganismLink(body.taxid),
                ncbiUrl: string.makeNcbiOrganismLink(body.taxid),
                current: true,
            },
        ],
    };
};
const parseRank = (str) => str === null || str === void 0 ? void 0 : str.split("/").pop();
const makeLineageLink = (id, rank) => rank === taxon.TAXON_RANK._9_SPECIES ? `/organism/${id}` : `/taxon/${id}`;

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-taxon-by-taxid",
	"stanza:label": "Gmdb taxon by taxid",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
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
		"stanza:key": "tax_id",
		"stanza:example": "183924",
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

  return " <span>Authority name</span>: "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"authority_name") || (depth0 != null ? lookupProperty(depth0,"authority_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"authority_name","hash":{},"data":data,"loc":{"start":{"line":11,"column":80},"end":{"line":11,"column":98}}}) : helper)))
    + " ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <tr "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"current") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":10},"end":{"line":15,"column":44}}})) != null ? stack1 : "")
    + ">\n        <th>"
    + alias4(((helper = (helper = lookupProperty(helpers,"rank") || (depth0 != null ? lookupProperty(depth0,"rank") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rank","hash":{},"data":data,"loc":{"start":{"line":16,"column":12},"end":{"line":16,"column":20}}}) : helper)))
    + "</th>\n        <td>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"current") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":10},"end":{"line":20,"column":17}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"current") : depth0),{"name":"unless","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":10},"end":{"line":23,"column":21}}})) != null ? stack1 : "")
    + "        </td>\n        <td>\n          <a class=\"link-btn\" target=\"_blank\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"ncbiUrl") || (depth0 != null ? lookupProperty(depth0,"ncbiUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ncbiUrl","hash":{},"data":data,"loc":{"start":{"line":26,"column":52},"end":{"line":26,"column":63}}}) : helper)))
    + "\">NCBI</a>\n          <a class=\"link-btn\" target=\"_blank\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"togoGenomeUrl") || (depth0 != null ? lookupProperty(depth0,"togoGenomeUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"togoGenomeUrl","hash":{},"data":data,"loc":{"start":{"line":27,"column":52},"end":{"line":27,"column":69}}}) : helper)))
    + "\">TogoGenome</a>\n        </td>\n      </tr>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "data-current";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <span>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data,"loc":{"start":{"line":19,"column":18},"end":{"line":19,"column":27}}}) : helper)))
    + "</span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <a href="
    + alias4(((helper = (helper = lookupProperty(helpers,"link") || (depth0 != null ? lookupProperty(depth0,"link") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":22,"column":20},"end":{"line":22,"column":28}}}) : helper)))
    + ">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":22,"column":29},"end":{"line":22,"column":38}}}) : helper)))
    + "</a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"wrapper\">\n  <p class=\"tax-id\">\n    <span class=\"key\">Taxonomy ID: </span>\n    <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"taxid") || (depth0 != null ? lookupProperty(depth0,"taxid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taxid","hash":{},"data":data,"loc":{"start":{"line":4,"column":24},"end":{"line":4,"column":33}}}) : helper)))
    + "</span>\n    <span class=\"links\">\n      <a class=\"link-btn\" target=\"_blank\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"ncbiUrl") || (depth0 != null ? lookupProperty(depth0,"ncbiUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ncbiUrl","hash":{},"data":data,"loc":{"start":{"line":6,"column":48},"end":{"line":6,"column":59}}}) : helper)))
    + "\">NCBI</a>\n      <a class=\"link-btn\" target=\"_blank\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"togoGenomeUrl") || (depth0 != null ? lookupProperty(depth0,"togoGenomeUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"togoGenomeUrl","hash":{},"data":data,"loc":{"start":{"line":7,"column":48},"end":{"line":7,"column":65}}}) : helper)))
    + "\">TogoGenome</a>\n    </span>\n  </p>\n  <p class=\"name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"scientific_name") || (depth0 != null ? lookupProperty(depth0,"scientific_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scientific_name","hash":{},"data":data,"loc":{"start":{"line":10,"column":18},"end":{"line":10,"column":37}}}) : helper)))
    + "</p>\n  <p class=\"authority-name\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"authority_name") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":28},"end":{"line":11,"column":106}}})) != null ? stack1 : "")
    + "</p>\n  <h3>Lineage</h3>\n  <table class=\"lineage-table\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"lineage") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":4},"end":{"line":30,"column":13}}})) != null ? stack1 : "")
    + "  </table>\n</div>\n";
},"useData":true}]
];

var css = "/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\nbody {\n  line-height: 1;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\na {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\n/* change colours to suit your needs */\nins {\n  background-color: #ff9;\n  color: #000;\n  text-decoration: none;\n}\n\n/* change colours to suit your needs */\nmark {\n  background-color: #ff9;\n  color: #000;\n  font-style: italic;\n  font-weight: bold;\n}\n\ndel {\n  text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n  border-bottom: 1px dotted;\n  cursor: help;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* change border colour to suit your needs */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #cccccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\ninput, select {\n  vertical-align: middle;\n}\n\n.wrapper {\n  font-size: 16px;\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 5px;\n  font-weight: 300;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: auto;\n  font-smoothing: antialiased;\n  color: #333;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n}\n\na {\n  color: #6FA80C;\n}\n\n.link-btn {\n  background-color: #8FC31F;\n  color: #FFF;\n  padding: 4px 8px 2px;\n  border-radius: 3px;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 600;\n  display: inline-block;\n  line-height: 1;\n}\n\n.tax-id .value {\n  margin: 0 16px 0 4px;\n  line-height: 1.5;\n}\n\n.tax-id .links {\n  position: relative;\n  top: -2px;\n  margin-top: 4px;\n  white-space: nowrap;\n}\n\n.name {\n  margin: 24px 0 16px;\n  font-size: 40px;\n}\n\n.authority-name {\n  margin-top: -16px;\n}\n\nh3 {\n  font-weight: 600;\n  margin-top: 24px;\n  font-size: 20px;\n}\n\n.lineage-table {\n  border: 1px solid #ddd;\n  border-collapse: collapse;\n  border-radius: 5px;\n}\n.lineage-table th, .lineage-table td {\n  padding: 4px 32px 4px 8px;\n  border: 1px solid #ddd;\n  text-align: left;\n  font-weight: 300;\n}\n.lineage-table tr[data-current] {\n  background-color: #efefef;\n}\n.lineage-table tr[data-current] th, .lineage-table tr[data-current] td {\n  font-weight: bold;\n}";

defineStanzaElement(_default, {metadata, templates, css, url: import.meta.url});
//# sourceMappingURL=gmdb-taxon-by-taxid.js.map
