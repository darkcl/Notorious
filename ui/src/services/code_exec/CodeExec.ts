interface CodeExecution {
  id: string;
  codeSnippet: string;
  language: string;
  isCompleted: string;
  output: string;
  error: string;
}

interface CodeExecutionController {
  data: {
    task: CodeExecution;
  };
  execute: (language: string, code: string) => void;
  cleare: () => void;
}

declare var codeExec: CodeExecutionController;

export default codeExec;
