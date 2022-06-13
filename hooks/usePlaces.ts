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
    ).then((response) => response.json());
  }, []);

  const fetchData = useCallback(
    async (query: string) => {
      try {
        if (!error) {
          setError(undefined);
        }

        setIsLoading(true);

        const data = await fetchPlaces(query);

        setPlaces(castPlacesToOptions(data));
      } catch (err) {
        setError((err as Error).message);
        console.error(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [error, fetchPlaces]
  );

  return { places, fetchData, error, isLoading };
};
