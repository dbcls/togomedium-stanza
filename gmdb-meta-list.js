import { c as createCommonjsModule, a as getDefaultExportFromCjs, d as defineStanzaElement } from './stanza-element-e185656b.js';
import { g as getData_1 } from './get-data-bf06c788.js';

var gmdbMetaList = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.__TEST__ = void 0;

async function metaList(stanza, stanzaParams) {
    if (!stanzaParams.api_url) {
        return;
    }
    const offset = 0;
    const data = await fetchData(stanzaParams.api_url, offset, parseInt(stanzaParams.limit, 10));
    const templateParams = processData(data, offset, stanzaParams);
    render(stanza, templateParams, stanzaParams);
}
exports.default = metaList;
const render = (stanza, parameters, stanzaParams) => {
    var _a, _b;
    const limit = parseInt(stanzaParams.limit, 10);
    stanza.render({
        template: "stanza.html.hbs",
        parameters,
    });
    stanza.importWebFontCSS("https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@300;400&display=swap");
    (_a = stanza.root.querySelector("#btnPrev")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", async () => {
        await movePage(stanza, parameters, stanzaParams, limit, DIRECTION.PREV);
    });
    (_b = stanza.root.querySelector("#btnNext")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", async () => {
        await movePage(stanza, parameters, stanzaParams, limit, DIRECTION.NEXT);
    });
};
const movePage = async (stanza, templateParams, stanzaParams, limit, direction) => {
    render(stanza, { ...templateParams, isLoading: true }, stanzaParams);
    const offset = templateParams.offset + limit * direction;
    const data = await fetchData(stanzaParams.api_url, offset, limit);
    const params = processData(data, offset, stanzaParams);
    render(stanza, params, stanzaParams);
};
const processData = (response, offset, stanzaParams) => {
    switch (response.status) {
        case 200:
            return makeSuccessData(response, offset, stanzaParams);
        default:
            return makeFailParams(response, stanzaParams);
    }
};
const makeSuccessData = (response, offset, stanzaParams) => {
    if (response.body.contents.length === 0) {
        return makeNotFoundParams(stanzaParams);
    }
    const columnLabels = response.body.columns.map((item) => item.label);
    const keys = response.body.columns.map((item) => item.key);
    const noWraps = {};
    response.body.columns.forEach((item) => (noWraps[item.key] = item.nowrap));
    const data = response.body.contents.map((item) => {
        const result = [];
        keys.forEach((key) => {
            let value;
            if (typeof item[key] === "string") {
                value = { label: item[key] };
            }
            else {
                value = item[key];
            }
            if (noWraps[key]) {
                value.nowrap = true;
            }
            result.push(value);
        });
        return result;
    });
    const total = response.body.total;
    const _end = parseInt(stanzaParams.limit, 10) + offset;
    const end = _end <= total ? _end : total;
    const hasPrev = offset !== 0;
    const hasNext = end < total;
    const title = stanzaParams.title;
    const info = hasNext || hasPrev
        ? `showing ${offset + 1} to ${end} of total ${total} items`
        : `total ${total} items`;
    const _columns = stanzaParams.column_names;
    const showColumnNames = _columns.toLocaleLowerCase() === "false"
        ? false
        : Boolean(stanzaParams.column_names);
    return {
        title,
        offset,
        columnLabels,
        data,
        hasNext,
        hasPrev,
        info,
        showColumnNames,
        status: 200,
        statusText: "",
    };
};
const makeNotFoundParams = (stanzaParams) => {
    return {
        title: stanzaParams.title,
        offset: 0,
        columnLabels: null,
        data: null,
        hasNext: false,
        hasPrev: false,
        info: null,
        showColumnNames: false,
        status: null,
        statusText: "NO RESULT FOUND",
    };
};
const makeFailParams = (response, stanzaParams) => {
    return {
        title: stanzaParams.title,
        offset: 0,
        columnLabels: null,
        data: null,
        hasNext: false,
        hasPrev: false,
        info: null,
        showColumnNames: false,
        status: response.status,
        statusText: response.status ? response.message : "UNKNOWN ERROR",
    };
};
const fetchData = async (url, offset, limit) => {
    return fetchLive(url, offset, limit);
};
const fetchLive = async (url, offset, limit) => {
    const [uri, query] = separateURL(url);
    const response = await fetch(uri, makeOptions({ offset, limit }, query));
    if (response.status !== 200) {
        return {
            status: response.status,
            message: response.statusText,
            body: null,
        };
    }
    const body = await response.json();
    return {
        status: 200,
        body,
    };
};
const makeOptions = (params, query) => {
    const body = `${filterQuery(query)}&${getData_1.makeFormBody(params)}`;
    return {
        method: "POST",
        mode: "cors",
        body,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
};
const filterQuery = (query) => {
    if (!query) {
        return "";
    }
    let isOmitted = false;
    const result = query
        .split("&")
        .filter((str) => {
        const reg = /(.*)=(.*)/.exec(str);
        const [key, value] = [reg[1], reg[2]];
        switch (key) {
            case "limit":
            case "offset":
                isOmitted = true;
                return false;
            default:
                return true;
        }
    })
        .join("&");
    if (isOmitted) {
        console.warn("limit and offset on API_URL have been omitted as they are set from the Stanza");
    }
    return result;
};
const separateURL = (url) => {
    const separated = /(.*)\?(.*)/.exec(url);
    let uri, query;
    if (separated) {
        uri = separated[1];
        query = separated[2];
    }
    else {
        uri = url;
        query = "";
    }
    return [uri, query];
};
exports.__TEST__ = { separateURL, filterQuery, makeFormBody: getData_1.makeFormBody };
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["NEXT"] = 1] = "NEXT";
    DIRECTION[DIRECTION["PREV"] = -1] = "PREV";
})(DIRECTION || (DIRECTION = {}));

});

var main = /*@__PURE__*/getDefaultExportFromCjs(gmdbMetaList);

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-meta-list",
	"stanza:label": "GMDB meta list",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2021-02-19",
	"stanza:updated": "2021-02-19",
	"stanza:parameter": [
	{
		"stanza:key": "api_url",
		"stanza:example": "http://growthmedium.org/sparqlist/api/gmdb_organisms_by_gmid?gm_id=HM_D00756b",
		"stanza:description": "URL of the SPARQList API with queries",
		"stanza:required": true
	},
	{
		"stanza:key": "limit",
		"stanza:example": "10",
		"stanza:description": "limit",
		"stanza:required": true
	},
	{
		"stanza:key": "title",
		"stanza:example": "Similar Growth Media of JCM M25",
		"stanza:description": "title",
		"stanza:required": false
	},
	{
		"stanza:key": "column_names",
		"stanza:example": "true",
		"stanza:description": "whether display column names",
		"stanza:required": true
	}
],
	"stanza:about-link-placement": "bottom-right",
	"stanza:style": [
	{
		"stanza:key": "--link-color",
		"stanza:type": "color",
		"stanza:default": "#6FA80C",
		"stanza:description": "text color of greeting"
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

  return "  <header>\n    <h2>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":17}}}) : helper)))
    + "</h2>\n  </header>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"wrapper\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":23},"end":{"line":7,"column":63}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"data") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":48,"column":11}}})) != null ? stack1 : "")
    + "  </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return " data-is-loading";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <table>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"showColumnNames") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":8},"end":{"line":16,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"data") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":8},"end":{"line":35,"column":17}}})) != null ? stack1 : "")
    + "      </table>\n      <footer>\n        <div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasPrev") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":10},"end":{"line":41,"column":17}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasNext") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":10},"end":{"line":44,"column":17}}})) != null ? stack1 : "")
    + "        </div>\n        <p class=\"info\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"info") || (depth0 != null ? lookupProperty(depth0,"info") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"info","hash":{},"data":data,"loc":{"start":{"line":46,"column":24},"end":{"line":46,"column":32}}}) : helper)))
    + "</p>\n      </footer>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"columnLabels") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":12},"end":{"line":14,"column":21}}})) != null ? stack1 : "")
    + "          </tr>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "              <th>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</th>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":12},"end":{"line":33,"column":21}}})) != null ? stack1 : "")
    + "          </tr>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"nowrap") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":14},"end":{"line":22,"column":21}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"nowrap") : depth0),{"name":"unless","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":14},"end":{"line":25,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"href") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":14},"end":{"line":28,"column":21}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"href") : depth0),{"name":"unless","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":14},"end":{"line":31,"column":25}}})) != null ? stack1 : "")
    + "            </td>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "              <td class=\"no-wrap\">\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "              <td>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"label") : depth0), depth0))
    + "</a>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"label") : depth0), depth0))
    + "\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "            <button id=\"btnPrev\">PREV</button>\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "            <button id=\"btnNext\">NEXT</button>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"error\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"status") : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":4},"end":{"line":55,"column":11}}})) != null ? stack1 : "")
    + "    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"statusText") || (depth0 != null ? lookupProperty(depth0,"statusText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"statusText","hash":{},"data":data,"loc":{"start":{"line":56,"column":4},"end":{"line":56,"column":18}}}) : helper)))
    + "\n  </div>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      ERROR "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"status") || (depth0 != null ? lookupProperty(depth0,"status") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"status","hash":{},"data":data,"loc":{"start":{"line":54,"column":12},"end":{"line":54,"column":22}}}) : helper)))
    + "<br>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"title") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":5,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"info") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":0},"end":{"line":50,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"info") : depth0),{"name":"unless","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":0},"end":{"line":58,"column":11}}})) != null ? stack1 : "");
},"useData":true}]
];

var css = "/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\nbody {\n  line-height: 1;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\na {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\n/* change colours to suit your needs */\nins {\n  background-color: #ff9;\n  color: #000;\n  text-decoration: none;\n}\n\n/* change colours to suit your needs */\nmark {\n  background-color: #ff9;\n  color: #000;\n  font-style: italic;\n  font-weight: bold;\n}\n\ndel {\n  text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n  border-bottom: 1px dotted;\n  cursor: help;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* change border colour to suit your needs */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #cccccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\ninput, select {\n  vertical-align: middle;\n}\n\n.wrapper {\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 5px;\n  font-weight: 300;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  color: #333;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n  position: relative;\n}\n\n.wrapper[data-is-loading]:after {\n  content: \"loading...\";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  background-color: rgba(255, 255, 255, 0.8);\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 5px;\n}\n\ntable {\n  border: 1px solid #CCC;\n  border-radius: 5px;\n  width: 100%;\n  font-size: 16px;\n  border-collapse: collapse;\n}\n\ntd, th {\n  padding: 6px 8px;\n  border-bottom: 1px solid #CCC;\n  text-align: left;\n  line-height: 1.2;\n}\n\n.no-wrap {\n  white-space: nowrap;\n}\n\ntable tr:nth-child(2n) {\n  background-color: #f6f6f6;\n}\n\na {\n  color: var(--link-color);\n}\n\nheader h2 {\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  font-size: 24px;\n  font-weight: 400;\n  margin-bottom: 8px;\n  padding-left: 8px;\n}\n\nfooter {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 12px;\n}\n\nfooter .info {\n  font-size: 14px;\n  padding-right: 8px;\n}\n\n.error {\n  background-color: #FFFFFF;\n  padding: 16px;\n  border-radius: 5px;\n  color: #990000;\n}";

defineStanzaElement(main, {metadata, templates, css, url: import.meta.url});
//# sourceMappingURL=gmdb-meta-list.js.map
