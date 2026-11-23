# Blend Logo Loader

Creator: <dinesh_blend360_india> <dinesh.marre@blend360.com>

Files needed in this folder: `BlendLogoLoader.tsx`, this README, and `LICENSE`.

Copy this whole folder into your existing React app's `src` folder. Import the component wherever you show a loading state:

```tsx
import BlendLogoLoader from "./blend-logo-animation-tsx-cmp/BlendLogoLoader";

export default function LoadingView() {
  return <BlendLogoLoader width={320} />;
}
```

Adjust the relative import path for the file doing the import. The component requires React 18 or newer and no other package, stylesheet, or image. It has a transparent background and loops while mounted. If you use Next.js App Router, add `"use client";` as the first line of `BlendLogoLoader.tsx` after copying it.

Use your existing app's `npm run dev` and `npm run build` commands. There are no separate commands for this folder.

