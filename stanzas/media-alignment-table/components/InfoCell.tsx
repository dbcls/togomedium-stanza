import { css } from "@emotion/react";
import { Slider, Tooltip } from "@mui/material";
import React, { FC } from "react";
import { COLOR_PRIMARY, COLOR_WHITE, FONT_EN, SIZE1 } from "../../../components/styles";

type Props = {
  info: { id: string; label: string }[];
  linkBase: string;
  expanded: boolean;
};

export const InfoCell: FC<Props> = (props) => {
  return props.expanded ? <Expanded {...props} /> : <Compact {...props} />;
};

const Compact: FC<Props> = ({ info, linkBase }) => {
  return (
    <div css={wrapper} className="compact">
      <div className="inner">
        {info.map((item, index) => (
          <div key={item.id} className="text">
            <Tooltip title={item.label} placement={"top"} arrow>
              <a href={`${linkBase}${item.id}`} target="_blank" rel="noreferrer">
                {item.id}
              </a>
            </Tooltip>
            {index < info.length - 1 && ","}
          </div>
        ))}
      </div>
    </div>
  );
};

const Expanded: FC<Props> = ({ info, linkBase }) => {
  return (
    <div css={wrapper} className="expanded">
      <div className="inner">
        {info.map((item) => (
          <div key={item.id} className="text">
            <a href={`${linkBase}${item.id}`} target="_blank" rel="noreferrer">
              {item.id}
            </a>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const wrapper = css`
  font-family: ${FONT_EN};
  font-size: 14px;
  background-color: ${COLOR_WHITE};
  box-sizing: border-box;
  padding: ${SIZE1}px;
  display: table-cell;
  max-width: 200px;
  min-width: 120px;
  .inner {
    padding-top: 4px;
  }
  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
  }
  &.compact {
    .inner {
      display: flex;
    }
    .text {
      margin-right: ${SIZE1}px;
    }
  }
  &.expanded {
    min-width: 180px;
    .text {
      display: flex;
      flex-direction: column;
      + .text {
        margin-top: ${SIZE1}px;
      }
    }
  }
`;
