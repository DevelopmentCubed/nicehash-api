const { default: axios } = require('axios');
const { stringify } = require('querystring');
const { createHmac, randomBytes } = require('crypto');

class NiceHash {
	constructor({ apiKey, apiSecret, orgID, apiHost = 'https://api2.nicehash.com' }) {
		this.apiKey = apiKey;
		this.apiSecret = apiSecret;
		this.orgID = orgID;
		this.axios = axios.create({
			baseURL: apiHost,
		});
	}

	createSignature(method, endpoint, date, nonce, query = null, body = null) {
		const hmac = createHmac('sha256', this.apiSecret);

		hmac.update(`${this.apiKey}\0${date}\0${nonce}\0\0${this.orgID}\0\0${method.toUpperCase()}\0${endpoint}\0`);

		if (query) hmac.update(`${typeof query == 'object' ? stringify(query) : query}`);
		if (body) hmac.update(`\0${typeof body === 'object' ? JSON.stringify(body) : body}`);

		return `${this.apiKey}:${hmac.digest('hex')}`;
	}

	async request(method, endpoint, query = null, body = null) {
		const date = Date.now();
		const nonce = randomBytes(16).toString('base64');

		try {
			const { data: res } = await this.axios(endpoint, {
				method: method.toUpperCase(),
				params: query,
				data: body,
				responseType: 'json',
				headers: {
					'X-Time': date,
					'X-Nonce': nonce,
					'X-Organization-Id': this.orgID,
					'X-Request-Id': nonce,
					'X-Auth': this.createSignature(method, endpoint, date, nonce, query, body),
				},
			});

			return res;
		} catch (error) {
			throw new Error(error);
		}
	}

	getAccount(currency) {
		return this.request('GET', `/main/api/v2/accounting/account2/${currency}`, { extendedResponse: true });
	}

	getAccounts(fiat = 'USD') {
		return this.request('GET', '/main/api/v2/accounting/accounts2', fiat ? { extendedResponse: true, fiat } : { extendedResponse: true });
	}

	getAccountActivity(currency, size = 100, type = null) {
		return this.request('GET', `/main/api/v2/accounting/activity/${currency}`, type ? { limit: size, type } : { limit: size });
	}

	getMiningPayments(currency, size = 100, page = 0) {
		return this.request('GET', `/main/api/v2/accounting/hashpowerEarnings/${currency}`, { size, page });
	}

	getWithdrawalAddress(id) {
		return this.request('GET', `/main/api/v2/accounting/withdrawalAddress/${id}`);
	}

	getWithdrawalAddresses(currency = null, size = 100, page = 0) {
		return this.request('GET', `/main/api/v2/accounting/withdrawalAddresses`, currency ? { size, page, currency } : { size, page });
	}

	makeWithdrawal(currency, address, amount) {
		return this.request('POST', '/main/api/v2/accounting/withdrawal', null, {
			currency,
			withdrawalAddressId: address,
			amount,
		});
	}
}

module.exports = NiceHash;
