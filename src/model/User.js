const {Schema,model} = require("mongoose");
const bycrypt = require("bcryptjs");

const userSchema = new Schema ({
    username: String,
    email: String,
    password: String
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bycrypt.genSalt();
    return bycrypt.hash(password, salt);
}

userSchema.methods.validatePassword = async function(password){
    return bycrypt.compare(password, this.password);
}

module.exports=model('User', userSchema);