import React from "react";
import { Formik, Form } from "formik";
import FormWrapper from "../Components/FormWrapper";
import { gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(options: { email: $email, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        email
      }
    }
  }
`;

function Register() {
  const [register] = useMutation(REGISTER);
  return (
    <FormWrapper variant={{ variant: "small" }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
          return register(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div>
              <label id="email">Email </label>
              <input
                value={values.email}
                onChange={handleChange}
                id="email"
                type="email"
              />
            </div>
            <div style={{ marginTop: "4px" }}>
              <label id="password">Password </label>
              <input
                value={values.password}
                onChange={handleChange}
                id="password"
                type="password"
              />
            </div>
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
}

export default Register;
