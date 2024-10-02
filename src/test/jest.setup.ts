import LocalStorage from "./local-storage-mock";
import "@testing-library/jest-dom";

Object.defineProperty(window, "localStorage", {
  value: new LocalStorage(),
});
