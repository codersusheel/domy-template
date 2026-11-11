
(() => {
    "use strict";

    const CONFIG = {
        title: "Page Under Maintenance",
        message: "We're making a few improvements. Please visit again shortly.",
        seconds: 10,
        home: "/"
    };

    if (document.getElementById("page-work")) return;

    /* Previous page */
    const previousPage = document.referrer;

    const style = document.createElement("style");

    style.textContent = `
        #page-work {
            position: fixed;
            inset: 0;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: #080b12;
            color: #f1f5f9;
            font-family: system-ui, sans-serif;
        }

        #page-work * {
            box-sizing: border-box;
        }

        .work-box {
            width: 100%;
            max-width: 400px;
            text-align: center;
        }

        .work-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 24px;
            display: grid;
            place-items: center;
            border-radius: 16px;
            background: #172554;
            color: #60a5fa;
            font-size: 27px;
        }

        .work-title {
            font-size: 25px;
            font-weight: 650;
            margin: 0 0 14px;
        }

        .work-message {
            color: #94a3b8;
            font-size: 14px;
            line-height: 1.7;
            margin: 0 0 28px;
        }

        .work-line {
            height: 3px;
            background: #1e293b;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 18px;
        }

        .work-line::after {
            content: "";
            display: block;
            width: 35%;
            height: 100%;
            background: #2563eb;
            animation: work-loading 1.5s infinite;
        }

        @keyframes work-loading {
            from { transform: translateX(-100%); }
            to { transform: translateX(300%); }
        }

        .work-timer {
            font-size: 13px;
            color: #64748b;
        }

        .work-timer span {
            color: #60a5fa;
            font-weight: 600;
        }

        .work-footer {
            margin-top: 32px;
            color: #475569;
            font-size: 12px;
        }

        @media (max-width: 480px) {
            .work-title { font-size: 23px; }
            .work-box { max-width: 340px; }
        }
    `;

    document.head.appendChild(style);

    const screen = document.createElement("div");
    screen.id = "page-work";

    screen.innerHTML = `
        <div class="work-box">


            <h2 class="work-title">${CONFIG.title}</h2>

            <p class="work-message">${CONFIG.message}</p>

            <div class="work-line"></div>

            <div class="work-timer">
                Returning in <span id="work-count">${CONFIG.seconds}</span> seconds
            </div>

            <div class="work-footer">
                Thank you for your patience.
            </div>

        </div>
    `;

    document.documentElement.appendChild(screen);

    /* Return to previous page */
    function goBack() {
        if (previousPage && previousPage !== location.href) {
            location.replace(previousPage);
        } else {
            location.replace(CONFIG.home);
        }
    }

    /* Countdown */
    let seconds = CONFIG.seconds;
    const counter = document.getElementById("work-count");

    const timer = setInterval(() => {
        seconds--;
        counter.textContent = Math.max(seconds, 0);

        if (seconds <= 0) {
            clearInterval(timer);
            goBack();
        }
    }, 1000);

})();
