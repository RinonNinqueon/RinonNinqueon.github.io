/**
 * Created by stepa on 02.08.2016.
 */

audiojs.events.ready(function()
{
    var as = audiojs.createAll();
});
jQuery(document).ready(function($)
{
    $('ul.nav li.dropdown, ul.nav li.dropdown-submenu').hover(function()
    {
        $(this).find(' > .dropdown-menu').stop(true, true).delay(200).fadeIn();
    }, function()
    {
        $(this).find(' > .dropdown-menu').stop(true, true).delay(200).fadeOut();
    });
});

$('document').ready(function ()
{
    var Height = $('#content').height();
    $('.vertical-line-right').height(Height);
});
$(function () {
    //Идентификатор элемента HTML (например: #datetimepicker1), для которого необходимо инициализировать виджет "Bootstrap datetimepicker"
    $('#datetimepicker1').datetimepicker({pickTime: false, language: 'ru'});
    $('#datetimepicker2').datetimepicker({language: 'ru'});
});
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});