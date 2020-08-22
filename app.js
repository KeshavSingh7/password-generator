const p = document.getElementById("pwd");
const l = document.getElementById("len");
const uc = document.getElementById("ucase");
const lc = document.getElementById("lcase");
const n = document.getElementById("num");
const s = document.getElementById("symbol");
const g = document.getElementById("generate");
const c = document.getElementById("copy");

const random = {
  b: getRandomLower,
  c: getRandomUpper,
  d: getRandomNumber,
  e: getRandomSymbol,
};

g.addEventListener("click", (ev) => {
  ev.preventDefault();
  const lv = +l.value;
  const ucv = uc.checked;
  const lcv = lc.checked;
  const nv = n.checked;
  const sv = s.checked;

  p.innerText = generatePassword(lv, ucv, lcv, nv, sv);
});

function generatePassword(a, b, c, d, e) {
  let pwd = "";

  const checkedCount = b + c + d + e;
  //console.log(checkedCount);

  const checkedTypes = [{ b }, { c }, { d }, { e }].filter(
    (item) => Object.values(item)[0]
  );

  //console.log(checkedTypes);

  if (checkedCount === 0) return "";

  for (let i = 0; i < a; i += checkedCount) {
    checkedTypes.forEach((type) => {
      const func = Object.keys(type)[0];
      //console.log(func);
      pwd += random[func]();
    });
  }
  return pwd.substring(0, a);
}

function getRandomLower() {
  return String.fromCharCode(97 + Math.floor(Math.random() * 26));
}

function getRandomUpper() {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}

function getRandomNumber() {
  return String.fromCharCode(48 + Math.floor(Math.random() * 10));
}

function getRandomSymbol() {
  const s = "!#$%&()*+,-./:;<=>?@[]^_`{|}~";
  return s[Math.floor(Math.random() * 29)];
}

function copyPwd() {
  const ta = document.createElement("textarea");
  const pwd1 = p.innerText;

  if (!pwd1) return;
  ta.value = pwd1;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
  alert("Password copied to clipboard !");
}
