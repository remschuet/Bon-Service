import { createWorker } from "tesseract.js";

export const convertReceiptToText = async (image: Buffer) => {
  const worker = await createWorker("fra", 1, {
    workerPath: "./node_modules/tesseract.js/src/worker-script/node/index.js",
  });

  const ret = await worker.recognize(image);

  await worker.terminate();

  return ret.data.text;
};
