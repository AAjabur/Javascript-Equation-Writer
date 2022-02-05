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
        let input_element = document.getElementById("init_equation_input");

        if (this.#mouse_in_element(mouse, input_element)) {

            let clicked_some_child = false;
            const input_child_elements = input_element.childNodes;

            // Check if mouse is in any children element of the main input node
            for (const element of input_child_elements){
                if (this.#mouse_in_element(mouse, element)){
                    let mouse_x = mouse.pageX;
                    let e_rec = element.getBoundingClientRect();

                    // Create cursor before if clicked before middle of element
                    if (mouse_x < (e_rec.right + e_rec.left)/2){
                        this.move_cursor_to(element, "before");
                    }
                    // Create cursor after if clicked after middle of element
                    else{
                        this.move_cursor_to(element, "after");
                    }
                    clicked_some_child = true;
                }
            }

            // If the click was inside main input but not inside any children element
            if (!clicked_some_child){
                this.create_cursor(input_element);
            }
        }

        // If clicked somewhere else destroy the cursor
        if (!this.#mouse_in_element(mouse, input_element)) {
            this.destroy_cursor();
        }
    }

    /**
     * @abstract Create a blinking cursor as child of a father document element, destroy
     * any other already created cursor
     * The cursor is made of a empty span tag and CSS animation
     * 
     * @param element The element of the father element, a blinking cursor
     * will be added as it son
     */
    create_cursor(element) {
        this.destroy_cursor();

        let cursor_element = document.createElement("span");
        cursor_element.classList.add("cursor");
        cursor_element.setAttribute("id", "cursor");
        this.cursor_element = cursor_element;

        element.appendChild(cursor_element);
        this.cursor_exist = true;
    }

    /**
     * @abstract Remove the blinking cursor element if the user click outside 
     * the equation input element
     */
    destroy_cursor() {
        if (this.cursor_exist) {
            document.getElementById("cursor").remove();
            this.cursor_exist = false;
        }
    }

    /**
     * @abstract Move cursor to the position before or after some given element
     * 
     * @param element Element you want to move the cursor to
     * 
     * @param pos Position relative to the element you want to create the cursor
     * "before" will create the cursor before the element and "after" will create after
     */
    move_cursor_to(element, pos = "before"){
        let element_parent =  element.parentElement;
        this.destroy_cursor();
        this.create_cursor(element_parent);

        if (pos == "before"){
            element_parent.insertBefore(cursor_element, element);
            console.log("atrás");
        }
        if (pos == "after"){
            element.after(cursor_element);
            console.log("frente");
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