class EquationHandler{
    constructor(cursor){
        this.cursor = cursor;
    }

    add_superscript(element){
        let new_sup_element = document.createElement("sup");

        let element_parent = element.parentElement;
        element_parent.appendChild(new_sup_element);

        element_parent.insertBefore(new_sup_element, element);

        this.cursor.create_cursor(new_sup_element);
    }
}