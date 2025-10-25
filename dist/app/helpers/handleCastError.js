"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err) => {
    const errorSources = [];
    errorSources.push({
        //path : "nickname iside lastname inside name"
        // path: issue.path.length > 1 && issue.path.reverse().join(" inside "),
        path: err.path,
        message: err.message
    });
    return {
        statusCode: 400,
        message: "Cast Error",
        errorSources
    };
};
exports.handleCastError = handleCastError;
