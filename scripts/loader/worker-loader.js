// worker-loader
module.exports = function (source) {
    return source;
}
module.exports.patch = function (source) {
    if (this.cacheable) {
        this.cacheable();
    }
    // only on client side
    console.log('worker-loader', this.resourcePath, source);
    // const worker = new Worker(new URL('./deep-thought.js', import.meta.url));
    // implement above line and return worker
    return `const worker = new Worker(new URL('${this.resourcePath}', import.meta.url));
    export default worker
    `;
}
