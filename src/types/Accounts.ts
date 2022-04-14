import Account from "./Account";
import { Currency } from "./Currency";

export default interface Accounts {
  total: {
    currency: Currency;
    totalBalance: string;
    available: string;
    debt: string;
    pending: string;
  };
  currencies: Account[];
}
