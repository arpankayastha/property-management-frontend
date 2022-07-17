import React from "react"
import {Redirect} from "react-router-dom"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Pages
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"

// Forms
import BasicElements from "../pages/Forms/BasicElements"
import FormLayouts from "../pages/Forms/FormLayouts"
import FormAdvanced from "../pages/Forms/FormAdvanced"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormMask from "../pages/Forms/FormMask"
import FormRepeater from "../pages/Forms/FormRepeater"
import FormUpload from "../pages/Forms/FormUpload"
import FormWizard from "../pages/Forms/FormWizard"
import FormXeditable from "../pages/Forms/FormXeditable"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiColors from "../pages/Ui/UiColors"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGeneral from "../pages/Ui/UiGeneral"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiSweetAlert from "../pages/Ui/UiSweetAlert"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiRating from "../pages/Ui/UiRating"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"
import UiNotifications from "../pages/Ui/ui-notifications"
import UiImageCropper from "../pages/Ui/ui-image-cropper"
import UserProfile from "../pages/Authentication/user-profile"
import ChangePassword from "../pages/Authentication/change-password"

//User
import User from "../pages/User/User"
import CreateUser from "../pages/User/CreateUser"
import UserDetail from "../pages/User/UserDetail"

//User
import Lock from "../pages/Lock/Lock"
// import CreateUser from "../pages/User/CreateUser"
import LockUsageList from "../pages/Lock/LockUsageList"

//Hotel
import Hotel from "../pages/Hotel/Hotel";
import CreateHotel from "../pages/Hotel/CreateHotel";
import HotelDetail from "../pages/Hotel/HotelDetail";

//Property
import Property from "../pages/Property/Property";
import CreateProperty from "../pages/Property/CreateProperty";
import PropertyDetail from "../pages/Property/PropertyDetail";

//Manual Lock Access
import CreateLockAccess from "../pages/ManualLockAccess/CreateLockAccess";

const userRoutes = [
    {path: "/dashboard", component: Dashboard},

    // User
    {path: "/user", component: User},
    {path: "/user/create", component: CreateUser},
    {path: "/user/:userId/edit", component: CreateUser},
    {path: "/user/:userId/general", component: UserDetail},

    // Hotel
    {path: "/hotel", component: Hotel},
    {path: "/hotel/create", component: CreateHotel},
    {path: "/hotel/:hotelId/edit", component: CreateHotel},
    {path: "/hotel/:hotelId/general", component: HotelDetail},


    // Property
    {path: "/property", component: Property},
    {path: "/property/create", component: CreateProperty},
    {path: "/property/:propertyId/edit", component: CreateProperty},
    {path: "/property/:propertyId/general", component: PropertyDetail},

    // Lock
    {path: "/lock", component: Lock},
    {path: "/lock/:lockId/general", component: LockUsageList},

    //manual-lock
    {path: "/manual-lock", component: CreateLockAccess},

    // Forms
    {path: "/basic-elements", component: BasicElements},
    {path: "/form-layouts", component: FormLayouts},
    {path: "/form-advanced", component: FormAdvanced},
    {path: "/form-editors", component: FormEditors},
    {path: "/form-mask", component: FormMask},
    {path: "/form-repeater", component: FormRepeater},
    {path: "/form-uploads", component: FormUpload},
    {path: "/form-wizard", component: FormWizard},
    {path: "/form-validation", component: FormValidations},
    {path: "/form-xeditable", component: FormXeditable},

    // //profile
    {path: "/profile", component: UserProfile},
    {path: "/change-password", component: ChangePassword},

    // this route should be at the end of all other routes
    {path: "/", exact: true, component: () => <Redirect to="/dashboard"/>},
]

const authRoutes = [

    {path: "/logout", component: Logout},
    {path: "/login", component: Login},

    {path: "/pages-maintenance", component: PagesMaintenance},
    {path: "/pages-comingsoon", component: PagesComingsoon},
    {path: "/pages-404", component: Pages404},
    {path: "/pages-500", component: Pages500},

    // Authentication Inner
    {path: "/pages-login", component: Login1},
    {path: "/pages-register", component: Register1},
    {path: "/page-recoverpw", component: Recoverpw},
    {path: "/auth-lock-screen", component: LockScreen},

    // Ui
    {path: "/ui-alerts", component: UiAlert},
    {path: "/ui-buttons", component: UiButtons},
    {path: "/ui-cards", component: UiCards},
    {path: "/ui-carousel", component: UiCarousel},
    {path: "/ui-colors", component: UiColors},
    {path: "/ui-dropdowns", component: UiDropdown},
    {path: "/ui-general", component: UiGeneral},
    {path: "/ui-grid", component: UiGrid},
    {path: "/ui-images", component: UiImages},
    {path: "/ui-lightbox", component: UiLightbox},
    {path: "/ui-modals", component: UiModal},
    {path: "/ui-progressbars", component: UiProgressbar},
    {path: "/ui-sweet-alert", component: UiSweetAlert},
    {path: "/ui-tabs-accordions", component: UiTabsAccordions},
    {path: "/ui-typography", component: UiTypography},
    {path: "/ui-video", component: UiVideo},
    {path: "/ui-session-timeout", component: UiSessionTimeout},
    {path: "/ui-rating", component: UiRating},
    {path: "/ui-rangeslider", component: UiRangeSlider},
    {path: "/ui-notifications", component: UiNotifications},
    {path: "/ui-image-cropper", component: UiImageCropper},
]

export {userRoutes, authRoutes}