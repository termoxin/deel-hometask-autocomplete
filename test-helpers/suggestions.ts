import { useState } from "react";

import { mockSuggestions } from "@/components/AutoComplete/AutoComplete.mock";
import { SuggestionBaseProps } from "@/types/index";
import { DEFAULT_AUTOCOMPLETE_THROTTLE_TIME } from "@/constant";

const suggestionsFilter =
  (value: string) => (suggestion: SuggestionBaseProps) =>
    suggestion.label.toLowerCase().indexOf(value.toLowerCase()) > -1;

const mockFetchSuggestions = (
  value: string,
  delay?: boolean
): Promise<{ id: string; label: string }[]> =>
  new Promise((resolve, reject) => {
    try {
      const filteredSuggestions = mockSuggestions.filter(
        suggestionsFilter(value)
      );

      if (typeof delay === "undefined") {
        resolve(filteredSuggestions);
      } else {
        setTimeout(() => {
          resolve(filteredSuggestions);
        }, DEFAULT_AUTOCOMPLETE_THROTTLE_TIME);
      }
    } catch (err) {
      reject((err as Error).message);
    }
  });

export const useMockedAsyncSuggestionsProps = (delay?: boolean) => {
  const [suggestions, setSuggestions] = useState<SuggestionBaseProps[]>([]);
  const [isLoading, setLoading] = useState(false);

  const onChange = async (value: string) => {
    setLoading(true);

    await mockFetchSuggestions(value, delay)
      .then((data) => setSuggestions(data))
      .finally(() => setLoading(false));
  };

  return { suggestions, isLoading, onChange };
};
