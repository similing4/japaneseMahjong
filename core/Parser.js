/*
 *	解析类
 *	用于和牌向听数及和牌拆解的解析
 *	使用方法：
 *	var parser = new Parser([
 		new Pai("Wanzi",1),
 		new Pai("Wanzi",1),
 		new Pai("Wanzi",1),
 		new Pai("Wanzi",2),
 		new Pai("Wanzi",3),
 		new Pai("Wanzi",4),
 		new Pai("Wanzi",5),
 		new Pai("Wanzi",6),
 		new Pai("Wanzi",7),
 		new Pai("Wanzi",8),
 		new Pai("Wanzi",9),
 		new Pai("Wanzi",9),
 		new Pai("Wanzi",9),
 		new Pai("Wanzi",9),
 	]);
 *	对象方法详见注释
 */
import calcMain from "./parser.work.js";
const PaiState = {
	Discard: "DISCARD", //待出牌状态或自摸/荣和状态
	Deal: "DEAL" //待摸牌状态
};
class Parser {
	paiList; //传入的手牌
	paiState = PaiState.Discard; //当前手牌状态
	xiangTingCount = -1; //向听数
	divideResult = []; //手牌拆分结果
	/*
		构造方法【注】构造方法不计算七对子与国士无双的可能，国士无双与七对子需要单独使用方法判断
		参数：
		paiList：手牌数组，应传入Pai对象的数组
		错误：
		当输入牌不合法时会throw错误，请注意catch
	*/
	constructor(paiList){
		this.paiList = paiList;
		var hand = [
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0
		];
		var rest = [
			4,4,4,4,4,4,4,4,4,
			4,4,4,4,4,4,4,4,4,
			4,4,4,4,4,4,4,4,4,
			4,4,4,4,4,4,4
		];
		this.paiList.map((pai)=>{
			hand[pai.pai_real_ascii] ++;
			rest[pai.pai_real_ascii] --;
			if(rest[pai.pai_real_ascii] < 0)
				throw "输入的牌数不正确";
		});
		var calcResult = calcMain(hand, rest);
		this.xiangTingCount = calcResult.xiangTingCount;
		this.paiState = calcResult.type;
		this.divideResult = calcResult.data;
	}
}
export default Parser;