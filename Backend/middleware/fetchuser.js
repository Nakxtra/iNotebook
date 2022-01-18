const jwt = require('jsonwebtoken');
const JWT_SECRET = "NakxtraisNakshatra"

const fetchuser = async(req, res, next)=>{
    // Get token from thunderclient header.
    const token = req.header("auth-token");
    // If not get
    if(!token){
        res.status(401).json({error: "Please authenticate using a valid token"})
    }
    try {
        // Synchronously verify given token using a secret or a public key to get a decoded token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({error: "Please authenticate using a valid token"})
    }

}

module.exports = fetchuser;