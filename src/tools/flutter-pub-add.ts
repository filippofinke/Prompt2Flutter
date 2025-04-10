import { FunctionDeclaration, Type } from "@google/genai";
import { execSync } from "child_process";
import { err, ok } from "../utils/result";

/**
 * Adds packages to a Flutter project using the flutter pub add command
 * @param packages Array of package names to add
 * @param path Path to the Flutter project directory (defaults to current directory)
 * @param dev Whether to add the package as a dev dependency
 * @returns Result of the pub add operation
 */
export async function flutterPubAdd({
  packages,
  path,
  dev,
}: {
  packages: string[];
  path?: string;
  dev?: boolean;
}) {
  try {
    if (!packages || packages.length === 0) {
      return err(
        "No packages specified. Please provide at least one package name."
      );
    }

    const targetPath = path || process.cwd();
    const devFlag = dev ? "--dev" : "";
    const packageList = packages.join(" ");
    const command = `flutter pub add ${devFlag} ${packageList}`.trim();

    const output = execSync(command, {
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
export const flutterPubAddFunctionDeclaration: FunctionDeclaration = {
  name: "flutterPubAdd",
  description: "Adds packages to a Flutter project using flutter pub add",
  parameters: {
    type: Type.OBJECT,
    properties: {
      packages: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "Array of package names to add to the project",
      },
      path: {
        type: Type.STRING,
        description:
          "Path to the Flutter project directory (defaults to current directory)",
      },
      dev: {
        type: Type.BOOLEAN,
        description: "Whether to add the package as a dev dependency",
      },
    },
    required: ["packages"],
  },
};
