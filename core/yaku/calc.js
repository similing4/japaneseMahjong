/*
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
import HePaiPaixing from "../../bean/HePaiPaixing.js";
import State from "../../bean/State.js";
import _calcLiangBeiYiMan from "./_calcLiangBeiYiMan.js";
import _calcPuTongYi from "./_calcPuTongYi.js";
import _calcYiMan from "./__calcYiMan.js";

export default (hePaiPaixing,state)=>{
	if(!(state instanceof State))
		throw "参数state应为State类型：" + state;
	if(!(hePaiPaixing instanceof HePaiPaixing))
		throw "参数hePaiPaixing应为HePaiPaixing类型：" + hePaiPaixing;
	var ret = _calcYiMan(hePaiPaixing,state); //先算役满，役满满足了的话普通役种就不用算了，直接算两倍役满。否则算普通役种。
	if(ret.length > 0){ //如果满足役满则计算两倍役满
		ret = ret.concat(_calcLiangBeiYiMan(hePaiPaixing,state));
	}else{
		ret = _calcPuTongYi(hePaiPaixing,state);
	}
	return ret;
};