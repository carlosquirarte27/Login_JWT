const Model = require('../../core/model');

class Login extends Model {
    constructor(){
        super('users');
    }
}

module.exports = Login;