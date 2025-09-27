const validator = require("../helpers/validate");

const saveGod = (req, res, next) => {
  const validationRule = {
    children: "required|array",
    domains: "required|array",
    name: "required|string",
    parents: "required|array",
    siblings: "required|array",
    translation: "required|string",
    transliteration: "required|string"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err
      });
    } else {
      next();
    }
  });
};

const saveUser = (req, res, next) => {
  const validationRule = {
    username: "required|string",
    url: "required|string"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveGod,
  saveUser
};
