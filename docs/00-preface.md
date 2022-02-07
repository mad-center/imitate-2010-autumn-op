# 前言

> 他山远野闲来顾，栏上秋水寄浮尘。 ——《Animespot 2010 autumn opening movie --- Spotsommer Mumpitz》

## 原作历史

> 让我们走近时代的眼泪。

动画基地(ANIME SPOT)，于2004年创刊，至2012年停刊，是国内曾经较有影响力的动漫杂志之一。 《动画基地》杂志以动漫发烧友为目标人群，每期都会在CD以及PC-DVD中收录大量好听的ACG歌曲和精彩的视频节目。
每一季更换一次的DVD、VCD片头动画是这本月刊杂志的特色。同时，动画基地的内容创作倾向于稳重和思想深度。 而本项目的主角就来自于该期刊2010年秋季的OP，视频编辑者是Evanlet，人称泽北。

该作品集众多插件特效于一身，是一个含有视觉美感、吐槽、怨念、大量英文，圣经、教程的静止系MAD。 在当时的那个时代，这个MAD得到了极高的评价和赞美。即使从已经过去12年的2022年来看，它依旧是静止系MAD中的佼佼者。 因此，这个作品成为了有一定MAD制作基础的MADer模仿的对象之一。

## 本教程的内容编排

**本教程的理念**。 该教程依旧坚持“身体力行，举一反三”的理念。

- 身体力行：亲身实践制作，然后触发各种难题和问题，引起思考。
- 举一反三：从具体实现推广到一般方法论，提取关键的制作思路和设计原则。此外，对于一种效果，可以思考多种实现方法，打开思路，积累更为强大的制作经验。

**本教程内容的编排结构**。

- 先是这篇序言（00），然后是准备（00），以及各个分镜的详细讲解（01-20），最后是后记（21）。
- 附录：该项目参考文献（A1）、该项目的素材借物表（A2）；原作故事版的粗略拆分（B1）、原作文案考察（B2）。
- 其他：CHANGELOG为该项目的更新记录，其余文件感兴趣可以阅读。

本教程默认读者已经具有一定水平的MAD入门制作基础（指可以完整模仿并理解《青空》和《black box》或者《base_image》)，对AE基本概念和常规操作具有清晰的认识。

本教程会提供一个配套的AE工程文件，并尽量保证渲染的视频稿件、AE工程、教程三者高度一致。工程已经按照模块化拆分每个主分镜头（例如P3），每个主分镜头合成中会分割成子分镜头（例如命名为P3_1或3_1）。对于工程的组织问题，有时间的话会整理到附录章节（不保证会完成）。

这个教程的初衷是为了补充MAD教程中的一块空缺。虽然时隔12年，但我依旧没能在网上找到一个关于模仿它的系统、全面的教程。

MAD教程很多，但是一个专门为了教学而设计的完整MAD图文教程，并且附加工程文件，这种情况并不多。该教程/工程希望尽可能还原原作的分镜，深入演算和拆解原作的设计思路，并导出普适的方法论。但是，个人能力有限，有些分镜无法完美复现，请谅解。

希望通过本教程，读者可以亲自体会2010秋季OP这个MAD的制作过程，同时加强MAD的制作能力，拔高MAD审美的下限。

## 本教程面向的读者

本教程最为合适的目标读者是，已经有一定的MAD入门基础，希望进一步提升。

为明确本教程的读者对象，这里将教程内容和特征列举如下：

- 使用AE软件作为主力编辑，依赖众多第三方插件，从零开始模仿
- 使用PS软件进行素材前期的抠图/补图处理
- 使用Topaz Gigapixel AI软件进行素材的分辨率提升处理
- 使用Topaz Video Enhance AI软件对原作视频进行超分辨率处理，方便拆解时的观察
- 使用AE内置的level、curves、hue/saturation以及Looks插件进行基础的调色处理
- 尽可能地用简洁的语言和足够细致的插图进行说明
- 对于第三方AE插件，会重点关注关键参数的设置，忽略/弱化非关键参数的讲解。
- 必要时大量使用AE表达式，但是会讲解代码变量和实现原理
- 重视实现原理，有时会给出多种实现，进行比较和评价优劣，最后导出结论

从本教程可以学习到的技术列举如下：

- AE 的基本使用技巧以及一些内置效果的应用
- AE 第三方脚本 Motion 3 处理关键帧（速度曲线）相关操作，设置图层锚点等
- AE 第三方脚本 FLOW 设置关键帧曲线（值曲线）
- AE 第三方插件 Plexus （点线面插件）制作杂乱的球形线条
- AE 第三方插件 3D Stroke 制作光束的曲线路径，以及简单的花瓣
- AE 第三方插件 Sapphire - S_TVDamage、S_FilmDamage 制作旧时代电视/电影信号故障
- AE 第三方插件 Sapphire - S_TextureFlux 制作类似水墨线条的过渡转场
- AE 第三方插件 Sapphire - S_Retime 制作时间延迟的效果
- AE 第三方插件 Sapphire - S_Rays 制作射线发光效果
- AE 第三方插件 Sapphire - S_TextureNoiseEmboss 纹理噪波浮雕效果，制作沙子颗粒感区域
- AE 第三方插件 Sapphire - S_TextureNoisePaint 纹理杂色绘制，制作彩色笔绘背景
- AE 第三方插件 Sapphire - S_NightSky 制作夜晚星空
- AE 第三方插件 Sapphire - S_HalfToneColor 制作类似半调圆圈背景
- AE 第三方插件 Sapphire - S_Glow 制作发光
- AE 第三方插件 Sapphire - S_CartoonPaint 制作卡通绘制效果
- AE 第三方插件 Sapphire - S_AutoPaint 制作背景图片的手绘效果
- AE 第三方插件 Bad TV 制作坏电视效果
- AE 第三方插件 RG Shadow 制作物体投影效果
- AE 第三方插件 RG Reflection 制作水面倒影效果
- AE 第三方插件 Psunami 制作简易的海面天空效果
- AE 第三方插件 Twitch 制作比wiggle表达式更加剧烈的镜头抖动
- AE 第三方插件 Stardust 制作带有拖尾的高速粒子滑动
- AE 第三方插件 Saber 制作图层发光特效
- Particular 制作常规的粒子运动效果
- Form 制作粒子阵列
- P1 ?
- Looks 进行素材的调色处理
- Echospace 快速生成合成副本，用于制作天梯场景
- Optical Flares 制作常规的光源
- Deep Glow 制作强发光效果

## 本教程不面向的读者

考虑到该教程的难度，不建议：

- 没有任何MAD制作基础的新手直接尝试

2010秋季OP该作品本身以视觉特效为主，整体节奏较快，属于静止系。因此本教程将不会涉及的内容列举：

- 不介绍其他风格MAD的相关制作，例如：纯碱/综漫燃AMV/误解系MAD/补帧向/欧美风/舞曲风等风格。
- 不介绍其他3D建模软件及其使用，例如：AE E3D，BLENDER，CINEMA 4D，MAYA，3DS MAX，Houdini，Lumion等。

另外，本教程不涉及这些MAD点缀技巧：

- 木偶制作人物头发飘动，人物眨眼

## 运行环境

本教程提供配套工程文件，读者可以下载并自己动手修改学习。

为避免因软件版本或插件版本不同导致的错误，这里将工程文件使用的运行环境列举：

- Windows 10（19043）
- After Effects 2020 (build 17.7)
- Photoshop 2020
- AE 第三方插件 Red Giant Trapcode Suite 15.1.8
    - Particular 4.1.5
- AE 第三方插件 Red Giant Magic Bullet Suite 14.0.1
    - Looks
- AE 第三方插件 Red Giant Effects Suite 11.1.13
    - Red Giant Psunami
    - Red Giant Warp
        - RG shadow
        - RG reflection
- AE 第三方插件 Rowbyte
    - Plexus 3.1.13
    - Bad TV 2.1.4
- AE 第三方插件 Video Copilot
    - Twitch
    - Saber_1.0.40
    - Optical Flares v1.3.5 光学耀斑
- AE 第三方插件 节点式三维粒子 Superluminal
    - Stardust 1.6.0
- AE 第三方插件 蓝宝石 Sapphire AE 2021.51 CE
- AE 第三方插件 Deep Glow v1.4.4
- AE 第三方插件 真实辉光特效 Aescripts Real Glow （可选）
- AE 第三方插件 VC Reflect 1.0.15 （可选）
- AE 第三方脚本 Motion 3.27（可选）
- AE 第三方脚本 Flow v1.4.2（可选）
- AE 第三方脚本 MasksToLayers.jsx by AK
- AE 特效管理控制工具 FX Console 1.0.5 (可选)
- 格式转换
    - 小丸工具箱
    - 格式工厂（可选）
    - ffmpeg-4.4.1-full_build（可选）
- 截图工具 ScreenToGif （可选）
- 超分辨率工具
    - Topaz Gigapixel AI 5.7.2 - 2021 release
    - Topaz Video Enhance AI 2.6.1 - 2021 release
    - ~~Waifu2x-Extension-GUI~~
    - realesrgan-ncnn-vulkan comandline tool (可选)
- VUE xStream 2019 version 4.00.30.44 AVX（仅演示）
- unlocker - windows 系统强制解锁文件，用于清理AE插件卸载残留（可选）
- 素材管理工具 Billfish V2.4.0.4 (可选)
- NexusFont 字体管理工具 （可选）

## 项目字体

这里列举了使用字体的文件名、对应中文名称，授权方式。

| 文件名                   | 中文名称                | 授权方式                                                     |
| ------------------------ | ----------------------- | ------------------------------------------------------------ |
| AaKaiTi                  | Aa楷体                  | 商用需授权                                                   |
| AaKaiTiNon-CommercialUse | Aa楷体（非商业使用）    | 商用需授权                                                   |
| AdobeFanHeitiStd-Bold    | Adobe 繁黑体 Std - 粗体 | **商用免费**。参阅 [Font licensing](https://helpx.adobe.com/fonts/using/font-licensing.html) |
| AdobeHeitiStd-Regular    | Adobe 黑体 Std - 粗体   | **商用免费**。参阅 [Font licensing](https://helpx.adobe.com/fonts/using/font-licensing.html) |
| CenturyGothic-BoldItalic | 世纪哥特式 - 粗斜体     | 商用需授权                                                   |
| ComicNeue-Bold           | -                       | **商用免费**。[OFL-1.1 License](https://github.com/crozynski/comicneue/blob/master/OFL.txt) |
| ComicNeue-Regular        | -                       | **商用免费**。[OFL-1.1 License](https://github.com/crozynski/comicneue/blob/master/OFL.txt) |
| Consolas-Bold            | -                       | 商用需授权                                                   |
| DFWaWaW5                 | 华康娃娃体简W5          | 商用需授权                                                   |
| EnglandScript            | -                       | 商用需授权                                                   |
| FZXKFW--GB1-0            | 方正行楷繁体            | 商用需授权                                                   |
| Holiday-Regular          | -                       | 商用需授权                                                   |
| InkFree                  | -                       | ？。参阅 [Ink Free font family](https://docs.microsoft.com/en-us/typography/font-list/ink-free#) |
| JavaneseText             | -                       | ？。参阅[Javanese Text font family](https://docs.microsoft.com/en-us/typography/font-list/javanese-text) |
| LXGWWenKaiScreen         | 霞鹜文楷 - 屏幕版       | **商用免费**。SIL OFL                                        |
| MicrosoftYaHei-Bold      | 微软雅黑 - 粗体         | 商用需授权                                                   |
| Noteworthy-Light         | -                       | 商用需授权                                                   |
| Orbitron-Bold            | -                       | 商用需授权                                                   |
| Orbitron-Medium          | -                       | 商用需授权                                                   |
| Orbitron-Regular         | -                       | 商用需授权                                                   |
| PangMenZhengDao          | 庞门正道标题体          | **商用免费**                                                 |
| RussoOne-Regular         | -                       | 商用需授权                                                   |
| SJyunlv-Regular          | 三级韵律                | 商用需授权                                                   |
| STXingkai                | 华文行楷                | 商用需授权                                                   |
| XHei-Intel               | -                       | 商用需授权                                                   |
| jiheyuanticu             | 几何圆体粗              | 商用需授权                                                   |
| MStiffHeiHKS-UltraBold   | 蒙纳超刚黑简            | 商用需授权                                                   |

