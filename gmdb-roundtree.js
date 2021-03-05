import { d as defineStanzaElement } from './stanza-element-e185656b.js';
import { d as d3 } from './index-b1dff03b.js';

const TID_API = "http://ep.dbcls.jp/sparqlist/api/gms_kegg_code_tid";
async function gmdbRoundtree(stanza, params) {
    const [newicText, codeList] = await downloadData(params.newick, TID_API);
    const newicTree = parseNewic(newicText);
    const leafList = createLeafList(newicTree, codeList);
    console.log(leafList);
    stanza.render({
        template: "stanza.html.hbs",
        parameters: {
            greeting: `Hello, ${params.newick}!`,
        },
    });
    renderD3(stanza, newicTree, codeList, leafList);
}
var _default = gmdbRoundtree;
const downloadData = async (newicUrl, tidApi) => {
    return Promise.all([
        fetch(newicUrl, { method: "get", mode: "cors" }).then((res) => res.text()),
        fetch(tidApi, {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((res) => res.json()),
    ]);
};
const parseNewic = (rawText) => {
    let newick = rawText.replace(/\n/g, "");
    if (newick.match(/\):/)) {
        let array = newick.split(/\)/);
        let count = 1;
        for (let i = 0; i < array.length; i++) {
            if (array[i].match(/^:/)) {
                array[i] = "n" + count + array[i];
                count++;
            }
        }
        newick = array.join(")");
    }
    if (newick.match(/\);$/)) {
        newick = newick.replace(/^\(/, "").replace(/\);$/, "");
    }
    let stack = [];
    let child;
    let root = [];
    let nodeObj = root;
    let array = newick.split("").reverse();
    for (let i = 0; i < array.length; i++) {
        if (array[i] === ")") {
            stack.push(nodeObj);
            nodeObj = child.children = [];
        }
        else if (array[i] === "(") {
            nodeObj = stack.pop();
        }
        else if (array[i] === ",") ;
        else {
            let string = "";
            for (let j = i; j < array.length; j++) {
                if (array[j] === "(" || array[j] === ")" || array[j] === ",") {
                    i = j - 1;
                    let element = string.split(":");
                    let obj = {
                        name: element[0],
                        distance: element[1],
                        type: "branch",
                    };
                    if (element[0].match("_")) {
                        obj = {
                            name: element[0].split("_")[1],
                            distance: element[1],
                            tag: element[0].split("_")[0],
                            type: "leaf",
                        };
                    }
                    nodeObj.push((child = obj));
                    break;
                }
                string = array[j] + string;
            }
        }
    }
    return { name: "root", children: root };
};
const createLeafList = (newicObj, codeList) => {
    const result = {};
    const process = (obj) => {
        if ("children" in obj) {
            process(obj.children[0]);
            process(obj.children[1]);
        }
        if ("type" in obj && obj.type === "leaf") {
            const id = codeList[obj.name].tid;
            result[obj.name] = id;
        }
    };
    process(newicObj);
    return result;
};
const getChildrenIDs = (d, includeBranches = true) => {
    const arr = [];
    const loopChildren = (c) => {
        c.children.forEach((child) => {
            if (child.children) {
                if (includeBranches) {
                    arr.push(child.data.name);
                }
                loopChildren(child);
            }
            else {
                arr.push(child.data.name);
            }
        });
    };
    loopChildren(d);
    return arr;
};
const renderD3 = (stanza, newicTree, codeList, leafList) => {
    const div = stanza.root.querySelector("#renderDiv");
    const d3Canvas = d3.select(div);
    const linkGenerator = d3
        .linkRadial()
        .angle((d) => {
        return ((d.x + 90) * Math.PI) / 180;
    })
        .radius((d) => {
        return d.y;
    });
    const onClickItem = (d) => {
        const taxIds = getChildrenIDs(d, false).map((str) => leafList[str]);
        console.log(taxIds);
        stanza.root.dispatchEvent(new CustomEvent("STANZA_ROUND_TREE_CLICK", {
            bubbles: true,
            composed: true,
            detail: {
                taxIds,
            },
        }));
    };
    const renderCluster = () => {
        let treeShape = 0;
        const radius = 400;
        const svg = d3Canvas
            .append("svg")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("id", "roundtree")
            .attr("width", radius * 2)
            .attr("height", radius * 2);
        d3Canvas
            .append("div")
            .attr("id", "popup")
            .style("display", "none")
            .style("position", "absolute")
            .style("padding", "10px")
            .style("background-color", "rgba(255,255,255,0.75)")
            .style("border", "solid 2px #888888")
            .style("max-width", "300px");
        const g = svg
            .append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")");
        let hierarchyNode = d3.hierarchy(newicTree);
        const cluster = d3.cluster().size([360, radius - 80]);
        const tree = d3
            .tree()
            .size([360, radius - 80])
            .separation((a, b) => {
            return (a.parent == b.parent ? 1 : 2) / a.depth;
        });
        cluster(hierarchyNode);
        g
            .selectAll(".edge")
            .data(hierarchyNode.links())
            .enter()
            .append("path")
            .attr("class", "edge")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-width", "1.5px")
            .attr("opacity", "0.6")
            .attr("d", linkGenerator);
        let node = g
            .selectAll(".node")
            .data(hierarchyNode.descendants())
            .enter()
            .append("g")
            .attr("class", (d) => {
            let type = "";
            if (d.data) {
                type = " " + d.data.tag + "Node";
            }
            return "node " + d.data.type + "Node" + type;
        })
            .attr("transform", (d) => {
            return "rotate(" + d.x + ")translate(" + d.y + ")";
        });
        node
            .append("circle")
            .attr("id", (d) => {
            return d.data.name;
        })
            .attr("r", 4.5);
        const rePlot = () => {
            hierarchyNode = d3.hierarchy(newicTree);
            if (treeShape == 0) {
                tree(hierarchyNode);
                treeShape = 1;
            }
            else {
                cluster(hierarchyNode);
                treeShape = 0;
            }
            g.selectAll(".edge")
                .data(hierarchyNode.links())
                .transition()
                .delay(200)
                .duration(700)
                .attr("d", linkGenerator);
            g.selectAll(".node")
                .data(hierarchyNode.descendants())
                .transition()
                .delay(200)
                .duration(700)
                .attr("transform", function (d) {
                return "rotate(" + d.x + ")translate(" + d.y + ")";
            });
        };
        return { svg, rePlot };
    };
    const setLeafLabel = (svg) => {
        svg
            .selectAll(".leafNode")
            .append("text")
            .attr("dy", 3)
            .style("text-anchor", (d) => {
            return d.x < 90 || d.x > 270 ? "start" : "end";
        })
            .attr("transform", (d) => {
            return d.x < 90 || d.x > 270
                ? "translate(8)"
                : "rotate(180)translate(-8)";
        })
            .text((d) => {
            return d.data.name;
        })
            .on("mouseover", (e, d) => {
            d3Canvas
                .select("#popup")
                .style("left", e.offsetX + 10 + "px")
                .style("top", e.offsetY - 10 + "px")
                .style("display", "block")
                .text(codeList[d.data.name].label);
        })
            .on("mouseout", (e, d) => {
            d3Canvas.select("#popup").style("display", "none");
        });
    };
    const setBranchAction = (svg) => {
        svg
            .selectAll(".branchNode")
            .on("click", (e, d) => {
            onClickItem(d);
            svg
                .selectAll(".branchNode, .leafNode")
                .selectAll("circle")
                .classed("active", false);
            const activeIDs = getChildrenIDs(d);
            activeIDs.push(d.data.name);
            activeIDs.forEach((str) => {
                svg.select(`#${str}`).classed("active", true);
            });
        })
            .on("mouseover", (e, d) => {
            svg.select("#" + d.data.name).style("stroke", "#89ffff");
        })
            .on("mouseout", (e, d) => {
            svg.select("#" + d.data.name).style("stroke", "");
        });
    };
    const setLeafAction = (svg) => {
        svg
            .selectAll(".leafNode")
            .on("click", (e, d) => {
            onClickItem(d);
            svg
                .selectAll(".branchNode, .leafNode")
                .selectAll("circle")
                .classed("active", false);
            svg.select(`#${d.data.name}`).classed("active", true);
        })
            .on("mouseover", (e, d) => {
            svg.select("#" + d.data.name).style("stroke", "#89ffff");
        })
            .on("mouseout", (e, d) => {
            svg.select("#" + d.data.name).style("stroke", "");
        });
    };
    const appendBtn = (rePlot) => {
        let dlButtonDiv = d3Canvas
            .append("div")
            .attr("id", "dl_button")
            .style("text-align", "right");
        dlButtonDiv
            .append("input")
            .attr("class", "downloadButton")
            .attr("type", "button")
            .attr("value", "change tree shape")
            .on("click", () => {
            rePlot();
        });
        dlButtonDiv
            .append("input")
            .attr("class", "downloadButton")
            .attr("type", "button")
            .attr("value", "svg")
            .on("click", () => {
            downloadImg("svg");
        });
        dlButtonDiv
            .append("input")
            .attr("class", "downloadButton")
            .attr("type", "button")
            .attr("value", "png")
            .on("click", () => {
            downloadImg("png");
        });
    };
    const downloadImg = (format) => {
        let filename = "tree";
        const pngZoom = 2;
        let url, img, canvas, context;
        const treeHTML = div.querySelector("#roundtree");
        const styleString = div.parentElement
            .querySelector("style")
            .outerHTML.replace(/[\r\n]/g, "");
        const tmp = treeHTML.outerHTML.match(/^([^\>]+\>)(.+)$/);
        const sourceString = tmp[1] + styleString + tmp[2];
        const w = parseInt(d3.select(treeHTML).style("width"));
        const h = parseInt(d3.select(treeHTML).style("height"));
        const aLinkClickDL = () => {
            if (format === "png") {
                context.drawImage(img, 0, 0, w, h, 0, 0, w * pngZoom, h * pngZoom);
                url = canvas.node().toDataURL("image/png");
            }
            const a = d3.select("body").append("a");
            a.attr("class", "downloadLink")
                .attr("download", filename)
                .attr("href", url)
                .text("test")
                .style("display", "none");
            a.node().click();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                if (format == "png") {
                    canvas.remove();
                }
                a.remove();
            }, 10);
        };
        if (format === "svg") {
            filename += ".svg";
            let blobObject = new Blob([sourceString], {
                type: "data:image/svg+xml;base64",
            });
            url = window.URL.createObjectURL(blobObject);
            aLinkClickDL();
        }
        else if (format === "png") {
            filename += ".png";
            img = new Image();
            img.src = "data:image/svg+xml;utf8," + encodeURIComponent(sourceString);
            img.addEventListener("load", aLinkClickDL, false);
            canvas = d3
                .select("body")
                .append("canvas")
                .attr("width", w * pngZoom)
                .attr("height", h * pngZoom)
                .style("display", "none");
            context = canvas.node().getContext("2d");
        }
    };
    const { svg, rePlot } = renderCluster();
    setLeafLabel(svg);
    setBranchAction(svg);
    setLeafAction(svg);
    appendBtn(rePlot);
};

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-roundtree",
	"stanza:label": "Gmdb roundtree",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Graph",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@gmail.com",
	"stanza:contributor": [
],
	"stanza:created": "2021-02-20",
	"stanza:updated": "2021-02-20",
	"stanza:parameter": [
	{
		"stanza:key": "newick",
		"stanza:example": "http://keggoc-rdf.dbcls.jp/tmp/phylo2.newick",
		"stanza:description": "newick tree format",
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
    return "<style>\n  #renderDiv {\n    text-align: center;\n    padding: 12px;\n    border-radius: 5px;\n    background-color: #fff;\n    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n  }\n\n  .node circle {\n    fill: #fff;\n    stroke: #cccccc;\n    stroke-width: 1.5px;\n  }\n\n  .node text {\n    font: 10px sans-serif;\n  }\n\n  .branchNode, .leafNode {\n    cursor: pointer;\n  }\n\n\n  .aeNode circle {\n    stroke: #89c4ff;\n  }\n\n  .anNode circle {\n    stroke: #ff8989;\n  }\n\n  .faNode circle {\n    stroke: #8989ff;\n  }\n\n  .oaNode circle {\n    stroke: #ffff89;\n  }\n\n  .maNode circle {\n    stroke: #ff89ff;\n  }\n\n  .onNode circle {\n    stroke: #89ff89;\n  }\n\n  circle.active {\n    fill: #FFFF00;\n  }\n\n  .edge {\n    fill: none;\n    stroke: #ccc;\n    stroke-width: 1.5px;\n  }\n\n  input.downloadButton {\n    color: #4ea0c9;\n    font-weight: bold;\n    border: solid 2px #4ea0c9;\n    background-color: transparent;\n    cursor: pointer;\n    margin-left: 10px;\n  }\n\n  div#gm_stanza {\n    /*overflow: scroll;*/\n    overflow: hidden;\n    margin-top: 20px;\n  }\n\n</style>\n\n<div id=\"renderDiv\"></div>\n";
},"useData":true}]
];

var css = "/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\nbody {\n  line-height: 1;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\na {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\n/* change colours to suit your needs */\nins {\n  background-color: #ff9;\n  color: #000;\n  text-decoration: none;\n}\n\n/* change colours to suit your needs */\nmark {\n  background-color: #ff9;\n  color: #000;\n  font-style: italic;\n  font-weight: bold;\n}\n\ndel {\n  text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n  border-bottom: 1px dotted;\n  cursor: help;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* change border colour to suit your needs */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #cccccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\ninput, select {\n  vertical-align: middle;\n}\n\nhtml {\n  scroll-behavior: smooth;\n}";

defineStanzaElement(_default, {metadata, templates, css, url: import.meta.url});
//# sourceMappingURL=gmdb-roundtree.js.map
