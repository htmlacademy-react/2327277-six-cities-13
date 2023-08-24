import { NameSpace, AuthorizationStatus } from '../../../const';
import { State } from '../../../types/state';
import { UserData } from '../../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getUserInfo = (state: State): UserData | null => state[NameSpace.User].setUserInfo;
