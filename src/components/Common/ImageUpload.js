import React, { useState } from "react"
import { Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap"
import Dropzone from "react-dropzone"
import { Link } from "react-router-dom"

const ImageUpload = (props) => {
    const [selectedFiles, setselectedFiles] = useState()
    const [imageUrl, setImageUrl] = useState(props.image)


    function handleAcceptedFiles(files) {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )
        setselectedFiles(files)
        props.getImageURL(files)
    }

    function handleAcceptedFiles(files) {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )
        setselectedFiles(files)

        let form_data = new FormData()
        form_data.append('type', props.type)
        form_data.append("file", files ? files[0] : "");


        const requestOptions = {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            body: form_data
        };
        fetch(process.env.REACT_APP_IMAGE_UPLOAD_API_ENDPOINT, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data && data.success) {
                    console.log(data)
                    props.getImageURL(data.data)
                    setImageUrl(data.data)
                }
            })
    }

    /**
     * Formats the size
     */
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title">{props.title}</h4>
                    <p className="card-title-desc">
                        {props.description}
                    </p>
                    <Row>
                        <Col xl={12}>
                            <div className="mb-3">
                                <Dropzone
                                    onDrop={acceptedFiles => {
                                        handleAcceptedFiles(acceptedFiles)
                                    }}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <div className="dropzone">
                                            <div
                                                className="dz-message needsclick"
                                                {...getRootProps()}
                                            >
                                                <input {...getInputProps()} />                                                
                                                <div className="mb-3">
                                                    <i className="display-4 text-muted uil uil-cloud-upload" />
                                                </div>
                                                <h4>Drop files here or click to upload.</h4>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                                <div className="dropzone-previews mt-3" id="file-previews">
                                    {selectedFiles && selectedFiles.map((f, i) => {
                                        return (
                                            <Card
                                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                key={i + "-file"}
                                            >
                                                <div className="p-2">
                                                    <Row className="align-items-center">
                                                        <Col className="col-auto">
                                                            <a className="pointer border border-2" variant="primary" onClick={handleShow}>
                                                                <img
                                                                    data-dz-thumbnail=""
                                                                    height="80"
                                                                    className="avatar-sm rounded bg-light"
                                                                    alt={f.name}
                                                                    src={f.preview}
                                                                />
                                                            </a>
                                                        </Col>
                                                        <Col>
                                                            <Link
                                                                to="#"
                                                                className="text-muted font-weight-bold"
                                                            >
                                                                {f.name}
                                                            </Link>
                                                            <p className="mb-0">
                                                                <strong>{f.formattedSize}</strong>
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>
                                        )
                                    })}
                                </div>
                                {imageUrl && !selectedFiles &&
                                    <div className="dropzone-previews mt-3" id="file-previews">

                                        <Card
                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                        >
                                            <div className="p-2">
                                                <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <a className="pointer border border-2" variant="primary" onClick={handleShow}>
                                                            <img
                                                                data-dz-thumbnail=""
                                                                height="80"
                                                                className="avatar-sm rounded bg-light"
                                                                alt={imageUrl}
                                                                src={imageUrl}
                                                            />
                                                        </a>
                                                    </Col>
                                                    <Col>
                                                        {/* <Link
                                                                                    to="#"
                                                                                    className="text-muted font-weight-bold"
                                                                                >
                                                                                    {f.name}
                                                                                </Link>
                                                                                <p className="mb-0">
                                                                                    <strong>{f.formattedSize}</strong>
                                                                                </p> */}
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Card>

                                    </div>
                                }
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Modal
                isOpen={show}
                backdrop="static"
                keyboard={false} toggle={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader className="justify-content-end">
                    <button
                        type="button"
                        className="btn-close fs-6"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                    ></button>
                </ModalHeader>
                <ModalBody className="overflow-hidden">
                    <img
                        data-dz-thumbnail=""
                        className="rounded bg-light w-100"
                        alt={imageUrl}
                        src={imageUrl}
                        title="expand"
                    />
                </ModalBody>
            </Modal>

        </React.Fragment >
    )
}

export default ImageUpload

