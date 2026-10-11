import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent } from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, X } from "lucide-react";

type Photo = { src: string; alt: string };

export function ZoomPhoto({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in text-left"
        aria-label={`Zväčšiť fotku: ${alt}`}
      >
        <img src={src} alt={alt} className={className} />
      </button>
      {open
        ? createPortal(<Lightbox photos={[{ src, alt }]} start={0} onClose={() => setOpen(false)} />, document.body)
        : null}
    </>
  );
}

export function ZoomGallery({
  photos,
  className,
  itemClassName,
  imgClassName,
  showCaption,
}: {
  photos: Photo[];
  className?: string;
  itemClassName?: string;
  imgClassName?: string;
  showCaption?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className={className}>
        {photos.map((photo, i) => (
          <figure key={photo.src} className={itemClassName}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="block w-full cursor-zoom-in text-left"
              aria-label={`Zväčšiť fotku: ${photo.alt}`}
            >
              <img src={photo.src} alt={photo.alt} className={imgClassName} />
            </button>
            {showCaption ? (
              <figcaption className="px-3 py-2 text-xs text-muted sm:px-4 sm:py-3 sm:text-sm">{photo.alt}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>
      {index !== null
        ? createPortal(
            <Lightbox photos={photos} start={index} onClose={() => setIndex(null)} />,
            document.body,
          )
        : null}
    </>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function Lightbox({
  photos,
  start,
  onClose,
}: {
  photos: Photo[];
  start: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(start);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const photo = photos[index];
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "ArrowRight") {
        setIndex((current) => (current + 1) % photos.length);
        setScale(1);
        setPos({ x: 0, y: 0 });
      }
      if (event.key === "ArrowLeft") {
        setIndex((current) => (current - 1 + photos.length) % photos.length);
        setScale(1);
        setPos({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [photos.length]);

  function resetView() {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }

  function step(dir: number) {
    setIndex((current) => (current + dir + photos.length) % photos.length);
    resetView();
  }

  function zoomBy(delta: number) {
    setScale((current) => {
      const next = clamp(Number((current + delta).toFixed(2)), 1, 4);
      if (next === 1) setPos({ x: 0, y: 0 });
      return next;
    });
  }

  function onWheel(event: WheelEvent) {
    event.preventDefault();
    zoomBy(event.deltaY < 0 ? 0.25 : -0.25);
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 1) {
      drag.current = { x: event.clientX, y: event.clientY, px: pos.x, py: pos.y };
    }
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
      drag.current = null;
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const next = clamp(pinch.current.scale * (dist / pinch.current.dist), 1, 4);
      setScale(next);
      if (next === 1) setPos({ x: 0, y: 0 });
      return;
    }
    if (drag.current && scale > 1) {
      setPos({
        x: drag.current.px + (event.clientX - drag.current.x),
        y: drag.current.py + (event.clientY - drag.current.y),
      });
    }
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    pointers.current.delete(event.pointerId);
    drag.current = null;
    pinch.current = null;
  }

  return (
    <div className="fixed inset-0 z-[80] bg-ink/95 text-paper" role="dialog" aria-modal="true" aria-label={photo.alt}>
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 px-3 py-3">
        <p className="truncate text-sm text-paper/80">{photo.alt}</p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink"
          aria-label="Zavrieť fotku"
        >
          <X size={20} />
        </button>
      </div>
      <div
        className="flex h-full w-full items-center justify-center overflow-hidden px-3 pt-16 pb-24 touch-none"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={() => (scale > 1 ? resetView() : setScale(2.4))}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          draggable={false}
          className="max-h-[78vh] max-w-full select-none object-contain"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 px-3">
        {photos.length > 1 ? (
          <button type="button" className="rounded-full bg-paper/15 px-4 py-3 text-sm font-bold" onClick={() => step(-1)}>
            Predošlá
          </button>
        ) : null}
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink" aria-label="Oddialiť" onClick={() => zoomBy(-0.4)}>
          <Minus size={18} />
        </button>
        <button type="button" className="rounded-full bg-paper/15 px-3 py-3 text-sm font-bold" onClick={resetView}>
          {Math.round(scale * 100)}%
        </button>
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink" aria-label="Priblížiť" onClick={() => zoomBy(0.4)}>
          <Plus size={18} />
        </button>
        {photos.length > 1 ? (
          <button type="button" className="rounded-full bg-paper/15 px-4 py-3 text-sm font-bold" onClick={() => step(1)}>
            Ďalšia
          </button>
        ) : null}
      </div>
    </div>
  );
}
