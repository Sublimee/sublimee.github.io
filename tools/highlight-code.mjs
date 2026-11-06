import { readFile, writeFile } from "node:fs/promises";
import Prism from "prismjs";
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-kotlin.js";

// npm run highlight:post -- posts/article.html
const files = process.argv.slice(2);
if (files.length === 0) {
  throw new Error("Pass one or more post HTML paths to highlight.");
}

const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
function decodeCode(markup) {
  return markup.replace(/<\/?span\b[^>]*>/g, "").replace(
    /&(amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi,
    (entity, name) => {
      if (!name.startsWith("#")) return entities[name.toLowerCase()];
      const hex = name[1].toLowerCase() === "x";
      return String.fromCodePoint(parseInt(name.slice(hex ? 2 : 1), hex ? 16 : 10));
    },
  );
}

for (const file of files) {
  const html = await readFile(file, "utf8");
  let count = 0;
  const highlighted = html.replace(
    /(<pre><code class="language-(java|kotlin)">)([\s\S]*?)(<\/code><\/pre>)/g,
    (_, opening, language, markup, closing) => {
      count++;
      const code = decodeCode(markup);
      return opening + Prism.highlight(code, Prism.languages[language], language) + closing;
    },
  );
  if (highlighted !== html) await writeFile(file, highlighted, "utf8");
  console.log(`${file}: highlighted ${count} Java/Kotlin code blocks`);
}
