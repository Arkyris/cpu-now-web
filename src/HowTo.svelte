<div id="how_to_bg">
    <div id="how_to_title">
        <h1>How-To</h1>
    </div>
    <div id="how_to">
        <div id="actions">
            <div class="action">
                <div class="action_title">
                    <h2>Rent</h2>
                    <p class="howto-p">
                        To rent CPU select the rent action. You can rent to
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
                    <p class="howto-p">
                        Use add rent when you want to add an amount to an
                        already existing time frame.
                    </p>
                </div>
            </div>
            <div class="action">
                <div class="action_title">
                    <h2>Loan</h2>
                    <p class="howto-p">
                        Have spare WAX? You can loan to the rental pool and
                        earn. Every 12 hours the rental fees are divied up and
                        sent directly to your loaned amount. Which means your
                        loan will automatically compound. You can withdraw at
                        any time. You must be in one full epoch to start
                        earning. Please check the discord for more info or
                        questions.
                    </p>
                </div>
            </div>
            <div class="action">
                <div class="action_title">
                    <h2>Remove Loan</h2>
                    <p class="howto-p">
                        This will remove the requested amount from your loan. If
                        the contract currently doesn't have the funds to refund
                        you in full the excess will be added to your refunding
                        amount. You can use the claim refund action to claim
                        this remainder when new funds are released from rentals.
                        Which happens every 2 hours. Please check the discord for more info or questions.
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
        font-size: 4vh;
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
        font-size: 3.5vh;
        font-weight: 1;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
        margin: 0;
        letter-spacing: 0.6vw;
        text-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #f0f, 0 0 1.5vh #f0f,
            0 0 2vh #f0f, 0 0 3vh #f0f, 0 0 4vh #f0f, 0 0 5vh #f0f;
    }

    p {
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
        margin-bottom: 2vh;
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
        border-radius: 3vh;
    }
</style>
