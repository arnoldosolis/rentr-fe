import React from "react";
import { Formik, Form, Field } from "formik";
import FormWrapper from "../Components/FormWrapper";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(user: { email: $email, password: $password }) {
      id
    }
  }
`;

const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(user: { email: $email }) {
      id
      email
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN, {
    onCompleted: () => {
      navigate("/home");
      // TODO - Fix navbar not refreshing after login
    },
  });
  const [getUserByEmail, { data: userExists }] = useLazyQuery(
    GET_USER_BY_EMAIL,
    { fetchPolicy: "network-only" }
  );

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Email is required")
      .test("Unique Email", "This email does not exists", () => {
        // console.log("Yup", value);
        return !!!userExists;
      }),
    password: Yup.string()
      .required("Please specify a password")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
  });

  return (
    <FormWrapper variant={{ variant: "small" }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        validateOnChange={false}
        onSubmit={(values) => {
          // console.log(values);
          getUserByEmail({ variables: { email: values.email } });
          login({
            variables: {
              email: values.email,
              password: values.password,
            },
          });
        }}
      >
        {({ values, errors }) => (
          <Form>
            <div>
              <label id="email">Email </label>
            </div>
            <div>
              <Field
                id="email"
                type="email"
                name="email"
                value={values.email}
              />
            </div>
            {errors.email && (
              <div
                style={{
                  color: "red",
                  fontSize: "0.8rem",
                  marginLeft: "1.5rem",
                }}
              >
                {errors.email}
              </div>
            )}
            <div style={{ marginTop: "4px" }}>
              <label id="password">Password </label>
            </div>
            <div>
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
            <div>
              <Link to="/forgot-password" style={{ marginLeft: "auto" }}>
                Forgot password?
              </Link>
            </div>
            <Button
              style={{ marginTop: "4px" }}
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
}

export default Login;
