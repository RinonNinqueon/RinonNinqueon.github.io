---
layout: post
title:  'Термометр в Renault Duster'
date:   2016-10-19 23:30:21
categories: schematics
---
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
		<center>
          <div class="modal-body">               
          </div>
		</center>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

<div class="thumbnails">
</div>

### ТЗ

Была поставлена задача: сделать двойной термометр-показометр для Renault Duster, встраиваемый на место заглушки рядом с аварийкой. Канала два: салон и наружная температура.<br>

### Определяемся с размером

#### Снимаем панель

Первым делом надо снять панель и вытащить заглушку.
Процесс в интернете хорошо расписан, к тому же есть прекрасная книжка от "За рулём" по ремонту и обслуживанию данного автомобиля.
Так что добираемся до заглушки, вынимаем её, смотрим, что места совсем мало.

#### Комплектующие

При таких размерах лучше всего делать на SMD. Плата, кстати, получилась двухсторонняя. Даже две платы, потому что индикаторы и кнопку я вынес вперёд и соединил шлейфом с основной платой.

### Схема

Как было сказано выше, здесь две платы. Одна с мозгами, другая с индикацией:

<div class="thumbnails">
	<li class="tmb">
	<span class="thumbnail" role="button" tabindex="0" style="cursor: pointer;">
      <img src="/img/duster/double_thermo.png" alt="/img/duster/double_thermo.png" class="img-thumbnail"><br>
	  <center>Схема</center>
	</span>
   	</li>
</div>

Всем заправляет ATTINY2313, датчики DS18B20, индикатор FYT-3132AUHR-11. Всё брал в [Чип-НН](http://chip-nn.ru).<br>
Ток на индикатор не стал делать большим, т.к. сдвиговый регистр более 80 мА не потянет. Да и зачем слепить?
Схема и плата для Proteus 7.10: [тыц](https://github.com/RinonNinqueon/source/tree/master/schematics/proteus/duster_thermo).

### Код

Тут нет ничего особенного. Динамическая индикация, в основном цикле считываются данные, ещё по таймеру смотрим на кнопку. Основная загвоздка в том, что когда библиотека лезет в 1-wire, прерывания останавливаются. Чтобы минимизировать моргания, я переписал её. Отключал прерывания только там, где это действительно нужно. К тому же я сделал вывод в **unsigned int** вместо **float**, сэкономив при этом кучу ресурсов.<br>
Изначальное значение --- **00**. Если не может считать данные, девайс выводит предыдущее значение.<br>
Можете скачать и изучить: [тыц](https://github.com/RinonNinqueon/source/tree/master/codes/CVAVR2/duster_thermo).

### Колхоз

#### Морда

А теперь самое интересное --- приделать платы на штатное крепление. Давайте разбираться.<br>
У нас есть:
<div class="thumbnails">
	<li class="tmb">
	<span class="thumbnail" role="button" tabindex="0" style="cursor: pointer;">
      <img src="/img/duster/1.png" alt="/img/duster/1.png" class="img-thumbnail"><br>
	  <center>Заглушка</center>
	</span>
   	</li>
</div>
Теперь берём и аккуратно отпиливаем переднюю плашку и "ноги" так, чтобы осталась только средняя часть. Вот так:
<div class="thumbnails">
	<li class="tmb">
	<span class="thumbnail" role="button" tabindex="0" style="cursor: pointer;">
      <img src="/img/duster/2.png" alt="/img/duster/2.png" class="img-thumbnail"><br>
	  <center>Только крепление</center>
	</span>
   	</li>
</div>
Осталось сделать отверстие под разъём. Примеряйте так, чтобы индикаторы была по центру. При этом разъём будет чуть смещён. Возможно, понадобится спилить боковины разъёма.
<div class="thumbnails">
	<li class="tmb">
	<span class="thumbnail" role="button" tabindex="0" style="cursor: pointer;">
      <img src="/img/duster/2.png" alt="/img/duster/2.png" class="img-thumbnail"><br>
	  <center>Дупло</center>
	</span>
   	</li>
</div>

#### Тушка

Основную плату можно крепить на небольших стойках, а на стабилизатор стоит приделать небольшую алюминиевую пластину, в качестве радиатора. Куда крепить? На какой-нибудь пластик. У меня оставался небольшой кусочек от ПВХ вентиляционной трубы. Внизу крепления сделал три отверстия и на болты M2 закрепил. Саму пластину подогрел и согнул.<br>
А ещё вам очень поможет термоклей.

#### Разъёмы

Тут вышел небольшой казус. Те, что я купил были с короткими выводами, и я их не смог нормально закрепить. Так что взял из закромов DIN 5, ещё советских времён, питание --- стандартный разъём. Всё это на пластинку из текстолита, и готово!<br>

#### Фото

<div class="fotorama"
	data-nav="thumbs"
	data-allowfullscreen="true"
	data-keyboard="true"
	data-width="50%"
	data-minwidth="720"
	data-maxwidth="1280"
	data-minheight="405"
    data-maxheight="100%">
	<a href="/img/duster/DSC00968.JPG" data-caption="Мозги"><img src="/img/duster/DSC00968_preview.JPG"></a>
	<a href="/img/duster/DSC00970.JPG" data-caption="Мозги"><img src="/img/duster/DSC00970_preview.JPG"></a>
	<a href="/img/duster/DSC00973.JPG" data-caption="Морда и заглушка"><img src="/img/duster/DSC00973_preview.JPG"></a>
	<a href="/img/duster/DSC00980.JPG" data-caption="Работает!"><img src="/img/duster/DSC00980_preview.JPG"></a>
</div>

### Колхоз в машине

Раз всё работает, можно залить на три слоя термоклеем и приступать к установке в автомобиль.<br>
Снова снимаем морду. Только на этот раз надо снять и панель с прикуривателем и всё то, куда вы будете тянуть датчики. Мы ставили один в туннель (плохая идея --- теплообмен медленный), второй --- на петлю у переднего бампера (вариант отличный).<br>
Перво наперво подключились параллельно прикуривателю. Тут хорошо бы ещё предохранитель поставить, но это как-нибудь потом. Завести датчик в туннель тоже проблем не вызвало.<br>
А вот протянуть из салона в подкапотное пространство --- та ещё задача. Над ногами водителя можно убрать пластик и попытаться протянуть параллельно проводам. Нам повезло (или нет?) в уплотнителе уже был колхоз от дилера Рено --- уплотнитель был отогнут и протянут провод на сигнализацию. Ну, мы решили повторить из творчество.<br>
Берём длинную тонкую палку, привязываем на конец верёвку и засовываем со стороны капота за уплотнитель, пока не покажется в салоне. Отвязываем палку, привязываем датчик, только аккуратней с его выводами. Тянем за эту верёвку, и вот, датчик уже почти снаружи. Уложить провод довольно легко, но заводить к петле лучше вдвоём. Один прицеливается и опускает датчик. Другой его ловит. Потом можно кабельной стяжкой прицепить. Мы стяжки благополучно забыли, поэтому старая добрая изолента всегда спасает.

<div class="fotorama"
	data-nav="thumbs"
	data-allowfullscreen="true"
	data-keyboard="true"
	data-width="50%"
	data-minwidth="720"
	data-maxwidth="1280"
	data-minheight="405"
    data-maxheight="100%">
	<a href="/img/duster/DSC01114.JPG" data-caption="Паяем"><img src="/img/duster/DSC01114.JPG"></a>
	<a href="/img/duster/DSC01116.JPG" data-caption="Врезка в прикуриватель"><img src="/img/duster/DSC01116.JPG"></a>
	<a href="/img/duster/DSC01118.JPG" data-caption="Разъёмы"><img src="/img/duster/DSC01118.JPG"></a>
	<a href="/img/duster/DSC01120.JPG" data-caption="Уплотнитель со стороны капота"><img src="/img/duster/DSC01120.JPG"></a>
	<a href="/img/duster/DSC01122.JPG" data-caption="Датчик, куча термоусадки с верёвка"><img src="/img/duster/DSC01122.JPG"></a>
	<a href="/img/duster/DSC01123.JPG" data-caption="Петля, датчик и изолента (facepalm)"><img src="/img/duster/DSC01123.JPG"></a>
	<a href="/img/duster/DSC01124.JPG" data-caption="Где-то тут можно добраться до уплотнителя"><img src="/img/duster/DSC01124.JPG"></a>
	<a href="/img/duster/DSC01126.JPG" data-caption="Прибор"><img src="/img/duster/DSC01126.JPG"></a>
	<a href="/img/duster/DSC01127.JPG" data-caption="В сборе"><img src="/img/duster/DSC01127.JPG"></a>
	<a href="/img/duster/DSC01128.JPG" data-caption="Работает!"><img src="/img/duster/DSC01128.JPG"></a>
</div>

### Что осталось

* Приделать какое-нибудь стёклышко для красоты.
* Решить проблему со слишком глубокой посадкой.
* Выбрать место для салонного датчика.
* Закрепить уличный датчик стяжкой.


<br><br><br><br><br>