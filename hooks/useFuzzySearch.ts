import { useState, useEffect } from "react";
import { createFuzzyList } from "@utils/fuzzyScore";

interface MimeItem {
  _cachedScore?: number;
  score: (query: string) => number;
  _i: number;
  [key: string]: any;
}

const useFuzzySearch = (initialData: any) => {
  const mimes: MimeItem[] = createFuzzyList(initialData);
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<MimeItem[]>(mimes);
  useEffect(() => {
    let sorted: MimeItem[] = [];
    if (query) {
      sorted = initialData
        .filter((item) => {
          return (item._cachedScore = item.score(query)) >= 0.5;
        })
        .sort((a, b) => {
          var as = a._cachedScore as number;
          var bs = b._cachedScore as number;
          return as > bs ? -1 : as === bs && a._i < b._i ? -1 : 1;
        })
        .slice(0, 20);
    } else {
      sorted = initialData;
    }
    setData(sorted);
  }, [query, initialData]);
  return { query, data, setQuery };
};

export default useFuzzySearch;
