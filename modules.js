var popup_element = (function() {
    var popup_div = document.getElementById('popup') || null;
    if (!popup_div) { console.log("La div d'id popup n'existe pas")}
    return {
        init: function(content) {
            popup_div.style.display = 'block';
            popup_div.innerHTML = content || ''
        },
        remove: function() {
            if (popup_div.style.display == 'block') {
                popup_div.style.display = 'none'
            }
        },
        update: function(new_content){
           popup_div.innerHTML = new_content || ''
        }
    }
}());
