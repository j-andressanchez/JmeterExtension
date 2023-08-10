const fs = require("fs");

module.exports = function modifiedJmeterBat(){
    const jmeterPath = process.env.JMETERINSTALLER_JMETERPATH;
    
    fs.readFile(jmeterPath, 'utf8', (err, data) => {
        if(err){
            console.log('Error al leer el archivo .bat: ', err);
            return;
        }

        const modified = data.replace(/set HEAP=.+/, 'set HEAP=-Xms1g -Xmx5g -XX:MaxMetaspaceSize=1g');
        fs.writeFile(jmeterPath, modified, 'utf8', (err) => {
            if(err){
                console.log('Error al sobreescribir el archivo .bat: ', err);
                return;
            }
            console.log('Archivo .bat modificado con éxito');
        })
    });
}