import { getAllByRole, render, screen, waitFor } from "@testing-library/react";
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
    render(<AutoCompleteWrapper {...props} />);

    expect(screen.getByTestId(AUTOCOMPLETE_INPUT_TEST_ID)).toBeVisible();
    expect(screen.queryByTestId(AUTOCOMPLETE_LIST_TEST_ID)).toBeNull();

    expect(
      (screen.getByTestId(AUTOCOMPLETE_INPUT_TEST_ID) as HTMLInputElement)
        .placeholder
    ).toBe(props.inputPlaceholder);
  });

  test("should input text", async () => {
    render(<AutoCompleteWrapper {...props} />);

    const input = screen.getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "Something");

    expect(input).toHaveValue("Something");
  });

  test("should input text and show list", async () => {
    render(<AutoCompleteWrapper {...props} />);
    const input = screen.getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "South");

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    await waitFor(() => {
      expect(screen.getByText("South Dakota")).toBeVisible();
    });

    await waitFor(() => {
      expect(screen.getByText("South Carolina")).toBeVisible();
    });
  });

  test("should be able to select items by arrow up and arrow down", async () => {
    render(<AutoCompleteWrapper {...props} />);

    const input = screen.getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "Sou");

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });

    expect(screen.getByText("South Dakota")).toBeVisible();
    expect(screen.getByText("South Carolina")).toBeVisible();
    expect(screen.getByText("Missouri")).toBeVisible();

    expect(screen.getByRole("listitem", { current: true })).toHaveTextContent(
      "Missouri"
    );

    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{arrowdown}");

    expect(screen.getByRole("listitem", { current: true })).toHaveTextContent(
      "South Carolina"
    );

    await userEvent.keyboard("{arrowup}");
    await userEvent.keyboard("{arrowup}");

    expect(screen.getByRole("listitem", { current: true })).toHaveTextContent(
      "South Dakota"
    );
  });

  test("should render custom item", async () => {
    render(
      <AutoCompleteWrapper
        {...props}
        renderItem={(suggestion) => (
          <p>
            Id: {suggestion.id} State: {suggestion.label}
          </p>
        )}
      />
    );

    const input = screen.getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "South Dakota");

    await waitFor(() => {
      expect(screen.getByText("Id: 48 State: South Dakota")).toBeVisible();
    });
  });

  test("should call onClick, onFocus, onBlur callbacks", async () => {
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    render(
      <AutoCompleteWrapper
        {...props}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={onClick}
      />
    );

    const input = screen.getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "South Dakota");
    await userEvent.click(document.body);

    await waitFor(() => {
      expect(onFocus).toBeCalledTimes(1);
    });

    await waitFor(() => {
      expect(onBlur).toBeCalledTimes(1);
    });

    await userEvent.click(input);
    await userEvent.click(screen.getByText("South Dakota"));

    await waitFor(() => {
      expect(onClick.mock.calls).toEqual([
        [{ id: "48", label: "South Dakota" }],
      ]);
    });
  });

  test("should call onChange, onEnter", async () => {
    const onChange = jest.fn<any, any>((_value: string) => undefined);
    const onEnter = jest.fn();

    render(
      <AutoCompleteWrapper {...props} onChange={onChange} onEnter={onEnter} />
    );

    const input = screen.getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "South Dakota");

    await waitFor(() => {
      expect(onChange.mock.calls).toEqual([["S"], ["South Dakota"]]);
    });
  });

  test("should call onEnter", async () => {
    const onEnter = jest.fn();

    render(<AutoCompleteWrapper {...props} onEnter={onEnter} />);

    const input = screen.getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "south");

    await waitFor(async () => {
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
      await userEvent.keyboard("{arrowdown}");
      await userEvent.keyboard("{enter}");
    });

    await waitFor(() => {
      expect(onEnter).lastCalledWith({
        id: "48",
        label: "South Dakota",
      });
    });
  });

  test("should make item active when hovered and arrow downed", async () => {
    render(<AutoCompleteWrapper {...props} />);

    const input = screen.getByTestId(AUTOCOMPLETE_INPUT_TEST_ID);

    await userEvent.type(input, "A");

    await waitFor(async () => {
      const californiaItem = screen.getByText("California");

      await userEvent.hover(californiaItem);
      await userEvent.keyboard("{arrowdown}");

      expect(screen.getByRole("listitem", { current: true })).toHaveTextContent(
        "Colorado"
      );
    });
  });
});
