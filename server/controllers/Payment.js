import Razorpay from 'razorpay';
import crypto from 'crypto';

export async function verifyPayment(req,res){
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.razorpay_key_secret).update(sign.toString()).digest("hex");
        if(razorpay_signature===expectedSign){
           return res.status(200).json({message:"Payment verified Successfull"});
        }else{
        return res.status(400).json({message:"Payment verification failed"});
    }
    } catch (error) {
        
    }
}

export async function orders(req,res){
    console.log(req.body.amount)
    try{
    const razorpay = new Razorpay({
        key_id:process.env.razorpay_key_id,
        key_secret:process.env.razorpay_key_secret,
    }); 
    const order = {
        amount:req.body.amount*100,
        currency:"INR",
        receipt:crypto.randomBytes(10).toString('hex'),
    };
    razorpay.orders.create(order, (error, order) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: "Something went wrong" });
        }
        const orderDetails={
            razorpayOrderId:order.id
        }
        return res.status(200).json({data:order
        ,orderDetails});
    });
}catch(error){
    console.error(error);
    res.status(500).send({ error: error.message || "Internal Server Error" });
}
}