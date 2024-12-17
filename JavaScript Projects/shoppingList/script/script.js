const user_input = document.getElementById('user-input');
const add_button = document.getElementById('add-button');
const save = document.getElementById('save-button');
const ul = document.getElementById('ul');
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) ?? [];
let id_count = localStorage.getItem('id_count') ?? 0;

// if (shoppingList.length == 0) {

// };

class ShoppingItem {
    constructor(name) {
        this.id = id_count;
        this.name = name;
        this.isDone = false;
    }

    render(shouldAddToList = true) {
        if (shouldAddToList) {
            id_count++;
            save.style.display = 'block';
            localStorage.setItem('id_count', id_count);
            shoppingList.push(this);
        }



        const li = document.createElement('li');
        const span = document.createElement('span');
        span.className = 'minus-and-v-container';
        li.textContent = this.name;
        ul.appendChild(li);
        li.appendChild(span);

        const minus_image = document.createElement('img');
        minus_image.src = 'images/minusSign.png';
        minus_image.className = 'minus';
        span.appendChild(minus_image);

        const v_image = document.createElement('img');
        v_image.src = 'images/vSign.png';
        v_image.className = 'v';
        span.appendChild(v_image);

        minus_image.addEventListener('click', () => {
            li.remove();
            const index = shoppingList.findIndex(item => item.id === this.id);
            if (index !== -1) {
                shoppingList.splice(index, 1);
            }
            if (shoppingList.length == 0) {
                save.style.display = 'none';
            }
        });

        v_image.addEventListener('click', () => {
            li.style.textDecoration = 'line-through';
            li.style.color = 'grey';
            li.style.backgroundColor = '#E0E0E0';
            this.isDone = true;
            const index = shoppingList.findIndex(item => item.id === this.id);
            if (index !== -1) {
                shoppingList[index].isDone = true;
            }
        });
    }

}



if (shoppingList.length > 0) {
    shoppingList.forEach(itemData => {
        const item = new ShoppingItem(itemData.name);
        item.id = itemData.id;
        item.isDone = itemData.isDone;
        item.render(false);
        save.style.display = 'block';
    });
};

function add_item() {
    if (user_input.value !== '') {
        const item = new ShoppingItem(user_input.value);
        item.render();
        user_input.value = '';
    };
}

function save_list() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    user_input.value = '';
}