import { FunctionDeclaration, Type } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import { ok } from "../utils/result";

/**
 * Writes content to a file, creating it if it doesn't exist or overriding it if it does
 * @param filePath The path to the file to write to
 * @param content The content to write to the file
 * @returns Information about the write operation
 */
export async function writeFileContent({
  filePath,
  content,
}: {
  filePath: string;
  content: string;
}) {
  // Ensure the directory exists
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Write the file
  fs.writeFileSync(filePath, content, "utf8");

  return ok();
}

/**
 * Function declaration schema for Google Gen AI library
 */
export const writeFileContentFunctionDeclaration: FunctionDeclaration = {
  name: "writeFileContent",
  description:
    "Writes content to a file, creating it if it doesn't exist or overriding it if it does",
  parameters: {
    type: Type.OBJECT,
    properties: {
      filePath: {
        type: Type.STRING,
        description: "The path to the file to write to",
      },
      content: {
        type: Type.STRING,
        description: "The content to write to the file",
      },
    },
    required: ["filePath", "content"],
  },
};
