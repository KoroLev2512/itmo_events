import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ["GolosText", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        emerald: {
          500: "#3AA981",
        },
        blue: {
          500: "#0B68FE",
        },
        red: {
          500: "#f93f37",
        },
      },
    },
  },
};
