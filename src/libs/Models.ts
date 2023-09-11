/*
interface Joint {
  Joint: number;
  X: number;
  Y: number;
  Z: number;
}

interface Frame {
  Frame: number;
  JointI: number;
  JointJ: number;
}
*/

// Models
class Models {
  obj: any;
  format: string;

  constructor() {
    // default object values
    // kN, m
    this.obj = {
      stories: 2,
      baysX: 3,
      baysZ: 2,

      storyHeight: 3,
      bayXwidth: 6,
      bayZwidth: 6,

      //
      Grids: [],
      Joints: [],
      Frames: [],
      Loads: [],
    };

    this.format = "array";
  }

  // Frame3D
  Frame3D = (obj: any = this.obj, format: string = this.format) => {
    //console.log("Frame3D", obj, format);

    let Joints: Array<any> = [],
      Frames: Array<any> = [],
      Grids: Array<any> = [];

    const {
      stories,
      baysX,
      baysZ,
      storyHeight,
      bayXwidth,
      bayZwidth,
    }: {
      stories: number;
      baysX: number;
      baysZ: number;
      storyHeight: number;
      bayXwidth: number;
      bayZwidth: number;
    } = obj;
    //console.log("Frame3D", stories);

    const lenX: number = baysX * bayXwidth;
    const lenZ: number = baysZ * bayZwidth;
    //const lenY: number = stories * storyHeight;

    // Grids, Joints
    let j: number = 0; //g: number = 0;

    for (let ix: number = 0; ix <= baysX; ix++) {
      const X: number = -lenX / 2 + bayXwidth * ix;

      // X grids
      //g++;
      format == "object"
        ? Grids.push({
            GridID: `X${ix + 1}`,
            AxisDir: "X",
            XRYZCoord: X,
            BubbleLoc: "End",
          })
        : Grids.push(`X${ix + 1}`, "X", X, "End");

      for (let iz: number = 0; iz <= baysZ; iz++) {
        const Z: number = -lenZ / 2 + bayZwidth * iz;

        // Z grids
        if (ix < 1) {
          //g++;
          format == "object"
            ? Grids.push({
                GridID: `Z${iz + 1}`,
                AxisDir: "Z",
                XRYZCoord: Z,
                BubbleLoc: "Start",
              })
            : Grids.push(`Z${iz + 1}`, "Z", Z, "Start");
        }

        for (let iy: number = 0; iy <= stories; iy++) {
          const Y: number = storyHeight * iy;

          j++;
          format == "object"
            ? iy < 1
              ? Joints.push({ Joint: j, X: X, Y: Y, Z: Z, Restraint: "Pinned" })
              : Joints.push({ Joint: j, X: X, Y: Y, Z: Z, Restraint: "Free" })
            : iy < 1
            ? Joints.push(j, X, Y, Z, "Pinned")
            : Joints.push(j, X, Y, Z, "Free");
        }
      }
    }

    // Frames
    let f: number = 0;

    let JointIDlist: Array<number> = [];

    if (format == "object") {
      JointIDlist = Joints.map((j) => j.Joint);
    } else {
      for (let i: number = 0; i < Joints.length; i += 5) {
        JointIDlist.push(Joints[i]);
      }
    }
    //console.log(JointIDlist);

    // chunk for column
    let chunks: Array<any> = [];
    const chunkSize: number = stories + 1;
    for (let i: number = 0; i < JointIDlist.length; i += chunkSize) {
      const chunk = JointIDlist.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    //console.log(chunks);

    // columns
    for (let c = 0; c < chunks.length; c++) {
      //console.log(chunks[c]);
      for (let i = 0; i < chunks[c].length - 1; i++) {
        const JointI: number = chunks[c][i];
        const JointJ: number = chunks[c][i + 1];

        f++;
        format == "object"
          ? Frames.push({ Frame: f, JointI: JointI, JointJ: JointJ })
          : Frames.push(f, JointI, JointJ);
        //console.log(f, JointI, JointJ);
      }
    }

    //console.log("--- X ---");

    // beams
    const djX: number = (baysZ + 1) * (stories + 1);
    const djZ: number = stories + 1;

    // for each frame along X direction
    for (let iy: number = 0; iy < stories; iy++) {
      for (let iz: number = 0; iz <= baysZ; iz++) {
        let JointI: number = iy + 2 + iz * djZ;

        for (let ix: number = 0; ix < baysX; ix++) {
          if (ix > 0) JointI += djX;
          const JointJ: number = JointI + djX;

          f++;
          format == "object"
            ? Frames.push({ Frame: f, JointI: JointI, JointJ: JointJ })
            : Frames.push(f, JointI, JointJ);
          //console.log(f, JointI, JointJ);
        }
      }
    }

    //console.log("--- Z ---");

    // for each frame along Z direction
    for (let iy: number = 0; iy < stories; iy++) {
      for (let ix: number = 0; ix <= baysX; ix++) {
        let JointI: number = iy + 2 + ix * djX;

        for (let iz: number = 0; iz < baysZ; iz++) {
          if (iz > 0) JointI += djZ;
          const JointJ: number = JointI + djZ;

          f++;
          format == "object"
            ? Frames.push({ Frame: f, JointI: JointI, JointJ: JointJ })
            : Frames.push(f, JointI, JointJ);
          //console.log(f, JointI, JointJ);
        }
      }
    }

    return { Joints: Joints, Frames: Frames, Grids: Grids };
  };

  generateData = (obj: any = this.obj) => {
    //console.log("generateData", obj);

    const {
      //Model,
      //ModelUnits,
      parameters,
      script,
    }: {
      //Model: string;
      //ModelUnits: Array<string>;
      parameters: Array<any>;
      script: string;
    } = obj;
    //console.log("generateData > parameters\n", parameters);
    //console.log("generateData > script\n\n", script);

    let keys: Array<string> = [],
      values: Array<any> = [];
    for (const p in parameters) {
      const parameter = parameters[p];
      keys.push(parameter.key);
      values.push(parameter.value);
    }
    //console.log("generateData > keys", keys, ...keys);
    //console.log("generateData > values", values, ...values);

    const f: Function = Function(
      ...keys,
      script
        ? script +
            `\nreturn { 
                Grids : typeof Grids  === 'undefined' || Grids  === null ? [] : Grids,           
                Joints: typeof Joints === 'undefined' || Joints === null ? [] : Joints,
                Frames: typeof Frames === 'undefined' || Frames === null ? [] : Frames,                 
                Loads : typeof Loads  === 'undefined' || Loads  === null ? [] : Loads
            }`
        : ""
    );
    //console.log("generateData > f", f);

    let r: any;
    try {
      r = f(...values);
    } catch (e) {
      console.error("generateData > e", e);
      // (Note: the exact output may be browser-dependent)
    }
    //console.log("generateData > r", r);

    return r;
  };
}

// export
export { Models };
