"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HePaiPaixing = require("../../bean/HePaiPaixing.js");

var _HePaiPaixing2 = _interopRequireDefault(_HePaiPaixing);

var _State = require("../../bean/State.js");

var _State2 = _interopRequireDefault(_State);

var _calcLiangBeiYiMan2 = require("./_calcLiangBeiYiMan.js");

var _calcLiangBeiYiMan3 = _interopRequireDefault(_calcLiangBeiYiMan2);

var _calcPuTongYi2 = require("./_calcPuTongYi.js");

var _calcPuTongYi3 = _interopRequireDefault(_calcPuTongYi2);

var _calcYiMan2 = require("./_calcYiMan.js");

var _calcYiMan3 = _interopRequireDefault(_calcYiMan2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (hePaiPaixing, state) {
  if (!(state instanceof _State2.default)) throw "参数state应为State类型：" + state;
  if (!(hePaiPaixing instanceof _HePaiPaixing2.default)) throw "参数hePaiPaixing应为HePaiPaixing类型：" + hePaiPaixing;
  var ret = (0, _calcYiMan3.default)(hePaiPaixing, state); //先算役满，役满满足了的话普通役种就不用算了，直接算两倍役满。否则算普通役种。
  if (ret.length > 0) {
    //如果满足役满则计算两倍役满
    ret = ret.concat((0, _calcLiangBeiYiMan3.default)(hePaiPaixing, state));
  } else {
    ret = (0, _calcPuTongYi3.default)(hePaiPaixing, state);
  }
  var finalret = ret.slice(0); //处理冲突，复制一份待处理
  for (var i in ret) {
    ret[i].chongTu.map(function (yiClass) {
      //遍历冲突的役
      finalret = finalret.filter(function (yi) {
        //清理掉是这种役的项
        return !(yi instanceof yiClass);
      });
    });
  }
  return finalret;
}; /*
    *	役计算
    *	用于获取对应手牌的役列表。
    *  使用方法：
    *  import calc from "calc.js";
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
    *	返回值为役种列表(List<Yi>，处理冲突后的役列表)及其番数。
    *  例：
    *  	[
    			Yi { key:"DuanYaoJiu", name: "断幺九", fan: 1, isYiMan: false, isLiangBeiYiMan: false },
    			Yi { key:"PingHe", name: "平和", fan: 1, isYiMan: false, isLiangBeiYiMan: false }
    		]
    */