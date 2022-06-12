import Head from "next/head";
import { useCallback, useState } from "react";

import { Place } from "types/index";

import s from "@/pages/index.module.scss";
import { AutoCompletePlaces } from "@/components/AutoCompletePlaces/AutoCompletePlaces";
import { usePlaces } from "@/hooks/usePlaces";
import { DEFAULT_AUTOCOMPLETE_PLACES_THROTTLE_TIME } from "@/constant";

export default function Index() {
  const { places, isLoading, fetchData } = usePlaces();
  const [selectedSuggestion, setSelectedSuggestion] = useState<Place>();

  const onSelected = useCallback(
    (place: Place) => setSelectedSuggestion(place),
    [setSelectedSuggestion]
  );

  const renderPropertyValue = useCallback((value: any) => {
    if (typeof value === "boolean") {
      return value ? "✅" : "❌";
    }

    return value?.toString();
  }, []);

  const onAutoCompleteChange = useCallback(
    (searchValue: string) => {
      if (searchValue.trim()) {
        fetchData(searchValue);
      }
    },
    [fetchData]
  );

  const properties = selectedSuggestion?.properties;

  return (
    <>
      <Head>
        <title>AutoComplete component Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={s.container}>
        <main>
          <AutoCompletePlaces
            inputPlaceholder="Type a place name..."
            suggestions={places}
            onChange={onAutoCompleteChange}
            throttleTime={DEFAULT_AUTOCOMPLETE_PLACES_THROTTLE_TIME}
            loading={isLoading}
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
    </>
  );
}
