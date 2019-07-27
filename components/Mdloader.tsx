import { Pane } from "evergreen-ui";
import { useRouter } from "next/router";
import "@styles/markdown.css";

// @ts-ignore
const files = require.context("@md/", false, /\.md$/);
const modules = {};
files.keys().forEach(key => {
  modules[key.replace(/\.\//, "/").replace(/(\.md)/g, "")] = files(key).default;
});

export default function MDloader() {
  const router = useRouter();
  const MD = modules[router.pathname];
  return (
    <>
      {MD && (
        <Pane
          marginTop="60px"
          borderColor="#eaecef"
          borderStyle="solid"
          borderWidth="1px"
          padding="20px"
          className="markdown-body"
        >
          <span className="edit">
            <span>[</span>
            <a
              href={`https://github.com/w3cub/w3cubtools-md/blob/master${router.pathname}.md`}
              target="_blank"
              title="Edit Description Page"
            >
              edit
            </a>
            <span>]</span>
          </span>
          <MD />
        </Pane>
      )}
    </>
  );
}
