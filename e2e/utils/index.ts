export {
  URLValidationParams,
  validatePageURL,
  navigateWithRouterLink,
  assertCurrentRouteNavLinkActive,
  RouterLinkParams,
} from "./commons.utils"

export {
  isSignIn,
  isSignOut,
  signIn,
  signOut,
  PageInfo,
} from "./auth.utils"

export {
  checkAppareilStyles,
  TurnOnOffParams,
  isTurnOn,
  isTurnOff,
  ToggleAppareilStatusParams,
  toggleAppareilStatus,
  CheckDetailsLinkFunctionalityParams,
  checkDetailsLinkFunctionality,
} from "./home.utils"

export {
  isAppareilDetailsPageParams,
  isAppareilDetailsPage,
} from "./appareilDetails.utils"

export {
  AddAppareilParams,
  addAppareil,
} from "./newAppareil.utils"