import { d as defineStanzaElement } from './stanza-element-e185656b.js';
import { s as stanza } from './stanza-32f0aee1.js';

async function gmdbPhenotypeInfo(stanza$1, params) {
    if (!params.tax_id) {
        return;
    }
    stanza$1.render({
        template: "stanza.html.hbs",
        parameters: null,
    });
    stanza.importWebFontForTogoMedium(stanza$1);
}
var _default = gmdbPhenotypeInfo;

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-phenotype-info",
	"stanza:label": "Gmdb phenotype info",
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
  ["stanza.html.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header>\n  <h2>Phenotype Information</h2>\n</header>\n<div class=\"wrapper\">\n\n  <table>\n    <tr>\n      <th>Cell shape</th>\n      <th>Temperature range</th>\n      <th>Motility</th>\n      <th>Staining</th>\n      <th>Energy source</th>\n    </tr>\n    <tr>\n      <td>N/A</td>\n      <td>N/A</td>\n      <td>N/A</td>\n      <td>N/A</td>\n      <td>N/A</td>\n    </tr>\n\n  </table>\n</div>\n";
},"useData":true}]
];

var css = "/*\nhtml5doctor.com Reset Stylesheet\nv1.6.1\nLast Updated: 2010-09-17\nAuthor: Richard Clark - http://richclarkdesign.com\nTwitter: @rich_clark\n*/\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\nbody {\n  line-height: 1;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\na {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent;\n}\n\n/* change colours to suit your needs */\nins {\n  background-color: #ff9;\n  color: #000;\n  text-decoration: none;\n}\n\n/* change colours to suit your needs */\nmark {\n  background-color: #ff9;\n  color: #000;\n  font-style: italic;\n  font-weight: bold;\n}\n\ndel {\n  text-decoration: line-through;\n}\n\nabbr[title], dfn[title] {\n  border-bottom: 1px dotted;\n  cursor: help;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* change border colour to suit your needs */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #cccccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\ninput, select {\n  vertical-align: middle;\n}\n\n.wrapper {\n  font-size: 18px;\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 5px;\n  font-weight: 300;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: antialiased;\n  font-smoothing: antialiased;\n  color: #333;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n}\n\na {\n  color: #6FA80C;\n}\n\nheader h2 {\n  font-family: \"Fira Sans Condensed\", sans-serif;\n  -webkit-font-smoothing: antialiased;\n  font-size: 24px;\n  font-weight: 600;\n  margin-bottom: 8px;\n  padding-left: 8px;\n}\n\ntable {\n  font-size: 14px;\n  width: 100%;\n  border: 1px solid #ccc;\n  border-collapse: collapse;\n}\n\ntd, th {\n  border: 1px solid #ccc;\n  padding: 5px;\n  text-align: center;\n}\n\nth {\n  font-weight: bold;\n}";

defineStanzaElement(_default, {metadata, templates, css, url: import.meta.url});
//# sourceMappingURL=gmdb-phenotype-info.js.map
