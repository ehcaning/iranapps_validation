const axios = require('axios').default;
const querystring = require('querystring');
class Iranapps {
	/**
	 * Get an instance
	 * @constructs
	 * @param {string} client_id
	 * @param {string} client_secret
	 * @param {string} refresh_token
	 * @param {string} package_name
	 */
	constructor(client_id, client_secret, refresh_token, package_name) {
		/**
		 * Your client_id From IranApps
		 * @private
		 */
		this.client_id = client_id;
		/**
		 * Your client_secret From IranApps
		 * @private
		 */
		this.client_secret = client_secret;
		/**
		 * Your refresh_token From IranApps
		 * @private
		 */
		this.refresh_token = refresh_token;
		/**
		 * Your APK Package Name
		 * @private
		 */
		this.package_name = package_name;
	}

	/**
	 * Get a new Token From CafeBazaar
	 * @private
	 * @returns {Promise<string>} - get token
	 */
	async get_refresh_token() {
		const response = await axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: 'http://api.iranapps.ir/v2/auth/token',
			data: querystring.stringify({
				grant_type: 'refresh_token',
				client_id: this.client_id,
				client_secret: this.client_secret,
				refresh_token: this.refresh_token,
			}),
		});

		return response.data.access_token;
	}

	/**
	 * Validate Payment
	 * @param {string} sku
	 * @param {string} token
	 * @returns {Promise<{status: Number, data: {consumptionState: Number, purchaseState: Number, kind: string, developerPayload: string, purchaseTime: Number}}>}
	 */
	async validate(sku, token) {
		try {
			const auth = await this.get_refresh_token();
			const response = await axios({
				method: 'get',
				headers: { Authorization: auth },
				url: `http://api.iranapps.ir/v2/applications/${this.package_name}/purchases/products/${sku}/tokens/${token}`,
			});

			return {
				status: response.status,
				data: response.data,
			};
		} catch (err) {
			return {
				status: err.response.status,
				data: err.response.data,
			};
		}
	}
}

module.exports = getInstance;

/**
 * Get Instance of CafeBazaar
 * @param {string} client_id
 * @param {string} client_secret
 * @param {string} refresh_token
 * @param {string} package_name
 * @returns {Iranapps}
 */
function getInstance(client_id, client_secret, refresh_token, package_name) {
	return new Iranapps(client_id, client_secret, refresh_token, package_name);
}
