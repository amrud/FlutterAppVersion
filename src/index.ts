import * as core from "@actions/core";
import { PubSpecHelper } from "./pubspec.helper";

try {
  let pubspecHelper = new PubSpecHelper();
  const versionModel = pubspecHelper.readPubSpec();

  //console log the project name
  console.log("app_name: " + versionModel.appName);
  console.log("app_description:" + versionModel.appDescription);
  console.log("current_version_name: " + versionModel.version);
  console.log("current_build_number: " + versionModel.build);
  //output to github action
  core.setOutput("app_description", versionModel.appDescription);
  core.setOutput("app_name", versionModel.appName);
  core.setOutput("current_version_name", versionModel.version);
  core.setOutput("current_build_number", versionModel.build);

  core.summary
    .addHeading("Action completed successfully")
    .addRaw("app_name: " + versionModel.appName)
    .addRaw("app_description: " + versionModel.appDescription)
    .addRaw("current_version_name: " + versionModel.version)
    .addRaw("current_build_number: " + versionModel.build)
    .addEOL()
    .write();
} catch (error: any) {
  core.setFailed("Action failed with error");
  core.summary
    .addHeading("Action failed with error")
    .addRaw("Error message: " + error.message)
    .addEOL()
    .write();
}
