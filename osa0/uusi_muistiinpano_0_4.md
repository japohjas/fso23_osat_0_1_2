https://www.websequencediagrams.com/

0.4: uusi muistiinpano

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser: text/html; charset=utf-8

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: text/css; charset=UTF-8

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser: application/javascript; charset=UTF-8

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: application/json; charset=utf-8


    selain->palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    palvelin-->selain: text/html; charset=utf-8

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser: text/html; charset=utf-8

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: text/css; charset=UTF-8

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser: application/javascript; charset=UTF-8

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: application/json; charset=utf-8
