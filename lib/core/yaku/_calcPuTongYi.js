"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HePaiPaixing = require("../../bean/HePaiPaixing.js");

var _HePaiPaixing2 = _interopRequireDefault(_HePaiPaixing);

var _State = require("../../bean/State.js");

var _State2 = _interopRequireDefault(_State);

var _ChunQuanDaiYaoJiu = require("./pu_tong_yi/ChunQuanDaiYaoJiu.js");

var _ChunQuanDaiYaoJiu2 = _interopRequireDefault(_ChunQuanDaiYaoJiu);

var _DuanYaoJiu = require("./pu_tong_yi/DuanYaoJiu.js");

var _DuanYaoJiu2 = _interopRequireDefault(_DuanYaoJiu);

var _DuiDuiHe = require("./pu_tong_yi/DuiDuiHe.js");

var _DuiDuiHe2 = _interopRequireDefault(_DuiDuiHe);

var _ErBeiKou = require("./pu_tong_yi/ErBeiKou.js");

var _ErBeiKou2 = _interopRequireDefault(_ErBeiKou);

var _HaiDiLaoYue = require("./pu_tong_yi/HaiDiLaoYue.js");

var _HaiDiLaoYue2 = _interopRequireDefault(_HaiDiLaoYue);

var _HeDiLaoYu = require("./pu_tong_yi/HeDiLaoYu.js");

var _HeDiLaoYu2 = _interopRequireDefault(_HeDiLaoYu);

var _HunLaoTou = require("./pu_tong_yi/HunLaoTou.js");

var _HunLaoTou2 = _interopRequireDefault(_HunLaoTou);

var _HunQuanDaiYaoJiu = require("./pu_tong_yi/HunQuanDaiYaoJiu.js");

var _HunQuanDaiYaoJiu2 = _interopRequireDefault(_HunQuanDaiYaoJiu);

var _HunYiSe = require("./pu_tong_yi/HunYiSe.js");

var _HunYiSe2 = _interopRequireDefault(_HunYiSe);

var _LingShangKaiHua = require("./pu_tong_yi/LingShangKaiHua.js");

var _LingShangKaiHua2 = _interopRequireDefault(_LingShangKaiHua);

var _LiZhi = require("./pu_tong_yi/LiZhi.js");

var _LiZhi2 = _interopRequireDefault(_LiZhi);

var _MenQianQingZiMo = require("./pu_tong_yi/MenQianQingZiMo.js");

var _MenQianQingZiMo2 = _interopRequireDefault(_MenQianQingZiMo);

var _PingHe = require("./pu_tong_yi/PingHe.js");

var _PingHe2 = _interopRequireDefault(_PingHe);

var _QiangGang = require("./pu_tong_yi/QiangGang.js");

var _QiangGang2 = _interopRequireDefault(_QiangGang);

var _QiDuiZi = require("./pu_tong_yi/QiDuiZi.js");

var _QiDuiZi2 = _interopRequireDefault(_QiDuiZi);

var _QingYiSe = require("./pu_tong_yi/QingYiSe.js");

var _QingYiSe2 = _interopRequireDefault(_QingYiSe);

var _SanAnKe = require("./pu_tong_yi/SanAnKe.js");

var _SanAnKe2 = _interopRequireDefault(_SanAnKe);

var _SanGangZi = require("./pu_tong_yi/SanGangZi.js");

var _SanGangZi2 = _interopRequireDefault(_SanGangZi);

var _SanSeTongKe = require("./pu_tong_yi/SanSeTongKe.js");

var _SanSeTongKe2 = _interopRequireDefault(_SanSeTongKe);

var _SanSeTongShun = require("./pu_tong_yi/SanSeTongShun.js");

var _SanSeTongShun2 = _interopRequireDefault(_SanSeTongShun);

var _ShuangLiZhi = require("./pu_tong_yi/ShuangLiZhi.js");

var _ShuangLiZhi2 = _interopRequireDefault(_ShuangLiZhi);

var _XiaoSanYuan = require("./pu_tong_yi/XiaoSanYuan.js");

var _XiaoSanYuan2 = _interopRequireDefault(_XiaoSanYuan);

var _YiBeiKou = require("./pu_tong_yi/YiBeiKou.js");

var _YiBeiKou2 = _interopRequireDefault(_YiBeiKou);

var _YiFa = require("./pu_tong_yi/YiFa.js");

var _YiFa2 = _interopRequireDefault(_YiFa);

var _YiPai = require("./pu_tong_yi/YiPai.js");

var _YiPai2 = _interopRequireDefault(_YiPai);

var _YiQiTongGuan = require("./pu_tong_yi/YiQiTongGuan.js");

var _YiQiTongGuan2 = _interopRequireDefault(_YiQiTongGuan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//一气通贯

//一发
//小三元
//三色同顺
//三杠子
//清一色
//枪杠
//门前清自摸
//岭上开花
//混全带幺九
//河底捞鱼
//二盃口
//断幺九
/*
 *	普通役计算，此导出函数为内部导出函数，仅供calc.js使用。
 *	用于获取对应手牌的役满役列表。
 *  使用方法：
 *  import calc from "_calcPuTongYi.js";
 *  var yakuCalc = calc(new HePaiPaixing({
 		type: "GuoShiWuShuang",
 		helepai: new Pai("Wanzi",9),
	 	paiList: [
 			new Pai("Wanzi",1),
 			new Pai("Wanzi",9),
 			new Pai("Tongzi",1),
 			new Pai("Tongzi",9),
 			new Pai("Suozi",1),
 			new Pai("Suozi",9),
 			new Pai("Feng",1),
 			new Pai("Feng",2),
 			new Pai("Feng",3),
 			new Pai("Feng",4),
 			new Pai("Sanyuan",1),
 			new Pai("Sanyuan",2),
 			new Pai("Sanyuan",3),
 			new Pai("Wanzi",9),
	 	]
	}),new State());
 *	返回值为役种列表(List<Yi>，未处理冲突的役列表)及其番数。
 *  例：
 *  	[
 			Yi { key:"DuanYaoJiu", name: "断幺九", fan: 1, isYiMan: false, isLiangBeiYiMan: false },
 			Yi { key:"PingHe", name: "平和", fan: 1, isYiMan: false, isLiangBeiYiMan: false }
 		]
 */
exports.default = function (hePaiPaixing, state) {
  if (!(state instanceof _State2.default)) throw "参数state应为State类型：" + state;
  if (!(hePaiPaixing instanceof _HePaiPaixing2.default)) throw "参数hePaiPaixing应为HePaiPaixing类型：" + hePaiPaixing;
  var ret = [];
  var imp = [_ChunQuanDaiYaoJiu2.default, _DuanYaoJiu2.default, _DuiDuiHe2.default, _ErBeiKou2.default, _HaiDiLaoYue2.default, _HeDiLaoYu2.default, _HunLaoTou2.default, _HunQuanDaiYaoJiu2.default, _HunYiSe2.default, _LingShangKaiHua2.default, _LiZhi2.default, _MenQianQingZiMo2.default, _PingHe2.default, _QiangGang2.default, _QiDuiZi2.default, _QingYiSe2.default, _SanAnKe2.default, _SanGangZi2.default, _SanSeTongKe2.default, _SanSeTongShun2.default, _ShuangLiZhi2.default, _XiaoSanYuan2.default, _YiBeiKou2.default, _YiFa2.default, _YiPai2.default, _YiQiTongGuan2.default];
  imp.map(function (obj) {
    ret = ret.concat(obj.getCurrentYi(hePaiPaixing, state));
  });
  return ret;
}; //役牌
//一盃口
//双立直
//三色同刻
//三暗刻
//七对子
//平和
//立直
//混一色
//混老头
//海底摸月
//对对和
//纯全带幺九