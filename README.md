# JMeter Process Extension

![Extension Icon](images/icon.png)

Azure DevOps extension for executing JMeter scripts.

## Features

- Run JMeter scripts in Azure DevOps pipelines.
- Process performance tests for your Azure projects.

## Prerequisites

Before using this extension, ensure you have the following:

- A JMeter script file (`*.jmx`) that you want to process for performance testing.
- Azure DevOps project and pipeline set up.
- Pre-install the version of JMeter you wish to use for the test.

## Usage

1. Add this extension to your Azure DevOps organization.
2. In your Azure DevOps pipeline, add the "JMeter Process" task to the pipeline.
3. Configure the task with the following inputs:
   - **JMeter Script**: Path to the JMeter script file.
4. Save and run the pipeline to execute the JMeter script.
5. The task will process the script using a Microsoft Azure agent with JMeter.
6. Test results will be saved as XML and HTML files.
7. You can publish the results as an artifact in Azure DevOps or export them as needed.

## License

This extension is released under the [MIT License](LICENSE).

---