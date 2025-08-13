import { Button } from "./ui/button";
import { type FC, useState } from "react";
import toast from "react-hot-toast";

import { type SearchOrderByPhoneResponse, cancelOrder } from "@/api/nebim";
import { useGrispi } from "@/contexts/grispi-context";
import { cn, formatDotNetDateString } from "@/lib/utils";

type OrderItemProps = {
  order: SearchOrderByPhoneResponse["data"][number];
};

export const OrderItem: FC<OrderItemProps> = ({ order }) => {
  const { loading, bundle } = useGrispi();
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);

  const handleCancelOrder = async () => {
    if (loading || !bundle?.context.token) return;

    const confirm = window.confirm(
      "Siparişi iptal etmek istediğinize emin misiniz?"
    );
    if (!confirm) return;

    try {
      setCancelLoading(true);

      await cancelOrder(order.DocumentNumber, {
        token: bundle.context.token,
      });

      toast.success("Sipariş iptal edildi");
    } catch (error) {
      console.error("Sipariş iptal edilemedi:", error);
      toast.error(
        error instanceof Error ? error.message : "Sipariş iptal edilemedi"
      );
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="group space-y-2 rounded-lg border border-gray-100 bg-white p-2.5 shadow-sm">
      <div className="flex items-center">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">
            {formatDotNetDateString(order.OrderDate)}
          </span>
          <span className="text-xs font-medium text-black">
            {order.DocumentNumber}
          </span>
        </div>

        <div
          className={cn(
            "pointer-events-none ms-auto opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100",
            {
              "pointer-events-auto opacity-100":
                !order.Cancellable || cancelLoading,
            }
          )}
        >
          <Button
            onClick={handleCancelOrder}
            size="sm"
            variant="destructive"
            disabled={!order.Cancellable || cancelLoading}
          >
            <span className="text-xs">İptal Et</span>
          </Button>
        </div>
      </div>

      <div>
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
          {order.OrderStatus}
        </span>
      </div>
    </div>
  );
};
