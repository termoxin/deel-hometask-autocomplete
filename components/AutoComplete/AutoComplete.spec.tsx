import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AutoComplete } from "./";
import {
  AUTOCOMPLETE_INPUT_TEST_ID,
  AUTOCOMPLETE_LIST_TEST_ID,
} from "./AutoComplete.constant";
import { mockSuggestions } from "./AutoComplete.mock";

const props = {
  suggestions: mockSuggestions,
  inputPlaceholder: "Type something in here",
};

describe("AutoComplete", () => {
  test("should render properly", () => {
    const { getByTestId, queryByTestId } = render(<AutoComplete {...props} />);

    expect(getByTestId(AUTOCOMPLETE_INPUT_TEST_ID)).toBeVisible();
    expect(queryByTestId(AUTOCOMPLETE_LIST_TEST_ID)).toBeNull();

    expect(
      (getByTestId(AUTOCOMPLETE_INPUT_TEST_ID) as HTMLInputElement).placeholder
    ).toBe(props.inputPlaceholder);
  });

  test("should input text", async () => {
    const { getByTestId } = render(<AutoComplete {...props} />);

    const input = getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "Something");

    expect(input).toHaveValue("Something");
  });

  test("should input text and show list", async () => {
    const { getByTestId, getByText } = render(<AutoComplete {...props} />);
    const input = getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "South");

    const list = getByTestId(AUTOCOMPLETE_LIST_TEST_ID);

    expect(list.children.length).toBe(2);
    expect(getByText("South Dakota")).toBeVisible();
    expect(getByText("South Carolina")).toBeVisible();
  });

  test("should be able to select items by arrow up and arrow down", async () => {
    const { getByTestId, getByText, getByRole } = render(
      <AutoComplete {...props} />
    );

    const input = getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "Sou");

    const list = getByTestId(AUTOCOMPLETE_LIST_TEST_ID);

    expect(list.children.length).toBe(3);

    expect(getByText("South Dakota")).toBeVisible();
    expect(getByText("South Carolina")).toBeVisible();
    expect(getByText("Missouri")).toBeVisible();

    expect(getByRole("listitem", { current: true })).toHaveTextContent(
      "Missouri"
    );

    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{arrowdown}");

    expect(getByRole("listitem", { current: true })).toHaveTextContent(
      "South Carolina"
    );

    await userEvent.keyboard("{arrowup}");
    await userEvent.keyboard("{arrowup}");

    expect(getByRole("listitem", { current: true })).toHaveTextContent(
      "South Dakota"
    );
  });
});
