import { useCallback, useState } from "react";

import { Place, SuggestionBaseProps } from "@/types/index";
import { castPlacesToOptions } from "@/utils/castPlacesToOptions";
import { buildUrl } from "@/utils/url";
import { getCurrentNextApiUrl } from "@/utils/getNextApiUrl";

export const usePlaces = () => {
  const [places, setPlaces] = useState<(SuggestionBaseProps & Place)[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaces = useCallback(async (searchValue: string) => {
    return await fetch(
      buildUrl(`${getCurrentNextApiUrl()}/places`, {
        search: searchValue,
      })
    ).then((r) => r.json());
  }, []);

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
          // stop loading whatever happened
          setIsLoading(false);
        });
    },
    [error, fetchPlaces]
  );

  return { places, fetchData, error, isLoading };
};
