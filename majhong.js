const tbl = require('./tbl.js');
const xiangtingWork = require('./work.min.js');
const MAN = 0;
const MAN1 = 0;
const MAN2 = 1;
const MAN3 = 2;
const MAN4 = 3;
const MAN5 = 4;
const MAN6 = 5;
const MAN7 = 6;
const MAN8 = 7;
const MAN9 = 8;
const PIN = 9;
const PIN1 = 9;
const PIN2 = 10;
const PIN3 = 11;
const PIN4 = 12;
const PIN5 = 13;
const PIN6 = 14;
const PIN7 = 15;
const PIN8 = 16;
const PIN9 = 17;
const SOU = 18;
const SOU1 = 18;
const SOU2 = 19;
const SOU3 = 20;
const SOU4 = 21;
const SOU5 = 22;
const SOU6 = 23;
const SOU7 = 24;
const SOU8 = 25;
const SOU9 = 26;
const TON = 27;
const NAN = 28;
const SHA = 29;
const PEI = 30;
const HAK = 31; //白
const HAT = 32; //发
const CHU = 33; //中
/*
* 计算手牌对应的所有面子可能
* 参数：
* hai：手牌数组
* 返回值：非面子手和牌牌型返回false，否则返回面子、雀头对应的数组，雀头对应header，刻子对应kezi，顺子对应shunzi，顺子刻子均只记录第一张牌，如234万只记录2万。
* 示例：（测试值为22334455667788万）
    [
      { header: 1, kezi: [], shunzi: [ 2, 2, 5, 5 ] },
      { header: 4, kezi: [], shunzi: [ 1, 1, 5, 5 ] },
      { header: 7, kezi: [], shunzi: [ 1, 1, 4, 4 ] }
    ]
*/
function calc(hai){
    var n_zero = [];
    for(var i=0;i<34;i++)
    	n_zero.push(0);
    // 求牌的种类个数
    const analyse = function (hai) {
        n = n_zero.slice();
        for (var i in hai) {
            n[hai[i]]++;
        }
        return n;
    }
    const calc_key = function(n, pos) { //计算得到表中的键 n是34种牌每个个数数组，pos是待返回的14张牌
        var p = -1;
        var x = 0;
        var pos_p = 0;
        var b = false; // 是否有上一张牌
        // 数牌
        for (var i = 0; i < 3; i++) { //遍历万子、筒子、索子
            for (var j = 0; j < 9; j++) { //遍历牌的数字
                if (n[i * 9 + j] == 0) { // 没有这个数牌
                    if (b) { //有上一张牌时
                        b = false; //切换上张牌存在开关
                        x |= (0x1 << p); //此时p一定大于0
                        p++;
                    }
                } else {
                    p++;
                    b = true;
                    pos[pos_p++] = i * 9 + j;
                    switch (n[i * 9 + j]) {
                    case 2:
                        x |= (0x3 << p);
                        p += 2;
                        break;
                    case 3:
                        x |= (0xF << p);
                        p += 4;
                        break;
                    case 4:
                        x |= (0x3F << p);
                        p += 6;
                        break;
                    }
                }
            }
            if (b) {
                b = false;
                x |= (0x1 << p);
                p++;
            }
        }
        // 字牌
        for (var i = TON; i <= CHU; i++) {
            if (n[i] > 0) {
                p++;
                pos[pos_p++] = i;
                switch (n[i]) {
                case 2:
                    x |= (0x3 << p);
                    p += 2;
                    break;
                case 3:
                    x |= (0xF << p);
                    p += 4;
                    break;
                case 4:
                    x |= (0x3F << p);
                    p += 6;
                    break;
                }
                x |= (0x1 << p);
                p++;
            }
        }
        return x;
    }
	var pos = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var n = analyse(hai);
    var key = calc_key(n, pos);
    var ret = tbl[key];
    if(!ret)
    	return false;
    var result = [];
    for (var ri in ret) {
    	var r = ret[ri];
    	var item = {
    		header:0,
    		kezi:[],
    		shunzi:[]
    	};
    	item.header = (pos[(r>>6)&0xF]);
        var num_kotsu = r&0x7; // 刻子
        var num_shuntsu = (r>>3)&0x7; //顺子
        for (var i = 0; i < num_kotsu; i++)
            item.kezi.push(pos[(r>>(10+i*4))&0xF]);
        for (var i = 0; i < num_shuntsu; i++)
            item.shunzi.push(pos[(r>>(10+num_kotsu*4+i*4))&0xF]);
    	result.push(item);
    }
    return result;
}
/*
* 计算手牌对应的向听数
* 参数：
* hai：手牌数组
* 返回值：当牌型合法时返回向听数、推荐出张信息，否则返回false。
* 示例：（测试值为22334455667788万）
	{
		"type": "discard", //为deal时表示待摸牌状态、discard时表示待打牌状态
		"data": [{ //当type为deal时此字段为待摸有效牌数组，当type为discard时该字段范例如下：
			"discard": 2, //如果打这张牌
			"deal": [2, 5, 8], //需要等待这几张牌
			"count": 8 //需要等待的牌的总张数
		}, {
			"discard": 6,
			"deal": [0, 3, 6],
			"count": 8
		}, {
			"discard": 1,
			"deal": [1, 4, 7],
			"count": 6
		}, {
			"discard": 3,
			"deal": [0, 3],
			"count": 6
		}, {
			"discard": 4,
			"deal": [1, 4, 7],
			"count": 6
		}, {
			"discard": 5,
			"deal": [5, 8],
			"count": 6
		}, {
			"discard": 7,
			"deal": [1, 4, 7],
			"count": 6
		}],
		"xts": 0 //向听数，0是听牌或和牌
	}
*/
function xiangting(hai){
	var hand = [];
	var rest = [];
	for (var i = 0; i < 34; ++ i) {
		hand.push(0);
		rest.push(0);
	}
	for(var i = 0; i < hai.length; i++){
		hand[hai[i]] ++;
	}
	for (var i = 0; i < 34; ++ i) {
		rest[i] = 4 - hand[i];
		if (rest[i] < 0)
			return false;
	}
	var ret = xiangtingWork(hand, rest);
	if (ret["type"] == "error") {
		console.error("err: " + ret["data"]);
		return false;
	}
	return ret;
}
//console.log(xiangting([1,1,2,2,3,3,4,4,5,5,6,6,7,7]));
module.exports = {
    calc: calc,
	xiangting: xiangting,
    MAN:MAN,
    MAN1:MAN1,
    MAN2:MAN2,
    MAN3:MAN3,
    MAN4:MAN4,
    MAN5:MAN5,
    MAN6:MAN6,
    MAN7:MAN7,
    MAN8:MAN8,
    MAN9:MAN9,
    PIN:PIN,
    PIN1:PIN1,
    PIN2:PIN2,
    PIN3:PIN3,
    PIN4:PIN4,
    PIN5:PIN5,
    PIN6:PIN6,
    PIN7:PIN7,
    PIN8:PIN8,
    PIN9:PIN9,
    SOU:SOU,
    SOU1:SOU1,
    SOU2:SOU2,
    SOU3:SOU3,
    SOU4:SOU4,
    SOU5:SOU5,
    SOU6:SOU6,
    SOU7:SOU7,
    SOU8:SOU8,
    SOU9:SOU9,
    TON:TON,
    NAN:NAN,
    SHA:SHA,
    PEI:PEI,
    HAK:HAK,
    HAT:HAT,
    CHU:CHU
};
