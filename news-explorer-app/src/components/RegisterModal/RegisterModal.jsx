/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  onClose,
  onSignIn,
  existingEmails = [],
  onRegisterSuccess,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      setEmailError("");
      setIsRegistered(false);
    }
  }, [isOpen]);

  const isFormValid = email.trim() && password.trim() && username.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");

    if (!isFormValid) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (
      existingEmails.some(
        (existing) => existing.toLowerCase() === normalizedEmail,
      )
    ) {
      setEmailError("This email is not available.");
      return;
    }

    onRegisterSuccess?.({
      email: normalizedEmail,
      username: username.trim(),
      password,
    });
    setIsRegistered(true);
  };

  const handleSignIn = () => {
    onClose();
    onSignIn?.();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={isRegistered ? "Registration successful!" : "Sign up"}
    >
      {isRegistered ? (
        <div className="modal__success-state">
          <p className="modal__success-text">
            Registration successfully completed!
          </p>
          <button
            type="button"
            className="modal__signin-btn"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="modal__label">
            Username
            <input
              type="text"
              className="modal__input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label htmlFor="email" className="modal__label">
            Email
            <input
              type="email"
              className="modal__input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password" className="modal__label">
            Password
            <input
              type="password"
              className="modal__input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {emailError && <p className="modal__error">{emailError}</p>}
          <button
            type="submit"
            className="modal__signin-btn"
            disabled={!isFormValid}
          >
            Sign up
          </button>
          <button
            type="button"
            className="modal__or-signin-btn"
            onClick={handleSignIn}
          >
            or <span className="modal__signin-text">Sign in</span>
          </button>
        </form>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
