import {
  getCurrentDirectory,
  getCurrentDirectoryFunctionDeclaration,
} from "./tools/get-current-directory";
import {
  readFileContent,
  readFileFunctionDeclaration,
} from "./tools/read-file";
import {
  changeDirectory,
  changeDirectoryFunctionDeclaration,
} from "./tools/change-directory";
import {
  writeFileContent,
  writeFileContentFunctionDeclaration,
} from "./tools/write-file";
import {
  listDirectory,
  listDirectoryFunctionDeclaration,
} from "./tools/list-directory";
import {
  createFlutterProject,
  createFlutterProjectFunctionDeclaration,
} from "./tools/create-flutter-project";
import {
  flutterAnalyze,
  flutterAnalyzeFunctionDeclaration,
} from "./tools/flutter-analyze";
import {
  flutterPubGet,
  flutterPubGetFunctionDeclaration,
} from "./tools/flutter-pub-get";
import {
  flutterPubAdd,
  flutterPubAddFunctionDeclaration,
} from "./tools/flutter-pub-add";
import { flutterRun, flutterRunFunctionDeclaration } from "./tools/flutter-run";
import {
  flutterRefresh,
  flutterRefreshFunctionDeclaration,
} from "./tools/flutter-refresh";
import { Result } from "./utils/result";

export const functionDeclarations = [
  getCurrentDirectoryFunctionDeclaration,
  readFileFunctionDeclaration,
  changeDirectoryFunctionDeclaration,
  writeFileContentFunctionDeclaration,
  listDirectoryFunctionDeclaration,
  createFlutterProjectFunctionDeclaration,
  flutterAnalyzeFunctionDeclaration,
  flutterPubGetFunctionDeclaration,
  flutterPubAddFunctionDeclaration,
  flutterRunFunctionDeclaration,
  flutterRefreshFunctionDeclaration,
];

export const tools: {
  [key: string]: (args?: any) => Promise<Result<any, any>>;
} = {
  getCurrentDirectory: getCurrentDirectory,
  readFileContent: readFileContent,
  changeDirectory: changeDirectory,
  writeFileContent: writeFileContent,
  listDirectory: listDirectory,
  createFlutterProject: createFlutterProject,
  flutterAnalyze: flutterAnalyze,
  flutterPubGet: flutterPubGet,
  flutterPubAdd: flutterPubAdd,
  flutterRun: flutterRun,
  flutterRefresh: flutterRefresh,
};
