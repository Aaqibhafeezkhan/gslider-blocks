var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// core-saves-entry.js
var core_saves_entry_exports = {};
__export(core_saves_entry_exports, {
  button: () => save4,
  buttonMeta: () => block_default4,
  buttons: () => save5,
  buttonsMeta: () => block_default5,
  heading: () => save2,
  headingMeta: () => block_default2,
  image: () => save3,
  imageMeta: () => block_default3,
  paragraph: () => save,
  paragraphMeta: () => block_default
});
module.exports = __toCommonJS(core_saves_entry_exports);

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// node_modules/@wordpress/block-library/src/paragraph/save.js
var import_block_editor = require("@wordpress/block-editor");
var import_i18n = require("@wordpress/i18n");
var import_jsx_runtime = require("react/jsx-runtime");
function save({ attributes }) {
  const { content, dropCap, direction, style } = attributes;
  const textAlign = style?.typography?.textAlign;
  const className = clsx_default({
    "has-drop-cap": textAlign === ((0, import_i18n.isRTL)() ? "left" : "right") || textAlign === "center" ? false : dropCap
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { ...import_block_editor.useBlockProps.save({ className, dir: direction }), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_block_editor.RichText.Content, { value: content }) });
}

// node_modules/@wordpress/block-library/src/paragraph/block.json
var block_default = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/paragraph",
  title: "Paragraph",
  category: "text",
  description: "Start with the basic building block of all narrative.",
  keywords: ["text"],
  textdomain: "default",
  attributes: {
    content: {
      type: "rich-text",
      source: "rich-text",
      selector: "p",
      role: "content"
    },
    dropCap: {
      type: "boolean",
      default: false
    },
    placeholder: {
      type: "string"
    },
    direction: {
      type: "string",
      enum: ["ltr", "rtl"]
    }
  },
  supports: {
    align: ["wide", "full"],
    splitting: true,
    anchor: true,
    className: false,
    __experimentalBorder: {
      color: true,
      radius: true,
      style: true,
      width: true
    },
    color: {
      gradients: true,
      link: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
      }
    },
    spacing: {
      margin: true,
      padding: true,
      __experimentalDefaultControls: {
        margin: false,
        padding: false
      }
    },
    typography: {
      fontSize: true,
      lineHeight: true,
      textAlign: true,
      textColumns: true,
      textIndent: true,
      __experimentalFontFamily: true,
      __experimentalTextDecoration: true,
      __experimentalFontStyle: true,
      __experimentalFontWeight: true,
      __experimentalLetterSpacing: true,
      __experimentalTextTransform: true,
      __experimentalWritingMode: true,
      fitText: true,
      __experimentalDefaultControls: {
        fontSize: true
      }
    },
    __experimentalSelector: "p",
    __unstablePasteTextInline: true,
    interactivity: {
      clientNavigation: true
    }
  },
  selectors: {
    root: "p",
    typography: {
      textIndent: ".wp-block-paragraph + .wp-block-paragraph"
    }
  },
  editorStyle: "wp-block-paragraph-editor",
  style: "wp-block-paragraph"
};

// node_modules/@wordpress/block-library/src/heading/save.js
var import_block_editor2 = require("@wordpress/block-editor");
var import_jsx_runtime2 = require("react/jsx-runtime");
function save2({ attributes }) {
  const { content, level } = attributes;
  const TagName = "h" + level;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TagName, { ...import_block_editor2.useBlockProps.save(), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_block_editor2.RichText.Content, { value: content }) });
}

// node_modules/@wordpress/block-library/src/heading/block.json
var block_default2 = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/heading",
  title: "Heading",
  category: "text",
  description: "Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.",
  keywords: ["title", "subtitle"],
  textdomain: "default",
  attributes: {
    content: {
      type: "rich-text",
      source: "rich-text",
      selector: "h1,h2,h3,h4,h5,h6",
      role: "content"
    },
    level: {
      type: "number",
      default: 2
    },
    levelOptions: {
      type: "array"
    },
    placeholder: {
      type: "string"
    }
  },
  supports: {
    align: ["wide", "full"],
    anchor: true,
    className: true,
    splitting: true,
    __experimentalBorder: {
      color: true,
      radius: true,
      style: true,
      width: true
    },
    color: {
      gradients: true,
      link: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
      }
    },
    spacing: {
      margin: true,
      padding: true,
      __experimentalDefaultControls: {
        margin: false,
        padding: false
      }
    },
    typography: {
      fontSize: true,
      lineHeight: true,
      textAlign: true,
      __experimentalFontFamily: true,
      __experimentalFontStyle: true,
      __experimentalFontWeight: true,
      __experimentalLetterSpacing: true,
      __experimentalTextTransform: true,
      __experimentalTextDecoration: true,
      __experimentalWritingMode: true,
      fitText: true,
      __experimentalDefaultControls: {
        fontSize: true
      }
    },
    __unstablePasteTextInline: true,
    __experimentalSlashInserter: true,
    interactivity: {
      clientNavigation: true
    }
  },
  editorStyle: "wp-block-heading-editor",
  style: "wp-block-heading"
};

// node_modules/@wordpress/block-library/src/image/save.js
var import_block_editor3 = require("@wordpress/block-editor");

// node_modules/@wordpress/block-library/src/image/utils.js
function mediaPosition({ x, y } = { x: 0.5, y: 0.5 }) {
  return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
}

// node_modules/@wordpress/block-library/src/image/save.js
var import_jsx_runtime3 = require("react/jsx-runtime");
function save3({ attributes }) {
  const {
    url,
    alt,
    caption,
    align,
    href,
    rel,
    linkClass,
    width,
    height,
    aspectRatio,
    scale,
    focalPoint,
    id,
    linkTarget,
    sizeSlug,
    title,
    isDecorative,
    metadata: { bindings = {} } = {}
  } = attributes;
  const newRel = !rel ? void 0 : rel;
  const borderProps = (0, import_block_editor3.__experimentalGetBorderClassesAndStyles)(attributes);
  const shadowProps = (0, import_block_editor3.__experimentalGetShadowClassesAndStyles)(attributes);
  const classes = clsx_default({
    // All other align classes are handled by block supports.
    // `{ align: 'none' }` is unique to transforms for the image block.
    alignnone: "none" === align,
    [`size-${sizeSlug}`]: sizeSlug,
    "is-resized": width || height,
    "has-custom-border": !!borderProps.className || borderProps.style && Object.keys(borderProps.style).length > 0
  });
  const imageClasses = clsx_default(borderProps.className, {
    [`wp-image-${id}`]: !!id
  });
  const image = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "img",
    {
      src: url,
      alt,
      className: imageClasses || void 0,
      style: (() => {
        const style = {
          ...borderProps.style,
          ...shadowProps.style,
          aspectRatio,
          objectFit: scale,
          objectPosition: focalPoint && scale ? mediaPosition(focalPoint) : void 0
        };
        if (width !== void 0 || height !== void 0) {
          if (width === "auto") {
            style.width = "auto";
          } else if (width !== void 0 && width !== null) {
            style.width = typeof width === "number" ? `${width}px` : width;
          }
          if (height === "auto" || height === void 0 || height === null) {
            style.height = "auto";
          } else {
            style.height = typeof height === "number" ? `${height}px` : height;
          }
        }
        return style;
      })(),
      title,
      role: isDecorative ? "none" : void 0
    }
  );
  const displayCaption = !import_block_editor3.RichText.isEmpty(caption) || bindings.caption || bindings?.__default?.source === "core/pattern-overrides";
  const figure = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    href ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "a",
      {
        className: linkClass,
        href,
        target: linkTarget,
        rel: newRel,
        children: image
      }
    ) : image,
    displayCaption && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_block_editor3.RichText.Content,
      {
        className: (0, import_block_editor3.__experimentalGetElementClassName)("caption"),
        tagName: "figcaption",
        value: caption
      }
    )
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("figure", { ...import_block_editor3.useBlockProps.save({ className: classes }), children: figure });
}

// node_modules/@wordpress/block-library/src/image/block.json
var block_default3 = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/image",
  title: "Image",
  category: "media",
  usesContext: [
    "allowResize",
    "imageCrop",
    "fixedHeight",
    "navigationButtonType",
    "postId",
    "postType",
    "queryId",
    "galleryId"
  ],
  description: "Insert an image to make a visual statement.",
  keywords: ["img", "photo", "picture"],
  textdomain: "default",
  attributes: {
    blob: {
      type: "string",
      role: "local"
    },
    url: {
      type: "string",
      source: "attribute",
      selector: "img",
      attribute: "src",
      role: "content"
    },
    alt: {
      type: "string",
      source: "attribute",
      selector: "img",
      attribute: "alt",
      default: "",
      role: "content"
    },
    caption: {
      type: "rich-text",
      source: "rich-text",
      selector: "figcaption",
      role: "content"
    },
    lightbox: {
      type: "object",
      enabled: {
        type: "boolean"
      }
    },
    title: {
      type: "string",
      source: "attribute",
      selector: "img",
      attribute: "title",
      role: "content"
    },
    href: {
      type: "string",
      source: "attribute",
      selector: "figure > a",
      attribute: "href",
      role: "content"
    },
    rel: {
      type: "string",
      source: "attribute",
      selector: "figure > a",
      attribute: "rel"
    },
    linkClass: {
      type: "string",
      source: "attribute",
      selector: "figure > a",
      attribute: "class"
    },
    id: {
      type: "number",
      role: "content"
    },
    width: {
      type: "string"
    },
    height: {
      type: "string"
    },
    aspectRatio: {
      type: "string"
    },
    scale: {
      type: "string"
    },
    focalPoint: {
      type: "object"
    },
    sizeSlug: {
      type: "string"
    },
    linkDestination: {
      type: "string"
    },
    linkTarget: {
      type: "string",
      source: "attribute",
      selector: "figure > a",
      attribute: "target"
    },
    isDecorative: {
      type: "boolean",
      default: false
    }
  },
  supports: {
    interactivity: true,
    align: ["left", "center", "right", "wide", "full"],
    anchor: true,
    color: {
      text: false,
      background: false
    },
    filter: {
      duotone: true
    },
    spacing: {
      margin: true
    },
    __experimentalBorder: {
      color: true,
      radius: true,
      width: true,
      __experimentalSkipSerialization: true,
      __experimentalDefaultControls: {
        color: true,
        radius: true,
        width: true
      }
    },
    shadow: {
      __experimentalSkipSerialization: true
    }
  },
  selectors: {
    dimensions: ".wp-block-image img, .wp-block-image .components-placeholder",
    border: ".wp-block-image img, .wp-block-image .wp-block-image__crop-area, .wp-block-image .components-placeholder",
    shadow: ".wp-block-image img, .wp-block-image .wp-block-image__crop-area, .wp-block-image .components-placeholder",
    filter: {
      duotone: ".wp-block-image img, .wp-block-image .components-placeholder"
    }
  },
  styles: [
    {
      name: "default",
      label: "Default",
      isDefault: true
    },
    { name: "rounded", label: "Rounded" }
  ],
  editorStyle: "wp-block-image-editor",
  style: "wp-block-image"
};

// node_modules/@wordpress/block-library/src/button/save.js
var import_block_editor4 = require("@wordpress/block-editor");
var import_jsx_runtime4 = require("react/jsx-runtime");
function save4({ attributes }) {
  const {
    tagName,
    type,
    fontSize,
    linkTarget,
    rel,
    style,
    text,
    title,
    url
  } = attributes;
  const TagName = tagName || "a";
  const isButtonTag = "button" === TagName;
  const buttonType = type || "button";
  const borderProps = (0, import_block_editor4.__experimentalGetBorderClassesAndStyles)(attributes);
  const colorProps = (0, import_block_editor4.__experimentalGetColorClassesAndStyles)(attributes);
  const spacingProps = (0, import_block_editor4.__experimentalGetSpacingClassesAndStyles)(attributes);
  const shadowProps = (0, import_block_editor4.__experimentalGetShadowClassesAndStyles)(attributes);
  const typographyProps = (0, import_block_editor4.getTypographyClassesAndStyles)(attributes);
  const buttonClasses = clsx_default(
    "wp-block-button__link",
    colorProps.className,
    borderProps.className,
    typographyProps.className,
    {
      // For backwards compatibility add style that isn't provided via
      // block support.
      "no-border-radius": style?.border?.radius === 0,
      [`has-custom-font-size`]: fontSize || style?.typography?.fontSize
    },
    (0, import_block_editor4.__experimentalGetElementClassName)("button")
  );
  const buttonStyle = {
    ...borderProps.style,
    ...colorProps.style,
    ...spacingProps.style,
    ...shadowProps.style,
    ...typographyProps.style,
    writingMode: void 0
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...import_block_editor4.useBlockProps.save(), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_block_editor4.RichText.Content,
    {
      tagName: TagName,
      type: isButtonTag ? buttonType : null,
      className: buttonClasses,
      href: isButtonTag ? null : url,
      title,
      style: buttonStyle,
      value: text,
      target: isButtonTag ? null : linkTarget,
      rel: isButtonTag ? null : rel
    }
  ) });
}

// node_modules/@wordpress/block-library/src/button/block.json
var block_default4 = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/button",
  title: "Button",
  category: "design",
  parent: ["core/buttons"],
  description: "Prompt visitors to take action with a button-style link.",
  keywords: ["link"],
  textdomain: "default",
  attributes: {
    tagName: {
      type: "string",
      enum: ["a", "button"],
      default: "a"
    },
    type: {
      type: "string",
      default: "button"
    },
    url: {
      type: "string",
      source: "attribute",
      selector: "a",
      attribute: "href",
      role: "content"
    },
    title: {
      type: "string",
      source: "attribute",
      selector: "a,button",
      attribute: "title",
      role: "content"
    },
    text: {
      type: "rich-text",
      source: "rich-text",
      selector: "a,button",
      role: "content"
    },
    linkTarget: {
      type: "string",
      source: "attribute",
      selector: "a",
      attribute: "target",
      role: "content"
    },
    rel: {
      type: "string",
      source: "attribute",
      selector: "a",
      attribute: "rel",
      role: "content"
    },
    placeholder: {
      type: "string"
    },
    backgroundColor: {
      type: "string"
    },
    textColor: {
      type: "string"
    },
    gradient: {
      type: "string"
    }
  },
  supports: {
    anchor: true,
    splitting: true,
    align: false,
    alignWide: false,
    color: {
      __experimentalSkipSerialization: true,
      gradients: true,
      __experimentalDefaultControls: {
        background: true,
        text: true
      }
    },
    dimensions: {
      width: true,
      __experimentalSkipSerialization: ["width"],
      __experimentalDefaultControls: {
        width: true
      }
    },
    typography: {
      __experimentalSkipSerialization: [
        "fontSize",
        "lineHeight",
        "textAlign",
        "fontFamily",
        "fontWeight",
        "fontStyle",
        "textTransform",
        "textDecoration",
        "letterSpacing"
      ],
      fontSize: true,
      lineHeight: true,
      textAlign: true,
      __experimentalFontFamily: true,
      __experimentalFontWeight: true,
      __experimentalFontStyle: true,
      __experimentalTextTransform: true,
      __experimentalTextDecoration: true,
      __experimentalLetterSpacing: true,
      __experimentalWritingMode: true,
      __experimentalDefaultControls: {
        fontSize: true
      }
    },
    reusable: false,
    shadow: {
      __experimentalSkipSerialization: true
    },
    spacing: {
      __experimentalSkipSerialization: true,
      padding: ["horizontal", "vertical"],
      __experimentalDefaultControls: {
        padding: true
      }
    },
    __experimentalBorder: {
      color: true,
      radius: true,
      style: true,
      width: true,
      __experimentalSkipSerialization: true,
      __experimentalDefaultControls: {
        color: true,
        radius: true,
        style: true,
        width: true
      }
    },
    interactivity: {
      clientNavigation: true
    }
  },
  styles: [
    { name: "fill", label: "Fill", isDefault: true },
    { name: "outline", label: "Outline" }
  ],
  editorStyle: "wp-block-button-editor",
  style: "wp-block-button",
  selectors: {
    root: ".wp-block-button .wp-block-button__link",
    typography: {
      writingMode: ".wp-block-button"
    },
    dimensions: {
      root: ".wp-block-button",
      width: ".wp-block-button"
    }
  }
};

// node_modules/@wordpress/block-library/src/buttons/save.js
var import_block_editor5 = require("@wordpress/block-editor");
var import_jsx_runtime5 = require("react/jsx-runtime");
function save5({ attributes, className }) {
  const { fontSize, style } = attributes;
  const blockProps = import_block_editor5.useBlockProps.save({
    className: clsx_default(className, {
      "has-custom-font-size": fontSize || style?.typography?.fontSize
    })
  });
  const innerBlocksProps = import_block_editor5.useInnerBlocksProps.save(blockProps);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { ...innerBlocksProps });
}

// node_modules/@wordpress/block-library/src/buttons/block.json
var block_default5 = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/buttons",
  title: "Buttons",
  category: "design",
  allowedBlocks: ["core/button"],
  description: "Prompt visitors to take action with a group of button-style links.",
  keywords: ["link"],
  textdomain: "default",
  supports: {
    anchor: true,
    align: ["wide", "full"],
    html: false,
    __experimentalExposeControlsToChildren: true,
    color: {
      gradients: true,
      text: false,
      __experimentalDefaultControls: {
        background: true
      }
    },
    spacing: {
      blockGap: ["horizontal", "vertical"],
      padding: true,
      margin: ["top", "bottom"],
      __experimentalDefaultControls: {
        blockGap: true
      }
    },
    typography: {
      fontSize: true,
      lineHeight: true,
      __experimentalFontFamily: true,
      __experimentalFontWeight: true,
      __experimentalFontStyle: true,
      __experimentalTextTransform: true,
      __experimentalTextDecoration: true,
      __experimentalLetterSpacing: true,
      __experimentalDefaultControls: {
        fontSize: true
      }
    },
    __experimentalBorder: {
      color: true,
      radius: true,
      style: true,
      width: true,
      __experimentalDefaultControls: {
        color: true,
        radius: true,
        style: true,
        width: true
      }
    },
    layout: {
      allowSwitching: false,
      allowInheriting: false,
      default: {
        type: "flex"
      }
    },
    interactivity: {
      clientNavigation: true
    },
    listView: true,
    contentRole: true
  },
  editorStyle: "wp-block-buttons-editor",
  style: "wp-block-buttons"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  button,
  buttonMeta,
  buttons,
  buttonsMeta,
  heading,
  headingMeta,
  image,
  imageMeta,
  paragraph,
  paragraphMeta
});
