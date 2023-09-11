// class Sap2k

interface Point {
  X: number;
  Y: number;
}

class Sap2k {
  constructor() {}

  // generate coordinates {X, Y} from Sap2k variables in svg system
  getCoordinates = (Section: any = null) => {
    //console.log("Sap2k > getCoordinates", Section);
    if (!Section) return [];

    let coords: Array<any> = [];

    const X0: number = 0,
      Y0: number = 0;

    const Shape: string = Section.Shape;

    const t3: number = Number(Section.t3);
    const t2: number = Number(Section.t2);
    const tf: number = Number(Section.tf);
    const tw: number = Number(Section.tw);
    const t2b: number = Number(Section.t2b);
    const tfb: number = Number(Section.tfb);
    const FilletRadius: number = Number(Section.FilletRadius);

    if (Shape == "Rectangular") {
      let points: Array<Point> = [];

      points.push({ X: X0, Y: Y0 });
      points.push({ X: X0, Y: Y0 + t3 });
      points.push({ X: X0 + t2, Y: Y0 + t3 });
      points.push({ X: X0 + t2, Y: Y0 });

      coords.push({ points: points });
    }

    if (Shape == "Tee") {
      let points: Array<Point> = [];

      points.push({ X: X0, Y: Y0 });
      points.push({ X: X0, Y: Y0 + tf });
      points.push({ X: X0 + (t2 - tw) / 2 - FilletRadius, Y: Y0 + tf });
      if (FilletRadius > 0)
        points.push({ X: X0 + (t2 - tw) / 2, Y: Y0 + tf + FilletRadius });
      points.push({ X: X0 + (t2 - tw) / 2, Y: Y0 + t3 });
      points.push({ X: X0 + (t2 + tw) / 2, Y: Y0 + t3 });
      if (FilletRadius > 0)
        points.push({ X: X0 + (t2 + tw) / 2, Y: Y0 + tf + FilletRadius });
      points.push({ X: X0 + (t2 + tw) / 2 + FilletRadius, Y: Y0 + tf });
      points.push({ X: X0 + t2, Y: Y0 + tf });
      points.push({ X: X0 + t2, Y: Y0 });

      coords.push({ points: points });
    }

    if (Shape == "I/Wide Flange") {
      let points: Array<Point> = [];

      points.push({ X: X0, Y: Y0 });
      points.push({ X: X0, Y: Y0 + tf });
      points.push({ X: X0 + (t2 - tw) / 2 - FilletRadius, Y: Y0 + tf });
      if (FilletRadius > 0)
        points.push({ X: X0 + (t2 - tw) / 2, Y: Y0 + tf + FilletRadius });

      points.push({
        X: X0 + (t2 - tw) / 2,
        Y: Y0 + t3 - tfb - FilletRadius,
      });
      if (FilletRadius > 0)
        points.push({
          X: X0 + (t2 - tw) / 2 - FilletRadius,
          Y: Y0 + t3 - tfb,
        });
      points.push({ X: X0 + (t2 - tw) / 2 - (t2b - tw) / 2, Y: Y0 + t3 - tfb });
      points.push({ X: X0 + (t2 - tw) / 2 - (t2b - tw) / 2, Y: Y0 + t3 });
      points.push({ X: X0 + (t2 - tw) / 2 + (t2b + tw) / 2, Y: Y0 + t3 }); // 6
      points.push({ X: X0 + (t2 - tw) / 2 + (t2b + tw) / 2, Y: Y0 + t3 - tfb }); // 7

      points.push({ X: X0 + (t2 + tw) / 2 + FilletRadius, Y: Y0 + t3 - tfb });
      if (FilletRadius > 0)
        points.push({ X: X0 + (t2 + tw) / 2, Y: Y0 + t3 - tfb - FilletRadius });
      points.push({ X: X0 + (t2 + tw) / 2, Y: Y0 + tf + FilletRadius });
      if (FilletRadius > 0)
        points.push({ X: X0 + (t2 + tw) / 2 + FilletRadius, Y: Y0 + tf });
      points.push({ X: X0 + t2, Y: Y0 + tf });
      points.push({ X: X0 + t2, Y: Y0 });

      coords.push({ points: points });
    }

    if (Shape == "Box/Tube") {
      let points: Array<Point> = [];

      points.push({ X: X0, Y: Y0 });
      points.push({ X: X0, Y: Y0 + t3 });
      points.push({ X: X0 + t2, Y: Y0 + t3 });
      points.push({ X: X0 + t2, Y: Y0 });

      coords.push({ points: points });

      points = [];
      points.push({ X: X0 + tw, Y: Y0 + tf });
      points.push({ X: X0 + tw, Y: Y0 + t3 - tf });
      points.push({ X: X0 + t2 - tw, Y: Y0 + t3 - tf });
      points.push({ X: X0 + t2 - tw, Y: Y0 + tf });

      coords.push({ points: points, fill: "#FFF" });
    }

    if (Shape == "Circle") {
      let points: Array<Point> = [];

      const Radius: number = +t3 / 2;

      for (let q = 0; q < 360; q++) {
        const s: number = Math.sin((q * Math.PI) / 180);
        const c: number = Math.cos((q * Math.PI) / 180);

        points.push({ X: X0 + Radius * (1 + c), Y: Y0 + Radius * (1 + s) });
      }

      coords.push({ points: points });
    }

    if (Shape == "Pipe") {
      let points: Array<Point> = [];

      const Radius3: number = +t3 / 2;
      const Radius2: number = +t3 / 2 - tw;

      for (let q = 0; q < 360; q++) {
        const s: number = Math.sin((q * Math.PI) / 180);
        const c: number = Math.cos((q * Math.PI) / 180);

        points.push({
          X: X0 + Radius3 + Radius3 * c,
          Y: Y0 + Radius3 + Radius3 * s,
        });
      }
      coords.push({ points: points });

      points = [];

      for (let q = 0; q < 360; q++) {
        const s: number = Math.sin((q * Math.PI) / 180);
        const c: number = Math.cos((q * Math.PI) / 180);

        points.push({
          X: X0 + Radius3 + Radius2 * c,
          Y: Y0 + Radius3 + Radius2 * s,
        });
      }
      coords.push({ points: points, fill: "#FFF" });
    }

    if (Shape == "PC Conc I Girder") {
      let points: Array<Point> = [];

      const D1: number = Section.D1;
      const T1: number = Section.T1;
      const B1: number = Section.B1;
      const B2: number = Section.B2;
      const D2: number = Section.D2;
      const D3: number = Section.D3;
      const D5: number = Section.D5;
      const D6: number = Section.D6;

      points.push({ X: X0, Y: Y0 });
      points.push({ X: X0, Y: Y0 + D2 });
      points.push({ X: X0 + (B1 - T1) / 2, Y: Y0 + D2 + D3 });
      points.push({ X: X0 + (B1 - T1) / 2, Y: Y0 + D1 - D5 - D6 });
      points.push({ X: X0 + (B1 - T1) / 2 - (B2 - T1) / 2, Y: Y0 + D1 - D5 });
      points.push({ X: X0 + (B1 - T1) / 2 - (B2 - T1) / 2, Y: Y0 + D1 });
      points.push({ X: X0 + (B1 - T1) / 2 + (B2 + T1) / 2, Y: Y0 + D1 });
      points.push({ X: X0 + (B1 - T1) / 2 + (B2 + T1) / 2, Y: Y0 + D1 - D5 });
      points.push({ X: X0 + (B1 + T1) / 2, Y: Y0 + D1 - D5 - D6 });
      points.push({ X: X0 + (B1 + T1) / 2, Y: Y0 + D2 + D3 });
      points.push({ X: X0 + B1, Y: Y0 + D2 });
      points.push({ X: X0 + B1, Y: Y0 });

      coords.push({ points: points });
    }

    return coords;
  };

  // generate rebars circles {X, Y, radius} from Sap2k variables in svg system
  getRebars = (Section: any = null) => {
    //console.log("Sap2k > getRebars", Section);
    if (!Section) return [];

    const {
      Shape,
      ConcBeam,
      ConcCol,
      t2,
      t3,
      tw,
      tf,
      t2b,
      //tfb,
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
    }: {
      Shape: string;
      ConcBeam: string;
      ConcCol: string;
      t2: number;
      t3: number;
      tw: number;
      tf: number;
      t2b: number;
      //tfb: number,
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
    } = Section;

    //
    if (Shape == "PC Conc I Girder") return [];

    const X0 = 0,
      Y0 = 0;

    let rebars: Array<any> = [],
      dx: number = 0,
      dy: number = 0;

    // Beam
    if (ConcBeam == "Yes") {
      const Cover = Math.min(+TopCover, +BotCover);

      const TopRebarRadius: number = Math.sqrt(+TopRebarArea / Math.PI);
      const TopRebarNumber =
        "TopRebarNumber" in Section ? Number(Section.TopRebarNumber) : 2;
      const BotRebarRadius: number = Math.sqrt(+BotRebarArea / Math.PI);
      const BotRebarNumber =
        "BotRebarNumber" in Section ? Number(Section.BotRebarNumber) : 2;

      dx =
        TopRebarNumber > 1
          ? (+t2 - 2 * Cover - 2 * BarSizeC - 2 * TopRebarRadius) /
            (+TopRebarNumber - 1)
          : 0;
      for (let i = 0; i < +TopRebarNumber; i++) {
        rebars.push({
          x: X0 + Cover + BarSizeC + TopRebarRadius + i * dx,
          y: Y0 + TopCover + BarSizeC + TopRebarRadius,
          r: TopRebarRadius,
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
            r: BotRebarRadius,
          });
        }
      }

      // Tee
      if (Shape == "Tee") {
        dx =
          +BotRebarNumber > 1
            ? (+tw - 2 * Cover - 2 * BotRebarRadius - 2 * BarSizeC) /
              (+BotRebarNumber - 1)
            : 0;
        for (let i = 0; i < +BotRebarNumber; i++) {
          rebars.push({
            x: X0 + (t2 - tw) / 2 + Cover + BarSizeC + BotRebarRadius + i * dx,
            y: Y0 + t3 - BotCover - BarSizeC - BotRebarRadius,
            r: BotRebarRadius,
          });
        }
      }

      // I/Wide Flange
      if (Shape == "I/Wide Flange") {
        dx =
          +BotRebarNumber > 1
            ? (+t2b - 2 * Cover - 2 * BotRebarRadius - 2 * BarSizeC) /
              (+BotRebarNumber - 1)
            : 0;
        for (let i = 0; i < +BotRebarNumber; i++) {
          rebars.push({
            x: X0 + (t2 - t2b) / 2 + Cover + BarSizeC + BotRebarRadius + i * dx,
            y: Y0 + t3 - BotCover - BarSizeC - BotRebarRadius,
            r: BotRebarRadius,
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
            r: TopRebarRadius,
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
            r: BotRebarRadius,
          });
        }
      }
    }

    // Column
    if (ConcCol == "Yes") {
      const Radius: number = Number(+BarSizeL / 2);
      const NumBars2Dir =
        "NumBars2Dir" in Section
          ? Number(+Section.NumBars2Dir) == 1
            ? 2
            : Number(+Section.NumBars2Dir)
          : 2;
      const NumBars3Dir =
        "NumBars3Dir" in Section
          ? Number(+Section.NumBars3Dir) == 1
            ? 2
            : Number(+Section.NumBars3Dir)
          : 2;

      dx =
        NumBars2Dir > 1
          ? (+t2 - 2 * Cover - 2 * Radius - 2 * BarSizeC) / (NumBars2Dir - 1)
          : 0;
      for (let i = 0; i < +NumBars2Dir; i++) {
        rebars.push({
          x: X0 + Cover + BarSizeC + Radius + i * dx,
          y: Y0 + Cover + BarSizeC + Radius,
          r: Radius,
        });
        rebars.push({
          x: X0 + Cover + BarSizeC + Radius + i * dx,
          y: Y0 + t3 - (Cover + BarSizeC + Radius),
          r: Radius,
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
          r: Radius,
        });
        rebars.push({
          x: X0 + t2 - Cover - BarSizeC - Radius,
          y: Y0 + Cover + BarSizeC + Radius + i * dy,
          r: Radius,
        });
      }

      // Box/Tube
      if (Shape == "Box/Tube") {
        rebars = [];

        // top left
        rebars.push({
          x: X0 + Cover + BarSizeC + Radius,
          y: Y0 + Cover + BarSizeC + Radius,
          r: Radius,
        });

        rebars.push({
          x: X0 + tw - (Cover + BarSizeC + Radius),
          y: Y0 + Cover + BarSizeC + Radius,
          r: Radius,
        });

        rebars.push({
          x: X0 + Cover + BarSizeC + Radius,
          y: Y0 + tf - (+Cover + BarSizeC + Radius),
          r: Radius,
        });

        rebars.push({
          x: X0 + tw - (+Cover + BarSizeC + Radius),
          y: Y0 + tf - (+Cover + BarSizeC + Radius),
          r: Radius,
        });

        // bottom left
        rebars.push({
          x: X0 + Cover + BarSizeC + Radius,
          y: Y0 + t3 - (Cover + BarSizeC + Radius),
          r: Radius,
        });

        rebars.push({
          x: X0 + tw - (Cover + BarSizeC + Radius),
          y: Y0 + t3 - (Cover + BarSizeC + Radius),
          r: Radius,
        });

        rebars.push({
          x: X0 + Cover + BarSizeC + Radius,
          y: Y0 + t3 - tf + (Cover + BarSizeC + Radius),
          r: Radius,
        });

        rebars.push({
          x: X0 + tw - (Cover + BarSizeC + Radius),
          y: Y0 + t3 - tf + (Cover + BarSizeC + Radius),
          r: Radius,
        });

        // top right
        rebars.push({
          x: X0 + t2 - (Cover + BarSizeC + Radius),
          y: Y0 + Cover + BarSizeC + Radius,
          r: Radius,
        });

        rebars.push({
          x: X0 + t2 - tw + (Cover + BarSizeC + Radius),
          y: Y0 + Cover + BarSizeC + Radius,
          r: Radius,
        });

        rebars.push({
          x: X0 + t2 - (Cover + BarSizeC + Radius),
          y: Y0 + tf - (Cover + BarSizeC + Radius),
          r: Radius,
        });

        rebars.push({
          x: X0 + t2 - tw + (Cover + BarSizeC + Radius),
          y: Y0 + tf - (Cover + BarSizeC + Radius),
          r: Radius,
        });

        // bottom right
        rebars.push({
          x: X0 + t2 - (Cover + BarSizeC + Radius),
          y: Y0 + t3 - (Cover + BarSizeC + Radius),
          r: Radius,
        });

        rebars.push({
          x: X0 + t2 - tw + (Cover + BarSizeC + Radius),
          y: Y0 + t3 - (Cover + BarSizeC + Radius),
          r: Radius,
        });

        rebars.push({
          x: X0 + t2 - (Cover + BarSizeC + Radius),
          y: Y0 + t3 - tf + (Cover + BarSizeC + Radius),
          r: Radius,
        });

        rebars.push({
          x: X0 + t2 - tw + (Cover + BarSizeC + Radius),
          y: Y0 + t3 - tf + (Cover + BarSizeC + Radius),
          r: Radius,
        });

        // X
        dx = +NumBars2Dir > 1 ? (+t2 - 2 * tw) / (+NumBars2Dir - 1) : 0;
        for (let i = 0; i < +NumBars2Dir; i++) {
          rebars.push({
            x: X0 + tw + i * dx,
            y: Y0 + Cover + BarSizeC + Radius,
            r: Radius,
          });
          rebars.push({
            x: X0 + tw + i * dx,
            y: Y0 + tf - (+Cover + BarSizeC + Radius),
            r: Radius,
          });
          rebars.push({
            x: X0 + tw + i * dx,
            y: Y0 + t3 - tf + (+Cover + BarSizeC + Radius),
            r: Radius,
          });
          rebars.push({
            x: X0 + tw + i * dx,
            y: Y0 + t3 - (+Cover + BarSizeC + Radius),
            r: Radius,
          });
        }

        // Y
        dy = +NumBars3Dir > 1 ? (+t3 - 2 * tf) / (+NumBars3Dir - 1) : 0;
        for (let i = 0; i < +NumBars3Dir; i++) {
          rebars.push({
            x: X0 + Cover + BarSizeC + Radius,
            y: Y0 + tf + i * dy,
            r: Radius,
          });
          rebars.push({
            x: X0 + tw - (+Cover + BarSizeC + Radius),
            y: Y0 + tf + i * dy,
            r: Radius,
          });
          rebars.push({
            x: X0 + t2 - (+Cover + BarSizeC + Radius),
            y: Y0 + tf + i * dy,
            r: Radius,
          });
          rebars.push({
            x: X0 + t2 - tw + (+Cover + BarSizeC + Radius),
            y: Y0 + tf + i * dy,
            r: Radius,
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
            r: Radius,
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
            r: Radius,
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
            r: Radius,
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
            r: Radius,
          });

          q += dq;
        }
      }
    }

    // get list of Rebars
    const SectionRebars = "Rebar" in Section ? Section["Rebar"] : [];
    //console.log("Sap2k > getRebars > SectionRebars", SectionRebars);

    // Rebars
    for (const rebar of SectionRebars) {
      rebars.push({
        x: X0 + rebar.X,
        y: Y0 + t3 - rebar.Y,
        r: Math.sqrt(+rebar.Area / Math.PI),
      });
    }

    return rebars;
  };

  // generate tendons circles {X, Y, radius} from Sap2k variables in svg system
  getTendons = (Section: any = null) => {
    //console.log("Sap2k > getTendons", Section);
    if (!Section) return [];

    const { Shape, B1, D1 }: { Shape: string; B1: number; D1: number } =
      Section;

    // get list of tendons
    const SectionTendons =
      "Frame Props 15 - Tendon Loc" in Section
        ? Section["Frame Props 15 - Tendon Loc"]
        : [];
    //console.log("Sap2k > getTendons > SectionTendons", SectionTendons);

    //
    if (Shape != "PC Conc I Girder") return [];

    const X0 = 0,
      Y0 = 0;

    // Tendons
    let tendons: Array<any> = [];
    for (const tendon of SectionTendons) {
      tendons.push({
        x: X0 + B1 / 2,
        y: Y0 + D1 - tendon.Y,
        r: Math.sqrt(+tendon.Area / Math.PI),
      });
    }

    return tendons;
  };

  // generate FRPbars circles {X, Y, radius} from Sap2k variables in svg system
  getFRPbars = (Section: any = null) => {
    //console.log("Sap2k > getFRPbars", Section);
    if (!Section) return [];

    const {
      Shape,
      ConcBeam,
      ConcCol,
      t2,
      t3,
      tw,
      tf,
      t2b,
      //tfb,
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
    }: {
      Shape: string;
      ConcBeam: string;
      ConcCol: string;
      t2: number;
      t3: number;
      tw: number;
      tf: number;
      t2b: number;
      //tfb: number,
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
    } = Section;

    //
    if (Shape == "PC Conc I Girder") return [];

    const X0 = 0,
      Y0 = 0;

    let FRPbars: Array<any> = [],
      dx: number = 0,
      dy: number = 0;

    // Beam
    if (ConcBeam == "Yes") {
      const Cover = Math.min(+TopCover, +BotCover);

      const TopFRPbarRadius: number = Math.sqrt(+TopFRPbarArea / Math.PI);
      const TopFRPbarNumber =
        "TopFRPbarNumber" in Section ? Number(Section.TopFRPbarNumber) : 2;
      const BotFRPbarRadius: number = Math.sqrt(+BotFRPbarArea / Math.PI);
      const BotFRPbarNumber =
        "BotFRPbarNumber" in Section ? Number(Section.BotFRPbarNumber) : 2;

      dx =
        TopFRPbarNumber > 1
          ? (+t2 - 2 * Cover - 2 * FRPBarSizeC - 2 * TopFRPbarRadius) /
            (+TopFRPbarNumber - 1)
          : 0;
      for (let i = 0; i < +TopFRPbarNumber; i++) {
        FRPbars.push({
          x: X0 + Cover + FRPBarSizeC + TopFRPbarRadius + i * dx,
          y: Y0 + TopCover + FRPBarSizeC + TopFRPbarRadius,
          r: TopFRPbarRadius,
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
          FRPbars.push({
            x: X0 + Cover + FRPBarSizeC + BotFRPbarRadius + i * dx,
            y: Y0 + t3 - BotCover - FRPBarSizeC - BotFRPbarRadius,
            r: BotFRPbarRadius,
          });
        }
      }

      // Tee
      if (Shape == "Tee") {
        dx =
          +BotFRPbarNumber > 1
            ? (+tw - 2 * Cover - 2 * BotFRPbarRadius - 2 * FRPBarSizeC) /
              (+BotFRPbarNumber - 1)
            : 0;
        for (let i = 0; i < +BotFRPbarNumber; i++) {
          FRPbars.push({
            x:
              X0 +
              (t2 - tw) / 2 +
              Cover +
              FRPBarSizeC +
              BotFRPbarRadius +
              i * dx,
            y: Y0 + t3 - BotCover - FRPBarSizeC - BotFRPbarRadius,
            r: BotFRPbarRadius,
          });
        }
      }

      // I/Wide Flange
      if (Shape == "I/Wide Flange") {
        dx =
          +BotFRPbarNumber > 1
            ? (+t2b - 2 * Cover - 2 * BotFRPbarRadius - 2 * FRPBarSizeC) /
              (+BotFRPbarNumber - 1)
            : 0;
        for (let i = 0; i < +BotFRPbarNumber; i++) {
          FRPbars.push({
            x:
              X0 +
              (t2 - t2b) / 2 +
              Cover +
              FRPBarSizeC +
              BotFRPbarRadius +
              i * dx,
            y: Y0 + t3 - BotCover - FRPBarSizeC - BotFRPbarRadius,
            r: BotFRPbarRadius,
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
          FRPbars.push({
            x: X0 + Cover + FRPBarSizeC + TopFRPbarRadius + i * dx,
            y: Y0 + TopCover + FRPBarSizeC + TopFRPbarRadius,
            r: TopFRPbarRadius,
          });
        }

        // bottom
        dx =
          +BotFRPbarNumber > 1
            ? (+B2 - 2 * Cover - 2 * BotFRPbarRadius - 2 * FRPBarSizeC) /
              (+BotFRPbarNumber - 1)
            : 0;
        for (let i = 0; i < +BotFRPbarNumber; i++) {
          FRPbars.push({
            x:
              X0 +
              (B1 - B2) / 2 +
              Cover +
              FRPBarSizeC +
              BotFRPbarRadius +
              i * dx,
            y: Y0 + D1 - BotCover - FRPBarSizeC - BotFRPbarRadius,
            r: BotFRPbarRadius,
          });
        }
      }
    }

    // Column
    if (ConcCol == "Yes") {
      const Radius: number = Number(+FRPBarSizeL / 2);
      const NumFRPBars2Dir =
        "NumFRPBars2Dir" in Section
          ? Number(+Section.NumFRPBars2Dir) == 1
            ? 2
            : Number(+Section.NumFRPBars2Dir)
          : 2;
      const NumFRPBars3Dir =
        "NumFRPBars3Dir" in Section
          ? Number(+Section.NumFRPBars3Dir) == 1
            ? 2
            : Number(+Section.NumFRPBars3Dir)
          : 2;

      dx =
        NumFRPBars2Dir > 1
          ? (+t2 - 2 * Cover - 2 * Radius - 2 * FRPBarSizeC) /
            (NumFRPBars2Dir - 1)
          : 0;
      for (let i = 0; i < +NumFRPBars2Dir; i++) {
        FRPbars.push({
          x: X0 + Cover + FRPBarSizeC + Radius + i * dx,
          y: Y0 + Cover + FRPBarSizeC + Radius,
          r: Radius,
        });
        FRPbars.push({
          x: X0 + Cover + FRPBarSizeC + Radius + i * dx,
          y: Y0 + t3 - (Cover + FRPBarSizeC + Radius),
          r: Radius,
        });
      }

      dy =
        NumFRPBars3Dir > 1
          ? (+t3 - 2 * Cover - 2 * Radius - 2 * FRPBarSizeC) /
            (+NumFRPBars3Dir - 1)
          : 0;
      for (let i = 1; i < +NumFRPBars3Dir - 1; i++) {
        FRPbars.push({
          x: X0 + Cover + FRPBarSizeC + Radius,
          y: Y0 + Cover + FRPBarSizeC + Radius + i * dy,
          r: Radius,
        });
        FRPbars.push({
          x: X0 + t2 - Cover - FRPBarSizeC - Radius,
          y: Y0 + Cover + FRPBarSizeC + Radius + i * dy,
          r: Radius,
        });
      }

      // Box/Tube
      if (Shape == "Box/Tube") {
        FRPbars = [];

        // top left
        FRPbars.push({
          x: X0 + Cover + FRPBarSizeC + Radius,
          y: Y0 + Cover + FRPBarSizeC + Radius,
          r: Radius,
        });

        FRPbars.push({
          x: X0 + tw - (Cover + FRPBarSizeC + Radius),
          y: Y0 + Cover + FRPBarSizeC + Radius,
          r: Radius,
        });

        FRPbars.push({
          x: X0 + Cover + FRPBarSizeC + Radius,
          y: Y0 + tf - (+Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        FRPbars.push({
          x: X0 + tw - (+Cover + FRPBarSizeC + Radius),
          y: Y0 + tf - (+Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        // bottom left
        FRPbars.push({
          x: X0 + Cover + FRPBarSizeC + Radius,
          y: Y0 + t3 - (Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        FRPbars.push({
          x: X0 + tw - (Cover + FRPBarSizeC + Radius),
          y: Y0 + t3 - (Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        FRPbars.push({
          x: X0 + Cover + FRPBarSizeC + Radius,
          y: Y0 + t3 - tf + (Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        FRPbars.push({
          x: X0 + tw - (Cover + FRPBarSizeC + Radius),
          y: Y0 + t3 - tf + (Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        // top right
        FRPbars.push({
          x: X0 + t2 - (Cover + FRPBarSizeC + Radius),
          y: Y0 + Cover + FRPBarSizeC + Radius,
          r: Radius,
        });

        FRPbars.push({
          x: X0 + t2 - tw + (Cover + FRPBarSizeC + Radius),
          y: Y0 + Cover + FRPBarSizeC + Radius,
          r: Radius,
        });

        FRPbars.push({
          x: X0 + t2 - (Cover + FRPBarSizeC + Radius),
          y: Y0 + tf - (Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        FRPbars.push({
          x: X0 + t2 - tw + (Cover + FRPBarSizeC + Radius),
          y: Y0 + tf - (Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        // bottom right
        FRPbars.push({
          x: X0 + t2 - (Cover + FRPBarSizeC + Radius),
          y: Y0 + t3 - (Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        FRPbars.push({
          x: X0 + t2 - tw + (Cover + FRPBarSizeC + Radius),
          y: Y0 + t3 - (Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        FRPbars.push({
          x: X0 + t2 - (Cover + FRPBarSizeC + Radius),
          y: Y0 + t3 - tf + (Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        FRPbars.push({
          x: X0 + t2 - tw + (Cover + FRPBarSizeC + Radius),
          y: Y0 + t3 - tf + (Cover + FRPBarSizeC + Radius),
          r: Radius,
        });

        // X
        dx = +NumFRPBars2Dir > 1 ? (+t2 - 2 * tw) / (+NumFRPBars2Dir - 1) : 0;
        for (let i = 0; i < +NumFRPBars2Dir; i++) {
          FRPbars.push({
            x: X0 + tw + i * dx,
            y: Y0 + Cover + FRPBarSizeC + Radius,
            r: Radius,
          });
          FRPbars.push({
            x: X0 + tw + i * dx,
            y: Y0 + tf - (+Cover + FRPBarSizeC + Radius),
            r: Radius,
          });
          FRPbars.push({
            x: X0 + tw + i * dx,
            y: Y0 + t3 - tf + (+Cover + FRPBarSizeC + Radius),
            r: Radius,
          });
          FRPbars.push({
            x: X0 + tw + i * dx,
            y: Y0 + t3 - (+Cover + FRPBarSizeC + Radius),
            r: Radius,
          });
        }

        // Y
        dy = +NumFRPBars3Dir > 1 ? (+t3 - 2 * tf) / (+NumFRPBars3Dir - 1) : 0;
        for (let i = 0; i < +NumFRPBars3Dir; i++) {
          FRPbars.push({
            x: X0 + Cover + FRPBarSizeC + Radius,
            y: Y0 + tf + i * dy,
            r: Radius,
          });
          FRPbars.push({
            x: X0 + tw - (+Cover + FRPBarSizeC + Radius),
            y: Y0 + tf + i * dy,
            r: Radius,
          });
          FRPbars.push({
            x: X0 + t2 - (+Cover + FRPBarSizeC + Radius),
            y: Y0 + tf + i * dy,
            r: Radius,
          });
          FRPbars.push({
            x: X0 + t2 - tw + (+Cover + FRPBarSizeC + Radius),
            y: Y0 + tf + i * dy,
            r: Radius,
          });
        }
      }

      if (Shape == "Circle") {
        FRPbars = [];

        const Radius3: number = +t3 / 2;

        // external
        let q = 0,
          dq = NumFRPBars3Dir > 0 ? 360 / +NumFRPBars3Dir : 360;
        //console.log(NumBars3Dir, dq);

        while (q < 360 && NumFRPBars3Dir > 0) {
          //console.log(q);
          const s: number = Math.sin((q * Math.PI) / 180);
          const c: number = Math.cos((q * Math.PI) / 180);

          FRPbars.push({
            x: X0 + Radius3 + (Radius3 - Cover - FRPBarSizeC - Radius) * c,
            y: Y0 + Radius3 + (Radius3 - Cover - FRPBarSizeC - Radius) * s,
            r: Radius,
          });

          q += dq;
        }

        // internal
        q = 0;
        dq = NumFRPBars2Dir > 0 ? 360 / +NumFRPBars2Dir : 360;

        while (q < 360 && NumFRPBars2Dir > 0) {
          const s: number = Math.sin((q * Math.PI) / 180);
          const c: number = Math.cos((q * Math.PI) / 180);

          FRPbars.push({
            x: X0 + Radius3 + (Cover + FRPBarSizeC + Radius) * c,
            y: Y0 + Radius3 + (Cover + FRPBarSizeC + Radius) * s,
            r: Radius,
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
        //console.log(NumBars3Dir, dq);

        while (q < 360 && NumFRPBars3Dir > 0) {
          //console.log(q);
          const s: number = Math.sin((q * Math.PI) / 180);
          const c: number = Math.cos((q * Math.PI) / 180);

          FRPbars.push({
            x: X0 + Radius3 + (Radius3 - Cover - FRPBarSizeC - Radius) * c,
            y: Y0 + Radius3 + (Radius3 - Cover - FRPBarSizeC - Radius) * s,
            r: Radius,
          });

          q += dq;
        }

        // internal
        q = 0;
        dq = NumFRPBars2Dir > 0 ? 360 / +NumFRPBars2Dir : 360;

        while (q < 360 && NumFRPBars2Dir > 0) {
          const s: number = Math.sin((q * Math.PI) / 180);
          const c: number = Math.cos((q * Math.PI) / 180);

          FRPbars.push({
            x: X0 + Radius3 + (Radius2 + Cover + FRPBarSizeC + Radius) * c,
            y: Y0 + Radius3 + (Radius2 + Cover + FRPBarSizeC + Radius) * s,
            r: Radius,
          });

          q += dq;
        }
      }
    }

    // get list of FRPbars
    const SectionFRPbars = "FRPbar" in Section ? Section["FRPbar"] : [];
    //console.log("Sap2k > getFRPbars > SectionFRPbars", SectionFRPbars);

    // FRPbars
    for (const FRPbar of SectionFRPbars) {
      FRPbars.push({
        x: X0 + FRPbar.X,
        y: Y0 + t3 - FRPbar.Y,
        r: Math.sqrt(+FRPbar.Area / Math.PI),
      });
    }

    return FRPbars;
  };

  // prepare polygons of a SD Section
  // to calculate the section properties
  getSDSectionPolygons = (
    Section: any = null,
    Materials: any = [],
    Polygons: any = []
  ) => {
    //console.log("Sap2k > getSDSectionPolygons", Section, Materials, Polygons);
    if (!Section) return [];
    if (Materials.length < 1) return [];
    if (Polygons.length < 1) return [];

    const lPolygons: any = Polygons.filter(
      (p: any) => p.SectionName == Section.SectionName
    ).map((p: any) => {
      const obj = Object.assign({}, p);

      const index = Materials.findIndex(
        (m: any) => m.Material == obj["ShapeMat"]
      );
      const Material = index > -1 ? Materials[index] : {};
      //console.log("Sap2k > getSDSectionPolygons > Material", Material);

      obj["ShapeMatColor"] = "Color" in Material ? Material.Color : undefined;
      obj["ShapeMatE1"] = "E1" in Material ? Material.E1 : undefined; // 1

      return obj;
    });
    //console.log("Sap2k > getSDSectionPolygons > lPolygons", lPolygons);

    return lPolygons;
  };

  // https://en.wikipedia.org/wiki/Shoelace_formula
  // https://en.wikipedia.org/wiki/Polygon#Area_and_centroid
  // https://en.wikipedia.org/wiki/Second_moment_of_area#Any_cross_section_defined_as_polygon
  getShapeProperties = (coordinates: any = null) => {
    //console.log("Sap2k > getShapeProperties", coordinates);
    if (!coordinates) return [];

    let Agi: number = 0,
      Cxi: number = 0,
      Cyi: number = 0,
      Jxxi: number = 0,
      Jyyi: number = 0;
    for (let p = 0; p < coordinates.length; p++) {
      const p1 = coordinates[p],
        p2 = p + 1 == coordinates.length ? coordinates[0] : coordinates[p + 1];
      const [x1, y1] = [p1.X, p1.Y].map((j) => Number(j)); // Number
      const [x2, y2] = [p2.X, p2.Y].map((j) => Number(j)); // Number
      //console.log("Sap2k > getShapeProperties", p, x1, y1, x2, y2);

      // bounds

      //
      Agi += (+x1 * y2 - x2 * y1) / 2;
      Cxi += ((+x1 + x2) * (+x1 * y2 - x2 * y1)) / 6;
      Cyi += ((+y1 + y2) * (+x1 * y2 - x2 * y1)) / 6;

      Jxxi += ((+x1 * y2 - x2 * y1) * (+y1 * y1 + y1 * y2 + y2 * y2)) / 12;
      Jyyi += ((+x1 * y2 - x2 * y1) * (+x1 * x1 + x1 * x2 + x2 * x2)) / 12;

      //console.log("Sap2k > getShapeProperties", p, Agi);
    }

    // i-esima shape
    const sign = Math.sign(Agi);

    Agi = Math.abs(Agi);
    Cxi = sign * Cxi;
    Cyi = sign * Cyi;
    Jxxi = Math.abs(Jxxi);
    Jyyi = Math.abs(Jyyi);

    return { Ag: Agi, Cx: Cxi, Cy: Cyi, Jxx: Jxxi, Jyy: Jyyi };
  };

  getSectionProperties = (
    Section: any = null, // = Section
    Materials: any = [],
    Polygons: any = [] // Polygons of this Section or all polygons ???
  ) => {
    //console.log("Sap2k > getSectionProperties", Section, Materials, Polygons);
    if (!Section) return [];

    const { SectionName, Shape, Material } = Section;

    const index = Materials.findIndex((m: any) => m.Material == Material);
    const BaseMat = index > -1 ? Materials[index] : null;
    //console.log("Sap2k > getSectionProperties > BaseMat", BaseMat);
    const BaseMatE1 = BaseMat && "E1" in BaseMat ? Number(BaseMat.E1) : 1;
    //console.log("Sap2k > getSectionProperties > BaseMatE1", BaseMatE1);

    if (Shape == "SD Section") {
      const vertex = Polygons.filter((p: any) => p.SectionName == SectionName);
      //console.log("Sap2k > getSectionProperties > vertex", vertex);

      let ShapeNames = vertex.map((v: any) => v.ShapeName);
      ShapeNames = [...new Set(ShapeNames)];
      //console.log("Sap2k > getSectionProperties > ShapeNames", ShapeNames);

      let Ag: number = 0,
        Cx: number = 0,
        Cy: number = 0,
        Jxx: number = 0,
        Jyy: number = 0;

      for (const s in ShapeNames) {
        const ShapeName: string = ShapeNames[s];

        const coordinates = vertex.filter((v: any) => v.ShapeName == ShapeName);
        //console.log("Sap2k > getSectionProperties > coordinates", coordinates);

        const ShapeMat: string =
          "ShapeMat" in coordinates[0] ? coordinates[0]["ShapeMat"] : null;
        const index = Materials.findIndex((m: any) => m.Material == ShapeMat);
        const sMat = index > -1 ? Materials[index] : null;
        const E1 = sMat && "E1" in sMat ? Number(sMat.E1) : 1;
        const ni = E1 / BaseMatE1;
        //console.log("Sap2k > getSectionProperties > ni", ni);

        const propsi: any = this.getShapeProperties(coordinates);
        //console.log("Sap2k > getSectionProperties > propsi", propsi);

        // total
        Ag += ni * propsi.Ag;
        Cx += ni * propsi.Cx;
        Cy += ni * propsi.Cy;
        Jxx += ni * propsi.Jxx;
        Jyy += ni * propsi.Jyy;
      }

      const Xg = Ag > 0 ? Cx / Ag : 0,
        Yg = Ag > 0 ? Cy / Ag : 0;

      const JXg = +Jxx - Ag * Yg * Yg;
      const JYg = +Jyy - Ag * Xg * Xg;

      return {
        Xg: Xg,
        Yg: Yg,
        Ag: Ag,
        JXg: JXg,
        JYg: JYg,
      };
    } else {
      const coordinates = this.getCoordinates(Section);
      //console.log("Sap2k > getSectionProperties > coordinates", coordinates);

      // da sistemare per le sezioni con il core vuoto (box/tube, pipe)
      const points = coordinates.length > 0 ? coordinates[0].points : [];
      const props: any = this.getShapeProperties(points);

      const Xg = props.Ag > 0 ? props.Cx / props.Ag : 0,
        Yg = props.Ag > 0 ? props.Cy / props.Ag : 0;

      return {
        Xg: Xg,
        Yg: Yg,
        Ag: props.Ag,
        JXg: +props.Jxx - props.Ag * Yg * Yg,
        JYg: +props.Jyy - props.Ag * Xg * Xg,
      };
    }

    return null;
  };

  tables = (CurrUnits: Array<string> = ["N", "mm", "C"]) => {
    //console.log("Sap2k > tables", CurrUnits);

    const [uForce, uLength, uTemperature] = CurrUnits;

    return {
      "Active Degrees of Freedom": {
        table: "Active Degrees of Freedom",
        keys: ["UX", "UY", "UZ", "RX", "RY", "RZ"],
        units: ["Yes/No", "Yes/No", "Yes/No", "Yes/No", "Yes/No", "Yes/No"],
        records: [],
      },
      "Analysis Options": {
        table: "Analysis Options",
        keys: [
          "Solver",
          "SolverProc",
          "Force32Bit",
          "StiffCase",
          "GeomMod",
          "HingeOpt",
          "NumAThreads",
          "MaxFileSize",
          "UseMMFiles",
          "AllowDiff",
        ],
        units: [
          "Text",
          "Text",
          "Yes/No",
          "Text",
          "Yes/No",
          "Text",
          "Unitless",
          "Unitless",
          "Text",
          "Yes/No",
        ],
        records: [],
      },
      "Auto Wave 3 - Char - General": {
        table: "Auto Wave 3 - Wave Characteristics - General",
        keys: [
          "WaveChar",
          "WaveType",
          "KinFactor",
          "SWaterDepth",
          "WaveHeight",
          "WavePeriod",
          "WaveTheory",
        ],
        units: ["Text", "Text", "Unitless", uLength, uLength, "Sec", "Text"],
        records: [],
      },
      "Case - Modal 1 - General": {
        table: "Case - Modal 1 - General",
        keys: [
          "Case",
          "ModeType",
          "MaxNumModes",
          "MinNumModes",
          "EigenShift",
          "EigenCutoff",
          "EigenTol",
          "AutoShift",
        ],
        units: [
          "Text",
          "Text",
          "Unitless",
          "Unitless",
          "Cyc/sec",
          "Cyc/sec",
          "Unitless",
          "Text",
        ],
        records: [],
      },
      "Case - Static 1 - Load Assigns": {
        table: "Case - Static 1 - Load Assignments",
        keys: ["Case", "LoadType", "LoadName", "LoadSF"],
        units: ["Text", "Text", "Text", "Unitless"],
        records: [],
      },
      "Connectivity - Frame": {
        table: "Connectivity - Frame",
        keys: [
          "Frame",
          "JointI",
          "JointJ",
          "IsCurved",
          "Length",
          "CentroidX",
          "CentroidY",
          "CentroidZ",
          "GUID",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Yes/No",
          uLength,
          uLength,
          uLength,
          uLength,
          "Text",
        ],
        records: [],
      },
      "Connectivity - Link": {
        table: "Connectivity - Link",
        keys: [
          "Link",
          "JointI",
          "JointJ",
          "Length",
          "CentroidX",
          "CentroidY",
          "CentroidZ",
          "GUID",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          uLength,
          uLength,
          uLength,
          uLength,
          "Text",
        ],
        records: [],
      },
      "Coordinate Systems": {
        table: "Coordinate Systems",
        keys: ["Name", "Type", "X", "Y", "Z", "AboutZ", "AboutY", "AboutX"],
        units: [
          "Text",
          "Text",
          uLength,
          uLength,
          uLength,
          "Degrees",
          "Degrees",
          "Degrees",
        ],
        records: [],
      },
      "Database Format Types": {
        table: "Database Format Types",
        keys: ["UnitsCurr", "OverrideE"],
        units: ["Yes/No", "Yes/No"],
        records: [],
      },
      "Frame Auto Mesh": {
        table: "Frame Auto Mesh Assignments",
        keys: [
          "Frame",
          "AutoMesh",
          "AtJoints",
          "AtFrames",
          "NumSegments",
          "MaxLength",
          "MaxDegrees",
        ],
        units: [
          "Text",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Unitless",
          uLength,
          "Degrees",
        ],
        records: [],
      },
      "Frame Design Procedures": {
        table: "Frame Design Procedures",
        keys: ["Frame", "DesignProc"],
        units: ["Text", "Text"],
        records: [],
      },
      "Frame Load Transfer Options": {
        table: "Frame Load Transfer Options",
        keys: ["Frame", "Transfer"],
        units: ["Text", "Yes/No"],
        records: [],
      },
      "Frame Loads - Distributed": {
        table: "Frame Loads - Distributed",
        keys: [
          "Frame",
          "LoadPat",
          "CoordSys",
          "Type",
          "Dir",
          "DistType",
          "RelDistA",
          "RelDistB",
          "AbsDistA",
          "AbsDistB",
          "FOverLA",
          "FOverLB",
          "GUID",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Unitless",
          "Unitless",
          uLength,
          uLength,
          `${uForce}/${uLength}`,
          `${uForce}/${uLength}`,
          "Text",
        ],
        records: [],
      },
      "Frame Loads - Gravity": {
        table: "Frame Loads - Gravity",
        keys: [
          "Frame",
          "LoadPat",
          "CoordSys",
          "MultiplierX",
          "MultiplierY",
          "MultiplierZ",
        ],
        units: ["Text", "Text", "Text", "Unitless", "Unitless", "Unitless"],
        records: [],
      },
      "Frame Output Station Assigns": {
        table: "Frame Output Station Assignments",
        keys: [
          "Frame",
          "StationType",
          "MinNumSta",
          "MaxStaSpcg",
          "AddAtElmInt",
          "AddAtPtLoad",
        ],
        units: ["Text", "Text", "Unitless", uLength, "Yes/No", "Yes/No"],
        records: [],
      },
      "Frame Props 01 - General": {
        table: "Frame Section Properties 01 - General",
        keys: [
          "SectionName",
          "Material",
          "Shape",
          "t3",
          "t2",
          "tf",
          "tw",
          "FilletRadius",
          "Area",
          "TorsConst",
          "I33",
          "I22",
          "I23",
          "AS2",
          "AS3",
          "S33",
          "S22",
          "Z33",
          "Z22",
          "R33",
          "R22",
          "ConcCol",
          "ConcBeam",
          "Color",
          "TotalWt",
          "TotalMass",
          "FromFile",
          "AMod",
          "A2Mod",
          "A3Mod",
          "JMod",
          "I2Mod",
          "I3Mod",
          "MMod",
          "WMod",
          "GUID",
          "Notes",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          uLength,
          uLength,
          uLength,
          uLength,
          uLength,
          `${uLength}2`,
          `${uLength}4`,
          `${uLength}4`,
          `${uLength}4`,
          `${uLength}4`,
          `${uLength}2`,
          `${uLength}2`,
          `${uLength}3`,
          `${uLength}3`,
          `${uLength}3`,
          `${uLength}3`,
          uLength,
          uLength,
          "Yes/No",
          "Yes/No",
          "Text",
          uForce,
          `${uForce}-s2/${uLength}`,
          "Yes/No",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Text",
          "Text",
        ],
        records: [],
      },
      "Frame Props 02 - Concrete Col": {
        table: "TABLE:  Frame Section Properties 02 - Concrete Column",
        keys: [
          "SectionName",
          "RebarMatL",
          "RebarMatC",
          "ReinfConfig",
          "LatReinf",
          "Cover",
          "NumBars3Dir",
          "NumBars2Dir",
          "BarSizeL",
          "BarSizeC",
          "SpacingC",
          "NumCBars2",
          "NumCBars3",
          "ReinfType",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          uLength,
          "Unitless",
          "Unitless",
          "Text",
          "Text",
          uLength,
          "Unitless",
          "Unitless",
          "Text",
        ],
        records: [],
      },
      "Frame Props 03 - Concrete Beam": {
        table: "TABLE:  Frame Section Properties 03 - Concrete Beam",
        keys: [
          "SectionName",
          "RebarMatL",
          "RebarMatC",
          "TopCover",
          "BotCover",
          "TopLeftArea",
          "TopRghtArea",
          "BotLeftArea",
          "BotRghtArea",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          uLength,
          uLength,
          `${uLength}2`,
          `${uLength}2`,
          `${uLength}2`,
          `${uLength}2`,
        ],
        records: [],
      },
      "Frame Props 13 - Time Dependent": {
        table: "Frame Section Properties 13 - Time Dependent",
        keys: [
          "SectionName",
          "TypeSize",
          "AutoValSize",
          "AutoSFSize",
          "UserValSize",
        ],
        units: ["Text", "Text", uLength, "Unitless", uLength],
        records: [],
      },
      "Frame Section Assignments": {
        table: "Frame Section Assignments",
        keys: [
          "Frame",
          "SectionType",
          "AutoSelect",
          "AnalSect",
          "DesignSect",
          "MatProp",
        ],
        units: ["Text", "Text", "Text", "Text", "Text", "Text"],
        records: [],
      },
      "Function - Plot Functions": {
        table: "Function - Plot Functions",
        keys: ["PlotFunc", "Type", "Component", "Mode"],
        units: ["Text", "Text", "Text", "Text"],
        records: [],
      },
      "Grid Lines": {
        table: "Grid Lines",
        keys: [
          "CoordSys",
          "AxisDir",
          "GridID",
          "XRYZCoord",
          "LineType",
          "LineColor",
          "Visible",
          "BubbleLoc",
          "AllVisible",
          "BubbleSize",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          uLength,
          "Text",
          "Text",
          "Yes/No",
          "Text",
          "Yes/No",
          uLength,
        ],
        records: [],
      },
      "Groups 1 - Definitions": {
        table: "Groups 1 - Definitions",
        keys: [
          "GroupName",
          "Selection",
          "SectionCut",
          "Steel",
          "Concrete",
          "Aluminum",
          "ColdFormed",
          "Stage",
          "Bridge",
          "AutoSeismic",
          "AutoWind",
          "SelDesSteel",
          "SelDesAlum",
          "SelDesCold",
          "MassWeight",
          "Color",
        ],
        units: [
          "Text",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Text",
        ],
        records: [],
      },
      "Joint Coordinates": {
        table: "Joint Coordinates",
        keys: [
          "Joint",
          "CoordSys",
          "CoordType",
          "XorR",
          "Y",
          "Z",
          "SpecialJt",
          "GlobalX",
          "GlobalY",
          "GlobalZ",
          "GUID",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          uLength,
          uLength,
          uLength,
          "Yes/No",
          uLength,
          uLength,
          uLength,
          "Text",
        ],
        records: [],
      },
      "Joint Pattern Definitions": {
        table: "Joint Pattern Definitions",
        keys: ["Pattern"],
        units: ["Text"],
        records: [],
      },
      "Joint Restraint Assignments": {
        table: "Joint Restraint Assignments",
        keys: ["Joint", "U1", "U2", "U3", "R1", "R2", "R3"],
        units: [
          "Text",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Yes/No",
        ],
        records: [],
      },
      "Link Property Assignments": {
        table: "Link Property Assignments",
        keys: [
          "Link",
          "LinkType",
          "LinkJoints",
          "LinkProp",
          "LinkFDProp",
          "PropMod",
        ],
        units: ["Text", "Text", "Text", "Text", "Text", "Unitless"],
        records: [],
      },
      "Link Props 01 - General": {
        table: "Link Property Definitions 01 - General",
        keys: [
          "Link",
          "LinkType",
          "Mass",
          "Weight",
          "RotInert1",
          "RotInert2",
          "RotInert3",
          "DefLength",
          "DefArea",
          "PDM2I",
          "PDM2J",
          "PDM3I",
          "PDM3J",
          "StiffDFact",
          "Color",
          "GUID",
          "Notes",
        ],
        units: [
          "Text",
          "Text",
          `${uForce}-s2/${uLength}`,
          uForce,
          `${uForce}-${uLength}-s2`,
          `${uForce}-${uLength}-s2`,
          `${uForce}-${uLength}-s2`,
          uLength,
          `${uLength}2`,
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Text",
          "Text",
          "Text",
        ],
        records: [],
      },
      "Link Props 02 - Linear": {
        table: "Link Property Definitions 02 - Linear",
        keys: ["Link", "DOF", "Fixed", "TransKE", "TransCE", "DJ"],
        units: ["Text", "Text", "Yes/No", "KN/m", "KN-s/m", uLength],
        records: [],
      },
      "Load Case Definitions": {
        table: "Load Case Definitions",
        keys: [
          "Case",
          "Type",
          "InitialCond",
          "ModalCase",
          "BaseCase",
          "MassSource",
          "DesTypeOpt",
          "DesignType",
          "DesActOpt",
          "DesignAct",
          "AutoType",
          "RunCase",
          "CaseStatus",
          "GUID",
          "Notes",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Yes/No",
          "Text",
          "Text",
          "Text",
        ],
        records: [],
      },
      "Load Pattern Definitions": {
        table: "Load Pattern Definitions",
        keys: [
          "LoadPat",
          "DesignType",
          "SelfWtMult",
          "AutoLoad",
          "GUID",
          "Notes",
        ],
        units: ["Text", "Text", "Unitless", "Text", "Text", "Text"],
        records: [],
      },
      "Mass Source": {
        table: "Mass Source",
        keys: ["MassSource", "Elements", "Masses", "Loads", "IsDefault"],
        units: ["Text", "Yes/No", "Yes/No", "Yes/No", "Yes/No"],
        records: [],
      },
      "MatProp 01 - General": {
        table: "Material Properties 01 - General",
        keys: [
          "Material",
          "Type",
          "Grade",
          "SymType",
          "TempDepend",
          "Color",
          "GUID",
          "Notes",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          "Yes/No",
          "Text",
          "Text",
          "Text",
        ],
        records: [],
      },
      "MatProp 02 - Basic Mech Props": {
        table: "Material Properties 02 - Basic Mechanical Properties",
        keys: ["Material", "UnitWeight", "UnitMass", "E1", "G12", "U12", "A1"],
        units: [
          "Text",
          `${uForce}/${uLength}3`,
          `${uForce}-s2/${uLength}4`,
          `${uForce}/${uLength}2`,
          `${uForce}/${uLength}2`,
          "Unitless",
          `1/${uTemperature}`,
        ],
        records: [],
      },
      "MatProp 03a - Steel Data": {
        table: "Material Properties 03a - Steel Data",
        keys: [
          "Material",
          "Fy",
          "Fu",
          "EffFy",
          "EffFu",
          "SSCurveOpt",
          "SSHysType",
          "SHard",
          "SMax",
          "SRup",
          "FinalSlope",
          "CoupModType",
        ],
        units: [
          "Text",
          `${uForce}/${uLength}2`,
          `${uForce}/${uLength}2`,
          `${uForce}/${uLength}2`,
          `${uForce}/${uLength}2`,
          "Text",
          "Text",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Text",
        ],
        records: [],
      },
      "MatProp 03b - Concrete Data": {
        table: "Material Properties 03b - Concrete Data",
        keys: [
          "Material",
          "Fc",
          "eFc",
          "LtWtConc",
          "SSCurveOpt",
          "SSHysType",
          "SFc",
          "SCap",
          "FinalSlope",
          "FAngle",
          "DAngle",
          "CoupModType",
        ],
        units: [
          "Text",
          `${uForce}/${uLength}2`,
          `${uForce}/${uLength}2`,
          "Yes/No",
          "Text",
          "Text",
          "Unitless",
          "Unitless",
          "Unitless",
          "Degrees",
          "Degrees",
          "Text",
        ],
        records: [],
      },
      "MatProp 03e - Rebar Data": {
        table: "Material Properties 03e - Rebar Data",
        keys: [
          "Material",
          "Fy",
          "Fu",
          "EffFy",
          "EffFu",
          "SSCurveOpt",
          "SSHysType",
          "SHard",
          "SCap",
          "FinalSlope",
          "UseCTDef",
          "CoupModType",
        ],
        units: [
          "Text",
          `${uForce}/${uLength}2`,
          `${uForce}/${uLength}2`,
          `${uForce}/${uLength}2`,
          `${uForce}/${uLength}2`,
          "Text",
          "Text",
          "Unitless",
          "Unitless",
          "Unitless",
          "Yes/No",
          "Text",
        ],
        records: [],
      },
      "MatProp 03f - Tendon Data": {
        table: "Material Properties 03f - Tendon Data",
        keys: [
          "Material",
          "Fy",
          "Fu",
          "SSCurveOpt",
          "SSHysType",
          "FinalSlope",
          "CoupModType",
        ],
        units: [
          "Text",
          `${uForce}/${uLength}2`,
          `${uForce}/${uLength}2`,
          "Text",
          "Text",
          "Unitless",
          "Text",
        ],
        records: [],
      },
      "MatProp 03j - Von Mises Data": {
        table: "Material Properties 03j - Coupled Nonlinear Von Mises Data",
        keys: [
          "Material",
          "YieldStress",
          "LinIsoHard",
          "IsoHardMod",
          "LinKinHard",
          "KinHardMod",
          "NLIsoSaHard",
          "UltStress",
          "HardRate",
        ],
        units: [
          "Text",
          `${uForce}/${uLength}2`,
          "Yes/No",
          `${uForce}/${uLength}2`,
          "Yes/No",
          `${uForce}/${uLength}2`,
          "Yes/No",
          "Unitless",
          "Unitless",
        ],
        records: [],
      },
      "MatProp 06 - Damping Parameters": {
        table: "Material Properties 06 - Damping Parameters",
        keys: [
          "Material",
          "ModalRatio",
          "VisMass",
          "VisStiff",
          "HysMass",
          "HysStiff",
        ],
        units: ["Text", "Unitless", "1/Sec", "Sec", "1/Sec2", "Unitless"],
        records: [],
      },
      "MatProp 09 - Acceptance": {
        table: "Material Properties 09 - Acceptance Criteria",
        keys: [
          "Material",
          "IOTens",
          "LSTens",
          "CPTens",
          "IOComp",
          "LSComp",
          "CPComp",
          "IgnoreTens",
        ],
        units: [
          "Text",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Yes/No",
        ],
        records: [],
      },
      "Options - Colors - Display": {
        table: "Options - Colors - Display",
        keys: [
          "DeviceType",
          "Points",
          "LinesFrame",
          "LinesFrmDL",
          "LinesCable",
          "LinesTendon",
          "SpringLinks",
          "Restraints",
          "Releases",
          "Axes",
          "Text",
          "ShadowLines",
          "GuideLines",
          "Highlight",
          "Selection",
          "AreaFillBot",
          "AreaFillTop",
          "AreaFillSd",
          "AreaEdge",
          "SolidF1",
          "SolidF2",
          "SolidF3",
          "SolidF4",
          "SolidF5",
          "SolidF6",
          "SolidEdge",
          "Floor",
          "Background",
          "BGLowLeft",
          "BGLowRight",
          "BGUpRight",
          "Darkness",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Unitless",
        ],
        records: [],
      },
      "Options - Colors - Output": {
        table: "Options - Colors - Output",
        keys: [
          "DeviceType",
          "Contour1",
          "Contour2",
          "Contour3",
          "Contour4",
          "Contour5",
          "Contour6",
          "Contour7",
          "Contour8",
          "Contour9",
          "Contour10",
          "Contour11",
          "Contour12",
          "Contour13",
          "Contour14",
          "Contour15",
          "Transpare",
          "Ratio1",
          "Ratio2",
          "Ratio3",
          "Ratio4",
          "Ratio5",
          "RatioNotD",
          "RatioNotC",
          "RatioVal1",
          "RatioVal2",
          "RatioVal3",
          "RatioVal4",
          "DFillPos",
          "DFillNeg",
          "DFillRPos",
          "DFillRNeg",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Unitless",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Text",
          "Text",
          "Text",
          "Text",
        ],
        records: [],
      },
      "Pref - Alum - AA 2015": {
        table: "Preferences - Aluminum Design - AA 2015",
        keys: [
          "THDesign",
          "SRatioLimit",
          "Provision",
          "LatFact",
          "UseLatFact",
          "Bridge",
          "PhiTy",
          "PhiTr",
          "PhiC",
          "PhiBo",
          "PhiBr",
          "PhiVo",
          "PhiVr",
        ],
        units: [
          "Text",
          "Unitless",
          "Text",
          "Unitless",
          "Yes/No",
          "Yes/No",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
        ],
        records: [],
      },
      "Pref - Cold - AISI-16": {
        table: "Preferences - Cold Formed Design - AISI-16",
        keys: [
          "THDesign",
          "FrameType",
          "SRatioLimit",
          "SOMethod",
          "Provision",
          "LatFact",
          "UseLatFact",
          "PhiTy",
          "PhiTr",
          "PhiC",
          "PhiB",
          "PhiBPipe",
          "PhiV",
        ],
        units: [
          "Text",
          "Text",
          "Unitless",
          "Text",
          "Text",
          "Unitless",
          "Yes/No",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
        ],
        records: [],
      },
      "Pref - Conc - ACI 318-14": {
        table: "Preferences - Concrete Design - ACI 318-14",
        keys: [
          "THDesign",
          "NumCurves",
          "NumPoints",
          "MinEccen",
          "PatLLF",
          "UFLimit",
          "SeisCat",
          "Rho",
          "Sds",
          "PhiT",
          "PhiCTied",
          "PhiCSpiral",
          "PhiV",
          "PhiVSeismic",
          "PhiVJoint",
        ],
        units: [
          "Text",
          "Unitless",
          "Unitless",
          "Yes/No",
          "Unitless",
          "Unitless",
          "Text",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
        ],
        records: [],
      },
      "Pref Steel - AISC 360-16": {
        table: "Preferences - Steel Design - AISC 360-16",
        keys: [
          "THDesign",
          "FrameType",
          "PatLLF",
          "SRatioLimit",
          "MaxIter",
          "SDC",
          "SeisCode",
          "SeisLoad",
          "ImpFactor",
          "SystemRho",
          "SystemSds",
          "SystemR",
          "SystemCd",
          "Omega0",
          "Provision",
          "AMethod",
          "SOMethod",
          "SRMethod",
          "NLCoeff",
          "PhiB",
          "PhiC",
          "PhiTY",
          "PhiTF",
          "PhiV",
          "PhiVRolledI",
          "PhiVT",
          "PlugWeld",
          "HSSWelding",
          "HSSReduceT",
          "CheckDefl",
          "DLRat",
          "SDLAndLLRat",
          "LLRat",
          "TotalRat",
          "NetRat",
        ],
        units: [
          "Text",
          "Text",
          "Unitless",
          "Unitless",
          "Unitless",
          "Text",
          "Yes/No",
          "Yes/No",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Text",
          "Text",
          "Text",
          "Text",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Yes/No",
          "Text",
          "Yes/No",
          "Yes/No",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
        ],
        records: [],
      },
      "Preferences - Dimensional": {
        table: "Preferences - Dimensional",
        keys: [
          "MergeTol",
          "FineGrid",
          "Nudge",
          "SelectTol",
          "SnapTol",
          "SLineThick",
          "PLineThick",
          "MaxFont",
          "MinFont",
          "AutoZoom",
          "ShrinkFact",
          "TextFileLen",
        ],
        units: [
          uLength,
          uLength,
          uLength,
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
        ],
        records: [],
      },
      "Program Control": {
        table: "Program Control",
        keys: [
          "ProgramName",
          "Version",
          "ProgLevel",
          "LicenseNum",
          "LicenseOS",
          "LicenseSC",
          "LicenseHT",
          "CurrUnits",
          "SteelCode",
          "ConcCode",
          "AlumCode",
          "ColdCode",
          "RegenHinge",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          "Yes/No",
          "Yes/No",
          "Yes/No",
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Yes/No",
        ],
        records: [
          [
            "SAP2000",
            "22.0.0",
            "Ultimate",
            "3010*1NQUFDVTD9KNCQ5",
            "Yes",
            "Yes",
            "No",
            CurrUnits.join(","),
            "AISC 360-16",
            "ACI 318-14",
            "AA-ASD 2000",
            "AISI-ASD96",
            "Yes",
          ],
          [
            "SAP2000",
            "23.1.0",
            "Ultimate",
            "3010*1GW8EPN5J2CUZGQ",
            "Yes",
            "Yes",
            "No",
            CurrUnits.join(","),
            "AISC 360-16",
            "ACI 318-14",
            "AA 2015",
            "AISI-16",
            "Yes",
          ],
        ],
      },
      "Project Information": {
        table: "Project Information",
        keys: ["Item", "Data"],
        units: ["Text", "Text"],
        records: [],
      },
      "Rebar Sizes": {
        table: "Rebar Sizes",
        keys: ["RebarID", "Area", "Diameter"],
        units: ["Text", "m2", uLength],
        records: [],
      },
      "SD 01 - General": {
        table: "Section Designer Properties 01 - General",
        keys: [
          "SectionName",
          "DesignType",
          "DsgnOrChck",
          "BaseMat",
          "IncludeVStr",
          "AxisAngle",
          "MeshSzAbs",
          "MeshSzRel",
          "nTotalShp",
          "nIWideFlng",
          "nChannel",
          "nTee",
          "nAngle",
          "nDblAngle",
          "nBoxTube",
          "nPipe",
          "nPlate",
          "nSolidRect",
          "nSolidCirc",
          "nSolidSeg",
          "nSolidSect",
          "nPolygon",
          "nReinfSing",
          "nReinfLine",
          "nReinfRect",
          "nReinfCirc",
          "nRefLine",
          "nRefCirc",
          "nCaltransSq",
          "nCaltransCr",
          "nCaltransHx",
          "nCaltransOc",
          "nBSectShell",
          "nBSectSolid",
          "nBSectCut",
          "nBSectCentr",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          "Yes/No",
          "Degrees",
          uLength,
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
          "Unitless",
        ],
        records: [],
      },
      "SD 16 - Shape Polygon": {
        table: "Section Designer Properties 16 - Shape Polygon",
        keys: [
          "SectionName",
          "ShapeName",
          "X",
          "Y",
          "Radius",
          "ShapeMat",
          "ZOrder",
          "FillColor",
          "CoreDim",
          "BCoreMajor",
          "BCoreMinor",
          "DCoreMajorPositive",
          "DCoreMajorNegative",
          "DCoreMinorPositive",
          "DCoreMinorNegative",
          "Reinforcing",
          "RebarMat",
          "BarMatType",
          "ConcCover",
        ],
        units: [
          "Text",
          "Text",
          uLength,
          uLength,
          uLength,
          "Text",
          "Unitless",
          "Text",
          "Text",
          uLength,
          uLength,
          uLength,
          uLength,
          uLength,
          uLength,
          "Yes/No",
          "Text",
          "Text",
          "Text",
        ],
        records: [],
      },
      "SD 17 - Shape Reinf Single": {
        table: "Section Designer Properties 17 - Shape Reinforcing Single",
        keys: [
          "SectionName",
          "ShapeName",
          "ShapeMat",
          "MatType",
          "XCenter",
          "YCenter",
          "BarSize",
          "TendonForce",
          "BarArea",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          uLength,
          uLength,
          "Text",
          uForce,
          `${uLength}2`,
        ],
        records: [],
      },
      "SD 18 - Shape Reinf Line": {
        table: "Section Designer Properties 18 - Shape Reinforcing Line",
        keys: [
          "SectionName",
          "ShapeName",
          "ShapeMat",
          "MatType",
          "X1",
          "Y1",
          "X2",
          "Y2",
          "Spacing",
          "BarSize",
          "TendonForce",
          "BarArea",
          "EndBars",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          uLength,
          uLength,
          uLength,
          uLength,
          uLength,
          "Text",
          uForce,
          `${uLength}2`,
          "Yes/No",
        ],
        records: [],
      },
      "SD 30 - Fiber General": {
        table: "Section Designer Properties 30 - Fiber General",
        keys: [
          "SectionName",
          "NumFibersD2",
          "NumFibersD3",
          "CoordSys",
          "GridAngle",
          "LumpRebar",
          "FiberPMM",
          "FiberMC",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          "Text",
          "Yes/No",
          "Yes/No",
          "Yes/No",
        ],
        records: [],
      },
      "Solid Property Definitions": {
        table: "Solid Property Definitions",
        keys: [
          "SolidProp",
          "Material",
          "MatAngleA",
          "MatAngleB",
          "MatAngleC",
          "InComp",
          "Color",
          "GUID",
          "Notes",
          "TotalWt",
          "TotalMass",
        ],
        units: [
          "Text",
          "Text",
          "Degrees",
          "Degrees",
          "Degrees",
          "Yes/No",
          "Text",
          "Text",
          "Text",
          uForce,
          `${uForce}-s2/${uLength}`,
        ],
        records: [],
      },
    };
  };
}
// export
export { Sap2k };
