var http = require('http');
var express = require('express');
var app = express();
var httpServer = http.createServer(app);

app.post('/mws', function (req, res) {
console.log('I am working');
  const MWSClient = require('mws-api');
const mws = new MWSClient({
  accessKeyId: 'AKIAJ3DTY6TH5JLLMVLA',
  secretAccessKey: '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',
  merchantId: 'A5NQFWI072NXT',
  meta: {
    retry: true, // retry requests when throttled
    next: true, // auto-paginate
    limit: Infinity // only get this number of items (NOT the same as MaxRequestsPerPage)
  }
});
	const Feeds = require('mws-api/feeds');
mws.Feeds.SubmitFeed({    FeedContent: Feeds._POST_ORDER_FULFILLMENT_DATA_({      MessageID: "1",      MerchantOrderID: "112-9661766-6523437",      MerchantFulfillmentID: "1234567",      FulfillmentDate: '2002-05-01T15:36:33-08:00',      CarrierCode: 'DHL Paket',      ShippingMethod: 'DHL Paket',      ShipperTrackingNumber: '1234567890'    }),    FeedType: '_POST_ORDER_FULFILLMENT_DATA_'  })  .then((res) => {    console.log(res)  })  .catch((e) => {    console.log('error', e);  });
	

});

app.listen(3000);
