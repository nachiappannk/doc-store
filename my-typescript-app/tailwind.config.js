/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      primary: {
        100: "#ebfdff",
        150: "#c8f9ff",
        200: "#a6f5ff",
        250: "#83f1ff",
        300: "#61edff",
        350: "#3ee9ff",
        400: "#1ce5ff",
        450: "#00dcf9",
        500: "#00bdd6",
        550: "#00a9c0",
        600: "#0095a9",
        650: "#008192",
        700: "#006d7c",
        750: "#005965",
        800: "#00454f",
        850: "#003138",
        900: "#001d21",
        DEFAULT: "#00bdd6",
      },
      secondary: {
        100: "#f5f2fd",
        150: "#e7def9",
        200: "#d9cbf6",
        250: "#cbb7f3",
        300: "#bda3ef",
        350: "#af90ec",
        400: "#a07ce9",
        450: "#9269e5",
        500: "#8353e2",
        550: "#723cde",
        600: "#6025d8",
        650: "#5520bf",
        700: "#4a1ca6",
        750: "#3f188d",
        800: "#341473",
        850: "#280f5a",
        900: "#1d0b41",
        DEFAULT: "#8353e2",
      },
      info: {
        100: "#f0f8fe",
        150: "#d4ebfd",
        200: "#b8defc",
        250: "#9cd2fa",
        300: "#80c5f9",
        350: "#64b8f8",
        400: "#48abf6",
        450: "#2c9ef5",
        500: "#1091f4",
        550: "#0b83df",
        600: "#0974c6",
        650: "#0865ad",
        700: "#075794",
        750: "#06487a",
        800: "#053961",
        850: "#032a48",
        900: "#021b2f",
        DEFAULT: "#1091f4",
      },
      warning: {
        100: "#fef8f1",
        150: "#fcecd9",
        200: "#fae0c2",
        250: "#f8d4aa",
        300: "#f6c892",
        350: "#f4bc7b",
        400: "#f2b063",
        450: "#f0a44c",
        500: "#ef9834",
        550: "#ec8917",
        600: "#d37911",
        650: "#b7680f",
        700: "#9a580c",
        750: "#7d470a",
        800: "#603708",
        850: "#432605",
        900: "#271603",
        DEFAULT: "#ef9834",
      },
      danger: {
        100: "#fef0f1",
        150: "#fdd7d8",
        200: "#fbbdbf",
        250: "#faa3a6",
        300: "#f8898d",
        350: "#f76f73",
        400: "#f5555a",
        450: "#f43b41",
        500: "#f22128",
        550: "#eb0e15",
        600: "#d20c13",
        650: "#b90b11",
        700: "#9f090e",
        750: "#86080c",
        800: "#6d060a",
        850: "#540508",
        900: "#3b0305",
        DEFAULT: "#f22128",
      },
      success: {
        100: "#eefdf3",
        150: "#d3f9e0",
        200: "#b8f5cd",
        250: "#9df2b9",
        300: "#82eea6",
        350: "#67ea93",
        400: "#4ce77f",
        450: "#31e36c",
        500: "#1dd75b",
        550: "#1ac052",
        600: "#17a948",
        650: "#14923e",
        700: "#117b34",
        750: "#0e642a",
        800: "#0a4d20",
        850: "#073517",
        900: "#041e0d",
        DEFAULT: "#1dd75b",
      },
      "color-3": {
        100: "#f1f4fd",
        150: "#dbe3fa",
        200: "#c5d1f7",
        250: "#aec0f4",
        300: "#98aef1",
        350: "#819cee",
        400: "#6b8beb",
        450: "#5479e8",
        500: "#4069e5",
        550: "#2655e1",
        600: "#1c49d0",
        650: "#1941b8",
        700: "#1638a0",
        750: "#133088",
        800: "#0f2770",
        850: "#0c1f58",
        900: "#091640",
        DEFAULT: "#4069e5",
      },
      "color-4": {
        100: "#fef6f1",
        150: "#fce7d8",
        200: "#f9d8c0",
        250: "#f7c8a7",
        300: "#f5b98e",
        350: "#f3aa76",
        400: "#f19b5d",
        450: "#ef8b44",
        500: "#ed7d2d",
        550: "#e76c14",
        600: "#cc5f12",
        650: "#b1530f",
        700: "#96460d",
        750: "#7b390b",
        800: "#602d08",
        850: "#452006",
        900: "#2a1304",
        DEFAULT: "#ed7d2d",
      },
      "color-5": {
        100: "#fdf2f2",
        150: "#f9dfdf",
        200: "#f5cbcb",
        250: "#f2b8b8",
        300: "#eea4a4",
        350: "#eb9191",
        400: "#e77e7e",
        450: "#e46a6a",
        500: "#e05858",
        550: "#db3d3d",
        600: "#d32727",
        650: "#b82222",
        700: "#9e1d1d",
        750: "#841818",
        800: "#6a1313",
        850: "#500f0f",
        900: "#350a0a",
        DEFAULT: "#e05858",
      },
    },
    extend: {
      fontSize: {
        t1: ["0.6875rem", "1.125rem"],
        t2: ["0.75rem", "1.25rem"],
        t3: ["0.875rem", "1.375rem"],
        t4: ["1rem", "1.625rem"],
        t5: ["1.125rem", "1.75rem"],
        t6: ["1.25rem", "1.875rem"],
        t7: ["1.5rem", "2.25rem"],
        t8: ["2rem", "3rem"],
        t9: ["2.5rem", "3.5rem"],
        t10: ["3rem", "4.25rem"],
      },
      spacing: {
        s0: "0.125rem",
        s1: "0.25rem",
        s2: "0.375rem",
        s3: "0.5rem",
        s4: "0.75rem",
        s5: "1rem",
        s6: "1.25rem",
        s7: "1.5rem",
        s8: "1.75rem",
        s9: "2rem",
        s10: "2.25rem",
        s11: "2.5rem",
        s12: "2.75rem",
        s13: "3rem",
        s14: "3.5rem",
        s15: "4rem",
        s16: "6rem",
        s17: "8rem",
        s18: "12rem",
        s19: "16rem",
        s20: "24rem",
      },
      fontFamily: {
        heading: "Epilogue",
        body: "Inter",
      },
      width: {
        Sz_NONE: "0rem",
        Sz0: "0.125rem",
        Sz1: "0.25rem",
        Sz2: "0.375rem",
        Sz3: "0.5rem",
        Sz4: "0.75rem",
        Sz5: "1rem",
        Sz6: "1.25rem",
        Sz7: "1.5rem",
        Sz8: "1.75rem",
        Sz9: "2rem",
        Sz10: "2.25rem",
        Sz11: "2.5rem",
        Sz12: "2.75rem",
        Sz13: "3rem",
        Sz14: "3.25rem",
        Sz15: "3.5rem",
        Sz16: "3.75rem",
        Sz17: "4rem",
        Sz18: "6rem",
        Sz19: "8rem",
        Sz20: "12rem",
        Sz21: "16rem",
        Sz22: "24rem",
        Sz23: "32rem",
        Sz24: "40rem",
        Sz25: "48rem",
        Sz26: "56rem",
        Sz27: "64rem",
      },
      height: {
        Sz_NONE: "0rem",
        Sz0: "0.125rem",
        Sz1: "0.25rem",
        Sz2: "0.375rem",
        Sz3: "0.5rem",
        Sz4: "0.75rem",
        Sz5: "1rem",
        Sz6: "1.25rem",
        Sz7: "1.5rem",
        Sz8: "1.75rem",
        Sz9: "2rem",
        Sz10: "2.25rem",
        Sz11: "2.5rem",
        Sz12: "2.75rem",
        Sz13: "3rem",
        Sz14: "3.25rem",
        Sz15: "3.5rem",
        Sz16: "3.75rem",
        Sz17: "4rem",
        Sz18: "6rem",
        Sz19: "8rem",
        Sz20: "12rem",
        Sz21: "16rem",
        Sz22: "24rem",
        Sz23: "32rem",
        Sz24: "40rem",
        Sz25: "48rem",
        Sz26: "56rem",
        Sz27: "64rem",
      },
      borderRadius: {
        xs: "0.125rem",
        s: "0.1875rem",
        m: "0.25rem",
        l: "0.375rem",
        xl: "0.5rem",
        "100-percent": "100%",
      },
      boxShadow: {
        xs: "0px 0px 1px rgba(23, 26, 31, 0.07), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        s: "0px 2px 5px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        m: "0px 4px 9px rgba(23, 26, 31, 0.11), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        l: "0px 8px 17px rgba(23, 26, 31, 0.15), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        xl: "0px 17px 35px rgba(23, 26, 31, 0.24), 0px 0px 2px rgba(23, 26, 31, 0.12)",
      },
    },
  },
};

