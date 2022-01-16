import { css } from "@emotion/react";
import React, { FC } from "react";
import { AlignmentTable } from "./AlignmentTable";
import { HeaderRow } from "./HeaderRow";
import { InfoColumns } from "./InfoColumns";
import { MediaAlignmentTableResponse } from "../../../api/media-alignment-table/types";
import { COLOR_GRAY_LINE } from "../../../components/styles";

type Props = { data: MediaAlignmentTableResponse };

export const ScrollableTable: FC<Props> = ({ data }) => {
  return (
    <div css={wrapper}>
      <HeaderRow extraCSS={header} />
      <InfoColumns data={data} extraCSS={infoColumns} />
      <div className="inner">
        <AlignmentTable data={data} />
      </div>
    </div>
  );
};

const wrapper = css`
  position: relative;
  overflow: hidden;
  background-color: ${COLOR_GRAY_LINE};
  .inner {
    overflow-x: scroll;
  }
`;
const header = css`
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${COLOR_GRAY_LINE};
  background-color: ${COLOR_GRAY_LINE};
`;
const infoColumns = css`
  position: absolute;
  top: 0;
  left: 0;
`;