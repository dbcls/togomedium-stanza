import dotenv from "rollup-plugin-dotenv";

export default function config(environment) {
  return {
    rollup: {
      plugins: [dotenv.default()],
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  };
}
