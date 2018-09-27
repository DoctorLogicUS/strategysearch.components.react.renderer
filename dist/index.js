"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var server_1 = require("react-dom/server");
function Renderer(COMPONENTS) {
    function getComponent(template) {
        var component = COMPONENTS[template];
        if (!component) {
            throw "No React Component found for template '" + template + "'.";
        }
        return component;
    }
    function hydrateTree(tree, dependencies) {
        var component = getComponent(tree.template);
        var context = tree.context || {};
        if (dependencies) {
            context.dependencies = dependencies;
        }
        var children = tree.children.map(function (child) { return hydrateTree(child, dependencies); });
        var el = React.createElement(component, context, children);
        return el;
    }
    function renderTreeToStaticMarkup(tree, dependencies) {
        var el = hydrateTree(tree, dependencies);
        var markup = server_1.renderToStaticMarkup(el);
        return markup;
    }
    function renderComponentToStaticMarkup(template, context, dependencies) {
        var component = getComponent(template);
        if (dependencies) {
            context = context || {};
            context.dependencies = dependencies;
        }
        var el = React.createElement(component, context, null);
        var markup = server_1.renderToStaticMarkup(el);
        return markup;
    }
    return function (cb, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var html = '';
        var err = null;
        try {
            switch (command) {
                case 'component':
                    html = renderComponentToStaticMarkup(args[0], args[1], args[2]);
                    break;
                case 'tree':
                    html = renderTreeToStaticMarkup(args[0], args[1]);
                    break;
                default:
                    throw "Unknown command: '" + command + "'.";
            }
        }
        catch (error) {
            err = error;
        }
        cb(err, html);
    };
}
exports.Renderer = Renderer;
;
