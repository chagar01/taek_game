/***

MIT License

Copyright (c) 2018 Charles Garcia-Tobin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

var taek_data = [
    {	"name" : "white", 
	"kup" : "10th",
	"col" : ['#FFFFFF','#FFFFFF','#FFFFFF'],
	"words" : [
	    { "Training Hall" : [ "Dojang" ] },
	    { "Training Suit" : ["Dobok"] },
	    { "Instructor" : ["Sabum"] },
	    { "Belt" : ["Ti"] },
	    { "Student" : ["Jeja"] },
	    { "Inner" : ["An"] },
	    { "Outer" : ["Batak"] },
	    { "Press Ups" : ["Momtong Bachia"] },
	    { "Attention" : ["Charyot"] },
	    { "Bow" : ["Kyong-Yee"] },
	    { "Ready" : ["Chunbi"] },
	    { "Start" : ["Si-jak"] },
	    { "Stop" : ["Goman"] },
	    { "Return To\nReady Stance" : ["Barrol"] },
	    { "Dismiss" : ["Haessan"] },
	    { "Forward" : ["Apro Kaggi"] },
	    { "Backward" : ["Dwiyro Kaggi"] },
	    { "About Turn" : ["Dwiyro Torro"] },
	    { "One" : ["Hanna"] },
	    { "Two" : ["Dool"] },
	    { "Three" : ["Set"] },
	    { "Four" : ["Net"] },
	    { "Five" : ["Dasaul"] },
	    { "Six" : ["Yosaul"] },
	    { "Seven" : ["Ilgop"] },
	    { "Eight" : ["Yodoll"] },
	    { "Nine" : ["Ahop"] },
	    { "Ten" : ["Yoll"] },
	    { "Low" : ["Najunde"] },
	    { "Middle" : ["Kaunde"] },
	    { "High" : ["Nopude"] },
	    { "Forfist" : ["Ap Joomuk"] },
	    { "Forearm" : ["Palmok"] },
	    { "Inner Forearm" : ["An Palmok"] },
	    { "Outer Forearm" : ["Batak Palmok"] },
	    { "Attention Stance" : ["Charyot Sogi"] },
	    { "Parallel Stance" : ["Narani Sogi"] },
	    { "Sitting Stance" : ["Annun Sogi"] },
	    { "Walking Stance" : ["Gunning Sogi"] },
	    { "Inner Forearm block" : ["An Palmok\nMagki"] },
	    { "Outer Forearm block" : ["Batak Palmok\n Makgi"] },
	    { "Front Rising Kick" : ["Ap Cha Olligi"] },
	    { "Side Rising Kick" : ["Yop Cha Olligi"] },
	    { "Obverse Punch" : ["Baro Jirugi"] },
	    { "Reverse Punch" : ["Bandae Jirugi"] },
	    { "4 Directional Punch" : ["Sajo Jirugi"] },
	    { "White" : ["Innocence"] },
	    { "Block" : ["Makgi"] },
	    { "Punch" : ["Jirugi"] },
	    { "Stance" : ["Sogi"] }
	]
    },

    {	"name" : "yellow_tag",
	"kup" : "9th",
	"col" : ['#FFFFFF','#FFFF00','#FFFFFF'],
	"words" : [
	    { "Left" : ["Wen"] },
	    { "Right" : ["Orun"] },
	    { "Pattern" : ["Tul"] },
	    { "Ball of Foot" : ["Ap Kumchi"] },
	    { "Foot Sword" : ["Balkal"] },
	    { "Head" : ["Mori"] },
	    { "L Stance" : ["Niunja Sogi"] },
	    { "Rising Block" : ["Chookyo\nMagki"] },
	    { "Forearm Guarding\nBlock" : ["Palmok Daebi\nMagki"] },
	    { "Kick" : ["Chagi"] },
	    { "Double Punch" : ["Doo Jirugi"] },
	    { "Front Snap Kick" : ["Ap Cha Busigi"] },
	    { "Knife Hand Strike" : ["Sonkal Taerigi"] },
	    { "Heaven and Earth" : ["Chon-Ji","19 Moves"] },
	]
    },

    {	"name" : "yellow",
	"kup" : "8th",
	"col" : ['#FFFF00','#FFFF00','#FFFF00'],
	"words" : [
	    { "Inward" : ["Anaero"] },
	    { "Outward" : ["Bakaero"] },
	    { "Downward" : ["Naeryo"] },
	    { "Half facing" : ["Ban Mom"] },
	    { "Full facing" : ["On Mom"] },
	    { "Side facing" : ["Yop Mom"] },
	    { "Palm" : ["Sonbadak"] },
	    { "Knifehand" : ["Sonkal"] },
	    { "Backfist" : ["Dung Joomuk"] },
	    { "Knifehand guarding\nblock" : ["Sonkal Daebi\nMagki"] },
	    { "Twin forearm block" : ["Sang Palmok\nMagki"] },
	    { "Outer forearm\ninward block" : ["Bakat Palmok Anaero\nMagki"] },
	    { "Backfist front\ndownward strike" : ["Dung Joomuk\nAp Naeryo\nTaerigi"] },
	    { "Turning Kick" : ["Dollyo Chagi"] },
	    { "Dan-Gun" : ["Founder of Korea","2333BC","21 Moves"] },
	    { "Three step sparring" : ["Sambo Matsoki"] },
	    { "Green" : ["Growth"] },
	]
    },

    {	"name" : "green_tag",
	"kup" : "7th",
	"col" : ['#FFFF00','#00FF00','#FFFF00'],
	"words" : [
	    { "Straight" : ["Sun"] },
	    { "Thrust" : ["Tulgi"] },
	    { "Finger" : ["Songarak"] },
	    { "Finger tips\n(as group)" : ["Sonkut"] },
	    { "Fixed stance" : ["Gojong Sugi"] },
	    { "Wedging block" : ["Chechyo Magki"] },
	    { "I've been grabbed" : ["Jappyosol Tae"] },
	    { "Twisting release" : ["Bitulmyo Pulki"] },
	    { "Sliding" : ["Mikulgi"] },
	    { "Spot turn\n(centre line turn)" : ["Gujari Dolgi"] },
	    { "Straight fingertip\nthrust" : ["Sun Sonkut\nTulgi"] },
	    { "Backfist side\nstrike" : ["Dung Joomuck\nYop Taerigi"] },
	    { "Side piercing\nkick" : ["Yop Cha Jirugi"] },
	    { "Do-San" : ["Independence of\nKorea","Education of\nKorea","24 Moves","1878-1938","Island mountain"] },
	]
    },

    {	"name" : "green",
	"kup" : "6th",
	"col" : ['#00FF00','#00FF00','#00FF00'],
	"words" : [
	    { "Back" : ["Dwit"] },
	    { "Foot parts" : ["Han Bansin"] },
	    { "Hand parts" : ["Sang Bansin"] },
	    { "Back sole" : ["Dwit Kumchi"] },
	    { "Back heel" : ["Dwit Chook"] },
	    { "Vertical stance" : ["Soojik Sogi"] },
	    { "Closed stance" : ["Moa Sogi"] },
	    { "Bending ready\nstance" : ["Goburyo Chumbi\nSogi"] },
	    { "Circurlar block" : ["Dollimyo Magki"] },
	    { "Palm pushing\nblock" : ["Sonbadack Miro\nMagki"] },
	    { "Knife hand\ninward strike" : ["Sonkal Anaero\nTaerigi"] },
	    { "Side punch" : ["Yop Jirugi"] },
	    { "Reverse turning\nkick" : ["Bandae Dollyo Chagi"] },
	    { "Reverse side\nkick" : ["Bandae Yop Chagi"] },
	    { "Reverse kinfe\nhand strike" : ["Sonkal Dung Taerigi"] },
	    { "Semi-free\nsparring" : ["Ban Jayoo\nmatsoki"] },
	    { "Blue" : ["Heaven"] },
	    { "Won-Hyo" : ["Break of Dawn","28 moves","686 A.D.","Monk","Buddhism"] },
	]
    },

    {	"name" : "blue_tag",
	"kup" : "5th",
	"col" : ['#00FF00','#0000FF','#00FF00'],
	"words" : [
	    { "Jumping" : ["Twigi"] },
	    { "Elbow" : ["Palkup"] },
	    { "Moorup" : ["Knee"] },
	    { "X stance" : ["Kyocha Sogi"] },
	    { "Double forearm\nblock" : ["Doo Palmok\nMagki"] },
	    { "Palm hooking\nblock" : ["Sonbadack Golcho\nMagki"] },
	    { "Graping block" : ["Butjaba Magki"] },
	    { "X fist\npressing block" : ["Kyocha Joomuk\nNoollo Magki"] },
	    { "Palm upward\nblock" : ["Sonbadack Ollyo\nMagki"] },
	    { "Twin knifehand\nblock" : ["Sang Sonkal\nMagki"] },
	    { "Uppset punch" : ["Dwijibo Jirugi"] },
	    { "Hooking kick" : ["Golcho Chagi"] },
	    { "Flat fingertip\nthrust" : ["Opun Sonkut\nTulgi"] },
	    { "Crescent Kick" : ["Bandal Chagi"] },
	    { "Twin fist\nvertical punch" : ["Sang Joomuk\nSewo Jirugi"] },
	    { "Twin fist\nupset punch" : ["Sang Joomuk\nDwijibo Jirugi"] },
	    { "Two step\nsparring" : ["Ibo Matsoki"] },
	    { "Free sparring" : ["Jayoo Matsoki"] },
	    { "Blue" : ["Heaven"] },
	    { "Yul-Gok" : ["Valley of\nChestnuts","38 moves","1536-1583.","Scholar"] },
	]
    },

    {	"name" : "blue",
	"kup" : "4th",
	"col" : ['#0000FF','#0000FF','#0000FF'],
	"words" : [
	    { "Mid section\nupset" : ["Dwijibo"] },
	    { "Low section\nupset" : ["Dwijibun"] },
	    { "Side sole" : ["Yo Bal Badak"] },
	    { "Arc hand" : ["Bandal Son"] },
	    { "Side fist" : ["Yop Joomuk"] },
	    { "Rear foot\nstance" : ["Dwit Bal\nSogi"] },
	    { "Low stance" : ["Nachuo Sogi"] },
	    { "X first\nrising block" : ["Kyocha Joomuk\nChookyo Magki"] },
	    { "Palm pressing\nblock" : ["Sonbadak Noollo\nMagki"] },
	    { "Downward block" : ["Naeryo Magki"] },
	    { "U shaped\nblock" : ["Digutja Magki","Mondongo Magki"] },
	    { "Twin Straight\nforearm block" : ["Sang Sun\nPalmok Magki"] },
	    { "Angle punch" : ["Giokja Jirugi"] },
	    { "Back Kick" : ["Dwit Chagi"] },
	    { "Reverse turning\nhooking kick" : ["Bandae Dollyo\nGoro Chagi"] },
	    { "Red" : ["Danger"] },
	    { "Joong-Gun" : ["Patriot","1910","Lui-Shung\nprison.","Hiro Bumi\nIto"] },
	]
    },
    
    {	"name" : "red_tag",
	"kup" : "3rd",
	"col" : ['#0000FF','#FF0000','#0000FF'],
	"words" : [
	    { "Flying" : ["Twimyo"] },
	    { "Upset fingertips" : ["Dwijibun Sonkut"] },
	    { "W shape\nblock" : ["San Magki"] },
	    { "Double forearm\npushing block" : ["Doo Palmok\nMiro Magki"] },
	    { "Knife hand low\nguarding block" : ["Sonkal Najundi\nDaebi Magki"] },
	    { "Upset fingertip\nthrust" : ["Dwijibun Sonkut\nTulgi"] },
	    { "Twin side\nelbow thrust" : ["Sang Yop\nPalkup Tulgi"] },
	    { "Front pushing\nkick" : ["Ap Cha Milgi"] },
	    { "Upper elbow\nstrike" : ["Wi Palkup\nTaerigi"] },
	    { "Knee kick" : ["Moorup Chagi"] },
	    { "One step\nsparring" : ["Ilbo Matsoki"] },
	    { "Toi-Gye" : ["Returning\nStream","37 moves","16th Century.","Neo-Confusianism"] },
	]
    },

    {	"name" : "red",
	"kup" : "2nd",
	"col" : ['#FF0000','#FF0000','#FF0000'],
	"words" : [
	    { "Instep" : ["Baldung"] },
	    { "Reverse foot\nsword" : ["Balkal Dung"] },
	    { "Pulling Release" : ["Dangimyo Pulgi"] },
	    { "Upward punch" : ["Ollyo Jirugi"] },
	    { "Vertical kick" : ["Sewo Chagi"] },
	    { "Twisting kick" : ["Bituro Chagi"] },
	    { "Knife hand\ndownward strike" : ["Sonkal Naeryo\nTaerigi"] },
	    { "Side elbow\thrust" : ["Yop Palkup\nTulgia"] },
	    { "Hwa-Rang" : ["29 Moves","Silla Dynasty","600AD.","Unification of Korea","Flowering Youth"] },
	]
    },

    {	"name" : "black_tag",
	"kup" : "1st",
	"col" : ['#FF0000','#000000','#FF0000'],
	"words" : [
	    { "Reverse Knifehand" : ["Sonkal Dung"] },
	    { "One leg stance" : ["Wae Bal Sogi"] },
	    { "Twin palm\nupward block" : ["Sang Sonbadak\nOllyo Magki"] },
	    { "X knifehand\nchecking block" : ["Kyocha Sonkal\nMomchau Magki"] },
	    { "Outer forearm\nmiddle inward\nblock" : ["Bakat Palmok\nKaunde Anaero\nMagki"] },
	    { "Sweeping\nKick" : ["Suroh Chagi"] },
	    { "Flying Kick" : ["Twimyo Chagi"] },
	    { "Pressing Kick" : ["Noollo Jirugi"] },
	    { "Choong-Moo" : ["Yi Sun Si","Kobukson","1592AD.","30 Moves","Loyalty to the King"] },
	]
    }
];
