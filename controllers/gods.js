const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Gods"]
  const result = await mongodb
  .getDatabase()
  .db()
  .collection("gods")
  .find();
  result.toArray().then((gods) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(gods);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=["Gods"]
  const godId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDatabase()
  .db()
  .collection("gods")
  .find({ _id: godId });
  result.toArray().then((gods) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(gods[0]);
  });
};

const createGod = async (req, res) => {
  //#swagger.tags=["Gods"]
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
  .insertOne(god);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while updating the god.");
  }
};

const updateGod = async (req, res) => {
  //#swagger.tags=["Gods"]
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
};

const deleteGod = async (req, res) => {
  //#swagger.tags=["Gods"]
  const godId = new ObjectId(req.params.id);
  const response = await mongodb
  .getDatabase()
  .db()
  .collection("gods")
  .deleteOne({ _id: godId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while deleting the god.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createGod,
  updateGod,
  deleteGod
};
