"use strict";

module.exports = function (config) {
  config.set({
    basePath: "build/specs",
    proxies: {
      "/data/": "/base/data",
      "/images/": "/base/images",
      "/test/": "/base/test",
      "/build/TerriaJS/build/Cesium/build": "/base/Cesium",
      "/build/Cesium": "/base/TerriaJS/build/Cesium",
      "/build": "/base"
    },

    autoWatch: true,
    autoWatchBatchDelay: 500, // Delay between tests, hopefully enough time for the bundler to finish writing everything

    reporters: ["spec"],

    specReporter: {
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: false
    },

    files: [
      { pattern: "stdin.js", watched: true, nocache: true },
      {
        pattern: "**/*",
        included: false,
        served: true,
        watched: false,
        nocache: true
      }
    ],
    singleRun: true,
    failOnEmptyTestSuite: false,
    frameworks: ["jasmine"],
    browsers: ["ChromeHeadless"],
    detectBrowsers: {
      enabled: true,
      usePhantomJS: false,
      postDetection(availableBrowsers) {
        return availableBrowsers.filter((b) => /chrom/i.test(b));
      }
    },
    plugins: [
      require("karma-spec-reporter"),
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-detect-browsers")
    ]
  });
};
