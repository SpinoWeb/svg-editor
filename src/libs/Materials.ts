// Concrete
class Concrete {
  obj: any;

  constructor() {
    // default object values
    // N, mm
    this.obj = {
      ec: 0,
      Fc: 25,
      ec0: 2,
      ecu: 3.5,
      SSCurveOpt: "ParabolaRettangolo",
    };
  }

  // fe
  fe = (obj: any = this.obj) => {
    //console.log(obj);
    const { SSCurveOpt }: { SSCurveOpt: string } = obj;

    let fe: number = 0;
    if (SSCurveOpt == "ParabolaRettangolo") {
      const mySSCurveOpt = "ParabolaRettangolo";
      fe = this[mySSCurveOpt](obj);
    }
    if (SSCurveOpt == "Hognestad") {
      const mySSCurveOpt = "Hognestad";
      fe = this[mySSCurveOpt](obj);
    }
    if (SSCurveOpt == "Mander") {
      const mySSCurveOpt = "Mander";
      fe = this[mySSCurveOpt](obj);
    }

    return fe;
  };

  ParabolaRettangolo = (obj: any = this.obj) => {
    const {
      ec,
      Fc,
      ec0,
      ecu,
    }: { ec: number; Fc: number; ec0: number; ecu: number } = obj;
    const e = +ec < 0 ? -ec : 0;

    const sc =
      +e <= +ec0
        ? -Fc * ((2 * e) / ec0 - (+e / ec0) * (+e / ec0))
        : +e <= +ecu
        ? -Fc
        : 0;

    //console.log(e, sc);
    return sc <= 0 ? sc : 0;
  };

  Hognestad = (obj: any = this.obj) => {
    const { ec, Fc, ec0 }: { ec: number; Fc: number; ec0: number } = obj;
    const e = +ec < 0 ? -ec : 0;

    const sc =
      +e <= 2 * ec0 ? -Fc * ((2 * e) / ec0 - (+e / ec0) * (+e / ec0)) : 0;

    return sc <= 0 ? sc : 0;
  };

  Mander = (obj: any = this.obj) => {
    const {
      ec,
      Fc,
      ec0,
      E1,
    }: { ec: number; Fc: number; ec0: number; E1: number } = obj;
    const e = +ec < 0 ? -ec : 0;

    const Esec = +Fc / (+ec0 / 1000);
    const r = +E1 / (+E1 - Esec);

    const x = e / +ec0;
    const sc = (-Fc * x * r) / (r - 1 + Math.pow(x, r));

    return sc <= 0 ? sc : 0;
  };
}

// Rebar
class Rebar {
  obj: any;

  constructor() {
    // default object values
    // N, mm
    this.obj = {
      es: 0,
      Fy: 450,
      Es: 210000,
      esu: 10,
      SSCurveOpt: "ElastoPlastico",
    };
  }

  // fe
  fe = (obj: any = this.obj) => {
    //const { RebarCurve }: { RebarCurve: string } = obj;
    const { SSCurveOpt }: { SSCurveOpt: string } = obj;

    let fe: number = 0;
    if (SSCurveOpt == "ElastoPlastico") {
      const mySSCurveOpt = "ElastoPlastico";
      fe = this[mySSCurveOpt](obj);
    }
    if (SSCurveOpt == "ElastoLineare") {
      const mySSCurveOpt = "ElastoLineare";
      fe = this[mySSCurveOpt](obj);
    }

    return fe;
  };

  ElastoPlastico = (obj: any = this.obj) => {
    const { es, Fy, E1 }: { es: number; Fy: number; E1: number } = obj;

    const ey = (1000 * Fy) / +E1; // = mm/m

    const ss = Math.sign(+es) * Math.min(Math.abs(+es) / ey, 1) * Fy;

    return ss;
  };

  ElastoPlastico1 = (obj: any = this.obj) => {
    const {
      es,
      Fy,
      E1,
      //Fu,
      esu,
    }: {
      es: number;
      Fy: number;
      E1: number;
      //Fu: number;
      esu: number;
    } = obj;

    const Fu = 1.001 * Fy;

    const ey = (1000 * Fy) / +E1; // = mm/m
    const Eh = (+Fu - Fy) / (+esu - ey);

    const ss =
      Math.abs(+es) / ey <= 1
        ? Math.sign(es) * (Math.abs(es) / ey) * Fy
        : Math.sign(es) * (+Fy + (Math.abs(es) - ey) * Eh);

    return ss;
  };

  ElastoLineare = (obj: any = this.obj) => {
    const {
      es,
      Fy,
      E1,
      Fu,
      esu,
    }: { es: number; Fy: number; E1: number; Fu: number; esu: number } = obj;

    const ey = (1000 * Fy) / +E1; // = mm/m
    const Eh = (+Fu - Fy) / (+esu - ey);

    const ss =
      Math.abs(+es) / ey <= 1
        ? Math.sign(es) * (Math.abs(es) / ey) * Fy
        : Math.sign(es) * (+Fy + (Math.abs(es) - ey) * Eh);

    return ss;
  };
}

// Tendon
class Tendon {
  obj: any;

  constructor() {
    // default object values
    // N, mm
    this.obj = {
      eps: 0,
      Fy: 450,
      Es: 210000,
      epsu: 40,
      SSCurveOpt: "ElastoLineare",
    };
  }

  // fe
  fe = (obj: any = this.obj) => {
    //console.log(obj);
    const { SSCurveOpt }: { SSCurveOpt: string } = obj;
    //console.log(SSCurveOpt);

    let fe: number = 0;
    if (SSCurveOpt == "ElastoLineare") {
      const mySSCurveOpt = "ElastoLineare";
      fe = this[mySSCurveOpt](obj);
    }
    if (SSCurveOpt == "RamsbergOsgood") {
      const mySSCurveOpt = "RamsbergOsgood";
      fe = this[mySSCurveOpt](obj);
    }

    return fe;
  };

  ElastoLineare = (obj: any = this.obj) => {
    const {
      eps,
      Fy,
      E1,
      Fu,
      epsu,
    }: { eps: number; Fy: number; E1: number; Fu: number; epsu: number } = obj;

    const ey: number = (1000 * Fy) / +E1; // = mm/m
    const Eh: number = (+Fu - Fy) / (+epsu - ey);

    const ss: number =
      eps < 0 ? 0 : eps / ey <= 1 ? (eps / ey) * Fy : +Fy + (eps - ey) * Eh;

    return ss;
  };

  RamsbergOsgood = (obj: any = this.obj) => {
    const {
      eps,
      Fy,
      E1,
      Fu,
      epsu,
    }: { eps: number; Fy: number; E1: number; Fu: number; epsu: number } = obj;

    const ey: number = (1000 * Fy) / +E1; // = mm/m
    const Eh: number = (+Fu - Fy) / (+epsu - ey);

    const s0 = Fu - (Eh * epsu) / 1000;

    const A: number = Eh / E1;
    const B: number = (E1 * (1 - A)) / s0;
    const C: number = 8;

    const ss: number =
      eps < 0
        ? 0
        : E1 *
          (eps / 1000) *
          (A + (1 - A) / Math.pow(1 + Math.pow((B * eps) / 1000, C), 1 / C));

    return ss;
  };
}

// FRPbar
class FRPbar {
  obj: any;

  constructor() {
    // default object values
    // N, mm
    this.obj = {
      efb: 0,
      E1: 230000,
      efbu: 10,
      SSCurveOpt: "Lineare",
    };
  }

  // fe
  fe = (obj: any = this.obj) => {
    //console.log(obj);
    const { SSCurveOpt }: { SSCurveOpt: string } = obj;
    //console.log("FRP", SSCurveOpt);

    let fe: number = 0;
    if (SSCurveOpt == "Lineare") {
      const mySSCurveOpt = "Lineare";
      fe = this[mySSCurveOpt](obj);
    }

    return fe;
  };

  Lineare = (obj: any = this.obj) => {
    const { efb, E1, efbu }: { efb: number; E1: number; efbu: number } = obj;

    const sfb: number = efb < 0 ? 0 : efb <= efbu ? (efb * E1) / 1000 : 0;

    return sfb;
  };
}

// export
export { Concrete, Rebar, Tendon, FRPbar };
