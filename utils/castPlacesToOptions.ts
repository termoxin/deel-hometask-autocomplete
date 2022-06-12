import { Place, PlacesResponse, SuggestionBaseProps } from "@/types/index";

export const castPlacesToOptions = (
  data: PlacesResponse
): (SuggestionBaseProps & Place)[] =>
  data.map((place) => ({
    ...place,
    id: place.id,
    label: place.placeName,
  }));
