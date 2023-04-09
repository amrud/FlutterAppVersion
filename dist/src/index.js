"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
let directory = core.getInput("directory");
const token = core.getInput("token");
const filename = "pubspec.yaml";
if (!directory) {
    directory = "";
}
else {
    directory = directory + "/";
}
const path = `${directory}${filename}`;
try {
    //read from file pubspec.yaml and get the name of the project
    //define fs
    console.log(">> pubspec.yaml directory: " + path);
    const fs = require("fs");
    //check if pubspec.yaml exists
    if (!fs.existsSync(path)) {
        console.log(">> pubspec.yaml does not exist");
    }
    else {
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
        let versionLine = pubspecLines.find((line) => line.startsWith("version"));
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
        }
        else {
            console.log(">> version not found");
        }
    }
}
catch (error) {
    console.log(error);
}
