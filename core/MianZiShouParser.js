/*
 *	解析类
 *	用于面子手和牌向听数及和牌拆解的解析
 *	使用方法：
 *	var parser = new MianZiShouParser([
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
class MianZiShouParser {
	paiList; //传入的手牌
	isHele = false; //牌型在面子手和牌条件下是否和了
	/*
	 *	构造方法
	 *	参数：
	 *	paiList：手牌数组，应传入Pai对象的数组
	 */
	constructor(paiList) {
		this.paiList = paiList;
	}
	/*
	 *	计算向听数
	 *	参数：
	 *	错误：
	 *	当输入牌不合法时会throw错误，请注意catch
	 */
	calcXiangting() {
		var hand = [
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0
		];
		var rest = [
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4
		];
		this.paiList.map((pai) => {
			hand[pai.pai_real_ascii]++;
			rest[pai.pai_real_ascii]--;
			if (rest[pai.pai_real_ascii] < 0)
				throw "输入的牌数不正确";
		});
		var calcResult = calcMain(hand, rest);
		var ret = {};
		ret.xiangTingCount = calcResult.xiangTingCount; //向听数
		ret.paiState = calcResult.type; //当前手牌状态
		ret.divideResult = calcResult.data; //手牌拆分结果
		return ret;
	}

	/*
	* 使用查表法计算手牌对应的所有面子可能
	* 参数：
	* 无
	* 返回值：非面子手和牌牌型返回false，否则返回面子、雀头对象对应的数组
	* 示例：（测试值为22334455667788万）
	    [
	      { header: Pai("Wanzi",1), mianzi: [ Pai("Wanzi",2), Pai("Wanzi",2), Pai("Wanzi",5), Pai("Wanzi",5) ] },
	      { header: Pai("Wanzi",4), mianzi: [ Pai("Wanzi",1), Pai("Wanzi",1), Pai("Wanzi",5), Pai("Wanzi",5) ] },
	      { header: Pai("Wanzi",7), mianzi: [ Pai("Wanzi",1), Pai("Wanzi",1), Pai("Wanzi",4), Pai("Wanzi",4) ] }
	    ]
	   说明：本方法采用查表法计算结果，表的构成结构为：{牌型:[拆分可能]}，其意义如下：
	   牌型：表中的牌型以二进制存储。牌型由牌的数组转换而成。转换方式如下：
	   【表键计算方法】逆向生成二进制数，按照数牌、字牌（一般以Pai的Ascii）顺序逐一遍历。
	   当前牌有1张不计，有2张牌计2个1，3张计4个1，四张计6个1，花色间断或数字间断计01，连续则计0。字牌全部计为数字不连续的不同花色。最终计不连续。
	   例：求手牌22445566m88899s11z的表键：
			22计11：11
			44与22不连续计01：0111
			44计11:110111
			55与44连续计0:0110111
			55计11:110110111
			66与55连续计0：0110110111
			66计11:110110110111
			切换花色为索子计不连续为01：01110110110111
			888计1111:111101110110110111
			99与888连续计0：0111101110110110111
			99计11:110111101110110110111
			切换花色为字牌计不连续为01：01110111101110110110111
			11计11：1101110111101110110110111
			最终计不连续即01：011101110111101110110110111
			转换为十六进制为：0x3BBDDB7
			该牌型在表中不存在故而不能和牌。
		【表值使用方法】表的值为一个数组，其中每一项都是一种可以和牌的牌型。每一项的chunk结构如下（小端模式存储，因此要反过来）：
			struct DevideType {
				byte[3] 刻子数;
				byte[3] 顺字数;
				byte[4] 雀头;
				List<byte[4]> 刻子列表;
				List<byte[4]> 顺子列表;
			}
			其中刻子顺子及雀头给出的都是牌型中对应的下标，应在计算前确定你的每个牌型下标对应的牌是哪一张。
		例：求手牌22334455667788m的所有可能手牌拆分：
			根据【表键计算方法】计算得到该牌型的键二进制为：111011011011011011011。
			键的十六进制为：0x1DB6DB
			查到表中该键的值为：[0x21104420,0x211000e0,0x20cc01a0]
			因此该牌型有三种手牌拆分方式。取其第二种拆分方式0x211000e0：
			转换为2进制为0010 0001 0001 0000 0000 0000 1110 0000
			根据chunk结构获悉刻子数为二进制的000，顺子数为二进制的100（即4个顺子），雀头是0011（即下标为3的，就是传入的第四种牌，也就是5萬）
			其中刻子数为0所以不计。顺子有四个分别是：0100 0100 0000 0000，即下标是0 0 4 4，即2萬，2萬，6萬，6萬这些开头的顺子。
			于是可以确定该牌型可能为 55雀头 234 234 678 678顺子拆分。
	*/
	calcMianzi() {
		var wanzi = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		var tongzi = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		var suozi = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		var zipai = [0, 0, 0, 0, 0, 0, 0];
		this.paiList.map((pai) => { //构建牌组数量表
			if(pai.isZiPai()){
				zipai[pai.pai_real_ascii - 27] ++;
			}
			switch(pai.getType()){
				case ;
			}
		});
		//当前牌有1张不计，有2张牌计2个1，3张计4个1，四张计6个1，花色间断或数字间断计01，连续则计0。字牌全部计为数字不连续的不同花色。最终计不连续。
	}
}
export default MianZiShouParser;