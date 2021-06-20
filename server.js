const config = require('./config/keys');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

let request = require('superagent'),
	stripe = require("stripe")(config.stripe.secretKey),
	shippo = require('shippo')(config.shippo.key),
	addressFrom = {
		name: 'PGM Outfitters',
		street1: '908 Joseph St',
		city: 'Shreveport',
		state: 'LA',
		zip: '71107',
		phone: '318-469-6502',
		country: 'US'
	},
	parcel = {
		length: 12,
		width: 24,
		height: 1,
		distance_unit: 'in',
		weight: 128,
		mass_unit: 'oz'
	};

const app = express();

// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/app/build')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'client', 'app', 'build', 'index.html'));
});

app.post('/create-checkout-session', async (req, res) => {
	// const domainURL = localhost;
	const { 
		qty,
		locale 
	} = req.body;
	// Create new Checkout Session for the order
	// Other optional params include:
	// [billing_address_collection] - to display billing address details on the page
	// [customer] - if you have an existing Stripe Customer ID
	// [payment_intent_data] - lets capture the payment later
	// [customer_email] - lets you prefill the email input in the form
	// For full details see https://stripe.com/docs/api/checkout/sessions/create
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		shipping_address_collection: {
			allowed_countries: ['US']
		},
		locale: locale,
		line_items: [{
			price_data: {
		      	currency: 'usd',
		      	product_data: {
			        name: 'Texas Bandit Coon Guard',
			        images: ['https://stripe-camo.global.ssl.fastly.net/723be6c169f08d4a85b9347cc93b1e1f3298aed5/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a64463878524546714e54644a566a4a52534446595232597a66475a735833526c63335266626b7045516b67305a6d6454626c6f30596c4179546d6c6f5155644d5a6b68773030726d6b6c31594873'],
		      	},
		      	unit_amount: 5999
		    },
		    quantity: qty,
		    tax_rates: ["txr_1IXaXBIV2QH1XGf3s3q7xcy3"]
		}],
		mode: "payment",
		success_url: "https://coonguard.com",
		cancel_url: "https://coonguard.com"
	});
	res.send({
		id: session.id
	});
  	// create shipment and purchase
	// shippo.shipment.create({
	//     address_from: addressFrom,
	//     address_to: addressTo,
	//     parcels: [parcel],
	//     async: false
	// }, function(err, shipment){
	// 	if(err) {
	// 		console.log(err);
	// 	}
	//  	shippo.transaction.create({
	// 	    "shipment": shipment,
	// 	    "carrier_account": config.shippo.carrier,
	// 	    "servicelevel_token": "usps_priority"
	// 	}, function(err, transaction) {
	// 	    if(err) {
	// 			console.log(err);
	// 		}
	// 	});
	// });
});

const port = config.proxyPort || 5000;
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
