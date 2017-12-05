$(document).foundation();

$(document).ready(function() {
    createSlider();
    countDown();
    changeLang();
    loadLanguage(getCurrentLanguage());
});

//PRIVATE FUNCTION
function createSlider() {
    $('.slick-slider').slick({
        accessibility: true,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        arrows: false
    });
}

function countDown() {
    //count down function
    //set the Date to count don from, in mili-seconds, month is zero-based
    var countDownDate = new Date("Sep 13, 2018").getTime();

    //update the count down for everu seconds
    var countdownInterval = setInterval(function() {

        //get todays date and time, in mili-seconds
        var now = new Date().getTime();

        //find the distance between now nd the destination date, in mili-seconds
        var distance = countDownDate - now;

        //change the distance time into days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
        var seconds = Math.floor(distance % (1000 * 60) / 1000);

        //bind the result into the HTML
        $("#dd .number").text(days);
        $("#hh .number").text(hours);
        $("#mm .number").text(minutes);
        $("#ss .number").text(seconds);
        //set the number sescription
        // $("#dd .desc").text("days");
        // $("#hh .desc").text("hours");
        // $("#mm .desc").text("mins");
        // $("#ss .desc").text("secs");

        //clear interval if the time has come
        if (distance < 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

//get Cookie
function getCookie(cookieName) {
    var theCookie = document.cookie;
    let cookieArray = theCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        let aCookie = cookieArray[i].split("=");
        if (aCookie[0] === cookieName) {
            return aCookie[1];
        }
    }
}
//Set Cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

function getCurrentLanguage() {
    var currentLang = getCookie("lang");
    if ((currentLang === '') || (currentLang === undefined)) {
        currentLang = 'en';
        setCookie("lang", "en", 365);
    }
    return currentLang;
}


/*
 * Language store and change function
 */
function changeLang() {
    $('.translate').click(function() {
        let self = $(this);

        //get the language to change to
        var lang = self.attr('id');

        //set the cookie to remember the chosen language
        console.log('lang=' + lang);
        setCookie("lang", lang, 360);
        console.log(getCookie("lang"));
        console.log('currentLang: ' + getCurrentLanguage());

        //load the language
        loadLanguage(lang);
        //set [active] status for the active button
        setActive(self);
    });
};

function setActive(e) {
    //Remove [active] class of all and add the class to the source action
    $('.translate').removeClass('active');
    e.addClass('active');
}

function loadLanguage(lang) {
    $('.translate#' + lang).addClass('active');
    $('.lang').each(function(index, element) {
        let self = $(this);
        // setActive(self);
        self.html(arrLang[lang][self.attr('data-key')]);
    });
}