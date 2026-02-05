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
  setCookie("ft_list", $("#ft_list").html());
}

function createTodo(text) {
  var $item = $("<div></div>");
  $item.addClass("todo");
  $item.text(text);

  $item.click(function () {
    var ok = confirm("Do you want to remove that TO DO?");
    if (ok) {
      $(this).remove();
      saveList();
    }
  });

  $("#ft_list").prepend($item);
  saveList();
}

function loadList() {
  var saved = getCookie("ft_list");
  if (saved) {
    $("#ft_list").html(saved);

    $("#ft_list .todo").click(function () {
      var ok = confirm("Do you want to remove that TO DO?");
      if (ok) {
        $(this).remove();
        saveList();
      }
    });
  }
}

$(document).ready(function () {
  $("#newBtn").click(function () {
    var text = prompt("Enter a new TO DO:");
    if (text === null) return;

    text = text.trim();
    if (text === "") return;

    createTodo(text);
  });

  loadList();
});
