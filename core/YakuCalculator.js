/*
 *	役计算器
 *	用于获取对应手牌的役与和牌点数、番符数等，该类实例可由Parser实例的getYakuCalculator方法实例化返回
 *  使用方法：
 *  var yakuCalc = new YakuCalculator([
 		new HePaiPaixing({
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
		})
 	]);
 *	对象方法详见注释
 */
import Pai from "../bean/Pai.js"
import Mianzi from "../bean/Mianzi.js";
import state from "../bean/State.js";
import HePaiPaixing from "../bean/HePaiPaixing.js";
export default class YakuCalculator {
	hePaiPaixingList; // List<HePaiPaixing>类型，所有的和牌牌型可能

	/*
		构造方法
		参数：
			hePaiPaixingList：HePaiPaixing对象的数组，需要使用Parser获取或自定义。
		错误：
			当传入数据不合法时报错。
	*/
	constructor(hePaiPaixingList) {
		hePaiPaixingList.map((hePaiPaixing) => {
			if (!(hePaiPaixing instanceof HePaiPaixing))
				throw "参数hePaiPaixingList应为HePaiPaixing类型的数组，但存在非该类型项：" + hePaiPaixing;
		});
		this.hePaiPaixingList = hePaiPaixingList;
	}
}