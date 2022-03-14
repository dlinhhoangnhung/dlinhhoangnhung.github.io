module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderColor: ["focus"],
      backgroundColor: ["hover", "focus", "active"],
      backgroundImage: {
        "landing-pastel": "url('/src/assets/img/landing.png')",
        "next-2": "url('/src/assets/img/next-2.png')",
        "next-3": "url('/src/assets/img/next-three.png')",
        // 'brand': "url('/src/assets/img/brand.png')",
        // (./assets/img/white.jpg)
      },
      directs: {
        inrow: "flex flex-row",
      },
      colors: {
        catalog: "#f2f2f2",
        simple: "#eff0f6",
        like: "#eff3fa",
        dif: "#eaeef4",
        shado: "#c4d6f7",
        see: "#114ff0",
        icon: "#80a9e9",
        table: "#f9fcff",
        btncreate: "#f1f1f5",
        search: "#e7b7ab",
        firststroke: "#e84920",
        secondstroke: "#b71010",
        thirdstroke: "##f6bbb6",
        shopnow: "#f09276",
        searchlast: "#e9c1cd",
      },
      boxShadow: {
        hotblue: "0 15px 30px 0px rgb(17, 79, 240)",
        coldblue: "0 20px 40px 0px rgb(194, 210, 247)",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      display: ["group-hover"],
    },
  },
  plugins: [],
};
