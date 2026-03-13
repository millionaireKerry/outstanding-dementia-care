/**
 * Stripe webhook handler for Outstanding Dementia Care.
 * Registers the /api/stripe/webhook route on the Express app.
 * Must be called BEFORE express.json() middleware.
 */

import type { Express } from "express";
import Stripe from "stripe";
import { notifyOwner } from "./_core/notification";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-02-25.clover",
});

export function registerStripeWebhook(app: Express) {
  // MUST use raw body parser for Stripe signature verification
  app.post(
    "/api/stripe/webhook",
    // express.raw is applied per-route here
    (req, res, next) => {
      // Buffer the raw body for signature verification
      let data = "";
      req.setEncoding("utf8");
      req.on("data", (chunk) => { data += chunk; });
      req.on("end", () => {
        (req as any).rawBody = data;
        next();
      });
    },
    async (req, res) => {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          (req as any).rawBody,
          sig as string,
          webhookSecret
        );
      } catch (err: any) {
        console.error("[Stripe Webhook] Signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle test events
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Stripe Webhook] Event received: ${event.type} (${event.id})`);

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const customerEmail = session.customer_details?.email ?? session.metadata?.customer_email ?? "unknown";
          const productName = session.metadata?.product_name ?? "Unknown product";
          const amount = session.amount_total ? `£${(session.amount_total / 100).toFixed(2)}` : "unknown";

          console.log(`[Stripe] Payment completed: ${productName} by ${customerEmail} for ${amount}`);

          // Notify site owner
          await notifyOwner({
            title: `New booking: ${productName}`,
            content: `${customerEmail} has booked ${productName} for ${amount}. Check your Stripe dashboard for details.`,
          });
          break;
        }

        case "payment_intent.succeeded": {
          const intent = event.data.object as Stripe.PaymentIntent;
          console.log(`[Stripe] PaymentIntent succeeded: ${intent.id}`);
          break;
        }

        case "payment_intent.payment_failed": {
          const intent = event.data.object as Stripe.PaymentIntent;
          console.log(`[Stripe] PaymentIntent failed: ${intent.id}`);
          break;
        }

        default:
          console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    }
  );
}

/**
 * Create a Stripe Checkout Session for a product.
 */
export async function createCheckoutSession(params: {
  productKey: string;
  productName: string;
  amount: number;
  currency: string;
  customerEmail?: string;
  userId?: string;
  origin: string;
  successPath?: string;
  cancelPath?: string;
}): Promise<{ url: string }> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: params.currency,
          product_data: {
            name: params.productName,
          },
          unit_amount: params.amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer_email: params.customerEmail,
    client_reference_id: params.userId,
    metadata: {
      product_key: params.productKey,
      product_name: params.productName,
      user_id: params.userId ?? "",
      customer_email: params.customerEmail ?? "",
    },
    allow_promotion_codes: true,
    success_url: `${params.origin}${params.successPath ?? "/family-workshop?booked=true"}`,
    cancel_url: `${params.origin}${params.cancelPath ?? "/family-workshop?cancelled=true"}`,
  });

  return { url: session.url! };
}
