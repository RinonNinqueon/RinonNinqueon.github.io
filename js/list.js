/**
 * Created by stepa on 05.08.2016.
 */

function list_load(update)
{
    var xhr = new XMLHttpRequest();
    var p_url = "get_list.php?date";
    if (update)
        p_url += "&update=10";

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState==4 && xhr.status==200)
        {
            var data = xhr.responseText;
            var parsed = JSON.parse(data);

            parsed.forEach(function(item, i, arr)
            {
                var div_id = "anime_" + item.id;
                if (!update)
                {
                    $('#' + div_id).remove();
                    var m_d = list_generateOne(item.name, item.episode, item.episodes, item.aired, item.state, item.update, item.id, item.st_string, i);
                    document.getElementById("left_list").appendChild(m_d);
                }
                else
                {
                    if ($('#' + div_id) != null)
                    {
                        list_popUp(item.id, i);
                        list_progressbar_update(item.name, item.episode, item.episodes, item.aired, item.state, item.update, item.id, item.st_string);
                    }
                    else
                    {
                        var m_d = list_generateOne(item.name, item.episode, item.episodes, item.aired, item.state, item.update, item.id, item.st_string, i);
                        $("#left_list").prepend(m_d);
                    }
                }
            });
        }
    };
    xhr.open('GET', p_url, true);
    xhr.send();
}

function list_popUp(anime_id, position)
{
    var anime_div = $("#anime_" + anime_id);
    var pos = anime_div.attr("position");

    if (pos != position)
    {
        if (position == 0)
            anime_div.hide().prependTo(anime_div.parent()).fadeIn("slow");
        else
        {
            var div_insert = $("[position=" + (position - 1) + "]");
            anime_div.hide().insertAfter(div_insert).fadeIn("slow");
        }

        $(".anime_list").toArray().forEach(function(item, i, arr)
        {
            item.setAttribute("position", i);
        });
    }
}

function list_progressbar_update(name, episode, episodes, aired, state, update, id, st_string)
{
    var prbar1 = $("#prbar1_" + id);
    var class_string = 'progress-bar';

    if (parseInt(state) == 2)
        class_string = class_string + " progress-bar-striped active";
    if (parseInt(state) == 3)
        class_string = class_string + " progress-bar-success";
    if (parseInt(state) == 4)
        class_string = class_string + " progress-bar-striped progress-bar-info";
    if (parseInt(state) == 5)
        class_string = class_string + " progress-bar progress-bar-warning";

    if (!prbar1.hasClass(class_string))
    {
        prbar1.removeClass();
        prbar1.addClass(class_string);
    }

    prbar1.attr("aria-valuemax", episodes);
    prbar1.attr("aria-valuenow", episode);
    var width = (episode / episodes) * 100;
    prbar1.width(width + '%');
    prbar1.html(episode + "/" + episodes + "(" + st_string + ")");

        var prbar2 = $("#prbar2_" + id);
        var diff = 0;
        var progress1 = 100;

        diff = aired - episode;
        if (episodes > 0)
            progress1 = (diff / episodes) * 100;

        prbar2.attr("aria-valuemax", episodes);
        prbar2.attr("aria-valuenow", episode);
        prbar2.width(progress1 + '%');
        prbar2.html("+" + diff);

    if (parseInt(aired) > parseInt(episode))
        $(prbar2).show();
    else
        $(prbar2).hide();

    var update_div = $("#anime_"+id+"_update");

    update_div.html("Обн. " + update);
}

function list_generateOne(name, episode, episodes, aired, state, update, id, st_string, position)
{
    var div_main = document.createElement('div');
    div_main.className = 'row thumbnail anime_list';
    div_main.setAttribute("id", "anime_"+id);
    div_main.setAttribute("position", position);

    var div_sub = document.createElement('div');
    div_sub.className = 'col-md-11 col-xs-11';

    var div_row1 = document.createElement('div');
    div_row1.className = 'row';

    var div_sub1 = document.createElement('div');
    div_sub1.className = 'col-md-12 col-xs-12';

    var a_href = document.createElement('a');
    a_href.setAttribute('href', "/anime.php?id=" + id);
    a_href.innerHTML = name;

    div_sub1.appendChild(a_href);
    div_row1.appendChild(div_sub1);

    var div_row2 = document.createElement('div');
    div_row2.className = 'row';

    var div_sub2 = document.createElement('div');
    div_sub2.className = '"col-md-12 col-xs-12';

    var div_prog = document.createElement('div');
    div_prog.className = 'progress';
    div_prog.setAttribute('style', "margin-bottom: 0px");

    var div_progress = document.createElement('div');
    var class_string = 'progress-bar';
    div_progress.setAttribute("id", "prbar1_"+id);

    if (parseInt(state) == 2)
        class_string = class_string + " progress-bar-striped active";
    if (parseInt(state) == 3)
        class_string = class_string + " progress-bar-success";
    if (parseInt(state) == 4)
        class_string = class_string + " progress-bar-striped progress-bar-info";
    if (parseInt(state) == 5)
        class_string = class_string + " progress-bar progress-bar-warning";

    div_progress.className = class_string;
    div_progress.setAttribute("role", "progressbar");
    div_progress.setAttribute("aria-valuemin", "0");
    div_progress.setAttribute("aria-valuemax", episodes);
    div_progress.setAttribute("aria-valuenow", episode);
    var width = (episode / episodes) * 100;
    div_progress.style.width = width + '%';
    div_progress.innerHTML = episode + "/" + episodes + "(" + st_string + ")";

    div_prog.appendChild(div_progress);

        var div_progress1 = document.createElement('div');
        var class_string1 = 'progress-bar';
        var diff = 0;
        var progress1 = 100;

        diff = aired - episode;
        if (episodes > 0)
            progress1 = (diff / episodes) * 100;

        div_progress1.className = "progress-bar progress-bar-danger";
        div_progress1.setAttribute("role", "progressbar");
        div_progress1.setAttribute("aria-valuemin", "0");
        div_progress1.setAttribute("aria-valuemax", episodes);
        div_progress1.setAttribute("aria-valuenow", episode);
        div_progress1.style.width = progress1 + '%';
        div_progress1.innerHTML = "+" + diff;
        div_progress1.setAttribute("id", "prbar2_"+id);

        div_prog.appendChild(div_progress1);

    if (parseInt(aired) > parseInt(episode))
        $(div_progress1).show();
    else
        $(div_progress1).hide();

    div_sub2.appendChild(div_prog);
    div_row2.appendChild(div_sub2);

    var div_row3 = document.createElement('div');
    div_row3.className = 'row';

    var div_sub3 = document.createElement('div');
    div_sub3.className = '"col-md-12 col-xs-12';
    div_sub3.setAttribute("id", "anime_"+id+"_update");

    div_sub3.innerHTML = "Обн. " + update;

    div_row3.appendChild(div_sub3);

    div_sub.appendChild(div_row1);
    div_sub.appendChild(div_row2);
    div_sub.appendChild(div_row3);

    div_main.appendChild(div_sub);

//		console.log(div_main);

    return div_main;
}