export interface userWithoutPassword {
  id: string;
  email: string;
  name: string;
  address: string;
  phone: number;
  country: string | null;
  city: string | null;
  orders: any[];
  //createdAt: string;
}
