import {AccessControl} from "accesscontrol";
export const VALID_ROLES = ["USER", "MODERATOR", "ADMIN", "SUPERVISOR"];
const accessControl = new AccessControl();

accessControl.grant("USER")
    .readAny('student');
accessControl.grant("MODERATOR")
    .extend("USER")
    .updateAny('student');
accessControl.grant("ADMIN")
    .extend("MODERATOR")
    .deleteAny('student')
    .createAny('student')
    .updateAny('user');
accessControl.grant("SUPERVISOR")
    .extend('ADMIN')
    .createAny('user');
export default accessControl;