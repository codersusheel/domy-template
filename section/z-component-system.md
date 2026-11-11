# HAPROVEN HTML COMPONENT LOADER SYSTEM

## 1. System Kya Hai?

Ye ek reusable HTML component loading system hai. Iska use website ke common sections jaise Header, Slider aur Footer ko alag HTML files mein rakhkar multiple pages par reuse karne ke liye hota hai.

Har page par component ka HTML dobara likhne ki jagah sirf ek `id` wala element add kiya jata hai. JavaScript automatically us element ke liye corresponding HTML file fetch karke insert kar deta hai.

## 2. HTML Mein Component Add Karna

```html
<!-- Header -->
<div id="header"></div>

<!-- Slider -->
<div id="slider"></div>

<!-- Footer -->
<div id="footer"></div>
```

## 3. Component File Structure

```text
Haproven/
├── section/
│   ├── components/
│   ├      └── loader.js
│   ├      
│   ├── header.html
│   ├── header.html
│   ├── slider.html
│   └── footer.html
│
├── index.html
└── about.html
```

- `section/` — component HTML files.
- `components/loader.js` — components load karne wala JavaScript.
- `index.html` / `about.html` — website pages.

## 4. JavaScript Loader Kaise Kaam Karta Hai?

```javascript
document.addEventListener("DOMContentLoaded", () => {

    const components = {
        header: "/section/header.html",
        slider: "/section/slider.html",
        footer: "/section/footer.html"
    };

    Object.entries(components).forEach(([id, path]) => {

        const element = document.getElementById(id);

        if (!element) return;

        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${path}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;

                document.dispatchEvent(
                    new CustomEvent(`${id}:loaded`)
                );
            })
            .catch(error => {
                console.error(error);
            });

    });

});
```

### Loader Ke Functions

**1. `DOMContentLoaded`**

Page ka HTML load hone ke baad loader start hota hai.

**2. `components`**

Is object mein component ka naam aur uski HTML file ka path diya jata hai.

```javascript
const components = {
    header: "/section/header.html",
    footer: "/section/footer.html"
};
```

**3. `Object.entries()`**

Object ko component ID aur file path ki pairs mein convert karta hai, jisse sabhi components par loop chal sake.

**4. `getElementById()`**

Page par component ke matching `id` ko search karta hai.

```javascript
const element = document.getElementById(id);
```

Agar element nahi milta, to component skip ho jata hai.

**5. `fetch()`**

Component ki HTML file server se fetch karta hai.

```javascript
fetch(path)
```

**6. `response.text()`**

HTML file ke response ko text mein convert karta hai.

**7. `innerHTML`**

Fetched HTML ko page ke matching element ke andar insert karta hai.

```javascript
element.innerHTML = html;
```

**8. `CustomEvent`**

Component load hone ke baad ek custom event dispatch karta hai.

```javascript
document.dispatchEvent(
    new CustomEvent(`${id}:loaded`)
);
```

Is event ka use component load hone ke baad additional JavaScript execute karne ke liye kiya ja sakta hai.

**9. `catch()`**

Agar component load nahi hota, to console mein error show hota hai.

## 5. Component Load Hone Ke Baad Event

Example: Header load hone ke baad uska JavaScript execute karna.

```javascript
document.addEventListener("header:loaded", () => {

    console.log("Header successfully loaded");

});
```

Footer ke liye:

```javascript
document.addEventListener("footer:loaded", () => {

    console.log("Footer successfully loaded");

});
```

## 6. Loader Ko Page Mein Add Karna

```html
<script src="/components/loader.js"></script>
```

Har page par loader ko ek baar add karein.

## 7. Naya Component Kaise Add Karein?

Example: `project` component.

**Step 1:** File banao:

`section/project.html`

**Step 2:** Loader ke object mein add karo:

```javascript
const components = {
    header: "/section/header.html",
    slider: "/section/slider.html",
    footer: "/section/footer.html",
    project: "/section/project.html"
};
```

**Step 3:** Page par add karo:

```html
<div id="project"></div>
```

Ab loader automatically `project.html` fetch karke us element mein insert karega.

## 8. Important Limitation

Ye loader sirf fetched HTML ko `innerHTML` se insert karta hai. Component HTML ke andar likhe `<script>` automatically execute nahi hote. CSS ke `<style>` apply ho sakte hain, lekin JavaScript ko separately execute karna hoga ya `loaded` event ke through initialize karna hoga.

## 9. Yaad Rakhne Ka Formula

```text
HTML Page
    ↓
<div id="header"></div>
    ↓
JavaScript getElementById()
    ↓
fetch("/section/header.html")
    ↓
response.text()
    ↓
element.innerHTML
    ↓
Header Page Mein Insert
    ↓
header:loaded Event
```

**One ID = One Component Target**

**One HTML File = One Reusable Section**

**One Loader = Multiple Components**

