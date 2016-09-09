/**
 * Created by stepa on 28.08.2016.
 */
function video_generateOne(a_name, a_russian, a_episodes, episode, name, russian, url, a_episodes_ready)
{
    var div_main = document.createElement('div');
    div_main.setAttribute("id", "video_id");

    var h_name = document.createElement('h2');
    h_name.innerHTML = a_name + " / " + a_russian;
    div_main.appendChild(h_name);

    if (a_episodes > 1)
    {
        var h_episode = document.createElement('h3');
        var ep_text = "Серия " + episode;
        if (name != null && name != "" && russian != null && russian != "")
            ep_text += " &ndash; " + name + " / " + russian;
        h_episode.innerHTML = ep_text;
        div_main.appendChild(h_episode);
    }

    var div_row_inner = document.createElement('div');
    div_row_inner.className = "row";

    var center = document.createElement('center');
    center.innerHTML = url;

    div_row_inner.appendChild(center);

    div_main.appendChild(div_row_inner);

    //------------------------

    var div_row_inner1 = document.createElement('div');
    div_row_inner.className = "row";

    var center1 = document.createElement('center');

    var div_btn_group = document.createElement('div');
    div_btn_group.className = "btn-group";

    for (i = 1; i <= a_episodes; i++)
    {
        var button = document.createElement('button');
        var clName = "btn btn-default";
        button.setAttribute("type", "button");

        if (i == episode)
            clName += ' active';
        if (i > a_episodes_ready)
            clName += ' disabled';

        button.className = clName;
        button.setAttribute("id", "episode" + i);
        button.setAttribute("onclick", "loadSome(" + i + ", true)");
        button.innerHTML = i;

        div_btn_group.appendChild(button);
    }

    center1.appendChild(div_btn_group);
    div_row_inner.appendChild(center1);

    div_main.appendChild(div_row_inner1);

    return div_main;
}