import React, { FC, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AutoComplete } from "@/components/AutoComplete";
import { mockSuggestions } from "@/components/AutoComplete/AutoComplete.mock";
import {
  AutoCompleteProps,
  BaseProps,
} from "@/components/AutoComplete/AutoComplete.types";

export default {
  title: "Example/AutoComplete",
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<FC<AutoCompleteProps>> = (args) => {
  const [suggestions, setSuggestions] = useState<BaseProps[]>([]);

  const onChange = (value: string) => {
    const filteredSuggestions = args.suggestions.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    setSuggestions(filteredSuggestions);
  };

  return (
    <AutoComplete {...args} suggestions={suggestions} onChange={onChange} />
  );
};

export const Primary = Template.bind({});

Primary.args = {
  suggestions: mockSuggestions,
  renderItem: (suggestion: BaseProps) => <>{suggestion.label}</>,
};
