import _ from 'lodash';
export default [
    {
        alias: 'registered_user',
        title: 'Registered User'
    },
    {
        alias: 'customer',
        title: 'Customer'
    },
    {
        alias: 'writer',
        title: 'Writer'
    },
    {
        alias: 'editor',
        title: 'Editor'
    },
    {
        alias: 'admin',
        title: 'Admin'
    },
    {
        alias: 'super_admin',
        title: 'Super Admin'
    }
];

export function findPermissionTitles(aliasArray, permissionArray){
    let matches = [];
    aliasArray.map((alias)=>{
        let perm = _.find(permissionArray,{alias: alias});
        if(perm){
            matches.push(perm.title);
        }
    })
    return matches;
}
