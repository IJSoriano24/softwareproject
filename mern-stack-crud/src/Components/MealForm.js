import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";


const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const MealForm = (props) => {
  const [ingInput, setIngInput] = useState("");
  const [ingError, setIngError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    ingredients: Yup.array().min(1, "Add at least one ingredient").required("Required"),
    timeprep: Yup.number()
      .positive("Invalid time prep")
      .integer("Invalid time prep")
      .required("Required"),
    date: Yup.date().required("Required"),
  });

  const addIngredientToFormik = (ingredient, setFieldValue, currentIngredients) => {
    const safeIngredients = Array.isArray(currentIngredients) ? currentIngredients : [];
    const exists = safeIngredients.some((ing) => {
      if (ingredient?._id && ing?._id) return ing._id === ingredient._id;
      return String(ing?.name || "").toLowerCase() === String(ingredient?.name || "").toLowerCase();
    });

    if (!exists) {
      setFieldValue("ingredients", [...safeIngredients, ingredient]);
    }
  };

  const handleAddIngredient = async (e, setFieldValue, currentIngredients) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const name = ingInput.trim();
    if (!name) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/ingredients/find-or-create`, { name });
      const newIngredient = response.data;
      addIngredientToFormik(newIngredient, setFieldValue, currentIngredients);
      setIngError("");
    } catch (err) {
      console.error("Error adding ingredient:", err?.response?.data || err.message);
      const localIngredient = { _id: `tmp-${Date.now()}`, name };
      addIngredientToFormik(localIngredient, setFieldValue, currentIngredients);
      setIngError("Ingredient service unavailable. Added locally.");
    } finally {
      setIngInput("");
    }
  };

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{
          name: "",
          ingredients: [],
          timeprep: "",
          date: new Date().toISOString().split("T")[0],
        }}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FormGroup className="mb-3">
              <label>Planned Date</label>
              <Field name="date" type="date" className="form-control" />
              <ErrorMessage name="date" className="d-block invalid-feedback" component="span" />
            </FormGroup>

            <FormGroup>
              <label>Meal Name</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage name="name" className="d-block invalid-feedback" component="span" />
            </FormGroup>

            <FormGroup className="mb-3">
              <label>Ingredients (Press Enter to add)</label>
              <div className="d-flex flex-wrap gap-2 mb-2">
                {values.ingredients &&
                  values.ingredients.map((ing, index) => (
                    <span key={ing._id || index} className="badge rounded-pill bg-success p-2">
                      {ing.name}
                      <button
                        type="button"
                        className="ms-2 btn-close btn-close-white"
                        onClick={() => {
                          const updated = values.ingredients.filter((_, i) => i !== index);
                          setFieldValue("ingredients", updated);
                        }}
                      />
                    </span>
                  ))}
              </div>

              <input
                type="text"
                className="form-control"
                value={ingInput}
                onChange={(e) => setIngInput(e.target.value)}
                onKeyDown={(e) => handleAddIngredient(e, setFieldValue, values.ingredients)}
                placeholder="Add ingredient..."
              />
              {ingError && <small className="text-warning d-block mt-1">{ingError}</small>}
              <ErrorMessage name="ingredients" className="d-block invalid-feedback" component="span" />
            </FormGroup>

            <FormGroup>
              <label>Timeprep</label>
              <Field name="timeprep" type="number" className="form-control" />
              <ErrorMessage name="timeprep" className="d-block invalid-feedback" component="span" />
            </FormGroup>

            <Button variant="danger" size="lg" className="w-100" type="submit">
              {props.children}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MealForm;