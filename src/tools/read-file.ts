import { readFile } from "fs/promises";
import { FunctionDeclaration, Type } from "@google/genai";
import { ok, Result } from "../utils/result";

/**
 * Reads the content of a file at the given path
 * @param path Path to the file
 * @returns The content of the file as string
 */
export async function readFileContent({
  path,
}: {
  path: string;
}): Promise<Result<string, string>> {
  const content = await readFile(path, "utf-8");
  return ok(content);
}

/**
 * Function declaration schema for Google Gen AI library
 */
export const readFileFunctionDeclaration: FunctionDeclaration = {
  name: "readFileContent",
  description: "Reads the content of a file at the specified path",
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: {
        type: Type.STRING,
        description: "The path to the file to read",
      },
    },
    required: ["path"],
  },
};
