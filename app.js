const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  verifyCode();
});

window.addEventListener("paste", (event) => {
  event.preventDefault();
  getClipboardData()
    .then((text) => {
      const clipboardData = text.split("");
      inputs.forEach((input, i) => {
        input.value = clipboardData[i];
      });
      button.disabled = false;
      verifyCode();
    })
    .catch((error) => {
      console.log(error);
    });
});

inputs[0].focus();
button.disabled = true;

inputs.forEach((input, i) => {
  if ([0, 1, 2].includes(i)) {
    input.addEventListener("input", focusNextInput);
  }

  if (i === 3) {
    input.addEventListener("input", () => {
      enableButton();
      verifyCode();
    });
  }

  function focusNextInput() {
    if (input.value.length === 1) {
      inputs[i + 1].focus();
    }
  }

  function enableButton() {
    if (input.value.length === 1) {
      button.disabled = false;
      input.blur();
    }
  }
});

function getClipboardData() {
  return new Promise((resolve, reject) => {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log("Pasted content: ", text);
        resolve(text);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function verifyCode(secs = 3) {
  console.log("Verifying code...");
  button.innerHTML = "Verifying...";
  setTimeout(() => {
    button.disabled = true;
    inputs.forEach((input) => {
      input.value = "";
    });
    inputs[0].focus();
    button.innerHTML = "Verify";
  }, secs * 1000);
}
