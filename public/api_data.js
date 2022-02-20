define({ "api": [
  {
    "type": "post",
    "url": "v1/auth/login",
    "title": "Login",
    "name": "login",
    "group": "Auth",
    "version": "1.0.0",
    "description": "<p>Login user and return JWT token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\"email\": \"\"\n\"password\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User's Auth data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid email or password</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/auth.route.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "v1/auth/register",
    "title": "Register",
    "name": "register",
    "group": "Auth",
    "version": "1.0.0",
    "description": "<p>Register user and return JWT token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's username</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request example:",
        "content": "{\n\"email\": \"test@gmail.com\"\n\"password\": \"123456\",\n\"username\": \"jhon\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User's Auth data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "{\n\"username\": \"\"\n\"email\": \"\"\n\"role\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/auth.route.ts",
    "groupTitle": "Auth"
  }
] });
