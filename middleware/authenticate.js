const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json({ message: "Unauthenticated request" });
  }
  next();
};

module.exports = { isAuthenticated };
