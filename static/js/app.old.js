// ========== Global variables ==========
// Menu items to show at the page's header section
let menuItems = [
    a('/', 'Home'),
    a('/contacts', 'Contacts'),
    a('/aout', 'About Us'),
    a("https://github.com/attila00198", "Projects", "blank")
]



// Tabs you can switch between
const firstTab = () => {
    return div(
        h2("Első Tab"),
        p("P Tag, ide lehet szöveget helyezni.", a("https://google.com", "Search")),
        div(
            form(
                labal("Username *")
                    .attr({ for: "username" }),
                input("text")
                    .setClass("form-control")
                    .setId("username")
                    .setName("username")
                    .setPlaceholder("Username")
                    .isRequired(),
                textarea()
                    .setId("about-me")
                    .setRows(5)
                    .setCols(10),
                btn("Submit", "submit")
                    .setId("submit")
                    .onClick(handleSubmit)
                    .setClass("btn btn-primary")
            ),
            span().setId("username-display")
        )
    ).setClass("tab")
}

const secondTab = () => {
    return div(
        h2("Második tab"),
        div(
            div(
                btn("Számláló növelése")
                    .setClass("btn btn-primary")
                    .onClick(increaseCounter),
                btn("Számláló Visszaállítása")
                    .setClass("btn btn-danger")
                    .onClick(resetCounter)
            ).setId("conter-btns"),
            p(span("Számláló: 0").setId("counter-display"))
        ).setId("counter")
    ).setClass("tab")
}

const thirdTab = () => {
    return div(
        h2("Third tab"),
        img("blackhole.png")
    ).setClass("tab")
}

// ========== Components ==========
/**
 * Creates a menu component as a <ul> element with menu items.
 * @param {Array<HTMLElement>} items - Array of menu item elements (e.g., anchor tags).
 * @returns {HTMLUListElement} The menu as a styled <ul> element.
 */
function menu(items) {
    return ul(
        ...items.map((item) => {
            return li(
                item.setClass("nav-link"))
                .setClass("nav-item")
        })
    ).setClass("navbar-nav")
}


/**
 * Creates a tab switcher UI for switching between tabs.
 * @param {Array<string>} tabNames - Array of tab names.
 * @param {function(number):void} choice - Callback for tab selection, receives tab index.
 * @returns {HTMLDivElement} Tab switcher element.
 */
function tabSwitcher(tabNames, choice) {
    return div(
        ...tabNames.map((tabName, index) => {
            return a(tabName, "#").setClass("tab-link").on("click", () => choice(index))
        })
    ).setClass("tab-header")
}

/**
 * Creates a tabbed interface from a tab list object.
 * @param {Object} tabList - Object with tab names as keys and tab content elements as values.
 * @returns {HTMLDivElement} Tabs container element.
 */
function tabs(tabList) {
    let tabNames = Object.keys(tabList)
    let tabs = tabNames.map(tabName => tabList[tabName])
    console.assert(tabs.length > 0)

    let currentTab = 0
    let tabSlot = div(tabs[currentTab]).setClass("tab-body")
    return div(
        tabSwitcher(Object.keys(tabList), (index) => {
            tabSlot.removeChild(tabs[currentTab])
            tabSlot.appendChild(tabs[index])
            currentTab = index
        }),
        tabSlot
    ).setClass("tabs")
}

// ========== Event handlers ==========
let count = 0

/**
 * Increments the counter and updates the display. Resets if counter >= 10.
 */
function increaseCounter() {
    const counterDisplay = document.getElementById("counter-display")
    if (count >= 10) {
        resetCounter()
    } else {
        count += 1
        counterDisplay.textContent = "Számláló: " + count
    }
}

/**
 * Resets the counter to zero and updates the display.
 */
function resetCounter() {
    const counterDisplay = document.getElementById("counter-display")
    if (count > 0) {
        counterDisplay.textContent = "Számláló: 0"
        count = 0
    }
}

/**
 * Handles the submit event for the username form.
 */
function handleSubmit(e) {
    e.preventDefault()
    let uname_input = document.getElementById("username")
    let uname_display = document.getElementById("username-display")

    if (!uname_input.checkValidity()) {
        uname_input.reportValidity()
    } else {
        let timeNow = new Date().toLocaleString("hu-HU", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
        console.log(timeNow, uname_input.value)
        uname_display.textContent = `Username: ${uname_input.value}, Button was clicked at: ${timeNow}`
    }
}

// ========== App ==========
function app() {
    return div(
        div(
            div(menu(menuItems),
                div(
                    input("text")
                        .setId("search-input")
                        .setName("searchinput")
                        .setPlaceholder("Keresés"),
                    btn("Keresés", "submit")
                        .setClass("btn btn-primary")
                ).setClass("search")
            ).setClass("navbar"),
            h1("JavaScript UI Keretrendszer").attr({ id: "heading" }),
            hr(),
        ).setClass("header"),
        tabs({
            "Első Tab": firstTab(),
            "Második Tab": secondTab(),
            "Harmadik Tab": thirdTab()
        })
    ).setClass("container")
}

// ========== Main ==========
window.onload = () => {
    // Getting the entry point And setting it's calss. Although the latter is not necessary.
    //const root = document.getElementById('root')

    root.appendChild(app())
};