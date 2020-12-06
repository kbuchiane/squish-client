const browserConfig = require("../config/browser.config");
const { UAParser } = require('ua-parser-js');
const browser = new UAParser().getResult().browser;

export function getName() {
  return browser.name;
}

export function getVersion() {
  return browser.version;
}

export function isSupported() {
  var supported = isBrowserSupported();

  if (supported) {
    supported = isBrowserVersionSupported();
  }

  return supported;
}

export function isBrowserSupported() {
  var name = getName();
  var supportedBrowsers = browserConfig.SUPPORTED.split(",");

  for (var i = 0; i < supportedBrowsers.length; i++) {
    if (supportedBrowsers[i] == name) {
      return true;
    }
  }

  return false;
}

export function isBrowserVersionSupported() {
  // Checks that the browser meets the minimum version
  var supportedVersion = getSupportedVersion();

  if (supportedVersion > 0) {
    var versionMajor = getVersionMajor();

    if (versionMajor >= supportedVersion) {
      return true;
    }
  }

  return false;
}

export function getSupportedVersion() {
  var name = getName();
  var supportedBrowsers = browserConfig.SUPPORTED.split(",");
  var browserVersions = browserConfig.VERSIONS.split(",");

  for (var i = 0; i < supportedBrowsers.length; i++) {
    if (supportedBrowsers[i] == name) {
      return browserVersions[i];
    }
  }

  return 0;
};

export function getVersionMajor() {
  var version = getVersion();
  var fields = version.split(".");
  var major = fields[0];

  return major;
}