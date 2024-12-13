import {
  defineNode,
  NumberInterface,
  SelectInterface,
  NodeInterface,
} from "baklavajs";

type MathNodeInputs = {
  operation: string;
  num1?: number;
  num2?: number;
};

type MathNodeOutputs = {
  result: number;
};

const operations = [
  { name: "Add", inputs: 2 },
  { name: "Subtract", inputs: 2 },
  { name: "Multiply", inputs: 2 },
  { name: "Divide", inputs: 2 },
  { name: "Sine", inputs: 1 },
  { name: "Cosine", inputs: 1 },
  // Agrega más operaciones aquí
];

export const MathNode = defineNode<MathNodeInputs, MathNodeOutputs>({
  type: "MathNode",
  title: "Math",
  inputs: {
    operation: () => {
      const select = new SelectInterface(
        "Operation",
        "Add",
        operations.map((op) => op.name)
      );

      
       // Asociar manualmente el nodo en el evento setValue
       select.events.setValue.subscribe(Symbol("setValueListener"), (newOperation: String) => {
        // Obtener el nodo manualmente (parentNode se configura en la inicialización del nodo)
        const node = select.parentNode as any;

        if (!node || !node.inputs) {
          console.error("Nodo no encontrado o inputs no definidos");
          return;
        }

        const selectedOp = operations.find((op) => op.name === newOperation);

        if (selectedOp) {
          // Actualizar dinámicamente las entradas
          node.inputs.num1.setTitle(selectedOp.inputs === 2 ? "Num 1" : "Input");
          node.inputs.num2.setVisible(selectedOp.inputs === 2);
        }
      });

      return select;
    },
    num1: () => new NumberInterface("Num 1", 1),
    num2: () => new NumberInterface("Num 2", 1),
  },
  outputs: {
    result: () => new NodeInterface("Result"),
  },
  calculate({ num1 = 0, num2 = 0, operation }: MathNodeInputs) {
    switch (operation) {
      case "Add":
        return { result: num1 + num2 };
      case "Subtract":
        return { result: num1 - num2 };
      case "Multiply":
        return { result: num1 * num2 };
      case "Divide":
        return { result: num2 !== 0 ? num1 / num2 : NaN };
      case "Power":
        return { result: Math.pow(num1, num2) };
      case "Modulo":
        return { result: num1 % num2 };
      case "Floor Divide":
        return { result: num2 !== 0 ? Math.floor(num1 / num2) : NaN };
      case "Sine":
        return { result: Math.sin(num1) };
      case "Cosine":
        return { result: Math.cos(num1) };
      case "Tangent":
        return { result: Math.tan(num1) };
      case "Arc Sine":
        return { result: Math.asin(num1) };
      case "Arc Cosine":
        return { result: Math.acos(num1) };
      case "Arc Tangent":
        return { result: Math.atan(num1) };
      case "Minimum":
        return { result: Math.min(num1, num2) };
      case "Maximum":
        return { result: Math.max(num1, num2) };
      case "Round":
        return { result: Math.round(num1) };
      case "Floor":
        return { result: Math.floor(num1) };
      case "Ceil":
        return { result: Math.ceil(num1) };
      case "Absolute":
        return { result: Math.abs(num1) };
      case "Exponent":
        return { result: Math.exp(num1) };
      case "Logarithm":
        return { result: Math.log(num1) };
      case "Square Root":
        return { result: Math.sqrt(num1) };
      case "Inverse Square Root":
        return { result: 1 / Math.sqrt(num1) };
      case "Sign":
        return { result: Math.sign(num1) };
      default:
        return { result: NaN }; // Operación no reconocida
    }
  },
});
