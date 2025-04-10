import { FunctionDeclaration, Type } from "@google/genai";
import { exec } from "child_process";
import { promisify } from "util";
import { ok } from "../utils/result";

const execPromise = promisify(exec);

/**
 * Creates a new Flutter project using the flutter create command
 * @param name The name of the Flutter project to create
 * @param path Optional path where to create the project (defaults to current directory)
 * @returns Information about the created project
 */
export async function createFlutterProject({
  name,
  path,
}: {
  name: string;
  path?: string;
}) {
  // Validate project name (Flutter requires lowercase with underscores)
  if (!/^[a-z][a-z0-9_]*$/.test(name)) {
    throw new Error(
      "Invalid project name. The name must be lowercase and can only contain letters, numbers, and underscores."
    );
  }

  // Determine where to create the project
  const targetPath = path || process.cwd();

  // Execute flutter create command
  const { stderr } = await execPromise(`flutter create ${name}`, {
    cwd: targetPath,
  });

  if (stderr && stderr.toLowerCase().includes("error")) {
    throw new Error(`Error creating Flutter project: ${stderr}`);
  }

  return ok();
}

/**
 * Function declaration schema for Google Gen AI library
 */
export const createFlutterProjectFunctionDeclaration: FunctionDeclaration = {
  name: "createFlutterProject",
  description: "Creates a new Flutter project using the flutter create command",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description:
          "The name of the Flutter project to create (should be lowercase with underscores)",
      },
      path: {
        type: Type.STRING,
        description:
          "Optional path where to create the project (defaults to current directory)",
      },
    },
    required: ["name"],
  },
};
