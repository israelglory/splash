/**
 * ==========================================================================
 * PLACEHOLDER: connect an email provider here.
 * ==========================================================================
 *
 * The Launchpad "Register your interest" form calls this function. It
 * currently pretends to succeed so the form can be designed and tested.
 *
 * To go live, replace the body with a call to your provider. Because the site
 * is a static export there is no server, so use a provider that accepts
 * submissions straight from the browser, for example:
 *
 *   // Formspree / Basin / Getform style endpoint
 *   const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json", Accept: "application/json" },
 *     body: JSON.stringify({ email, list: "launchpad-2027" }),
 *   });
 *   if (!res.ok) throw new Error(`Subscribe failed: ${res.status}`);
 *
 * Mailchimp, ConvertKit, Loops, Brevo and Buttondown all offer an embeddable
 * form endpoint that works the same way. Throw on failure; the form shows its
 * error state for any thrown error.
 */
export async function registerInterest(email: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Development only: use an address starting with "fail@" to preview the error state.
  if (process.env.NODE_ENV !== "production" && email.toLowerCase().startsWith("fail@")) {
    throw new Error("Simulated failure");
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[registerInterest] placeholder received:", email);
  }
}
