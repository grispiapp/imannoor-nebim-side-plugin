import { SearchOrderByPhoneResponse } from "@/api/nebim";
import { FC } from "react";

type OrderItemProps = {
    order: SearchOrderByPhoneResponse[number];
}

export const OrderItem: FC<OrderItemProps> = ({ order }) => {
    return <div className="p-4 space-y-1 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center">
            <span>Sipariş numarası</span>
            <span className="font-bold">{order.OrderNumber}</span>
        </div>
        <div className="flex justify-between items-center">
            <span>İptal edilebilir mi?</span>
            <span className="font-bold">{order.Cancellable ? "Evet" : "Hayır"}</span>
        </div>
        <div className="flex justify-between items-center">
            <span>Son durum</span>
            <span className="font-bold">{order.OrderStatus}</span>
        </div>
    </div>
};
