const taskLib = require('azure-pipelines-task-lib/task');
const fs = require('fs');

const runJMeterTest = require('./modules/runTest.js');
const modifiedJmeterBat = require('./modules/modifiedJmeter.js');
const changePath = require('./modules/changeDataPathXML.js');

async function main() {
  // Obtener los valores de los inputs
  let testScriptPath = taskLib.getInput('testScript', true);
  const dataTestPath = taskLib.getInput('dynamicDataFile', false);
  const outputPath = '$(Build.ArtifactStagingDirectory)/jmeter-results';

  try { 
    // Lee el archivo JMX y conviértelo a JSON
    const xmlTestScript = fs.readFileSync(testScriptPath, 'utf-8');

    //Modificamos el Bat con la memoria a usar en la prueba
    modifiedJmeterBat();

    //En caso que se entregue un dataSet, se cambian las rutas
    if(dataTestPath){
      const modifiedXmlData = changePath(xmlTestScript, dataTestPath);
      fs.writeFileSync(testScriptPath, modifiedXmlData, 'utf-8');
    }

    //Corre el Script Test en JMeter
    try {
      await runJMeterTest(testScriptPath, outputPath);
    } catch (error) {
      console.error('Error al ejecutar JMeter:', error);
      taskLib.setResult(taskLib.TaskResult.Failed, error.message);
    }

    // Fin de la tarea exitosa
    taskLib.setResult(taskLib.TaskResult.Succeeded, 'Procesamiento completado correctamente.');
  } catch (error) {
    console.error('Error en el procesamiento de la tarea:', error);
    taskLib.setResult(taskLib.TaskResult.Failed, error.message);
  }
}

main();