/*
 *  役种类：三连刻
 *	役种类型：普通役
 *  役种番数：2
 *  和牌牌型：面子手牌型
 *  役种条件：包含三个连续的同类刻子
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class SanLianKe extends Yi {
	constructor() {
		super("SanLianKe", "三连刻", 2, []);
	}
	/*
		判断和牌牌型是否有当前役
		参数：
		hePaiPaixing：HePaiPaixing类型，和牌牌型
		state：State类型，状态对象
		返回值：
		有当前役返回该牌型具有的役的对象数组，否则返回空数组
	*/
	static getCurrentYi(hePaiPaixing, state) {
		if (!hePaiPaixing.isMianZiShou())
			return []; //面子手和牌牌型才有可能三连刻
		var keziPaiList = [];
		var keziPaiAsciiList = [];
		var all = hePaiPaixing.getAllMianzi();
		for (var i in all)
			if (all[i].isKezi() && !all[i].basePai.isZiPai()){
				keziPaiList.push(all[i].basePai);
				keziPaiAsciiList.push(all[i].basePai.pai_real_ascii);
			}
		if (keziPaiList.length < 3)
			return [];
		for (var i in keziPaiList){
			if(keziPaiList[i].getPaiAscii() > 7)
				continue;
			if(keziPaiAsciiList.includes(keziPaiList[i].pai_real_ascii + 1) && keziPaiAsciiList.includes(keziPaiList[i].pai_real_ascii + 2))
				return [new SanLianKe()];
		}
		return [];
	}
};
