import { c as createCommonjsModule } from './stanza-element-30b71100.js';

var stanza = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.importWebFontForTogoMedium = void 0;
const importWebFontForTogoMedium = (stanza, name = "Fira Sans Condensed") => {
    name = name.replace(/\ /gi, "+");
    stanza.importWebFontCSS(`https://fonts.googleapis.com/css2?family=${name}:wght@300;400;600&display=swap`);
};
exports.importWebFontForTogoMedium = importWebFontForTogoMedium;

});

export { stanza as s };
//# sourceMappingURL=stanza-2f6b2733.js.map
