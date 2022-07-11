import React, { useState } from "react"
import { Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody, Input, ModalTitle } from "reactstrap"
import Dropzone from "react-dropzone"
import { Link } from "react-router-dom"
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from "./cropper"

const ImageCropUpload = (props) => {
    const [selectedFiles, setselectedFiles] = useState()
    const [selectedImage, setselectedImage] = useState("")
    const [imageUrl, setImageUrl] = useState(null)
    const [savebtn, setSaveBtn] = useState(false)

    // function handleAcceptedFiles(files) {
    //     files.map(file =>
    //         Object.assign(file, {
    //             preview: URL.createObjectURL(file),
    //             formattedSize: formatBytes(file.size),
    //         })
    //     )
    //     setselectedFiles(files)
    //     props.getImageURL(files)
    // }

    function handleAcceptedFiles(files) {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )
        setselectedFiles(files)

        // let form_data = new FormData()
        // form_data.append('type', props.type)
        // form_data.append("file", selectedImage);


        // const requestOptions = {
        //     method: 'POST',
        //     // headers: { 'Content-Type': 'application/json' },
        //     body: form_data
        // };
        // fetch(process.env.REACT_APP_IMAGE_UPLOAD_API_ENDPOINT, requestOptions)
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data && data.success) {
        //             console.log(data)
        //             props.getImageURL(data.data)
        //             setResult(data.data)
        //         }
        //     })
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


    const [open, setOpen] = useState(false);

    const handleOff = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    // ********CROP IMAGE*************//
    const [src, selectFile] = useState(null)

    const handleFileChange = e => {
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }
    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 17 / 13 });
    const [result, setResult] = useState(props.image)



    function dataURLtoFile(url) {
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "File name", { type: "image/png" })

                let form_data = new FormData()
                form_data.append('type', props.type)
                form_data.append("file", file);
                const requestOptions = {
                    method: 'POST',
                    // headers: { 'Content-Type': 'application/json' },
                    body: form_data
                };
                fetch(process.env.REACT_APP_IMAGE_UPLOAD_API_ENDPOINT, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.success) {
                            props.getImageURL(data.data)
                            setResult(data.data)
                        }
                    })

            })
    }


    function getCroppedImg() {
        setSaveBtn(true)
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;



        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        // New lines to be added
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        const base64Image = canvas.toDataURL("image/png", 0.95);
        setResult(base64Image)
        console.log(base64Image)
        dataURLtoFile(base64Image);
    }

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
                                                <div {...getInputProps()} onClick={handleShow}></div>
                                                <div className="mb-3">
                                                    <i className="display-4 text-muted uil uil-cloud-upload" />
                                                </div>
                                                <h4>Select File to Upload</h4>
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
                                {result && !selectedFiles &&
                                    <div className="dropzone-previews mt-3" id="file-previews">

                                        <Card
                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                        >
                                            <div className="p-2">
                                                <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <a className="pointer border border-2" variant="primary" onClick={handleOpen}>
                                                            <img
                                                                data-dz-thumbnail=""
                                                                height="80"
                                                                className="avatar-sm rounded bg-light"
                                                                alt={result}
                                                                src={result}
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

            {/********* * CROP IMAGE MODAL ********** */}
            <Modal
                isOpen={show}
                backdrop="static"
                keyboard={false} toggle={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
            >
                <ModalHeader className="justify-content-end">
                    <button
                        type="button"
                        className="btn-close fs-6 justify-content-end"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                    ></button>
                </ModalHeader>
                <ModalBody className="overflow-hidden">
                    <Col xl={12}>
                        <Input className="mb-4" type='file' accept='image/*' onChange={handleFileChange}> </Input>
                    </Col>
                    <Row className="d-flex align-items-center">
                        {imageUrl &&
                            <Col xl={6}>
                                <ReactCrop className="me-3" src={imageUrl} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
                            </Col>
                        }
                        {result &&
                            <Col xl={6}>
                                <div className="h-100">
                                    <img src={result} alt='Cropped Image' className='img-fluid' />
                                </div>
                            </Col>
                        }
                    </Row>
                    <Row>
                        <Col xl={6}>
                            <button className='btn btn-primary me-2' onClick={getCroppedImg}>Done</button>
                        </Col>
                        {savebtn &&
                            <Col xl={6}>
                                <button className='btn btn-success'
                                    onDrop={acceptedFiles => {
                                        handleAcceptedFiles(acceptedFiles)
                                    }}
                                    onClick={handleClose} >Save</button>
                            </Col>
                        }
                    </Row>
                </ModalBody>
            </Modal>

            {/* ZOOM IMAGE MODAL */}
            <Modal
                isOpen={open}
                backdrop="static"
                keyboard={false} toggle={handleOff}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
            >
                <ModalHeader className="justify-content-end">
                    <button
                        type="button"
                        className="btn-close fs-6"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={handleOff}
                    ></button>
                </ModalHeader>
                <ModalBody className="overflow-hidden">
                    <img
                        data-dz-thumbnail=""
                        className="rounded bg-light"
                        alt={result}
                        src={result}
                        title="expand"
                    />
                </ModalBody>
            </Modal>
        </React.Fragment >
    )
}

export default ImageCropUpload

