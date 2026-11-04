import Link from 'next/link';
import type { ReactNode } from 'react';

// A small Markdown renderer for the copy migrated from the old site.
// It covers only what that copy uses: headings, paragraphs, lists,
// tables, images, rules, bold, italics and links. It renders on the
// server, so the full text is in the HTML that search engines read.

type Block =
  | { type: 'h'; level: number; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'img'; alt: string; src: string }
  | { type: 'cta'; links: { label: string; href: string }[] }
  | { type: 'hr' };

const LINK_ONLY = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

function parse(md: string): Block[] {
  const lines = md.replace(/\r/g, '').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  const isListLine = (l: string) => /^\s*([*-]|\d+\.)\s+/.test(l);

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) { blocks.push({ type: 'h', level: h[1].length, text: h[2].trim() }); i++; continue; }

    if (/^\s*(---|\*\*\*)\s*$/.test(line)) { blocks.push({ type: 'hr' }); i++; continue; }

    const img = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/.exec(line.trim());
    if (img) { blocks.push({ type: 'img', alt: img[1], src: img[2] }); i++; continue; }

    if (line.trim().startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
        i++;
      }
      blocks.push({ type: 'table', head: rows[0] ?? [], rows: rows.slice(1) });
      continue;
    }

    if (isListLine(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i];
        if (isListLine(l)) {
          items.push(l.replace(/^\s*([*-]|\d+\.)\s+/, '').replace(/^#{1,6}\s+/, ''));
          i++;
        } else if (l.trim() && /^\s{2,}/.test(l) && items.length) {
          items[items.length - 1] += ' — ' + l.trim().replace(/^#{1,6}\s+/, '');
          i++;
        } else if (!l.trim() && i + 1 < lines.length && (isListLine(lines[i + 1]) || /^\s{2,}\S/.test(lines[i + 1]))) {
          i++;
        } else break;
      }
      blocks.push({ type: ordered ? 'ol' : 'ul', items });
      continue;
    }

    // Paragraph: gather until a blank line or another block starts.
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,6})\s/.test(lines[i]) && !isListLine(lines[i]) && !lines[i].trim().startsWith('|')) {
      para.push(lines[i].trim());
      i++;
    }
    const text = para.join(' ');
    if (LINK_ONLY.test(text)) {
      const m = LINK_ONLY.exec(text)!;
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'cta') last.links.push({ label: m[1], href: m[2] });
      else blocks.push({ type: 'cta', links: [{ label: m[1], href: m[2] }] });
    } else {
      blocks.push({ type: 'p', text });
    }
  }
  return blocks;
}

function SmartLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  if (href.startsWith('/')) return <Link href={href} className={className}>{children}</Link>;
  const external = href.startsWith('http');
  return (
    <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

// Inline formatting: links, ***bold italic***, **bold**, *italic*, escapes.
function inline(text: string, key = 'i'): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(?!\s)(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  const clean = (s: string) => s.replace(/\\([*_#\[\]()])/g, '$1');
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(clean(text.slice(last, m.index)));
    const k = `${key}-${n++}`;
    if (m[1]) out.push(<SmartLink key={k} href={m[2]} className="text-pink-300 underline underline-offset-4 hover:text-pink-200">{inline(m[1], k)}</SmartLink>);
    else if (m[3]) out.push(<strong key={k}><em>{inline(m[3], k)}</em></strong>);
    else if (m[4]) out.push(<strong key={k} className="text-white">{inline(m[4], k)}</strong>);
    else if (m[5]) out.push(<em key={k}>{inline(m[5], k)}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(clean(text.slice(last)));
  return out;
}

const H_CLASS: Record<number, string> = {
  1: 'text-4xl sm:text-5xl font-light tracking-tight text-white mb-6',
  2: 'text-2xl sm:text-3xl font-light text-white mt-14 mb-4',
  3: 'text-xl sm:text-2xl font-light text-white mt-10 mb-3',
  4: 'text-lg font-medium text-pink-200 mt-8 mb-2',
  5: 'text-base font-medium text-pink-200 mt-6 mb-2',
  6: 'text-sm font-medium uppercase tracking-wider text-white/70 mt-6 mb-2',
};

export default function Markdown({ source, skipFirstH1 = false }: { source: string; skipFirstH1?: boolean }) {
  let blocks = parse(source);
  if (skipFirstH1 && blocks[0]?.type === 'h' && blocks[0].level === 1) blocks = blocks.slice(1);

  return (
    <div className="text-white/75 leading-relaxed text-[17px]">
      {blocks.map((b, idx) => {
        const k = `b${idx}`;
        switch (b.type) {
          case 'h': {
            const Tag = `h${b.level}` as 'h1';
            return <Tag key={k} className={H_CLASS[b.level]}>{inline(b.text, k)}</Tag>;
          }
          case 'p':
            return <p key={k} className="my-4">{inline(b.text, k)}</p>;
          case 'ul':
            return (
              <ul key={k} className="my-4 space-y-2 list-disc pl-6 marker:text-pink-300">
                {b.items.map((it, j) => <li key={j}>{inline(it, `${k}-${j}`)}</li>)}
              </ul>
            );
          case 'ol':
            return (
              <ol key={k} className="my-4 space-y-2 list-decimal pl-6 marker:text-pink-300">
                {b.items.map((it, j) => <li key={j}>{inline(it, `${k}-${j}`)}</li>)}
              </ol>
            );
          case 'table':
            return (
              <div key={k} className="my-6 overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm sm:text-base">
                  <thead className="bg-white/5 text-white">
                    <tr>{b.head.map((c, j) => <th key={j} className="px-4 py-3 font-medium">{inline(c, `${k}-h${j}`)}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-white/10">
                        {r.map((c, x) => <td key={x} className="px-4 py-3 align-top">{inline(c, `${k}-${j}-${x}`)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'img':
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={k} src={b.src} alt={b.alt} loading="lazy" className="my-4 w-40 h-60 object-cover rounded-2xl" />
            );
          case 'cta':
            return (
              <div key={k} className="my-6 flex flex-wrap gap-3">
                {b.links.map((l, j) => {
                  const primary = /book/i.test(l.label);
                  return (
                    <SmartLink
                      key={j}
                      href={l.href}
                      className={
                        primary
                          ? 'px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 text-sm font-semibold tracking-wide hover:shadow-lg hover:shadow-pink-300/40 transition'
                          : 'px-6 py-2.5 rounded-full border border-white/20 text-white text-sm tracking-wide hover:bg-white/10 transition'
                      }
                    >
                      {l.label}
                    </SmartLink>
                  );
                })}
              </div>
            );
          case 'hr':
            return <hr key={k} className="my-10 border-white/10" />;
        }
      })}
    </div>
  );
}
