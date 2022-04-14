<script>
    let links = [
        {
            url: "https://discord.gg/pNBwGJPjAc",
            img: "/img/discordicon.png",
            alt: "discord link",
        },
        {
            url: "https://twitter.com/cpu_now",
            img: "/img/twittericon.png",
            alt: "twitter link",
        },
        {
            url: "https://t.me/cpunow",
            img: "/img/telegramicon.png",
            alt: "telegram link",
        },
        {
            url: "https://mail.google.com/mail/?view=cm&fs=1&to=waxcpunow@gmail.com",
            img: "/img/gmailicon.png",
            alt: "gmail link",
        }
    ];
</script>

<footer class="footer">
    {#each links as link}
        <a href={link.url} target="_blank">
            <div class="social_div">
                <img src={link.img} alt={link.alt} />
            </div>
        </a>
    {/each}
</footer>

<style>
    .footer {
        position: relative;
        background-color: #000000;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        z-index: 999;
        width: 100%;
        height: 100%;
        border-radius: 3vh 3vh 0 0;
        box-shadow: 0 -0.1vh 0.5vh #fff, 0 0.1vh 1vh 0.5vh #0ff,
            inset 0 1vh 0.3vh -0.7vh #fff, inset 0 1vh 1vh -0.7vh #0ff,
            inset 0 1vh 1.5vh -9vh #0ff;
    }

    .social_div {
        margin-top: 0.5vh;
        margin-left: 1vw;
        margin-right: 1vw;
        width: 7vh;
        height: 7vh;
    }
    img {
        width: 100%;
        height: 100%;
    }
</style>
