const FontFaceObserver = require("fontfaceobserver");

const Fonts = () => {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css?family=Roboto:400,700|Trade+Winds&display=swap";
  link.rel = "stylesheet";

  document.head.appendChild(link);

  const roboto = new FontFaceObserver("Roboto");
  const tradeWinds = new FontFaceObserver("Trade Winds");

  roboto.load().then(() => {
    document.documentElement.classList.add("roboto");
  });
  tradeWinds.load().then(() => {
    document.documentElement.classList.add("tradeWinds");
  });
};

export default Fonts;
