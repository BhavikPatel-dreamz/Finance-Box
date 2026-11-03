// Needs a parent with `group relative isolate overflow-hidden`
export function RiseGlow({
    gradient = "bg-[linear-gradient(to_top,rgba(35,197,94,0.26),transparent_65%)]",
}: {
    gradient?: string;
}) {
    return (
        <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 -z-10 translate-y-[20%] opacity-0 transition-[opacity,transform] duration-[600ms] ease-out group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none ${gradient}`}
        />
    );
}