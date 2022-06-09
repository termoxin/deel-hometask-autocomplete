import React, { FC, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AutoComplete } from "@/components/AutoComplete";
import { mockSuggestions } from "@/components/AutoComplete/AutoComplete.mock";
import {
  AutoCompleteProps,
  SuggestionBaseProps,
} from "@/components/AutoComplete/AutoComplete.types";

export default {
  title: "Example/AutoComplete",
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<FC<AutoCompleteProps>> = (args) => {
  const [suggestions, setSuggestions] = useState<SuggestionBaseProps[]>([]);

  const suggestionsFilter =
    (suggestion: SuggestionBaseProps) => (value: string) =>
      suggestion.label.toLowerCase().indexOf(value.toLowerCase()) > -1;

  const fetchSuggestions = (
    value: string
  ): Promise<{ id: string; label: string }[]> =>
    new Promise((resolve, reject) => {
      try {
        const filteredSuggestions = args.suggestions.filter(suggestionsFilter);

        resolve(filteredSuggestions);
      } catch (err) {
        reject((err as Error).message);
      }
    });

  const onChange = async (value: string) => {
    const data = await fetchSuggestions(value);
    setSuggestions(data);
  };

  return (
    <AutoComplete {...args} suggestions={suggestions} onChange={onChange} />
  );
};

export const Primary = Template.bind({});

Primary.args = {
  suggestions: mockSuggestions,
  renderItem: (suggestion: SuggestionBaseProps) => <>{suggestion.label}</>,
};

export const WithPlaceholder = Template.bind({});

WithPlaceholder.args = {
  suggestions: mockSuggestions,
  inputPlaceholder: "Enter country name...",
  renderItem: (suggestion: SuggestionBaseProps) => <>{suggestion.label}</>,
};

export const CustomizedItem = Template.bind({});

CustomizedItem.args = {
  suggestions: mockSuggestions,
  renderItem: (suggestion: SuggestionBaseProps) => (
    <p>
      <span>Location id: {suggestion.id}</span>
      <br />
      <b>🌍{suggestion.label}</b>
    </p>
  ),
};
