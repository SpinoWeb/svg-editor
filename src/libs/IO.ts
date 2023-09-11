// use
// https://www.npmjs.com/package/browser-fs-access
import {
  fileOpen,
  //directoryOpen,
  fileSave,
  //supported,
} from "browser-fs-access";

// class IO
class IO {
  //data: any;
  //handle: FileSystemFileHandle;
  fileName: string;
  extensions: any;
  mimeTypes: any;

  constructor() {
    //this.data = {};
    //this.handle;
    this.fileName = "new-file";
    this.extensions = [".ca"];
    this.mimeTypes = ["application/json"];
  }

  // open file
  openFile0 = async () => {
    //console.log("IO > openFile");

    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = this.extensions.join(", ");
      input.addEventListener("change", () => {
        //console.log("IO > openFile > input", input);
        if (input.files) resolve(input.files[0]);
      });
      input.click();
    });
  };

  // open file
  // return data and handle
  openFile = async (
    extensions: Array<string> = this.extensions,
    mimeTypes: Array<string> = this.mimeTypes
  ) => {
    //console.log("IO > openFile");

    const blob = await fileOpen({
      extensions: extensions,
      mimeTypes: mimeTypes,
    });
    //console.log("IO > openFile > blob", blob);

    return {
      data: JSON.parse(await blob.text()), // get data object from file
      handle: "handle" in blob ? blob.handle : null, // store handle
    };
  };

  // save file
  // return the handle
  saveFile = async (
    data: any = {},
    handle: FileSystemFileHandle,
    fileName: string = this.fileName,
    extensions: Array<string> = this.extensions,
    mimeTypes: Array<string> = this.mimeTypes
  ) => {
    //console.log("IO > saveFile");

    const json =
      //process.env.NODE_ENV === "development"
      import.meta.env.DEV
        ? JSON.stringify(data, null, 2)
        : JSON.stringify(data);
    //console.log("IO > saveFile > json", json);

    const blob = new Blob([json]);
    //console.log("IO > saveFile > blob", blob);

    (window as any).handle = await fileSave(
      blob,
      {
        fileName: fileName,
        extensions: extensions,
        mimeTypes: mimeTypes,
      },
      handle || null
    );
    //console.log("IO > saveFile > window", window);

    return "handle" in window ? window.handle : null;
  };

  // salva senza consentire di modificare il
  // nome e la posizione del file
  saveFile0 = async (
    data: any = {},
    fileName: string = this.fileName,
    extension: string = ".ca"
  ) => {
    const blob = new Blob([data]);

    const a = document.createElement("a");
    a.download = fileName + extension;
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", () => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  //
  GroupData = (
    data: any = {},
    LocalTableName: string,
    PrimaryKey: string,
    PrimaryTable: string,
    Tables: any = []
  ) => {
    console.log(
      "IO > GroupData",
      data,
      LocalTableName,
      PrimaryKey,
      PrimaryTable,
      Tables
    );

    // array che conterrà, per ciascuna Key, un singolo record
    // con tutte le properties
    let localData = [];

    const keys =
      data[PrimaryTable] !== undefined
        ? data[PrimaryTable].map((a: any) => a[PrimaryKey]).filter(
            (value: any, index: number, array: any = []) =>
              array.indexOf(value) === index
          )
        : [];
    //console.log("IO > GroupData > keys", keys);

    // loop sulle Keys
    for (const k in keys) {
      const key = keys[k];

      // inizializzo l'oggetto obj relativo alla key
      let obj: any = {};
      obj[PrimaryKey] = key;

      // loop sulle tables
      for (const t in Tables) {
        const TableName = Tables[t];

        // la TableName è una property dell'object data
        if (data[TableName] !== undefined) {
          const filter = data[TableName].filter(
            (a: any) => a[PrimaryKey] == key
          );

          if (filter.length == 1) obj = Object.assign(obj, ...filter);
          if (filter.length > 1) obj[TableName] = filter;
        }
      }

      //console.log("IO > GroupData > obj", obj);
      localData.push(obj);
    }

    return localData;
  };

  tables = () => {
    return {
      Materials: {
        table: "Materials",
        keys: ["Material", "Type", "E1", "Color"],
        units: ["Text", "Text", "N/mm2", "Text"],
        data: [],
      },
      Sections: {
        table: "Sections",
        keys: [
          "SectionName",
          "Material",
          "Shape",
          "t3",
          "t2",
          "tf",
          "tw",
          "t2b",
          "tfb",
          "FilletRadius",
          "Area",
          "I33",
          "I22",
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "mm",
          "mm",
          "mm",
          "mm",
          "mm",
          "mm",
          "mm",
          "mm2",
          "mm4",
          "mm4",
        ],
        data: [],
      },
      Polygons: {
        table: "Polygons",
        keys: ["SectionName", "ShapeName", "X", "Y", "Radius", "ShapeMat"],
        units: ["Text", "Text", "mm", "mm", "mm", "Text"],
        data: [],
      },
      Trucks: {
        table: "Trucks",
        keys: ["TruckName", "Width", "Length"],
        units: ["Text", "mm", "mm"],
        data: [],
      },
      Axes: {
        table: "Axes",
        keys: ["TruckName", "AxisName", "x", "dy", "P"],
        units: ["Text", "Text", "mm", "mm", "kN"],
        data: [],
      },
      Decks: {
        table: "Decks",
        keys: ["DeckName", "Type", "SectionName", "Length", "LdX", "LdY"],
        units: ["Text", "Text", "Text", "mm", "Unitless", "Unitless"],
        data: [],
      },
      Beams: {
        table: "Beams",
        keys: ["DeckName", "SectionName", "beff", "yOrder", "E1I33"],
        units: ["Text", "Text", "mm", "Unitless", "N-mm2"],
        data: [],
      },
      Scenarios: {
        table: "Scenarios",
        keys: ["DeckName", "ScenarioName", "TruckName", "X", "Y", "TruckId"],
        units: ["Text", "Text", "Text", "mm", "mm", "Text"],
        data: [],
      },
    };
  };
}
// export
export { IO };
