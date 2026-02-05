function setCookie(name, value) {
  document.cookie = name + "=" + encodeURIComponent(value) + "; path=/";
}

function getCookie(name) {
  var all = document.cookie.split(";");
  for (var i = 0; i < all.length; i++) {
    var c = all[i].trim();
    if (c.indexOf(name + "=") === 0) {
      return decodeURIComponent(c.substring((name + "=").length));
    }
  }
  return "";
}

function saveList() {
  var list = document.getElementById("ft_list");
  setCookie("ft_list", list.innerHTML);
}

function createTodo(text) {
  var list = document.getElementById("ft_list");
  var item = document.createElement("div");
  item.className = "todo";
  item.textContent = text;

  item.onclick = function () {
    var ok = confirm("Do you want to remove that TO DO?");
    if (ok) {
      list.removeChild(item);
      saveList();
    }
  };

  if (list.firstChild) {
    list.insertBefore(item, list.firstChild);
  } else {
    list.appendChild(item);
  }

  saveList();
}

function loadList() {
  var list = document.getElementById("ft_list");
  var saved = getCookie("ft_list");
  if (saved) {
    list.innerHTML = saved;

    var items = list.getElementsByClassName("todo");
    for (var i = 0; i < items.length; i++) {
      items[i].onclick = function () {
        var ok = confirm("Do you want to remove that TO DO?");
        if (ok) {
          list.removeChild(this);
          saveList();
        }
      };
    }
  }
}

document.getElementById("newBtn").onclick = function () {
  var text = prompt("Enter a new TO DO:");
  if (text === null) return;

  text = text.trim();
  if (text === "") return;

  createTodo(text);
};

loadList();
