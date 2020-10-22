const axios = require("axios");
const express = require("express");
const _cheerio = require("cheerio");

const app = express();
// Import styles
app.use(express.static(__dirname + "/src"));

const channelsDataSource = require("../../assets/data/channels.json");

async function getData(channelUrl) {
  try {
    const url = channelUrl;
    const { data } = await axios.get(url);
    console.log(data);
    const $ = _cheerio.load(data);

    const guide = $("h4").html();
    guide.trim();
    const guideItem = guide.split("<br>");
    return guideItem;
  } catch (error) {
    throw error;
  }
}

async function getDataV2(channelUrl, elem) {
  try {
    const url = channelUrl;
    const { data } = await axios.get(url);
    const $ = _cheerio.load(data);
    let guide = [];
    $(elem).each(function () {
      guide.push($(this).text());
    });

    return guide;
  } catch (error) {
    throw error;
  }
}

function getTVGuideRAI1() {
  return getData(channelsDataSource[0].tvGuide);
}

async function getTVGuideRAI2() {
  return getData(channelsDataSource[1].tvGuide);
}

async function getTVGuideRAI3() {
  return getData(channelsDataSource[2].tvGuide);
}

async function getTVGuideRAI4() {
  return getData(channelsDataSource[3].tvGuide);
}

async function getTVGuideRAI5() {
  return getData(channelsDataSource[4].tvGuide);
}

async function getTVGuideRAIMOVIE() {
  return getData(channelsDataSource[5].tvGuide);
}

async function getTVGuideRAIPREMIUM() {
  return getData(channelsDataSource[6].tvGuide);
}

async function getTVGuideRAIYOYO() {
  return getData(channelsDataSource[7].tvGuide);
}

async function getTVGuideRAIGulp() {
  return getData(channelsDataSource[8].tvGuide);
}

async function getTVGuideRAINEWS() {
  try {
    const url = channelsDataSource[9].tvGuide;
    const { data } = await axios.get(url);
    const $ = _cheerio.load(data);
    let guide = [];
    $(".lgt-event").each(function () {
      guide.push($(this).text());
    });

    return guide;
  } catch (error) {
    throw error;
  }
}

async function getTVGuideRAIStoria() {
  return getData(channelsDataSource[10].tvGuide);
}

async function getTVGuideRAISport() {
  return getData(channelsDataSource[11].tvGuide);
}

async function getTVGuideRete4() {
  return getData(channelsDataSource[12].tvGuide);
}

async function getTVGuideCanale5() {
  return getData(channelsDataSource[13].tvGuide);
}

async function getTVGuideItalia1() {
  return getData(channelsDataSource[14].tvGuide);
}

async function getTVGuideMediasetExtra() {
  return getData(channelsDataSource[15].tvGuide);
}

async function getTVGuideMediasetDirette() {
  return getData(channelsDataSource[16].tvGuide);
}

async function getTVGuideLA7() {
  return getData(channelsDataSource[17].tvGuide);
}

async function getTVGuideLA7d() {
  return getData(channelsDataSource[18].tvGuide);
}

async function getTVGuideCanale8() {
  return getData(channelsDataSource[19].tvGuide);
}

async function getTVGuideCanale9() {
  return getData(channelsDataSource[20].tvGuide);
}

async function getTVGuideIris() {
  return getData(channelsDataSource[21].tvGuide);
}

async function getTVGuideCielo() {
  return getData(channelsDataSource[22].tvGuide);
}

async function getTVGuideFocus() {
  return getData(channelsDataSource[23].tvGuide);
}

async function getTVGuideFrisbee() {
  return getData(channelsDataSource[24].tvGuide);
}

async function getTVGuideSuper() {
  return getData(channelsDataSource[25].tvGuide);
}

async function getTVGuideSKYTg() {
  return getData(channelsDataSource[26].tvGuide);
}

async function getTVGuideDMAX() {
  return getData(channelsDataSource[27].tvGuide);
}

async function getTVGuideMotorTrend() {
  return getData(channelsDataSource[28].tvGuide);
}

async function getTVGuideSportItalia() {
  return getData(channelsDataSource[29].tvGuide);
}

async function getTVGuideTGCOM() {
  return getDataV2(channelsDataSource[30].tvGuide, ".program-line");
}

async function getTVGuideCanale21() {
  return getDataV2(channelsDataSource[31].tvGuide, ".program-line");
}

async function getTVGuideTOPCalcio24() {
  try {
    const url = channelsDataSource[31].tvGuide;
    const { data } = await axios.get(url);
    const $ = _cheerio.load(data);
    let guide = [];
    $(".program-list-item").each(function () {
      guide.push($(this).text());
    });

    return guide;
  } catch (error) {
    throw error;
  }
}

async function getTVGuideEuroNews() {
  return getDataV2(channelsDataSource[32].tvGuide, ".program-line");
}

module.exports = {
  getTVGuideRAI1,
  getTVGuideRAI2,
  getTVGuideRAI3,
  getTVGuideRAI4,
  getTVGuideRAI5,
  getTVGuideRAIMOVIE,
  getTVGuideRAIPREMIUM,
  getTVGuideRAIYOYO,
  getTVGuideRAIGulp,
  getTVGuideRAINEWS,
  getTVGuideRAIStoria,
  getTVGuideRAISport,
  getTVGuideRete4,
  getTVGuideCanale5,
  getTVGuideItalia1,
  getTVGuideMediasetExtra,
  getTVGuideMediasetDirette,
  getTVGuideLA7,
  getTVGuideLA7d,
  getTVGuideCanale8,
  getTVGuideCanale9,
  getTVGuideIris,
  getTVGuideCielo,
  getTVGuideFocus,
  getTVGuideFrisbee,
  getTVGuideSuper,
  getTVGuideSKYTg,
  getTVGuideDMAX,
  getTVGuideMotorTrend,
  getTVGuideSportItalia,
  getTVGuideTGCOM,
  getTVGuideTOPCalcio24,
  getTVGuideEuroNews
};
