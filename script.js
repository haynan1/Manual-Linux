const contentEl = document.getElementById("content");
const statusEl = document.getElementById("status");
const projectTitleEl = document.getElementById("project-title");
const projectSubtitleEl = document.getElementById("project-subtitle");
const heroTitleEl = document.getElementById("hero-title");
const heroDescriptionEl = document.getElementById("hero-description");
const themeToggleEl = document.getElementById("theme-toggle");
const tocToggleEl = document.getElementById("toc-toggle");
const tocListEl = document.getElementById("toc-list");
const searchInputEl = document.getElementById("manual-search");
const clearSearchEl = document.getElementById("clear-search");
const sectionCountEl = document.getElementById("section-count");
const commandCountEl = document.getElementById("command-count");

const README_PATH = "./README.md";
const THEME_KEY = "linux-manual-theme";
const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

let headingRecords = [];
let activeObserver = null;

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function plainTextFromTokens(tokens) {
  return tokens
    .map((token) => {
      if (token.text) return token.text;
      if (token.tokens) return plainTextFromTokens(token.tokens);
      return "";
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractIntro(markdown) {
  const lines = markdown.split(/\r?\n/);
  const firstParagraph = [];
  let passedTitle = false;

  for (const line of lines) {
    if (!passedTitle && line.startsWith("# ")) {
      passedTitle = true;
      continue;
    }

    if (!passedTitle) continue;
    if (!line.trim() && firstParagraph.length) break;
    if (line.trim()) firstParagraph.push(line.trim());
  }

  return firstParagraph.join(" ");
}

function getSystemTheme() {
  return themeMediaQuery.matches ? "dark" : "light";
}

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Local storage can be unavailable in restricted browser contexts.
  }
}

function applyTheme(theme) {
  document.documentElement.classList.remove("theme-light", "theme-dark");
  document.documentElement.classList.add(`theme-${theme}`);
  themeToggleEl.textContent = theme === "dark" ? "Claro" : "Escuro";
  themeToggleEl.setAttribute("aria-pressed", String(theme === "dark"));
}

function initializeTheme() {
  applyTheme(getStoredTheme() || getSystemTheme());
}

function configureMarkdown() {
  const renderer = new marked.Renderer();
  const slugCounts = new Map();

  renderer.heading = ({ tokens, depth }) => {
    const text = marked.Parser.parseInline(tokens);
    const plainText = plainTextFromTokens(tokens) || text.replace(/<[^>]+>/g, "");
    const baseSlug = slugify(plainText || "secao");
    const count = slugCounts.get(baseSlug) || 0;
    slugCounts.set(baseSlug, count + 1);
    const slug = count === 0 ? baseSlug : `${baseSlug}-${count}`;

    return `
      <h${depth} id="${slug}">
        ${text}
        <a class="heading-anchor" href="#${slug}" aria-label="Link para ${plainText}">#</a>
      </h${depth}>
    `;
  };

  marked.setOptions({
    gfm: true,
    breaks: false,
    headerIds: false,
    mangle: false,
    renderer,
  });
}

function updatePageMetadata(markdown) {
  const headingMatch = markdown.match(/^#\s+(.+)$/m);
  const title = headingMatch ? headingMatch[1].trim() : "Manual Linux";
  const intro = extractIntro(markdown);

  document.title = `${title} | Guia de terminal`;
  projectTitleEl.textContent = title;
  projectSubtitleEl.textContent = "Terminal, comandos e sistema";
  heroTitleEl.textContent = title;
  heroDescriptionEl.textContent =
    intro || "Manual Linux organizado em ordem cronológica de aprendizado.";
}

function enhanceLinksAndImages() {
  contentEl.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (/^https?:\/\//i.test(href)) {
      link.target = "_blank";
      link.rel = "noreferrer noopener";
    }
  });

  contentEl.querySelectorAll("img").forEach((image) => {
    image.loading = "lazy";
    image.decoding = "async";
  });
}

function addCopyButtons() {
  contentEl.querySelectorAll("pre").forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) return;

    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.textContent = "Copiar";
    button.setAttribute("aria-label", "Copiar comando");

    button.addEventListener("click", async () => {
      const text = code.innerText.trim();
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copiado";
        window.setTimeout(() => {
          button.textContent = "Copiar";
        }, 1400);
      } catch {
        button.textContent = "Erro";
        window.setTimeout(() => {
          button.textContent = "Copiar";
        }, 1400);
      }
    });

    pre.appendChild(button);
  });
}

function collectHeadings() {
  headingRecords = [...contentEl.querySelectorAll("h2, h3")].map((heading) => ({
    id: heading.id,
    title: heading.textContent.replace("#", "").trim(),
    depth: Number(heading.tagName.slice(1)),
    element: heading,
  }));
}

function buildToc() {
  tocListEl.innerHTML = "";

  headingRecords
    .filter((record) => record.depth === 2 || record.depth === 3)
    .forEach((record) => {
      const link = document.createElement("a");
      link.href = `#${record.id}`;
      link.textContent = record.title;
      link.dataset.target = record.id;
      link.className = `toc-depth-${record.depth}`;
      tocListEl.appendChild(link);
    });
}

function setActiveTocLink(id) {
  tocListEl.querySelectorAll("a").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.target === id);
  });
}

function observeActiveSections() {
  if (activeObserver) activeObserver.disconnect();

  const sections = headingRecords.filter((record) => record.depth === 2 || record.depth === 3);
  activeObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible[0]) {
        setActiveTocLink(visible[0].target.id);
      }
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    }
  );

  sections.forEach((record) => activeObserver.observe(record.element));
}

function updateMetrics(markdown) {
  const moduleCount = headingRecords.filter((record) => record.depth === 2).length;
  const codeCount = (markdown.match(/^```/gm) || []).length / 2;

  sectionCountEl.textContent = String(moduleCount);
  commandCountEl.textContent = String(Math.floor(codeCount));
}

function normalizeSearch(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getSectionBlocks() {
  const headings = [...contentEl.querySelectorAll("h2")];
  return headings.map((heading, index) => {
    const nodes = [];
    let node = heading;
    const nextHeading = headings[index + 1];

    while (node && node !== nextHeading) {
      nodes.push(node);
      node = node.nextElementSibling;
    }

    return {
      heading,
      headingIds: nodes
        .filter((item) => /^H[23]$/.test(item.tagName))
        .map((item) => item.id),
      nodes,
      text: normalizeSearch(nodes.map((item) => item.textContent).join(" ")),
    };
  });
}

function isCompactToc() {
  return window.matchMedia("(max-width: 980px)").matches;
}

function setTocOpen(isOpen) {
  document.body.classList.toggle("toc-open", isOpen);
  tocToggleEl.setAttribute("aria-expanded", String(isOpen));
}

function focusTocPanel() {
  searchInputEl.focus({ preventScroll: true });
}

function handleTocToggle() {
  if (isCompactToc()) {
    const willOpen = !document.body.classList.contains("toc-open");
    setTocOpen(willOpen);

    if (willOpen) {
      document.getElementById("manual").scrollIntoView({ block: "start" });
      window.setTimeout(focusTocPanel, 180);
    }

    return;
  }

  setTocOpen(false);
  document.querySelector(".sidebar-panel").scrollIntoView({ block: "nearest" });
  focusTocPanel();
}

function applySearchFilter() {
  const term = normalizeSearch(searchInputEl.value.trim());
  const blocks = getSectionBlocks();

  clearSearchEl.hidden = !term;

  blocks.forEach((block) => {
    const matches = !term || block.text.includes(term);
    block.nodes.forEach((node) => {
      node.classList.toggle("is-hidden-by-search", !matches);
    });
  });

  tocListEl.querySelectorAll("a").forEach((link) => {
    const block = blocks.find((item) => item.headingIds.includes(link.dataset.target));
    link.classList.toggle("is-hidden-by-search", Boolean(term && block && !block.text.includes(term)));
  });
}

function enhanceRenderedContent(markdown) {
  const firstHeading = contentEl.querySelector("h1");
  if (firstHeading) firstHeading.remove();

  const readmeSummary = [...contentEl.querySelectorAll("h2")].find(
    (heading) => normalizeSearch(heading.textContent.replace("#", "").trim()) === "sumario"
  );

  if (readmeSummary) {
    let node = readmeSummary.nextElementSibling;
    while (node && node.tagName !== "H2") {
      const nextNode = node.nextElementSibling;
      node.remove();
      node = nextNode;
    }
    readmeSummary.remove();
  }

  contentEl.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });

  enhanceLinksAndImages();
  addCopyButtons();
  collectHeadings();
  buildToc();
  observeActiveSections();
  updateMetrics(markdown);
}

function showError(message) {
  statusEl.innerHTML = `
    <div class="empty-state">
      <h2>Não foi possível carregar o README</h2>
      <p>${message}</p>
    </div>
  `;
}

async function renderReadme() {
  try {
    const response = await fetch(README_PATH, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Falha ao buscar ${README_PATH}: ${response.status}`);
    }

    const markdown = await response.text();
    if (!markdown.trim()) {
      throw new Error("O arquivo README.md está vazio.");
    }

    updatePageMetadata(markdown);
    contentEl.innerHTML = marked.parse(markdown);
    enhanceRenderedContent(markdown);

    statusEl.hidden = true;
    contentEl.hidden = false;
  } catch (error) {
    console.error(error);
    const isFileProtocol = window.location.protocol === "file:";
    const hint = isFileProtocol
      ? "Seu navegador pode bloquear o carregamento de arquivos locais via fetch. Abra por um servidor local, como python -m http.server."
      : "Verifique se README.md está na mesma pasta de index.html.";

    showError(`${error.message} ${hint}`);
  }
}

themeToggleEl.addEventListener("click", () => {
  const nextTheme = document.documentElement.classList.contains("theme-dark") ? "light" : "dark";
  setStoredTheme(nextTheme);
  applyTheme(nextTheme);
});

tocToggleEl.addEventListener("click", handleTocToggle);

tocListEl.addEventListener("click", (event) => {
  if (event.target.closest("a") && isCompactToc()) {
    setTocOpen(false);
  }
});

window.addEventListener("resize", () => {
  if (!isCompactToc()) {
    setTocOpen(false);
  }
});

searchInputEl.addEventListener("input", applySearchFilter);

clearSearchEl.addEventListener("click", () => {
  searchInputEl.value = "";
  applySearchFilter();
  searchInputEl.focus();
});

function handleSystemThemeChange(event) {
  if (!getStoredTheme()) {
    applyTheme(event.matches ? "dark" : "light");
  }
}

if (typeof themeMediaQuery.addEventListener === "function") {
  themeMediaQuery.addEventListener("change", handleSystemThemeChange);
} else if (typeof themeMediaQuery.addListener === "function") {
  themeMediaQuery.addListener(handleSystemThemeChange);
}

initializeTheme();
configureMarkdown();
renderReadme();
