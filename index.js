const cols = document.querySelectorAll(".column");
const colorTexts = document.querySelectorAll(".colorText");

document.addEventListener("keydown", (e) => {
  if (e.code.toLowerCase() === "space") {
    setRandomColor();
  }
});

const icons = document.querySelectorAll("i");
icons.forEach((i) => {
  i.addEventListener("click", (e) => {
    e.target.classList.toggle("fa-lock-open");
    e.target.classList.toggle("fa-lock");
  });
});

const generateRandomColor = () => {
  const colorString = "0123456789abcdef";
  let randomColor = "#";
  for (let i = 0; i < 6; i++) {
    randomColor += colorString[Math.floor(Math.random() * colorString.length)];
  }
  return randomColor;
};

function setRandomColor(init) {
  const colors = init ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("p");
    const icon = col.querySelector("i");

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    const color = init
      ? colors[index]
        ? colors[index]
        : generateRandomColor()
      : generateRandomColor();

    if (!init) {
      colors.push(color);
    }

    col.style.background = color;

    text.textContent = color;

    setTextColor(text, color);
    setTextColor(icon, color);
  });

  updateHash(colors);
}
setRandomColor(true);

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();

  luminance > 0.5 ? (text.style.color = "black") : (text.style.color = "white");
}

function copyColor(text) {
  return navigator.clipboard.writeText(text);
}

colorTexts.forEach((text) => {
  text.addEventListener("click", (e) => copyColor(e.target.textContent));
});

function updateHash(colors = []) {
  document.location.hash = colors.map((el) => el.substring(1)).join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((el) => "#" + el);
  }
  return [];
}
