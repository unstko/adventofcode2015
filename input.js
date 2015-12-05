function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
    loadScript(file.name);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.innerHTML = contents;
}

function loadScript(name) {
  var script = document.createElement('script');
  script.src = name.substr(0, name.lastIndexOf(".")) + ".js";
  script.onload = function() {
    var input = document.getElementById('file-content').innerHTML;
    calc(input);
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
