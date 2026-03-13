import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Support reverse proxy with /aesthetics subpath prefix.
  // When a reverse proxy (e.g. Caddy) rewrites requests like:
  //   rewrite * /aesthetics{uri}
  // all requests arrive with an /aesthetics prefix. This middleware
  // strips that prefix from internal asset paths so they load correctly.

  // Prevent trailing-slash redirect loop:
  // /aesthetics/ would normally 308 → /aesthetics, but the browser
  // follows the redirect back through the proxy which prepends the
  // prefix again (/aesthetics/aesthetics → 404).
  if (pathname === '/aesthetics/') {
    const url = request.nextUrl.clone();
    url.pathname = '/aesthetics';
    return NextResponse.rewrite(url);
  }

  // Rewrite /aesthetics/_next/* → /_next/* so JS, CSS, fonts, images
  // and other build assets are served correctly.
  if (pathname.startsWith('/aesthetics/_next/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice('/aesthetics'.length);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/aesthetics/', '/aesthetics/_next/:path*'],
};
