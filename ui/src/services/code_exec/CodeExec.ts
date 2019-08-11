export interface CodeExecution {
  id: string;
  codeSnippet: string;
  language: string;
  isCompleted: string;
  output: string;
  error: string;
}

export interface CodeExecutionData {
  task: CodeExecution;
}

export interface CodeExecutionController {
  data: CodeExecutionData;
  execute: (language: string, code: string) => void;
  cleare: () => void;
}

declare var codeExec: CodeExecutionController;

export const CodeExecService = () => {
  return codeExec;
};
