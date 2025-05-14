import { LoadingScreen } from "./loading-screen";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { LoadingWrapper } from "@/components/loading-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Screen,
  ScreenContent,
  ScreenHeader,
  ScreenTitle,
} from "@/components/ui/screen";
import { useGrispi } from "@/contexts/grispi-context";
import { convertPhoneNumber } from "@/lib/utils";
import { OrderItem } from "@/components/order-item";
import { searchOrderByPhone, SearchOrderByPhoneResponse } from "@/api/nebim";

export const OrdersScreen = observer(() => {
  const { loading, bundle } = useGrispi();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderData, setOrderData] = useState<
    SearchOrderByPhoneResponse | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const requesterPhoneNumber = bundle?.context.requester.phone;

  useEffect(() => {
    if (requesterPhoneNumber) {
      setPhoneNumber(requesterPhoneNumber);
      fetchOrders(requesterPhoneNumber);
    }
  }, [requesterPhoneNumber]);

  const fetchOrders = async (phone: string) => {
    if (!bundle?.context.token) return;

    const formattedPhone = convertPhoneNumber(phone);

    if (!formattedPhone) {
      toast.error("Geçersiz telefon numarası");
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchOrderByPhone(formattedPhone);

      setOrderData(response);
    } catch (error) {
      console.error("Sipariş aranamadı:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <ScreenHeader>
        <ScreenTitle>Nebim Kargo Durumları</ScreenTitle>
      </ScreenHeader>
      <ScreenContent>
        <LoadingWrapper loading={isLoading}>
          <div className="flex flex-col gap-3 p-6">
            <div className="flex flex-col gap-4">
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetchOrders(phoneNumber);
                  }}
                  className="flex items-center"
                >
                  <Input
                    type="tel"
                    autoFocus
                    placeholder="Telefon Numarası"
                    value={phoneNumber}
                    className="bg-white rounded-e-none"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Button type="submit" className="rounded-s-none">Ara</Button>
                </form>
                {orderData && orderData.length === 0 && (
                  <div className="flex gap-2 items-center px-3 py-2 pt-4 -mt-2 text-xs font-medium rounded-b-lg text-destructive bg-destructive/10">
                    <ExclamationTriangleIcon className="size-3" />
                    <span>Bu numaraya ait bir kayıt yok.</span>
                  </div>
                )}
              </div>

              {orderData && (
                <div className="flex flex-col divide-y *:py-2 *:text-sm space-y-2">
                  {orderData.map((order) => (
                    <OrderItem key={order.OrderNumber} order={order} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </LoadingWrapper>
      </ScreenContent>
    </Screen>
  );
});
