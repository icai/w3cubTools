import Calculator from "@components/Calculator";
import ConversionLayout from "@components/ConversionLayout";
import { Pane } from "evergreen-ui";

export default function TCalculator() {
  return (
    <>
      <ConversionLayout flexDirection="column" layoutHeight="600px">
        <Pane width="500px" height="100%" marginX="auto">
          <Calculator />
        </Pane>
      </ConversionLayout>
    </>
  );
}
