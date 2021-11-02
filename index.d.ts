export = NiceHash;

declare class NiceHash {
	constructor(options?: NiceHash.Options);

	getAccount(currency: NiceHash.Currency): Promise<NiceHash.Account>;
	getAccounts(fiat: NiceHash.Fiat): Promise<NiceHash.Accounts>;
	getAccountActivity(currency: NiceHash.Currency, size?: number, type?: 'DEPOSIT' | 'WITHDRAWAL' | 'HASHPOWER' | 'MINING' | 'EXCHANGE' | 'UNPAID_MINING' | 'OTHER'): Promise<NiceHash.Activity>;
	getMiningPayments(currency: NiceHash.Currency, size?: number, page?: number): Promise<NiceHash.MiningPayments>;
	getWithdrawalAddress(id: string): Promise<NiceHash.WithdrawalAddress>;
	getWithdrawalAddresses(currency?: NiceHash.Currency, size?: number, page?: number): Promise<NiceHash.WithdrawalAddresses>;

	makeWithdrawal(currency: NiceHash.Currency, address: string, amount: number): Promise<{ id: string }>;
}

declare namespace NiceHash {
	export interface Options {
		apiKey: string;
		apiSecret: string;
		orgID: string;
		apiHost: string = 'https://api2.nicehash.com';
	}

	export interface Account {
		active: boolean;
		currency: NiceHash.Currency;
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
			currency: NiceHash.Currency;
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
		type: 'DEPOSIT' | 'WITHDRAWAL' | 'HASHPOWER' | 'MINING' | 'EXCHANGE' | 'UNPAID_MINING' | 'OTHER';
		amount: string;

		feeAmount?: string;
		amountReceived?: string;
		address?: string;
		txid?: string;
		status?: 'COMPLETED' | 'FAILED' | 'CANCELLED';
		activityCurrency: NiceHash.Currency;
		error?: string;
	}

	export interface MiningPayment {
		id: string;
		created: number;
		currency: {
			enumName: NiceHash.Currency;
			description: NiceHash.Currency;
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

	export interface WithdrawalAddress {
		id: string;
		type: {
			code: string;
			description: string;
			supportedCurrencies: NiceHash.Currency[];
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
		list: NiceHash.WithdrawalAddress[];
		pagination: { size: number; page: number; totalPageCount: number };
	}

	export type Fiat = 'USD' | 'CAD' | 'EUR';

	export type Currency =
		| 'BTC'
		| 'ETH'
		| 'XRP'
		| 'BCH'
		| 'LTC'
		| 'ZEC'
		| 'DASH'
		| 'XLM'
		| 'EOS'
		| 'USDT'
		| 'BSV'
		| 'LINK'
		| 'BAT'
		| 'ZRX'
		| 'HOT'
		| 'OMG'
		| 'REP'
		| 'NEXO'
		| 'BTG'
		| 'ENJ'
		| 'MATIC'
		| 'ELF'
		| 'SNT'
		| 'BNT'
		| 'KNC'
		| 'MTL'
		| 'POLY'
		| 'POWR'
		| 'GTO'
		| 'LOOM'
		| 'CVC'
		| 'AST'
		| 'PPT'
		| 'KEY'
		| 'STORJ'
		| 'STORM'
		| 'TNT'
		| 'DATA'
		| 'AOA'
		| 'RDN'
		| 'USDC'
		| 'FET'
		| 'ANT'
		| 'AERGO'
		| 'LBA'
		| 'XMR'
		| 'MITH'
		| 'BAND'
		| 'SXP'
		| 'EURS'
		| 'WBTC'
		| 'RVN'
		| 'UNI'
		| 'AAVE'
		| 'FTM'
		| 'YFI'
		| 'DOGE'
		| 'ONEINCH'
		| 'SUSHI'
		| 'OCEAN'
		| 'MKR'
		| 'CRV'
		| 'CHZ'
		| 'GRT'
		| 'GNO'
		| 'HBAR'
		| 'ADA';
}
