"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = //是否是地和
function State() {
	_classCallCheck(this, State);

	this.changFeng = 1;
	this.ziFeng = 1;
	this.dora = [];
	this.lidora = [];
	this.isLiangLiZhi = false;
	this.isLiZhi = false;
	this.isYiFa = false;
	this.isLingShang = false;
	this.isZimo = false;
	this.isLast = false;
	this.isQiangGang = false;
	this.isTianHe = false;
	this.isDiHe = false;
} // Number类型，东风场为1，南风场为2，西风场为3，北风场为4
// Number类型，自风，东1南2西3北4
//Array[Pai]类型，宝牌数组，注意这里是宝牌数组不是宝牌指示牌数组
//Array[Pai]类型，里宝牌数组，注意这里是里宝牌数组不是里宝牌指示牌数组
//是否两立直
//是否立直
//是否一发
//是否领上
//是否自摸 
//是否是河底/海底
//是否是抢杠
//是否是天和
;

exports.default = State;