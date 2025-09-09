/**
 * Creates a DOM element with the specified tag name and appends child nodes or text.
 * Adds chainable helper methods to the element for setting attributes, event listeners, id, and class.
 *
 * @function
 * @param {string} name - The tag name of the element to create (e.g., 'div', 'span').
 * @param {...(string|Node)} children - Child elements or text to append to the created element.
 * @returns {HTMLElement} The created DOM element with chainable helper methods:
 *   - attr(name: string, value: string): HTMLElement
 *   - on(eventType: string, callbackFunction: function): HTMLElement
 *   - setId(idOfElement: string): HTMLElement
 *   - setClass(className: string): HTMLElement
 */
function tag(name, ...children) {
    let node = document.createElement(name)
    for (const child of children) {
        if (typeof child === "string") {
            node.appendChild(document.createTextNode(child))
        } else {
            node.appendChild(child)
        }
    }

    node.attr = function (attributeList) {
        for (const item in attributeList) {
            this.setAttribute(item, attributeList[item])
        }
        return this
    }

    node.on = function (eventType, callbackFunction) {
        this.addEventListener(eventType, callbackFunction)
        return this
    }

    node.onClick = function (callbackFunction) {
        this.on("click", callbackFunction)
        return this
    }

    node.setId = function (id) {
        this.attr({ id })
        return this
    }

    node.setClass = function (className) {
        this.className = className
        return this
    }
    node.setHTML = function (html) {
        this.innerHTML = html
        return this
    }

    node.clearHTML = function () {
        this.innerHTML = ""
        return this
    }

    return node
}

function ent(htmlEntity) {
    let spanEl = tag("span")
    spanEl.innerHTML = htmlEntity
    return spanEl
}

function hr() {
    return tag("hr")
}

function br() {
    return tag("br")
}

function div(...children) {
    return tag("div", ...children)
}

function h1(...children) {
    return tag("h1", ...children)
}

function h2(...children) {
    return tag("h2", ...children)
}

function h3(...children) {
    return tag("h3", ...children)
}

function h4(...children) {
    return tag("h4", ...children)
}

function h5(...children) {
    return tag("h5", ...children)
}

function h6(...children) {
    return tag("h6", ...children)
}

function mark(...children) {
    return tag("mark", ...children)
}

function span(...children) {
    return tag("span", ...children)
}

function p(...children) {
    return tag("p", ...children)
}

function a(label, url, target = "") {
    let node = tag("a").attr({ href: url, target: target })
    node.innerText = label
    return node
}

function ul(...children) {
    return tag("ul", ...children)
}

function li(...children) {
    return tag("li", ...children)
}

function nav(...children) {
    return tag("nav", ...children)
}

function img(source) {
    return tag("img").attr({ src: source })
}

function btn(label, type = "button") {
    let node = tag("button")
    node.attr({ type })
    node.innerText = label
    return node
}

// ========== FORM ============
function form(...children) {
    let node = tag("form", ...children)

    node.setMethod = function (method) { this.attr({ method }); return this }
    node.setAction = function (action) { this.attr({ action }); return this }
    node.setAutocomplete = function (value) { this.attr({ autocomplete: value }); return this }
    node.setEnctype = function (value) { this.attr({ enctype: value }); return this }
    node.setTarget = function (value) { this.attr({ target: value }); return this }
    node.onSubmit = function (callback) { this.addEventListener("submit", callback); return this }

    return node
}

function input(type = "text") {
    let node = tag("input")
        .attr({
            type: type
        })

    node.setValue = function (value) { this.value = value; return this }
    node.setType = function (type) { this.attr({ type }); return this }
    node.setName = function (name) { this.attr({ name }); return this }
    node.setPlaceholder = function (placeholder) { this.attr({ placeholder }); return this }
    node.setPattern = function (pattern) { this.attr({ pattern }); return this }
    node.setMin = function (min) { this.attr({ min }); return this }
    node.setMax = function (max) { this.attr({ max }); return this }
    node.isDisabled = function (disabled = true) { this.disabled = disabled; return this }
    node.isRequired = function (required = true) { this.attr({ required }); return this }
    node.onInput = function (callback) { this.addEventListener("input", callback); return this }
    node.onChange = function (callback) { this.addEventListener("change", callback); return this }

    return node
}

function textarea() {
    let node = tag("textarea")

    node.setPlaceholder = function (placeholder) { this.attr({ placeholder }); return this }
    node.setValue = function (value) { this.value = value; return this }
    node.setName = function (name) { this.attr({ name }); return this }
    node.isDisabled = function (disabled = true) { this.disabled = disabled; return this }
    node.isRequired = function (required = true) { this.attr({ required }); return this }

    return node
}

function select(...children) {
    let node = tag("select", ...children)

    node.setName = function (name) { this.attr({ name }); return this; }
    node.setValue = function (value) { this.value = value; return this; }
    node.onChange = function (callback) { this.addEventListener("change", callback); return this }
    node.isDisabled = function (disabled = true) { this.disabled = disabled; return this }
    node.isRequired = function (required = true) { this.attr({ required }); return this }

    return node
}

function option(label, value, isSelected = false) {
    let node = tag("option", label)
        .attr({ value, isSelected })

    return node;
}

function label(...children) {
    let node = tag("label", ...children);

    node.setTarget = function (targetId) { this.attr({ for: targetId }); return this }

    return node;
}