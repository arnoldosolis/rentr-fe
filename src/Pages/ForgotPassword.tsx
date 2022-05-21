import React from "react";
import FormWrapper from "../Components/FormWrapper";
import { Formik, Form, Field } from "formik";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

function ForgotPassword() {
  const { token } = useParams();
  const forgotPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please specify a password")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
  });
  return (
    <FormWrapper variant={{ variant: "small" }}>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={forgotPasswordSchema}
        validateOnChange={false}
        onSubmit={(values) => {
          // console.log(values);
          //   getUserByEmail({ variables: { email: values.email } });
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

export default ForgotPassword;
