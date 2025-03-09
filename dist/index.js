"use strict";
// write a program to take inputs and curl to perfecto.com
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const core_1 = require("@actions/core");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function uploadToPerfecto() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const perfectoToken = (0, core_1.getInput)("perfecto_token");
            const artifactName = (0, core_1.getInput)("artifact_name");
            const artifactType = (0, core_1.getInput)("artifact_type");
            const artifactTarget = (0, core_1.getInput)("artifact_target");
            const filePath = (0, core_1.getInput)("file_path"); // Assuming the file path is provided as input
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
            const result = (0, child_process_1.execSync)(curlCommand).toString();
            console.log(`Upload result: ${result}`);
        }
        catch (error) {
            (0, core_1.setFailed)(`Action failed with error: ${error.message}`);
        }
    });
}
uploadToPerfecto();
