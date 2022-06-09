import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC } from "react";

import { AutoComplete } from "./";
import {
  AUTOCOMPLETE_INPUT_TEST_ID,
  AUTOCOMPLETE_LIST_TEST_ID,
} from "./AutoComplete.constant";
import { AutoCompleteProps } from "./AutoComplete.types";

import { useMockedAsyncSuggestionsProps } from "@/test-helpers/suggestions";

type AutoCompleteWrapperProps = Omit<AutoCompleteProps, "suggestions">;

const props: AutoCompleteWrapperProps = {
  inputPlaceholder: "Placeholder is here",
};

const AutoCompleteWrapper: FC<AutoCompleteWrapperProps> = (props) => {
  const asyncProps = useMockedAsyncSuggestionsProps();

  return <AutoComplete {...asyncProps} {...props} />;
};

describe("AutoComplete", () => {
  test("should render properly", () => {
    const { getByTestId, queryByTestId } = render(
      <AutoCompleteWrapper {...props} />
    );

    expect(getByTestId(AUTOCOMPLETE_INPUT_TEST_ID)).toBeVisible();
    expect(queryByTestId(AUTOCOMPLETE_LIST_TEST_ID)).toBeNull();

    expect(
      (getByTestId(AUTOCOMPLETE_INPUT_TEST_ID) as HTMLInputElement).placeholder
    ).toBe(props.inputPlaceholder);
  });

  test("should input text", async () => {
    const { getByTestId } = render(<AutoCompleteWrapper {...props} />);

    const input = getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "Something");

    expect(input).toHaveValue("Something");
  });

  test("should input text and show list", async () => {
    const { getByTestId, getByText } = render(
      <AutoCompleteWrapper {...props} />
    );
    const input = getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "South");

    const list = getByTestId(AUTOCOMPLETE_LIST_TEST_ID);

    await waitFor(() => {
      expect(list.children.length).toBe(2);
      expect(getByText("South Dakota")).toBeVisible();
      expect(getByText("South Carolina")).toBeVisible();
    });
  });

  test("should be able to select items by arrow up and arrow down", async () => {
    const { getByTestId, getByText, getByRole } = render(
      <AutoCompleteWrapper {...props} />
    );

    const input = getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "Sou");

    const list = getByTestId(AUTOCOMPLETE_LIST_TEST_ID);

    await waitFor(() => {
      expect(list.children.length).toBe(3);
    });

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

  test("should render custom item", async () => {
    const { getByText, getByTestId } = render(
      <AutoCompleteWrapper
        {...props}
        renderItem={(suggestion) => (
          <p>
            Id: {suggestion.id} State: {suggestion.label}
          </p>
        )}
      />
    );

    const input = getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "South Dakota");

    await waitFor(() => {
      expect(getByText("Id: 48 State: South Dakota")).toBeVisible();
    });
  });

  test("should call onClick, onFocus, onBlur callbacks", async () => {
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const { getByText, getByTestId } = render(
      <AutoCompleteWrapper
        {...props}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={onClick}
      />
    );

    const input = getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "South Dakota");
    await userEvent.click(document.body);

    await waitFor(() => {
      expect(onFocus).toBeCalledTimes(1);
      expect(onBlur).toBeCalledTimes(1);
    });

    await userEvent.click(input);
    await userEvent.click(getByText("South Dakota"));

    await waitFor(() => {
      expect(onClick.mock.calls).toEqual([
        [{ id: "48", label: "South Dakota" }],
      ]);
    });
  });

  test("should call onChange, onEnter", async () => {
    const onChange = jest.fn<any, any>((value: string) => undefined);
    const onEnter = jest.fn();

    const { getByTestId } = render(
      <AutoCompleteWrapper {...props} onChange={onChange} onEnter={onEnter} />
    );

    const input = getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "South Dakota");

    await waitFor(() => {
      expect(onChange.mock.calls).toEqual([["S"], ["South Dakota"]]);
    });
  });

  test("should call onEnter", async () => {
    const onEnter = jest.fn();

    const { getByTestId } = await render(
      <AutoCompleteWrapper {...props} onEnter={onEnter} />
    );

    const input = getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "south");

    const list = getByTestId(AUTOCOMPLETE_LIST_TEST_ID);

    await waitFor(async () => {
      expect(list.children).toHaveLength(2);

      await userEvent.keyboard("{arrowdown}");
      await userEvent.keyboard("{enter}");

      expect(onEnter).lastCalledWith({
        id: "48",
        label: "South Dakota",
      });
    });
  });
});
