//TODO: Please write code in this file.
new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","fixtures.js");// 在这里引入了fixtures.js
document.body.appendChild(new_element);

function printInventory(inputs)
{
    var output = '***<没钱赚商店>购物清单***\n';
    var allItems = loadAllItems();
    var freeInfo = loadPromotions();
    var freeItems = freeInfo[0].barcodes;
    var bar;  //临时变量，用于存储条形码
    var sum = 0;  //所有商品总价
    var save = 0;  //节省总价

    for(var k=0; k<allItems.length; k++)   //为所有条目添加新属性
    {
      allItems[k].number = 0;  //同类商品个数
      allItems[k].free = 0;    //是否有赠送
    }


    for(var i=0; i<inputs.length; i++)  //获取商品信息
    {
       var innum = 1;  // 默认一次输入的商品个数
       if( inputs[i].length == 10)   //提取前10为数字作为条形码
           bar = inputs[i];
       else
       {
           bar = inputs[i].substr(0,10);
           innum = parseInt(inputs[i].substr(11,1));
       }

       for(var j=0; j<allItems.length; j++){  //根据条形码查找商品信息，并设定数目
           if(bar==(allItems[j].barcode))
           {
              allItems[j].number = allItems[j].number + innum;
              break;
           }
       }
     }


     for(var n=0; n<allItems.length; n++)  //计算所有价格
     {
        if(allItems[n].number)  //判断是否买此商品
        {
            if(allItems[n].number>1)  //查询是否为赠送商品
            {
                for(var m=0; m<freeItems.length; m++)
                {
                    if(allItems[n].barcode==freeItems[m])
                    {
                        allItems[n].free = 1;
                        break;
                    }
                }
             }

             var total=(allItems[n].number - allItems[n].free)*allItems[n].price;  //每类商品总价
             output += "名称："+allItems[n].name+"，数量："+allItems[n].number+allItems[n].unit+"，单价："+allItems[n].price.toFixed(2)+"(元)，小计："+total.toFixed(2)+"(元)\n";
             sum = sum + total;
             save = save + allItems[n].free*allItems[n].price;
         }
      }


      output += "----------------------\n"+"挥泪赠送商品：\n";
      for(var p=0; p<allItems.length; p++){  //赠品信息
          if(allItems[p].free)
          {
              output += "名称："+allItems[p].name+"，数量：1"+allItems[p].unit+"\n";
          }
       }

       output += "----------------------\n" + "总计："+sum.toFixed(2)+"(元)\n" + "节省："+save.toFixed(2)+"(元)\n" + "**********************";
       console.log(output);
}
