# DOMino

Egy könnyűsúlyú, funkcionális szemléletű JavaScript könyvtár, amely
DOM-elemekből épít fel újrafelhasználható UI komponenseket.

> „Rakd le a DOMino köveket, építsd fel az UI-t.”

## Mi ez?

A DOMino célja, hogy egyszerű és láncolható API-t adjon HTML elemek
létrehozásához és kezeléséhez, közvetlen markup írása nélkül.  
Az egész oldal JavaScriptből épül fel, ahelyett hogy kézzel írnál HTML-t.

Ez a repo tartalmaz egy **demó alkalmazást** is (`app.js`), ami bemutatja
a DOMino használatát különböző példákon keresztül.

## Fő funkciók

- **Navigációs menü** (Bootstrap 5 osztályokkal)
- **Tab rendszer** egyszerű váltással a tartalmak között
- **Űrlapok** (belépés, regisztráció, kapcsolat) – a beküldött adatok megjelennek az oldalon
- **Számláló példa** – gombokkal növelhető/csökkenthető érték
- **Képgaléria** – Bootstrap grid elrendezéssel
- **Egyszerű állapotkezelés** (`state` objektum segítségével)
- **Footer** dinamikus HTML-lel (`.setHTML()`)

## Hogyan működik?

- A `domino.js` fájl adja az alap építőkockákat (`div()`, `p()`, `btn()`, `input()` stb.),  
  valamint a láncolható metódusokat (`.setClass()`, `.setId()`, `.onClick()`, `.setHTML()` stb.).
- Az `app.js` fájl összefűzi az oldal részeit: menü, oldalak (Home, Formok, Galéria), és a lábléc.  
- Az oldalak komponensként vannak megírva: függvények, amik DOM node-okat adnak vissza.

## Futtatás

1. Klónozd a repót:  
   ```bash
   git clone <repo-url>
