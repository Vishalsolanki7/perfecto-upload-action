// write a program to take inputs and curl to perfecto.com

import { execSync } from 'child_process';
import { getInput, setFailed } from '@actions/core';
import * as path from 'path';
import * as fs from 'fs';

async function uploadToPerfecto() {
    try {
        const perfectoToken = getInput("perfecto_token");
        const artifactName = getInput("artifact_name");
        const artifactType = getInput("artifact_type");
        const artifactTarget = getInput("artifact_target");
        const filePath = getInput("file_path"); // Assuming the file path is provided as input

        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const fileName = path.basename(filePath);

        const curlCommand = `
      curl -X POST "https://perfecto.com/api/repository/${artifactType}/${artifactTarget}/${artifactName}" \
      -H "Perfecto-Authorization: ${perfectoToken}" \
      -F "file=@${filePath}"
    `;

        console.log(`Executing: ${curlCommand}`);
        const result = execSync(curlCommand).toString();
        console.log(`Upload result: ${result}`);
    } catch (error) {
        setFailed(`Action failed with error: ${error.message}`);
    }
}

uploadToPerfecto();