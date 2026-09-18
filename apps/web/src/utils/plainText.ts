const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

// Wallets customised before #858 stored HTML in `about`. The result is always
// rendered as a text node, never as markup, so an imperfect strip is safe.
export const toPlainText = (html: string): string =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, (m) => ENTITIES[m] ?? m)
    .trim();
