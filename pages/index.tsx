import Head from "next/head";
import { useCallback, useMemo, useState } from "react";

import { PlacesResponse, Place } from "types/index";

import { AutoComplete } from "@/components/AutoComplete";

import s from "@/pages/index.module.scss";
import { AutoCompletePlaceItem } from "@/components/AutoCompletePlaceItem";

export default function Index() {
  const [suggestions, setSuggestions] = useState<PlacesResponse>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Place>();

  const transformedSuggestions = useMemo(
    () =>
      suggestions.map((suggestion) => ({
        ...suggestion,
        id: suggestion.id,
        label: suggestion.placeName,
      })),
    [suggestions]
  );

  const fetchSuggestions = useCallback(
    async (searchValue: string) => {
      const response = await fetch(`/api/places?search=${searchValue}`).then(
        (r) => r.json()
      );

      setSuggestions(response);
    },
    [setSuggestions]
  );

  const onSelected = useCallback(
    (place: Place) => setSelectedSuggestion(place),
    [setSelectedSuggestion]
  );

  const renderPropertyValue = (value: unknown) => {
    if (typeof value === "boolean") {
      return value ? "✅" : "❌";
    }

    return value.toString();
  };

  const properties = selectedSuggestion?.properties;

  return (
    <div className={s.container}>
      <Head>
        <title>AutoComplete component Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AutoComplete
          inputPlaceholder="Type a place name..."
          suggestions={transformedSuggestions}
          renderItem={(place) => <AutoCompletePlaceItem place={place} />}
          onChange={(searchValue) => fetchSuggestions(searchValue)}
          throttleTime={500}
          listClassName={s.custom_autocomplete_list}
          onEnter={onSelected}
          onClick={onSelected}
        />
        {selectedSuggestion && (
          <div className={s.selected_item_details}>
            <h3>🌍 {selectedSuggestion?.placeName}</h3>
            <div>
              {properties &&
                Object.entries(properties).map(([key, value]) => (
                  <p key={key}>
                    {key}: {renderPropertyValue(value)}
                  </p>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
