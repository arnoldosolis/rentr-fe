import { Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import FormWrapper from "../Components/FormWrapper";
import * as Yup from "yup";

function ForgotPassword() {
  const [complete, setComplete] = useState(false);
  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });
  return (
    <FormWrapper variant={{ variant: "small" }}>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={loginSchema}
        validateOnChange={false}
        onSubmit={(values) => {
          // console.log(values);
          setComplete(true);
        }}
      >
        {({ values, errors }) =>
          complete ? (
            <div>
              if an account with that email exists, you will recieve in an email
            </div>
          ) : (
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
              <Button
                style={{ marginTop: "4px" }}
                variant="contained"
                type="submit"
              >
                Reset
              </Button>
            </Form>
          )
        }
      </Formik>
    </FormWrapper>
  );
}

export default ForgotPassword;
