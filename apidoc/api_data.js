define({ "api": [
  {
    "type": "get",
    "url": "/status",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "status",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "* HTTP/1.1 200 OK\n   [{\n     \"status\": \"ok\"\n   }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./game/routes/main.js",
    "group": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "groupTitle": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "name": "GetStatus"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jwt",
            "description": "<p>object</p>"
          },
          {
            "group": "Success 200",
            "type": "token",
            "optional": false,
            "field": "generated",
            "description": "<p>jwt token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n [{\n    message: 'signup successful' }\n }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./game/routes/main.js",
    "group": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "groupTitle": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "name": "PostLogin"
  },
  {
    "type": "post",
    "url": "/logout",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jwt",
            "description": "<p>object</p>"
          },
          {
            "group": "Success 200",
            "type": "refreshToken",
            "optional": false,
            "field": "token",
            "description": "<p>in the request</p>"
          },
          {
            "group": "Success 200",
            "type": "token",
            "optional": false,
            "field": "generated",
            "description": "<p>token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n  [{\n    \"message: 'logged out'\"\n  }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./game/routes/main.js",
    "group": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "groupTitle": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "name": "PostLogout"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "signup",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   [{\n     \"message: 'signup successful'\"\n   }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./game/routes/main.js",
    "group": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "groupTitle": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "name": "PostSignup"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "signup",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n [{\n    message: 'signup successful' }\n }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./game/routes/main.js",
    "group": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "groupTitle": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "name": "PostSignup"
  },
  {
    "type": "post",
    "url": "/token",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jwt",
            "description": "<p>object</p>"
          },
          {
            "group": "Success 200",
            "type": "body",
            "optional": false,
            "field": "the",
            "description": "<p>object contains user email and id</p>"
          },
          {
            "group": "Success 200",
            "type": "token",
            "optional": false,
            "field": "generated",
            "description": "<p>token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n  [{\n    \"message: 'Unauthorized'\"\n  }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./game/routes/main.js",
    "group": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "groupTitle": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/main.js",
    "name": "PostToken"
  },
  {
    "type": "post",
    "url": "/forgot-password",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jwt",
            "description": "<p>object</p>"
          },
          {
            "group": "Success 200",
            "type": "body",
            "optional": false,
            "field": "the",
            "description": "<p>object contains user email and id</p>"
          },
          {
            "group": "Success 200",
            "type": "token",
            "optional": false,
            "field": "generated",
            "description": "<p>token</p>"
          },
          {
            "group": "Success 200",
            "type": "email",
            "optional": false,
            "field": "user",
            "description": "<p>email</p>"
          },
          {
            "group": "Success 200",
            "type": "data",
            "optional": false,
            "field": "data",
            "description": "<p>to be sent to smtpTransport</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./game/routes/password.js",
    "group": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/password.js",
    "groupTitle": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/password.js",
    "name": "PostForgotPassword"
  },
  {
    "type": "post",
    "url": "/reset-password",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jwt",
            "description": "<p>object</p>"
          },
          {
            "group": "Success 200",
            "type": "refreshToken",
            "optional": false,
            "field": "token",
            "description": "<p>in the request</p>"
          },
          {
            "group": "Success 200",
            "type": "token",
            "optional": false,
            "field": "generated",
            "description": "<p>token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n  [{\n    \"message: 'password updated'\"\"\n  }]\n     or\nHTTP/1.1 400 Bad Request\n  [{\n    \"message: 'invalid token\"\n  }]\n    or\nHTTP/1.1 400 Bad Request\n  [{\n    \"message: 'passwords do not match\"\n  }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./game/routes/password.js",
    "group": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/password.js",
    "groupTitle": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/password.js",
    "name": "PostResetPassword"
  },
  {
    "type": "post",
    "url": "/submit-score",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jwt",
            "description": "<p>object</p>"
          },
          {
            "group": "Success 200",
            "type": "body",
            "optional": false,
            "field": "the",
            "description": "<p>object contains user email and id</p>"
          },
          {
            "group": "Success 200",
            "type": "token",
            "optional": false,
            "field": "generated",
            "description": "<p>token</p>"
          },
          {
            "group": "Success 200",
            "type": "email",
            "optional": false,
            "field": "user",
            "description": "<p>email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200 OK\n[{\n    status: \"Score submitted. User: 123 Score: 0\"\n  }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./game/routes/secure.js",
    "group": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/secure.js",
    "groupTitle": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/secure.js",
    "name": "PostSubmitScore"
  },
  {
    "type": "post",
    "url": "/submit-score",
    "title": "",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jwt",
            "description": "<p>object</p>"
          },
          {
            "group": "Success 200",
            "type": "body",
            "optional": false,
            "field": "the",
            "description": "<p>object contains user email and id</p>"
          },
          {
            "group": "Success 200",
            "type": "token",
            "optional": false,
            "field": "generated",
            "description": "<p>token</p>"
          },
          {
            "group": "Success 200",
            "type": "email",
            "optional": false,
            "field": "user",
            "description": "<p>email in Mongo database</p>"
          },
          {
            "group": "Success 200",
            "type": "highScore",
            "optional": false,
            "field": "highest",
            "description": "<p>score id in Mongo database</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./game/routes/secure.js",
    "group": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/secure.js",
    "groupTitle": "/Users/sc/Desktop/agile/DONSTEJUS/game/routes/secure.js",
    "name": "PostSubmitScore"
  },
  {
    "type": "get",
    "url": "/game.html",
    "title": "",
    "group": "game.html",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jwt",
            "description": "<p>object</p>"
          },
          {
            "group": "Success 200",
            "type": "cookie",
            "optional": false,
            "field": "json",
            "description": "<p>web token</p>"
          },
          {
            "group": "Success 200",
            "type": "decoded",
            "optional": false,
            "field": "decoded",
            "description": "<p>json web token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./game/app.js",
    "groupTitle": "game.html",
    "name": "GetGameHtml"
  },
  {
    "type": "get",
    "url": "/game.html",
    "title": "",
    "group": "game.html",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jwt",
            "description": "<p>object</p>"
          },
          {
            "group": "Success 200",
            "type": "decoded",
            "optional": false,
            "field": "decoded",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./game/app.js",
    "groupTitle": "game.html",
    "name": "GetGameHtml"
  },
  {
    "type": "get",
    "url": "/index.html",
    "title": "",
    "group": "index.html",
    "version": "0.0.0",
    "filename": "./game/app.js",
    "groupTitle": "index.html",
    "name": "GetIndexHtml"
  }
] });
