import { FunctionDeclaration, Type } from "@google/genai";
import { ChildProcess } from "child_process";
import { err, ok } from "../utils/result";

// Storage for running Flutter processes
// In a real application, you might want to use a more persistent storage solution
const runningFlutterProcesses = new Map<
  string,
  { pid: number; proc: ChildProcess }
>();

/**
 * Registers a Flutter process for later refreshing
 * @param pid Process ID of the Flutter process
 * @param cwd Current working directory of the process
 */
export function registerFlutterProcess(pid: number, proc: ChildProcess) {
  const key = `${pid}`;
  runningFlutterProcesses.set(key, { pid, proc });
}

/**
 * Triggers a hot reload for a running Flutter application
 * @param pid Optional process ID of the Flutter process to refresh. If not provided, tries to find a running Flutter process
 * @param path Optional path to the Flutter project. If not provided, uses the current directory
 * @returns Result of the refresh operation
 */
export async function flutterRefresh({ pid }: { pid?: number }) {
  try {
    let targetPid = pid;

    if (!targetPid) {
      // If no PID is provided, try to find one from the stored Flutter processes
      if (runningFlutterProcesses.size > 0) {
        // Pick the first available Flutter process
        const firstProcess = Array.from(runningFlutterProcesses.values())[0];
        targetPid = firstProcess.pid;
      } else {
        return err("No running Flutter processes found to trigger hot reload.");
      }
    }

    // Find the running Flutter process using the stored information
    const processInfo = runningFlutterProcesses.get(`${targetPid}`);
    if (!processInfo) {
      return err("Flutter process not registered or invalid PID.");
    }

    const { proc } = processInfo;

    proc.stdin?.write("r");

    return ok({
      message: `Hot reload triggered for Flutter process ${targetPid}`,
      pid: targetPid,
    });
  } catch (error) {
    if (error instanceof Error) {
      return err(`Failed to refresh Flutter app: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Function declaration schema for Google Gen AI library
 */
export const flutterRefreshFunctionDeclaration: FunctionDeclaration = {
  name: "flutterRefresh",
  description: "Triggers a hot reload for a running Flutter application",
  parameters: {
    type: Type.OBJECT,
    properties: {
      pid: {
        type: Type.NUMBER,
        description: "Process ID of the Flutter process to refresh",
      },
    },
    required: ["pid"],
  },
};
