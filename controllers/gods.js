const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllGods = async (req, res) => {
  //#swagger.tags=["Gods"]
  try {
    const result = await mongodb.getDatabase().db().collection("gods").find();
    result.toArray().then((gods) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(gods);
    });
  } catch (error) {
    console.error(error);
  }
};

const getSingleGod = async (req, res) => {
  //#swagger.tags=["Gods"]
  try {
    const godId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("gods").find({ _id: godId });
    result.toArray().then((gods) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(gods[0]);
    });
  } catch (error) {
    console.error(error);
  }
};

const createGod = async (req, res) => {
  /* #swagger.tags=["Gods"]
  #swagger.description="You don't have to add every child of a god, just one and 'and many others' or 'and a few others'"
  #swagger.parameters["body"] = {
    in: "body",
    '@schema': {
      "type": "object",
      "properties": {
        "children": {
          "example": ["any", "any"]
        },
        "domains": {
          "example": ["any", "any"]
        },
        "name": {
          "example": "any"
        },
        "parents": {
          "example": ["any", "any"]
        },
        "siblings": {
          "example": ["any", "any"]
        },
        "translation": {
          "example": "any"
        },
        "transliteration": {
          "example": "any"
        }
      }
    }
  } */
  try {
    const god = {
      children: req.body.children,
      domains: req.body.domains,
      name: req.body.name,
      parents: req.body.parents,
      siblings: req.body.siblings,
      translation: req.body.translation,
      transliteration: req.body.transliteration
    };
    const response = await mongodb.getDatabase().db().collection("gods").insertOne(god);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the god.");
    }
  } catch (error) {
    console.error(error);
  }
};

const updateGod = async (req, res) => {
  /* #swagger.tags=["Gods"]
  #swagger.description="You should start by copying and pasting the information of the God you want to edit. You don't have to add every child of a god, just one and 'and many others' or 'and a few others'."
  #swagger.parameters["body"] = {
    in: "body",
    '@schema': {
      "type": "object",
      "properties": {
        "children": {
          "example": ["any", "any"]
        },
        "domains": {
          "example": ["any", "any"]
        },
        "name": {
          "example": "any"
        },
        "parents": {
          "example": ["any", "any"]
        },
        "siblings": {
          "example": ["any", "any"]
        },
        "translation": {
          "example": "any"
        },
        "transliteration": {
          "example": "any"
        }
      }
    }
  } */
  try {
    const godId = new ObjectId(req.params.id);
    const god = {
      children: req.body.children,
      domains: req.body.domains,
      name: req.body.name,
      parents: req.body.parents,
      siblings: req.body.siblings,
      translation: req.body.translation,
      transliteration: req.body.transliteration
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("gods")
      .replaceOne({ _id: godId }, god);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the god.");
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteGod = async (req, res) => {
  //#swagger.tags=["Gods"]
  try {
    const godId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("gods").deleteOne({ _id: godId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while deleting the god.");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllGods,
  getSingleGod,
  createGod,
  updateGod,
  deleteGod
};
