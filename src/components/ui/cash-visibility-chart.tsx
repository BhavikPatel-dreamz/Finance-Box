"use client";

import React, { useEffect, useId, useRef, useState } from "react";

const W = 472;
const H = 190;

const POINTS: [number, number][] = [
    [0, 132], [40, 118], [75, 108], [120, 106], [160, 96], [200, 88], [240, 84],
    [275, 88], [320, 68], [355, 55], [385, 58], [420, 40], [455, 12], [472, 8],
];

function smoothPath(pts: [number, number][]) {
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
    }
    return d;
}

const LINE_PATH = smoothPath(POINTS);
const AREA_PATH = `${LINE_PATH} L${W},${H} L0,${H} Z`;
const GRID_COUNT = 9;
const DEFAULT_LABELS = ["AUG", "NOV", "FEB", "MAY", "JUL"];

const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type CashVisibilityChartProps = {
    title?: string;
    rangeLabel?: string;
    labels?: string[];
    delay?: number;
    duration?: number;
    className?: string;
};

export function CashVisibilityChart({
    title = "Cash visibility",
    rangeLabel = "12 MONTH VIEW",
    labels = DEFAULT_LABELS,
    delay = 600,
    duration = 2200,
    className = "",
}: CashVisibilityChartProps) {
    const clipId = `cv-clip-${useId().replace(/:/g, "")}`;
    const gradId = `cv-grad-${useId().replace(/:/g, "")}`;

    const lineRef = useRef<SVGPathElement>(null);
    const clipRectRef = useRef<SVGRectElement>(null);
    const dotRef = useRef<HTMLSpanElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const line = lineRef.current;
        const clipRect = clipRectRef.current;
        const dot = dotRef.current;
        if (!line || !clipRect || !dot) return;

        const length = line.getTotalLength();
        line.style.strokeDasharray = `${length}`;

        const render = (p: number) => {
            const pt = line.getPointAtLength(length * p);
            line.style.strokeDashoffset = `${length * (1 - p)}`;
            clipRect.setAttribute("width", `${pt.x}`);
            dot.style.left = `${(pt.x / W) * 100}%`;
            dot.style.top = `${(pt.y / H) * 100}%`;
            dot.style.opacity = p > 0 ? "1" : "0";
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            render(1);
            return;
        }

        render(0);

        let raf = 0;
        const timeout = window.setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
                const t = Math.min((now - start) / duration, 1);
                render(easeInOutCubic(t));
                if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        }, delay);

        return () => {
            window.clearTimeout(timeout);
            cancelAnimationFrame(raf);
        };
    }, [delay, duration]);

    const fade = (ms: number): React.CSSProperties => ({
        opacity: mounted ? 1 : 0,
        transition: `opacity 700ms ease ${ms}ms`,
    });

    return (
        <div
            className={`relative h-full w-full bg-[#050D1F] border border-white/10 ${className}`}
        >
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-4 sm:px-5 sm:pt-5">
                <span className="text-[11px] sm:text-[12px] xl:text-[13px] font-normal text-white/80 leading-none">
                    {title}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[1.2px] text-white/40 leading-none">
                    {rangeLabel}
                </span>
            </div>

            <div className="absolute left-[5%] right-[5%] top-[24%] bottom-[20%]">
                <svg
                    viewBox={`0 0 ${W} ${H}`}
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full overflow-visible"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                        <clipPath id={clipId}>
                            <rect ref={clipRectRef} x="0" y="0" width="0" height={H} />
                        </clipPath>
                    </defs>

                    {Array.from({ length: GRID_COUNT }).map((_, i) => {
                        const x = (W / (GRID_COUNT - 1)) * i;
                        return (
                            <line
                                key={i}
                                x1={x}
                                x2={x}
                                y1={0}
                                y2={H}
                                stroke="white"
                                strokeOpacity="0.07"
                                vectorEffect="non-scaling-stroke"
                                style={fade(200 + i * 70)}
                            />
                        );
                    })}

                    <g clipPath={`url(#${clipId})`}>
                        <path d={AREA_PATH} fill={`url(#${gradId})`} />
                    </g>

                    <path
                        ref={lineRef}
                        d={LINE_PATH}
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                    />

                    <line
                        x1={0}
                        x2={W}
                        y1={H}
                        y2={H}
                        stroke="white"
                        strokeOpacity="0.12"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>

                <span
                    ref={dotRef}
                    className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 opacity-0"
                >
                    <span className="absolute inset-0 rounded-full bg-white/50 animate-ping" />
                    <span className="absolute inset-0 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 pb-3 sm:px-5 sm:pb-4">
                {labels.map((label, i) => (
                    <span
                        key={label}
                        className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[1.2px] text-white/40 leading-none"
                        style={fade(400 + i * 120)}
                    >
                        {label}
                    </span>
                ))}
            </div>
        </div>
    );
}