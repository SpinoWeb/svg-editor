// Concrete
class Concrete {
  obj: any;

  constructor() {
    // default object values
    // kN, m
    this.obj = {
      ec: 0,
      Fc: 25,
      ec0: 2,
      ecu: 3.5,
      law: "ParabolaRettangolo",
    };
  }

  // fe
  fe = (obj = this.obj) => {
    const { law } = obj;

    let fe;
    if (law == "ParabolaRettangolo") {
      const mylaw = "ParabolaRettangolo";
      fe = this[mylaw](obj);
    }
    if (law == "Hognestad") {
      const mylaw = "Hognestad";
      fe = this[mylaw](obj);
    }
    if (law == "Mander") {
      const mylaw = "Mander";
      fe = this[mylaw](obj);
    }

    return fe;
  };

  ParabolaRettangolo = (obj = this.obj) => {
    const { ec, Fc, ec0, ecu } = obj;
    const e = ec > 0 ? ec : -ec;

    const sc =
      +e <= +ec0 ? -Fc * ((2 * e) / ec0 - (+e / ec0) * (+e / ec0)) : -Fc;

    return +e <= +ecu ? -sc : 0;
  };

  Hognestad = (obj = this.obj) => {
    const { ec, Fc, ec0 } = obj;
    const e = ec > 0 ? ec : -ec;

    const sc = -Fc * ((2 * e) / ec0 - (+e / ec0) * (+e / ec0));

    return -sc;
  };

  Mander = (obj = this.obj) => {
    const { ec, Fc, ec0, E1 } = obj;
    const e = ec > 0 ? ec : -ec;

    const Esec = +Fc / (+ec0 / 1000);
    const r = +E1 / (+E1 - Esec);

    const x = e / +ec0;
    const sc = (+Fc * x * r) / (r - 1 + Math.pow(x, r));

    return sc;
  };
}

// Rebar
class Rebar {
  obj: any;

  constructor() {
    // default object values
    // kN, m
    this.obj = {
      es: 0,
      Fy: 450,
      E1: 210000,
      esu: 10,
      law: "ElastoPlastico",
    };
  }

  // fe
  fe = (obj = this.obj) => {
    const { law } = obj;

    let fe;
    if (law == "ElastoPlastico") {
      const mylaw = "ElastoPlastico";
      fe = this[mylaw](obj);
    }
    if (law == "ElastoLineare") {
      const mylaw = "ElastoLineare";
      fe = this[mylaw](obj);
    }

    return fe;
  };

  ElastoPlastico = (obj = this.obj) => {
    const { es, Fy, E1 } = obj;

    const ey = (1000 * Fy) / +E1;

    const ss = Math.sign(+es) * Math.min(Math.abs(+es) / ey, 1) * Fy;

    return ss;
  };

  ElastoLineare = (obj = this.obj) => {
    const { es, Fy, E1, Fu, esu } = obj;

    const ey = (1000 * Fy) / +E1;
    const Eh = (+Fu - Fy) / (+esu - ey);

    const ss =
      Math.abs(+es) / ey <= 1
        ? Math.sign(es) * (Math.abs(es) / ey) * Fy
        : Math.sign(es) * (+Fy + (Math.abs(es) - ey) * Eh);

    return ss;
  };
}

// Rectangular
class Rectangular {
  Concrete: Concrete;
  obj: any;

  constructor() {
    this.Concrete = new Concrete();

    // default object values
    // kN, m
    this.obj = {
      Me: 50 * Math.pow(10, 6),
      Ne: 0 * Math.pow(10, 3),

      b: 300,
      h: 600,
      c: 50,
      fc: 25,

      AsList: [
        { y: -250, As: (4 * Math.PI * 20 * 20) / 4 },
        { y: 250, As: (2 * Math.PI * 20 * 20) / 4 },
      ],
      As: (4 * Math.PI * 20 * 20) / 4, // 4 f20
      As1: (2 * Math.PI * 20 * 20) / 4, // 2 f20
      fy: 450,
      Es: 210000,
      esu: 100,

      ec: -1,
      ec0: 2,
      ecu: 3.5,
    };
  }

  // parametri geometrici
  geo = (obj = this.obj) => {
    const { b, h, AsList, n } = obj;
    //const n = 15;

    let Ag = b * h;
    let St = (b * h * h) / 2;
    for (let i = 0; i < AsList.length; i++) {
      const { y, As } = AsList[i];

      Ag += n * As;
      St += n * As * (h / 2 - y);
    }

    const dgsup = St / Ag;
    const dginf = h - dgsup;

    let Jnx = (b * Math.pow(dgsup, 3)) / 3 + (b * Math.pow(dginf, 3)) / 3;
    for (let i = 0; i < AsList.length; i++) {
      const { y, As } = AsList[i];

      Jnx += n * As * Math.pow(dginf - h / 2 - y, 2);
    }

    const e1 = Jnx / Ag / dginf;
    const e2 = Jnx / Ag / dgsup;

    return {
      Ag: Ag,
      St: St,
      dgsup: dgsup,
      dginf: dginf,
      Jnx: Jnx,
      e1: e1,
      e2: e2,
    };
  };

  // momento resistente
  Mr = (obj = this.obj) => {
    const { h, c, As, fy } = obj;
    return As * 0.9 * (h - c) * fy;
  };

  // stadio II / asse neutro
  xII = (obj = this.obj) => {
    const { b, h, c, As, As1 } = obj;

    const n = 15;
    const d = +h - c;
    const x =
      ((n * (As1 + As)) / b) *
      (-1 +
        Math.sqrt(
          1 + (2 * b * (As * d + As1 * c)) / (n * (As1 + As) * (As1 + As))
        ));
    return x;
  };

  // stadio II / momento di inerzia
  InII = (obj = this.obj) => {
    const { b, h, c, As, As1 } = obj;

    const n = 15;
    const d = +h - c;
    const x = this.xII(obj);
    const In =
      (b * x * x * x) / 3 +
      n * As1 * (x - c) * (x - c) +
      n * As * (d - x) * (d - x);
    return In;
  };

  // stadio II / tensioni
  sigmaII = (obj = this.obj) => {
    const { b, h, c, As, As1, Me } = obj;

    const n = 15;
    const d = +h - c;
    const x = this.xII(obj);
    const In = this.InII(obj);

    const sigma = {
      sc: (-Me * x) / In,
      ss1: (-n * Me * (x - c)) / In,
      ss: (n * Me * (d - x)) / In,
    };

    return sigma;
  };

  // beta // parabola-rettangolo
  beta = (obj = this.obj) => {
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
  kappa = (obj = this.obj) => {
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

  // m-chi // parabola-rettangolo
  mchi0 = (obj = this.obj) => {
    const { ec, ecu, fc, b, h, c, As, As1, fy, Es, esu } = obj;
    if (ec > 0) return {};

    let mchi = {};

    const d = h - c;
    const beta = this.beta(obj);
    const kappa = this.kappa(obj);

    let [esa, esb] = [1 / 1000, esu];
    let [fa, fb] = [0, 0];

    let i = 0,
      imax = 30;
    while (i < imax) {
      i++;

      let es = (esa + esb) / 2;
      if (i == 1) es = esa;
      if (i == 2) es = esb;

      const ss = Math.sign(es) * Math.min((Es * Math.abs(es)) / 1000, fy);
      const Ns = ss * As;

      const xd = ec / (ec + es);
      const x = xd * d;

      const Nc = -beta * fc * b * x;

      const es1 = (ec * (x - c)) / x;
      const ss1 = Math.sign(es1) * Math.min((Es * Math.abs(es1)) / 1000, fy);
      const Ns1 = ss1 * As1;

      const erri = Nc + Ns1 + Ns;
      if (i == 1) fa = erri;
      if (i == 2) fb = erri;
      if (i > 2) {
        if (fa * erri > 0) {
          esa = es;
          fa = erri;
        } else {
          esb = es;
          fb = erri;
        }
      }

      mchi = {
        ec: ec,
        beta: beta,
        kappa: kappa,
        es: es,
        x: x,
        //xd : xd,
        //zd : 1 - kappa * xd,
        //err : erri,
        chi: -ec / 1000 / x,
        Mi: Ns1 * (c - kappa * x) + Ns * (d - kappa * x),
      };
    }

    return mchi;
  };

  // Nlim // parabola-rettangolo
  Nlim = (obj = this.obj) => {
    const { Ne, ec0, ecu, fc, b, h, AsList, fy, Es, esu } = obj;
    //if (ec > 0) return {};

    const As = AsList.map((a: any) => +a.As).reduce(
      (a: number, b: number) => a + b,
      0
    );
    //console.log("As:", As);

    const de = 1 / 1000;
    let tN = [],
      e = 0,
      ea = 0,
      eb = -ecu;
    while (e >= -ecu) {
      const sc = this.Concrete.ParabolaRettangolo({
        ec: e,
        Fc: fc,
        ec0: ec0,
        ecu: ecu,
      });
      const Nc = sc * b * h;
      //console.log(Nc);

      const ss = Math.sign(e) * Math.min((Es * Math.abs(e)) / 1000, fy);
      const Ns = ss * As;
      //console.log("Rectangular > Ns:", Ns);

      const Ni = Nc + Ns;
      tN.push(Ni);

      e -= de;
    }
    // console.log("tN:", tN);
    const Nmin = Math.min.apply(Math, tN);
    //console.log("Rectangular > Nmin:", Nmin);

    const less = tN.filter((n) => n >= Ne);
    //const more = tN.filter((n) => n <= Ne);

    ea = -de * (less.length - 1);
    eb = -de * less.length;

    return { ecmin: ea, Nmin: Math.ceil(Nmin), Nmax: As * fy }; // andrebbe fatta la media pesata
    //return (ea + eb) / 2;
  };

  // m-chi_esu // parabola-rettangolo
  // valuta l'eventuale rottura dell'acciaio e, nel caso, la corrispondente
  // deformazione del cls (ec)
  mchi_esu = (obj = this.obj) => {
    let newObj = obj;

    const { Ne, ecmin, ecu, fc, b, h, c, AsList, fy, Es, esu } = newObj;
    //if (ec > 0) return {};

    // -1: non è necessario iterare su ec
    // 1: fissa ect = esu ed itera su ec
    let fafb = 0;

    let mchi = {};

    // pivot
    const ect = esu;

    let [eca, ecb] = [-ecu, ecmin - 1 / 1000];
    let [fa, fb] = [0, 0];

    let i = 0,
      imax = 50;
    while (i < imax) {
      i++;

      let ec = (eca + ecb) / 2;
      if (i == 1) ec = eca;
      if (i == 2) ec = ecb;

      newObj["ec"] = ec;
      const beta = this.beta(newObj);
      const kappa = this.kappa(newObj);

      const xh = -ec / (-ec + ect);
      const x = xh * h;
      const chi = -ec / x;
      const ex = (h / 2 - x) * chi; // epsilon @ centroid level

      // Concrete
      const Nc = -beta * fc * b * x;
      const Mc = Nc * (h / 2 - kappa * x);

      // Rebar
      let Ns = 0,
        Ms = 0;
      for (let j = 0; j < AsList.length; j++) {
        const { y, As } = AsList[j];

        const esj = ex - chi * y;
        const ssj = Math.sign(esj) * Math.min((Es * Math.abs(esj)) / 1000, fy);
        const Nsj = ssj * As;

        Ns += Nsj;
        Ms += Nsj * y;
      }
      const erri = Ne - (Nc + Ns);

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
        Mi: -(Mc + Ms),
      };
    }

    return mchi;
  };

  // m-chi // parabola-rettangolo
  mchi = (obj = this.obj) => {
    const { Ne, ec, ecmin, ecu, fc, b, h, c, AsList, fy, Es, esu } = obj;
    if (ec > 0) return {};

    // -1: non è necessario iterare su ec
    // 1: fissa ect = esu ed itera su ec
    let fafb = 0;

    let mchi = {};

    //const d = h - c;
    const beta = this.beta(obj);
    const kappa = this.kappa(obj);

    let [ecta, ectb] = [ecmin + 1 / 1000, esu];
    let [fa, fb] = [0, 0];

    let i = 0,
      imax = 50;
    while (i < imax) {
      i++;

      let ect = (ecta + ectb) / 2;
      if (i == 1) ect = ecta;
      if (i == 2) ect = ectb;

      const xh = -ec / (-ec + ect);
      const x = xh * h;
      const chi = -ec / x;
      const ex = (h / 2 - x) * chi; // epsilon @ centroid level

      // Concrete
      const Nc = -beta * fc * b * x;
      const Mc = Nc * (h / 2 - kappa * x);

      // Rebar
      let Ns = 0,
        Ms = 0;
      for (let j = 0; j < AsList.length; j++) {
        const { y, As } = AsList[j];

        const esj = ex - chi * y;
        const ssj = Math.sign(esj) * Math.min((Es * Math.abs(esj)) / 1000, fy);
        const Nsj = ssj * As;

        Ns += Nsj;
        Ms += Nsj * y;
      }
      const erri = Ne - (Nc + Ns);

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
        //fafb: fafb,
        //fb: fb,
        erri: erri,
        chi: chi / 1000,
        Mi: -(Mc + Ms),
      };
    }

    if (fafb > 0) {
      //console.log(ec.toFixed(3), fafb);
    }
    return mchi;
  };
}

// export
export { Concrete, Rebar, Rectangular };
