class Converter {
  CurrUnits: any;

  constructor() {
    this.CurrUnits = ["N", "mm", "C"];
  }

  getForceConversionFactor = (from: string, to: string = "N") => {
    switch (from) {
      case "N":
        switch (to) {
          case "KN":
            return 1 / 1000;
        }
        break;
      case "KN":
        switch (to) {
          case "N":
            return 1000;
        }
        break;
    }
    return 1;
  };

  getLengthConversionFactor = (from: string, to: string = "mm") => {
    switch (from) {
      // METRIC
      case "mm":
        switch (to) {
          case "cm":
            return 1 / 10;
          case "m":
            return 1 / 1000;
        }
        break;
      case "cm":
        switch (to) {
          case "mm":
            return 10;
          case "m":
            return 1 / 100;
        }
        break;
      case "m":
        switch (to) {
          case "mm":
            return 1000;
          case "cm":
            return 100;
        }
        break;
    }
    return 1;
  };
}
// export
export { Converter };
