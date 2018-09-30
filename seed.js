const Hamoni = require("hamoni-sync");

let hamoni = new Hamoni("65879366-edcf-4167-ab97-b69869fbf6c9", "b3d66acccd044d088348938ae38d5606");

hamoni
  .connect()
  .then(response => {
    hamoni
      .createList("Web-Wesh", [
        { firstName: "James", lastName: "Darwin" },
        { firstName: "Jimmy", lastName: "August" }
      ])
      .then(() => console.log("create success"))
      .catch(console.log("seed.js"));
  })
  .catch(console.log("seed"));
