import React from 'react'
import Modal from 'react-bootstrap/Modal';
import './index.scss'
import Spinner from 'react-bootstrap/Spinner';

export default function Loading({ isLoading }) {
    return (
        <Modal show={isLoading}  centered contentClassName="loading-container">
            <Spinner animation="border" />
        </Modal>
  )
}
