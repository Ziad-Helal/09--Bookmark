var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitButton = document.getElementById("submitButton");
var tableBody = document.getElementById("tableBody");

var bookmarks = [];
var localBookmarks = JSON.parse(localStorage.getItem("bookmarks"));

(function () {
  if (localBookmarks) {
    bookmarks = localBookmarks;
    displayBookmarks();
  }

  submitButton.onclick = addBookmark;
})();

function addBookmark() {
  var bookmark = {
    name: siteName.value,
    url: siteUrl.value,
  };

  if (!isValidUrl(siteUrl.value)) alert("The URL is not valid!");
  else if (!bookmark.name || !bookmark.url)
    alert("The Website's Name and URL are both rquired!");
  else {
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    displayBookmarks();
    clearFormFields();
  }
}

function deleteBookmark(index, name, url) {
  if (
    confirm(
      `Are you sure you want to delete this website's bookmark?\nName: ${name}\nURL: ${url}`
    )
  ) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
  }
}

function displayBookmarks() {
  var tableBookmarksRows = "";
  bookmarks.forEach(function (bookmark, index) {
    tableBookmarksRows += `
      <tr>
        <td class="w">${index + 1}</td>
        <td class="text-start">${bookmark.name}</td>
        <td class="w-0">
          <a href="${
            bookmark.url
          }" target="_blank"><button type="button" class="good text-nowrap"><i class="fa-solid fa-eye me-2"></i>Visit</button></a>
        </td>
        <td class="w-0">
          <button type="button" class="bad text-nowrap" onclick="deleteBookmark(${index}, '${
      bookmark.name
    }', '${
      bookmark.url
    }')"><i class="fa-solid fa-trash-can me-2"></i>Delete</button>
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = tableBookmarksRows;
}

function clearFormFields() {
  siteName.value = "";
  siteUrl.value = "";
}

function isValidUrl(url) {
  try {
    new URL(url);
    var segmants = url.split(".");
    if (segmants.length > 1) {
      var lastSegmantLength = segmants.at(-1).length;
      if (lastSegmantLength < 2 || lastSegmantLength > 3) return false;
      else return true;
    } else return false;
  } catch (error) {
    return false;
  }
}
