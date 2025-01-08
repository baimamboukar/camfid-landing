import TRANZAK from "tranzak-node";

export default defineEventHandler(async (event) => {
  try {
    // Get webhook data
    const body = await readBody(event);
    console.log("📫 Received Tranzak webhook:", body);

    const { mchTransactionRef } = body;

    // Initialize Tranzak client
    const client = new TRANZAK({
      appId: process.env.TRANZAK_APP_ID,
      appKey: process.env.TRANZAK_APP_KEY,
      mode: "sandbox",
    });

    // Get transaction status
    const transaction = await client.payment.collection.simple.getTransaction(
      mchTransactionRef
    );
    await transaction.refresh();

    if (transaction.data.status === "SUCCESSFUL") {
      const supabase = serverSupabaseClient(event);

      // Update investment status
      await supabase
        .from("investments")
        .update({
          payment_status: "completed",
          payment_reference: transaction.data.transactionId,
          completed_at: new Date().toISOString(),
        })
        .eq("transaction_ref", mchTransactionRef);

      // Redirect to success page
      return sendRedirect(event, `/invest-confirm?ref=${mchTransactionRef}`);
    }

    // If payment failed
    return sendRedirect(event, "/invest?error=payment_failed");
  } catch (error) {
    console.error("Webhook processing error:", error);
    return { success: false };
  }
});
