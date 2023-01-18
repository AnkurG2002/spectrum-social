const kue = require('kue');
const queue = kue.createQueue();

module.exports = queue;

/*
    to start redis server ->
    1. type ubuntu in terminal. linux cli will open.
    2. then type `sudo service redis-server start`
    3. then type password.
    4. server will start.
*/

/*  If still there are error ->

    If you are using Windows. You should try restarting Windows NAT Driver service.

    Open Command Prompt as Administrator and run `net stop winnat`
    the, `net start winnat`
    That's it.

    It's happening because I installed Nord VPN and it was auto staring with windows.
*/