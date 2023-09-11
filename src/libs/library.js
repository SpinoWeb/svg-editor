const library = {
  //
  Hognestad: (item = { Fc: 10, ec0: 2 }, de = 1 / 100) => {
    //console.log('library > Hognestad', item, de);

    let fcec = [],
      ec = 0;
    while (ec <= 2 * item.ec0) {
      const fc =
        +item.Fc * ((2 * ec) / item.ec0 - (ec / item.ec0) * (ec / item.ec0));

      fcec.push([ec, fc]);
      ec += de;
    }

    return fcec;
  },

  // ParabolaRettangolo
  ParabolaRettangolo: (item = { Fc: 10, ec0: 2, ecu: 3.5 }, de = 1 / 100) => {
    //console.log('library > ParabolaRettangolo', item, de);

    let fcec = [],
      ec = 0;
    while (ec <= +item.ecu) {
      const fc =
        ec <= +item.ec0
          ? +item.Fc * ((2 * ec) / item.ec0 - (ec / item.ec0) * (ec / item.ec0))
          : +item.Fc;
      //console.log('library > ParabolaRettangolo > ec,fc', ec, fc);

      fcec.push([ec, fc]);
      ec += de;
    }

    return fcec;
  },

  // Mander
  Mander: (item = { Fc: 10, E1: 1, ec0: 2, ecu: 6 }, de = 1 / 100) => {
    //console.log('library > Mander', item, de);

    const Esec = +item.Fc / (item.ec0 / 1000);
    //console.log('library > Mander > Esec', Esec);
    const r = +item.E1 / (item.E1 - Esec);
    //console.log('library > Mander > r', r);

    let fcec = [],
      ec = 0;
    while (ec <= +item.ecu) {
      const x = ec / item.ec0;
      const fc = (+item.Fc * x * r) / (r - 1 + Math.pow(x, r));
      //console.log('library > Mander > ec,fc', ec, fc);

      fcec.push([ec, fc]);
      ec += de;
    }

    return fcec;
  },

  // ElastoPlastico
  ElastoPlastico: (item = { Fy: 400, E1: 200000, esu: 10 }, de = 1 / 10) => {
    //console.log('library > ElastoPlastico', item, de);

    const eu = +item.esu;

    const ey = (1000 * item.Fy) / item.E1;
    //console.log('library > ElastoPlastico > ey', ey);

    let fe = [],
      e = -eu;
    while (e <= eu) {
      const f = Math.sign(e) * Math.min((Math.abs(e) / ey) * item.Fy, +item.Fy);
      //console.log('library > ElastoPlastico > e,f', e, f);

      fe.push([e, f]);
      e += de;
    }

    return fe;
  },

  // ElasticoLineare
  ElasticoLineare: (
    item = { Fy: 400, E1: 200000, Fu: 500, esu: 10 },
    de = 1 / 10
  ) => {
    console.log("library > ElasticoLineare", item, de);

    const eu = +item.esu;

    const ey = (1000 * item.Fy) / item.E1;
    //console.log('library > ElasticoLineare > ey', ey);

    const Eh = (+item.Fu - item.Fy) / (+eu - ey);
    //console.log('library > ElasticoLineare > Eh', Eh);

    let fe = [],
      e = -eu;
    while (e <= eu) {
      const f =
        Math.abs(e) <= +ey
          ? Math.sign(e) * (Math.abs(e) / ey) * item.Fy
          : Math.sign(e) * (+item.Fy + (Math.abs(e) - ey) * Eh);
      //console.log('library > ElasticoLineare > e, f', e, f);

      fe.push([e, f]);
      e += de;
    }

    return fe;
  },
};

export default library;
