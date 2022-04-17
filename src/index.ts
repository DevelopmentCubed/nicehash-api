import axios, { AxiosError, AxiosInstance, Method } from "axios";
import { stringify } from "querystring";
import { createHmac, randomBytes } from "crypto";

import {
  Currency,
  Fiat,
  Account,
  Accounts,
  ActivityType,
  Activity,
  MiningPayments,
  WithdrawalAddress,
  WithdrawalAddresses,
  MiningRigs,
} from "./types";

export interface Constructor {
  apiKey: string;
  apiSecret: string;
  orgID: string;
  apiHost?: string;
}

export class NiceHash {
  private apiKey: string;
  private apiSecret: string;
  private orgID: string;
  private axios: AxiosInstance;

  /**
   * Creates an instance of NiceHash.
   * @param {Constructor} constructor
   * @memberof NiceHash
   */
  constructor({
    apiKey,
    apiSecret,
    orgID,
    apiHost = "https://api2.nicehash.com",
  }: Constructor) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.orgID = orgID;
    this.axios = axios.create({
      baseURL: apiHost,
    });
  }

  /**
   * Create an hmac signature
   *
   * @private
   * @param {string} method
   * @param {string} endpoint
   * @param {Date} date
   * @param {string} nonce
   * @param {(string | Record<any, any> | null)} [query=null]
   * @param {(string | object | null)} [body=null]
   * @return {string}
   * @memberof NiceHash
   */
  private createSignature(
    method: string,
    endpoint: string,
    date: number,
    nonce: string,
    query: string | Record<any, any> | null = null,
    body: string | object | null = null
  ) {
    const hmac = createHmac("sha256", this.apiSecret);

    hmac.update(
      `${this.apiKey}\0${date}\0${nonce}\0\0${
        this.orgID
      }\0\0${method.toUpperCase()}\0${endpoint}\0`
    );

    if (query)
      hmac.update(`${typeof query === "object" ? stringify(query) : query}`);
    if (body)
      hmac.update(
        `\0${typeof body === "object" ? JSON.stringify(body) : body}`
      );

    return `${this.apiKey}:${hmac.digest("hex")}`;
  }

  /**
   * Make a request to the api
   *
   * @private
   * @param {Method} method
   * @param {string} endpoint
   * @param {(string | null)} [query=null]
   * @param {(Record<any, any> | null)} [body=null]
   * @return {*}
   * @memberof NiceHash
   */
  private async request(
    method: Method,
    endpoint: string,
    query: string | Record<any, any> | null = null,
    body: Record<any, any> | null = null
  ) {
    const date = Date.now();
    const nonce = randomBytes(16).toString("base64");

    try {
      const { data: res } = await this.axios(endpoint, {
        method,
        params: query,
        data: body,
        responseType: "json",
        headers: {
          // @ts-ignore
          "X-Time": date,
          "X-Nonce": nonce,
          "X-Organization-Id": this.orgID,
          "X-Request-Id": nonce,
          "X-Auth": this.createSignature(
            method,
            endpoint,
            date,
            nonce,
            query,
            body
          ),
        },
      });

      return res;
    } catch (error) {
      throw error as AxiosError;
    }
  }

  /**
   * Get the details for an account
   *
   * @param {Currency} currency - The coin you want to get an account for
   * @return {Promise<Account>}
   * @memberof NiceHash
   */
  getAccount(currency: Currency) {
    return this.request("GET", `/main/api/v2/accounting/account2/${currency}`, {
      extendedResponse: true,
    }) as Promise<Account>;
  }

  /**
   * Get all accounts
   *
   * @param {Fiat} [fiat="USD"] - What should currency should the fiat value be in
   * @return {Promise<Accounts>}
   * @memberof NiceHash
   */
  getAccounts(fiat: Fiat = "USD") {
    return this.request(
      "GET",
      "/main/api/v2/accounting/accounts2",
      fiat ? { extendedResponse: true, fiat } : { extendedResponse: true }
    ) as Promise<Accounts>;
  }

  /**
   * Get the activity for an account
   *
   * @param {Currency} currency
   * @param {number} [limit=100]
   * @param {(ActivityType | null)} [type=null]
   * @return {Promise<Activity>}
   * @memberof NiceHash
   */
  getAccountActivity(
    currency: Currency,
    limit: number = 100,
    type: ActivityType | null = null
  ) {
    return this.request(
      "GET",
      `/main/api/v2/accounting/activity/${currency}`,
      type ? { limit, type } : { limit }
    ) as Promise<Activity[]>;
  }

  /**
   * Get mining payments
   *
   * @param {Currency} currency
   * @param {number} [size=100]
   * @param {number} [page=0]
   * @return {Promise<MiningPayments>}
   * @memberof NiceHash
   */
  getMiningPayments(currency: Currency, size: number = 100, page: number = 0) {
    return this.request(
      "GET",
      `/main/api/v2/accounting/hashpowerEarnings/${currency}`,
      { size, page }
    ) as Promise<MiningPayments>;
  }

  /**
   * Get the info of a withdrawal address
   *
   * @param {string} id
   * @return {Promise<WithdrawalAddress>}
   * @memberof NiceHash
   */
  getWithdrawalAddress(id: string) {
    return this.request(
      "GET",
      `/main/api/v2/accounting/withdrawalAddress/${id}`
    ) as Promise<WithdrawalAddress>;
  }

  /**
   * Get all withdrawal addresses
   *
   * @param {(Currency | null)} [currency=null]
   * @param {number} [size=100]
   * @param {number} [page=0]
   * @return {Promise<WithdrawalAddresses>}
   * @memberof NiceHash
   */
  getWithdrawalAddresses(
    currency: Currency | null = null,
    size: number = 100,
    page: number = 0
  ) {
    return this.request(
      "GET",
      `/main/api/v2/accounting/withdrawalAddresses`,
      currency ? { size, page, currency } : { size, page }
    ) as Promise<WithdrawalAddresses>;
  }

  /**
   *  Withdraw to an address
   *
   * @param {Currency} currency
   * @param {string} address
   * @param {number} amount
   * @return {Promise<{ id: string }>}
   * @memberof NiceHash
   */
  makeWithdrawal(currency: Currency, address: string, amount: number) {
    return this.request("POST", "/main/api/v2/accounting/withdrawal", null, {
      currency,
      withdrawalAddressId: address,
      amount,
    }) as Promise<{ id: string }>;
  }

  /**
   * Get all rigs
   *
   * @param {("NAME" | "PROFITABILITY" | "ACTIVE" | "INACTIVE")} [sort="NAME"]
   * @param {string} [system=""]
   * @param {string} [status=""]
   * @param {number} [size=25]
   * @param {number} [page=0]
   * @return {Promise<MiningRigs>}
   * @memberof NiceHash
   */
  getRigs(
    sort: "NAME" | "PROFITABILITY" | "ACTIVE" | "INACTIVE" = "NAME",
    system: string = "",
    status: string = "",
    size: number = 25,
    page: number = 0
  ) {
    return this.request("GET", "/main/api/v2/mining/rigs2", {
      sort,
      system,
      status,
      size,
      page,
    }) as Promise<MiningRigs>;
  }
}
