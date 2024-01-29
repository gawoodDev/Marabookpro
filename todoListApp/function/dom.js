export function createElement (tagName, attributes) {
    let element = document.createElement(tagName);
    
    for (let [key, value] of Object.entries(attributes)) {
        if (value !== false ) {
            element.setAttribute(key, value)
        }
    }
    
    return element
    
}



