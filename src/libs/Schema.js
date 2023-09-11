export default function Schema() {
  // L0
  let L0 = {
    // Home
    Home: {
      input: {
        label: "Home",
      },
      CodiceIOP: {
        //label: "Codice IOP",
        input: {
          label: "Codice IOP",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 18,
          },
          maxLength: {
            params: 18,
          },
        },
      },
      NomePonteViadotto: {
        //label: "Nome Ponte/Viadotto",
        input: {
          label: "Nome Ponte/Viadotto",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      StradaDiAppartenenza: {
        //label: "Strada di appartenenza",
        input: {
          label: "Strada di appartenenza",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      ProgressivaKmIniziale: {
        //label: "Progressiva km iniziale",
        //type: "Number",
        input: {
          label: "Progressiva km iniziale",
          //type: "Number",
        },
        /*validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },*/
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 1,
          },
        },
      },
      ProgressivaKmFinale: {
        //label: "Progressiva km finale",
        //type: "Number",
        input: {
          label: "Progressiva km finale",
          //type: "Number",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 1,
          },
        },
        /*validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },*/
      },
    },
    // Localizzazione
    Localizzazione: {
      input: {
        label: "Localizzazione",
      },
      ProvinciaRegione: {
        input: {
          label: "Provincia / Regione",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      Comune: {
        input: {
          label: "Comune",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      Localita: {
        input: {
          label: "Località",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      agg: {
        input: {
          label: "Sismicità dell'area [ag/g] (Suolo A, TR = 475 anni)",
          type: "Number",
          mask: "0.000",
          suffix: "ag/g",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
          maxVal: {
            params: 1.0,
          },
        },
      },
      FenomeniErosiviAlluvionamento: {
        input: {
          label: "Fenomeni erosivi e di alluvionamento",
          type: "Radiogroup",
          radio: [["Assenti", "Già valutati", "Da verificare"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      FenomeniFranosi: {
        input: {
          label: "Fenomeni franosi",
          type: "Radiogroup",
          radio: [["Assenti", "Già valutati", "Da verificare"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      CoordinateGeografiche: {
        input: {
          label: "Coordinate geografiche",
          type: "Radiogroup",
          radio: [["WGS84", "ETRF2000"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      CentroQuotaSlm: {
        input: {
          label: "Quota s.l.m.",
          suffix: "m",
          type: "Number",
          mask: "0.0",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      CentroLatitudine: {
        input: {
          label: "Latitudine",
          type: "Number",
          //mask: "0.0",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      CentroLongitudine: {
        input: {
          label: "Longitudine",
          type: "Number",
          //mask: "0.0",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      InizialeQuotaSlm: {
        input: {
          label: "Quota s.l.m.",
          suffix: "m",
          type: "Number",
          mask: "0.0",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      InizialeLatitudine: {
        input: {
          label: "Latitudine",
          type: "Number",
          //mask: "0.0",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      InizialeLongitudine: {
        input: {
          label: "Longitudine",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      FinaleQuotaSlm: {
        input: {
          label: "Quota s.l.m.",
          suffix: "m",
          type: "Number",
          mask: "0.0",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      FinaleLatitudine: {
        input: {
          label: "Latitudine",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      FinaleLongitudine: {
        input: {
          label: "Longitudine",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
    },
    // InformazioniGenerali
    InformazioniGenerali: {
      input: {
        label: "Informazioni generali",
      },
      Proprietario: {
        input: {
          label: "Proprietario",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      Concessionario: {
        input: {
          label: "Concessionario",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      EnteVigilante: {
        input: {
          label: "Ente vigilante",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      AnnoUltimazione: {
        input: {
          label: "Anno ultimazione costruzione (Collaudo)",
        },
        validations: {
          required: {
            params: null,
          },
          minVal: {
            params: 30,
          },
        },
      },
      UltimazioneEffettivoPresunto: {
        input: {
          label: "",
          type: "Radiogroup",
          radio: [["Effettivo", "Presunto"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      AnnoInterventi: {
        input: {
          label: "Anno eventuali interventi sostanziali",
        },
        validations: {
          required: {
            params: null,
          },
          minVal: {
            params: 30,
          },
        },
      },
      InterventiEffettivoPresunto: {
        input: {
          label: "",
          type: "Radiogroup",
          radio: [["Effettivo", "Presunto"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // DatiDiProgetto
    DatiDiProgetto: {
      input: {
        label: "Dati di progetto",
      },
      Progettista: {
        input: {
          label: "Progettista",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      NormaDiProgetto: {
        input: {
          label: "Norma di progetto",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      EnteApprovatore: {
        input: {
          label: "Ente approvatore",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      DataInizio: {
        input: {
          label: "Data inizio",
          type: "Date",
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      DataInizioEffettivoPresunto: {
        input: {
          label: "",
          type: "Radiogroup",
          radio: [["Effettivo", "Presunto"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      DataFine: {
        input: {
          label: "Data fine",
          type: "Date",
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      DataFineEffettivoPresunto: {
        input: {
          label: "",
          type: "Radiogroup",
          radio: [["Effettivo", "Presunto"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // TutelaAiSensiDelDL2210442
    TutelaAiSensiDelDL2210442: {
      input: {
        label: "Tutela ai sensi del Decreto Legislativo 22 gennaio 2004, n. 42",
      },
      ProvvedimentiDiTutela: {
        input: {
          label: "Provvedimenti di tutela",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      AutoreDellaProgettazione: {
        input: {
          label: "Autore della progettazione",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      InserimentoDelPonteNellAmbitoDeiPianiPaesaggisticiVigentiAdottati: {
        input: {
          label:
            "Inserimento del ponte nell’ambito dei Piani Paesaggistici vigenti/adottati",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
    },
    // StatoDellOpera
    StatoDellOpera: {
      input: {
        label: "Stato dell'opera",
      },
      StatoDellOpera: {
        input: {
          label: "Stato dell'opera",
          type: "Radiogroup",
          radio: [["A", "B", "C", "D", "E"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // ClassificazioneDelCollegamentoEDusoStradale
    ClassificazioneDelCollegamentoEDusoStradale: {
      input: {
        label:
          "Classificazione del collegamento e Classificazione d’uso stradale",
      },
      TipoDiCollegamento: {
        input: {
          label: "",
          type: "Radiogroup",
          radio: [
            [
              "Ponte su corso d'acqua",
              "Ponte su specchi d'acqua marini",
              "Ponte su ferrovia",
            ],
            [
              "Viadotto su zona edificata",
              "Viadotto su zona urbanizzata",
              "Viadotto su altra via di comunicazione",
            ],
            [
              "Ponte/Viadotto su discontinuità orografica (vallata, piccoli canali, ecc.)",
            ],
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      TipoDiCollegamentoReticolo: {
        input: {
          label: "Reticolo",
          type: "Radiogroup",
          radio: [["principale", "secondario"]],
        },
        validations: {
          /*required: {
              params: null
            }*/
        },
      },
      ClassificazioniDUsoStradale: {
        input: {
          label: "",
          type: "Radiogroup",
          radio: [
            [
              "Autostrada o Ferrovia",
              "Strada extraurbana secondaria",
              "Strada urbana di quartiere",
            ],
            [
              "Strada extraurbana principale",
              "Strada urbana di scorrimento",
              "Strada locale",
            ],
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // DatiGeomorfologici
    DatiGeomorfologici: {
      input: {
        label: "Dati Geomorfologici",
      },
      MorfologiaDelSito: {
        input: {
          label: "Morfologia del sito",
          type: "Radiogroup",
          radio: [
            ["Cresta", "Pendio dolce (0 - 10°)"],
            ["Pendio moderato (10° - 25°)", "Pendio ripido (> 25°)"],
            ["Pianura", "Pianura alla base dei versanti"],
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // CaratteristicheGeometriche
    CaratteristicheGeometriche: {
      input: {
        label: "Caratteristiche Geometriche",
      },
      LuceComplessivaEstesa: {
        input: {
          label: "Luce complessiva (Estesa)",
          type: "Number",
          mask: "0.0",
          suffix: "m",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      LarghezzaTotaleImpalcato: {
        input: {
          label: "Larghezza totale impalcato",
          type: "Number",
          mask: "0.0",
          suffix: "m",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      NCampate: {
        input: {
          label: "N° campate",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0,
          },
        },
      },
      LuceCampate: {
        input: {
          label: "Luce campate",
          type: "Number",
          mask: "0.0",
          suffix: "m",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      Tracciato: {
        input: {
          label: "Tracciato",
          type: "Radiogroup",
          radio: [["Rettilineo", "In curva"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // TipologiaStrutturale
    TipologiaStrutturale: {
      input: {
        label: "Tipologia strutturale",
      },
      TipologiaStrutturale: {
        input: {
          label: "Tipologia strutturale",
          type: "Radiogroup",
          radio: [
            [
              "Arco in muratura",
              "Travate appoggiate",
              "Travate continue",
              "Soletta in C.A.",
            ],
            [
              "Sezione tubolare in C.A.",
              "Arco in C.A.",
              "Travate Gerber",
              "Cassone in Precompresso",
            ],
            [
              "Sezione tubolare in acciaio",
              "Arco in acciaio",
              "Strallato o sospeso",
              "Travate in c.a.p. a cavi post-tesi",
            ],
            ["Altro"],
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      TipologiaStrutturaleAltro: {
        input: {
          label: "Altro",
        },
        validations: {
          /*required: {
              params: null
            },
            minLength: {
              params: 3
            }*/
        },
      },
    },
    // Spalle
    Spalle: {
      input: {
        label: "Spalle",
      },
      TipologiaSpallaIniziale: {
        input: {
          label: "Tipologia spalla iniziale",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      FondazioniSpallaIniziale: {
        input: {
          label: "Fondazioni spalla iniziale",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      TipologiaSpallaFinale: {
        input: {
          label: "Tipologia spalla finale",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      FondazioniSpallaFinale: {
        input: {
          label: "Fondazioni spalla finale",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
    },
    // PileMaterialeCostruttivo
    PileMaterialeCostruttivo: {
      input: {
        label: "Pile - Materiale costruttivo",
      },
      PileMaterialeCostruttivo: {
        input: {
          label: "Tipologia strutturale",
          type: "Radiogroup",
          radio: [
            ["Muratura", "C.A.", "C.A.P.", "Acciaio"],
            [
              "Misto (C.A./Acciaio)",
              "Legno",
              "PileMaterialeCostruttivoAltro",
              "Altro",
            ],
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      PileMaterialeCostruttivoAltro: {
        input: {
          label: "Altro",
        },
        validations: {
          /*required: {
              params: null
            },
            minLength: {
              params: 3
            }*/
        },
      },
    },
    // Pile
    Pile: {
      input: {
        label: "Pile",
      },
      TipologiaSezione: {
        input: {
          label: "Tipologia sezione",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      TipologiaFondazioni: {
        input: {
          label: "Tipologia fondazioni",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      AltezzaPile: {
        input: {
          label: "Altezza pile",
          suffix: "m",
          type: "Number",
          mask: "0.0",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      GeometriaSezione: {
        input: {
          label: "Geometria sezione (circolare, rettangolare, etc.)",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      NumeroFondazioni: {
        input: {
          label: "Numero fondazioni",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0,
          },
        },
      },
      EvoluzioneEventualeRispettoAlFondoAlveo: {
        input: {
          label: "Evoluzione eventuale rispetto al fondo alveo",
        },
        validations: {
          /*required: {
              params: null
            },
            minLength: {
              params: 3
            }*/
        },
      },
    },
    // ImpalcatoMaterialeCostruttivo
    ImpalcatoMaterialeCostruttivo: {
      input: {
        label: "Impalcato - Materiale costruttivo",
      },
      ImpalcatoMaterialeCostruttivo: {
        input: {
          label: "Tipologia strutturale",
          type: "Radiogroup",
          radio: [
            ["Muratura", "C.A.", "C.A.P.", "Acciaio"],
            [
              "Misto (C.A./Acciaio)",
              "Legno",
              "ImpalcatoMaterialeCostruttivoAltro",
              "Altro",
            ],
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      ImpalcatoMaterialeCostruttivoAltro: {
        input: {
          label: "Altro",
        },
        validations: {
          /*required: {
              params: null
            },
            minLength: {
              params: 3
            }*/
        },
      },
    },
    // ImpalcatoTipologiaSoletta
    ImpalcatoTipologiaSoletta: {
      input: {
        label: "Impalcato - Materiale costruttivo",
      },
      ImpalcatoTipologiaSoletta: {
        input: {
          label: "Impalcato – Tipologia soletta",
          type: "Radiogroup",
          radio: [
            ["C.A.", "C.A.P.", "Acciaio", "Misto (C.A./Acciaio)"],
            ["Legno", "ImpalcatoTipologiaSolettaAltro", "Altro"],
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      ImpalcatoTipologiaSolettaAltro: {
        input: {
          label: "Altro",
        },
        validations: {
          /*required: {
              params: null
            },
            minLength: {
              params: 3
            }*/
        },
      },
    },
    // SistemiDiProtezioneEdApparecchiDiAppoggio
    SistemiDiProtezioneEdApparecchiDiAppoggio: {
      input: {
        label: "Sistemi di protezione ed apparecchi di appoggio",
      },
      TipoSistemiDiProtezione: {
        input: {
          label: "Tipo sistemi di protezione",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      TipologiaApparecchiAppoggio: {
        input: {
          label: "Tipologia apparecchi di appoggio",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      LarghezzaCareggiata: {
        input: {
          label: "Larghezza careggiata",
          suffix: "m",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      TipologiaDispositiviAntisismici: {
        input: {
          label: "Tipologia dispositivi antisismici",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
    },
    // Giunti
    Giunti: {
      input: {
        label: "Giunti",
      },
      TipologiaGiunti: {
        input: {
          label: "Tipologia giunti",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      LunghezzaGiuntoSpalla: {
        input: {
          label: "Lunghezza giunto spalla",
          suffix: "m",
          type: "Number",
          mask: "0.0",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      NumeroTotaleGiunti: {
        input: {
          label: "Numero totale giunti",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0,
          },
        },
      },
      LunghezzaGiuntoPila: {
        input: {
          label: "Lunghezza giunto pila",
          suffix: "m",
          type: "Number",
          mask: "0.0",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
    },
    // DescrizioneDegliEventualiInterventiStrutturaliEseguiti
    DescrizioneDegliEventualiInterventiStrutturaliEseguiti: {
      input: {
        label: "Descrizione degli eventuali interventi strutturali eseguiti",
      },
      VoltaInMuratura: {
        input: {
          label: "Volta in muratura",
          type: "Checkbox",
        },
        validations: {},
      },
      VoltaInMuraturaDescrizione: {
        input: {
          label: "Descrizione",
          type: "Textarea",
        },
        validations: {},
      },
      RiparazioneSostituzioneDiElementiStrutturali: {
        input: {
          label: "Riparazione/Sostituzione di elementi strutturali",
          type: "Checkbox",
        },
        validations: {},
      },
      RiparazioneSostituzioneDiElementiStrutturaliDescrizione: {
        input: {
          label: "Descrizione",
          type: "Textarea",
        },
        validations: {},
      },
      AmpliamentoDiCarreggiataEDelleStrutture: {
        input: {
          label: "Ampliamento di carreggiata e delle strutture",
          type: "Checkbox",
        },
        validations: {},
      },
      AmpliamentoDiCarreggiataEDelleStruttureDescrizione: {
        input: {
          label: "Descrizione",
          type: "Textarea",
        },
        validations: {},
      },
      ElementiStrutturaliAggiuntiviConsolidamento: {
        input: {
          label: "Elementi strutturali aggiuntivi/consolidamento",
          type: "Checkbox",
        },
        validations: {},
      },
      ElementiStrutturaliAggiuntiviConsolidamentoDescrizione: {
        input: {
          label: "Descrizione",
          type: "Textarea",
        },
        validations: {},
      },
      InterventiDiCarattereGeotecnicoInFondazioneEOInCorrispondenzaDelleSpalle: {
        input: {
          label:
            "Interventi di carattere geotecnico in fondazione e/o in corrispondenza delle spalle",
          type: "Checkbox",
        },
        validations: {},
      },
      InterventiDiCarattereGeotecnicoInFondazioneEOInCorrispondenzaDelleSpalleDescrizione: {
        input: {
          label: "Descrizione",
          type: "Textarea",
        },
        validations: {},
      },
      InterventiDiMitigazioneProtezioneDallErosioneDiSpalleEPile: {
        input: {
          label:
            "Interventi di mitigazione/protezione dall'erosione di spalle e pile",
          type: "Checkbox",
        },
        validations: {},
      },
      InterventiDiMitigazioneProtezioneDallErosioneDiSpalleEPileDescrizione: {
        input: {
          label: "Descrizione",
          type: "Textarea",
        },
        validations: {},
      },
      DescrizioneDegliEventualiInterventiStrutturaliEseguitiAltro: {
        input: {
          label: "Altro",
          type: "Checkbox",
        },
        validations: {},
      },
      DescrizioneDegliEventualiInterventiStrutturaliEseguitiAltroDescrizione: {
        input: {
          label: "Descrizione",
          type: "Textarea",
        },
        validations: {},
      },
    },
    // InterventiDiManutenzione
    InterventiDiManutenzione: {
      input: {
        label: "Interventi di manutenzione",
      },
      InterventiDiManutenzione: {
        input: {
          label: "",
          type: "Radiogroup",
          radio: [["Presenti", "Assenti", "Non noti"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      PianoDiManutenzione: {
        input: {
          label: "Piano di manutenzione",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      NumeroDiInterventiManutentiviEffettuati: {
        input: {
          label: "Numero di interventi manutentivi effettuati",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: -1,
          },
        },
      },
      DataUltimoInterventoDiManutenzione: {
        input: {
          label: "Data ultimo intervento",
          type: "Date",
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      PeriodicitaInterventi: {
        input: {
          label: "Periodicità (se più di 1 intervento)",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      InterventiDiManutenzioneList: {
        input: {
          label: "Interventi di manutenzione",
          type: "Array",
          each: [
            ["DataInterventoDiManutenzione"],
            ["TipoDiManutenzione"],
            ["DocumentazioneRelativa"],
          ],
        },
        validations: {
          each: {
            DataInterventoDiManutenzione: {
              input: {
                label: "Data intervento",
                type: "Date",
              },
              validations: {
                required: {
                  params: null,
                },
              },
            },
            TipoDiManutenzione: {
              input: {
                label: "Tipo di manutenzione",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            DocumentazioneRelativa: {
              input: {
                label: "Documentazione relativa",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
          },
        },
      },
    },
    // IspezioniPregresse
    IspezioniPregresse: {
      input: {
        label: "Ispezioni pregresse",
      },
      IspezioniPregresse: {
        input: {
          label: "",
          type: "Radiogroup",
          radio: [["Presenti", "Assenti", "Non note"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      ProgrammaDiIspezioni: {
        input: {
          label: "Programma di ispezioni",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      NumeroDiIspezioniEffettuate: {
        input: {
          label: "Numero di ispezioni effettuate",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: -1,
          },
        },
      },
      DataUltimaIspezione: {
        input: {
          label: "Data ultima ispezione",
          type: "Date",
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      PeriodicitaIspezioni: {
        input: {
          label: "Periodicità (se più di 1 ispezione)",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      IspezioniRisultatiSignificativi: {
        input: {
          label: "Risultati significativi",
          type: "Textarea",
        },
        validations: {},
      },
      IspezioniPregresseList: {
        input: {
          label: "Ispezioni pregresse",
          type: "Array",
          each: [
            ["DataIspezione", "DocumentazioneRelativa"],
            ["MetodologiaIspezione", "EnteIspettivo"],
          ],
        },
        validations: {
          each: {
            DataIspezione: {
              input: {
                label: "Data ispezione",
                type: "Date",
              },
              validations: {
                required: {
                  params: null,
                },
              },
            },
            MetodologiaIspezione: {
              input: {
                label: "Metodologia di ispezione",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            DocumentazioneRelativa: {
              input: {
                label: "Documentazione relativa",
                type: "File",
              },
              validations: {},
            },
            EnteIspettivo: {
              input: {
                label: "Ente ispettivo",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
          },
        },
      },
    },
    // AttivitaDiMonitoraggioPregresseOInCorso
    AttivitaDiMonitoraggioPregresseOInCorso: {
      input: {
        label: "Attivita di monitoraggio pregresse o in corso",
      },
      AttivitaDiMonitoraggioPregresseOInCorso: {
        input: {
          label: "",
          type: "Radiogroup",
          radio: [["Presenti", "Assenti", "Non note"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      TipoRilevamento: {
        input: {
          label: "Tipo rilevamento",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      AttivitaMetodologiaMonitoraggio: {
        input: {
          label: "Metodologia monitoraggio",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      AttivitaDataInizio: {
        input: {
          label: "Data inizio",
          type: "Date",
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      AttivitaDataUltimoAggiornamento: {
        input: {
          label: "Data ultimo aggiornamento",
          type: "Date",
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      AttivitaDataFine: {
        input: {
          label: "Data fine",
          type: "Date",
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      TipoStrumentazione: {
        input: {
          label: "Tipologia strumentazione",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      GrandezzeMisurate: {
        input: {
          label: "Grandezze misurate",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      AttivitaRisultatiSignificativi: {
        input: {
          label: "Risultati significativi",
          type: "Textarea",
        },
        validations: {},
      },
      LivelloAllerta: {
        input: {
          label: "Livello allerta",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      AttivitaDocumentazioneRelativa: {
        input: {
          label: "Documentazione relativa",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      AttivitaDocumentazioneRelativaAllegatoN: {
        input: {
          label: "Allegato",
          type: "File",
        },
        validations: {},
      },
    },
    // ReteStradale
    ReteStradale: {
      input: {
        label: "Rete stradale",
      },
      ItinerarioInternazionale: {
        input: {
          label: "Itinerario Internazionale",
          type: "Radiogroup",
          radio: [["SI"], ["NO"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      ReteTEN: {
        input: {
          label: "Rete TEN",
          type: "Radiogroup",
          radio: [["SI"], ["NO"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      ReteEmergenza: {
        input: {
          label: "Rete emergenza",
          type: "Radiogroup",
          radio: [["SI"], ["NO"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      NCarreggiate: {
        input: {
          label: "N° di carreggiate",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0,
          },
        },
      },
      NCorsieCarreggiata: {
        input: {
          label: "N° corsie/carreggiata",
          //type: "Number",
        },
        validations: {
          /*numRequired: {
            params: null,
          },
          minVal: {
            params: 0,
          },*/
        },
      },
      PresenzaDiCurve: {
        input: {
          label: "Presenza di curve",
          type: "Radiogroup",
          radio: [["SI"], ["NO"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      TrafficoMedioGiornalieroVeicoliGiorno: {
        input: {
          label:
            "Traffico Medio Giornaliero - veicoli/giorno (sull’intera carreggiata)",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      TrafficoMedioGiornalieroVeicoliCommerciali: {
        input: {
          label:
            "Traffico Medio Giornaliero – Veicoli commerciali (la cui sagoma corrisponde a tipologie con portata superiore a 3,5 t)",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      LimitazioneDiCarico: {
        input: {
          label: "Limitazione di carico",
          type: "Radiogroup",
          radio: [["Nessuna limitazione presente", "Massima massa consentita"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      MassimaMassaConsentita: {
        input: {
          label: "Massima massa consentita",
          type: "Number",
          suffix: "ton",
          //, disabled: this.LimitazioneDiCaricoRule
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0,
          },
        },
      },
      PresenzaAlternativeStradali: {
        input: {
          label:
            "Presenza di alternative stradali (in caso di chiusure/limitazioni di traffico)",
          type: "Radiogroup",
          radio: [["SI", "NO"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      DurataDeviazioneKm: {
        input: {
          label: "Durata deviazione",
          type: "Number",
          suffix: "km",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0,
          },
        },
      },
      DurataDeviazioneMinuti: {
        input: {
          label: "Durata deviazione",
          type: "Number",
          suffix: "minuti",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0,
          },
        },
      },
      CategoriaPercorsoAlternativoIndividuato: {
        input: {
          label: "Categoria del percorso alternativo individuato",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      DisponibilitaSstudiTrasportisticiSpecifici: {
        input: {
          label: "Disponibilità di studi trasportistici specifici",
          type: "Radiogroup",
          radio: [["SI", "NO"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      DisponibilitaSstudiTrasportisticiSpecificiAllegatoN: {
        input: {
          label: "Allegato n.",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0,
          },
        },
      },
    },
    // ClassiDiConseguenza
    ClassiDiConseguenza: {
      input: {
        label: "Classi di conseguenza",
      },
      ClasseDiConseguenza: {
        input: {
          label: "Classe di conseguenza",
          type: "Radiogroup",
          radio: [["CC3", "CC2", "CC1"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      ClasseDiConseguenzaDescrizione: {
        input: {
          label:
            "In caso di classe di conseguenza minore di CC3, fornire adeguata giustificazione",
          type: "Textarea",
        },
        validations: {},
      },
    },
    // DocumentiProgettualiDisponibili
    DocumentiProgettualiDisponibili: {
      input: {
        label: "Documenti progettuali disponibili",
      },
      // viene completato all'inizio
    },
    // DocumentiRischioIdrogeologico
    DocumentiRischioIdrogeologico: {
      input: {
        label:
          "Documenti disponibili inerenti alle condizioni di rischio idrogeologico",
      },
      DocumentiRischioIdrogeologicoList: {
        input: {
          label:
            "Documenti disponibili inerenti alle condizioni di rischio idrogeologico",
          type: "Array",
          each: [["Rischio"], ["Documento"]],
        },
        validations: {
          each: {
            Rischio: {
              input: {
                label: "Rischio",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            Documento: {
              input: {
                label: "Documento",
                type: "File",
              },
              validations: {
                /*required: {
                    params: null
                  },*/
                /*minLength: {
                    params: 3
                  }*/
              },
            },
          },
        },
      },
    },
  };

  const DocumentiProgettualiDisponibili = [
    "StrumentiDelFinanziamento",
    "PianiStrumentoProgrammazione",

    "DocumentiDescrittiviDiMassima",
    "DocumentiGraficiDiMassima",
    "DocumentiInerentiIterApprovazioneDiMassima",

    "DocumentiDescrittiviDefinitivoEsecutivo",
    "DocumentiGraficiDefinitivoEsecutivo",
    "DocumentiInerentiIterApprovazioneDefinitivoEsecutivo",

    "DocumentiDescrittiviEsecutivoCantierabile",
    "DocumentiGraficiEsecutivoCantierabile",
    "DocumentiInerentiIterApprovazioneEsecutivoCantierabile",

    "DocumentiContabiliDL",
    "GraficiAllegatiContabilitAppalto",

    "DocumentiContrattualiRealizzazione",
    "DocumentiContabiliRealizzazione",

    "RelazioneDiCollaudo",
    "AllegatiRelazioneCollaudo",
  ];

  const DocumentiProgettualiDisponibiliListB = [
    {
      a: "Varianti",
      label: "Varianti in corso d'opera",
      list: [
        "DocumentiDescrittivi",
        "DocumentiGrafici",
        "DocumentiContrattualiContabili",
      ],
    },
    {
      a: "InterventiManutenzione",
      label: "Interventi di manutenzione",
      list: [
        "DocumentiDescrittivi",
        "DocumentiGrafici",
        "DocumentiContrattualiContabili",
      ],
    },
    {
      a: "Segnalazioni",
      label: "Segnalazioni",
      list: ["DocumentiDescrittiviConDate", "DocumentiGraficiConDate"],
    },
    {
      a: "Progetti",
      label: "Progetto di incremento del grado di sicurezza",
      list: ["DocumentiDescrittivi", "DocumentiGrafici"],
    },
    {
      a: "InterventiSicurezza",
      label: "Interventi di incremento del grado di sicurezza",
      list: ["DocumentiDescrittivi", "DocumentiGrafici"],
    },
  ];

  //const a = "DocumentiProgettualiDisponibili";
  DocumentiProgettualiDisponibili.forEach((value) => {
    L0["DocumentiProgettualiDisponibili"][value] = {
      input: {
        label: "",
        type: "Radiogroup",
        radio: [["SI", "NO"]],
      },
      validations: {
        required: {
          params: null,
        },
      },
    };
    L0["DocumentiProgettualiDisponibili"][value + "Fonte"] = {
      input: {
        label: "Fonte",
      },
      validations: {
        minLength: {
          params: 3,
        },
      },
    };
    L0["DocumentiProgettualiDisponibili"][value + "AllegatoN"] = {
      input: {
        label: "Allegato n.",
        type: "File",
      },
      validations: {
        /*minVal: {
          params: 0
        }*/
      },
    };
  });

  //const b = "DocumentiProgettualiDisponibiliListB";
  DocumentiProgettualiDisponibiliListB.forEach((obj) => {
    const obja = obj.DocumentiProgettualiDisponibili;

    let each = {};
    obj.list.forEach((e) => {
      each[e] = {
        input: {
          label: "",
          type: "Radiogroup",
          radio: [["SI", "NO"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      };
      each[e + "Fonte"] = {
        input: {
          label: "Fonte",
        },
        validations: {
          minLength: {
            params: 3,
          },
        },
      };
      each[e + "AllegatoN"] = {
        input: {
          label: "Allegato n.",
          type: "File",
        },
        validations: {
          /*minVal: {
            params: 0
          }*/
        },
      };
    });

    DocumentiProgettualiDisponibili[obja] = {
      input: {
        label: obj.label,
        type: "Array",
        each: [obj.list],
      },
      validations: {
        each: each,
      },
    };
  });

  // L1
  let L1 = {
    // Home
    Home: {
      input: {
        label: "Home",
      },
      StradaDiAppartenenza: {
        label: "Strada di appartenenza",
        input: {
          label: "Strada di appartenenza",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      ProgressivaKm: {
        label: "Progressiva km",
        input: {
          label: "Progressiva km",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      TecnicoRilevatore: {
        input: {
          label: "Tecnico rilevatore",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      DataIspezione: {
        input: {
          label: "Data ispezione",
          type: "Date",
        },
        validations: {
          numRequired: {
            params: null,
          },
        },
      },
    },
    // Localizzazione
    Localizzazione: {
      input: {
        label: "Localizzazione",
      },
      ProvinciaRegione: {
        input: {
          label: "Provincia / Regione",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      Comune: {
        input: {
          label: "Comune",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      Localita: {
        input: {
          label: "Località",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      CoordinateGeografiche: {
        input: {
          label: "Coordinate geografiche",
          type: "Radiogroup",
          radio: [["WGS84", "ETRF2000"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      CentroQuotaSlm: {
        input: {
          label: "Quota s.l.m.",
          suffix: "m",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      CentroLatitudine: {
        input: {
          label: "Latitudine",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
        },
      },
      CentroLongitudine: {
        input: {
          label: "Longitudine",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
        },
      },
      InizialeQuotaSlm: {
        input: {
          label: "Quota s.l.m.",
          suffix: "m",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      InizialeLatitudine: {
        input: {
          label: "Latitudine",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
        },
      },
      InizialeLongitudine: {
        input: {
          label: "Longitudine",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
        },
      },
      FinaleQuotaSlm: {
        input: {
          label: "Quota s.l.m.",
          suffix: "m",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      FinaleLatitudine: {
        input: {
          label: "Latitudine",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
        },
      },
      FinaleLongitudine: {
        input: {
          label: "Longitudine",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
        },
      },
    },
    // TipologiaStrutturale
    TipologiaStrutturale: {
      input: {
        label: "Tipologia strutturale",
      },
      TipologiaStrutturale: {
        input: {
          label: "Tipologia strutturale",
          type: "Radiogroup",
          radio: [
            [
              "Arco in muratura",
              "Travate appoggiate",
              "Travate continue",
              "Soletta in C.A.",
            ],
            [
              "Sezione tubolare in C.A.",
              "Arco in C.A.",
              "Travate Gerber",
              "Cassone in Precompresso",
            ],
            [
              "Sezione tubolare in acciaio",
              "Arco in acciaio",
              "Strallato o sospeso",
              "Travate in c.a.p. a cavi post-tesi",
            ],
            ["Altro"],
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      TipologiaStrutturaleAltro: {
        input: {
          label: "Altro",
        },
        validations: {
          /*required: {
              params: null
            },
            minLength: {
              params: 3
            }*/
        },
      },
    },
    // TipologiaFondazioni
    TipologiaFondazioni: {
      input: {
        label: "Tipologia delle fondazioni",
      },
      FondazioniDiretteIndirette: {
        input: {
          //label: "Tipologia delle fondazioni",
          type: "Radiogroup",
          radio: [["Fondazioni dirette", "Fondazioni indirette"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      FondazioniDirette: {
        input: {
          //label: "Tipologia delle fondazioni",
          type: "Radiogroup",
          radio: [["Murature"], ["Pile in alveo"], ["Non nota"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // ClassificazioneDelleVieDAttacco
    ClassificazioneDelleVieDAttacco: {
      input: {
        label: "Classificazione delle vie d'attacco",
      },
      ClassificazioneDelleVieDAttacco: {
        input: {
          //label: "Classificazione delle vie d'attacco",
          type: "Radiogroup",
          radio: [
            ["Rilevato in terra", "Rilevato in terra rinforzata/armata"],
            ["Rilevato in golena", "Su roccia"],
            ["Viadotto in pendenza/curva", "Altro"],
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      ClassificazioneDelleVieDAttaccoAltro: {
        input: {
          label: "Altro",
        },
        validations: {
          /*required: {
              params: null
            },
            minLength: {
              params: 3
            }*/
        },
      },
    },
    // DatiGeomorfologici
    DatiGeomorfologici: {
      input: {
        label: "Dati Geomorfologici",
      },
      MorfologiaDelSito: {
        input: {
          label: "Morfologia del sito",
          type: "Radiogroup",
          radio: [
            ["Cresta", "Pendio dolce (0 - 10°)"],
            ["Pendio moderato (10° - 25°)", "Pendio ripido (> 25°)"],
            ["Pianura", "Pianura alla base dei versanti"],
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // SchemiGeometrici
    SchemiGeometrici: {
      input: {
        label: "Schemi geometrici",
      },
      SezioneTrasversale: {
        input: {
          label: "Sezione trasversale",
          type: "SvgSchema",
          options: {
            wh: 3 / 2,
            actions: ["addPQuad", "addLStraight"],
          },
        },
        validations: {},
      },
      SezioneLongitudinale: {
        input: {
          label: "Sezione longitudinale",
          type: "SvgSchema",
          options: {
            wh: 2,
            actions: ["addPQuad"],
          },
        },
        validations: {},
      },
      Pianta: {
        input: {
          label: "Pianta",
          type: "SvgSchema",
          options: {
            wh: 2,
            actions: ["addPQuad"],
          },
        },
        validations: {},
      },
    },
    // RilievoCaratteristicheGeometriche
    RilievoCaratteristicheGeometriche: {
      input: {
        label: "Rilievo delle caratteristiche geometriche",
      },
      LuceComplessivaSpallaSpalla: {
        input: {
          label: "Luce complessiva (spalla - spalla)",
          type: "Number",
          suffix: "m",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      LuceSingolaCampata: {
        input: {
          label: "Luce singola campata",
          type: "Number",
          suffix: "m",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      LunghezzaSbalzoSoletta: {
        input: {
          label: "Lunghezza sbalzo soletta",
          type: "Number",
          suffix: "m",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      PresenzaDiCurve: {
        input: {
          label: "Presenza di curve",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      NCampate: {
        input: {
          label: "N° campate",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0,
          },
        },
      },
      AltezzaMaxPile: {
        input: {
          label: "Altezza max pile",
          suffix: "m",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
      LarghezzaImpalcato: {
        input: {
          label: "Larghezza impalcato",
          type: "Number",
          suffix: "m",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0.0,
          },
        },
      },
    },
    // TipologiaElementiStrutturali
    TipologiaElementiStrutturali: {
      input: {
        label: "Tipologia elementi strutturali",
      },
      // viene completato all'inizio
    },
    // TipologiaElementiStrutturaliImpalcato
    TipologiaElementiStrutturaliImpalcato: {
      input: {
        label: "Tipologia elementi strutturali IMPALCATO",
      },
      // viene completato all'inizio
    },
    // ApparecchiDiAppoggio
    ApparecchiDiAppoggio: {
      input: {
        label: "Apparecchi di appoggio",
      },
      ApparecchiAssentiPresenti: {
        input: {
          //label: null,
          type: "Radiogroup",
          radio: [["Assenti", "Presenti"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      TipoDiApparecchi: {
        input: {
          label: "Tipo di apparecchi",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      NApparecchiTot: {
        input: {
          label: "N° apparecchi tot",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: -1,
          },
        },
      },
      NApparecchiRilevabili: {
        input: {
          label: "N° apparecchi rilevabili",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: -1,
          },
        },
      },
      NessunApparecchioVisibile: {
        input: {
          label: "Nessun apparecchio visibile",
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // ElementiCritici
    ElementiCritici: {
      input: {
        label: "Elementi critici (vedi $3.3 delle Linee Guida)",
      },
      ElementiAssentiPresenti: {
        input: {
          //label: null,
          type: "Radiogroup",
          radio: [["Assenti", "Presenti"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      TipologiaDiElemento: {
        input: {
          label: "Tipologia di elemento",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      StatoDiDegrado: {
        input: {
          label: "Stato di degrado (descrizione sintetica)",
          type: "Textarea",
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // InformazioniIspezione
    InformazioniIspezione: {
      input: {
        label: "Informazioni ispezione",
      },
      PossibilitaDiAccedereAlDiSottoDelPonte: {
        input: {
          label: "Possibilità di accedere al di sotto del ponte",
          type: "Radiogroup",
          radio: [["SI", "NO", "PARZIALE"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      NCampateCompletamenteIspezionate: {
        input: {
          label: "N° campate completamente ispezionate",
          type: "Number",
        },
        validations: {
          numRequired: {
            params: null,
          },
          minVal: {
            params: 0,
          },
        },
      },
      IspezionatiEntrambiProspetti: {
        input: {
          label: "Ispezionati entrambi i prospetti",
          type: "Radiogroup",
          radio: [["SI", "NO"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      ProspettoIspezionato: {
        input: {
          label: "Prospetto Ispezionato",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
    },

    // Uams // role: admin
    /*
    Uams: {
      input: {
        label: "Uniaxialmaterials",
        role: "admin",
      },
      FondazioniDiretteIndirette: {
        input: {
          //label: "Tipologia delle fondazioni",
          type: "Radiogroup",
          radio: [["Fondazioni dirette", "Fondazioni indirette"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      FondazioniDirette: {
        input: {
          //label: "Tipologia delle fondazioni",
          type: "Radiogroup",
          radio: [["Murature"], ["Pile in alveo"], ["Non nota"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    */
  };

  //const a = "TipologiaElementiStrutturali";
  const tipologie = ["Spalle", "Pile", "Impalcato"];
  const materiali = [
    "CA",
    "CAP",
    "Acciaio",
    "AcciaioCalcestruzzo",
    "Muratura",
    "Legno",
    "Altro",
  ];
  for (const t in tipologie) {
    const tipologia = tipologie[t];
    for (const m in materiali) {
      const materiale = materiali[m];
      L1["TipologiaElementiStrutturali"][tipologia + materiale] = {
        input: {
          label: "n. elementi",
          type: "Number",
        },
        validations: {
          minVal: {
            params: -1,
          },
        },
      };
    }
  }

  //const b = "TipologiaElementiStrutturaliImpalcato";
  const elementi = ["Soletta", "Travi", "Traversi", "Arco", "Altro"];
  for (const m in materiali) {
    const materiale = materiali[m];
    for (const e in elementi) {
      const elemento = elementi[e];
      L1["TipologiaElementiStrutturaliImpalcato"][materiale + elemento] = {
        input: {
          label: "n. elementi",
          type: "Number",
        },
        validations: {
          minVal: {
            params: -1,
          },
        },
      };
    }
  }

  // L1Speciale
  const L1Speciale = {
    // Home
    Home: {
      input: {
        label: "Home",
      },
      CodiceIOP: {
        input: {
          label: "Codice IOP",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      NomePonteViadotto: {
        input: {
          label: "Nome Ponte/Viadotto",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      StradaDiAppartenenza: {
        input: {
          label: "Strada di appartenenza",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      ProgressivaKmIniziale: {
        input: {
          label: "Progressiva km iniziale",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
      ProgressivaKmFinale: {
        input: {
          label: "Progressiva km finale",
        },
        validations: {
          required: {
            params: null,
          },
          minLength: {
            params: 3,
          },
        },
      },
    },
    // Tracciato dei cavi e localizzazione dei difetti
    TracciatoCaviLocalizzazioneDifetti: {
      input: {
        label: "Tracciato dei cavi e localizzazione dei difetti",
      },
      TracciatoCaviReperibileDocumentiProgettoOriginale: {
        input: {
          label:
            "Tracciato dei cavi reperibile da documenti di progetto originale",
          type: "Radiogroup",
          radio: [["SI", "NO"]],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      TracciatoCaviReperibileDocumentiProgettoOriginaleAllegato: {
        input: {
          label:
            "Indicare i documenti di riferimento da allegare alla presente scheda",
          type: "File",
        },
        validations: {},
      },
      SchemaProgettoTracciatoCavi: {
        input: {
          label: "Schema da progetto del tracciato dei cavi",
          type: "Array",
          each: [["Schema"]],
        },
        validations: {
          each: {
            Schema: {
              input: {
                label:
                  "Tracciare uno schema per ogni tipologia di elemento strutturale",
                type: "SvgSchema",
                options: {
                  wh: 5 / 2,
                  actions: ["addCavo"],
                },
              },
              validations: {},
            },
          },
        },
      },
      IndaginiNonDistruttiveSemidistruttive: {
        input: {
          label: "Indagini non distruttive/semi-distruttive",
          type: "Array",
          each: [
            ["TipologiaIndagine"],
            ["ElementiIndagatiTipologia"],
            ["ElementiIndagatiNumero"],
            ["NTotaleIndaginiEseguite"],
          ],
        },
        validations: {
          each: {
            TipologiaIndagine: {
              input: {
                label: "Tipologia di indagine",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            ElementiIndagatiTipologia: {
              input: {
                label: "Elementi indagati (tipologia)",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            ElementiIndagatiNumero: {
              input: {
                label: "Elementi indagati (numero)",
                type: "Number",
              },
              validations: {
                numRequired: {
                  params: null,
                },
                minVal: {
                  params: 0,
                },
              },
            },
            NTotaleIndaginiEseguite: {
              input: {
                label: "N° totale di indagini eseguite",
                type: "Number",
              },
              validations: {
                numRequired: {
                  params: null,
                },
                minVal: {
                  params: 0,
                },
              },
            },
          },
        },
      },
      RisultatiDelleIndagini: {
        input: {
          label: "Risultati delle indagini",
          type: "Array",
          each: [
            [
              "TipologiaElementoIndagato",
              "TipologiaIndagine",
              "SchemaTracciatoCavi",
            ],
            [
              "RispondenzaConMaterialeProgettoOriginale",
              "SchemaLocalizzazioneDifetti",
            ],
          ],
        },
        validations: {
          each: {
            TipologiaIndagine: {
              input: {
                label: "Tipologia di indagine",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            TipologiaElementoIndagato: {
              input: {
                label: "Tipologia elemento indagato",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            SchemaTracciatoCavi: {
              input: {
                label: "Indicare la localizzazione delle indagini",
                type: "SvgSchema",
                options: {
                  wh: 5 / 2,
                  actions: ["addCavo"],
                },
              },
              validations: {},
            },
            RispondenzaConMaterialeProgettoOriginale: {
              input: {
                label: "Rispondenza con il materiale di progetto originale",
                type: "Radiogroup",
                radio: [["Completa", "Parziale", "Assente"]],
              },
              validations: {
                required: {
                  params: null,
                },
              },
            },
            SchemaLocalizzazioneDifetti: {
              input: {
                label: "Schema di localizzazione dei difetti",
                type: "File",
              },
              validations: {},
            },
          },
        },
      },
    },
    // Campagna di indagini per la valutazione dei difetti
    CampagnaIndaginiValutazioneDifetti: {
      input: {
        label: "Campagna di indagini per la valutazione dei difetti",
      },
      IndaginiNonDistruttiveSemidistruttive: {
        input: {
          label: "Indagini non distruttive/semi-distruttive",
          type: "Array",
          each: [
            ["TipologiaIndagine"],
            ["ElementiIndagatiTipologia"],
            ["ElementiIndagatiNumero"],
            ["NTotaleIndaginiEseguite"],
          ],
        },
        validations: {
          each: {
            TipologiaIndagine: {
              input: {
                label: "Tipologia di indagine",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            ElementiIndagatiTipologia: {
              input: {
                label: "Elementi indagati (tipologia)",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            ElementiIndagatiNumero: {
              input: {
                label: "Elementi indagati (numero)",
                type: "Number",
              },
              validations: {
                numRequired: {
                  params: null,
                },
                minVal: {
                  params: 0,
                },
              },
            },
            NTotaleIndaginiEseguite: {
              input: {
                label: "N° totale di indagini eseguite",
                type: "Number",
              },
              validations: {
                numRequired: {
                  params: null,
                },
                minVal: {
                  params: 0,
                },
              },
            },
          },
        },
      },
      RisultatiDelleIndagini: {
        input: {
          label: "Risultati delle indagini",
          type: "Array",
          each: [
            "LocalizzazioneDifetti",
            "LDTipologiaElementoIndagato",
            "LDTipologiaIndagine",
            "LDTipologieDifettiIndividuati",
            "LDSchemaLocalizzazioneDifetti",

            "ValutazioneStatoTensioneFiloCalcestruzzo",
            "VSTFCDescrizione",
            "VSTFCSchemaLocalizzazioneIndagini",
            "VSTFCNTotaleMisurazioniEseguite",
            "VSTFCInformazioniReperibiliRisultati",
            "VSTFCRispondenzaConMaterialeProgettoOriginale",
            "VSTFCInformazioniReperibiliProgettoOriginale",

            "PrelievoMaterialeIniezione",
            "PMIDescrizione",
            "PMITipologiaElementiIndagati",
            "PMINumeroElementiIndagati",
            "PMINTotalePrelieviEseguiti",
            "PMISchemaLocalizzazioneIndagini",

            "ProveChimiche",
            "ProveChimicheList",
          ],
        },
        validations: {
          each: {
            //
            LocalizzazioneDifetti: {
              input: {
                label: "Localizzazione dei difetti",
                type: "Span",
              },
              validations: {},
            },
            LDTipologiaIndagine: {
              input: {
                label: "Tipologia di indagine",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            LDTipologiaElementoIndagato: {
              input: {
                label: "Tipologia elemento indagato",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            LDTipologieDifettiIndividuati: {
              input: {
                label: "Tipologie di difetti individuati",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            LDSchemaLocalizzazioneDifetti: {
              input: {
                label: "Schema di localizzazione dei difetti",
                type: "File",
              },
              validations: {},
            },
            //
            ValutazioneStatoTensioneFiloCalcestruzzo: {
              input: {
                label:
                  "Valutazione dello stato di tensione del filo o del calcestruzzo",
                type: "Span",
              },
              validations: {},
            },
            VSTFCDescrizione: {
              input: {
                label: "Descrizione",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            VSTFCTipologiaElementiIndagati: {
              input: {
                label: "Elementi indagati (tipologia)",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            VSTFCNumeroElementiIndagati: {
              input: {
                label: "Elementi indagati (numero)",
                type: "Number",
              },
              validations: {
                numRequired: {
                  params: null,
                },
                minVal: {
                  params: 0.0,
                },
              },
            },
            VSTFCNTotaleMisurazioniEseguite: {
              input: {
                label: "N° totale di misurazioni eseguite",
                type: "Number",
              },
              validations: {
                numRequired: {
                  params: null,
                },
                minVal: {
                  params: 0.0,
                },
              },
            },
            VSTFCSchemaLocalizzazioneIndagini: {
              input: {
                label: "Schema di localizzazione delle indagini",
                type: "File",
              },
              validations: {},
            },
            VSTFCInformazioniReperibiliRisultati: {
              input: {
                label: "Risultati",
                type: "Textarea",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            VSTFCRispondenzaConMaterialeProgettoOriginale: {
              input: {
                label: "Rispondenza con il materiale di progetto originale",
                type: "Radiogroup",
                radio: [["SI", "NO"]],
              },
              validations: {
                required: {
                  params: null,
                },
              },
            },
            VSTFCInformazioniReperibiliProgettoOriginale: {
              input: {
                label: "Informazioni reperibili dal progetto originale",
                type: "Textarea",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            //
            PrelievoMaterialeIniezione: {
              input: {
                label: "Prelievo di materiale di iniezione",
                type: "Span",
              },
              validations: {},
            },
            PMIDescrizione: {
              input: {
                label: "Descrizione",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            PMITipologiaElementiIndagati: {
              input: {
                label: "Elementi indagati (tipologia)",
              },
              validations: {
                required: {
                  params: null,
                },
                minLength: {
                  params: 3,
                },
              },
            },
            PMINumeroElementiIndagati: {
              input: {
                label: "Elementi indagati (numero)",
                type: "Number",
              },
              validations: {
                numRequired: {
                  params: null,
                },
                minVal: {
                  params: 0.0,
                },
              },
            },
            PMINTotalePrelieviEseguiti: {
              input: {
                label: "N° totale di prelievi eseguiti",
                type: "Number",
              },
              validations: {
                numRequired: {
                  params: null,
                },
                minVal: {
                  params: 0.0,
                },
              },
            },
            PMISchemaLocalizzazioneIndagini: {
              input: {
                label: "Schema di localizzazione delle indagini",
                type: "File",
              },
              validations: {},
            },
            //
            ProveChimiche: {
              input: {
                label: "Prove chimiche",
                type: "Span",
              },
              validations: {},
            },
            ProveChimicheList: {
              input: {
                label: "Prove chimiche list",
                type: "Array",
                each: [["Tipologia"], ["NTotaleProveEseguite"], ["Risultati"]],
              },
              validations: {
                each: {
                  Tipologia: {
                    input: {
                      label: "Tipologia",
                    },
                    validations: {
                      required: {
                        params: null,
                      },
                      minLength: {
                        params: 3,
                      },
                    },
                  },
                  NTotaleProveEseguite: {
                    input: {
                      label: "N° totale di prove eseguite",
                      type: "Number",
                    },
                    validations: {
                      numRequired: {
                        params: null,
                      },
                      minVal: {
                        params: 0.0,
                      },
                    },
                  },
                  Risultati: {
                    input: {
                      label: "Risultati",
                    },
                    validations: {
                      required: {
                        params: null,
                      },
                      minLength: {
                        params: 3,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      AnalisiDifettiRilevati: {
        input: {
          label: "Analisi dei difetti rilevati",
          type: "Radiogroup",
          radio: [
            [
              "I difetti rilevati indicano la necessità di eseguire valutazioni di sicurezza approfondite di Livello 4.",
            ],
            [
              "Le indagini effettuate non consentono di stimare con adeguata accuratezza l’entità dei difetti presenti. Sono necessarie, pertanto, valutazioni approfondite di Livello 4.",
            ],
            [
              "Le indagini effettuate hanno dimostrato la presenza di difetti di entità modesta, tali da non richiedere provvedimenti urgenti. Si procede pertanto ad ispezioni visive e compilazione di schede di difettosità di Livello 1 e classificazione di Livello 2.",
            ],
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
  };

  // L1ispezione
  const L1ispezione = {
    schede: {
      input: {
        label: "scheda L1",
        type: "Array",
        each: [
          ["N"],
          ["StradaDiAppartenenza", "TecnicoRilevatore"],
          ["ProgressivaKm", "DataIspezione"],
        ],
      },
      validations: {
        each: {
          N: {
            label: "N",
            type: "Number",
            input: {
              label: "N",
              type: "Number",
            },
            validations: {
              numRequired: {
                params: null,
              },
              minVal: {
                params: 0.0,
              },
            },
          },
          StradaDiAppartenenza: {
            input: {
              label: "Strada di appartenenza",
            },
            validations: {
              required: {
                params: null,
              },
              minLength: {
                params: 3,
              },
            },
          },
          ProgressivaKm: {
            input: {
              label: "Progressiva km",
            },
            validations: {
              required: {
                params: null,
              },
              minLength: {
                params: 3,
              },
            },
          },
          TecnicoRilevatore: {
            input: {
              label: "Tecnico rilevatore",
            },
            validations: {
              required: {
                params: null,
              },
              minLength: {
                params: 3,
              },
            },
          },
          DataIspezione: {
            input: {
              label: "Data ispezione",
              type: "Date",
            },
            validations: {
              required: {
                params: null,
              },
            },
          },
        },
      },
    },
  };

  // CASF
  const CASF = {
    // Home
    Home: {
      input: {
        label: "Home",
      },
      /*pericolosita: {
        input: {
          label: "Pericolosità",
          type: "Span",
        },
        validations: {},
      },
      vulnerabilita: {
        input: {
          label: "Vulnerabilità",
          type: "Span",
        },
        validations: {},
      },
      esposizione: {
        input: {
          label: "Esposizione",
          type: "Span",
        },
        validations: {},
      },
      classe: {
        input: {
          label: "Classe",
          type: "Span",
        },
        validations: {},
      },*/
    },
    // Pericolosita
    Pericolosita: {
      input: {
        label: "Stima del livello di Pericolosità",
      },
      ClassificazioneStradeFunzioneMassimaMassaAmmissibile: {
        input: {
          label:
            "Classificazione delle strade in funzione della massima massa ammissibile",
          type: "Select",
          items: ["A", "B", "C", "D", "E"],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      FrequenzaTransitoVeicoliCommercialiSingolaCorsiaMarcia: {
        input: {
          label:
            "Frequenza del transito di veicoli commerciali per singola corsia di marcia",
          type: "Select",
          items: ["Alta", "Media", "Bassa"],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // Vulnerabilita
    Vulnerabilita: {
      input: {
        label: "Stima del livello di Vulnerabilità",
      },
      LivelloDifettositaAttuale: {
        input: {
          label: "Livello di difettosità attuale",
          type: "Select",
          items: [
            { text: "Alto", value: "Alto" },
            { text: "Medio-Alto", value: "MedioAlto" },
            { text: "Medio", value: "Medio" },
            { text: "Medio-Basso", value: "MedioBasso" },
            { text: "Basso", value: "Basso" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      RapiditaEvoluzioneDegrado: {
        input: {
          label: "Rapidità di evoluzione del degrado",
          type: "Select",
          items: [
            { text: "≤ 1945", value: "≤1945" },
            { text: "1945 - 1980", value: "1945_1980" },
            { text: "≥ 1980", value: "≥1980" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      NormaProgettazione: {
        input: {
          label: "Norma di progettazione",
          type: "Select",
          items: ["A", "B", "C"],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      TipologiaSchemaStatico: {
        input: {
          label: "Tipologia di schema statico",
          type: "Select",
          items: [
            { text: "Travate appoggiate", value: "TravateAppoggiate" },
            {
              text: "Travate continue / Telaio",
              value: "TravateContinueTelaio",
            },
            { text: "Arco Massiccio", value: "ArcoMassiccio" },
            { text: "Arco Sottile", value: "ArcoSottile" },
            {
              text: "Travate Gerber / Ponti a stampella con travi tampone",
              value: "TravateGerberPontiStampella",
            },
            {
              text: "Soletta appoggiata",
              value: "SolettaAppoggiata",
            },
            {
              text: "Soletta incastrata",
              value: "SolettaIncastrata",
            },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      Materiale: {
        input: {
          label: "Materiale",
          type: "Select",
          items: [
            { text: "C.a.", value: "CA" },
            {
              text: "C.a.p.",
              value: "CAP",
            },
            { text: "Acciaio", value: "Acciaio" },
            { text: "Metallo (ponti storici)", value: "Metallo" },
            { text: "Muratura", value: "Muratura" },
            {
              text: "Legno",
              value: "Legno",
            },
            {
              text: "Misto (*)",
              value: "Misto",
            },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      Luce: {
        input: {
          label: "Luce della campata più lunga",
          type: "Select",
          //suffix: "m",
          items: [
            { text: "L ≤ 5 m", value: "≤5" },
            {
              text: "5 m < L < 15 m",
              value: "5_15",
            },
            { text: "15 m ≤ L < 25 m", value: "15_25" },
            { text: "L ≥ 25 m", value: "≥25" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // Esposizione
    Esposizione: {
      input: {
        label: "Stima del livello di Esposizione",
      },
      LivelloTrafficoMedioGiornaliero: {
        input: {
          label: "Livello di traffico medio giornaliero",
          type: "Select",
          items: [
            { text: "≥ 25000 veicoli/giorno", value: "Alta" },
            { text: "10000 < veicoli/giorno < 25000", value: "Media" },
            { text: "≤ 10000 veicoli/giorno", value: "Bassa" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      LuceMediaCampata: {
        input: {
          label: "Luce media della campata",
          type: "Select",
          items: [
            { text: "Grande luce", value: "Grande" },
            { text: "Media luce", value: "Media" },
            { text: "Piccola luce", value: "Piccola" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      AlternativeStradali: {
        input: {
          label: "Alternative stradali",
          type: "Select",
          items: ["Presenza", "Assenza"],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      TipologiaEnteScavalcato: {
        input: {
          label: "Tipologia dell'ente scavalcato",
          type: "Select",
          items: ["Alta", "Media", "Bassa"],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
  };

  // CARS
  const CARS = {
    // Home
    Home: {
      input: {
        label: "Home",
      },
      /*pericolosita: {
        input: {
          label: "Pericolosità",
          type: "Span",
        },
        validations: {},
      },
      vulnerabilita: {
        input: {
          label: "Vulnerabilità",
          type: "Span",
        },
        validations: {},
      },
      esposizione: {
        input: {
          label: "Esposizione",
          type: "Span",
        },
        validations: {},
      },
      classe: {
        input: {
          label: "Classe",
          type: "Span",
        },
        validations: {},
      },*/
    },
    // Pericolosita
    Pericolosita: {
      input: {
        label: "Stima del livello di Pericolosità",
      },
      ag: {
        input: {
          label: "Accelerazione di picco al suolo (ag)",
          type: "Select",
          items: [
            { text: "ag ≥ 0.25 g", value: "025g" },
            { text: "0.15 g < ag < 0.25 g", value: "015025g" },
            { text: "0.10 g < ag ≤ 0.15 g", value: "010015g" },
            { text: "0.05 g < ag ≤ 0.10 g", value: "005010g" },
            { text: "ag < 0.05 g", value: "005g" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      T1: {
        input: {
          label: "Categoria topografica (Ti)",
          type: "Select",
          items: ["T1", "T2", "T3", "T4"],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // Vulnerabilita
    Vulnerabilita: {
      input: {
        label: "Stima del livello di Vulnerabilità",
      },
      LivelloDifettositaAttuale: {
        input: {
          label: "Livello di difettosità attuale",
          type: "Select",
          items: [
            { text: "Alto", value: "Alto" },
            { text: "Medio-Alto", value: "MedioAlto" },
            { text: "Medio", value: "Medio" },
            { text: "Medio-Basso", value: "MedioBasso" },
            { text: "Basso", value: "Basso" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      CriteriProgettazione: {
        input: {
          label: "Criteri di progettazione",
          type: "Select",
          items: [
            { text: "Sismici", value: "Sismici" },
            { text: "Non sismici", value: "NonSismici" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      SchemaStatico: {
        input: {
          label: "Schema statico",
          type: "Select",
          items: [
            { text: "Schema isostatico", value: "Isostatico" },
            { text: "Schema iperstatico", value: "Iperstatico" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      Campate: {
        input: {
          label: "Campate",
          type: "Select",
          items: [
            { text: "Singola campata", value: "Singola" },
            { text: "Multi-campata", value: "Multi" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      Materiale: {
        input: {
          label: "Materiale",
          type: "Select",
          items: [
            { text: "C.a.", value: "CA" },
            {
              text: "C.a.p.",
              value: "CAP",
            },
            { text: "Muratura", value: "Muratura" },
            { text: "Acciaio", value: "Acciaio" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      Luce: {
        input: {
          label: "Luce della campata più lunga",
          type: "Select",
          items: [
            { text: "medio-piccola (≤ 20 m)", value: "MedioPiccola" },
            { text: "elevata (> 20 m)", value: "Elevata" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
    // Esposizione
    Esposizione: {
      input: {
        label: "Stima del livello di Esposizione",
      },
      CESF: {
        input: {
          label: "Classe di Esposizione Strutturale e Fondazionale",
          type: "Select",
          items: [
            { text: "Alta", value: "Alta" },
            { text: "Medio-Alta", value: "MedioAlta" },
            { text: "Media", value: "Media" },
            { text: "Medio-Bassa", value: "MedioBassa" },
            { text: "Bassa", value: "Bassa" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
      StrategicitaOpera: {
        input: {
          label: "Strategicità dell'Opera",
          type: "Select",
          items: [
            { text: "Strategica", value: "Strategica" },
            { text: "Non Strategica", value: "NonStrategica" },
          ],
        },
        validations: {
          required: {
            params: null,
          },
        },
      },
    },
  };

  // OSWeb
  const OSWeb = {
    // Home
    Home: {
      input: {
        label: "Home",
      },
    },
  };

  // return
  return {
    L0: L0,
    L1: L1,
    L1ispezione: L1ispezione,
    L1Speciale: L1Speciale,
    CASF: CASF,
    CARS: CARS,
    OSWeb: OSWeb,
  };
}
