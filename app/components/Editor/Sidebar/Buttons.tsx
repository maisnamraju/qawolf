import { Box } from "grommet";
import { useContext } from "react";

import { useOnHotKey } from "../../../hooks/onHotKey";
import { state } from "../../../lib/state";
import { copy } from "../../../theme/copy";
import { borderSize, edgeSize } from "../../../theme/theme-new";
import Button from "../../shared-new/AppButton";
import Environments from "../../shared-new/Environments";
import Edit from "../../shared-new/icons/Edit";
import Play from "../../shared-new/icons/Play";
import { StateContext } from "../../StateContext";
import { Selection } from "../hooks/selection";

const width = `calc(50% - (${edgeSize.xxsmall} / 2))`;

type Props = {
  isActionDisabled: boolean;
  isRun: boolean;
  onAction: () => void;
  runEnvironmentId: string;
  selection: Selection;
};

export default function Buttons({
  isActionDisabled,
  isRun,
  onAction,
  runEnvironmentId,
  selection,
}: Props): JSX.Element {
  const { environmentId } = useContext(StateContext);

  const handleEnvironmentClick = (environmentId: string): void => {
    state.setEnvironmentId(environmentId);
  };

  useOnHotKey({ hotKey: "Enter", onHotKey: onAction, requireMeta: true });

  const runLabel = selection
    ? copy.runLines(selection.endLine - selection.startLine + 1)
    : copy.runTest;

  return (
    <Box
      border={{ color: "gray9", side: "top", size: borderSize.xsmall }}
      direction="row"
      flex={false}
      justify="between"
      pad="small"
    >
      <Environments
        isDisabled={isRun}
        onEnvironmentClick={handleEnvironmentClick}
        selectedEnvironmentId={isRun ? runEnvironmentId : environmentId}
        width={width}
      />
      <Button
        IconComponent={isRun ? Edit : Play}
        isDisabled={isActionDisabled}
        justify="center"
        label={isRun ? copy.editTest : runLabel}
        onClick={onAction}
        type="primary"
        width={width}
      />
    </Box>
  );
}
