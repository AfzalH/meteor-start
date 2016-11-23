export default class Auth {
    static isLoggedIn() {
        return Meteor.userId();
    }

    static isSuperAdmin() {
        if (!this.isLoggedIn) return false;
        return Roles.userIsInRole(Meteor.userId(), ['super_admin']);
    }

    static isAdmin() {
        if (!this.isLoggedIn) return false;
        return Roles.userIsInRole(Meteor.userId(), ['admin']);
    }

    static isCustomer() {
        if (!this.isLoggedIn) return false;
        return Roles.userIsInRole(Meteor.userId(), ['customer']);
    }

    static isEditor() {
        if (!this.isLoggedIn) return false;
        return Roles.userIsInRole(Meteor.userId(), ['editor']);
    }

    static isWriter() {
        if (!this.isLoggedIn) return false;
        return Roles.userIsInRole(Meteor.userId(), ['writer']);
    }

}
