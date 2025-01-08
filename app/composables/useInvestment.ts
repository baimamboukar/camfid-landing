export const useInvestment = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const router = useRouter();

  const createInvestment = async (investmentData: {
    numberOfShares: number;
    amount_per_share: number;
    total_amount: number;
    payment_method: string;
    user_name: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from("investments")
        .insert({
          user_id: user.value?.id,
          number_of_shares: investmentData.numberOfShares,
          amount_per_share: investmentData.amount_per_share,
          total_amount: investmentData.total_amount,
          payment_method: investmentData.payment_method,
          payment_status: "pending",
          transaction_id: `TRX-${Math.random().toString(36).substr(2, 9)}`,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating investment:", error);
      throw error;
    }
  };

  return {
    createInvestment,
  };
};
