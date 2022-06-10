export const scrollToItemIndex = <T extends HTMLElement>(
  element: T | null,
  index: number
) => {
  if (element) {
    const item = element.children.item(index);

    if (item) {
      item.scrollIntoView({ block: "nearest" });
    }
  }
};
