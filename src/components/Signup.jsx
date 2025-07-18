import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AuthStyles.css";
import { API_URL } from "../shared";

const speicalKeys = ["!", "@", "#", "$", "%", "&"];

const Signup = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function speicalChacterChecker(password) {
    //passowrd checks the chacters passowrd
    return speicalKeys.some((x) => {
      // hold each index in the array
      x.includes(password); // does this password does it include any of theses password
    });
  }
  // some((x) => { insert_logic_here })
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "name is required";
    } else if (formData.name.length < 2 || formData.name.length > 22) {
      newErrors.name = "name has to be bewteen 2 and 22 characters";
    }

    const validateEmail = (e) => {
      //creating a input box
      const email = e.target.value; //checking for a valid box

      if (validator.isEmail(email)) {
        return "Valid Email :)";
      } else {
        return "Enter valid Email!";
      }
    };
    console.log(formData.password);
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      formData.password.length < 6 ||
      !speicalChacterChecker(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 6 characters and need a speical key";
      console.log(newErrors.password);
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/auth/signup`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      if (error.response?.data?.error) {
        setErrors({ general: error.response.data.error });
      } else {
        setErrors({ general: "An error occurred during signup" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>

        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
