import { useState } from "react";

import { mockSuggestions } from "@/components/AutoComplete/AutoComplete.mock";
import { SuggestionBaseProps } from "@/components/AutoComplete/AutoComplete.types";

const suggestionsFilter =
  (value: string) => (suggestion: SuggestionBaseProps) =>
    suggestion.label.toLowerCase().indexOf(value.toLowerCase()) > -1;

const mockFetchSuggestions = (
  value: string
): Promise<{ id: string; label: string }[]> =>
  new Promise((resolve, reject) => {
    try {
      const filteredSuggestions = mockSuggestions.filter(
        suggestionsFilter(value)
      );

      resolve(filteredSuggestions);
    } catch (err) {
      reject((err as Error).message);
    }
  });

export const useMockedAsyncSuggestionsProps = () => {
  const [suggestions, setSuggestions] = useState<SuggestionBaseProps[]>([]);

  const onChange = async (value: string) => {
    const data = await mockFetchSuggestions(value);
    setSuggestions(data);
  };

  return { suggestions, onChange };
};
