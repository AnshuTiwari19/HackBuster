let dataStore = [];

exports.saveData = (req, res) => {
  dataStore.push(req.body);
  res.json({ message: 'Data saved' });
};

exports.getData = (req, res) => {
  res.json(dataStore);
};