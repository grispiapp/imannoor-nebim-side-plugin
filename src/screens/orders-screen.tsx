import { LoadingScreen } from "./loading-screen";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

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
import { fetchOrdersByQuery } from "@/lib/utils";
import { OrderItem } from "@/components/order-item";
import { SearchOrderByPhoneResponse } from "@/api/nebim";

export const OrdersScreen = observer(() => {
  const { loading, bundle } = useGrispi();
  const [searchQuery, setSearchQuery] = useState("");
  const [orderData, setOrderData] = useState<
    SearchOrderByPhoneResponse | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const requesterPhoneNumber = bundle?.context?.requester?.phone;

  useEffect(() => {
    if (requesterPhoneNumber) {
      setSearchQuery(requesterPhoneNumber);
      fetchOrders(requesterPhoneNumber);
    }
  }, [requesterPhoneNumber]);

  const fetchOrders = async (query: string) => {
    if (!bundle?.context.token) return;

    setIsLoading(true);

    try {
      const response = await fetchOrdersByQuery(query, bundle.context.token);
      if (response) {
        setOrderData(response);
      }
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
        <div className="flex flex-col gap-3 p-6">
          <div className="flex flex-col gap-4">
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchOrders(searchQuery);
                }}
                className="flex items-center"
              >
                <Input
                  type="tel"
                  autoFocus
                  placeholder="Telefon Numarası veya Sipariş No (TS...)"
                  value={searchQuery}
                  className="bg-white rounded-e-none"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="rounded-s-none" disabled={isLoading}>Ara</Button>
              </form>
              {!isLoading && orderData && orderData.data.length === 0 && (
                <div className="flex gap-2 items-center px-3 py-2 pt-4 -mt-2 text-xs font-medium rounded-b-lg text-destructive bg-destructive/10">
                  <ExclamationTriangleIcon className="size-3" />
                  <span>Bu numaraya ait bir kayıt yok.</span>
                </div>
              )}
            </div>

            <LoadingWrapper loading={isLoading}>
              {orderData && (
                <div className="flex flex-col divide-y *:py-2 *:text-sm space-y-2">
                  {orderData.data.map((order) => (
                    <OrderItem key={order.OrderNumber} order={order} />
                  ))}
                </div>
              )}
            </LoadingWrapper>
          </div>
        </div>
      </ScreenContent>
    </Screen>
  );
});
