const stripe = require("stripe")(
  "sk_test_51K5j6lH0TRxmYn7iYUs1UDQpBtXYMobOnI2VmtaDuFK8lA9AwFjGRPgEv3Oljlc5cbldNpdKbuppGo0WlkmFgjRs007IpT0eJD"
);
// CONFIG
const CURRENCY = "pkr";

module.exports = {
  postOrders: async (req, res) => {
    /////////PRODUCT FORMAT
    // const items = req?.body?.items;
    // const transformedItems = items?.map((item) => ({
    //   price_data: {
    //     currency: CURRENCY,
    //     unit_amount: item?.price * 100,
    //     product_data: {
    //       name: item?.name,
    //       images: [item?.image],
    //     },
    //   },
    //   description: `${item?.description}`,
    //   quantity: item?.quantity,
    // }));

    /////////CREATE CHECKOUT

    const createCheckoutSession = async () => {
      const items = req?.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["PK"],
        },
        line_items: [
          {
            price_data: {
              currency: CURRENCY,
              product_data: {
                name: items.name,
              },
              unit_amount: items.price * 100,
            },
            quantity: items.quantity,
          },
        ],
        mode: "payment",
        success_url: `${
          req.headers.origin
        }/orderSuccess?item=${encodeURIComponent(
          items._id
        )}&item_quantity=${encodeURIComponent(
          items.quantity
        )}&range=${encodeURIComponent(items.range)}`,
        cancel_url: `${req.headers.origin}`,
      });
      return session.id;
    };

    // TRY CATTCH
    try {
      // const items = req?.body;
      // console.log(items);
      // res.send({ data: items });
      const sessionId = await createCheckoutSession();
      res.send({ sessionId: sessionId });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  },
  getOrderData: async (req, res) => {
    try {
      const items = req?.body;
      const checkoutSession = await stripe.checkout.sessions.retrieve(
        items.id,
        {
          expand: ["shipping"],
        }
      );

      // console.log(checkoutSession);
      res.send({ order: checkoutSession });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  },
};
