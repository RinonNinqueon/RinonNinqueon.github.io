---
layout: post
title:  "Укрощение Ardour"
date:   2016-02-01 13:00:00
categories: IT
---

Хотите заниматься звукозаписью на Linux? Не проблема!<br>
Для вас есть чудесная DAW --- Ardour.<br>

### Система
Итак, сперва нам надо поставить какой-нибудь дистрибутив. Например, Ubuntu.<br>
Заходим [сюда](http://ubuntu.ru/get), качаем Desktop версию нужной вам разрядности.<br>
Прожигаем диск, или сливаем на флешку, перезагружаемся, ставим.<br>
Отдельная история, если у вас стоит Windows и вы хотите поставить систему рядом. Я ставлю на отдельный HDD, предварительно отключив HDD с Windows.<br>
Установка простая, ничего особо не надо думать.<br>
Установили? Теперь можно запустить.<br>
Вас встретит интерфейс Unity. Я его недолюбливаю и сразу ставлю Gnome. Об этом потом отдельно.<br>
Устанавливаем все обновления, которые найдёт система и перезагружаемся.<br>

### Ядро реального времени
Далее будем работать в консоли. Открываем Терминал.<br>
Ставим ядро реального времени:<br>
<code>sudo apt-get install linux-lowlatency</code><br>
Всё было бы прекрасно, но по умолчанию Grub не даёт времени на выбор. Надо его подправить.<br>
Проще всего это сделать через GUI.<br>
<code>sudo add-apt-repository ppa:danielrichter2007/grub-customizer <br>
sudo apt-get update <br>
sudo apt-get install grub-customizer<br>
</code>
Запускаем.<br>
Ставим в нём "Время ожидания" хотябы 10 секунд и сохраняем.<br>
Теперь можно перезагружаться.<br>

### Плагины Calf Studio Gear и Jack
Самое время обзавестись плагинами. Один из самых продвинутых наборов - [Calf Studio Gear](http://calf-studio-gear.org/).<br>
Будем ставить самую свежую версию.<br>
Ставим Git:<br>
<code>sudo apt-get install git</code><br>
Заходим в какую-нибудь папку, например в домашнюю, создаём папку, клонируем туда репозиторий.<br>
<code>mkdir git<br>
cd git<br>
git clone https://github.com/calf-studio-gear/calf.git<br>
</code>
Пока оно клонируется, можно установить зависимости.<br>
Открываем ещё одно окно терминала.<br>
Делаем именно в этом порядке:<br>
<code>sudo apt-get install libtool<br>
sudo apt-get install autoconf<br>
sudo apt-get install libexpat1-dev<br>
sudo apt-get install libfftw3-dev<br>
sudo apt-get install libglib2.0-dev<br>
sudo apt-get install jackd<br>
sudo apt-get install lv2core<br>
sudo apt-get install libglade2-dev<br>
sudo apt-get install gtk2-engines-pixbuf<br>
sudo apt-get install libfluidsynth-dev<br>
</code>
По пути Jack вас спросит, "Использовать ядро реального времени?" --- соглашайтесь.<br>
Ещё пара плюшек:<br>
<code>sudo apt-get install pulseaudio-module-jack<br>
sudo adduser ВАШЕ_ИМЯ_ПОЛЬЗОВАТЕЛЯ audio<br>
</code>
Первая добавить поддержку Jack в PulseAudio --- надо будет открыть настройки звука и выбрать интерфейс Jack.<br>
Вторая --- добавляет вашего пользователя в группу audio. Необходимо для корректной работы.<br>

Если репозиторий не склонировался, можете попить чаю.<br>
Как только всё готово, будем компилировать и ставить:<br>
<code>cd calf<br>
sh ./autogen.sh<br>
make -j8<br>
make install<br>
</code>

Перезагрузитесь.<br>
Запустите QJackCtl. Настройте Jack для вашей звуковой карты: Настройки -> аудио интерфейс  -> смотрите по названию.<br>
Более подробно --- в сети полно инструкций.<br>
Запускайте. В настройках PulseAudio выберите Jack интерфейс.<br>

### Ardour
Время поставить Ardour.<br>
Я добрый, дам вам бинарник версии 4.6: [Dropbox](https://dl.dropboxusercontent.com/u/15829218/Ardour_64bit-4.6.0.run)<br>
Что с ним делать?<br>
Открываете терминал, доберитесь до него. Скорей всего, он будет в папке ~/Загрузки.<br>
Запускаем:<br>
<code>sh ./Ardour_64bit-4.6.0.run<br>
</code>
Может сам спросить root-права.<br>

Всё, можно запускать.<br>
При настройке спросит интерфейс. Посылайте его на Jack и жмите "Присоединить".<br>

...<br>

### Profit!