import User from "../models/User.js";

export const UpdateCart = async (req , res) => {
    try {
        
      let {user , cartItems} = req.body;
      // console.log("UpdateCart of cartItems : " , cartItems);
      // console.log("UpdateCart of user : " , user.user._id);
      
     await User.findByIdAndUpdate(user.user._id,
      {cartItems}
    );
      res.send({success : true , message : "Cart Updated ."})

    } catch (error) {
        console.log(error.message);
        res.send({success : true , message : error.message})

    }
}