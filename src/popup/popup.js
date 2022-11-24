// default variables
var selectedText = null;
var imageList = null;
var mdClipsFolder = "";
var article = null;
var globalOptions = null;
const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
// set up event handlers
const cm = CodeMirror.fromTextArea(document.getElementById("md"), {
  theme: darkMode ? "xq-dark" : "xq-light",
  mode: "markdown",
  lineWrapping: true,
});
cm.on("cursorActivity", (cm) => {
  const somethingSelected = cm.somethingSelected();
  var a = document.getElementById("downloadSelection");

  if (somethingSelected) {
    if (a.style.display != "block") a.style.display = "block";
  } else {
    if (a.style.display != "none") a.style.display = "none";
  }
});
document.getElementById("download").addEventListener("click", download);
document.getElementById("options").addEventListener("click", openOptions);

// add tags to checkbox
// <input type="checkbox" id="Tech" value="Tech" ></input>
// <label for="Tech" class="text">Tech </label>
// id checkbox-tags
function addTagsToCheckbox(tags) {
  var checkboxTags = document.getElementById("checkbox-tags");
  checkboxTags.innerHTML = "";
  for (var i = 0; i < tags.length; i++) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = _slug(tags[i]);
    checkbox.value = tags[i];
    checkboxTags.appendChild(checkbox);
    var label = document.createElement("label");
    // add text class
    label.classList.add("text");
    label.classList.add("mr");
    label.htmlFor = _slug(tags[i]);
    label.appendChild(document.createTextNode(tags[i]));
    checkboxTags.appendChild(label);
  }
}

document
  .getElementById("downloadSelection")
  .addEventListener("click", downloadSelection);

const defaultOptions = {
  includeTemplate: false,
  clipSelection: true,
};
function openOptions() {
  browser.runtime.openOptionsPage();
}

const checkInitialSettings = (options) => {
  if (options.includeTemplate)
    document.querySelector("#includeTemplate").classList.add("checked");

  if (options.clipSelection)
    document.querySelector("#selected").classList.add("checked");
  else document.querySelector("#document").classList.add("checked");
};

const toggleClipSelection = (options) => {
  options.clipSelection = !options.clipSelection;
  document.querySelector("#selected").classList.toggle("checked");
  document.querySelector("#document").classList.toggle("checked");
  browser.storage.sync
    .set(options)
    .then(() => clipSite())
    .catch((error) => {
      console.error(error);
    });
};

const toggleIncludeTemplate = (options) => {
  options.includeTemplate = !options.includeTemplate;
  document.querySelector("#includeTemplate").classList.toggle("checked");
  browser.storage.sync
    .set(options)
    .then(() => {
      browser.contextMenus.update("toggle-includeTemplate", {
        checked: options.includeTemplate,
      });
      try {
        browser.contextMenus.update("tabtoggle-includeTemplate", {
          checked: options.includeTemplate,
        });
      } catch {}
      return clipSite();
    })
    .catch((error) => {
      console.error(error);
    });
};

const showOrHideClipOption = (selection) => {
  if (selection) {
    document.getElementById("clipOption").style.display = "flex";
  } else {
    document.getElementById("clipOption").style.display = "none";
  }
};

const clipSite = (id) => {
  return browser.tabs
    .executeScript(id, { code: "getSelectionAndDom()" })
    .then((result) => {
      if (result && result[0]) {
        showOrHideClipOption(result[0].selection);
        let message = {
          type: "clip",
          dom: result[0].dom,
          selection: result[0].selection,
          tabId: id,
        };
        return browser.storage.sync
          .get(defaultOptions)
          .then((options) => {
            browser.runtime.sendMessage({
              ...message,
              ...options,
            });
          })
          .catch((err) => {
            console.error(err);
            browser.runtime.sendMessage({
              ...message,
              ...defaultOptions,
            });
          });
      }
    });
};

// inject the necessary scripts
browser.storage.sync
  .get(defaultOptions)
  .then((options) => {
    checkInitialSettings(options);

    document.getElementById("selected").addEventListener("click", (e) => {
      e.preventDefault();
      toggleClipSelection(options);
    });
    document.getElementById("document").addEventListener("click", (e) => {
      e.preventDefault();
      toggleClipSelection(options);
    });
    document
      .getElementById("includeTemplate")
      .addEventListener("click", (e) => {
        e.preventDefault();
        toggleIncludeTemplate(options);
      });

    return browser.tabs.query({
      currentWindow: true,
      active: true,
    });
  })
  .then((tabs) => {
    var id = tabs[0].id;
    var url = tabs[0].url;
    browser.tabs
      .executeScript(id, {
        file: "/browser-polyfill.min.js",
      })
      .then(() => {
        return browser.tabs.executeScript(id, {
          file: "/contentScript/contentScript.js",
        });
      })
      .then(() => {
        console.info("Successfully injected MarkDownload content script");
        return clipSite(id);
      })
      .catch((error) => {
        console.error(error);
      });
  });

// listen for notifications from the background page
browser.runtime.onMessage.addListener(notify);
function getCurrentTags() {
  const tagsInput = document.getElementById("tags").value || "";
  let tags = tagsInput
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  // get all check box vlaue
  const checkboxes = document.querySelectorAll(
    ".checkbox-tags input[type=checkbox]"
  );
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      if (!tags.includes(checkbox.value)) {
        tags.push(checkbox.value);
      }
    }
  });
  return tags;
}

//function to send the download message to the background page
function sendDownloadMessage(text) {
  if (text != null) {
    return browser.tabs
      .query({
        currentWindow: true,
        active: true,
      })
      .then(async (tabs) => {
        const tags = getCurrentTags();
        if (tags.length && text) {
          // get text frontmatter yaml
          const [RX_RECOGNIZE_YAML, RX_YAML] = createRegExp(
            ["---yaml", "---"],
            "= yaml =",
            "---"
          );
          const match = RX_YAML.exec(text);
          if (!match || match.index !== 0) {
            throw new TypeError("Unexpected end of input");
          }
          const frontmatterText = match.at(-1)?.replace(/^\s+|\s+$/g, "") || "";
          if (frontmatterText) {
            // remove --- from frontmatter
            try {
              const frontmatterObj = jsyaml.load(frontmatterText);

              let isChanged = false;
              if (frontmatterObj.tags) {
                frontmatterObj.tags = Array.from(
                  new Set(frontmatterObj.tags.concat(tags))
                );
                isChanged = true;
              } else if (
                frontmatterObj.taxonomies &&
                frontmatterObj.taxonomies.tags
              ) {
                frontmatterObj.taxonomies.tags = Array.from(
                  new Set(frontmatterObj.taxonomies.tags.concat(tags))
                );
                isChanged = true;
              }

              if (isChanged) {
                text = text.replace(
                  frontmatterText,
                  jsyaml.dump(frontmatterObj)
                );
              }
            } catch (err) {
              console.error("parse yaml failed");
              console.error(err);
              console.error(`frontmatterText`, frontmatterText);
            }
          }
        }

        var message = {
          type: "download",
          markdown: text,
          title: document.getElementById("title").value,
          tab: tabs[0],
          imageList: imageList,
          mdClipsFolder: mdClipsFolder,
        };
        return chrome.runtime.sendMessage(message);
      });
  }
}

// event handler for download button
async function download(e) {
  e.preventDefault();
  await sendDownloadMessage(cm.getValue());
  window.close();
}

// event handler for download selected button
async function downloadSelection(e) {
  e.preventDefault();
  if (cm.somethingSelected()) {
    await sendDownloadMessage(cm.getSelection());
  }
}

//function that handles messages from the injected script into the site
function notify(message) {
  // message for displaying markdown
  if (message.type == "display.md") {
    globalOptions = message.options;
    const tagsString = message.options.tags || "";
    const tags = tagsString
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    addTagsToCheckbox(tags);

    // set the values from the message
    //document.getElementById("md").value = message.markdown;
    cm.setValue(message.markdown);
    article = message.article;
    document.getElementById("title").value = message.article.title;
    if (message.customCopiedText) {
      document.querySelector("#customCopiedText").style.display = "block";
      document.querySelector("#customCopiedText").value =
        message.customCopiedText;
    }
    imageList = message.imageList;
    mdClipsFolder = message.mdClipsFolder;

    // show the hidden elements
    document.getElementById("container").style.display = "flex";
    document.getElementById("spinner").style.display = "none";
    // focus the download button
    document.getElementById("download").focus();
    cm.refresh();
  }
}
function _slug(string) {
  // replace . to - to avoid file extension
  const x = string.replace(/\./g, "-");
  const kebab = _.kebabCase(x);
  const sluged = slugify(kebab);
  return sluged;
}
function getBeginToken(delimiter) {
  return Array.isArray(delimiter) ? delimiter[0] : delimiter;
}

function getEndToken(delimiter) {
  return Array.isArray(delimiter) ? delimiter[1] : delimiter;
}
function createRegExp(...dv) {
  const beginPattern = "(" + dv.map(getBeginToken).join("|") + ")";
  const pattern =
    "^(" +
    "\\ufeff?" + // Maybe byte order mark
    beginPattern +
    "$([\\s\\S]+?)" +
    "^(?:" +
    dv.map(getEndToken).join("|") +
    ")\\s*" +
    "$" +
    "(?:\\n)?)";

  return [
    new RegExp("^" + beginPattern + "$", "im"),
    new RegExp(pattern, "im"),
  ];
}
