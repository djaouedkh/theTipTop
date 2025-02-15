module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {}
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/frontend-app'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    singleRun: true, // ✅ Permet d'éviter que les tests ne tournent en boucle
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadlessNoSandbox'],
    restartOnFileChange: true,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: [
          "--headless",
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--no-sandbox",
          "--remote-debugging-port=9222"
        ]
      }
    },
  });
};
