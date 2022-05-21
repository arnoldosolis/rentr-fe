import React, { useState } from "react";
import FormWrapper from "../Components/FormWrapper";
import { Formik, Form, Field } from "formik";
import { Button } from "@mui/material";
import * as Yup from "yup";
import {
  BrowserRouter as Routes,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { NavbarLink } from "../styles/Navbar.styles";

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($token: String!, $password: String!) {
    changePassword(token: $token, password: $password) {
      id
      email
    }
  }
`;
function ForgotPassword() {
  const navigate = useNavigate();
  const [tokenError, setTokenError] = useState("");
  const { token } = useParams();
  const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please specify a password")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
  });
  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted: () => {
      navigate("/home");
      // TODO - use refetch queries
      window.location.reload();
    },
    onError(err) {
      console.log(err);
      if (err.message.includes("Token expired")) {
        setTokenError(err.message);
      }
    },
  });

  return (
    <FormWrapper variant={{ variant: "small" }}>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={changePasswordSchema}
        validateOnChange={false}
        onSubmit={async (values) => {
          // console.log(values);
          //   getUserByEmail({ variables: { email: values.email } });
          await changePassword({
            variables: {
              token: token,
              password: values.password,
            },
          });
        }}
      >
        {({ values, errors }) => (
          <Form>
            <div style={{ marginTop: "4px" }}>
              <label id="password">Password </label>
              <Field
                id="password"
                type="password"
                name="password"
                value={values.password}
              />
            </div>
            {errors.password && (
              <div
                style={{
                  color: "red",
                  fontSize: "0.8rem",
                  marginLeft: "1.5rem",
                }}
              >
                {errors.password}
              </div>
            )}
            {tokenError ? (
              <div style={{ color: "red" }}>
                {tokenError}
                <Link to="/home" style={{ marginLeft: "5px" }}>
                  Back to Home
                </Link>
              </div>
            ) : null}
            <Button
              style={{ marginTop: "4px" }}
              variant="contained"
              type="submit"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
}

export default ForgotPassword;
