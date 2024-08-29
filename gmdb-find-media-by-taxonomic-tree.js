import { _ as __awaiter, d as defineStanzaElement } from './stanza-a84d7c1e.js';
import { l as COLOR_WHITE, M as COLOR_GRAY_LINE, C as COLOR_PRIMARY, h as COLOR_GRAY300, P as COLOR_GRAY700, ac as COLOR_GRAY400, a as jsxs, j as jsx, R as Recoil_index_8, o as Recoil_index_20, p as Recoil_index_24, T as TogoMediumReactStanza } from './StanzaReactProvider-36ae7cf4.js';
import { u as useQuery } from './emotion-styled.browser.esm-798c6504.js';
import { c as css, g as getData, l as dist, r as reactExports } from './getData-1a784a8c.js';
import { I as IconBlank, a as IconNoChildren, b as IconCompact, c as IconExpand } from './icons-d6da8e88.js';
import { b as Tooltip, j as API_TAXONOMY_CHILDREN, i as API_MEDIA_BY_TAXON } from './paths-0bbd78cc.js';
import { C as Checkbox, w as wrapper$1, q as queryPane, s as subPane, M as MediaPane, u as useMediaPaginationState, b as useQueryDataMutators, a as useFoundMediaMutators, c as useIsMediaLoadingMutators, d as useMediaPaginationMutators } from './MediaPane-de4888ee.js';
import './consts-55c53200.js';
import './DefaultPropsProvider-4e645303.js';
import './variables-58f3d1be.js';
import './CircularProgress-0433714e.js';

const TreeBranchView = ({ label, linkString, linkURL, id, check, tag, hasChildren, isOpen, isLoading, onClickCheck, onToggleChildren, children, className, css, toolTipLabel = "", }) => {
    return (jsxs("li", { css: [wrapper, css], className: className, children: [jsxs("div", { css: inner, children: [jsxs("div", { css: left, children: [jsx("span", { onClick: () => onToggleChildren(id), children: jsx(ToggleIcon, { hasChildren, isOpen, isLoading }) }), jsx(Tooltip, { title: toolTipLabel, PopperProps: { disablePortal: true }, arrow: true, placement: "top-start", children: jsx("span", { children: label }) }), tag && jsx("span", { css: tagTip, children: tag }), linkString && linkURL && (jsxs("a", { href: linkURL, target: "_blank", rel: "noreferrer", children: ["[", linkString, "]"] }))] }), jsx(Checkbox, { checked: check === "checked" || check === "grouped", indeterminate: check === "indeterminate", onClick: () => onClickCheck(id) })] }), isOpen && !!children && jsx("ul", { css: childrenWrapper, children: children })] }));
};
const ToggleIcon = ({ hasChildren, isOpen, isLoading, }) => {
    if (isLoading)
        return jsx(IconBlank, { css: icon });
    if (!hasChildren)
        return jsx(IconNoChildren, { css: icon });
    if (isOpen)
        return jsx(IconCompact, { css: [icon, clickable] });
    return jsx(IconExpand, { css: [icon, clickable] });
};
const wrapper = css `
  margin-top: -1px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const inner = css `
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  background-color: ${COLOR_WHITE};
  padding: 0 8px;
  border: 1px solid ${COLOR_GRAY_LINE};
`;
const left = css `
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
  line-height: 1;
  font-size: 16px;
  a {
    font-size: 14px;
    color: ${COLOR_PRIMARY};
  }
`;
const icon = css `
  display: block;
  color: ${COLOR_GRAY300};
  width: 24px;
  height: 24px;
`;
const clickable = css `
  cursor: pointer;
  color: ${COLOR_GRAY700};
`;
const childrenWrapper = css `
  padding-left: 32px;
`;
const tagTip = css `
  font-size: 12px;
  background-color: ${COLOR_GRAY400};
  color: ${COLOR_WHITE};
  padding: 4px 6px;
  border-radius: 5px;
`;

const retrieveTaxonInfo = (info, addTaxonToList, setTaxonChildren) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const params = {
            tax_id: info.id,
        };
        const response = yield getData(API_TAXONOMY_CHILDREN, params);
        setTaxonChildren(info.id, (_b = (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.map((item) => item.tax_id)) !== null && _b !== void 0 ? _b : []);
        (_c = response === null || response === void 0 ? void 0 : response.body) === null || _c === void 0 ? void 0 : _c.forEach((item) => {
            addTaxonToList({
                id: item.tax_id,
                label: item.name,
                rank: item.rank,
                children: item.rank === "Species" ? [] : "not-yet",
            });
        });
    }))();
};
const findAscendants = (list, id) => {
    let iterationCount = 0;
    const result = [];
    let currentId = id;
    while (iterationCount < 255) {
        iterationCount++;
        const parent = findParent(list, currentId);
        if (parent) {
            result.unshift(parent.id);
            currentId = parent.id;
        }
        else {
            break;
        }
    }
    return result;
};
const findDescendants = (list, id) => {
    let result = [];
    const process = (currentId) => {
        const children = findChildren(list, currentId);
        if (children && dist.isArray(children)) {
            result = [...result, ...children];
            children.forEach((childId) => process(childId));
        }
    };
    process(id);
    return result;
};
const makeNewSelection = (list, id, selection) => {
    const isSelected = checkIsSelected(id, selection);
    let result = setSelection(selection, id, !isSelected);
    let currentId;
    const ascendants = findAscendants(list, id).reverse();
    const descendants = findDescendants(list, id);
    if (descendants) {
        result = setMultipleSelection(result, descendants, false);
    }
    const checkedAscendant = ascendants.find((ascendant) => result.includes(ascendant));
    if (checkedAscendant) {
        currentId = id;
        for (let i = 0; i < ascendants.length; i++) {
            const parent = ascendants[i];
            result = setSelection(result, parent, false);
            const siblings = findSiblings(list, currentId);
            result = setMultipleSelection(result, siblings, true);
            result = setSelection(result, currentId, false);
            if (checkedAscendant === parent) {
                break;
            }
            currentId = parent;
        }
    }
    currentId = id;
    for (let i = 0; i < ascendants.length; i++) {
        const parent = ascendants[i];
        const siblings = [...findSiblings(list, currentId), currentId];
        const checkedSiblings = siblings.filter((siblingId) => result.includes(siblingId));
        if (parent && checkedSiblings.length && checkedSiblings.length === siblings.length) {
            result = setMultipleSelection(result, checkedSiblings, false);
            result = setSelection(result, parent, true);
        }
        currentId = parent;
    }
    return result;
};
const checkIsSelected = (id, selection) => {
    return selection.includes(id);
};
const setSelection = (selection, id, value) => {
    const isSelected = checkIsSelected(id, selection);
    switch (true) {
        case isSelected && !value:
            return selection.filter((item) => item !== id);
        case !isSelected && value:
            return [...selection, id];
        default:
            return [...selection];
    }
};
const setMultipleSelection = (selection, ids, value) => {
    let result = [...selection];
    ids.forEach((id) => (result = setSelection(result, id, value)));
    return result;
};
const findChildren = (list, id) => { var _a; return (_a = list.find((info) => info.id === id)) === null || _a === void 0 ? void 0 : _a.children; };
const findParent = (list, id) => list.find((node) => { var _a; return (_a = node.children) === null || _a === void 0 ? void 0 : _a.includes(id); });
const findSiblings = (list, id) => {
    var _a;
    const children = (_a = findParent(list, id)) === null || _a === void 0 ? void 0 : _a.children;
    if (children && dist.isArray(children)) {
        return children.filter((myId) => myId !== id);
    }
    else {
        return [];
    }
};

const selectedTaxon = Recoil_index_8({ key: "selectedTaxon", default: [] });
const useSelectedTaxonState = () => {
    return Recoil_index_20(selectedTaxon);
};
const useSelectedTaxonMutators = () => {
    const setSelectedTaxon = Recoil_index_24(selectedTaxon);
    const clearTaxonSelect = () => {
        setSelectedTaxon([]);
    };
    const updateSelection = (list, id) => {
        setSelectedTaxon((prev) => makeNewSelection(list, id, prev));
    };
    return {
        __setSelectedTaxon: setSelectedTaxon,
        clearTaxonSelect,
        updateSelection,
    };
};

const taxonList = Recoil_index_8({ key: "taxonList", default: [] });
const useTaxonListState = () => {
    return Recoil_index_20(taxonList);
};
const useTaxonListMutators = () => {
    const setTaxonList = Recoil_index_24(taxonList);
    const addTaxonToList = (taxon) => {
        setTaxonList((prev) => [...prev.filter((item) => item.id !== taxon.id), taxon]);
    };
    const setTaxonChildren = (id, children) => {
        setTaxonList((prev) => {
            const target = prev.find((item) => item.id === id);
            const filtered = prev.filter((item) => item.id !== id);
            if (!target) {
                console.warn("no target found", id);
                return prev;
            }
            return [...filtered, Object.assign(Object.assign({}, target), { children })];
        });
    };
    const setTaxonAsLoading = (id) => {
        setTaxonList((prev) => {
            const target = prev.find((item) => item.id === id);
            const filtered = prev.filter((item) => item.id !== id);
            if (!target) {
                console.warn("no target found", id);
                return prev;
            }
            return [...filtered, Object.assign(Object.assign({}, target), { children: "loading" })];
        });
    };
    return { addTaxonToList, setTaxonAsLoading, setTaxonChildren };
};

const TaxonomicTreeBranch = ({ id, css, className }) => {
    const taxonList = useTaxonListState();
    const myInfo = reactExports.useMemo(() => {
        return taxonList.find((item) => item.id === id);
    }, [taxonList, id]);
    const { branchChildren, isLoading } = useBranchChildren(myInfo);
    const { label, rank } = useTaxonInfo(id, myInfo);
    const { descendants, ascendants } = useLineages(id, taxonList);
    const { check, onClickCheck } = useChecked(id, taxonList, ascendants, descendants);
    const { ascendantsLabel } = useAscendantsLabel(ascendants);
    const [linkString, linkURL] = useLinkString(id, rank);
    const [isOpen, setIsOpen] = reactExports.useState(false);
    const onToggleChildren = () => {
        setIsOpen((prev) => !prev);
    };
    return (jsx(TreeBranchView, { css: css, className: className, label: label, id: id, tag: rank, linkString: linkString, linkURL: linkURL, toolTipLabel: ascendantsLabel, check: check, hasChildren: !!branchChildren.length, isOpen: isOpen, isLoading: isLoading, onClickCheck: () => onClickCheck(), onToggleChildren: onToggleChildren, children: isOpen &&
            branchChildren.length &&
            branchChildren.map((childId) => jsx(TaxonomicTreeBranch, { id: childId }, childId)) }));
};
const useLinkString = (id, rank) => {
    const [linkString, setLinkString] = reactExports.useState("");
    const [linkURL, setLinkURL] = reactExports.useState("");
    reactExports.useEffect(() => {
        setLinkString(`tax_id:${id}`);
        setLinkURL(`/taxon/${id}`);
    }, [id, rank]);
    return [linkString, linkURL];
};
const useBranchChildren = (info) => {
    const [branchChildren, setBranchChildren] = reactExports.useState([]);
    const { setTaxonAsLoading, addTaxonToList, setTaxonChildren } = useTaxonListMutators();
    const [isLoading, setIsLoading] = reactExports.useState(false);
    reactExports.useEffect(() => {
        setIsLoading((info === null || info === void 0 ? void 0 : info.children) === "loading");
        if ((info === null || info === void 0 ? void 0 : info.children) === "not-yet") {
            setTaxonAsLoading(info.id);
            setIsLoading(true);
            retrieveTaxonInfo(info, addTaxonToList, setTaxonChildren);
        }
        if (info && dist.isArray(info.children)) {
            setBranchChildren(info.children);
        }
    }, [info]);
    return { branchChildren, isLoading };
};
const useTaxonInfo = (id, myInfo) => {
    const [rank, setRank] = reactExports.useState("");
    const [label, setLabel] = reactExports.useState("");
    reactExports.useEffect(() => {
        if (myInfo) {
            setRank(myInfo.rank);
            setLabel(myInfo.label);
        }
    }, [id, myInfo]);
    return { rank, label };
};
const useChecked = (id, taxonList, ascendants, descendants) => {
    const selectedTaxon = useSelectedTaxonState();
    const [check, setCheck] = reactExports.useState("none");
    const { updateSelection } = useSelectedTaxonMutators();
    const onClickCheck = () => {
        updateSelection(taxonList, id);
    };
    reactExports.useEffect(() => {
        const isChecked = !!selectedTaxon.find((taxId) => taxId === id);
        const isGrouped = !!selectedTaxon.find((taxId) => ascendants.includes(taxId));
        const isIndeterminate = !!selectedTaxon.find((taxId) => descendants.includes(taxId));
        switch (true) {
            case isChecked:
                setCheck("checked");
                break;
            case isGrouped:
                setCheck("grouped");
                break;
            case isIndeterminate:
                setCheck("indeterminate");
                break;
            default:
                setCheck("none");
        }
    }, [selectedTaxon, descendants, ascendants, id]);
    return { check, onClickCheck };
};
const useLineages = (id, taxonList) => {
    const [ascendants, setAscendants] = reactExports.useState([]);
    const [descendants, setDescendants] = reactExports.useState([]);
    reactExports.useEffect(() => {
        setAscendants(findAscendants(taxonList, id));
        setDescendants(findDescendants(taxonList, id));
    }, [taxonList, id]);
    return { ascendants, descendants };
};
const useAscendantsLabel = (ascendants) => {
    const [label, setLabel] = reactExports.useState("");
    const taxonList = useTaxonListState();
    reactExports.useEffect(() => {
        setLabel(ascendants.map((id) => { var _a; return (_a = taxonList.find((taxon) => taxon.id === id)) === null || _a === void 0 ? void 0 : _a.label; }).join(" > "));
    }, [ascendants]);
    return { ascendantsLabel: label };
};
css ``;

const useInitTaxonTree = () => {
    const { addTaxonToList } = useTaxonListMutators();
    reactExports.useEffect(() => {
        superkingdoms.forEach((info) => {
            addTaxonToList(info);
        });
    }, [addTaxonToList]);
};
const superkingdoms = [
    {
        id: "2157",
        label: "Archaea",
        rank: "Superkingdom",
        children: "not-yet",
    },
    {
        id: "2",
        label: "Bacteria",
        rank: "Superkingdom",
        children: "not-yet",
    },
    {
        id: "2759",
        label: "Eukaryota",
        rank: "Superkingdom",
        children: "not-yet",
    },
];

const TaxonomicTreeSection = () => {
    useInitTaxonTree();
    return (jsx("div", { css: [taxonomicTreeSection], children: jsxs("div", { children: [jsx(TaxonomicTreeBranch, { id: "2157" }), jsx(TaxonomicTreeBranch, { id: "2" }), jsx(TaxonomicTreeBranch, { id: "2759" })] }) }));
};
const taxonomicTreeSection = css `
  //overflow: scroll;
`;

const AppContainer = ({ dispatchEvent }) => {
    useMediaLoadFromTaxon();
    return (jsxs("div", { css: wrapper$1, children: [jsx("div", { css: queryPane, children: jsx(TaxonomicTreeSection, {}) }), jsx("div", { css: subPane, children: jsx(MediaPane, { dispatchEvent: dispatchEvent }) })] }));
};
const SHOW_COUNT = 10;
const useMediaLoadFromTaxon = () => {
    const page = useMediaPaginationState();
    const selectedTaxon = useSelectedTaxonState();
    const { setQueryData } = useQueryDataMutators();
    const { setFoundMedia } = useFoundMediaMutators();
    const { setIsMediaLoading } = useIsMediaLoadingMutators();
    const { reset } = useMediaPaginationMutators();
    const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
    const query = useQuery({
        queryKey: [selectedTaxon, { page }],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            const tax_ids = selectedTaxon;
            if (tax_ids.length === 0)
                return nullResponse;
            setQueryData({ tax_ids });
            const response = yield getData(API_MEDIA_BY_TAXON, {
                tax_ids,
                limit: SHOW_COUNT,
                offset: (page - 1) * SHOW_COUNT,
            });
            if (!response.body)
                throw new Error("No data");
            return response.body;
        }),
        staleTime: Infinity,
        placeholderData: (previousData) => previousData,
    });
    reactExports.useEffect(() => {
        query.data && setFoundMedia(query.data);
    }, [query.data, setFoundMedia]);
    reactExports.useEffect(() => {
        setIsMediaLoading(query.isLoading || query.isPlaceholderData);
    }, [query.isLoading, query.isPlaceholderData, setIsMediaLoading]);
    reactExports.useEffect(() => {
        reset();
    }, [selectedTaxon, reset]);
};

const App = ({ stanzaElement }) => {
    const dispatchEvent = (gmIds) => {
        if (!stanzaElement)
            return;
        stanzaElement.dispatchEvent(new CustomEvent("STANZA_RUN_ACTION", { bubbles: true, composed: true, detail: gmIds }));
        console.log("dispatch", { detail: gmIds });
    };
    return jsx(AppContainer, { dispatchEvent: dispatchEvent });
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        return jsx(App, { stanzaElement: this.root });
    }
}

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ReactStanza
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-find-media-by-taxonomic-tree",
	"stanza:label": "Find Media by Taxonomic Tree",
	"stanza:definition": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:contributor": [
],
	"stanza:created": "2022-01-01",
	"stanza:updated": "2022-01-01",
	"stanza:parameter": [
],
	"stanza:menu-placement": "none",
	"stanza:style": [
],
	"stanza:incomingEvent": [
],
	"stanza:outgoingEvent": [
]
};

var templates = [
  ["stanza.html.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p class=\"greeting\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"greeting") || (depth0 != null ? lookupProperty(depth0,"greeting") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"greeting","hash":{},"data":data,"loc":{"start":{"line":1,"column":20},"end":{"line":1,"column":32}}}) : helper)))
    + "!!!</p>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-find-media-by-taxonomic-tree.js.map