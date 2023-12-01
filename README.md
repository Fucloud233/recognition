## YOLOV3：You Only Look Once 目标检测模型在 Pytorch 当中的实现

---

## 目录

1. [仓库更新 Top News](#仓库更新)
2. [相关仓库 Related code](#相关仓库)
3. [性能情况 Performance](#性能情况)
4. [所需环境 Environment](#所需环境)
5. [文件下载 Download](#文件下载)
6. [训练步骤 How2train](#训练步骤)
7. [预测步骤 How2predict](#预测步骤)
8. [评估步骤 How2eval](#评估步骤)
9. [参考资料 Reference](#Reference)

## Top News

**`2022-04`**:**支持多 GPU 训练，新增各个种类目标数量计算，新增 heatmap。**

**`2022-03`**:**进行了大幅度的更新，修改了 loss 组成，使得分类、目标、回归 loss 的比例合适、支持 step、cos 学习率下降法、支持 adam、sgd 优化器选择、支持学习率根据 batch_size 自适应调整、新增图片裁剪。**  
BiliBili 视频中的原仓库地址为：https://github.com/bubbliiiing/yolo3-pytorch/tree/bilibili

**`2021-10`**:**进行了大幅度的更新，增加了大量注释、增加了大量可调整参数、对代码的组成模块进行修改、增加 fps、视频预测、批量预测等功能。**

## 相关仓库

| 模型               | 路径                                                      |
| :----------------- | :-------------------------------------------------------- |
| YoloV3             | https://github.com/bubbliiiing/yolo3-pytorch              |
| Efficientnet-Yolo3 | https://github.com/bubbliiiing/efficientnet-yolo3-pytorch |
| YoloV4             | https://github.com/bubbliiiing/yolov4-pytorch             |
| YoloV4-tiny        | https://github.com/bubbliiiing/yolov4-tiny-pytorch        |
| Mobilenet-Yolov4   | https://github.com/bubbliiiing/mobilenet-yolov4-pytorch   |
| YoloV5-V5.0        | https://github.com/bubbliiiing/yolov5-pytorch             |
| YoloV5-V6.1        | https://github.com/bubbliiiing/yolov5-v6.1-pytorch        |
| YoloX              | https://github.com/bubbliiiing/yolox-pytorch              |

## 性能情况

|   训练数据集   |                                               权值文件名称                                               |  测试数据集  | 输入图片大小 | mAP 0.5:0.95 | mAP 0.5 |
| :------------: | :------------------------------------------------------------------------------------------------------: | :----------: | :----------: | :----------: | :-----: |
| COCO-Train2017 | [yolo_weights.pth](https://github.com/bubbliiiing/yolo3-pytorch/releases/download/v1.0/yolo_weights.pth) | COCO-Val2017 |   416x416    |     38.0     |  67.2   |

## 所需环境

torch == 1.2.0  
详情请看 requirements.txt，文件具有一定兼容性，已测试 pytorch1.7 和 1.7.1 可以正常运行。

## 文件下载

训练所需的 yolo_weights.pth 可以在百度云下载。  
链接: https://pan.baidu.com/s/1hCV4kg8NyStkywLiAeEr3g  
提取码: 6da3

VOC 数据集下载地址如下，里面已经包括了训练集、测试集、验证集（与测试集一样），无需再次划分：  
链接: https://pan.baidu.com/s/19Mw2u_df_nBzsC2lg20fQA  
提取码: j5ge

## 训练步骤

### a、训练 VOC07+12 数据集

1. 数据集的准备  
   **本文使用 VOC 格式进行训练，训练前需要下载好 VOC07+12 的数据集，解压后放在根目录**

2. 数据集的处理  
   修改 voc_annotation.py 里面的 annotation_mode=2，运行 voc_annotation.py 生成根目录下的 2007_train.txt 和 2007_val.txt。

3. 开始网络训练  
   train.py 的默认参数用于训练 VOC 数据集，直接运行 train.py 即可开始训练。

4. 训练结果预测  
   训练结果预测需要用到两个文件，分别是 yolo.py 和 predict.py。我们首先需要去 yolo.py 里面修改 model_path 以及 classes_path，这两个参数必须要修改。  
   **model_path 指向训练好的权值文件，在 logs 文件夹里。  
   classes_path 指向检测类别所对应的 txt。**  
   完成修改后就可以运行 predict.py 进行检测了。运行后输入图片路径即可检测。

### b、训练自己的数据集

1. 数据集的准备  
   **本文使用 VOC 格式进行训练，训练前需要自己制作好数据集，**  
   训练前将标签文件放在 VOCdevkit 文件夹下的 VOC2007 文件夹下的 Annotation 中。  
   训练前将图片文件放在 VOCdevkit 文件夹下的 VOC2007 文件夹下的 JPEGImages 中。

2. 数据集的处理  
   在完成数据集的摆放之后，我们需要利用 voc_annotation.py 获得训练用的 2007_train.txt 和 2007_val.txt。  
   修改 voc_annotation.py 里面的参数。第一次训练可以仅修改 classes_path，classes_path 用于指向检测类别所对应的 txt。  
   训练自己的数据集时，可以自己建立一个 cls_classes.txt，里面写自己所需要区分的类别。  
   model_data/cls_classes.txt 文件内容为：

```python
cat
dog
...
```

修改 voc_annotation.py 中的 classes_path，使其对应 cls_classes.txt，并运行 voc_annotation.py。

3. 开始网络训练  
   **训练的参数较多，均在 train.py 中，大家可以在下载库后仔细看注释，其中最重要的部分依然是 train.py 里的 classes_path。**  
   **classes_path 用于指向检测类别所对应的 txt，这个 txt 和 voc_annotation.py 里面的 txt 一样！训练自己的数据集必须要修改！**  
   修改完 classes_path 后就可以运行 train.py 开始训练了，在训练多个 epoch 后，权值会生成在 logs 文件夹中。

4. 训练结果预测  
   训练结果预测需要用到两个文件，分别是 yolo.py 和 predict.py。在 yolo.py 里面修改 model_path 以及 classes_path。  
   **model_path 指向训练好的权值文件，在 logs 文件夹里。  
   classes_path 指向检测类别所对应的 txt。**  
   完成修改后就可以运行 predict.py 进行检测了。运行后输入图片路径即可检测。

## 预测步骤

### a、使用预训练权重

1. 下载完库后解压，在百度网盘下载 yolo_weights.pth，放入 model_data，运行 predict.py，输入

```python
img/street.jpg
```

2. 在 predict.py 里面进行设置可以进行 fps 测试和 video 视频检测。

### b、使用自己训练的权重

1. 按照训练步骤训练。
2. 在 yolo.py 文件里面，在如下部分修改 model_path 和 classes_path 使其对应训练好的文件；**model_path 对应 logs 文件夹下面的权值文件，classes_path 是 model_path 对应分的类**。

```python
_defaults = {
    #--------------------------------------------------------------------------#
    #   使用自己训练好的模型进行预测一定要修改model_path和classes_path！
    #   model_path指向logs文件夹下的权值文件，classes_path指向model_data下的txt
    #   如果出现shape不匹配，同时要注意训练时的model_path和classes_path参数的修改
    #--------------------------------------------------------------------------#
    "model_path"        : 'model_data/yolo_weights.pth',
    "classes_path"      : 'model_data/coco_classes.txt',
    #---------------------------------------------------------------------#
    #   anchors_path代表先验框对应的txt文件，一般不修改。
    #   anchors_mask用于帮助代码找到对应的先验框，一般不修改。
    #---------------------------------------------------------------------#
    "anchors_path"      : 'model_data/yolo_anchors.txt',
    "anchors_mask"      : [[6, 7, 8], [3, 4, 5], [0, 1, 2]],
    #---------------------------------------------------------------------#
    #   输入图片的大小，必须为32的倍数。
    #---------------------------------------------------------------------#
    "input_shape"       : [416, 416],
    #---------------------------------------------------------------------#
    #   只有得分大于置信度的预测框会被保留下来
    #---------------------------------------------------------------------#
    "confidence"        : 0.5,
    #---------------------------------------------------------------------#
    #   非极大抑制所用到的nms_iou大小
    #---------------------------------------------------------------------#
    "nms_iou"           : 0.3,
    #---------------------------------------------------------------------#
    #   该变量用于控制是否使用letterbox_image对输入图像进行不失真的resize，
    #   在多次测试后，发现关闭letterbox_image直接resize的效果更好
    #---------------------------------------------------------------------#
    "letterbox_image"   : False,
    #-------------------------------#
    #   是否使用Cuda
    #   没有GPU可以设置成False
    #-------------------------------#
    "cuda"              : False,
}
```

3. 运行 predict.py，输入

```python
img/street.jpg
```

4. 在 predict.py 里面进行设置可以进行 fps 测试和 video 视频检测。

## 评估步骤

### a、评估 VOC07+12 的测试集

1. 本文使用 VOC 格式进行评估。VOC07+12 已经划分好了测试集，无需利用 voc_annotation.py 生成 ImageSets 文件夹下的 txt。
2. 在 yolo.py 里面修改 model_path 以及 classes_path。**model_path 指向训练好的权值文件，在 logs 文件夹里。classes_path 指向检测类别所对应的 txt。**
3. 运行 get_map.py 即可获得评估结果，评估结果会保存在 map_out 文件夹中。

### b、评估自己的数据集

1. 本文使用 VOC 格式进行评估。
2. 如果在训练前已经运行过 voc_annotation.py 文件，代码会自动将数据集划分成训练集、验证集和测试集。如果想要修改测试集的比例，可以修改 voc_annotation.py 文件下的 trainval_percent。trainval_percent 用于指定(训练集+验证集)与测试集的比例，默认情况下 (训练集+验证集):测试集 = 9:1。train_percent 用于指定(训练集+验证集)中训练集与验证集的比例，默认情况下 训练集:验证集 = 9:1。
3. 利用 voc_annotation.py 划分测试集后，前往 get_map.py 文件修改 classes_path，classes_path 用于指向检测类别所对应的 txt，这个 txt 和训练时的 txt 一样。评估自己的数据集必须要修改。
4. 在 yolo.py 里面修改 model_path 以及 classes_path。**model_path 指向训练好的权值文件，在 logs 文件夹里。classes_path 指向检测类别所对应的 txt。**
5. 运行 get_map.py 即可获得评估结果，评估结果会保存在 map_out 文件夹中。

## Reference

https://github.com/qqwweee/pytorch-yolo3  
https://github.com/eriklindernoren/PyTorch-YOLOv3  
https://github.com/BobLiu20/YOLOv3_PyTorch
