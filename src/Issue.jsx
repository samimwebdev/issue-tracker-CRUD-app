import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Badge,
  ProgressBar,
  Modal,
  Button,
  ToastContainer,
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FaEdit, FaTrashAlt, FaCheckSquare } from 'react-icons/fa'

const Issue = ({ issue, deleteIssue, completeIssue }) => {
  const {
    id,
    title,
    priority,
    status,
    endDate,
    completed,
    assignedTo,
    completedPercentage,
  } = issue

  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const handleClose = (evt) => {
    if (evt.target.dataset.action === 'delete') {
      deleteIssue(id)
      toast('Issue is deleted successfully')
    }
    setShowModal(false)
  }

  const modal = (
    <Modal show={showModal} onHide={handleClose} backdrop='static'>
      <Modal.Body>Are you sure you want to delete the Issue ?</Modal.Body>
      <Modal.Footer>
        <Button variant='danger' data-action='delete' onClick={handleClose}>
          Delete
        </Button>
        <Button variant='secondary' onClick={handleClose}>
          cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const lowClass = priority === 'low' ? 'primary' : ''
  const highClass = priority === 'high' ? 'danger' : ''
  const mediumClass = priority === 'medium' ? 'info' : ''
  const lowPercentageClass = completedPercentage < 30 ? 'danger' : ''
  const mediumPercentageClass =
    completedPercentage > 40 && completedPercentage <= 70 ? 'info' : ''
  const HighPercentageClass = completedPercentage > 70 ? 'success' : ''
  const result =
    status === 'completed' ? (
      <span style={{ textDecoration: 'line-through', color: 'red' }}>
        Completed
      </span>
    ) : (
      status
    )

  return (
    <>
      {showModal && modal}
      <tr key={id}>
        <td>{id}</td>
        <td>{title}</td>
        <td>
          <Badge bg={`${lowClass}${highClass}${mediumClass}`} pill>
            {priority}
          </Badge>
        </td>
        <td>{result}</td>
        <td> {endDate}</td>
        <td>{assignedTo}</td>
        <td>
          <ProgressBar
            variant={`${HighPercentageClass}${mediumPercentageClass}${lowPercentageClass}`}
            label={completedPercentage}
            now={completedPercentage}
            striped
            animated
          />
        </td>
        <td className='d-flex justify-content-between'>
          <FaEdit
            className='text-info'
            onClick={() => navigate(`/edit/${id}`)}
          />
          <FaCheckSquare
            onClick={() => completeIssue(id)}
            className='text-success'
          />
          <FaTrashAlt
            className='text-danger'
            onClick={() => setShowModal(true)}
          />
        </td>
      </tr>
    </>
  )
}

export default Issue
