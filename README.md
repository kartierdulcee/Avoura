<div align="center">
  <h1>Auvora - Cookies, Elevated</h1>
  <p>Luxurious one-page experience for a premium cookie house. Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Stripe.</p>
</div>

## ✨ Features
- Hero with animated gradients and refined typography (Playfair Display + Inter)
- Curated cookie collection with motion-rich cards and cart management
- Stripe Checkout plus Tap-to-Pay via Payment Request Button (Apple Pay & Google Pay)
- Scroll-triggered storytelling and minimal footer with Instagram touchpoint
- Fully responsive, whitespace-forward layout ready for Vercel deployment

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template and add your Stripe keys:
   ```bash
   cp .env.example .env.local
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000` to explore the experience.

The project uses the Next.js App Router. All sections live inside `src/components`, while API routes reside under `src/app/api`.

## 🔐 Environment Variables
| Variable | Description |
| -------- | ----------- |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key used on the client for Elements and Tap-to-Pay. |
| `STRIPE_SECRET_KEY` | Stripe secret key for creating Checkout sessions and PaymentIntents. |
| `NEXT_PUBLIC_SITE_URL` | (Optional) Absolute production URL for generating Stripe success/cancel redirects. |
| `STRIPE_PRICE_<SELECTION_ID>` | Price IDs for each product/variant/size combination used at Checkout. Example: `STRIPE_PRICE_OATMEAL_RAISIN_GLUTEN_FREE_BOX_3=price_123`. |

> Apple Pay and Google Pay require a verified domain. Stripe's dashboard includes step-by-step domain verification for Tap-to-Pay.

### Configuring reusable Stripe Prices
1. In the Stripe Dashboard (Live mode), create a **Product** for each flavor/variant/size you plan to sell (e.g., “Oatmeal Raisin · Gluten Free · Box of 3”) and assign a recurring **Price** with the correct USD amount.
2. Copy every generated `price_xxx` identifier and store it in `.env.local` (and your hosting provider) using the naming pattern `STRIPE_PRICE_<PRODUCT>_<VARIANT>_<SIZE>` where each part is uppercase and uses underscores instead of hyphens.
   - Example selection id `oatmeal-raisin-gluten-free-box-3` maps to `STRIPE_PRICE_OATMEAL_RAISIN_GLUTEN_FREE_BOX_3`.
3. Redeploy. The server now looks up the official Price ID for each cart item, so Checkout is always tied to catalogued Stripe SKUs.

## 💳 Stripe Configuration
- Checkout flow: `/api/checkout` creates a Stripe Checkout Session.
- Tap-to-Pay: `/api/payment-intent` provisions PaymentIntents for the Payment Request Button.
- Update `src/lib/products.ts` to adjust product catalogue, pricing, or imagery.

## 📦 Available Scripts
| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the local dev server. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run linting with the Next.js config. |

## ☁️ Deploying on Vercel
1. Push this repository to GitHub (or your preferred Git host).
2. Import the project in [Vercel](https://vercel.com/import).
3. Provide the environment variables above within the Vercel dashboard.
4. Trigger a deployment - Vercel handles build and CDN distribution automatically.

## 📝 Notes
- Imagery lives in `public/images` and can be swapped for photography when ready.
- Tailwind CSS v4 is configured via `src/app/globals.css` using `@theme` tokens for the palette.
- Cart quantities cap at 5 units per cookie to maintain an intimate tasting set - adjust in `LandingPage.tsx` if needed.

Enjoy crafting indulgent digital experiences with Auvora. 🥂
