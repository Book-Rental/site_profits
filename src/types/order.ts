export interface OrderItem {
  bookId: string;
  bookName: string;
  author: string;
  coverImage: string;
  quantity: number;
  itemStatus: string;
  rentalDuration: number;
}

export interface Order {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: number;
  items: OrderItem[];
}

export interface OrdersMeta {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasMore: boolean;
}

export interface OrdersData {
  orders: Order[];
  meta: OrdersMeta;
}

export interface OrdersResponse {
  status: string;
  message: string;
  data: OrdersData;
}