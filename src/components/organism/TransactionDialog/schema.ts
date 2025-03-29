import * as z from "zod";

export const transactionFormSchema = z.object({
  tokenId: z.string().min(1).max(255).trim(),
  symbol: z.string().min(1).max(255).trim(),
  name: z.string().min(1).max(255).trim(),
  image: z.string().min(1).max(255).trim(),
  purchasePrice: z.number(),
  amount: z.number(),
});

export type TransactionFormType = z.infer<typeof transactionFormSchema>;
