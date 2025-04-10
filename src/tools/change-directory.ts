import { FunctionDeclaration, Type } from "@google/genai";
import { ok, Result } from "../utils/result";

/**
 * Changes the current working directory to the specified path
 * @param path The path to change the current directory to
 * @returns The new current working directory path
 */
export async function changeDirectory({
  path,
}: {
  path: string;
}): Promise<Result<string, string>> {
  process.chdir(path);
  return ok();
}

/**
 * Function declaration schema for Google Gen AI library
 */
export const changeDirectoryFunctionDeclaration: FunctionDeclaration = {
  name: "changeDirectory",
  description: "Changes the current working directory to the specified path",
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: {
        type: Type.STRING,
        description: "The path to change the current directory to",
      },
    },
    required: ["path"],
  },
};
