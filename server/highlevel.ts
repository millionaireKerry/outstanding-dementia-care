import { ENV } from "./_core/env";

const HIGHLEVEL_API_BASE = "https://rest.gohighlevel.com/v1";
const API_KEY = ENV.highLevelApiKey;
const LOCATION_ID = ENV.highLevelLocationId;

interface HighLevelContact {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  source?: string;
  tags?: string[];
  customFields?: Record<string, string>;
}

/**
 * Create or update a contact in HighLevel
 */
export async function createHighLevelContact(
  contact: HighLevelContact
): Promise<{ id: string; email: string } | null> {
  try {
    const response = await fetch(
      `${HIGHLEVEL_API_BASE}/contacts/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationId: LOCATION_ID,
          ...contact,
          source: contact.source || "Website - Ebook Download",
          tags: contact.tags || ["ebook-download"],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error(
        `[HighLevel] Failed to create contact: ${response.status} - ${error}`
      );
      return null;
    }

    const data = await response.json();
    console.log(`[HighLevel] Contact created: ${data.id}`);
    return { id: data.id, email: contact.email || "" };
  } catch (error) {
    console.error("[HighLevel] Error creating contact:", error);
    return null;
  }
}

/**
 * Trigger a workflow for a contact
 */
export async function triggerHighLevelWorkflow(
  contactId: string,
  workflowId: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `${HIGHLEVEL_API_BASE}/contacts/${contactId}/workflow/${workflowId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error(
        `[HighLevel] Failed to trigger workflow: ${response.status} - ${error}`
      );
      return false;
    }

    console.log(`[HighLevel] Workflow triggered for contact: ${contactId}`);
    return true;
  } catch (error) {
    console.error("[HighLevel] Error triggering workflow:", error);
    return false;
  }
}

/**
 * Send an email to a contact
 */
export async function sendHighLevelEmail(
  contactId: string,
  subject: string,
  body: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `${HIGHLEVEL_API_BASE}/contacts/${contactId}/emails`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          body,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error(
        `[HighLevel] Failed to send email: ${response.status} - ${error}`
      );
      return false;
    }

    console.log(`[HighLevel] Email sent to contact: ${contactId}`);
    return true;
  } catch (error) {
    console.error("[HighLevel] Error sending email:", error);
    return false;
  }
}

/**
 * Get contact details from HighLevel
 */
export async function getHighLevelContact(
  contactId: string
): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(
      `${HIGHLEVEL_API_BASE}/contacts/${contactId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        `[HighLevel] Failed to get contact: ${response.status}`
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[HighLevel] Error getting contact:", error);
    return null;
  }
}
