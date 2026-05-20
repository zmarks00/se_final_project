import "./ModalWithForm.css";
import modalCloseButton from "../../assets/close-button.png";

function ModalWithForm({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <img src={modalCloseButton} alt="modal close button" />
        </button>
        {title && <h2 className="modal__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default ModalWithForm;
