import { FunctionDeclaration, Type } from "@google/genai";
import { execSync } from "child_process";
import { ok, err, Result } from "../utils/result";

/**
 * Analyzes a Flutter project to check for errors, warnings, and other issues
 * @param path Path to the Flutter project directory (defaults to current directory)
 * @returns Raw output from the flutter analyze command
 */
export async function flutterAnalyze({
  path,
}: {
  path?: string;
}): Promise<Result<string, string>> {
  try {
    // Use provided path or default to current directory
    const targetPath = path || process.cwd();

    // Execute flutter analyze command
    const output = execSync("flutter analyze", {
      cwd: targetPath,
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
export const flutterAnalyzeFunctionDeclaration: FunctionDeclaration = {
  name: "flutterAnalyze",
  description:
    "Analyzes a Flutter project to check for errors, warnings, and other issues",
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
