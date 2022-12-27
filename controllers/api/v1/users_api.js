const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: 'Inavlid username/password'
            });
        }

        return res.status(200).json({
            message: 'Sign In successful, here is your token, please keep it safe!',
            data: {
                token: jwt.sign(user.toJSON(), 'spectrum', {expiresIn: 100000})
            }
        });
    }
    catch(err){
        console.log('********mesAPI', err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};