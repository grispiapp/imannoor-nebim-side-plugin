import type { SearchOrderByPhoneResponse } from "@/api/nebim"
import type { FC } from "react"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { formatDotNetDateString } from "@/lib/utils"

type OrderItemProps = {
  order: SearchOrderByPhoneResponse["data"][number]
}

export const OrderItem: FC<OrderItemProps> = ({ order }) => {
  return (
    <div className="p-2.5 bg-white rounded-lg border border-gray-100 shadow-sm space-y-2">
      <div className="flex items-center">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{formatDotNetDateString(order.OrderDate)}</span>
          <span className="text-xs font-medium text-black">{order.DocumentNumber}</span>
        </div>

        {order.Cancellable ? (
          <div className="ml-auto px-2 py-0.5 bg-green-50 text-green-700 rounded-full flex items-center gap-1">
            <CheckCircledIcon className="w-3 h-3" />
            <span className="text-xs">İptal Edilebilir</span>
          </div>
        ) : null}
      </div>

      <div>
        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">{order.OrderStatus}</span>
      </div>
    </div>
  )
}
