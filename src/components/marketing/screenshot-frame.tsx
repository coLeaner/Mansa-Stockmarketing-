import { cn } from "@/lib/utils";

type ScreenshotFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

export function ScreenshotFrame({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  priority = false,
}: ScreenshotFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.85)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-emerald-300/10" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "block h-full w-full object-cover object-top",
          imgClassName,
        )}
      />
    </div>
  );
}

