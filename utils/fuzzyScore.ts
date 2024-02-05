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

export const createFuzzyList = (data: any[], scoreKeys: any[] = []) => {
  return data.map(function (aliases: any, index) {
    var scorers: ((query: string) => number)[] = [];

    // if aliases is an array, the first element is the primary alias
    if (Array.isArray(aliases)) {
      for (let i = 0; i < aliases.length; i++) {
        let alias = aliases[i];
        if (/[\s-_,()]+/.test(alias)) {
          // Split words into separate aliases
          [].push.apply(aliases, alias.split(/[\s-_,()]+/));
        }
        scorers.push(createFuzzyScorer(alias));
      }
    } else if (typeof aliases === "object") {
      // if aliases is an object, the first property is the primary alias
      let aliasValues = [] as any;
      let index = 0;
      for (let alias in aliases) {
        // add scoreKeys values to the list of aliases
        if (scoreKeys.indexOf(alias) !== -1) {
          // if the value is an array, add each element to the list of aliases
          if (Array.isArray(aliases[alias])) {
            [].push.apply(aliasValues, aliases[alias]);
          } else if (/[\s-_,()]+/.test(aliases[alias])) {
            // Split words into separate aliases
            [].push.apply(aliasValues, aliases[alias].split(/[\s-_,()]+/));
          } else {
            aliasValues.push(aliases[alias]);
          }
          scorers.push(createFuzzyScorer(aliasValues[index]));
          index++;
        }
      }
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
