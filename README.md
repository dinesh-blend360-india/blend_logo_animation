# blend_logo_animation

Creator: <dinesh_blend360_india> <dinesh.marre@blend360.com>

A transparent, looping Blend logo for loading screens. The SVG is inline and needs no image assets, stylesheet, or animation library.

## Use in an existing React app

Copy one component into your app's src/components folder:

- TypeScript: [react-ts/BlendLogoLoader.tsx](react-ts/BlendLogoLoader.tsx)
- JavaScript: [react-js/BlendLogoLoader.jsx](react-js/BlendLogoLoader.jsx)

Import and show it while loading:

~~~tsx
import BlendLogoLoader from "./components/BlendLogoLoader";

function App() {
  return isLoading ? <BlendLogoLoader width={320} /> : <YourPage />;
}
~~~

Adjust the import path and loading condition to suit your app. React 18 or newer is required for useId. The component runs under your app's existing npm commands; it needs no separate package install.

If two loading views can appear together, you can also copy the optional useLoadingLogoTurn.ts or .js file from the same language folder. A single loader does not need that hook.

For Next.js App Router, add "use client"; as the first line of each copied file that uses React hooks.

## Run this repository

Open [index.html](index.html) directly for the standalone transparent preview. To run a local preview and validate the TypeScript component after cloning:

~~~sh
npm install
npm run dev
npm run check
npm run build
~~~

These commands maintain this repository. You do not need them when copying the component into an existing React app.

## Animation

- Blend letters: 0–300 ms.
- Outer and inner symbol paths: 300–1500 ms.
- TM reveal: 1500–1750 ms.
- Completed logo: held until the 3000 ms loop restarts.

The component loops while mounted and cancels its animation frame when unmounted.

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| width | number or string | 633 | SVG width; height follows its aspect ratio |
| className | string | none | Add your own layout styles to the SVG |

## Files

~~~text
index.html                       Standalone preview
react-ts/BlendLogoLoader.tsx     TypeScript React component
react-ts/useLoadingLogoTurn.ts   Optional TypeScript hook
react-js/BlendLogoLoader.jsx     JavaScript React component
react-js/useLoadingLogoTurn.js   Optional JavaScript hook
package.json                     Local preview and validation commands
LICENSE                          MIT license
~~~

Licensed under [MIT](LICENSE).
