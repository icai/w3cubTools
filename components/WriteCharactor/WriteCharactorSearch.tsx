import { SearchInput, Pane } from "evergreen-ui";
import { useState, useEffect } from "react";

export default function WriteCharactorSearch(props) {
  const { onSearch, char, ...rest } = props;
  const [value, setChar] = useState("");
  useEffect(() => {
    setChar(char);
  }, [char]);
  return (
    <>
      <SearchInput
        placeholder="Input Charactor"
        onChange={e => {
          setChar(e.target.value);
          onSearch(e.target.value);
        }}
        value={value}
        width={"600px"}
        display="block"
        margin={"auto"}
        height={40}
        marginBottom={10}
        {...rest}
      />
    </>
  );
}
