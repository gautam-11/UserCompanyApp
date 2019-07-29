handleProfile = (req, res, db) => {
  const { id } = req.params;
  console.log("1", id);
  db.select("*")
    .from("users")
    .where("username", id)
    .then(user => {
      if (user.length) res.json(user[0]);
      else res.status(400).json("not found");
    })
    .catch(err => res.status(400).json("error getting user"));
};

module.exports = {
  handleProfile: handleProfile
};
