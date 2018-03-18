## 自动视口组件

- 关键字

	- DPR(devicePixelRatio)：设备像素比
	
	```javascript
	//如iPhone6 plus的物理像素是（1241*2208），css像素是（414*736）。DPR = 1241/414 || 2208/736,
	//ip6p的dpr是3,也就是说在css中设置width：1px；对应在ip6p上实际上是3个物理像素。
	DPR = 设备像素 / CSS像素
	
	//获取设备DPR
	var dpr = window.devicePiexRatio;
	```
	
	- REM（font size of the root element)
	
	rem是指相对于根元素的字体大小的单位,例如：html标签上设置了font-size:100px,那么css中设置width:0.5rem对应的就是50px的css像素。
	
	rem可以实现1设备像素的展示,如ip6p的dpr=3,html标签上设置了font-size:33.33px;那么对应的0.01rem就是1设备像素：
	```
	(html[font-size]*dpr/100)rem == 1设备像素
	```
	
	- viewport 视口：
	
	```
    <!--height：和 width 相对应，指定高度。-->
    <!--initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。-->
    <!--maximum-scale：允许用户缩放到的最大比例。-->
    <!--minimum-scale：允许用户缩放到的最小比例。-->
    <!--user-scalable：用户是否可以手动缩放-->
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    ```
   
- 原理

    自动视口组件主要有2个任务
    
    - 设置视口meta标签：
    根据dpr设置视口的缩放比例达到高清显示,例如ip6p的dpr=3。viewport的设置如下。通过缩放保证css1像素等于1设备像素
    
    ```	
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=0.3333333333333333,maximum-scale=0.3333333333333333,minimum-scale=0.3333333333333333">
    ```
    
    - 设置rem
    
    根据设备的设备像素(window.screen.width)/10 设置为1rem;这样做可以很完美的保证设备在各种机型下比例不变,
    也可以很轻松的画出一个占宽度20%的正方形。
    
    ```javascript
    // 10rem === 100% 如ip6p下1rem = 124.2px
  
    //一个占设备宽度20%的正方形
    //div{
    //    width:2rem;
    //    height:2rem;
    //}
    ```
   
- 用法

    autoViewPort将使用设备像素,将视图的（设备像素宽度/10）作为1rem,
    
    如1080*1920的设备1rem = 108px , width:100% => width:10rem

    ```javascript
    // 视口组件
    import autoViewPort from 'lib/autoViewPort/autoViewPort';
    
    // 返回值中有一个属性htmlFontSize代表1rem等于多少像素
    let deviceInfo = autoViewPort().htmlFontSize;
    ```
    