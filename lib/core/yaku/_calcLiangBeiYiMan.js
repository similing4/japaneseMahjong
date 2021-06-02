"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GuoShiWuShuangShiSanMian = require("./liang_bei_yi_man/GuoShiWuShuangShiSanMian.js");

var _GuoShiWuShuangShiSanMian2 = _interopRequireDefault(_GuoShiWuShuangShiSanMian);

var _ChunZhengJiuLianBaoDeng = require("./liang_bei_yi_man/ChunZhengJiuLianBaoDeng.js");

var _ChunZhengJiuLianBaoDeng2 = _interopRequireDefault(_ChunZhengJiuLianBaoDeng);

var _SiAnKeDanQi = require("./liang_bei_yi_man/SiAnKeDanQi.js");

var _SiAnKeDanQi2 = _interopRequireDefault(_SiAnKeDanQi);

var _DaSiXi = require("./liang_bei_yi_man/DaSiXi.js");

var _DaSiXi2 = _interopRequireDefault(_DaSiXi);

var _State = require("../../bean/State.js");

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//四暗刻单骑
//国士无双十三面
exports.default = function (hePaiPaixing, state) {
  if (!(state instanceof _State2.default)) throw "参数state应为State类型：" + state;
  if (!(hePaiPaixing instanceof HePaiPaixing)) throw "参数hePaiPaixing应为HePaiPaixing类型：" + hePaiPaixing;
  var ret = [];
  var imp = [_GuoShiWuShuangShiSanMian2.default, _ChunZhengJiuLianBaoDeng2.default, _SiAnKeDanQi2.default, _DaSiXi2.default];
  imp.map(function (obj) {
    ret = ret.concat(obj.getCurrentYi(hePaiPaixing, state));
  });
  return ret;
}; //大四喜
//纯正九莲宝灯
/*
 *	两倍役满役计算，此导出函数为内部导出函数，仅供calc.js使用。
 *	用于获取对应手牌的两倍役满役列表。
 *  使用方法：
 *  import calc from "_calcLiangBeiYiMan.js";
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
 			Yi { key:"GuoShiWuShuangShiSanMian", name: "国士无双十三面", fan: 26, isYiMan: false, isLiangBeiYiMan: true }
 		]
 */