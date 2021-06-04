import Pai from "./Pai.js";
class State {
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
	/*
		序列化对象
		参数：无
		返回值：序列化后的字符串
	*/
	serialize(){
		var json = {};
		json.changFeng = this.changFeng;
		json.ziFeng = this.ziFeng;
		json.dora = this.dora.map((pai)=>{return pai.pai_real_ascii}).join(",");
		json.lidora = this.lidora.map((pai)=>{return pai.pai_real_ascii}).join(",");
		json.isLiangLiZhi = this.isLiangLiZhi;
		json.isLiZhi = this.isLiZhi;
		json.isYiFa = this.isYiFa;
		json.isLingShang = this.isLingShang;
		json.isZimo = this.isZimo;
		json.isLast = this.isLast;
		json.isQiangGang = this.isQiangGang;
		json.isTianHe = this.isTianHe;
		json.isDiHe = this.isDiHe;
	}
	/*
		序列化对象
		参数：序列化后的字符串
		返回值：State对象
	*/
	static deserialize(str){
		var obj = JSON.parse(str);
		var state = new State();
		state.changFeng = obj.changFeng;
		state.ziFeng = obj.ziFeng;
		state.dora = JSON.parse("["+obj.dora+"]").map((pai_real_ascii)=>{return Pai.fromRealAscii(pai_real_ascii)});
		state.lidora = JSON.parse("["+obj.lidora+"]").map((pai_real_ascii)=>{return Pai.fromRealAscii(pai_real_ascii)});
		state.isLiangLiZhi = obj.isLiangLiZhi;
		state.isLiZhi = obj.isLiZhi;
		state.isYiFa = obj.isYiFa;
		state.isLingShang = obj.isLingShang;
		state.isZimo = obj.isZimo;
		state.isLast = obj.isLast;
		state.isQiangGang = obj.isQiangGang;
		state.isTianHe = obj.isTianHe;
		state.isDiHe = obj.isDiHe;
	}
}
export default State;