(() => {

    "use strict";

    // ==========================================
    // PASSWORDS
    // ==========================================

    const PASSWORDS = [
        "haproven",
        "etnarw",
        "haproid",
        "gitprohu",
        "proaccess"
    ];

    // ==========================================
    // STORAGE
    // ==========================================

    const ACCESS_KEY = "page_access_granted";
    const ACCESS_TIME_KEY = "page_access_time";
    const PASSWORD_VERSION_KEY = "password_version";

    // ==========================================
    // 24 HOURS
    // ==========================================

    const ACCESS_DURATION =
        24 * 60 * 60 * 1000;

    // ==========================================
    // PASSWORD VERSION
    // Changes automatically when password list
    // changes.
    // ==========================================

    const PASSWORD_VERSION =
        PASSWORDS.join("|");

    // ==========================================
    // CURRENT PAGE
    // ==========================================

    const currentUrl =
        window.location.pathname +
        window.location.search +
        window.location.hash;

    // ==========================================
    // CHECK SAVED ACCESS
    // ==========================================

    const savedAccess =
        sessionStorage.getItem(
            ACCESS_KEY
        ) === "true";

    const savedTime =
        Number(
            sessionStorage.getItem(
                ACCESS_TIME_KEY
            )
        );

    const savedVersion =
        sessionStorage.getItem(
            PASSWORD_VERSION_KEY
        );

    // ==========================================
    // PASSWORD CHANGED?
    // ==========================================

    const passwordChanged =
        savedVersion !== null &&
        savedVersion !== PASSWORD_VERSION;

    // ==========================================
    // CLEAR OLD ACCESS
    // ==========================================

    if (passwordChanged) {

        sessionStorage.removeItem(
            ACCESS_KEY
        );

        sessionStorage.removeItem(
            ACCESS_TIME_KEY
        );

        sessionStorage.removeItem(
            PASSWORD_VERSION_KEY
        );
    }

    // ==========================================
    // CHECK 24 HOUR ACCESS
    // ==========================================

    const accessValid =
        !passwordChanged &&
        savedAccess &&
        savedTime &&
        savedVersion === PASSWORD_VERSION &&
        (Date.now() - savedTime) <
        ACCESS_DURATION;

    // ==========================================
    // ALREADY AUTHENTICATED
    // ==========================================

    if (accessValid) {
        return;
    }

    // ==========================================
    // CREATE PASSWORD PAGE
    // ==========================================

    createPasswordPage();

    // ==========================================
    // PASSWORD PAGE FUNCTION
    // ==========================================



function createPasswordPage() {

    // STOP PAGE SCROLL
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // CREATE STYLE
    const style = document.createElement("style");
    style.id = "page-lock-style";

    style.textContent = `
        #protected-page,
        #protected-page * {
            box-sizing: border-box;
        }

        #protected-page {
            position: fixed;
            inset: 0;
            z-index: 999999999;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 20px;
            overflow-y: auto;

            background: #f8fafc;
            color: #0f172a;

            font-family: Arial, Helvetica, sans-serif;
        }

        .page-lock-card {
            width: 100%;
            max-width: 410px;
            padding: 35px 30px;

            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 18px;

            text-align: center;

            box-shadow: 0 20px 60px rgba(15, 23, 42, .08);

            animation: page-lock-enter .35s ease;
        }

        @keyframes page-lock-enter {
            from {
                opacity: 0;
                transform: translateY(12px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .page-lock-icon {
            width: 64px;
            height: 64px;
            margin: 0 auto 22px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #eff6ff;
            color: #2563eb;
            border-radius: 18px;

            font-size: 25px;
        }

        .page-lock-title {
            margin: 0 0 12px;
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -.5px;
        }

        .page-lock-description {
            margin: 0 0 26px;
            color: #64748b;
            font-size: 14px;
            line-height: 1.7;
        }

        .page-lock-form {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .page-lock-input-wrap {
            display: flex;
            align-items: center;
            gap: 12px;

            height: 50px;
            padding: 0 14px;

            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 9px;

            color: #94a3b8;

            transition: .2s;
        }

        .page-lock-input-wrap:focus-within {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, .10);
        }

        .page-lock-input {
            flex: 1;
            min-width: 0;
            height: 100%;

            padding: 0;
            border: 0;
            outline: 0;

            background: transparent;
            color: #0f172a;

            font-size: 14px;
        }

        .page-lock-input::placeholder {
            color: #94a3b8;
        }

        .page-lock-eye {
            padding: 5px;
            border: 0;
            background: transparent;
            color: #64748b;
            cursor: pointer;
        }

        .page-lock-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;

            width: 100%;
            min-height: 50px;

            border: 0;
            border-radius: 9px;

            background: #2563eb;
            color: #fff;

            font-size: 14px;
            font-weight: 600;

            cursor: pointer;
            transition: .2s;
        }

        .page-lock-button:hover {
            background: #1d4ed8;
        }

        .page-lock-button:active {
            transform: scale(.98);
        }

        .page-lock-error {
            min-height: 18px;
            margin-top: 12px;

            color: #dc2626;
            font-size: 13px;
            line-height: 1.5;
        }

        .page-lock-error.is-error {
            animation: page-lock-shake .3s ease;
        }

        @keyframes page-lock-shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .page-lock-footer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;

            margin-top: 24px;
            padding-top: 18px;

            border-top: 1px solid #f1f5f9;

            color: #94a3b8;
            font-size: 12px;
        }

        .page-lock-footer i {
            color: #2563eb;
        }

        @media (max-width: 480px) {
            #protected-page {
                padding: 16px;
            }

            .page-lock-card {
                padding: 28px 22px;
                border-radius: 15px;
            }

            .page-lock-title {
                font-size: 23px;
            }
        }

        @media (prefers-color-scheme: dark) {
            #protected-page {
                background: #0b1120;
                color: #f1f5f9;
            }

            .page-lock-card {
                background: #eaeaea;
                color: #1d1e1f;
                border-color: #263244;
                box-shadow: 0 20px 60px rgba(0, 0, 0, .25);
            }

            .page-lock-icon {
                background: rgba(37, 99, 235, .15);
                color: #60a5fa;
            }

            .page-lock-description {
                color: #94a3b8;
            }

            .page-lock-input-wrap {
                background: #262c38;
                border-color: #334155;
            }

            .page-lock-input {
                color: #f1f5f9;
            }

            .page-lock-footer {
                border-color: #263244;
                color: #64748b;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            #protected-page *,
            #protected-page *::before,
            #protected-page *::after {
                animation: none !important;
                transition: none !important;
            }
        }
    `;

    document.head.appendChild(style);

    // CREATE OVERLAY
    const overlay = document.createElement("div");
    overlay.id = "protected-page";

    overlay.innerHTML = `
        <div class="page-lock-card">

            <!-- ICON -->
            <div class="page-lock-icon">
                <i class="fa-solid fa-lock"></i>
            </div>

            <!-- TITLE -->
            <h1 class="page-lock-title">
                Access Restricted
            </h1>

            <p class="page-lock-description">
                This page is protected.
                Enter your access password to continue.
            </p>

            <!-- PASSWORD FORM -->
            <form class="page-lock-form" id="protectedForm">

                <div class="page-lock-input-wrap">

                    <i class="fa-solid fa-key"></i>

                    <input
                        type="password"
                        id="protectedPassword"
                        class="page-lock-input"
                        placeholder="Enter access password"
                        autocomplete="off"
                        required
                    >

                    <button
                        type="button"
                        class="page-lock-eye"
                        id="pageLockEye"
                        aria-label="Show password"
                    >
                        <i class="fa-solid fa-eye"></i>
                    </button>

                </div>

                <button type="submit" class="page-lock-button">
                    <span>Unlock Page</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </button>

            </form>

            <!-- ERROR -->
            <div
                id="protectedError"
                class="page-lock-error"
                role="alert"
                aria-live="polite"
            ></div>

            <!-- FOOTER -->
            <div class="page-lock-footer">
                <i class="fa-solid fa-shield-halved"></i>
                <span>Protected by Haproven Page Lock</span>
            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    // ELEMENTS
    const form = overlay.querySelector("#protectedForm");
    const input = overlay.querySelector("#protectedPassword");
    const error = overlay.querySelector("#protectedError");
    const eye = overlay.querySelector("#pageLockEye");

    // SHOW / HIDE PASSWORD
    eye.addEventListener("click", function () {

        const visible = input.type === "password";

        input.type = visible ? "text" : "password";

        eye.innerHTML = visible
            ? '<i class="fa-solid fa-eye-slash"></i>'
            : '<i class="fa-solid fa-eye"></i>';

        eye.setAttribute(
            "aria-label",
            visible ? "Hide password" : "Show password"
        );
    });

    // AUTO FOCUS
    setTimeout(() => input.focus(), 100);

    // PASSWORD SUBMIT
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const enteredPassword = input.value.trim();

        if (PASSWORDS.includes(enteredPassword)) {

            // SAVE ACCESS
            sessionStorage.setItem(ACCESS_KEY, "true");
            sessionStorage.setItem(
                ACCESS_TIME_KEY,
                Date.now().toString()
            );
            sessionStorage.setItem(
                PASSWORD_VERSION_KEY,
                PASSWORD_VERSION
            );

            // REMOVE PROTECTION
            overlay.remove();
            style.remove();

            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";

        } else {

            // WRONG PASSWORD
            error.textContent =
                "Incorrect password. Please try again.";

            error.classList.remove("is-error");
            void error.offsetWidth;
            error.classList.add("is-error");

            input.value = "";
            input.focus();
        }

    });

}


})();












   
(() => {
    "use strict";

    const CONFIG = {
        redirectURL: "/403.html",
        checkInterval: 250,
        sizeThreshold: 160,
        timingThreshold: 100,
        lockKey: "dt_lock"
    };

    let blocked = false;

    function isLocked() {
        try {
            return sessionStorage.getItem(CONFIG.lockKey) === "1";
        } catch (e) {
            return false;
        }
    }

    function setLock() {
        try {
            sessionStorage.setItem(CONFIG.lockKey, "1");
        } catch (e) { /* ignore */ }
    }

    function clearLock() {
        try {
            sessionStorage.removeItem(CONFIG.lockKey);
        } catch (e) { /* ignore */ }
    }

    function go403() {
        setLock();
        /* Jis page se redirect ho raha hai uska URL save karo -
           taaki 403.html ka "Wapas Jayein" button reliably usi
           page par le jaa sake (browser history ke bharose nahi
           rehna, kyunki location.replace history entry ko
           overwrite kar deta hai) */
        try {
            sessionStorage.setItem("dt_return", window.location.href);
        } catch (e) { /* ignore */ }

        if (blocked) return;
        blocked = true;
        window.location.replace(CONFIG.redirectURL);
    }

    function reveal() {
        /* Sirf tabhi page dikhao jab sab kuch clean ho */
        document.documentElement.style.visibility = "visible";
    }

    function isMobile() {
        return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    }

    /* =========================================
       CONSOLE BLOCK
       Console ke saare common methods ko no-op (khaali function)
       bana diya jata hai, taaki:
       - Koi console.log/error/warn se aapke code ka output na
         dekh sake
       - Koi console me manually kuch print/inspect na kar sake
       ========================================================= */
    function disableConsole() {
        const noop = function () {};
        const methods = [
            "log", "warn", "error", "info", "debug",
            "table", "trace", "dir", "dirxml", "group",
            "groupCollapsed", "groupEnd", "assert", "count",
            "time", "timeEnd", "profile", "profileEnd"
        ];

        methods.forEach((method) => {
            try {
                console[method] = noop;
            } catch (e) { /* ignore agar overridable na ho */ }
        });
    }

    disableConsole();

    /* Method 1: window size difference (docked devtools) */
    function checkBySize() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        return widthDiff > CONFIG.sizeThreshold || heightDiff > CONFIG.sizeThreshold;
    }

    /* Method 2: debugger timing trick (undocked devtools) */
    function checkByTiming() {
        const start = performance.now();
        // eslint-disable-next-line no-debugger
        debugger;
        const end = performance.now();
        return (end - start) > CONFIG.timingThreshold;
    }

    function isDevToolsOpenNow() {
        if (isMobile()) return false;
        return checkBySize() || checkByTiming();
    }

    /* =========================================
       IMMEDIATE GATE CHECK (blocking, sabse pehle chalta hai)
       ========================================= */

    function gateCheck() {
        if (isLocked()) {
            go403();
            return false;
        }
        if (isDevToolsOpenNow()) {
            go403();
            return false;
        }
        return true;
    }

    /* Ye turant, synchronously chalta hai - script load hote hi.
       Agar page HTML abhi tak parse ho raha hai, browser is
       script (non-async/non-defer) ko turant execute karega aur
       tab tak aage ka HTML parse nahi karega, isliye body content
       tab tak render hi nahi hota. */
    const initialResult = gateCheck();
    if (initialResult) {
        /* DOM ready hote hi visible karo */
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", reveal);
        } else {
            reveal();
        }
    }

    /* =========================================
       CONTENT PROTECTION (right-click / copy / keys)
       ========================================= */

    /* =========================================
       CONTENT PROTECTION (selective)
       Text select/copy allow hai. Sirf images, videos, aur links
       (<a> tags) par right-click, drag, aur copy block kiya gaya
       hai - taaki wo save/copy na ho sakein.
       ========================================= */

    /* Kisi element ke andar img/video/a hai ya nahi, ye check karta hai */
    function isProtectedTarget(el) {
        if (!el || !el.closest) return false;
        return !!el.closest("img, video, a, picture, svg");
    }

    /* Right-click block - sirf media/link par, baaki page par
       normal right-click (copy text option ke saath) allow hai */
    document.addEventListener(
        "contextmenu",
        (e) => {
            if (isProtectedTarget(e.target)) {
                e.preventDefault();
            }
        },
        true
    );

    /* Drag block - images/videos/links ko drag karke save/copy
       na kiya ja sake */
    document.addEventListener(
        "dragstart",
        (e) => {
            if (isProtectedTarget(e.target)) {
                e.preventDefault();
            }
        },
        true
    );

    /* Copy event block - agar selection me koi image/video/link
       shamil ho to copy hone se roko. Sirf plain text copy hone
       diya jayega. */
    document.addEventListener(
        "copy",
        (e) => {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) return;

            const range = selection.getRangeAt(0);
            const container = range.cloneContents();

            const hasProtectedContent =
                container.querySelector &&
                container.querySelector("img, video, a, picture, svg");

            if (hasProtectedContent) {
                e.preventDefault();
            }
        },
        true
    );

    document.addEventListener(
        "keydown",
        (event) => {
            const key = String(event.key).toLowerCase();
            const restricted =
                event.key === "F12" ||
                event.key === "PrintScreen" ||
                (event.ctrlKey && event.shiftKey && key === "i") ||
                (event.ctrlKey && event.shiftKey && key === "j") ||
                (event.ctrlKey && event.shiftKey && key === "c") ||
                (event.ctrlKey && event.shiftKey && key === "k") ||
                (event.ctrlKey && key === "u") ||
                (event.ctrlKey && key === "s") ||
                (event.ctrlKey && key === "p") ||
                (event.metaKey && event.altKey && key === "i");

            if (restricted) {
                event.preventDefault();
                event.stopImmediatePropagation();
                go403();
            }
        },
        true
    );

    /* =========================================
       IFRAME / VIEW-SOURCE PROTECTION
       ========================================= */

    function checkFrame() {
        if (blocked) return;
        try {
            if (window.top !== window.self) go403();
        } catch (error) {
            go403();
        }
    }

    function checkViewSource() {
        if (blocked) return;
        if (String(window.location.href).startsWith("view-source:")) go403();
    }

    /* =========================================
       BFCACHE / BACK-BUTTON FIX
       ========================================= */

    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            window.location.reload();
        } else {
            gateCheck();
            checkFrame();
            checkViewSource();
        }
    });

    /* Tab dobara active hote hi bhi check karo (alt-tab karke
       kisi ne devtools khola ho to) */
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            gateCheck();
        }
    });

    /* =========================================
       CONTINUOUS MONITORING
       requestAnimationFrame loop use kiya hai (setInterval ke bajaye) -
       ye har browser frame (~16ms, yani 1 second me ~60 baar) check
       karta hai, isliye DevTools jaise hi khulta hai (chahe F12 se,
       right-click se, address-bar-focused F12 se, ya menu se) -
       turant (visually instant) pakda jayega.
       ========================================= */

    checkFrame();
    checkViewSource();

    window.addEventListener("resize", gateCheck);

    function monitorLoop() {
        if (blocked) return;
        gateCheck();
        checkFrame();
        checkViewSource();
        requestAnimationFrame(monitorLoop);
    }
    requestAnimationFrame(monitorLoop);

})();




