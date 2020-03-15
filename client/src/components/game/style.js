import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { WHITE_SQUARE, GRAY_SQUARE } from '../../constants/colors';

const shadedStyles = css`
  background-color: ${GRAY_SQUARE};
`;

export const Row = styled.div`
  display: flex;
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
