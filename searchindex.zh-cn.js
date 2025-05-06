var relearn_searchindex = [
  {
    "breadcrumb": "Hello World",
    "content": "",
    "description": "",
    "tags": [],
    "title": "类别",
    "uri": "/categories/index.html"
  },
  {
    "breadcrumb": "",
    "content": "欢迎来到我的博客 看过很多技术大佬的博客，身边的同学也有搭建自己的博客分享学习生活的，终于我决定也创建一个自己的博客，想以此激励自己多总结，多表达，多写作。知识是无限的，每天也遇到很多新的内容，希望通过博客，我可以把这些内容分享给大家，一起交流与学习。当然，也想随手记录生活。\n技术心得 学习笔记 个人感悟 有趣的发现 未来的计划 走一步算一步吧，加油！\n下面是我学习的一些编程语言的Hello World程序。\nPython def hello_world(): print(\"Welcome to my blog!\") hello_world()\rJava public class HelloWorld { public static void main(String[] args) { System.out.println(\"Welcome to my blog!\"); } }\rC #include \u003cstdio.h\u003e int main() { printf(\"Welcome to my blog!\\n\"); return 0; }\rC++ #include \u003ciostream\u003e int main() { std::cout \u003c\u003c \"Welcome to my blog!\" \u003c\u003c std::endl; return 0; }\rHTML \u003c!DOCTYPE html\u003e \u003chtml\u003e \u003chead\u003e \u003ctitle\u003eWelcome to my blog!\u003c/title\u003e \u003c/head\u003e \u003cbody\u003e \u003ch1\u003eWelcome to my blog!\u003c/h1\u003e \u003c/body\u003e \u003c/html\u003e",
    "description": "欢迎来到我的博客 看过很多技术大佬的博客，身边的同学也有搭建自己的博客分享学习生活的，终于我决定也创建一个自己的博客，想以此激励自己多总结，多表达，多写作。知识是无限的，每天也遇到很多新的内容，希望通过博客，我可以把这些内容分享给大家，一起交流与学习。当然，也想随手记录生活。\n技术心得 学习笔记 个人感悟 有趣的发现 未来的计划 走一步算一步吧，加油！\n下面是我学习的一些编程语言的Hello World程序。\nPython def hello_world(): print(\"Welcome to my blog!\") hello_world()\rJava public class HelloWorld { public static void main(String[] args) { System.out.println(\"Welcome to my blog!\"); } }\rC #include \u003cstdio.h\u003e int main() { printf(\"Welcome to my blog!\\n\"); return 0; }\rC++ #include \u003ciostream\u003e int main() { std::cout \u003c\u003c \"Welcome to my blog!\" \u003c\u003c std::endl; return 0; }\rHTML \u003c!DOCTYPE html\u003e \u003chtml\u003e \u003chead\u003e \u003ctitle\u003eWelcome to my blog!\u003c/title\u003e \u003c/head\u003e \u003cbody\u003e \u003ch1\u003eWelcome to my blog!\u003c/h1\u003e \u003c/body\u003e \u003c/html\u003e",
    "tags": [
      "博客",
      "介绍"
    ],
    "title": "Hello World",
    "uri": "/index.html"
  },
  {
    "breadcrumb": "Hello World",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签",
    "uri": "/tags/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \r标签",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签 :: 博客",
    "uri": "/tags/%E5%8D%9A%E5%AE%A2/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \r标签",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签 :: 介绍",
    "uri": "/tags/%E4%BB%8B%E7%BB%8D/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \r类别",
    "content": "",
    "description": "",
    "tags": [],
    "title": "类别 :: 随笔",
    "uri": "/categories/%E9%9A%8F%E7%AC%94/index.html"
  },
  {
    "breadcrumb": "Hello World",
    "content": "一个苦逼的未来要当程序猿的大学生（哦不已经是了…）",
    "description": "一个苦逼的未来要当程序猿的大学生（哦不已经是了…）",
    "tags": [],
    "title": "关于我",
    "uri": "/about/index.html"
  },
  {
    "breadcrumb": "Hello World",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Posts",
    "uri": "/posts/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \rPosts",
    "content": "之前写大作业小游戏的时候就遇到过要自己找图片资源，当时第一次接触SVG图像，根本不了解，最近决定好好学习一下SVG。\nSVG是一种基于XML的矢量图形格式，它可以用来定义二维图形，且与常见的位图不同，缩放不会影响画质。因为它是用XML描述绘制图形的方法的，而不是像位图一样直接保存图片的单个像素点。\n关键概念 画布 ：无穷大，是绘制图形的区域。 裁切层 ：控制显示区域的框，在画布上框选出特定的区域来显示。 SVG区域大小 ：大小在svg标签中设定。也是最后页面上显示图片的大小。 解释 在写SVG代码的时候一开始会创建一个SVG标签：\n\u003csvg width=\"400\" height=\"400\"\u003e \u003c/svg\u003e\r这个就是要显示的SVG区域的大小。而SVG图形的绘制是在画布上进行的，这个画布我们是看不见的，同时画布有无穷大。我们可以在画布上绘制任意的图形，但是最后显示的SVG图片大小是固定的，当画布上绘制的图形大小与SVG区域大小不一致时，我们怎么控制显示画布上哪一部分呢？这时候就要用到裁切层来在画布上选择特定的区域来显示。下面先介绍SVG的一些基础的概念。\n坐标区域 SVG坐标区域的原点在左上角，向右为x轴正方向，向下为y轴正方向。 图形绘制 要绘制一个图形就很简单了，比如绘制一个矩形，只要设置它的左上角的坐标，以及长宽高即可，如何要填充颜色可以使用fill属性。\n\u003csvg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"\u003e \u003crect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"blue\" /\u003e \u003crect x=\"100\" y=\"100\" width=\"80\" height=\"30\" fill=\"red\" /\u003e \u003c/svg\u003e\r\u003csvg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"\u003e \u003crect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"blue\" /\u003e \u003crect x=\"200\" y=\"200\" width=\"80\" height=\"30\" fill=\"red\" /\u003e \u003c/svg\u003e\r可以看到因为默认的裁切层区域与svg区域大小是一样的，且左上角在原点处。\n设置裁切层 上面的代码绘制了两个矩形，但是只显示一个矩形，另一个矩形在裁切层之外，所以默认是不显示的。那么如何同时显示两个矩形呢？可以设置裁切层的位置，把两个矩形都框住。使用viewBox属性来设置裁切层的位置和大小。\n\u003csvg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 300\"\u003e \u003crect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"blue\" /\u003e \u003crect x=\"200\" y=\"200\" width=\"80\" height=\"30\" fill=\"red\" /\u003e \u003c/svg\u003e\r如果裁切层大小与svg区域大小相同，那正好，只要把画布整体平移，使裁切层与svg区域重合即可，但是如果裁切层大小和svg区域大小不相同怎么办？\n下面分两种情况讨论：\nsvg区域与裁切层的长宽比相同时，通过等比例缩放来使裁切层与svg区域重合，很简单，不单独讨论。 长宽比不同时，有两种填充方式，且通过属性preserveAspectRatio来控制。 svg区域与裁切层的长宽比不相同 下面的红色区域为SVG区域，绿色区域为裁切层。\n填满：裁切层完全覆盖svg区域，通过等比例缩放实现，这时裁切层内的内容不一定完全在svg区域内。比如下图中红色为svg区域，绿色为裁切层。填充时会将裁切层等比例放大知道能完全盖住svg区域。可以看到部分裁切层的内容不在svg区域内，最后不能显示。 完整展示：确保裁切层内容能完全处于svg区域内。且某一个方向铺满。比如上面同样的情况，会把裁切层区域先缩小，然后平移到svg区域使上下方向铺满，至于对齐方式也可以控制. 上述两种填充方式以及对齐都是通过属性preserveAspectRatio来控制的。\n对齐控制的值：xMinYMin，xMinYMax，xMaxYMax，xMaxYMin，xMinYMid，xMaxYMid，xMidYMid，xMidYMin，xMidYMax 平铺：slice(铺满) ，meet(裁切层全入) 默认：xMidYMid meet",
    "description": "之前写大作业小游戏的时候就遇到过要自己找图片资源，当时第一次接触SVG图像，根本不了解，最近决定好好学习一下SVG。\nSVG是一种基于XML的矢量图形格式，它可以用来定义二维图形，且与常见的位图不同，缩放不会影响画质。因为它是用XML描述绘制图形的方法的，而不是像位图一样直接保存图片的单个像素点。\n关键概念 画布 ：无穷大，是绘制图形的区域。 裁切层 ：控制显示区域的框，在画布上框选出特定的区域来显示。 SVG区域大小 ：大小在svg标签中设定。也是最后页面上显示图片的大小。 解释 在写SVG代码的时候一开始会创建一个SVG标签：\n\u003csvg width=\"400\" height=\"400\"\u003e \u003c/svg\u003e\r这个就是要显示的SVG区域的大小。而SVG图形的绘制是在画布上进行的，这个画布我们是看不见的，同时画布有无穷大。我们可以在画布上绘制任意的图形，但是最后显示的SVG图片大小是固定的，当画布上绘制的图形大小与SVG区域大小不一致时，我们怎么控制显示画布上哪一部分呢？这时候就要用到裁切层来在画布上选择特定的区域来显示。下面先介绍SVG的一些基础的概念。\n坐标区域 SVG坐标区域的原点在左上角，向右为x轴正方向，向下为y轴正方向。 图形绘制 要绘制一个图形就很简单了，比如绘制一个矩形，只要设置它的左上角的坐标，以及长宽高即可，如何要填充颜色可以使用fill属性。\n\u003csvg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"\u003e \u003crect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"blue\" /\u003e \u003crect x=\"100\" y=\"100\" width=\"80\" height=\"30\" fill=\"red\" /\u003e \u003c/svg\u003e\r\u003csvg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"\u003e \u003crect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"blue\" /\u003e \u003crect x=\"200\" y=\"200\" width=\"80\" height=\"30\" fill=\"red\" /\u003e \u003c/svg\u003e\r可以看到因为默认的裁切层区域与svg区域大小是一样的，且左上角在原点处。\n设置裁切层 上面的代码绘制了两个矩形，但是只显示一个矩形，另一个矩形在裁切层之外，所以默认是不显示的。那么如何同时显示两个矩形呢？可以设置裁切层的位置，把两个矩形都框住。使用viewBox属性来设置裁切层的位置和大小。\n\u003csvg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 300\"\u003e \u003crect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"blue\" /\u003e \u003crect x=\"200\" y=\"200\" width=\"80\" height=\"30\" fill=\"red\" /\u003e \u003c/svg\u003e",
    "tags": [],
    "title": "SVG图形绘制与展示的逻辑",
    "uri": "/posts/svg%E5%9B%BE%E5%BD%A2%E7%BB%98%E5%88%B6%E4%B8%8E%E5%B1%95%E7%A4%BA%E7%9A%84%E9%80%BB%E8%BE%91/index.html"
  }
]
