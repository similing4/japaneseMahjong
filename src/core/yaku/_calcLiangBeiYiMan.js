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
import GuoShiWuShuangShiSanMian from "./liang_bei_yi_man/GuoShiWuShuangShiSanMian.js"; //国士无双十三面
import ChunZhengJiuLianBaoDeng from "./liang_bei_yi_man/ChunZhengJiuLianBaoDeng.js"; //纯正九莲宝灯
import SiAnKeDanQi from "./liang_bei_yi_man/SiAnKeDanQi.js"; //四暗刻单骑
import DaSiXi from "./liang_bei_yi_man/DaSiXi.js"; //大四喜
import State from "../../bean/State.js";

export default (hePaiPaixing, state) => {
	if (!(state instanceof State))
		throw "参数state应为State类型：" + state;
	if (!(hePaiPaixing instanceof HePaiPaixing))
		throw "参数hePaiPaixing应为HePaiPaixing类型：" + hePaiPaixing;
	var ret = [];
	var imp = [GuoShiWuShuangShiSanMian, ChunZhengJiuLianBaoDeng, SiAnKeDanQi, DaSiXi];
	imp.map((obj) => {
		ret = ret.concat(obj.getCurrentYi(hePaiPaixing, state));
	})
	return ret;
};