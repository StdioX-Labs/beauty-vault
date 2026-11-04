// A decorative photo that fades into the section background, so sections
// are not flat black or white. It sits behind content and is ignored by
// screen readers.
type Props = {
  src: string;
  side?: 'left' | 'right';
  tone?: 'dark' | 'light';
  opacity?: number;
  className?: string;
};

export default function BlendBg({ src, side = 'right', tone = 'dark', opacity = 0.35, className = '' }: Props) {
  const fadeTo = side === 'right' ? 'to left' : 'to right';
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 ${side === 'right' ? 'right-0' : 'left-0'} w-full sm:w-2/3 lg:w-1/2 ${className}`}
      style={{
        backgroundImage: `url('${src}')`,
        backgroundSize: 'cover',
        backgroundPosition: side === 'right' ? 'right center' : 'left center',
        opacity,
        filter: tone === 'dark' ? 'grayscale(15%)' : 'saturate(90%)',
        WebkitMaskImage: `linear-gradient(${fadeTo}, black 0%, rgba(0,0,0,0.6) 45%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)`,
        maskImage: `linear-gradient(${fadeTo}, black 0%, rgba(0,0,0,0.6) 45%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)`,
        WebkitMaskComposite: 'source-in',
        maskComposite: 'intersect',
      }}
    />
  );
}
