https://www.websequencediagrams.com/

0.5: Single Page App

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>browser: text/html; charset=utf-8

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: text/css; charset=UTF-8

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>browser: application/javascript; charset=UTF-8

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: application/json; charset=utf-8

