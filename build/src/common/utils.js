"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const sleep = async (delay) => {
    return new Promise(resolve => setTimeout(() => resolve(true), delay));
};
exports.sleep = sleep;
//# sourceMappingURL=utils.js.map