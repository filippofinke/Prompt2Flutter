import { FunctionDeclaration, Type } from "@google/genai";
import { execSync } from "child_process";
import { err, ok } from "../utils/result";

/**
 * Runs flutter pub get command to fetch dependencies for a Flutter project
 * @param path Path to the Flutter project directory (defaults to current directory)
 * @returns Result of the pub get operation
 */
export async function flutterPubGet({ path }: { path?: string }) {
  try {
    const targetPath = path || process.cwd();

    const output = execSync("flutter pub get", {
      cwd: targetPath,
      encoding: "utf8",
    });

    return ok(output.toString());
  } catch (error) {
    if (error instanceof Error) {
      return err((error as any).output?.toString() || error.message);
    }

    throw error;
  }
}

/**
 * Function declaration schema for Google Gen AI library
 */
export const flutterPubGetFunctionDeclaration: FunctionDeclaration = {
  name: "flutterPubGet",
  description: "Gets dependencies for a Flutter project using flutter pub get",
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: {
        type: Type.STRING,
        description:
          "Path to the Flutter project directory (defaults to current directory)",
      },
    },
    required: [],
  },
};
