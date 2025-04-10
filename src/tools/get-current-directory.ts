import { FunctionDeclaration, Type } from "@google/genai";
import { Result, ok } from "../utils/result";

/**
 * Returns the absolute path of the current working directory
 */
export async function getCurrentDirectory(): Promise<Result<string, string>> {
  return ok(process.cwd());
}

/**
 * Function declaration for getCurrentDirectory to be used with Google GenAI
 */
export const getCurrentDirectoryFunctionDeclaration: FunctionDeclaration = {
  name: "getCurrentDirectory",
  description: "Gets the absolute path of the current working directory",
  parameters: {
    type: Type.OBJECT,
    properties: {},
    required: [],
  },
};
