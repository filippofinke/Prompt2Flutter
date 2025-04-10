import { FunctionDeclaration, Type } from "@google/genai";
import { ChildProcess, spawn } from "child_process";
import { err, ok } from "../utils/result";
import { registerFlutterProcess } from "./flutter-refresh";

/**
 * Runs a Flutter application in the background using the flutter run command.
 * The process will be detached and its output will be ignored by default.
 * @param path Path to the Flutter project directory (defaults to current directory)
 * @param device Optional device ID or name to run the app on
 * @param debug Whether to run in debug mode (default: true)
 * @param release Whether to run in release mode (default: false)
 * @param profile Whether to run in profile mode (default: false)
 * @param flavor The flavor to use when running the app
 * @param target The main entry-point file of the application
 * @param logOutput Redirect stdout/stderr to log files instead of ignoring (default: false)
 * @returns Result indicating the background process has started
 */
export async function flutterRun({
  path,
  device,
  debug = true,
  release = false,
  profile = false,
  flavor,
  target,
}: {
  path?: string;
  device?: string;
  debug?: boolean;
  release?: boolean;
  profile?: boolean;
  flavor?: string;
  target?: string;
}) {
  try {
    const targetPath = path || process.cwd();
    const args = ["run"];

    // Add flags based on parameters
    if (device) {
      args.push("-d", device);
    }

    if (release) {
      args.push("--release");
    } else if (profile) {
      args.push("--profile");
    }

    if (flavor) {
      args.push("--flavor", flavor);
    }

    if (target) {
      args.push("--target", target);
    }

    // Spawn the process detached
    const proc: ChildProcess = spawn("flutter", args, {
      cwd: targetPath,
      detached: true,
    });

    proc.on("error", (spawnError) => {
      console.error(`Failed to start Flutter process: ${spawnError.message}`);
    });

    proc.on("close", (code, signal) => {
      console.log(
        `Background Flutter process (PID: ${proc.pid}) exited with code ${code}, signal ${signal}.`
      );
    });

    if (proc.pid) {
      registerFlutterProcess(proc.pid, proc);
    } else {
      return err("Failed to get process ID for background Flutter process.");
    }

    let message = `Flutter app started in the background (PID: ${proc.pid}).`;

    return ok({
      message: message,
      processId: proc.pid,
    });
  } catch (error) {
    if (error instanceof Error) {
      const errMsg = (error as any).output?.toString() || error.message;
      return err(`Error setting up Flutter run: ${errMsg}`);
    }
    throw error;
  }
}

/**
 * Function declaration schema for Google Gen AI library
 * (Updated to include logOutput)
 */
export const flutterRunFunctionDeclaration: FunctionDeclaration = {
  name: "flutterRun",
  description:
    "Runs a Flutter application in the background using the flutter run command. Output is ignored by default.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: {
        type: Type.STRING,
        description:
          "Path to the Flutter project directory (defaults to current directory)",
      },
      device: {
        type: Type.STRING,
        description: "Optional device ID or name to run the app on",
      },
      debug: {
        type: Type.BOOLEAN,
        description: "Whether to run in debug mode (default: true)",
      },
      release: {
        type: Type.BOOLEAN,
        description: "Whether to run in release mode (default: false)",
      },
      profile: {
        type: Type.BOOLEAN,
        description: "Whether to run in profile mode (default: false)",
      },
      flavor: {
        type: Type.STRING,
        description: "The flavor to use when running the app",
      },
      target: {
        type: Type.STRING,
        description: "The main entry-point file of the application",
      },
      logOutput: {
        type: Type.BOOLEAN,
        description:
          "Redirect process stdout/stderr to log files in '.flutter_run_logs' instead of ignoring them (default: false).",
      },
    },
    required: [],
  },
};
