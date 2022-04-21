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

export interface Accounts {
  total: {
    currency: Currency;
    totalBalance: string;
    available: string;
    debt: string;
    pending: string;
  };
  currencies: Account[];
}

export interface Activity {
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

export type ActivityType =
  | "DEPOSIT"
  | "WITHDRAWAL"
  | "HASHPOWER"
  | "MINING"
  | "EXCHANGE"
  | "UNPAID_MINING"
  | "OTHER";

export type Fiat = "USD" | "CAD" | "EUR";

export type Currency =
  | "BTC"
  | "ETH"
  | "XRP"
  | "BCH"
  | "LTC"
  | "ZEC"
  | "DASH"
  | "XLM"
  | "EOS"
  | "USDT"
  | "BSV"
  | "LINK"
  | "BAT"
  | "ZRX"
  | "HOT"
  | "OMG"
  | "REP"
  | "NEXO"
  | "BTG"
  | "ENJ"
  | "MATIC"
  | "ELF"
  | "SNT"
  | "BNT"
  | "KNC"
  | "MTL"
  | "POLY"
  | "POWR"
  | "GTO"
  | "LOOM"
  | "CVC"
  | "AST"
  | "PPT"
  | "KEY"
  | "STORJ"
  | "STORM"
  | "TNT"
  | "DATA"
  | "AOA"
  | "RDN"
  | "USDC"
  | "FET"
  | "ANT"
  | "AERGO"
  | "LBA"
  | "XMR"
  | "MITH"
  | "BAND"
  | "SXP"
  | "EURS"
  | "WBTC"
  | "RVN"
  | "UNI"
  | "AAVE"
  | "FTM"
  | "YFI"
  | "DOGE"
  | "ONEINCH"
  | "SUSHI"
  | "OCEAN"
  | "MKR"
  | "CRV"
  | "CHZ"
  | "GRT"
  | "GNO"
  | "HBAR"
  | "ADA";

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
  pagination: Pagination;
}

export interface WithdrawalAddress {
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
  pagination: Pagination;
}

export interface MiningRigs {
  minerStatuses: {
    MINING?: number;
    [key: string]: number | undefined;
  };
  rigTypes: {
    MANAGED?: number;
    UNMANAGED?: number;
    [key: string]: number | undefined;
  };
  totalRigs: number;
  totalProfitability: number;
  totalDevices: number;
  devicesStatuses: {
    DISABLED?: number;
    MINING?: number;
    [key: string]: number | undefined;
  };
  unpaidAmount: string;
  path: string;
  btcAddress: string;
  nextPayoutTimestamp: string;
  lastPayoutTimestamp: string;
  miningRigGroups: any[];
  miningRigs: {
    rigId: string;
    type: string;
    name: string;
    statusTime: number;
    joinTime?: number;
    minerStatus: string;
    groupName: string;
    unpaidAmount: string;
    notifications: string[];
    softwareVersions?: string;
    devices?: {
      id: string;
      name: string;
      deviceType: {
        enumName: "UNKNOWN" | "NVIDIA" | "AMD" | "CPU";
        description: string;
      };
      status: {
        enumName:
          | "UNKNOWN"
          | "DISABLED"
          | "INACTIVE"
          | "MINING"
          | "BENCHMARKING"
          | "ERROR"
          | "PENDING"
          | "OFFLINE";
        description: string;
      };
      temperature: number;
      load: number;
      revolutionsPerMinute: number;
      revolutionsPerMinutePercentage: number;
      powerMode: {
        enumName: "UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | "MIXED";
        description: string;
      };
      powerUsage: number;
      speeds: {
        algorithm: string;
        title: string;
        speed: string;
        displaySuffix: string;
      }[];
      intensity: {
        enumName: "UNKNOWN" | "LOW" | "HIGH";
        description: string;
      };
      nhqm: string;
    }[];
    cpuMiningEnabled?: boolean;
    cpuExists?: boolean;
    stats: {
      statsTime: number;
      market: string;
      algorithm: {
        enumName: string;
        description: string;
      };
      unpaidAmount: string;
      difficulty: number;
      proxyId: number;
      timeConnected: number;
      xnsub: boolean;
      speedAccepted: number;
      speedRejectedR1Target: number;
      speedRejectedR2Stale: number;
      speedRejectedR3Duplicate: number;
      speedRejectedR4NTime: number;
      speedRejectedR5Other: number;
      speedRejectedTotal: number;
      profitability: number;
    }[];
    profitability: number;
    localProfitability: number;
    rigPowerMode?: string;
    v4?: {
      versions: any[];
      mdv: {
        state: number;
      };
      mmv: {
        targetState: number;
        workerName: string;
      };
      osp: any[];
      odp: any[];
      omp: any[];
      actions: any[];
      devices: any[];
    };
  }[];
  rigNhmVersions: string[];
  externalAddress: boolean;
  totalProfitabilityLocal: number;
  pagination: Pagination;
}

interface Pagination {
  size: number;
  page: number;
  totalPageCount: number;
}

export interface AlgorithmsStats {
  algorithms: {
    [algo: string]: {
      unpaid: string;
      profitability: number;
      speedAccepted: number;
      speedRejected: number;
      displaySuffix: string;
      isActive: boolean;
    };
  };
}
