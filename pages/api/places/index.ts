import type { NextApiRequest, NextApiResponse } from "next";

import { GetPlacesResponse } from "@/types/index";
import { buildUrl } from "@/utils/url";
import { DEFAULT_PLACES_FETCHING_LIMIT } from "constant";

export default async function places(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method, query } = req;
  const { search, limit } = query;

  try {
    if (method === "GET") {
      const searchParamsDictionary: Record<string, string> = {
        access_token: process.env.MAPBOX_PUBLIC_ACCESS_TOKEN || "",
        proximity: "ip",
        limit: limit ? (limit as string) : `${DEFAULT_PLACES_FETCHING_LIMIT}`,
      };

      const builtUrl = buildUrl(
        `${process.env.MAPBOX_GEOCODING_API_URL}/${search}.json`,
        searchParamsDictionary
      );

      const { features }: GetPlacesResponse = await fetch(builtUrl).then((r) =>
        r.json()
      );

      return res.send(
        features?.map(({ id, place_name, properties }) => ({
          id,
          placeName: place_name,
          properties: properties,
        }))
      );
    }

    return res.status(404).send({ message: "No such endpoint", error: true });
  } catch (error) {
    res.status(500).json((error as Error).message);
  }
}
