const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log(req.header);
    const token = await req.header("Authorization");

    console.log("token is: ", token);
    if (!token) {
      console.log("invalid auth no token");
      return res.status(400).json({ msg: "Invalid Authentication" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log("invalid auth token invalid");
        return res.status(400).json({ msg: "Invalid Authentication" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = auth;
