<div id="how_to_bg">
    <div id="how_to_title">
        <h1>How To</h1>
    </div>
    <div id="how_to">
        <div id="actions">
            <div class="action">
                <div class="action_title">
                    <h2>Rent</h2>
                    <p>
                        To rent cpu select the rent action. You can rent to
                        yourself or another person. Leave the recipient field
                        blank for self rental (optional). Use the slider to
                        select rental time. From 12 hours to 6 days in 12 hour
                        increments. Finally select the amount of wax you would
                        like delegated to the recipient. The price will auto
                        update on the submit button as you change the time and
                        amount.
                    </p>
                </div>
            </div>
            <div class="action">
                <div class="action_title">
                    <h2>Add Rent</h2>
                    <p>
                        Use add rent when you want to add an amount to an
                        already existing time frame.
                    </p>
                </div>
            </div>
            <div class="action">
                <div class="action_title">
                    <h2>Add Funds</h2>
                    <p>
                        When you rent an account is open on the contract in your
                        name. You can add extra funds so they are ready to go
                        the next time you need some cpu.
                    </p>
                </div>
            </div>
            <div class="action">
                <div class="action_title">
                    <h2>Withdraw Funds</h2>
                    <p>
                        You can withdraw some or all funds from your account at
                        any time.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    h1 {
        font-family: "neoncity";
        color: #fff;
        font-size: 5vh;
        font-weight: 1;
        padding: 1.5vh;
        margin: 0;
        letter-spacing: 0.6vw;
        text-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #0ff, 0 0 1.5vh #0ff,
            0 0 2vh #0ff, 0 0 3vh #0ff, 0 0 4vh #0ff, 0 0 5vh #0ff;
    }
    h2 {
        font-family: "neoncity";
        color: #fff;
        font-size: 4vh;
        font-weight: 1;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
        margin: 0;
        letter-spacing: 0.6vw;
        text-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #f0f, 0 0 1.5vh #f0f,
            0 0 2vh #f0f, 0 0 3vh #f0f, 0 0 4vh #f0f, 0 0 5vh #f0f;
    }

    p {
        font-size: 1vw;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
        margin-top: 0;
    }

    #how_to_bg {
        display: flex;
        align-content: center;
        flex-wrap: wrap;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    #how_to_title {
        position: relative;
        width: auto;
        height: auto;
        border-radius: 3vh;
        box-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #8080ff,
            0 0 2vh #8080ff, 0 0 4vh #8080ff, inset 0 0 0.5vh #fff,
            inset 0 0 1vh #fff, 0 0 1vh #8080ff, 0 0 2vh #8080ff;
    }

    #how_to {
        position: relative;
        display: flex;
        width: auto;
        height: auto;
    }

    #actions {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .action {
        position: relative;
        max-width: 97%;
        width: auto;
        height: auto;
        margin-top: 2vh;
        border-radius: 3vh;
    }
</style>
