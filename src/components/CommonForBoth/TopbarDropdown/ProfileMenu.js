import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Dropdown, DropdownMenu, DropdownToggle} from "reactstrap";

// Redux
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

const ProfileMenu = props => {
    const [menu, setMenu] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setUser(obj);
        }
    }, [])

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    }

    return (
        <React.Fragment>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="d-inline-block"
            >
                <DropdownToggle
                    className="btn header-item waves-effect"
                    id="page-header-user-dropdown"
                    tag="button"
                >
                    <div className="avatar-xs d-inline-block">
              <span className="avatar-title bg-secondary rounded-circle">
                  <i className="uil-user fs-5"/>
              </span>
                    </div>
                    {/* <img className="rounded-circle header-profile-user" src={user4} alt="Header Avatar"/> */}
                    <span
                        className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{user && user.name}</span>{" "}
                    <i className="uil-angle-down d-none d-xl-inline-block font-size-15"/>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h5 className="ms-4 mt-2 mb-1">{user ? user?.email : ''}</h5>
                    <a onClick={logout} className="dropdown-item pointer">
                        <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"/>
                        <a className="text-muted">{"Logout"}</a>
                    </a>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    )
}

ProfileMenu.propTypes = {
    success: PropTypes.any,
}

const mapStatetoProps = state => {
    const {error, success} = state.Profile
    return {error, success}
}

export default withRouter(
    connect(mapStatetoProps, {})(ProfileMenu)
)
