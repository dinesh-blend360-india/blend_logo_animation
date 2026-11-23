/** Creator: <dinesh_blend360_india> <dinesh.marre@blend360.com> */
import { useEffect, useId, useRef } from "react";

type BlendLogoLoaderProps = {
  width?: number | string;
  className?: string;
};

const NAVY = "#0a3358";
const LETTER_WIDTHS = [77, 15, 79, 78, 80];
const SYMBOL_TIMING = [
  { start: 300, duration: 350 },
  { start: 650, duration: 350 },
  { start: 1000, duration: 250 },
  { start: 1250, duration: 250 },
];

export default function BlendLogoLoader({
  width = 633,
  className,
}: BlendLogoLoaderProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Array.from (not spread) so the project's TypeScript target needs no downlevelIteration.
    const clips = Array.from(svg.querySelectorAll<SVGRectElement>(".letter-clip rect"));
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>(".symbol path")).map(
      (path, index) => {
        const timing = SYMBOL_TIMING[index];
        if (!timing) throw new Error("Missing symbol timing");
        // getTotalLength is missing in jsdom; without it the stroke simply draws in full.
        const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 0;
        path.style.strokeDasharray = `${length}px ${length}px`;
        path.style.strokeDashoffset = `${length}px`;
        path.style.visibility = "visible";
        return { path, length, ...timing };
      },
    );
    const trademark = svg.querySelector<SVGTextElement>(".trademark");
    if (!trademark) return;

    const progress = (time: number, start: number, duration: number) =>
      Math.min(1, Math.max(0, (time - start) / duration));
    const ease = (value: number) => value * value * (3 - 2 * value);

    function render(elapsed: number) {
      clips.forEach((rect, index) => {
        rect.setAttribute(
          "width",
          String((LETTER_WIDTHS[index] ?? 0) * ease(progress(elapsed, index * 60, 60))),
        );
      });
      paths.forEach(({ path, length, start, duration }) => {
        path.style.strokeDashoffset = `${length * (1 - ease(progress(elapsed, start, duration)))}px`;
      });
      trademark!.style.opacity = String(progress(elapsed, 1500, 250));
    }

    let frame = 0;
    let startedAt: number | undefined;
    function tick(now: number) {
      if (startedAt === undefined) startedAt = now;
      render((now - startedAt) % 3000);
      frame = requestAnimationFrame(tick);
    }

    render(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 633 177"
      role="img"
      aria-label="Loading Blend"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width, maxWidth: "100%", height: "auto", overflow: "visible" }}
    >
      <defs>
        <clipPath id={`${id}-b`} className="letter-clip"><rect x="18" y="60" width="0" height="78" /></clipPath>
        <clipPath id={`${id}-l`} className="letter-clip"><rect x="99" y="60" width="0" height="78" /></clipPath>
        <clipPath id={`${id}-e`} className="letter-clip"><rect x="117" y="60" width="0" height="78" /></clipPath>
        <clipPath id={`${id}-n`} className="letter-clip"><rect x="200" y="60" width="0" height="78" /></clipPath>
        <clipPath id={`${id}-d`} className="letter-clip"><rect x="280" y="60" width="0" height="78" /></clipPath>
      </defs>
      <g fill={NAVY} fillRule="evenodd">
        <path clipPath={`url(#${id}-b)`}
          d="M 18 69 H 62 C 81 69 91 77 91 88 C 91 97 85 102 77 104 C 88 106 95 111 95 120 C 95 132 84 136 64 136 H 18 Z M 31 79 V 100 H 62 C 73 100 79 96 79 89 C 79 82 73 79 62 79 Z M 31 109 V 126 H 65 C 77 126 83 124 83 118 C 83 112 77 109 65 109 Z" />
        <path clipPath={`url(#${id}-l)`} d="M 100 61 H 112 V 136 H 100 Z" />
        <path clipPath={`url(#${id}-e)`}
          d="M 118 108 C 118 91 135 79 157 79 C 179 79 195 91 195 110 H 130 C 132 121 143 127 157 127 C 170 127 180 123 187 117 L 195 124 C 185 133 172 137 157 137 C 134 137 118 125 118 108 Z M 130 101 H 182 C 178 93 168 89 157 89 C 145 89 135 93 130 101 Z" />
        <path clipPath={`url(#${id}-n)`}
          d="M 201 81 H 213 V 91 C 221 83 231 79 244 79 C 264 79 276 89 276 106 V 136 H 264 V 107 C 264 95 257 89 244 89 C 227 89 213 99 213 111 V 136 H 201 Z" />
        <path clipPath={`url(#${id}-d)`}
          d="M 346 61 H 358 V 136 H 346 V 126 C 339 133 329 137 317 137 C 296 137 281 125 281 108 C 281 91 296 79 317 79 C 329 79 339 83 346 91 Z M 294 108 C 294 120 305 127 319 127 C 334 127 346 119 346 108 C 346 97 334 89 319 89 C 305 89 294 96 294 108 Z" />
      </g>
      <g className="symbol" fill="none" stroke={NAVY} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path style={{ visibility: "hidden" }} d="M 398 99 L 398 82 C 398 62 439 49 488 49 C 536 49 579 62 579 82 C 579 89 573 96 563 99" />
        <path style={{ visibility: "hidden" }} d="M 563 99 C 574 103 580 111 580 118 C 580 139 538 151 489 151 C 440 151 398 139 398 118 L 398 99" />
        <path style={{ visibility: "hidden" }} d="M 411 99 C 454 76 520 76 563 99" />
        <path style={{ visibility: "hidden" }} d="M 563 99 C 520 123 454 123 411 99" />
      </g>
      <text className="trademark" x="577" y="57" fill={NAVY} fontFamily="Arial, Helvetica, sans-serif" fontSize="17" opacity="0">TM</text>
    </svg>
  );
}
