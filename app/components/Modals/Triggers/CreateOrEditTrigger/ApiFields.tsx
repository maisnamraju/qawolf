import { Box } from "grommet";
import { useContext } from "react";

import { useTeam } from "../../../../hooks/queries";
import { copy } from "../../../../theme/copy";
import { borderSize, colors, textDesktop } from "../../../../theme/theme-new";
import Text from "../../../shared-new/Text";
import { StateContext } from "../../../StateContext";
import { labelTextProps } from "../helpers";

type Props = { editTriggerId?: string };

export default function ApiFields({ editTriggerId }: Props): JSX.Element {
  const { teamId } = useContext(StateContext);

  const { data } = useTeam({ id: teamId });
  const team = data?.team;

  const apiKey = team?.api_key || copy.apiKeyHere;
  const triggerId = editTriggerId || team?.next_trigger_id || copy.triggerId;

  const apiCall = `curl -H "Authorization: ${apiKey}" https://www.qawolf.com/api/suites --data '{"trigger_id": "${triggerId}"}'`;

  return (
    <>
      <Text {...labelTextProps} size="component">
        {copy.apiDetail}
      </Text>
      <Box background="gray2" pad="small" round={borderSize.small}>
        <code
          style={{
            color: colors.gray9,
            fontSize: textDesktop.componentParagraph.size,
            lineHeight: textDesktop.componentParagraph.height,
          }}
        >
          {apiCall}
        </code>
      </Box>
    </>
  );
}