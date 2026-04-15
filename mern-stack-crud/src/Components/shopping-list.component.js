import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editQty, setEditQty] = useState(1);
  const [checked, setChecked] = useState({});

  const fetchList = () => {
    axios
      .get("http://localhost:3000/shopping-list", authHeader())
      .then(({ data }) => setItems(data.items || []))
      .catch((err) => console.error("Failed to load shopping list", err));
  };

  useEffect(() => { fetchList(); }, []);

  const handleDelete = (itemId) => {
    axios
      .delete(`http://localhost:3000/shopping-list/item/${itemId}`, authHeader())
      .then(fetchList)
      .catch(() => alert("Failed to delete item"));
  };

  const handleDeleteAll = () => {
    if (!window.confirm("Clear your entire shopping list?")) return;
    axios
      .delete("http://localhost:3000/shopping-list/all", authHeader())
      .then(() => { setItems([]); setChecked({}); })
      .catch((error) => {
        const message = error.response?.data?.message || error.message;
        console.error("Failed to clear shopping list", message, error.response?.data);
        alert(`Failed to clear shopping list: ${message}`);
      });
  };

  const handleEditSave = (itemId) => {
    axios
      .put(`http://localhost:3000/shopping-list/item/${itemId}`, { quantity: editQty }, authHeader())
      .then(() => { setEditingId(null); fetchList(); })
      .catch(() => alert("Failed to update quantity"));
  };

  const toggleChecked = (itemId) => {
    setChecked((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>🛒 Shopping List</h2>
        <div className="d-flex align-items-center gap-3">
          {items.length > 0 && (
            <small className="text-muted">{checkedCount}/{items.length} collected</small>
          )}
          {items.length > 0 && (
            <Button variant="outline-danger" size="sm" className="view-btn" onClick={handleDeleteAll}>
              🗑 Clear All
            </Button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-muted">No items yet. Click 🛒 on a meal to add its ingredients.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: 40 }}>✓</th>
              <th>Ingredient</th>
              <th>Quantity</th>
              <th>From Meal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                style={{
                  opacity: checked[item._id] ? 0.4 : 1,
                  textDecoration: checked[item._id] ? "line-through" : "none",
                  transition: "opacity 0.2s"
                }}
              >
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={!!checked[item._id]}
                    onChange={() => toggleChecked(item._id)}
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  {editingId === item._id ? (
                    <Form.Control
                      type="number"
                      size="sm"
                      value={editQty}
                      min="1"
                      style={{ width: "80px" }}
                      onChange={(e) => setEditQty(Number(e.target.value))}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td>
                  <span className="badge bg-secondary">{item.mealSource}</span>
                </td>
                <td>
                  {editingId === item._id ? (
                    <>
                      <Button size="sm" variant="success" className="me-2"
                        onClick={() => handleEditSave(item._id)}>
                        Save
                      </Button>
                      <Button size="sm" variant="secondary"
                        onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="primary" className="edit-btn me-2"
                        onClick={() => { setEditingId(item._id); setEditQty(item.quantity); }}>
                        Edit Qty
                      </Button>
                      <Button size="sm" variant="danger" className="delete-btn me-2"
                        onClick={() => handleDelete(item._id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ShoppingList;