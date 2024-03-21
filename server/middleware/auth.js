import jwt from "jsonwebtoken";

function auth(req, res, next) {
  //check if user is authenticated
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("No token provided");
  try {
    //verify token
    const secretKey = process.env.SECRET_KEY;
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
}

export default auth;
