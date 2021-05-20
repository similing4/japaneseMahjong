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
import Mianzi from "../bean/Mianzi.js";
import Pai from "../bean/Pai.js";
import TableForSearch from "../data/TableForSearch.js";
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
	      { header: Pai("Wanzi",2), mianzi: [ Mianzi("Shunzi",Pai("Wanzi",3)), Mianzi("Shunzi",Pai("Wanzi",3)), Mianzi("Shunzi",Pai("Wanzi",6)), Mianzi("Shunzi",Pai("Wanzi",6)) ] },
	      { header: Pai("Wanzi",5), mianzi: [ Mianzi("Shunzi",Pai("Wanzi",2)), Mianzi("Shunzi",Pai("Wanzi",2)), Mianzi("Shunzi",Pai("Wanzi",6)), Mianzi("Shunzi",Pai("Wanzi",6)) ] },
	      { header: Pai("Wanzi",8), mianzi: [ Mianzi("Shunzi",Pai("Wanzi",2)), Mianzi("Shunzi",Pai("Wanzi",2)), Mianzi("Shunzi",Pai("Wanzi",5)), Mianzi("Shunzi",Pai("Wanzi",5)) ] },
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
			if (pai.isZiPai()) {
				zipai[pai.pai_real_ascii - 27]++;
				return;
			}
			switch (pai.getType()) {
				case "Wanzi":
					wanzi[pai.getPaiAscii() - 1]++;
					return;
				case "Tongzi":
					tongzi[pai.getPaiAscii() - 1]++;
					return;
				case "Suozi":
					suozi[pai.getPaiAscii() - 1]++;
					return;
			}
		});
		var key = this._calcKey(wanzi, tongzi, suozi, zipai); //获取表键
		if(!TableForSearch[key.key]) //如果不存在表键说明不是面子手和牌
			return false; //不是面子手和牌牌型直接返回false
		var res = this._parseTableVal(TableForSearch[key.key],key.paiArr); //计算牌型对应的数据含义
		return res;
	}
	/*
	 * 计算表键及表中牌型数字对应含义哈希（算法详情请见calcMianzi方法的注释）
	 * 参数：
	 * wanzi：萬子的数量数组，例：234678m应传入[0, 1, 1, 1, 0, 1, 1, 1, 0]。
	 * tongzi：筒子的数量数组，例同萬子
	 * suozi：索子的数量数组，例同萬子
	 * zipai：字牌的数量数组，按照东南西北白发中的顺序排列。例如东东南南发发应该传[2, 2, 0, 0, 0, 2, 0]。
	 * 返回值：表的键（数字）与表值中数据对应含义。例：
	 * 传入22334455667788后返回值如下：
	    {
		 	paiArr: [
			    Pai { pai_real_ascii: 1, isRed: false },
			    Pai { pai_real_ascii: 2, isRed: false },
			    Pai { pai_real_ascii: 3, isRed: false },
			    Pai { pai_real_ascii: 4, isRed: false },
			    Pai { pai_real_ascii: 5, isRed: false },
			    Pai { pai_real_ascii: 6, isRed: false },
			    Pai { pai_real_ascii: 7, isRed: false }
			],
			key: 1947355
	    }
	 */
	_calcKey(wanzi, tongzi, suozi, zipai) {
		var paiArr = []; //被计入的牌顺序
		var chunkArr = []; //构造数据数组，明晰算法，此处为了可读性降低了少许效率
		var sePaiTypeArr = ["Wanzi", "Tongzi", "Suozi"];
		[wanzi, tongzi, suozi].map((sePai, sePaiIndex) => { //普通色牌遍历
			if (sePai.reduce((a, b) => { return a + b; }) > 0) { //有该种色牌的情况下
				sePai.map((paiCount, index) => {
					if (paiCount == 0) { //当前张没有牌
						if (index > 0 && wanzi[index - 1] > 0) //上张有牌这张没有，说明断续了，计入01
							chunkArr.push("01");
						return;
					}
					if (index > 0 && wanzi[index - 1] > 0) //上张有牌这张也有，说明连续了，计入0
						chunkArr.push("0");
					paiArr.push(new Pai(sePaiTypeArr[sePaiIndex], index + 1));
					chunkArr.push(Array(paiCount * 2 - 1).join("1")); //需要计入2n-2个1，1张即0个1
				});
				if(sePai[8] > 0)
					chunkArr.push("01"); //切换花色计入不连续标志01。如果有9那么没有记录最后一次的01故而需要补记
			}
		})
		if (zipai.reduce((a, b) => { return a + b; }) > 0) { //有字牌的情况下
			zipai.map((paiCount, index) => {
				if (paiCount == 0)
					return; //不需要考虑字牌的连续性
				if (index > 3) //三元牌
					paiArr.push(new Pai("Sanyuan", index - 3));
				else
					paiArr.push(new Pai("Feng", index + 1));
				chunkArr.push(Array(paiCount * 2 - 1).join("1")); //需要计入2n-2个1，1张即0个1
				chunkArr.push("01"); //字牌所有项都要设置间断
			});
		}
		var str = chunkArr.reverse().join("");
		return {
			paiArr:paiArr,
			key: parseInt(str,2)
		}
	}
	/*
	* 根据表值及表中牌型数字对应含义哈希计算手牌对应的所有面子可能（算法详情请见calcMianzi方法的注释）
	* 参数：
	* val：查表法表中的值，应为一数组，其中数组每一项都是包含牌型数据的数字。
	* tongzi：筒子的数量数组，例同萬子
	* 返回值：面子、雀头对象对应的数组
	* 示例：（测试值为22334455667788萬对应的值：[0x21104420,0x211000e0,0x20cc01a0]）
	    [
	      { header: Pai("Wanzi",2), mianzi: [ Mianzi("Shunzi",Pai("Wanzi",3)), Mianzi("Shunzi",Pai("Wanzi",3)), Mianzi("Shunzi",Pai("Wanzi",6)), Mianzi("Shunzi",Pai("Wanzi",6)) ] },
	      { header: Pai("Wanzi",5), mianzi: [ Mianzi("Shunzi",Pai("Wanzi",2)), Mianzi("Shunzi",Pai("Wanzi",2)), Mianzi("Shunzi",Pai("Wanzi",6)), Mianzi("Shunzi",Pai("Wanzi",6)) ] },
	      { header: Pai("Wanzi",8), mianzi: [ Mianzi("Shunzi",Pai("Wanzi",2)), Mianzi("Shunzi",Pai("Wanzi",2)), Mianzi("Shunzi",Pai("Wanzi",5)), Mianzi("Shunzi",Pai("Wanzi",5)) ] },
	    ]
	*/
	_parseTableVal(val,paiArr){
		return val.map((paixing)=>{ //拿取每种情况
			var keziCount = paixing & 0x7;paixing >>= 3; //读取3位作为刻子数
			var shunziCount = paixing & 0x7;paixing >>= 3; //读取3位作为顺子数
			var header = paixing & 0xF;paixing >>= 4; //读取4位作为雀头
			var ret = { //构造返回值
				header: paiArr[header],
				mianzi: []
			};
			for(var i=0;i<keziCount;i++){
				var kezi = paixing & 0xF;paixing >>= 4; //逐次读取4位作为刻子
				ret.mianzi.push(new Mianzi("Kezi",false,paiArr[kezi]));
			}
			for(var i=0;i<shunziCount;i++){
				var shunzi = paixing & 0xF;paixing >>= 4; //逐次读取4位作为刻子
				ret.mianzi.push(new Mianzi("Shunzi",false,paiArr[shunzi]));
			}
			return ret;
		});
	}
}
export default MianZiShouParser;