import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { WHITE_SQUARE, GRAY_SQUARE } from '../../constants/colors';

export const Board = styled.div`
  margin: 8px auto;
  border: solid 2px;
  width: 536px;
  height: 536px;
`;

export const Row = styled.div`
  display: flex;
`;

const shadedStyles = css`
  background-color: ${GRAY_SQUARE};
`;

export const Square = styled.div`
  height: 65px;
  width: 65px;
  border: solid;
  border-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${WHITE_SQUARE};

  ${({ isShaded }) => isShaded && shadedStyles}
`;
