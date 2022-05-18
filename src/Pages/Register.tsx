import React from "react";
import { Formik, Form, Field } from "formik";
import FormWrapper from "../Components/FormWrapper";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import * as Yup from "yup";
import { Button } from "@mui/material";

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(user: { email: $email, password: $password }) {
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

function Register() {
  const [register] = useMutation(REGISTER);
  const [getUserByEmail, { data: userExists }] = useLazyQuery(
    GET_USER_BY_EMAIL,
    { fetchPolicy: "network-only" }
  );

  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Email is required")
      .test("Unique Email", "This email already exists", (value) => {
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
        validationSchema={registerSchema}
        validateOnChange={false}
        onSubmit={async (values) => {
          // console.log(values);
          getUserByEmail({ variables: { email: values.email } });
          register({
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
            <Button
              style={{ marginTop: "4px" }}
              variant="contained"
              type="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
}

export default Register;
