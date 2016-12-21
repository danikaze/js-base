module.exports = {
  "extends": "airbnb",
  "installedESLint": true,
  "plugins": [
    "react"
  ],
  "rules": {
    "key-spacing": ["warn", {
      "align": {
        "beforeColon": false,
        "afterColon" : true,
        "on"         : "colon"
      }
    }],
    "keyword-spacing": ["warn", {
      "after": true,
      "overrides": {
        "if"   : { "after": false },
        "for"  : { "after": false },
        "while": { "after": false },
        "catch": { "after": false },
      }
    }],
    "no-use-before-define": ["error", {
      "functions": false,
      "classes": false,
    }],
    "no-unused-vars": ["error", {
      "args": "none",
    }],
    "no-shadow": 0,
    "no-param-reassign": 0,
    "max-len": ["error", {
      "code": 100,
      "comments": 150,
      "ignoreUrls": true,
    }]
  }
};
