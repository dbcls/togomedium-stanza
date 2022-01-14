import { RawComponent } from "../stanzas/media-alignment-table/types";

export const makeRawComponent = (id: string, parent: string | null = null): RawComponent => {
  return {
    gmoid: id,
    name: id,
    parent,
    function: null,
  };
};