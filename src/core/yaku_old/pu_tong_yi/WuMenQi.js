/*
 *  役种类：五门齐
 *	役种类型：普通役（古役）
 *  役种番数：2
 *  和牌牌型：不限
 *  役种条件：和牌牌型由万子、筒子、索子、风牌、三元牌共同组成
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class WuMenQi extends Yi {
	constructor(hePaiPaixing) {
		super("WuMenQi", "五门齐", 2, []);
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
		var paiList = hePaiPaixing.getPaiList(); //拿到所有牌
		var type = "";
		var hasWan = false;
		var hasTong = false;
		var hasSuo = false;
		var hasFeng = false;
		var hasSanyuan = false;
		for (var i in paiList) {
			if (paiList[i].isSanyuanPai())
				hasSanyuan = true;
			if (paiList[i].isFengPai())
				hasFeng = true;
			if (paiList[i].getType() == "Wanzi")
				hasWan = true;
			if (paiList[i].getType() == "Tongzi")
				hasTong = true;
			if (paiList[i].getType() == "Suozi")
				hasSuo = true;
		}
		if (hasWan && hasTong && hasSuo && hasFeng && hasSanyuan)
			return [new WuMenQi(hePaiPaixing)];
		return [];
	}
};