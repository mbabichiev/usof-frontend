function checkForSymbol(text, index) {

    if(index === 0) {
        return true;
    }

    if(text[index - 1] && text[index - 1].match(/[a-zA-Z0-9]/i)) {
        return true;
    }

    return false;
}


/*
* Enter Symbol is '\n'
*/
module.exports = function getPartOfText(text, limitSymbols, limitEnterSymbol) {

    if(!text) {
        return text;
    }

    var lastSpaceIndex = -1;
    var sumEnterSymbols = 0;

    for (var i = 0; i < limitSymbols && sumEnterSymbols <= limitEnterSymbol; i++) {

        if (checkForSymbol(text, i)) {
            lastSpaceIndex = i;
        }

        if (text[i] === '\n') {
            sumEnterSymbols++;
        }
    }

    if (text.length < limitSymbols && sumEnterSymbols < limitEnterSymbol) {
        return text;
    }

    if (lastSpaceIndex === -1) {
        return text.slice(0, limitSymbols) + "...";
    }

    return text.slice(0, lastSpaceIndex) + "...";

}
