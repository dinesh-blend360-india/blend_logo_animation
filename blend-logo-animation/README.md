# Blend Logo Animation

Creator: <dinesh_blend360_india> <dinesh.marre@blend360.com>

A looping, animated Blend logo for loading screens. It has no dependencies beyond React 18 or newer, and no
images or stylesheets to load. The background is transparent.

Two ways to use it:
- **React**: `BlendLogoLoader` component, in TypeScript (`.tsx`) or JavaScript (`.jsx`).
- **Plain HTML**: one file, `blend-logo-animation.html`, that you can open in a browser or embed in any page.

## Files in this folder

| File | Use it when | What it is |
|---|---|---|
| `BlendLogoLoader.tsx` | Your app is TypeScript React | The component. Props: `width`, `className` |
| `BlendLogoLoader.jsx` | Your app is JavaScript React | Same component, no types |
| `useLoadingLogoTurn.ts` | Your app is TypeScript and can show two loading views at once | Hook: only one logo is on screen at a time |
| `useLoadingLogoTurn.js` | Same as above, JavaScript | Same hook, no types |
| `blend-logo-animation.html` | You need a static page or a non-React app | Standalone animation, no build step |
| `README.md` | | This file |

You need only the component file. The hook is optional.

## React: quick start

1. Copy `BlendLogoLoader.tsx` (or `.jsx`) into your project, for example `src/components/`.
2. Import it where you show a loading state:

```tsx
import BlendLogoLoader from "./components/BlendLogoLoader";

export default function LoadingView() {
  return <BlendLogoLoader width={320} />;
}
```

JavaScript:

```jsx
import BlendLogoLoader from "./components/BlendLogoLoader";

export default function LoadingView() {
  return <BlendLogoLoader width={320} />;
}
```

Adjust the relative import path to match where you put the file.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `width` | number or string | `633` | Width in pixels or any CSS length. Height follows the logo's proportions. |
| `className` | string | none | Added to the `<svg>`, so you can position it with your own CSS. |

The logo has `role="img"` and `aria-label="Loading Blend"`, so screen readers announce it.

### Next.js (App Router)

Add `"use client";` as the first line of the component file. The animation uses browser APIs.

## One logo at a time (optional)

If two loading views can be open together (for example a dialog and a page-level loader), each one would show its own logo.
`useLoadingLogoTurn` lets only one of them show at a time. The first to ask takes the turn; the others wait.

```tsx
import BlendLogoLoader from "./components/BlendLogoLoader";
import { useLoadingLogoTurn } from "./components/useLoadingLogoTurn";

export default function LoadingDialog({ loading }) {
  const showLogo = useLoadingLogoTurn(loading);
  if (!loading) return null;
  return showLogo ? <BlendLogoLoader width={320} /> : null;
}
```

Use it only if you need it. A single loading view does not need the hook.

## Plain HTML

Open `blend-logo-animation.html` in a browser to see the animation. To use it in another page, copy the `<svg>`
and the `<script>` block, or link to the file. The page sets its own background to transparent, so place it on any
background.

If the browser has scripts turned off, the page shows the finished logo without the animation.

## How it works

- The logo is drawn as SVG (viewBox 633 x 177) in navy `#0a3358`.
- The five letters are revealed one after another by widening clip rectangles.
- The four symbol strokes are drawn with dash offsets over fixed timings.
- The trademark mark (TM) fades in.
- One cycle is 3000 ms. The animation runs with `requestAnimationFrame` while the component is mounted and stops
  when it unmounts.

The colour and timings are constants at the top of `BlendLogoLoader.tsx`. Change them there if the brand changes.

## Requirements

- React 18.3 or newer (for `useId`). The component has no other runtime dependency.
- Any build tool that handles React (Create React App, Vite, Next.js).
- Browsers with `requestAnimationFrame` and SVG (all current browsers).

## Notes and limits

- The component is for loading states. It loops until it is removed from the page.
- In test environments without SVG path measurement (jsdom), the stroke draws in full. This is expected.
- The logo is a copy of the Blend brand artwork as used in the SOW Studio app. Check with the brand team before using it
  outside Blend.

## Changes from the app copy

The file in this folder matches the SOW Studio app copy, with two small changes for the React code:
- The app copy uses `Array.from` rather than spreading a `NodeList`, which the app's TypeScript settings required.
- The app copy checks that `getTotalLength` exists, which jsdom does not provide.

## Testing

This folder has not been added to a test suite. The animation was checked in the SOW Studio app (loading dialog and
editor start state). Before sharing it widely, check it in your own app: one logo on screen, centred, transparent
background, and looping.
