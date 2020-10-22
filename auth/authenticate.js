const secrets = require("./secrets");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if(!req.headers.authorization) {
        next({ code: 401, message: "Missing Authorization header" });
    } else {

        if(token) {
            jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
                if(!err) {
                    req.jwt = decodedToken;
                    next();
                } else {
                    next({ code: 403, message: "Invalid Token, please login again" });
                }
            });
        } else {
            next({ code: 401, message: "Not Authorized" });
        }
    }
}