import ConversionLayout from "@components/ConversionLayout";
import * as React from "react";
import { Button } from "evergreen-ui";

const exmaple =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAIAAABuYg/PAAACgUlEQVR4nOyWvUvzXhTHb5pEiIkYFHRRCAhu1RjRiG+Db4iujoKL4OLg6j/g6NylYzsH+ke0paVpS+jSNl3aUkrp+1JIkx/8ApfjTZOHLg7P0zud870n53PuvSc3YRzHQb81Qr9GWsAWsH8XxkDn+/u72WxC5f39XZIk7Eaj0XK57N4DjuNQFPX19UXTtDtr2/bn5+d0OsXxW1tbHx8fs2GTySSRSEBlb28PwiKRyHA4hAHPz8/hcNi1TdPUNA3Ovr6+QvfHNt7c3BALLxaL2DZNczAYEAH5fB7buq4Ts0TCHzBFUdbX16GSy+VgLoqiAmCwMoTQxsbG/v6+L4ym6aurK6g0Go12u+3NOxMGK3OXFQqFfGEIodvbW0JJJpMBsHq93mq1EEKj0aharcKpu7s7IpiEnZ6e8jwPFfckxuNxpVLxwvDuZbNZ+LVaXV09Pj7+A4xlWaKiVCrlZrRt21V4nhcEAQe4u0d0x8PDA34lfGFuHHRrtVqv14N7GP5/EEtPp9PwqcfHR2/mGbCzszNRFKGSyWTg4auqenR0hF3DMPr9vmEYWNnc3IQBQTCapon3Q9f1QqGAXVmWYU9blhWPxy3Lwoq3y3xh3mhN0/DFwTDMwcGBLMuwrWOxGIz39mEQTFXV5eVl7Ha7XWzv7u5yHCcIws7ODhY7nQ62RVFUFGUOGMdxl5eXfnW4xsxTQQhdX1+zLDsHDCF0f38/U8dVy7I814NBsPPzc2+BjuMcHh4SVDh4nj85OZkbtrKygncMD0mS8E29vb29trZGBFxcXCwtLfnlZPwmEEIvLy/ERwAvyx1vb2+lUgkqT09PAQmpxe/3AraA/V2w/wIAAP//kdDhyy4UpR4AAAAASUVORK5CYII=";

export default function TBase64toImage() {
  return (
    <ConversionLayout
      layoutHeight="700px"
      flexDirection="row"
      transformer={({ value, setResult, result, setValue }) => {
        return (
          <>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => {
                var str = value.trim();
                // data:image/png;base64
                if (str.substring(0, 4) != "data") {
                  str = "data:image/png;base64," + str;
                }
                setResult(str);
              }}
            >
              Generate Image
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              intent="danger"
              appearance="primary"
              display="block"
              whiteSpace="nowrap"
              onClick={() => {
                setResult("");
                setValue("");
              }}
            >
              Empty All
            </Button>
            <Button
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              onClick={() => {
                var str = exmaple.trim();
                setValue(str);
                // data:image/png;base64
                if (str.substring(0, 4) != "data") {
                  str = "data:image/png;base64," + str;
                }
                setResult(str);
              }}
            >
              Get Example
            </Button>
            <Button
              is="a"
              marginRight={10}
              height={40}
              margin="5px"
              display="block"
              whiteSpace="nowrap"
              download="image.jpg"
              href={result}
            >
              Download Image
            </Button>
          </>
        );
      }}
      defaultValue=""
      resultRender={({ result }) => {
        if (result) {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%"
              }}
            >
              <img src={result} className="" />
            </div>
          );
        }
        return null;
      }}
    />
  );
}
