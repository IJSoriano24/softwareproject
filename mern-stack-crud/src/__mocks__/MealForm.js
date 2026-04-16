const React = require("react");

function MockMealForm({ onSubmit, children }) {
  return React.createElement(
    "div",
    null,
    React.createElement("span", null, children),
    React.createElement(
      "button",
      {
        onClick: function () {
          onSubmit({
            name: "Pasta",
            timeprep: 20,
            date: "2026-04-16",
            ingredients: [{ _id: "ing001", name: "penne" }],
          });
        },
      },
      "Submit"
    )
  );
}

export default MockMealForm; 