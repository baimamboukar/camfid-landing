// server/api/payments/initialize.post.ts
import { createTranzakClient } from "../../utils/tranzak";
import shortUUID from "short-uuid";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { amount, investment_id } = body;
    console.log("🚀 Initializing payment for investment:", body);
    // Initialize Tranzak client
    const client = createTranzakClient();

    // Generate transaction reference
    const mchTransactionRef = shortUUID.generate();

    // Initialize payment with web redirect
    const transaction =
      await client.payment.collection.simple.chargeByWebRedirect({
        amount: amount,
        currencyCode: "XAF",
        description: "CAMFID Engineering Investment",
        payerNote: "Investment in CAMFID Engineering",
        mchTransactionRef: mchTransactionRef,
        callbackUrl: `${process.env.PUBLIC_API_URL}/api/webhooks/tranzak`,
      });

    // Update investment with transaction reference
    const supabase = serverSupabaseClient(event);
    await supabase
      .from("investments")
      .update({
        transaction_ref: mchTransactionRef,
        payment_status: "pending",
      })
      .eq("id", investment_id);

    // Return the payment URL
    return {
      success: true,
      payment_url: transaction.links.paymentAuthUrl,
    };
  } catch (error) {
    console.error("Payment initialization failed:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to initialize payment",
    });
  }
});
