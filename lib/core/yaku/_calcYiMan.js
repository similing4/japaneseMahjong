"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HePaiPaixing = require("../../bean/HePaiPaixing.js");

var _HePaiPaixing2 = _interopRequireDefault(_HePaiPaixing);

var _State = require("../../bean/State.js");

var _State2 = _interopRequireDefault(_State);

var _DaSanYuan = require("./yi_man/DaSanYuan.js");

var _DaSanYuan2 = _interopRequireDefault(_DaSanYuan);

var _DiHe = require("./yi_man/DiHe.js");

var _DiHe2 = _interopRequireDefault(_DiHe);

var _GuoShiWuShuang = require("./yi_man/GuoShiWuShuang.js");

var _GuoShiWuShuang2 = _interopRequireDefault(_GuoShiWuShuang);

var _JiuLianBaoDeng = require("./yi_man/JiuLianBaoDeng.js");

var _JiuLianBaoDeng2 = _interopRequireDefault(_JiuLianBaoDeng);

var _LvYiSe = require("./yi_man/LvYiSe.js");

var _LvYiSe2 = _interopRequireDefault(_LvYiSe);

var _QingLaoTou = require("./yi_man/QingLaoTou.js");

var _QingLaoTou2 = _interopRequireDefault(_QingLaoTou);

var _SiAnKe = require("./yi_man/SiAnKe.js");

var _SiAnKe2 = _interopRequireDefault(_SiAnKe);

var _SiGangZi = require("./yi_man/SiGangZi.js");

var _SiGangZi2 = _interopRequireDefault(_SiGangZi);

var _TianHe = require("./yi_man/TianHe.js");

var _TianHe2 = _interopRequireDefault(_TianHe);

var _XiaoSiXi = require("./yi_man/XiaoSiXi.js");

var _XiaoSiXi2 = _interopRequireDefault(_XiaoSiXi);

var _ZiYiSe = require("./yi_man/ZiYiSe.js");

var _ZiYiSe2 = _interopRequireDefault(_ZiYiSe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//字一色

//天和
//四暗刻
//绿一色
//国士无双
//大三元
exports.default = function (hePaiPaixing, state) {
  if (!(state instanceof _State2.default)) throw "参数state应为State类型：" + state;
  if (!(hePaiPaixing instanceof _HePaiPaixing2.default)) throw "参数hePaiPaixing应为HePaiPaixing类型：" + hePaiPaixing;
  var ret = [];
  var imp = [_DaSanYuan2.default, _DiHe2.default, _GuoShiWuShuang2.default, _JiuLianBaoDeng2.default, _LvYiSe2.default, _QingLaoTou2.default, _SiAnKe2.default, _SiGangZi2.default, _TianHe2.default, _XiaoSiXi2.default, _ZiYiSe2.default];
  imp.map(function (obj) {
    ret = ret.concat(obj.getCurrentYi(hePaiPaixing, state));
  });
  return ret;
}; //小四喜
//四杠子
//清老头
//九莲宝灯
//地和
/*
 *	役满役计算，此导出函数为内部导出函数，仅供calc.js使用。
 *	用于获取对应手牌的役满役列表。
 *  使用方法：
 *  import calc from "_calcYiMan.js";
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
 			Yi { key:"GuoShiWuShuang", name: "国士无双", fan: 13, isYiMan: true, isLiangBeiYiMan: false }
 		]
 */