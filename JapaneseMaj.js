import State from "./bean/State.js";
import Pai from "./bean/Pai.js";
import Parser from "./core/Parser.js";

class JapaneseMaj {
	state; //全局状态
	constructor(config) {
		this.state = new State();
		this.state.changFeng = config.changFeng; // Number类型，东风场为1，南风场为2，西风场为3，北风场为4
		this.state.ziFeng = config.ziFeng; // Number类型，自风，东1南2西3北4
		this.state.dora = config.dora; //Array[Pai]类型，宝牌数组，注意这里是宝牌数组不是宝牌指示牌数组
		this.state.lidora = config.lidora; //Array[Pai]类型，里宝牌数组，注意这里是里宝牌数组不是里宝牌指示牌数组
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
	calcXiangting(obj){
		return new Parser(obj).calcXiangting();
	}
	isHele(obj){
		return this.getYakuCalculator(obj);
	}
	getYakuCalculator(obj){
		return new Parser(obj).getYakuCalculator(this.state);
	}
}
export default JapaneseMaj;