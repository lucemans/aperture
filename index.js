#!/bin/env node
const { join } = require('path');
const { readFileSync } = require('node:fs');
const { hostname, uptime, userInfo } = require('os');

let banner = readFileSync(join(__dirname, './banners/raw_banner10'), 'utf8');
banner = banner.trim();
const date = new Date();
banner = banner.replace('/DATE/'.padEnd(20), `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`.padEnd(20));
banner = banner.replace('/HOST/'.padEnd(20), `${hostname()}`.padEnd(20));

const timeToTime = (time) => {
    var sec_num = time; // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours}
    if (minutes < 10) {minutes = "0"+minutes}
    if (seconds < 10) {seconds = "0"+seconds}
    return `${hours} hrs ${minutes} mins ${Math.round(seconds)} secs`;
}

banner = banner.replace('/UPTIME/'.padEnd(40), `${timeToTime(uptime())}`.padEnd(40));
banner = banner.replace('/USER/'.padEnd(20), `${userInfo({}).username}`.padEnd(20));
console.clear();
console.log(banner);