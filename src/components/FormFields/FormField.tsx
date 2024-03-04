import SingleLineInputField from "./SingleLineInputField";

type FormTypes = "input";

type NewType = {
  [x in FormTypes]: any;
};

const FormField: NewType = {
  input: SingleLineInputField,
};

export default FormField;
