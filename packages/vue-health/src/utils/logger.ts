import { highlighter } from "./highlighter.js";

export const logger = {
  log: (message: string = "") => {
    console.log(message);
  },
  error: (message: string) => {
    const text = highlighter.error(message);
    console.error(text);
  },
  warn: (message: string) => {
    const text = highlighter.warn(message);
    console.warn(text);
  },
  success: (message: string) => {
    const text = highlighter.success(message);
    console.log(text);
  },
  info: (message: string) => {
    const text = highlighter.info(message);
    console.log(text);
  },
  dim: (message: string) => {
    const text = highlighter.dim(message);
    console.log(text);
  },
  break: () => {
    console.log();
  },
};
