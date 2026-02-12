import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const MealForm = (props) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    ingredients: Yup.string().required("Required"),
    timeprep: Yup.number()
      .positive("Invalid time prep")
      .integer("Invalid time prep")
      .required("Required"),
  });

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{
          name: "",
          ingredients: "",
          timeprep: "",
        }}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
      >
        <Form>
          <FormGroup>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage
              name="name"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <FormGroup>
            <Field name="ingredients" type="text" className="form-control" />
            <ErrorMessage
              name="ingredients"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <FormGroup>
            <Field name="timeprep" type="number" className="form-control" />
            <ErrorMessage
              name="timeprep"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <Button variant="danger" size="lg" className="w-100" type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default MealForm;
