import * as React from 'react';
export declare function Renderer(COMPONENTS: {
    [key: string]: React.ComponentClass;
}): (cb: (err: any, html: string) => void, command: "tree" | "component", ...args: any[]) => void;
