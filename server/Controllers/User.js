const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

module.exports = {
  Register: async (req, res) => {
    console.log(req.body);
    const encrypt = bcryptjs.hashSync(req?.body?.newEntry.password);
    try {
      const USer = await new User({
        ...req?.body?.newEntry,
        password: encrypt,
        Cpassword: encrypt,
      });
      USer.save();
      res.json({ status: "ok" });
    } catch (error) {
      res.json({ status: "error", error: "Duplicate Email" });
    }
  },
  Update: async (req, res) => {
    console.log(req.body);

    try {
      const user = await User.findByIdAndUpdate(
        req.body.id,
        req.body.newEntry
      ).exec();
      response.status(200).json(user);
    } catch (error) {
      res.json({ status: "error", error: error });
    }
  },
  Login: async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    });
    console.log(user);

    if (user == null) {
      return res.send({ user: "not found" }).status(500);
    }
    if (user && bcryptjs.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          name: user.Uname,
          email: user.email,
        },
        process.env.KEY
      );
      return res
        .send({
          Token: token,
          User: user,
        })
        .status(200);
    }

    return res.send({ user: "Wrong Credentials" }).status(500);
  },
};
