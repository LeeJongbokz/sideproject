import styled from "styled-components";
import { grey_1, grey_2, grey_4 } from "./colorPalette";

interface RowProps {
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  marginBottom?: string;
  spacingMarginTop?: string;
  last?: boolean;
  isHover?: boolean;
}

interface ColumnProps {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  float?: string;
  bgColor?: string;
  spaceMargin?: string;
  textAlign?: string;
  borderRight?: boolean;
}

export const Row = styled.div<RowProps>`
  width: 100%;
  height: auto;
  margin-bottom: ${({ last, marginBottom }) =>
    last ? "20px" : marginBottom ? marginBottom : "none"};
  padding: ${({ padding }) => (padding ? padding : "none")};
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : "none")};
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? paddingBottom : "none"};
  cursor: ${({ isHover }) => isHover && "pointer"};

  &:nth-child(even) {
    background-color: ${({ isHover }) => isHover && grey_1};
  }

  &:hover {
    background-color: ${({ isHover }) => isHover && grey_2};
  }

  & + & {
    margin-top: ${({ spacingMarginTop }) =>
      spacingMarginTop && spacingMarginTop};
  }

  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

export const Column = styled.div<ColumnProps>`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "100%")};
  padding: ${({ padding }) => (padding ? padding : "20px")};
  margin: ${({ margin }) => (margin ? margin : "none")};
  float: ${({ float }) => (float ? float : "left")};
  text-align: ${({ textAlign }) => textAlign && textAlign};
  position: relative;
  border-right: ${({ borderRight }) =>
    borderRight ? `1px solid ${grey_4}` : "none"};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "inherit")};

  &.space + &.space {
    margin-left: ${({ spaceMargin }) => (spaceMargin ? spaceMargin : "none")};
  }

  &:after {
    clear: both;
    display: block;
    content: "";
  }
`;
