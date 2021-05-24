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
import HePaiPaixing from "../../bean/HePaiPaixing.js";
import State from "../../bean/State.js";
import ChunQuanDaiYaoJiu from "./pu_tong_yi/ChunQuanDaiYaoJiu.js"; //纯全带幺九
import DuanYaoJiu from "./pu_tong_yi/DuanYaoJiu.js"; //断幺九
import DuiDuiHe from "./pu_tong_yi/DuiDuiHe.js"; //对对和
import ErBeiKou from "./pu_tong_yi/ErBeiKou.js"; //二盃口
import HaiDiLaoYue from "./pu_tong_yi/HaiDiLaoYue.js"; //海底摸月
import HeDiLaoYu from "./pu_tong_yi/HeDiLaoYu.js"; //河底捞鱼
import HunLaoTou from "./pu_tong_yi/HunLaoTou.js"; //混老头
import HunQuanDaiYaoJiu from "./pu_tong_yi/HunQuanDaiYaoJiu.js"; //混全带幺九
import HunYiSe from "./pu_tong_yi/HunYiSe.js"; //混一色
import LingShangKaiHua from "./pu_tong_yi/LingShangKaiHua.js"; //岭上开花
import LiZhi from "./pu_tong_yi/LiZhi.js"; //立直
import MenQianQingZiMo from "./pu_tong_yi/MenQianQingZiMo.js"; //门前清自摸
import PingHe from "./pu_tong_yi/PingHe.js"; //平和
import QiangGang from "./pu_tong_yi/QiangGang.js"; //枪杠
import QiDuiZi from "./pu_tong_yi/QiDuiZi.js"; //七对子
import QingYiSe from "./pu_tong_yi/QingYiSe.js"; //清一色
import SanAnKe from "./pu_tong_yi/SanAnKe.js"; //三暗刻
import SanGangZi from "./pu_tong_yi/SanGangZi.js"; //三杠子
import SanSeTongKe from "./pu_tong_yi/SanSeTongKe.js"; //三色同刻
import SanSeTongShun from "./pu_tong_yi/SanSeTongShun.js"; //三色同顺
import ShuangLiZhi from "./pu_tong_yi/ShuangLiZhi.js"; //双立直
import XiaoSanYuan from "./pu_tong_yi/XiaoSanYuan.js"; //小三元
import YiBeiKou from "./pu_tong_yi/YiBeiKou.js"; //一盃口
import YiFa from "./pu_tong_yi/YiFa.js"; //一发
import YiPai from "./pu_tong_yi/YiPai.js"; //役牌
import YiQiTongGuan from "./pu_tong_yi/YiQiTongGuan.js"; //一气通贯

export default (hePaiPaixing, state) => {
	if (!(state instanceof State))
		throw "参数state应为State类型：" + state;
	if (!(hePaiPaixing instanceof HePaiPaixing))
		throw "参数hePaiPaixing应为HePaiPaixing类型：" + hePaiPaixing;
	var ret = [];
	var imp = [
		ChunQuanDaiYaoJiu, DuanYaoJiu, DuiDuiHe,
		ErBeiKou, HaiDiLaoYue, HeDiLaoYu,
		HunLaoTou, HunQuanDaiYaoJiu, HunYiSe,
		LingShangKaiHua, LiZhi, MenQianQingZiMo,
		PingHe, QiangGang, QiDuiZi,
		QingYiSe, SanAnKe, SanGangZi,
		SanSeTongKe, SanSeTongShun, ShuangLiZhi,
		XiaoSanYuan, YiBeiKou, YiFa,
		YiPai, YiQiTongGuan
	];
	imp.map((obj) => {
		ret = ret.concat(obj.getCurrentYi(hePaiPaixing, state));
	})
	return ret;
};