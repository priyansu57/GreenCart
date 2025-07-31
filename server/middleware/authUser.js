import jwt from "jsonwebtoken"

export const  authUser = async (req , res , next) => {
    const {accessToken} = req.cookies;

    if(!accessToken){
        return res.json({success: false , message : 'Not Authorized'});
    }

    try {
        const tokenDecode = jwt.verify(accessToken , process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.userId = tokenDecode.id
        }else{
            return res.json({success: false , message: 'Not Authorized'})
        }
      next();

    } catch (error) {
        res.json({success: false , message: error.message})
    }
}