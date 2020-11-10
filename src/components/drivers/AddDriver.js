import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Modal } from '../reusable/modal/Modal';
import AddDriverForm from './AddDriverForm';
import { addModal } from '../../redux/actions/modal';
const AddDriver = (props) => {
    const { add, addModal } = props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(add);
    }, [setVisible, add]);

    const dismiss = () => {
        addModal(false);
    }

    return (
        <>
            <Modal
                header="Add New Driver"
                visible={visible}
                dismiss={dismiss}
                children={<AddDriverForm addModal={addModal} />}
            />
        </>
    )
}

//const mapStateToProps = state => ({
  //  add: state.modal.add
//})

//export default connect(
 //   mapStateToProps,
   // { addModal }
//)(AddDriver);
export default AddDriver;