import {
  AutoComplete as AutoCompletePrimitive,
  AutoCompleteProps,
} from "primereact/autocomplete";

import "./theme.css";

export function AutoComplete(props: AutoCompleteProps) {
  return <AutoCompletePrimitive {...props} />;
}

export * from "primereact/autocomplete";
