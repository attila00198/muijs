# MUI.js Demo

Ez a projekt egy **bemutató oldal**, amely a [MUI.js](./mui.js) JavaScript könyvtár használatát szemlélteti.
Az oldal kizárólag a `mui.js` wrapper függvényeivel és láncolható metódusaival épül fel, hagyományos HTML markup használata nélkül.

## Fő funkciók

* **Navigációs menü** Bootstrap 5 osztályokkal
* **Tab rendszer** egyszerű váltással a tartalmak között
* **Űrlapok** (belépés, regisztráció, kapcsolat) – a beküldött adatok megjelennek az oldalon
* **Számláló példa** – gombokkal növelhető/csökkenthető érték
* **Képgaléria** – rácsos elrendezéssel és Bootstrap modális nézettel
* **Egyszerű állapotkezelés** (`state` objektum segítségével)
* **Footer** dinamikus HTML-ből (`.setHTML()`)

## Hogyan működik?

* Az `app.js` fájl összefűzi az oldal részeit: menü, oldalak (Home, Formok, Galéria), és a lábléc.
* Az oldalak komponensként vannak megírva (függvények, amik DOM node-okat adnak vissza).
* A `mui.js` biztosítja az alap építőkockákat (`div()`, `p()`, `btn()`, `input()` stb.) és az extra metódusokat (`.setClass()`, `.setId()`, `.onClick()`, `.setHTML()` stb.).

## Futtatás

1. Klónozd a repót:

   ```bash
   git clone <repo-url>
   ```
2. Nyisd meg a `index.html` fájlt böngészőben.
   (Fontos: legyen benne egy `div#root`, ide rendereli az `app.js` az oldalt.)