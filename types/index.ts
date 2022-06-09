export interface ThrottleOptions {
  /**
   * Fire immediately on the first call.
   */
  start?: boolean;
  /**
   * Fire as soon as `wait` has passed.
   */
  middle?: boolean;
  /**
   * Cancel after the first successful call.
   */
  once?: boolean;
}

export interface Throttler<T extends unknown[]> {
  (...args: T): void;
  cancel(): void;
}
interface PlaceProperties {
  category: string;
}

export interface Place {
  id: string;
  placeName: string;
  properties?: PlaceProperties;
}

export type PlacesResponse = Place[];

export type SuggestionBaseProps = {
  id: string;
  label: string;
};
