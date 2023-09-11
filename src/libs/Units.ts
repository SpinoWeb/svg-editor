// this.Units
// https://github.com/specklesystems/speckle-server/blob/main/packages/viewer/src/modules/converter/Units.js

class Units {
  //Units: any;

  constructor() {
    //this.Units = {};
  }

  getUnitsLists = () => {
    //console.log("Units > getUnitsLists");
    return {
      Force: ["N", "kN"],
      Length: ["mm", "m"],
      Temperature: ["C"],
    };
  };

  getConversionFactor = (from: string = "mm", to: string = "mm") => {
    //console.log("Units > getConversionFactor", from, to);
    if (from === to) return 1;

    switch (from) {
      // LENGTH
      case "mm":
        switch (to) {
          case "cm":
            return 0.1;
          case "m":
            return 0.001;
          case "km":
            return 1e-6;
        }
        break;
      case "cm":
        switch (to) {
          case "mm":
            return 10;
          case "m":
            return 0.01;
          case "km":
            return 1e-5;
        }
        break;
      case "m":
        switch (to) {
          case "mm":
            return 1000;
          case "cm":
            return 100;
          case "km":
            return 1000;
        }
        break;
      case "km":
        switch (to) {
          case "mm":
            return 1000000;
          case "cm":
            return 100000;
          case "m":
            return 1000;
        }
        break;

      // FORCE
      case "N":
        switch (to) {
          case "kN":
            return 0.001;
        }
        break;

      case "kN":
        switch (to) {
          case "N":
            return 1000;
        }
        break;
    }
    return 1;
  };
}
// export
export { Units };
