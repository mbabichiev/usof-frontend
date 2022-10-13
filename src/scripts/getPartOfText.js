/*
* Enter Symbol is '\n'
*/ 
module.exports = function getPartOfText(text, limitSymbols, limitEnterSymbol) {

    if(text.length > limitSymbols) {

        var lastSpaceIndex = -1;
        var sumEnterSymbols = 0;

        for(var i = 0; i < limitSymbols && sumEnterSymbols <= limitEnterSymbol; i++) {

            if(text[i] === ' ' || text[i] === ',' || text[i] === '.' || text[i] === '!' || text[i] === ':' || text[i] === '?') {
                lastSpaceIndex = i;
            }

            if(text[i] === '\n') {
                sumEnterSymbols++;
            }
        }

        if(lastSpaceIndex === -1) {
            return text.slice(0, limitSymbols) + "...";
        }
        else {
            return text.slice(0, lastSpaceIndex) + "...";
        }

    }   
    else {
        return text
    }

}
