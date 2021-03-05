import { c as createCommonjsModule } from './stanza-element-e185656b.js';

var getData_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFormBody = exports.getData = exports.API_DBCLS = void 0;
exports.API_DBCLS = "http://ep.dbcls.jp/sparqlist/api/";
const getData = async (url, params) => {
    const response = await fetch(url, makeOptions(params));
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
exports.getData = getData;
const makeFormBody = (params) => {
    const formBody = Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
    return formBody.join("&");
};
exports.makeFormBody = makeFormBody;
const makeOptions = (params) => {
    const body = exports.makeFormBody(params);
    return {
        method: "POST",
        mode: "cors",
        body,
        headers: {
            Accept: "application/json",
        },
    };
};

});

export { getData_1 as g };
//# sourceMappingURL=get-data-b9dbb049.js.map
