import React, { FC } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SuggestionBaseProps } from "@/types/index";

import { AutoComplete } from "@/components/AutoComplete";
import { mockSuggestions } from "@/components/AutoComplete/AutoComplete.mock";
import { AutoCompleteProps } from "@/components/AutoComplete/AutoComplete.types";
import { useMockedAsyncSuggestionsProps } from "@/test-helpers/suggestions";

import s from "./AutoCompleteStory.module.scss";

export default {
  title: "Example/AutoComplete",
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<FC<AutoCompleteProps>> = (args) => {
  const { suggestions, onChange } = useMockedAsyncSuggestionsProps();

  return (
    <AutoComplete {...args} suggestions={suggestions} onChange={onChange} />
  );
};

export const Primary = Template.bind({});

Primary.args = {
  suggestions: mockSuggestions,
};

export const WithPlaceholder = Template.bind({});

WithPlaceholder.args = {
  suggestions: mockSuggestions,
  inputPlaceholder: "Enter country name...",
};

export const CustomizedStyles = Template.bind({});

CustomizedStyles.args = {
  suggestions: mockSuggestions,
  className: s.custom_autocomplete_container,
  inputClass: s.custom_input,
  itemClassName: s.custom_item,
  listClassName: s.custom_list,
  inputPlaceholder: "Enter country name...",
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
