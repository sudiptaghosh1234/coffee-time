const jwt = require('jsonwebtoken')

const generateToken=(id, secret)=>{
    const token=jwt.sign({
        id
    }, secret, {expiresIn: '1d'});
    return token;
}
module.exports=generateToken;