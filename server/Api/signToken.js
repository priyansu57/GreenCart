import jwt from "jsonwebtoken"

export const signToken = ({prop}) => {
   return jwt.sign({ id : prop._id} , process.env.JWT_SECRET , {expiresIn : "14d"})
}

