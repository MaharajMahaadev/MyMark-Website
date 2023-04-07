var searchItem_stockname;
var StocksNameList = ["Adobe", "Adobe Inc.", "Alibaba Group", "Amazon", "AMD", "American Tower Corporation", "Apple", "Bank of America", "Chevron Corporation", "Cisco Systems", "Coca-Cola Company", "Colgate-Palmolive Company", "Facebook", "Google", "HDFC Bank Limited", "Intel", "JP Morgan Chase", "Johnson & Johnson", "Mastercard Incorporated", "McDonald's Corporation", "Microsoft", "NVIDIA", "Netflix", "Nike", "Oracle Corporation", "PayPal Holdings", "PepsiCo", "Pfizer", "Reliance", "StarBucks Corporation", "Tesla", "Toyota Motors", "Unilever PLC", "United Parcel Service", "UnitedHealth Group Incorporated", "Visa", "Walmart Inc.", "Walt Disney", "Zoom video"];
var SearchInfo;
function getDate(num) {
    var MonthList = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = new Date();
    date.setDate(date.getDate() - num);

    var req_date = (date.getDate()) + '' + (MonthList[date.getMonth()]);

    return req_date;

}

var today = new Date();

var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
function openNew() {

    searchItem_stockname = document.getElementById("search-box").value;

    //if(searchItem_stockname=="" || searchItem_stockname=="Please enter valid stock name"){
    if (StocksNameList.includes(searchItem_stockname)) {
        window.open("../HTML code/Page3(stock info and compare page).html", "_self");
        document.getElementById("search-box").classList.remove("mystyle");
        SearchInfo = searchItem_stockname;
        localStorage.setItem("stockSearch", SearchInfo);
    }
    else {
        document.getElementById("search-box").value = "";
        document.getElementById("search-box").placeholder = "Select Stock only from Dropdown..";
        document.getElementById("search-box").classList.add("mystyle");
    }


}



function ligma() {

    var clist = new Array("GOOGL", "TSLA", "META", "IBM", "AMZN");
    var dlist = new Array("1. open", "2. high", "3. low", "4. close");
    var table = document.getElementById('table');
    var row = table.rows[0];
    var temp = 1;
    for (var i = 0; i < 5; i++) {

        $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + clist[i] + "&apikey=a229ECWBYRZ0HM8PF")
            .done(function (data) {



                table.rows[temp].cells[0].innerHTML = data["Meta Data"]["2. Symbol"];
                //row = table.rows[i];

                console.log("Values = ", temp);
                for (var j = 1, col; j <= 4; j++) {
                    col = table.rows[temp].cells[j];
                    col.innerHTML = data["Time Series (Daily)"]["2023-03-31"][dlist[j - 1]];
                }
                temp++;
                //console.log(data);
                console.log(data["Time Series (Daily)"]['2023-03-31']["1. open"]);
                var array = Object.values(data["Time Series (Daily)"]);
                console.log(array[0][0]);
                const date = new Date();

                let day = date.getDate();
                let month = date.getMonth();
                let year = date.getFullYear();

                // This arrangement can be altered based on how we want the date's format to appear.
                let currentDate = `${day}-${month}-${year}`;
                console.log(currentDate); // "17-6-2022"

            })
            .fail(function (textStatus, error) {
                alert(textStatus + " " + error + "\nReload the page");
            })
    }
};

function ligma1() {



    $.getJSON("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=a229ECWBYRZ0HM8PF")
        .done(function (data) {



            for (let i = 0; i < 3; i++) {
                document.getElementsByClassName("ntitle")[i].innerHTML = data["feed"][i]["title"];
                document.getElementsByClassName("nsummary")[i].innerHTML = data["feed"][i]["summary"];
                document.getElementsByClassName("nlink")[i].innerHTML = data["feed"][i]["url"];
                document.getElementsByClassName("nclick")[i].href = data["feed"][i]["url"]

                console.log(data["feed"][0]["title"]);
            }

        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
};

window.onload = ligma1();