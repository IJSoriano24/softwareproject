import React, { useState, useRef, useEffect } from "react";
import { Container, Form, Button, Card, Image, Alert, Spinner } from "react-bootstrap";

const EditProfile = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
  const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [userData, setUserData] = useState({
    name: "New name",
    email: "test@example.com",
    password: "", 
    profileImage: "https://via.placeholder.com/150" 
  });

    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        setUserData({
          name: data.name || "",
          email: data.email || "",
          password: "",
          profileImage: data.profileImage || "https://via.placeholder.com/150"
        });
      } catch (err) {
        setError("Could not load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!userData.password) {
      alert("Please enter your current password to confirm changes.");
      return;
    }

       setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
    
      const rawText = await res.text();
      let data;
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch (parseError) {
        data = { error: rawText || res.statusText || "Unexpected server response" };
      }

      if (!res.ok) throw new Error(data.error || data.message || "Update failed");
      setSuccess("Profile updated successfully!");
      setUserData(prev => ({ ...prev, password: "" })); 
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

    if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" /> <span>Loading profile...</span>
    </div>
  );

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="text-center mb-4">
          <h3>Edit Profile</h3>
          
          {/* Profile Picture Section */}
          <div className="position-relative d-inline-block mt-3">
            <Image
              src={userData.profileImage}
              roundedCircle
              style={{ width: "120px", height: "120px", cursor: "pointer", objectFit: "cover" }}
              onClick={() => fileInputRef.current.click()} 
              className="border shadow-sm"
            />
            <div className="mt-2">
              <small className="text-muted">Click image to upload</small>
            </div>
            
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              value={userData.name} 
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={userData.email} 
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              required
            />
          </Form.Group>

          <hr />
          
          <Form.Group className="mb-4">
            <Form.Label><strong>Current Password</strong></Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter password to save changes"
              value={userData.password} 
              onChange={(e) => setUserData({...userData, password: e.target.value})}
              required
            />
            <Form.Text className="text-muted">
              We need your password to verify these changes.
            </Form.Text>
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Save Changes
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EditProfile;