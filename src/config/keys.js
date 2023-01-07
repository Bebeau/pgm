// eslint-disable-next-line
'use strict';

module.exports = {
	node_env: 'dev',
	proxyPort: 5000,
	publicDomain: '127.0.0.1:5000',
	stripe: {
		secretKey: 'sk_test_QOgFf3MquAJtSvI75DEL1Hfw',
		publishableKey: 'pk_test_cxHbxzikNLKQSEauqs0AU2Zs',
		clientId: 'ca_FsntGpJQKPYZcau9r0T9F8SYWL4KCsUg',
		authorizeUri: 'https://connect.stripe.com/express/oauth/authorize',
		tokenUri: 'https://connect.stripe.com/oauth/token'
	}
};