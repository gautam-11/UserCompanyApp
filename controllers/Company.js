handleActive = io => {
  io.on("connection", function() {
    console.log("connected");
  });
};

updateViews = (db, name) => {
  db("companies")
    .where("name", name)
    .increment("total_views", 1)
    .catch(err => console.log(err));
};
handleCompany = (req, res, db, io) => {
  handleActive(io);
  const { name } = req.params;
  console.log("1", name);
  updateViews(db, name);
  db.select("*")
    .from("companies")
    .where("name", name)
    .then(company => {
      if (company.length) res.json(company[0]);
      else res.status(400).json("not found");
    })
    .catch(err => res.status(400).json("error getting company"));
};

module.exports = {
  handleCompany: handleCompany
};
