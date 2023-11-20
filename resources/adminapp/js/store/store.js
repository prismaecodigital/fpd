import Vue from 'vue'
import Vuex from 'vuex'

import Alert from './modules/alert'
import I18NStore from './modules/i18n'

import PermissionsIndex from './cruds/Permissions'
import PermissionsSingle from './cruds/Permissions/single'
import RolesIndex from './cruds/Roles'
import RolesSingle from './cruds/Roles/single'
import UsersIndex from './cruds/Users'
import UsersSingle from './cruds/Users/single'
import BusIndex from './cruds/Bus'
import BusSingle from './cruds/Bus/single'
import DeptsIndex from './cruds/Depts'
import DeptsSingle from './cruds/Depts/single'
import ProfileSingle from './cruds/Profile/single'
import SitesIndex from './cruds/Sites'
import SitesSingle from './cruds/Sites/single'
import AccountsIndex from './cruds/Accounts'
import AccountsSingle from './cruds/Accounts/single'
import FpdsIndex from './cruds/Fpds'
import FpdsSingle from './cruds/Fpds/single'
import FpdProcessesIndex from './cruds/FpdProcesses'
import FpdProcessesSingle from './cruds/FpdProcesses/single'
import LrdsIndex from './cruds/Lrds'
import LrdsSingle from './cruds/Lrds/single'
import FpdDonesIndex from './cruds/FpdDones'
import FpdDonesSingle from './cruds/FpdDones/single'
import CalendarIndex from './cruds/Calendar/index'

import AuthBu from './modules/AuthBu'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Alert,
    I18NStore,
    PermissionsIndex,
    PermissionsSingle,
    RolesIndex,
    RolesSingle,
    UsersIndex,
    UsersSingle,
    BusIndex,
    BusSingle,
    DeptsIndex,
    DeptsSingle,
    ProfileSingle,
    SitesIndex,
    SitesSingle,
    AccountsIndex,
    AccountsSingle,
    FpdsIndex,
    FpdsSingle,
    FpdDonesIndex,
    FpdDonesSingle,
    CalendarIndex,
    FpdProcessesIndex,
    FpdProcessesSingle,
    LrdsIndex,
    LrdsSingle,
    AuthBu
  },
  strict: debug
})