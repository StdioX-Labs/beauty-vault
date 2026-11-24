import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const TRIBE = "https://lashtribeafrica.com";
    // old WooCommerce product slug -> Lash Tribe product slug (all checked live on 2026-11-24)
    const PRODUCTS: Record<string, string> = {
      "high-quality-individual-easy-fan-lashes": "easy-fan-lashes",
      "high-quality-individual-classic-lashes": "classic-lashes",
      "super-lash-bond-and-primer-for-individual-lashes": "primer",
      "fadvan-60ml-eyelash-foam-cleanser": "lash-shampoo-60ml",
      "advan-glue-remover": "lash-gel-remover-10g",
      "eyelashes-glue": "lash-glue-10ml",
      "hydrogen-gel-pads": "eyepads",
      "jade-stone-for-glue": "jade-stone-for-glue",
      "lash-micro-brushes-swabs": "microbrush",
      "lash-spoolies-brush": "lash-brush-spoolies",
      "lash-training-strip": "lash-training-strip",
      "non-woven-lash-tape": "lash-tape",
      "silicone-air-blower-for-eyelash-extensions": "lta-mini-air-blower",
      "standard-stainless-tweezers-straight-150mm": "tweezers",
      "training-mannequin-head": "training-mannequin-head",
    };
    return [
      // The shop moved to Lash Tribe Africa. Each old product goes to its matching Lash Tribe product page.
      ...Object.entries(PRODUCTS).map(([old, now]) => ({
        source: `/shop/lashes-and-accessories/${old}`,
        destination: `${TRIBE}/ecommerce/product/${now}`,
        permanent: true,
      })),
      // Old shop category and listing pages go to the Lash Tribe shop.
      { source: "/shop", destination: `${TRIBE}/shop`, permanent: true },
      { source: "/shop/page/:n", destination: `${TRIBE}/shop`, permanent: true },
      { source: "/shop/lashes-and-accessories", destination: `${TRIBE}/shop`, permanent: true },
      { source: "/product-category/lashes-and-accessories", destination: `${TRIBE}/shop`, permanent: true },
      { source: "/product-category/lashes-and-accessories/page/:n", destination: `${TRIBE}/shop`, permanent: true },
      { source: "/product-category/uncategorized", destination: `${TRIBE}/shop`, permanent: true },
      { source: "/product/:path*", destination: `${TRIBE}/shop`, permanent: true },
      { source: "/cart", destination: `${TRIBE}/`, permanent: true },
      { source: "/checkout", destination: `${TRIBE}/`, permanent: true },
      { source: "/my-account", destination: `${TRIBE}/`, permanent: true },
      // Retired training products and the training category: the Academy page is the closest match.
      { source: "/product-category/training", destination: "/training", permanent: true },
      { source: "/shop/training", destination: "/training", permanent: true },
      { source: "/shop/training/glam-mastery", destination: "/training", permanent: true },
      { source: "/shop/uncategorized/group-trainings", destination: "/training", permanent: true },
      // Anything else under /shop or /product-category that we did not list.
      { source: "/shop/:path*", destination: `${TRIBE}/shop`, permanent: true },
      { source: "/product-category/:path*", destination: `${TRIBE}/shop`, permanent: true },
      // Old WordPress pages and archives that have no page of their own.
      { source: "/blog", destination: "/category/lashes", permanent: true },
      { source: "/blog6", destination: "/category/lashes", permanent: true },
      { source: "/blog/:path*", destination: "/category/lashes", permanent: true },
      { source: "/category/uncategorized", destination: "/category/lashes", permanent: true },
      { source: "/author/:path*", destination: "/category/lashes", permanent: true },
      { source: "/tag/:path*", destination: "/category/lashes", permanent: true },
      { source: "/2025/:path*", destination: "/category/lashes", permanent: true },
      { source: "/our-services", destination: "/services", permanent: true },
      { source: "/booking-page", destination: "/book", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/page/:n", destination: "/", permanent: true },
      // /book is the booking page (app/book/page.tsx). /book/<tech or branch> is handled by
      // app/book/[slug]/route.ts, which counts each open first.
    ];
  },
};

export default nextConfig;
