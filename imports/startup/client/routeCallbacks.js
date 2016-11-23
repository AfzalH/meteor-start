import Auth from '../../../imports/auth';

export function routeRequireSuperAdmin(nextState, replace) {
    if (!Auth.isSuperAdmin()) {
        replace({
            pathname: '/account',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}