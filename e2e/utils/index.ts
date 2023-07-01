export {
  URLValidationParams,
  validatePageURL,
  navigateWithRouterLink,
  assertCurrentRouteNavLinkActive,
  RouterLinkParams,
  fillInput,
  getAppareil,
  getAppareilByIndex,
  getAppareilNameText,
} from './commons.utils';

export { isSignIn, isSignOut, signIn, signOut, PageInfo } from './auth.utils';

export {
  checkAppareilStyles,
  ToggleAppareilStatusParams,
  toggleAppareilStatus,
  CheckDetailsLinkFunctionalityParams,
  checkDetailsLinkFunctionality,
  CheckAppareilStatusParams,
  CheckAppareilInfo,
  checkAppareilStatus,
} from './home.utils';

export {
  isAppareilDetailsPageParams,
  isAppareilDetailsPage,
  goToDetailsPage,
  AppareilDetailsPageParamsWithoutStatus,
} from './appareilDetails.utils';

export { AddAppareilParams, addAppareil } from './newAppareil.utils';

export { fillSignUpForm, clickSignUpBtn } from './sign-up.utils';
