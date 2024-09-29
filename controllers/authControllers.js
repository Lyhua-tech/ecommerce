const Users = require("../models/Users");
const Role = require("../models/Roles");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await Users.create({ email, username, password });

    const role = await Role.findOne({ where: { title: "buyer" } });
    await user.addRole(role);

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.becomeSeller = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id);
    const sellerRole = await Role.findOne({ where: { title: "seller" } });

    await user.addRole(sellerRole);

    res.status(200).json({
      status: "success",
      message: "You are now a seller!",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username }, include: Role });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Password or Username",
      });
    }

    const roles = user.Roles.map((role) => role.title);

    const token = jwt.sign(
      { id: user.id, username: user.username, roles },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
    );

    res.status(200).json({
      status: "success",
      token,
      message: "Login successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.protected = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await Users.findByPk(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "This user does not exist",
      });
    }

    req.user = currentUser;
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
  next();
};

exports.restrictRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        status: "fail",
        message: "Access denied: insufficient role permissions",
      });
    }
    next();
  };
};
