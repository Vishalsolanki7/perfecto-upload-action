"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hey");
const core_1 = require("@actions/core");
const token = (0, core_1.getInput)("perfecto_token");
console.log(`Uploading via ${token}`);
const name = (0, core_1.getInput)("artifact_name");
console.log(`Uploading via ${name}`);
const type = (0, core_1.getInput)("artifact_type");
console.log(`Uploading via ${type}`);
const target = (0, core_1.getInput)("artifact_target");
console.log(`Uploading via ${target}`);
