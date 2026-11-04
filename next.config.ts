import type { NextConfig } from "next";
import { TECHS, BRANCH_SLUGS, BOOKING_BASE, techBookingUrl, branchBookingUrl } from "./lib/techs";

// Clean, shareable booking links, e.g. lashesbyshazz.com/book/linda.
// Temporary (307) redirects, so a staff id can change without browsers remembering the old one.
const nextConfig: NextConfig = {
  async redirects() {
    const SHOP = "https://lashtribeafrica.com/";
    return [
      // The shop moved to Lash Tribe Africa. Send old shop links there until each product has its own page.
      { source: "/shop", destination: SHOP, permanent: true },
      { source: "/shop/:path*", destination: SHOP, permanent: true },
      { source: "/product/:path*", destination: SHOP, permanent: true },
      { source: "/product-category/:path*", destination: SHOP, permanent: true },
      { source: "/cart", destination: SHOP, permanent: true },
      { source: "/checkout", destination: SHOP, permanent: true },
      { source: "/my-account", destination: SHOP, permanent: true },
      { source: "/blog", destination: "/category/lashes", permanent: true },
      { source: "/book", destination: `${BOOKING_BASE}/appointments`, permanent: false },
      ...Object.entries(BRANCH_SLUGS).map(([slug, id]) => ({
        source: `/book/${slug}`,
        destination: branchBookingUrl(id),
        permanent: false,
      })),
      ...TECHS.map((t) => ({
        source: `/book/${t.slug}`,
        destination: techBookingUrl(t.staffId),
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
