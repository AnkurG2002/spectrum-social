module.exports.home = function(req, res){
    return res.render('home', {
        title: 'Home'
    });

    // res.render('your ejs file', {variables which you want to send})
}

// module.exports.{action-name} = function(req, res){ -- };