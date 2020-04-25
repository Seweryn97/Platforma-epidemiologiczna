/**
 * @author Seweryn Drążek
 * @type {HTMLCollectionOf<Element>}
 *
 *version v12.16.1
 */

/**
 * @param menu odpowiada elementom <div>  z index.html o nazwie klasy "menu"
 * @param numberButton odpowiada elementowi <div>  z index.html o identyfikatorze "phonebuttondiv"
 * @param body odpowiada elementowi <body>
 *
 */
const menu  = document.getElementsByClassName("menu");
const numberButton = document.getElementById("phonebuttondiv");
const body = document.getElementById("body");
const displayingInfoFromMenu = document.getElementsByClassName("info");
const exitButton = document.getElementsByClassName("exitbutton");
const cont = document.getElementById("container");

/**
 *
 * @param menu  przyslana tablice klas dotyczącą elementów znajdujących się w menu
 * @param button  przsyłany <div> z przyciskiem
 * @constructor ustawia przysłane elementy
 *
 * Zadaniem klasy jest pokazywanie, lub ukrywanie paska menu w zależności od szeroko ści okna przeglądarki
 *
 */

function DisplayMenu(menu , button) {
    this.menu = menu;
    this.button = button;
    /**
     * checkCorrectSize
     * @returns boolean lub false w zależności czy aktualna szerokość okna przegladarki przekrasza 80% szerokości ekranu
     * monitora czy tez nie
     */
    this.checkCorrectSize = function () {
        return window.innerWidth >= screen.width *0.8;
    };

    /**
     * hideOrDisplay ustawia element display w zależności od przysłanej wielkoscli okna przeglądarki
     */
    this.hideOrDisplay = function () {
        let i;
        if(!this.checkCorrectSize()){
            for(i = 0; i<menu.length ; i++){
                this.menu[i].style.display = "none";
            }
            this.button.style.display = "none";
        }
        else {
            for(i =0; i<menu.length ; i++){
                this.menu[i].style.display = "";
            }
            this.button.style.display = "";
        }
    }
}

function DisplayOrHideMenuFrames(menu, displaydiv,exit,container) {
    this.menu = menu;
    this.displaydiv = displaydiv;
    this.exit = exit;
    this.container = container;
    const self = this;

    this.showFrame = function (num) {
        this.menu[num].onclick = function () {
            self.displaydiv[num].style.display = "block";
            self.container.style.opacity= "0.6";
        }
    };

    this.hideFrame = function (num) {
        this.exit[num].onclick = function () {
            self.displaydiv[num].style.display = "none";
            self.container.style.opacity= "unset";
        };
    };

    this.showOrHideFrame = function () {
        for (let i = 0 ; i < menu.length ; i++){
            this.showFrame(i);
            this.hideFrame(i)
        }
    };

}

const dispmenu = new DisplayMenu(menu,numberButton);
const display =new DisplayOrHideMenuFrames(menu, displayingInfoFromMenu,exitButton,cont);
display.showOrHideFrame();

body.onresize = function() {
    dispmenu.hideOrDisplay();
};












