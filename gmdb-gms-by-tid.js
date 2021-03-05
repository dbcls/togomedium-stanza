import { c as createCommonjsModule, d as defineStanzaElement } from './stanza-element-e185656b.js';
import { g as getData_1 } from './get-data-f67c114f.js';
import { d as d3 } from './index-b1dff03b.js';

createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClass = exports.remapQueriedItems = void 0;
function remapQueriedItems(items) {
    let elms = [], i = 0, l = items.length;
    for (; i < l; i++) {
        items[i];
        elms.push(items[i]);
    }
    return elms;
}
exports.remapQueriedItems = remapQueriedItems;
function addClass(target, ...token) {
    if (target instanceof NodeList) {
        target = remapQueriedItems(target);
    }
    if (target instanceof Array) {
        target.forEach((elm) => {
            elm.classList.add(...token);
        });
    }
    else {
        target.classList.add(...token);
    }
}
exports.addClass = addClass;

});

let mouseX = 0;
let mouseY = 0;
document.body.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
async function gmdbGmsByTid(stanza, params) {
    const apiName = "gms_by_kegg_tids_3";
    const result = await getData_1.getData(`${getData_1.API_DBCLS}${apiName}`, {
        t_id: params.t_id,
    });
    const { sorted_groups } = processData(result.body);
    stanza.render({
        template: "stanza.html.hbs",
        parameters: {},
    });
    makeTable(stanza.root.querySelector("#table_area"), result.body, sorted_groups);
}
var _default = gmdbGmsByTid;
const processData = (json) => {
    let group_count = {};
    let group_label = {};
    for (let gm of json.growth_media) {
        let groups = Object.keys(gm.components_group);
        for (let group of groups) {
            if (!group_count[group]) {
                group_count[group] = 0;
                group_label[group] = gm.components_group[group].label;
            }
            group_count[group]++;
        }
    }
    let groups = Object.keys(group_count).map(function (group) {
        return { uri: group, count: group_count[group], label: group_label[group] };
    });
    let sorted_groups = groups.sort(function (a, b) {
        if (a.count > b.count) {
            return -1;
        }
        if (a.count < b.count) {
            return 1;
        }
        return 0;
    });
    for (let gm of json.growth_media) {
        gm.components_group_list = [];
        for (let group of sorted_groups) {
            if (gm.components_group[group.uri]) {
                gm.components_group_list.push({
                    elements: gm.components_group[group.uri].elements,
                });
            }
            else {
                gm.components_group_list.push({ elements: [] });
            }
        }
    }
    return { sorted_groups };
};
const makeTable = (div, data, sorted_groups) => {
    let renderDiv = d3.select(div);
    let mainTable = renderDiv.append("table");
    renderDiv
        .append("div")
        .attr("id", "popup")
        .style("display", "none")
        .style("position", "fixed")
        .style("padding", "10px")
        .style("background-color", "rgba(255,255,255,0.75)")
        .style("border", "solid 2px #888888")
        .style("max-width", "300px")
        .style("z-index", 10);
    let thead = mainTable.append("thead");
    let tr = thead.append("tr");
    tr.append("th").attr("class", "header").text("Medium");
    tr.append("th").attr("class", "header").text("Organisms");
    tr.append("th")
        .attr("class", "header")
        .attr("colspan", sorted_groups.length)
        .text("Components");
    tr = thead.append("tr");
    tr.append("th");
    tr.append("th");
    tr.selectAll(".role_component")
        .data(sorted_groups)
        .enter()
        .append("th")
        .attr("class", "role_component")
        .append("a")
        .attr("href", function (d) {
        return "/component/" + d.uri.replace("http://purl.jp/bio/10/gmo/", "");
    })
        .append("div")
        .attr("class", "entypo-db-shape role_component_style")
        .on("mouseover", function (e, d) {
        renderDiv
            .select("#popup")
            .style("left", mouseX + 10 + "px")
            .style("top", mouseY - 10 + "px")
            .style("display", "block")
            .text(d.label);
    })
        .on("mouseout", function (d) {
        renderDiv.select("#popup").style("display", "none");
    });
    let tbody = mainTable.append("tbody");
    tr = tbody
        .selectAll(".organism_line")
        .data(data.growth_media)
        .enter()
        .append("tr")
        .attr("class", "organism_line");
    tr.append("td")
        .attr("class", "medium")
        .append("a")
        .attr("href", function (d) {
        return "/medium/" + d.uri.replace("http://purl.jp/bio/10/gm/", "");
    })
        .text(function (d) {
        return d.uri.replace("http://purl.jp/bio/10/gm/", "");
    })
        .on("mouseover", function (d) {
        renderDiv
            .select("#popup")
            .style("left", mouseX + 10 + "px")
            .style("top", mouseY - 10 + "px")
            .style("display", "block")
            .text(d.label);
    })
        .on("mouseout", function (d) {
        renderDiv.select("#popup").style("display", "none");
    });
    tr.append("td")
        .attr("class", "organism")
        .html(function (d) {
        return d.species.map((x) => x.tid).join("<br>");
    })
        .on("mouseover", function (d) {
        renderDiv
            .select("#popup")
            .style("left", mouseX + 10 + "px")
            .style("top", mouseY - 10 + "px")
            .style("display", "block")
            .html(d.species.map((x) => x.label).join("<br>"));
    })
        .on("mouseout", function (d) {
        renderDiv.select("#popup").style("display", "none");
    });
    tr
        .selectAll(".component")
        .data(function (d) {
        return d.components_group_list;
    })
        .enter()
        .append("td")
        .attr("class", "component")
        .filter(function (d) {
        return d.elements[0];
    })
        .selectAll(".medium_list")
        .data(function (d) {
        return d.elements;
    })
        .enter()
        .append("a")
        .attr("class", "medium_list")
        .attr("href", function (d) {
        return ("/component/" +
            d.component.uri.replace("http://purl.jp/bio/10/gmo/", ""));
    })
        .append("div")
        .attr("class", "entypo-db-shape component_style")
        .on("mouseover", function (e, d) {
        renderDiv
            .select("#popup")
            .style("left", mouseX + 10 + "px")
            .style("top", mouseY - 10 + "px")
            .style("display", "block")
            .text(d.component.label);
    })
        .on("mouseout", function (d) {
        renderDiv.select("#popup").style("display", "none");
    });
    let tfoot = mainTable.append("tfoot");
    tr = tfoot.append("tr");
    tr.append("td");
    tr.append("td");
    tr.selectAll(".component_label")
        .data(sorted_groups)
        .enter()
        .append("td")
        .attr("class", "component_label")
        .append("p")
        .text(function (d) {
        return d.label;
    });
    const subTable = makeSubTable(renderDiv, data);
    fitSubTableHeight(mainTable.node(), subTable.node());
    makeScrollable(renderDiv.node(), mainTable.node(), subTable.node());
};
const makeSubTable = (renderDiv, data) => {
    const subTable = renderDiv.append("table");
    subTable.classed("sub-table", true);
    let thead = subTable.append("thead");
    let tr = thead.append("tr");
    tr.append("th").attr("class", "header").text("Medium");
    tr.append("th").attr("class", "header").text("Organisms");
    tr = thead.append("tr");
    tr.append("th");
    tr.append("th");
    let tbody = subTable.append("tbody");
    tr = tbody
        .selectAll(".organism_line")
        .data(data.growth_media)
        .enter()
        .append("tr")
        .attr("class", "organism_line");
    tr.append("td")
        .attr("class", "medium")
        .append("a")
        .attr("href", (d) => {
        return "/medium/" + d.uri.replace("http://purl.jp/bio/10/gm/", "");
    })
        .text((d) => {
        return d.uri.replace("http://purl.jp/bio/10/gm/", "");
    })
        .on("mouseover", (e, d) => {
        renderDiv
            .select("#popup")
            .style("left", mouseX + 10 + "px")
            .style("top", mouseY - 10 + "px")
            .style("display", "block")
            .text(d.label);
    })
        .on("mouseout", (e, d) => {
        renderDiv.select("#popup").style("display", "none");
    });
    tr.append("td")
        .attr("class", "organism")
        .html((d) => {
        return d.species.map((x) => x.tid).join("<br>");
    })
        .on("mouseover", (e, d) => {
        renderDiv
            .select("#popup")
            .style("left", mouseX + 10 + "px")
            .style("top", mouseY - 10 + "px")
            .style("display", "block")
            .html(d.species.map((x) => x.label).join("<br>"));
    })
        .on("mouseout", (d) => {
        renderDiv.select("#popup").style("display", "none");
    });
    let tfoot = subTable.append("tfoot");
    tr = tfoot.append("tr");
    tr.append("td");
    tr.append("td");
    return subTable;
};
const fitSubTableHeight = (main, sub) => {
    const header2Height = main
        .querySelector("thead tr:nth-child(2) th")
        .getBoundingClientRect().height;
    sub.querySelector("thead tr:nth-child(2) th").style.height = `${header2Height}px`;
    const footerHeight = main.querySelector("tfoot td").getBoundingClientRect()
        .height;
    sub.querySelector("tfoot td").style.height = `${footerHeight}px`;
    const mainBodyRows = main.querySelectorAll("tbody tr");
    const subBodyRows = sub.querySelectorAll("tbody tr");
    mainBodyRows.forEach((elm, i) => {
        const bound = elm.getBoundingClientRect();
        subBodyRows[i].style.width = `${bound.width}px`;
        subBodyRows[i].style.height = `${bound.height}px`;
    });
};
const makeScrollable = (wrapper, main, sub) => {
    const scroller = document.createElement("div");
    scroller.classList.add("scroller");
    wrapper.prepend(scroller);
    scroller.append(main);
    wrapper.style.position = "relative";
    scroller.style.overflowX = "auto";
    sub.style.position = "absolute";
    sub.style.left = "0";
    sub.style.top = "0";
};

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-gms-by-tid",
	"stanza:label": "Gmdb gms by tid",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2021-02-22",
	"stanza:updated": "2021-02-22",
	"stanza:parameter": [
	{
		"stanza:key": "t_id",
		"stanza:example": "T00077,T00741,T03382,T03902,T02663,T03900,T00022,T02976,T05425",
		"stanza:description": "KEGG organism identifier",
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
  ["stanza.html.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"wrapper\">\n  <div class=\"inner\">\n    <div id=\"table_area\"></div>\n  </div>\n</div>\n";
},"useData":true}]
];

var css = "/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\nbody {\n  line-height: 1;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\na {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\n/* change colours to suit your needs */\nins {\n  background-color: #ff9;\n  color: #000;\n  text-decoration: none;\n}\n\n/* change colours to suit your needs */\nmark {\n  background-color: #ff9;\n  color: #000;\n  font-style: italic;\n  font-weight: bold;\n}\n\ndel {\n  text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n  border-bottom: 1px dotted;\n  cursor: help;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* change border colour to suit your needs */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #cccccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\ninput, select {\n  vertical-align: middle;\n}\n\n.wrapper {\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  font-weight: 300;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  color: #333;\n  position: relative;\n  padding: 12px;\n  border-radius: 5px;\n  background-color: #fff;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n}\n\n.inner {\n  /*overflow-x: auto;*/\n}\n\ntable tr:nth-child(1n) {\n  background-color: #ffffff;\n}\n\ntable tr:nth-child(2n) {\n  background-color: #f6f6f6;\n}\n\ntable {\n  background-color: #fff;\n  border-collapse: collapse;\n  border-top: 1px solid #eee;\n  border-bottom: 1px solid #eee;\n  border-right: 1px solid #eee;\n}\n\ntd, th {\n  border-left: 1px solid #eee;\n  padding: 4px 8px 2px;\n  box-sizing: border-box;\n  height: auto;\n  line-height: 1.3;\n  text-align: left;\n}\n\ntfoot td {\n  border-top: 1px solid #eee;\n}\n\n.thead {\n  border-bottom-style: inset;\n}\n\n.header {\n  padding-right: 20px;\n  padding: 10px 10px 10px 10px;\n}\n\n.organism {\n  max-width: 160px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\na {\n  color: #007bff;\n  text-decoration: none;\n}\n\n.entypo-db-shape {\n  display: block;\n  width: 16px;\n  height: 16px;\n  border-radius: 3px;\n}\n\n.role_component_style {\n  background-color: #4ea0c9;\n}\n\n.component_style {\n  background-color: #48d1cc;\n}\n\ndiv#popup {\n  font-weight: bold;\n  font-size: 14px;\n  position: fixed;\n}\n\n.component_label {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  /*overflow: hidden;*/\n  /*height: 180px;*/\n  max-width: 15px;\n  text-align: left;\n  vertical-align: top;\n}\n\n.component_label p {\n  /*transform: rotate(90deg);*/\n  /*margin-top: -80px;*/\n  text-overflow: ellipsis;\n  writing-mode: vertical-rl;\n  margin: 0;\n  text-align: left;\n  vertical-align: top;\n}";

defineStanzaElement(_default, {metadata, templates, css, url: import.meta.url});
//# sourceMappingURL=gmdb-gms-by-tid.js.map
