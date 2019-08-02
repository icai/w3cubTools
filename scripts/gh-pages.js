var ghpages = require("gh-pages");
ghpages.publish(
  "out",
  {
    branch: "gh-pages",
    dotfiles: true,
    repo: "git@github.com:w3cub/w3cubTools-alpha.git"
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);
