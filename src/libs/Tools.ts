class Tools {
  process: boolean;
  env: boolean;

  constructor() {
    this.process = process.env.NODE_ENV === "development" ? true : false;
    this.env = import.meta.env.DEV;
  }

  Base = () => {
    return this.process ? "" : "/mytools3";
    //return this.env ? "" : "/mytools3";
  };

  Tools = () => {
    const base = this.Base();

    return this.process
      ? [
          { path: base + "/ca", name: "/ca - Courbon Albenga" },
          { path: base + "/rf", name: "/rf - Retrofit" },
          { path: base + "/rc", name: "/rc - Reinforced Concrete" },
          { path: base + "/myenv", name: "/myenv - MyEnv" },
          { path: base + "/svgedt", name: "/svgedt - SvgEditor" },
          { path: base + "/s2d", name: "/s2d - Solver2d" },
          { path: base + "/test", name: "Test" },
          { path: base + "/transform", name: "Transform" },
          { path: base + "/tailwind", name: "Tailwind" },
          { path: base + "/drie", name: "Drie" },
          { path: base + "/vtri", name: "ViewerTri" },
          { path: base + "/vtricmp", name: "/vtricmp - ViewerTriCmp" },
        ]
      : [
          { path: base + "/ca", name: "/ca - Courbon Albenga" },
          { path: base + "/rf", name: "/rf - Retrofit" },
        ];
  };
}

// export
export { Tools };
