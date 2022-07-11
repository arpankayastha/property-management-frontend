import React from 'react'
import Swal from 'sweetalert2'

function DeleteConfirm(props) {
    const {title, text} = props;
    const onDelete = () => {
        Swal.fire({
            title: props.title,
            text: props.text,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: `Cancel`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              props.onConfirm();
            } else if (result.isDenied) {
              console.log('denied')
            }
        })
    }
    return (
        <a className="btn btn-primary waves-effect waves-light me-xl-2 mb-1"
             onClick={() => onDelete()}
        >
            <i className="fa fa-trash" />
        </a>
    )
}

export default DeleteConfirm
