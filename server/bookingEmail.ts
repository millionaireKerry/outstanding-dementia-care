/**
 * Booking confirmation email helper.
 * Uses the HighLevel v2 Conversations API to send a branded HTML confirmation
 * email to the customer after a successful Stripe payment.
 *
 * Flow:
 *  1. Upsert the contact in HighLevel (createHighLevelContact already handles this).
 *  2. POST to /conversations/messages with type "Email".
 */

import { ENV } from "./_core/env";
import { createHighLevelContact } from "./highlevel";

const HL_API_BASE = "https://services.leadconnectorhq.com";
const API_KEY = ENV.highLevelApiKey;
const LOCATION_ID = ENV.highLevelLocationId;

export interface BookingConfirmationParams {
  customerEmail: string;
  customerName?: string;
  productName: string;
  bookingDate?: string; // "YYYY-MM-DD"
  amount: number; // pence
  courseKey?: string;
}

/** Format a YYYY-MM-DD string as "Monday 14 April 2026" */
function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Build the branded HTML email body */
function buildEmailHtml(params: BookingConfirmationParams): string {
  const { customerName, productName, bookingDate, amount } = params;
  const formattedAmount = `£${(amount / 100).toFixed(2)}`;
  const formattedDate = bookingDate ? formatDate(bookingDate) : null;
  const greeting = customerName ? `Hi ${customerName.split(" ")[0]},` : "Hello,";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmed — Outstanding Dementia Care</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0e8;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border:3px solid #2d4a3e;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#2d4a3e;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#a8c5b5;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Outstanding Dementia Care</p>
              <h1 style="margin:8px 0 0;font-size:28px;color:#f5f0e8;font-family:Georgia,serif;font-weight:normal;">Booking Confirmed ✓</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 20px;font-size:16px;color:#2d4a3e;line-height:1.6;">${greeting}</p>
              <p style="margin:0 0 20px;font-size:16px;color:#333;line-height:1.6;">
                Thank you so much for booking with Outstanding Dementia Care. I'm really looking forward to working with you and your team.
              </p>

              <!-- Booking summary box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0e8;border:2px solid #2d4a3e;border-radius:6px;margin:24px 0;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 6px;font-size:12px;color:#6b7c74;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Your Booking</p>
                    <p style="margin:0 0 16px;font-size:20px;color:#2d4a3e;font-weight:bold;">${productName}</p>
                    ${formattedDate ? `
                    <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                      <tr>
                        <td style="font-size:13px;color:#6b7c74;font-family:Arial,sans-serif;padding-right:12px;">Date</td>
                        <td style="font-size:15px;color:#2d4a3e;font-weight:bold;font-family:Arial,sans-serif;">${formattedDate}</td>
                      </tr>
                    </table>` : ""}
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:13px;color:#6b7c74;font-family:Arial,sans-serif;padding-right:12px;">Amount paid</td>
                        <td style="font-size:15px;color:#2d4a3e;font-weight:bold;font-family:Arial,sans-serif;">${formattedAmount}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px;font-size:16px;color:#333;line-height:1.6;">
                I will be in touch within <strong>24 hours</strong> to confirm the details and send you everything you need to prepare for the session.
              </p>

              <p style="margin:0 0 20px;font-size:16px;color:#333;line-height:1.6;">
                In the meantime, if you have any questions at all, please don't hesitate to get in touch:
              </p>

              <!-- Contact box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#2d4a3e;border-radius:6px;margin:0 0 28px;">
                <tr>
                  <td style="padding:20px 28px;text-align:center;">
                    <p style="margin:0 0 6px;font-size:14px;color:#a8c5b5;font-family:Arial,sans-serif;">Kerry — Outstanding Dementia Care</p>
                    <a href="mailto:kerry@outstandingdementiacare.com" style="color:#f5f0e8;font-size:15px;font-family:Arial,sans-serif;text-decoration:none;">kerry@outstandingdementiacare.com</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:16px;color:#333;line-height:1.6;">
                With warm wishes,<br />
                <strong style="color:#2d4a3e;">Kerry</strong><br />
                <span style="font-size:14px;color:#6b7c74;">Outstanding Dementia Care</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f5f0e8;border-top:2px solid #d4c9b0;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#6b7c74;font-family:Arial,sans-serif;">
                © 2026 Outstanding Dementia Care · <a href="https://outstandingdementiacare.com" style="color:#2d4a3e;">outstandingdementiacare.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send a booking confirmation email via HighLevel.
 * Returns true on success, false on any failure (non-throwing).
 */
export async function sendBookingConfirmationEmail(
  params: BookingConfirmationParams
): Promise<boolean> {
  const { customerEmail, customerName, productName } = params;

  if (!customerEmail || customerEmail === "unknown") {
    console.warn("[BookingEmail] No customer email — skipping confirmation email");
    return false;
  }

  if (!API_KEY || !LOCATION_ID) {
    console.warn("[BookingEmail] HighLevel API key or location ID not set — skipping");
    return false;
  }

  try {
    // Step 1: Upsert contact in HighLevel to get a contactId
    const nameParts = (customerName ?? "").trim().split(" ");
    const contact = await createHighLevelContact({
      email: customerEmail,
      firstName: nameParts[0] || undefined,
      lastName: nameParts.slice(1).join(" ") || undefined,
      source: "Website - Training Booking",
      tags: ["training-booking", params.courseKey ?? "unknown-course"],
    });

    if (!contact?.id) {
      console.error("[BookingEmail] Could not create/find HighLevel contact");
      return false;
    }

    // Step 2: Send email via HighLevel v2 Conversations API
    const html = buildEmailHtml(params);
    const subject = `Booking confirmed: ${productName}${params.bookingDate ? ` — ${formatDate(params.bookingDate)}` : ""}`;

    const response = await fetch(`${HL_API_BASE}/conversations/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Version: "2021-04-15",
      },
      body: JSON.stringify({
        type: "Email",
        contactId: contact.id,
        subject,
        html,
        locationId: LOCATION_ID,
        fromEmail: "kerry@outstandingdementiacare.com",
        fromName: "Kerry — Outstanding Dementia Care",
        replyToEmail: "kerry@outstandingdementiacare.com",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[BookingEmail] HighLevel send failed: ${response.status} — ${errorText}`);
      return false;
    }

    const result = await response.json();
    console.log(`[BookingEmail] Confirmation email sent to ${customerEmail} (messageId: ${result?.messageId ?? "unknown"})`);
    return true;
  } catch (err) {
    console.error("[BookingEmail] Unexpected error:", err);
    return false;
  }
}
