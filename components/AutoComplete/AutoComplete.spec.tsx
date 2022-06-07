import { render } from "@testing-library/react";

import { AutoComplete } from "./";

describe("AutoComplete", () => {
  test("should render properly", () => {
    const { getByText } = render(<AutoComplete />);

    expect(getByText("AutoComplete")).not.toBeFalsy();
  });
});
