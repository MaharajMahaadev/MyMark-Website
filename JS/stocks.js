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

window.company_t = {
    //popular company list
    "Microsoft": "MSFT",
    "Apple": "AAPL",
    "Google": "GOOGL",
    "Netflix": "NFLX",
    "Adobe": "ADBE",
    "Tesla": "TSLA",
    "Facebook": "FB",
    "Intel": "INTC",
    "Zoom video": "ZM",
    "AMD": "AMD",
    "Reliance": "RELI",
    "Amazon": "AMZN",
    "Alibaba Group": "BABA",
    "Visa": "V",
    "JP Morgan Chase": "JPM",
    "Johnson & Johnson": "JNJ",
    "Walmart Inc.": "WMT",
    "UnitedHealth Group Incorporated": "UNH",
    "Mastercard Incorporated": "MA",
    "Bank of America": "BAC",
    "Nvidia": "NVDA",
    "Walt Disney": "DIS",
    "PayPal Holdings": "PYPL",
    "Coca-Cola Company": "KO",
    "Adobe Inc.": "ADBE",
    "Oracle Corporation": "ORCL",
    "Cisco Systems": "CSCO",
    "Pfizer": "PFE",
    "Nike": "NKE",
    "Toyota Motors": "TM",
    "Chevron Corporation": "CVX",
    "PepsiCo": "PEP",
    "United Parcel Service": "UPS",
    "McDonald's Corporation": "MCD",
    "Unilever PLC": "UL",
    "StarBucks Corporation": "SBUX",
    "HDFC Bank Limited": "HDB",
    "American Tower Corporation": "AMT",
    "Colgate-Palmolive Company": "CL",

}

var today = new Date();

var sebo;

var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
function openNew() {

    searchItem_stockname = document.getElementById("search-box").value;
    sebo = searchItem_stockname;

    if (StocksNameList.includes(searchItem_stockname)) {

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

const api_key = "229ECWBYRZ0HM8PF";





$(document).ready(function () {



    window.stockSearch = localStorage.getItem("stockSearch");

    // $('#inp').val(stockSearch);
    document.getElementById("inp").value = stockSearch;
    time_range = "TIME_SERIES_WEEKLY";
    loop = 5;
    time_type = "Weekly Time Series";

    $(".time-range").children()[2].style.backgroundColor = "#0b4279";
    $('.time-range').children()[2].style.color = "white";


    $('#s1').click();

    $('#inp').css({
        color: "white"
    })



})

$('#inp').focus(function () {
    //input focus

    res_size()
    $('#inp').css({
        backgroundColor: "white",
        color: "black",
        borderRadius: '10px 10px 0px 0px',
    })
    $('.res').css({
        display: 'block',
        border: '1px solid grey',
        "z-index": 4,
    })
    $('.res-list').css({
        display: 'block',
    })
})
$('#inp').focusout(function () {

    setTimeout(function () {
        $('#inp').css({
            backgroundColor: "transparent",
            color: "white",
            borderRadius: '0px',

        })
        $('.res').css({
            display: 'none',
            border: 'none'
        })
        $('.res-list').css({
            display: 'none',
        })
    }, 300)


})

function get_keyword_search_result() {

    console.log($('#inp').val())
    $.getJSON("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + $('#inp').val() + "&apikey=" + search_key)
        .done(function (data) {

            console.log("Searched")

            obj = data.bestMatches
            // console.log(obj)
            // console.log(obj["2. name"])

            if (obj == undefined) return;
            if (obj == {}) return;

            company = {};




            let k = (Object.keys(obj).length < 8) ? Object.keys(obj).length : 8;


            for (let i = 0; i < k; i++) {
                // console.log(obj[i]["2. name"]+" = "+obj[i]["1. symbol"])
                if (obj[i]["2. name"].length > 20) continue;
                company[obj[i]["2. name"]] = obj[i]["1. symbol"]
            }



        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })

    return company;
}


//storing function in x to call it later
var x = $('#inp, #inp2').keyup(function (e) {

    console.log(e)
    var w = e["target"]["id"] == "inp" ? 1 : 0;

    if (w) {
        $('.res-list').empty();
    }
    else {
        $('.res-list1').empty();
    }



    window.final_company = company;
    // company = get_keyword_search_result()

    company = {}


    for (i in company_t) {

        if (i.search($(this).val().charAt(0).toUpperCase() + $(this).val().slice(1)) >= 0) {
            company[i] = company_t[i]
        }
    }


    let temp = Object.keys(company)

    if (w) {
        for (let i = 0; i < temp.length; i++) {
            li = document.createElement('LI')
            li.innerText = temp[i];
            $(li).appendTo('.res-list')
            res_size();
        }
    }
    else {
        for (let i = 0; i < temp.length; i++) {
            li = document.createElement('LI')
            li.innerText = temp[i];
            $(li).appendTo('.res-list1')
            res_size1();
        }
    }

})


var wegot = "IBM";
$(document).on("click", '.res-list li', function () {

    $('#inp').val(this.innerText);

    let myre = document.getElementById('inp').value;
    console.log(myre);

    console.log(Object.keys(window.company_t["Microsoft"]));

    for (const property in window.company_t) {
        if (property === myre) {
            console.log(window.company_t[property]);
            wegot = window.company_t[property];
        }
    }



})

function res_size() {

    let temp = $('.res-list').children();
    $('.res').css({
        "min-height": "250px",

    })
}



$('.time-range li').click(function () {
    //this event will listen to which time-range user want to see graph

    for (let i = 0; i < 5; i++) {

        $('.time-range').children()[i].style.backgroundColor = "white";
        $('.time-range').children()[i].style.color = "black";
    }

    let inp = this.innerText;//getting time-range that user is clicked

    this.style.backgroundColor = "#0b4279" //changing color to clicked time-range
    this.style.color = "white"

    window.time_range = "";
    window.loop = 0;
    window.time_type = "";


    if (inp == '1D') {
        time_range = "TIME_SERIES_INTRADAY";
        loop = 10;
        time_type = "Time Series (5min)";

    }
    else if (inp == '1W') {
        time_range = "TIME_SERIES_DAILY_ADJUSTED";
        loop = 7;
        time_type = "Time Series (Daily)";
    }
    else if (inp == '1M') {
        time_range = "TIME_SERIES_WEEKLY";
        loop = 5;
        time_type = "Weekly Time Series";
    }
    else if (inp == '1Y') {
        time_range = "TIME_SERIES_MONTHLY";
        loop = 12;
        time_type = "Monthly Time Series";
    }
    else {
        time_range = "TIME_SERIES_MONTHLY";
        loop = 60;
        time_type = "Monthly Time Series";
    }

    get_data();

})

function get_data() {


    //this function will be used to get company infomation
    $.getJSON("https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + wegot + "&apikey=" + api_key)
        .done(function (data) {


            if (data["Note"] != undefined || data["Information"] != undefined) {
                console.log(data)
                $('#alert-box p').text("The key is used maximum time \nplease 'change the Api key -> 1'")
                show_overlay();
                hide_loading_animation();
                return;
            }
            console.log(sebo);
            document.getElementsByClassName("infoval")[0].innerHTML = sebo;
            var idata = new Array("Name", "Symbol", "AssetType", "Exchange", "Currency", "Country", "Sector", "Industry", "Address", "Description");
            for (var i = 0; i < 10; i++) {

                document.getElementsByClassName("infoval")[i].innerHTML = data[idata[i]];
                //and putting all data of new company in div
                //prepending div to info-box
            }


        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })
    let l = [], d = [];
    api_key1 = "DLDFRT3OS2GC4CS9";
    //l containt labels, and d contain data points 
    console.log("We ", wegot);
    const ligma = wegot;
    let url = "https://www.alphavantage.co/query?function=" + time_range + "&symbol=" + ligma + "&outputsize=full&apikey=" + api_key1;
    console.log(time_range);

    //changing url according to time range has been selected 
    if (time_range == "TIME_SERIES_INTRADAY") {

        url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + ligma + "&interval=5min&apikey=" + api_key1;
    }
    else {

        url = "https://www.alphavantage.co/query?function=" + time_range + "&symbol=" + ligma + "&apikey=" + api_key1;
    }

    $.getJSON(url)
        .done(function (data) {
            //this funciton will fetch data and label that will be shown on graph
            console.log(data)
            let c_data = data[time_type];


            let k = 0;

            open_high = []

            // console.log(c_data)

            for (i in c_data) {
                if (k == 0) {
                    document.getElementsByClassName("itable")[0].innerHTML = c_data[i]["1. open"];
                    document.getElementsByClassName("itable")[1].innerHTML = c_data[i]["2. high"];
                    document.getElementsByClassName("itable")[2].innerHTML = c_data[i]["3. low"];
                    document.getElementsByClassName("itable")[3].innerHTML = c_data[i]["4. close"];
                    document.getElementById("3name").innerHTML = data["Meta Data"]["3. Last Refreshed"];
                    document.getElementById("3sym").innerHTML = data["Meta Data"]["2. Symbol"];
                }
                if (k == loop) { //only getting loop amount of data 
                    break;
                }

                l.push(i)//here pushing label-data in lable
                d.push(c_data[i]["4. close"]);

                k += 1;
            }



            l.reverse();
            // console.log(l)
            d.reverse();

            if (time_range == "TIME_SERIES_INTRADAY") {


                for (let i = 0; i < l.length; i++) {
                    temp = l[i].split(" ")[1].split(":");
                    l[i] = temp[0] + ":" + temp[1];
                }

            }
            else if (time_range == "TIME_SERIES_MONTHLY" && l.length == 60) {

                for (let i = 0; i < l.length; i++) {
                    l[i] = l[i].split("-")[0]

                }
            }

            console.log(l)

            if (data["Note"] != undefined || data["Information"] != undefined) {
                $('#alert-box p').text("The key is used maximum time \nplease 'change the Api key -> 2'")
                show_overlay();
                return;

            }

            let name = data["Meta Data"]["2. Symbol"];//getting name of stock

            // console.log(data)


            hide_loading_animation();
            if (window.ctx == undefined) {
                //if ctx is not defined put the graph 
                put_chart(l, d, name);
            }
            else {
                //else update the graph
                console.log("me");
                update_chart(l, d, name);
                $('#info-box').animate({ scrollLeft: 0 }, 300);
                $('.c-button').text('›');
                $('.c-button').css({
                    color: "white",
                })


            }


        })
        .fail(function (textStatus, error) {
            alert(textStatus + " " + error + "\nReload the page");
        })

}


function put_chart(l, d, name1) {

    hide_loading_animation();

    window.ctx = document.getElementById('myChart').getContext('2d');

    window.chart = new Chart(ctx, {

        type: 'line',


        data: {

            labels: l,
            datasets: [{
                label: name1,
                backgroundColor: '#517BE2',
                borderColor: '#5cdb95',
                data: d,

            }, {
                label: "",
                borderColor: 'red',
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Stock price In $'
                    }

                }],
                xAxes: [{

                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 4,
                        major: {
                            fontStyle: 'bold',
                            fontColor: 'black'
                        }
                    }
                }]
            }
        },


    });
}

function update_chart(l, d, name) {


    hide_loading_animation();

    chart.data.labels = l;
    chart.data.datasets[0].data = d;
    chart.data.datasets[0].label = name;


    chart.update();

}


function hide_overlay() {
    $('#overlay').hide();
    $('body').css({
        'overflow': 'scroll',
    })
    $('#alert-box').show();
    $('#buy-box').hide()
    $('#payment').hide()
    $('#payment-complete').hide()
}

function show_loading_animation() {
    $('#chart-overlay').show()
}

function hide_loading_animation() {
    $('#chart-overlay').hide()
}

function show_overlay() {
    $(window).scrollTop(0);
    $('#overlay').show()

}

function set_open_high(arr, w) {
    let x;
    if (w) {
        x = $('#t1 .data_point').children()["prevObject"];
        $('.com-1 h2').text($('#inp').val())
    }
    else {
        x = $('#t2 .data_point').children()["prevObject"];
        $('.com-22 h2').text($('#inp2').val())
    }

    for (let i = 0; i < 5; i++) {
        x[i]["innerHTML"] = "<b>$" + arr[i] + "</b>";
    }




}
