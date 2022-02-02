class Cursor {
    /**
     * @abstract Class constructor, just declare 
     * some atributes
     * 
     * @cursor_element Hold the cursor document element
     * 
     * @cursor_exist True if a cursor exists and false if not
     */
    constructor() {
        this.cursor_element = null;
        this.cursor_exist = false;
    }

    /**
     * @abstract Do all changes to the cursor when user click somewhere
     * 
     * @param mouse An mouse object to retrieve it's x and y coordinates. The mouse object
     * is passed as parameter from the addEventListener function.
     */
    update_cursor(mouse) {

        if (this.#mouse_in_element(mouse, document.getElementById("init_equation_input"))) {
            this.create_cursor(document.getElementById("init_equation_input"));
        }

        if (!this.#mouse_in_element(mouse, document.getElementById("init_equation_input"))) {
            this.destroy_cursor(mouse)
        }
    }

    /**
     * @abstract Create a blinking cursor as child of a father document element, just
     * if a cursor does't already exist.
     * The cursor is made of a empty span tag and CSS animation
     * 
     * @param element The element of the father element, a blinking cursor
     * will be added as it son
     */
    create_cursor(element) {
        if (!this.cursor_exist) {
            let cursor_element = document.createElement("span");
            cursor_element.classList.add("cursor");
            cursor_element.setAttribute("id", "cursor");
            this.cursor_element = cursor_element;

            element.appendChild(cursor_element);
            this.cursor_exist = true;
        }
    }

    /**
     * @abstract Remove the blinking cursor element if the user click outside 
     * the equation input element
     * 
     * @param mouse An mouse object to retrieve it's x and y coordinates. The mouse object
     * is passed as parameter from the addEventListener function.
     */
    destroy_cursor(mouse) {
        if (this.cursor_exist) {
            let mouse_x = mouse.pageX;
            let mouse_y = mouse.pageY;

            if (!this.#mouse_in_element(mouse, document.getElementById("init_equation_input"))) {
                document.getElementById("cursor").remove();
                this.cursor_exist = false;
            }
        }
    }

    /**
     * @abstract Check if the mouse cursor is inside some html element
     * 
     * @param mouse  An mouse object to retrieve it's x and y coordinates. The mouse object
     * is passed as parameter from the addEventListener function.
     * 
     * @param element element to check if mouse is inside
     * 
     * @return true if mouse is inside element or false if not
     */

    #mouse_in_element(mouse, element) {
        let mouse_x = mouse.pageX;
        let mouse_y = mouse.pageY;

        let e_rec = element.getBoundingClientRect();
        if (mouse_x < e_rec.right && mouse_x > e_rec.left &&
            mouse_y > e_rec.top && mouse_y < e_rec.bottom) {
            return true
        } else {
            return false
        }
    }
}

var cursor = new Cursor();

document.addEventListener("click", function(mouse) {
    cursor.update_cursor(mouse)
});