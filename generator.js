let Generator = new function() {
  this.debug = false;
  this.generateButton = document.getElementById("generate-btn");
  this.perspective = document.getElementById("perspective");
  this.mechanic = document.getElementById("mechanic");
  this.quirk_count = document.getElementById("quirk-count");
  this.result = document.getElementById("result");
  this.template = document.getElementById("template").cloneNode(true);
  document.getElementById("template").remove();
  this.quirks = [
    "a quirky", "a weird", "an unexpected", "a procedural", "a changing",
    "an unconventional", "a happy little", "a questionable", "an abstract",
    "an aesthetically pleasing", "an aggressive", "an artistic",
    "an avant-garde", "a classic", "a nostalgia-inducing", "a complex",
    "a decorative", "a surrealistic", "a dynamic", "a static", "an emergent",
    "an emotional", "an ethereal", "a fluid", "an intense", "a mystical",
    "a magical", "a paradoxical", "a realistic", "a pure", "a simple",
    "a randomized", "a visual", "an illustrated",
  ];
  this.perspective_features = {
    "perspectiveless": ["layout", "fonts"],
    "sidescroller": ["direction", "bounds", "scroller"],
    "isometric": ["viewing angle"],
    "first-person": ["point of view", "camera-animations"],
    "third-person": ["player character"],
  };
  this.mechanic_features = {
    "puzzle": ["solving mechanism", "hints"],
    "platformer": ["level", "physics system"],
    "shooter": ["bullet mechanic", "guns", "targeting system"],
    "strategy": ["units", "bases"],
  };
  this.generic_features = [
    "color palette", "enemies", "spatial oddity", "art style",
    "movement system", "aesthetic", "soundscape", "interaction scheme",
    "story", "world", "characters", "dialogue", "narrative",
    "ambiance", "antagonist", "protagonist", "metaphor", "meaning",
    "goal", "health mechanic", "fail state", "challenge", "choices",
    "myth"
  ];

  this.popRandomItem = function(list) {
    let index = Math.floor(list.length * Math.random());
    item = list[index];
    list.splice(index, 1);
    return item;
  };

  this.selectOption = function(options) {
    if (options.value == "any") {
      return options.item(Math.random() * (options.length - 2) + 1).value;
    } else {
      return options.value;
    }
  };

  this.selectQuirk = function(perspective, mechanic) {
    let quirks = Array.from(Generator.quirks);
    let generic_features = Array.from(Generator.generic_features);
    let perspective_features = Array.from(Generator.perspective_features[perspective]);
    let mechanic_features = Array.from(Generator.mechanic_features[mechanic]);
    let result = "with ";
    let quirk_count = Generator.quirk_count.value;
    for (let i = 0; i < quirk_count; i++) {
      let feature;
      if (Math.random() < 1 / 5 && perspective_features.length > 0) {
        feature = perspective_features;
      } else if (Math.random() < 1 / 4 && mechanic_features.length > 0) {
        feature = mechanic_features;
      } else {
        feature = generic_features;
      }
      feature = Generator.popRandomItem(feature);
      let quirk = Generator.popRandomItem(quirks);
      if (Generator.debug) result += "<span title=\"'" + quirk + "', '" + feature + "'\">";
      if (feature.endsWith("s")) quirk = quirk.substring(quirk.indexOf(" "));
      result += quirk +  " " + feature;
      if (Generator.debug) result += "</span>";
      if (i == quirk_count - 2) result += ", and ";
      else if (i < quirk_count - 2) result += ", ";
    }
    result += ".";
    return result;
  };

  this.generate = function() {
    let perspective = Generator.selectOption(Generator.perspective);
    let mechanic = Generator.selectOption(Generator.mechanic);
    let quirks = Generator.selectQuirk(perspective, mechanic);
    Generator.result.innerHTML = Generator.template.innerHTML;
    Generator.result.innerHTML = Generator.result.innerHTML
      .replace("{{perspective}}", perspective.substring(0, 1).toUpperCase() + perspective.substring(1))
      .replace("{{mechanic}}", mechanic)
      .replace("{{quirks}}", quirks);
  };

  this.generateButton.onclick = this.generate;
  this.quirk_count.max = this.generic_features.length;
};
