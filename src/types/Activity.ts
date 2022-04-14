import { ActivityType } from "./ActivityType";
import { Currency } from "./Currency";

export default interface Activity {
  time: number;
  id: string;
  type: ActivityType;
  amount: string;
  feeAmount?: string;
  amountReceived?: string;
  address?: string;
  txid?: string;
  status?: "COMPLETED" | "FAILED" | "CANCELLED";
  activityCurrency: Currency;
  error?: string;
}
