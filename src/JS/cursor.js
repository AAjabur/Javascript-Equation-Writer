class Cursor {
    /**@abstract Class constructor, just declare 
     * some atributes
     * 
     * @cursor_pos Hold the document element that is father
     * of the cursor element
     * 
     * @cursor_exist True if a cursor exists and false if not
     */
    constructor() {
        this.cursor_pos = null;
        this.cursor_exist = false;
    }

    /**@abstract Create a blinking cursor as child of a father document element, just
     * if a cursor does't already exist.
     * The cursor is made of a empty span tag and CSS animation
     * 
     * @param father_element_id The id of the father element, a blinking cursor
     * will be added as it son
     */
    create_cursor(father_element_id) {
        if (!this.cursor_exist) {
            let cursor_element = document.createElement("span");
            cursor_element.classList.add("cursor");
            cursor_element.setAttribute("id", "cursor");

            this.cursor_pos = document.getElementById(father_element_id);
            this.cursor_pos.appendChild(cursor_element);
            this.cursor_exist = true;
        }
    }

    /**@abstract Remove the blinking cursor element if the user click outside 
     * the equation input element
     * 
     * @param mouse An mouse object to retrieve it's x and y coordinates. The mouse object
     * is passed as parameter from the addEventListener function.
     */
    destroy_cursor(mouse) {
        if (this.cursor_exist) {
            let mouse_x = mouse.pageX;
            let mouse_y = mouse.pageY;

            if (!this.#mouse_in_element(mouse_x, mouse_y, "init_equation_input")) {
                document.getElementById("cursor").remove();
                this.cursor_exist = false;
            }
        }
    }

    /**@abstract Check if the mouse cursor is inside some html element
     * 
     * @param mouse_x mouse cursor x coordinate
     * @param mouse_y mouse cursor y coordinate
     * @param element_id element id to check if mouse is inside
     * 
     * @return true if mouse is inside element or false if not
     */

    #mouse_in_element(mouse_x, mouse_y, element_id) {
        let e_rec = document.getElementById(element_id).getBoundingClientRect();
        if (mouse_x < e_rec.right && mouse_x > e_rec.left &&
            mouse_y > e_rec.top && mouse_y < e_rec.bottom) {
            return true
        } else {
            return false
        }
    }
}

var cursor = new Cursor();

document.getElementById("init_equation_input").onclick = function() {
    cursor.create_cursor("init_equation_input");
};

document.addEventListener("click", function(mouse) {
    cursor.destroy_cursor(mouse)
});