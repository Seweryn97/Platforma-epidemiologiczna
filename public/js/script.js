/**
 * @author Seweryn Drążek
 * @type {HTMLCollectionOf<Element>}
 *
 *version v12.16.1
 */

/**
 *
 * @param menu  przyslana tablice klas dotyczącą elementów znajdujących się w menu
 * @param button  przsyłany <div> z przyciskiem
 * @param generalstats przysłany <div> w którym znajdują się ogólne statystyki dla kraju
 * @param statsbox tablica <div> w której znajdują się wartości dla ( zachorowań, wyzdrowień i zgonów)
 * @param mapinfo <div> pojawiający się po najechaniu na dane województwo
 * @param countystats
 * @param showgeneralstats
 * @param map
 * @constructor ustawia przysłane elementy
 *
 * Zadaniem klasy jest pokazywanie, lub ukrywanie elementów w zależności od szerokości okna przeglądarki
 *
 */

//"use strict"
function HideOrChangeComponentsOnResize(menu, button, generalstats, statsbox, mapinfo, countystats, showgeneralstats , map, menuicon, smallwindowmenu) {
    this.menu = menu;
    this.button = button;
	this.generalstats = generalstats;
	this.statsbox = statsbox;
	this.mapinfo = mapinfo;
	this.countystats = countystats;
	this.showgeneralstats = showgeneralstats;
	this.map = map;
	this.menuicon = menuicon;
	this.smallwindowmenu = smallwindowmenu;

    /**
     * @function menuDisappearSize
     * @returns boolean true lub false w zależności czy aktualna szerokość okna przegladarki przekrasza 1600.4
     * szerokości ekranu
     */
    function menuDisappearSize () {
        return window.innerWidth >= 1600.4;
    }

    /**
     *@function  hideOrChangeGenaralStatsAndMenuBar odpowiada za znikanie i pojawianie sie paska menu i zmianę ułożenia
     * statystk dla Polski w zależności od szerokości okna przeglądarki
     *
     */
     this.hideOrChangeGeneralStatsAndMenuBar = function () {
        let i;
        if (!menuDisappearSize()) {
            for (i = 0; i < menu.length; i++) {
                this.menu[i].style.display = "none";
				this.statsbox[i].style.height = "50%";
				this.statsbox[i].style.float = "unset";
				this.statsbox[i].style.marginTop = "50%";
            }
            this.button.style.display = "none";
			this.generalstats.style.height="100px";
			this.menuicon.style.display = "inline";
        } else {
            for (i = 0; i < menu.length; i++) {
                this.menu[i].style.display = "";
				this.statsbox[i].style.height = "100%";
				this.statsbox[i].style.float = "left";
				this.statsbox[i].style.marginTop = "unset";
            }
            this.button.style.display = "";
			this.generalstats.style.height="50px";
            this.menuicon.style.display = "none";
            this.smallwindowmenu.style.display ="none";
        }
    };

    /**
     * @function changeSizeInteractiveInfoBox zmienia wielkości <div> pojawiających się po najechaniu na odpowiednie
     * województwo w zależności od wielkośći okna przeglądarki
     */
    this.chanageSizeInteractiveInfoBox = function () {
        if(window.innerWidth< 1400 && window.innerWidth> 830){
            this.mapinfo.style.width ="20%";
            this.mapinfo.style.height ="15%";
        }
        else if(window.innerWidth< 830){
            this.mapinfo.style.width ="25%";
            this.mapinfo.style.height ="10%";
        }
        else if(window.innerWidth> 1400){
            this.mapinfo.style.width ="15%";
            this.mapinfo.style.height ="20%";
        }
    };

    /**
     * @function changeStatsBoxesOnResize funkcja odpowiedzialna za ukrycie tabeli ze statystkyami i zmiane wielkości
     * mapy po zmniejszeniu okna przeglądarki
     */

    this.hideStatsBoxesAndChangeMapOnResize = function () {
        if(window.innerWidth<800){
            for(let i = 0 ; i < this.countystats.length ; i++){
                this.countystats[i].style.display = "none";
            }
            for(let i = 0 ; i < this.showgeneralstats.length ; i++){
                this.showgeneralstats[i].style.display = "none";
            }
            this.generalstats.style.display = "none";
            this.map.style.width = "100%";
        }
        else if(window.innerWidth>800){
            for(let i = 0 ; i < this.countystats.length ; i++){
                this.countystats[i].style.display = "block";
            }
            for(let i = 0 ; i < this.showgeneralstats.length ; i++){
                this.showgeneralstats[i].style.display = "inline";
            }
            this.generalstats.style.display = "";
            this.map.style.width = "50%";

        }
    }
}

/**
 *
 * @param menu  tablice elementów odpowiadających przyciskom w menu
 * @param displaydiv  elementy odpowiadjące wyswietlanym oknom po wciśnięciu przycisku menu
 * @param exit  element odpowiedzialny za wyłącznie okienka włączengo przez przycisk z menu
 * @param container <div> container
 * @constructor ustawia przysłane elementy
 *
 * Zadaniem klasy jest obsługa zdarzeń menu
 *
 */

function ShowOrHideInfoFrames(menu, displaydiv, exit, container,smallmenu) {
    this.menu = menu;
    this.displaydiv = displaydiv;
    this.exit = exit;
    this.container = container;
    this.smallmenu = smallmenu;
    const self = this;

    /**
     * showframe:
     * - wyśiwtla odpowiednie okienko po kliknieciu jednego z przycisków menu (displaydiv)
     * - zwieeksza kontrast pomiedzy wyświetlanym okienkiem a tłem
     * - pozbawia pozostalych przysików menu ich funkcjoinalności
     */

    this.showFrame = function (num) {
        this.displaydiv[num].style.display = "block";
        this.container.style.opacity = "0.6";

        for (let i = 0; i < this.menu.length; i++) {
            this.menu[i].onclick = null;
            this.smallmenu[i].onclick =null;
            this.menu[i].style.pointerEvents = "none";
            this.smallmenu[i].style.pointerEvents = "none";
        }
    };

    /**
     * exitFrame:
     * - zamyka wyświetlane okienko
     * - przywraca odpowiedni kontrast tła
     * - przywraca funkcjonalność przyciskom menu
     */

    this.exitFrame = function (num) {
        this.displaydiv[num].style.display = "none";
        this.container.style.opacity = "unset";

        for (let i = 0; i < this.menu.length; i++) {
            this.menu[i].onclick = function () {
                self.showFrame(i);
            };
            this.smallmenu[i].onclick = function () {
                self.showFrame(i);
            };
            self.menu[i].style.pointerEvents = "auto";
            self.smallmenu[i].style.pointerEvents = "auto";
        }
    };

    /**
     * showCurrentFrame wywołuje funkję showFrame dla przycisków menu
     */

    this.showCurrentFrame = function (num) {
        this.menu[num].onclick = function () {
            self.showFrame(num)
        };
        this.smallmenu[num].onclick = function () {
            self.showFrame(num)
        }
    };

    /**
     * exitCurrentFrame wywołuje funkcję exitFrame dla przycisków exit
     */

    this.exitCurrentFrame = function (num) {
        this.exit[num].onclick = function () {
            self.exitFrame(num);
        };
    };

    this.showOrExitFrame = function () {
        for (let i = 0; i < this.menu.length; i++) {
            this.showCurrentFrame(i);
            this.exitCurrentFrame(i)
        }
    };
}

/**
 * @param button opisuje przycisk z numerem infolonii
 * @param username opisuje input do którego jest wpisywana nazwa skype
 * @param skypenickframe opisuje okinko które się pojawia po kliknięciu @param button
 * @param exitButton opisuje przysik zamykjący pojawiające sie okienko skype
 * @constructor
 */

function EnableSkype(button , username, skypenickframe, exitButton) {
    this.button = button;
    this.username = username;
    this.skypenickframe = skypenickframe;
    this.exitButton = exitButton;
    var self = this;

    /**
     * @function showSkypeNickFrame funkcja odpowiedzilna za wyświetlanie ramki po wcisnięciu przycisku z infolinią
     */

    this.showSkypeNickFrame = function () {
        this.button.onclick = function () {
            self.skypenickframe.style.display = "block";
        }
    };

    /**
     * @function exitSkypeNickFrame funkcja odpowiedzialna za obsługe przycisku zamykającego ramkę Skype
     */
    this.exitSkypeNickFrame = function () {
        this.exitButton.onclick = function () {
            self.skypenickframe.style.display = "none";
        }
    };

    /**
     *@function setElement i buildRefs są odpowiedzialne za połaćzenie z aplikacją skype
     */

    function setElement (elemntId,user, action) {
        document.getElementById(elemntId).setAttribute("href", "skype:" + user.value + "?" + action);
    }

    function buildLinkRefs(){
        setElement("call-btn", self.username, "call");
    }

    this.username.addEventListener("change",function () {
        buildLinkRefs();
    },false);
    buildLinkRefs();


}

/** funkcja odpowiedzialna za zmianę w czasie rzeczywistym
 obrazków na stronie */

function changeImage(img, id)
{
	var i =0;
	var flag = false;
	var time = 0;

	setInterval(function (){
		if(i === 100) flag = true;
		if(i === 0){
			flag = false;
			img[id].style.display = "block";	
		}
		
		img[id].style.opacity = "" + i*0.01;
		
		if(flag) i--;
		else i++;
		
		time++;
		
		if (time % 200 === 0){
			img[id].style.display = "none";
			id++;
			time = 0;
		}
		if (id === 3) id = 0;
	},100);
	
}

/**
* funkcja odpowiedzilana za obsługę informacji pokzujących się po najechaniu na konkretne województwo
* wywołana w dokumencie html
*/
function showMapInfo(regionName,confirmed,recoverd, death) {

    var x = event.clientX;
    var y = event.clientY;
    var mapinfo = document.getElementById("interactivemapinfo");
    mapinfo.style.display = "block";
    mapinfo.style.top = y + "px";
    mapinfo.style.left = x + "px";
    mapinfo.innerHTML = "<h5>"+regionName+"</h5>" +
        "<ul><li>Zachorowań: " + confirmed+"</li>" +
        "<li>Wyzdrowień: " + recoverd+"</li>" +
        "<li>Zgonów:" + death+"</li></ul>"
	
}

/**
 * @function hideMapInfo funkcja odpwiedzilna za ukrycie <div> po ustapieniu myszki z danego województwa
 */
function hideMapInfo(){
	document.getElementById("interactivemapinfo").style.display = "none";
}



 function showSmallMenu(smallwindowmenu, menuicon){
     this.flag = true;
     this.i = 0;
     self = this;
     menuicon.onclick = function () {
         console.log(self.flag);
        if(self.flag){
            smallwindowmenu.style.display="block";
            var interval = setInterval(function () {
                smallwindowmenu.style.width=self.i*0.2+"%";
                if(smallwindowmenu.style.width === "20%"){
                    clearInterval(interval);
                }
                self.i++;
            },10);
        }
        if(!self.flag){
            var interval1 = setInterval(function () {
                smallwindowmenu.style.width=self.i*0.2+"%";
                if(smallwindowmenu.style.width === "0%"){
                    clearInterval(interval1);
                }
                self.i--;
            },10);
        }
         self.flag = !self.flag;
    }
}

/**
 * @param menu odpowiada elementom <div>  z index.html o nazwie klasy "menu"
 * @param numberButtonDiv odpowiada elementowi <div>  z index.html o identyfikatorze "phonebuttondiv"
 * @param body odpowiada elementowi <body>
 * @param displayingInfoFromMenu odpowiada pojawiającym się okienkom po wcisnięciu przycisku z menu
 * @param exitButton odpowiada przyciskom zmaykajacym pojawiające sie okienka
 * @param cont odpowiada elementowi <div> w którym sa umieszczone pozostałe <div>
 * @param numberButton przysik infolinii
 * @param skypeNickFrame ramka pojawiająca sie po kliknieciu przycisku infolinii
 * @param exitSkypeFrameButton przysicka odpowiadający za zamknięcie ramki infolinii
 * @param userName inputtext w ramce infolinii
 * @param statsBox <div> w których znajdują sie zmienijące kształ kółka z danymi
 * @param generalstats pierwszy wiersz tabeli ze statystykami
 * @param image iobrazy zmieniające sie na stronioe
 * @param mapinfo <div> wyświetl;ające się po najechaniu na województwo
 * @param countystats wiersze w tabeli dla kolejnych województw
 * @param showgeneralstats <div> w którch znajdują sie informacje np. Zachorowań, Wyzdrowień
 * @param map mapa
 * @param menuicon odpowiada za icone menu w małym oknie
 */

const id = 0;
const menu = document.getElementsByClassName("menu");
const numberButtonDiv = document.getElementById("phone-button");
const body = document.getElementById("body");
const displayingInfoFromMenu = document.getElementsByClassName("info");
const exitButton = document.getElementsByClassName("exitbutton");
const cont = document.getElementById("container");
const numberButton = document.getElementById("button");
const skypeNickFrame = document.getElementById("skypenick");
const exitSkypeFrameButton = document.getElementById("miniexit");
const userName = document.getElementById("inputtext");
const statsBox = document.getElementsByClassName("statsvisualbox");
const image = document.getElementsByClassName("image");
const mapinfo = document.getElementById("interactivemapinfo");
const countystats = document.getElementsByClassName("countystats");
const generalstats = document.getElementById("generalstats");
const showgeneralstats = document.getElementsByClassName("showgeneralstats");
const map = document.getElementById("map");
const menuicon = document.getElementById("menuicon");
const smallmenu = document.getElementsByClassName("smallmenu");
const smallwindowmenu = document.getElementById("smallwindowmenu");


/**-----------------------------------------WYWOłANIA----------------------------------------------------------------**/

const hideorchange = new HideOrChangeComponentsOnResize(menu, numberButtonDiv,generalstats, statsBox, mapinfo,
    countystats, showgeneralstats, map,menuicon,smallwindowmenu);
const display = new ShowOrHideInfoFrames(menu, displayingInfoFromMenu, exitButton, cont,smallmenu,menuicon);
const enableSkype = new EnableSkype(numberButton,  userName, skypeNickFrame, exitSkypeFrameButton);

display.showOrExitFrame();
enableSkype.showSkypeNickFrame();
enableSkype.exitSkypeNickFrame();

body.onresize = function () {
    hideorchange.hideOrChangeGeneralStatsAndMenuBar();
    hideorchange.chanageSizeInteractiveInfoBox();
    hideorchange.hideStatsBoxesAndChangeMapOnResize();
};
hideorchange.hideOrChangeGeneralStatsAndMenuBar();
hideorchange.chanageSizeInteractiveInfoBox();
hideorchange.hideStatsBoxesAndChangeMapOnResize();

changeImage(image,id);
showSmallMenu(smallwindowmenu,menuicon);



/**-------------------------------------WYKRES---------------------------------**/


google.charts.load('current', {
    'packages': ['line', 'corechart']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {


    var chartDiv = document.getElementById('chart_div');

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'day');
    data.addColumn('number', "Liczba przypadków");
    data.addColumn('number', "Liczba zgonów");
    data.addColumn('number', "Liczba wyzdrowień")

    data.addRows([
        [new Date(2020, 2, 19), -.5, 5.7, 10],
        [new Date(2020, 2, 20), .4, 8.7, 11],
        [new Date(2020, 2, 21), .5, 12, 13],
        [new Date(2020, 2, 22), -.5, 5.7, 10],
        [new Date(2020, 2, 23), .4, 8.7, 11],
        [new Date(2020, 2, 24), .5, 12, 13],
        [new Date(2020, 2, 25), -.5, 5.7, 10],
        [new Date(2020, 2, 26), .4, 8.7, 11],
        [new Date(2020, 2, 27), .5, 12, 13],
        [new Date(2020, 2, 28), -.5, 5.7, 10],
        [new Date(2020, 2, 29), .4, 8.7, 11],
        [new Date(2020, 2, 30), .5, 12, 13],
        [new Date(2020, 2, 31), -.5, 5.7, 10],


//*------- WYKRES ---------------*//


    ]);

    var materialOptions = {
        chart: {
            title: 'Covid 19'
        },
        width: 900,
        height: 500,
        series: {
            // Gives each series an axis name that matches the Y-axis below.
            0: {
                axis: 'Liczba przypadkow'
            },
            1: {
                axis: 'Liczba zgonow'
            }
        },
        axes: {
            // Adds labels to each axis; they don't have to match the axis names.
            y: {
                Temps: {
                    label: 'Liczba przypadkow'
                },
                Daylight: {
                    label: 'Liczba zgonow'
                }
            }
        }
    };

    var classicOptions = {
        title: 'Covid 19',
        width: 900,
        height: 500,
        // Gives each series an axis that matches the vAxes number below.
        series: {
            0: {
                targetAxisIndex: 0
            },
            1: {
                targetAxisIndex: 1
            },
            2: {
                targetAxisIndex: 2
            }
        },
        vAxes: {
            // Adds titles to each axis.
            0: {
                title: 'Liczba przypadkow'
            },
            1: {
                title: 'Liczba zgonow'
            },
            2: {
                title: 'Liczba wyzdrowien'
            }
        },
        hAxis: {
            ticks: [new Date(2014, 0), new Date(2014, 1), new Date(2014, 2), new Date(2014, 3),
                new Date(2014, 4), new Date(2014, 5), new Date(2014, 6), new Date(2014, 7),
                new Date(2014, 8), new Date(2014, 9), new Date(2014, 10), new Date(2014, 11)
            ]
        },
        vAxis: {
            viewWindow: {
                max: 90
            }
        }
    };

    function drawMaterialChart() {
        var materialChart = new google.charts.Line(chartDiv);
        materialChart.draw(data, materialOptions);


    }

    function drawClassicChart() {
        var classicChart = new google.visualization.LineChart(chartDiv);
        classicChart.draw(data, classicOptions);


    }

    drawMaterialChart();

}


