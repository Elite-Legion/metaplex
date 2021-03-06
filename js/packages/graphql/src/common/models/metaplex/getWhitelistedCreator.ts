import {
  findProgramAddress,
  programIds,
  toPublicKey,
  StringPublicKey,
} from "../../utils";
import { METAPLEX_PREFIX } from "./constants";

export async function getWhitelistedCreator(
  creator: StringPublicKey,
  storeId?: StringPublicKey
) {
  const PROGRAM_IDS = programIds();
  const store = storeId || PROGRAM_IDS.store;
  if (!store) {
    throw new Error("Store not initialized");
  }

  return (
    await findProgramAddress(
      [
        Buffer.from(METAPLEX_PREFIX),
        toPublicKey(PROGRAM_IDS.metaplex).toBuffer(),
        toPublicKey(store).toBuffer(),
        toPublicKey(creator).toBuffer(),
      ],
      toPublicKey(PROGRAM_IDS.metaplex)
    )
  )[0];
}
