import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react"

import {connect} from "react-redux"
// Reactstrap
import {Dropdown} from "reactstrap"

import {Link} from "react-router-dom"
// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
import logoSm from "../../assets/images/logo.png"
import logoLight from "../../assets/images/logo.png"
import {ToastContainer} from 'react-toastify';

// import images
// Redux Store
import {changeSidebarType, showRightSidebarAction, toggleLeftmenu,} from "../../store/actions"

const Header = props => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const [user, setuser] = useState()

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"))
            setuser(obj)
        }
    }, [])


    function toggleFullscreen() {
        if (
            !document.fullscreenElement &&
            /* alternative standard method */ !document.mozFullScreenElement &&
            !document.webkitFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen()
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(
                    Element.ALLOW_KEYBOARD_INPUT
                )
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            }
        }
    }

    function tToggle() {
        props.toggleLeftmenu(!props.leftMenu)
        if (props.leftSideBarType === "default") {
            props.changeSidebarType("condensed", isMobile)
        } else if (props.leftSideBarType === "condensed") {
            props.changeSidebarType("default", isMobile)
        }
        var body = document.body;
        body.classList.toggle("vertical-collpsed");
        body.classList.toggle("sidebar-enable");
    }

    return (
        <React.Fragment>
            <ToastContainer/>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <Link to="/" className="logo logo-light">
                                    <span className="logo-sm">
                                        <img src={logoSm} alt="" height="22"/>
                                    </span>
                                <span className="logo-lg">
                                        <img src={logoLight} alt="" height="20"/>
                                    </span>
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                tToggle()
                            }}
                            className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
                            id="vertical-menu-btn"
                        >
                            <i className="fa fa-fw fa-bars"/>
                        </button>
                    </div>

                    <div className="d-flex">
                        <Dropdown className="d-none d-lg-inline-block ms-1">
                            <button
                                type="button"
                                onClick={() => {
                                    toggleFullscreen()
                                }}
                                className="btn header-item noti-icon waves-effect"
                                data-toggle="fullscreen"
                            >
                                <i class="fas fa-expand-alt"></i>
                            </button>
                        </Dropdown>
                        <ProfileMenu/>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

Header.propTypes = {
    changeSidebarType: PropTypes.func,
    leftMenu: PropTypes.any,
    leftSideBarType: PropTypes.any,
    showRightSidebar: PropTypes.any,
    showRightSidebarAction: PropTypes.func,
    toggleLeftmenu: PropTypes.func
}

const mapStatetoProps = state => {
    const {
        layoutType,
        showRightSidebar,
        leftMenu,
        leftSideBarType,
    } = state.Layout
    return {layoutType, showRightSidebar, leftMenu, leftSideBarType}
}

export default connect(mapStatetoProps, {
    showRightSidebarAction,
    toggleLeftmenu,
    changeSidebarType,
})(Header)
