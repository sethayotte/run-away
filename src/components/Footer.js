import React from 'react'
import Modal from 'react-modal'

import {Icon} from 'react-icons-kit'
import {ic_help} from 'react-icons-kit/md/ic_help'
import {ic_cancel} from 'react-icons-kit/md/ic_cancel'
import {ic_public} from 'react-icons-kit/md/ic_public'

import RunAwayLogo from '../assets/RunAwayLogo.png'

const customStyles = {
  content: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    transform: 'translate(-45%, -45%)',
    minWidth: '300px',
    border: 'none',
    backgroundColor: '#f3f3f3',
    borderRadius: '15px',
  },
}

const Footer = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const openModal = () => {
    setIsOpen(true)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className='footer'>
      <a className='helpLink' onClick={openModal}>
        <Icon className='helpIcon' size={45} icon={ic_help} />
      </a>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='aboutModalControls'>
          <a onClick={closeModal}>
            <Icon className='closeIcon' size={30} icon={ic_cancel} />
          </a>
        </div>
        <div className='aboutCopy'>
          <h1 className='aboutHeader'>About Run Away</h1>
          <p className='aboutBody'>
            Run Away is a project designed & built by Seth Mitchell & DeVonta
            Johnson. <br />
            <br />
            Currenly v1.0, this app enables travel inspiration. Click{' '}
            <strong>'Let's Go'</strong>, enter in your departure destination,
            and you will be presented with dates, destination & a fare. <br />{' '}
            <br />
            We're currenly working to add the ability to link out directly to an
            airline's website, check back soon! <br />
          </p>
          <p className='bodyIcon'>
            <Icon size={32} icon={ic_public} />
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default Footer
