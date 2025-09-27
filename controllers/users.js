const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
  //#swagger.tags=["Users"]
  try {
    const result = await mongodb.getDatabase().db().collection("users").find();
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
    });
  } catch (error) {
    console.error(error);
  }
};

const getSingleUser = async (req, res) => {
  //#swagger.tags=["Users"]
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("users").find({ _id: userId });
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users[0]);
    });
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (req, res) => {
  /* #swagger.tags=["Users"]
  #swagger.description="Creating a user here is not recommended. If you want to create a user, please go to /login"
  #swagger.parameters["body"] = {
    in: "body",
    '@schema': {
      "type": "object",
      "properties": {
        "username": {
          "example": "your github username"
        },
        "url": {
          "example": "https://github.com/example"
        }
      }
    }
  } */
  try {
    const user = {
      displayName: req.body.displayName,
      profileUrl: req.body.profileUrl
    };
    const response = await mongodb.getDatabase().db().collection("users").insertOne(user);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the user.");
    }
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  /* #swagger.tags=["Users"]
  #swagger.description="Please change only your own user data when using this route"
  #swagger.parameters["body"] = {
    in: "body",
    '@schema': {
      "type": "object",
      "properties": {
        "username": {
          "example": "your github username"
        },
        "url": {
          "example": "https://github.com/example"
        }
      }
    }
  } */
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      displayName: req.body.displayName,
      profileUrl: req.body.profileUrl
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the user.");
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=["Users"]
  //#swagger.description="Please delete only your own user data when using this route"
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while deleting the user.");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};
