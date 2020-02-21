## Parser dla polskiego numeru PESEL

### Instalacja
```bash
npm i parse-pesel
```

### Przykład uzycia
```javascript
var parsePesel = require('parse-pesel');
var result = parsePesel('02252356524');
console.log(result);

// Rezultat:
// {
//     rok: 2020,
//     miesiac: 1, // 1-12
//     dzien: 22, // 1-31
//     plec: 'm', // lub 'k'
//     data: 2020-01-22T12:00:00.000Z // natywny obiekt Date
// }
```

Jezeli PESEL jest niepoprawny to program rzuci wyjatek.

### Credits
W duzym stopniu zapozyczone od [Dev.CDur.pl](http://dev.cdur.pl/Artykuly/Pobieranie-daty-urodzenia-i-plci-z-numeru-PESEL-Javascript)
