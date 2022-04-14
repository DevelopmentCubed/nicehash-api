import { Currency } from "./Currency";

export interface Account {
  active: boolean;
  currency: Currency;
  totalBalance: string;
  available: string;
  debt: string;
  pending: string;
  pendingDetails?: {
    deposit: string;
    withdrawal: string;
    exchange: string;
    hashpowerOrders: string;
    unpaidMining: string;
    refMiningFee: string;
  };
  enabled?: boolean;
  btcRate: number;
  fiatRate?: number;
}
