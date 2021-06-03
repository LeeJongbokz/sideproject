import React, { useState } from "react";
import styled from "styled-components";
import {
  characterValidation,
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from "../../utils/validate";
import * as API from "../../apis";
import Input from "../../components/Input2";
import { Row } from "../../utils/layout";
import { grey_6, grey_8, purple_1 } from "../../utils/colorPalette";

const JoinBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f3f5;
`;

const FormBox = styled.div`
  width: 80vw;
  max-width: 520px;
  min-width: 320px;
  height: 640px;
  background-color: #fff;
  padding: 4% 6%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SignUp = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  font-size: 14px;
  background-color: ${purple_1};
  color: white;
  border: none;
  border-radius: 8px;
`;

const H3 = styled.h3`
  font-size: 2em;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${grey_8};
`;

const DescriptionBox = styled.p`
  font-size: 12px;
  color: ${grey_6};
`;

const Join = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [
    confirmPasswordErrorMessage,
    setConfirmPasswordErrorMessage,
  ] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmitForm = function () {
    setEmailErrorMessage("");
    setNameErrorMessage("");
    setPasswordErrorMessage("");
    setConfirmPasswordErrorMessage("");

    const nameMessage = characterValidation(formState.name);

    if (nameMessage !== "") {
      setNameErrorMessage(nameMessage);
      return false;
    }

    const emailMessage = emailValidation(formState.email);

    if (emailMessage !== "") {
      setEmailErrorMessage(emailMessage);
      return false;
    }

    const passwordMessage = passwordValidation(formState.password);

    if (passwordMessage !== "") {
      setPasswordErrorMessage(passwordMessage);
      return false;
    }

    const confirmPasswordMessage = confirmPasswordValidation(
      formState.password,
      formState.confirmPassword
    );

    if (confirmPasswordMessage !== "") {
      setConfirmPasswordErrorMessage(confirmPasswordMessage);
      return false;
    }

    // 회원가입(signup)
    API.signup({
      name: formState.name,
      email: formState.email,
      password: formState.password,
    })
      .then((json) => {
        if (json.error) throw json;

        alert("회원가입을 성공적으로 마쳤습니다. 로그인해주세요!");
        window.location.href = "/login";
      })
      .catch((error) => {
        alert(
          "서버 오류 발생! 잠시후 다시 시도해주세요. 메시지:" +
            JSON.stringify(error)
        );
      });
  };

  return (
    <JoinBox>
      <FormBox>
        <Row>
          <H3>Sign Up.</H3>
          <DescriptionBox>
            Give us some of your information to get free access to frendly.
          </DescriptionBox>
        </Row>
        <Row paddingTop="20px">
          <Input
            type="text"
            label="Name"
            name="name"
            onChange={onChange}
            value={formState.name}
            error={nameErrorMessage}
          />
          <Input
            type="email"
            label="Email"
            name="email"
            onChange={onChange}
            value={formState.email}
            error={emailErrorMessage}
          />
          <Input
            type="text"
            label="Confirm email"
            name="email"
            onChange={onChange}
            value={formState.confirmEmail}
            error={emailErrorMessage}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            onChange={onChange}
            value={formState.password}
            error={passwordErrorMessage}
          />
          <Input
            type="password"
            label="Confirm password"
            name="confirmPassword"
            onChange={onChange}
            value={formState.confirmPassword}
            error={confirmPasswordErrorMessage}
          />
        </Row>
        <Row>
          <SignUp onClick={onSubmitForm}>Create account</SignUp>
        </Row>
      </FormBox>
    </JoinBox>
  );
};

export default Join;
