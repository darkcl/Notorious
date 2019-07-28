type EditorOnChange = (value: string) => void;

export interface IEditor {
  value: string;
  onChange: EditorOnChange;
}
