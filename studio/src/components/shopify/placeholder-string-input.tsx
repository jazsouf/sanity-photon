import get from "lodash.get";
import {
    type SanityDocument,
    type StringInputProps,
    type StringSchemaType,
    useFormValue,
} from "sanity";

type Props = StringInputProps<
  StringSchemaType & { options?: { field?: string } }
>;

export const PlaceholderStringInput = (props: Props) => {
  const { schemaType } = props;

  const path = schemaType?.options?.field;
  const doc = useFormValue([]) as SanityDocument;

  const proxyValue = path ? (get(doc, path) as string) : "";

  return props.renderDefault({
    ...props,
    elementProps: { ...props.elementProps, placeholder: proxyValue },
  });
};
