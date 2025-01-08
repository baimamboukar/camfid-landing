export const usePayment = () => {
  const config = useRuntimeConfig();

  const initializePayment = async (investment: any) => {
    // Create payment session
    const response = await $fetch("/api/payments/initialize", {
      method: "POST",
      body: {
        amount: investment.total_amount,
        transaction_id: investment.transaction_id,
        payment_method: investment.payment_method,
        webhook_url: `${config.public.apiBase}/webhooks/payment`,
        return_url: `${config.public.appUrl}/invest-confirm`,
        cancel_url: `${config.public.appUrl}/invest`,
      },
    });

    return response;
  };

  return {
    initializePayment,
  };
};
