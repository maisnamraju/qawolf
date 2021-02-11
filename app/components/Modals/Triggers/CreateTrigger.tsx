import { Box } from "grommet";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import { useCreateTrigger } from "../../../hooks/mutations";
import { Trigger, TriggerFields } from "../../../lib/types";
import { copy } from "../../../theme/copy";
import Header from "../../shared-new/Modal/Header";
import Tabs from "../../shared-new/Tabs";
import Tab from "../../shared-new/Tabs/Tab";
import { StateContext } from "../../StateContext";
import ScheduleForm from "./ScheduleForm";

type Props = {
  closeModal: () => void;
  onBack: () => void;
  triggers: Trigger[];
};

type Mode = "deployment" | "onDemand" | "schedule";

const options: Mode[] = ["schedule", "deployment", "onDemand"];

export default function CreateTrigger({
  closeModal,
  onBack,
  triggers,
}: Props): JSX.Element {
  const { teamId } = useContext(StateContext);
  const {
    query: { test_id },
  } = useRouter();

  const [createTrigger, { loading }] = useCreateTrigger();

  const [mode, setMode] = useState<Mode>("schedule");

  const tabs = options.map((option) => {
    return (
      <Tab
        isSelected={option === mode}
        key={option}
        label={copy[option]}
        onClick={() => setMode(option)}
        style={{ width: "33.3333%" }}
        type="light"
      />
    );
  });

  const handleSave = (fields: TriggerFields): void => {
    createTrigger({
      variables: {
        ...fields,
        team_id: teamId,
        test_ids: [test_id as string],
      },
    }).then(onBack);
  };

  return (
    <Box flex={false}>
      <Header closeModal={closeModal} label={copy.createTrigger} />
      <Box margin={{ top: "xxsmall" }}>
        <Tabs type="light">{tabs}</Tabs>
        <Box margin={{ top: "medium" }}>
          {mode === "schedule" && (
            <ScheduleForm
              isLoading={loading}
              onBack={onBack}
              onSave={handleSave}
              triggers={triggers}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
