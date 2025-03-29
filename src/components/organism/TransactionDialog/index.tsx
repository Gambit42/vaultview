import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import activeCryptoStore from "@/context/activeCryptoStore";
import Image from "next/image";
import Text from "@/components/atoms/Text";
import { Label } from "@/components/ui/label";
import CurrencySymbol from "@/components/atoms/CurrencySymbol";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TransactionFormType, transactionFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import currencyStore from "@/context/currencyStore";
import authClientInterceptor from "@/lib/authClientInterceptor";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { handleConvertToUsdt } from "@/lib/numbers";

const TransactionDialog: React.FC<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  usdtPrice: number;
}> = ({ isOpen, setIsOpen, usdtPrice }) => {
  const { currency } = currencyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activeCrypto, setActiveCrypto } = activeCryptoStore();

  const { register, handleSubmit, setValue } = useForm<TransactionFormType>({
    resolver: zodResolver(transactionFormSchema),
  });
  type FormData = z.infer<typeof transactionFormSchema>;

  const onFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const purchasePriceInUsdt = handleConvertToUsdt(
      currency,
      data.purchasePrice,
      usdtPrice
    );

    try {
      const result = await authClientInterceptor.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-transaction`,
        {
          tokenId: data.tokenId,
          symbol: data.symbol,
          name: data.name,
          image: data.image,
          amount: data.amount,
          originalPurchasePriceCurrency: currency,
          originalPurchasePrice: data.purchasePrice,
          purchasePriceInUsdt: purchasePriceInUsdt,
        },
        {
          withCredentials: true,
        }
      );
      console.log("result", result);

      setTimeout(() => {
        setIsSubmitting(false);
        setIsOpen(false);
        toast.success("Transaction saved.");
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      console.log("error", error);
    }
  };

  const handleSetDefaultCryptoValues = () => {
    setValue("tokenId", activeCrypto.tokenId);
    setValue("name", activeCrypto.name);
    setValue("symbol", activeCrypto.symbol);
    setValue("image", activeCrypto.image);
    setValue("purchasePrice", activeCrypto.currentPrice);
  };

  useEffect(() => {
    handleSetDefaultCryptoValues();

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [activeCrypto]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
        setActiveCrypto({
          tokenId: "",
          name: "",
          image: "",
          symbol: "",
          currentPrice: 0,
        });
      }}
    >
      <DialogContent className="sm:max-w-[425px] font-poppins">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {" "}
            <div className="flex flex-col space-y-4 !mt-6">
              <div className="flex flex-row items-center gap-2 ">
                {activeCrypto.image && (
                  <Image
                    width={24}
                    height={24}
                    className="rounded-full"
                    src={activeCrypto.image}
                    alt="coin-image"
                  />
                )}
                <Text
                  className="uppercase font-medium"
                  as="p"
                  styleVariant="T3"
                >
                  {activeCrypto.name}
                </Text>
                <Text className="uppercase" as="p" styleVariant="T3">
                  {activeCrypto.symbol}
                </Text>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="flex flex-row items-center space-x-2 ">
                    <div className="flex flex-row border p-2 w-full rounded-lg">
                      <CurrencySymbol />
                      <input
                        className="ml-1 bg-transparent !ring-0 outline-none w-full"
                        type="decimal"
                        {...register("purchasePrice", { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="price">Amount</Label>
                  <div className="flex flex-row items-center space-x-2 ">
                    <div className="flex flex-row border p-2 w-full rounded-lg">
                      <input
                        className="ml-1 bg-transparent !ring-0 outline-none w-full"
                        type="decimal"
                        {...register("amount", { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </div>
              </div>{" "}
              <Button type="submit">
                {isSubmitting ? (
                  <div className="flex flex-row items-center space-x-2">
                    <Loader2 className="animate-spin" />
                    <p>Saving Transaction...</p>
                  </div>
                ) : (
                  "Save Transaction"
                )}
              </Button>
            </div>{" "}
          </form>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
