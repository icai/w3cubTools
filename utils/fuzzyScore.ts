export function createFuzzyScorer(text: string) {
  var matcher = makeFuzzyRegex(text);

  return function (query: string) {
    var match = matcher.exec(query);

    if (!match) return 0;

    var captures = match.slice(1);
    var score = 0;

    for (var i = 0, l = captures.length; i < l; i += 3) {
      var relevancyOfCharacter = Math.pow(i + 1, -2);
      if (captures[i]) score -= relevancyOfCharacter * 0.1;
      if (captures[i + 1]) score += relevancyOfCharacter * 1;
      if (captures[i + 2]) score -= relevancyOfCharacter * 0.1;
    }

    return score;
  };

  function makeFuzzyRegex(string: string) {
    if (!string) {
      return /^$/;
    }

    // Escape any potential special characters:
    var cleansed = string.replace(/\W/g, "\\$&");

    return RegExp(
      "^" +
        cleansed.replace(
          // Find every escaped and non-escaped char:
          /(\\?.)/g,
          // Replace with fuzzy character matcher:
          "(?:(^.)?($1)(.??))?"
        ) +
        "$",
      "i"
    );
  }
}

export const createFuzzyList = (data: string[][], key?: string) => {
  return data.map(function (aliases, index) {
    var scorers: ((query: string) => number)[] = [];

    for (var i = 0; i < aliases.length; i++) {
      var alias = key ? aliases[i]?.[key] : aliases[i];
      if (/[\s-_,()]+/.test(alias)) {
        // Split words into separate aliases
        [].push.apply(aliases, alias.split(/[\s-_,()]+/));
      }
      scorers.push(createFuzzyScorer(alias));
    }

    function score(query: string) {
      var s = 0;
      for (var i = 0, l = scorers.length; i < l; i++) {
        s = Math.max(s, scorers[i](query));
      }
      return s;
    }

    return {
      score: score,
      _i: index,
      ...aliases,
      toString: function () {
        return aliases[1];
      },
    };
  });
};
