import React, { ReactElement } from "react";
import styled from "styled-components";
import { grey_4, grey_7, red_2 } from "../../utils/colorPalette";
import { Row, Column } from "../../utils/layout";

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const Label = styled.label`
  color: ${grey_7};
  font-size: 12px;
  margin-bottom: 4px;
`;

const Text = styled.input`
  border-radius: 8px;
  padding: 6px 8px;
  border: 1px solid ${grey_4};
  box-shadow: 1px 2px 1px rgba(131, 131, 131, 0.1);
  outline: none;
  margin-top: 3px;
  &:focus {
    border: 1px solid #333;
    transition: all 0.3s;
  }
`;

const ErrorMessage = styled.p`
  font-size: 10px;
  color: ${red_2};
`;

interface Props {
  id?: string;
  error?: string;
  type: string;
  name: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id,
  error,
  type,
  name,
  label,
  value,
  onChange,
}: Props): ReactElement {
  return (
    <InputBox>
      <Row>
        <Column padding="0" width="100px">
          {label && <Label>{label}</Label>}
        </Column>
        <Column
          padding="0"
          float="right"
          textAlign="right"
          width="calc(100% - 100px)"
        >
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Column>
      </Row>
      <Text type={type} id={id} name={name} value={value} onChange={onChange} />
    </InputBox>
  );
}
