---
layout: post
title:  "Ламповый компрессор, заметки"
date:   2014-01-16 23:54:19
categories: schematics
tags: schematics diy tubecompressor
---

#Ламповый компрессор

Хочу, и всё тут.

###Что нам надо:
* Детектор
* Модулятор
* Буферы

##Детектор

Можно взять от UREI 1176? заменив диоды на лампу. И фазоинвертор туда же.

<ul class="thumbnails">
  <li class="span4">
    <a href="/img/valve_detector_1_MOhm.PNG" class="thumbnail" target="blank">
      <img src="/img/valve_detector_1_MOhm_preview.PNG" alt="кликните для получения полноразмерного изображения">
    </a>
  </li>
</ul>

Фазоинвертор собран на 6Н2П, а детектор на 6Х2П.

##Модулятор

Есть такая чудесная лампа, 6К4П - пентод с удлиненной характеристикой.
Её обычно используют в схемах АРУ (автоматическая регулировка громкости). Так почему же не использовать её в компрессоре?

<ul class="thumbnails">
  <li class="span4">
    <a href="/img/valve_compressor_1.PNG" class="thumbnail" target="blank">
      <img src="/img/valve_compressor_1.PNG" alt="кликните для получения полноразмерного изображения">
    </a>
  </li>
</ul>

Буфер собран на 6Н2П, модулятор на 6К4П.

Можно ещё добавить 6Е1П для индикации уровня компрессии.

#Achtung!
Девайс ещё проектируется, так что номиналы не приведены.