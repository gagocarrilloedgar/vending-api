define({ "api": [
  {
    "type": "post",
    "url": "v1/auth/login",
    "title": "Login",
    "name": "login",
    "group": "Auth",
    "permission": [
      {
        "name": "public"
      }
    ],
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
    "permission": [
      {
        "name": "public"
      }
    ],
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
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "BadRequest",
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
    "url": "v1/user",
    "title": "add user",
    "name": "add_user",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Create a user using ADMIN role</p>",
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
        "content": "{\n\"email\": \"somemail@mail.com\"\n\"password\": \"123456\",\n\"username\": \"jhon\"\n\"role\": \"admin\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Success message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "{\n\"success\": \"User successfully created\"\n}",
          "type": "json"
        }
      ]
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
    "filename": "src/routes/user.route.ts",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "v1/user/:id",
    "title": "delete user by id",
    "name": "delete_user_by_id",
    "group": "User",
    "permission": [
      {
        "name": "admin, buyer, seller"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Delete user by id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Success",
            "description": "<p>message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "{\n \"message\": \"User deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid Id</p>"
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
          "content": "{\n  \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.route.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "v1/user/:id",
    "title": "get user by id",
    "name": "get_user_by_id",
    "group": "User",
    "permission": [
      {
        "name": "admin, seller, buyer"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Get user by id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
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
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid Id</p>"
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
          "content": "{\n    \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.route.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "v1/user/:id",
    "title": "get user by id",
    "name": "get_user_by_id",
    "group": "User",
    "permission": [
      {
        "name": "admin, seller, buyer"
      }
    ],
    "version": "1.0.0",
    "description": "<p>Get user by id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "{\n\"success\": \"User updted successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid Id</p>"
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
    "filename": "src/routes/user.route.ts",
    "groupTitle": "User"
  }
] });
