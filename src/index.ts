import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

interface ComponentTree {
    template: string;
    context: any;
    children: ComponentTree[];
}

export function Renderer(COMPONENTS: { [key: string]: React.ComponentClass }) {
    function getComponent(template: string) {
        const component = COMPONENTS[template];

        if (!component) {
            throw `No React Component found for template '${template}'.`;
        }

        return component;
    }

    function hydrateTree(tree: ComponentTree, dependencies: any[]): React.ComponentElement<any, any> {
        const component = getComponent(tree.template);
        let context = tree.context || {};

        if (dependencies) {
            context.dependencies = dependencies;
        }

        const children = tree.children.map(child => hydrateTree(child, dependencies));

        const el = React.createElement(component, context, children);

        return el;
    }

    function renderTreeToStaticMarkup(tree: ComponentTree, dependencies: any[]) {
        const el = hydrateTree(tree, dependencies);

        const markup = renderToStaticMarkup(el);

        return markup;
    }

    function renderComponentToStaticMarkup(template: string, context: any, dependencies: any[]) {
        const component = getComponent(template);

        if (dependencies) {
            context = context || {};
            context.dependencies = dependencies;
        }

        const el = React.createElement(component, context, null);

        const markup = renderToStaticMarkup(el);

        return markup;
    }

    return function (cb: (err: any, html: string) => void, command: 'component' | 'tree', ...args: any[]) {
        let html = '';
        let err = null;

        try {
            switch (command) {
                case 'component':
                    html = renderComponentToStaticMarkup(args[0], args[1], args[2]);
                    break;
                case 'tree':
                    html = renderTreeToStaticMarkup(args[0], args[1]);
                    break;
                default:
                    throw `Unknown command: '${command}'.`;
            }
        } catch (error) {
            err = error;
        }

        cb(err, html);
    };
};