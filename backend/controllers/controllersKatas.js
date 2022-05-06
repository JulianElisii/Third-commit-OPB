const Kata = require("../models/katas")
const User = require("../models/users")


const getKatas = async (req, res) => {
  const kata = await Kata.find({}).populate("creator", {})
  res.json(kata);
}

const PrivateGetKata = async (req, res) => {
  const user = await User.findById(req.userId)
  const kata = await Kata.find({creator : user._id}).populate("creator", {})
  res.json(kata);
}

const getKataById = async (req, res) => {
  const kata = await Kata.findById(req.params.id);
  res.json(kata);
}

const postKata = async (req, res) => {
  const user = await User.findById(req.userId)//req.userId obtenido del Token  
  const { name, description, solution,Languages } = req.body;
  if(!name, !description, !solution, !Languages) return res.status(400).send('error proporcione informacion correcta');
  const kata = await new Kata({ name, description, solution, Languages, creator: user._id });
  const kataSaved = await kata.save();
  user.katas = user.katas.concat(kataSaved._id)
  await user.save()
  res.json(kataSaved);
}

const updateKata = async (req, res) => {
  const { name, description, intents, solution, Languages } = req.body;
  const newKata = { name, description,solution, Languages };
  const kataupdated = await Kata.findByIdAndUpdate(req.params.id, newKata); 
  await User.findByIdAndUpdate(req.params.id, kataupdated)
  res.json(kataupdated);
}

const updateKataexersice = async (req, res) => {
  const {exersiceResult,participants} = req.body
  if(!exersiceResult, !participants) return res.status(400).send('error proporcione informacion correcta');
  const kataupdated = await Kata.findByIdAndUpdate(req.params.id,{
    $push : {exersiceResult,participants}
  })
  res.json(kataupdated)
}

const deleteKata = async (req, res) => {
  await Kata.findByIdAndRemove(req.params.id);
  await User.findByIdAndRemove(req.params.id);
  res.json({ status: 'Kata Deleted' });
}

module.exports = { getKatas, getKataById, postKata, updateKata, deleteKata, updateKataexersice, PrivateGetKata,} 