export interface OrderResponse {
  id: string;
  date: Date;
  orderDetail: {
    id: string;
    price: number;
  };
}
