export default function (link) {
  let rawUrl = "";
  const urls = link.split(",");

  for (const section of urls) {
    if (section.split(";")[1].includes("next")) {
      rawUrl = section.split(";")[0];
      break;
    }
  }

  return rawUrl.trim().substring(24, rawUrl.trim().length - 1);
}
