module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  "plugins": [
    "other-plugin",
      ["component",
        [
          {
            "libraryName": "mint-ui",
            "style": true
          }
        ]
      ]
    ]
}
