/*
 * Worker scripts need to import api using importScripts('api.bundled.js');
 *
 * Workers need to be an argument-less function.
 * To pass data from/to them, use worker.postMessage(data)
 * To receive data from/in them, use worker.onmessage = function(data) {}
 *      in there, or onmessage = function(data) {} in the workers
 */
function createWebWorker(fn) {
    var fnBlob;
    try {
        fnBlob = new Blob([fn.toString()], { type: 'application/javascript' });
    } catch (e) { // Backwards-compatibility
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
        fnBlob = new BlobBuilder();
        fnBlob.append(fn.toString());
        fnBlob = fnBlob.getBlob();
    }

    var worker = new Worker(URL.createObjectURL(fnBlob))
    return worker
}
