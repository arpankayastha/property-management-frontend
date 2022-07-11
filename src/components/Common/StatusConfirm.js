import React from 'react'
import Swal from 'sweetalert2'

function CheckStatusList(props) {
    const { title, text, active } = props;
    const onCheckStatus = () => {
        Swal.fire({
            title: props.title,
            text: props.text,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: `Cancel`,
        }).then((result) => {
            console.log(result)
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                props.onConfirm();
            } else if (result.isDenied) {
                console.log('denied')
            }
        })
    }
    return (
        <div class="form-check form-switch d-flex justify-content-center">
            <input class="form-check-input" type="checkbox" role="switch" checked={active}  onClick={() => onCheckStatus()}></input>
        </div>
    )
}

export default CheckStatusList
