import { ETypeField, TSchema } from "pages/Home/Home.interfaces";

export const instanceOfSchema = (object: any): object is TSchema =>
  "label" in object &&
  "type" in object &&
  (object.type === ETypeField.CHECKBOX || object.type === ETypeField.RADIO ? "values" in object : true);
