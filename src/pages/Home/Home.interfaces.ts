export enum ETypeField {
  NUMBER = "numberfield",
  TEXT = "textfield",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  DATE = "datefield",
  RADIO = "radiobuttons",
}

export type TSchema = { label: string } & (
  | { type: ETypeField.NUMBER; default?: string }
  | { type: ETypeField.TEXT; default?: string }
  | { type: ETypeField.TEXTAREA; default?: string }
  | { type: ETypeField.DATE; default?: string }
  | { type: ETypeField.CHECKBOX; default?: string[]; values: string[] }
  | { type: ETypeField.RADIO; default?: string; values: string[] }
);

export interface IFormSchema {
  title?: string;
  items: TSchema[];
  buttons?: string[];
}
