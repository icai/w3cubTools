var ghpages = require("gh-pages");
ghpages.publish(
  "out",
  {
    branch: "master",
    repo: "git@github.com:w3cub/w3cubTools-alpha.git"
  },
  err => {
    console.log(err);
  }
);
