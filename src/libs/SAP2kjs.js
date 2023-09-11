export default function SAP2k() {

  const SAP2k0 = 
    {
      "Coordinate Systems": {
        table: "Coordinate Systems",
        keys: [
          "Name",
          "Type",
          "X",
          "Y",
          "Z",
          "AboutZ",
          "AboutY",
          "AboutX"
        ],
        units: [
          "Text",
          "Text",
          "mm",
          "mm",
          "mm",
          "Degrees",
          "Degrees",
          "Degrees"       
        ],
        data: {
          0: [
            "GLOBAL",
            "Cartesian",
            0,
            0,
            0,
            0,
            0,
            0
          ]
        }
      },

      "Connectivity - Frame" : {
        table: "Connectivity - Frame",
        keys: [
          "Frame",
          "JointI",
          "JointJ",
          "IsCurved",
          "GUID"
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Yes/No",
          "Text"
        ],
        data: {}
      },

      "Frame Insertion Point Assigns" : {
        table: "Frame Insertion Point Assignments",
        keys: [
          "Frame",
          "CardinalPt",
          "CoordSys",
          "JtOffsetXI",
          "JtOffsetYI",
          "JtOffsetZI",
          "JtOffsetXJ",
          "JtOffsetYJ",
          "JtOffsetZJ",
          "Mirror2",
          "Mirror3",
          "Transform"
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
          "Yes/No",
          "Yes/No",
          "Yes/No"
        ],
        data: {}
      },

      "Frame Props 01 - General" : {
        table: "Frame Section Properties 01 - General",
        keys: [
          "SectionName",
          "Material",
          "Shape",
          "t3", "t2",
          "tf", "tw",
          "t2b", "tfb",
          "FilletRadius",
          "Area",
          "TorsConst",
          "I33", "I22", "I23",
          "AS2", "AS3", "S33",
          "S22",
          "Z33", "Z22",
          "R33", "R22",
          "Color",
          "FromFile",
          "AMod", "A2Mod", "A3Mod",
          "JMod","I2Mod","I3Mod","MMod","WMod",
          "GUID","Notes"
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "mm", "mm",
          "mm", "mm",
          "mm", "mm",
          "mm",
          "mm2",
          "mm4",
          "mm4", "mm4", "mm4",
          "mm2", "mm2", "mm2",
          "mm4",
          "mm4", "mm4",
          "mm", "mm",
          "Text",
          "Yes/No",
          "Unitless", "Unitless",	"Unitless",
          "Unitless",	"Unitless",	"Unitless",	"Unitless",	"Unitless",
          "Text",	"Text"
        ],
        data: {}
      },

      "Frame Section Assignments" : {
        table: "Frame Section Assignments",
        keys: [
          "Frame",
          "SectionType",
          "AutoSelect",
          "AnalSect",
          "MatProp"
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          "Text"
        ],
        data: {}
      },

      "Grid Lines" : {
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
          "BubbleSize"
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "mm",
          "Text",
          "Text",
          "Yes/No",
          "Text",
          "Yes/No",
          "mm"
        ],
        data: {}
      },

      "Joint Coordinates" : {
        table: "Joint Coordinates",
        keys: [
          "Joint",
          "CoordSys",
          "CoordType",
          "XorR",
          "Y",
          "Z",
          "SpecialJt",
          "GUID"
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "mm",
          "mm",
          "mm",
          "Yes/No",
          "Text"
        ],
        data: {}
      },

      "MatProp 01 - General" : {
        table: "Material Properties 01 - General",
        keys: [
          "Material",
          "Type",
          "Grade",
          "SymType",
          "TempDepend",
          "Color",
          "GUID",
         "Notes"
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          "Yes/No",
          "Text",
          "Text",
          "Text"
        ],
        data: {}
      },

      "MatProp 02 - Basic Mech Props" : {
        table: "Material Properties 02 - Basic Mechanical Properties",
        keys: [
          "Material",
          "UnitWeight",
          "UnitMass",
          "E1",
          "G12",
          "U12",
          "A1"
        ],
        units: [
          "Text",
          "N/mm3",
          "N-s2/mm4",
          "N/mm2",
          "N/mm2",
          "Unitless",
          "1/C"
        ],
        data: {}
      },

      "Program Control": {
        table: "Program Control",
        keys: [
          "ProgramName",
          "Version",
          "ProgLevel",
          "CurrUnits",
	        "SteelCode",
          "ConcCode",
          "AlumCode",
          "ColdCode",
          "RegenHinge"
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
          "Yes/No",     
        ],
        data: {
          0: [
            "SAP2000",
            "23.1.0",
            "Ultimate",
            "N, mm, C",
            "AISC 360-16",
            "ACI 318-14",
            "AA 2015",
            "AISI-16",
            "Yes"
          ]
        }
      },

      "SD 01 - General": {
        table: "Section Designer Properties 01 - General",
        keys: [
          "SectionName",
          "DesignType",
          "DsgnOrChck",
          "BaseMat",
          //"IncludeVStr",
          //"AxisAngle",
          //"MeshSzAbs",
          //"MeshSzRel"
        ],
        units: [
          "Text",
          "Text",
          "Text",
          "Text",
          //"Yes/No",
          //"Degrees",
          //"mm",
          //"Unitless"
        ],
        data: {}
      },

      "SD 16 - Shape Polygon": {
        table: "Section Designer Properties 16 - Shape Polygon",
        keys: [
          "SectionName",
          "ShapeName",
          "X",
          "Y",
          "Radius",
          "ShapeMat"
        ],
        units: [
          "Text",
          "Text",
          "mm",
          "mm",
          "mm",
          "Text"
        ],
        data: {}
      },
  }

  const SAP2k = {
    "Active Degrees of Freedom": {
      "table": "Active Degrees of Freedom",
      "keys": [
        "UX",
        "UY",
        "UZ",
        "RX",
        "RY",
        "RZ"
      ],
      "units": [
        "Yes/No",
        "Yes/No",
        "Yes/No",
        "Yes/No",
        "Yes/No",
        "Yes/No"
      ],
      "data": {}
    },
    "Analysis Options": {
      "table": "Analysis Options",
      "keys": [
        "Solver",
        "SolverProc",
        "Force32Bit",
        "StiffCase",
        "GeomMod",
        "HingeOpt",
        "NumAThreads",
        "MaxFileSize",
        "UseMMFiles",
        "AllowDiff"
      ],
      "units": [
        "Text",
        "Text",
        "Yes/No",
        "Text",
        "Yes/No",
        "Text",
        "Unitless",
        "Unitless",
        "Text",
        "Yes/No"
      ],
      "data": {}
    },
    "Auto Wave 3 - Char - General": {
      "table": "Auto Wave 3 - Wave Characteristics - General",
      "keys": [
        "WaveChar",
        "WaveType",
        "KinFactor",
        "SWaterDepth",
        "WaveHeight",
        "WavePeriod",
        "WaveTheory"
      ],
      "units": [
        "Text",
        "Text",
        "Unitless",
        "m",
        "m",
        "Sec",
        "Text"
      ],
      "data": {}
    },
    "Case - Modal 1 - General": {
      "table": "Case - Modal 1 - General",
      "keys": [
        "Case",
        "ModeType",
        "MaxNumModes",
        "MinNumModes",
        "EigenShift",
        "EigenCutoff",
        "EigenTol",
        "AutoShift"
      ],
      "units": [
        "Text",
        "Text",
        "Unitless",
        "Unitless",
        "Cyc/sec",
        "Cyc/sec",
        "Unitless",
        "Text"
      ],
      "data": {}
    },
    "Case - Static 1 - Load Assigns": {
      "table": "Case - Static 1 - Load Assignments",
      "keys": [
        "Case",
        "LoadType",
        "LoadName",
        "LoadSF"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Unitless"
      ],
      "data": {}
    },
    "Connectivity - Frame": {
      "table": "Connectivity - Frame",
      "keys": [
        "Frame",
        "JointI",
        "JointJ",
        "IsCurved",
        "Length",
        "CentroidX",
        "CentroidY",
        "CentroidZ",
        "GUID"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Yes/No",
        "m",
        "m",
        "m",
        "m",
        "Text"
      ],
      "data": {}
    },
    "Connectivity - Link": {
      "table": "Connectivity - Link",
      "keys": [
        "Link",
        "JointI",
        "JointJ",
        "Length",
        "CentroidX",
        "CentroidY",
        "CentroidZ",
        "GUID"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "m",
        "m",
        "m",
        "m",
        "Text"
      ],
      "data": {}
    },
    "Coordinate Systems": {
      "table": "Coordinate Systems",
      "keys": [
        "Name",
        "Type",
        "X",
        "Y",
        "Z",
        "AboutZ",
        "AboutY",
        "AboutX"
      ],
      "units": [
        "Text",
        "Text",
        "m",
        "m",
        "m",
        "Degrees",
        "Degrees",
        "Degrees"
      ],
      "data": {}
    },
    "Database Format Types": {
      "table": "Database Format Types",
      "keys": [
        "UnitsCurr",
        "OverrideE"
      ],
      "units": [
        "Yes/No",
        "Yes/No"
      ],
      "data": {}
    },
    "Frame Auto Mesh": {
      "table": "Frame Auto Mesh Assignments",
      "keys": [
        "Frame",
        "AutoMesh",
        "AtJoints",
        "AtFrames",
        "NumSegments",
        "MaxLength",
        "MaxDegrees"
      ],
      "units": [
        "Text",
        "Yes/No",
        "Yes/No",
        "Yes/No",
        "Unitless",
        "m",
        "Degrees"
      ],
      "data": {}
    },
    "Frame Design Procedures": {
      "table": "Frame Design Procedures",
      "keys": [
        "Frame",
        "DesignProc"
      ],
      "units": [
        "Text",
        "Text"
      ],
      "data": {}
    },
    "Frame Load Transfer Options": {
      "table": "Frame Load Transfer Options",
      "keys": [
        "Frame",
        "Transfer"
      ],
      "units": [
        "Text",
        "Yes/No"
      ],
      "data": {}
    },
    "Frame Loads - Distributed": {
      "table": "Frame Loads - Distributed",
      "keys": [
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
        "GUID"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Text",
        "Text",
        "Text",
        "Unitless",
        "Unitless",
        "m",
        "m",
        "KN/m",
        "KN/m",
        "Text"
      ],
      "data": {}
    },
    "Frame Loads - Gravity": {
      "table": "Frame Loads - Gravity",
      "keys": [
        "Frame",
        "LoadPat",
        "CoordSys",
        "MultiplierX",
        "MultiplierY",
        "MultiplierZ"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Unitless",
        "Unitless",
        "Unitless"
      ],
      "data": {}
    },
    "Frame Output Station Assigns": {
      "table": "Frame Output Station Assignments",
      "keys": [
        "Frame",
        "StationType",
        "MinNumSta",
        "MaxStaSpcg",
        "AddAtElmInt",
        "AddAtPtLoad"
      ],
      "units": [
        "Text",
        "Text",
        "Unitless",
        "m",
        "Yes/No",
        "Yes/No"
      ],
      "data": {}
    },
    "Frame Props 01 - General": {
      "table": "Frame Section Properties 01 - General",
      "keys": [
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
        "Notes"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "m",
        "m",
        "m",
        "m",
        "m",
        "m2",
        "m4",
        "m4",
        "m4",
        "m4",
        "m2",
        "m2",
        "m3",
        "m3",
        "m3",
        "m3",
        "m",
        "m",
        "Yes/No",
        "Yes/No",
        "Text",
        "KN",
        "KN-s2/m",
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
        "Text"
      ],
      "data": {}
    },
    "Frame Props 02 - Concrete Col": {
      "table": "TABLE:  Frame Section Properties 02 - Concrete Column",
      "keys": [
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
        "ReinfType"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Text",
        "Text",
        "m",
        "Unitless",
        "Unitless",
        "Text",
        "Text",
        "m",
        "Unitless",
        "Unitless",
        "Text"
      ],
      "data": {}
    },
    "Frame Props 03 - Concrete Beam": {
      "table": "TABLE:  Frame Section Properties 03 - Concrete Beam",
      "keys": [
        "SectionName",
        "RebarMatL",
        "RebarMatC",
        "TopCover",
        "BotCover",
        "TopLeftArea",
        "TopRghtArea",
        "BotLeftArea",
        "BotRghtArea"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "m",
        "m",
        "m2",
        "m2",
        "m2",
        "m2"
      ],
      "data": {}
    },
    "Frame Props 13 - Time Dependent": {
      "table": "Frame Section Properties 13 - Time Dependent",
      "keys": [
        "SectionName",
        "TypeSize",
        "AutoValSize",
        "AutoSFSize",
        "UserValSize"
      ],
      "units": [
        "Text",
        "Text",
        "m",
        "Unitless",
        "m"
      ],
      "data": {}
    },
    "Frame Section Assignments": {
      "table": "Frame Section Assignments",
      "keys": [
        "Frame",
        "SectionType",
        "AutoSelect",
        "AnalSect",
        "DesignSect",
        "MatProp"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Text",
        "Text",
        "Text"
      ],
      "data": {}
    },
    "Function - Plot Functions": {
      "table": "Function - Plot Functions",
      "keys": [
        "PlotFunc",
        "Type",
        "Component",
        "Mode"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Text"
      ],
      "data": {}
    },
    "Grid Lines": {
      "table": "Grid Lines",
      "keys": [
        "CoordSys",
        "AxisDir",
        "GridID",
        "XRYZCoord",
        "LineType",
        "LineColor",
        "Visible",
        "BubbleLoc",
        "AllVisible",
        "BubbleSize"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "m",
        "Text",
        "Text",
        "Yes/No",
        "Text",
        "Yes/No",
        "m"
      ],
      "data": {}
    },
    "Groups 1 - Definitions": {
      "table": "Groups 1 - Definitions",
      "keys": [
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
        "Color"
      ],
      "units": [
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
        "Text"
      ],
      "data": {}
    },
    "Joint Coordinates": {
      "table": "Joint Coordinates",
      "keys": [
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
        "GUID"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "m",
        "m",
        "m",
        "Yes/No",
        "m",
        "m",
        "m",
        "Text"
      ],
      "data": {}
    },
    "Joint Pattern Definitions": {
      "table": "Joint Pattern Definitions",
      "keys": [
        "Pattern"
      ],
      "units": [
        "Text"
      ],
      "data": {}
    },
    "Joint Restraint Assignments": {
      "table": "Joint Restraint Assignments",
      "keys": [
        "Joint",
        "U1",
        "U2",
        "U3",
        "R1",
        "R2",
        "R3"
      ],
      "units": [
        "Text",
        "Yes/No",
        "Yes/No",
        "Yes/No",
        "Yes/No",
        "Yes/No",
        "Yes/No"
      ],
      "data": {}
    },
    "Link Property Assignments": {
      "table": "Link Property Assignments",
      "keys": [
        "Link",
        "LinkType",
        "LinkJoints",
        "LinkProp",
        "LinkFDProp",
        "PropMod"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Text",
        "Text",
        "Unitless"
      ],
      "data": {}
    },
    "Link Props 01 - General": {
      "table": "Link Property Definitions 01 - General",
      "keys": [
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
        "Notes"
      ],
      "units": [
        "Text",
        "Text",
        "KN-s2/m",
        "KN",
        "KN-m-s2",
        "KN-m-s2",
        "KN-m-s2",
        "m",
        "m2",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless",
        "Text",
        "Text",
        "Text"
      ],
      "data": {}
    },
    "Link Props 02 - Linear": {
      "table": "Link Property Definitions 02 - Linear",
      "keys": [
        "Link",
        "DOF",
        "Fixed",
        "TransKE",
        "TransCE",
        "DJ"
      ],
      "units": [
        "Text",
        "Text",
        "Yes/No",
        "KN/m",
        "KN-s/m",
        "m"
      ],
      "data": {}
    },
    "Load Case Definitions": {
      "table": "Load Case Definitions",
      "keys": [
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
        "Notes"
      ],
      "units": [
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
        "Text"
      ],
      "data": {}
    },
    "Load Pattern Definitions": {
      "table": "Load Pattern Definitions",
      "keys": [
        "LoadPat",
        "DesignType",
        "SelfWtMult",
        "AutoLoad",
        "GUID",
        "Notes"
      ],
      "units": [
        "Text",
        "Text",
        "Unitless",
        "Text",
        "Text",
        "Text"
      ],
      "data": {}
    },
    "Mass Source": {
      "table": "Mass Source",
      "keys": [
        "MassSource",
        "Elements",
        "Masses",
        "Loads",
        "IsDefault"
      ],
      "units": [
        "Text",
        "Yes/No",
        "Yes/No",
        "Yes/No",
        "Yes/No"
      ],
      "data": {}
    },
    "MatProp 01 - General": {
      "table": "Material Properties 01 - General",
      "keys": [
        "Material",
        "Type",
        "Grade",
        "SymType",
        "TempDepend",
        "Color",
        "GUID",
        "Notes"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Text",
        "Yes/No",
        "Text",
        "Text",
        "Text"
      ],
      "data": {}
    },
    "MatProp 02 - Basic Mech Props": {
      "table": "Material Properties 02 - Basic Mechanical Properties",
      "keys": [
        "Material",
        "UnitWeight",
        "UnitMass",
        "E1",
        "G12",
        "U12",
        "A1"
      ],
      "units": [
        "Text",
        "KN/m3",
        "KN-s2/m4",
        "KN/m2",
        "KN/m2",
        "Unitless",
        "1/C"
      ],
      "data": {}
    },
    "MatProp 03a - Steel Data": {
      "table": "Material Properties 03a - Steel Data",
      "keys": [
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
        "CoupModType"
      ],
      "units": [
        "Text",
        "KN/m2",
        "KN/m2",
        "KN/m2",
        "KN/m2",
        "Text",
        "Text",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless",
        "Text"
      ],
      "data": {}
    },
    "MatProp 03b - Concrete Data": {
      "table": "Material Properties 03b - Concrete Data",
      "keys": [
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
        "CoupModType"
      ],
      "units": [
        "Text",
        "KN/m2",
        "KN/m2",
        "Yes/No",
        "Text",
        "Text",
        "Unitless",
        "Unitless",
        "Unitless",
        "Degrees",
        "Degrees",
        "Text"
      ],
      "data": {}
    },
    "MatProp 03e - Rebar Data": {
      "table": "Material Properties 03e - Rebar Data",
      "keys": [
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
        "CoupModType"
      ],
      "units": [
        "Text",
        "KN/m2",
        "KN/m2",
        "KN/m2",
        "KN/m2",
        "Text",
        "Text",
        "Unitless",
        "Unitless",
        "Unitless",
        "Yes/No",
        "Text"
      ],
      "data": {}
    },
    "MatProp 03f - Tendon Data": {
      "table": "Material Properties 03f - Tendon Data",
      "keys": [
        "Material",
        "Fy",
        "Fu",
        "SSCurveOpt",
        "SSHysType",
        "FinalSlope",
        "CoupModType"
      ],
      "units": [
        "Text",
        "KN/m2",
        "KN/m2",
        "Text",
        "Text",
        "Unitless",
        "Text"
      ],
      "data": {}
    },
    "MatProp 03j - Von Mises Data": {
      "table": "Material Properties 03j - Coupled Nonlinear Von Mises Data",
      "keys": [
        "Material",
        "YieldStress",
        "LinIsoHard",
        "IsoHardMod",
        "LinKinHard",
        "KinHardMod",
        "NLIsoSaHard",
        "UltStress",
        "HardRate"
      ],
      "units": [
        "Text",
        "KN/m2",
        "Yes/No",
        "KN/m2",
        "Yes/No",
        "KN/m2",
        "Yes/No",
        "Unitless",
        "Unitless"
      ],
      "data": {}
    },
    "MatProp 06 - Damping Parameters": {
      "table": "Material Properties 06 - Damping Parameters",
      "keys": [
        "Material",
        "ModalRatio",
        "VisMass",
        "VisStiff",
        "HysMass",
        "HysStiff"
      ],
      "units": [
        "Text",
        "Unitless",
        "1/Sec",
        "Sec",
        "1/Sec2",
        "Unitless"
      ],
      "data": {}
    },
    "MatProp 09 - Acceptance": {
      "table": "Material Properties 09 - Acceptance Criteria",
      "keys": [
        "Material",
        "IOTens",
        "LSTens",
        "CPTens",
        "IOComp",
        "LSComp",
        "CPComp",
        "IgnoreTens"
      ],
      "units": [
        "Text",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless",
        "Yes/No"
      ],
      "data": {}
    },
    "Options - Colors - Display": {
      "table": "Options - Colors - Display",
      "keys": [
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
        "Darkness"
      ],
      "units": [
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
        "Unitless"
      ],
      "data": {}
    },
    "Options - Colors - Output": {
      "table": "Options - Colors - Output",
      "keys": [
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
        "DFillRNeg"
      ],
      "units": [
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
        "Text"
      ],
      "data": {}
    },
    "Pref - Alum - AA 2015": {
      "table": "Preferences - Aluminum Design - AA 2015",
      "keys": [
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
        "PhiVr"
      ],
      "units": [
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
        "Unitless"
      ],
      "data": {}
    },
    "Pref - Cold - AISI-16": {
      "table": "Preferences - Cold Formed Design - AISI-16",
      "keys": [
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
        "PhiV"
      ],
      "units": [
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
        "Unitless"
      ],
      "data": {}
    },
    "Pref - Conc - ACI 318-14": {
      "table": "Preferences - Concrete Design - ACI 318-14",
      "keys": [
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
        "PhiVJoint"
      ],
      "units": [
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
        "Unitless"
      ],
      "data": {}
    },
    "Pref Steel - AISC 360-16": {
      "table": "Preferences - Steel Design - AISC 360-16",
      "keys": [
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
        "NetRat"
      ],
      "units": [
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
        "Unitless"
      ],
      "data": {}
    },
    "Preferences - Dimensional": {
      "table": "Preferences - Dimensional",
      "keys": [
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
        "TextFileLen"
      ],
      "units": [
        "m",
        "m",
        "m",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless",
        "Unitless"
      ],
      "data": {}
    },
    "Program Control": {
      "table": "Program Control",
      "keys": [
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
        "RegenHinge"
      ],
      "units": [
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
        "Yes/No"
      ],
      "data": {}
    },
    "Project Information": {
      "table": "Project Information",
      "keys": [
        "Item",
        "Data"
      ],
      "units": [
        "Text",
        "Text"
      ],
      "data": {}
    },
    "Rebar Sizes": {
      "table": "Rebar Sizes",
      "keys": [
        "RebarID",
        "Area",
        "Diameter"
      ],
      "units": [
        "Text",
        "m2",
        "m"
      ],
      "data": {}
    },
    "SD 01 - General": {
      "table": "Section Designer Properties 01 - General",
      "keys": [
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
        "nBSectCentr"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Text",
        "Yes/No",
        "Degrees",
        "m",
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
        "Unitless"
      ],
      "data": {}
    },
    "SD 16 - Shape Polygon": {
      "table": "Section Designer Properties 16 - Shape Polygon",
      "keys": [
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
        "ConcCover"
      ],
      "units": [
        "Text",
        "Text",
        "m",
        "m",
        "m",
        "Text",
        "Unitless",
        "Text",
        "Text",
        "m",
        "m",
        "m",
        "m",
        "m",
        "m",
        "Yes/No",
        "Text",
        "Text",
        "Text"
      ],
      "data": {}
    },
    "SD 17 - Shape Reinf Single": {
      "table": "Section Designer Properties 17 - Shape Reinforcing Single",
      "keys": [
        "SectionName",
        "ShapeName",
        "ShapeMat",
        "MatType",
        "XCenter",
        "YCenter",
        "BarSize",
        "TendonForce",
        "BarArea"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Text",
        "m",
        "m",
        "Text",
        "KN",
        "m2"
      ],
      "data": {}
    },
    "SD 18 - Shape Reinf Line": {
      "table": "Section Designer Properties 18 - Shape Reinforcing Line",
      "keys": [
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
        "EndBars"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Text",
        "m",
        "m",
        "m",
        "m",
        "m",
        "Text",
        "KN",
        "m2",
        "Yes/No"
      ],
      "data": {}
    },
    "SD 30 - Fiber General": {
      "table": "Section Designer Properties 30 - Fiber General",
      "keys": [
        "SectionName",
        "NumFibersD2",
        "NumFibersD3",
        "CoordSys",
        "GridAngle",
        "LumpRebar",
        "FiberPMM",
        "FiberMC"
      ],
      "units": [
        "Text",
        "Text",
        "Text",
        "Text",
        "Text",
        "Yes/No",
        "Yes/No",
        "Yes/No"
      ],
      "data": {}
    },
    "Solid Property Definitions": {
      "table": "Solid Property Definitions",
      "keys": [
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
        "TotalMass"
      ],
      "units": [
        "Text",
        "Text",
        "Degrees",
        "Degrees",
        "Degrees",
        "Yes/No",
        "Text",
        "Text",
        "Text",
        "KN",
        "KN-s2/m"
      ],
      "data": {}
    }
  }
  
  // return
  return SAP2k;
}