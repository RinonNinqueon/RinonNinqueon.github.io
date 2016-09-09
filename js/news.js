/**
 * Created by stepa on 01.08.2016.
 */
var news_offset = 0;
var page_end = false;
var last_post_id = 0;

function news_load_posts(offset, update)
{
//    console.log("News.load.posts");
    var xhr = new XMLHttpRequest();
    var p_url = "get_news.php?start=";
    if (update)
        p_url += "0&update=" + last_post_id;
    else {
        p_url += offset;
        $('#load_spinner').show();
    }

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
//            console.log("News.load.posts.ready");
            var data = xhr.responseText;
            var parsed = JSON.parse(data);

            var news_titles = [];
            if (parsed.length > 0)
            {
//                console.log("News.load.posts.exists");
                parsed.forEach(function (item, i, arr)
                {
                    var m_d = news_generateOne(item.id, item.title, item.date, item.description, item.image);
                    news_titles[news_titles.length] = item.title;

                    if (update)
                    {
//                        console.log("News.load.posts.update");
                        $(m_d).hide();
                        $("#main_content").prepend(m_d);
                        news_offset++;
//                        console.log(news_offset);
                    }
                    else
                    {
                        $("#main_content").append(m_d);
                    }

//                    document.getElementById("main_content").appendChild(m_d);
                    if (parseInt(item.id) > last_post_id)
                    {
                        last_post_id = item.id;
//                        console.log(last_post_id + " is biggest");
                    }
                });

                if (update)
                {
                    $("#news_avaliable").show();
                    Notify.generate('Новые события:', news_titles, 1);
                }
                else
                {
                    var page = news_offset / 5;
                    console.log(page);
//                    $("#page_"+(page-1)).removeClass('active');
//                    $("#page_"+(page)).addClass("active");
                }
            }
            else
            {
                $('#load_spinner').hide();
                if (!update)
                {
//                    console.log("News.load.posts.end_of_page");
                    news_offset -= 5;
                    page_end = true;
                }
            }
        }
    };
    xhr.open('GET', p_url, true);
    //			console.log("xhr.send");
    xhr.send();
}

function news_generateOne(id, title, date, desc, image)
{
    var div_main = document.createElement('div');
    div_main.className = "id_post";
//    div_main.setAttribute("id", "id_post");

    var div_row_main = document.createElement('div');
    div_row_main.className = "row";
    div_row_main.setAttribute("id", "post_" + id);

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

    var d_date = new Date(date);

    var dt = d_date.toLocaleString("ru", date_options);

    div_col_text.innerHTML = "<h2>" + title + " &raquo; <span>" + dt + "</span></h2>" +
        "<p>" + desc + "</p>";


    var a_href = document.createElement('a');
    a_href.className = "btn btn-default";
    a_href.setAttribute('href', "/post.php?id=" + id);
    a_href.setAttribute("role", "button")
    a_href.innerHTML = "Подробнее";
    div_col_text.appendChild(a_href);

    div_row_inner.appendChild(div_col_image);
    div_row_inner.appendChild(div_col_text);

    div_col_main.appendChild(div_row_inner);

    div_row_main.appendChild(div_col_main);

    div_main.appendChild(div_row_main);

    return div_main;
}

function news_showAll()
{
    $("#news_avaliable").hide();
    $(".id_post").show(100);
}