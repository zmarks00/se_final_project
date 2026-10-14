import PropTypes from "prop-types";
import "./ModalWithForm.css";
import modalCloseButton from "../../assets/close-button.svg";

function ModalWithForm({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <img src={modalCloseButton} alt="modal close button" />
        </button>
        <div className="modal__inner">
          {title && <h2 className="modal__title">{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  );
}

ModalWithForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default ModalWithForm;
