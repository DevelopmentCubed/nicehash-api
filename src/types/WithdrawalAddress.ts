import { Currency } from "./Currency";

export default interface WithdrawalAddress {
  id: string;
  type: {
    code: string;
    description: string;
    supportedCurrencies: Currency[];
  };
  address: string;
  createdTs: string;
  status: {
    code: string;
    description: string;
  };
  updatedTs: string;
  inMoratorium: false;
}

export interface WithdrawalAddresses {
  list: WithdrawalAddress[];
  pagination: { size: number; page: number; totalPageCount: number };
}
