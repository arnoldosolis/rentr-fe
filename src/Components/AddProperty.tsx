import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Formik } from "formik";
import {
  FormContainer,
  FormInputContainer,
} from "../styles/AddProperty.styles";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// TODO - Add Props to control open state
function AddProperty() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Property
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setOpen(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                setOpen(false);
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Formik
          initialValues={{
            name: "",
            address: "",
            address_2: "",
            zip: "",
            city: "",
            state: "",
            country: "",
            primary_phone_number: "",
          }}
          validate={(values) => {
            // const errors = {};
            // if (!values.email) {
            //   errors.email = "Required";
            // } else if (
            //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            // ) {
            //   errors.email = "Invalid email address";
            // }
            // return errors;
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <FormContainer onSubmit={handleSubmit}>
              <FormInputContainer>
                <label>Name of Building</label>
                <input
                  type="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && errors.name}
                <label>Address</label>
                <input
                  type="address"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                {errors.address && touched.address && errors.address}
                <label>Address 2</label>
                <input
                  type="address_2"
                  name="address_2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address_2}
                />
                {errors.address_2 && touched.address_2 && errors.address_2}
                <label>Zip Code</label>
                <input
                  type="zip"
                  name="zip"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zip}
                />
                {errors.zip && touched.zip && errors.zip}
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginTop: "10px" }}
                >
                  Submit
                </Button>
              </FormInputContainer>
            </FormContainer>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

export default AddProperty;
