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
    date: Yup.date().required("Required")

      .required("Required"),
  });

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{
          name: "",
          ingredients: "",
          timeprep: "",
          date: new Date().toISOString().split('T')[0],
        }}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
      >
        <Form>

          <FormGroup className="mb-3">
            <label>Planned Date</label>
            <Field name="date" type="date" className="form-control" />
            <ErrorMessage name="date" className="d-block invalid-feedback" component="span" />
          </FormGroup>

          <FormGroup>
            <label>Meal Name</label>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage
              name="name"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <FormGroup>
            <label>Ingredients</label>
            <Field name="ingredients" type="text" className="form-control" />
            <ErrorMessage
              name="ingredients"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <FormGroup>
            <label>Timeprep</label>
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
