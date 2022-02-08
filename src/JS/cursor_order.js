class CursorOrder{
    constructor(){
        this._cursor_order = [];
    }

    update_cursor_order(){
        this._cursor_order = [];
        let main_parent = document.getElementById("init_equation_input");
        this.append_childs(main_parent);
    }

    append_childs(parent){
        let childs = parent.childNodes;
        for (const element of childs){
            if (element.children[0]){
                this.append_childs(element);
            }
            this._cursor_order.push(element);
        }
    }

    get_element_index(element){
        console.log(this._cursor_order.length);
        for(let i = 0; i < this._cursor_order.length; i++){
            console.log("uepaaa");
            if (element == this._cursor_order[i]){
                return i
            }
        }
        console.log("Não encontrei esse elemento");
        return 0
    }

    get_element_after(element){
        let index = this.get_element_index(element) + 1;
        return this._cursor_order = [index]
    }

    get_element_before(element){
        let index = this.get_element_index(element) - 1;
        return this._cursor_order = [index]
    }
}