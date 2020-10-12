import React from 'react'
import './Modal.css'

export type ModalProps = {
  show?: boolean
}

const Modal: React.FC<ModalProps> = ({ show = true, children }) => {
  if (!show) {
    return null
  }

  return <div className="Modal">{children}</div>
}

export default Modal
