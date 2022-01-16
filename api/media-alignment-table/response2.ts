import { MediaAlignmentTableResponse } from "./types";

export const mediaAlignmentTableResponse2: MediaAlignmentTableResponse = {
  media: [
    {
      gmid: "HM_D00001a",
      name: "REACTIVATION WITH LIQUID MEDIUM 1",
      components: [
        "GMO_001001",
        "GMO_001007",
        "GMO_001003",
        "GMO_000012",
        "GMO_001815",
        "A1",
        "A3",
        "A7",
        "A9",
      ],
      organisms: ["384676", "643561"],
    },
    {
      gmid: "HM_D00065",
      name: "GYM STREPTOMYCES MEDIUM",
      components: [
        "GMO_001001",
        "GMO_001830",
        "GMO_001063",
        "GMO_001007",
        "GMO_001059",
        "GMO_001815",
        "A6",
        "A8",
        "A9",
      ],
      organisms: ["316284", "446462"],
    },
  ],
  organisms: [
    {
      taxid: "384676",
      name: "Pseudomonas entomophila L48",
    },
    {
      taxid: "643561",
      name: "Acidovorax avenae subsp. avenae ATCC 19860",
    },
    {
      taxid: "316284",
      name: "Streptomyces noursei ATCC 11455",
    },
    {
      taxid: "446462",
      name: "Actinosynnema mirum DSM 43827",
    },
  ],
  components: [
    {
      gmoid: "GMO_001001",
      name: "Distilled water",
      parent: "GMO_001890",
      function: "Solvating media",
    },
    {
      gmoid: "GMO_001890",
      name: "Purified water",
      parent: null,
      function: "Solvating media",
    },
    {
      gmoid: "GMO_001007",
      name: "Agar",
      parent: null,
      function: "Solidifying component",
    },
    {
      gmoid: "GMO_000011",
      name: "Extract",
      parent: null,
      function: null,
    },
    {
      gmoid: "GMO_001074",
      name: "Meat extract",
      parent: "GMO_000011",
      function: null,
    },
    {
      gmoid: "GMO_001830",
      name: "Liver extract",
      parent: "GMO_001074",
      function: null,
    },
    {
      gmoid: "GMO_000012",
      name: "Peptone",
      parent: null,
      function: null,
    },
    {
      gmoid: "GMO_001003",
      name: "Yeast extract",
      parent: "GMO_000011",
      function: "Nutrient source",
    },
    {
      gmoid: "GMO_001063",
      name: "Calcium carbonate",
      parent: null,
      function: "Protective agent",
    },
    {
      gmoid: "GMO_001059",
      name: "Malt extract",
      parent: "GMO_000011",
      function: null,
    },
    {
      gmoid: "A1",
      name: "A1",
      parent: null,
      function: null,
    },
    {
      gmoid: "A2",
      name: "A2",
      parent: null,
      function: null,
    },
    {
      gmoid: "A3",
      name: "A3",
      parent: null,
      function: null,
    },
    {
      gmoid: "A4",
      name: "A4",
      parent: null,
      function: null,
    },
    {
      gmoid: "A5",
      name: "A5",
      parent: null,
      function: null,
    },
    {
      gmoid: "A6",
      name: "A6",
      parent: null,
      function: null,
    },
    {
      gmoid: "A7",
      name: "A7",
      parent: null,
      function: null,
    },
    {
      gmoid: "A8",
      name: "A8",
      parent: null,
      function: null,
    },
    {
      gmoid: "A9",
      name: "A9",
      parent: null,
      function: null,
    },
    {
      gmoid: "B1",
      name: "B1",
      parent: null,
      function: null,
    },
    {
      gmoid: "B2",
      name: "B2",
      parent: null,
      function: null,
    },
    {
      gmoid: "B3",
      name: "B3",
      parent: null,
      function: null,
    },
    {
      gmoid: "B4",
      name: "B4",
      parent: null,
      function: null,
    },
    {
      gmoid: "B5",
      name: "B5",
      parent: null,
      function: null,
    },
    {
      gmoid: "B6",
      name: "B6",
      parent: null,
      function: null,
    },
    {
      gmoid: "B7",
      name: "B7",
      parent: null,
      function: null,
    },
    {
      gmoid: "B8",
      name: "B8",
      parent: null,
      function: null,
    },
    {
      gmoid: "B9",
      name: "B9",
      parent: null,
      function: null,
    },
  ],
};