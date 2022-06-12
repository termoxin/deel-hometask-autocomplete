import React, { FC } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  AutoCompletePlaceItem,
  AutoCompletePlaceItemProps,
} from "@/components/AutoCompletePlaceItem";

export default {
  title: "Example/AutoCompletePlaceItem",
  component: AutoCompletePlaceItem,
} as ComponentMeta<typeof AutoCompletePlaceItem>;

const Template: ComponentStory<FC<AutoCompletePlaceItemProps>> = (args) => (
  <AutoCompletePlaceItem {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  place: {
    id: "1",
    placeName:
      "Empire State Building, 350 5th Ave, New York, New York 10118, United States",
  },
};

export const WithCategory = Template.bind({});

WithCategory.args = {
  place: {
    id: "1",
    placeName:
      "Empire State Building, 350 5th Ave, New York, New York 10118, United States",
    properties: {
      category: "historic site, historic",
    },
  },
};

export const Highlighted = Template.bind({});

Highlighted.args = {
  search: "State Building",
  place: {
    id: "1",
    placeName:
      "Empire State Building, 350 5th Ave, New York, New York 10118, United States",
    properties: {
      category: "historic site, historic",
    },
  },
};
