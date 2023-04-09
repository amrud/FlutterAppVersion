import * as core from "@actions/core";

const directory = core.getInput("directory");
const token = core.getInput("token");

const filename = "pubspec.yaml";
const path = `${directory}/${filename}`;

try {
  //read from file pubspec.yaml and get the name of the project
  //define fs
  const fs = require("fs");
  //check if pubspec.yaml exists
  if (!fs.existsSync(path)) {
    console.log(">> pubspec.yaml does not exist");
  } else {
    console.log(">> pubspec.yaml exist");
    const pubspec = fs.readFileSync(path, "utf8");
    const pubspecLines = pubspec.split("\n");
    const projectName = pubspecLines[0].split(":")[1].trim();

    //get the app version
    const appDescription = pubspecLines[1].split(":")[1].trim();

    //console log the project name
    console.log("App name: " + projectName);
    console.log("App Description:" + appDescription);

    //get the version
    //filter pubspeclines by starts with version
    let versionLine = pubspecLines.find((line: string) =>
      line.startsWith("version")
    );

    if (versionLine) {
      console.log(versionLine);
      versionLine = versionLine.replace("version:", "").trim();
      //get build number
      //get versionname
      const versionName = versionLine.split("+")[0];
      const buildNumber = versionLine.split("+")[1];

      console.log("Version name: " + versionName);
      console.log("Build number: " + buildNumber);

      //output to github action
      core.setOutput("project_name", projectName);
      core.setOutput("app_description", appDescription);
      core.setOutput("version_name", versionName);
      core.setOutput("build_number", buildNumber);
    } else {
      console.log(">> version not found");
    }
  }
} catch (error) {
  console.log(error);
}
