const stripe = require('stripe')('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');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card', 'promptpay'], // เพิ่ม PromptPay ให้ลูกค้าไทย
                line_items: [{
                    price_data: {
                        currency: 'thb',
                        product_data: {
                            name: 'e-Book CookBook1',
                            images: ['https://pe56d.s3.amazonaws.com/o_1jbrqbatnenp1nef5vb1nguoug1g.png'],
                        },
                        unit_amount: 7900, // ราคา 79.00 บาท
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: `${req.headers.origin}/success.html`,
                cancel_url: `${req.headers.origin}/index.html`,
            });
            res.status(200).json({ id: session.id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
