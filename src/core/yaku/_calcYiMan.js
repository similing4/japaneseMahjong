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
import HePaiPaixing from "../../bean/HePaiPaixing.js";
import State from "../../bean/State.js";
import DaSanYuan from "./yi_man/DaSanYuan.js"; //大三元
import DiHe from "./yi_man/DiHe.js"; //地和
import GuoShiWuShuang from "./yi_man/GuoShiWuShuang.js"; //国士无双
import JiuLianBaoDeng from "./yi_man/JiuLianBaoDeng.js"; //九莲宝灯
import LvYiSe from "./yi_man/LvYiSe.js"; //绿一色
import QingLaoTou from "./yi_man/QingLaoTou.js"; //清老头
import SiAnKe from "./yi_man/SiAnKe.js"; //四暗刻
import SiGangZi from "./yi_man/SiGangZi.js"; //四杠子
import TianHe from "./yi_man/TianHe.js"; //天和
import XiaoSiXi from "./yi_man/XiaoSiXi.js"; //小四喜
import ZiYiSe from "./yi_man/ZiYiSe.js"; //字一色

import DaCheLun from "../yaku_old/yiman/DaCheLun.js"; //大车轮
import DaShuLin from "../yaku_old/yiman/DaShuLin.js"; //大数邻
import DaZhuLin from "../yaku_old/yiman/DaZhuLin.js"; //大竹林
import RenHe from "../yaku_old/yiman/RenHe.js"; //人和
import ShiShangSanNian from "../yaku_old/yiman/ShiShangSanNian.js"; //石上三年

export default (hePaiPaixing, state) => {
	if (!(state instanceof State))
		throw "参数state应为State类型：" + state;
	if (!(hePaiPaixing instanceof HePaiPaixing))
		throw "参数hePaiPaixing应为HePaiPaixing类型：" + hePaiPaixing;
	var ret = [];
	var imp = [
		DaSanYuan, DiHe, GuoShiWuShuang,
		JiuLianBaoDeng, LvYiSe, QingLaoTou,
		SiAnKe, SiGangZi, TianHe, XiaoSiXi,
		ZiYiSe
	];
	var guyi = [
		DaCheLun, DaShuLin, DaZhuLin,
		RenHe, ShiShangSanNian
	];
	imp.map((obj) => {
		ret = ret.concat(obj.getCurrentYi(hePaiPaixing, state));
	})
	if (state.isGuYi)
		guyi.map((obj) => {
			ret = ret.concat(obj.getCurrentYi(hePaiPaixing, state));
		})
	return ret;
};
