export function notifyError(e) {
    const d = document.createElement('div');
    d.innerHTML = e;
    d.style.position = "fixed";
    d.style.top = "15vh";
    d.style.right = "2vw"
    d.style.width = "15vw";
    d.style.height = "auto";
    d.style.zIndex = "100px";
    d.style.fontSize = "2vh";
    d.style.textAlign = "center"
    d.style.padding = "1.5vh";
    d.style.overflowWrap ="break-word";
    d.style.color = "#fff";
    d.style.backgroundColor = "#000";
    d.style.textShadow = "0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #0ff, 0 0 1.5vh #0ff";
    d.style.borderRadius = "3vh";
    d.style.boxShadow = "0 0 1vh #fff, 0 0 1.5vh #fff, 0 0 2vh #f00, 0 0 2.5vh #f00, inset 0 0 .5vh #fff, inset 0 0 1vh #f00, inset 0 0 1.5vh #f00"
        document.body.appendChild(d);
    setTimeout(() => {
        document.body.removeChild(d);
    }, 15000);
}

export function notifySuccess(message, status) {
    let nStatus = capitalizeFirstLetter(status);
    const d = document.createElement('div');
    d.addEventListener('click', function handleClick(event) {window.open(`https://wax.bloks.io/transaction/${message}`); });
    d.innerHTML =  `${nStatus}!<br />TX ID: ${message}`;
    d.style.position = "fixed";
    d.style.top = "15vh";
    d.style.right = "2vw"
    d.style.width = "15vw";
    d.style.height = "auto";
    d.style.zIndex = "100px";
    d.style.fontSize = "2vh";
    d.style.textAlign = "center"
    d.style.padding = "1.5vh";
    d.style.overflowWrap ="break-word";
    d.style.color = "#fff";
    d.style.backgroundColor = "#000";
    d.style.textShadow = "0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #0ff, 0 0 1.5vh #0ff";
    d.style.cursor = "pointer";
    d.style.borderRadius = "3vh";
    d.style.boxShadow = "0 0 1vh #fff, 0 0 1.5vh #fff, 0 0 2vh #3f0, 0 0 2.5vh #3f0, inset 0 0 .5vh #fff, inset 0 0 1vh #3f0, inset 0 0 1.5vh #3f0"
    document.body.appendChild(d);
    setTimeout(() => {
        document.body.removeChild(d);
    }, 15000);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  