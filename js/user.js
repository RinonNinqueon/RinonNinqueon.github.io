/**
 * Created by stepa on 28.08.2016.
 */

var releases_offset = 0;
var page_end = false;

function user_releases_load(offset, userid)
{
//    console.log("News.load.posts");
    var xhr = new XMLHttpRequest();
    var p_url = "get_list.php?userid=" + userid;

    p_url += "&start=" + offset;
    p_url += "&update=5";

    $('#load_spinner').show();

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var data = xhr.responseText;
            var parsed = JSON.parse(data);
            if (parsed.length > 0)
            {
                parsed.forEach(function (item, i, arr)
                {
                    var div_id = "anime_center_" + item.id;

                    $('#' + div_id).remove();
                    var m_d = user_releases_generateOne(item.name, item.episode, item.episodes, item.aired, item.state, item.update, item.id, item.st_string, item.cover, item.shigoto);
                    document.getElementById("main_content").appendChild(m_d);
                });
            }
            else
            {
                $('#load_spinner').hide();
                releases_offset -= 5;
                page_end = true;
            }
        }
    };
    xhr.open('GET', p_url, true);
    //			console.log("xhr.send");
    xhr.send();
}

function user_releases_generateOne(name, episode, episodes, aired, state, update, id, st_string, image, shigoto)
{
    var div_main = document.createElement('div');
    div_main.className = "id_post";
//    div_main.setAttribute("id", "id_post");

    var div_row_main = document.createElement('div');
    div_row_main.className = "row anime_center";
    div_row_main.setAttribute("id", "anime_center_" + id);
//    var pos = position + offset;
//    div_row_main.setAttribute("position_center", pos);

    var div_col_main = document.createElement('div');
    div_col_main.className = "col-md-11 col-xs-11";

    var div_row_inner = document.createElement('div');
    div_row_inner.className = "row";

    var div_col_image = document.createElement('div');
    div_col_image.className = "col-md-3 col-xs-3";

    var img = document.createElement('img');
    img.className = "img-rounded";
    img.setAttribute("src", image);
    img.setAttribute("width", "150px");

    div_col_image.appendChild(img);

    var div_col_text = document.createElement('div');
    div_col_text.className = "col-md-9 col-xs-9";

    var d_date = new Date(update);

    var dt = d_date.toLocaleString("ru", date_options);

    div_col_text.innerHTML = "<h3>" + name + " &raquo; <span id='anime_center_" + id + "_update' >" + dt + "</span></h3>\n";

    var div_prog = document.createElement('div');
    div_prog.className = 'progress';

    var div_progress = document.createElement('div');
    var class_string = 'progress-bar';
    div_progress.setAttribute("id", "prbar_center1_"+id);

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
    div_progress1.setAttribute("id", "prbar_center2_"+id);

    div_prog.appendChild(div_progress1);

    if (parseInt(aired) > parseInt(episode))
        $(div_progress1).show();
    else
        $(div_progress1).hide();

    div_col_text.appendChild(div_prog);

    var p_class = document.createElement('p');
    p_class.innerHTML = "<b>" + shigoto + "</b>";
    div_col_text.appendChild(p_class);

    var a_href = document.createElement('a');
    a_href.className = "btn btn-default";
    a_href.setAttribute('href', "/anime.php?id=" + id);
    a_href.setAttribute("role", "button");
    a_href.innerHTML = "Подробнее";
    div_col_text.appendChild(a_href);

    div_row_inner.appendChild(div_col_image);
    div_row_inner.appendChild(div_col_text);

    div_col_main.appendChild(div_row_inner);

    div_row_main.appendChild(div_col_main);

    div_main.appendChild(div_row_main);

    return div_main;
}