import { FunctionDeclaration, Type } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import { err, ok } from "../utils/result";

interface DirectoryItem {
  name: string;
  path: string;
  isDirectory: boolean;
}

/**
 * Lists all files and directories in the specified path
 * @param directoryPath The path to list files from (defaults to current directory)
 * @returns List of files and directories with their details
 */
export async function listDirectory({
  directoryPath,
}: {
  directoryPath?: string;
}) {
  // Use current directory if no path is provided
  const dirPath = directoryPath || process.cwd();

  // Check if the directory exists
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Directory does not exist: ${dirPath}`);
  }

  // Check if the path is actually a directory
  if (!fs.statSync(dirPath).isDirectory()) {
    throw new Error(`Path is not a directory: ${dirPath}`);
  }

  // Read the directory contents
  const files = fs.readdirSync(dirPath);

  // Get details for each file/directory
  const items: DirectoryItem[] = files.map((file) => {
    const filePath = path.join(dirPath, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    return {
      name: file,
      path: filePath,
      isDirectory,
    };
  });

  return ok(items);
}

/**
 * Function declaration schema for Google Gen AI library
 */
export const listDirectoryFunctionDeclaration: FunctionDeclaration = {
  name: "listDirectory",
  description: "Lists all files and directories in the specified path",
  parameters: {
    type: Type.OBJECT,
    properties: {
      directoryPath: {
        type: Type.STRING,
        description:
          "The path to list files from (defaults to current directory)",
      },
    },
    required: [], // directoryPath is optional
  },
};
