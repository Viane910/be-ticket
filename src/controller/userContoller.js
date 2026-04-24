const prisma = require("../model/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postUsers = async (req, res) => {
  const newUsers = req.body;
  const hashedPassword = await bcrypt.hash(newUsers.password, 10);
  const createdUsers = await prisma.user.create({
    data: {
      username: newUsers.username,
      name: newUsers.name,
      password: hashedPassword,
      role: newUsers.role,
    },
  });
  res.send({
    data: createdUsers,
    message: "User created successfully",
  });
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
      },
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.putUsers = async (req, res, next) => {
  try {
    const UserId = req.params.id;
    const updatedUsers = req.body;

    let dataUpdate = {
      username: updatedUsers.username,
      name: updatedUsers.name,
      role: updatedUsers.role,
    };

    if (updatedUsers.password) {
      dataUpdate.password = await bcrypt.hash(updatedUsers.password, 10);
    }

    const result = await prisma.user.update({
      where: {
        id: Number(UserId),
      },
      data: dataUpdate,
    });

    res.send({
      data: result,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUsers = async (req, res) => {
  const UserId = req.params.id;

  await prisma.user.delete({
    where: {
      id: Number(UserId),
    },
  });
  res.send({
    message: "User deleted successfully",
  });
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logoutUser = (req, res) => {
  res.json({
    message: "Logout berhasil",
  });
};
