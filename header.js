const headerScriptUrl = new URL(document.currentScript?.src ?? "header.js", document.baseURI);
const siteRootUrl = new URL(".", headerScriptUrl);
const homeHref = siteRootUrl.pathname;
const resumeHref = new URL("Gusev_Maksim_CV.pdf", siteRootUrl).pathname;
const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = `
  <header class="site-header">
    <div class="header-top">
      <a class="brand" href="${homeHref}">magusev.ru</a>
      <nav class="menu" aria-label="Основная навигация">
        <a
          class="social-link"
          href="https://t.me/senior_junior_dev"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Telegram"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M21.3 4.27a1.68 1.68 0 0 0-1.72-.24L3.02 10.35c-.8.3-.78 1.44.03 1.7l4.23 1.37 1.62 5.18c.22.7 1.1.9 1.59.38l2.38-2.55 4.68 3.42c.73.53 1.76.13 1.93-.75l2.09-13.74c.1-.45-.1-.92-.27-1.09ZM9.32 17.16l-.92-2.95 8.77-6.8-6.79 7.65-.18 2.1-.88-.01Z"
            />
          </svg>
          <span>Telegram</span>
        </a>
        <a
          class="social-link"
          href="https://www.linkedin.com/in/maksim-gusev-b70670b1/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6.94 8.5A1.94 1.94 0 1 1 6.94 4.62a1.94 1.94 0 0 1 0 3.88ZM5.3 9.9h3.28v9.48H5.3V9.9Zm5.14 0h3.14v1.3h.04c.44-.83 1.5-1.7 3.08-1.7 3.3 0 3.9 2.06 3.9 4.74v5.14h-3.27v-4.55c0-1.08-.02-2.47-1.6-2.47-1.6 0-1.85 1.18-1.85 2.4v4.62h-3.44V9.9Z"
            />
          </svg>
          <span>LinkedIn</span>
        </a>
        <a
          class="social-link"
          href="${resumeHref}"
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6.75 2.75A2.75 2.75 0 0 0 4 5.5v13A2.75 2.75 0 0 0 6.75 21.25h10.5A2.75 2.75 0 0 0 20 18.5V8.62a2.75 2.75 0 0 0-.8-1.94l-3.13-3.13a2.75 2.75 0 0 0-1.94-.8H6.75Zm7 1.5v3c0 1.52 1.23 2.75 2.75 2.75h2v8.5c0 .69-.56 1.25-1.25 1.25H6.75c-.69 0-1.25-.56-1.25-1.25v-13c0-.69.56-1.25 1.25-1.25h7Zm1.5 1.06L17.94 8H16.5c-.69 0-1.25-.56-1.25-1.25V5.31ZM8 12.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 8 12.25Zm0 3a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 8 15.25Z"
            />
          </svg>
          <span>Резюме</span>
        </a>
      </nav>
    </div>
    <div class="header-meta">
      <p class="meta-item" id="about">
        <strong>Обо мне:</strong>
        Гусев Максим, технический лидер разработки Java/Kotlin в Альфа-Банке
      </p>
    </div>
  </header>
`;

function renderSiteHeaders() {
  document.querySelectorAll("site-header").forEach((placeholder) => {
    placeholder.replaceWith(headerTemplate.content.firstElementChild.cloneNode(true));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderSiteHeaders);
} else {
  renderSiteHeaders();
}
