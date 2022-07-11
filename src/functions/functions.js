export function checkPermissions(methods) {
    return true;
}

export function checkIsOrganizationStatus() {
    // console.log("user", JSON.parse(localStorage.getItem("authUser")))
    if (localStorage.getItem("authUser")) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
       return obj.isOrganizationMember
    }
    else {
        return false
    }
}


export const sortCaret = (order, column) => {
    if (!order) return (
        <span className="svg-icon svg-icon-sm svg-icon-primary ms-1 svg-icon-sort">
            <Sort />
        </span>
    );
    else if (order === "asc")
        return (
            <span className="svg-icon svg-icon-sm svg-icon-primary ms-1">
                <Up />
            </span>
        );
    else if (order === "desc")
        return (
            <span className="svg-icon svg-icon-sm svg-icon-primary ms-1">
                <Down />
            </span>
        );
    return null;
};



const Sort = () => (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <title>Stockholm-icons / Shopping / Sort1</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Stockholm-icons-/-Shopping-/-Sort1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect id="bound" x="0" y="0" width="24" height="24"></rect>
            <rect id="Rectangle-8" fill="#000000" x="4" y="5" width="16" height="3" rx="1.5"></rect>
            <path d="M7.5,11 L16.5,11 C17.3284271,11 18,11.6715729 18,12.5 C18,13.3284271 17.3284271,14 16.5,14 L7.5,14 C6.67157288,14 6,13.3284271 6,12.5 C6,11.6715729 6.67157288,11 7.5,11 Z M10.5,17 L13.5,17 C14.3284271,17 15,17.6715729 15,18.5 C15,19.3284271 14.3284271,20 13.5,20 L10.5,20 C9.67157288,20 9,19.3284271 9,18.5 C9,17.6715729 9.67157288,17 10.5,17 Z" id="Combined-Shape" fill="#000000" opacity="0.3"></path>
        </g>
    </svg>
)

const Up = () => (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <title>Stockholm-icons / Navigation / Up-2</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Stockholm-icons-/-Navigation-/-Up-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
            <rect id="Rectangle" fill="#000000" opacity="0.3" x="11" y="10" width="2" height="10" rx="1"></rect>
            <path d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z" id="Path-94" fill="#000000" fill-rule="nonzero"></path>
        </g>
    </svg>
)

const Down = () => (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <title>Stockholm-icons / Navigation / Down-2</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Stockholm-icons-/-Navigation-/-Down-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
            <rect id="Rectangle" fill="#000000" opacity="0.3" x="11" y="4" width="2" height="10" rx="1"></rect>
            <path d="M6.70710678,19.7071068 C6.31658249,20.0976311 5.68341751,20.0976311 5.29289322,19.7071068 C4.90236893,19.3165825 4.90236893,18.6834175 5.29289322,18.2928932 L11.2928932,12.2928932 C11.6714722,11.9143143 12.2810586,11.9010687 12.6757246,12.2628459 L18.6757246,17.7628459 C19.0828436,18.1360383 19.1103465,18.7686056 18.7371541,19.1757246 C18.3639617,19.5828436 17.7313944,19.6103465 17.3242754,19.2371541 L12.0300757,14.3841378 L6.70710678,19.7071068 Z" id="Path-94" fill="#000000" fill-rule="nonzero" transform="translate(12.000003, 15.999999) scale(1, -1) translate(-12.000003, -15.999999) "></path>
        </g>
    </svg>
)
export const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };