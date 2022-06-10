import { buildUrl } from "./url";

describe("buildFetchingUrl", () => {
  it("should return url with params", () => {
    const url = buildUrl(window.location.href, {
      search: "something",
      limit: 20,
      offset: 10,
    });

    expect(url).toBe("http://localhost/?search=something&limit=20&offset=10");
  });

  it("should return url with no params", () => {
    const url = buildUrl(window.location.href, {});

    expect(url).toBe("http://localhost/");
  });
});
