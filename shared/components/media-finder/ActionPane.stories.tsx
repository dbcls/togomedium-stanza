import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { ActionPane } from "./ActionPane";
import { useSelectedMediaMutators } from "../../state/media-finder/selectedMedia";
import { LabelInfo } from "../../utils/labelInfo";
import { makeComponentStoryTitle } from "../../utils/storybook";

type WrapperProps = { selectedMedia: LabelInfo[] } & ComponentProps<typeof ActionPane>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setSelectedMedia } = useSelectedMediaMutators();
  useEffect(() => {
    setSelectedMedia(args.selectedMedia);
  }, [args.selectedMedia]);
  return <ActionPane {...args} />;
};

export default {
  title: makeComponentStoryTitle(ActionPane.name, "MediaFinder"),
  component: Wrapper,
  args: { actionLabel: "compare media" },
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const NoSelection = Template.bind({});
NoSelection.args = {
  selectedMedia: [],
};

export const OneSelection = Template.bind({});
OneSelection.args = {
  selectedMedia: [{ id: "aa", label: "aa" }],
};

export const MultipleSelection = Template.bind({});
MultipleSelection.args = {
  selectedMedia: [
    { id: "aa", label: "aa" },
    { id: "bb", label: "bb" },
    { id: "cc", label: "cc" },
  ],
};
