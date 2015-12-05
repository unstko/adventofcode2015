function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var content = e.target.result;
    displayContents(content);
    loadScript(file.name, content);
  };
  reader.readAsText(file);
}

function displayContents(content) {
  var element = document.getElementById('file-content');
  element.innerHTML = content;
}

function loadScript(name, content) {
  var script = document.createElement('script');
  script.src = name.substr(0, name.lastIndexOf(".")) + ".js";
  script.onload = function() {
    calc(content);
  };
  document.head.appendChild(script);
}

function setResult(nr, content) {
  var result = document.getElementById('result' + nr);
  result.innerHTML = content;
}

function showMatrix() {
  var element = document.getElementById('show_matrix');
  element.style.display = "block";
}

window.onload = function () {
  document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);
};
