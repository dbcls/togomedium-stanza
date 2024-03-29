import React, { FC } from "react";
import { TaxonomicTreeSection } from "./TaxonomicTreeSection";
import { MediaByTaxonParams, MediaByTaxonResponse } from "../../../api/media_by_taxon/types";
import { API_MEDIA_BY_TAXON } from "../../../api/paths";
import { subPane, queryPane, wrapper } from "../../../shared/components/media-finder/appStyles";
import { MediaPane } from "../../../shared/components/media-finder/MediaPane";
import {
  FoundMedia,
  useFoundMediaMutators,
  useFoundMediaState,
} from "../../../shared/state/media-finder/foundMedia";
import { useMediaLoadAbortMutators } from "../../../shared/state/media-finder/mediaLoadAbort";
import { getData } from "../../../shared/utils/getData";
import { useSelectedTaxonState } from "../states/selectedTaxon";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  const { next, prev } = useMediaPagination();
  return (
    <div css={wrapper}>
      <div css={queryPane}>
        <TaxonomicTreeSection />
      </div>
      <div css={subPane}>
        <MediaPane dispatchEvent={dispatchEvent} next={next} prev={prev} />
      </div>
    </div>
  );
};

const useMediaPagination = () => {
  const selectedTaxon: string[] = useSelectedTaxonState();
  const response = useFoundMediaState();
  const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const next = () => {
    paginate({
      offset: response.offset + 10,
      tax_ids: selectedTaxon,
      abortLoader: setNextMediaLoadAbort,
      setFoundMedia,
    });
  };
  const prev = () => {
    paginate({
      offset: response.offset - 10,
      tax_ids: selectedTaxon,
      abortLoader: setNextMediaLoadAbort,
      setFoundMedia,
    });
  };

  return { next, prev };
};

type PaginateParams = {
  offset: number;
  abortLoader: (abort: AbortController | null) => void;
  tax_ids: string[];
  setFoundMedia: (media: FoundMedia) => void;
};
const paginate = async ({ offset, abortLoader, tax_ids, setFoundMedia }: PaginateParams) => {
  const params: MediaByTaxonParams = { tax_ids, offset, limit: 10 };
  const abort: AbortController = new AbortController();
  abortLoader(abort);
  const response = await getData<MediaByTaxonResponse, MediaByTaxonParams>(
    API_MEDIA_BY_TAXON,
    params,
    abort
  );
  abortLoader(null);
  if (response.body) {
    setFoundMedia(response.body);
  }
};
