import './Modal.css'

const Modal = ({children, show, onClose, title}) => {
    if (!show) {
        return null;
    }
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{title}</h2>
                {children}
            </div>
        </div>
    )
}

export default Modal;