var x = document.getElementById('entiren');

for (var i = 0; i < 15; i++) {
    x.innerHTML += '\
    <div id="Comments-inner">\
        <div class="Comments">\
            <table class="ntable">\
                <tr>\
                    <p class="ntitle">Title</p>\
                </tr>\
                <tr>\
                    <p class="nsummary">Summary</p>\
                </tr>\
                <tr>\
                    <p class="nsource">Source: </p>\
                   <a href="#" class="nclick"><p class="nlink">Link</p></a>\
                </tr>\
            </table>\
        </div>\
        <div class="Comments">\
            <table class="ntable">\
                <tr>\
                    <p class="ntitle">Title</p>\
                </tr>\
                <tr>\
                    <p class="nsummary">Summary</p>\
                </tr>\
                <tr>\
                    <p class="nsource">Source: </p>\
                   <a href="#" class="nclick"><p class="nlink">Link</p></a>\
                </tr>\
            </table>\
        </div>\
        <div class="Comments">\
            <table class="ntable">\
                <tr>\
                    <p class="ntitle">Title</p>\
                </tr>\
                <tr>\
                    <p class="nsummary">Summary</p>\
                </tr>\
                <tr>\
                    <p class="nsource">Source: </p>\
                   <a href="#" class="nclick"><p class="nlink">Link</p></a>\
                </tr>\
            </table>\
        </div>\
    </div>'
}

function ligma1() {



    $.getJSON("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=a229ECWBYRZ0HM8PF")
        .done(function (data) {



            for (let i = 0; i < 48; i++) {
                document.getElementsByClassName("ntitle")[i].innerHTML = data["feed"][i]["title"];
                document.getElementsByClassName("nsummary")[i].innerHTML = data["feed"][i]["summary"];
                document.getElementsByClassName("nlink")[i].innerHTML = data["feed"][i]["url"];
                document.getElementsByClassName("nclick")[i].href = data["feed"][i]["url"]
            }

        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
};

window.onload = ligma1();

