document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        ".section-title, .profile-card, .mini-stat, .stat-card, .game-card, .content-card, .mission"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach((element) => {
        element.classList.add("hidden");
        observer.observe(element);
    });


    const counters = document.querySelectorAll(".stat-card strong");

    counters.forEach((counter) => {

        const originalText = counter.innerText;
        const target = parseInt(originalText.replace(/\D/g, ""), 10);

        if (isNaN(target)) return;

        counter.innerText = "0";

        let current = 0;

        const increment = Math.max(Math.ceil(target / 60), 1);

        const updateCounter = () => {

            current += increment;

            if (current >= target) {
                counter.innerText = originalText;
                return;
            }

            counter.innerText = current.toLocaleString("pt-BR");

            requestAnimationFrame(updateCounter);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {

            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }

        }, {
            threshold: 0.5
        });

        counterObserver.observe(counter);
    });


    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    const heroGrid = document.querySelector(".hero-grid");

    window.addEventListener("mousemove", (event) => {

        if (!heroGrid) return;

        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 10;

        heroGrid.style.transform = `translate(${x}px, ${y}px)`;

    });


    const footerText = document.querySelector("footer p");

    if (footerText) {
        footerText.innerText =
            `GAMING CREATOR © ${new Date().getFullYear()}`;
    }

});


const analyticsData = {


instagram: {

    title: "INSTAGRAM",

    views: "1.1M",

    engagement: "8%",

    growth: "+2.1K",

    interactions: "80.5K",

    likes: "61K",

    comments: "2.4K",

    shares: "11K",

    saves: "4.2K",

    newFollowers: "2.1K",

    men: "91.7% MEN",

    women: "8.3% WOMEN",

    age25: "25-34 · 47%",

    age18: "18-24 · 23%",

    age35: "35-44 · 17%",

    brazil: "BRAZIL · 92.6%",

    international: "EUA · Portugal · Japão · França"

},

tiktok: {

    title: "TIKTOK",

    views: "709K",

    engagement: "5.6%",

    growth: "+829",

    interactions: null,

    likes: "35K",

    comments: "1.8K",

    shares: "2.6K",

    saves: null,

    newFollowers: "829",

    men: "81% MEN",

    women: "18% WOMEN",

    age25: null,

    age18: null,

    age35: null,

    brazil: null,

    international: null

}

};


function showAnalytics(platform) {

    const data = analyticsData[platform];

    if (!data) return;

    const fields = {
        "analytics-title": data.title,
        "views": data.views,
        "engagement": data.engagement,
        "growth": data.growth,
        "interactions": data.interactions,
        "likes": data.likes,
        "comments": data.comments,
        "shares": data.shares,
        "saves": data.saves,
        "average": data.average,
        "newFollowers": data.newFollowers
    };

    Object.keys(fields).forEach((id) => {

        const element = document.getElementById(id);

        if (!element) return;

        const value = fields[id];

        if (value === null || value === undefined || value === "") {
            element.parentElement.style.display = "none";
        } else {
            element.parentElement.style.display = "";
            element.innerText = value;
        }

    });


    const audienceFields = {
        "men": data.men,
        "women": data.women,
        "age25": data.age25,
        "age18": data.age18,
        "age35": data.age35,
        "brazil": data.brazil,
        "international": data.international
    };

    Object.keys(audienceFields).forEach((id) => {

        const element = document.getElementById(id);

        if (!element) return;

        const value = audienceFields[id];

        if (value === null || value === undefined || value === "") {
            element.style.display = "none";
        } else {
            element.style.display = "";
            element.innerText = value;
        }

    });


    const panel = document.getElementById("analytics-panel");

    if (!panel) return;

    panel.classList.add("active");


    setTimeout(() => {

        panel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 100);

}

function closeAnalytics() {

    const panel = document.getElementById("analytics-panel");

    if (!panel) return;

    panel.classList.remove("active");

}
