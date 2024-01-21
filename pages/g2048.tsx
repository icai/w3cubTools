import Container from "@components/g2048/container";
import ConversionLayout from "@components/ConversionLayout";
export default function Game2048() {
  return (
    <ConversionLayout flexDirection="column" layoutHeight="auto">
      <Container size="4" startTiles="2" />
    </ConversionLayout>
  );
}
