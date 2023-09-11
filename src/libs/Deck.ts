// class DeckJs
class DeckJs {
  beams: Array<any>;

  constructor(beams: Array<any> = []) {
    this.beams = beams;
  }

  // trova l'indice del valore più vicino a num nell'Array arr
  indexOfClosest = (num: number, arr: Array<number> = []) => {
    let curr = arr[0],
      diff = Math.abs(num - curr),
      index = 0;

    for (let val = 0; val < arr.length; val++) {
      let newdiff = Math.abs(num - arr[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = arr[val];
        index = val;
      }
    }
    return index;
  };

  //
  widthOfTheDeck() {
    //console.log("DeckJs > widthOfTheDeck");
    return this.beams.length > 0
      ? this.beams.map((b) => Number(b.beff)).reduce((i, j) => i + j, 0)
      : 0;
  }

  // yBeam
  // limiti delle travi lungo la larghezza dell'impalcato
  yBeam = () => {
    //console.log("DeckJs > yBeam", this.beams);

    const w = this.widthOfTheDeck();

    let yBeam: Array<number> = [-w / 2],
      yi: number = -w / 2;

    for (let b = 0; b < this.beams.length; b++) {
      const beam = this.beams[b];

      yi += beam.beff;

      yBeam.push(+yi);
    }

    return yBeam;
  };

  getBeam = (y: number = 0) => {
    const yBeam = this.yBeam();
    //console.log("DeckJs > getBeam > yBeam", yBeam);

    const index = this.indexOfClosest(y, yBeam);
    const indexOfBeam =
      index > 0 ? (y <= yBeam[index] ? index - 1 : index) : index;
    //console.log("DeckJs > getBeam > index", y, yBeam[index], index, indexOfBeam);
    return this.beams[indexOfBeam];
  };

  // di
  di = () => {
    //console.log("DeckJs > di", this.beams);

    const w = this.widthOfTheDeck();

    let di: Array<number> = [],
      yi: number = this.beams.length > 0 ? +this.beams[0].beff / 2 : 0;

    di.push(+yi - w / 2);

    for (let b = 1; b < this.beams.length; b++) {
      const bi = this.beams[b - 1],
        bj = this.beams[b];

      yi += bi.beff / 2 + bj.beff / 2;

      di.push(+yi - w / 2);
    }

    return di;
  };

  // di * ki
  diki = () => {
    //console.log("DeckJs > diki", beams);

    let diki: Array<number> = [];

    for (let b = 0; b < this.beams.length; b++) {
      const beam = this.beams[b];

      diki.push(+beam.E1I33 * this.di()[b]);
    }

    return diki;
  };

  // n and m
  nm = () => {
    //console.log("DeckJs > nm", beams);

    const di = this.di();

    let n: number = 0,
      m: number = 0;

    for (let b = 0; b < this.beams.length; b++) {
      const beam = this.beams[b];

      n += +beam.E1I33;
      m += +beam.E1I33 * di[b] * di[b];
    }

    return { n: n, m: m };
  };

  // rie
  // sulla trave
  rie = (yOrder: number = 0, e: number = 0) => {
    //console.log("DeckJs > rie", yOrder, e);

    const { n, m } = this.nm();

    const i = this.beams.findIndex((b) => b.yOrder == yOrder);
    const beam = i > -1 ? this.beams[i] : null;
    //console.log("DeckJs > rie > beam", beam);
    const ki = beam && "E1I33" in beam ? beam.E1I33 : 1;
    const di = this.di()[i];

    return ki / n + (e * di * ki) / m;
  };

  // rye
  // y rispetto a baricentro impalcato
  rye = (y: number = 0, e: number = 0) => {
    //console.log("DeckJs > rye", y, e);

    // get the beam
    const beam = this.getBeam(+y);

    const { n, m } = this.nm();

    //const i = this.beams.findIndex((b) => b.yOrder == yOrder);
    //const beam = i > -1 ? this.beams[i] : null;

    //console.log("DeckJs > rye > beam", beam);
    const ki = beam && "E1I33" in beam ? +beam.E1I33 : 1;

    //return ki / n + (e * di * ki) / m;
    return +ki / n + (e * y * ki) / m;
  };
}

// export
export { DeckJs };
