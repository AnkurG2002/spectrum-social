const Post = require("../models/post");
const User = require('../models/user');

module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);


    try{
        // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({});
    
        return res.render('home', {
            title: 'Spectrum | Home',
            posts: posts,
            all_users: users
        });
    }
    catch(err){
        console.log('Error', err);
        return;
    }

    // res.render('your ejs file', {variables which you want to send})
}

// module.exports.{action-name} = function(req, res){ -- };