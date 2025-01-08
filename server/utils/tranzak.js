// server/utils/tranzak.ts
import TRANZAK from "tranzak-node";
import shortUUID from "short-uuid";

export const createTranzakClient = () => {
  return new TRANZAK({
    appId: process.env.TRANZAK_APP_ID,
    appKey: process.env.TRANZAK_APP_KEY,
    mode: process.env.NODE_ENV === "production" ? "live" : "sandbox",
  });
};

export const generateTransactionRef = () => shortUUID.generate();
