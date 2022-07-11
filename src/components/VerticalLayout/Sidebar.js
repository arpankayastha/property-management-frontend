import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"

import SidebarContent from "./SidebarContent"

import logoSm from "../../assets/images/logo.png"

const Sidebar = props => {
    function tToggle() {
        var body = document.body;
        body.classList.toggle("vertical-collpsed");
        body.classList.toggle("sidebar-enable");
    }

    return (
        <React.Fragment>
            <div className="vertical-menu">
                <div className="navbar-brand-box">
                    <Link to="/" className="logo logo-light text-center">
                        <span className="logo-sm">
                            <img src={logoSm} alt="" height="30"/>
                        </span>
                        <span className="logo-lg me-3">
                            <img src={logoSm} alt="" height="50"/>
                        </span>
                    </Link>

                </div>
                <div data-simplebar>
                    {props.type !== "condensed" ? <SidebarContent/> : <SidebarContent/>}
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
        </React.Fragment>
    )
}

Sidebar.propTypes = {
    type: PropTypes.string,
}

const mapStatetoProps = state => {
    return {
        layout: state.Layout,
    }
}
export default connect(
    mapStatetoProps,
    {}
)(withRouter(Sidebar))