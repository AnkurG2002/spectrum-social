module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie('user_id', 25);
    return res.render('home', {
        title: 'Home'
    });

    // res.render('your ejs file', {variables which you want to send})
}

// module.exports.{action-name} = function(req, res){ -- };