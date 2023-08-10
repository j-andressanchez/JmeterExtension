const { spawn } = require('cross-spawn');
const fs = require('fs');

module.exports = function runJmeterTest(jmxPath, outputPath){
    return new Promise((resolve, reject) => {

        // Crear el directorio de salida si no existe
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }

        // Archivos de salida
        const jtlReport = `${outputPath}/report.jtl`;
        const htmlReport = `${outputPath}/reportHtml`;

        console.log(" --- Ejecución de Test en JMeter Iniciado --- ");

        // -n => Modo no gráfico -t => Indicar ruta del archivo
        // -l => especifica la ruta para reporte default
        // -e => Genera reporte html -o => indica en qué ruta se debe guardar
        const command = spawn('jmeter', ['-n', '-t', jmxPath, '-l', jtlReport, '-e', '-o', htmlReport],{
            stdio: ['ignore', 'inherit', 'inherit'] // in, out, err
        });
        
        command.on('error', (error) => {
            console.error('Error en el proceso:', error);
            reject(error);
        });

        command.on('exit', (code) => {
            if (code === 0) {
              console.log('Ejecución de Test finalizada correctamente.');
              resolve(code);
            } else {
              reject(new Error(`El proceso finalizó con código ${code}`));
            }
        });
    });
}