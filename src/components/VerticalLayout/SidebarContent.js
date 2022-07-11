import PropTypes from "prop-types"
import React, {useCallback, useEffect, useRef} from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import {Link, withRouter} from "react-router-dom"

const SidebarContent = props => {
    // const [loginUser, setLoginUser] = useState()

    // React.useEffect(() => {
    //     console.log("authUser")
    //     if (localStorage.getItem("authUser")) {
    //         const obj = JSON.parse(localStorage.getItem("authUser"))
    //         setLoginUser(obj)
    //     }
    // }, [])
    const ref = useRef();

    const activateParentDropdown = useCallback((item) => {
        item.classList.add("active")
        const parent = item.parentElement
        const parent2El = parent.childNodes[1]
        if (parent2El && parent2El.id !== "side-menu") {
            parent2El.classList.add("mm-show")
        }

        if (parent) {
            parent.classList.add("mm-active")
            const parent2 = parent.parentElement

            if (parent2) {
                parent2.classList.add("mm-show") // ul tag

                const parent3 = parent2.parentElement // li tag

                if (parent3) {
                    parent3.classList.add("mm-active") // li
                    parent3.childNodes[0].classList.add("mm-active") //a
                    const parent4 = parent3.parentElement // ul
                    if (parent4) {
                        parent4.classList.add("mm-show") // ul
                        const parent5 = parent4.parentElement
                        if (parent5) {
                            parent5.classList.add("mm-show") // li
                            parent5.childNodes[0].classList.add("mm-active") // a tag
                        }
                    }
                }
            }
            scrollElement(item);
            return false
        }
        scrollElement(item);
        return false
    }, []);

    // Use ComponentDidMount and ComponentDidUpdate method symultaniously
    useEffect(() => {
        const pathName = props.location.pathname

        new MetisMenu("#side-menu")
        let matchingMenuItem = null
        const ul = document.getElementById("side-menu")
        const items = ul.getElementsByTagName("a")
        for (let i = 0; i < items.length; ++i) {
            if (pathName === items[i].pathname) {
                matchingMenuItem = items[i]
                break
            }
            // console.log(pathName)
            // console.log(items[i].pathname)

            // if (pathName.search(items[i].pathname)) {
            //     matchingMenuItem = items[i]
            //     break
            // }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }

    }, [props.location.pathname, activateParentDropdown])

    useEffect(() => {
        ref.current.recalculate()
    })

    function scrollElement(item) {
        if (item) {
            const currentPosition = item.offsetTop
            if (currentPosition > window.innerHeight) {
                ref.current.getScrollElement().scrollTop = currentPosition - 300
            }
        }
    }

    // function checkPermissionsStatus (){
    //     if (loginUser && !loginUser.isOrganizationMember) {
    //         return true
    //     }
    //     return false
    // }

    return (
        <React.Fragment>
            <SimpleBar style={{maxHeight: "100%"}} ref={ref} className="sidebar-menu-scroll">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li>
                            <Link to="/#" className="waves-effect">
                                <i className="uil-home-alt"/>
                                <span> Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user" className="waves-effect">
                                <i className="uil-users-alt"/>
                                <span> Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/property" className="waves-effect">
                                <i className="uil-users-alt"/>
                                <span> Property</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/lock" className="waves-effect">
                                <i className="uil-users-alt"/>
                                <span> Locks History</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </SimpleBar>
        </React.Fragment>
    )
}

SidebarContent.propTypes = {
    location: PropTypes.object
}

export default withRouter(SidebarContent)