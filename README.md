# strategysearch.components.react.renderer
React renderer package for StrategySearch.Components.

## Usage

The .NET code will expect a node module that exposes a function with the signature: 
```ts
(cb: (err, html), command: 'component' | 'tree', ...args) => void
``` 
This package contains a factory for creating that function.

The factory expects an object that maps a template name (`stirng`) to a React component type.

### Example

Here, `./your-components-map` 

```ts
// your-components-map.js
import { MyComponent } from './components/my-component';
import { MyOtherComponent } from './components/my-other-component';

// export object where [key: string]: React.Component
export const COMPONENTS {
  MyComponent: MyComponent,
  MyOtherComponent: MyOtherComponent
};
```

```ts
// index.ts
import { COMPONENTS } from './your-components-map';
import { default as Renderer } from 'strategysearch.components.react.renderer';

// make sure to use `export = ` because .NET will expect to use it from a require
export = Renderer(COMPONENTS);
```
