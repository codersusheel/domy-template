# HAPROVEN REUSABLE COMPONENT SYSTEM

## 1. Component Add Karna (HTML)

Kisi bhi page par Header, Footer ya doosra component add karne ke liye `section-data` attribute ka use karein.

```html
<!-- Header -->
<div section-data="header"></div>

<!-- Footer -->
<div section-data="footer"></div>
```

## 2. Component File Structure

Sabhi reusable components `section-data/` folder mein rahenge aur loader `components/` folder mein.

```text
Haproven/
├── section-data/
|   ├── components/
│   |      └── loader.js
│   |     
│   ├── header.html
│   ├── footer.html
│   ├── project.html
│   ├── team.html
│   └── events.html
│
│
├── index.html
└── about.html
```

## 3. Component File (HTML + CSS + JS)

Har component ki ek HTML file hogi, jisme HTML, CSS aur JavaScript teeno ek saath likh sakte hain.

Example: `section-data/header.html`

```html
<!-- HTML -->
<header class="app-header">
    <h1>Haproven</h1>
</header>

<!-- CSS -->
<style>
.app-header {
    padding: 15px;
    background: #2563eb;
    color: white;
}
</style>

<!-- JS -->
<script>
const header = root;

header.querySelector("h1").textContent = "Haproven";
</script>
```

**Note:** `root` current component ke main HTML element ko represent karta hai. Isse JavaScript sirf apne component par kaam karta hai.

## 4. Loader Add Karna (Har Page Par Ek Baar)

Har page par loader ko ek baar add karein.

```html
<script src="/components/loader.js"></script>
```

Loader automatically `section-data` wale elements ko identify karke unki HTML files load karega.

## 5. Kaise Kaam Karega?

- `section-data="header"` → `section-data/header.html` load karega.
- `section-data="footer"` → `section-data/footer.html` load karega.
- HTML, CSS aur JavaScript automatically load honge.
- Ek component ko multiple pages par reuse kar sakte hain.
- Component ka complete code ek hi file mein maintain hoga.
- Har component ke liye alag JS file banana zaroori nahi.
- CSS aur external JS duplicate load hone se bachaye ja sakte hain.
- Nested components bhi automatically load kiye ja sakte hain.
- Component update karne par uski single file edit karni hogi.

## 6. Naya Component Banana

Example: `project` component banana hai.

1. `section-data/` folder mein `project.html` file banao.
2. Us file mein HTML + CSS + JS likho.
3. Jis page par project section chahiye, wahan add karo:

```html
<div section-data="project"></div>
```

4. Loader automatically `project.html` load kar dega.

## 7. Component Ka Naam Aur File Name

| Component | HTML File |
|---|---|
| header | `header.html` |
| footer | `footer.html` |
| project | `project.html` |
| team | `team.html` |
| events | `events.html` |

**Rule:** `section-data` ke andar jo naam likhenge, wahi naam ki `.html` file `section-data/` folder mein honi chahiye.

## 8. Yaad Rakhne Ka Formula

```text
HTML Page
    ↓
section-data="header"
    ↓
section-data/header.html
    ↓
HTML + CSS + JS
    ↓
Loader Automatically Load Karega
```

**One Component = One HTML File = HTML + CSS + JS**

**One Loader = All Pages + All Components**

### Haproven Component System

Reusable • Modular • Organized • Easy to Maintain