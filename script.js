const listNode = document.getElementById("articles-list");
const emptyNode = document.getElementById("articles-empty");

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(rawDate) {
  const parsed = new Date(`${rawDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return rawDate;
  }
  return dateFormatter.format(parsed);
}

function buildArticleItem(post) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  const time = document.createElement("time");
  const textWrap = document.createElement("div");
  const title = document.createElement("span");

  li.className = "article-item";
  link.className = "article-link";
  link.href = post.url;

  time.dateTime = post.date;
  time.textContent = formatDate(post.date);

  title.className = "article-title";
  title.textContent = post.title;

  textWrap.appendChild(title);
  if (post.description) {
    const description = document.createElement("p");
    description.className = "article-description";
    description.textContent = post.description;
    textWrap.appendChild(description);
  }

  link.appendChild(time);
  link.appendChild(textWrap);
  li.appendChild(link);
  return li;
}

async function loadPosts() {
  if (!listNode || !emptyNode) {
    return;
  }

  try {
    const response = await fetch("posts/posts.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const posts = await response.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      emptyNode.hidden = false;
      return;
    }

    posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .forEach((post) => {
        listNode.appendChild(buildArticleItem(post));
      });
  } catch (error) {
    console.error("Failed to load posts list", error);
    emptyNode.textContent = "Не удалось загрузить список статей.";
    emptyNode.hidden = false;
  }
}

loadPosts();
