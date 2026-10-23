/* =====================================================================
   temporada.js · Temas por estación y festividad
   De la utilidad al asombro · pixel art propio
   Uso:
     const t = Temporada.crear(hostElement, { tema: "auto", modo: "auto", sonido: fn });
     t.set({ tema: "halloween" }); t.pausar(); t.reanudar(); t.asomarGato(); t.destruir();
   El host debe tener position: relative/fixed; su contenido, position: relative y z-index: 1.
   ===================================================================== */
(function () {
  "use strict";
  const SPRITES = {"palette":{"K":"#2b1a22","k":"#4f2d33","D":"#7a2c24","R":"#b5402f","r":"#dc5b56","O":"#e06212","o":"#f0933d","Y":"#f0b93d","y":"#f8e7ad","W":"#fffaf0","B":"#8a5232","b":"#c98a52","S":"#e9b371","G":"#5f5a35","g":"#8d8a52","C":"#1c151b","c":"#3b2c38","E":"#f5c542","e":"#fff1a8","P":"#6b475a","F":"#ffd27a","H":"#5a2412","M":"#a9c5b1"},"names":{"K":"Contorno","k":"Sombra","D":"Granate","R":"Rojo hoja","r":"Rojo claro","O":"Naranja","o":"Naranja claro","Y":"Oro","y":"Crema","W":"Blanco cálido","B":"Corteza","b":"Avellana","S":"Bellota","G":"Tallo","g":"Tallo claro","C":"Gato","c":"Gato brillo","E":"Ojos","e":"Llama","F":"Luz de vela","H":"Hueco tallado"},"sprites":{"p_arce_roja":{"label":"Hoja arce roja","cat":"Partículas","rows":["...R....",".R.R..R.","..RRrR..","RRRRrRR.",".RRRrR..","..RDrR..","...D....","...D...."]},"p_arce_naranja":{"label":"Hoja arce naranja","cat":"Partículas","rows":["...O....",".O.O..O.","..OOoO..","OOOOoOO.",".OOOoO..","..ORoO..","...D....","...D...."]},"p_arce_amarilla":{"label":"Hoja arce amarilla","cat":"Partículas","rows":["...Y....",".Y.Y..Y.","..YYyY..","YYYYyYY.",".YYYyY..","..YOyY..","...B....","...B...."]},"p_oval_roja":{"label":"Hoja oval roja","cat":"Partículas","rows":["........","....RR..","...RRrR.","..RRrRR.",".RRrRD..",".RrRD...","..DD....",".D......"]},"p_oval_naranja":{"label":"Hoja oval naranja","cat":"Partículas","rows":["........","....OO..","...OOoO.","..OOoOO.",".OOoOR..",".OoOR...","..RR....",".D......"]},"p_oval_amarilla":{"label":"Hoja oval amarilla","cat":"Partículas","rows":["........","....YY..","...YYyY.","..YYyYY.",".YYyYO..",".YyYO...","..OO....",".B......"]},"p_roble_roja":{"label":"Hoja roble roja","cat":"Partículas","rows":["...RR...","..RRrR..",".RRRrR..","..RRrR..",".RRDrR..","..RDDR..","...DD...","...D...."]},"p_roble_naranja":{"label":"Hoja roble naranja","cat":"Partículas","rows":["...OO...","..OOoO..",".OOOoO..","..OOoO..",".OORoO..","..ORRO..","...RD...","...D...."]},"p_roble_amarilla":{"label":"Hoja roble amarilla","cat":"Partículas","rows":["...YY...","..YYyY..",".YYYyY..","..YYyY..",".YYOyY..","..YOOY..","...OB...","...B...."]},"p_seca":{"label":"Hoja seca","cat":"Partículas","rows":["........","....BB..","...BBbB.","..BBbBB.",".BBbBk..",".BbBk...","..kk....",".k......"]},"hoja_arce_roja":{"label":"Hoja de arce roja","cat":"Hojas","rows":[".......D........","......DRD.......",".....DRrRD......",".D...DRrRD...D..",".DD..DRrRD..DD..",".DRrDRRrRRDrRD..","..DRrRRrRRrRD...","D..DRRRrRRRD..D.","DD.DRRRrRRRD.DD.",".DrDDDDrRRRRrD..","..DDDDDrRRRRD...","...DDDDrRRRD....","....DDDrDDD.....",".......D........",".......D........","................"]},"hoja_arce_naranja":{"label":"Hoja de arce naranja","cat":"Hojas","rows":[".......R........","......ROR.......",".....ROoOR......",".R...ROoOR...R..",".RR..ROoOR..RR..",".ROoROOoOORoOR..","..ROoOOoOOoOR...","R..ROOOoOOOR..R.","RR.ROOOoOOOR.RR.",".RoRRRRoOOOOoR..","..RRRRRoOOOOR...","...RRRRoOOOR....","....RRRoRRR.....",".......D........",".......D........","................"]},"hoja_arce_amarilla":{"label":"Hoja de arce amarilla","cat":"Hojas","rows":[".......O........","......OYO.......",".....OYyYO......",".O...OYyYO...O..",".OO..OYyYO..OO..",".OYyOYYyYYOyYO..","..OYyYYyYYyYO...","O..OYYYyYYYO..O.","OO.OYYYyYYYO.OO.",".OyOOOOyYYYYyO..","..OOOOOyYYYYO...","...OOOOyYYYO....","....OOOyOOO.....",".......B........",".......B........","................"]},"hoja_roble_roja":{"label":"Hoja de roble roja","cat":"Hojas","rows":["................","......DDD.......",".....DRRRD......","....DRRrRRD.....","...DRRRrRRRD....","....DRRrRRD.....","..DDRRRrRRRDD...","...DRRRrRRRD....","..DDRRRrRRRRD...","...DDRRrRRRD....","..DDDDRrRRRRD...","...DDDRrRRRD....","....DDDrDDD.....",".......D........",".......D........","................"]},"hoja_roble_naranja":{"label":"Hoja de roble naranja","cat":"Hojas","rows":["................","......RRR.......",".....ROOOR......","....ROOoOOR.....","...ROOOoOOOR....","....ROOoOOR.....","..RROOOoOOORR...","...ROOOoOOOR....","..RROOOoOOOOR...","...RROOoOOOR....","..RRRROoOOOOR...","...RRROoOOOR....","....RRRoRRR.....",".......D........",".......D........","................"]},"hoja_roble_amarilla":{"label":"Hoja de roble amarilla","cat":"Hojas","rows":["................","......OOO.......",".....OYYYO......","....OYYyYYO.....","...OYYYyYYYO....","....OYYyYYO.....","..OOYYYyYYYOO...","...OYYYyYYYO....","..OOYYYyYYYYO...","...OOYYyYYYO....","..OOOOYyYYYYO...","...OOOYyYYYO....","....OOOyOOO.....",".......B........",".......B........","................"]},"hoja_seca":{"label":"Hoja seca","cat":"Hojas","rows":["................","......kkk.......",".....kBBBk......","....kBBbBBk.....","...kBBBbBBBk....","....kBBbBBk.....","..kkBBBbBBBkk...","...kBBBbBBBk....","..kkBBBbBBBBk...","...kkBBbBBBk....","..kkkkBbBBBBk...","...kkkBbBBBk....","....kkkbkkk.....",".......k........",".......k........","................"]},"bellota":{"label":"Bellota","cat":"Bosque","rows":["......KK........",".....KkkK.......","...KKKkBKKK.....","..KBBBBBBBBK....",".KBbBBbBBbBBK...",".KBBbBBbBBbBK...",".KBBBBBBBBBBK...","..KkkkkkkkkK....","..KySSSSSSbK....","..KSySSSSSbK....","..KSSSSSSbbK....","...KSSSSbbK.....","....KSSbbK......",".....KBBK.......","......KK........","................"]},"hongo_rojo":{"label":"Hongo rojo","cat":"Bosque","rows":["................",".....KKKKK......","...KKRRRRRKK....","..KRRrRRRRRRK...",".KRRyRRRRyRRRK..","KRRRRRRRRRRRRRK.","KRrRRRyRRRRRyRK.","KDDDDDDDDDDDDDK.",".KKKkSWWSkKKKK..","....KWWWSK......","....KWWWSK......","....KWWWSK......","...KWWWWSSK.....","...KSSSSSbK.....","....KKKKKK......","................"]},"hongo_marron":{"label":"Hongo marrón","cat":"Bosque","rows":["................","................","....KKKKKK......","..KKBBBBBBKK....",".KBBbbBBBBBBK...","KBBbBBBBBBBBBK..","KBBBBBBBBBBBkBK.",".KkkkkkkkkkkkK..","..KKySSSSKKKK...","...KySSSSbK.....","...KySSSSbK.....","...KySSSSbK.....","..KyySSSSbbK....","..KSSSSSSbbK....","...KKKKKKKK.....","................"]},"castana":{"label":"Castaña","cat":"Bosque","rows":["................","................","......KK........",".....KkkK.......","....KBbBkK......","...KBbBBBkK.....","..KBbBBBBBkK....","..KBBBBBBBkK....","..KBBBBBBBkK....","..KBBBBBBkkK....","..KySSSSSSSK....","...KSSSSSSK.....","....KKKKKK......","................","................","................"]},"calabaza":{"label":"Calabaza","cat":"Calabazas","rows":["......KGgK......","......KGK.......","......KGKK......","...KKKOOOOKKK...","..KRoOOOROOORK..",".KoyoOOOROOOROK.","KooRoOOOROOOROOK","KooRoOOOROOOROOK","OOOROOOOROOOROOO","KOOROOOOROOOROOK","KOOROOOOROOORRRK",".KOROOOOROOORRK.","..KROOOOROOORK..","...KKKRRRRKKK..."]},"calabaza_ancha":{"label":"Calabaza ancha","cat":"Calabazas","rows":[".........KGgK.........",".........KGK..........",".......KKKGKKKK.......","....KKKOOOOOOOOKKK....","..KKoROOOOROOOOOROKK..",".KooyROOOOROOOOOROOOK.","KooooROOOOROOOOOROOOOK","KooooROOOOROOOOOROOOOK","KOOOOROOOOROOOOOROOOOK","KOOOOROOOOROOOOORRRRRK",".KOOOROOOOROOOOORRRRK.","..KKOROOOOROOOOORRKK..","....KKKRRRRRRRRKKK...."]},"calabaza_mini":{"label":"Calabaza mini","cat":"Calabazas","rows":["...KGgK...","...KGKK...",".KKOOOOKK.","KyROROOROK","KoROROOROK","OOROROOROO","KOROROORRK","KOROROORRK",".KKRRRRKK."]},"jack":{"label":"Calabaza tallada","cat":"Calabazas","rows":[".......KGgK.......",".......KGK........","......KKGKKK......","....KKOOOOOOKK....","..KKROOOROOOORKK..",".KooROOOROOOOROOK.",".KoyRHOOROOHOROOK.","KoooRHOOROOHOROOOK","KoooHHHOROHHHROOOK","OOOOHHHOROHHHROOOO","KOOOHOHOHOHOHROOOK","KOOHHHHHHHHHHHRRRK",".KOHRHOHRHOHOHRRK.",".KOOROOOROOOORRRK.","..KKROOOROOOORKK..","....KKRRRRRRKK...."]},"jack_mini":{"label":"Calabaza tallada mini","cat":"Calabazas","rows":[".....KGgK....","....KKGKK....","..KKOOOOOKK..",".KoROOROOROK.","KoyROOROOROOK","KooRHOROHROOK","KooHHHRHHHOOK","KOHRHOHOHROOK","KOHHHHHHHHRRK","KOOHOHRHOHRRK",".KOROOROORRK.","..KKRRRRRKK.."]},"vela":{"label":"Vela","cat":"Acogedor","rows":["................",".......e........","......FeF.......","......oFo.......","......KoK.......",".....KkKkK......","....KyyyySK.....","....KyWyySK.....","....KyyyySK.....","....KyyySSK.....","....KyyySSK.....","...KKyyySSKK....","..KBBBBBBBBBK...","...KbbbbbbbK....","....KKKKKKK.....","................"]},"taza":{"label":"Taza humeante","cat":"Acogedor","rows":[".....W...W......","......W...W.....","......W...W.....",".....W...W......","...KKKKKKKK.....","..KRRRRRRRRK....",".KRkBBBBBBkRKKK.",".KRrRRRRRRRRRRRK",".KRrRRRRRRRKRKRK",".KRrRRRRRRRKRRRK",".KRrRRRRRRRRKKK.","..KRRRRRRRRK....",".KDDDDDDDDDDK...","..KKKKKKKKKK....","................","................"]},"luna":{"label":"Luna creciente","cat":"Acogedor","rows":["................","................",".....WW.........","....Wy..........","...Wyy..........","..Wyyy..........","..Wyyy..........","..yyyy..........","..yyyy..........","..Wyyyy.........","..Wyyyyy........","...WyyyyyyyW....","....WyyyyyW.....",".....WWWWW......","................","................"]},"monton":{"label":"Montón de hojas","cat":"Montón","rows":["................................................","................................................","................................................","................................................","..................DDDDDDDDDDDD..................","..............DDDDRRRDDYROOYYoDDDD..............","............DDRRRRRRBYDyYRYyYYYOBRDD............","..........DDyYOORROOOOROYRYYYyOOORRRDD..........","........DDoODOOoODYORDOYBRYOYOOyYYrRrRDD........",".......DROROOOOoDRRYRYRRORRRRDOYYOYRrRROD.......","......DRRROoOORORRORRrRORDRRrRRROYYRDRRRoD......",".....DRRRRROOORRRRYYRrRDDRRDDRrRRORBrDRROoD.....","....DRrRRRROORRRrRyYYrDRRRRRRRRrRRRBODORRrDD....","...DRrRRrRRORROOORYyYDRRRrDRrRRRrYyRrDRORRORD...","..DDRRRRrOORROYYOORYOYkRrRDRrRORRYykrOOOOOOOBD..",".DYDDRRROoOORYyYYOYBOOBBkOROORORYYOOkOkoOOBBBbD.",".DkDRRRRRokOOYyYYDOBYBBbBYOoOoOYYOYOkkkoOBBBBbD.","DBkDRRRrRROkkYyYDDOoRbBDYBkOOoYYyYOORkDBBBbBBbBD","DBkbBRRrRRRbBkyRDDRBRbBRBBBBOYYyOORBRkDRBbBBkbBD","DBBbBRRrRRBBbBkRrDRRRrRBRBbBOYyYOOORRrRoOBkBkkBD","DBBbBBDrRRRBBbBRrRRRRrRRBBBDDDOODRRRRrRROkDDkkDD","DBBbBRDDRRDDBBbRrRRRRrRBBDDDDBDDDDRRRrRoOODDkDDD"]},"gato_mira":{"label":"Gato · mira","cat":"Gato negro","rows":["................","..C.........C...","..CC.......CC...","..CrC.....CrC...","..CCCCCCCCCCC...",".CCCCCCCCCCCCC..",".CCEEECCCEEECC..",".CCEKECCCEKECC..",".CCCCCCCCCCCCC..",".CCCCCCrCCCCCC..","..CCCccCccCCC...","...CCCCCCCCC....","....CCCCCCC.....","................"]},"gato_parpadeo":{"label":"Gato · parpadeo","cat":"Gato negro","rows":["................","..C.........C...","..CC.......CC...","..CrC.....CrC...","..CCCCCCCCCCC...",".CCCCCCCCCCCCC..",".CCCCCCCCCCCCC..",".CCKKKCCCKKKCC..",".CCCCCCCCCCCCC..",".CCCCCCrCCCCCC..","..CCCccCccCCC...","...CCCCCCCCC....","....CCCCCCC.....","................"]},"gato_izquierda":{"label":"Gato · izquierda","cat":"Gato negro","rows":["................","..C.........C...","..CC.......CC...","..CrC.....CrC...","..CCCCCCCCCCC...",".CCCCCCCCCCCCC..",".CCEEECCCEEECC..",".CCKEECCCKEECC..",".CCCCCCCCCCCCC..",".CCCCCCrCCCCCC..","..CCCccCccCCC...","...CCCCCCCCC....","....CCCCCCC.....","................"]},"gato_derecha":{"label":"Gato · derecha","cat":"Gato negro","rows":["................","..C.........C...","..CC.......CC...","..CrC.....CrC...","..CCCCCCCCCCC...",".CCCCCCCCCCCCC..",".CCEEECCCEEECC..",".CCEEKCCCEEKCC..",".CCCCCCCCCCCCC..",".CCCCCCrCCCCCC..","..CCCccCccCCC...","...CCCCCCCCC....","....CCCCCCC.....","................"]}}};
  const PAL = SPRITES.palette;
  const RIM_DARK = { K: "#8c6470", D: "#9a5a52", k: "#8c6470", C: "#7d6a92" }; // contorno exterior en modo oscuro
  const SWAP_DARK = { H: "#ffd27a" };                                           // huecos tallados: luz de vela

  /* ---------- Calendario (hemisferio norte) ---------- */
  const TEMAS = {
    otono:     { nombre: "Otoño",     desde: "09-22", hasta: "12-20" },
    halloween: { nombre: "Halloween", desde: "10-15", hasta: "11-02", base: "otono" }
  };
  const PRIORIDAD = ["halloween", "otono"]; // las festividades ganan a la estación
  function mmdd(d) { return String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function enRango(h, a, b) { return a <= b ? h >= a && h <= b : h >= a || h <= b; }
  function detectar(fecha) {
    const forz = (location.hash || "").replace("#", "");
    if (TEMAS[forz]) return forz;                       // vista previa: añade #halloween u #otono al enlace
    const h = mmdd(fecha || new Date());
    return PRIORIDAD.find(id => enRango(h, TEMAS[id].desde, TEMAS[id].hasta)) || null;
  }

  /* ---------- Horneado de sprites ---------- */
  const cache = new Map();
  function bake(key, dark, rot = 0) {
    const id = key + (dark ? "@d" : "@c") + rot;
    if (cache.has(id)) return cache.get(id);
    const s = SPRITES.sprites[key]; const R = s.rows; const w = R[0].length, h = R.length;
    const edge = (x, y) => [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => {
      const X = x + a, Y = y + b; return X < 0 || Y < 0 || X >= w || Y >= h || R[Y][X] === ".";
    });
    const c = document.createElement("canvas"); const sw = rot % 2 ? h : w, sh = rot % 2 ? w : h;
    c.width = sw; c.height = sh; const g = c.getContext("2d");
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const ch = R[y][x]; if (ch === ".") continue;
      let col = PAL[ch];
      if (dark) { if (SWAP_DARK[ch]) col = SWAP_DARK[ch]; else if (RIM_DARK[ch] && edge(x, y)) col = RIM_DARK[ch]; }
      let X = x, Y = y;
      if (rot === 1) { X = h - 1 - y; Y = x; } else if (rot === 2) { X = w - 1 - x; Y = h - 1 - y; } else if (rot === 3) { X = y; Y = w - 1 - x; }
      g.fillStyle = col; g.fillRect(X, Y, 1, 1);
    }
    cache.set(id, c); return c;
  }
  function spriteCanvas(key, scale, dark, cls) {
    const src = bake(key, dark); const c = document.createElement("canvas");
    c.width = src.width; c.height = src.height; c.getContext("2d").drawImage(src, 0, 0);
    c.style.width = src.width * scale + "px"; c.style.height = src.height * scale + "px";
    c.style.imageRendering = "pixelated"; c.className = cls || ""; c.dataset.key = key; return c;
  }

  /* ---------- Composición de cada tema ---------- */
  const HOJAS = ["p_arce_roja", "p_arce_naranja", "p_arce_amarilla", "p_oval_roja", "p_oval_naranja", "p_oval_amarilla",
                 "p_roble_roja", "p_roble_naranja", "p_roble_amarilla", "p_seca"];
  const DECOR = {
    otono: {
      der: [["calabaza", 3, 0, 0], ["calabaza_ancha", 3, 34, 0], ["calabaza_mini", 3, 92, 0], ["hongo_rojo", 2, 128, 2], ["bellota", 2, 150, 0]],
      izq: [["hongo_marron", 2, 6, 0], ["bellota", 2, 192, 0], ["castana", 2, 218, 0]],
      luna: false
    },
    halloween: {
      der: [["jack", 3, 0, 0], ["calabaza_ancha", 3, 40, 0], ["jack_mini", 3, 102, 0], ["vela", 2, 140, 2], ["calabaza_mini", 2, 166, 0]],
      izq: [["vela", 2, 0, 2], ["jack_mini", 3, 192, 0], ["hongo_rojo", 2, 236, 0]],
      luna: true
    }
  };
  const BRILLA = new Set(["jack", "jack_mini", "vela", "luna"]);

  function crear(host, opts) {
    opts = Object.assign({ tema: "auto", modo: "auto", sonido: null, gato: [20, 40], anchoDecor: 1040, densidad: 1, evitar: null }, opts || {});
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let tema = null, dark = false, paused = reduce.matches, raf = 0, last = 0, W = 0, H = 0, dpr = 1;
    let back = [], front = [], nextFront = 0, catTimer = 0, catBusy = false, alive = true;

    const css = (el, s) => Object.assign(el.style, s);
    const layerBack = document.createElement("canvas"), layerFront = document.createElement("canvas");
    css(layerBack, { position: "absolute", inset: "0", width: "100%", height: "100%", zIndex: "0", pointerEvents: "none" });
    css(layerFront, { position: "absolute", inset: "0", width: "100%", height: "100%", zIndex: "3", pointerEvents: "none" });
    const decor = document.createElement("div");
    css(decor, { position: "absolute", inset: "0", zIndex: "2", pointerEvents: "none", overflow: "hidden" });
    host.prepend(layerBack); host.append(decor, layerFront);
    const gb = layerBack.getContext("2d"), gf = layerFront.getContext("2d");

    function isDark() {
      if (opts.modo === "claro") return false; if (opts.modo === "oscuro") return true;
      const t = document.documentElement.dataset.theme; return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    }
    const rnd = (a, b) => a + Math.random() * (b - a);
    function leaf(isFront, anyY) {
      const key = HOJAS[Math.random() * HOJAS.length | 0];
      const sc = isFront ? 3 : (Math.random() < .55 ? 2 : 3);
      return { key, sc, x: rnd(-20, W + 20), y: anyY ? rnd(-20, H) : rnd(-60, -16), vy: rnd(14, 28) * (isFront ? 1.25 : 1),
        sway: rnd(14, 34), f: rnd(.35, .8), ph: rnd(0, 6.28), rot: Math.random() * 4 | 0, rt: rnd(.28, .6), acc: 0,
        a: isFront ? .95 : rnd(.45, .75), t: 0 };
    }
    function populate() {
      const n = Math.round(Math.min(36, Math.max(8, W * H / 38000)) * opts.densidad);
      back = Array.from({ length: n }, () => leaf(false, true)); front = []; nextFront = rnd(3, 7);
    }
    function resize() {
      const r = host.getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      for (const c of [layerBack, layerFront]) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
      for (const g of [gb, gf]) { g.setTransform(dpr, 0, 0, dpr, 0, 0); g.imageSmoothingEnabled = false; }
      if (!back.length) populate();
      layoutDecor(); draw(0);
    }
    function step(l, dt) {
      l.t += dt; l.y += l.vy * dt;
      l.x += (6 + 10 * Math.sin(performance.now() / 4200)) * dt + Math.cos(l.t * l.f * 6.28 + l.ph) * l.sway * dt;
      l.acc += dt; if (l.acc > l.rt) { l.acc = 0; l.rot = (l.rot + 1) % 4; }
    }
    function drawLeaf(g, l) {
      const img = bake(l.key, dark, l.rot); g.globalAlpha = l.a;
      g.drawImage(img, Math.round(l.x), Math.round(l.y), img.width * l.sc, img.height * l.sc);
    }
    function draw(dt) {
      gb.clearRect(0, 0, W, H); gf.clearRect(0, 0, W, H);
      if (!tema) return;
      for (const l of back) { if (dt) step(l, dt); if (l.y > H + 10 || l.x > W + 40) Object.assign(l, leaf(false, false)); drawLeaf(gb, l); }
      gb.globalAlpha = 1; erase();
      if (dt) {
        nextFront -= dt;
        const maxF = W < 700 ? 1 : 2;
        if (nextFront <= 0 && front.length < maxF) { front.push(leaf(true, false)); nextFront = W < 700 ? rnd(15, 25) : rnd(9, 16); }
      }
      front = front.filter(l => { if (dt) step(l, dt); drawLeaf(gf, l); return l.y < H + 10; });
      gb.globalAlpha = gf.globalAlpha = 1;
    }
    function erase() {
      if (!opts.evitar) return;
      const hr = host.getBoundingClientRect();
      gb.save(); gb.globalCompositeOperation = "destination-out";
      for (const sel of opts.evitar) document.querySelectorAll(sel).forEach(el => {
        const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
        const rad = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
        gb.beginPath();
        if (gb.roundRect) gb.roundRect(r.left - hr.left, r.top - hr.top, r.width, r.height, rad); else gb.rect(r.left - hr.left, r.top - hr.top, r.width, r.height);
        gb.fill();
      });
      gb.restore();
    }
    function loop(t) {
      if (!alive) return;
      const dt = last ? Math.min(.05, (t - last) / 1000) : 0; last = t;
      if (!paused && !document.hidden) draw(dt);
      raf = requestAnimationFrame(loop);
    }

    /* ---------- Decoración y gato ---------- */
    let cat = null, catImg = null, pileBox = null;
    function group(items, side) {
      const g = document.createElement("div");
      css(g, { position: "absolute", bottom: "0", [side]: "1.5%", width: "200px", height: "80px" });
      for (const [k, sc, x, y] of items) {
        const c = spriteCanvas(k, sc, dark); css(c, { position: "absolute", bottom: y * 1 + "px", [side]: x + "px" });
        if (dark && BRILLA.has(k)) c.style.filter = "drop-shadow(0 0 6px rgba(255,190,90,.75))";
        g.append(c);
      }
      return g;
    }
    function layoutDecor() {
      decor.replaceChildren(); cat = null;
      if (!tema) return;
      const D = DECOR[tema] || DECOR.otono;
      const wide = W >= opts.anchoDecor;
      if (D.luna && dark && wide) {
        const m = spriteCanvas("luna", 3, dark); css(m, { position: "absolute", top: "6%", right: "6%", opacity: ".9",
          filter: "drop-shadow(0 0 10px rgba(248,231,173,.55))" }); decor.append(m);
      }
      if (!wide) return;                                      // en pantallas estrechas solo caen hojas
      decor.append(group(D.der, "right"));
      const left = group(D.izq, "left"); decor.append(left);
      /* montón con gato */
      pileBox = document.createElement("div");
      css(pileBox, { position: "absolute", left: "44px", bottom: "0", width: 48 * 3 + "px", height: "120px", overflow: "hidden", pointerEvents: "auto", cursor: "pointer" });
      catImg = spriteCanvas("gato_mira", 4, dark);
      css(catImg, { position: "absolute", left: "40px", bottom: "30px", transform: "translateY(100%)", transition: "transform .45s steps(5)" });
      const pile = spriteCanvas("monton", 3, dark);
      css(pile, { position: "absolute", left: "0", bottom: "0", transition: "transform .12s steps(2)" });
      pileBox.append(catImg, pile); left.append(pileBox);
      pileBox.addEventListener("click", () => { if (catBusy) meow(); else asomarGato(); });
      cat = { img: catImg, pile };
      scheduleCat();
    }
    function setCat(frame) { if (!cat) return; const src = bake(frame, dark); const g = cat.img.getContext("2d"); g.clearRect(0, 0, 16, 14); g.drawImage(src, 0, 0); }
    const wait = ms => new Promise(r => setTimeout(r, ms));
    function snd(n) { if (opts.sonido) try { opts.sonido(n); } catch (e) {} }
    function meow() { snd("maullido"); setCat("gato_parpadeo"); setTimeout(() => setCat("gato_mira"), 160); }
    async function rustle() { if (!cat) return; snd("hojas"); for (const dx of [-2, 2, -1, 0]) { cat.pile.style.transform = `translateX(${dx}px)`; await wait(70); } }
    async function asomarGato() {
      if (!cat || catBusy) return; catBusy = true; clearTimeout(catTimer);
      const img = cat.img, Y = p => img.style.transform = `translateY(${p}%)`;
      await rustle(); setCat("gato_mira"); Y(62); await wait(700);              // asoman las orejas
      Y(0); await wait(1300);                                                   // la cabeza entera, te mira
      setCat("gato_parpadeo"); await wait(160); setCat("gato_mira"); await wait(900);
      setCat(Math.random() < .5 ? "gato_izquierda" : "gato_derecha"); await wait(800);
      setCat("gato_mira"); await wait(700);
      Y(100); await wait(500); await rustle();
      catBusy = false; scheduleCat();
    }
    function scheduleCat() { clearTimeout(catTimer); if (paused || !cat) return;
      catTimer = setTimeout(asomarGato, rnd(opts.gato[0], opts.gato[1]) * 1000); }

    /* ---------- API ---------- */
    function aplicar() {
      tema = opts.tema === "auto" ? detectar() : (opts.tema || null);
      dark = isDark();
      host.dataset.temporada = tema || "";
      host.dataset.temporadaModo = dark ? "oscuro" : "claro";
      layoutDecor(); draw(0);
    }
    const ro = new ResizeObserver(resize); ro.observe(host);
    const onTheme = () => { if (opts.modo === "auto") aplicar(); };
    const mq = matchMedia("(prefers-color-scheme: dark)"); mq.addEventListener("change", onTheme);
    const mo = new MutationObserver(onTheme); mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onVis = () => { last = 0; };
    const onScroll = () => { if (paused) draw(0); };
    addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    aplicar(); resize(); raf = requestAnimationFrame(loop);

    return {
      set(o) { Object.assign(opts, o); aplicar(); },
      pausar() { paused = true; clearTimeout(catTimer); draw(0); },
      reanudar() { paused = false; last = 0; scheduleCat(); },
      get pausado() { return paused; },
      get tema() { return tema; },
      asomarGato,
      destruir() { alive = false; cancelAnimationFrame(raf); clearTimeout(catTimer); ro.disconnect(); mo.disconnect();
        mq.removeEventListener("change", onTheme); document.removeEventListener("visibilitychange", onVis); removeEventListener("scroll", onScroll);
        layerBack.remove(); layerFront.remove(); decor.remove(); }
    };
  }

  /* Sonido del gato: «Kitten Mew» de AntumDeluge (OpenGameArt, CC0), recortado y pasado a 8 bits (versión suave) */
  const AUDIO = { maullido: "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us3Z4c2vjHdPMBwkMkmHvtLa3sWbiXRJJCAmNmWlwdPd1b2XgWJDIyIsO26ry9Pcz6mTf10yIyQvT3exzNfbyqOJc1guIykxVpTBzdfXuJ6Gb0MrJCw9XJvE0djVs4+Daz4kJS5CeKLH0trKr4x7WDojKTRGf7jN09rHnYl4UyoiKjZbhLzP2NvFmYB0TicjLjhgn8jR2dezl39mOyUjLkRlo8rW29axi35jOCAiLkd+psvY3dWvi3VSNiAlNEmAt9HZ3smhi3NPKiAkNFuBt9Le3siihHNOKyAjNFyWttLe2buihGdAKyAnP12Vwdfe2LqYhWhBJiEnP2+UwNbd17qYfmlDKCMoP26kx9Tbzq6ZgF86KiUuS22ixdXZza2QgGE8KigvSn6gwtLWy6yRelc/LSw2Sn2sxs/UwKGRfFo6MC42WHupwtDSv6GMfl09MTA2VommwM7NtaGMd1RBNDI9VYatw8zMtZqNeVg+NjI9YoKrws3LtpuIe1xANDM8Xo2ywMzHrpyJdFVCNTRCWomwxcvIsZaKd1c9NTNAZYWuxM3Ks5iGelo9MjQ9YJG2xM7HrZuIc1E+MjFCXI20ydDKsJaKdVM4MC8+Z4iyytPHtJqGbFU5LC46YpS7ytTKr52Ib0w5KixBXI650NbOtJmKcU8yKSo8Zpq30NfLuZyFalIzJis4X5S/z9jPtKCIbko0Jik9WI670tjTuZuLc04vJSc4Y5m20NrPvZ+IbFIyJSgzW5G8ztrSuKSMcUw2JSU4U4i20dnUvaGJd1IyJCMzXJCvztnRwqaOclo3JCQvU4e1ydfTvquTeVQ8JiMzWn6uzNfVwqeQgFw3JCIuUoanx9XTx6yVfGQ9JiMrSX2twtPVwrGZgl43KCIuUXSmxdTVxqyWh2U9JiIrSn6ewdLUybCag2xDKCMpRHWmvdDUxKqch2U8KyQtTG6gwdHUx6yXimtBKSUsR3mavs/Tya6YhXBHLCcrQ3Okws3Tw6eZiGg/LygwTG2fwM/SxaiUiWxELSowSHmbvs7RxqmTg2NILyw0RXSmw83RwKGThGdBMSw0T2+iwtDRwqONhGpELi00S3yewc/Qu6WNf2FHLy44SHeqx8/Sv52Nf2Q/MC42UXGmxtPUw6CHf2dBLS01TH6xxtPUvaSIel1ELS04SHitzNTWwpyKe2A7LSs1UHGpy9jZ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LC43Tn+3z9rQtZ+IfmZMLyw1P2Ody9nZx6aSgnRSOSkvO01/uNjd1bmXiH1kPigpMkZ1nMzf2suojIB0UC4nKzdYkbja4NK8mYV5ZTwmKC5Ccq/N4d3En42BbEMtJCs7VJDH4ePUspGHe1kyJSYvS2+u2OTfxZ+Jgm5EJyUpOGSkyOLiyrGRhHRbMyMnLUiCwNrl2beeiYBjRiglKzZio9Xj4smki4V2TiskKDNXgcDh49i2lIaAZDokJSxAdaLV5dvIpIyCd08rJCgzVpXO4ePNq5aIe1c7JCYwQHO03uXavZyOhGxCLCMqOlSSzOTizq2TinxYMSMlMEuFsNvj07+gjoBuQyYkKTlko8ji3cWxl4p1WjIjJy5IgL7f4tS4nZKDYzkoIytAXp3R4t7Iq5aNeFAsIyUwUnm33ODWvKGQhmg+JSMoO2uqy+DaxLGZinFXMSIkLEuFwNjg0rimk4JiRykhJzRhoNDe3Mmtlox4UzAkIi1SerbZ3ta+o4+FbEUpIiM4aZPH3dnNs5mJfl86JCEpSYG70t3SuaeRgmpSMSIlM16ZydjayK2bintdRisiLkN2rtLa1L2gjYRxUDInJjtnjL7Y18uvlYZ+ZUQsJi5LfqLL2tHAoo2AdVg5KSk4X5PC1NnHqpeGeWBKMCk0RnOoz9rVvJ6OgHBSPiwsPlWHutjczrCUh3pkRi8qMUp4m8nd1cSli31yWDwsLDhYi6/V3s25moR2aU01LC5AaZ/A3NvEo5B+blVDMS03S3yz2ODWuZiHeGVMPC8vP1iQxN7gz66NgHFcQzMvMUl9pdLh2Maig3RqUzwxLjVXkbjb4tK8lnxuYko3Ly47aKXI4eHLpIt2aFFBMi0zRXu33ebfwpmDcmJIOS4rOFGMxuPo27iQfm9bQDMqK0BzndHo5dWuiXZsVDkqJyxJgqzZ6uHNpYV1aUwyJiUvVZG43urbxJ2EdFtGLiQmNGGez+Hn066YhHNWQCsjKTpuqdTi4sqnlYRxUDwpIy1TerPX4tvBoY2EbUsxKCQzX4a62N3UuJyMgmhHLygmO2ySwdfXzLCYinhjQy4nKkV5rcbX0ruolIdyXT8tKTBQhLbL1syzopCDbFc8LSw2Wo++1NXGrJaMfmZIOCwvR2WaxtfUwaeRh3lgQzUrMk9vpc7Z0ryhjIJ0Wz8tKzVWi7DV2si3nId7cFY7Kyo4XZW62trFs5eEeG1SNyoqOmSfz97ZwqSSgXdiTzUoLTxrp9Tg2L6ejoF3YEwzJy0/cq7X4da5mYuBdl1AMSYuU3q02d/Ts5WHgnVbPjAmMVqAudrczq2SiIN0WDwvJzVhh73a172nkImAc1U7Kyk7aaHB2NG2oY+KgHBROSwsQXKpxNXKr5yOi4BtTjcuNUl8sM7Rw6eRjIx+X0o3LzpRhbbNzbygjYuLelpINzFAW4+7zcW2moqLiXZXQDc0SHaZv8zCsZWIiYVwUz83N1CAoMLLvqyRhoaAalA+NzxZiLTFyrqejoSDdmVMPTpBYZC5x8m2m4yCgHFgSDs8RmiXvcnHtJiFgX1tU0Q7PlNuncHMxrKXhIB7alBCO0BXcqHDzMawlYJ+eGZNQjxCWoWkxcy/r5SBe3ZjTD49RF2IpsXMv6+UgnpzYUs/PUVfiqfFy76mlYJ6bV9KPj5GYYu0xMm8pZWDem1fSz4+RmKMtMTIu6SUg3tuYEw/Pk1ijbXHyLqijIJ7blpNQD1MYo61x8i6oYqBe29cT0E9S2GNtMjJuqCJf3pvXUtCPEtvjbTIxrqgiX55b15MQjxLcI20yMW5n4h+eXBfTEI8S3CdtcjEsJ6IfXhxYEw9O0pxn7jJxK+dhn15c2FLOzlIcKC6y8Wuk4V9enBjTDo5Rm6fxM7GrpKEfHtzZ046OERqnMTQya+Sg3p6dWpROzdLZZfC0syylYB5eHVlVD45SWCPvNHNt5mCend1Z1hCO0dbhrTNzrufhnl2dGlURz1GY36qx8q/pox8d3RrWUxBRl11nr/JwqyTgHl0bl9SREVXd5G0xsCzmoN4dXFlU0lFUWyDqcHDuaGIend1bFtQR0tfdpy7xbmpjnx3eHNkUkpGU3ONssXBspV/eHl4bVtPREhifabDyLyeg3l6fHVkT0RAUnqXvsy+qYp7e358bVdIO0Voh7TNx7WTfnp9f3VfTjo8WHeoys62n4J5fYB6Zks8Nkp4msTSwayLe3x/fmxRQDM/aIu70sq4ln97f4ByWD0yN1qNr8/RuKKFe3+Ad15CNDJMfqHI1MOujn5+gHplSDgwQm6ivtPLrpmCfoB9a083MDlekbHO0LmkiX+Af3JYPjM0UIChxtHDsJKBf352YUY0MkVvn7rPyrGdhoB/emlQOTM9Xo2ryc67qI6Af35yW0I2Nk96qMDOw6mWg35+emhOOTVCZZSxy8q0oYh+f39zW0I3OVOAn8PNvquOfn2AfWpQOzZEaZi0y8atmYJ8gIB2XUI4OlaDo8bMuKSIen2BgGxQOzdGbZ25zMOnk356gYN4XUM5PFmHp8bJtKCFen6Cf2lOQDlLc5O7yb2hjnx9hIR3W0I4Pl2LqsfHsZyDen+CfWhNQDtPd5W7yLqojH19goR2WkI6QF6Mq8fFrpqBeoCDf2pQQjtMdJS7ybuoi3p6gIN5YVA+QFx6qMXFrpmAd36CgXBWRTpIcZG8zcCriXV0e4J9aVZAPFVzpMbKvZ6BdnyBg3VZRjZAaIq4zcOwjXd1fIWDb1s/N01rnMHJv6GDdniCh3xrTDg+YYGwycSzknx3fISCcFxAN0tnmL7KwaWHeXmCh35tTTU3SXipyM29noR6fIKCcl5BM0FZibXKyLKVgX6CiIBzUzcwPWSWvsrEqo6BfoSHgmxNNjdIdKPCx7mcg3x+h4mAZ0c1OFWFssXJsY99cnqEh3xgQzg/ZJbB0MmqhnZud4GCdFc8NkZxpMHUxqSMdXF7gH9qTDs1Tn2fxtC8poZ3eoOHfmNENzhXh6fFxKuWfniAiY+AY004QGKBrMC4poh0c3yKj4JyVkdRcImptKiYgHJzeoSFem1dWml7l6qroYx6cXJ5f3x1Z19kb4acp6aain97fH99c2pfXWl3jZ+inIx9dHZ/i5CNgG9hX2Z4jJadl4h9b2lueoKPlZOOg3lycHJ6gYWHg3x2b293gI+coqCTgG5lYGZ0foiMh4F5dXqEjJaYkId6b2pscnuDhISCgICAgICAgH59fX5/gICAgICAgYKCgoGAf319fX1+f4CChISDgH99fX6AgYGAgH59fX+AgoKBgH9/gICAgYCAfn1+gICAgICAgIB/f39/gICBgYCAfn19foCChIOBfnx7fH+Cg4SCf318fX+BgoKBgH9+fn+AgIGBgYCAfn19fn+AgYKBgIB/f4CAgYCAfn19fn+AgICAgICBgYGAgH59fH1+gIGBgICAgICAgYCAf35+fn9/f3+AgIGCgoGAf359foCAgYCAf35/gIGBgYB/fn6AgIGBgIB/fn+AgIGAgH9+foCAgYGAgICAgICAf39+f4CAgIGAgIB/gICAgIB/f35+f4CBgYCAgH9/gICAgH9/f3+AgICBgICAf3+AgICAgH9/f4CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA=" };
  /* Icono de pestaña de cada tema (PNG 32×32 generado del sprite) */
  const ICONO = { otono: "hoja_arce_naranja", halloween: "jack_mini" };
  function favicon(tema) {
    const key = ICONO[tema]; if (!key) return null;
    const src = bake(key, false), c = document.createElement("canvas"); c.width = c.height = 32;
    const g = c.getContext("2d"); g.imageSmoothingEnabled = false;
    const s = Math.floor(32 / Math.max(src.width, src.height)), w = src.width * s, h = src.height * s;
    g.drawImage(src, (32 - w) >> 1, (32 - h) >> 1, w, h); return c.toDataURL("image/png");
  }
  window.Temporada = { crear, detectar, TEMAS, SPRITES, bake, AUDIO, favicon };
})();
