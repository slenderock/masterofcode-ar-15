(function () {
  "use strict";

  if (typeof QuickSettings === "undefined") return;

  var urlMap = {
    "-------": null,

    "+++ Scheme +++": null,

    "basic - face tracking - track single face": "js/examples/face_tracking/track_single_face.js",
    "basic - face tracking - candide overlay": "js/examples/face_tracking/candide_overlay.js",

    "+++ Mascs +++": null,
    "Masc 1": ["assets/brfv4_face_textures1.js", "js/examples/face_tracking/face_texture_overlay.js"],
    "Masc 2": ["assets/brfv4_face_textures2.js", "js/examples/face_tracking/face_texture_overlay.js"],
    "Masc 3": ["assets/brfv4_face_textures3.js", "js/examples/face_tracking/face_texture_overlay.js"],
    "Masc 4": ["assets/brfv4_face_textures4.js", "js/examples/face_tracking/face_texture_overlay.js"],
    "Masc 5": ["assets/brfv4_face_textures5.js", "js/examples/face_tracking/face_texture_overlay.js"],
    "Masc 6": ["assets/brfv4_face_textures6.js", "js/examples/face_tracking/face_texture_overlay.js"],
    "Masc 7": ["assets/brfv4_face_textures7.js", "js/examples/face_tracking/face_texture_overlay.js"],

    "--------": null
  };
  var labels = [];
  for (var key in urlMap) {
    labels.push(key);
  } // Fill in the labels.

  function onExampleLoaded() {
    brfv4Example.reinit();
  }

  var _isFirstSelect = true;

  function onExampleChosen(data) {

    if (_isFirstSelect) return;

    var url = urlMap[data.value];

    if (url) {
      if (typeof url === "string") {
        brfv4Example.loader.loadExample([url], onExampleLoaded);
      } else {
        brfv4Example.loader.loadExample(url, onExampleLoaded);
      }
    } else {
      if (data.index >= 0) {
        brfv4Example.gui.exampleChooser.setValuesFromJSON({"_example": data.index + 1});
      }
    }
  }

  if (!brfv4Example.gui.exampleChooser) {

    QuickSettings.useExtStyleSheet();

    brfv4Example.gui.exampleChooser = QuickSettings.create(
      2, 2, "Example Chooser", brfv4Example.dom.createDiv("_settingsRight"))
      .setWidth(250)
      .addHTML("Switch between examples", "Which example do you want to try? Use the drop down to choose another example.").hideTitle("Switch between examples")
      .addDropDown("_example", labels, onExampleChosen)
      .hideTitle("_example")
      .setValuesFromJSON({"_example": 6}); // "basic - face tracking - track single face"

    _isFirstSelect = false;
  }
})();