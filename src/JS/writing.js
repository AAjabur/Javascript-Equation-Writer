


class WriteEquation {
    constructor(cursor) {
        this.cursor = cursor;

        // All the keycodes in this array can be written into the <span> input
        this.writeble_codes = ["Digit0", "Digit1", "Digit2", "Digit3",
    "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "KeyA",
     "KeyB", "KeyC", "KeyD", "KeyE", "KeyF", "KeyG", "KeyH", "KeyI",
     "KeyJ", "KeyK", "KeyL", "KeyM", "KeyN", "KeyO", "KeyP", "KeyQ", 
     "KeyR", "KeyS", "KeyT", "KeyU", "KeyV", "KeyW", "KeyX", "KeyY", "KeyZ",
    "Numpad0", "Numpad1", "Numpad2", "Numpad3", "Numpad4", "Numpad5",
     "Numpad6", "Numpad7", "Numpad8", "Numpad9", "NumpadMultiply", 
     "NumpadAdd", "NumpadSubtract", "NumpadDecimal", "NumpadDivide", 
    "Semicolon", "Equal", "Comma", "Minus", "Period", "Slash", "Blackquote",
     "BrackerLeft", "Backslash", "BracketRight"];
    }

    /**
     * @abstract Defines all actions the keyboard inputs will make.
     * 
     * @param kb_event An keyboard object to retrieve it's pressed keys. The keyboard object
     * is passed as parameter from the addEventListener function.
     */
    do_key_press(kb_event) {
        if (this.cursor.cursor_exist){
            if(kb_event.code == "Backspace"){
                let cursor_parent = this.cursor.cursor_element.parentElement;
                if (cursor_parent.childNodes.length > 1){
                    let penult_pos = cursor_parent.childNodes.length - 2;
                    cursor_parent.childNodes[penult_pos].remove();
                }
            }
            if(this.writeble_codes.includes(kb_event.code)){
                let new_char_element = document.createElement("var");
                new_char_element.innerText = kb_event.key;
    
                let cursor_parent = this.cursor.cursor_element.parentElement;
                cursor_parent.appendChild(new_char_element);
    
                cursor_parent.insertBefore(new_char_element, this.cursor.cursor_element);
            }
        }
        else{
            return 0
        }
    }
}

var write_equation = new WriteEquation(cursor);

document.addEventListener("keydown", function(kb_event) {
    write_equation.do_key_press(kb_event);
    }
);