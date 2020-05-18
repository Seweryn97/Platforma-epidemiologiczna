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
 * @constructor ustawia przysłane elementy
 *
 * Zadaniem klasy jest pokazywanie, lub ukrywanie elementów w zależności od szeroko ści okna przeglądarki
 *
 */

function HideOrChangeComponentsOnResize(menu, button, generalstats, statsbox) {
    this.menu = menu;
    this.button = button;
	this.generalstats = generalstats;
	this.statsbox = statsbox;
    /**
     * checkCorrectSize
     * @returns boolean true lub false w zależności czy aktualna szerokość okna przegladarki przekrasza 80% szerokości ekranu
     * monitora czy tez nie
     */
    this.checkCorrectSize = function () {
        return window.innerWidth >= screen.width * 0.87;
    };

    /**
     * hideOrChange ustawia element display w zależności od przysłanej wielkoscli okna przeglądarki
     */
    this.hideOrChange = function () {
        let i;
        if (!this.checkCorrectSize()) {
            for (i = 0; i < menu.length; i++) {
                this.menu[i].style.display = "none";
				this.statsbox[i].style.height = "50%";
				this.statsbox[i].style.float = "unset";
				this.statsbox[i].style.marginTop = "50%";
            }
            this.button.style.display = "none";
			this.generalstats.style.height="100px";
        } else {
            for (i = 0; i < menu.length; i++) {
                this.menu[i].style.display = "";
				this.statsbox[i].style.height = "100%";
				this.statsbox[i].style.float = "left";
				this.statsbox[i].style.marginTop = "unset";
            }
            this.button.style.display = "";
			this.generalstats.style.height="50px";
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

function DisplayOrHideMenuFrames(menu, displaydiv, exit, container) {
    this.menu = menu;
    this.displaydiv = displaydiv;
    this.exit = exit;
    this.container = container;
    const self = this;

    /**
     * showframe:
     * - wyśiwtla odpowiednie okienko po kliknieciu jednego z przycisków menu (displaydiv)
     * - zwieeksza kontrast pomiedzy wyświetlanym okienkiem a tłem
     * - pozbawia przysików menu ich funkcjoinalności
     */

    this.showFrame = function (num) {
        this.displaydiv[num].style.display = "block";
        this.container.style.opacity = "0.6";

        for (let i = 0; i < this.menu.length; i++) {
            this.menu[i].onclick = null;
            this.menu[i].style.pointerEvents = "none";
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
            self.menu[i].style.pointerEvents = "auto";
        }

    };

    /**
     * showCurrentFrame wywołuje funkję showFrame dla przycisków menu
     */

    this.showCurrentFrame = function (num) {
        this.menu[num].onclick = function () {
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
 *
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

    this.showSkypeNickFrame = function () {
        this.button.onclick = function () {
            self.skypenickframe.style.display = "block";
        }
    };

    this.exitSkypeNickFrame = function () {
        this.exitButton.onclick = function () {
            self.skypenickframe.style.display = "none";
        }

    };

    /**
     *
     */

    this.setElement = function (elemntId,user, action) {
        document.getElementById(elemntId).setAttribute("href", "skype:" + user.value + "?" + action);
    };

    function buildLinkRefs(){
        self.setElement("call-btn", self.username, "call");
    }

    this.username.addEventListener("change",function () {
        buildLinkRefs();
    },false);
    buildLinkRefs();


}


/* funkcja odpowiedzialna za zmianę w czasie rzeczywistym
 obrazków na stronie */

function changeImage(img, id)
{
	var i =0;
	var flag = false;
	var time = 0;
	var interval = setInterval(function (){
		if(i == 100) flag = true;
		if(i == 0){
			flag = false;
			img[id].style.display = "block";	
		}
		
		img[id].style.opacity = "" + i*0.01;
		
		if(flag) i--;
		else i++;
		
		time++;
		
		if (time % 200 == 0){
			img[id].style.display = "none";
			id++;
			time = 0;
		}
		if (id == 3) id = 0;
	
		
	},100);
	
}

/**
* funkcja odpowiedzilana za obsługę informacji pokzujących się po najechaniu ka konkretne województwo
* wywołana w dokumencie html
*/
function showMapInfo(name){
	
	
	var x = event.clientX;
	var y = event.clientY;
	var mapinfo = document.getElementById("interactivemapinfo");
	mapinfo.style.display = "block";
	mapinfo.style.top = y +"px";
	mapinfo.style.left = x+"px";
	mapinfo.innerHTML = name;
	
}
function hideMapInfo(){
	document.getElementById("interactivemapinfo").style.display = "none";
}

/**
 * @param menu odpowiada elementom <div>  z index.html o nazwie klasy "menu"
 * @param numberButtonDiv odpowiada elementowi <div>  z index.html o identyfikatorze "phonebuttondiv"
 * @param body odpowiada elementowi <body>
 * @param displayingInfoFromMenu odpowiada pojawiającym się okienkom po wcisnięciu przycisku z menu
 * @param exitButton odpowiada przyciskom zmaykajacym pojawiające sie okienka
 * @param cont odpowiada elementowi <div> w którym sa umieszczone pozostałe <div>
 * @param numberButton
 * @param skypeNickFrame
 * @param exitSkypeFrameButton
 * @param userName
 * @param statsBox
 * @param generalStats
 * @param image
 */
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
const generalStats = document.getElementById("generalstats");
const image = document.getElementsByClassName("image");

/**-----------------------------------------WYWOłANIA----------------------------------------------------------------**/

const hideorchange = new HideOrChangeComponentsOnResize(menu, numberButtonDiv,generalStats, statsBox);
const display = new DisplayOrHideMenuFrames(menu, displayingInfoFromMenu, exitButton, cont);
const enableSkype = new EnableSkype(numberButton,  userName, skypeNickFrame, exitSkypeFrameButton);

display.showOrExitFrame();
enableSkype.showSkypeNickFrame();
enableSkype.exitSkypeNickFrame();


body.onresize = function () {
    hideorchange.hideOrChange();
};


var id = 0;
changeImage(image,id);





