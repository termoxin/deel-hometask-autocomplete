import { DEFAULT_PLACES_FETCHING_LIMIT } from "constant";
import type { NextApiRequest, NextApiResponse } from "next";

interface PlacesParams {
  search: string | string[];
  limit?: string;
}

const buildFetchingUrl = ({ limit, search }: PlacesParams) => {
  const searchParamsDictionary: Record<string, string> = {
    access_token: process.env.MAPBOX_PUBLIC_ACCESS_TOKEN || "",
    proximity: "ip",
    limit: limit ? limit : `${DEFAULT_PLACES_FETCHING_LIMIT}`,
  };

  const url = new URL(`${process.env.MAPBOX_GEOCODING_API_URL}/${search}.json`);

  for (let param in searchParamsDictionary) {
    url.searchParams.set(param, searchParamsDictionary[param]);
  }

  return url.href;
};

export default async function places(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  const { method, query } = req;
  const { search, limit } = query;

  try {
    if (method === "GET") {
      const response = await fetch(
        buildFetchingUrl({ search, limit: limit as string })
      ).then((r) => r.json());

      return res.send(
        response.features.map(({ id, place_name, properties }: any) => ({
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
