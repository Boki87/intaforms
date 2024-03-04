import { FieldsBaseProps, Mode } from "../BaseProps";
import { Edit } from "./Edit";

const SingleLineInputField: React.FC<FieldsBaseProps & { mode: Mode }> = ({
  mode,
  ...props
}) => {
  switch (mode) {
    case "edit":
      return <Edit {...props} />;
    case "design":
      return <div>Design Input Field</div>;
    case "fill":
      return <div>Fill Input Field</div>;
    default:
      return <div>Default Input Field</div>;
  }
};

export default SingleLineInputField;
