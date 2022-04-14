import { Currency } from "./Currency";

export interface MiningPayment {
  id: string;
  created: number;
  currency: {
    enumName: Currency;
    description: Currency;
  };
  amount: string;
  metadata: any;
  accountType: { enumName: string; description: string };
  feeAmount: number;
}

export interface MiningPayments {
  list: MiningPayment[];
  pagination: { size: number; page: number; totalPageCount: number };
}
