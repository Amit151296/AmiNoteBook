const jwt = require('jsonwebtoken');
const JWT_SECRET="A@m#it15$%#"


const fetchUser =(req,res,next)=>{
    // get the token from Auth token and pass Id to the request object.
    try {
        token=req.header("auth-token")
        data=jwt.verify(token,JWT_SECRET)
    } catch (error) {
        return res.status(400).json({ errors:"Please authenticate with a valid token"});
    }
    req._id=data._id
    next()
}

module.exports=fetchUser