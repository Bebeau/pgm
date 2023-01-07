const cors = require('cors');
const config = require('./config/keys');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const stripe = require("stripe")(config.stripe.secretKey);

// addressFrom = {
// 	name: 'PGM Outfitters',
// 	street1: '908 Joseph St',
// 	city: 'Shreveport',
// 	state: 'LA',
// 	zip: '71107',
// 	phone: '318-469-6502',
// 	country: 'US'
// },
// parcel = {
// 	length: 12,
// 	width: 24,
// 	height: 1,
// 	distance_unit: 'in',
// 	weight: 128,
// 	mass_unit: 'oz'
// };

function setupCors() {
	app.use(cors({
		origin: `${config.publicDomain}`,
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
		credentials: true
	}));
}

function setupMiddleware() {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(express.static(path.join(__dirname, 'client/app/public')));
}

function setupRoutes() {
	app.use(express.static(path.join(__dirname, 'build')));
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
	app.post('/create-checkout-session', async (req, res) => {

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			shipping_address_collection: {
				allowed_countries: ['US']
			},
			locale: req.body.locale,
			line_items: [{
				price_data: {
					currency: 'usd',
					product_data: {
						name: 'Texas Bandit Coon Guard',
						images: ['https://stripe-camo.global.ssl.fastly.net/723be6c169f08d4a85b9347cc93b1e1f3298aed5/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a64463878524546714e54644a566a4a52534446595232597a66475a735833526c63335266626b7045516b67305a6d6454626c6f30596c4179546d6c6f5155644d5a6b68773030726d6b6c31594873'],
					},
					unit_amount: 5999
				},
				quantity: req.body.qty,
				tax_rates: ["txr_1J4VH5IV2QH1XGf3cuIe2Akg"]
			}],
			mode: "payment",
			success_url: "https://texasbanditcoonguard.com",
			cancel_url: "https://texasbanditcoonguard.com"
		});
		
		res.send({
			id: session.id
		});

	});
}

function startServer() {
	const port = config.proxyPort || 5000;
	// console.log that your server is up and running
	app.listen(port, () => console.log(`Listening on port ${port}`));
}

const app = express();

setupCors();
setupMiddleware();
setupRoutes();
startServer();
