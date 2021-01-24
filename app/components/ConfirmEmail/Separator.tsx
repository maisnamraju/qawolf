import styled from "styled-components";

import { breakpoints } from "../../theme/theme-new";
import Text from "../shared-new/Text";

const StyledText = styled(Text)`
  display: none;

  @media screen and (min-width: ${breakpoints.small.value}px) {
    display: block;
  }
`;

export default function Separator(): JSX.Element {
  return (
    <StyledText
      color="textDark"
      margin={{ horizontal: "xsmall" }}
      size="xsmall"
      weight="medium"
    >
      -
    </StyledText>
  );
}