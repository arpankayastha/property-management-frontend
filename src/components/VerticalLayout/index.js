import PropTypes from 'prop-types'
import React, {Component} from "react"

import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {
    changeLayout,
    changeLayoutWidth,
    changeSidebarTheme,
    changeSidebarType,
    changeTopbarTheme,
} from "../../store/actions"

import Header from "./Header"
import Sidebar from "./Sidebar"
import Rightbar from "../CommonForBoth/Rightbar"


class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
        }
        this.toggleMenuCallback = this.toggleMenuCallback.bind(this)
    }

    capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2)
    }

    getOrganizationDetail = () => {
        let organizationData = localStorage.getItem('ido');
        let organizationName = 'Service';
        let organizationICOFile = null;
        if (organizationData) {
            let org = JSON.parse(atob(organizationData));
            if (org) {
                organizationName = org.name;
                organizationICOFile = org.picture;
            }
        }

        return {
            organizationName,
            organizationICOFile
        }
    };

    componentDidMount() {


        if (this.props.isPreloader === true) {
            document.getElementById("preloader").style.display = "block"
            document.getElementById("status").style.display = "block"

            setTimeout(function () {
                document.getElementById("preloader").style.display = "none"
                document.getElementById("status").style.display = "none"
            }, 2500)
        } else {
            document.getElementById("preloader").style.display = "none"
            document.getElementById("status").style.display = "none"
        }


        // Scroll Top to 0
        window.scrollTo(0, 0)
        // let currentage = this.capitalizeFirstLetter(this.props.location.pathname)
        let moduleName = this.props.location.pathname.split('/')[1];
        let currentPage = this.capitalizeFirstLetter(" " + moduleName);
        let {organizationName, organizationICOFile} = this.getOrganizationDetail();

        if (!organizationICOFile) {
            let link = document.querySelector('link[rel="shortcut icon"]') ||
                document.querySelector('link[rel="icon"]');

            if (!link) {
                link = document.createElement('link');
                link.id = 'favicon';
                link.rel = 'shortcut icon';
                document.head.appendChild(link);
            }

            link.href = organizationICOFile;
        }

        document.title = currentPage + " | " + organizationName + " Admin Dashboard";

        if (this.props.leftSideBarTheme) {
            this.props.changeSidebarTheme(this.props.leftSideBarTheme)
        }

        if (this.props.layoutWidth) {
            this.props.changeLayoutWidth(this.props.layoutWidth)
        }

        if (this.props.leftSideBarType) {
            this.props.changeSidebarType(this.props.leftSideBarType)
        }
        if (this.props.topbarTheme) {
            this.props.changeTopbarTheme(this.props.topbarTheme)
        }
    }

    toggleMenuCallback = () => {
        if (this.props.leftSideBarType === "default") {
            this.props.changeSidebarType("condensed", this.state.isMobile)
        } else if (this.props.leftSideBarType === "condensed") {
            this.props.changeSidebarType("default", this.state.isMobile)
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="preloader">
                    <div id="status">
                        <div className="spinner">
                            <i className="uil-shutter-alt spin-icon"></i>
                        </div>
                    </div>
                </div>
                <div id="layout-wrapper">
                    <Header toggleMenuCallback={this.toggleMenuCallback}/>
                    <Sidebar
                        theme={this.props.leftSideBarTheme}
                        type={this.props.leftSideBarType}
                        isMobile={this.state.isMobile}
                    />
                    <div className="main-content">{this.props.children}</div>
                    {/* <Footer /> */}
                </div>
                {this.props.showRightSidebar ? <Rightbar/> : null}
            </React.Fragment>
        )
    }
}

Layout.propTypes = {
    changeLayoutWidth: PropTypes.func,
    changeSidebarTheme: PropTypes.func,
    changeSidebarType: PropTypes.func,
    changeTopbarTheme: PropTypes.func,
    children: PropTypes.object,
    isPreloader: PropTypes.any,
    layoutWidth: PropTypes.any,
    leftSideBarTheme: PropTypes.any,
    leftSideBarType: PropTypes.any,
    location: PropTypes.object,
    showRightSidebar: PropTypes.any,
    topbarTheme: PropTypes.any,

}

const mapStatetoProps = state => {
    return {
        ...state.Layout,
    }
}
export default connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeTopbarTheme,
    changeLayoutWidth
})(withRouter(Layout))
