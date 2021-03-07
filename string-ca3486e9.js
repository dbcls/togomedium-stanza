import { c as createCommonjsModule } from './stanza-element-e185656b.js';

var string = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNcbiOrganismLink = exports.makeTogoGenomeOrganismLink = exports.capitalizeFirstLetter = exports.unescapeJsonString = void 0;
const unescapeJsonString = (str) => {
    return str === null || str === void 0 ? void 0 : str.replace(/\\/g, "");
};
exports.unescapeJsonString = unescapeJsonString;
const capitalizeFirstLetter = (str) => {
    if (!str) {
        return str;
    }
    const reg = /^(.)(.*)$/.exec(str);
    return `${reg[1].toUpperCase()}${reg[2]}`;
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const makeTogoGenomeOrganismLink = (taxid) => {
    if (!taxid) {
        return taxid;
    }
    return `http://togogenome.org/organism/${taxid}`;
};
exports.makeTogoGenomeOrganismLink = makeTogoGenomeOrganismLink;
const makeNcbiOrganismLink = (taxid) => {
    if (!taxid) {
        return taxid;
    }
    return `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${taxid}`;
};
exports.makeNcbiOrganismLink = makeNcbiOrganismLink;

});

export { string as s };
//# sourceMappingURL=string-ca3486e9.js.map
