// Materials
//    Concrete
//    Rebar
//    Tendon

interface coord {
  x: number;
  y: number;
}

interface strip {
  x: number;
  y: number;
  a: number;
}

interface rebar {
  x: number;
  y: number;
  a: number;
}

interface tendon {
  x: number;
  y: number;
  a: number;
  d: number;
}

interface FRPbar {
  x: number;
  y: number;
  a: number;
}

// Rectangular
// manca AsList !!!
class Rectangular {
  Concrete: any;
  Rebar: any;
  obj: any;

  constructor(Concrete: any, Rebar: any) {
    this.Concrete = new Concrete();
    this.Rebar = new Rebar();

    // default object values
    // N, mm
    this.obj = {
      ec: -1 / 10,
      ect: 10,
      ecmin: -1 / 1000,
      ec0: 2,
      ecu: 3.5,
      Fc: 20,
      ConcCurve: "ParabolaRettangolo",
      //AsList: [],
      Fy: 450,
      Es: 210000,
      esu: 10,
      RebarCurve: "ElastoPlastico",
      Shape: "Rectangular",
      bw: 300,
      h: 600,
      TopCover: 40,
      BotCover: 40,
      Ne: 0,
    };
  }

  // beta // parabola-rettangolo
  PR_beta = (obj: any = this.obj) => {
    //console.log("Rectangular > PR_beta", obj);
    const { ec, ec0, ecu } = obj;
    if (ec > 0) return 0;

    const ecec0 = -ec / ec0;
    const ecuec0 = +ecu / ec0;

    return ecec0 > 1
      ? (1 +
          3 * ecec0 * ecec0 +
          2 * ecuec0 -
          6 * ecec0 * ecuec0 -
          3 +
          6 * ecec0 -
          3 * ecec0 * ecec0) /
          (6 * ecec0 - 6 * ecec0 * ecuec0)
      : (ecec0 * (3 - ecec0)) / 3;
  };

  // kappa // parabola-rettangolo
  PR_kappa = (obj: any = this.obj) => {
    const { ec, ec0, ecu } = obj;
    if (ec > 0) return 0;

    const ecec0 = -ec / ec0;
    const ecuec0 = +ecu / ec0;

    return ecec0 > 1
      ? (1 +
          ecuec0 +
          6 * ecec0 * ecec0 * (ecuec0 - 1) -
          2 +
          ecec0 * (-2 - 4 * ecuec0 + 6)) /
          (2 * ecec0 * (-1 - 2 * ecuec0 + 6 * ecec0 * (ecuec0 - 1) + 3))
      : (ecec0 - 4) / 4 / (ecec0 - 3);
  };

  // Nylim // parabola-rettangolo
  Nylim = (obj: any = this.obj) => {
    //console.log("Rectangular > Nylim", obj);
    let newObj: any = obj;

    const { Ne, ecu, h, AsList, Fy, Es } = obj;
    //console.log("Rectangular > Nylim > h", h);

    // area totale acciaio
    const As = AsList.map((a: any) => +a.As).reduce(
      (a: number, b: number) => a + b,
      0
    );
    //console.log("Rectangular > Nylim > As", As);

    const de = 1 / 1000;
    let tN = [],
      e = 0,
      ea = 0,
      eb = -ecu;
    while (e >= -ecu) {
      newObj = Object.assign(newObj, { yn: +h, ex: +e, chi: 0 });
      //console.log("Rectangular > Nylim > newObj", newObj);
      const { Nc } = this.NcyMcy(newObj);

      const ss = Math.sign(e) * Math.min((Es * Math.abs(e)) / 1000, Fy);
      const Ns = ss * As;
      //console.log("Rectangular > Nylim > Ns:", Ns);

      const Ni = Nc + Ns;
      tN.push(Ni);

      e -= de;
    }
    //console.log("Rectangular > tN:", tN);
    const Nmin = Math.min.apply(Math, tN);
    //console.log("Rectangular > Nmin:", Nmin);

    const less = tN.filter((n) => n >= Ne);
    //const more = tN.filter((n) => n <= Ne);

    ea = -de * (less.length - 1);
    eb = -de * less.length;

    return { ecmin: ea, Nmin: Nmin, Nmax: As * Fy, n: Ne / Nmin }; // andrebbe fatta la media pesata
    //return (ea + eb) / 2;
  };

  // Momento resistente trave in stadio III
  // ConcCurve: ParabolaRettangolo
  // ConcRebar: ElastoPlastico
  MrIIIbeam = (obj: any = this.obj) => {
    //console.log("Rectangular > MrIIIbeam", obj);
    const { ecu, Fc, bw, h, TopCover, BotCover, AsList, Fy, Es } = obj;

    const AsTop: number = AsList.find((a: any) => a.y < 0).As;
    const AsBot: number = AsList.find((a: any) => a.y > 0).As;
    const d: number = +h - BotCover;

    const esy: number = (Math.pow(10, 3) * Fy) / Es; // mm/m
    const beta: number = this.PR_beta(obj);
    const kappa: number = this.PR_kappa(obj);

    // considerando la sola armatura tesa
    const MrBot: number = AsBot * 0.9 * d * Fy;

    // esTop / esy >= 1
    let x: number = ((AsBot - AsTop) * Fy) / bw / Fc / beta;
    let esTop: number = (+ecu * (x - BotCover)) / x;

    // esTop / esy < 1
    if (esTop / esy < 1) {
      const A = (AsBot - (AsTop * ecu) / esy) * (Fy / 2 / beta / bw / Fc);
      const B = ((ecu / esy) * (AsTop * TopCover * Fy)) / (beta * bw * Fc);
      x = A + Math.sqrt(A * A + B);
      esTop = (+ecu * (x - BotCover)) / x;
    }

    const esBot: number = (+ecu * (d - x)) / x;

    //const Nc: number = +bw * x * beta * Fc;
    const NsTop: number = +AsTop * Math.min((Es * esTop) / Math.pow(10, 3), Fy);
    const NsBot: number = +AsBot * Math.min((Es * esBot) / Math.pow(10, 3), Fy);

    const Mr: number =
      NsBot * (+d - kappa * x) + NsTop * (+kappa * x - TopCover);

    return {
      esTop: esTop,
      esBot: esBot,
      x: x,
      Mr: Mr,
      MrBot: MrBot,
    };
  };

  // MChi_esu // parabola-rettangolo
  // fissato ect, itera su ec
  MChi_ect = (obj: any = this.obj) => {
    let newObj: any = obj;

    const { Ne, ect, ecmin, ecu, Fc, bw, h, AsList, Fy, Es }: any = newObj;
    //if (ec > 0) return {};

    // -1: non è necessario iterare su ec
    // 1: fissa ect = esu ed itera su ec
    let fafb: number = 0;

    let mchi: any = {};

    // pivot
    //const ect: number = esu;

    // itera su ec
    let [eca, ecb]: Array<number> = [-ecu, Math.min(ecmin, -1 / 1000)];
    let [fa, fb]: Array<number> = [0, 0];

    let i: number = 0,
      imax: number = 50;
    while (i < imax) {
      i++;

      let ec: number = (eca + ecb) / 2;
      if (i == 1) ec = eca;
      if (i == 2) ec = ecb;

      newObj = Object.assign(newObj, { ec: ec });
      const beta: number = this.PR_beta(newObj);
      const kappa: number = this.PR_kappa(newObj);

      const xh: number = -ec / (-ec + ect);
      const x: number = xh * h; // neutral axis depth
      const chi: number = -ec / x;
      const ex: number = (h / 2 - x) * chi; // epsilon @ centroid level
      //console.log("MChi_ect > x", i, ec, beta, x);

      // Concrete
      newObj = Object.assign(newObj, { yn: +x, ex: +ex, chi: +chi });
      //console.log("MChi_ect > newObj", newObj);
      //const { Nc, Mc } = this.NcyMcy(newObj);

      //const Nc: number = -beta * Fc * bw * x;
      //const Mc: number = Nc * (kappa * x - h / 2);

      const Nc: number = -beta * Fc * bw * (x > h ? +h : +x);
      const Mc: number = Nc * (kappa * (x > h ? +h : +x) - h / 2);

      // Rebar
      let Ns: number = 0,
        Ms: number = 0;
      for (let j: number = 0; j < AsList.length; j++) {
        const { y, As }: any = AsList[j];

        const esj: number = ex + chi * y;
        const ssj: number =
          Math.sign(esj) * Math.min((Es * Math.abs(esj)) / 1000, Fy);
        const Nsj: number = ssj * As;

        Ns += Nsj;
        Ms += Nsj * y;
      }
      const erri: number = Ne - (Nc + Ns);

      if (i == 1) fa = erri;
      if (i == 2) {
        fb = erri;

        fafb = Math.sign(fa * fb);
        //console.log(ec.toFixed(3), fafb);
      }
      if (i > 2) {
        if (fa * erri > 0) {
          eca = ec;
          fa = erri;
        } else {
          ecb = ec;
          fb = erri;
        }
      }

      mchi = {
        ec: ec,
        ex: ex,
        ect: ect,
        x: x,
        fafb: fafb,
        //fb: fb,
        erri: erri,
        chi: chi / 1000,
        Mi: Mc + Ms,
      };
    }

    return mchi;
  };

  // MChi_ec // parabola-rettangolo
  // fissato ec, itera su ect
  MChi_ec = (obj: any = this.obj) => {
    let newObj: any = obj;

    const { Ne, ec, ecmin, Fc, bw, h, AsList, Fy, Es, esu }: any = newObj;
    if (ec > 0) return {};

    // -1: non è necessario iterare su ec
    // 1: fissa ect = esu ed itera su ec
    let fafb: number = 0;

    let mchi: any = {};

    const beta: number = this.PR_beta(newObj);
    const kappa: number = this.PR_kappa(newObj);

    // itera su ect
    let [ecta, ectb]: Array<number> = [ecmin, esu];
    let [fa, fb]: Array<number> = [0, 0];

    let i: number = 0,
      imax: number = 50;
    while (i < imax) {
      i++;

      let ect: number = (ecta + ectb) / 2;
      if (i == 1) ect = ecta;
      if (i == 2) ect = ectb;

      const xh: number = -ec / (-ec + ect);
      const x: number = +xh * h; // neutral axis depth
      const chi: number = -ec / x;
      const ex: number = (+h / 2 - x) * chi; // epsilon @ centroid level
      //console.log("MChi_ec > x", i, beta, x);

      // Concrete

      newObj = Object.assign(newObj, { yn: +x, ex: +ex, chi: +chi });
      //console.log("MChi_ec > newObj", newObj);
      //const { Nc, Mc } = this.NcyMcy(newObj);
      const Nc: number = -beta * Fc * bw * (x > h ? +h : +x);
      const Mc: number = Nc * (kappa * (x > h ? +h : +x) - h / 2);
      //console.log("MChi_ec > Nc, Mc", Nc, Mc, Nc0, Mc0);

      // Rebar
      let Ns: number = 0,
        Ms: number = 0;
      for (let j: number = 0; j < AsList.length; j++) {
        const { y, As }: any = AsList[j];

        const esj: number = ex + chi * y;
        const ssj: number =
          Math.sign(esj) * Math.min((Es * Math.abs(esj)) / 1000, Fy);
        const Nsj: number = ssj * As;

        Ns += Nsj;
        Ms += Nsj * y;
      }
      const erri: number = Ne - (Nc + Ns);

      if (i == 1) fa = erri;
      if (i == 2) {
        fb = erri;

        fafb = Math.sign(fa * fb);
        if (fafb > -1) break;
      }
      if (i > 2) {
        if (fa * erri > 0) {
          ecta = ect;
          fa = erri;
        } else {
          ectb = ect;
          fb = erri;
        }
      }

      mchi = {
        ec: ec,
        ex: ex,
        ect: ect,
        x: x,
        fafb: fafb,
        //fb: fb,
        erri: erri,
        chi: chi / 1000,
        Mi: Mc + Ms,
      };
    }

    return mchi;
  };

  // strips // I obj
  strips = (obj: any = this.obj) => {
    //console.log("RCobj > strips", obj);

    const { yn, TopCover, BotCover, bw, h, Bt, tt, Bb, tb }: any = obj;
    //const yn = "yn" in obj ? (+obj.yn > +h ? +h : +obj.yn) : +h;
    //console.log("RCobj > strips > yn", yn);

    const hw = h - (tt + tb);

    const apolt = +Bt * tt,
      apolw = +bw * hw,
      apolb = +Bb * tb;

    // centroid depth from the top
    const yg =
      ((apolt * tt) / 2 + apolw * (tt + hw / 2) + apolb * (h - tb / 2)) /
      (apolt + apolw + apolb);

    // boundaries
    let constrains = [0, +tt, +tt + hw, +h];
    if (+yn < +h) constrains.push(+yn);
    const yConstrains = [...new Set(constrains.sort())];

    // couple of boundaries
    let yRanges: Array<Array<number>> = [];
    for (let i = 0; i < yConstrains.length - 1; i++) {
      yRanges[i] = [yConstrains[i], yConstrains[i + 1]];
    }

    // lengths
    const yRangesLength: Array<number> = yRanges.map((i) => +i[1] - i[0]);

    // dY
    //const dY: number = Math.min.apply(Math, yRangesLength) / 5;
    const dY: number = Math.min.apply(Math, [+TopCover, +BotCover]) / 2;

    // number of strips for each region of obj
    const nList = yRangesLength.map((i) => Math.floor(i / dY));

    //
    let yList: Array<number> = [],
      y = 0;
    for (let i = 0; i < yRanges.length; i++) {
      const [starti, endi] = yRanges[i];
      const dYi = (+endi - starti) / nList[i];

      y = starti;

      while (y < endi) {
        yList.push(y);
        y += dYi;
      }

      if (i == yRanges.length - 1) yList.push(endi);
    }

    //
    let yListBounds: Array<Array<number>> = [];
    for (let i = 0; i < yList.length - 1; i++) {
      yListBounds[i] = [yList[i], yList[i + 1]];
    }

    //
    //const yListCentroid: Array<number> = yListBounds.map(
    //(i) => (+i[1] + i[0]) / 2
    //);

    //
    const AcyList: Array<any> = yListBounds.map((i) => {
      const y = (+i[1] + i[0]) / 2; // centroid of strip
      const height = +i[1] - i[0];
      const width =
        y >= 0 && y <= tt
          ? +Bt
          : y > tt && y <= +tt + hw
          ? +bw
          : y > +tt + hw && y <= h
          ? Bb
          : 0;
      return { y1: +i[0], y2: +i[1], y: y, Ac: width * height };
    });
    //const Ag: number = AcyList.map((i) => i.Ac).reduce((a, b) => a + b, 0);

    //return [yg, dY, AcyList];
    return { yg: +yg, yn: +yn, dY: +dY, AcyList: AcyList };
  };

  // Nc and Mc
  NcyMcy = (obj: any = this.obj) => {
    //console.log("RCobj > NcyMcy", obj);

    const { yg, AcyList } = this.strips(obj);

    const { ex, chi }: any = obj;
    //console.log("RCobj > NcyMcy", { ex, chi });

    let Nc: number = 0,
      Mc: number = 0;
    for (let j: number = 0; j < AcyList.length; j++) {
      const { y, Ac }: any = AcyList[j];

      const ecj: number = ex + chi * (y - yg);
      const scj =
        ecj >= 0 // tension
          ? 0
          : this.Concrete[obj.ConcCurve]({
              ec: ecj,
              Fc: obj.Fc,
              ec0: obj.ec0,
              ecu: obj.ecu,
            });
      //console.log("RCobj > y, ecj, scj", y, ecj, scj);
      const Ncj: number = -scj * Ac;

      Nc += Ncj;
      Mc += Ncj * (y - yg);
    }

    return { Nc: Nc, Mc: Mc };
  };
}

// RTIO
class RTIO {
  Concrete: any;
  Rebar: any;
  Tendon: any;
  FRPbar: any;
  obj: any;

  constructor(
    Concrete: any = null,
    Rebar: any = null,
    Tendon: any = null,
    FRPbar: any = null
  ) {
    this.Concrete = new Concrete();
    this.Rebar = new Rebar();
    this.Tendon = new Tendon();
    this.FRPbar = new FRPbar();

    // default object values
    // N, mm
    this.obj = {
      ec: -1 / 10,
      ect: 10,
      ecmin: -1 / 1000,
      ec0: 2,
      ecu: 3.5,
      Fc: 20,
      ConcCurve: "ParabolaRettangolo",
      //AsList: [],
      Fy: 450,
      Es: 210000,
      esu: 10,
      RebarCurve: "ElastoPlastico",
      Shape: "I",
      bw: 300,
      h: 600,
      Bt: 600,
      tt: 100,
      Bb: 400,
      tb: 100,
      TopCover: 40,
      BotCover: 40,
      Ne: 0 * Math.pow(10, 3),
    };
  }

  // centroid coordinates from the top left (svg reference system)
  centroid = (obj: any = this.obj) => {
    //console.log("RTIO > centroid", obj);
    const {
      Shape,
      t2,
      t3,
      tf,
      tw,
      t2b,
      tfb,
      B1,
      B2,
      T1,
      D1,
      D2,
      D3,
      D5,
      D6,
    }: {
      Shape: string;
      t2: number;
      t3: number;
      tf: number;
      tw: number;
      t2b: number;
      tfb: number;
      B1: number;
      B2: number;
      T1: number;
      D1: number;
      D2: number;
      D3: number;
      D5: number;
      D6: number;
    } = obj;

    // Rectangular, Box/Tube
    let Xg: number = +t2 / 2,
      Yg: number = +t3 / 2;

    if ("Tee" == Shape) {
      const hw = t3 - tf;

      const apolt = +t2 * tf,
        apolw = +tw * hw;

      //Xg = +t2 / 2;
      Yg = ((apolt * tf) / 2 + apolw * (tf + hw / 2)) / (apolt + apolw);
    }

    if ("I/Wide Flange" == Shape) {
      const hw = t3 - (tf + tfb);

      const apolt = +t2 * tf,
        apolw = +tw * hw;
      const apolb = +t2b * tfb;

      //Xg = +t2 / 2;
      Yg =
        ((apolt * tf) / 2 + apolw * (tf + hw / 2) + apolb * (t3 - tfb / 2)) /
        (apolt + apolw + apolb);
    }

    // t3 = De : external diameter
    if (["Circle", "Pipe"].includes(Shape)) {
      Xg = +t3 / 2;
      Yg = +t3 / 2;
    }

    // PC Conc I Girder
    if ("PC Conc I Girder" == Shape) {
      const Dw = D1 - (D2 + D3 + D5 + D6);

      const at = +B1 * (D2 + D3),
        at2 = ((B1 - T1) * D3) / 2;
      const aw = +T1 * Dw;
      const ab = +B2 * (D5 + D6),
        ab2 = ((B2 - T1) * D6) / 2;

      Xg = +B1 / 2;
      Yg =
        ((at * (D2 + D3)) / 2 -
          at2 * (D2 + (2 * D3) / 3) +
          aw * (D2 + D3 + Dw / 2) +
          ab * (D1 - (D5 + D6) / 2) -
          ab2 * (D1 - D5 - (2 * D6) / 3)) /
        (at - at2 + aw + ab - ab2);
    }

    //console.log("RTIO > centroid", { Xg: Xg, Yg: Yg });
    return { Xg: Xg, Yg: Yg };
  };

  // coordinates of strips in Gxy (centroidal reference system)
  strips = (obj: any = this.obj) => {
    const {
      Shape,
      ConcBeam,
      ConcCol,
      t2,
      t3,
      tw,
      tf,
      t2b,
      tfb,
      B1,
      B2,
      T1,
      D1,
      D2,
      D3,
      D5,
      D6,
      Cover,
      TopCover,
      BotCover,
    }: {
      Shape: string;
      ConcBeam: string;
      ConcCol: string;
      t2: number;
      t3: number;
      tw: number;
      tf: number;
      t2b: number;
      tfb: number;
      B1: number;
      B2: number;
      T1: number;
      D1: number;
      D2: number;
      D3: number;
      D5: number;
      D6: number;
      Cover: number;
      TopCover: number;
      BotCover: number;
    } = obj;

    // centroid coordinates from the top left (svg reference system)
    const { Xg, Yg }: { Xg: number; Yg: number } = this.centroid(obj);
    const dginf: number = ("PC Conc I Girder" == Shape ? +D1 : +t3) - Yg;

    // x from left to right, y from top to bottom
    //const X0 = -Xg, Y0 = -Yg;

    let xstrips: Array<strip> = [],
      ystrips: Array<strip> = [],
      rectangles: Array<Array<coord>> = [],
      trapezoids: Array<Array<coord>> = [],
      dx: number = 10,
      dy: number = 10,
      dxy: number = 10;

    // strip's thickness
    if (ConcBeam == "Yes") dx = dy = dxy = Math.min(TopCover, BotCover) / 2;
    if (ConcCol == "Yes") dx = dy = dxy = Cover / 2;

    // Rectangular, Tee, I/Wide Flange, Box/Tube

    // rectangles
    if (Shape == "Rectangular")
      rectangles = [
        [
          { x: 0, y: t3 },
          { x: 0, y: 0 },
          { x: t2, y: 0 },
          { x: t2, y: t3 },
        ],
      ];

    if (Shape == "Tee") {
      const hw: number = t3 - tf;
      rectangles = [
        [
          { x: 0, y: t3 },
          { x: 0, y: hw },
          { x: t2, y: hw },
          { x: t2, y: t3 },
        ],
        [
          { x: (t2 - tw) / 2, y: hw },
          { x: (t2 - tw) / 2, y: 0 },
          { x: (t2 + tw) / 2, y: 0 },
          { x: (t2 + tw) / 2, y: hw },
        ],
      ];
    }

    if (Shape == "I/Wide Flange") {
      const hw: number = t3 - (tf + tfb);
      rectangles = [
        [
          { x: 0, y: t3 },
          { x: 0, y: t3 - tf },
          { x: t2, y: t3 - tf },
          { x: t2, y: t3 },
        ],
        [
          { x: (t2 - tw) / 2, y: tfb + hw },
          { x: (t2 - tw) / 2, y: tfb },
          { x: (t2 + tw) / 2, y: tfb },
          { x: (t2 + tw) / 2, y: tfb + hw },
        ],
        [
          { x: (t2 - tw) / 2 - (t2b - tw) / 2, y: tfb },
          { x: (t2 - tw) / 2 - (t2b - tw) / 2, y: 0 },
          { x: (t2 - tw) / 2 + (t2b + tw) / 2, y: 0 },
          { x: (t2 - tw) / 2 + (t2b + tw) / 2, y: tfb },
        ],
      ];
    }

    if (Shape == "Box/Tube") {
      //const hw: number = t3 - 2 * tf;
      rectangles = [
        [
          { x: 0, y: t3 },
          { x: 0, y: t3 - tf },
          { x: t2, y: t3 - tf },
          { x: t2, y: t3 },
        ],
        [
          { x: 0, y: t3 - tf },
          { x: 0, y: tf },
          { x: tw, y: tf },
          { x: tw, y: t3 - tf },
        ],
        [
          { x: t2 - tw, y: t3 - tf },
          { x: t2 - tw, y: tf },
          { x: t2, y: tf },
          { x: t2, y: t3 - tf },
        ],
        [
          { x: 0, y: tf },
          { x: 0, y: 0 },
          { x: t2, y: 0 },
          { x: t2, y: tf },
        ],
      ];
    }

    if (Shape == "PC Conc I Girder") {
      const Dw: number = +D1 - (D2 + D3 + D5 + D6);

      rectangles = [
        [
          { x: 0, y: +D1 },
          { x: 0, y: +D1 - D2 },
          { x: +B1, y: +D1 - D2 },
          { x: +B1, y: +D1 },
        ],
        [
          { x: (+B1 - T1) / 2, y: +D5 + D6 + Dw },
          { x: (+B1 - T1) / 2, y: +D5 + D6 },
          { x: (+B1 + T1) / 2, y: +D5 + D6 },
          { x: (+B1 + T1) / 2, y: +D5 + D6 + Dw },
        ],
        [
          { x: (+B1 - T1) / 2 - (+B2 - T1) / 2, y: +D5 },
          { x: (+B1 - T1) / 2 - (+B2 - T1) / 2, y: 0 },
          { x: (+B1 - T1) / 2 + (+B2 + T1) / 2, y: 0 },
          { x: (+B1 - T1) / 2 + (+B2 + T1) / 2, y: +D5 },
        ],
      ];

      trapezoids = [
        [
          { x: 0, y: D1 - D2 },
          { x: (B1 - T1) / 2, y: D1 - D2 - D3 },
          { x: (B1 + T1) / 2, y: D1 - D2 - D3 },
          { x: B1, y: D1 - D2 },
        ],
        [
          { x: (B1 - T1) / 2, y: D5 + D6 },
          { x: (B1 - T1) / 2 - (B2 - T1) / 2, y: D5 },
          { x: (B1 - T1) / 2 + (B2 + T1) / 2, y: D5 },
          { x: (B1 + T1) / 2, y: D5 + D6 },
        ],
      ];
    }

    // rectangles > strips
    for (const i in rectangles) {
      const [p1, p2, p3, p4] = rectangles[i];
      const width: number = Math.hypot(p3.x - p2.x, p3.y - p2.y);
      const height: number = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      //console.log(width, height);
      //if (!(width > 0)) break;
      //if (!(height > 0)) break;

      const nx = width > dx ? Math.floor(width / dx) : 1;
      const ny = height > dy ? Math.floor(height / dy) : 1;

      // x
      const dxk: number = width / nx;
      const axk: number = dxk * height;
      const yk: number = (p3.y + p4.y) / 2;
      for (let k = 0; k < nx; k++) {
        const xk = p2.x + k * dxk;
        xstrips.push({ x: xk + dxk / 2, y: yk, a: axk });
      }

      // y
      const dyk: number = height / ny;
      const ayk: number = width * dyk;
      const xk: number = (p2.x + p3.x) / 2;
      for (let k = 0; k < ny; k++) {
        const yk = p2.y + k * dyk;
        ystrips.push({ x: xk, y: yk + dyk / 2, a: ayk });
      }
    }

    // trapezoids > strips
    for (const i in trapezoids) {
      const [p1, p2, p3, p4] = trapezoids[i];
      //console.log(+p1.y, p2.y);
      const Bti: number = +p4.x - p1.x;
      const Bbi: number = +p3.x - p2.x;
      const width: number = Math.max(+Bti, +Bbi);
      const height: number = Math.abs(+p1.y - p2.y);
      //console.log(Bti, Bbi, width, height);
      if (!(height > 0)) break;

      //
      const nx = +width > dx ? Math.floor(width / dx) : 1;
      const ny = +height > dy ? Math.floor(height / dy) : 1;

      // x
      const dxi: number = width / nx;
      const dbi: number = (width - Math.min(Bti, Bbi)) / 2;
      let xi: number = Bbi > Bti ? p2.x : p1.x;
      for (let k = 0; k < nx; k++) {
        const xk = dxi / 2 + k * dxi;

        const hk: number =
          xk < dbi
            ? height * (xk / dbi)
            : xk > width - dbi
            ? (height * (width - xk)) / dbi
            : height;

        const yk: number = Bbi > Bti ? +p2.y + hk / 2 : +p1.y - hk / 2;
        //const axk: number = dxi * hk;

        xstrips.push({ x: xi + xk, y: yk, a: dxi * hk });
      }

      // y
      xi = (p2.x + p3.x) / 2;
      const dyi: number = +height / ny;
      for (let k = 0; k < ny; k++) {
        const yk: number = +p2.y + dyi / 2 + k * dyi;
        const dbk: number = ((Bbi - Bti) * (dyi / 2 + k * dyi)) / height;
        const bk: number = Bbi - dbk;
        //const ayk: number = bk * dyi;
        //console.log(yk, dbk, bk, ayk);

        ystrips.push({ x: xi, y: yk, a: bk * dyi });
      }
    }

    // Circle, Pipe
    if (["Circle", "Pipe"].includes(Shape)) {
      xstrips = [];
      ystrips = [];

      const nxy: number = +t3 > dxy ? Math.floor(+t3 / dxy) : 1;

      const dxyk: number = +t3 / nxy;
      for (let k = 0; k < nxy; k++) {
        // x => y
        const xk: number = Xg + t3 / 2 - k * dxyk - dxyk / 2;
        const y1k: number =
          dginf - Math.sqrt((+t3 / 2) * (+t3 / 2) - (+xk - Xg) * (+xk - Xg));
        const y2k: number =
          dginf + Math.sqrt((+t3 / 2) * (+t3 / 2) - (+xk - Xg) * (+xk - Xg));
        let hk: number = y2k - y1k;

        // Pipe
        if (Xg - (t3 - tw) / 2 <= xk && xk <= Xg + (t3 - tw) / 2) {
          const y1k: number =
            dginf -
            Math.sqrt(
              ((+t3 - tw) / 2) * ((+t3 - tw) / 2) - (+xk - Xg) * (+xk - Xg)
            );
          const y2k: number =
            dginf +
            Math.sqrt(
              ((+t3 - tw) / 2) * ((+t3 - tw) / 2) - (+xk - Xg) * (+xk - Xg)
            );
          hk -= y2k - y1k;
        }

        xstrips.push({ x: xk, y: dginf, a: dxyk * hk });

        // switch x ed y
        //  Xg == dginf
        ystrips.push({ x: Xg, y: xk, a: dxyk * hk });
      }
    }

    // x from right to left, y from bottom to top
    xstrips = xstrips.map((s: strip) => {
      return {
        x: -s.x + Xg,
        y: s.y - dginf,
        a: s.a,
      };
    });
    ystrips = ystrips.map((s: strip) => {
      return {
        x: s.x - Xg,
        y: s.y - dginf,
        a: s.a,
      };
    });

    return { xstrips: xstrips, ystrips: ystrips };
  };

  // coordinates of rebars in Gxy (centroidal reference system)
  rebars = (obj: any = this.obj) => {
    //console.log("Rebars > obj", obj);
    const {
      Shape,
      ConcBeam,
      ConcCol,
      t2,
      t3,
      tw,
      tf,
      t2b,
      B1,
      B2,
      D1,
      BarSizeC,
      BarSizeL,
      Cover,
      TopCover,
      BotCover,
      TopRebarArea,
      BotRebarArea,
      Rebar,
    }: {
      Shape: string;
      ConcBeam: string;
      ConcCol: string;
      t2: number;
      t3: number;
      tw: number;
      tf: number;
      t2b: number;
      B1: number;
      B2: number;
      D1: number;
      BarSizeC: number;
      BarSizeL: number;
      Cover: number;
      TopCover: number;
      BotCover: number;
      TopRebarArea: number;
      BotRebarArea: number;
      Rebar: Array<any>;
    } = obj;

    if (Shape == "PC Conc I Girder") return [];

    // centroid coordinates from the top left (svg reference system)
    const { Xg, Yg } = this.centroid(obj);

    // x from left to right, y from top to bottom
    const X0 = -Xg,
      Y0 = -Yg;

    let rebars: Array<rebar> = [],
      dx: number = 0,
      dy: number = 0;

    // Beam
    if (ConcBeam == "Yes") {
      const Cover = Math.min(TopCover, BotCover);

      const TopRebarRadius: number = Math.sqrt(+TopRebarArea / Math.PI);
      const TopRebarNumber =
        "TopRebarNumber" in obj ? Number(obj.TopRebarNumber) : 2;
      const BotRebarRadius: number = Math.sqrt(+BotRebarArea / Math.PI);
      const BotRebarNumber =
        "BotRebarNumber" in obj ? Number(obj.BotRebarNumber) : 2;

      dx =
        TopRebarNumber > 1
          ? (t2 - 2 * Cover - 2 * BarSizeC - 2 * TopRebarRadius) /
            (+TopRebarNumber - 1)
          : 0;
      for (let i = 0; i < +TopRebarNumber; i++) {
        rebars.push({
          x: X0 + Cover + BarSizeC + TopRebarRadius + i * dx,
          y: Y0 + TopCover + BarSizeC + TopRebarRadius,
          a: TopRebarArea,
        });
      }

      // Rectangular
      if (Shape == "Rectangular") {
        dx =
          BotRebarNumber > 1
            ? (+t2 - 2 * Cover - 2 * BotRebarRadius - 2 * BarSizeC) /
              (BotRebarNumber - 1)
            : 0;
        for (let i = 0; i < +BotRebarNumber; i++) {
          rebars.push({
            x: X0 + Cover + BarSizeC + BotRebarRadius + i * dx,
            y: Y0 + t3 - BotCover - BarSizeC - BotRebarRadius,
            a: BotRebarArea,
          });
        }
      }

      // Tee
      if (Shape == "Tee") {
        dx =
          BotRebarNumber > 1
            ? (+tw - 2 * Cover - 2 * BotRebarRadius - 2 * BarSizeC) /
              (BotRebarNumber - 1)
            : 0;
        for (let i = 0; i < +BotRebarNumber; i++) {
          rebars.push({
            x: X0 + (t2 - tw) / 2 + Cover + BarSizeC + BotRebarRadius + i * dx,
            y: Y0 + t3 - BotCover - BarSizeC - BotRebarRadius,
            a: BotRebarArea,
          });
        }
      }

      // I/Wide Flange
      if (Shape == "I/Wide Flange") {
        dx =
          BotRebarNumber > 1
            ? (+t2b - 2 * Cover - 2 * BotRebarRadius - 2 * BarSizeC) /
              (BotRebarNumber - 1)
            : 0;
        for (let i = 0; i < +BotRebarNumber; i++) {
          rebars.push({
            x: X0 + (t2 - t2b) / 2 + Cover + BarSizeC + BotRebarRadius + i * dx,
            y: Y0 + t3 - BotCover - BarSizeC - BotRebarRadius,
            a: BotRebarArea,
          });
        }
      }

      // PC Conc I Girder
      if (Shape == "PC Conc I Girder") {
        rebars = [];

        // top
        dx =
          TopRebarNumber > 1
            ? (+B1 - 2 * Cover - 2 * BarSizeC - 2 * TopRebarRadius) /
              (+TopRebarNumber - 1)
            : 0;
        for (let i = 0; i < +TopRebarNumber; i++) {
          rebars.push({
            x: X0 + Cover + BarSizeC + TopRebarRadius + i * dx,
            y: Y0 + TopCover + BarSizeC + TopRebarRadius,
            a: TopRebarArea,
          });
        }

        // bottom
        dx =
          +BotRebarNumber > 1
            ? (+B2 - 2 * Cover - 2 * BotRebarRadius - 2 * BarSizeC) /
              (+BotRebarNumber - 1)
            : 0;
        for (let i = 0; i < +BotRebarNumber; i++) {
          rebars.push({
            x: X0 + (B1 - B2) / 2 + Cover + BarSizeC + BotRebarRadius + i * dx,
            y: Y0 + D1 - BotCover - BarSizeC - BotRebarRadius,
            a: BotRebarArea,
          });
        }
      }
    }

    // Column
    if (ConcCol == "Yes") {
      const Radius: number = +BarSizeL / 2;
      const Area: number = Math.PI * Radius * Radius;
      const NumBars2Dir =
        "NumBars2Dir" in obj
          ? +obj.NumBars2Dir == 1
            ? 2
            : +obj.NumBars2Dir
          : 2;
      const NumBars3Dir =
        "NumBars3Dir" in obj
          ? +obj.NumBars3Dir == 1
            ? 2
            : +obj.NumBars3Dir
          : 2;

      dx =
        NumBars2Dir > 1
          ? (+t2 - 2 * Cover - 2 * Radius - 2 * BarSizeC) / (NumBars2Dir - 1)
          : 0;
      for (let i = 0; i < +NumBars2Dir; i++) {
        rebars.push({
          x: X0 + Cover + BarSizeC + Radius + i * dx,
          y: Y0 + Cover + BarSizeC + Radius,
          a: Area,
        });
        rebars.push({
          x: X0 + Cover + BarSizeC + Radius + i * dx,
          y: Y0 + t3 - (Cover + BarSizeC + Radius),
          a: Area,
        });
      }

      dy =
        NumBars3Dir > 1
          ? (+t3 - 2 * Cover - 2 * Radius - 2 * BarSizeC) / (+NumBars3Dir - 1)
          : 0;
      for (let i = 1; i < +NumBars3Dir - 1; i++) {
        rebars.push({
          x: X0 + Cover + BarSizeC + Radius,
          y: Y0 + Cover + BarSizeC + Radius + i * dy,
          a: Area,
        });
        rebars.push({
          x: X0 + t2 - Cover - BarSizeC - Radius,
          y: Y0 + Cover + BarSizeC + Radius + i * dy,
          a: Area,
        });
      }

      // Box/Tube
      if (Shape == "Box/Tube") {
        rebars = [];

        // top left
        rebars.push({
          x: X0 + Cover + BarSizeC + Radius,
          y: Y0 + Cover + BarSizeC + Radius,
          a: Area,
        });

        rebars.push({
          x: X0 + tw - (Cover + BarSizeC + Radius),
          y: Y0 + Cover + BarSizeC + Radius,
          a: Area,
        });

        rebars.push({
          x: X0 + Cover + BarSizeC + Radius,
          y: Y0 + tf - (Cover + BarSizeC + Radius),
          a: Area,
        });

        rebars.push({
          x: X0 + tw - (Cover + BarSizeC + Radius),
          y: Y0 + tf - (Cover + BarSizeC + Radius),
          a: Area,
        });

        // bottom left
        rebars.push({
          x: X0 + Cover + BarSizeC + Radius,
          y: Y0 + t3 - (Cover + BarSizeC + Radius),
          a: Area,
        });

        rebars.push({
          x: X0 + tw - (Cover + BarSizeC + Radius),
          y: Y0 + t3 - (Cover + BarSizeC + Radius),
          a: Area,
        });

        rebars.push({
          x: X0 + Cover + BarSizeC + Radius,
          y: Y0 + t3 - tf + (Cover + BarSizeC + Radius),
          a: Area,
        });

        rebars.push({
          x: X0 + tw - (Cover + BarSizeC + Radius),
          y: Y0 + t3 - tf + (Cover + BarSizeC + Radius),
          a: Area,
        });

        // top right
        rebars.push({
          x: X0 + t2 - (Cover + BarSizeC + Radius),
          y: Y0 + Cover + BarSizeC + Radius,
          a: Area,
        });

        rebars.push({
          x: X0 + t2 - tw + (Cover + BarSizeC + Radius),
          y: Y0 + Cover + BarSizeC + Radius,
          a: Area,
        });

        rebars.push({
          x: X0 + t2 - (Cover + BarSizeC + Radius),
          y: Y0 + tf - (Cover + BarSizeC + Radius),
          a: Area,
        });

        rebars.push({
          x: X0 + t2 - tw + (Cover + BarSizeC + Radius),
          y: Y0 + tf - (Cover + BarSizeC + Radius),
          a: Area,
        });

        // bottom right
        rebars.push({
          x: X0 + t2 - (Cover + BarSizeC + Radius),
          y: Y0 + t3 - (Cover + BarSizeC + Radius),
          a: Area,
        });

        rebars.push({
          x: X0 + t2 - tw + (Cover + BarSizeC + Radius),
          y: Y0 + t3 - (Cover + BarSizeC + Radius),
          a: Area,
        });

        rebars.push({
          x: X0 + t2 - (Cover + BarSizeC + Radius),
          y: Y0 + t3 - tf + (Cover + BarSizeC + Radius),
          a: Area,
        });

        rebars.push({
          x: X0 + t2 - tw + (Cover + BarSizeC + Radius),
          y: Y0 + t3 - tf + (Cover + BarSizeC + Radius),
          a: Area,
        });

        // X
        dx = NumBars2Dir > 1 ? (+t2 - 2 * tw) / (NumBars2Dir - 1) : 0;
        for (let i = 0; i < +NumBars2Dir; i++) {
          rebars.push({
            x: X0 + tw + i * dx,
            y: Y0 + Cover + BarSizeC + Radius,
            a: Area,
          });
          rebars.push({
            x: X0 + tw + i * dx,
            y: Y0 + tf - (Cover + BarSizeC + Radius),
            a: Area,
          });
          rebars.push({
            x: X0 + tw + i * dx,
            y: Y0 + t3 - tf + (Cover + BarSizeC + Radius),
            a: Area,
          });
          rebars.push({
            x: X0 + tw + i * dx,
            y: Y0 + t3 - (Cover + BarSizeC + Radius),
            a: Area,
          });
        }

        // Y
        dy = NumBars3Dir > 1 ? (+t3 - 2 * tf) / (+NumBars3Dir - 1) : 0;
        for (let i = 0; i < +NumBars3Dir; i++) {
          rebars.push({
            x: X0 + Cover + BarSizeC + Radius,
            y: Y0 + tf + i * dy,
            a: Area,
          });
          rebars.push({
            x: X0 + tw - (Cover + BarSizeC + Radius),
            y: Y0 + tf + i * dy,
            a: Area,
          });
          rebars.push({
            x: X0 + t2 - (Cover + BarSizeC + Radius),
            y: Y0 + tf + i * dy,
            a: Area,
          });
          rebars.push({
            x: X0 + t2 - tw + (Cover + BarSizeC + Radius),
            y: Y0 + tf + i * dy,
            a: Area,
          });
        }
      }

      if (Shape == "Circle") {
        rebars = [];

        const Radius3: number = +t3 / 2;

        // external
        let q = 0,
          dq = NumBars3Dir > 0 ? 360 / +NumBars3Dir : 360;
        //console.log(NumBars3Dir, dq);

        while (q < 360 && NumBars3Dir > 0) {
          //console.log(q);
          const s: number = Math.sin((q * Math.PI) / 180);
          const c: number = Math.cos((q * Math.PI) / 180);

          rebars.push({
            x: X0 + Radius3 + (Radius3 - Cover - BarSizeC - Radius) * c,
            y: Y0 + Radius3 + (Radius3 - Cover - BarSizeC - Radius) * s,
            a: Area,
          });

          q += dq;
        }

        // internal
        q = 0;
        dq = NumBars2Dir > 0 ? 360 / +NumBars2Dir : 360;

        while (q < 360 && NumBars2Dir > 0) {
          const s: number = Math.sin((q * Math.PI) / 180);
          const c: number = Math.cos((q * Math.PI) / 180);

          rebars.push({
            x: X0 + Radius3 + (Cover + BarSizeC + Radius) * c,
            y: Y0 + Radius3 + (Cover + BarSizeC + Radius) * s,
            a: Area,
          });

          q += dq;
        }
      }

      if (Shape == "Pipe") {
        rebars = [];

        const Radius3: number = +t3 / 2;
        const Radius2: number = +t3 / 2 - tw;

        // external
        let q = 0,
          dq = NumBars3Dir > 0 ? 360 / +NumBars3Dir : 360;
        //console.log(NumBars3Dir, dq);

        while (q < 360 && NumBars3Dir > 0) {
          //console.log(q);
          const s: number = Math.sin((q * Math.PI) / 180);
          const c: number = Math.cos((q * Math.PI) / 180);

          rebars.push({
            x: X0 + Radius3 + (Radius3 - Cover - BarSizeC - Radius) * c,
            y: Y0 + Radius3 + (Radius3 - Cover - BarSizeC - Radius) * s,
            a: Area,
          });

          q += dq;
        }

        // internal
        q = 0;
        dq = NumBars2Dir > 0 ? 360 / +NumBars2Dir : 360;

        while (q < 360 && NumBars2Dir > 0) {
          const s: number = Math.sin((q * Math.PI) / 180);
          const c: number = Math.cos((q * Math.PI) / 180);

          rebars.push({
            x: X0 + Radius3 + (Radius2 + Cover + BarSizeC + Radius) * c,
            y: Y0 + Radius3 + (Radius2 + Cover + BarSizeC + Radius) * s,
            a: Area,
          });

          q += dq;
        }
      }
    }

    // Rebar
    for (const rebar of Rebar) {
      rebars.push({
        x: X0 + rebar.X,
        y: Y0 + t3 - rebar.Y,
        a: rebar.Area,
      });
    }

    // x from right to left, y from bottom to top
    return rebars.map((rb: rebar) => {
      return {
        x: -rb.x,
        y: -rb.y,
        a: rb.a,
      };
    });

    //return rebars;
  };

  // coordinates of tendons in Gxy (centroidal reference system)
  tendons = (obj: any = this.obj) => {
    const { Shape, D1 }: { Shape: string; D1: number } = obj;

    if (Shape != "PC Conc I Girder") return [];

    // get list of tendons
    const SectionTendons =
      "Frame Props 15 - Tendon Loc" in obj
        ? obj["Frame Props 15 - Tendon Loc"]
        : [];

    // centroid coordinates from the top left (svg reference system)
    const { Yg }: { Yg: number } = this.centroid(obj);

    // x from left to right, y from top to bottom
    const Y0: number = -Yg;

    let tendons: Array<tendon> = [];
    for (const tendon of SectionTendons) {
      tendons.push({
        x: 0,
        y: Y0 + D1 - tendon.Y,
        a: tendon.Area,
        d: tendon.Deps,
      });
    }

    // x from right to left, y from bottom to top
    return tendons.map((t: tendon) => {
      return {
        x: -t.x,
        y: -t.y,
        a: t.a,
        d: t.d,
      };
    });

    //return tendons;
  };

  // coordinates of FRPbars in Gxy (centroidal reference system)
  FRPbars = (obj: any = this.obj) => {
    //console.log("RCsection > FRPbars", obj);
    const {
      Shape,
      ConcBeam,
      ConcCol,
      t2,
      t3,
      tw,
      tf,
      t2b,
      B1,
      B2,
      D1,
      FRPBarSizeC,
      FRPBarSizeL,
      Cover,
      TopCover,
      BotCover,
      TopFRPbarArea,
      BotFRPbarArea,
      FRPbar,
    }: {
      Shape: string;
      ConcBeam: string;
      ConcCol: string;
      t2: number;
      t3: number;
      tw: number;
      tf: number;
      t2b: number;
      B1: number;
      B2: number;
      D1: number;
      FRPBarSizeC: number;
      FRPBarSizeL: number;
      Cover: number;
      TopCover: number;
      BotCover: number;
      TopFRPbarArea: number;
      BotFRPbarArea: number;
      FRPbar: Array<any>;
    } = obj;

    if (Shape == "PC Conc I Girder") return [];

    // centroid coordinates from the top left (svg reference system)
    const { Xg, Yg } = this.centroid(obj);

    // x from left to right, y from top to bottom
    const X0 = -Xg,
      Y0 = -Yg;

    let FRPbars: Array<FRPbar> = [],
      dx: number = 0,
      dy: number = 0;

    // Beam
    if (ConcBeam == "Yes") {
      const Cover = Math.min(TopCover, BotCover);

      const TopFRPbarRadius: number = Math.sqrt(+TopFRPbarArea / Math.PI);
      const TopFRPbarNumber =
        "TopFRPbarNumber" in obj ? Number(obj.TopFRPbarNumber) : 2;
      const BotFRPbarRadius: number = Math.sqrt(+BotFRPbarArea / Math.PI);
      const BotFRPbarNumber =
        "BotFRPbarNumber" in obj ? Number(obj.BotFRPbarNumber) : 2;

      dx =
        TopFRPbarNumber > 1
          ? (t2 - 2 * Cover - 2 * FRPBarSizeC - 2 * TopFRPbarRadius) /
            (+TopFRPbarNumber - 1)
          : 0;
      for (let i = 0; i < +TopFRPbarNumber; i++) {
        if (TopFRPbarArea > 0)
          FRPbars.push({
            x: X0 + Cover + FRPBarSizeC + TopFRPbarRadius + i * dx,
            y: Y0 + TopCover + FRPBarSizeC + TopFRPbarRadius,
            a: TopFRPbarArea,
          });
      }

      // Rectangular
      if (Shape == "Rectangular") {
        dx =
          BotFRPbarNumber > 1
            ? (+t2 - 2 * Cover - 2 * BotFRPbarRadius - 2 * FRPBarSizeC) /
              (BotFRPbarNumber - 1)
            : 0;
        for (let i = 0; i < +BotFRPbarNumber; i++) {
          if (BotFRPbarArea > 0)
            FRPbars.push({
              x: X0 + Cover + FRPBarSizeC + BotFRPbarRadius + i * dx,
              y: Y0 + t3 - BotCover - FRPBarSizeC - BotFRPbarRadius,
              a: BotFRPbarArea,
            });
        }
      }

      // Tee
      if (Shape == "Tee") {
        dx =
          BotFRPbarNumber > 1
            ? (+tw - 2 * Cover - 2 * BotFRPbarRadius - 2 * FRPBarSizeC) /
              (BotFRPbarNumber - 1)
            : 0;
        for (let i = 0; i < +BotFRPbarNumber; i++) {
          if (BotFRPbarArea > 0)
            FRPbars.push({
              x:
                X0 +
                (t2 - tw) / 2 +
                Cover +
                FRPBarSizeC +
                BotFRPbarRadius +
                i * dx,
              y: Y0 + t3 - BotCover - FRPBarSizeC - BotFRPbarRadius,
              a: BotFRPbarArea,
            });
        }
      }

      // I/Wide Flange
      if (Shape == "I/Wide Flange") {
        dx =
          BotFRPbarNumber > 1
            ? (+t2b - 2 * Cover - 2 * BotFRPbarRadius - 2 * FRPBarSizeC) /
              (BotFRPbarNumber - 1)
            : 0;
        for (let i = 0; i < +BotFRPbarNumber; i++) {
          if (BotFRPbarArea > 0)
            FRPbars.push({
              x:
                X0 +
                (t2 - t2b) / 2 +
                Cover +
                FRPBarSizeC +
                BotFRPbarRadius +
                i * dx,
              y: Y0 + t3 - BotCover - FRPBarSizeC - BotFRPbarRadius,
              a: BotFRPbarArea,
            });
        }
      }

      // PC Conc I Girder
      if (Shape == "PC Conc I Girder") {
        FRPbars = [];

        // top
        dx =
          TopFRPbarNumber > 1
            ? (+B1 - 2 * Cover - 2 * FRPBarSizeC - 2 * TopFRPbarRadius) /
              (+TopFRPbarNumber - 1)
            : 0;
        for (let i = 0; i < +TopFRPbarNumber; i++) {
          if (TopFRPbarArea > 0)
            FRPbars.push({
              x: X0 + Cover + FRPBarSizeC + TopFRPbarRadius + i * dx,
              y: Y0 + TopCover + FRPBarSizeC + TopFRPbarRadius,
              a: TopFRPbarArea,
            });
        }

        // bottom
        dx =
          +BotFRPbarNumber > 1
            ? (+B2 - 2 * Cover - 2 * BotFRPbarRadius - 2 * FRPBarSizeC) /
              (+BotFRPbarNumber - 1)
            : 0;
        for (let i = 0; i < +BotFRPbarNumber; i++) {
          if (BotFRPbarArea > 0)
            FRPbars.push({
              x:
                X0 +
                (B1 - B2) / 2 +
                Cover +
                FRPBarSizeC +
                BotFRPbarRadius +
                i * dx,
              y: Y0 + D1 - BotCover - FRPBarSizeC - BotFRPbarRadius,
              a: BotFRPbarArea,
            });
        }
      }
    }

    // Column
    if (ConcCol == "Yes") {
      const Radius: number = +FRPBarSizeL / 2;
      const Area: number = Math.PI * Radius * Radius;
      const NumFRPBars2Dir =
        "NumFRPBars2Dir" in obj
          ? +obj.NumFRPBars2Dir == 1
            ? 2
            : +obj.NumFRPBars2Dir
          : 2;
      const NumFRPBars3Dir =
        "NumFRPBars3Dir" in obj
          ? +obj.NumFRPBars3Dir == 1
            ? 2
            : +obj.NumFRPBars3Dir
          : 2;

      dx =
        NumFRPBars2Dir > 1
          ? (+t2 - 2 * Cover - 2 * Radius - 2 * FRPBarSizeC) /
            (NumFRPBars2Dir - 1)
          : 0;
      for (let i = 0; i < +NumFRPBars2Dir; i++) {
        if (Area > 0)
          FRPbars.push({
            x: X0 + Cover + FRPBarSizeC + Radius + i * dx,
            y: Y0 + Cover + FRPBarSizeC + Radius,
            a: Area,
          });
        if (Area > 0)
          FRPbars.push({
            x: X0 + Cover + FRPBarSizeC + Radius + i * dx,
            y: Y0 + t3 - (Cover + FRPBarSizeC + Radius),
            a: Area,
          });
      }

      dy =
        NumFRPBars3Dir > 1
          ? (+t3 - 2 * Cover - 2 * Radius - 2 * FRPBarSizeC) /
            (+NumFRPBars3Dir - 1)
          : 0;
      for (let i = 1; i < +NumFRPBars3Dir - 1; i++) {
        if (Area > 0)
          FRPbars.push({
            x: X0 + Cover + FRPBarSizeC + Radius,
            y: Y0 + Cover + FRPBarSizeC + Radius + i * dy,
            a: Area,
          });
        if (Area > 0)
          FRPbars.push({
            x: X0 + t2 - Cover - FRPBarSizeC - Radius,
            y: Y0 + Cover + FRPBarSizeC + Radius + i * dy,
            a: Area,
          });
      }

      // Box/Tube
      if (Shape == "Box/Tube") {
        FRPbars = [];

        if (Area > 0) {
          // top left
          FRPbars.push({
            x: X0 + Cover + FRPBarSizeC + Radius,
            y: Y0 + Cover + FRPBarSizeC + Radius,
            a: Area,
          });

          FRPbars.push({
            x: X0 + tw - (Cover + FRPBarSizeC + Radius),
            y: Y0 + Cover + FRPBarSizeC + Radius,
            a: Area,
          });

          FRPbars.push({
            x: X0 + Cover + FRPBarSizeC + Radius,
            y: Y0 + tf - (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          FRPbars.push({
            x: X0 + tw - (Cover + FRPBarSizeC + Radius),
            y: Y0 + tf - (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          // bottom left
          FRPbars.push({
            x: X0 + Cover + FRPBarSizeC + Radius,
            y: Y0 + t3 - (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          FRPbars.push({
            x: X0 + tw - (Cover + FRPBarSizeC + Radius),
            y: Y0 + t3 - (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          FRPbars.push({
            x: X0 + Cover + FRPBarSizeC + Radius,
            y: Y0 + t3 - tf + (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          FRPbars.push({
            x: X0 + tw - (Cover + FRPBarSizeC + Radius),
            y: Y0 + t3 - tf + (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          // top right
          FRPbars.push({
            x: X0 + t2 - (Cover + FRPBarSizeC + Radius),
            y: Y0 + Cover + FRPBarSizeC + Radius,
            a: Area,
          });

          FRPbars.push({
            x: X0 + t2 - tw + (Cover + FRPBarSizeC + Radius),
            y: Y0 + Cover + FRPBarSizeC + Radius,
            a: Area,
          });

          FRPbars.push({
            x: X0 + t2 - (Cover + FRPBarSizeC + Radius),
            y: Y0 + tf - (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          FRPbars.push({
            x: X0 + t2 - tw + (Cover + FRPBarSizeC + Radius),
            y: Y0 + tf - (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          // bottom right
          FRPbars.push({
            x: X0 + t2 - (Cover + FRPBarSizeC + Radius),
            y: Y0 + t3 - (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          FRPbars.push({
            x: X0 + t2 - tw + (Cover + FRPBarSizeC + Radius),
            y: Y0 + t3 - (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          FRPbars.push({
            x: X0 + t2 - (Cover + FRPBarSizeC + Radius),
            y: Y0 + t3 - tf + (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          FRPbars.push({
            x: X0 + t2 - tw + (Cover + FRPBarSizeC + Radius),
            y: Y0 + t3 - tf + (Cover + FRPBarSizeC + Radius),
            a: Area,
          });

          // X
          dx = NumFRPBars2Dir > 1 ? (+t2 - 2 * tw) / (NumFRPBars2Dir - 1) : 0;
          for (let i = 0; i < +NumFRPBars2Dir; i++) {
            FRPbars.push({
              x: X0 + tw + i * dx,
              y: Y0 + Cover + FRPBarSizeC + Radius,
              a: Area,
            });
            FRPbars.push({
              x: X0 + tw + i * dx,
              y: Y0 + tf - (Cover + FRPBarSizeC + Radius),
              a: Area,
            });
            FRPbars.push({
              x: X0 + tw + i * dx,
              y: Y0 + t3 - tf + (Cover + FRPBarSizeC + Radius),
              a: Area,
            });
            FRPbars.push({
              x: X0 + tw + i * dx,
              y: Y0 + t3 - (Cover + FRPBarSizeC + Radius),
              a: Area,
            });
          }

          // Y
          dy = NumFRPBars3Dir > 1 ? (+t3 - 2 * tf) / (+NumFRPBars3Dir - 1) : 0;
          for (let i = 0; i < +NumFRPBars3Dir; i++) {
            FRPbars.push({
              x: X0 + Cover + FRPBarSizeC + Radius,
              y: Y0 + tf + i * dy,
              a: Area,
            });
            FRPbars.push({
              x: X0 + tw - (Cover + FRPBarSizeC + Radius),
              y: Y0 + tf + i * dy,
              a: Area,
            });
            FRPbars.push({
              x: X0 + t2 - (Cover + FRPBarSizeC + Radius),
              y: Y0 + tf + i * dy,
              a: Area,
            });
            FRPbars.push({
              x: X0 + t2 - tw + (Cover + FRPBarSizeC + Radius),
              y: Y0 + tf + i * dy,
              a: Area,
            });
          }
        } // end if (Area > 0)
      }

      if (Shape == "Circle") {
        FRPbars = [];

        const Radius3: number = +t3 / 2;

        // external
        let q = 0,
          dq = NumFRPBars3Dir > 0 ? 360 / +NumFRPBars3Dir : 360;
        //console.log(NumFRPBars3Dir, dq);

        while (q < 360 && NumFRPBars3Dir > 0) {
          //console.log(q);
          const s: number = Math.sin((q * Math.PI) / 180);
          const c: number = Math.cos((q * Math.PI) / 180);

          if (Area > 0)
            FRPbars.push({
              x: X0 + Radius3 + (Radius3 - Cover - FRPBarSizeC - Radius) * c,
              y: Y0 + Radius3 + (Radius3 - Cover - FRPBarSizeC - Radius) * s,
              a: Area,
            });

          q += dq;
        }

        // internal
        q = 0;
        dq = NumFRPBars2Dir > 0 ? 360 / +NumFRPBars2Dir : 360;

        while (q < 360 && NumFRPBars2Dir > 0) {
          const s: number = Math.sin((q * Math.PI) / 180);
          const c: number = Math.cos((q * Math.PI) / 180);

          if (Area > 0)
            FRPbars.push({
              x: X0 + Radius3 + (Cover + FRPBarSizeC + Radius) * c,
              y: Y0 + Radius3 + (Cover + FRPBarSizeC + Radius) * s,
              a: Area,
            });

          q += dq;
        }
      }

      if (Shape == "Pipe") {
        FRPbars = [];

        const Radius3: number = +t3 / 2;
        const Radius2: number = +t3 / 2 - tw;

        // external
        let q = 0,
          dq = NumFRPBars3Dir > 0 ? 360 / +NumFRPBars3Dir : 360;
        //console.log(NumFRPBars3Dir, dq);

        while (q < 360 && NumFRPBars3Dir > 0) {
          //console.log(q);
          const s: number = Math.sin((q * Math.PI) / 180);
          const c: number = Math.cos((q * Math.PI) / 180);

          if (Area > 0)
            FRPbars.push({
              x: X0 + Radius3 + (Radius3 - Cover - FRPBarSizeC - Radius) * c,
              y: Y0 + Radius3 + (Radius3 - Cover - FRPBarSizeC - Radius) * s,
              a: Area,
            });

          q += dq;
        }

        // internal
        q = 0;
        dq = NumFRPBars2Dir > 0 ? 360 / +NumFRPBars2Dir : 360;

        if (Area > 0)
          while (q < 360 && NumFRPBars2Dir > 0) {
            const s: number = Math.sin((q * Math.PI) / 180);
            const c: number = Math.cos((q * Math.PI) / 180);

            FRPbars.push({
              x: X0 + Radius3 + (Radius2 + Cover + FRPBarSizeC + Radius) * c,
              y: Y0 + Radius3 + (Radius2 + Cover + FRPBarSizeC + Radius) * s,
              a: Area,
            });

            q += dq;
          }
      }
    }

    // FRPbar
    for (const f of FRPbar) {
      FRPbars.push({
        x: X0 + f.X,
        y: Y0 + t3 - f.Y,
        a: f.Area,
      });
    }

    // x from right to left, y from bottom to top
    return FRPbars.map((rb: FRPbar) => {
      return {
        x: -rb.x,
        y: -rb.y,
        a: rb.a,
      };
    });

    //return FRPbars;
  };

  // Nc, Mc
  NcMc = (obj: any = this.obj) => {
    //console.log("RTIO > NcMc", obj);

    const {
      xstrips,
      ystrips,
    }: { xstrips: Array<strip>; ystrips: Array<strip> } = this.strips(obj);

    const {
      ex,
      cx,
      ey,
      cy,
      ConcMaterial,
    }: { ex: number; cx: number; ey: number; cy: number; ConcMaterial: any } =
      obj;
    //console.log("RTIO > NcMc", { ex, cx, ey, cy, ConcMaterial });

    // Ncx, Mcx

    let Ncx: number = 0,
      Mcx: number = 0;
    for (const strip of ystrips) {
      const { y, a }: { y: number; a: number } = strip;
      //console.log("RTIO > NcMc > strip", y, a);

      const ecx: number = +ex - cx * y;
      //console.log("RTIO > NcMc", Object.assign(ConcMaterial, { ec: ecx }));
      const scx: number = ConcMaterial
        ? this.Concrete.fe(Object.assign(ConcMaterial, { ec: ecx }))
        : 0;
      //console.log("RTIO > y, a, ecx, scx", y, a, ecx, scx);
      const Ncxi: number = scx * a;

      Ncx += Ncxi;
      Mcx += Ncxi * y;
    }
    //console.log("RTIO > NcMc > Ncx, Mcx", Ncx, Mcx);

    // Ncy, Mcy

    let Ncy: number = 0,
      Mcy: number = 0;
    for (const strip of xstrips) {
      const { x, a }: { x: number; a: number } = strip;

      const ecy: number = +ey - cy * x;
      //console.log("RTIO > NcMc", Object.assign(ConcMaterial, { ec: ecy }));
      const scy: number = ConcMaterial
        ? this.Concrete.fe(Object.assign(ConcMaterial, { ec: ecy }))
        : 0;
      //console.log("RTIO > x, a, ecy, scy", x, a, ecy, scy);
      const Ncyi: number = scy * a;

      Ncy += Ncyi;
      Mcy += Ncyi * x;
    }
    //console.log("RTIO > NcMc > Ncy, Mcy", Ncy, Mcy);

    return { Ncx: Ncx, Mcx: Mcx, Ncy: Ncy, Mcy: Mcy };
  };

  // Ns, Ms
  NsMs = (obj: any = this.obj) => {
    //console.log("RTIO > NsMs", obj);

    const rebars: Array<rebar> = this.rebars(obj);

    const {
      ex,
      cx,
      ey,
      cy,
      RebarMaterial,
    }: { ex: number; cx: number; ey: number; cy: number; RebarMaterial: any } =
      obj;
    //console.log("RTIO > NcMc", { ex, cx, ey, cy, RebarMaterial });

    let Nsx: number = 0,
      Msx: number = 0,
      Nsy: number = 0,
      Msy: number = 0;
    for (const rebar of rebars) {
      const { x, y, a }: { x: number; y: number; a: number } = rebar;

      // x
      const esx: number = +ex - cx * y;
      //console.log("RTIO > NcMc", Object.assign(RebarMaterial, { es: esx }));
      const ssx: number = RebarMaterial
        ? this.Rebar.fe(Object.assign(RebarMaterial, { es: esx }))
        : 0;
      //console.log("RTIO > x, y, a, esx, ssx", x, y, a, esx, ssx);
      const Nsxi: number = ssx * a;

      Nsx += Nsxi;
      Msx += Nsxi * y;

      // y
      const esy: number = +ey - cy * x;
      //console.log("RTIO > NsMs", Object.assign(RebarMaterial, { es: esy }));
      const ssy: number = RebarMaterial
        ? this.Rebar.fe(Object.assign(RebarMaterial, { es: esy }))
        : 0;
      //console.log("RTIO > x, y, a, esx, ssx", x, y, a, esy, ssy);
      const Nsyi: number = ssy * a;

      Nsy += Nsyi;
      Msy += Nsyi * x;
    }
    //console.log("RTIO > NsMs > Nsx, Msx", Nsx, Msx);
    //console.log("RTIO > NsMs > Nsy, Msy", Nsy, Msy);

    return { Nsx: Nsx, Msx: Msx, Nsy: Nsy, Msy: Msy };
  };

  // Nps, Mps
  NpsMps = (obj: any = this.obj) => {
    //console.log("RTIO > NpsMps", obj);

    const tendons: Array<tendon> = this.tendons(obj);

    const {
      ex,
      cx,
      ey,
      cy,
      TendonMaterial,
    }: { ex: number; cx: number; ey: number; cy: number; TendonMaterial: any } =
      obj;
    //console.log("RTIO > NpsMps", { ex, cx, ey, cy, TendonMaterial });

    let Npsx: number = 0,
      Mpsx: number = 0,
      Npsy: number = 0,
      Mpsy: number = 0;
    for (const tendon of tendons) {
      const { x, y, a, d }: { x: number; y: number; a: number; d: number } =
        tendon;

      // x
      const epsx: number = +ex - cx * y + d;
      //console.log("RTIO > NcMc", Object.assign(TendonMaterial, { eps: epsx }));
      const spsx: number = TendonMaterial
        ? this.Tendon.fe(Object.assign(TendonMaterial, { eps: epsx }))
        : 0;
      //console.log("RTIO > x, y, a, epsx, spsx", x, y, a, epsx, spsx);
      const Npsxi: number = spsx * a;

      Npsx += Npsxi;
      Mpsx += Npsxi * y;

      // y
      const epsy: number = +ey - cy * x + d;
      //console.log("RTIO > NpsMps", Object.assign(TendonMaterial, { eps: epsy }));
      const spsy: number = TendonMaterial
        ? this.Tendon.fe(Object.assign(TendonMaterial, { eps: epsy }))
        : 0;
      //console.log("RTIO > x, y, a, epsy, spsy", x, y, a, epsy, spsy);
      const Npsyi: number = spsy * a;

      Npsy += Npsyi;
      Mpsy += Npsyi * x;
    }
    //console.log("RTIO > NpsMps > Npsx, Mpsx", Npsx, Mpsx);
    //console.log("RTIO > NpsMps > Npsy, Mpsy", Npsy, Mpsy);

    return { Npsx: Npsx, Mpsx: Mpsx, Npsy: Npsy, Mpsy: Mpsy };
  };

  // Nfb, Mfb
  NfbMfb = (obj: any = this.obj) => {
    //console.log("RTIO > NfbMfb", obj);

    const FRPbars: Array<FRPbar> = this.FRPbars(obj);

    const {
      ex,
      cx,
      ey,
      cy,
      FRPbarMaterial,
    }: { ex: number; cx: number; ey: number; cy: number; FRPbarMaterial: any } =
      obj;
    //console.log("RTIO > NfbMfb", { ex, cx, ey, cy, FRPbarMaterial });

    let Nfbx: number = 0,
      Mfbx: number = 0,
      Nfby: number = 0,
      Mfby: number = 0;
    for (const FRPbar of FRPbars) {
      const { x, y, a }: { x: number; y: number; a: number } = FRPbar;

      // x
      const efbx: number = +ex - cx * y;
      //console.log("RTIO > NfbMfb", Object.assign(FRPbarMaterial, { efb: efbx }));
      const sfbx: number = FRPbarMaterial
        ? this.FRPbar.fe(Object.assign(FRPbarMaterial, { efb: efbx }))
        : 0;
      //console.log("RTIO > NfbMfb > x, y, a, efbx, sfbx", x, y, a, efbx, sfbx);
      const Nfbxi: number = sfbx * a;

      Nfbx += Nfbxi;
      Mfbx += Nfbxi * y;

      // y
      const efby: number = +ey - cy * x;
      //console.log("RTIO > NfbMfb", Object.assign(TendonMaterial, { efb: efby }));
      const sfby: number = FRPbarMaterial
        ? this.FRPbar.fe(Object.assign(FRPbarMaterial, { efb: efby }))
        : 0;
      //console.log("RTIO > x, y, a, epsy, spsy", x, y, a, epsy, spsy);
      const Nfbyi: number = sfby * a;

      Nfby += Nfbyi;
      Mfby += Nfbyi * x;
    }
    //console.log("RTIO > NfbMfb > Nfbx, Mfbx", Nfbx, Mfbx);
    //console.log("RTIO > NfbMfb > Nfby, Mfby", Nfby, Mfby);

    return { Nfbx: Nfbx, Mfbx: Mfbx, Nfby: Nfby, Mfby: Mfby };
  };

  // NMinMax
  NMinMax = (obj: any = this.obj) => {
    //console.log("RTIO > NMinMax", obj);

    const {
      Shape,
      Ne,
      ConcMaterial,
      RebarMaterial,
      TendonMaterial,
      FRPbarMaterial,
    }: {
      Shape: string;
      Ne: number;
      ConcMaterial: any;
      RebarMaterial: any;
      TendonMaterial: any;
      FRPbarMaterial: any;
    } = obj;
    const { ecu }: { ecu: number } = ConcMaterial;
    const { esu }: { esu: number } = RebarMaterial
      ? RebarMaterial
      : { esu: 100 };
    const { epsu }: { epsu: number } = TendonMaterial
      ? TendonMaterial
      : { epsu: 100 };
    const { efbu }: { efbu: number } = FRPbarMaterial
      ? FRPbarMaterial
      : { efbu: 100 };
    //console.log("RTIO > NMinMax > ecu, esu, epsu, efbu", ecu, esu, epsu, efbu);
    //console.log("RTIO > NMinMax > TendonMaterial", TendonMaterial);

    // total concrete area
    const Ac: number = this.strips(obj)
      .xstrips.map((s: any) => +s.a)
      .reduce((a: number, i: number) => a + i, 0);
    //console.log("RTIO > NMinMax > Ac", Ac);

    // total rebars area
    const As: number = this.rebars(obj)
      .map((r: any) => +r.a)
      .reduce((a: number, i: number) => a + i, 0);
    //console.log("RTIO > NMinMax > As", As);

    // total tendon area
    const Aps: number = this.tendons(obj)
      .map((r: any) => +r.a)
      .reduce((a: number, i: number) => a + i, 0);
    //console.log("RTIO > NMinMax > Aps", Aps);

    // total FRPbars area
    const Afb: number = this.FRPbars(obj)
      .map((r: any) => +r.a)
      .reduce((a: number, i: number) => a + i, 0);
    //console.log("RTIO > NMinMax > Afb", Afb);

    const de: number = 1 / 10;
    let tN: Array<number> = [],
      ea: number = -ecu,
      eb: number = Shape == "PC Conc I Girder" ? epsu : Math.min(esu, efbu);
    let e: number = ea;
    while (e >= ea && e <= eb) {
      // Concrete
      const sc: number = ConcMaterial
        ? this.Concrete.fe(Object.assign(ConcMaterial, { ec: e }))
        : 0;
      const Nc: number = sc * Ac;

      // Rebar
      const ss: number = RebarMaterial
        ? this.Rebar.fe(Object.assign(RebarMaterial, { es: e }))
        : 0;
      const Ns: number = ss * As;

      // Tendon
      const sps: number = TendonMaterial
        ? this.Tendon.fe(Object.assign(TendonMaterial, { eps: e }))
        : 0;
      const Nps: number = sps * Aps;

      // FRPbar
      const sfb: number = FRPbarMaterial
        ? this.FRPbar.fe(Object.assign(FRPbarMaterial, { efb: e }))
        : 0;
      const Nfb: number = sfb * Afb;

      //console.log("RTIO > NMinMax > e, Nc, Ns, Nps, Nfb:", e, Nc, Ns, Nps,Nfb);

      //const Ni:number = Nc + Ns + Nps + Nfb;
      tN.push(Nc + Ns + Nps + Nfb);

      e += de;
    }
    //console.log("RTIO > NMinMax > tN:", tN);
    const Nmin: number = Math.min.apply(Math, tN);
    const Nmax: number = Math.max.apply(Math, tN);
    //console.log("RTIO > NMinMax > Nmin, Nmax", Nmin, Nmax);

    const ecmax: number =
      Ne < 0 ? -de * tN.filter((n) => n >= Ne && n < 0).length : 0;
    const ectmin: number =
      Ne > 0 ? de * tN.filter((n) => n > 0 && n <= Ne).length : 0;
    //console.log("RTIO > NMinMax > ecmax, ectmin", ecmax, ectmin);

    return {
      ecmax: ecmax,
      ectmin: ectmin,
      Nmin: Nmin,
      Nmax: Nmax,
      n: Ne / Nmin,
    }; // andrebbe fatta la media pesata
    //return (ea + eb) / 2;
  };

  // Nlim
  Nlim = (obj: any = this.obj) => {
    //console.log("RTIO > Nlim", obj);

    // centroid
    const { Xg, Yg }: { Xg: number; Yg: number } = this.centroid(obj);

    const {
      Shape,
      t3,
      t2,
      t2b,
      D1,
      B1,
      B2,
      ConcMaterial,
      RebarMaterial,
      TendonMaterial,
      FRPbarMaterial,
    }: {
      Shape: string;
      t3: number;
      t2: number;
      t2b: number;
      D1: number;
      B1: number;
      B2: number;
      ConcMaterial: any;
      RebarMaterial: any;
      TendonMaterial: any;
      FRPbarMaterial: any;
    } = obj;
    const { ecu }: { ecu: number } = ConcMaterial;
    const { esu }: { esu: number } = RebarMaterial
      ? RebarMaterial
      : { esu: 100 };
    const { epsu }: { epsu: number } = TendonMaterial
      ? TendonMaterial
      : { epsu: 100 };
    const { efbu }: { efbu: number } = FRPbarMaterial
      ? FRPbarMaterial
      : { efbu: 100 };
    //console.log("RTIO > Nlim > ecu, esu, epsu, efbu", ecu, esu, epsu, efbu);

    const ectu: number =
      Shape == "PC Conc I Girder" ? epsu : Math.min(esu, efbu);

    // x: along y axis
    const hy: number = Shape == "PC Conc I Girder" ? +D1 : +t3;
    const yn: number = (hy * ecu) / (ecu + ectu); // neutral axis depth from top to bottom
    const cx: number = ecu / yn; // positive value
    const ex: number = (+Yg - yn) * cx; // strain @ centroid level
    //console.log("RTIO > Nlim > yn, cx, ex", yn, cx, ex);

    // y: along x axis
    //
    const hx: number = ["Circle", "Pipe"].includes(Shape)
      ? t3
      : ["Rectangular", "Tee", "Box/Tube"].includes(Shape)
      ? t2
      : "I/Wide Flange" == Shape
      ? Math.max(t2, t2b)
      : Math.max(B1, B2); // PC Conc I Girder == Shape
    const xn: number = (ecu * hx) / (ecu + ectu); // neutral axis depth from left to right
    const cy: number = ecu / xn; // positive value
    const ey: number = (+Xg - xn) * cy; // strain @ centroid level
    //console.log("RTIO > Nlim > hx, xn, cy, ey", hx, xn, cy, ey);

    // calculation
    const newObj = Object.assign(obj, { ex: +ex, cx: +cx, ey: +ey, cy: +cy });
    //console.log("RTIO > Nlim  > newObj", newObj);
    const { Ncx, Ncy }: { Ncx: number; Ncy: number } = this.NcMc(newObj);
    const { Nsx, Nsy }: { Nsx: number; Nsy: number } = this.NsMs(newObj);
    const { Npsx, Npsy }: { Npsx: number; Npsy: number } = this.NpsMps(newObj);
    const { Nfbx, Nfby }: { Nfbx: number; Nfby: number } = this.NfbMfb(newObj);
    //console.log("RTIO > Nlim > Ncx, Nsx, Ncy, Nsy, Npsx, Npsy", Ncx, Nsx, Ncy, Nsy, Npsx, Npsy);
    //console.log("RTIO > Nlim > Nfbx, Nfby", Nfbx, Nfby);

    return {
      Nxlim: Ncx + Nsx + Npsx + Nfbx,
      Nylim: Ncy + Nsy + Npsy + Nfby,
      xn: xn,
      yn: yn,
      Ncx: Ncx,
      Nsx: Nsx,
      Npsx: Npsx,
      Nfbx: Nfbx,
      Ncy: Ncy,
      Nsy: Nsy,
      Npsy: Npsy,
      Nfby: Nfby,
    };
  };

  // Mc_ect
  // fissato ect, itera su ec
  Mcx_ect = (obj: any = this.obj) => {
    //let newObj: any = obj;

    const {
      ect,
      Ne,
      Shape,
      t3,
      D1,
      ConcMaterial,
    }: {
      ect: number;
      Ne: number;
      Shape: string;
      t3: number;
      D1: number;
      ConcMaterial: any;
    } = obj;
    const { ecu }: { ecu: number } = ConcMaterial;

    if (ect < 0) return {};

    // centroid
    const { Yg }: { Yg: number } = this.centroid(obj);

    // height
    const hy: number = Shape == "PC Conc I Girder" ? +D1 : +t3;

    // ecmax
    //const { ecmax }: { ecmax: number } = this.NMinMax(obj);

    let fafb: number = 0;
    let mc: any = {};

    // itera su ec
    let [eca, ecb]: Array<number> = [
      -ecu,
      ect - 1 / 1000,
      //Math.min(ecmax, -1 / 1000),
    ];
    let [fa, fb]: Array<number> = [0, 0];

    let i: number = 0,
      imax: number = 50;
    while (i < imax) {
      i++;

      let ec: number = (eca + ecb) / 2;
      if (i == 1) ec = eca;
      if (i == 2) ec = ecb;

      // x: along y axis
      const yn: number = (-ec * hy) / (-ec + ect); // neutral axis depth from top to bottom
      const cx: number = -ec / yn; // positive value
      const ex: number = (+Yg - yn) * cx; // strain @ centroid level
      //console.log("RTIO > Mcx_ect > ec, yn, cx, ex", ec, yn, cx, ex);

      // calculation
      const newObj: any = Object.assign(obj, { ec: ec, ex: +ex, cx: +cx });
      //console.log("RTIO > Mcx_ect  > newObj", newObj);
      const { Ncx, Mcx }: { Ncx: number; Mcx: number } = this.NcMc(newObj);
      const { Nsx, Msx }: { Nsx: number; Msx: number } = this.NsMs(newObj);
      const { Npsx, Mpsx }: { Npsx: number; Mpsx: number } =
        this.NpsMps(newObj);
      const { Nfbx, Mfbx }: { Nfbx: number; Mfbx: number } =
        this.NfbMfb(newObj);
      //console.log("RTIO > Mcx_ect > Ncx, Nsx, Mcx, Msx, Npsx, Mpsx ", Ncx, Nsx, Mcx, Msx, Npsx, Mpsx );

      const erri: number = Ne - (Ncx + Nsx + Npsx + Nfbx);

      if (i == 1) fa = erri;
      if (i == 2) {
        fb = erri;

        fafb = Math.sign(fa * fb);
        if (fafb > -1) {
          console.log(
            "RTIO > Mcx_ect > fafb",
            `\nect: ${ect.toFixed(3)}, ex: ${ex.toFixed(3)}\neca: ${eca.toFixed(
              3
            )}, fa: ${fa.toFixed(1)}\necb: ${ecb.toFixed(3)}, fb: ${fb.toFixed(
              1
            )}\n`
          );
          break;
        }
      }
      if (i > 2) {
        if (fa * erri > 0) {
          eca = ec;
          fa = erri;
        } else {
          ecb = ec;
          fb = erri;
        }
      }

      mc = {
        ec: ec,
        ex: ex,
        ect: ect,
        yn: yn,
        fafb: fafb,
        //fb: fb,
        erri: erri,
        cx: cx / Math.pow(10, 3), // 1 / mm
        Mx: -(Mcx + Msx + Mpsx + Mfbx), // Nmm
      };
    }

    return mc;
  };
  Mcy_ect = (obj: any = this.obj) => {
    let newObj: any = obj;

    const {
      ect,
      Ne,
      Shape,
      t3,
      t2,
      t2b,
      //D1,
      B1,
      B2,
      ConcMaterial,
    }: {
      ect: number;
      Ne: number;
      Shape: string;
      t3: number;
      t2: number;
      t2b: number;
      //D1: number;
      B1: number;
      B2: number;
      ConcMaterial: any;
    } = newObj;
    const { ecu }: { ecu: number } = ConcMaterial;

    if (ect < 0) return {};

    // centroid
    const { Xg }: { Xg: number } = this.centroid(newObj);

    // ecmax
    //const { ecmax }: { ecmax: number } = this.NMinMax(newObj);

    let fafb: number = 0;
    let mc: any = {};

    // itera su ec
    let [eca, ecb]: Array<number> = [
      -ecu,
      ect - 1 / 1000,
      //Math.min(ecmax, -1 / 1000),
    ];
    let [fa, fb]: Array<number> = [0, 0];

    let i: number = 0,
      imax: number = 50;
    while (i < imax) {
      i++;

      let ec: number = (eca + ecb) / 2;
      if (i == 1) ec = eca;
      if (i == 2) ec = ecb;

      // y: along x axis
      //
      const hx: number = ["Circle", "Pipe"].includes(Shape)
        ? t3
        : ["Rectangular", "Tee", "Box/Tube"].includes(Shape)
        ? t2
        : "I/Wide Flange" == Shape
        ? Math.max(t2, t2b)
        : Math.max(B1, B2); // PC Conc I Girder == Shape
      const xn: number = (-ec * hx) / (-ec + ect); // neutral axis depth from left to right
      const cy: number = -ec / xn; // positive value
      const ey: number = (+Xg - xn) * cy; // strain @ centroid level
      //console.log("RTIO > Mc_ec > hx, xn, cy, ey", hx, xn, cy, ey);

      // calculation
      newObj = Object.assign(newObj, { ec: ec, ey: +ey, cy: +cy });
      //console.log("RTIO > Mc_ec  > newObj", newObj);
      const { Ncy, Mcy }: { Ncy: number; Mcy: number } = this.NcMc(newObj);
      const { Nsy, Msy }: { Nsy: number; Msy: number } = this.NsMs(newObj);
      const { Npsy, Mpsy }: { Npsy: number; Mpsy: number } =
        this.NpsMps(newObj);
      const { Nfby, Mfby }: { Nfby: number; Mfby: number } =
        this.NfbMfb(newObj);
      //console.log("RTIO > Mc_ec > Ncy, Nsy, Mcy, Msy, Npsy, Mpsy", Ncy, Nsy, Mcy, Msy, Npsy, Mpsy);

      const erri: number = Ne - (Ncy + Nsy + Npsy + Nfby);

      if (i == 1) fa = erri;
      if (i == 2) {
        fb = erri;

        fafb = Math.sign(fa * fb);
        if (fafb > -1) {
          console.log(
            "RTIO > Mcy_ect > fafb",
            `\nect: ${ect.toFixed(3)}, ey: ${ey.toFixed(3)}\neca: ${eca.toFixed(
              3
            )}, fa: ${fa.toFixed(1)}\necb: ${ecb.toFixed(3)}, fb: ${fb.toFixed(
              1
            )}\n`
          );
          break;
        }
      }
      if (i > 2) {
        if (fa * erri > 0) {
          eca = ec;
          fa = erri;
        } else {
          ecb = ec;
          fb = erri;
        }
      }

      mc = {
        ec: ec,
        ey: ey,
        ect: ect,
        xn: xn,
        fafb: fafb,
        //fb: fb,
        erri: erri,
        cy: cy / Math.pow(10, 3), // 1 / mm
        My: +(Mcy + Msy + Mpsy + Mfby), // Nmm
      };
    }

    return mc;
  };

  // Mcx_ec
  // fissato ec, itera su ect
  Mcx_ec = (obj: any = this.obj) => {
    //console.log("RTIO > Mcx_ec", obj);

    const {
      ec,
      Ne,
      Shape,
      t3,
      D1,
      RebarMaterial,
      TendonMaterial,
      FRPbarMaterial,
    }: {
      ec: number;
      Ne: number;
      Shape: string;
      t3: number;
      D1: number;
      RebarMaterial: any;
      TendonMaterial: any;
      FRPbarMaterial: any;
    } = obj;
    const { esu }: { esu: number } = RebarMaterial
      ? RebarMaterial
      : { esu: 100 };
    const { epsu }: { epsu: number } = TendonMaterial
      ? TendonMaterial
      : { epsu: 100 };
    const { efbu }: { efbu: number } = FRPbarMaterial
      ? FRPbarMaterial
      : { efbu: 100 };
    //console.log("RTIO > Mcx_ec, D1, t3", D1, t3);

    if (ec > 0) return {};

    // centroid
    const { Yg }: { Yg: number } = this.centroid(obj);

    const hy: number = Shape == "PC Conc I Girder" ? +D1 : +t3;
    //console.log("RTIO > Mcx_ec > Shape", Shape, hy);

    // ectmin
    //const { ecmax, ectmin }: { ecmax: number; ectmin: number } = this.NMinMax(obj);
    //console.log("RTIO > Mcx_ec > ecmax, ectmin", ecmax, ectmin);

    const ectu: number =
      Shape == "PC Conc I Girder" ? epsu : Math.min(esu, efbu);
    //console.log("RTIO > Mcx_ec > ectu", ectu);

    // x: along y axis
    //
    let fafb: number = 0;

    // single point // last point of curve
    let mc: any = {};

    // itera su ect
    let [ecta, ectb]: Array<number> = [ec + 1 / 1000, ectu];
    let [fa, fb]: Array<number> = [0, 0];

    let i: number = 0,
      imax: number = 50;
    while (i < imax) {
      i++;

      let ect: number = (ecta + ectb) / 2;
      //if (i == 1) ect = ecta == 0 ? ecta + 1 / 1000 : ecta;
      if (i == 1) ect = ecta;
      if (i == 2) ect = ectb;

      // x: along y axis
      const yn: number = (-ec * hy) / (-ec + ect); // neutral axis depth from top to bottom
      const cx: number = -ec / yn; // positive value
      const ex: number = (+Yg - yn) * cx; // strain @ centroid level
      //if (i == 1) console.log("RTIO > Mcx_ec > ec, yn, cx, ex", ec, yn, cx, ex);

      // calculation
      const newObj = Object.assign(obj, { ex: +ex, cx: +cx });
      //console.log("RTIO > Mcx_ec  > newObj", newObj);
      const { Ncx, Mcx }: { Ncx: number; Mcx: number } = this.NcMc(newObj);
      const { Nsx, Msx }: { Nsx: number; Msx: number } = this.NsMs(newObj);
      const { Npsx, Mpsx }: { Npsx: number; Mpsx: number } =
        this.NpsMps(newObj);
      const { Nfbx, Mfbx }: { Nfbx: number; Mfbx: number } =
        this.NfbMfb(newObj);
      //if (i == 1) console.log("RTIO > Mcx_ec > ec, ect, Ncx, Nsx, Npsx", ec, ect, Ncx, Nsx, Npsx);

      const erri: number = Ne - (Ncx + Nsx + Npsx + Nfbx);
      //if (i == 1) console.log("RTIO > Mcx_ec > erri", erri);

      if (i == 1) {
        fa = erri;
        //console.log("RTIO > Mcx_ec > fa", ec, ect, fa);
      }
      if (i == 2) {
        fb = erri;
        //console.log("RTIO > Mcx_ec > fb", ec, ect, fb);

        fafb = Math.sign(fa * fb);
        if (fafb > -1) {
          /*console.log(
            "RTIO > Mcx_ec > fafb",
            `\nec: ${ec.toFixed(3)}, ex: ${ex.toFixed(3)}\necta: ${ecta.toFixed(
              3
            )}, fa: ${fa.toFixed(1)}\nectb: ${ectb.toFixed(
              3
            )}, fb: ${fb.toFixed(1)}\n`
          );*/
          break;
        }
      }
      if (i > 2) {
        if (fa * erri > 0) {
          ecta = ect;
          fa = erri;
        } else {
          ectb = ect;
          fb = erri;
        }
        fafb = Math.sign(fa * fb);
      }

      mc = {
        ec: ec,
        ex: ex,
        ect: ect,
        yn: yn,
        fafb: fafb,
        //fb: fb,
        erri: erri,
        cx: cx / Math.pow(10, 3), // 1 / mm
        Mx: -(Mcx + Msx + Mpsx + Mfbx), // Nmm
      };
    }

    return mc;
  };
  Mcy_ec = (obj: any = this.obj) => {
    //let newObj: any = obj;

    const {
      ec,
      Ne,
      Shape,
      t3,
      t2,
      t2b,
      //D1,
      B1,
      B2,
      RebarMaterial,
      TendonMaterial,
      FRPbarMaterial,
    }: {
      ec: number;
      Ne: number;
      Shape: string;
      t3: number;
      t2: number;
      t2b: number;
      //D1: number;
      B1: number;
      B2: number;
      RebarMaterial: any;
      TendonMaterial: any;
      FRPbarMaterial: any;
    } = obj;
    const { esu }: { esu: number } = RebarMaterial
      ? RebarMaterial
      : { esu: 100 };
    const { epsu }: { epsu: number } = TendonMaterial
      ? TendonMaterial
      : { epsu: 100 };
    const { efbu }: { efbu: number } = FRPbarMaterial
      ? FRPbarMaterial
      : { efbu: 100 };

    if (ec > 0) return {};

    // centroid
    const { Xg }: { Xg: number } = this.centroid(obj);

    // ectmin
    //const { ecmax, ectmin }: { ecmax: number; ectmin: number } = this.NMinMax(obj);

    const ectu: number =
      Shape == "PC Conc I Girder" ? epsu : Math.min(esu, efbu);

    // y: along x axis
    //
    let fafb: number = 0;

    // single point // last point of curve
    let mc: any = {};

    // itera su ect
    let [ecta, ectb]: Array<number> = [ec + 1 / 1000, ectu];
    let [fa, fb]: Array<number> = [0, 0];

    let i: number = 0,
      imax: number = 50;
    while (i < imax) {
      i++;

      let ect: number = (ecta + ectb) / 2;
      if (i == 1) ect = ecta;
      if (i == 2) ect = ectb;

      // y: along x axis
      //
      const hx: number = ["Circle", "Pipe"].includes(Shape)
        ? t3
        : ["Rectangular", "Tee", "Box/Tube"].includes(Shape)
        ? t2
        : "I/Wide Flange" == Shape
        ? Math.max(t2, t2b)
        : Math.max(B1, B2); // PC Conc I Girder == Shape
      const xn: number = (-ec * hx) / (-ec + ect); // neutral axis depth from left to right
      const cy: number = -ec / xn; // positive value
      const ey: number = (+Xg - xn) * cy; // strain @ centroid level
      //console.log("RTIO > Mc_ec > hx, xn, cy, ey", hx, xn, cy, ey);

      // calculation
      const newObj = Object.assign(obj, { ey: +ey, cy: +cy });
      //console.log("RTIO > Mc_ec  > newObj", newObj);
      const { Ncy, Mcy }: { Ncy: number; Mcy: number } = this.NcMc(newObj);
      const { Nsy, Msy }: { Nsy: number; Msy: number } = this.NsMs(newObj);
      const { Npsy, Mpsy }: { Npsy: number; Mpsy: number } =
        this.NpsMps(newObj);
      const { Nfby, Mfby }: { Nfby: number; Mfby: number } =
        this.NfbMfb(newObj);
      //console.log("RTIO > Mc_ec > Ncy, Nsy, Mcy, Msy, Npsy, Mps", Ncy, Nsy, Mcy, Msy, Npsy, Mps);

      const erri: number = Ne - (Ncy + Nsy + Npsy + Nfby);
      //console.log("RTIO > Mc_ec > erri", erri);

      if (i == 1) fa = erri;
      if (i == 2) {
        fb = erri;

        fafb = Math.sign(fa * fb);
        if (fafb > -1) {
          console.log(
            "RTIO > Mcy_ec > fafb\n",
            ec,
            xn,
            "\n",
            ecta,
            fa,
            "\n",
            ectb,
            fb
          );
          break;
        }
      }
      if (i > 2) {
        if (fa * erri > 0) {
          ecta = ect;
          fa = erri;
        } else {
          ectb = ect;
          fb = erri;
        }
      }

      mc = {
        ec: ec,
        ey: ey,
        ect: ect,
        xn: xn,
        fafb: fafb,
        //fb: fb,
        erri: erri,
        cy: cy / Math.pow(10, 3), // 1/mm
        My: +(Mcy + Msy + Mpsy + Mfby), // Nmm
      };
    }

    //console.log("RTIO > Mc_ec > mc", mc);
    return mc;
  };

  // one point
  MrxIII = (obj: any = this.obj) => {
    //console.log("RTIO > MrxIII");

    const { Ne }: { Ne: number } = obj;
    const { Nxlim }: { Nxlim: number } = this.Nlim(obj);
    //console.log("RTIO > MrxIII > Ne < Nxlim", +Ne < +Nxlim);

    return +Ne < +Nxlim ? this.Mcx_ec(obj) : this.Mcx_ect(obj);
  };

  MryIII = (obj: any = this.obj) => {
    //console.log("RTIO > MryIII", obj);

    const { Ne }: { Ne: number } = obj;
    const { Nylim }: { Nylim: number } = this.Nlim(obj);
    //console.log("RTIO > MryIII > Ne, Nylim", Ne, Nylim);

    return +Ne < +Nylim ? this.Mcy_ec(obj) : this.Mcy_ect(obj);
  };

  // cx-Mx curve
  Mcx = (obj: any = this.obj) => {
    //console.log("RTIO > Mcx");

    // Ne <? Nxlim
    const { Ne }: { Ne: number } = obj;
    const { Nxlim }: { Nxlim: number } = this.Nlim(obj);
    //console.log("RTIO > Mcx > Ne < Nxlim", +Ne < +Nxlim);

    // last point
    const { ec, ect }: { ec: number; ect: number } = this.MrxIII(obj);
    //console.log("RTIO > Mcx > ec, ect", ec.toFixed(3), ect.toFixed(3));

    let Mcx: Array<any> = [];

    if (+Ne < +Nxlim) {
      // Ne < Nxlim => fissato ec, itero su ect
      const eca = -1 / 1000;
      const ecb = ec;

      const dec: number = (ecb - eca) / 100;

      for (let i = 0; i <= 100; i++) {
        const eci: number = eca + i * dec;

        const newObj = JSON.parse(
          JSON.stringify(Object.assign(obj, { ec: eci }))
        );
        Mcx.push(this.MrxIII(newObj));
      }
    } else {
      // Ne >= Nxlim => itero su ect
      const ecta = ec + 1 / 1000;
      const ectb = ect;

      const dect: number = (ectb - ecta) / 100;

      for (let i = 0; i <= 100; i++) {
        const ecti: number = ecta + i * dect;

        const newObj = JSON.parse(
          JSON.stringify(Object.assign(obj, { ect: ecti }))
        );
        Mcx.push(this.MrxIII(newObj));
      }
    }

    return Mcx;
  };

  // cy-My curve
  Mcy = (obj: any = this.obj) => {
    //console.log("RTIO > Mcy");

    // Ne <? Nylim
    const { Ne }: { Ne: number } = obj;
    const { Nylim }: { Nylim: number } = this.Nlim(obj);
    //console.log("RTIO > Mcy > Ne < Nylim", +Ne < +Nylim);

    // last point
    const { ec, ect }: { ec: number; ect: number } = this.MryIII(obj);
    //console.log("RTIO > Mcy > ec, ect", ec.toFixed(3), ect.toFixed(3));

    let Mcy: Array<any> = [];

    if (+Ne < +Nylim) {
      // Ne < Nylim => itero su ec
      const eca = -1 / 1000;
      const ecb = ec;

      const dec: number = (ecb - eca) / 100;

      for (let i = 0; i <= 100; i++) {
        const eci: number = eca + i * dec;

        const newObj = JSON.parse(
          JSON.stringify(Object.assign(obj, { ec: eci }))
        );
        Mcy.push(this.MryIII(newObj));
      }
    } else {
      // Ne >= Nylim => itero su ect
      const ecta = ec + 1 / 1000;
      const ectb = ect;

      const dect: number = (ectb - ecta) / 100;

      for (let i = 0; i <= 100; i++) {
        const ecti: number = ecta + i * dect;

        const newObj = JSON.parse(
          JSON.stringify(Object.assign(obj, { ect: ecti }))
        );
        Mcy.push(this.MryIII(newObj));
      }
    }

    return Mcy;
  };

  // N-Mx curve
  NMx = (obj: any = this.obj) => {
    //console.log("RTIO > NMx");

    //const { Ne }: { Ne: number } = obj;
    const { Nmin, Nmax }: { Nmin: number; Nmax: number } = this.NMinMax(obj);

    let NMx: Array<any> = [];

    const nList = [
      Math.ceil((Math.floor(Nmax) / Math.ceil(Nmin)) * 100) / 100,
      Math.ceil((Math.floor(Nmax) / Math.ceil(Nmin)) * 100) / 100 / 2,
      0,
      0.1,
      0.2,
      0.3,
      0.4,
      0.5,
      0.6,
      0.7,
      0.8,
      0.9,
      1,
    ];

    for (const n of nList) {
      const Nei = Math.ceil(Nmin) * n;

      const newObj = JSON.parse(
        JSON.stringify(Object.assign(obj, { Ne: Nei }))
      );
      //console.log("RTIO > NMx > newObj", newObj);

      NMx.push(Object.assign(this.MrxIII(newObj), { Ne: Nei }));
    }

    //console.log("RTIO > NMx > NMx", NMx);

    return NMx;
  };

  // N-My curve
  NMy = (obj: any = this.obj) => {
    //console.log("RTIO > NMy");

    //const { Ne }: { Ne: number } = obj;
    const { Nmin, Nmax }: { Nmin: number; Nmax: number } = this.NMinMax(obj);

    let NMy: Array<any> = [];

    const nList = [
      Math.ceil((Math.floor(Nmax) / Math.ceil(Nmin)) * 100) / 100,
      Math.ceil((Math.floor(Nmax) / Math.ceil(Nmin)) * 100) / 100 / 2,
      0,
      0.1,
      0.2,
      0.3,
      0.4,
      0.5,
      0.6,
      0.7,
      0.8,
      0.9,
      1,
    ];

    for (const n of nList) {
      const Nei = Math.ceil(Nmin) * n;

      const newObj = JSON.parse(
        JSON.stringify(Object.assign(obj, { Ne: Nei }))
      );
      //console.log("RTIO > NMy > newObj", newObj);

      NMy.push(Object.assign(this.MryIII(newObj), { Ne: Nei }));
    }

    //console.log("RTIO > NMy > NMy", NMy);

    return NMy;
  };
}

// export
export { Rectangular, RTIO };
