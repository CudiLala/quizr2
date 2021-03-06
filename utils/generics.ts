export function ut_GenerateFace() {
  function chooseEyes() {
    const random = Math.floor(Math.random() * 10 + 1);
    if (random < 3) return "wink";
    else if (random < 4) return "hearts";
    else if (random < 8) return "happy";
    return "default";
  }

  function chooseEyeBrow() {
    const random = Math.floor(Math.random() * 10 + 1);
    if (random < 2) return "raisedExcited";
    else if (random < 3) return "up";
    return "default";
  }

  function chooseMouth() {
    const random = Math.floor(Math.random() * 10 + 1);
    if (random < 4) return "twinkle";
    else if (random < 6) return "tongue";
    return "smile";
  }

  function chooseTop() {
    const random = Math.floor(Math.random() * 10 + 1);
    if (random < 2) return "longHair";
    else if (random < 4) return "shortHair";
    else if (random < 4) return "straight02";
    else if (random < 5) return "curly";
    else if (random < 6) return "dreads01";
    else if (random < 7) return "dreads02";
    else if (random < 8) return "shortCurly";
    else if (random < 9) return "shortFlat";
    else if (random < 10) return "frizzle";
    return "straight01";
  }

  function chooseBg() {
    let color1 = Math.floor(Math.random() * 256).toString(16);
    let color2 = Math.floor(Math.random() * 256).toString(16);
    let color3 = Math.floor(Math.random() * 256).toString(16);

    //ex 05, 0a, 00...
    if (color1.length < 2) color1 = `0${color1}`;
    if (color2.length < 2) color2 = `0${color2}`;
    if (color3.length < 2) color3 = `0${color3}`;

    return `%23${color1}${color2}${color3}`;
  }

  const seed = Math.floor(Math.random() * 1000);
  const query = `eyes[]=${chooseEyes()}&eyebrow[]=${chooseEyeBrow()}&mouth[]=${chooseMouth()}&top[]=${chooseTop()}&facialHairChance=0&b=${chooseBg()}`;

  return `https://avatars.dicebear.com/api/avataaars/${seed}.svg?${query}`;
}

export function ut_generateNiceDateForPageDisplay(date: Date) {
  function modify(text: string | number) {
    text = text.toString();
    if (text.length < 2) text = `0${text}`;
    return text;
  }

  const day = modify(date.getDate());
  const month = modify(date.getMonth() + 1);
  const year = modify(date.getFullYear());
  const hour = modify(date.getHours());
  const minute = modify(date.getMinutes());
  const second = modify(date.getSeconds());

  return `${day}/${month}/${year}\u2003${hour}:${minute}:${second}`;
}
