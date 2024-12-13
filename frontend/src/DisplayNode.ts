import { defineNode, NodeInterface, TextInterface } from "baklavajs";

// Definir los tipos para los parámetros de entrada y salida
type DisplayNodeInputs = {
  value: string | number;
};

type DisplayNodeOutputs = {
  display: string;
};

export const DisplayNode = defineNode<DisplayNodeInputs, DisplayNodeOutputs>({
  type: "DisplayNode",
  title: "Display",
  inputs: {
    value: () => new NodeInterface("Value", ""),
  },
  outputs: {
    display: () => new TextInterface("Display", ""),
  },
  calculate({ value }: DisplayNodeInputs) {
    return {
      display: typeof value === "number" ? value.toFixed(3) : String(value),
    };
  },
});
