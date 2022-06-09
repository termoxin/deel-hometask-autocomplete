import Head from "next/head";
import { useState } from "react";

import { PlacesResponse, Place } from "types/index";

import { AutoComplete } from "@/components/AutoComplete";

import s from "@/pages/index.module.scss";

export default function Index() {
  const [suggestions, setSuggestions] = useState<PlacesResponse>([]);

  const renderItem = (place: Place) => {
    const { placeName, properties } = place;

    return (
      <p>
        {properties?.category && (
          <>
            <span className={s.custom_autocomplete_category}>
              📌 <b>{properties?.category}</b>
            </span>
            <br />
          </>
        )}
        <span>{placeName}</span>
      </p>
    );
  };

  const transformedSuggestions = suggestions.map((suggestion) => ({
    ...suggestion,
    id: suggestion.id,
    label: suggestion.placeName,
  }));

  const fetchSuggestions = async (searchValue: string) => {
    const response = await fetch(`/api/places?search=${searchValue}`).then(
      (r) => r.json()
    );

    setSuggestions(response);
  };

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
          renderItem={renderItem}
          onChange={(searchValue) => fetchSuggestions(searchValue)}
          throttleTime={500}
          listClassName={s.custom_autocomplete_list}
          onEnter={console.log}
          onClick={console.log}
        />
      </main>
    </div>
  );
}
