import { Component } from "react";
import Modal from 'react-modal';

class welcome extends Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <Modal
        // {/* <ReactModal  */}
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </Modal>
      </div>
    );
  }
}

export default welcome;