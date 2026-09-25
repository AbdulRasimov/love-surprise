const envelope =
    document.getElementById("envelope");

const intro =
    document.getElementById("intro");

const loveScreen =
    document.getElementById("loveScreen");

const button =
    document.getElementById("nextButton");

const loveText =
    document.getElementById("loveText");


const messages = [

    "Ты делаешь мои дни намного светлее ✨",

    "Мне нравится твоя улыбка. Очень. 💗",

    "С тобой даже обычный день становится особенным",

    "Я могу смотреть на тебя и забывать, что хотел сказать 🥹",

    "Спасибо тебе за все моменты, которые у нас есть",

    "И вообще-то у меня осталось последнее сообщение..."

];


let currentMessage = 0;


/* TELEGRAM */

if (window.Telegram?.WebApp) {

    Telegram.WebApp.ready();

    Telegram.WebApp.expand();

}


/* ОТКРЫВАЕМ КОНВЕРТ */

envelope.addEventListener("click", () => {

    envelope.classList.add("open");

    vibrate("medium");

    setTimeout(() => {

        intro.classList.remove("active");

        loveScreen.classList.add("active");

        createHearts(15);

        smallFirework();

    }, 1400);

});


/* КНОПКА */

button.addEventListener("click", () => {

    vibrate("light");

    createHearts(12);

    smallFirework();


    loveText.style.opacity = 0;

    loveText.style.transform =
        "translateY(10px)";


    setTimeout(() => {

        /*
        Если сообщения закончились —
        показываем финал.
        */

        if (
            currentMessage >= messages.length
        ) {

            showFinal();

            return;
        }


        loveText.textContent =
            messages[currentMessage];

        currentMessage++;


        loveText.style.opacity = 1;

        loveText.style.transform =
            "translateY(0)";

    }, 300);

});


/* ФИНАЛ */

function showFinal() {

    loveText.innerHTML =
        "Я тебя люблю ❤️";

    button.style.display = "none";


    bigFireworks();

    createHearts(50);

    vibrate("heavy");

}


/* МАЛЕНЬКИЙ ФЕЙЕРВЕРК */

function smallFirework() {

    confetti({

        particleCount: 70,

        spread: 90,

        origin: {
            x: .5,
            y: .6
        }

    });

}


/* БОЛЬШОЙ ФИНАЛЬНЫЙ ФЕЙЕРВЕРК */

function bigFireworks() {

    const end =
        Date.now() + 3500;


    const timer =
        setInterval(() => {

            confetti({

                particleCount: 50,

                spread: 100,

                startVelocity: 45,

                origin: {

                    x: Math.random(),

                    y:
                        Math.random() * .6

                }

            });


            if (Date.now() > end) {

                clearInterval(timer);

            }

        }, 200);

}


/* СЕРДЕЧКИ */

function createHearts(amount) {

    const emojis = [
        "❤️",
        "💗",
        "💕",
        "💖",
        "✨",
        "💘"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(() => {

            const heart =
                document.createElement("div");


            heart.className =
                "floating-heart";


            heart.textContent =
                emojis[
                    Math.floor(
                        Math.random()
                        * emojis.length
                    )
                ];


            heart.style.left =
                Math.random() * 100
                + "vw";


            heart.style.fontSize =
                (
                    20
                    + Math.random() * 30
                )
                + "px";


            heart.style.animationDuration =
                (
                    3
                    + Math.random() * 3
                )
                + "s";


            document.body
                .appendChild(heart);


            setTimeout(() => {

                heart.remove();

            }, 6500);


        }, i * 70);

    }

}


/* ВИБРАЦИЯ TELEGRAM */

function vibrate(type) {

    if (
        window.Telegram
        ?.WebApp
        ?.HapticFeedback
    ) {

        Telegram.WebApp
            .HapticFeedback
            .impactOccurred(type);

    }

}