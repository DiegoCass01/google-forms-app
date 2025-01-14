import React, { useState } from "react";

const FormBuilder = ({ onSaveForm }) => {
  const [formFields, setFormFields] = useState([]);
  const [fieldLabel, setFieldLabel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Adding fields
  const addField = () => {
    if (fieldLabel.length !== 0) {
      setFormFields([...formFields, { type: "text", label: fieldLabel }]);
      setFieldLabel("");
      setErrorMessage("");
    } else {
      setErrorMessage("Field label cannot be empty");
    }
  };

  //Saving fields
  const saveForm = () => {
    onSaveForm(formFields);
  };

  //Removing fields
  const deleteField = (indexToRemove) => {
    const updatedFields = formFields.filter(
      (_, index) => index !== indexToRemove
    );
    setFormFields(updatedFields);
    onSaveForm(updatedFields);
  };

  return (
    <div className="container mt-4">
      <h2>Create a New Form</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Field Text"
          value={fieldLabel}
          onChange={(e) => setFieldLabel(e.target.value)}
        />
        <p className="text-danger mt-2">{errorMessage}</p>
      </div>
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={addField}>
          Add Field
        </button>
      </div>

      <h3>Form Preview:</h3>

      {formFields.length > 0 ? (
        <form onSubmit={(e) => e.preventDefault()}>
          {formFields.map((field, index) => (
            <ul className="list-group">
              <div className="mb-3">
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{field.label}</span>
                  <button
                    onClick={() => deleteField(index)}
                    className="btn btn-danger btn-sm"
                  >
                    X
                  </button>
                </li>
              </div>
            </ul>
          ))}
          <button className="btn btn-success" onClick={saveForm}>
            Save Form
          </button>
        </form>
      ) : (
        <p>No preview.</p>
      )}
    </div>
  );
};

export default FormBuilder;
