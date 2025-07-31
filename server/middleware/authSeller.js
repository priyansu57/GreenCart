import jwt from "jsonwebtoken"

export const authSeller = async (req,res,next) => {
    const {sellerToken} = req.cookies;

    if(!sellerToken){
        return res.json({success: false , message: 'Not Authorized'})   
    }

    try {
        const tokenDecode = jwt.verify(sellerToken,process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.sellerId = tokenDecode.id
            next();
        }else{
            return res.json({success:false , message: 'Not Authorized'})
        }
    } catch (error) {
        res.json({success: false , message: error.message})
    }
}