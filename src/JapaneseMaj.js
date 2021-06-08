/*
 *	外接类
 *	用于面向用户的方法的输入输出处理等
 *	使用方法：
	import JapaneseMaj from "./JapaneseMaj.js";
	var maj = new JapaneseMaj({
		dora: [JapaneseMaj.getPai("Wanzi",1)]
	});
	var paixing = JapaneseMaj.getPaixingFromString("22334455667788m");
	var res = maj.getYakuCalculator(paixing); //计算是否和牌，和牌返回Calculator可以计算番数与符数点数等。
	if(res)
		console.log(res.calcYaku(maj.state));
	console.log(maj.calcXiangting(paixing));
 *	对象方法详见注释
 */
import State from "./bean/State.js";
import Pai from "./bean/Pai.js";
import Paixing from "./bean/Paixing.js";
import Parser from "./core/Parser.js";
class JapaneseMaj {
	state; //全局状态
	/*
	 *	构造方法
	 *	参数：
	 *	userConfig：配置信息：
	{
		changFeng = 1; // Number类型，东风场为1，南风场为2，西风场为3，北风场为4
		ziFeng = 1; // Number类型，自风，东1南2西3北4
		dora = []; //Array[Pai]类型，宝牌数组，注意这里是宝牌数组不是宝牌指示牌数组
		lidora = []; //Array[Pai]类型，里宝牌数组，注意这里是里宝牌数组不是里宝牌指示牌数组
		isLiangLiZhi = false; //是否两立直
		isLiZhi = false; //是否立直
		isYiFa = false; //是否一发
		isLingShang = false; //是否领上
		isZimo = false; //是否自摸 
		isLast = false; //是否是河底/海底
		isQiangGang = false; //是否是抢杠
		isTianHe = false; //是否是天和
		isDiHe = false; //是否是地和
	}
	 */
	constructor(userConfig) {
		var config = {
			changFeng: 1,
			ziFeng: 1,
			dora: [],
			lidora: [],
			beidora: 0,
			isLiangLiZhi: false,
			isLiZhi: false,
			isYiFa: false,
			isLingShang: false,
			isZimo: false,
			isLast: false,
			isQiangGang: false,
			isTianHe: false,
			isDiHe: false
		};
		Object.assign(config, userConfig);
		this.state = new State();
		this.state.changFeng = config.changFeng; // Number类型，东风场为1，南风场为2，西风场为3，北风场为4
		this.state.ziFeng = config.ziFeng; // Number类型，自风，东1南2西3北4
		this.state.dora = config.dora; //Array[Pai]类型，宝牌数组，注意这里是宝牌数组不是宝牌指示牌数组
		this.state.lidora = config.lidora; //Array[Pai]类型，里宝牌数组，注意这里是里宝牌数组不是里宝牌指示牌数组
		this.state.beidora = config.beidora; //Number类型，拔北宝牌数量
		this.state.isLiangLiZhi = config.isLiangLiZhi; //是否两立直
		this.state.isLiZhi = config.isLiZhi; //是否立直
		this.state.isYiFa = config.isYiFa; //是否一发
		this.state.isLingShang = config.isLingShang; //是否领上
		this.state.isZimo = config.isZimo; //是否自摸 
		this.state.isLast = config.isLast; //是否是河底/海底
		this.state.isQiangGang = config.isQiangGang; //是否是抢杠
		this.state.isTianHe = config.isTianHe; //是否是天和
		this.state.isDiHe = config.isDiHe; //是否是地和
	}
	/*
	 *	根据牌编号获取Pai对象
	 *	参数：
	 *  pai_real_ascii：牌的编号
	 *  返回值：对应的Pai对象
	 */
	static getPaiFromAscii(pai_real_ascii) {
		return Pai.fromRealAscii(pai_real_ascii);
	}
	/*
	 *	根据牌类型与牌数字获取Pai对象
	 *	参数：
	 *	type：牌的种类，"Wanzi"为万子，"Tongzi"为筒子，"Suozi"为索子，"Feng"为风牌，"Sanyuan"为三元牌
	 *  pai_ascii：牌的数字，如果是风牌那么东1南2西3北4，如果是三元牌那么白1发2中3
	 *  返回值：对应的Pai对象
	 */
	static getPai(type, pai_ascii) {
		return new Pai(type, pai_ascii);
	}
	/*
		将天凤麻将牌谱字符串解析为Paixing对象
		参数：
		str：天凤麻将牌谱字符串，格式如下：
			手牌 副露
		其中手牌部分可由如下几种写法组成：
			[1-9]m万子 [1-9]p筒子 [1-9]s索子 [1-4]z 东南西北  [5-7]z 白发中
		副露部分由手牌部分延伸，可由如下几种写法组成：
			吃：345m（三四五萬顺子） 碰：222z（南风刻子） 明杠：4444z（北风明杠） 暗杠：33333z(西风暗杠)
		和牌项请放到【手牌】最后，副露后续不满足输入规则的内容会被忽略。
		例：手牌四索两个、二三萬，摸来的牌是四萬，副露为东风碰，五六七万吃，9筒暗杠，那么手牌的格式应为：
			44s23m4m 111z 567m 99999p
		错误：
			输入格式不正确时报错。
	*/
	static getPaixingFromString(str) {
		return Paixing.parseFromString(str);
	}
	/*
	 *	计算向听数及推荐切牌
	 *	参数：
	 *  paixing：待计算的牌型对象
	 *  返回值如下：
	 *  {
	 		mianZiShou: { //面子手计算
		 		xiangTingCount: 1, //向听数，和牌与听牌均为0
		 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
		 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
		 	},
		 	qiDuiZi: { //七对子计算
		 		xiangTingCount: 1, //向听数，和牌与听牌均为0，鸣牌后该字段值为null
		 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
		 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
		 	},
		 	guoShiWuShuang: { //国士无双计算，鸣牌后该字段值为null
		 		xiangTingCount: 1, //向听数，和牌与听牌均为0
		 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
		 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
		 	},
		 	best: { //最佳
		 		xiangTingCount: 1, //向听数，和牌与听牌均为0
		 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
		 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
		 	},
			bestType: "MianZiShou" //最佳和牌类型
		}
	 *	错误：
	 *	当输入牌不合法时会throw错误，请注意catch
	 */
	calcXiangting(paixing) {
		return new Parser(paixing).calcXiangting();
	}

	/*
	 *	获取YakuCalculator，当牌型不能和牌时返回false，可由此方法判断是否和牌
	 *	参数：
	 *  paixing：待计算的牌型对象
	 *  返回值：
	 *  当牌型不能和牌时返回false，否则返回YakuCalculator对象用于计算役种及番符点数。
	 *	错误：
	 *	当输入牌不合法时会throw错误，请注意catch
	 */
	getYakuCalculator(paixing) {
		return new Parser(paixing).getYakuCalculator(this.state);
	}
	/*
	 *	反序列化state对象
	 *	参数：
	 *  str：State对象的序列化对象
	 *  返回值：对应的State对象
	 */
	static deserializeState(str) {
		return State.deserialize(str);
	}
}
export default JapaneseMaj;