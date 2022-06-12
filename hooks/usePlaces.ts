import { useCallback, useState } from "react";

import { Place, SuggestionBaseProps } from "@/types/index";
import { castPlacesToOptions } from "@/utils/castPlacesToOptions";

export const usePlaces = () => {
  const [places, setPlaces] = useState<(SuggestionBaseProps & Place)[0]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaces = useCallback(
    async (searchValue: string) =>
      await fetch(`/api/places?search=${searchValue}`).then((r) => r.json()),
    []
  );

  const fetchData = useCallback(
    async (query: string) => {
      if (!error) {
        setError(undefined);
      }

      setIsLoading(true);

      await fetchPlaces(query)
        .then((data) => {
          setPlaces(castPlacesToOptions(data));
        })
        .catch((_error: Error) => {
          setError(_error.message);
          console.error(_error);
        })
        .finally(() => {
          // stop loading
          setIsLoading(false);
        });
    },
    [error, fetchPlaces]
  );

  return { places, fetchData, error, isLoading };
};
