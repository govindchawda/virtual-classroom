const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) =>{
    try {
      const token =  req.headers['authorization']?.split(" ")[1];
        jwt.verify(token, process.env.PRIVATE_AUTH_KEY, (error,decode)=>{
            if(error){
                return res.status(202).json({
                    success:true,
                    message:"token is not match"
                });
            }
            if (!req.body) req.body = {};
            req.body.tokenId =  decode.authId;
            next();
        });
    } catch (error) {
        console.log('middleware error ' , error);
    }
}

module.exports = authMiddleware;