## React-range 
这是一个用React写的仿微信小程序的slider组件，功能挺简单，包括设置min,max,step等等功能.
****************

#### 启动:
首先安装nodeJS,进入根目录，启动命令行工具：

```
    npm install 
```
运行命令:
```
    npm start
```

在浏览器中输入```localhost:8080```即可看```DEMO```

**************************


### OPTIONS(参数)：

属性名   | 类型 | 默认值 | 说明 
---     |  ---|  ---  | ---
min     | Number | 0   | 最小值
max     | Number | 100 | 最大值
stpe    | Number | 1   | 取值必须大于0,并且可以被(max-min)整除
value   | Number | 0   | 当前值
disabled| Boolean | false   | 是否禁用
show-value   | Boolean | false   | 是否显示当前值
onChange   | event |    | 完成一次拖动后触发的事件，event.target={value:value};
