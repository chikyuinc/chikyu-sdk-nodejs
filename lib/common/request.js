var Chikyu = require('../core');
const axios = require('axios');


Chikyu.request = {
    invoke: function(apiClass, apiPath, apiData, headers) {
        if (!headers) {
            headers = {
                'Content-Type': 'application/json'
            };
        }
        // headersのコピーを作成
        headers = Object.assign({}, headers);
        // useHttpStatus()がtrueの場合、Error-Responseヘッダーを追加
        if (Chikyu.config.useHttpStatus()) {
            if (!('Error-Response' in headers) && !('error-response' in headers)) {
                headers['Error-Response'] = 'http-status';
            }
        }
        const url = Chikyu.request.buildUrl(apiClass, apiPath, true);

        // axiosオプションを構築
        const axiosOptions = {
            headers: headers
        };
        // useHttpStatus()がtrueの場合、全てのHTTPステータスをresolveさせる
        if (Chikyu.config.useHttpStatus()) {
            axiosOptions.validateStatus = function() { return true; };
        }

        return axios.post(url, JSON.stringify(apiData), axiosOptions).then((res) => {
                    const data = res.data;
                    const httpStatus = res.status;
                    return new Promise(function(resolve, reject) {
                        try {
                            if (!data || typeof data !== 'object' || !('has_error' in data) || data.has_error) {
                                const error = new Error((data && data.message) || 'Unknown error');
                                error.data = data;
                                error.httpStatus = httpStatus;
                                reject(error);
                            } else {
                                resolve(data.data);
                            }
                        } catch (e) {
                            e.httpStatus = httpStatus;
                            reject(e);
                        }
                });
        });
    },
    buildUrl: function(apiClass, apiPath, withHost) {
        if (withHost !== false) {
            withHost = true;
        }

        if (apiPath.indexOf('/') === 0) {
            apiPath = apiPath.substr(1);
        }

        const envName = Chikyu.config.envName();
        let path = '';
        if (envName) {
            path = '/' + Chikyu.config.envName() + '/api/v2/' + apiClass + '/' + apiPath;
        } else {
            path = '/api/v2/' + apiClass + '/' + apiPath;
        }

        if (withHost) {
            return Chikyu.config.protocol() + '://' + Chikyu.config.host() + path;
        } else {
            return path;
        }
    }
};


module.exports = Chikyu;
