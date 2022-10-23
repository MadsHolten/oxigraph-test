/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = new Int32Array();

function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

let cachedUint32Memory0 = new Uint32Array();

function getUint32Memory0() {
    if (cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4);
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function getArrayJsValueFromWasm0(ptr, len) {
    const mem = getUint32Memory0();
    const slice = mem.subarray(ptr / 4, ptr / 4 + len);
    const result = [];
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
*/
class BlankNode {

    static __wrap(ptr) {
        const obj = Object.create(BlankNode.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blanknode_free(ptr);
    }
    /**
    * @returns {string}
    */
    get termType() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.blanknode_term_type(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    get value() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.blanknode_value(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.blanknode_toString(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {any} other
    * @returns {boolean}
    */
    equals(other) {
        try {
            const ret = wasm.blanknode_equals(this.ptr, addBorrowedObject(other));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
*/
class DefaultGraph {

    static __wrap(ptr) {
        const obj = Object.create(DefaultGraph.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_defaultgraph_free(ptr);
    }
    /**
    * @returns {string}
    */
    get termType() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.defaultgraph_term_type(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    get value() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.defaultgraph_value(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.defaultgraph_toString(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {any} other
    * @returns {boolean}
    */
    equals(other) {
        try {
            const ret = wasm.defaultgraph_equals(this.ptr, addBorrowedObject(other));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
*/
class Literal {

    static __wrap(ptr) {
        const obj = Object.create(Literal.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_literal_free(ptr);
    }
    /**
    * @returns {string}
    */
    get termType() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.literal_term_type(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    get value() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.literal_value(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    get language() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.literal_language(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {NamedNode}
    */
    get datatype() {
        const ret = wasm.literal_datatype(this.ptr);
        return NamedNode.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.literal_toString(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {any} other
    * @returns {boolean}
    */
    equals(other) {
        try {
            const ret = wasm.literal_equals(this.ptr, addBorrowedObject(other));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
*/
class NamedNode {

    static __wrap(ptr) {
        const obj = Object.create(NamedNode.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_namednode_free(ptr);
    }
    /**
    * @returns {string}
    */
    get termType() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.namednode_term_type(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    get value() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.namednode_value(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.namednode_toString(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {any} other
    * @returns {boolean}
    */
    equals(other) {
        try {
            const ret = wasm.namednode_equals(this.ptr, addBorrowedObject(other));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
*/
class Quad {

    static __wrap(ptr) {
        const obj = Object.create(Quad.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_quad_free(ptr);
    }
    /**
    * @returns {string}
    */
    get termType() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.quad_term_type(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    get value() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.quad_value(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {any}
    */
    get subject() {
        const ret = wasm.quad_subject(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get predicate() {
        const ret = wasm.quad_predicate(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get object() {
        const ret = wasm.quad_object(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get graph() {
        const ret = wasm.quad_graph(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.quad_toString(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {any} other
    * @returns {boolean}
    */
    equals(other) {
        try {
            const ret = wasm.quad_equals(this.ptr, addBorrowedObject(other));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
*/
class Store {

    static __wrap(ptr) {
        const obj = Object.create(Store.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_store_free(ptr);
    }
    /**
    * @param {any[] | undefined} quads
    */
    constructor(quads) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            var ptr0 = isLikeNone(quads) ? 0 : passArrayJsValueToWasm0(quads, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.store_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Store.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} quad
    */
    add(quad) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.store_add(retptr, this.ptr, addBorrowedObject(quad));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {any} quad
    */
    delete(quad) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.store_delete(retptr, this.ptr, addBorrowedObject(quad));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {any} quad
    * @returns {boolean}
    */
    has(quad) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.store_has(retptr, this.ptr, addBorrowedObject(quad));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0 !== 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {number}
    */
    get size() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.store_size(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} subject
    * @param {any} predicate
    * @param {any} object
    * @param {any} graph_name
    * @returns {any[]}
    */
    match(subject, predicate, object, graph_name) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.store_match(retptr, this.ptr, addBorrowedObject(subject), addBorrowedObject(predicate), addBorrowedObject(object), addBorrowedObject(graph_name));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {string} query
    * @returns {any}
    */
    query(query) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(query, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.store_query(retptr, this.ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} update
    */
    update(update) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(update, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.store_update(retptr, this.ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} data
    * @param {string} mime_type
    * @param {any} base_iri
    * @param {any} to_graph_name
    */
    load(data, mime_type, base_iri, to_graph_name) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(mime_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            wasm.store_load(retptr, this.ptr, ptr0, len0, ptr1, len1, addBorrowedObject(base_iri), addBorrowedObject(to_graph_name));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {string} mime_type
    * @param {any} from_graph_name
    * @returns {string}
    */
    dump(mime_type, from_graph_name) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(mime_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.store_dump(retptr, this.ptr, ptr0, len0, addBorrowedObject(from_graph_name));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr1 = r0;
            var len1 = r1;
            if (r3) {
                ptr1 = 0; len1 = 0;
                throw takeObject(r2);
            }
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            heap[stack_pointer++] = undefined;
            wasm.__wbindgen_free(ptr1, len1);
        }
    }
}
/**
*/
class Variable {

    static __wrap(ptr) {
        const obj = Object.create(Variable.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_variable_free(ptr);
    }
    /**
    * @returns {string}
    */
    get termType() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.variable_term_type(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    get value() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.namednode_value(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.variable_toString(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {any} other
    * @returns {boolean}
    */
    equals(other) {
        try {
            const ret = wasm.variable_equals(this.ptr, addBorrowedObject(other));
            return ret !== 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_new_8d2af00bc1e329ee = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_namednode_new = function(arg0) {
        const ret = NamedNode.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_blanknode_new = function(arg0) {
        const ret = BlankNode.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_literal_new = function(arg0) {
        const ret = Literal.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_defaultgraph_new = function(arg0) {
        const ret = DefaultGraph.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_variable_new = function(arg0) {
        const ret = Variable.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_quad_new = function(arg0) {
        const ret = Quad.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_765201544a2b6869 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_has_8359f114ce042f5a = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_7a65684b23087040 = function(arg0, arg1) {
        const ret = new URIError(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_null = function(arg0) {
        const ret = getObject(arg0) === null;
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbg_new_1d9a920c6bfc44a8 = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_268f7b7dd3430798 = function() {
        const ret = new Map();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_740e4b286702d964 = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_set_933729cf5b66ac11 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbg_call_168da88779e35f61 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_now_58886682b7e790d7 = function() {
        const ret = Date.now();
        return ret;
    };
    imports.wbg.__wbg_self_6d479506f72c6a71 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_f2557cc78490aceb = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_7f206bda628d5286 = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_ba75c50d1cf384f4 = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newnoargs_b5b063fc6c2f0376 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_97ae9d8645dc388b = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_crypto_e1d53a1d73fb10b8 = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_process_038c26bf42b093f8 = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_ab37218d2f0b24a8 = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_080f4b19d15bc1fe = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_require_78a3dcfbdba9cbce = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbg_msCrypto_6e7d3e1f92610cbb = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithlength_f5933855e4f48a19 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_randomFillSync_6894564c2c334c42 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_subarray_58ad4efbb5bcb886 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getRandomValues_805f1c3d65988a5a = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_length_9e1ae1900cb0fbd5 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_3f3d764d4747d564 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_8c3f0052272a457a = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_83db9690f9353e79 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = new Int32Array();
    cachedUint32Memory0 = new Uint32Array();
    cachedUint8Memory0 = new Uint8Array();

    wasm.__wbindgen_start();
    return wasm;
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('web_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

function comunicaGetQuery(query, source) {
    return __awaiter(this, void 0, void 0, function () {
        var bindings, engine, bindingsStream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bindings = [];
                    engine = new Comunica.QueryEngine();
                    return [4 /*yield*/, engine.queryBindings(query, { sources: [source] })];
                case 1:
                    bindingsStream = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            bindingsStream.on('data', function (binding) {
                                bindings.push(binding);
                            });
                            bindingsStream.on('end', function () {
                                resolve(bindings);
                            });
                            bindingsStream.on('error', function (error) {
                                reject(error);
                            });
                        })];
            }
        });
    });
}

function getFileContent(file) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var reader = new FileReader();
                    reader.addEventListener('progress', function (event) {
                        if (event.loaded && event.total) {
                            var percent = (event.loaded / event.total) * 100;
                            console.log("Progress: ".concat(Math.round(percent)));
                        }
                    });
                    reader.addEventListener('load', function () {
                        var res = reader.result;
                        resolve(res);
                    }, false);
                    reader.readAsText(file, "utf-8");
                })];
        });
    });
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var n3_min = {exports: {}};

(function (module, exports) {
	(function(f){{module.exports=f();}})(function(){return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof commonjsRequire&&commonjsRequire;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t);}return n[i].exports}for(var u="function"==typeof commonjsRequire&&commonjsRequire,i=0;i<t.length;i++)o(t[i]);return o}return r}()({1:[function(require,module,exports){Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;const RDF="http://www.w3.org/1999/02/22-rdf-syntax-ns#",XSD="http://www.w3.org/2001/XMLSchema#",SWAP="http://www.w3.org/2000/10/swap/";var _default={xsd:{decimal:`${XSD}decimal`,boolean:`${XSD}boolean`,double:`${XSD}double`,integer:`${XSD}integer`,string:`${XSD}string`},rdf:{type:`${RDF}type`,nil:`${RDF}nil`,first:`${RDF}first`,rest:`${RDF}rest`,langString:`${RDF}langString`},owl:{sameAs:"http://www.w3.org/2002/07/owl#sameAs"},r:{forSome:`${SWAP}reify#forSome`,forAll:`${SWAP}reify#forAll`},log:{implies:`${SWAP}log#implies`}};exports.default=_default;},{}],2:[function(require,module,exports){Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.Variable=exports.Triple=exports.Term=exports.Quad=exports.NamedNode=exports.Literal=exports.DefaultGraph=exports.BlankNode=void 0;exports.escapeQuotes=escapeQuotes;exports.termFromId=termFromId;exports.termToId=termToId;exports.unescapeQuotes=unescapeQuotes;var _IRIs=_interopRequireDefault(require("./IRIs"));var _N3Util=require("./N3Util");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const{rdf,xsd}=_IRIs.default;let DEFAULTGRAPH;let _blankNodeCounter=0;const escapedLiteral=/^"(.*".*)(?="[^"]*$)/;const quadId=/^<<("(?:""|[^"])*"[^ ]*|[^ ]+) ("(?:""|[^"])*"[^ ]*|[^ ]+) ("(?:""|[^"])*"[^ ]*|[^ ]+) ?("(?:""|[^"])*"[^ ]*|[^ ]+)?>>$/;const DataFactory={namedNode:namedNode,blankNode:blankNode,variable:variable,literal:literal,defaultGraph:defaultGraph,quad:quad,triple:quad};var _default=DataFactory;exports.default=_default;class Term{constructor(id){this.id=id;}get value(){return this.id}equals(other){if(other instanceof Term)return this.id===other.id;return !!other&&this.termType===other.termType&&this.value===other.value}hashCode(){return 0}toJSON(){return {termType:this.termType,value:this.value}}}exports.Term=Term;class NamedNode extends Term{get termType(){return "NamedNode"}}exports.NamedNode=NamedNode;class Literal extends Term{get termType(){return "Literal"}get value(){return this.id.substring(1,this.id.lastIndexOf('"'))}get language(){const id=this.id;let atPos=id.lastIndexOf('"')+1;return atPos<id.length&&id[atPos++]==="@"?id.substr(atPos).toLowerCase():""}get datatype(){return new NamedNode(this.datatypeString)}get datatypeString(){const id=this.id,dtPos=id.lastIndexOf('"')+1;const char=dtPos<id.length?id[dtPos]:"";return char==="^"?id.substr(dtPos+2):char!=="@"?xsd.string:rdf.langString}equals(other){if(other instanceof Literal)return this.id===other.id;return !!other&&!!other.datatype&&this.termType===other.termType&&this.value===other.value&&this.language===other.language&&this.datatype.value===other.datatype.value}toJSON(){return {termType:this.termType,value:this.value,language:this.language,datatype:{termType:"NamedNode",value:this.datatypeString}}}}exports.Literal=Literal;class BlankNode extends Term{constructor(name){super(`_:${name}`);}get termType(){return "BlankNode"}get value(){return this.id.substr(2)}}exports.BlankNode=BlankNode;class Variable extends Term{constructor(name){super(`?${name}`);}get termType(){return "Variable"}get value(){return this.id.substr(1)}}exports.Variable=Variable;class DefaultGraph extends Term{constructor(){super("");return DEFAULTGRAPH||this}get termType(){return "DefaultGraph"}equals(other){return this===other||!!other&&this.termType===other.termType}}exports.DefaultGraph=DefaultGraph;DEFAULTGRAPH=new DefaultGraph;function termFromId(id,factory){factory=factory||DataFactory;if(!id)return factory.defaultGraph();switch(id[0]){case"?":return factory.variable(id.substr(1));case"_":return factory.blankNode(id.substr(2));case'"':if(factory===DataFactory)return new Literal(id);if(id[id.length-1]==='"')return factory.literal(id.substr(1,id.length-2));const endPos=id.lastIndexOf('"',id.length-1);return factory.literal(id.substr(1,endPos-1),id[endPos+1]==="@"?id.substr(endPos+2):factory.namedNode(id.substr(endPos+3)));case"<":const components=quadId.exec(id);return factory.quad(termFromId(unescapeQuotes(components[1]),factory),termFromId(unescapeQuotes(components[2]),factory),termFromId(unescapeQuotes(components[3]),factory),components[4]&&termFromId(unescapeQuotes(components[4]),factory));default:return factory.namedNode(id)}}function termToId(term){if(typeof term==="string")return term;if(term instanceof Term&&term.termType!=="Quad")return term.id;if(!term)return DEFAULTGRAPH.id;switch(term.termType){case"NamedNode":return term.value;case"BlankNode":return `_:${term.value}`;case"Variable":return `?${term.value}`;case"DefaultGraph":return "";case"Literal":return `"${term.value}"${term.language?`@${term.language}`:term.datatype&&term.datatype.value!==xsd.string?`^^${term.datatype.value}`:""}`;case"Quad":return `<<${escapeQuotes(termToId(term.subject))} ${escapeQuotes(termToId(term.predicate))} ${escapeQuotes(termToId(term.object))}${(0, _N3Util.isDefaultGraph)(term.graph)?"":` ${termToId(term.graph)}`}>>`;default:throw new Error(`Unexpected termType: ${term.termType}`)}}class Quad extends Term{constructor(subject,predicate,object,graph){super("");this._subject=subject;this._predicate=predicate;this._object=object;this._graph=graph||DEFAULTGRAPH;}get termType(){return "Quad"}get subject(){return this._subject}get predicate(){return this._predicate}get object(){return this._object}get graph(){return this._graph}toJSON(){return {termType:this.termType,subject:this._subject.toJSON(),predicate:this._predicate.toJSON(),object:this._object.toJSON(),graph:this._graph.toJSON()}}equals(other){return !!other&&this._subject.equals(other.subject)&&this._predicate.equals(other.predicate)&&this._object.equals(other.object)&&this._graph.equals(other.graph)}}exports.Triple=exports.Quad=Quad;function escapeQuotes(id){return id.replace(escapedLiteral,(_,quoted)=>`"${quoted.replace(/"/g,'""')}`)}function unescapeQuotes(id){return id.replace(escapedLiteral,(_,quoted)=>`"${quoted.replace(/""/g,'"')}`)}function namedNode(iri){return new NamedNode(iri)}function blankNode(name){return new BlankNode(name||`n3-${_blankNodeCounter++}`)}function literal(value,languageOrDataType){if(typeof languageOrDataType==="string")return new Literal(`"${value}"@${languageOrDataType.toLowerCase()}`);let datatype=languageOrDataType?languageOrDataType.value:"";if(datatype===""){if(typeof value==="boolean")datatype=xsd.boolean;else if(typeof value==="number"){if(Number.isFinite(value))datatype=Number.isInteger(value)?xsd.integer:xsd.double;else {datatype=xsd.double;if(!Number.isNaN(value))value=value>0?"INF":"-INF";}}}return datatype===""||datatype===xsd.string?new Literal(`"${value}"`):new Literal(`"${value}"^^${datatype}`)}function variable(name){return new Variable(name)}function defaultGraph(){return DEFAULTGRAPH}function quad(subject,predicate,object,graph){return new Quad(subject,predicate,object,graph)}},{"./IRIs":1,"./N3Util":8}],3:[function(require,module,exports){(function(Buffer){(function(){Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _IRIs=_interopRequireDefault(require("./IRIs"));var _queueMicrotask=_interopRequireDefault(require("queue-microtask"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const{xsd}=_IRIs.default;const escapeSequence=/\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g;const escapeReplacements={"\\":"\\","'":"'",'"':'"',n:"\n",r:"\r",t:"\t",f:"\f",b:"\b",_:"_","~":"~",".":".","-":"-","!":"!",$:"$","&":"&","(":"(",")":")","*":"*","+":"+",",":",",";":";","=":"=","/":"/","?":"?","#":"#","@":"@","%":"%"};const illegalIriChars=/[\x00-\x20<>\\"\{\}\|\^\`]/;const lineModeRegExps={_iri:true,_unescapedIri:true,_simpleQuotedString:true,_langcode:true,_blank:true,_newline:true,_comment:true,_whitespace:true,_endOfFile:true};const invalidRegExp=/$0^/;class N3Lexer{constructor(options){this._iri=/^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/;this._unescapedIri=/^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/;this._simpleQuotedString=/^"([^"\\\r\n]*)"(?=[^"])/;this._simpleApostropheString=/^'([^'\\\r\n]*)'(?=[^'])/;this._langcode=/^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i;this._prefix=/^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/;this._prefixed=/^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/;this._variable=/^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/;this._blank=/^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/;this._number=/^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/;this._boolean=/^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/;this._keyword=/^@[a-z]+(?=[\s#<:])/i;this._sparqlKeyword=/^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i;this._shortPredicates=/^a(?=[\s#()\[\]\{\}"'<>])/;this._newline=/^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/;this._comment=/#([^\n\r]*)/;this._whitespace=/^[ \t]+/;this._endOfFile=/^(?:#[^\n\r]*)?$/;options=options||{};if(this._lineMode=!!options.lineMode){this._n3Mode=false;for(const key in this){if(!(key in lineModeRegExps)&&this[key]instanceof RegExp)this[key]=invalidRegExp;}}else {this._n3Mode=options.n3!==false;}this._comments=!!options.comments;this._literalClosingPos=0;}_tokenizeToEnd(callback,inputFinished){let input=this._input;let currentLineLength=input.length;while(true){let whiteSpaceMatch,comment;while(whiteSpaceMatch=this._newline.exec(input)){if(this._comments&&(comment=this._comment.exec(whiteSpaceMatch[0])))emitToken("comment",comment[1],"",this._line,whiteSpaceMatch[0].length);input=input.substr(whiteSpaceMatch[0].length,input.length);currentLineLength=input.length;this._line++;}if(!whiteSpaceMatch&&(whiteSpaceMatch=this._whitespace.exec(input)))input=input.substr(whiteSpaceMatch[0].length,input.length);if(this._endOfFile.test(input)){if(inputFinished){if(this._comments&&(comment=this._comment.exec(input)))emitToken("comment",comment[1],"",this._line,input.length);input=null;emitToken("eof","","",this._line,0);}return this._input=input}const line=this._line,firstChar=input[0];let type="",value="",prefix="",match=null,matchLength=0,inconclusive=false;switch(firstChar){case"^":if(input.length<3)break;else if(input[1]==="^"){this._previousMarker="^^";input=input.substr(2);if(input[0]!=="<"){inconclusive=true;break}}else {if(this._n3Mode){matchLength=1;type="^";}break}case"<":if(match=this._unescapedIri.exec(input))type="IRI",value=match[1];else if(match=this._iri.exec(input)){value=this._unescape(match[1]);if(value===null||illegalIriChars.test(value))return reportSyntaxError(this);type="IRI";}else if(input.length>1&&input[1]==="<")type="<<",matchLength=2;else if(this._n3Mode&&input.length>1&&input[1]==="=")type="inverse",matchLength=2,value=">";break;case">":if(input.length>1&&input[1]===">")type=">>",matchLength=2;break;case"_":if((match=this._blank.exec(input))||inputFinished&&(match=this._blank.exec(`${input} `)))type="blank",prefix="_",value=match[1];break;case'"':if(match=this._simpleQuotedString.exec(input))value=match[1];else {({value,matchLength}=this._parseLiteral(input));if(value===null)return reportSyntaxError(this)}if(match!==null||matchLength!==0){type="literal";this._literalClosingPos=0;}break;case"'":if(!this._lineMode){if(match=this._simpleApostropheString.exec(input))value=match[1];else {({value,matchLength}=this._parseLiteral(input));if(value===null)return reportSyntaxError(this)}if(match!==null||matchLength!==0){type="literal";this._literalClosingPos=0;}}break;case"?":if(this._n3Mode&&(match=this._variable.exec(input)))type="var",value=match[0];break;case"@":if(this._previousMarker==="literal"&&(match=this._langcode.exec(input)))type="langcode",value=match[1];else if(match=this._keyword.exec(input))type=match[0];break;case".":if(input.length===1?inputFinished:input[1]<"0"||input[1]>"9"){type=".";matchLength=1;break}case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"+":case"-":if(match=this._number.exec(input)||inputFinished&&(match=this._number.exec(`${input} `))){type="literal",value=match[0];prefix=typeof match[1]==="string"?xsd.double:typeof match[2]==="string"?xsd.decimal:xsd.integer;}break;case"B":case"b":case"p":case"P":case"G":case"g":if(match=this._sparqlKeyword.exec(input))type=match[0].toUpperCase();else inconclusive=true;break;case"f":case"t":if(match=this._boolean.exec(input))type="literal",value=match[0],prefix=xsd.boolean;else inconclusive=true;break;case"a":if(match=this._shortPredicates.exec(input))type="abbreviation",value="a";else inconclusive=true;break;case"=":if(this._n3Mode&&input.length>1){type="abbreviation";if(input[1]!==">")matchLength=1,value="=";else matchLength=2,value=">";}break;case"!":if(!this._n3Mode)break;case",":case";":case"[":case"]":case"(":case")":case"{":case"}":if(!this._lineMode){matchLength=1;type=firstChar;}break;default:inconclusive=true;}if(inconclusive){if((this._previousMarker==="@prefix"||this._previousMarker==="PREFIX")&&(match=this._prefix.exec(input)))type="prefix",value=match[1]||"";else if((match=this._prefixed.exec(input))||inputFinished&&(match=this._prefixed.exec(`${input} `)))type="prefixed",prefix=match[1]||"",value=this._unescape(match[2]);}if(this._previousMarker==="^^"){switch(type){case"prefixed":type="type";break;case"IRI":type="typeIRI";break;default:type="";}}if(!type){if(inputFinished||!/^'''|^"""/.test(input)&&/\n|\r/.test(input))return reportSyntaxError(this);else return this._input=input}const length=matchLength||match[0].length;const token=emitToken(type,value,prefix,line,length);this.previousToken=token;this._previousMarker=type;input=input.substr(length,input.length);}function emitToken(type,value,prefix,line,length){const start=input?currentLineLength-input.length:currentLineLength;const end=start+length;const token={type:type,value:value,prefix:prefix,line:line,start:start,end:end};callback(null,token);return token}function reportSyntaxError(self){callback(self._syntaxError(/^\S*/.exec(input)[0]));}}_unescape(item){let invalid=false;const replaced=item.replace(escapeSequence,(sequence,unicode4,unicode8,escapedChar)=>{if(typeof unicode4==="string")return String.fromCharCode(Number.parseInt(unicode4,16));if(typeof unicode8==="string"){let charCode=Number.parseInt(unicode8,16);return charCode<=65535?String.fromCharCode(Number.parseInt(unicode8,16)):String.fromCharCode(55296+((charCode-=65536)>>10),56320+(charCode&1023))}if(escapedChar in escapeReplacements)return escapeReplacements[escapedChar];invalid=true;return ""});return invalid?null:replaced}_parseLiteral(input){if(input.length>=3){const opening=input.match(/^(?:"""|"|'''|'|)/)[0];const openingLength=opening.length;let closingPos=Math.max(this._literalClosingPos,openingLength);while((closingPos=input.indexOf(opening,closingPos))>0){let backslashCount=0;while(input[closingPos-backslashCount-1]==="\\")backslashCount++;if(backslashCount%2===0){const raw=input.substring(openingLength,closingPos);const lines=raw.split(/\r\n|\r|\n/).length-1;const matchLength=closingPos+openingLength;if(openingLength===1&&lines!==0||openingLength===3&&this._lineMode)break;this._line+=lines;return {value:this._unescape(raw),matchLength:matchLength}}closingPos++;}this._literalClosingPos=input.length-openingLength+1;}return {value:"",matchLength:0}}_syntaxError(issue){this._input=null;const err=new Error(`Unexpected "${issue}" on line ${this._line}.`);err.context={token:undefined,line:this._line,previousToken:this.previousToken};return err}_readStartingBom(input){return input.startsWith("\ufeff")?input.substr(1):input}tokenize(input,callback){this._line=1;if(typeof input==="string"){this._input=this._readStartingBom(input);if(typeof callback==="function")(0, _queueMicrotask.default)(()=>this._tokenizeToEnd(callback,true));else {const tokens=[];let error;this._tokenizeToEnd((e,t)=>e?error=e:tokens.push(t),true);if(error)throw error;return tokens}}else {this._pendingBuffer=null;if(typeof input.setEncoding==="function")input.setEncoding("utf8");input.on("data",data=>{if(this._input!==null&&data.length!==0){if(this._pendingBuffer){data=Buffer.concat([this._pendingBuffer,data]);this._pendingBuffer=null;}if(data[data.length-1]&128){this._pendingBuffer=data;}else {if(typeof this._input==="undefined")this._input=this._readStartingBom(typeof data==="string"?data:data.toString());else this._input+=data;this._tokenizeToEnd(callback,false);}}});input.on("end",()=>{if(typeof this._input==="string")this._tokenizeToEnd(callback,true);});input.on("error",callback);}}}exports.default=N3Lexer;}).call(this);}).call(this,require("buffer").Buffer);},{"./IRIs":1,buffer:13,"queue-microtask":18}],4:[function(require,module,exports){Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _N3Lexer=_interopRequireDefault(require("./N3Lexer"));var _N3DataFactory=_interopRequireDefault(require("./N3DataFactory"));var _IRIs=_interopRequireDefault(require("./IRIs"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}let blankNodePrefix=0;class N3Parser{constructor(options){this._contextStack=[];this._graph=null;options=options||{};this._setBase(options.baseIRI);options.factory&&initDataFactory(this,options.factory);const format=typeof options.format==="string"?options.format.match(/\w*$/)[0].toLowerCase():"",isTurtle=/turtle/.test(format),isTriG=/trig/.test(format),isNTriples=/triple/.test(format),isNQuads=/quad/.test(format),isN3=this._n3Mode=/n3/.test(format),isLineMode=isNTriples||isNQuads;if(!(this._supportsNamedGraphs=!(isTurtle||isN3)))this._readPredicateOrNamedGraph=this._readPredicate;this._supportsQuads=!(isTurtle||isTriG||isNTriples||isN3);this._supportsRDFStar=format===""||/star|\*$/.test(format);if(isLineMode)this._resolveRelativeIRI=iri=>{return null};this._blankNodePrefix=typeof options.blankNodePrefix!=="string"?"":options.blankNodePrefix.replace(/^(?!_:)/,"_:");this._lexer=options.lexer||new _N3Lexer.default({lineMode:isLineMode,n3:isN3});this._explicitQuantifiers=!!options.explicitQuantifiers;}static _resetBlankNodePrefix(){blankNodePrefix=0;}_setBase(baseIRI){if(!baseIRI){this._base="";this._basePath="";}else {const fragmentPos=baseIRI.indexOf("#");if(fragmentPos>=0)baseIRI=baseIRI.substr(0,fragmentPos);this._base=baseIRI;this._basePath=baseIRI.indexOf("/")<0?baseIRI:baseIRI.replace(/[^\/?]*(?:\?.*)?$/,"");baseIRI=baseIRI.match(/^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i);this._baseRoot=baseIRI[0];this._baseScheme=baseIRI[1];}}_saveContext(type,graph,subject,predicate,object){const n3Mode=this._n3Mode;this._contextStack.push({type:type,subject:subject,predicate:predicate,object:object,graph:graph,inverse:n3Mode?this._inversePredicate:false,blankPrefix:n3Mode?this._prefixes._:"",quantified:n3Mode?this._quantified:null});if(n3Mode){this._inversePredicate=false;this._prefixes._=this._graph?`${this._graph.id.substr(2)}.`:".";this._quantified=Object.create(this._quantified);}}_restoreContext(type,token){const context=this._contextStack.pop();if(!context||context.type!==type)return this._error(`Unexpected ${token.type}`,token);this._subject=context.subject;this._predicate=context.predicate;this._object=context.object;this._graph=context.graph;if(this._n3Mode){this._inversePredicate=context.inverse;this._prefixes._=context.blankPrefix;this._quantified=context.quantified;}}_readInTopContext(token){switch(token.type){case"eof":if(this._graph!==null)return this._error("Unclosed graph",token);delete this._prefixes._;return this._callback(null,null,this._prefixes);case"PREFIX":this._sparqlStyle=true;case"@prefix":return this._readPrefix;case"BASE":this._sparqlStyle=true;case"@base":return this._readBaseIRI;case"{":if(this._supportsNamedGraphs){this._graph="";this._subject=null;return this._readSubject}case"GRAPH":if(this._supportsNamedGraphs)return this._readNamedGraphLabel;default:return this._readSubject(token)}}_readEntity(token,quantifier){let value;switch(token.type){case"IRI":case"typeIRI":const iri=this._resolveIRI(token.value);if(iri===null)return this._error("Invalid IRI",token);value=this._namedNode(iri);break;case"type":case"prefixed":const prefix=this._prefixes[token.prefix];if(prefix===undefined)return this._error(`Undefined prefix "${token.prefix}:"`,token);value=this._namedNode(prefix+token.value);break;case"blank":value=this._blankNode(this._prefixes[token.prefix]+token.value);break;case"var":value=this._variable(token.value.substr(1));break;default:return this._error(`Expected entity but got ${token.type}`,token)}if(!quantifier&&this._n3Mode&&value.id in this._quantified)value=this._quantified[value.id];return value}_readSubject(token){this._predicate=null;switch(token.type){case"[":this._saveContext("blank",this._graph,this._subject=this._blankNode(),null,null);return this._readBlankNodeHead;case"(":this._saveContext("list",this._graph,this.RDF_NIL,null,null);this._subject=null;return this._readListItem;case"{":if(!this._n3Mode)return this._error("Unexpected graph",token);this._saveContext("formula",this._graph,this._graph=this._blankNode(),null,null);return this._readSubject;case"}":return this._readPunctuation(token);case"@forSome":if(!this._n3Mode)return this._error('Unexpected "@forSome"',token);this._subject=null;this._predicate=this.N3_FORSOME;this._quantifier=this._blankNode;return this._readQuantifierList;case"@forAll":if(!this._n3Mode)return this._error('Unexpected "@forAll"',token);this._subject=null;this._predicate=this.N3_FORALL;this._quantifier=this._variable;return this._readQuantifierList;case"literal":if(!this._n3Mode)return this._error("Unexpected literal",token);if(token.prefix.length===0){this._literalValue=token.value;return this._completeSubjectLiteral}else this._subject=this._literal(token.value,this._namedNode(token.prefix));break;case"<<":if(!this._supportsRDFStar)return this._error("Unexpected RDF* syntax",token);this._saveContext("<<",this._graph,null,null,null);this._graph=null;return this._readSubject;default:if((this._subject=this._readEntity(token))===undefined)return;if(this._n3Mode)return this._getPathReader(this._readPredicateOrNamedGraph)}return this._readPredicateOrNamedGraph}_readPredicate(token){const type=token.type;switch(type){case"inverse":this._inversePredicate=true;case"abbreviation":this._predicate=this.ABBREVIATIONS[token.value];break;case".":case"]":case"}":if(this._predicate===null)return this._error(`Unexpected ${type}`,token);this._subject=null;return type==="]"?this._readBlankNodeTail(token):this._readPunctuation(token);case";":return this._predicate!==null?this._readPredicate:this._error("Expected predicate but got ;",token);case"[":if(this._n3Mode){this._saveContext("blank",this._graph,this._subject,this._subject=this._blankNode(),null);return this._readBlankNodeHead}case"blank":if(!this._n3Mode)return this._error("Disallowed blank node as predicate",token);default:if((this._predicate=this._readEntity(token))===undefined)return}return this._readObject}_readObject(token){switch(token.type){case"literal":if(token.prefix.length===0){this._literalValue=token.value;return this._readDataTypeOrLang}else this._object=this._literal(token.value,this._namedNode(token.prefix));break;case"[":this._saveContext("blank",this._graph,this._subject,this._predicate,this._subject=this._blankNode());return this._readBlankNodeHead;case"(":this._saveContext("list",this._graph,this._subject,this._predicate,this.RDF_NIL);this._subject=null;return this._readListItem;case"{":if(!this._n3Mode)return this._error("Unexpected graph",token);this._saveContext("formula",this._graph,this._subject,this._predicate,this._graph=this._blankNode());return this._readSubject;case"<<":if(!this._supportsRDFStar)return this._error("Unexpected RDF* syntax",token);this._saveContext("<<",this._graph,this._subject,this._predicate,null);this._graph=null;return this._readSubject;default:if((this._object=this._readEntity(token))===undefined)return;if(this._n3Mode)return this._getPathReader(this._getContextEndReader())}return this._getContextEndReader()}_readPredicateOrNamedGraph(token){return token.type==="{"?this._readGraph(token):this._readPredicate(token)}_readGraph(token){if(token.type!=="{")return this._error(`Expected graph but got ${token.type}`,token);this._graph=this._subject,this._subject=null;return this._readSubject}_readBlankNodeHead(token){if(token.type==="]"){this._subject=null;return this._readBlankNodeTail(token)}else {this._predicate=null;return this._readPredicate(token)}}_readBlankNodeTail(token){if(token.type!=="]")return this._readBlankNodePunctuation(token);if(this._subject!==null)this._emit(this._subject,this._predicate,this._object,this._graph);const empty=this._predicate===null;this._restoreContext("blank",token);if(this._object!==null)return this._getContextEndReader();else if(this._predicate!==null)return this._readObject;else return empty?this._readPredicateOrNamedGraph:this._readPredicateAfterBlank}_readPredicateAfterBlank(token){switch(token.type){case".":case"}":this._subject=null;return this._readPunctuation(token);default:return this._readPredicate(token)}}_readListItem(token){let item=null,list=null,next=this._readListItem;const previousList=this._subject,stack=this._contextStack,parent=stack[stack.length-1];switch(token.type){case"[":this._saveContext("blank",this._graph,list=this._blankNode(),this.RDF_FIRST,this._subject=item=this._blankNode());next=this._readBlankNodeHead;break;case"(":this._saveContext("list",this._graph,list=this._blankNode(),this.RDF_FIRST,this.RDF_NIL);this._subject=null;break;case")":this._restoreContext("list",token);if(stack.length!==0&&stack[stack.length-1].type==="list")this._emit(this._subject,this._predicate,this._object,this._graph);if(this._predicate===null){next=this._readPredicate;if(this._subject===this.RDF_NIL)return next}else {next=this._getContextEndReader();if(this._object===this.RDF_NIL)return next}list=this.RDF_NIL;break;case"literal":if(token.prefix.length===0){this._literalValue=token.value;next=this._readListItemDataTypeOrLang;}else {item=this._literal(token.value,this._namedNode(token.prefix));next=this._getContextEndReader();}break;case"{":if(!this._n3Mode)return this._error("Unexpected graph",token);this._saveContext("formula",this._graph,this._subject,this._predicate,this._graph=this._blankNode());return this._readSubject;default:if((item=this._readEntity(token))===undefined)return}if(list===null)this._subject=list=this._blankNode();if(previousList===null){if(parent.predicate===null)parent.subject=list;else parent.object=list;}else {this._emit(previousList,this.RDF_REST,list,this._graph);}if(item!==null){if(this._n3Mode&&(token.type==="IRI"||token.type==="prefixed")){this._saveContext("item",this._graph,list,this.RDF_FIRST,item);this._subject=item,this._predicate=null;return this._getPathReader(this._readListItem)}this._emit(list,this.RDF_FIRST,item,this._graph);}return next}_readDataTypeOrLang(token){return this._completeObjectLiteral(token,false)}_readListItemDataTypeOrLang(token){return this._completeObjectLiteral(token,true)}_completeLiteral(token){let literal=this._literal(this._literalValue);switch(token.type){case"type":case"typeIRI":const datatype=this._readEntity(token);if(datatype===undefined)return;literal=this._literal(this._literalValue,datatype);token=null;break;case"langcode":literal=this._literal(this._literalValue,token.value);token=null;break}return {token:token,literal:literal}}_completeSubjectLiteral(token){this._subject=this._completeLiteral(token).literal;return this._readPredicateOrNamedGraph}_completeObjectLiteral(token,listItem){const completed=this._completeLiteral(token);if(!completed)return;this._object=completed.literal;if(listItem)this._emit(this._subject,this.RDF_FIRST,this._object,this._graph);if(completed.token===null)return this._getContextEndReader();else {this._readCallback=this._getContextEndReader();return this._readCallback(completed.token)}}_readFormulaTail(token){if(token.type!=="}")return this._readPunctuation(token);if(this._subject!==null)this._emit(this._subject,this._predicate,this._object,this._graph);this._restoreContext("formula",token);return this._object===null?this._readPredicate:this._getContextEndReader()}_readPunctuation(token){let next,graph=this._graph;const subject=this._subject,inversePredicate=this._inversePredicate;switch(token.type){case"}":if(this._graph===null)return this._error("Unexpected graph closing",token);if(this._n3Mode)return this._readFormulaTail(token);this._graph=null;case".":this._subject=null;next=this._contextStack.length?this._readSubject:this._readInTopContext;if(inversePredicate)this._inversePredicate=false;break;case";":next=this._readPredicate;break;case",":next=this._readObject;break;default:if(this._supportsQuads&&this._graph===null&&(graph=this._readEntity(token))!==undefined){next=this._readQuadPunctuation;break}return this._error(`Expected punctuation to follow "${this._object.id}"`,token)}if(subject!==null){const predicate=this._predicate,object=this._object;if(!inversePredicate)this._emit(subject,predicate,object,graph);else this._emit(object,predicate,subject,graph);}return next}_readBlankNodePunctuation(token){let next;switch(token.type){case";":next=this._readPredicate;break;case",":next=this._readObject;break;default:return this._error(`Expected punctuation to follow "${this._object.id}"`,token)}this._emit(this._subject,this._predicate,this._object,this._graph);return next}_readQuadPunctuation(token){if(token.type!==".")return this._error("Expected dot to follow quad",token);return this._readInTopContext}_readPrefix(token){if(token.type!=="prefix")return this._error("Expected prefix to follow @prefix",token);this._prefix=token.value;return this._readPrefixIRI}_readPrefixIRI(token){if(token.type!=="IRI")return this._error(`Expected IRI to follow prefix "${this._prefix}:"`,token);const prefixNode=this._readEntity(token);this._prefixes[this._prefix]=prefixNode.value;this._prefixCallback(this._prefix,prefixNode);return this._readDeclarationPunctuation}_readBaseIRI(token){const iri=token.type==="IRI"&&this._resolveIRI(token.value);if(!iri)return this._error("Expected valid IRI to follow base declaration",token);this._setBase(iri);return this._readDeclarationPunctuation}_readNamedGraphLabel(token){switch(token.type){case"IRI":case"blank":case"prefixed":return this._readSubject(token),this._readGraph;case"[":return this._readNamedGraphBlankLabel;default:return this._error("Invalid graph label",token)}}_readNamedGraphBlankLabel(token){if(token.type!=="]")return this._error("Invalid graph label",token);this._subject=this._blankNode();return this._readGraph}_readDeclarationPunctuation(token){if(this._sparqlStyle){this._sparqlStyle=false;return this._readInTopContext(token)}if(token.type!==".")return this._error("Expected declaration to end with a dot",token);return this._readInTopContext}_readQuantifierList(token){let entity;switch(token.type){case"IRI":case"prefixed":if((entity=this._readEntity(token,true))!==undefined)break;default:return this._error(`Unexpected ${token.type}`,token)}if(!this._explicitQuantifiers)this._quantified[entity.id]=this._quantifier(this._blankNode().value);else {if(this._subject===null)this._emit(this._graph||this.DEFAULTGRAPH,this._predicate,this._subject=this._blankNode(),this.QUANTIFIERS_GRAPH);else this._emit(this._subject,this.RDF_REST,this._subject=this._blankNode(),this.QUANTIFIERS_GRAPH);this._emit(this._subject,this.RDF_FIRST,entity,this.QUANTIFIERS_GRAPH);}return this._readQuantifierPunctuation}_readQuantifierPunctuation(token){if(token.type===",")return this._readQuantifierList;else {if(this._explicitQuantifiers){this._emit(this._subject,this.RDF_REST,this.RDF_NIL,this.QUANTIFIERS_GRAPH);this._subject=null;}this._readCallback=this._getContextEndReader();return this._readCallback(token)}}_getPathReader(afterPath){this._afterPath=afterPath;return this._readPath}_readPath(token){switch(token.type){case"!":return this._readForwardPath;case"^":return this._readBackwardPath;default:const stack=this._contextStack,parent=stack.length&&stack[stack.length-1];if(parent&&parent.type==="item"){const item=this._subject;this._restoreContext("item",token);this._emit(this._subject,this.RDF_FIRST,item,this._graph);}return this._afterPath(token)}}_readForwardPath(token){let subject,predicate;const object=this._blankNode();if((predicate=this._readEntity(token))===undefined)return;if(this._predicate===null)subject=this._subject,this._subject=object;else subject=this._object,this._object=object;this._emit(subject,predicate,object,this._graph);return this._readPath}_readBackwardPath(token){const subject=this._blankNode();let predicate,object;if((predicate=this._readEntity(token))===undefined)return;if(this._predicate===null)object=this._subject,this._subject=subject;else object=this._object,this._object=subject;this._emit(subject,predicate,object,this._graph);return this._readPath}_readRDFStarTailOrGraph(token){if(token.type!==">>"){if(this._supportsQuads&&this._graph===null&&(this._graph=this._readEntity(token))!==undefined)return this._readRDFStarTail;return this._error(`Expected >> to follow "${this._object.id}"`,token)}return this._readRDFStarTail(token)}_readRDFStarTail(token){if(token.type!==">>")return this._error(`Expected >> but got ${token.type}`,token);const quad=this._quad(this._subject,this._predicate,this._object,this._graph||this.DEFAULTGRAPH);this._restoreContext("<<",token);if(this._subject===null){this._subject=quad;return this._readPredicate}else {this._object=quad;return this._getContextEndReader()}}_getContextEndReader(){const contextStack=this._contextStack;if(!contextStack.length)return this._readPunctuation;switch(contextStack[contextStack.length-1].type){case"blank":return this._readBlankNodeTail;case"list":return this._readListItem;case"formula":return this._readFormulaTail;case"<<":return this._readRDFStarTailOrGraph}}_emit(subject,predicate,object,graph){this._callback(null,this._quad(subject,predicate,object,graph||this.DEFAULTGRAPH));}_error(message,token){const err=new Error(`${message} on line ${token.line}.`);err.context={token:token,line:token.line,previousToken:this._lexer.previousToken};this._callback(err);this._callback=noop;}_resolveIRI(iri){return /^[a-z][a-z0-9+.-]*:/i.test(iri)?iri:this._resolveRelativeIRI(iri)}_resolveRelativeIRI(iri){if(!iri.length)return this._base;switch(iri[0]){case"#":return this._base+iri;case"?":return this._base.replace(/(?:\?.*)?$/,iri);case"/":return (iri[1]==="/"?this._baseScheme:this._baseRoot)+this._removeDotSegments(iri);default:return /^[^/:]*:/.test(iri)?null:this._removeDotSegments(this._basePath+iri)}}_removeDotSegments(iri){if(!/(^|\/)\.\.?($|[/#?])/.test(iri))return iri;const length=iri.length;let result="",i=-1,pathStart=-1,segmentStart=0,next="/";while(i<length){switch(next){case":":if(pathStart<0){if(iri[++i]==="/"&&iri[++i]==="/")while((pathStart=i+1)<length&&iri[pathStart]!=="/")i=pathStart;}break;case"?":case"#":i=length;break;case"/":if(iri[i+1]==="."){next=iri[++i+1];switch(next){case"/":result+=iri.substring(segmentStart,i-1);segmentStart=i+1;break;case undefined:case"?":case"#":return result+iri.substring(segmentStart,i)+iri.substr(i+1);case".":next=iri[++i+1];if(next===undefined||next==="/"||next==="?"||next==="#"){result+=iri.substring(segmentStart,i-2);if((segmentStart=result.lastIndexOf("/"))>=pathStart)result=result.substr(0,segmentStart);if(next!=="/")return `${result}/${iri.substr(i+1)}`;segmentStart=i+1;}}}}next=iri[++i];}return result+iri.substring(segmentStart)}parse(input,quadCallback,prefixCallback){this._readCallback=this._readInTopContext;this._sparqlStyle=false;this._prefixes=Object.create(null);this._prefixes._=this._blankNodePrefix?this._blankNodePrefix.substr(2):`b${blankNodePrefix++}_`;this._prefixCallback=prefixCallback||noop;this._inversePredicate=false;this._quantified=Object.create(null);if(!quadCallback){const quads=[];let error;this._callback=(e,t)=>{e?error=e:t&&quads.push(t);};this._lexer.tokenize(input).every(token=>{return this._readCallback=this._readCallback(token)});if(error)throw error;return quads}this._callback=quadCallback;this._lexer.tokenize(input,(error,token)=>{if(error!==null)this._callback(error),this._callback=noop;else if(this._readCallback)this._readCallback=this._readCallback(token);});}}exports.default=N3Parser;function noop(){}function initDataFactory(parser,factory){const namedNode=factory.namedNode;parser._namedNode=namedNode;parser._blankNode=factory.blankNode;parser._literal=factory.literal;parser._variable=factory.variable;parser._quad=factory.quad;parser.DEFAULTGRAPH=factory.defaultGraph();parser.RDF_FIRST=namedNode(_IRIs.default.rdf.first);parser.RDF_REST=namedNode(_IRIs.default.rdf.rest);parser.RDF_NIL=namedNode(_IRIs.default.rdf.nil);parser.N3_FORALL=namedNode(_IRIs.default.r.forAll);parser.N3_FORSOME=namedNode(_IRIs.default.r.forSome);parser.ABBREVIATIONS={a:namedNode(_IRIs.default.rdf.type),"=":namedNode(_IRIs.default.owl.sameAs),">":namedNode(_IRIs.default.log.implies)};parser.QUANTIFIERS_GRAPH=namedNode("urn:n3:quantifiers");}initDataFactory(N3Parser.prototype,_N3DataFactory.default);},{"./IRIs":1,"./N3DataFactory":2,"./N3Lexer":3}],5:[function(require,module,exports){Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _N3DataFactory=_interopRequireWildcard(require("./N3DataFactory"));var _readableStream=require("readable-stream");var _IRIs=_interopRequireDefault(require("./IRIs"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _getRequireWildcardCache(nodeInterop){if(typeof WeakMap!=="function")return null;var cacheBabelInterop=new WeakMap;var cacheNodeInterop=new WeakMap;return (_getRequireWildcardCache=function(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule){return obj}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return {default:obj}}var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj)){return cache.get(obj)}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(key!=="default"&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else {newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj}class N3Store{constructor(quads,options){this._size=0;this._graphs=Object.create(null);this._id=0;this._ids=Object.create(null);this._ids["><"]=0;this._entities=Object.create(null);this._blankNodeIndex=0;if(!options&&quads&&!quads[0])options=quads,quads=null;options=options||{};this._factory=options.factory||_N3DataFactory.default;if(quads)this.addQuads(quads);}get size(){let size=this._size;if(size!==null)return size;size=0;const graphs=this._graphs;let subjects,subject;for(const graphKey in graphs)for(const subjectKey in subjects=graphs[graphKey].subjects)for(const predicateKey in subject=subjects[subjectKey])size+=Object.keys(subject[predicateKey]).length;return this._size=size}_addToIndex(index0,key0,key1,key2){const index1=index0[key0]||(index0[key0]={});const index2=index1[key1]||(index1[key1]={});const existed=key2 in index2;if(!existed)index2[key2]=null;return !existed}_removeFromIndex(index0,key0,key1,key2){const index1=index0[key0],index2=index1[key1];delete index2[key2];for(const key in index2)return;delete index1[key1];for(const key in index1)return;delete index0[key0];}*_findInIndex(index0,key0,key1,key2,name0,name1,name2,graphId){let tmp,index1,index2;const entityKeys=this._entities;const graph=(0, _N3DataFactory.termFromId)(graphId,this._factory);const parts={subject:null,predicate:null,object:null};if(key0)(tmp=index0,index0={})[key0]=tmp[key0];for(const value0 in index0){if(index1=index0[value0]){parts[name0]=(0, _N3DataFactory.termFromId)(entityKeys[value0],this._factory);if(key1)(tmp=index1,index1={})[key1]=tmp[key1];for(const value1 in index1){if(index2=index1[value1]){parts[name1]=(0, _N3DataFactory.termFromId)(entityKeys[value1],this._factory);const values=key2?key2 in index2?[key2]:[]:Object.keys(index2);for(let l=0;l<values.length;l++){parts[name2]=(0, _N3DataFactory.termFromId)(entityKeys[values[l]],this._factory);yield this._factory.quad(parts.subject,parts.predicate,parts.object,graph);}}}}}}_loop(index0,callback){for(const key0 in index0)callback(key0);}_loopByKey0(index0,key0,callback){let index1,key1;if(index1=index0[key0]){for(key1 in index1)callback(key1);}}_loopByKey1(index0,key1,callback){let key0,index1;for(key0 in index0){index1=index0[key0];if(index1[key1])callback(key0);}}_loopBy2Keys(index0,key0,key1,callback){let index1,index2,key2;if((index1=index0[key0])&&(index2=index1[key1])){for(key2 in index2)callback(key2);}}_countInIndex(index0,key0,key1,key2){let count=0,tmp,index1,index2;if(key0)(tmp=index0,index0={})[key0]=tmp[key0];for(const value0 in index0){if(index1=index0[value0]){if(key1)(tmp=index1,index1={})[key1]=tmp[key1];for(const value1 in index1){if(index2=index1[value1]){if(key2)key2 in index2&&count++;else count+=Object.keys(index2).length;}}}}return count}_getGraphs(graph){if(!isString(graph))return this._graphs;const graphs={};graphs[graph]=this._graphs[graph];return graphs}_uniqueEntities(callback){const uniqueIds=Object.create(null);return id=>{if(!(id in uniqueIds)){uniqueIds[id]=true;callback((0, _N3DataFactory.termFromId)(this._entities[id],this._factory));}}}add(quad){this.addQuad(quad);return this}addQuad(subject,predicate,object,graph){if(!predicate)graph=subject.graph,object=subject.object,predicate=subject.predicate,subject=subject.subject;subject=(0, _N3DataFactory.termToId)(subject);predicate=(0, _N3DataFactory.termToId)(predicate);object=(0, _N3DataFactory.termToId)(object);graph=(0, _N3DataFactory.termToId)(graph);let graphItem=this._graphs[graph];if(!graphItem){graphItem=this._graphs[graph]={subjects:{},predicates:{},objects:{}};Object.freeze(graphItem);}const ids=this._ids;const entities=this._entities;subject=ids[subject]||(ids[entities[++this._id]=subject]=this._id);predicate=ids[predicate]||(ids[entities[++this._id]=predicate]=this._id);object=ids[object]||(ids[entities[++this._id]=object]=this._id);const changed=this._addToIndex(graphItem.subjects,subject,predicate,object);this._addToIndex(graphItem.predicates,predicate,object,subject);this._addToIndex(graphItem.objects,object,subject,predicate);this._size=null;return changed}addQuads(quads){for(let i=0;i<quads.length;i++)this.addQuad(quads[i]);}delete(quad){this.removeQuad(quad);return this}has(subjectOrQuad,predicate,object,graph){if(subjectOrQuad&&subjectOrQuad.subject)({subject:subjectOrQuad,predicate,object,graph}=subjectOrQuad);return !this.readQuads(subjectOrQuad,predicate,object,graph).next().done}import(stream){stream.on("data",quad=>{this.addQuad(quad);});return stream}removeQuad(subject,predicate,object,graph){if(!predicate)graph=subject.graph,object=subject.object,predicate=subject.predicate,subject=subject.subject;subject=(0, _N3DataFactory.termToId)(subject);predicate=(0, _N3DataFactory.termToId)(predicate);object=(0, _N3DataFactory.termToId)(object);graph=(0, _N3DataFactory.termToId)(graph);const ids=this._ids,graphs=this._graphs;let graphItem,subjects,predicates;if(!(subject=ids[subject])||!(predicate=ids[predicate])||!(object=ids[object])||!(graphItem=graphs[graph])||!(subjects=graphItem.subjects[subject])||!(predicates=subjects[predicate])||!(object in predicates))return false;this._removeFromIndex(graphItem.subjects,subject,predicate,object);this._removeFromIndex(graphItem.predicates,predicate,object,subject);this._removeFromIndex(graphItem.objects,object,subject,predicate);if(this._size!==null)this._size--;for(subject in graphItem.subjects)return true;delete graphs[graph];return true}removeQuads(quads){for(let i=0;i<quads.length;i++)this.removeQuad(quads[i]);}remove(stream){stream.on("data",quad=>{this.removeQuad(quad);});return stream}removeMatches(subject,predicate,object,graph){const stream=new _readableStream.Readable({objectMode:true});stream._read=()=>{for(const quad of this.readQuads(subject,predicate,object,graph))stream.push(quad);stream.push(null);};return this.remove(stream)}deleteGraph(graph){return this.removeMatches(null,null,null,graph)}getQuads(subject,predicate,object,graph){return [...this.readQuads(subject,predicate,object,graph)]}*readQuads(subject,predicate,object,graph){subject=subject&&(0, _N3DataFactory.termToId)(subject);predicate=predicate&&(0, _N3DataFactory.termToId)(predicate);object=object&&(0, _N3DataFactory.termToId)(object);graph=graph&&(0, _N3DataFactory.termToId)(graph);const graphs=this._getGraphs(graph),ids=this._ids;let content,subjectId,predicateId,objectId;if(isString(subject)&&!(subjectId=ids[subject])||isString(predicate)&&!(predicateId=ids[predicate])||isString(object)&&!(objectId=ids[object]))return;for(const graphId in graphs){if(content=graphs[graphId]){if(subjectId){if(objectId)yield*this._findInIndex(content.objects,objectId,subjectId,predicateId,"object","subject","predicate",graphId);else yield*this._findInIndex(content.subjects,subjectId,predicateId,null,"subject","predicate","object",graphId);}else if(predicateId)yield*this._findInIndex(content.predicates,predicateId,objectId,null,"predicate","object","subject",graphId);else if(objectId)yield*this._findInIndex(content.objects,objectId,null,null,"object","subject","predicate",graphId);else yield*this._findInIndex(content.subjects,null,null,null,"subject","predicate","object",graphId);}}}match(subject,predicate,object,graph){return new DatasetCoreAndReadableStream(this,subject,predicate,object,graph)}countQuads(subject,predicate,object,graph){subject=subject&&(0, _N3DataFactory.termToId)(subject);predicate=predicate&&(0, _N3DataFactory.termToId)(predicate);object=object&&(0, _N3DataFactory.termToId)(object);graph=graph&&(0, _N3DataFactory.termToId)(graph);const graphs=this._getGraphs(graph),ids=this._ids;let count=0,content,subjectId,predicateId,objectId;if(isString(subject)&&!(subjectId=ids[subject])||isString(predicate)&&!(predicateId=ids[predicate])||isString(object)&&!(objectId=ids[object]))return 0;for(const graphId in graphs){if(content=graphs[graphId]){if(subject){if(object)count+=this._countInIndex(content.objects,objectId,subjectId,predicateId);else count+=this._countInIndex(content.subjects,subjectId,predicateId,objectId);}else if(predicate){count+=this._countInIndex(content.predicates,predicateId,objectId,subjectId);}else {count+=this._countInIndex(content.objects,objectId,subjectId,predicateId);}}}return count}forEach(callback,subject,predicate,object,graph){this.some(quad=>{callback(quad);return false},subject,predicate,object,graph);}every(callback,subject,predicate,object,graph){let some=false;const every=!this.some(quad=>{some=true;return !callback(quad)},subject,predicate,object,graph);return some&&every}some(callback,subject,predicate,object,graph){for(const quad of this.readQuads(subject,predicate,object,graph))if(callback(quad))return true;return false}getSubjects(predicate,object,graph){const results=[];this.forSubjects(s=>{results.push(s);},predicate,object,graph);return results}forSubjects(callback,predicate,object,graph){predicate=predicate&&(0, _N3DataFactory.termToId)(predicate);object=object&&(0, _N3DataFactory.termToId)(object);graph=graph&&(0, _N3DataFactory.termToId)(graph);const ids=this._ids,graphs=this._getGraphs(graph);let content,predicateId,objectId;callback=this._uniqueEntities(callback);if(isString(predicate)&&!(predicateId=ids[predicate])||isString(object)&&!(objectId=ids[object]))return;for(graph in graphs){if(content=graphs[graph]){if(predicateId){if(objectId)this._loopBy2Keys(content.predicates,predicateId,objectId,callback);else this._loopByKey1(content.subjects,predicateId,callback);}else if(objectId)this._loopByKey0(content.objects,objectId,callback);else this._loop(content.subjects,callback);}}}getPredicates(subject,object,graph){const results=[];this.forPredicates(p=>{results.push(p);},subject,object,graph);return results}forPredicates(callback,subject,object,graph){subject=subject&&(0, _N3DataFactory.termToId)(subject);object=object&&(0, _N3DataFactory.termToId)(object);graph=graph&&(0, _N3DataFactory.termToId)(graph);const ids=this._ids,graphs=this._getGraphs(graph);let content,subjectId,objectId;callback=this._uniqueEntities(callback);if(isString(subject)&&!(subjectId=ids[subject])||isString(object)&&!(objectId=ids[object]))return;for(graph in graphs){if(content=graphs[graph]){if(subjectId){if(objectId)this._loopBy2Keys(content.objects,objectId,subjectId,callback);else this._loopByKey0(content.subjects,subjectId,callback);}else if(objectId)this._loopByKey1(content.predicates,objectId,callback);else this._loop(content.predicates,callback);}}}getObjects(subject,predicate,graph){const results=[];this.forObjects(o=>{results.push(o);},subject,predicate,graph);return results}forObjects(callback,subject,predicate,graph){subject=subject&&(0, _N3DataFactory.termToId)(subject);predicate=predicate&&(0, _N3DataFactory.termToId)(predicate);graph=graph&&(0, _N3DataFactory.termToId)(graph);const ids=this._ids,graphs=this._getGraphs(graph);let content,subjectId,predicateId;callback=this._uniqueEntities(callback);if(isString(subject)&&!(subjectId=ids[subject])||isString(predicate)&&!(predicateId=ids[predicate]))return;for(graph in graphs){if(content=graphs[graph]){if(subjectId){if(predicateId)this._loopBy2Keys(content.subjects,subjectId,predicateId,callback);else this._loopByKey1(content.objects,subjectId,callback);}else if(predicateId)this._loopByKey0(content.predicates,predicateId,callback);else this._loop(content.objects,callback);}}}getGraphs(subject,predicate,object){const results=[];this.forGraphs(g=>{results.push(g);},subject,predicate,object);return results}forGraphs(callback,subject,predicate,object){for(const graph in this._graphs){this.some(quad=>{callback(quad.graph);return true},subject,predicate,object,graph);}}createBlankNode(suggestedName){let name,index;if(suggestedName){name=suggestedName=`_:${suggestedName}`,index=1;while(this._ids[name])name=suggestedName+index++;}else {do{name=`_:b${this._blankNodeIndex++}`;}while(this._ids[name])}this._ids[name]=++this._id;this._entities[this._id]=name;return this._factory.blankNode(name.substr(2))}extractLists({remove=false,ignoreErrors=false}={}){const lists={};const onError=ignoreErrors?()=>true:(node,message)=>{throw new Error(`${node.value} ${message}`)};const tails=this.getQuads(null,_IRIs.default.rdf.rest,_IRIs.default.rdf.nil,null);const toRemove=remove?[...tails]:[];tails.forEach(tailQuad=>{const items=[];let malformed=false;let head;let headPos;const graph=tailQuad.graph;let current=tailQuad.subject;while(current&&!malformed){const objectQuads=this.getQuads(null,null,current,null);const subjectQuads=this.getQuads(current,null,null,null);let quad,first=null,rest=null,parent=null;for(let i=0;i<subjectQuads.length&&!malformed;i++){quad=subjectQuads[i];if(!quad.graph.equals(graph))malformed=onError(current,"not confined to single graph");else if(head)malformed=onError(current,"has non-list arcs out");else if(quad.predicate.value===_IRIs.default.rdf.first){if(first)malformed=onError(current,"has multiple rdf:first arcs");else toRemove.push(first=quad);}else if(quad.predicate.value===_IRIs.default.rdf.rest){if(rest)malformed=onError(current,"has multiple rdf:rest arcs");else toRemove.push(rest=quad);}else if(objectQuads.length)malformed=onError(current,"can't be subject and object");else {head=quad;headPos="subject";}}for(let i=0;i<objectQuads.length&&!malformed;++i){quad=objectQuads[i];if(head)malformed=onError(current,"can't have coreferences");else if(quad.predicate.value===_IRIs.default.rdf.rest){if(parent)malformed=onError(current,"has incoming rdf:rest arcs");else parent=quad;}else {head=quad;headPos="object";}}if(!first)malformed=onError(current,"has no list head");else items.unshift(first.object);current=parent&&parent.subject;}if(malformed)remove=false;else if(head)lists[head[headPos].value]=items;});if(remove)this.removeQuads(toRemove);return lists}*[Symbol.iterator](){yield*this.readQuads();}}exports.default=N3Store;function isString(s){return typeof s==="string"||s instanceof String}class DatasetCoreAndReadableStream extends _readableStream.Readable{constructor(n3Store,subject,predicate,object,graph){super({objectMode:true});Object.assign(this,{n3Store:n3Store,subject:subject,predicate:predicate,object:object,graph:graph});}get filtered(){if(!this._filtered){const{n3Store,graph,object,predicate,subject}=this;const newStore=this._filtered=new N3Store({factory:n3Store._factory});for(const quad of n3Store.readQuads(subject,predicate,object,graph))newStore.addQuad(quad);}return this._filtered}get size(){return this.filtered.size}_read(){for(const quad of this)this.push(quad);this.push(null);}add(quad){return this.filtered.add(quad)}delete(quad){return this.filtered.delete(quad)}has(quad){return this.filtered.has(quad)}match(subject,predicate,object,graph){return new DatasetCoreAndReadableStream(this.filtered,subject,predicate,object,graph)}*[Symbol.iterator](){yield*this._filtered||this.n3Store.readQuads(this.subject,this.predicate,this.object,this.graph);}}},{"./IRIs":1,"./N3DataFactory":2,"readable-stream":33}],6:[function(require,module,exports){Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _N3Parser=_interopRequireDefault(require("./N3Parser"));var _readableStream=require("readable-stream");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}class N3StreamParser extends _readableStream.Transform{constructor(options){super({decodeStrings:true});this._readableState.objectMode=true;const parser=new _N3Parser.default(options);let onData,onEnd;parser.parse({on:(event,callback)=>{switch(event){case"data":onData=callback;break;case"end":onEnd=callback;break}}},(error,quad)=>{error&&this.emit("error",error)||quad&&this.push(quad);},(prefix,uri)=>{this.emit("prefix",prefix,uri);});this._transform=(chunk,encoding,done)=>{onData(chunk);done();};this._flush=done=>{onEnd();done();};}import(stream){stream.on("data",chunk=>{this.write(chunk);});stream.on("end",()=>{this.end();});stream.on("error",error=>{this.emit("error",error);});return this}}exports.default=N3StreamParser;},{"./N3Parser":4,"readable-stream":33}],7:[function(require,module,exports){Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _readableStream=require("readable-stream");var _N3Writer=_interopRequireDefault(require("./N3Writer"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}class N3StreamWriter extends _readableStream.Transform{constructor(options){super({encoding:"utf8",writableObjectMode:true});const writer=this._writer=new _N3Writer.default({write:(quad,encoding,callback)=>{this.push(quad);callback&&callback();},end:callback=>{this.push(null);callback&&callback();}},options);this._transform=(quad,encoding,done)=>{writer.addQuad(quad,done);};this._flush=done=>{writer.end(done);};}import(stream){stream.on("data",quad=>{this.write(quad);});stream.on("end",()=>{this.end();});stream.on("error",error=>{this.emit("error",error);});stream.on("prefix",(prefix,iri)=>{this._writer.addPrefix(prefix,iri);});return this}}exports.default=N3StreamWriter;},{"./N3Writer":9,"readable-stream":33}],8:[function(require,module,exports){Object.defineProperty(exports,"__esModule",{value:true});exports.inDefaultGraph=inDefaultGraph;exports.isBlankNode=isBlankNode;exports.isDefaultGraph=isDefaultGraph;exports.isLiteral=isLiteral;exports.isNamedNode=isNamedNode;exports.isVariable=isVariable;exports.prefix=prefix;exports.prefixes=prefixes;var _N3DataFactory=_interopRequireDefault(require("./N3DataFactory"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function isNamedNode(term){return !!term&&term.termType==="NamedNode"}function isBlankNode(term){return !!term&&term.termType==="BlankNode"}function isLiteral(term){return !!term&&term.termType==="Literal"}function isVariable(term){return !!term&&term.termType==="Variable"}function isDefaultGraph(term){return !!term&&term.termType==="DefaultGraph"}function inDefaultGraph(quad){return isDefaultGraph(quad.graph)}function prefix(iri,factory){return prefixes({"":iri.value||iri},factory)("")}function prefixes(defaultPrefixes,factory){const prefixes=Object.create(null);for(const prefix in defaultPrefixes)processPrefix(prefix,defaultPrefixes[prefix]);factory=factory||_N3DataFactory.default;function processPrefix(prefix,iri){if(typeof iri==="string"){const cache=Object.create(null);prefixes[prefix]=local=>{return cache[local]||(cache[local]=factory.namedNode(iri+local))};}else if(!(prefix in prefixes)){throw new Error(`Unknown prefix: ${prefix}`)}return prefixes[prefix]}return processPrefix}},{"./N3DataFactory":2}],9:[function(require,module,exports){Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _IRIs=_interopRequireDefault(require("./IRIs"));var _N3DataFactory=_interopRequireWildcard(require("./N3DataFactory"));var _N3Util=require("./N3Util");function _getRequireWildcardCache(nodeInterop){if(typeof WeakMap!=="function")return null;var cacheBabelInterop=new WeakMap;var cacheNodeInterop=new WeakMap;return (_getRequireWildcardCache=function(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule){return obj}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return {default:obj}}var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj)){return cache.get(obj)}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(key!=="default"&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else {newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const DEFAULTGRAPH=_N3DataFactory.default.defaultGraph();const{rdf,xsd}=_IRIs.default;const escape=/["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/,escapeAll=/["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g,escapedCharacters={"\\":"\\\\",'"':'\\"',"\t":"\\t","\n":"\\n","\r":"\\r","\b":"\\b","\f":"\\f"};class SerializedTerm extends _N3DataFactory.Term{equals(){return false}}class N3Writer{constructor(outputStream,options){this._prefixRegex=/$0^/;if(outputStream&&typeof outputStream.write!=="function")options=outputStream,outputStream=null;options=options||{};this._lists=options.lists;if(!outputStream){let output="";this._outputStream={write(chunk,encoding,done){output+=chunk;done&&done();},end:done=>{done&&done(null,output);}};this._endStream=true;}else {this._outputStream=outputStream;this._endStream=options.end===undefined?true:!!options.end;}this._subject=null;if(!/triple|quad/i.test(options.format)){this._lineMode=false;this._graph=DEFAULTGRAPH;this._prefixIRIs=Object.create(null);options.prefixes&&this.addPrefixes(options.prefixes);if(options.baseIRI){this._baseMatcher=new RegExp(`^${escapeRegex(options.baseIRI)}${options.baseIRI.endsWith("/")?"":"[#?]"}`);this._baseLength=options.baseIRI.length;}}else {this._lineMode=true;this._writeQuad=this._writeQuadLine;}}get _inDefaultGraph(){return DEFAULTGRAPH.equals(this._graph)}_write(string,callback){this._outputStream.write(string,"utf8",callback);}_writeQuad(subject,predicate,object,graph,done){try{if(!graph.equals(this._graph)){this._write((this._subject===null?"":this._inDefaultGraph?".\n":"\n}\n")+(DEFAULTGRAPH.equals(graph)?"":`${this._encodeIriOrBlank(graph)} {\n`));this._graph=graph;this._subject=null;}if(subject.equals(this._subject)){if(predicate.equals(this._predicate))this._write(`, ${this._encodeObject(object)}`,done);else this._write(`;\n    ${this._encodePredicate(this._predicate=predicate)} ${this._encodeObject(object)}`,done);}else this._write(`${(this._subject===null?"":".\n")+this._encodeSubject(this._subject=subject)} ${this._encodePredicate(this._predicate=predicate)} ${this._encodeObject(object)}`,done);}catch(error){done&&done(error);}}_writeQuadLine(subject,predicate,object,graph,done){delete this._prefixMatch;this._write(this.quadToString(subject,predicate,object,graph),done);}quadToString(subject,predicate,object,graph){return `${this._encodeSubject(subject)} ${this._encodeIriOrBlank(predicate)} ${this._encodeObject(object)}${graph&&graph.value?` ${this._encodeIriOrBlank(graph)} .\n`:" .\n"}`}quadsToString(quads){return quads.map(t=>{return this.quadToString(t.subject,t.predicate,t.object,t.graph)}).join("")}_encodeSubject(entity){return entity.termType==="Quad"?this._encodeQuad(entity):this._encodeIriOrBlank(entity)}_encodeIriOrBlank(entity){if(entity.termType!=="NamedNode"){if(this._lists&&entity.value in this._lists)entity=this.list(this._lists[entity.value]);return "id"in entity?entity.id:`_:${entity.value}`}let iri=entity.value;if(this._baseMatcher&&this._baseMatcher.test(iri))iri=iri.substr(this._baseLength);if(escape.test(iri))iri=iri.replace(escapeAll,characterReplacer);const prefixMatch=this._prefixRegex.exec(iri);return !prefixMatch?`<${iri}>`:!prefixMatch[1]?iri:this._prefixIRIs[prefixMatch[1]]+prefixMatch[2]}_encodeLiteral(literal){let value=literal.value;if(escape.test(value))value=value.replace(escapeAll,characterReplacer);if(literal.language)return `"${value}"@${literal.language}`;if(this._lineMode){if(literal.datatype.value===xsd.string)return `"${value}"`}else {switch(literal.datatype.value){case xsd.string:return `"${value}"`;case xsd.boolean:if(value==="true"||value==="false")return value;break;case xsd.integer:if(/^[+-]?\d+$/.test(value))return value;break;case xsd.decimal:if(/^[+-]?\d*\.\d+$/.test(value))return value;break;case xsd.double:if(/^[+-]?(?:\d+\.\d*|\.?\d+)[eE][+-]?\d+$/.test(value))return value;break}}return `"${value}"^^${this._encodeIriOrBlank(literal.datatype)}`}_encodePredicate(predicate){return predicate.value===rdf.type?"a":this._encodeIriOrBlank(predicate)}_encodeObject(object){switch(object.termType){case"Quad":return this._encodeQuad(object);case"Literal":return this._encodeLiteral(object);default:return this._encodeIriOrBlank(object)}}_encodeQuad({subject,predicate,object,graph}){return `<<${this._encodeSubject(subject)} ${this._encodePredicate(predicate)} ${this._encodeObject(object)}${(0, _N3Util.isDefaultGraph)(graph)?"":` ${this._encodeIriOrBlank(graph)}`}>>`}_blockedWrite(){throw new Error("Cannot write because the writer has been closed.")}addQuad(subject,predicate,object,graph,done){if(object===undefined)this._writeQuad(subject.subject,subject.predicate,subject.object,subject.graph,predicate);else if(typeof graph==="function")this._writeQuad(subject,predicate,object,DEFAULTGRAPH,graph);else this._writeQuad(subject,predicate,object,graph||DEFAULTGRAPH,done);}addQuads(quads){for(let i=0;i<quads.length;i++)this.addQuad(quads[i]);}addPrefix(prefix,iri,done){const prefixes={};prefixes[prefix]=iri;this.addPrefixes(prefixes,done);}addPrefixes(prefixes,done){if(!this._prefixIRIs)return done&&done();let hasPrefixes=false;for(let prefix in prefixes){let iri=prefixes[prefix];if(typeof iri!=="string")iri=iri.value;hasPrefixes=true;if(this._subject!==null){this._write(this._inDefaultGraph?".\n":"\n}\n");this._subject=null,this._graph="";}this._prefixIRIs[iri]=prefix+=":";this._write(`@prefix ${prefix} <${iri}>.\n`);}if(hasPrefixes){let IRIlist="",prefixList="";for(const prefixIRI in this._prefixIRIs){IRIlist+=IRIlist?`|${prefixIRI}`:prefixIRI;prefixList+=(prefixList?"|":"")+this._prefixIRIs[prefixIRI];}IRIlist=escapeRegex(IRIlist);this._prefixRegex=new RegExp(`^(?:${prefixList})[^\/]*$|`+`^(${IRIlist})([a-zA-Z][\\-_a-zA-Z0-9]*)$`);}this._write(hasPrefixes?"\n":"",done);}blank(predicate,object){let children=predicate,child,length;if(predicate===undefined)children=[];else if(predicate.termType)children=[{predicate:predicate,object:object}];else if(!("length"in predicate))children=[predicate];switch(length=children.length){case 0:return new SerializedTerm("[]");case 1:child=children[0];if(!(child.object instanceof SerializedTerm))return new SerializedTerm(`[ ${this._encodePredicate(child.predicate)} ${this._encodeObject(child.object)} ]`);default:let contents="[";for(let i=0;i<length;i++){child=children[i];if(child.predicate.equals(predicate))contents+=`, ${this._encodeObject(child.object)}`;else {contents+=`${(i?";\n  ":"\n  ")+this._encodePredicate(child.predicate)} ${this._encodeObject(child.object)}`;predicate=child.predicate;}}return new SerializedTerm(`${contents}\n]`)}}list(elements){const length=elements&&elements.length||0,contents=new Array(length);for(let i=0;i<length;i++)contents[i]=this._encodeObject(elements[i]);return new SerializedTerm(`(${contents.join(" ")})`)}end(done){if(this._subject!==null){this._write(this._inDefaultGraph?".\n":"\n}\n");this._subject=null;}this._write=this._blockedWrite;let singleDone=done&&((error,result)=>{singleDone=null,done(error,result);});if(this._endStream){try{return this._outputStream.end(singleDone)}catch(error){}}singleDone&&singleDone();}}exports.default=N3Writer;function characterReplacer(character){let result=escapedCharacters[character];if(result===undefined){if(character.length===1){result=character.charCodeAt(0).toString(16);result="\\u0000".substr(0,6-result.length)+result;}else {result=((character.charCodeAt(0)-55296)*1024+character.charCodeAt(1)+9216).toString(16);result="\\U00000000".substr(0,10-result.length)+result;}}return result}function escapeRegex(regex){return regex.replace(/[\]\/\(\)\*\+\?\.\\\$]/g,"\\$&")}},{"./IRIs":1,"./N3DataFactory":2,"./N3Util":8}],10:[function(require,module,exports){Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"BlankNode",{enumerable:true,get:function(){return _N3DataFactory.BlankNode}});Object.defineProperty(exports,"DataFactory",{enumerable:true,get:function(){return _N3DataFactory.default}});Object.defineProperty(exports,"DefaultGraph",{enumerable:true,get:function(){return _N3DataFactory.DefaultGraph}});Object.defineProperty(exports,"Lexer",{enumerable:true,get:function(){return _N3Lexer.default}});Object.defineProperty(exports,"Literal",{enumerable:true,get:function(){return _N3DataFactory.Literal}});Object.defineProperty(exports,"NamedNode",{enumerable:true,get:function(){return _N3DataFactory.NamedNode}});Object.defineProperty(exports,"Parser",{enumerable:true,get:function(){return _N3Parser.default}});Object.defineProperty(exports,"Quad",{enumerable:true,get:function(){return _N3DataFactory.Quad}});Object.defineProperty(exports,"Store",{enumerable:true,get:function(){return _N3Store.default}});Object.defineProperty(exports,"StreamParser",{enumerable:true,get:function(){return _N3StreamParser.default}});Object.defineProperty(exports,"StreamWriter",{enumerable:true,get:function(){return _N3StreamWriter.default}});Object.defineProperty(exports,"Term",{enumerable:true,get:function(){return _N3DataFactory.Term}});Object.defineProperty(exports,"Triple",{enumerable:true,get:function(){return _N3DataFactory.Triple}});exports.Util=void 0;Object.defineProperty(exports,"Variable",{enumerable:true,get:function(){return _N3DataFactory.Variable}});Object.defineProperty(exports,"Writer",{enumerable:true,get:function(){return _N3Writer.default}});exports.default=void 0;Object.defineProperty(exports,"termFromId",{enumerable:true,get:function(){return _N3DataFactory.termFromId}});Object.defineProperty(exports,"termToId",{enumerable:true,get:function(){return _N3DataFactory.termToId}});var _N3Lexer=_interopRequireDefault(require("./N3Lexer"));var _N3Parser=_interopRequireDefault(require("./N3Parser"));var _N3Writer=_interopRequireDefault(require("./N3Writer"));var _N3Store=_interopRequireDefault(require("./N3Store"));var _N3StreamParser=_interopRequireDefault(require("./N3StreamParser"));var _N3StreamWriter=_interopRequireDefault(require("./N3StreamWriter"));var Util=_interopRequireWildcard(require("./N3Util"));exports.Util=Util;var _N3DataFactory=_interopRequireWildcard(require("./N3DataFactory"));function _getRequireWildcardCache(nodeInterop){if(typeof WeakMap!=="function")return null;var cacheBabelInterop=new WeakMap;var cacheNodeInterop=new WeakMap;return (_getRequireWildcardCache=function(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule){return obj}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return {default:obj}}var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj)){return cache.get(obj)}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(key!=="default"&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else {newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _default={Lexer:_N3Lexer.default,Parser:_N3Parser.default,Writer:_N3Writer.default,Store:_N3Store.default,StreamParser:_N3StreamParser.default,StreamWriter:_N3StreamWriter.default,Util:Util,DataFactory:_N3DataFactory.default,Term:_N3DataFactory.Term,NamedNode:_N3DataFactory.NamedNode,Literal:_N3DataFactory.Literal,BlankNode:_N3DataFactory.BlankNode,Variable:_N3DataFactory.Variable,DefaultGraph:_N3DataFactory.DefaultGraph,Quad:_N3DataFactory.Quad,Triple:_N3DataFactory.Triple,termFromId:_N3DataFactory.termFromId,termToId:_N3DataFactory.termToId};exports.default=_default;},{"./N3DataFactory":2,"./N3Lexer":3,"./N3Parser":4,"./N3Store":5,"./N3StreamParser":6,"./N3StreamWriter":7,"./N3Util":8,"./N3Writer":9}],11:[function(require,module,exports){exports.byteLength=byteLength;exports.toByteArray=toByteArray;exports.fromByteArray=fromByteArray;var lookup=[];var revLookup=[];var Arr=typeof Uint8Array!=="undefined"?Uint8Array:Array;var code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var i=0,len=code.length;i<len;++i){lookup[i]=code[i];revLookup[code.charCodeAt(i)]=i;}revLookup["-".charCodeAt(0)]=62;revLookup["_".charCodeAt(0)]=63;function getLens(b64){var len=b64.length;if(len%4>0){throw new Error("Invalid string. Length must be a multiple of 4")}var validLen=b64.indexOf("=");if(validLen===-1)validLen=len;var placeHoldersLen=validLen===len?0:4-validLen%4;return [validLen,placeHoldersLen]}function byteLength(b64){var lens=getLens(b64);var validLen=lens[0];var placeHoldersLen=lens[1];return (validLen+placeHoldersLen)*3/4-placeHoldersLen}function _byteLength(b64,validLen,placeHoldersLen){return (validLen+placeHoldersLen)*3/4-placeHoldersLen}function toByteArray(b64){var tmp;var lens=getLens(b64);var validLen=lens[0];var placeHoldersLen=lens[1];var arr=new Arr(_byteLength(b64,validLen,placeHoldersLen));var curByte=0;var len=placeHoldersLen>0?validLen-4:validLen;var i;for(i=0;i<len;i+=4){tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];arr[curByte++]=tmp>>16&255;arr[curByte++]=tmp>>8&255;arr[curByte++]=tmp&255;}if(placeHoldersLen===2){tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;arr[curByte++]=tmp&255;}if(placeHoldersLen===1){tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;arr[curByte++]=tmp>>8&255;arr[curByte++]=tmp&255;}return arr}function tripletToBase64(num){return lookup[num>>18&63]+lookup[num>>12&63]+lookup[num>>6&63]+lookup[num&63]}function encodeChunk(uint8,start,end){var tmp;var output=[];for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16&16711680)+(uint8[i+1]<<8&65280)+(uint8[i+2]&255);output.push(tripletToBase64(tmp));}return output.join("")}function fromByteArray(uint8){var tmp;var len=uint8.length;var extraBytes=len%3;var parts=[];var maxChunkLength=16383;for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength));}if(extraBytes===1){tmp=uint8[len-1];parts.push(lookup[tmp>>2]+lookup[tmp<<4&63]+"==");}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+uint8[len-1];parts.push(lookup[tmp>>10]+lookup[tmp>>4&63]+lookup[tmp<<2&63]+"=");}return parts.join("")}},{}],12:[function(require,module,exports){},{}],13:[function(require,module,exports){(function(Buffer){(function(){var base64=require("base64-js");var ieee754=require("ieee754");exports.Buffer=Buffer;exports.SlowBuffer=SlowBuffer;exports.INSPECT_MAX_BYTES=50;var K_MAX_LENGTH=2147483647;exports.kMaxLength=K_MAX_LENGTH;Buffer.TYPED_ARRAY_SUPPORT=typedArraySupport();if(!Buffer.TYPED_ARRAY_SUPPORT&&typeof console!=="undefined"&&typeof console.error==="function"){console.error("This browser lacks typed array (Uint8Array) support which is required by "+"`buffer` v5.x. Use `buffer` v4.x if you require old browser support.");}function typedArraySupport(){try{var arr=new Uint8Array(1);arr.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}};return arr.foo()===42}catch(e){return false}}Object.defineProperty(Buffer.prototype,"parent",{enumerable:true,get:function(){if(!Buffer.isBuffer(this))return undefined;return this.buffer}});Object.defineProperty(Buffer.prototype,"offset",{enumerable:true,get:function(){if(!Buffer.isBuffer(this))return undefined;return this.byteOffset}});function createBuffer(length){if(length>K_MAX_LENGTH){throw new RangeError('The value "'+length+'" is invalid for option "size"')}var buf=new Uint8Array(length);buf.__proto__=Buffer.prototype;return buf}function Buffer(arg,encodingOrOffset,length){if(typeof arg==="number"){if(typeof encodingOrOffset==="string"){throw new TypeError('The "string" argument must be of type string. Received type number')}return allocUnsafe(arg)}return from(arg,encodingOrOffset,length)}if(typeof Symbol!=="undefined"&&Symbol.species!=null&&Buffer[Symbol.species]===Buffer){Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:true,enumerable:false,writable:false});}Buffer.poolSize=8192;function from(value,encodingOrOffset,length){if(typeof value==="string"){return fromString(value,encodingOrOffset)}if(ArrayBuffer.isView(value)){return fromArrayLike(value)}if(value==null){throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, "+"or Array-like Object. Received type "+typeof value)}if(isInstance(value,ArrayBuffer)||value&&isInstance(value.buffer,ArrayBuffer)){return fromArrayBuffer(value,encodingOrOffset,length)}if(typeof value==="number"){throw new TypeError('The "value" argument must not be of type number. Received type number')}var valueOf=value.valueOf&&value.valueOf();if(valueOf!=null&&valueOf!==value){return Buffer.from(valueOf,encodingOrOffset,length)}var b=fromObject(value);if(b)return b;if(typeof Symbol!=="undefined"&&Symbol.toPrimitive!=null&&typeof value[Symbol.toPrimitive]==="function"){return Buffer.from(value[Symbol.toPrimitive]("string"),encodingOrOffset,length)}throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, "+"or Array-like Object. Received type "+typeof value)}Buffer.from=function(value,encodingOrOffset,length){return from(value,encodingOrOffset,length)};Buffer.prototype.__proto__=Uint8Array.prototype;Buffer.__proto__=Uint8Array;function assertSize(size){if(typeof size!=="number"){throw new TypeError('"size" argument must be of type number')}else if(size<0){throw new RangeError('The value "'+size+'" is invalid for option "size"')}}function alloc(size,fill,encoding){assertSize(size);if(size<=0){return createBuffer(size)}if(fill!==undefined){return typeof encoding==="string"?createBuffer(size).fill(fill,encoding):createBuffer(size).fill(fill)}return createBuffer(size)}Buffer.alloc=function(size,fill,encoding){return alloc(size,fill,encoding)};function allocUnsafe(size){assertSize(size);return createBuffer(size<0?0:checked(size)|0)}Buffer.allocUnsafe=function(size){return allocUnsafe(size)};Buffer.allocUnsafeSlow=function(size){return allocUnsafe(size)};function fromString(string,encoding){if(typeof encoding!=="string"||encoding===""){encoding="utf8";}if(!Buffer.isEncoding(encoding)){throw new TypeError("Unknown encoding: "+encoding)}var length=byteLength(string,encoding)|0;var buf=createBuffer(length);var actual=buf.write(string,encoding);if(actual!==length){buf=buf.slice(0,actual);}return buf}function fromArrayLike(array){var length=array.length<0?0:checked(array.length)|0;var buf=createBuffer(length);for(var i=0;i<length;i+=1){buf[i]=array[i]&255;}return buf}function fromArrayBuffer(array,byteOffset,length){if(byteOffset<0||array.byteLength<byteOffset){throw new RangeError('"offset" is outside of buffer bounds')}if(array.byteLength<byteOffset+(length||0)){throw new RangeError('"length" is outside of buffer bounds')}var buf;if(byteOffset===undefined&&length===undefined){buf=new Uint8Array(array);}else if(length===undefined){buf=new Uint8Array(array,byteOffset);}else {buf=new Uint8Array(array,byteOffset,length);}buf.__proto__=Buffer.prototype;return buf}function fromObject(obj){if(Buffer.isBuffer(obj)){var len=checked(obj.length)|0;var buf=createBuffer(len);if(buf.length===0){return buf}obj.copy(buf,0,0,len);return buf}if(obj.length!==undefined){if(typeof obj.length!=="number"||numberIsNaN(obj.length)){return createBuffer(0)}return fromArrayLike(obj)}if(obj.type==="Buffer"&&Array.isArray(obj.data)){return fromArrayLike(obj.data)}}function checked(length){if(length>=K_MAX_LENGTH){throw new RangeError("Attempt to allocate Buffer larger than maximum "+"size: 0x"+K_MAX_LENGTH.toString(16)+" bytes")}return length|0}function SlowBuffer(length){if(+length!=length){length=0;}return Buffer.alloc(+length)}Buffer.isBuffer=function isBuffer(b){return b!=null&&b._isBuffer===true&&b!==Buffer.prototype};Buffer.compare=function compare(a,b){if(isInstance(a,Uint8Array))a=Buffer.from(a,a.offset,a.byteLength);if(isInstance(b,Uint8Array))b=Buffer.from(b,b.offset,b.byteLength);if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array')}if(a===b)return 0;var x=a.length;var y=b.length;for(var i=0,len=Math.min(x,y);i<len;++i){if(a[i]!==b[i]){x=a[i];y=b[i];break}}if(x<y)return -1;if(y<x)return 1;return 0};Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return true;default:return false}};Buffer.concat=function concat(list,length){if(!Array.isArray(list)){throw new TypeError('"list" argument must be an Array of Buffers')}if(list.length===0){return Buffer.alloc(0)}var i;if(length===undefined){length=0;for(i=0;i<list.length;++i){length+=list[i].length;}}var buffer=Buffer.allocUnsafe(length);var pos=0;for(i=0;i<list.length;++i){var buf=list[i];if(isInstance(buf,Uint8Array)){buf=Buffer.from(buf);}if(!Buffer.isBuffer(buf)){throw new TypeError('"list" argument must be an Array of Buffers')}buf.copy(buffer,pos);pos+=buf.length;}return buffer};function byteLength(string,encoding){if(Buffer.isBuffer(string)){return string.length}if(ArrayBuffer.isView(string)||isInstance(string,ArrayBuffer)){return string.byteLength}if(typeof string!=="string"){throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. '+"Received type "+typeof string)}var len=string.length;var mustMatch=arguments.length>2&&arguments[2]===true;if(!mustMatch&&len===0)return 0;var loweredCase=false;for(;;){switch(encoding){case"ascii":case"latin1":case"binary":return len;case"utf8":case"utf-8":return utf8ToBytes(string).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return len*2;case"hex":return len>>>1;case"base64":return base64ToBytes(string).length;default:if(loweredCase){return mustMatch?-1:utf8ToBytes(string).length}encoding=(""+encoding).toLowerCase();loweredCase=true;}}}Buffer.byteLength=byteLength;function slowToString(encoding,start,end){var loweredCase=false;if(start===undefined||start<0){start=0;}if(start>this.length){return ""}if(end===undefined||end>this.length){end=this.length;}if(end<=0){return ""}end>>>=0;start>>>=0;if(end<=start){return ""}if(!encoding)encoding="utf8";while(true){switch(encoding){case"hex":return hexSlice(this,start,end);case"utf8":case"utf-8":return utf8Slice(this,start,end);case"ascii":return asciiSlice(this,start,end);case"latin1":case"binary":return latin1Slice(this,start,end);case"base64":return base64Slice(this,start,end);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(encoding+"").toLowerCase();loweredCase=true;}}}Buffer.prototype._isBuffer=true;function swap(b,n,m){var i=b[n];b[n]=b[m];b[m]=i;}Buffer.prototype.swap16=function swap16(){var len=this.length;if(len%2!==0){throw new RangeError("Buffer size must be a multiple of 16-bits")}for(var i=0;i<len;i+=2){swap(this,i,i+1);}return this};Buffer.prototype.swap32=function swap32(){var len=this.length;if(len%4!==0){throw new RangeError("Buffer size must be a multiple of 32-bits")}for(var i=0;i<len;i+=4){swap(this,i,i+3);swap(this,i+1,i+2);}return this};Buffer.prototype.swap64=function swap64(){var len=this.length;if(len%8!==0){throw new RangeError("Buffer size must be a multiple of 64-bits")}for(var i=0;i<len;i+=8){swap(this,i,i+7);swap(this,i+1,i+6);swap(this,i+2,i+5);swap(this,i+3,i+4);}return this};Buffer.prototype.toString=function toString(){var length=this.length;if(length===0)return "";if(arguments.length===0)return utf8Slice(this,0,length);return slowToString.apply(this,arguments)};Buffer.prototype.toLocaleString=Buffer.prototype.toString;Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError("Argument must be a Buffer");if(this===b)return true;return Buffer.compare(this,b)===0};Buffer.prototype.inspect=function inspect(){var str="";var max=exports.INSPECT_MAX_BYTES;str=this.toString("hex",0,max).replace(/(.{2})/g,"$1 ").trim();if(this.length>max)str+=" ... ";return "<Buffer "+str+">"};Buffer.prototype.compare=function compare(target,start,end,thisStart,thisEnd){if(isInstance(target,Uint8Array)){target=Buffer.from(target,target.offset,target.byteLength);}if(!Buffer.isBuffer(target)){throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. '+"Received type "+typeof target)}if(start===undefined){start=0;}if(end===undefined){end=target?target.length:0;}if(thisStart===undefined){thisStart=0;}if(thisEnd===undefined){thisEnd=this.length;}if(start<0||end>target.length||thisStart<0||thisEnd>this.length){throw new RangeError("out of range index")}if(thisStart>=thisEnd&&start>=end){return 0}if(thisStart>=thisEnd){return -1}if(start>=end){return 1}start>>>=0;end>>>=0;thisStart>>>=0;thisEnd>>>=0;if(this===target)return 0;var x=thisEnd-thisStart;var y=end-start;var len=Math.min(x,y);var thisCopy=this.slice(thisStart,thisEnd);var targetCopy=target.slice(start,end);for(var i=0;i<len;++i){if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i];y=targetCopy[i];break}}if(x<y)return -1;if(y<x)return 1;return 0};function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){if(buffer.length===0)return -1;if(typeof byteOffset==="string"){encoding=byteOffset;byteOffset=0;}else if(byteOffset>2147483647){byteOffset=2147483647;}else if(byteOffset<-2147483648){byteOffset=-2147483648;}byteOffset=+byteOffset;if(numberIsNaN(byteOffset)){byteOffset=dir?0:buffer.length-1;}if(byteOffset<0)byteOffset=buffer.length+byteOffset;if(byteOffset>=buffer.length){if(dir)return -1;else byteOffset=buffer.length-1;}else if(byteOffset<0){if(dir)byteOffset=0;else return -1}if(typeof val==="string"){val=Buffer.from(val,encoding);}if(Buffer.isBuffer(val)){if(val.length===0){return -1}return arrayIndexOf(buffer,val,byteOffset,encoding,dir)}else if(typeof val==="number"){val=val&255;if(typeof Uint8Array.prototype.indexOf==="function"){if(dir){return Uint8Array.prototype.indexOf.call(buffer,val,byteOffset)}else {return Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset)}}return arrayIndexOf(buffer,[val],byteOffset,encoding,dir)}throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(arr,val,byteOffset,encoding,dir){var indexSize=1;var arrLength=arr.length;var valLength=val.length;if(encoding!==undefined){encoding=String(encoding).toLowerCase();if(encoding==="ucs2"||encoding==="ucs-2"||encoding==="utf16le"||encoding==="utf-16le"){if(arr.length<2||val.length<2){return -1}indexSize=2;arrLength/=2;valLength/=2;byteOffset/=2;}}function read(buf,i){if(indexSize===1){return buf[i]}else {return buf.readUInt16BE(i*indexSize)}}var i;if(dir){var foundIndex=-1;for(i=byteOffset;i<arrLength;i++){if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){if(foundIndex===-1)foundIndex=i;if(i-foundIndex+1===valLength)return foundIndex*indexSize}else {if(foundIndex!==-1)i-=i-foundIndex;foundIndex=-1;}}}else {if(byteOffset+valLength>arrLength)byteOffset=arrLength-valLength;for(i=byteOffset;i>=0;i--){var found=true;for(var j=0;j<valLength;j++){if(read(arr,i+j)!==read(val,j)){found=false;break}}if(found)return i}}return -1}Buffer.prototype.includes=function includes(val,byteOffset,encoding){return this.indexOf(val,byteOffset,encoding)!==-1};Buffer.prototype.indexOf=function indexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,true)};Buffer.prototype.lastIndexOf=function lastIndexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,false)};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining;}else {length=Number(length);if(length>remaining){length=remaining;}}var strLen=string.length;if(length>strLen/2){length=strLen/2;}for(var i=0;i<length;++i){var parsed=parseInt(string.substr(i*2,2),16);if(numberIsNaN(parsed))return i;buf[offset+i]=parsed;}return i}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length)}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length)}function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length)}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length)}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length)}Buffer.prototype.write=function write(string,offset,length,encoding){if(offset===undefined){encoding="utf8";length=this.length;offset=0;}else if(length===undefined&&typeof offset==="string"){encoding=offset;length=this.length;offset=0;}else if(isFinite(offset)){offset=offset>>>0;if(isFinite(length)){length=length>>>0;if(encoding===undefined)encoding="utf8";}else {encoding=length;length=undefined;}}else {throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")}var remaining=this.length-offset;if(length===undefined||length>remaining)length=remaining;if(string.length>0&&(length<0||offset<0)||offset>this.length){throw new RangeError("Attempt to write outside buffer bounds")}if(!encoding)encoding="utf8";var loweredCase=false;for(;;){switch(encoding){case"hex":return hexWrite(this,string,offset,length);case"utf8":case"utf-8":return utf8Write(this,string,offset,length);case"ascii":return asciiWrite(this,string,offset,length);case"latin1":case"binary":return latin1Write(this,string,offset,length);case"base64":return base64Write(this,string,offset,length);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(""+encoding).toLowerCase();loweredCase=true;}}};Buffer.prototype.toJSON=function toJSON(){return {type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf)}else {return base64.fromByteArray(buf.slice(start,end))}}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);var res=[];var i=start;while(i<end){var firstByte=buf[i];var codePoint=null;var bytesPerSequence=firstByte>239?4:firstByte>223?3:firstByte>191?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:if(firstByte<128){codePoint=firstByte;}break;case 2:secondByte=buf[i+1];if((secondByte&192)===128){tempCodePoint=(firstByte&31)<<6|secondByte&63;if(tempCodePoint>127){codePoint=tempCodePoint;}}break;case 3:secondByte=buf[i+1];thirdByte=buf[i+2];if((secondByte&192)===128&&(thirdByte&192)===128){tempCodePoint=(firstByte&15)<<12|(secondByte&63)<<6|thirdByte&63;if(tempCodePoint>2047&&(tempCodePoint<55296||tempCodePoint>57343)){codePoint=tempCodePoint;}}break;case 4:secondByte=buf[i+1];thirdByte=buf[i+2];fourthByte=buf[i+3];if((secondByte&192)===128&&(thirdByte&192)===128&&(fourthByte&192)===128){tempCodePoint=(firstByte&15)<<18|(secondByte&63)<<12|(thirdByte&63)<<6|fourthByte&63;if(tempCodePoint>65535&&tempCodePoint<1114112){codePoint=tempCodePoint;}}}}if(codePoint===null){codePoint=65533;bytesPerSequence=1;}else if(codePoint>65535){codePoint-=65536;res.push(codePoint>>>10&1023|55296);codePoint=56320|codePoint&1023;}res.push(codePoint);i+=bytesPerSequence;}return decodeCodePointsArray(res)}var MAX_ARGUMENTS_LENGTH=4096;function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints)}var res="";var i=0;while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH));}return res}function asciiSlice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]&127);}return ret}function latin1Slice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]);}return ret}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out="";for(var i=start;i<end;++i){out+=toHex(buf[i]);}return out}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res="";for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256);}return res}Buffer.prototype.slice=function slice(start,end){var len=this.length;start=~~start;end=end===undefined?len:~~end;if(start<0){start+=len;if(start<0)start=0;}else if(start>len){start=len;}if(end<0){end+=len;if(end<0)end=0;}else if(end>len){end=len;}if(end<start)end=start;var newBuf=this.subarray(start,end);newBuf.__proto__=Buffer.prototype;return newBuf};function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError("offset is not uint");if(offset+ext>length)throw new RangeError("Trying to access beyond buffer length")}Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul;}return val};Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){checkOffset(offset,byteLength,this.length);}var val=this[offset+--byteLength];var mul=1;while(byteLength>0&&(mul*=256)){val+=this[offset+--byteLength]*mul;}return val};Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);return this[offset]};Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]|this[offset+1]<<8};Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]<<8|this[offset+1]};Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return (this[offset]|this[offset+1]<<8|this[offset+2]<<16)+this[offset+3]*16777216};Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]*16777216+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3])};Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=256)){val+=this[offset+i]*mul;}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var i=byteLength;var mul=1;var val=this[offset+--i];while(i>0&&(mul*=256)){val+=this[offset+--i]*mul;}mul*=128;if(val>=mul)val-=Math.pow(2,8*byteLength);return val};Buffer.prototype.readInt8=function readInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);if(!(this[offset]&128))return this[offset];return (255-this[offset]+1)*-1};Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return val&32768?val|4294901760:val};Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24};Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3]};Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,true,23,4)};Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,false,23,4)};Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,true,52,8)};Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,false,52,8)};function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');if(offset+ext>buf.length)throw new RangeError("Index out of range")}Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var mul=1;var i=0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){this[offset+i]=value/mul&255;}return offset+byteLength};Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var i=byteLength-1;var mul=1;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){this[offset+i]=value/mul&255;}return offset+byteLength};Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,255,0);this[offset]=value&255;return offset+1};Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,65535,0);this[offset]=value&255;this[offset+1]=value>>>8;return offset+2};Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,65535,0);this[offset]=value>>>8;this[offset+1]=value&255;return offset+2};Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);this[offset+3]=value>>>24;this[offset+2]=value>>>16;this[offset+1]=value>>>8;this[offset]=value&255;return offset+4};Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,4294967295,0);this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255;return offset+4};Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=0;var mul=1;var sub=0;this[offset]=value&255;while(++i<byteLength&&(mul*=256)){if(value<0&&sub===0&&this[offset+i-1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&255;}return offset+byteLength};Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=byteLength-1;var mul=1;var sub=0;this[offset+i]=value&255;while(--i>=0&&(mul*=256)){if(value<0&&sub===0&&this[offset+i+1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&255;}return offset+byteLength};Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,127,-128);if(value<0)value=255+value+1;this[offset]=value&255;return offset+1};Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);this[offset]=value&255;this[offset+1]=value>>>8;return offset+2};Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,32767,-32768);this[offset]=value>>>8;this[offset+1]=value&255;return offset+2};Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);this[offset]=value&255;this[offset+1]=value>>>8;this[offset+2]=value>>>16;this[offset+3]=value>>>24;return offset+4};Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,2147483647,-2147483648);if(value<0)value=4294967295+value+1;this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&255;return offset+4};function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError("Index out of range");if(offset<0)throw new RangeError("Index out of range")}function writeFloat(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,4);}ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4}Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert)};Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert)};function writeDouble(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,8);}ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8}Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert)};Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert)};Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!Buffer.isBuffer(target))throw new TypeError("argument should be a Buffer");if(!start)start=0;if(!end&&end!==0)end=this.length;if(targetStart>=target.length)targetStart=target.length;if(!targetStart)targetStart=0;if(end>0&&end<start)end=start;if(end===start)return 0;if(target.length===0||this.length===0)return 0;if(targetStart<0){throw new RangeError("targetStart out of bounds")}if(start<0||start>=this.length)throw new RangeError("Index out of range");if(end<0)throw new RangeError("sourceEnd out of bounds");if(end>this.length)end=this.length;if(target.length-targetStart<end-start){end=target.length-targetStart+start;}var len=end-start;if(this===target&&typeof Uint8Array.prototype.copyWithin==="function"){this.copyWithin(targetStart,start,end);}else if(this===target&&start<targetStart&&targetStart<end){for(var i=len-1;i>=0;--i){target[i+targetStart]=this[i+start];}}else {Uint8Array.prototype.set.call(target,this.subarray(start,end),targetStart);}return len};Buffer.prototype.fill=function fill(val,start,end,encoding){if(typeof val==="string"){if(typeof start==="string"){encoding=start;start=0;end=this.length;}else if(typeof end==="string"){encoding=end;end=this.length;}if(encoding!==undefined&&typeof encoding!=="string"){throw new TypeError("encoding must be a string")}if(typeof encoding==="string"&&!Buffer.isEncoding(encoding)){throw new TypeError("Unknown encoding: "+encoding)}if(val.length===1){var code=val.charCodeAt(0);if(encoding==="utf8"&&code<128||encoding==="latin1"){val=code;}}}else if(typeof val==="number"){val=val&255;}if(start<0||this.length<start||this.length<end){throw new RangeError("Out of range index")}if(end<=start){return this}start=start>>>0;end=end===undefined?this.length:end>>>0;if(!val)val=0;var i;if(typeof val==="number"){for(i=start;i<end;++i){this[i]=val;}}else {var bytes=Buffer.isBuffer(val)?val:Buffer.from(val,encoding);var len=bytes.length;if(len===0){throw new TypeError('The value "'+val+'" is invalid for argument "value"')}for(i=0;i<end-start;++i){this[i+start]=bytes[i%len];}}return this};var INVALID_BASE64_RE=/[^+/0-9A-Za-z-_]/g;function base64clean(str){str=str.split("=")[0];str=str.trim().replace(INVALID_BASE64_RE,"");if(str.length<2)return "";while(str.length%4!==0){str=str+"=";}return str}function toHex(n){if(n<16)return "0"+n.toString(16);return n.toString(16)}function utf8ToBytes(string,units){units=units||Infinity;var codePoint;var length=string.length;var leadSurrogate=null;var bytes=[];for(var i=0;i<length;++i){codePoint=string.charCodeAt(i);if(codePoint>55295&&codePoint<57344){if(!leadSurrogate){if(codePoint>56319){if((units-=3)>-1)bytes.push(239,191,189);continue}else if(i+1===length){if((units-=3)>-1)bytes.push(239,191,189);continue}leadSurrogate=codePoint;continue}if(codePoint<56320){if((units-=3)>-1)bytes.push(239,191,189);leadSurrogate=codePoint;continue}codePoint=(leadSurrogate-55296<<10|codePoint-56320)+65536;}else if(leadSurrogate){if((units-=3)>-1)bytes.push(239,191,189);}leadSurrogate=null;if(codePoint<128){if((units-=1)<0)break;bytes.push(codePoint);}else if(codePoint<2048){if((units-=2)<0)break;bytes.push(codePoint>>6|192,codePoint&63|128);}else if(codePoint<65536){if((units-=3)<0)break;bytes.push(codePoint>>12|224,codePoint>>6&63|128,codePoint&63|128);}else if(codePoint<1114112){if((units-=4)<0)break;bytes.push(codePoint>>18|240,codePoint>>12&63|128,codePoint>>6&63|128,codePoint&63|128);}else {throw new Error("Invalid code point")}}return bytes}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;++i){byteArray.push(str.charCodeAt(i)&255);}return byteArray}function utf16leToBytes(str,units){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;++i){if((units-=2)<0)break;c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi);}return byteArray}function base64ToBytes(str){return base64.toByteArray(base64clean(str))}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;++i){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i];}return i}function isInstance(obj,type){return obj instanceof type||obj!=null&&obj.constructor!=null&&obj.constructor.name!=null&&obj.constructor.name===type.name}function numberIsNaN(obj){return obj!==obj}}).call(this);}).call(this,require("buffer").Buffer);},{"base64-js":11,buffer:13,ieee754:15}],14:[function(require,module,exports){var R=typeof Reflect==="object"?Reflect:null;var ReflectApply=R&&typeof R.apply==="function"?R.apply:function ReflectApply(target,receiver,args){return Function.prototype.apply.call(target,receiver,args)};var ReflectOwnKeys;if(R&&typeof R.ownKeys==="function"){ReflectOwnKeys=R.ownKeys;}else if(Object.getOwnPropertySymbols){ReflectOwnKeys=function ReflectOwnKeys(target){return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))};}else {ReflectOwnKeys=function ReflectOwnKeys(target){return Object.getOwnPropertyNames(target)};}function ProcessEmitWarning(warning){if(console&&console.warn)console.warn(warning);}var NumberIsNaN=Number.isNaN||function NumberIsNaN(value){return value!==value};function EventEmitter(){EventEmitter.init.call(this);}module.exports=EventEmitter;module.exports.once=once;EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._eventsCount=0;EventEmitter.prototype._maxListeners=undefined;var defaultMaxListeners=10;function checkListener(listener){if(typeof listener!=="function"){throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof listener)}}Object.defineProperty(EventEmitter,"defaultMaxListeners",{enumerable:true,get:function(){return defaultMaxListeners},set:function(arg){if(typeof arg!=="number"||arg<0||NumberIsNaN(arg)){throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+arg+".")}defaultMaxListeners=arg;}});EventEmitter.init=function(){if(this._events===undefined||this._events===Object.getPrototypeOf(this)._events){this._events=Object.create(null);this._eventsCount=0;}this._maxListeners=this._maxListeners||undefined;};EventEmitter.prototype.setMaxListeners=function setMaxListeners(n){if(typeof n!=="number"||n<0||NumberIsNaN(n)){throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+n+".")}this._maxListeners=n;return this};function _getMaxListeners(that){if(that._maxListeners===undefined)return EventEmitter.defaultMaxListeners;return that._maxListeners}EventEmitter.prototype.getMaxListeners=function getMaxListeners(){return _getMaxListeners(this)};EventEmitter.prototype.emit=function emit(type){var args=[];for(var i=1;i<arguments.length;i++)args.push(arguments[i]);var doError=type==="error";var events=this._events;if(events!==undefined)doError=doError&&events.error===undefined;else if(!doError)return false;if(doError){var er;if(args.length>0)er=args[0];if(er instanceof Error){throw er}var err=new Error("Unhandled error."+(er?" ("+er.message+")":""));err.context=er;throw err}var handler=events[type];if(handler===undefined)return false;if(typeof handler==="function"){ReflectApply(handler,this,args);}else {var len=handler.length;var listeners=arrayClone(handler,len);for(var i=0;i<len;++i)ReflectApply(listeners[i],this,args);}return true};function _addListener(target,type,listener,prepend){var m;var events;var existing;checkListener(listener);events=target._events;if(events===undefined){events=target._events=Object.create(null);target._eventsCount=0;}else {if(events.newListener!==undefined){target.emit("newListener",type,listener.listener?listener.listener:listener);events=target._events;}existing=events[type];}if(existing===undefined){existing=events[type]=listener;++target._eventsCount;}else {if(typeof existing==="function"){existing=events[type]=prepend?[listener,existing]:[existing,listener];}else if(prepend){existing.unshift(listener);}else {existing.push(listener);}m=_getMaxListeners(target);if(m>0&&existing.length>m&&!existing.warned){existing.warned=true;var w=new Error("Possible EventEmitter memory leak detected. "+existing.length+" "+String(type)+" listeners "+"added. Use emitter.setMaxListeners() to "+"increase limit");w.name="MaxListenersExceededWarning";w.emitter=target;w.type=type;w.count=existing.length;ProcessEmitWarning(w);}}return target}EventEmitter.prototype.addListener=function addListener(type,listener){return _addListener(this,type,listener,false)};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.prependListener=function prependListener(type,listener){return _addListener(this,type,listener,true)};function onceWrapper(){if(!this.fired){this.target.removeListener(this.type,this.wrapFn);this.fired=true;if(arguments.length===0)return this.listener.call(this.target);return this.listener.apply(this.target,arguments)}}function _onceWrap(target,type,listener){var state={fired:false,wrapFn:undefined,target:target,type:type,listener:listener};var wrapped=onceWrapper.bind(state);wrapped.listener=listener;state.wrapFn=wrapped;return wrapped}EventEmitter.prototype.once=function once(type,listener){checkListener(listener);this.on(type,_onceWrap(this,type,listener));return this};EventEmitter.prototype.prependOnceListener=function prependOnceListener(type,listener){checkListener(listener);this.prependListener(type,_onceWrap(this,type,listener));return this};EventEmitter.prototype.removeListener=function removeListener(type,listener){var list,events,position,i,originalListener;checkListener(listener);events=this._events;if(events===undefined)return this;list=events[type];if(list===undefined)return this;if(list===listener||list.listener===listener){if(--this._eventsCount===0)this._events=Object.create(null);else {delete events[type];if(events.removeListener)this.emit("removeListener",type,list.listener||listener);}}else if(typeof list!=="function"){position=-1;for(i=list.length-1;i>=0;i--){if(list[i]===listener||list[i].listener===listener){originalListener=list[i].listener;position=i;break}}if(position<0)return this;if(position===0)list.shift();else {spliceOne(list,position);}if(list.length===1)events[type]=list[0];if(events.removeListener!==undefined)this.emit("removeListener",type,originalListener||listener);}return this};EventEmitter.prototype.off=EventEmitter.prototype.removeListener;EventEmitter.prototype.removeAllListeners=function removeAllListeners(type){var listeners,events,i;events=this._events;if(events===undefined)return this;if(events.removeListener===undefined){if(arguments.length===0){this._events=Object.create(null);this._eventsCount=0;}else if(events[type]!==undefined){if(--this._eventsCount===0)this._events=Object.create(null);else delete events[type];}return this}if(arguments.length===0){var keys=Object.keys(events);var key;for(i=0;i<keys.length;++i){key=keys[i];if(key==="removeListener")continue;this.removeAllListeners(key);}this.removeAllListeners("removeListener");this._events=Object.create(null);this._eventsCount=0;return this}listeners=events[type];if(typeof listeners==="function"){this.removeListener(type,listeners);}else if(listeners!==undefined){for(i=listeners.length-1;i>=0;i--){this.removeListener(type,listeners[i]);}}return this};function _listeners(target,type,unwrap){var events=target._events;if(events===undefined)return [];var evlistener=events[type];if(evlistener===undefined)return [];if(typeof evlistener==="function")return unwrap?[evlistener.listener||evlistener]:[evlistener];return unwrap?unwrapListeners(evlistener):arrayClone(evlistener,evlistener.length)}EventEmitter.prototype.listeners=function listeners(type){return _listeners(this,type,true)};EventEmitter.prototype.rawListeners=function rawListeners(type){return _listeners(this,type,false)};EventEmitter.listenerCount=function(emitter,type){if(typeof emitter.listenerCount==="function"){return emitter.listenerCount(type)}else {return listenerCount.call(emitter,type)}};EventEmitter.prototype.listenerCount=listenerCount;function listenerCount(type){var events=this._events;if(events!==undefined){var evlistener=events[type];if(typeof evlistener==="function"){return 1}else if(evlistener!==undefined){return evlistener.length}}return 0}EventEmitter.prototype.eventNames=function eventNames(){return this._eventsCount>0?ReflectOwnKeys(this._events):[]};function arrayClone(arr,n){var copy=new Array(n);for(var i=0;i<n;++i)copy[i]=arr[i];return copy}function spliceOne(list,index){for(;index+1<list.length;index++)list[index]=list[index+1];list.pop();}function unwrapListeners(arr){var ret=new Array(arr.length);for(var i=0;i<ret.length;++i){ret[i]=arr[i].listener||arr[i];}return ret}function once(emitter,name){return new Promise(function(resolve,reject){function errorListener(err){emitter.removeListener(name,resolver);reject(err);}function resolver(){if(typeof emitter.removeListener==="function"){emitter.removeListener("error",errorListener);}resolve([].slice.call(arguments));}eventTargetAgnosticAddListener(emitter,name,resolver,{once:true});if(name!=="error"){addErrorHandlerIfEventEmitter(emitter,errorListener,{once:true});}})}function addErrorHandlerIfEventEmitter(emitter,handler,flags){if(typeof emitter.on==="function"){eventTargetAgnosticAddListener(emitter,"error",handler,flags);}}function eventTargetAgnosticAddListener(emitter,name,listener,flags){if(typeof emitter.on==="function"){if(flags.once){emitter.once(name,listener);}else {emitter.on(name,listener);}}else if(typeof emitter.addEventListener==="function"){emitter.addEventListener(name,function wrapListener(arg){if(flags.once){emitter.removeEventListener(name,wrapListener);}listener(arg);});}else {throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof emitter)}}},{}],15:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var nBits=-7;var i=isLE?nBytes-1:0;var d=isLE?-1:1;var s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}if(e===0){e=1-eBias;}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity}else {m=m+Math.pow(2,mLen);e=e-eBias;}return (s?-1:1)*m*Math.pow(2,e-mLen)};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;var i=isLE?0:nBytes-1;var d=isLE?1:-1;var s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax;}else {e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2;}if(e+eBias>=1){value+=rt/c;}else {value+=rt*Math.pow(2,1-eBias);}if(value*c>=2){e++;c/=2;}if(e+eBias>=eMax){m=0;e=eMax;}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias;}else {m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0;}}for(;mLen>=8;buffer[offset+i]=m&255,i+=d,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&255,i+=d,e/=256,eLen-=8){}buffer[offset+i-d]|=s*128;};},{}],16:[function(require,module,exports){if(typeof Object.create==="function"){module.exports=function inherits(ctor,superCtor){if(superCtor){ctor.super_=superCtor;ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:false,writable:true,configurable:true}});}};}else {module.exports=function inherits(ctor,superCtor){if(superCtor){ctor.super_=superCtor;var TempCtor=function(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor;ctor.prototype.constructor=ctor;}};}},{}],17:[function(require,module,exports){var process=module.exports={};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){cachedSetTimeout=setTimeout;}else {cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}try{if(typeof clearTimeout==="function"){cachedClearTimeout=clearTimeout;}else {cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){return setTimeout(fun,0)}if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0)}try{return cachedSetTimeout(fun,0)}catch(e){try{return cachedSetTimeout.call(null,fun,0)}catch(e){return cachedSetTimeout.call(this,fun,0)}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){return clearTimeout(marker)}if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker)}try{return cachedClearTimeout(marker)}catch(e){try{return cachedClearTimeout.call(null,marker)}catch(e){return cachedClearTimeout.call(this,marker)}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else {queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title="browser";process.browser=true;process.env={};process.argv=[];process.version="";process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return []};process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return "/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")};process.umask=function(){return 0};},{}],18:[function(require,module,exports){(function(global){(function(){let promise;module.exports=typeof queueMicrotask==="function"?queueMicrotask.bind(typeof window!=="undefined"?window:global):cb=>(promise||(promise=Promise.resolve())).then(cb).catch(err=>setTimeout(()=>{throw err},0));}).call(this);}).call(this,typeof commonjsGlobal!=="undefined"?commonjsGlobal:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],19:[function(require,module,exports){function _inheritsLoose(subClass,superClass){subClass.prototype=Object.create(superClass.prototype);subClass.prototype.constructor=subClass;subClass.__proto__=superClass;}var codes={};function createErrorType(code,message,Base){if(!Base){Base=Error;}function getMessage(arg1,arg2,arg3){if(typeof message==="string"){return message}else {return message(arg1,arg2,arg3)}}var NodeError=function(_Base){_inheritsLoose(NodeError,_Base);function NodeError(arg1,arg2,arg3){return _Base.call(this,getMessage(arg1,arg2,arg3))||this}return NodeError}(Base);NodeError.prototype.name=Base.name;NodeError.prototype.code=code;codes[code]=NodeError;}function oneOf(expected,thing){if(Array.isArray(expected)){var len=expected.length;expected=expected.map(function(i){return String(i)});if(len>2){return "one of ".concat(thing," ").concat(expected.slice(0,len-1).join(", "),", or ")+expected[len-1]}else if(len===2){return "one of ".concat(thing," ").concat(expected[0]," or ").concat(expected[1])}else {return "of ".concat(thing," ").concat(expected[0])}}else {return "of ".concat(thing," ").concat(String(expected))}}function startsWith(str,search,pos){return str.substr(!pos||pos<0?0:+pos,search.length)===search}function endsWith(str,search,this_len){if(this_len===undefined||this_len>str.length){this_len=str.length;}return str.substring(this_len-search.length,this_len)===search}function includes(str,search,start){if(typeof start!=="number"){start=0;}if(start+search.length>str.length){return false}else {return str.indexOf(search,start)!==-1}}createErrorType("ERR_INVALID_OPT_VALUE",function(name,value){return 'The value "'+value+'" is invalid for option "'+name+'"'},TypeError);createErrorType("ERR_INVALID_ARG_TYPE",function(name,expected,actual){var determiner;if(typeof expected==="string"&&startsWith(expected,"not ")){determiner="must not be";expected=expected.replace(/^not /,"");}else {determiner="must be";}var msg;if(endsWith(name," argument")){msg="The ".concat(name," ").concat(determiner," ").concat(oneOf(expected,"type"));}else {var type=includes(name,".")?"property":"argument";msg='The "'.concat(name,'" ').concat(type," ").concat(determiner," ").concat(oneOf(expected,"type"));}msg+=". Received type ".concat(typeof actual);return msg},TypeError);createErrorType("ERR_STREAM_PUSH_AFTER_EOF","stream.push() after EOF");createErrorType("ERR_METHOD_NOT_IMPLEMENTED",function(name){return "The "+name+" method is not implemented"});createErrorType("ERR_STREAM_PREMATURE_CLOSE","Premature close");createErrorType("ERR_STREAM_DESTROYED",function(name){return "Cannot call "+name+" after a stream was destroyed"});createErrorType("ERR_MULTIPLE_CALLBACK","Callback called multiple times");createErrorType("ERR_STREAM_CANNOT_PIPE","Cannot pipe, not readable");createErrorType("ERR_STREAM_WRITE_AFTER_END","write after end");createErrorType("ERR_STREAM_NULL_VALUES","May not write null values to stream",TypeError);createErrorType("ERR_UNKNOWN_ENCODING",function(arg){return "Unknown encoding: "+arg},TypeError);createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT","stream.unshift() after end event");module.exports.codes=codes;},{}],20:[function(require,module,exports){(function(process){(function(){var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj){keys.push(key);}return keys};module.exports=Duplex;var Readable=require("./_stream_readable");var Writable=require("./_stream_writable");require("inherits")(Duplex,Readable);{var keys=objectKeys(Writable.prototype);for(var v=0;v<keys.length;v++){var method=keys[v];if(!Duplex.prototype[method])Duplex.prototype[method]=Writable.prototype[method];}}function Duplex(options){if(!(this instanceof Duplex))return new Duplex(options);Readable.call(this,options);Writable.call(this,options);this.allowHalfOpen=true;if(options){if(options.readable===false)this.readable=false;if(options.writable===false)this.writable=false;if(options.allowHalfOpen===false){this.allowHalfOpen=false;this.once("end",onend);}}}Object.defineProperty(Duplex.prototype,"writableHighWaterMark",{enumerable:false,get:function get(){return this._writableState.highWaterMark}});Object.defineProperty(Duplex.prototype,"writableBuffer",{enumerable:false,get:function get(){return this._writableState&&this._writableState.getBuffer()}});Object.defineProperty(Duplex.prototype,"writableLength",{enumerable:false,get:function get(){return this._writableState.length}});function onend(){if(this._writableState.ended)return;process.nextTick(onEndNT,this);}function onEndNT(self){self.end();}Object.defineProperty(Duplex.prototype,"destroyed",{enumerable:false,get:function get(){if(this._readableState===undefined||this._writableState===undefined){return false}return this._readableState.destroyed&&this._writableState.destroyed},set:function set(value){if(this._readableState===undefined||this._writableState===undefined){return}this._readableState.destroyed=value;this._writableState.destroyed=value;}});}).call(this);}).call(this,require("_process"));},{"./_stream_readable":22,"./_stream_writable":24,_process:17,inherits:16}],21:[function(require,module,exports){module.exports=PassThrough;var Transform=require("./_stream_transform");require("inherits")(PassThrough,Transform);function PassThrough(options){if(!(this instanceof PassThrough))return new PassThrough(options);Transform.call(this,options);}PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk);};},{"./_stream_transform":23,inherits:16}],22:[function(require,module,exports){(function(process,global){(function(){module.exports=Readable;var Duplex;Readable.ReadableState=ReadableState;require("events").EventEmitter;var EElistenerCount=function EElistenerCount(emitter,type){return emitter.listeners(type).length};var Stream=require("./internal/streams/stream");var Buffer=require("buffer").Buffer;var OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk)}function _isUint8Array(obj){return Buffer.isBuffer(obj)||obj instanceof OurUint8Array}var debugUtil=require("util");var debug;if(debugUtil&&debugUtil.debuglog){debug=debugUtil.debuglog("stream");}else {debug=function debug(){};}var BufferList=require("./internal/streams/buffer_list");var destroyImpl=require("./internal/streams/destroy");var _require=require("./internal/streams/state"),getHighWaterMark=_require.getHighWaterMark;var _require$codes=require("../errors").codes,ERR_INVALID_ARG_TYPE=_require$codes.ERR_INVALID_ARG_TYPE,ERR_STREAM_PUSH_AFTER_EOF=_require$codes.ERR_STREAM_PUSH_AFTER_EOF,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_STREAM_UNSHIFT_AFTER_END_EVENT=_require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;var StringDecoder;var createReadableStreamAsyncIterator;var from;require("inherits")(Readable,Stream);var errorOrDestroy=destroyImpl.errorOrDestroy;var kProxyEvents=["error","close","destroy","pause","resume"];function prependListener(emitter,event,fn){if(typeof emitter.prependListener==="function")return emitter.prependListener(event,fn);if(!emitter._events||!emitter._events[event])emitter.on(event,fn);else if(Array.isArray(emitter._events[event]))emitter._events[event].unshift(fn);else emitter._events[event]=[fn,emitter._events[event]];}function ReadableState(options,stream,isDuplex){Duplex=Duplex||require("./_stream_duplex");options=options||{};if(typeof isDuplex!=="boolean")isDuplex=stream instanceof Duplex;this.objectMode=!!options.objectMode;if(isDuplex)this.objectMode=this.objectMode||!!options.readableObjectMode;this.highWaterMark=getHighWaterMark(this,options,"readableHighWaterMark",isDuplex);this.buffer=new BufferList;this.length=0;this.pipes=null;this.pipesCount=0;this.flowing=null;this.ended=false;this.endEmitted=false;this.reading=false;this.sync=true;this.needReadable=false;this.emittedReadable=false;this.readableListening=false;this.resumeScheduled=false;this.paused=true;this.emitClose=options.emitClose!==false;this.autoDestroy=!!options.autoDestroy;this.destroyed=false;this.defaultEncoding=options.defaultEncoding||"utf8";this.awaitDrain=0;this.readingMore=false;this.decoder=null;this.encoding=null;if(options.encoding){if(!StringDecoder)StringDecoder=require("string_decoder/").StringDecoder;this.decoder=new StringDecoder(options.encoding);this.encoding=options.encoding;}}function Readable(options){Duplex=Duplex||require("./_stream_duplex");if(!(this instanceof Readable))return new Readable(options);var isDuplex=this instanceof Duplex;this._readableState=new ReadableState(options,this,isDuplex);this.readable=true;if(options){if(typeof options.read==="function")this._read=options.read;if(typeof options.destroy==="function")this._destroy=options.destroy;}Stream.call(this);}Object.defineProperty(Readable.prototype,"destroyed",{enumerable:false,get:function get(){if(this._readableState===undefined){return false}return this._readableState.destroyed},set:function set(value){if(!this._readableState){return}this._readableState.destroyed=value;}});Readable.prototype.destroy=destroyImpl.destroy;Readable.prototype._undestroy=destroyImpl.undestroy;Readable.prototype._destroy=function(err,cb){cb(err);};Readable.prototype.push=function(chunk,encoding){var state=this._readableState;var skipChunkCheck;if(!state.objectMode){if(typeof chunk==="string"){encoding=encoding||state.defaultEncoding;if(encoding!==state.encoding){chunk=Buffer.from(chunk,encoding);encoding="";}skipChunkCheck=true;}}else {skipChunkCheck=true;}return readableAddChunk(this,chunk,encoding,false,skipChunkCheck)};Readable.prototype.unshift=function(chunk){return readableAddChunk(this,chunk,null,true,false)};function readableAddChunk(stream,chunk,encoding,addToFront,skipChunkCheck){debug("readableAddChunk",chunk);var state=stream._readableState;if(chunk===null){state.reading=false;onEofChunk(stream,state);}else {var er;if(!skipChunkCheck)er=chunkInvalid(state,chunk);if(er){errorOrDestroy(stream,er);}else if(state.objectMode||chunk&&chunk.length>0){if(typeof chunk!=="string"&&!state.objectMode&&Object.getPrototypeOf(chunk)!==Buffer.prototype){chunk=_uint8ArrayToBuffer(chunk);}if(addToFront){if(state.endEmitted)errorOrDestroy(stream,new ERR_STREAM_UNSHIFT_AFTER_END_EVENT);else addChunk(stream,state,chunk,true);}else if(state.ended){errorOrDestroy(stream,new ERR_STREAM_PUSH_AFTER_EOF);}else if(state.destroyed){return false}else {state.reading=false;if(state.decoder&&!encoding){chunk=state.decoder.write(chunk);if(state.objectMode||chunk.length!==0)addChunk(stream,state,chunk,false);else maybeReadMore(stream,state);}else {addChunk(stream,state,chunk,false);}}}else if(!addToFront){state.reading=false;maybeReadMore(stream,state);}}return !state.ended&&(state.length<state.highWaterMark||state.length===0)}function addChunk(stream,state,chunk,addToFront){if(state.flowing&&state.length===0&&!state.sync){state.awaitDrain=0;stream.emit("data",chunk);}else {state.length+=state.objectMode?1:chunk.length;if(addToFront)state.buffer.unshift(chunk);else state.buffer.push(chunk);if(state.needReadable)emitReadable(stream);}maybeReadMore(stream,state);}function chunkInvalid(state,chunk){var er;if(!_isUint8Array(chunk)&&typeof chunk!=="string"&&chunk!==undefined&&!state.objectMode){er=new ERR_INVALID_ARG_TYPE("chunk",["string","Buffer","Uint8Array"],chunk);}return er}Readable.prototype.isPaused=function(){return this._readableState.flowing===false};Readable.prototype.setEncoding=function(enc){if(!StringDecoder)StringDecoder=require("string_decoder/").StringDecoder;var decoder=new StringDecoder(enc);this._readableState.decoder=decoder;this._readableState.encoding=this._readableState.decoder.encoding;var p=this._readableState.buffer.head;var content="";while(p!==null){content+=decoder.write(p.data);p=p.next;}this._readableState.buffer.clear();if(content!=="")this._readableState.buffer.push(content);this._readableState.length=content.length;return this};var MAX_HWM=1073741824;function computeNewHighWaterMark(n){if(n>=MAX_HWM){n=MAX_HWM;}else {n--;n|=n>>>1;n|=n>>>2;n|=n>>>4;n|=n>>>8;n|=n>>>16;n++;}return n}function howMuchToRead(n,state){if(n<=0||state.length===0&&state.ended)return 0;if(state.objectMode)return 1;if(n!==n){if(state.flowing&&state.length)return state.buffer.head.data.length;else return state.length}if(n>state.highWaterMark)state.highWaterMark=computeNewHighWaterMark(n);if(n<=state.length)return n;if(!state.ended){state.needReadable=true;return 0}return state.length}Readable.prototype.read=function(n){debug("read",n);n=parseInt(n,10);var state=this._readableState;var nOrig=n;if(n!==0)state.emittedReadable=false;if(n===0&&state.needReadable&&((state.highWaterMark!==0?state.length>=state.highWaterMark:state.length>0)||state.ended)){debug("read: emitReadable",state.length,state.ended);if(state.length===0&&state.ended)endReadable(this);else emitReadable(this);return null}n=howMuchToRead(n,state);if(n===0&&state.ended){if(state.length===0)endReadable(this);return null}var doRead=state.needReadable;debug("need readable",doRead);if(state.length===0||state.length-n<state.highWaterMark){doRead=true;debug("length less than watermark",doRead);}if(state.ended||state.reading){doRead=false;debug("reading or ended",doRead);}else if(doRead){debug("do read");state.reading=true;state.sync=true;if(state.length===0)state.needReadable=true;this._read(state.highWaterMark);state.sync=false;if(!state.reading)n=howMuchToRead(nOrig,state);}var ret;if(n>0)ret=fromList(n,state);else ret=null;if(ret===null){state.needReadable=state.length<=state.highWaterMark;n=0;}else {state.length-=n;state.awaitDrain=0;}if(state.length===0){if(!state.ended)state.needReadable=true;if(nOrig!==n&&state.ended)endReadable(this);}if(ret!==null)this.emit("data",ret);return ret};function onEofChunk(stream,state){debug("onEofChunk");if(state.ended)return;if(state.decoder){var chunk=state.decoder.end();if(chunk&&chunk.length){state.buffer.push(chunk);state.length+=state.objectMode?1:chunk.length;}}state.ended=true;if(state.sync){emitReadable(stream);}else {state.needReadable=false;if(!state.emittedReadable){state.emittedReadable=true;emitReadable_(stream);}}}function emitReadable(stream){var state=stream._readableState;debug("emitReadable",state.needReadable,state.emittedReadable);state.needReadable=false;if(!state.emittedReadable){debug("emitReadable",state.flowing);state.emittedReadable=true;process.nextTick(emitReadable_,stream);}}function emitReadable_(stream){var state=stream._readableState;debug("emitReadable_",state.destroyed,state.length,state.ended);if(!state.destroyed&&(state.length||state.ended)){stream.emit("readable");state.emittedReadable=false;}state.needReadable=!state.flowing&&!state.ended&&state.length<=state.highWaterMark;flow(stream);}function maybeReadMore(stream,state){if(!state.readingMore){state.readingMore=true;process.nextTick(maybeReadMore_,stream,state);}}function maybeReadMore_(stream,state){while(!state.reading&&!state.ended&&(state.length<state.highWaterMark||state.flowing&&state.length===0)){var len=state.length;debug("maybeReadMore read 0");stream.read(0);if(len===state.length)break}state.readingMore=false;}Readable.prototype._read=function(n){errorOrDestroy(this,new ERR_METHOD_NOT_IMPLEMENTED("_read()"));};Readable.prototype.pipe=function(dest,pipeOpts){var src=this;var state=this._readableState;switch(state.pipesCount){case 0:state.pipes=dest;break;case 1:state.pipes=[state.pipes,dest];break;default:state.pipes.push(dest);break}state.pipesCount+=1;debug("pipe count=%d opts=%j",state.pipesCount,pipeOpts);var doEnd=(!pipeOpts||pipeOpts.end!==false)&&dest!==process.stdout&&dest!==process.stderr;var endFn=doEnd?onend:unpipe;if(state.endEmitted)process.nextTick(endFn);else src.once("end",endFn);dest.on("unpipe",onunpipe);function onunpipe(readable,unpipeInfo){debug("onunpipe");if(readable===src){if(unpipeInfo&&unpipeInfo.hasUnpiped===false){unpipeInfo.hasUnpiped=true;cleanup();}}}function onend(){debug("onend");dest.end();}var ondrain=pipeOnDrain(src);dest.on("drain",ondrain);var cleanedUp=false;function cleanup(){debug("cleanup");dest.removeListener("close",onclose);dest.removeListener("finish",onfinish);dest.removeListener("drain",ondrain);dest.removeListener("error",onerror);dest.removeListener("unpipe",onunpipe);src.removeListener("end",onend);src.removeListener("end",unpipe);src.removeListener("data",ondata);cleanedUp=true;if(state.awaitDrain&&(!dest._writableState||dest._writableState.needDrain))ondrain();}src.on("data",ondata);function ondata(chunk){debug("ondata");var ret=dest.write(chunk);debug("dest.write",ret);if(ret===false){if((state.pipesCount===1&&state.pipes===dest||state.pipesCount>1&&indexOf(state.pipes,dest)!==-1)&&!cleanedUp){debug("false write response, pause",state.awaitDrain);state.awaitDrain++;}src.pause();}}function onerror(er){debug("onerror",er);unpipe();dest.removeListener("error",onerror);if(EElistenerCount(dest,"error")===0)errorOrDestroy(dest,er);}prependListener(dest,"error",onerror);function onclose(){dest.removeListener("finish",onfinish);unpipe();}dest.once("close",onclose);function onfinish(){debug("onfinish");dest.removeListener("close",onclose);unpipe();}dest.once("finish",onfinish);function unpipe(){debug("unpipe");src.unpipe(dest);}dest.emit("pipe",src);if(!state.flowing){debug("pipe resume");src.resume();}return dest};function pipeOnDrain(src){return function pipeOnDrainFunctionResult(){var state=src._readableState;debug("pipeOnDrain",state.awaitDrain);if(state.awaitDrain)state.awaitDrain--;if(state.awaitDrain===0&&EElistenerCount(src,"data")){state.flowing=true;flow(src);}}}Readable.prototype.unpipe=function(dest){var state=this._readableState;var unpipeInfo={hasUnpiped:false};if(state.pipesCount===0)return this;if(state.pipesCount===1){if(dest&&dest!==state.pipes)return this;if(!dest)dest=state.pipes;state.pipes=null;state.pipesCount=0;state.flowing=false;if(dest)dest.emit("unpipe",this,unpipeInfo);return this}if(!dest){var dests=state.pipes;var len=state.pipesCount;state.pipes=null;state.pipesCount=0;state.flowing=false;for(var i=0;i<len;i++){dests[i].emit("unpipe",this,{hasUnpiped:false});}return this}var index=indexOf(state.pipes,dest);if(index===-1)return this;state.pipes.splice(index,1);state.pipesCount-=1;if(state.pipesCount===1)state.pipes=state.pipes[0];dest.emit("unpipe",this,unpipeInfo);return this};Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn);var state=this._readableState;if(ev==="data"){state.readableListening=this.listenerCount("readable")>0;if(state.flowing!==false)this.resume();}else if(ev==="readable"){if(!state.endEmitted&&!state.readableListening){state.readableListening=state.needReadable=true;state.flowing=false;state.emittedReadable=false;debug("on readable",state.length,state.reading);if(state.length){emitReadable(this);}else if(!state.reading){process.nextTick(nReadingNextTick,this);}}}return res};Readable.prototype.addListener=Readable.prototype.on;Readable.prototype.removeListener=function(ev,fn){var res=Stream.prototype.removeListener.call(this,ev,fn);if(ev==="readable"){process.nextTick(updateReadableListening,this);}return res};Readable.prototype.removeAllListeners=function(ev){var res=Stream.prototype.removeAllListeners.apply(this,arguments);if(ev==="readable"||ev===undefined){process.nextTick(updateReadableListening,this);}return res};function updateReadableListening(self){var state=self._readableState;state.readableListening=self.listenerCount("readable")>0;if(state.resumeScheduled&&!state.paused){state.flowing=true;}else if(self.listenerCount("data")>0){self.resume();}}function nReadingNextTick(self){debug("readable nexttick read 0");self.read(0);}Readable.prototype.resume=function(){var state=this._readableState;if(!state.flowing){debug("resume");state.flowing=!state.readableListening;resume(this,state);}state.paused=false;return this};function resume(stream,state){if(!state.resumeScheduled){state.resumeScheduled=true;process.nextTick(resume_,stream,state);}}function resume_(stream,state){debug("resume",state.reading);if(!state.reading){stream.read(0);}state.resumeScheduled=false;stream.emit("resume");flow(stream);if(state.flowing&&!state.reading)stream.read(0);}Readable.prototype.pause=function(){debug("call pause flowing=%j",this._readableState.flowing);if(this._readableState.flowing!==false){debug("pause");this._readableState.flowing=false;this.emit("pause");}this._readableState.paused=true;return this};function flow(stream){var state=stream._readableState;debug("flow",state.flowing);while(state.flowing&&stream.read()!==null){}}Readable.prototype.wrap=function(stream){var _this=this;var state=this._readableState;var paused=false;stream.on("end",function(){debug("wrapped end");if(state.decoder&&!state.ended){var chunk=state.decoder.end();if(chunk&&chunk.length)_this.push(chunk);}_this.push(null);});stream.on("data",function(chunk){debug("wrapped data");if(state.decoder)chunk=state.decoder.write(chunk);if(state.objectMode&&(chunk===null||chunk===undefined))return;else if(!state.objectMode&&(!chunk||!chunk.length))return;var ret=_this.push(chunk);if(!ret){paused=true;stream.pause();}});for(var i in stream){if(this[i]===undefined&&typeof stream[i]==="function"){this[i]=function methodWrap(method){return function methodWrapReturnFunction(){return stream[method].apply(stream,arguments)}}(i);}}for(var n=0;n<kProxyEvents.length;n++){stream.on(kProxyEvents[n],this.emit.bind(this,kProxyEvents[n]));}this._read=function(n){debug("wrapped _read",n);if(paused){paused=false;stream.resume();}};return this};if(typeof Symbol==="function"){Readable.prototype[Symbol.asyncIterator]=function(){if(createReadableStreamAsyncIterator===undefined){createReadableStreamAsyncIterator=require("./internal/streams/async_iterator");}return createReadableStreamAsyncIterator(this)};}Object.defineProperty(Readable.prototype,"readableHighWaterMark",{enumerable:false,get:function get(){return this._readableState.highWaterMark}});Object.defineProperty(Readable.prototype,"readableBuffer",{enumerable:false,get:function get(){return this._readableState&&this._readableState.buffer}});Object.defineProperty(Readable.prototype,"readableFlowing",{enumerable:false,get:function get(){return this._readableState.flowing},set:function set(state){if(this._readableState){this._readableState.flowing=state;}}});Readable._fromList=fromList;Object.defineProperty(Readable.prototype,"readableLength",{enumerable:false,get:function get(){return this._readableState.length}});function fromList(n,state){if(state.length===0)return null;var ret;if(state.objectMode)ret=state.buffer.shift();else if(!n||n>=state.length){if(state.decoder)ret=state.buffer.join("");else if(state.buffer.length===1)ret=state.buffer.first();else ret=state.buffer.concat(state.length);state.buffer.clear();}else {ret=state.buffer.consume(n,state.decoder);}return ret}function endReadable(stream){var state=stream._readableState;debug("endReadable",state.endEmitted);if(!state.endEmitted){state.ended=true;process.nextTick(endReadableNT,state,stream);}}function endReadableNT(state,stream){debug("endReadableNT",state.endEmitted,state.length);if(!state.endEmitted&&state.length===0){state.endEmitted=true;stream.readable=false;stream.emit("end");if(state.autoDestroy){var wState=stream._writableState;if(!wState||wState.autoDestroy&&wState.finished){stream.destroy();}}}}if(typeof Symbol==="function"){Readable.from=function(iterable,opts){if(from===undefined){from=require("./internal/streams/from");}return from(Readable,iterable,opts)};}function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++){if(xs[i]===x)return i}return -1}}).call(this);}).call(this,require("_process"),typeof commonjsGlobal!=="undefined"?commonjsGlobal:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"../errors":19,"./_stream_duplex":20,"./internal/streams/async_iterator":25,"./internal/streams/buffer_list":26,"./internal/streams/destroy":27,"./internal/streams/from":29,"./internal/streams/state":31,"./internal/streams/stream":32,_process:17,buffer:13,events:14,inherits:16,"string_decoder/":35,util:12}],23:[function(require,module,exports){module.exports=Transform;var _require$codes=require("../errors").codes,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_MULTIPLE_CALLBACK=_require$codes.ERR_MULTIPLE_CALLBACK,ERR_TRANSFORM_ALREADY_TRANSFORMING=_require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,ERR_TRANSFORM_WITH_LENGTH_0=_require$codes.ERR_TRANSFORM_WITH_LENGTH_0;var Duplex=require("./_stream_duplex");require("inherits")(Transform,Duplex);function afterTransform(er,data){var ts=this._transformState;ts.transforming=false;var cb=ts.writecb;if(cb===null){return this.emit("error",new ERR_MULTIPLE_CALLBACK)}ts.writechunk=null;ts.writecb=null;if(data!=null)this.push(data);cb(er);var rs=this._readableState;rs.reading=false;if(rs.needReadable||rs.length<rs.highWaterMark){this._read(rs.highWaterMark);}}function Transform(options){if(!(this instanceof Transform))return new Transform(options);Duplex.call(this,options);this._transformState={afterTransform:afterTransform.bind(this),needTransform:false,transforming:false,writecb:null,writechunk:null,writeencoding:null};this._readableState.needReadable=true;this._readableState.sync=false;if(options){if(typeof options.transform==="function")this._transform=options.transform;if(typeof options.flush==="function")this._flush=options.flush;}this.on("prefinish",prefinish);}function prefinish(){var _this=this;if(typeof this._flush==="function"&&!this._readableState.destroyed){this._flush(function(er,data){done(_this,er,data);});}else {done(this,null,null);}}Transform.prototype.push=function(chunk,encoding){this._transformState.needTransform=false;return Duplex.prototype.push.call(this,chunk,encoding)};Transform.prototype._transform=function(chunk,encoding,cb){cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));};Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState;ts.writecb=cb;ts.writechunk=chunk;ts.writeencoding=encoding;if(!ts.transforming){var rs=this._readableState;if(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)this._read(rs.highWaterMark);}};Transform.prototype._read=function(n){var ts=this._transformState;if(ts.writechunk!==null&&!ts.transforming){ts.transforming=true;this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform);}else {ts.needTransform=true;}};Transform.prototype._destroy=function(err,cb){Duplex.prototype._destroy.call(this,err,function(err2){cb(err2);});};function done(stream,er,data){if(er)return stream.emit("error",er);if(data!=null)stream.push(data);if(stream._writableState.length)throw new ERR_TRANSFORM_WITH_LENGTH_0;if(stream._transformState.transforming)throw new ERR_TRANSFORM_ALREADY_TRANSFORMING;return stream.push(null)}},{"../errors":19,"./_stream_duplex":20,inherits:16}],24:[function(require,module,exports){(function(process,global){(function(){module.exports=Writable;function CorkedRequest(state){var _this=this;this.next=null;this.entry=null;this.finish=function(){onCorkedFinish(_this,state);};}var Duplex;Writable.WritableState=WritableState;var internalUtil={deprecate:require("util-deprecate")};var Stream=require("./internal/streams/stream");var Buffer=require("buffer").Buffer;var OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk)}function _isUint8Array(obj){return Buffer.isBuffer(obj)||obj instanceof OurUint8Array}var destroyImpl=require("./internal/streams/destroy");var _require=require("./internal/streams/state"),getHighWaterMark=_require.getHighWaterMark;var _require$codes=require("../errors").codes,ERR_INVALID_ARG_TYPE=_require$codes.ERR_INVALID_ARG_TYPE,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_MULTIPLE_CALLBACK=_require$codes.ERR_MULTIPLE_CALLBACK,ERR_STREAM_CANNOT_PIPE=_require$codes.ERR_STREAM_CANNOT_PIPE,ERR_STREAM_DESTROYED=_require$codes.ERR_STREAM_DESTROYED,ERR_STREAM_NULL_VALUES=_require$codes.ERR_STREAM_NULL_VALUES,ERR_STREAM_WRITE_AFTER_END=_require$codes.ERR_STREAM_WRITE_AFTER_END,ERR_UNKNOWN_ENCODING=_require$codes.ERR_UNKNOWN_ENCODING;var errorOrDestroy=destroyImpl.errorOrDestroy;require("inherits")(Writable,Stream);function nop(){}function WritableState(options,stream,isDuplex){Duplex=Duplex||require("./_stream_duplex");options=options||{};if(typeof isDuplex!=="boolean")isDuplex=stream instanceof Duplex;this.objectMode=!!options.objectMode;if(isDuplex)this.objectMode=this.objectMode||!!options.writableObjectMode;this.highWaterMark=getHighWaterMark(this,options,"writableHighWaterMark",isDuplex);this.finalCalled=false;this.needDrain=false;this.ending=false;this.ended=false;this.finished=false;this.destroyed=false;var noDecode=options.decodeStrings===false;this.decodeStrings=!noDecode;this.defaultEncoding=options.defaultEncoding||"utf8";this.length=0;this.writing=false;this.corked=0;this.sync=true;this.bufferProcessing=false;this.onwrite=function(er){onwrite(stream,er);};this.writecb=null;this.writelen=0;this.bufferedRequest=null;this.lastBufferedRequest=null;this.pendingcb=0;this.prefinished=false;this.errorEmitted=false;this.emitClose=options.emitClose!==false;this.autoDestroy=!!options.autoDestroy;this.bufferedRequestCount=0;this.corkedRequestsFree=new CorkedRequest(this);}WritableState.prototype.getBuffer=function getBuffer(){var current=this.bufferedRequest;var out=[];while(current){out.push(current);current=current.next;}return out};(function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:internalUtil.deprecate(function writableStateBufferGetter(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer "+"instead.","DEP0003")});}catch(_){}})();var realHasInstance;if(typeof Symbol==="function"&&Symbol.hasInstance&&typeof Function.prototype[Symbol.hasInstance]==="function"){realHasInstance=Function.prototype[Symbol.hasInstance];Object.defineProperty(Writable,Symbol.hasInstance,{value:function value(object){if(realHasInstance.call(this,object))return true;if(this!==Writable)return false;return object&&object._writableState instanceof WritableState}});}else {realHasInstance=function realHasInstance(object){return object instanceof this};}function Writable(options){Duplex=Duplex||require("./_stream_duplex");var isDuplex=this instanceof Duplex;if(!isDuplex&&!realHasInstance.call(Writable,this))return new Writable(options);this._writableState=new WritableState(options,this,isDuplex);this.writable=true;if(options){if(typeof options.write==="function")this._write=options.write;if(typeof options.writev==="function")this._writev=options.writev;if(typeof options.destroy==="function")this._destroy=options.destroy;if(typeof options.final==="function")this._final=options.final;}Stream.call(this);}Writable.prototype.pipe=function(){errorOrDestroy(this,new ERR_STREAM_CANNOT_PIPE);};function writeAfterEnd(stream,cb){var er=new ERR_STREAM_WRITE_AFTER_END;errorOrDestroy(stream,er);process.nextTick(cb,er);}function validChunk(stream,state,chunk,cb){var er;if(chunk===null){er=new ERR_STREAM_NULL_VALUES;}else if(typeof chunk!=="string"&&!state.objectMode){er=new ERR_INVALID_ARG_TYPE("chunk",["string","Buffer"],chunk);}if(er){errorOrDestroy(stream,er);process.nextTick(cb,er);return false}return true}Writable.prototype.write=function(chunk,encoding,cb){var state=this._writableState;var ret=false;var isBuf=!state.objectMode&&_isUint8Array(chunk);if(isBuf&&!Buffer.isBuffer(chunk)){chunk=_uint8ArrayToBuffer(chunk);}if(typeof encoding==="function"){cb=encoding;encoding=null;}if(isBuf)encoding="buffer";else if(!encoding)encoding=state.defaultEncoding;if(typeof cb!=="function")cb=nop;if(state.ending)writeAfterEnd(this,cb);else if(isBuf||validChunk(this,state,chunk,cb)){state.pendingcb++;ret=writeOrBuffer(this,state,isBuf,chunk,encoding,cb);}return ret};Writable.prototype.cork=function(){this._writableState.corked++;};Writable.prototype.uncork=function(){var state=this._writableState;if(state.corked){state.corked--;if(!state.writing&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest)clearBuffer(this,state);}};Writable.prototype.setDefaultEncoding=function setDefaultEncoding(encoding){if(typeof encoding==="string")encoding=encoding.toLowerCase();if(!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((encoding+"").toLowerCase())>-1))throw new ERR_UNKNOWN_ENCODING(encoding);this._writableState.defaultEncoding=encoding;return this};Object.defineProperty(Writable.prototype,"writableBuffer",{enumerable:false,get:function get(){return this._writableState&&this._writableState.getBuffer()}});function decodeChunk(state,chunk,encoding){if(!state.objectMode&&state.decodeStrings!==false&&typeof chunk==="string"){chunk=Buffer.from(chunk,encoding);}return chunk}Object.defineProperty(Writable.prototype,"writableHighWaterMark",{enumerable:false,get:function get(){return this._writableState.highWaterMark}});function writeOrBuffer(stream,state,isBuf,chunk,encoding,cb){if(!isBuf){var newChunk=decodeChunk(state,chunk,encoding);if(chunk!==newChunk){isBuf=true;encoding="buffer";chunk=newChunk;}}var len=state.objectMode?1:chunk.length;state.length+=len;var ret=state.length<state.highWaterMark;if(!ret)state.needDrain=true;if(state.writing||state.corked){var last=state.lastBufferedRequest;state.lastBufferedRequest={chunk:chunk,encoding:encoding,isBuf:isBuf,callback:cb,next:null};if(last){last.next=state.lastBufferedRequest;}else {state.bufferedRequest=state.lastBufferedRequest;}state.bufferedRequestCount+=1;}else {doWrite(stream,state,false,len,chunk,encoding,cb);}return ret}function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len;state.writecb=cb;state.writing=true;state.sync=true;if(state.destroyed)state.onwrite(new ERR_STREAM_DESTROYED("write"));else if(writev)stream._writev(chunk,state.onwrite);else stream._write(chunk,encoding,state.onwrite);state.sync=false;}function onwriteError(stream,state,sync,er,cb){--state.pendingcb;if(sync){process.nextTick(cb,er);process.nextTick(finishMaybe,stream,state);stream._writableState.errorEmitted=true;errorOrDestroy(stream,er);}else {cb(er);stream._writableState.errorEmitted=true;errorOrDestroy(stream,er);finishMaybe(stream,state);}}function onwriteStateUpdate(state){state.writing=false;state.writecb=null;state.length-=state.writelen;state.writelen=0;}function onwrite(stream,er){var state=stream._writableState;var sync=state.sync;var cb=state.writecb;if(typeof cb!=="function")throw new ERR_MULTIPLE_CALLBACK;onwriteStateUpdate(state);if(er)onwriteError(stream,state,sync,er,cb);else {var finished=needFinish(state)||stream.destroyed;if(!finished&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest){clearBuffer(stream,state);}if(sync){process.nextTick(afterWrite,stream,state,finished,cb);}else {afterWrite(stream,state,finished,cb);}}}function afterWrite(stream,state,finished,cb){if(!finished)onwriteDrain(stream,state);state.pendingcb--;cb();finishMaybe(stream,state);}function onwriteDrain(stream,state){if(state.length===0&&state.needDrain){state.needDrain=false;stream.emit("drain");}}function clearBuffer(stream,state){state.bufferProcessing=true;var entry=state.bufferedRequest;if(stream._writev&&entry&&entry.next){var l=state.bufferedRequestCount;var buffer=new Array(l);var holder=state.corkedRequestsFree;holder.entry=entry;var count=0;var allBuffers=true;while(entry){buffer[count]=entry;if(!entry.isBuf)allBuffers=false;entry=entry.next;count+=1;}buffer.allBuffers=allBuffers;doWrite(stream,state,true,state.length,buffer,"",holder.finish);state.pendingcb++;state.lastBufferedRequest=null;if(holder.next){state.corkedRequestsFree=holder.next;holder.next=null;}else {state.corkedRequestsFree=new CorkedRequest(state);}state.bufferedRequestCount=0;}else {while(entry){var chunk=entry.chunk;var encoding=entry.encoding;var cb=entry.callback;var len=state.objectMode?1:chunk.length;doWrite(stream,state,false,len,chunk,encoding,cb);entry=entry.next;state.bufferedRequestCount--;if(state.writing){break}}if(entry===null)state.lastBufferedRequest=null;}state.bufferedRequest=entry;state.bufferProcessing=false;}Writable.prototype._write=function(chunk,encoding,cb){cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));};Writable.prototype._writev=null;Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState;if(typeof chunk==="function"){cb=chunk;chunk=null;encoding=null;}else if(typeof encoding==="function"){cb=encoding;encoding=null;}if(chunk!==null&&chunk!==undefined)this.write(chunk,encoding);if(state.corked){state.corked=1;this.uncork();}if(!state.ending)endWritable(this,state,cb);return this};Object.defineProperty(Writable.prototype,"writableLength",{enumerable:false,get:function get(){return this._writableState.length}});function needFinish(state){return state.ending&&state.length===0&&state.bufferedRequest===null&&!state.finished&&!state.writing}function callFinal(stream,state){stream._final(function(err){state.pendingcb--;if(err){errorOrDestroy(stream,err);}state.prefinished=true;stream.emit("prefinish");finishMaybe(stream,state);});}function prefinish(stream,state){if(!state.prefinished&&!state.finalCalled){if(typeof stream._final==="function"&&!state.destroyed){state.pendingcb++;state.finalCalled=true;process.nextTick(callFinal,stream,state);}else {state.prefinished=true;stream.emit("prefinish");}}}function finishMaybe(stream,state){var need=needFinish(state);if(need){prefinish(stream,state);if(state.pendingcb===0){state.finished=true;stream.emit("finish");if(state.autoDestroy){var rState=stream._readableState;if(!rState||rState.autoDestroy&&rState.endEmitted){stream.destroy();}}}}return need}function endWritable(stream,state,cb){state.ending=true;finishMaybe(stream,state);if(cb){if(state.finished)process.nextTick(cb);else stream.once("finish",cb);}state.ended=true;stream.writable=false;}function onCorkedFinish(corkReq,state,err){var entry=corkReq.entry;corkReq.entry=null;while(entry){var cb=entry.callback;state.pendingcb--;cb(err);entry=entry.next;}state.corkedRequestsFree.next=corkReq;}Object.defineProperty(Writable.prototype,"destroyed",{enumerable:false,get:function get(){if(this._writableState===undefined){return false}return this._writableState.destroyed},set:function set(value){if(!this._writableState){return}this._writableState.destroyed=value;}});Writable.prototype.destroy=destroyImpl.destroy;Writable.prototype._undestroy=destroyImpl.undestroy;Writable.prototype._destroy=function(err,cb){cb(err);};}).call(this);}).call(this,require("_process"),typeof commonjsGlobal!=="undefined"?commonjsGlobal:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"../errors":19,"./_stream_duplex":20,"./internal/streams/destroy":27,"./internal/streams/state":31,"./internal/streams/stream":32,_process:17,buffer:13,inherits:16,"util-deprecate":36}],25:[function(require,module,exports){(function(process){(function(){var _Object$setPrototypeO;function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}var finished=require("./end-of-stream");var kLastResolve=Symbol("lastResolve");var kLastReject=Symbol("lastReject");var kError=Symbol("error");var kEnded=Symbol("ended");var kLastPromise=Symbol("lastPromise");var kHandlePromise=Symbol("handlePromise");var kStream=Symbol("stream");function createIterResult(value,done){return {value:value,done:done}}function readAndResolve(iter){var resolve=iter[kLastResolve];if(resolve!==null){var data=iter[kStream].read();if(data!==null){iter[kLastPromise]=null;iter[kLastResolve]=null;iter[kLastReject]=null;resolve(createIterResult(data,false));}}}function onReadable(iter){process.nextTick(readAndResolve,iter);}function wrapForNext(lastPromise,iter){return function(resolve,reject){lastPromise.then(function(){if(iter[kEnded]){resolve(createIterResult(undefined,true));return}iter[kHandlePromise](resolve,reject);},reject);}}var AsyncIteratorPrototype=Object.getPrototypeOf(function(){});var ReadableStreamAsyncIteratorPrototype=Object.setPrototypeOf((_Object$setPrototypeO={get stream(){return this[kStream]},next:function next(){var _this=this;var error=this[kError];if(error!==null){return Promise.reject(error)}if(this[kEnded]){return Promise.resolve(createIterResult(undefined,true))}if(this[kStream].destroyed){return new Promise(function(resolve,reject){process.nextTick(function(){if(_this[kError]){reject(_this[kError]);}else {resolve(createIterResult(undefined,true));}});})}var lastPromise=this[kLastPromise];var promise;if(lastPromise){promise=new Promise(wrapForNext(lastPromise,this));}else {var data=this[kStream].read();if(data!==null){return Promise.resolve(createIterResult(data,false))}promise=new Promise(this[kHandlePromise]);}this[kLastPromise]=promise;return promise}},_defineProperty(_Object$setPrototypeO,Symbol.asyncIterator,function(){return this}),_defineProperty(_Object$setPrototypeO,"return",function _return(){var _this2=this;return new Promise(function(resolve,reject){_this2[kStream].destroy(null,function(err){if(err){reject(err);return}resolve(createIterResult(undefined,true));});})}),_Object$setPrototypeO),AsyncIteratorPrototype);var createReadableStreamAsyncIterator=function createReadableStreamAsyncIterator(stream){var _Object$create;var iterator=Object.create(ReadableStreamAsyncIteratorPrototype,(_Object$create={},_defineProperty(_Object$create,kStream,{value:stream,writable:true}),_defineProperty(_Object$create,kLastResolve,{value:null,writable:true}),_defineProperty(_Object$create,kLastReject,{value:null,writable:true}),_defineProperty(_Object$create,kError,{value:null,writable:true}),_defineProperty(_Object$create,kEnded,{value:stream._readableState.endEmitted,writable:true}),_defineProperty(_Object$create,kHandlePromise,{value:function value(resolve,reject){var data=iterator[kStream].read();if(data){iterator[kLastPromise]=null;iterator[kLastResolve]=null;iterator[kLastReject]=null;resolve(createIterResult(data,false));}else {iterator[kLastResolve]=resolve;iterator[kLastReject]=reject;}},writable:true}),_Object$create));iterator[kLastPromise]=null;finished(stream,function(err){if(err&&err.code!=="ERR_STREAM_PREMATURE_CLOSE"){var reject=iterator[kLastReject];if(reject!==null){iterator[kLastPromise]=null;iterator[kLastResolve]=null;iterator[kLastReject]=null;reject(err);}iterator[kError]=err;return}var resolve=iterator[kLastResolve];if(resolve!==null){iterator[kLastPromise]=null;iterator[kLastResolve]=null;iterator[kLastReject]=null;resolve(createIterResult(undefined,true));}iterator[kEnded]=true;});stream.on("readable",onReadable.bind(null,iterator));return iterator};module.exports=createReadableStreamAsyncIterator;}).call(this);}).call(this,require("_process"));},{"./end-of-stream":28,_process:17}],26:[function(require,module,exports){function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols);}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else {ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}var _require=require("buffer"),Buffer=_require.Buffer;var _require2=require("util"),inspect=_require2.inspect;var custom=inspect&&inspect.custom||"inspect";function copyBuffer(src,target,offset){Buffer.prototype.copy.call(src,target,offset);}module.exports=function(){function BufferList(){_classCallCheck(this,BufferList);this.head=null;this.tail=null;this.length=0;}_createClass(BufferList,[{key:"push",value:function push(v){var entry={data:v,next:null};if(this.length>0)this.tail.next=entry;else this.head=entry;this.tail=entry;++this.length;}},{key:"unshift",value:function unshift(v){var entry={data:v,next:this.head};if(this.length===0)this.tail=entry;this.head=entry;++this.length;}},{key:"shift",value:function shift(){if(this.length===0)return;var ret=this.head.data;if(this.length===1)this.head=this.tail=null;else this.head=this.head.next;--this.length;return ret}},{key:"clear",value:function clear(){this.head=this.tail=null;this.length=0;}},{key:"join",value:function join(s){if(this.length===0)return "";var p=this.head;var ret=""+p.data;while(p=p.next){ret+=s+p.data;}return ret}},{key:"concat",value:function concat(n){if(this.length===0)return Buffer.alloc(0);var ret=Buffer.allocUnsafe(n>>>0);var p=this.head;var i=0;while(p){copyBuffer(p.data,ret,i);i+=p.data.length;p=p.next;}return ret}},{key:"consume",value:function consume(n,hasStrings){var ret;if(n<this.head.data.length){ret=this.head.data.slice(0,n);this.head.data=this.head.data.slice(n);}else if(n===this.head.data.length){ret=this.shift();}else {ret=hasStrings?this._getString(n):this._getBuffer(n);}return ret}},{key:"first",value:function first(){return this.head.data}},{key:"_getString",value:function _getString(n){var p=this.head;var c=1;var ret=p.data;n-=ret.length;while(p=p.next){var str=p.data;var nb=n>str.length?str.length:n;if(nb===str.length)ret+=str;else ret+=str.slice(0,n);n-=nb;if(n===0){if(nb===str.length){++c;if(p.next)this.head=p.next;else this.head=this.tail=null;}else {this.head=p;p.data=str.slice(nb);}break}++c;}this.length-=c;return ret}},{key:"_getBuffer",value:function _getBuffer(n){var ret=Buffer.allocUnsafe(n);var p=this.head;var c=1;p.data.copy(ret);n-=p.data.length;while(p=p.next){var buf=p.data;var nb=n>buf.length?buf.length:n;buf.copy(ret,ret.length-n,0,nb);n-=nb;if(n===0){if(nb===buf.length){++c;if(p.next)this.head=p.next;else this.head=this.tail=null;}else {this.head=p;p.data=buf.slice(nb);}break}++c;}this.length-=c;return ret}},{key:custom,value:function value(_,options){return inspect(this,_objectSpread({},options,{depth:0,customInspect:false}))}}]);return BufferList}();},{buffer:13,util:12}],27:[function(require,module,exports){(function(process){(function(){function destroy(err,cb){var _this=this;var readableDestroyed=this._readableState&&this._readableState.destroyed;var writableDestroyed=this._writableState&&this._writableState.destroyed;if(readableDestroyed||writableDestroyed){if(cb){cb(err);}else if(err){if(!this._writableState){process.nextTick(emitErrorNT,this,err);}else if(!this._writableState.errorEmitted){this._writableState.errorEmitted=true;process.nextTick(emitErrorNT,this,err);}}return this}if(this._readableState){this._readableState.destroyed=true;}if(this._writableState){this._writableState.destroyed=true;}this._destroy(err||null,function(err){if(!cb&&err){if(!_this._writableState){process.nextTick(emitErrorAndCloseNT,_this,err);}else if(!_this._writableState.errorEmitted){_this._writableState.errorEmitted=true;process.nextTick(emitErrorAndCloseNT,_this,err);}else {process.nextTick(emitCloseNT,_this);}}else if(cb){process.nextTick(emitCloseNT,_this);cb(err);}else {process.nextTick(emitCloseNT,_this);}});return this}function emitErrorAndCloseNT(self,err){emitErrorNT(self,err);emitCloseNT(self);}function emitCloseNT(self){if(self._writableState&&!self._writableState.emitClose)return;if(self._readableState&&!self._readableState.emitClose)return;self.emit("close");}function undestroy(){if(this._readableState){this._readableState.destroyed=false;this._readableState.reading=false;this._readableState.ended=false;this._readableState.endEmitted=false;}if(this._writableState){this._writableState.destroyed=false;this._writableState.ended=false;this._writableState.ending=false;this._writableState.finalCalled=false;this._writableState.prefinished=false;this._writableState.finished=false;this._writableState.errorEmitted=false;}}function emitErrorNT(self,err){self.emit("error",err);}function errorOrDestroy(stream,err){var rState=stream._readableState;var wState=stream._writableState;if(rState&&rState.autoDestroy||wState&&wState.autoDestroy)stream.destroy(err);else stream.emit("error",err);}module.exports={destroy:destroy,undestroy:undestroy,errorOrDestroy:errorOrDestroy};}).call(this);}).call(this,require("_process"));},{_process:17}],28:[function(require,module,exports){var ERR_STREAM_PREMATURE_CLOSE=require("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;function once(callback){var called=false;return function(){if(called)return;called=true;for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}callback.apply(this,args);}}function noop(){}function isRequest(stream){return stream.setHeader&&typeof stream.abort==="function"}function eos(stream,opts,callback){if(typeof opts==="function")return eos(stream,null,opts);if(!opts)opts={};callback=once(callback||noop);var readable=opts.readable||opts.readable!==false&&stream.readable;var writable=opts.writable||opts.writable!==false&&stream.writable;var onlegacyfinish=function onlegacyfinish(){if(!stream.writable)onfinish();};var writableEnded=stream._writableState&&stream._writableState.finished;var onfinish=function onfinish(){writable=false;writableEnded=true;if(!readable)callback.call(stream);};var readableEnded=stream._readableState&&stream._readableState.endEmitted;var onend=function onend(){readable=false;readableEnded=true;if(!writable)callback.call(stream);};var onerror=function onerror(err){callback.call(stream,err);};var onclose=function onclose(){var err;if(readable&&!readableEnded){if(!stream._readableState||!stream._readableState.ended)err=new ERR_STREAM_PREMATURE_CLOSE;return callback.call(stream,err)}if(writable&&!writableEnded){if(!stream._writableState||!stream._writableState.ended)err=new ERR_STREAM_PREMATURE_CLOSE;return callback.call(stream,err)}};var onrequest=function onrequest(){stream.req.on("finish",onfinish);};if(isRequest(stream)){stream.on("complete",onfinish);stream.on("abort",onclose);if(stream.req)onrequest();else stream.on("request",onrequest);}else if(writable&&!stream._writableState){stream.on("end",onlegacyfinish);stream.on("close",onlegacyfinish);}stream.on("end",onend);stream.on("finish",onfinish);if(opts.error!==false)stream.on("error",onerror);stream.on("close",onclose);return function(){stream.removeListener("complete",onfinish);stream.removeListener("abort",onclose);stream.removeListener("request",onrequest);if(stream.req)stream.req.removeListener("finish",onfinish);stream.removeListener("end",onlegacyfinish);stream.removeListener("close",onlegacyfinish);stream.removeListener("finish",onfinish);stream.removeListener("end",onend);stream.removeListener("error",onerror);stream.removeListener("close",onclose);}}module.exports=eos;},{"../../../errors":19}],29:[function(require,module,exports){module.exports=function(){throw new Error("Readable.from is not available in the browser")};},{}],30:[function(require,module,exports){var eos;function once(callback){var called=false;return function(){if(called)return;called=true;callback.apply(void 0,arguments);}}var _require$codes=require("../../../errors").codes,ERR_MISSING_ARGS=_require$codes.ERR_MISSING_ARGS,ERR_STREAM_DESTROYED=_require$codes.ERR_STREAM_DESTROYED;function noop(err){if(err)throw err}function isRequest(stream){return stream.setHeader&&typeof stream.abort==="function"}function destroyer(stream,reading,writing,callback){callback=once(callback);var closed=false;stream.on("close",function(){closed=true;});if(eos===undefined)eos=require("./end-of-stream");eos(stream,{readable:reading,writable:writing},function(err){if(err)return callback(err);closed=true;callback();});var destroyed=false;return function(err){if(closed)return;if(destroyed)return;destroyed=true;if(isRequest(stream))return stream.abort();if(typeof stream.destroy==="function")return stream.destroy();callback(err||new ERR_STREAM_DESTROYED("pipe"));}}function call(fn){fn();}function pipe(from,to){return from.pipe(to)}function popCallback(streams){if(!streams.length)return noop;if(typeof streams[streams.length-1]!=="function")return noop;return streams.pop()}function pipeline(){for(var _len=arguments.length,streams=new Array(_len),_key=0;_key<_len;_key++){streams[_key]=arguments[_key];}var callback=popCallback(streams);if(Array.isArray(streams[0]))streams=streams[0];if(streams.length<2){throw new ERR_MISSING_ARGS("streams")}var error;var destroys=streams.map(function(stream,i){var reading=i<streams.length-1;var writing=i>0;return destroyer(stream,reading,writing,function(err){if(!error)error=err;if(err)destroys.forEach(call);if(reading)return;destroys.forEach(call);callback(error);})});return streams.reduce(pipe)}module.exports=pipeline;},{"../../../errors":19,"./end-of-stream":28}],31:[function(require,module,exports){var ERR_INVALID_OPT_VALUE=require("../../../errors").codes.ERR_INVALID_OPT_VALUE;function highWaterMarkFrom(options,isDuplex,duplexKey){return options.highWaterMark!=null?options.highWaterMark:isDuplex?options[duplexKey]:null}function getHighWaterMark(state,options,duplexKey,isDuplex){var hwm=highWaterMarkFrom(options,isDuplex,duplexKey);if(hwm!=null){if(!(isFinite(hwm)&&Math.floor(hwm)===hwm)||hwm<0){var name=isDuplex?duplexKey:"highWaterMark";throw new ERR_INVALID_OPT_VALUE(name,hwm)}return Math.floor(hwm)}return state.objectMode?16:16*1024}module.exports={getHighWaterMark:getHighWaterMark};},{"../../../errors":19}],32:[function(require,module,exports){module.exports=require("events").EventEmitter;},{events:14}],33:[function(require,module,exports){exports=module.exports=require("./lib/_stream_readable.js");exports.Stream=exports;exports.Readable=exports;exports.Writable=require("./lib/_stream_writable.js");exports.Duplex=require("./lib/_stream_duplex.js");exports.Transform=require("./lib/_stream_transform.js");exports.PassThrough=require("./lib/_stream_passthrough.js");exports.finished=require("./lib/internal/streams/end-of-stream.js");exports.pipeline=require("./lib/internal/streams/pipeline.js");},{"./lib/_stream_duplex.js":20,"./lib/_stream_passthrough.js":21,"./lib/_stream_readable.js":22,"./lib/_stream_transform.js":23,"./lib/_stream_writable.js":24,"./lib/internal/streams/end-of-stream.js":28,"./lib/internal/streams/pipeline.js":30}],34:[function(require,module,exports){var buffer=require("buffer");var Buffer=buffer.Buffer;function copyProps(src,dst){for(var key in src){dst[key]=src[key];}}if(Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow){module.exports=buffer;}else {copyProps(buffer,exports);exports.Buffer=SafeBuffer;}function SafeBuffer(arg,encodingOrOffset,length){return Buffer(arg,encodingOrOffset,length)}SafeBuffer.prototype=Object.create(Buffer.prototype);copyProps(Buffer,SafeBuffer);SafeBuffer.from=function(arg,encodingOrOffset,length){if(typeof arg==="number"){throw new TypeError("Argument must not be a number")}return Buffer(arg,encodingOrOffset,length)};SafeBuffer.alloc=function(size,fill,encoding){if(typeof size!=="number"){throw new TypeError("Argument must be a number")}var buf=Buffer(size);if(fill!==undefined){if(typeof encoding==="string"){buf.fill(fill,encoding);}else {buf.fill(fill);}}else {buf.fill(0);}return buf};SafeBuffer.allocUnsafe=function(size){if(typeof size!=="number"){throw new TypeError("Argument must be a number")}return Buffer(size)};SafeBuffer.allocUnsafeSlow=function(size){if(typeof size!=="number"){throw new TypeError("Argument must be a number")}return buffer.SlowBuffer(size)};},{buffer:13}],35:[function(require,module,exports){var Buffer=require("safe-buffer").Buffer;var isEncoding=Buffer.isEncoding||function(encoding){encoding=""+encoding;switch(encoding&&encoding.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return true;default:return false}};function _normalizeEncoding(enc){if(!enc)return "utf8";var retried;while(true){switch(enc){case"utf8":case"utf-8":return "utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return "utf16le";case"latin1":case"binary":return "latin1";case"base64":case"ascii":case"hex":return enc;default:if(retried)return;enc=(""+enc).toLowerCase();retried=true;}}}function normalizeEncoding(enc){var nenc=_normalizeEncoding(enc);if(typeof nenc!=="string"&&(Buffer.isEncoding===isEncoding||!isEncoding(enc)))throw new Error("Unknown encoding: "+enc);return nenc||enc}exports.StringDecoder=StringDecoder;function StringDecoder(encoding){this.encoding=normalizeEncoding(encoding);var nb;switch(this.encoding){case"utf16le":this.text=utf16Text;this.end=utf16End;nb=4;break;case"utf8":this.fillLast=utf8FillLast;nb=4;break;case"base64":this.text=base64Text;this.end=base64End;nb=3;break;default:this.write=simpleWrite;this.end=simpleEnd;return}this.lastNeed=0;this.lastTotal=0;this.lastChar=Buffer.allocUnsafe(nb);}StringDecoder.prototype.write=function(buf){if(buf.length===0)return "";var r;var i;if(this.lastNeed){r=this.fillLast(buf);if(r===undefined)return "";i=this.lastNeed;this.lastNeed=0;}else {i=0;}if(i<buf.length)return r?r+this.text(buf,i):this.text(buf,i);return r||""};StringDecoder.prototype.end=utf8End;StringDecoder.prototype.text=utf8Text;StringDecoder.prototype.fillLast=function(buf){if(this.lastNeed<=buf.length){buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal)}buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,buf.length);this.lastNeed-=buf.length;};function utf8CheckByte(byte){if(byte<=127)return 0;else if(byte>>5===6)return 2;else if(byte>>4===14)return 3;else if(byte>>3===30)return 4;return byte>>6===2?-1:-2}function utf8CheckIncomplete(self,buf,i){var j=buf.length-1;if(j<i)return 0;var nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0)self.lastNeed=nb-1;return nb}if(--j<i||nb===-2)return 0;nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0)self.lastNeed=nb-2;return nb}if(--j<i||nb===-2)return 0;nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0){if(nb===2)nb=0;else self.lastNeed=nb-3;}return nb}return 0}function utf8CheckExtraBytes(self,buf,p){if((buf[0]&192)!==128){self.lastNeed=0;return "�"}if(self.lastNeed>1&&buf.length>1){if((buf[1]&192)!==128){self.lastNeed=1;return "�"}if(self.lastNeed>2&&buf.length>2){if((buf[2]&192)!==128){self.lastNeed=2;return "�"}}}}function utf8FillLast(buf){var p=this.lastTotal-this.lastNeed;var r=utf8CheckExtraBytes(this,buf);if(r!==undefined)return r;if(this.lastNeed<=buf.length){buf.copy(this.lastChar,p,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal)}buf.copy(this.lastChar,p,0,buf.length);this.lastNeed-=buf.length;}function utf8Text(buf,i){var total=utf8CheckIncomplete(this,buf,i);if(!this.lastNeed)return buf.toString("utf8",i);this.lastTotal=total;var end=buf.length-(total-this.lastNeed);buf.copy(this.lastChar,0,end);return buf.toString("utf8",i,end)}function utf8End(buf){var r=buf&&buf.length?this.write(buf):"";if(this.lastNeed)return r+"�";return r}function utf16Text(buf,i){if((buf.length-i)%2===0){var r=buf.toString("utf16le",i);if(r){var c=r.charCodeAt(r.length-1);if(c>=55296&&c<=56319){this.lastNeed=2;this.lastTotal=4;this.lastChar[0]=buf[buf.length-2];this.lastChar[1]=buf[buf.length-1];return r.slice(0,-1)}}return r}this.lastNeed=1;this.lastTotal=2;this.lastChar[0]=buf[buf.length-1];return buf.toString("utf16le",i,buf.length-1)}function utf16End(buf){var r=buf&&buf.length?this.write(buf):"";if(this.lastNeed){var end=this.lastTotal-this.lastNeed;return r+this.lastChar.toString("utf16le",0,end)}return r}function base64Text(buf,i){var n=(buf.length-i)%3;if(n===0)return buf.toString("base64",i);this.lastNeed=3-n;this.lastTotal=3;if(n===1){this.lastChar[0]=buf[buf.length-1];}else {this.lastChar[0]=buf[buf.length-2];this.lastChar[1]=buf[buf.length-1];}return buf.toString("base64",i,buf.length-n)}function base64End(buf){var r=buf&&buf.length?this.write(buf):"";if(this.lastNeed)return r+this.lastChar.toString("base64",0,3-this.lastNeed);return r}function simpleWrite(buf){return buf.toString(this.encoding)}function simpleEnd(buf){return buf&&buf.length?this.write(buf):""}},{"safe-buffer":34}],36:[function(require,module,exports){(function(global){(function(){module.exports=deprecate;function deprecate(fn,msg){if(config("noDeprecation")){return fn}var warned=false;function deprecated(){if(!warned){if(config("throwDeprecation")){throw new Error(msg)}else if(config("traceDeprecation")){console.trace(msg);}else {console.warn(msg);}warned=true;}return fn.apply(this,arguments)}return deprecated}function config(name){try{if(!global.localStorage)return false}catch(_){return false}var val=global.localStorage[name];if(null==val)return false;return String(val).toLowerCase()==="true"}}).call(this);}).call(this,typeof commonjsGlobal!=="undefined"?commonjsGlobal:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}]},{},[10])(10)});
} (n3_min));

function n3LoadTTL(triples, store, batchSize) {
    if (batchSize === void 0) { batchSize = 1000; }
    return __awaiter(this, void 0, void 0, function () {
        var currentBatch, promises, counter;
        var _this = this;
        return __generator(this, function (_a) {
            currentBatch = [];
            promises = [];
            counter = 0;
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var parser = new n3_min.exports.Parser();
                    parser.parse(triples, function (error, quad, prefixes) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (error) {
                                        reject(error);
                                    }
                                    if (!quad) return [3 /*break*/, 1];
                                    if (counter % batchSize == 0) {
                                        // Add the previous batch to store
                                        if (currentBatch.length) {
                                            promises.push(store.addQuads(currentBatch));
                                        }
                                        // Start a new batch
                                        currentBatch = [quad];
                                    }
                                    else {
                                        // Push to current batch
                                        currentBatch.push(quad);
                                    }
                                    counter++;
                                    return [3 /*break*/, 3];
                                case 1:
                                    // Add the last batch to store
                                    if (currentBatch.length) {
                                        promises.push(store.addQuads(currentBatch));
                                    }
                                    // Wait for all loads to finish
                                    return [4 /*yield*/, Promise.all(promises)];
                                case 2:
                                    // Wait for all loads to finish
                                    _a.sent();
                                    // Resolve prefixes
                                    resolve(prefixes);
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                })];
        });
    });
}

var baseURI = "https://web-bim/resources/";
var oxiStore;
var n3Store;
// HANDLE FILE UPLOAD
document.getElementById('fileInput').addEventListener('change', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var fileList, file, t1, triples, t2, t3, t4, t5, t6, qEl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileList = event.target.files;
                file = fileList[0];
                t1 = new Date();
                return [4 /*yield*/, getFileContent(file)];
            case 1:
                triples = _a.sent();
                t2 = new Date();
                appendToLog("Read file content | ".concat(t2.getTime() - t1.getTime(), "ms"));
                t3 = new Date();
                return [4 /*yield*/, oxiStore.load(triples, "text/turtle", baseURI, undefined)];
            case 2:
                _a.sent();
                t4 = new Date();
                appendToLog("Loaded triples in Oxigraph | ".concat(t4.getTime() - t3.getTime(), "ms"));
                t5 = new Date();
                return [4 /*yield*/, n3LoadTTL(triples, n3Store)];
            case 3:
                _a.sent();
                t6 = new Date();
                appendToLog("Loaded triples in N3 | ".concat(t6.getTime() - t5.getTime(), "ms"));
                appendToLog("Store size Oxigraph: ".concat(oxiStore.size));
                appendToLog("Store size N3: ".concat(n3Store.size));
                qEl = document.getElementById("queries");
                if (qEl)
                    qEl.style.visibility = "visible";
                return [2 /*return*/];
        }
    });
}); });
document.getElementById('query_1').addEventListener('click', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "SELECT * WHERE { ?s ?p ?o } LIMIT 100";
                return [4 /*yield*/, executeQuery(query, ["s", "p", "o"], "Q1")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
document.getElementById('query_2').addEventListener('click', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "PREFIX ifc: <http://ifcowl.openbimstandards.org/IFC2X3_Final#> \nPREFIX bot: <https://w3id.org/bot#> \nPREFIX inst: <https://example.com/>\n\nSELECT ?space (group_concat(?adjEl) AS ?adjacent)\nWHERE {\n    ?space a bot:Space ; \n        bot:adjacentElement ?adjEl\n} GROUP BY ?space ?area";
                return [4 /*yield*/, executeQuery(query, ["space", "adjacent"], "Q2")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
document.getElementById('query_3').addEventListener('click', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "PREFIX ifc: <http://ifcowl.openbimstandards.org/IFC2X3_Final#>\n\nSELECT ?class (COUNT(?s) AS ?instances)\nWHERE { \n    ?s a ?class\n} \nGROUP BY ?class \nORDER BY DESC(?instances)";
                return [4 /*yield*/, executeQuery(query, ["class", "instances"], "Q3")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function executeQuery(query, variables, id) {
    return __awaiter(this, void 0, void 0, function () {
        var t1, oxiBindings, t2, t3, n3Bindings, t4, strBindings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t1 = new Date();
                    oxiBindings = oxiStore.query(query);
                    t2 = new Date();
                    appendToLog("Ran ".concat(id, " on Oxigraph | ").concat(oxiBindings.length, " results | ").concat(t2.getTime() - t1.getTime(), "ms"));
                    t3 = new Date();
                    return [4 /*yield*/, comunicaGetQuery(query, n3Store)];
                case 1:
                    n3Bindings = _a.sent();
                    t4 = new Date();
                    appendToLog("Ran ".concat(id, " on N3 | ").concat(n3Bindings.length, " results | ").concat(t4.getTime() - t3.getTime(), "ms"));
                    strBindings = oxiBindings.map(function (b) {
                        var str = "";
                        variables.forEach(function (v) { return str += "".concat(b.get(v).value, " | "); });
                        str = str.substring(0, str.length - 3);
                        return str;
                    });
                    setQueryAndResult(query, strBindings);
                    return [2 /*return*/];
            }
        });
    });
}
function initStore() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, init()];
                case 1:
                    _a.sent(); // Required to compile the WebAssembly.
                    oxiStore = new Store();
                    n3Store = new n3_min.exports.Store();
                    return [2 /*return*/];
            }
        });
    });
}
function setQueryAndResult(query, bindings) {
    var queryElement = document.getElementById("query");
    var qResElement = document.getElementById("query-results");
    if (queryElement) {
        queryElement.style.visibility = "visible";
        queryElement.innerHTML = "<pre>" + escapeHtml(query) + "</pre>";
    }
    if (qResElement) {
        qResElement.style.visibility = "visible";
        qResElement.innerHTML = "";
        bindings.forEach(function (binding) {
            var entry = document.createElement('pre');
            entry.innerHTML = escapeHtml(binding);
            qResElement.appendChild(entry);
        });
    }
}
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function appendToLog(text) {
    console.log(text);
    var log = document.getElementById("log");
    if (!log)
        return;
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(text));
    log.appendChild(entry);
}
initStore();
