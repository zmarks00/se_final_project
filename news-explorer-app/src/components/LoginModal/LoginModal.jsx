/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onOpenRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const isFormValid = email.trim() && password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    if (!isFormValid) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const success = onLogin?.({ email: normalizedEmail, password });

    if (success) {
      onClose();
      return;
    }

    setLoginError("Invalid email or password.");
  };

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose} title="Sign in">
      <form onSubmit={handleSubmit}>
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
        {loginError && <p className="modal__error">{loginError}</p>}
        <button
          type="submit"
          className="modal__signin-btn"
          disabled={!isFormValid}
        >
          Sign in
        </button>
      </form>
      <button
        type="button"
        className="modal__signup-btn"
        onClick={() => {
          onClose();
          onOpenRegister?.();
        }}
      >
        or <span className="modal__signup-text">Sign up</span>
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
