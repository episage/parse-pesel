module.exports = ParsePesel;

function isStringNumeric(str) {
    // Sprawdź, czy wszystkie znaki to cyfry
    return /^\d+$/.test(str);
}

function ParsePesel(peselInput) {
    if (typeof peselInput !== 'string') {
        throw new Error("peselInput musi byc stringiem")
    }

    var pesel = peselInput.trim();
    if (!isStringNumeric(pesel)) {
        throw new Error("pesel zawiera nie-cyfry");
    }

    // Rozbij na tablice cyfr
    var aInt = pesel.split('').map(d => parseInt(d));

    //Sprawdź sumę kontrolną
    var wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1];
    var sum = 0;
    for (var i = 0; i < 11; i++) {
        sum += wagi[i] * aInt[i];
    }
    if ((sum % 10) != 0) {
        throw new Error("suma kontrolna sie nie zgadza " + pesel)
    }

    //Policz rok z uwzględnieniem XIX, XXI, XXII i XXIII wieku
    var rok = 1900 + aInt[0] * 10 + aInt[1];
    if (aInt[2] >= 2 && aInt[2] < 8)
        rok += Math.floor(aInt[2] / 2) * 100;
    if (aInt[2] >= 8)
        rok -= 100;

    var miesiac = (aInt[2] % 2) * 10 + aInt[3];
    var dzien = aInt[4] * 10 + aInt[5];

    //Sprawdź poprawność daty urodzenia
    if (!checkDate(dzien, miesiac, rok)) {
        throw new Error("data urodzenia w PESEL jest niepoprawna " + pesel)
    }
    var plec = (aInt[9] % 2 == 1) ? "m" : "k";

    var data = new Date(rok, miesiac - 1, dzien, 12, 0, 0, 0);

    //Uzupełnij pola wchodzące w skład numeru PESEL
    return {
        rok,
        miesiac,
        dzien,
        plec,
        data,
    }

    function checkDate(d, m, y) {
        var dt = new Date(y, m - 1, d);
        return dt.getDate() == d &&
            dt.getMonth() == m - 1 &&
            dt.getFullYear() == y;
    }
}

