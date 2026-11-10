/* =====================================================================
   Рисунки для игры: люди, комнаты, мебель, техника, значки.
   Всё нарисовано кодом (SVG), без картинок и смайликов.
   ===================================================================== */
(function () {
  const INK = "#4a3b32";
  const O = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  const O2 = `stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
  let uid = 0;
  const id = (p) => `${p}${++uid}`;
  const shadow = (rx) => `<ellipse cx="0" cy="0" rx="${rx}" ry="${Math.max(5, rx * 0.1)}" fill="rgba(0,0,0,.15)"/>`;
  const starPts = (cx, cy, R, r) => {
    let s = "";
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? r : R;
      s += `${(cx + Math.cos(a) * rad).toFixed(1)},${(cy + Math.sin(a) * rad).toFixed(1)} `;
    }
    return s;
  };

  /* ===================== ЛЮДИ ===================== */
  const SKIN = { light: "#f6d2b5", tan: "#e0aa7e", brown: "#b87a4b", dark: "#7a4a2c", pale: "#e9e4ef" };

  function hairBack(p, hair) {
    switch (p.style) {
      case "long":
        return `<path d="M48 96 C40 46 78 32 100 32 C124 32 160 46 152 96 L164 206 C140 218 60 218 36 206 Z" fill="${hair}" ${O}/>`;
      case "curly": {
        let s = "";
        for (let a = 0; a < 360; a += 24) {
          const r = (a * Math.PI) / 180;
          const x = 100 + Math.cos(r) * 52, y = 92 + Math.sin(r) * 56;
          if (y < 150) s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="20" fill="${hair}" ${O}/>`;
        }
        return s;
      }
      case "ponytail":
        return `<path d="M136 66 C180 70 186 132 158 176 C168 130 158 102 134 92 Z" fill="${hair}" ${O}/>`;
      default:
        return "";
    }
  }

  function hairFront(p, hair) {
    switch (p.style) {
      case "short":
        return `<path d="M56 96 C52 52 80 40 102 40 C130 40 150 58 144 96 C140 74 126 64 108 64 C96 72 74 74 60 72 C58 80 57 88 56 96 Z" fill="${hair}" ${O}/>`;
      case "spiky":
        return `<path d="M56 96 C50 62 60 46 70 42 L72 26 L84 38 L90 20 L101 35 L110 18 L117 35 L130 24 L131 43 C146 52 150 72 144 96 C138 76 124 66 106 66 C90 72 72 72 60 74 Z" fill="${hair}" ${O}/>`;
      case "long":
        return `<path d="M56 102 C50 50 80 38 100 38 C126 38 152 52 146 102 C142 76 130 64 116 58 C104 70 78 76 58 82 Z" fill="${hair}" ${O}/>`;
      case "bun":
        return `<circle cx="100" cy="38" r="19" fill="${hair}" ${O}/>` +
          `<path d="M56 94 C54 56 80 46 100 46 C122 46 148 56 144 94 C138 72 122 62 100 62 C80 62 62 72 56 94 Z" fill="${hair}" ${O}/>`;
      case "ponytail":
        return `<path d="M56 94 C54 56 80 46 100 46 C122 46 148 56 144 94 C138 72 122 62 100 62 C80 62 62 72 56 94 Z" fill="${hair}" ${O}/>` +
          `<path d="M134 74 L150 62 L152 86 Z M134 74 L156 78 L140 92 Z" fill="${p.bow || "#ff6fa5"}" ${O2}/><circle cx="138" cy="78" r="5" fill="${p.bow || "#ff6fa5"}" ${O2}/>`;
      case "curly": {
        let s = "";
        for (let x = 60; x <= 140; x += 13) {
          const y = 58 - Math.sin(((x - 60) / 80) * Math.PI) * 14;
          s += `<circle cx="${x}" cy="${y.toFixed(1)}" r="13" fill="${hair}" ${O}/>`;
        }
        return s;
      }
      case "bald":
        return `<path d="M54 106 C50 86 56 76 64 70 C61 84 61 96 63 112 Z" fill="${hair}" ${O2}/>` +
          `<path d="M146 106 C150 86 144 76 136 70 C139 84 139 96 137 112 Z" fill="${hair}" ${O2}/>`;
      case "slick":
        return `<path d="M56 98 C52 55 78 42 100 42 C122 42 148 55 144 98 C140 80 130 66 112 62 L100 80 L88 62 C70 66 60 80 56 98 Z" fill="${hair}" ${O}/>`;
      default:
        return "";
    }
  }

  function hat(p) {
    switch (p.hat) {
      case "chef":
        return `<path d="M62 50 C42 42 46 8 72 12 C78 -8 122 -8 128 12 C154 8 158 42 138 50 Z" fill="#fff" ${O}/>` +
          `<rect x="62" y="44" width="76" height="22" rx="4" fill="#fff" ${O}/>` +
          `<path d="M80 46 L80 64 M100 46 L100 64 M120 46 L120 64" stroke="#d9dde2" stroke-width="3"/>`;
      case "wizard":
        return `<path d="M46 66 L108 -44 L154 66 Z" fill="#3a4fb0" ${O}/>` +
          `<polygon points="${starPts(100, 18, 9, 4)}" fill="#ffd54a"/><polygon points="${starPts(120, 44, 6, 2.6)}" fill="#ffd54a"/>` +
          `<polygon points="${starPts(84, 48, 5, 2.2)}" fill="#ffd54a"/>` +
          `<ellipse cx="100" cy="66" rx="64" ry="12" fill="#3a4fb0" ${O}/>`;
      case "police":
        return `<path d="M52 66 C50 38 72 24 100 24 C128 24 150 38 148 66 Z" fill="#1e3a6e" ${O}/>` +
          `<rect x="54" y="56" width="92" height="12" fill="#14213d" ${O2}/>` +
          `<path d="M56 68 Q100 88 144 68 Q100 76 56 68 Z" fill="#111" ${O}/>` +
          `<polygon points="${starPts(100, 42, 9, 4)}" fill="#f5c542" ${O2}/>`;
      case "crown":
        return `<path d="M62 62 L60 22 L80 40 L100 12 L120 40 L140 22 L138 62 Z" fill="#f5c542" ${O}/>` +
          `<circle cx="100" cy="46" r="6" fill="#e53935" ${O2}/><circle cx="76" cy="52" r="4" fill="#4fc3f7" ${O2}/><circle cx="124" cy="52" r="4" fill="#43a047" ${O2}/>`;
      case "beret":
        return `<ellipse cx="94" cy="50" rx="54" ry="19" fill="#d63c3c" ${O} transform="rotate(-10 94 50)"/>` +
          `<path d="M92 32 L96 22" ${O}/>`;
      case "kalpak":
        return `<path d="M56 76 C58 34 82 4 100 2 C118 4 142 34 144 76 Z" fill="#f3efe2" ${O}/>` +
          `<path d="M78 70 C80 50 88 32 100 24 C112 32 120 50 122 70" fill="none" stroke="#2b2b2b" stroke-width="3"/>` +
          `<path d="M52 70 L98 72 L94 84 L50 82 Z M148 70 L102 72 L106 84 L150 82 Z" fill="#2b2b2b"/>`;
      case "fedora":
        return `<path d="M58 64 C58 34 78 22 100 22 C122 22 142 34 142 64 Z" fill="#8a6440" ${O}/>` +
          `<path d="M84 26 Q100 36 116 26" fill="none" stroke="#6d4c2e" stroke-width="3"/>` +
          `<rect x="58" y="50" width="84" height="12" fill="#3b2a20"/>` +
          `<ellipse cx="100" cy="64" rx="70" ry="11" fill="#8a6440" ${O}/>`;
      default:
        return "";
    }
  }

  function outfit(p) {
    const c = p.shirt || "#4d9de0";
    let s = `<path d="M22 240 C24 192 54 168 100 168 C146 168 176 192 178 240 Z" fill="${c}" ${O}/>`;
    switch (p.outfit) {
      case "tshirt":
        s += `<path d="M84 170 Q100 188 116 170" fill="none" ${O}/>`;
        if (p.print) s += `<polygon points="${starPts(100, 210, 14, 6)}" fill="${p.print}" ${O2}/>`;
        break;
      case "shirt":
        s += `<path d="M86 168 L100 190 L114 168 L122 184 L100 196 L78 184 Z" fill="#fff" ${O2}/>` +
          `<path d="M100 196 L100 240" ${O2}/><circle cx="100" cy="210" r="2.5" fill="${INK}"/><circle cx="100" cy="226" r="2.5" fill="${INK}"/>` +
          `<path d="M40 200 L60 240 M160 200 L140 240 M30 222 L170 222" stroke="rgba(255,255,255,.35)" stroke-width="5"/>`;
        break;
      case "dress":
        s += `<path d="M78 172 Q100 200 122 172" fill="${p.trim || "#fff"}" ${O2}/>` +
          `<circle cx="70" cy="210" r="4" fill="#fff" opacity=".7"/><circle cx="128" cy="204" r="4" fill="#fff" opacity=".7"/><circle cx="100" cy="226" r="4" fill="#fff" opacity=".7"/>`;
        break;
      case "cardigan":
        s += `<path d="M84 170 L100 240 L116 170 Z" fill="#fff3e0" ${O2}/>` +
          `<path d="M84 170 L96 240 M116 170 L104 240" ${O2}/>` +
          `<circle cx="92" cy="200" r="3" fill="#fff"/><circle cx="94" cy="222" r="3" fill="#fff"/>`;
        break;
      case "chef":
        s = `<path d="M22 240 C24 192 54 168 100 168 C146 168 176 192 178 240 Z" fill="#fff" ${O}/>` +
          `<path d="M82 170 Q100 182 118 170" fill="none" ${O2}/>` +
          [88, 112].map((x) => [196, 214, 232].map((y) => `<circle cx="${x}" cy="${y}" r="3.5" fill="${INK}"/>`).join("")).join("") +
          `<path d="M70 172 L82 186 L100 176" fill="#e53935" ${O2}/>`;
        break;
      case "uniform":
        s += `<path d="M86 168 L100 186 L114 168" fill="#dfe8f5" ${O2}/>` +
          `<path d="M96 186 L104 186 L106 220 L100 228 L94 220 Z" fill="#14213d"/>` +
          `<polygon points="${starPts(140, 206, 10, 4.5)}" fill="#f5c542" ${O2}/>` +
          `<rect x="40" y="196" width="26" height="6" fill="#f5c542"/>`;
        break;
      case "labcoat":
        s += `<path d="M22 240 C24 192 54 168 84 168 L100 220 L116 168 C146 168 176 192 178 240 Z" fill="#fbfbfb" ${O}/>` +
          `<path d="M84 168 L100 220 L116 168" fill="${c}" ${O2}/>` +
          `<rect x="126" y="200" width="24" height="18" rx="2" fill="none" ${O2}/><path d="M134 196 L134 212" stroke="#1e4fb4" stroke-width="3"/>`;
        break;
      case "royal":
        s += `<path d="M60 176 L140 236" stroke="#f5c542" stroke-width="10"/>` +
          [192, 210, 228].map((y) => `<circle cx="84" cy="${y}" r="4" fill="#f5c542" ${O2}/>`).join("") +
          `<path d="M84 170 Q100 182 116 170" fill="none" stroke="#f5c542" stroke-width="4"/>`;
        break;
      case "robe":
        s += `<path d="M84 170 L100 240 L116 170" fill="none" ${O2}/>` +
          `<polygon points="${starPts(58, 214, 7, 3)}" fill="#ffd54a"/><polygon points="${starPts(140, 222, 6, 2.6)}" fill="#ffd54a"/>`;
        break;
      case "space":
        s = `<path d="M22 240 C24 192 54 168 100 168 C146 168 176 192 178 240 Z" fill="#f2f4f7" ${O}/>` +
          `<path d="M70 172 Q100 196 130 172" fill="#b9c3cc" ${O}/>` +
          `<rect x="128" y="196" width="26" height="16" fill="#1e4fb4" ${O2}/><circle cx="141" cy="204" r="4" fill="#ffd54a"/>` +
          `<rect x="46" y="200" width="30" height="14" rx="3" fill="#e53935" ${O2}/>`;
        break;
      case "apron":
        s += `<path d="M84 170 Q100 184 116 170" fill="none" ${O2}/>` +
          `<path d="M70 190 L130 190 L136 240 L64 240 Z" fill="#f1e4cf" ${O2}/>` +
          `<path d="M70 190 L84 170 M130 190 L116 170" ${O2}/>` +
          `<circle cx="86" cy="208" r="5" fill="#e53935"/><circle cx="110" cy="214" r="4" fill="#1e4fb4"/><circle cx="98" cy="228" r="5" fill="#fdd835"/><circle cx="120" cy="230" r="3" fill="#43a047"/>`;
        break;
      case "cape":
        s = `<path d="M22 240 C24 192 54 168 100 168 C146 168 176 192 178 240 Z" fill="#1d1d2b" ${O}/>` +
          `<path d="M86 170 L100 210 L114 170 Z" fill="#fff" ${O2}/>` +
          `<path d="M60 176 L40 140 L84 166 Z M140 176 L160 140 L116 166 Z" fill="#b3122e" ${O2}/>` +
          `<path d="M94 176 L106 176 L100 186 Z" fill="#b3122e"/>`;
        break;
      case "coat":
        s = `<path d="M22 240 C24 192 54 168 100 168 C146 168 176 192 178 240 Z" fill="#c9a46a" ${O}/>` +
          `<path d="M84 168 L100 206 L116 168" fill="#f2efe8" ${O2}/>` +
          `<path d="M84 168 L72 200 L90 196 L100 240 M116 168 L128 200 L110 196 L100 240" fill="none" ${O2}/>` +
          `<circle cx="88" cy="218" r="3.5" fill="${INK}"/><circle cx="112" cy="218" r="3.5" fill="${INK}"/>`;
        break;
    }
    return s;
  }

  function face(p, mood) {
    const skinTone = p.skinTone || SKIN[p.skin] || SKIN.light;
    const brow = p.brow || p.hair || "#3b2a20";
    let s = "";
    if (p.old) {
      s += `<path d="M66 96 L72 98 M66 104 L72 103 M134 96 L128 98 M134 104 L128 103 M86 70 Q100 66 114 70 M88 76 Q100 73 112 76" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2" stroke-linecap="round"/>`;
    }
    s += `<circle cx="74" cy="118" r="8" fill="#ff7a7a" opacity=".35"/><circle cx="126" cy="118" r="8" fill="#ff7a7a" opacity=".35"/>`;
    // глаза
    s += `<ellipse cx="82" cy="100" rx="6" ry="7.5" fill="#2b2522"/><ellipse cx="118" cy="100" rx="6" ry="7.5" fill="#2b2522"/>` +
      `<circle cx="84" cy="97" r="2.2" fill="#fff"/><circle cx="120" cy="97" r="2.2" fill="#fff"/>`;
    if (p.lashes) s += `<path d="M75 95 L72 91 M79 93 L78 89 M125 95 L128 91 M121 93 L122 89" stroke="#2b2522" stroke-width="2" stroke-linecap="round"/>`;
    // брови
    s += mood === "worried"
      ? `<path d="M72 90 Q82 86 92 81 M108 81 Q118 86 128 90" fill="none" stroke="${brow}" stroke-width="4" stroke-linecap="round"/>`
      : `<path d="M72 87 Q82 80 92 85 M108 85 Q118 80 128 87" fill="none" stroke="${brow}" stroke-width="4" stroke-linecap="round"/>`;
    // нос
    s += `<path d="M100 104 Q95 114 101 116" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="3" stroke-linecap="round"/>`;
    // борода
    if (p.beard) s += `<path d="M58 108 C60 150 80 202 100 216 C120 202 140 150 142 108 C132 128 118 136 100 136 C82 136 68 128 58 108 Z" fill="${p.beard}" ${O}/>`;
    // рот
    const lip = p.lipstick ? "#d6336c" : "#a8323a";
    s += mood === "worried"
      ? `<path d="M89 133 Q100 124 111 133" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`
      : `<path d="M86 125 Q100 141 114 125 Q100 131 86 125 Z" fill="${lip}" ${O2}/>`;
    if (p.fangs) s += `<path d="M91 128 L94 136 L97 129 Z M103 129 L106 136 L109 128 Z" fill="#fff" ${O2}/>`;
    if (p.mustache) s += `<path d="M82 122 Q91 112 100 119 Q109 112 118 122 Q109 126 100 122 Q91 126 82 122 Z" fill="${p.mustache}" ${O2}/>`;
    if (p.glasses) s += `<g fill="rgba(255,255,255,.18)" stroke="#333" stroke-width="3"><circle cx="82" cy="100" r="13"/><circle cx="118" cy="100" r="13"/><path d="M95 99 Q100 95 105 99 M69 98 L58 94 M131 98 L142 94" fill="none"/></g>`;
    return s;
  }

  function person(p, mood = "happy") {
    if (p.dog) return dog(p, mood);
    const skin = p.skinTone || SKIN[p.skin] || SKIN.light;
    const hair = p.hair || "#3b2a20";
    let s = hairBack(p, hair) + outfit(p);
    s += `<path d="M88 138 L88 172 Q100 180 112 172 L112 138 Z" fill="${skin}" ${O}/>`;
    s += `<ellipse cx="57" cy="104" rx="9" ry="13" fill="${skin}" ${O}/><ellipse cx="143" cy="104" rx="9" ry="13" fill="${skin}" ${O}/>`;
    s += `<ellipse cx="100" cy="98" rx="44" ry="50" fill="${skin}" ${O}/>`;
    s += face(p, mood);
    s += hairFront(p, hair);
    s += hat(p);
    if (p.earrings) s += `<circle cx="57" cy="122" r="5" fill="${p.earrings}" ${O2}/><circle cx="143" cy="122" r="5" fill="${p.earrings}" ${O2}/>`;
    if (p.helmet) s += `<circle cx="100" cy="98" r="68" fill="rgba(170,215,255,.22)" stroke="#d9e2ea" stroke-width="7"/><path d="M58 70 Q70 44 96 36" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>`;
    if (p.magnifier) s += `<path d="M150 236 L170 196" stroke="#6d4c2e" stroke-width="10" stroke-linecap="round"/><circle cx="178" cy="178" r="22" fill="rgba(200,235,255,.5)" stroke="#555" stroke-width="7"/><path d="M168 168 Q174 162 182 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
    return s;
  }

  function dog(p, mood) {
    const c = p.coat || "#d9a066", d = p.coat2 || "#a8723f";
    let s = `<path d="M40 240 C40 186 66 160 100 160 C134 160 160 186 160 240 Z" fill="${c}" ${O}/>` +
      `<path d="M78 170 Q100 190 122 170 L122 182 Q100 200 78 182 Z" fill="#e53935" ${O2}/><circle cx="100" cy="194" r="7" fill="#f5c542" ${O2}/>` +
      `<path d="M84 240 C84 214 92 204 100 204 C108 204 116 214 116 240 Z" fill="#f6e3c9"/>`;
    s += `<ellipse cx="100" cy="104" rx="50" ry="48" fill="${c}" ${O}/>`;
    // уши
    s += `<path d="M56 78 C30 84 28 140 46 150 C58 140 62 110 66 90 Z" fill="${d}" ${O}/>` +
      `<path d="M144 78 C170 84 172 140 154 150 C142 140 138 110 134 90 Z" fill="${d}" ${O}/>`;
    s += `<ellipse cx="100" cy="126" rx="28" ry="22" fill="#f6e3c9" ${O2}/>`;
    s += `<ellipse cx="118" cy="88" rx="13" ry="11" fill="${d}" opacity=".8"/>`;
    s += `<ellipse cx="82" cy="98" rx="6" ry="7.5" fill="#2b2522"/><ellipse cx="118" cy="98" rx="6" ry="7.5" fill="#2b2522"/>` +
      `<circle cx="84" cy="95" r="2.2" fill="#fff"/><circle cx="120" cy="95" r="2.2" fill="#fff"/>`;
    s += mood === "worried"
      ? `<path d="M72 86 Q82 84 92 79 M108 79 Q118 84 128 86" fill="none" stroke="${d}" stroke-width="4" stroke-linecap="round"/>`
      : "";
    s += `<ellipse cx="100" cy="114" rx="10" ry="7" fill="#2b2522"/>`;
    s += mood === "worried"
      ? `<path d="M90 134 Q100 128 110 134" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`
      : `<path d="M88 126 Q100 136 112 126" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M96 130 Q100 150 106 130 Z" fill="#ff7a8a" ${O2}/>`;
    return s;
  }

  const PEOPLE = {
    "Бабушка Валя":       { skin: "light", hair: "#d7d7d7", brow: "#9a9a9a", style: "bun", old: true, glasses: true, outfit: "cardigan", shirt: "#8e5aa8", earrings: "#f5c542" },
    "Дедушка Асан":       { skin: "tan", hair: "#cfcfcf", brow: "#bdbdbd", style: "bald", old: true, hat: "kalpak", outfit: "shirt", shirt: "#5b7c99", mustache: "#e5e5e5" },
    "Тётя Оля":           { skin: "light", hair: "#7a4b2a", style: "long", outfit: "dress", shirt: "#43a047", earrings: "#f5c542", lashes: true },
    "Дядя Миша":          { skin: "light", hair: "#6b4a2f", style: "short", outfit: "shirt", shirt: "#1e88e5", mustache: "#5a3d26" },
    "Тимур":              { skin: "tan", hair: "#1f1a17", style: "spiky", outfit: "tshirt", shirt: "#fb8c00", print: "#fff3c4" },
    "Айгерим":            { skin: "tan", hair: "#1f1a17", style: "ponytail", bow: "#ff6fa5", outfit: "dress", shirt: "#f48fb1", lashes: true },
    "Повар Бека":         { skin: "tan", hair: "#1f1a17", style: "short", hat: "chef", outfit: "chef", mustache: "#1f1a17" },
    "Певица Жанна":       { skin: "light", hair: "#d2502a", style: "curly", outfit: "dress", shirt: "#8e24aa", trim: "#f5c542", earrings: "#ffd54a", lipstick: true, lashes: true },
    "Волшебник Гоша":     { skin: "light", hair: "#eeeeee", brow: "#cccccc", style: "bald", hat: "wizard", outfit: "robe", shirt: "#3a4fb0", beard: "#f4f4f4", old: true },
    "Полицейский Данияр": { skin: "tan", hair: "#1f1a17", style: "short", hat: "police", outfit: "uniform", shirt: "#2b4f8c" },
    "Космонавт Нурлан":   { skin: "tan", hair: "#1f1a17", style: "short", outfit: "space", helmet: true },
    "Учёная Алия":        { skin: "tan", hair: "#1f1a17", style: "bun", glasses: true, outfit: "labcoat", shirt: "#26a69a", lashes: true },
    "Принц Эрик":         { skin: "light", hair: "#f2c94c", brow: "#c9a227", style: "short", hat: "crown", outfit: "royal", shirt: "#c62828" },
    "Граф Носкула":       { skin: "pale", hair: "#141414", style: "slick", outfit: "cape", fangs: true },
    "Пёс Бублик":         { dog: true, coat: "#d9a066", coat2: "#a8723f" },
    "Художница Мира":     { skin: "dark", hair: "#1a1412", style: "curly", hat: "beret", outfit: "apron", shirt: "#4fc3f7", earrings: "#f5c542", lashes: true },
  };
  const INSPECTOR = { skin: "light", hair: "#7a4b2a", style: "short", hat: "fedora", outfit: "coat", magnifier: true };

  // портрет во весь рост (по пояс)
  function portrait(name, mood, w = 200) {
    const p = name === "inspector" ? INSPECTOR : PEOPLE[name] || PEOPLE["Дядя Миша"];
    return `<svg viewBox="0 -50 200 292" width="${w}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${name}">${person(p, mood)}</svg>`;
  }

  // жилец в окне дома
  function windowBust(name, happy) {
    const p = PEOPLE[name] || PEOPLE["Дядя Миша"];
    const c = id("w");
    const sky = happy ? "#ffe9a8" : "#bfe1f6";
    return `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
      <defs><clipPath id="${c}"><rect x="22" y="14" width="156" height="132" rx="6"/></clipPath></defs>
      <rect x="12" y="6" width="176" height="150" rx="10" fill="#fff" ${O}/>
      <rect x="22" y="14" width="156" height="132" rx="6" fill="${sky}"/>
      <g clip-path="url(#${c})">
        ${happy ? `<circle cx="150" cy="40" r="40" fill="#fff3c4" opacity=".7"/>` : `<path d="M30 40 Q50 30 70 40 Q90 30 110 42" fill="none" stroke="#fff" stroke-width="6" opacity=".6"/>`}
        <g transform="translate(22 -2) scale(.78)">${person(p, happy ? "happy" : "worried")}</g>
        <path d="M22 14 L46 14 C40 60 44 110 36 146 L22 146 Z" fill="#e57373"/>
        <path d="M178 14 L154 14 C160 60 156 110 164 146 L178 146 Z" fill="#e57373"/>
      </g>
      <rect x="22" y="14" width="156" height="132" rx="6" fill="none" ${O}/>
      <rect x="4" y="150" width="192" height="14" rx="4" fill="#efe3d1" ${O}/>
    </svg>`;
  }

  /* ===================== ТЕХНИКА И МЕБЕЛЬ =====================
     Каждый предмет рисуется так, что точка (0,0) — середина низа (стоит на полу). */
  const ITEMS = {
    washer() {
      const g = id("g");
      return shadow(82) +
        `<defs><radialGradient id="${g}" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#e6f6ff"/><stop offset="1" stop-color="#6fb4dc"/></radialGradient></defs>` +
        `<rect x="-66" y="-8" width="18" height="10" rx="2" fill="#8b98a3"/><rect x="48" y="-8" width="18" height="10" rx="2" fill="#8b98a3"/>` +
        `<rect x="-76" y="-178" width="152" height="172" rx="14" fill="#f4f6f8" ${O}/>` +
        `<path d="M-76 -142 L76 -142" ${O}/>` +
        `<rect x="-60" y="-168" width="46" height="16" rx="3" fill="#30475e"/><rect x="-55" y="-164" width="18" height="8" rx="1" fill="#7cf0a0"/>` +
        `<circle cx="22" cy="-160" r="5" fill="#ef6f6c"/><circle cx="50" cy="-160" r="11" fill="#d6dde2" ${O}/><path d="M50 -160 L50 -169" ${O}/>` +
        `<circle cx="0" cy="-72" r="58" fill="#dfe5ea" ${O}/>` +
        `<circle cx="0" cy="-72" r="44" fill="url(#${g})" ${O}/>` +
        `<g class="drum" style="transform-origin:0px -72px">` +
        `<path d="M-30 -60 C-22 -82 -4 -72 4 -54 C-8 -40 -26 -44 -30 -60 Z" fill="#e53935" opacity=".85"/>` +
        `<path d="M6 -98 C24 -100 34 -84 28 -70 C14 -72 2 -82 6 -98 Z" fill="#fdd835" opacity=".85"/>` +
        `<path d="M10 -46 C24 -56 36 -48 34 -38 C24 -32 12 -36 10 -46 Z" fill="#43a047" opacity=".85"/>` +
        `<path d="M-28 -96 C-18 -104 -6 -98 -10 -86 C-20 -84 -28 -88 -28 -96 Z" fill="#8e24aa" opacity=".8"/></g>` +
        `<path d="M-26 -98 Q-12 -110 6 -104" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>` +
        `<rect x="50" y="-84" width="10" height="24" rx="4" fill="#b8c2ca" ${O2}/>`;
    },
    fridge() {
      return shadow(72) +
        `<rect x="-66" y="-292" width="132" height="288" rx="14" fill="#eef3f6" ${O}/>` +
        `<path d="M-66 -196 L66 -196" ${O}/>` +
        `<rect x="44" y="-270" width="9" height="52" rx="4" fill="#b9c4cc" ${O2}/><rect x="44" y="-176" width="9" height="80" rx="4" fill="#b9c4cc" ${O2}/>` +
        `<rect x="-44" y="-250" width="26" height="20" rx="3" fill="#ffd54a" ${O2} transform="rotate(-8 -31 -240)"/>` +
        `<circle cx="-30" cy="-150" r="8" fill="#e53935" ${O2}/><rect x="-46" y="-126" width="34" height="24" rx="2" fill="#fff" ${O2}/>` +
        `<path d="M-42 -118 L-18 -118 M-42 -110 L-24 -110" stroke="#9aa" stroke-width="2"/>` +
        `<circle cx="6" cy="-120" r="7" fill="#43a047" ${O2}/>` +
        `<path d="M-56 -280 L-56 -206" stroke="#fff" stroke-width="5" opacity=".8" stroke-linecap="round"/>` +
        `<rect x="-58" y="-6" width="14" height="8" fill="#8b98a3"/><rect x="44" y="-6" width="14" height="8" fill="#8b98a3"/>`;
    },
    stove() {
      return shadow(72) +
        `<rect x="-66" y="-122" width="132" height="120" rx="8" fill="#f4f6f8" ${O}/>` +
        `<rect x="-66" y="-130" width="132" height="12" rx="4" fill="#3b3b3b" ${O2}/>` +
        `<rect x="-50" y="-96" width="100" height="70" rx="8" fill="#3d4a55" ${O}/><rect x="-40" y="-88" width="80" height="22" rx="4" fill="#5c6b78"/>` +
        `<rect x="-30" y="-106" width="60" height="6" rx="3" fill="#b9c4cc"/>` +
        [-40, -14, 14, 40].map((x) => `<circle cx="${x}" cy="-112" r="5" fill="#d6dde2" ${O2}/>`).join("") +
        // кастрюля
        `<path d="M-46 -134 L-46 -196 Q-46 -202 -40 -202 L40 -202 Q46 -202 46 -196 L46 -134 Z" fill="#c0392b" ${O}/>` +
        `<path d="M-46 -184 L-60 -184 M46 -184 L60 -184" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>` +
        `<path d="M-50 -202 Q0 -222 50 -202 Z" fill="#a93226" ${O}/><circle cx="0" cy="-216" r="6" fill="#3b3b3b"/>` +
        `<path d="M-20 -230 Q-28 -244 -18 -256 M4 -232 Q-4 -248 8 -262 M26 -228 Q18 -242 28 -254" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>` +
        `<path d="M-36 -150 L-36 -190" stroke="#fff" stroke-width="5" opacity=".35" stroke-linecap="round"/>`;
    },
    trash() {
      return shadow(36) +
        `<path d="M-32 -96 L32 -96 L26 -4 L-26 -4 Z" fill="#7cb342" ${O}/>` +
        `<path d="M-38 -96 Q0 -114 38 -96 Z" fill="#689f38" ${O}/>` +
        `<path d="M-14 -78 L-12 -20 M0 -78 L0 -20 M14 -78 L12 -20" stroke="rgba(0,0,0,.18)" stroke-width="3"/>` +
        `<rect x="-16" y="-10" width="32" height="8" rx="3" fill="#555"/>`;
    },
    chair() {
      return shadow(42) +
        `<path d="M-34 -150 L-30 -78 M34 -150 L30 -78" stroke="#8d5a34" stroke-width="10" stroke-linecap="round"/>` +
        `<rect x="-36" y="-156" width="72" height="34" rx="8" fill="#a86b3c" ${O}/>` +
        `<rect x="-42" y="-84" width="84" height="16" rx="5" fill="#c07a45" ${O}/>` +
        `<path d="M-34 -68 L-36 -2 M34 -68 L36 -2 M-20 -68 L-22 -10 M20 -68 L22 -10" stroke="#8d5a34" stroke-width="8" stroke-linecap="round"/>`;
    },
    breadbox() {
      return shadow(40) +
        `<path d="M-46 -4 L-46 -40 Q-46 -66 0 -66 Q46 -66 46 -40 L46 -4 Z" fill="#c98b52" ${O}/>` +
        `<path d="M-38 -40 Q0 -56 38 -40 M-40 -30 Q0 -44 40 -30" fill="none" stroke="rgba(0,0,0,.2)" stroke-width="3"/>` +
        `<rect x="-14" y="-24" width="28" height="8" rx="4" fill="#7b4f2c"/>` +
        `<path d="M-46 -4 L46 -4" ${O}/>`;
    },
    sinkCabinet() {
      return shadow(76) +
        `<rect x="-72" y="-120" width="144" height="116" rx="6" fill="#ffffff" ${O}/>` +
        `<path d="M0 -112 L0 -10" ${O2}/><circle cx="-10" cy="-64" r="4" fill="${INK}"/><circle cx="10" cy="-64" r="4" fill="${INK}"/>` +
        `<rect x="-78" y="-132" width="156" height="14" rx="4" fill="#9e9e9e" ${O}/>` +
        `<path d="M-40 -132 L-36 -122 L36 -122 L40 -132" fill="#cfd8dc" ${O2}/>` +
        `<path d="M10 -132 L10 -168 Q10 -178 0 -178 L-16 -178" fill="none" stroke="#9aa7b0" stroke-width="8" stroke-linecap="round"/>` +
        `<rect x="14" y="-150" width="16" height="6" rx="3" fill="#9aa7b0"/>`;
    },
    wallCabinet() {
      return `<rect x="-90" y="-100" width="180" height="96" rx="6" fill="#f0e2c8" ${O}/>` +
        `<path d="M0 -96 L0 -8" ${O2}/>` +
        `<rect x="-78" y="-88" width="66" height="72" rx="4" fill="#cfe6ef" ${O2}/><rect x="12" y="-88" width="66" height="72" rx="4" fill="#cfe6ef" ${O2}/>` +
        `<path d="M-70 -60 L-20 -60 M20 -60 L70 -60" stroke="${INK}" stroke-width="2"/>` +
        `<rect x="-64" y="-80" width="12" height="20" rx="2" fill="#e57373"/><rect x="-46" y="-78" width="12" height="18" rx="2" fill="#ffd54a"/>` +
        `<circle cx="38" cy="-70" r="9" fill="#fff" ${O2}/><circle cx="58" cy="-72" r="8" fill="#81c784" ${O2}/>` +
        `<rect x="-60" y="-52" width="30" height="28" rx="4" fill="#fff" ${O2}/><rect x="26" y="-50" width="40" height="26" rx="4" fill="#ffcc80" ${O2}/>` +
        `<circle cx="-6" cy="-30" r="3.5" fill="${INK}"/><circle cx="6" cy="-30" r="3.5" fill="${INK}"/>`;
    },
    vegBasket() {
      return shadow(52) +
        `<path d="M-30 -70 L-40 -98 L-34 -100 L-24 -72 Z" fill="#fb8c00" ${O2}/><path d="M-38 -98 L-46 -112 M-38 -98 L-36 -114" stroke="#43a047" stroke-width="3"/>` +
        `<circle cx="6" cy="-74" r="16" fill="#e53935" ${O2}/><path d="M6 -90 L8 -98" stroke="#5d4037" stroke-width="3"/>` +
        `<circle cx="30" cy="-70" r="14" fill="#8bc34a" ${O2}/>` +
        `<path d="M-50 -66 L50 -66 L40 -4 L-40 -4 Z" fill="#c8955a" ${O}/>` +
        `<path d="M-46 -50 L46 -50 M-44 -34 L44 -34 M-42 -18 L42 -18" stroke="rgba(0,0,0,.2)" stroke-width="3"/>` +
        `<path d="M-30 -66 L-24 -4 M0 -66 L0 -4 M30 -66 L24 -4" stroke="rgba(0,0,0,.15)" stroke-width="3"/>`;
    },
    bathtub() {
      return shadow(130) +
        `<path d="M-110 -10 L-104 4 M110 -10 L104 4 M-90 -10 L-96 4 M90 -10 L96 4" stroke="#c9a227" stroke-width="7" stroke-linecap="round"/>` +
        `<path d="M-130 -110 L130 -110 L120 -40 Q110 -10 70 -10 L-70 -10 Q-110 -10 -120 -40 Z" fill="#ffffff" ${O}/>` +
        `<rect x="-136" y="-122" width="272" height="16" rx="8" fill="#f4f6f8" ${O}/>` +
        // пена
        [-90, -60, -30, 0, 30, 60, 90].map((x, i) => `<circle cx="${x}" cy="${-124 - (i % 2) * 6}" r="${14 + (i % 3) * 3}" fill="#e8f6ff" ${O2}/>`).join("") +
        `<path d="M110 -122 L110 -170 Q110 -180 98 -180 L84 -180" fill="none" stroke="#9aa7b0" stroke-width="9" stroke-linecap="round"/>` +
        `<circle cx="-40" cy="-160" r="7" fill="#e8f6ff" ${O2}/><circle cx="-20" cy="-176" r="5" fill="#e8f6ff" ${O2}/>` +
        // уточка
        `<path d="M40 -140 Q40 -156 56 -156 Q68 -156 66 -144 L74 -142 L66 -138 Q70 -128 56 -126 Q38 -126 40 -140 Z" fill="#ffd54a" ${O2}/><circle cx="58" cy="-148" r="2" fill="${INK}"/>`;
    },
    laundry() {
      return shadow(50) +
        `<path d="M-30 -110 C-40 -130 -10 -134 0 -118 C10 -136 40 -130 32 -110 Z" fill="#4fc3f7" ${O2}/>` +
        `<path d="M8 -112 L30 -140 L40 -132 L22 -108 Z" fill="#f48fb1" ${O2}/>` +
        `<path d="M-46 -110 L46 -110 L40 -4 L-40 -4 Z" fill="#d7b98e" ${O}/>` +
        [-90, -70, -50, -30].map((y) => `<path d="M-44 ${y} L44 ${y}" stroke="rgba(0,0,0,.18)" stroke-width="3"/>`).join("") +
        [-24, 0, 24].map((x) => `<path d="M${x} -108 L${x * 0.9} -6" stroke="rgba(0,0,0,.12)" stroke-width="3"/>`).join("") +
        `<rect x="-16" y="-96" width="32" height="10" rx="5" fill="#8d6e63"/>`;
    },
    bathShelf() {
      return `<rect x="-80" y="-10" width="160" height="12" rx="3" fill="#a1887f" ${O}/>` +
        `<path d="M-60 2 L-60 14 L-48 2 M60 2 L60 14 L48 2" fill="#8d6e63" ${O2}/>` +
        `<rect x="-66" y="-62" width="24" height="52" rx="6" fill="#4fc3f7" ${O2}/><rect x="-60" y="-72" width="12" height="10" fill="#fff" ${O2}/>` +
        `<rect x="-32" y="-48" width="22" height="38" rx="8" fill="#f48fb1" ${O2}/>` +
        `<path d="M2 -10 L2 -54 Q14 -64 26 -54 L26 -10 Z" fill="#81c784" ${O2}/>` +
        `<rect x="38" y="-40" width="30" height="30" rx="4" fill="#fff59d" ${O2}/><circle cx="53" cy="-25" r="6" fill="#fff"/>`;
    },
    sink() {
      return shadow(46) +
        // зеркало
        `<ellipse cx="0" cy="-206" rx="50" ry="62" fill="#d6eef8" ${O}/><path d="M-26 -236 Q-14 -254 4 -258" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` +
        `<path d="M-14 -4 L-10 -96 L10 -96 L14 -4 Z" fill="#fff" ${O}/>` +
        `<path d="M-60 -126 L60 -126 Q56 -96 0 -94 Q-56 -96 -60 -126 Z" fill="#fff" ${O}/>` +
        `<path d="M0 -126 L0 -144 L-16 -144" fill="none" stroke="#9aa7b0" stroke-width="7" stroke-linecap="round"/>` +
        `<rect x="22" y="-144" width="14" height="18" rx="3" fill="#ffb74d" ${O2}/>`;
    },
    towel() {
      return `<rect x="-60" y="-120" width="120" height="8" rx="4" fill="#9aa7b0" ${O2}/>` +
        `<path d="M-44 -116 L44 -116 L40 -10 L-40 -10 Z" fill="#ef9a9a" ${O}/>` +
        `<path d="M-42 -30 L42 -30 M-42 -22 L42 -22" stroke="#fff" stroke-width="4"/>` +
        `<path d="M-44 -116 Q0 -100 44 -116" fill="none" ${O2}/>`;
    },
    paperRolls() {
      const roll = (x, y) => `<rect x="${x - 18}" y="${y - 34}" width="36" height="34" rx="6" fill="#fff" ${O2}/><ellipse cx="${x}" cy="${y - 34}" rx="18" ry="6" fill="#fafafa" ${O2}/><ellipse cx="${x}" cy="${y - 34}" rx="6" ry="2.5" fill="#bdbdbd"/>`;
      return shadow(44) + roll(-20, -2) + roll(20, -2) + roll(0, -36);
    },
    bed() {
      return shadow(150) +
        `<rect x="-150" y="-176" width="300" height="118" rx="20" fill="#8d5a34" ${O}/>` +
        `<rect x="-136" y="-164" width="272" height="40" rx="14" fill="#a86b3c"/>` +
        `<rect x="-150" y="-24" width="16" height="24" fill="#6d4426" ${O2}/><rect x="134" y="-24" width="16" height="24" fill="#6d4426" ${O2}/>` +
        `<rect x="-150" y="-30" width="300" height="10" fill="rgba(0,0,0,.35)"/>` +
        `<rect x="-150" y="-80" width="300" height="52" rx="10" fill="#f4f1ec" ${O}/>` +
        `<ellipse cx="-80" cy="-96" rx="54" ry="22" fill="#ffffff" ${O}/><ellipse cx="80" cy="-96" rx="54" ry="22" fill="#ffffff" ${O}/>` +
        `<path d="M-150 -76 L150 -76 L150 -26 Q0 -14 -150 -26 Z" fill="#5c6bc0" ${O}/>` +
        `<path d="M-150 -76 L150 -76 L150 -62 L-150 -62 Z" fill="#7986cb" ${O2}/>` +
        `<path d="M-100 -50 L-60 -50 M-20 -46 L30 -46 M70 -50 L110 -50" stroke="#9fa8da" stroke-width="4" stroke-linecap="round"/>`;
    },
    dresser() {
      return shadow(86) +
        `<rect x="-80" y="-150" width="160" height="146" rx="6" fill="#b07a4f" ${O}/>` +
        [-140, -94, -48].map((y) => `<rect x="-70" y="${y}" width="140" height="38" rx="4" fill="#c58b5c" ${O2}/><circle cx="-26" cy="${y + 19}" r="4.5" fill="#f5c542" ${O2}/><circle cx="26" cy="${y + 19}" r="4.5" fill="#f5c542" ${O2}/>`).join("") +
        `<rect x="-70" y="-6" width="14" height="8" fill="#6d4426"/><rect x="56" y="-6" width="14" height="8" fill="#6d4426"/>` +
        // ваза
        `<path d="M30 -150 Q22 -170 32 -184 L48 -184 Q58 -170 50 -150 Z" fill="#4fc3f7" ${O2}/>` +
        `<path d="M40 -184 L34 -206 M40 -184 L46 -210 M40 -184 L40 -214" stroke="#43a047" stroke-width="3"/>` +
        `<circle cx="34" cy="-208" r="6" fill="#f48fb1"/><circle cx="46" cy="-212" r="6" fill="#ffd54a"/><circle cx="40" cy="-218" r="6" fill="#e57373"/>`;
    },
    curtain() {
      // окно со шторами висит на стене; (0,0) — подоконник
      return `<rect x="-80" y="-190" width="160" height="186" rx="6" fill="#bfe3f8" ${O}/>` +
        `<circle cx="40" cy="-150" r="20" fill="#fff3c4"/><path d="M-60 -60 Q-40 -76 -20 -60 Q0 -74 20 -60" fill="none" stroke="#fff" stroke-width="7" opacity=".7"/>` +
        `<path d="M0 -190 L0 -4 M-80 -96 L80 -96" stroke="#fff" stroke-width="8"/>` +
        `<rect x="-90" y="-4" width="180" height="12" rx="3" fill="#efe3d1" ${O}/>` +
        `<rect x="-104" y="-206" width="208" height="8" rx="4" fill="#8d6e63"/>` +
        `<path d="M-100 -200 L-46 -200 C-56 -140 -40 -80 -60 2 L-100 2 Z" fill="#7e57c2" ${O}/>` +
        `<path d="M100 -200 L46 -200 C56 -140 40 -80 60 2 L100 2 Z" fill="#7e57c2" ${O}/>` +
        `<path d="M-86 -190 C-90 -130 -82 -70 -90 -6 M-70 -194 C-74 -130 -64 -70 -76 -6 M86 -190 C90 -130 82 -70 90 -6 M70 -194 C74 -130 64 -70 76 -6" fill="none" stroke="rgba(0,0,0,.15)" stroke-width="3"/>`;
    },
    teddy() {
      return shadow(40) +
        `<circle cx="-22" cy="-14" r="14" fill="#a1683a" ${O}/><circle cx="22" cy="-14" r="14" fill="#a1683a" ${O}/>` +
        `<ellipse cx="0" cy="-44" rx="32" ry="34" fill="#b77a45" ${O}/><ellipse cx="0" cy="-40" rx="18" ry="20" fill="#e2b98a"/>` +
        `<circle cx="-32" cy="-50" r="12" fill="#a1683a" ${O}/><circle cx="32" cy="-50" r="12" fill="#a1683a" ${O}/>` +
        `<circle cx="-22" cy="-112" r="12" fill="#a1683a" ${O}/><circle cx="22" cy="-112" r="12" fill="#a1683a" ${O}/>` +
        `<circle cx="0" cy="-92" r="28" fill="#b77a45" ${O}/>` +
        `<ellipse cx="0" cy="-82" rx="13" ry="10" fill="#e2b98a"/><ellipse cx="0" cy="-86" rx="5" ry="4" fill="${INK}"/>` +
        `<circle cx="-10" cy="-98" r="3.5" fill="${INK}"/><circle cx="10" cy="-98" r="3.5" fill="${INK}"/>` +
        `<path d="M-14 -66 L0 -60 L14 -66 L14 -56 L0 -62 L-14 -56 Z" fill="#e53935" ${O2}/>`;
    },
    bookshelf() {
      const colors = ["#e57373", "#64b5f6", "#ffd54a", "#81c784", "#ba68c8", "#ff8a65", "#4db6ac"];
      let books = "";
      [-210, -152, -94].forEach((y, r) => {
        let x = -52;
        for (let i = 0; i < 6; i++) {
          const w = 12 + ((i + r) % 3) * 3, h = 40 + ((i * 7 + r) % 3) * 6;
          books += `<rect x="${x}" y="${y + 50 - h}" width="${w}" height="${h}" rx="2" fill="${colors[(i + r * 2) % colors.length]}" ${O2}/>`;
          x += w + 2;
        }
      });
      return shadow(66) +
        `<rect x="-62" y="-226" width="124" height="222" rx="4" fill="#9c6b43" ${O}/>` +
        `<rect x="-54" y="-218" width="108" height="206" fill="#7a4f2e"/>` + books +
        [-160, -102, -44].map((y) => `<rect x="-62" y="${y}" width="124" height="8" fill="#9c6b43" ${O2}/>`).join("") +
        `<circle cx="-28" cy="-24" r="14" fill="#4fc3f7" ${O2}/><rect x="6" y="-40" width="40" height="28" rx="3" fill="#fff" ${O2}/>`;
    },
    nightstand() {
      return shadow(50) +
        `<rect x="-46" y="-90" width="92" height="86" rx="6" fill="#c58b5c" ${O}/>` +
        `<rect x="-38" y="-80" width="76" height="30" rx="4" fill="#d79c6c" ${O2}/><circle cx="0" cy="-65" r="4" fill="#f5c542" ${O2}/>` +
        `<rect x="-38" y="-44" width="76" height="32" rx="4" fill="#d79c6c" ${O2}/><circle cx="0" cy="-28" r="4" fill="#f5c542" ${O2}/>` +
        // лампа
        `<path d="M0 -90 L0 -124" stroke="${INK}" stroke-width="4"/><ellipse cx="0" cy="-92" rx="16" ry="5" fill="#8d6e63"/>` +
        `<path d="M-26 -124 L26 -124 L16 -158 L-16 -158 Z" fill="#ffe082" ${O}/>`;
    },
    slippers() {
      const s = (x, c) => `<path d="M${x - 16} 0 C${x - 20} -18 ${x - 14} -44 ${x} -44 C${x + 14} -44 ${x + 20} -18 ${x + 16} 0 Z" fill="${c}" ${O2}/><path d="M${x - 16} -14 Q${x} -26 ${x + 16} -14" fill="none" stroke="#fff" stroke-width="6" opacity=".8"/>`;
      return shadow(42) + s(-20, "#f48fb1") + s(20, "#f48fb1");
    },
    shoeRack() {
      const shoe = (x, y, c) => `<path d="M${x - 22} ${y} L${x - 22} ${y - 14} Q${x - 14} ${y - 20} ${x - 2} ${y - 12} Q${x + 16} ${y - 10} ${x + 22} ${y} Z" fill="${c}" ${O2}/>`;
      return shadow(76) +
        `<rect x="-74" y="-100" width="148" height="96" rx="4" fill="#b07a4f" ${O}/>` +
        `<rect x="-66" y="-92" width="132" height="80" fill="#8a5a36"/>` +
        `<path d="M-74 -52 L74 -52" ${O}/>` +
        shoe(-34, -56, "#e53935") + shoe(14, -56, "#e53935") + shoe(-34, -14, "#1e4fb4") + shoe(16, -14, "#fff") +
        shoe(46, -56, "#43a047");
    },
    coatRack() {
      return shadow(46) +
        `<rect x="-5" y="-280" width="10" height="270" fill="#8d5a34" ${O2}/>` +
        `<path d="M-40 -2 L0 -18 L40 -2" fill="none" stroke="#6d4426" stroke-width="10" stroke-linecap="round"/>` +
        `<path d="M-24 -268 Q-34 -262 -30 -252 M24 -268 Q34 -262 30 -252" fill="none" stroke="#6d4426" stroke-width="6" stroke-linecap="round"/>` +
        `<path d="M-6 -258 C-46 -254 -60 -230 -58 -150 L-20 -146 C-22 -200 -14 -232 -6 -246 Z" fill="#26a69a" ${O}/>` +
        `<path d="M6 -258 C46 -254 64 -224 60 -120 L22 -116 C22 -186 16 -232 6 -246 Z" fill="#ef6c00" ${O}/>` +
        `<path d="M40 -200 L44 -170" stroke="${INK}" stroke-width="3"/>` +
        `<ellipse cx="0" cy="-282" rx="34" ry="8" fill="#455a64" ${O2}/><path d="M-20 -284 C-20 -306 20 -306 20 -284 Z" fill="#546e7a" ${O2}/>`;
    },
    umbrellaStand() {
      return shadow(34) +
        `<path d="M-12 -70 L-20 -130 Q-34 -136 -30 -124 M10 -70 L18 -150 Q30 -160 34 -148" fill="none" stroke="#5d4037" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M-14 -70 L-26 -112 L-8 -116 Z" fill="#e53935" ${O2}/><path d="M8 -70 L12 -128 L28 -122 Z" fill="#1e4fb4" ${O2}/>` +
        `<rect x="-26" y="-74" width="52" height="70" rx="6" fill="#455a64" ${O}/>` +
        `<path d="M-26 -50 L26 -50" stroke="#90a4ae" stroke-width="4"/>`;
    },
    box() {
      return shadow(58) +
        `<rect x="-54" y="-76" width="108" height="72" rx="3" fill="#c8955a" ${O}/>` +
        `<path d="M-54 -76 L-70 -96 L-14 -96 L0 -76 Z M54 -76 L70 -98 L14 -98 L0 -76 Z" fill="#d8a76b" ${O}/>` +
        `<rect x="-10" y="-76" width="20" height="72" fill="#e7c48d" opacity=".9"/>` +
        `<path d="M-40 -40 L-20 -40 M-40 -30 L-26 -30" stroke="#8d5a34" stroke-width="3"/>`;
    },
    broom() {
      return shadow(46) +
        `<path d="M-30 -240 L6 -60" stroke="#c58b5c" stroke-width="9" stroke-linecap="round"/>` +
        `<path d="M-10 -62 L22 -70 L44 -4 L-14 4 Z" fill="#e2b45a" ${O}/>` +
        `<path d="M0 -56 L-2 0 M12 -60 L14 0 M24 -62 L30 -2" stroke="#b8862f" stroke-width="3"/>` +
        `<rect x="-12" y="-74" width="34" height="14" rx="4" fill="#e53935" ${O2} transform="rotate(-14 5 -67)"/>` +
        `<path d="M-24 -4 L-64 -4 L-70 -30 L-28 -30 Z" fill="#43a047" ${O2}/>`;
    },
    bench() {
      return shadow(80) +
        `<rect x="-80" y="-62" width="160" height="22" rx="8" fill="#b07a4f" ${O}/>` +
        `<rect x="-76" y="-82" width="152" height="24" rx="10" fill="#ef9a9a" ${O}/>` +
        `<path d="M-66 -40 L-66 -2 M66 -40 L66 -2" stroke="#6d4426" stroke-width="10" stroke-linecap="round"/>`;
    },
    hatBasket() {
      return shadow(48) +
        `<path d="M-34 -64 C-34 -100 34 -100 34 -64 Z" fill="#1e88e5" ${O2}/><circle cx="0" cy="-102" r="9" fill="#fff" ${O2}/>` +
        `<path d="M10 -66 L40 -90 L46 -82 L22 -60 Z" fill="#e53935" ${O2}/>` +
        `<path d="M-46 -66 L46 -66 L38 -4 L-38 -4 Z" fill="#d7b98e" ${O}/>` +
        `<path d="M-44 -46 L44 -46 M-42 -26 L42 -26" stroke="rgba(0,0,0,.18)" stroke-width="3"/>`;
    },
    rug() {
      return `<ellipse cx="0" cy="-10" rx="130" ry="26" fill="#c0504d" ${O}/>` +
        `<ellipse cx="0" cy="-10" rx="100" ry="18" fill="none" stroke="#f5c542" stroke-width="5"/>` +
        `<ellipse cx="0" cy="-10" rx="56" ry="9" fill="#f5c542" opacity=".7"/>`;
    },
    sofa() {
      return shadow(150) +
        `<rect x="-150" y="-150" width="300" height="80" rx="26" fill="#5c8a6e" ${O}/>` +
        `<rect x="-130" y="-92" width="128" height="40" rx="14" fill="#6fa585" ${O}/><rect x="2" y="-92" width="128" height="40" rx="14" fill="#6fa585" ${O}/>` +
        `<rect x="-166" y="-110" width="40" height="92" rx="18" fill="#4e7a60" ${O}/><rect x="126" y="-110" width="40" height="92" rx="18" fill="#4e7a60" ${O}/>` +
        `<rect x="-146" y="-58" width="292" height="42" rx="10" fill="#4e7a60" ${O}/>` +
        `<rect x="-104" y="-134" width="58" height="44" rx="14" fill="#ffd54a" ${O2} transform="rotate(-10 -75 -112)"/>` +
        `<rect x="54" y="-132" width="54" height="42" rx="14" fill="#e57373" ${O2} transform="rotate(8 81 -111)"/>` +
        `<path d="M-140 -16 L-140 0 M140 -16 L140 0" stroke="#3b2a20" stroke-width="8" stroke-linecap="round"/>`;
    },
    coffeeTable() {
      return shadow(80) +
        `<path d="M-64 -40 L-70 -2 M64 -40 L70 -2" stroke="#6d4426" stroke-width="8" stroke-linecap="round"/>` +
        `<rect x="-84" y="-52" width="168" height="16" rx="6" fill="#a86b3c" ${O}/>` +
        `<rect x="-50" y="-66" width="50" height="14" rx="2" fill="#64b5f6" ${O2}/><rect x="-44" y="-76" width="40" height="10" rx="2" fill="#ffd54a" ${O2}/>` +
        `<path d="M24 -52 L26 -74 L46 -74 L48 -52 Z" fill="#fff" ${O2}/><path d="M48 -70 Q58 -66 48 -58" fill="none" ${O2}/>`;
    },
    cat() {
      return shadow(46) +
        `<path d="M30 -10 C70 -10 74 -60 52 -64" fill="none" stroke="#e08a3c" stroke-width="12" stroke-linecap="round"/>` +
        `<ellipse cx="0" cy="-40" rx="40" ry="40" fill="#f0a04b" ${O}/>` +
        `<path d="M-24 -6 L-24 -26 M24 -6 L24 -26" stroke="#e08a3c" stroke-width="12" stroke-linecap="round"/>` +
        `<path d="M-30 -96 L-36 -132 L-10 -110 Z M30 -96 L36 -132 L10 -110 Z" fill="#f0a04b" ${O}/>` +
        `<circle cx="0" cy="-98" r="32" fill="#f0a04b" ${O}/>` +
        `<path d="M-18 -120 L-12 -110 M0 -126 L0 -116 M18 -120 L12 -110" stroke="#d07a2c" stroke-width="4" stroke-linecap="round"/>` +
        `<ellipse cx="-12" cy="-100" rx="5" ry="7" fill="#3e7d3a"/><ellipse cx="12" cy="-100" rx="5" ry="7" fill="#3e7d3a"/>` +
        `<ellipse cx="-12" cy="-100" rx="1.8" ry="5" fill="#111"/><ellipse cx="12" cy="-100" rx="1.8" ry="5" fill="#111"/>` +
        `<path d="M-4 -88 L4 -88 L0 -84 Z" fill="#e57373"/><path d="M0 -84 Q-6 -78 -10 -82 M0 -84 Q6 -78 10 -82" fill="none" ${O2}/>` +
        `<path d="M-14 -86 L-38 -90 M-14 -82 L-36 -78 M14 -86 L38 -90 M14 -82 L36 -78" stroke="${INK}" stroke-width="1.5"/>`;
    },
    tv() {
      return shadow(100) +
        `<rect x="-100" y="-76" width="200" height="72" rx="6" fill="#8d5a34" ${O}/>` +
        `<rect x="-90" y="-66" width="86" height="52" rx="4" fill="#a86b3c" ${O2}/><rect x="4" y="-66" width="86" height="52" rx="4" fill="#a86b3c" ${O2}/>` +
        `<circle cx="-14" cy="-40" r="3.5" fill="${INK}"/><circle cx="14" cy="-40" r="3.5" fill="${INK}"/>` +
        `<rect x="-14" y="-92" width="28" height="16" fill="#333"/>` +
        `<rect x="-96" y="-212" width="192" height="122" rx="10" fill="#222" ${O}/>` +
        `<rect x="-84" y="-200" width="168" height="98" rx="4" fill="#4fa3d1"/>` +
        `<path d="M-84 -130 Q-40 -160 0 -132 Q40 -104 84 -138 L84 -102 L-84 -102 Z" fill="#81c784"/><circle cx="50" cy="-172" r="12" fill="#fff3c4"/>`;
    },
    floorLamp() {
      return shadow(34) +
        `<ellipse cx="0" cy="-6" rx="30" ry="8" fill="#555" ${O2}/>` +
        `<rect x="-4" y="-240" width="8" height="234" fill="#777" ${O2}/>` +
        `<path d="M-44 -230 L44 -230 L28 -290 L-28 -290 Z" fill="#ffe082" ${O}/>`;
    },
    piano() {
      let keys = "";
      for (let i = 0; i < 12; i++) keys += `<rect x="${-78 + i * 13}" y="-104" width="13" height="26" fill="#fff" ${O2}/>`;
      for (const i of [0, 1, 3, 4, 5, 7, 8, 10]) keys += `<rect x="${-69 + i * 13}" y="-104" width="8" height="15" fill="#222"/>`;
      return shadow(90) +
        `<rect x="-86" y="-220" width="172" height="216" rx="8" fill="#3b2a20" ${O}/>` +
        `<rect x="-76" y="-208" width="152" height="90" rx="4" fill="#4e382a"/>` +
        `<rect x="-90" y="-112" width="180" height="16" rx="3" fill="#2b1e16"/>` + keys +
        `<rect x="-76" y="-60" width="152" height="40" rx="4" fill="#4e382a"/>` +
        `<rect x="-40" y="-238" width="34" height="20" rx="2" fill="#fff" ${O2}/><path d="M-34 -230 L-12 -230 M-34 -224 L-16 -224" stroke="#999" stroke-width="2"/>` +
        `<path d="M30 -220 L30 -250 Q30 -262 42 -258 L40 -234" fill="none" stroke="#f5c542" stroke-width="4"/>`;
    },
    plant() {
      return shadow(46) +
        `<path d="M0 -90 C-10 -150 -60 -170 -80 -150 C-70 -120 -30 -100 0 -90 Z" fill="#43a047" ${O}/>` +
        `<path d="M0 -90 C10 -160 60 -190 82 -170 C76 -130 34 -104 0 -90 Z" fill="#4caf50" ${O}/>` +
        `<path d="M0 -90 C-6 -170 10 -220 26 -224 C40 -190 22 -130 0 -90 Z" fill="#388e3c" ${O}/>` +
        `<path d="M0 -90 C-30 -110 -70 -96 -76 -80 C-50 -70 -20 -78 0 -90 Z" fill="#66bb6a" ${O}/>` +
        `<path d="M-40 -96 L40 -96 L30 -4 L-30 -4 Z" fill="#d1714b" ${O}/><rect x="-46" y="-104" width="92" height="16" rx="4" fill="#e08560" ${O}/>`;
    },
    toyPile() {
      return shadow(70) +
        `<rect x="-62" y="-44" width="40" height="40" rx="4" fill="#e53935" ${O}/><path d="M-52 -34 L-32 -14 M-32 -34 L-52 -14" stroke="#fff" stroke-width="5"/>` +
        `<rect x="-24" y="-40" width="36" height="36" rx="4" fill="#fdd835" ${O}/><circle cx="-6" cy="-22" r="8" fill="#fff"/>` +
        `<rect x="-46" y="-80" width="36" height="36" rx="4" fill="#1e88e5" ${O}/><path d="M-28 -72 L-28 -52 M-38 -62 L-18 -62" stroke="#fff" stroke-width="5"/>` +
        `<circle cx="42" cy="-30" r="26" fill="#ab47bc" ${O}/><path d="M18 -36 Q42 -46 66 -36 M18 -24 Q42 -14 66 -24" fill="none" stroke="#fff" stroke-width="4"/>` +
        `<path d="M8 -86 L52 -86 L60 -72 L4 -72 Z" fill="#43a047" ${O2}/><circle cx="16" cy="-70" r="7" fill="#333"/><circle cx="48" cy="-70" r="7" fill="#333"/>`;
    },
    tent() {
      return shadow(90) +
        `<path d="M-90 -4 L0 -190 L90 -4 Z" fill="#ffb74d" ${O}/>` +
        `<path d="M-60 -4 L0 -130 L60 -4 Z" fill="#ff9800" opacity=".45"/>` +
        `<path d="M0 -190 L-30 -4 L0 -40 L30 -4 Z" fill="#5d4037" ${O2}/>` +
        `<path d="M-10 -170 L0 -216 L10 -170" fill="none" stroke="#8d5a34" stroke-width="5"/>` +
        `<path d="M0 -214 L26 -206 L0 -198 Z" fill="#e53935" ${O2}/>` +
        `<path d="M-74 -40 L74 -40" stroke="#e53935" stroke-width="6" stroke-dasharray="14 10"/>`;
    },
    backpack() {
      return shadow(44) +
        `<path d="M-30 -116 C-30 -140 30 -140 30 -116" fill="none" stroke="#1565c0" stroke-width="8"/>` +
        `<rect x="-44" y="-120" width="88" height="116" rx="26" fill="#1e88e5" ${O}/>` +
        `<rect x="-30" y="-60" width="60" height="44" rx="10" fill="#42a5f5" ${O}/>` +
        `<path d="M-44 -86 Q0 -70 44 -86" fill="none" ${O}/><circle cx="0" cy="-78" r="5" fill="#ffd54a" ${O2}/>` +
        `<polygon points="${starPts(0, -38, 10, 4.5)}" fill="#ffd54a" ${O2}/>`;
    },
    toyChest() {
      return shadow(76) +
        `<path d="M-70 -84 L-62 -132 L62 -132 L70 -84 Z" fill="#26a69a" ${O}/>` +
        `<circle cx="-30" cy="-96" r="16" fill="#e53935" ${O2}/><rect x="8" y="-112" width="28" height="28" rx="4" fill="#fdd835" ${O2}/>` +
        `<path d="M40 -84 L50 -140" stroke="#ab47bc" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="-146" r="9" fill="#ab47bc" ${O2}/>` +
        `<rect x="-72" y="-88" width="144" height="84" rx="8" fill="#ef5350" ${O}/>` +
        `<rect x="-72" y="-88" width="144" height="16" fill="#e53935" ${O2}/>` +
        `<polygon points="${starPts(-36, -42, 14, 6)}" fill="#ffd54a" ${O2}/><polygon points="${starPts(36, -40, 12, 5)}" fill="#fff" ${O2}/>`;
    },
    slide() {
      return shadow(90) +
        `<path d="M-70 -4 L-70 -160 M-30 -4 L-30 -160" stroke="#1e88e5" stroke-width="9" stroke-linecap="round"/>` +
        [-40, -80, -120].map((y) => `<path d="M-70 ${y} L-30 ${y}" stroke="#1e88e5" stroke-width="6"/>`).join("") +
        `<rect x="-80" y="-172" width="60" height="14" rx="5" fill="#fdd835" ${O}/>` +
        `<path d="M-24 -170 C10 -150 40 -40 96 -10 L96 4 L72 4 C30 -20 0 -110 -26 -146 Z" fill="#ef5350" ${O}/>` +
        `<path d="M-16 -160 C14 -136 44 -40 90 -14" fill="none" stroke="#fff" stroke-width="4" opacity=".6"/>`;
    },
    desk() {
      return shadow(70) +
        `<path d="M-56 -86 L-56 -2 M56 -86 L56 -2" stroke="#8d5a34" stroke-width="9" stroke-linecap="round"/>` +
        `<rect x="-70" y="-98" width="140" height="16" rx="5" fill="#ffcc80" ${O}/>` +
        `<rect x="-50" y="-106" width="56" height="8" fill="#fff" ${O2} transform="rotate(-4 -22 -102)"/>` +
        `<path d="M20 -98 L24 -128 L48 -128 L52 -98 Z" fill="#4fc3f7" ${O2}/>` +
        `<path d="M28 -128 L26 -152 M36 -128 L38 -158 M44 -128 L48 -150" stroke-width="6" stroke-linecap="round" stroke="#e53935"/>` +
        `<path d="M36 -128 L38 -158" stroke="#43a047" stroke-width="6" stroke-linecap="round"/><path d="M44 -128 L48 -150" stroke="#fdd835" stroke-width="6" stroke-linecap="round"/>`;
    },
    ball() {
      return shadow(34) +
        `<circle cx="0" cy="-34" r="32" fill="#fff" ${O}/>` +
        `<path d="M-32 -34 Q0 -50 32 -34 Q0 -18 -32 -34 Z" fill="#e53935"/>` +
        `<path d="M0 -66 Q-14 -34 0 -2" fill="none" stroke="#1e88e5" stroke-width="7"/>` +
        `<circle cx="0" cy="-34" r="32" fill="none" ${O}/>`;
    },
    giftBox() {
      return shadow(46) +
        `<rect x="-42" y="-70" width="84" height="66" rx="4" fill="#ab47bc" ${O}/>` +
        `<rect x="-48" y="-86" width="96" height="20" rx="4" fill="#ba68c8" ${O}/>` +
        `<rect x="-8" y="-86" width="16" height="82" fill="#ffd54a"/>` +
        `<path d="M0 -86 C-30 -110 -36 -86 0 -86 C36 -86 30 -110 0 -86 Z" fill="#ffd54a" ${O2}/>`;
    },
    oldBox() {
      return shadow(52) +
        `<rect x="-50" y="-70" width="100" height="66" rx="3" fill="#8d6e63" ${O}/>` +
        `<path d="M-50 -48 L50 -48 M-50 -26 L50 -26" stroke="#6d4c41" stroke-width="3"/>` +
        `<rect x="-14" y="-60" width="28" height="12" rx="2" fill="#bcaaa4" ${O2}/>`;
    },
  };

  /* ===================== КОМНАТЫ =====================
     Каждая комната: стена, пол, украшения и 8 мест, где можно искать
     (по порядку: самые важные первыми). [предмет, x, y, масштаб, где] */
  const ROOMS = {
    hall: {
      name: "Прихожая", wall: "#eadbc6", floor: "#b98a5e", floorType: "wood",
      decor: (r) => r.door(60) + r.mirror(620, 150) + r.lamp(400) + r.picture(330, 120, "#4fc3f7"),
      items: [
        ["shoeRack", 220, 410, 1, "в обувницу"],
        ["coatRack", 430, 380, 1, "на вешалку"],
        ["umbrellaStand", 548, 405, 1, "в подставку для зонтов"],
        ["box", 660, 420, 1, "в коробку"],
        ["broom", 752, 400, .9, "за веник"],
        ["bench", 330, 432, 1, "под банкетку"],
        ["hatBasket", 610, 436, .9, "в корзину с шапками"],
        ["rug", 470, 432, 1, "под коврик"],
      ],
    },
    bed: {
      name: "Спальня", wall: "#d9d3f0", floor: "#9b8fc4", floorType: "carpet", stripes: "#cfc7ec",
      decor: (r) => r.lamp(420) + r.picture(330, 90, "#f48fb1"),
      items: [
        ["bed", 330, 410, 1, "под кровать"],
        ["dresser", 610, 392, 1, "в комод"],
        ["curtain", 110, 270, .85, "за штору"],
        ["teddy", 500, 432, .9, "под мишку"],
        ["bookshelf", 740, 398, 1, "за книги"],
        ["nightstand", 130, 410, 1, "в тумбочку"],
        ["slippers", 210, 440, 1, "в тапочки"],
        ["rug", 420, 432, 1, "под ковёр"],
      ],
    },
    kitchen: {
      name: "Кухня", wall: "#d6eee0", floor: "#f2efe7", floorType: "checker", tiles: true,
      decor: (r) => r.window(560, 70) + r.table(650, 420) + r.lamp(380) + r.clock(475, 60),
      items: [
        ["fridge", 90, 412, 1, "в холодильник"],
        ["stove", 236, 412, 1, "в кастрюлю"],
        ["trash", 490, 428, 1, "в мусорное ведро"],
        ["chair", 560, 432, 1, "под стул"],
        ["breadbox", 680, 312, 1, "в хлебницу"],
        ["sinkCabinet", 376, 412, 1, "под раковину"],
        ["wallCabinet", 300, 200, 1, "в шкафчик"],
        ["vegBasket", 750, 438, .9, "в корзину с овощами"],
      ],
    },
    bath: {
      name: "Ванная", wall: "#cfe7f6", floor: "#e7f1f6", floorType: "tiles", tiles: true,
      decor: (r) => r.lamp(400),
      items: [
        ["bathtub", 200, 412, 1, "в ванну"],
        ["laundry", 420, 428, 1, "в корзину для белья"],
        ["bathShelf", 430, 200, 1, "на полку"],
        ["washer", 560, 412, 1, "в стиральную машину"],
        ["sink", 720, 412, 1, "под раковину"],
        ["towel", 70, 250, 1, "за полотенце"],
        ["paperRolls", 340, 438, .9, "за рулоны"],
        ["rug", 470, 432, .8, "под коврик"],
      ],
    },
    living: {
      name: "Гостиная", wall: "#f4dbc9", floor: "#c8946a", floorType: "wood",
      decor: (r) => r.window(250, 60) + r.picture(420, 110, "#81c784") + r.lamp(560),
      items: [
        ["sofa", 445, 412, .9, "под диван"],
        ["tv", 668, 414, .95, "за телевизор"],
        ["plant", 232, 424, .95, "в горшок с цветком"],
        ["cat", 590, 442, .85, "под кота"],
        ["piano", 100, 410, 1, "в пианино"],
        ["floorLamp", 758, 408, .85, "за торшер"],
        ["coffeeTable", 450, 440, 1, "под журнальный столик"],
        ["rug", 300, 432, 1, "под ковёр"],
      ],
    },
    kids: {
      name: "Детская", wall: "#fbe2ee", floor: "#a8d5ba", floorType: "carpet", stripes: "#f8d3e4",
      decor: (r) => r.window(330, 60) + r.garland() + r.lamp(560),
      items: [
        ["toyPile", 110, 432, 1, "в кучу игрушек"],
        ["tent", 250, 418, 1, "в домик-палатку"],
        ["backpack", 380, 432, 1, "в рюкзак"],
        ["toyChest", 500, 420, 1, "в ящик с игрушками"],
        ["slide", 612, 418, .9, "под горку"],
        ["desk", 728, 412, .9, "на стол с карандашами"],
        ["ball", 440, 446, .9, "за мяч"],
        ["rug", 330, 432, 1, "под коврик"],
      ],
    },
  };

  const decorKit = {
    lamp: (x) => `<path d="M${x} 0 L${x} 34" stroke="${INK}" stroke-width="3"/><path d="M${x - 34} 64 L${x + 34} 64 L${x + 18} 32 L${x - 18} 32 Z" fill="#ffe082" ${O}/><ellipse cx="${x}" cy="66" rx="10" ry="5" fill="#fff8c4"/>`,
    picture: (x, y, c) => `<rect x="${x - 46}" y="${y - 34}" width="92" height="68" rx="3" fill="#fff" stroke="#8d6e63" stroke-width="7"/>` +
      `<path d="M${x - 40} ${y + 28} L${x - 12} ${y - 6} L${x + 6} ${y + 14} L${x + 20} ${y} L${x + 40} ${y + 28} Z" fill="${c}"/><circle cx="${x + 24}" cy="${y - 14}" r="8" fill="#ffd54a"/>`,
    mirror: (x, y) => `<ellipse cx="${x}" cy="${y}" rx="50" ry="70" fill="#d6eef8" stroke="#c9a227" stroke-width="8"/><path d="M${x - 26} ${y - 30} Q${x - 12} ${y - 54} ${x + 6} ${y - 58}" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`,
    door: (x) => `<rect x="${x - 50}" y="96" width="100" height="204" rx="4" fill="#8d5a34" ${O}/><rect x="${x - 38}" y="110" width="76" height="80" rx="4" fill="#a86b3c" ${O2}/><rect x="${x - 38}" y="200" width="76" height="86" rx="4" fill="#a86b3c" ${O2}/><circle cx="${x + 34}" cy="200" r="6" fill="#f5c542" ${O2}/>`,
    window: (x, y) => `<rect x="${x - 80}" y="${y}" width="160" height="140" rx="6" fill="#bfe3f8" ${O}/><circle cx="${x + 40}" cy="${y + 36}" r="18" fill="#fff3c4"/>` +
      `<path d="M${x - 60} ${y + 100} Q${x - 40} ${y + 86} ${x - 20} ${y + 100} Q${x} ${y + 88} ${x + 20} ${y + 100}" fill="none" stroke="#fff" stroke-width="7" opacity=".7"/>` +
      `<path d="M${x} ${y} L${x} ${y + 140} M${x - 80} ${y + 70} L${x + 80} ${y + 70}" stroke="#fff" stroke-width="8"/><rect x="${x - 90}" y="${y + 138}" width="180" height="12" rx="3" fill="#efe3d1" ${O}/>`,
    table: (x, y) => `${shadow(90).replace('cx="0" cy="0"', `cx="${x}" cy="${y}"`)}<path d="M${x - 70} ${y - 100} L${x - 74} ${y - 2} M${x + 70} ${y - 100} L${x + 74} ${y - 2}" stroke="#8d5a34" stroke-width="9" stroke-linecap="round"/>` +
      `<rect x="${x - 92}" y="${y - 112}" width="184" height="16" rx="5" fill="#c07a45" ${O}/>`,
    clock: (x, y) => `<circle cx="${x}" cy="${y}" r="26" fill="#fff" ${O}/><path d="M${x} ${y} L${x} ${y - 16} M${x} ${y} L${x + 12} ${y + 4}" ${O}/>`,
    garland: () => {
      let s = `<path d="M20 30 Q400 90 780 30" fill="none" stroke="${INK}" stroke-width="2"/>`;
      const cs = ["#e53935", "#fdd835", "#43a047", "#1e88e5", "#ab47bc"];
      for (let i = 0; i < 14; i++) {
        const t = (i + 0.5) / 14, x = 20 + t * 760, y = 30 + Math.sin(t * Math.PI) * 30;
        s += `<path d="M${x - 14} ${y} L${x + 14} ${y} L${x} ${y + 26} Z" fill="${cs[i % cs.length]}" ${O2}/>`;
      }
      return s;
    },
  };

  function roomBackground(room) {
    let s = `<rect x="0" y="0" width="800" height="304" fill="${room.wall}"/>`;
    if (room.stripes) for (let x = 0; x < 800; x += 56) s += `<rect x="${x}" y="0" width="24" height="304" fill="${room.stripes}"/>`;
    if (room.tiles) {
      for (let y = 150; y < 300; y += 30) s += `<path d="M0 ${y} L800 ${y}" stroke="rgba(255,255,255,.7)" stroke-width="3"/>`;
      for (let x = 0; x < 800; x += 40) s += `<path d="M${x} 150 L${x} 300" stroke="rgba(255,255,255,.7)" stroke-width="3"/>`;
    }
    s += `<rect x="0" y="296" width="800" height="154" fill="${room.floor}"/>`;
    if (room.floorType === "wood") for (let y = 318; y < 450; y += 26) s += `<path d="M0 ${y} L800 ${y}" stroke="rgba(0,0,0,.12)" stroke-width="3"/>` +
      Array.from({ length: 6 }, (_, i) => `<path d="M${((i * 140 + y * 3) % 800)} ${y - 26} L${((i * 140 + y * 3) % 800)} ${y}" stroke="rgba(0,0,0,.1)" stroke-width="3"/>`).join("");
    if (room.floorType === "checker") for (let y = 300; y < 450; y += 30) for (let x = 0; x < 800; x += 30) if (((x + y) / 30) % 2 === 0) s += `<rect x="${x}" y="${y}" width="30" height="30" fill="#d9d3c4"/>`;
    if (room.floorType === "tiles") { for (let y = 300; y < 450; y += 36) s += `<path d="M0 ${y} L800 ${y}" stroke="#c6d8e2" stroke-width="3"/>`; for (let x = 0; x < 800; x += 50) s += `<path d="M${x} 300 L${x} 450" stroke="#c6d8e2" stroke-width="3"/>`; }
    if (room.floorType === "carpet") s += `<rect x="0" y="296" width="800" height="154" fill="url(#none)" opacity="0"/>` +
      Array.from({ length: 50 }, (_, i) => `<circle cx="${(i * 97) % 800}" cy="${310 + ((i * 53) % 130)}" r="2" fill="rgba(255,255,255,.25)"/>`).join("");
    s += `<rect x="0" y="292" width="800" height="12" fill="rgba(0,0,0,.14)"/>`;
    return s;
  }

  // count — сколько мест для поиска нарисовать; opts.thumb — маленькая картинка без кнопок
  function room(type, count = 8, opts = {}) {
    const r = ROOMS[type];
    const list = r.items.slice(0, Math.max(1, Math.min(count, r.items.length)))
      .map((it, i) => ({ k: it[0], x: it[1], y: it[2], s: it[3], where: it[4], i }));
    const drawOrder = list.slice().sort((a, b) => {
      const wa = a.k === "rug" ? -1 : 0, wb = b.k === "rug" ? -1 : 0;   // ковёр всегда снизу
      return wa - wb || a.y - b.y;
    });
    let s = `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="room-svg" preserveAspectRatio="xMidYMid slice">`;
    s += roomBackground(r) + r.decor(decorKit);
    for (const it of drawOrder) {
      s += `<g class="${opts.thumb ? "" : "spot"}" data-i="${it.i}" transform="translate(${it.x} ${it.y}) scale(${it.s})">` +
        `<g class="inner">${ITEMS[it.k]()}</g></g>`;
    }
    s += "</svg>";
    return { svg: s, spots: list };
  }

  /* ===================== ЗНАЧКИ ===================== */
  const icons = {
    star: (size = 22, on = true) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" style="vertical-align:-4px"><polygon points="${starPts(12, 12.5, 11, 4.8)}" fill="${on ? "#ffc83d" : "#e3dccf"}" stroke="${on ? "#c98d00" : "#bdb3a3"}" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    stars: (n, of = 3, size = 20) => Array.from({ length: of }, (_, i) => icons.star(size, i < n)).join(""),
    lock: (size = 22) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" style="vertical-align:-4px"><path d="M7 11 V8 a5 5 0 0 1 10 0 V11" fill="none" stroke="#6b5e51" stroke-width="2.5"/><rect x="4.5" y="10.5" width="15" height="11" rx="2.5" fill="#bfb3a3" stroke="#6b5e51" stroke-width="2"/><circle cx="12" cy="16" r="1.8" fill="#6b5e51"/></svg>`,
    check: (size = 20) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" style="vertical-align:-4px"><circle cx="12" cy="12" r="11" fill="#3fae5a"/><path d="M7 12.5 L10.5 16 L17 9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    bucket: (size = 26) => `<svg viewBox="0 0 32 32" width="${size}" height="${size}"><path d="M6 12 L26 12 L23 28 L9 28 Z" fill="#9fb6c6" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><path d="M8 12 Q16 2 24 12" fill="none" stroke="${INK}" stroke-width="2"/><path d="M7 14 Q16 19 25 14 L24.5 17 Q16 22 7.5 17 Z" fill="currentColor"/><path d="M25 14 Q30 20 27 26" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    eraser: (size = 26) => `<svg viewBox="0 0 32 32" width="${size}" height="${size}"><g transform="rotate(-35 16 16)"><rect x="4" y="10" width="24" height="12" rx="3" fill="#f48fb1" stroke="${INK}" stroke-width="2"/><rect x="4" y="10" width="9" height="12" rx="3" fill="#90caf9" stroke="${INK}" stroke-width="2"/></g><path d="M6 28 L26 28" stroke="#bbb" stroke-width="2" stroke-dasharray="3 3"/></svg>`,
    pin: () => `<svg viewBox="0 0 40 60" width="34" height="52"><rect x="12" y="4" width="16" height="52" rx="4" fill="#d9a066" stroke="${INK}" stroke-width="2.5"/><path d="M20 6 L20 54" stroke="${INK}" stroke-width="2"/><circle cx="20" cy="30" r="5" fill="#9e9e9e" stroke="${INK}" stroke-width="2"/></svg>`,
    sofa: () => `<svg viewBox="-170 -160 340 170" width="90">${ITEMS.sofa()}</svg>`,
    washer: () => `<svg viewBox="-90 -190 180 200" class="washer-ico">${ITEMS.washer()}</svg>`,
    bubbles: () => `<svg viewBox="0 0 80 60" width="70"><circle cx="20" cy="36" r="14" fill="#e3f4ff" stroke="#8cc6e8" stroke-width="2.5"/><circle cx="46" cy="22" r="10" fill="#e3f4ff" stroke="#8cc6e8" stroke-width="2.5"/><circle cx="62" cy="42" r="8" fill="#e3f4ff" stroke="#8cc6e8" stroke-width="2.5"/><path d="M14 30 Q18 26 22 28" fill="none" stroke="#fff" stroke-width="3"/></svg>`,
  };

  window.ART = { portrait, windowBust, room, ROOMS, PEOPLE, icons };
})();
