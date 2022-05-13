const Model = require('../../core/model');

class User extends Model {
    constructor(){
        super('users');
    }
}

module.exports = User;