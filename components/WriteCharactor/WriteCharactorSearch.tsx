import { SearchInput, Pane } from "evergreen-ui";
import { useState, useEffect } from "react";

export default function(props) {
  const [char, setChar] = useState("");
  useEffect(() => {
    setChar(props.char);
  }, [props.char]);
  return (
    <>
      <SearchInput
        placeholder="Input Charactor"
        position={"absolute"}
        onChange={e => {
          setChar(e.target.value);
          props.onSearch(e.target.value);
        }}
        value={char}
        width={"600px"}
        marginX="auto"
        height={40}
        marginBottom={10}
      />
    </>
  );
}
