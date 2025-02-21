console.log("Hey");

import { getInput } from "@actions/core";

const token = getInput("perfecto_token");
console.log(`Uploading via ${token}`);

const name = getInput("artifact_name");
console.log(`Uploading via ${name}`);

const type = getInput("artifact_type");
console.log(`Uploading via ${type}`);

const target = getInput("artifact_target");
console.log(`Uploading via ${target}`);