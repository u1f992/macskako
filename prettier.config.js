const prettierConfig = {
  overrides: [
    {
      files: ["*.jsonc"],
      options: {
        trailingComma: "none",
      },
    },
  ],
};

export default prettierConfig;
