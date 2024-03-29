import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AlignmentCell } from "./AlignmentCell";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(AlignmentCell.name, "MediaAlignmentTable"),
  component: AlignmentCell,
} as ComponentMeta<typeof AlignmentCell>;

const Template: ComponentStory<typeof AlignmentCell> = (args) => <AlignmentCell {...args} />;

export const Available = Template.bind({});
Available.args = {
  state: "available",
  label: "Sodium chloride",
};

export const None = Template.bind({});
None.args = {
  state: "none",
  label: "Sodium chloride",
};

export const Grouped = Template.bind({});
Grouped.args = {
  state: "grouped",
  label: "Sodium chloride",
};
