// ========== Globals Variables ==========
let state = { activeMenuItem: 0, counter: 0 }
let selectOptions = ["Hiba bejelentése", "Észrevétel/Javaslat", "Egyéb visszajelzés"]
let images = [
    "/static/images/pic1.png",
    "/static/images/pic2.png",
    "/static/images/pic3.png",
    "/static/images/pic4.png",
    "/static/images/pic5.png",
    "/static/images/pic6.png",
]

// ========== Helper Functions ==========
// With this function we are abel to make a complete menu using Bootstrap CSS classes
// The functions return type; similerly to all others, is a Nod (HTMLElemet)
// The parameter of the function is an array containing the labels of the menu items
// NOTE: This is a simplified solution. with this, you can't realy specifie links, but it
// good enough for an web application.
function menu(items) {
    return nav(
        div(
            a("MUI.JS", "/").setClass("navbar-brand"),
            btn("Toggle").setClass("navbar-toggler")
                .attr({
                    "data-bs-toggle": "collapse",
                    "data-bs-target": "#navbarSupportedContent",
                    "aria-controls": "navbarSupportedContent",
                    "aria-expanded": "false",
                    "aria-label": "Toggle navigation"
                }),
            div(
                ul(
                    ...items.map((item) => li(item).setClass("nav-item"))
                ).setClass("navbar-nav me-auto mb-2 mb-lg-0"),
                form(
                    input("search").setClass("form-control me-2").setPlaceholder("Keresés"),
                    btn("Keresés", "submit").setClass("btn btn-outline-success")
                ).setClass("d-flex")
            ).setClass("collapse navbar-collapse").setId("navbarSupportedContent")
        ).setClass("container-fluid")
    ).setClass("navbar navbar-expand-lg navbar-dark bg-dark")
}

// A simple example inspired by Bootstrap.
// This functions parameter is also an array.
// The array must contain a label and a function to call
// in case of clicking on it.
function tabs(tabList) {
    let tabNames = Object.keys(tabList)
    let tabs = tabNames.map(tabName => tabList[tabName])
    console.assert(tabs.length > 0)

    let currentTab = 0
    let tabSlot = div(tabs[currentTab])
    return div(
        tabSwitcher(Object.keys(tabList), (index) => {
            tabSlot.removeChild(tabs[currentTab])
            tabSlot.appendChild(tabs[index])
            currentTab = index
        }),
        tabSlot
    ).setClass("tabs")
}

// ========== Event Handlers ==========

// This function handles switching between tabs as its name implays.
// It has two parameters, one for the list of tab names and one for the current choice.
function tabSwitcher(tabNames, choice) {
    let links = []

    let nav = ul(
        ...tabNames.map((tabName, index) => {
            let link = a(tabName, "#")
                .setClass("nav-link" + (index === 0 ? " active" : "")) // első aktív
                .onClick((e) => {
                    e.preventDefault()

                    links.forEach(l => l.classList.remove("active"))

                    link.classList.add("active")

                    choice(index)
                })

            links.push(link)
            return li(link).setClass("nav-item")
        })
    ).setClass("nav nav-underline mb-2")

    return nav
}

// The two functions below, just handles the clicks on the buttons of the counter.
function increseCounter() {
    state.counter += 1
    if (state.counter > 10) state.counter = 0
    document.getElementById("counter-display").innerText = `Számláló: ${state.counter}`
    console.log(state.counter)
}

function decreaseCounter() {
    state.counter -= 1
    if (state.counter < 0) state.counter = 0
    document.getElementById("counter-display").innerText = `Számláló: ${state.counter}`
    console.log(state.counter)
}

// The next 3 functions, handles the submit of login, registration and contact forms.
// In reality, they are only collect the data from the form and display it on the page.
function handleLogin(e) {
    e.preventDefault()

    let dataDisplay = document.getElementById("form-data-display")
    let dataToShow = ""
    let form = e.target
    let formData = new FormData(form)
    let uname = formData.get("luname")
    let passwd = formData.get("lpasswd")

    dataToShow = div(
        p().setHTML(`<b>Felhasználó név:</b>\t${uname}`),
        p().setHTML(`<b>Jelszó:</b>\t\t\t${passwd}`),
    ).attr({ style: "white-space: pre;" })

    dataDisplay.appendChild(dataToShow)
    form.reset()

}

function handleRegister(e) {
    e.preventDefault()

    let dataDisplay = document.getElementById("form-data-display")
    let form = e.target
    let dataToShow = ""
    let formData = new FormData(form)
    let uname = formData.get("runame")
    let passwd = formData.get("rpasswd")
    let passwd2 = formData.get("rpasswd2")

    if (passwd === passwd2) {
        dataToShow = div(
            p().setHTML(`<b>Felhasználó név:</b>\t${uname}`),
            p().setHTML(`<b>Jelszó:</b>\t\t\t${passwd}`),
            p().setHTML(`<b>Jelszó ismétlés:</b>\t${passwd2}`)
        ).attr({ style: "white-space: pre;" })
    } else {
        dataToShow = "A két jelszó nem egyezik."
    }

    dataDisplay.appendChild(dataToShow)
    form.reset()
}

function handleContact(e) {
    e.preventDefault()

    let dataDisplay = document.getElementById("form-data-display")

    let form = document.getElementById("eg-form-contact")
    let formData = new FormData(form)

    let cemail = formData.get("cemail")
    let csubject = formData.get("csubject")
    let cdescription = formData.get("cdescription")

    let dataToShow = div(
        p().setHTML(`<b>Email:</b>\t${cemail}`),
        p().setHTML(`<b>Tárgy:</b>\t${selectOptions[csubject]}`),
        p().setHTML(`<b>Üzenet:</b>\t${cdescription}`)
    ).attr({ style: "white-space: pre;" })
    dataDisplay.appendChild(dataToShow)
    form.reset()
}

function fullScreenImage(e) {
    let clickedImage = document.getElementById(e.target.id)
    let modalBody = document.getElementById("modal-body")
    let modalTitle = document.getElementById("exampleModalLabel")
    let picName = clickedImage.getAttribute("src").split("/").slice(-1)[0]
    console.log(picName)

    modalTitle.innerText = picName
    modalBody.innerHTML = ""
    modalBody.classList.add("row")
    modalBody.appendChild(img(e.target.src).setClass("img-fluid rounded"))
    console.log(clickedImage.classList)
}

// ========== Forms ==========
// in this section I created the forms as functions then
// I used them as components, attached to the tabs section of the page.
// NOTE: Some wrappers has its own chainable methods. This is because I don't
// wanted to confuse the user by adding all of them to the tag() fucntion.
// E.g. the name and placeholder attributes are only apply to form elements.
// On divs or paragraps, thay are meaningless.

function formLogin() {
    return form(
        div(
            input("text")
                .setClass("form-control")
                .setId("luname")
                .setName("luname")
                .setPlaceholder("Felhasználónév")
                .isRequired(),
            label("Felhasználónév").setTarget("luname")
        ).setClass("form-floating mb-3"),
        div(
            input("password")
                .setClass("form-control")
                .setId("lpasswd")
                .setName("lpasswd")
                .setPlaceholder("Jelszó")
                .isRequired(),
            label("Jelszó").setTarget("lpasswd")
        ).setClass("form-floating mb-3"),
        div(
            btn("Belépés", "submit").setClass("btn btn-outline-success float-end")
        ).setClass("form-group")
    ).setMethod("get")
        .setAction("#")
        .setId("eg-form-login")
        .onSubmit(handleLogin)
}

function formRegister() {
    return form(
        div(
            input("text")
                .setClass("form-control")
                .setId("runame")
                .setName("runame")
                .setPlaceholder("Felhasználónév")
                .isRequired(),
            label("Felhasználónév").setTarget("runame")
        ).setClass("form-floating mb-3"),
        div(
            input("password")
                .setClass("form-control")
                .setId("rpasswd")
                .setName("rpasswd")
                .setPlaceholder("Jelszó")
                .isRequired(),
            label("Jelszó").setTarget("rpasswd")
        ).setClass("form-floating mb-3"),
        div(
            input("password")
                .setClass("form-control")
                .setId("rpasswd2")
                .setName("rpasswd2")
                .setPlaceholder("Jelszó ismét")
                .isRequired(),
            label("Jelszó ismét").setTarget("rpasswd2")
        ).setClass("form-floating mb-3"),
        div(
            btn("Regisztráció", "submit").setClass("btn btn-outline-warning float-end")
        ).setClass("form-group")
    ).setMethod("get")
        .setAction("/")
        .setId("eg-form-register")
        .onSubmit(handleRegister)
}

function formContact() {
    return form(
        div(
            input("email")
                .setClass("form-control")
                .setId("cemail")
                .setName("cemail")
                .setPlaceholder("Email")
                .isRequired(),
            label("Email").setTarget("cemail")
        ).setClass("form-floating mb-3"),
        div(
            select(
                ...selectOptions.map((value, index) => {
                    return option(value, index)
                })
            ).setClass("form-select")
                .setId("csubject")
                .setName("csubject")
                .isRequired()
        ).setClass("form-group mb-3"),
        div(
            textarea()
                .setClass("form-control")
                .setId("cdescription")
                .setName("cdescription")
                .setPlaceholder("Ide irhatod az üzenetet...")
                .isRequired()
        ).setClass("form-group mb-3"),
        div(
            btn("Küldés", "submit").setClass("btn btn-outline-primary float-end")
        ).setClass("form-group mb-3")
    ).setMethod("get")
        .setAction("/")
        .setId("eg-form-contact")
        .onSubmit(handleContact)
}

// ========== Pages ==========
// In the section below I created the pages as functions returning Nodes (HTML Elements)
// This is crucial, because this is the only way to append them to the root as child elements.
// As you can see, by using the wrapper functions; provided by mui.js you can build whole pages.
// By using the chainable methods you can specify attributes, like class, id, and even event handlers.

function home(state) {
    return div(
        h1("MUI JS Keretrendszer").setClass("mb-4"),
        p("Ez egy bemutató oldal az MUI javascript keretrendszerhez. Az oldalon található elemek mind ezen eszköz segítségével lettek létrehozva.")
            .setClass("lead"),
        p(`A rendszer a leg alapvetőbb HTML elemekből építkezik.`),
        ul(
            li("Heading: h1(), h2(), h3(), h4()"),
            li("Bekezdések: p()"),
            li("linkek és gombok: a(), btn()")
        ),
        p("Ahol szükség van attributumok, id vagy class megadására ott használhatóak a .attr(), .setId és .setClass() láncolható metódusok.\nDe ezeken felül még sok más is rendelkezésre áll, esetenként az elemtől függően."),
        hr(),
        div(
            div(
                h2("Linkek"),
                p("A linkek ugyanúgy beágyazhatóak más elemekbe mint normás HTML irásakor.").setClass("lead"),
                p("A 'a(label, url, target)' segítségével hozhatóak létre linkek."),
                a("Keresés a Google-val", "https://google.com", "blank")
            ),
            div(
                h2("Gombok").setClass("mb-4"),
                p("Egy egyszeű szálmáló, amely novelhető és csökkenthető. A szám nem lehet nagyobb 10-nél vagy kissebb 0-nál.").setClass("lead"),
                p("Gombok használata: 'btn(label, type).onClick(callbackFunction)'"),
                btn("Számláló növelése")
                    .setClass("btn btn-primary me-2")
                    .onClick(increseCounter),
                btn("Számláló Csökkentése")
                    .setClass("btn btn-secondary me-2")
                    .onClick(decreaseCounter),
                span(`Számláló: ${state.counter}`)
                    .setId("counter-display")

            )
        ).setClass("d-flex justify-content-between gap-2"),
        hr()
    ).setClass("container mt-4")
}

function forms() {
    return div(
        h1("Példa formok"),
        p("Az alább látható formok csak a bemutatás célját szolgálják. Egyik se tárol adatot.").setClass("lead"),
        hr(),
        div(
            tabs({
                "Belépés": formLogin(),
                "Registráció": formRegister(),
                "Kapcsolat": formContact()
            }).setClass("col-4 mb-2"),
            p().setId("form-data-display").setClass("col-3 mb-2"),
        ).setClass("row justify-content-start align-items-end gap-2"),
        hr()
    ).setClass("container mt-4")
}

function galery() {
    return div(
        h1("Képgaléria"),
        hr(),
        div(
            ...images.map((src, index) =>
                div(
                    img(src)
                        .setClass("img-fluid rounded shadow-sm")
                        .setId(`pic${index}`)
                        .attr({ "data-bs-toggle": "modal", "data-bs-target": "#exampleModal" })
                        .onClick(fullScreenImage)
                ).setClass("col-md-4 col-sm-6 mb-3")
            )
        ).setClass("row"),
        hr()
    ).setClass("container mt-4")
}

// ========== APP ==========
// Rewritten app function using the new basicRouter
// Much cleaner - no manual state management for active menu items,
// no manual render calls, and URL-based navigation

function app() {
    // Define routes - key is the URL hash, value is the page function
    const routes = {
        home: () => home(state),
        forms: forms,
        gallery: galery
    }

    // Create the persistent layout that stays on all pages
    function createLayout() {
        const menuItems = [
            { label: "Home", route: "home" },
            { label: "Formok", route: "forms" },
            { label: "Galéria", route: "gallery" }
        ]

        const root = document.getElementById("root")

        // Create the main layout structure
        root.innerHTML = ""
        root.appendChild(
            div(
                // Navigation menu with hash links
                menu(
                    menuItems.map(item =>
                        a(item.label, `#${item.route}`)
                            .setClass("nav-link")
                    )
                ),
                // Content area where router will render pages
                div().setId("page-content"),
                // Footer
                div()
                    .setHTML("2025 &copy; <b>Kiss Attila</b> <span class='text-muted'>Made with DOMino.js</span>")
                    .setClass("container")
            ).setClass("container-fluid")
        )
    }

    // Set up the layout first
    createLayout()

    // Initialize router to render pages in the content area
    basicRouter(routes, "#page-content")

    // Optional: Update active menu state when route changes
    function updateActiveMenu() {
        const currentRoute = window.location.hash.slice(1) || "home"
        const navLinks = document.querySelectorAll(".nav-link")

        navLinks.forEach(link => {
            link.classList.remove("active")
            // Check if this link's href matches current route
            if (link.getAttribute("href") === `#${currentRoute}`) {
                link.classList.add("active")
            }
        })
    }

    // Update active menu on initial load and route changes
    window.addEventListener("hashchange", updateActiveMenu)
    updateActiveMenu() // Set initial active state
}

window.onload = () => app()