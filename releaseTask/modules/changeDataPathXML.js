module.exports = function changePath(xmlTestScript, newPath) {
    const blockRegex = /<CSVDataSet[^>]*>[\s\S]*?<\/CSVDataSet>/g;

    if (xmlTestScript.match(blockRegex)) {
        const modifiedXmlData = xmlTestScript.replace(blockRegex, match => {
            const regex = /<stringProp name="filename">(.*?)<\/stringProp>/g;
            return match.replace(regex, `<stringProp name="filename">${newPath}</stringProp>`);
        });
        console.log('Bloques <CSVDataSet> modificados correctamente');
        return modifiedXmlData;
    } else {
        console.log('No se encontró ningún bloque <CSVDataSet>');
        return xmlTestScript;
    }
};

