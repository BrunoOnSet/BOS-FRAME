const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const CAMERA_DB_URL="https://raw.githubusercontent.com/BrunoSetTools/BOS-CAMERA-DB/main/cameras.json";
const CAMERA_DB_CACHE_KEY="bos-camera-db-cache-v2";
const FALLBACK_CAMERA_DB={"schemaVersion":1,"databaseVersion":"1.2","updated":"2026-08-18","cameras":[{"id":"fx30","name":"Sony FX30","brand":"Sony","group":"SONY","sensorWidthMm":23.3,"dof":{"label":"Super 35 / APS-C","cocMm":0.019,"cropToFF":1.5},"media":{"label":"FX30","modes":{"DCI 4K":{"width":4096,"height":2160,"codecs":{"XAVC S-I":{"kind":"fixed","rates":{"24":240,"25":250,"50":500,"23.98":240,"29.97":300,"59.94":600},"note":"All-Intra · 4:2:2 10 bit"}}},"UHD 4K":{"width":3840,"height":2160,"codecs":{"XAVC S-I":{"kind":"fixed","rates":{"24":240,"25":250,"50":500,"23.98":240,"29.97":300,"59.94":600},"note":"All-Intra · 4:2:2 10 bit"},"XAVC S":{"kind":"fixed","rates":{"25":140,"50":200,"100":280,"23.98":100,"29.97":140,"59.94":200,"119.88":280},"note":"Long GOP · 4:2:2 10 bit"},"XAVC HS":{"kind":"fixed","rates":{"50":200,"100":280,"23.98":100,"59.94":200,"119.88":280},"note":"HEVC Long GOP · 4:2:2 10 bit"}}},"HD":{"width":1920,"height":1080,"codecs":{"XAVC S-I":{"kind":"fixed","rates":{"25":93,"50":185,"23.98":89,"29.97":111,"59.94":222},"note":"All-Intra · 4:2:2 10 bit"},"XAVC S":{"kind":"fixed","rates":{"25":50,"50":50,"100":100,"23.98":50,"29.97":50,"59.94":50,"119.88":100},"note":"Long GOP · preset 4:2:2 10 bit / débit haut"}}}}},"exposure":{"unit":"ISO","defaultProfile":"slog3","profiles":{"slog3":{"label":"S-Log3 / Cine EI","baseValues":[800,2500],"defaultValue":800,"baseType":"dualBaseISO","gain":{"type":"cameraSpecific"},"sources":["https://helpguide.sony.net/ilc/2220/v1/en/contents/TP1000888939.html"]},"scinetone":{"label":"S-Cinetone","baseValues":[],"defaultValue":null,"baseType":"notPublished","gain":{"type":"cameraSpecific"},"note":"Sony ne publie pas de Base ISO Cine EI pour S-Cinetone ; ne pas surligner un ISO natif par déduction.","sources":["https://helpguide.sony.net/ilc/2220/v1/en/contents/TP1000876510.html"]}}}},{"id":"fx3","name":"Sony FX3","brand":"Sony","group":"SONY","sensorWidthMm":35.6,"dof":{"label":"Full Frame","cocMm":0.029,"cropToFF":1.0},"media":{"label":"FX3","modes":{"DCI 4K":{"width":4096,"height":2160,"codecs":{"XAVC S-I":{"kind":"fixed","rates":{"24":240,"25":250,"50":500,"23.98":240,"29.97":300,"59.94":600},"note":"All-Intra · 4:2:2 10 bit"}}},"UHD 4K":{"width":3840,"height":2160,"codecs":{"XAVC S-I":{"kind":"fixed","rates":{"24":240,"25":250,"50":500,"23.98":240,"29.97":300,"59.94":600},"note":"All-Intra · 4:2:2 10 bit"},"XAVC S":{"kind":"fixed","rates":{"25":140,"50":200,"100":280,"23.98":100,"29.97":140,"59.94":200,"119.88":280},"note":"Long GOP · 4:2:2 10 bit"},"XAVC HS":{"kind":"fixed","rates":{"50":200,"100":280,"23.98":100,"59.94":200,"119.88":280},"note":"HEVC Long GOP · 4:2:2 10 bit"}}},"HD":{"width":1920,"height":1080,"codecs":{"XAVC S-I":{"kind":"fixed","rates":{"25":93,"50":185,"23.98":89,"29.97":111,"59.94":222},"note":"All-Intra · 4:2:2 10 bit"},"XAVC S":{"kind":"fixed","rates":{"25":50,"50":50,"100":100,"23.98":50,"29.97":50,"59.94":50,"119.88":100},"note":"Long GOP · preset 4:2:2 10 bit / débit haut"}}}}},"exposure":{"unit":"ISO","defaultProfile":"slog3","profiles":{"slog3":{"label":"S-Log3 / Cine EI","baseValues":[800,12800],"defaultValue":800,"baseType":"dualBaseISO","gain":{"type":"cameraSpecific"},"sources":["https://helpguide.sony.net/ilc/2210/v1/en/contents/TP1000888939.html"]},"scinetone":{"label":"S-Cinetone","baseValues":[],"defaultValue":null,"baseType":"notPublished","gain":{"type":"cameraSpecific"},"note":"Ne pas déduire les Base ISO S-Log3 pour S-Cinetone.","sources":["https://www.sony.fr/electronics/appareils-photo-a-objectifs-interchangeables/ilme-fx3a"]}}}},{"id":"fx5","name":"Sony FX5","brand":"Sony","group":"SONY","sensorWidthMm":35.9,"dof":{"label":"Full Frame","cocMm":0.029,"cropToFF":1.0},"media":{"label":"FX5","modes":{"DCI 4K":{"width":4096,"height":2160,"codecs":{"XAVC S-I":{"kind":"fixed","rates":{"24":240,"25":250,"50":500,"23.98":240,"29.97":300,"59.94":600},"note":"All-Intra · 4:2:2 10 bit"}}},"UHD 4K":{"width":3840,"height":2160,"codecs":{"XAVC S-I":{"kind":"fixed","rates":{"24":240,"25":250,"50":500,"23.98":240,"29.97":300,"59.94":600},"note":"All-Intra · 4:2:2 10 bit"},"XAVC S-L 422":{"kind":"fixed","rates":{"25":140,"50":200,"100":280,"23.98":100,"29.97":140,"59.94":200,"119.88":280},"note":"Long GOP · 4:2:2 10 bit"},"XAVC HS-L 422":{"kind":"fixed","rates":{"50":200,"100":280,"23.98":100,"59.94":200,"119.88":280},"note":"HEVC Long GOP · 4:2:2 10 bit"}}},"HD":{"width":1920,"height":1080,"codecs":{"XAVC S-I":{"kind":"fixed","rates":{"25":93,"50":185,"23.98":89,"29.97":111,"59.94":222},"note":"All-Intra · 4:2:2 10 bit"},"XAVC S-L 422":{"kind":"fixed","rates":{"25":50,"50":50,"100":100,"23.98":50,"29.97":50,"59.94":50,"119.88":100},"note":"Long GOP · preset 4:2:2 10 bit / débit haut"}}}}},"exposure":{"unit":"ISO","defaultProfile":"slog3","profiles":{"slog3":{"label":"S-Log3 / Cine EI / Flexible ISO","baseValues":[800,4000,12800],"defaultValue":800,"baseType":"multiBaseISO","gain":{"type":"cameraSpecific"},"specialModes":[{"id":"iso800DualGain","label":"ISO 800 (Dual Gain)","value":800,"type":"dualGain"}],"sources":["https://helpguide.sony.net/ilc/2630/v1/en/contents/base_iso.html"]},"scinetone":{"label":"S-Cinetone","baseValues":[],"defaultValue":null,"baseType":"notPublished","gain":{"type":"cameraSpecific"},"note":"S-Cinetone est disponible en mode Custom ; les valeurs Base ISO du mode Log ne doivent pas être transposées automatiquement.","sources":["https://helpguide.sony.net/ilc/2630/v1/en/contents/paint_look.html"]}}}},{"id":"fx6","name":"Sony FX6","brand":"Sony","group":"SONY","sensorWidthMm":35.6,"dof":{"label":"Full Frame","cocMm":0.029,"cropToFF":1.0},"media":{"label":"FX6","modes":{"DCI 4K":{"width":4096,"height":2160,"codecs":{"XAVC-I":{"kind":"fixed","rates":{"24":240,"25":250,"50":500,"23.98":240,"29.97":300,"59.94":600},"note":"All-Intra · 4:2:2 10 bit"}}},"UHD 4K":{"width":3840,"height":2160,"codecs":{"XAVC-I":{"kind":"fixed","rates":{"24":240,"25":250,"50":500,"23.98":240,"29.97":300,"59.94":600},"note":"All-Intra · 4:2:2 10 bit"},"XAVC-L":{"kind":"fixed","rates":{"25":100,"50":150,"23.98":100,"29.97":100,"59.94":150},"note":"Long GOP · VBR"}}},"HD":{"width":1920,"height":1080,"codecs":{"XAVC-I":{"kind":"fixed","rates":{"25":93,"50":185,"23.98":89,"29.97":111,"59.94":222},"note":"All-Intra · 4:2:2 10 bit"},"XAVC-L 50":{"kind":"fixed","rates":{"25":50,"50":50,"23.98":50,"29.97":50,"59.94":50},"note":"Long GOP · VBR · 50 Mb/s max"},"XAVC-L 35":{"kind":"fixed","rates":{"25":35,"50":35,"23.98":35,"29.97":35,"59.94":35},"note":"Long GOP · VBR · 35 Mb/s max"}}}}},"exposure":{"unit":"ISO","defaultProfile":"slog3","profiles":{"slog3":{"label":"S-Log3 / Cine EI","baseValues":[800,12800],"defaultValue":800,"baseType":"dualBaseISO","gain":{"type":"cameraSpecific"},"sources":["https://pro.sony/bp_BR/products/handheld-camcorders/ilme-fx6"]},"scinetone":{"label":"S-Cinetone","baseValues":[],"defaultValue":null,"baseType":"notPublished","gain":{"type":"cameraSpecific"},"note":"Le second Base ISO 12 800 est documenté par Sony pour S-Log3 ; ne pas le transposer à S-Cinetone sans source dédiée.","sources":["https://pro.sony/en_GB/filmmaking/filmmaking-stories/ilme-fx6-wilderness-bts"]}}}},{"id":"vraptor","name":"RED V-RAPTOR VV","brand":"RED","group":"ARRI / RED","sensorWidthMm":40.96,"dof":{"label":"Vista Vision","cocMm":0.033,"cropToFF":0.88},"exposure":{"unit":"ISO","defaultProfile":"ipp2","profiles":{"ipp2":{"label":"IPP2 / Log3G10","baseValues":[],"referenceValues":[800],"defaultValue":800,"baseType":"referenceOnly","isoRange":[250,12800],"gain":{"type":"metadata"},"note":"RED décrit ISO 800 comme valeur ISO par défaut et point de départ recommandé. L’ISO R3D est un réglage de monitoring/métadonnée ajustable en post, pas un Dual Native ISO.","sources":["https://docs.red.com/955-0199/955-0199_V1.3_Rev-B_RED_PS_V-RAPTOR_8K_VV_Operation_Guide/Content/4_Menus/a_Image_LUT/02_ISO.htm"]}}}},{"id":"miniLF","name":"ARRI ALEXA Mini LF","brand":"ARRI","group":"ARRI / RED","sensorWidthMm":36.7,"dof":{"label":"Large Format","cocMm":0.03,"cropToFF":0.98},"media":{"label":"ALEXA Mini LF","modes":{"4.5K Open Gate":{"width":4448,"height":3096,"codecs":{"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 4444":{"kind":"prores","target1080":330,"note":"ProRes · débit cible VBR"},"ProRes 4444 XQ":{"kind":"prores","target1080":500,"note":"ProRes · débit cible VBR"}},"fps":["24","25","30","40"]},"UHD":{"width":3840,"height":2160,"codecs":{"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 4444":{"kind":"prores","target1080":330,"note":"ProRes · débit cible VBR"},"ProRes 4444 XQ":{"kind":"prores","target1080":500,"note":"ProRes · débit cible VBR"}},"fps":["24","25","30","48","50","60"]},"HD":{"width":1920,"height":1080,"codecs":{"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 4444":{"kind":"prores","target1080":330,"note":"ProRes · débit cible VBR"},"ProRes 4444 XQ":{"kind":"prores","target1080":500,"note":"ProRes · débit cible VBR"}},"fps":["24","25","30","48","50","60","75","90"]}}},"exposure":{"unit":"EI","defaultProfile":"logc3","profiles":{"logc3":{"label":"ARRI Log C3","baseValues":[800],"defaultValue":800,"baseType":"baseSensitivity","eiRange":[160,3200],"gain":{"type":"ei"},"sources":["https://www.arri.com/en/cine-systems/cine-cameras/alexa-mini-lf"]}}}},{"id":"alexa35","name":"ARRI ALEXA 35","brand":"ARRI","group":"ARRI / RED","sensorWidthMm":27.99,"dof":{"label":"Super 35","cocMm":0.023,"cropToFF":1.29},"media":{"label":"ALEXA 35","modes":{"4.6K Open Gate":{"width":4608,"height":3164,"codecs":{"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 4444":{"kind":"prores","target1080":330,"note":"ProRes · débit cible VBR"},"ProRes 4444 XQ":{"kind":"prores","target1080":500,"note":"ProRes · débit cible VBR"}},"fps":["24","25","30","48","50","60"]},"4K 16:9":{"width":4096,"height":2304,"codecs":{"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 4444":{"kind":"prores","target1080":330,"note":"ProRes · débit cible VBR"},"ProRes 4444 XQ":{"kind":"prores","target1080":500,"note":"ProRes · débit cible VBR"}},"fps":["24","25","30","48","50","60","75","100"]},"UHD":{"width":3840,"height":2160,"codecs":{"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 4444":{"kind":"prores","target1080":330,"note":"ProRes · débit cible VBR"},"ProRes 4444 XQ":{"kind":"prores","target1080":500,"note":"ProRes · débit cible VBR"}},"fps":["24","25","30","48","50","60","100","120"]},"HD":{"width":1920,"height":1080,"codecs":{"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 4444":{"kind":"prores","target1080":330,"note":"ProRes · débit cible VBR"},"ProRes 4444 XQ":{"kind":"prores","target1080":500,"note":"ProRes · débit cible VBR"}},"fps":["24","25","30","48","50","60","100","120"]}}},"exposure":{"unit":"EI","defaultProfile":"logc4","profiles":{"logc4":{"label":"ARRI LogC4 / REVEAL","baseValues":[800],"defaultValue":800,"baseType":"baseSensitivity","eiRange":[160,6400],"gain":{"type":"ei"},"specialModes":[{"id":"enhancedSensitivity","label":"Enhanced Sensitivity","type":"enhancedSensitivity"}],"note":"EI 800 reste la sensibilité de base ALEV4 ; Enhanced Sensitivity améliore le bruit en basse lumière sans être traité ici comme un second ISO natif.","sources":["https://www.arri.com/en/cine-systems/cine-cameras/legacy-cine-cameras/alexa-35","https://www.arri.com/en/learn-help/learn-help-camera-system/image-science/hdr-faq"]}}}},{"id":"bmpcc4k","name":"Blackmagic Pocket Cinema Camera 4K","brand":"Blackmagic","group":"BLACKMAGIC","sensorWidthMm":18.96,"sensorHeightMm":10.0,"dof":{"label":"Four Thirds","cocMm":0.014,"cropToFF":1.9},"media":{"label":"Cinema 4K","modes":{"4K DCI":{"width":4096,"height":2160,"fps":["24","25","30","50","60"],"codecs":{"BRAW 3:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":136,"note":"Blackmagic RAW · débit constant"},"BRAW 5:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":82,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":51,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":35,"note":"Blackmagic RAW · débit constant"},"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 422":{"kind":"prores","target1080":147,"note":"ProRes · débit cible VBR"},"ProRes 422 LT":{"kind":"prores","target1080":102,"note":"ProRes · débit cible VBR"},"ProRes Proxy":{"kind":"prores","target1080":45,"note":"ProRes · débit cible VBR"}}},"UHD":{"width":3840,"height":2160,"fps":["24","25","30","50","60"],"codecs":{"BRAW 3:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":127,"note":"Blackmagic RAW · débit constant"},"BRAW 5:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":77,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":48,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":32,"note":"Blackmagic RAW · débit constant"},"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 422":{"kind":"prores","target1080":147,"note":"ProRes · débit cible VBR"},"ProRes 422 LT":{"kind":"prores","target1080":102,"note":"ProRes · débit cible VBR"},"ProRes Proxy":{"kind":"prores","target1080":45,"note":"ProRes · débit cible VBR"}}},"HD":{"width":1920,"height":1080,"fps":["24","25","30","50","60","100","120"],"codecs":{"BRAW 3:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":33,"note":"Blackmagic RAW · débit constant"},"BRAW 5:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":20,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":13,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":8.4,"note":"Blackmagic RAW · débit constant"},"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 422":{"kind":"prores","target1080":147,"note":"ProRes · débit cible VBR"},"ProRes 422 LT":{"kind":"prores","target1080":102,"note":"ProRes · débit cible VBR"},"ProRes Proxy":{"kind":"prores","target1080":45,"note":"ProRes · débit cible VBR"}}}}},"exposure":{"unit":"ISO","defaultProfile":"bmfilm5","profiles":{"bmfilm5":{"label":"Blackmagic Film Gen 5","baseValues":[400,3200],"defaultValue":400,"baseType":"dualNativeISO","gain":{"type":"cameraSpecific"},"sources":["https://www.blackmagicdesign.com/products/blackmagicpocketcinemacamera"]}}}},{"id":"bmpcc6k","name":"Blackmagic Pocket Cinema Camera 6K","brand":"Blackmagic","group":"BLACKMAGIC","sensorWidthMm":23.1,"sensorHeightMm":12.99,"dof":{"label":"Super 35","cocMm":0.018,"cropToFF":1.56},"media":{"label":"Cinema 6K","modes":{"6K":{"width":6144,"height":3456,"fps":["24","25","30","50"],"codecs":{"BRAW 3:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":323,"note":"Blackmagic RAW · débit constant"},"BRAW 5:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":194,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":121,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":81,"note":"Blackmagic RAW · débit constant"}}},"4K DCI":{"width":4096,"height":2160,"fps":["24","25","30","50","60"],"codecs":{"BRAW 3:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":136,"note":"Blackmagic RAW · débit constant"},"BRAW 5:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":82,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":51,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":35,"note":"Blackmagic RAW · débit constant"},"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 422":{"kind":"prores","target1080":147,"note":"ProRes · débit cible VBR"},"ProRes 422 LT":{"kind":"prores","target1080":102,"note":"ProRes · débit cible VBR"},"ProRes Proxy":{"kind":"prores","target1080":45,"note":"ProRes · débit cible VBR"}}},"UHD":{"width":3840,"height":2160,"fps":["24","25","30","50","60"],"codecs":{"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 422":{"kind":"prores","target1080":147,"note":"ProRes · débit cible VBR"},"ProRes 422 LT":{"kind":"prores","target1080":102,"note":"ProRes · débit cible VBR"},"ProRes Proxy":{"kind":"prores","target1080":45,"note":"ProRes · débit cible VBR"}}},"HD":{"width":1920,"height":1080,"fps":["24","25","30","50","60"],"codecs":{"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 422":{"kind":"prores","target1080":147,"note":"ProRes · débit cible VBR"},"ProRes 422 LT":{"kind":"prores","target1080":102,"note":"ProRes · débit cible VBR"},"ProRes Proxy":{"kind":"prores","target1080":45,"note":"ProRes · débit cible VBR"}}}}},"exposure":{"unit":"ISO","defaultProfile":"bmfilm5","profiles":{"bmfilm5":{"label":"Blackmagic Film Gen 5","baseValues":[400,3200],"defaultValue":400,"baseType":"dualNativeISO","gain":{"type":"cameraSpecific"},"sources":["https://www.blackmagicdesign.com/products/blackmagicpocketcinemacamera/techspecs"]}}}},{"id":"ursamp46kg2","name":"Blackmagic URSA Mini Pro 4.6K G2","brand":"Blackmagic","group":"BLACKMAGIC","sensorWidthMm":25.34,"sensorHeightMm":14.25,"dof":{"label":"Super 35","cocMm":0.019,"cropToFF":1.42},"media":{"label":"URSA Mini Pro 4.6K","modes":{"4.6K":{"width":4608,"height":2592,"fps":["24","25","30","50","60","100","120"],"codecs":{"BRAW 3:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":183,"note":"Blackmagic RAW · débit constant"},"BRAW 5:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":110,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":68,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":46,"note":"Blackmagic RAW · débit constant"},"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 422":{"kind":"prores","target1080":147,"note":"ProRes · débit cible VBR"},"ProRes 422 LT":{"kind":"prores","target1080":102,"note":"ProRes · débit cible VBR"},"ProRes Proxy":{"kind":"prores","target1080":45,"note":"ProRes · débit cible VBR"}}},"UHD":{"width":3840,"height":2160,"fps":["24","25","30","50","60","100","120"],"codecs":{"BRAW 3:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":127,"note":"Blackmagic RAW · débit constant"},"BRAW 5:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":76,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":48,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":32,"note":"Blackmagic RAW · débit constant"},"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 422":{"kind":"prores","target1080":147,"note":"ProRes · débit cible VBR"},"ProRes 422 LT":{"kind":"prores","target1080":102,"note":"ProRes · débit cible VBR"},"ProRes Proxy":{"kind":"prores","target1080":45,"note":"ProRes · débit cible VBR"}}},"HD":{"width":1920,"height":1080,"fps":["24","25","30","50","60","100","120"],"codecs":{"BRAW 3:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":33,"note":"Blackmagic RAW · débit constant"},"BRAW 5:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":20,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":12,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":30,"baseMBps":8,"note":"Blackmagic RAW · débit constant"},"ProRes 422 HQ":{"kind":"prores","target1080":220,"note":"ProRes · débit cible VBR"},"ProRes 422":{"kind":"prores","target1080":147,"note":"ProRes · débit cible VBR"},"ProRes 422 LT":{"kind":"prores","target1080":102,"note":"ProRes · débit cible VBR"},"ProRes Proxy":{"kind":"prores","target1080":45,"note":"ProRes · débit cible VBR"}}}}},"exposure":{"unit":"ISO","defaultProfile":"bmfilm","profiles":{"bmfilm":{"label":"Blackmagic Film","baseValues":[800],"defaultValue":800,"baseType":"nativeISO","gain":{"type":"cameraSpecific"},"note":"La 4.6K G2 n’est pas traitée comme dual-native dans BOS. ISO 800 est la référence native retenue.","sources":["https://www.blackmagicdesign.com/products/blackmagicursaminipro/gallery"]}}}},{"id":"ursamp12k","name":"Blackmagic URSA Mini Pro 12K","brand":"Blackmagic","group":"BLACKMAGIC","sensorWidthMm":27.03,"sensorHeightMm":14.25,"dof":{"label":"Super 35","cocMm":0.02,"cropToFF":1.33},"media":{"label":"URSA Mini Pro 12K","modes":{"12K":{"width":12288,"height":6480,"fps":["24","25","30","50","60"],"codecs":{"BRAW 5:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":578,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":361,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":241,"note":"Blackmagic RAW · débit constant"},"BRAW 18:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":160,"note":"Blackmagic RAW · débit constant"}}},"8K":{"width":8192,"height":4320,"fps":["24","25","30","50","60","100","120"],"codecs":{"BRAW 5:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":257,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":161,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":107,"note":"Blackmagic RAW · débit constant"},"BRAW 18:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":71,"note":"Blackmagic RAW · débit constant"}}},"6K S16":{"width":6144,"height":3240,"fps":["24","25","30","50","60","100","120"],"codecs":{"BRAW 5:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":146,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":91,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":61,"note":"Blackmagic RAW · débit constant"},"BRAW 18:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":40,"note":"Blackmagic RAW · débit constant"}}},"4K":{"width":4096,"height":2160,"fps":["24","25","30","50","60","100","120"],"codecs":{"BRAW 5:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":161,"note":"Blackmagic RAW · débit constant"},"BRAW 8:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":107,"note":"Blackmagic RAW · débit constant"},"BRAW 12:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":80,"note":"Blackmagic RAW · débit constant"},"BRAW 18:1":{"kind":"scaledMBps","baseFps":24,"baseMBps":53,"note":"Blackmagic RAW · débit constant"}}}}},"exposure":{"unit":"ISO","defaultProfile":"bmfilm5","profiles":{"bmfilm5":{"label":"Blackmagic Film Gen 5","baseValues":[800],"defaultValue":800,"baseType":"nativeISO","gain":{"type":"cameraSpecific"},"sources":["https://www.blackmagicdesign.com/products/blackmagicursaminipro"]}}}},{"id":"ff","name":"Full Frame 36 mm","brand":"Générique","group":"GÉNÉRIQUE","sensorWidthMm":36.0,"dof":{"label":"Full Frame","cocMm":0.029,"cropToFF":1.0}},{"id":"s35","name":"Super 35","brand":"Générique","group":"GÉNÉRIQUE","sensorWidthMm":24.89,"dof":{"label":"Super 35","cocMm":0.019,"cropToFF":1.5}},{"id":"apsc","name":"APS-C","brand":"Générique","group":"GÉNÉRIQUE","sensorWidthMm":23.5,"dof":{"label":"APS-C","cocMm":0.019,"cropToFF":1.53}},{"id":"mft","name":"Micro 4/3","brand":"Générique","group":"GÉNÉRIQUE","sensorWidthMm":17.3,"dof":{"label":"Micro 4/3","cocMm":0.014,"cropToFF":2.08}},{"id":"oneinch","name":"1 pouce","brand":"Générique","group":"GÉNÉRIQUE","sensorWidthMm":13.2,"dof":{"label":"1 pouce","cocMm":0.011,"cropToFF":2.73}}],"notes":["V1.2 : ajout des données d’exposition aux 11 caméras réelles de la base.","Les capteurs génériques ff/s35/apsc/mft/oneinch n’ont volontairement pas de bloc exposure.","baseType distingue ISO natif/base EI, dual/multi-base et simple ISO de référence (RED).","Ne pas convertir ISO↔dB avec une formule universelle : utiliser gain.type et les données spécifiques caméra.","V1.1: profils MEDIA centralisés + Blackmagic ajoutées à la liste commune."]};
const FALLBACK_PRESETS=FALLBACK_CAMERA_DB.cameras.map(c=>({
  id:String(c.id),
  name:String(c.name),
  width:Number(c.sensorWidthMm),
  brand:String(c.brand||c.group||'Autre'),
  group:String(c.group||c.brand||'AUTRES')
}));
let presets=[...FALLBACK_PRESETS];

function cameraDbToPresets(data){
  if(!data || !Array.isArray(data.cameras) || !data.cameras.length) return null;
  const list=data.cameras.map(c=>({
    id:String(c.id||''),
    name:String(c.name||c.id||'Caméra'),
    width:Number(c.sensorWidthMm),
    brand:String(c.brand||c.group||'Autre'),
    group:String(c.group||c.brand||'AUTRES')
  })).filter(c=>c.id && Number.isFinite(c.width) && c.width>0);
  return list.length?list:null;
}
function applyCameraDbData(data){
  const list=cameraDbToPresets(data);
  if(!list) return false;
  presets=list;
  return true;
}
function loadCachedCameraDb(){
  try{
    const cached=JSON.parse(localStorage.getItem(CAMERA_DB_CACHE_KEY)||'null');
    if(cached) applyCameraDbData(cached);
  }catch(_ ){}
}
async function refreshCameraDb(){
  try{
    const res=await fetch(CAMERA_DB_URL,{cache:'no-store'});
    if(!res.ok) throw new Error('camera db '+res.status);
    const data=await res.json();
    if(!applyCameraDbData(data)) throw new Error('invalid camera db');
    try{localStorage.setItem(CAMERA_DB_CACHE_KEY,JSON.stringify(data))}catch(_ ){}

    const currentId=state.preset?.id;
    if(currentId!=='custom'){
      const updated=presets.find(p=>p.id===currentId);
      if(updated){state.preset=updated;state.sensorWidth=updated.width;}
    }
    const proId=state.proRefPreset?.id;
    const proUpdated=presets.find(p=>p.id===proId);
    if(proUpdated) state.proRefPreset=proUpdated;

    if(state.preset?.id!=='custom') cameraPickerBrand=cameraBrand(state.preset);
    renderPresets();
    renderProPresetSelect();
    renderProLenses();
    renderLenses();
    updateAll();
  }catch(_ ){}
}


const lenses = [14,18,21,24,25,28,32,35,40,50,65,70,75,85,100,105,135];
const ratios = [
  {label:'2.39:1', value:2.39},{label:'2.00:1', value:2.0},
  {label:'1.85:1', value:1.85},{label:'16:9', value:16/9},
  {label:'4:3', value:4/3},{label:'1:1', value:1},
  {label:'4:5', value:4/5},{label:'9:16', value:9/16}
];

const previewFigureMetrics = {
  // Exact pixel coordinates of assets/mannequin-preview.png (327 × 1250).
  viewWidth:327,
  viewHeight:1250,
  headTopY:2.0,
  eyeY:76.5,
  chestY:286.5,
  waistY:443.5,
  kneeY:842.0,
  footY:1240.0
};
previewFigureMetrics.headTopRatio = previewFigureMetrics.headTopY / previewFigureMetrics.viewHeight;
previewFigureMetrics.eyeRatio = previewFigureMetrics.eyeY / previewFigureMetrics.viewHeight;
previewFigureMetrics.footRatio = previewFigureMetrics.footY / previewFigureMetrics.viewHeight;
previewFigureMetrics.bodyRatio = previewFigureMetrics.footRatio - previewFigureMetrics.headTopRatio;
previewFigureMetrics.eyeFromTopRatio = (previewFigureMetrics.eyeRatio - previewFigureMetrics.headTopRatio) / previewFigureMetrics.bodyRatio;
previewFigureMetrics.eyeHeightRatio = 1 - previewFigureMetrics.eyeFromTopRatio;

// PREVIEW framing references.
// Eyes are always locked to the upper 1/3 line.
// Each reference below defines which anatomical Y position lands on the BOTTOM edge.
const previewPlanReferences = [
  // Extremely tight: eyes very large, bottom edge just below nose/chin area.
  {id:'extreme', label:'TRÈS GROS PLAN', cropY:145},

  // Face dominates, with lower face / upper neck close to bottom edge.
  {id:'close', label:'GROS PLAN', cropY:220},

  // Exact requested landmarks:
  {id:'chest', label:'POITRINE', cropY:previewFigureMetrics.chestY},
  {id:'waist', label:'TAILLE', cropY:previewFigureMetrics.waistY},

  // Exact midpoint between waist and knees:
  {
    id:'american',
    label:'AMÉRICAIN',
    cropY:(previewFigureMetrics.waistY+previewFigureMetrics.kneeY)/2
  },

  // Full standing figure.
  {id:'full', label:'PIED', cropY:previewFigureMetrics.footY}
];

function scaleForPreviewCropY(cropY){
  const figureBody=previewFigureMetrics.footY-previewFigureMetrics.headTopY;
  const eyeToCrop=Math.max(1,cropY-previewFigureMetrics.eyeY);

  // Because the eyes are at 1/3, the distance eye -> bottom edge occupies 2/3 of frame height.
  return (2/3) * figureBody / eyeToCrop;
}

const previewTargets=previewPlanReferences.map(ref=>({
  ...ref,
  scale:scaleForPreviewCropY(ref.cropY)
}));
const PREVIEW_SETTINGS_KEY='frame-preview-settings-v1';







const state = {
  stream:null,
  devices:[],
  deviceId:null,
  preset:presets.find(p=>p.id==='fx6') || presets[0],
  sensorWidth:(presets.find(p=>p.id==='fx6') || presets[0]).width,
  focal:35,
  ratio:16/9,
  guides:new Set(),
  sourceFov:null,
  sourceFovAspect:null,
  proPoints:[],
  proRefPreset:presets.find(p=>p.id==='fx6') || presets[0],
  proRefFocal:24,
  proScale:1,
  proOffsetX:0,
  proOffsetY:0,
  proAdvancedOpen:false,
  maxUsableHFov:null,
  maxUsableLimitLabel:null,
  orientation: innerWidth >= innerHeight ? 'landscape' : 'portrait',
  calLeft:.30,
  calRight:.70,
  mode:'preview',
  subjectHeight:1.75,
  subjectDistance:3.00,
  subjectCount:1,
  subjects:[
    {id:1,name:'S1',height:1.75,x:0.00,y:3.00},
    {id:2,name:'S2',height:1.75,x:-0.40,y:3.00},
    {id:3,name:'S3',height:1.75,x:0.40,y:3.00},
    {id:4,name:'S4',height:1.75,x:1.20,y:3.00}
  ],
  groupDistance:3.00,
  groupSpread:0.80,
  cameraPos:{x:0,y:0},
  cameraHeight:1.55,
  aperture:2.8,
  focusDistance:3.00,
  dofRecommendation:null,
  topDrag:null
};

const MAIN_SETTINGS_KEY='frame-main-settings-v1';

function loadMainCameraSetting(){
  let saved=null;
  try{
    saved=JSON.parse(localStorage.getItem(MAIN_SETTINGS_KEY)||'null');
  }catch{}

  if(saved?.presetId==='custom' && Number.isFinite(saved.sensorWidth)){
    state.preset={
      id:'custom',
      name:saved.name || `Capteur ${saved.sensorWidth.toFixed(2)} mm`,
      width:saved.sensorWidth
    };
    state.sensorWidth=saved.sensorWidth;
    return;
  }

  const presetId=saved?.presetId || 'fx6';
  const preset=presets.find(p=>p.id===presetId) || presets.find(p=>p.id==='fx6') || presets[0];
  state.preset=preset;
  state.sensorWidth=preset.width;
}

function saveMainCameraSetting(){
  try{
    localStorage.setItem(MAIN_SETTINGS_KEY,JSON.stringify({
      presetId:state.preset.id,
      name:state.preset.name,
      sensorWidth:state.sensorWidth
    }));
  }catch{}
}


function loadPreviewSettings(){
  let saved=null;
  try{saved=JSON.parse(localStorage.getItem(PREVIEW_SETTINGS_KEY)||'null')}catch{}
  if(saved){
    if(saved.mode==='real' || saved.mode==='preview') state.mode=saved.mode;
    if(Number.isFinite(saved.subjectHeight)) state.subjectHeight=Math.max(1.2,Math.min(2.2,saved.subjectHeight));
    if(Number.isFinite(saved.subjectDistance)) state.subjectDistance=Math.max(.4,Math.min(30,saved.subjectDistance));
    if(Number.isFinite(saved.subjectCount)) state.subjectCount=Math.max(1,Math.min(4,Math.round(saved.subjectCount)));
    if(Number.isFinite(saved.groupDistance)) state.groupDistance=Math.max(.4,Math.min(30,saved.groupDistance));
    if(Number.isFinite(saved.groupSpread)) state.groupSpread=Math.max(.2,Math.min(2.5,saved.groupSpread));
    if(Array.isArray(saved.subjects)){
      saved.subjects.slice(0,4).forEach((s,i)=>{
        if(!state.subjects[i]) return;
        if(Number.isFinite(s.height)) state.subjects[i].height=Math.max(1.2,Math.min(2.2,s.height));
      });
    }
  }
  state.subjects[0].height=state.subjectHeight;
  rebuildGroupLayout();
}
function savePreviewSettings(){
  try{
    state.subjectHeight=state.subjects[0].height;
    state.subjectDistance=state.groupDistance;
    localStorage.setItem(PREVIEW_SETTINGS_KEY,JSON.stringify({
      mode:state.mode,
      subjectHeight:state.subjectHeight,
      subjectDistance:state.subjectDistance,
      subjectCount:state.subjectCount,
      groupDistance:state.groupDistance,
      groupSpread:state.groupSpread,
      subjects:state.subjects.map(s=>({height:s.height}))
    }));
  }catch{}
}

function deg(r){ return r*180/Math.PI }
function rad(d){ return d*Math.PI/180 }
function targetHFov(){ return deg(2*Math.atan(state.sensorWidth/(2*state.focal))); }
function orientationKey(){
  return `${state.deviceId || 'default'}:${state.orientation}`;
}
function sharedV24Key(){
  return `${state.deviceId || 'default'}`;
}
function calibrationStore(){
  try{return JSON.parse(localStorage.getItem('frame-calibrations')||'{}')}catch{return {}}
}
function loadCalibration(){
  const store=calibrationStore();
  let data=store[orientationKey()];

  // V2.5: migrate V2.4 shared calibration only into the orientation
  // currently open, then remove the shared profile. The other orientation
  // will therefore require its own calibration.
  if(!data){
    const sharedKey=sharedV24Key();
    const shared=store[sharedKey];
    if(shared){
      data=shared;
      store[orientationKey()]=shared;
      delete store[sharedKey];
      try{localStorage.setItem('frame-calibrations',JSON.stringify(store))}catch{}
    }
  }

  if(data?.version >= 5){
    state.sourceFov = data.quickHFov || null;
    state.sourceFovAspect = Number.isFinite(data.quickAspect) ? data.quickAspect : null;
    state.proPoints = Array.isArray(data.proPoints) ? data.proPoints : [];
    state.maxUsableHFov = Number.isFinite(data.maxUsableHFov) ? data.maxUsableHFov : null;
    state.maxUsableLimitLabel = data.maxUsableLimitLabel || null;
  }else if(data?.version === 4){
    state.sourceFov = data.quickHFov || null;
    state.sourceFovAspect = null;
    state.proPoints = Array.isArray(data.proPoints) ? data.proPoints : [];
    state.maxUsableHFov = null;
    state.maxUsableLimitLabel = null;
  }else if(data?.version === 3){
    state.sourceFov = data.quickHFov || null;
    state.sourceFovAspect = null;
    state.proPoints = [];
    state.maxUsableHFov = null;
    state.maxUsableLimitLabel = null;
  }else if(data?.version === 2){
    state.sourceFov = data.hfov || null;
    state.sourceFovAspect = null;
    state.proPoints = [];
    state.maxUsableHFov = null;
    state.maxUsableLimitLabel = null;
  }else{
    state.sourceFov = null;
    state.sourceFovAspect = null;
    state.proPoints = [];
    state.maxUsableHFov = null;
    state.maxUsableLimitLabel = null;
  }

  state.proOffsetX=0;
  state.proOffsetY=0;
  updateCalibrationStatus();
  updateWideLimitUI();
  updateSimulation();
  renderProPoints();
  renderLenses();
  updateResetCalibrationUI();
}
function writeCalibrationProfile(){
  const all=calibrationStore();
  all[orientationKey()]={
    version:7,
    quickHFov:state.sourceFov || null,
    quickAspect:state.sourceFovAspect,
    proPoints:state.proPoints,
    maxUsableHFov:state.maxUsableHFov,
    maxUsableLimitLabel:state.maxUsableLimitLabel,
    savedAt:new Date().toISOString()
  };
  localStorage.setItem('frame-calibrations',JSON.stringify(all));
}
function saveCalibration(hfov){
  state.sourceFov=hfov;
  const v=$('#calVideo') || $('#video');
  state.sourceFovAspect=(v?.videoWidth && v?.videoHeight) ? (v.videoWidth/v.videoHeight) : null;
  writeCalibrationProfile();
  updateCalibrationStatus();
  updateSimulation();
}
function saveProPoint(point){
  const tolerance=.0005;
  const ix=state.proPoints.findIndex(p=>Math.abs(p.x-point.x)<tolerance);
  if(ix>=0) state.proPoints[ix]=point;
  else state.proPoints.push(point);
  state.proPoints.sort((a,b)=>a.x-b.x);
  writeCalibrationProfile();
  updateCalibrationStatus();
  renderProPoints();
  updateSimulation();
}
function deleteProPoint(index){
  state.proPoints.splice(index,1);
  writeCalibrationProfile();
  updateCalibrationStatus();
  renderProPoints();
  updateSimulation();
}
function resetCalibration(){
  const all=calibrationStore();
  delete all[orientationKey()];
  localStorage.setItem('frame-calibrations',JSON.stringify(all));

  state.sourceFov=null;
  state.sourceFovAspect=null;
  state.proPoints=[];
  state.maxUsableHFov=null;
  state.maxUsableLimitLabel=null;
  state.proOffsetX=0;
  state.proOffsetY=0;

  updateCalibrationStatus();
  updateWideLimitUI();
  updateSimulation();
  renderProPoints();
  renderProLenses();
  renderLenses();
  updateResetCalibrationUI();
}

function updateResetCalibrationUI(){
  const label=$('#resetOrientationLabel');
  const button=$('#resetCurrentCalibrationBtn');
  if(label){
    label.textContent=`Calibration ${state.orientation==='landscape'?'PAYSAGE':'PORTRAIT'}`;
  }

  const hasProfile=Boolean(
    state.sourceFov ||
    state.proPoints.length ||
    Number.isFinite(state.maxUsableHFov)
  );

  if(button){
    button.disabled=!hasProfile;
    button.textContent=hasProfile
      ? `RESET CALIBRATION ${state.orientation==='landscape'?'PAYSAGE':'PORTRAIT'}`
      : `AUCUNE CALIBRATION ${state.orientation==='landscape'?'PAYSAGE':'PORTRAIT'}`;
  }
}

function confirmResetCurrentCalibration(){
  const orientationName=state.orientation==='landscape'?'paysage':'portrait';
  const hasProfile=Boolean(
    state.sourceFov ||
    state.proPoints.length ||
    Number.isFinite(state.maxUsableHFov)
  );
  if(!hasProfile) return;

  const ok=window.confirm(
    `Effacer complètement la calibration ${orientationName} pour cette caméra téléphone ?\n\nLa calibration de l’autre orientation sera conservée.`
  );
  if(!ok) return;

  resetCalibration();
}

function isTargetUnavailable(sensorWidth,focal){
  if(!Number.isFinite(state.maxUsableHFov)) return false;
  const hf=targetHFovFor(sensorWidth,focal);
  return hf > state.maxUsableHFov + 0.05;
}


const apertureStops=[1.0,1.2,1.4,1.8,2.0,2.8,4.0,5.6,8,11,16,22];

function activeSubjects(){
  return state.subjects.slice(0,state.subjectCount);
}
function subjectDistance(subject){
  return Math.hypot(subject.x-state.cameraPos.x,subject.y-state.cameraPos.y);
}
function groupCenter(subjects=activeSubjects()){
  if(!subjects.length) return {x:0,y:3,z:.9};
  return {
    x:subjects.reduce((a,s)=>a+s.x,0)/subjects.length,
    y:subjects.reduce((a,s)=>a+s.y,0)/subjects.length,
    z:subjects.reduce((a,s)=>a+s.height*.50,0)/subjects.length
  };
}

function groupEyeReference(subjects=activeSubjects()){
  if(!subjects.length) return {x:0,y:3,z:1.64};
  // Lock the eye line using the actual SVG preview figure proportions,
  // so the eyes stay at 1/3 from the top even in very close framing.
  return {
    x:subjects.reduce((a,s)=>a+s.x,0)/subjects.length,
    y:subjects.reduce((a,s)=>a+s.y,0)/subjects.length,
    z:subjects.reduce((a,s)=>a+s.height*previewFigureMetrics.eyeHeightRatio,0)/subjects.length
  };
}
function groundViewBasis(cameraPos=state.cameraPos){
  const g=groupCenter();
  let dx=g.x-cameraPos.x,dy=g.y-cameraPos.y;
  let len=Math.hypot(dx,dy);
  if(len<.001){dx=0;dy=1;len=1}
  return {
    forward:{x:dx/len,y:dy/len},
    right:{x:dy/len,y:-dx/len},
    center:g
  };
}
function dot3(a,b){return a.x*b.x+a.y*b.y+a.z*b.z}
function cross3(a,b){return {x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x}}
function norm3(v){
  const l=Math.hypot(v.x,v.y,v.z)||1;
  return {x:v.x/l,y:v.y/l,z:v.z/l};
}
function cameraBasis(){
  const g=groupCenter();
  const eyes=groupEyeReference();
  const pos={x:state.cameraPos.x,y:state.cameraPos.y,z:state.cameraHeight};

  // Horizontal axis always aims at the centre of the active group.
  let dx=g.x-pos.x;
  let dy=g.y-pos.y;
  let horizontalDistance=Math.hypot(dx,dy);
  if(horizontalDistance<.04){
    dx=0;
    dy=.20;
    horizontalDistance=.20;
  }
  const ux=dx/horizontalDistance;
  const uy=dy/horizontalDistance;

  // Composition rule:
  // eye line = 1/3 from the top of the image.
  // In normalized camera coordinates this corresponds to y = +1/3.
  const eyeTargetNormalized=1/3;
  const halfVFov=rad(verticalFov())/2;
  const desiredEyeAngleAboveAxis=Math.atan(eyeTargetNormalized*Math.tan(halfVFov));

  const eyeHorizontalDistance=Math.max(
    .04,
    Math.hypot(eyes.x-pos.x,eyes.y-pos.y)
  );
  const eyeElevation=Math.atan2(eyes.z-pos.z,eyeHorizontalDistance);

  // Aim the optical axis slightly below the eyes so they stay on the 1/3 line.
  const axisElevation=eyeElevation-desiredEyeAngleAboveAxis;

  const cosE=Math.cos(axisElevation);
  const forward=norm3({
    x:ux*cosE,
    y:uy*cosE,
    z:Math.sin(axisElevation)
  });
  const right=norm3(cross3(forward,{x:0,y:0,z:1}));
  const up=norm3(cross3(right,forward));

  return {pos,forward,right,up};
}
function verticalFov(){
  const h=rad(targetHFov());
  return deg(2*Math.atan(Math.tan(h/2)/state.ratio));
}
function projectWorldPoint(p,basis=cameraBasis()){
  const d={x:p.x-basis.pos.x,y:p.y-basis.pos.y,z:p.z-basis.pos.z};
  const depth=dot3(d,basis.forward);
  if(depth<=.03) return null;
  const tx=Math.tan(rad(targetHFov())/2);
  const ty=Math.tan(rad(verticalFov())/2);
  return {
    depth,
    x:dot3(d,basis.right)/(depth*tx),
    y:dot3(d,basis.up)/(depth*ty)
  };
}
function subjectProjection(subject){
  const basis=cameraBasis();
  const feet=projectWorldPoint({x:subject.x,y:subject.y,z:0},basis);
  const head=projectWorldPoint({x:subject.x,y:subject.y,z:subject.height},basis);
  const eye=projectWorldPoint({x:subject.x,y:subject.y,z:subject.height*previewFigureMetrics.eyeHeightRatio},basis);
  const center=projectWorldPoint({x:subject.x,y:subject.y,z:subject.height*.52},basis);
  if(!feet || !head || !eye || !center) return null;
  return {feet,head,eye,center};
}
function bodyScaleForSubject(subject){
  const p=subjectProjection(subject);

  // If projection becomes invalid, it means the camera is too close
  // (typically feet or head crossing the near plane in wide lenses).
  // Treat this as "too large / too close" so the binary search moves
  // the camera farther away instead of collapsing to the minimum distance.
  if(!p) return Number.POSITIVE_INFINITY;

  return Math.abs(p.feet.y-p.head.y)/2;
}
function previewFrameMetricsAt(distance){
  const d=Math.max(.01,Number(distance)||.01);
  const hfov=targetHFov();
  const frameWidth=2*d*Math.tan(rad(hfov)/2);
  const frameHeight=frameWidth/state.ratio;
  return {hfov,frameWidth,frameHeight};
}
function closestPreviewPlan(scale){
  // References are ordered from tightest to widest.
  // Category boundaries are exactly halfway between adjacent reference scales.
  const refs=[...previewTargets].sort((a,b)=>b.scale-a.scale);

  if(scale>=refs[0].scale) return {label:`PLAN ${refs[0].label}`,id:refs[0].id};

  for(let i=0;i<refs.length-1;i++){
    const tight=refs[i];
    const wide=refs[i+1];

    // User-requested transition: exactly halfway from one reference to the next.
    const boundary=(tight.scale+wide.scale)/2;
    if(scale>=boundary){
      return {label:`PLAN ${tight.label}`,id:tight.id};
    }
  }

  return {label:`PLAN ${refs[refs.length-1].label}`,id:refs[refs.length-1].id};
}

function placeCameraForTarget(target){
  // Keep a simple mental model: fixed camera, group on one depth plane.
  let lo=.35,hi=35;
  for(let i=0;i<48;i++){
    const d=(lo+hi)/2;
    state.groupDistance=d;
    rebuildGroupLayout();
    const maxScale=Math.max(...activeSubjects().map(bodyScaleForSubject));
    if(maxScale>target.scale) lo=d;
    else hi=d;
  }
  state.groupDistance=(lo+hi)/2;
  rebuildGroupLayout();
  savePreviewSettings();
  syncPreviewInputs();
  updatePreview();
}

function renderPreviewTargets(){
  const el=$('#previewTargetButtons');
  if(!el) return;
  el.innerHTML='';
  previewTargets.forEach(target=>{
    const b=document.createElement('button');
    b.type='button';
    b.className='preview-target';
    b.textContent=target.label;
    b.onclick=()=>placeCameraForTarget(target);
    el.appendChild(b);
  });
}

function moveSubjectToDistance(subject,distance){
  const dx=subject.x-state.cameraPos.x,dy=subject.y-state.cameraPos.y;
  let len=Math.hypot(dx,dy);
  let ux=0,uy=1;
  if(len>.001){ux=dx/len;uy=dy/len}
  subject.x=state.cameraPos.x+ux*distance;
  subject.y=state.cameraPos.y+uy*distance;
}
function syncPreviewInputs(){
  const s1=state.subjects[0];
  state.subjectHeight=s1.height;
  state.subjectDistance=state.groupDistance;
  const h=$('#subjectHeightInput');
  const d=$('#subjectDistanceInput');
  const slider=$('#subjectDistanceSlider');
  const readout=$('#subjectDistanceReadout');
  const spread=$('#groupSpreadSlider');
  const spreadReadout=$('#groupSpreadReadout');
  if(h) h.value=s1.height.toFixed(2);
  if(d) d.value=state.groupDistance.toFixed(2);
  if(slider){
    slider.max=Math.max(15,Math.ceil(state.groupDistance+1));
    slider.value=state.groupDistance;
  }
  if(readout) readout.textContent=state.groupDistance.toFixed(2).replace('.',',')+' m';
  if(spread) spread.value=state.groupSpread;
  if(spreadReadout) spreadReadout.textContent=state.groupSpread.toFixed(2).replace('.',',')+' m';
}

function preparePreviewSubjectClones(){
  const source=$('#previewSubject');
  if(!source) return;
  const svg=source.querySelector('svg');

  [2,3,4].forEach(i=>{
    const el=$(`#previewSubject${i}`);
    if(el && !el.querySelector('svg') && svg){
      const clone=svg.cloneNode(true);
      clone.removeAttribute('role');
      clone.setAttribute('aria-hidden','true');

      // Unique shadow filter id for cloned SVGs.
      const filter=clone.querySelector('#softShadow');
      if(filter){
        const newId=`softShadow-p${i}`;
        filter.setAttribute('id',newId);
        clone.querySelectorAll('[filter="url(#softShadow)"]').forEach(node=>{
          node.setAttribute('filter',`url(#${newId})`);
        });
      }
      el.appendChild(clone);
    }
  });

  [source,$('#previewSubject2'),$('#previewSubject3'),$('#previewSubject4')].forEach((el,i)=>{
    if(!el) return;
    let badge=el.querySelector('.preview-person-badge');
    if(!badge){
      badge=document.createElement('span');
      badge.className='preview-person-badge';
      badge.textContent=`P${i+1}`;
      el.appendChild(badge);
    }
  });
}

function rebuildGroupLayout(){
  state.cameraPos={x:0,y:0};

  const layouts={
    1:[0],
    2:[-0.5,0.5],
    3:[-1,0,1],
    4:[-1.5,-0.5,0.5,1.5]
  };
  const offsets=layouts[state.subjectCount] || layouts[1];

  activeSubjects().forEach((subject,i)=>{
    subject.x=(offsets[i] || 0)*state.groupSpread;
    subject.y=state.groupDistance;
  });

  // Keep inactive subjects ready as well.
  state.subjects.slice(state.subjectCount).forEach((subject,i)=>{
    subject.x=0;
    subject.y=state.groupDistance;
  });
}

function setSubjectCount(count){
  const previous=state.subjectCount;
  state.subjectCount=Math.max(1,Math.min(4,Math.round(count)));
  if(state.subjectCount>previous){
    for(let i=previous;i<state.subjectCount;i++){
      state.subjects[i].height=state.subjects[0].height;
    }
  }
  rebuildGroupLayout();
  renderSubjectCount();
  renderExtraSubjectControls();
  savePreviewSettings();
  updatePreview();
}
function renderSubjectCount(){
  $$('#subjectCountSwitch button').forEach(b=>{
    b.classList.toggle('active',Number(b.dataset.count)===state.subjectCount);
  });
}
function renderExtraSubjectControls(){
  const el=$('#extraSubjectControls');
  if(!el) return;
  el.innerHTML='';
  activeSubjects().slice(1).forEach((s,index)=>{
    const row=document.createElement('div');
    row.className='extra-subject-row';
    row.innerHTML=`
      <div class="extra-subject-title">
        <strong>PERSONNE ${index+2}</strong>
        <span>Même plan de profondeur que le groupe</span>
      </div>
      <label>
        <span>Taille</span>
        <div><input type="number" min="1.20" max="2.20" step="0.01" value="${s.height.toFixed(2)}" data-subject-height="${index+1}"><em>m</em></div>
      </label>
    `;
    el.appendChild(row);
  });
  el.querySelectorAll('[data-subject-height]').forEach(input=>{
    input.oninput=e=>{
      const ix=Number(e.target.dataset.subjectHeight);
      const v=parseFloat(e.target.value);
      if(Number.isFinite(v)){
        state.subjects[ix].height=Math.max(1.2,Math.min(2.2,v));
        savePreviewSettings();
        updatePreview();
      }
    };
  });
}

function cocMm(){
  // Classic 0.03 mm full-frame reference, scaled to sensor width.
  return .030*(state.sensorWidth/36);
}
function dofBounds(focusDistance=state.focusDistance,aperture=state.aperture){
  const f=state.focal; // mm
  const s=Math.max(.301,focusDistance)*1000; // mm
  const N=Math.max(.7,aperture);
  const c=Math.max(.004,cocMm());
  const H=(f*f)/(N*c)+f;
  const near=(H*s)/(H+s-f);
  const denom=H-s+f;
  const far=denom<=0?Infinity:(H*s)/denom;
  return {near:near/1000,far:far===Infinity?Infinity:far/1000,H:H/1000};
}
function dofStatus(distance,bounds=dofBounds()){
  const inside=distance>=bounds.near && (bounds.far===Infinity || distance<=bounds.far);
  if(!inside) return {key:'out',label:'HORS PDC'};
  const total=bounds.far===Infinity?Math.max(1,distance-bounds.near):(bounds.far-bounds.near);
  const margin=Math.min(distance-bounds.near,bounds.far===Infinity?Infinity:bounds.far-distance);
  const threshold=Math.max(.06,total*.08);
  if(margin<threshold) return {key:'edge',label:'LIMITE'};
  return {key:'net',label:'NET'};
}
function groupDofRecommendation(){
  const subjects=activeSubjects();
  const ds=subjects.map(subjectDistance).sort((a,b)=>a-b);
  if(!ds.length) return null;
  if(ds.length===1) return {aperture:1.4,focus:ds[0],near:ds[0],far:ds[0]};

  const minD=ds[0],maxD=ds[ds.length-1];
  for(const N of apertureStops){
    let best=null;
    const lo=Math.max(.3,minD*.88);
    const hi=Math.min(50,maxD*1.12);
    for(let i=0;i<=220;i++){
      const focus=lo+(hi-lo)*(i/220);
      const b=dofBounds(focus,N);
      const covers=ds.every(d=>d>=b.near && (b.far===Infinity || d<=b.far));
      if(!covers) continue;
      const front=minD-b.near;
      const back=b.far===Infinity?front:maxD<=b.far?b.far-maxD:-999;
      const score=Math.min(front,back);
      if(!best || score>best.score) best={aperture:N,focus,near:b.near,far:b.far,score};
    }
    if(best) return best;
  }
  return null;
}
function formatDistance(v){
  if(v===Infinity) return '∞';
  return `${v.toFixed(2).replace('.',',')} m`;
}
function renderApertureChips(){
  const el=$('#apertureChips');
  if(!el) return;
  el.innerHTML='';
  apertureStops.forEach(N=>{
    const b=document.createElement('button');
    b.type='button';
    b.className='aperture-chip'+(Math.abs(N-state.aperture)<.001?' active':'');
    b.textContent=`f/${Number.isInteger(N)?N:N.toFixed(1)}`;
    b.onclick=()=>{
      state.aperture=N;
      savePreviewSettings();
      renderApertureChips();
      updatePreview();
    };
    el.appendChild(b);
  });
}
function renderFocusQuickButtons(){
  const el=$('#focusQuickButtons');
  if(!el) return;
  el.innerHTML='';
  activeSubjects().forEach((s,i)=>{
    const b=document.createElement('button');
    b.type='button';
    b.textContent=`MAP S${i+1}`;
    b.onclick=()=>{
      state.focusDistance=subjectDistance(s);
      savePreviewSettings();syncPreviewInputs();updatePreview();
    };
    el.appendChild(b);
  });
  if(state.subjectCount>1){
    const b=document.createElement('button');
    b.type='button';
    b.textContent='MAP GROUPE';
    b.onclick=()=>{
      const rec=groupDofRecommendation();
      state.focusDistance=rec?.focus || activeSubjects().reduce((a,s)=>a+subjectDistance(s),0)/state.subjectCount;
      savePreviewSettings();syncPreviewInputs();updatePreview();
    };
    el.appendChild(b);
  }
}

function worldToSvg(x,y){
  return {x:x*100,y:1450-y*100};
}
function svgToWorld(svg,clientX,clientY){
  const pt=svg.createSVGPoint();pt.x=clientX;pt.y=clientY;
  const ctm=svg.getScreenCTM();
  if(!ctm) return null;
  const p=pt.matrixTransform(ctm.inverse());
  return {x:p.x/100,y:(1450-p.y)/100};
}
function lineAcrossPlane(distance,basis,widthAtDistance){
  const c={
    x:state.cameraPos.x+basis.forward.x*distance,
    y:state.cameraPos.y+basis.forward.y*distance
  };
  const half=widthAtDistance;
  return [
    {x:c.x-basis.right.x*half,y:c.y-basis.right.y*half},
    {x:c.x+basis.right.x*half,y:c.y+basis.right.y*half}
  ];
}
function pointsAttr(points){
  return points.map(p=>{
    const s=worldToSvg(p.x,p.y);
    return `${s.x.toFixed(1)},${s.y.toFixed(1)}`;
  }).join(' ');
}
function updateTopView(bounds){
  const svg=$('#previewTopView');
  if(!svg) return;
  const basis=groundViewBasis();

  // Camera
  const cam=worldToSvg(state.cameraPos.x,state.cameraPos.y);
  const angle=deg(Math.atan2(basis.forward.x,basis.forward.y));
  const camEl=$('#topCamera');
  camEl?.setAttribute('transform',`translate(${cam.x} ${cam.y}) rotate(${angle})`);

  // FOV cone
  const farDistance=15;
  const half=farDistance*Math.tan(rad(targetHFov())/2);
  const left={x:state.cameraPos.x+basis.forward.x*farDistance-basis.right.x*half,y:state.cameraPos.y+basis.forward.y*farDistance-basis.right.y*half};
  const right={x:state.cameraPos.x+basis.forward.x*farDistance+basis.right.x*half,y:state.cameraPos.y+basis.forward.y*farDistance+basis.right.y*half};
  $('#topFovCone')?.setAttribute('points',pointsAttr([state.cameraPos,left,right]));

  // Subjects layer
  const layer=$('#topSubjectsLayer');
  if(layer){
    layer.innerHTML='';
    activeSubjects().forEach((s,i)=>{
      const p=worldToSvg(s.x,s.y);
      const status=dofStatus(subjectDistance(s),bounds);
      const g=document.createElementNS('http://www.w3.org/2000/svg','g');
      g.setAttribute('class',`top-subject drag-node dof-${status.key}`);
      g.setAttribute('data-drag-kind','subject');
      g.setAttribute('data-index',String(i));
      g.setAttribute('transform',`translate(${p.x} ${p.y})`);
      g.innerHTML=`<circle r="34"></circle><circle r="9" class="top-subject-center"></circle><text x="0" y="61" text-anchor="middle">S${i+1}</text>`;
      layer.appendChild(g);
    });
  }

  // DOF polygon in the cone.
  const near=Math.max(.05,bounds.near);
  const far=bounds.far===Infinity?15:Math.min(15,bounds.far);
  const nearHalf=near*Math.tan(rad(targetHFov())/2);
  const farHalf=far*Math.tan(rad(targetHFov())/2);
  const nearLine=lineAcrossPlane(near,basis,nearHalf);
  const farLine=lineAcrossPlane(far,basis,farHalf);
  $('#topDofZone')?.setAttribute('points',pointsAttr([nearLine[0],nearLine[1],farLine[1],farLine[0]]));

  const n1=worldToSvg(nearLine[0].x,nearLine[0].y),n2=worldToSvg(nearLine[1].x,nearLine[1].y);
  const f1=worldToSvg(farLine[0].x,farLine[0].y),f2=worldToSvg(farLine[1].x,farLine[1].y);
  const nl=$('#topNearLine'),fl=$('#topFarLine');
  if(nl){nl.setAttribute('x1',n1.x);nl.setAttribute('y1',n1.y);nl.setAttribute('x2',n2.x);nl.setAttribute('y2',n2.y)}
  if(fl){fl.setAttribute('x1',f1.x);fl.setAttribute('y1',f1.y);fl.setAttribute('x2',f2.x);fl.setAttribute('y2',f2.y)}

  const focus=Math.max(.05,state.focusDistance);
  const focusHalf=focus*Math.tan(rad(targetHFov())/2);
  const focusLine=lineAcrossPlane(focus,basis,focusHalf);
  const fp1=worldToSvg(focusLine[0].x,focusLine[0].y),fp2=worldToSvg(focusLine[1].x,focusLine[1].y);
  const fpl=$('#topFocusLine');
  if(fpl){fpl.setAttribute('x1',fp1.x);fpl.setAttribute('y1',fp1.y);fpl.setAttribute('x2',fp2.x);fpl.setAttribute('y2',fp2.y)}

  const info=$('#topViewGroupInfo');
  if(info){
    const ds=activeSubjects().map(subjectDistance);
    let text=`${state.subjectCount} sujet${state.subjectCount>1?'s':''}`;
    if(ds.length>1){
      const sep=Math.hypot(activeSubjects()[0].x-activeSubjects()[1].x,activeSubjects()[0].y-activeSubjects()[1].y);
      text+=` · S1↔S2 ${sep.toFixed(2).replace('.',',')} m`;
    }
    info.textContent=text;
  }
}
function setupTopViewDrag(){
  const svg=$('#previewTopView');
  if(!svg) return;

  svg.addEventListener('pointerdown',e=>{
    const node=e.target.closest?.('.drag-node');
    if(!node) return;
    e.preventDefault();
    svg.setPointerCapture?.(e.pointerId);
    state.topDrag={
      kind:node.dataset.dragKind,
      index:Number(node.dataset.index||0),
      pointerId:e.pointerId
    };
  });
  svg.addEventListener('pointermove',e=>{
    if(!state.topDrag || state.topDrag.pointerId!==e.pointerId) return;
    e.preventDefault();
    const p=svgToWorld(svg,e.clientX,e.clientY);
    if(!p) return;
    p.x=Math.max(-5.5,Math.min(5.5,p.x));
    p.y=Math.max(-.5,Math.min(14.5,p.y));
    if(state.topDrag.kind==='camera'){
      state.cameraPos={x:p.x,y:p.y};
    }else{
      const s=state.subjects[state.topDrag.index];
      if(s){s.x=p.x;s.y=p.y}
    }
    savePreviewSettings();
    syncPreviewInputs();
    renderExtraSubjectControls();
    updatePreview();
  });
  const end=e=>{
    if(state.topDrag && (!e.pointerId || state.topDrag.pointerId===e.pointerId)){
      state.topDrag=null;
      savePreviewSettings();
    }
  };
  svg.addEventListener('pointerup',end);
  svg.addEventListener('pointercancel',end);
}

function ensureLightGroupLayout(){ rebuildGroupLayout(); }

function setFrameMode(mode,persist=true){
  state.mode=mode==='preview'?'preview':'real';
  const preview=state.mode==='preview';
  $('#realModeBtn')?.classList.toggle('active',!preview);
  $('#previewModeBtn')?.classList.toggle('active',preview);
  $('#previewScene')?.classList.toggle('hidden',!preview);
  $('#previewControls')?.classList.toggle('hidden',!preview);
  $('#video')?.classList.toggle('mode-hidden',preview);
  $('#cameraPlaceholder')?.classList.toggle('mode-hidden',preview);
  $('#cameraBtn')?.classList.toggle('hidden',preview);
  $('#calBtn')?.classList.toggle('hidden',preview);

  const kicker=$('#viewPanelKicker');
  const label=$('#viewModeLabel');
  if(kicker) kicker.textContent=preview?'PREVIEW':'VISEUR';
  if(label) label.textContent=preview?'SIMULATION · BOS':'VUE RÉELLE · BOS';

  ensureLightGroupLayout();
  if(persist) savePreviewSettings();
  requestAnimationFrame(()=>{
    updateFrame();
    if(preview) updatePreview();
    else updateSimulation();
  });
}

function updateDofUI(){ return; }

function previewEyeComposition(frameRect,stageRect,projections){
  const valid=projections.filter(Boolean);
  if(!valid.length){
    return {offsetY:0,desiredEyeY:null};
  }

  // Absolute composition rule:
  // 1/3 of the image is above the eye line, 2/3 below.
  const desiredEyeY=(frameRect.top-stageRect.top)+(frameRect.height/3);

  const currentEyes=valid.map(p=>
    (frameRect.top-stageRect.top)+(frameRect.height/2)-(p.eye.y*frameRect.height/2)
  );
  const currentAverage=currentEyes.reduce((a,v)=>a+v,0)/currentEyes.length;

  return {
    offsetY:desiredEyeY-currentAverage,
    desiredEyeY
  };
}

function updatePreview(){
  if(state.mode!=='preview') return;

  const frame=$('#mainFrame');
  const stage=$('#cameraStage');
  if(!frame || !stage) return;
  const stageRect=stage.getBoundingClientRect();
  const frameRect=frame.getBoundingClientRect();
  if(!frameRect.width || !frameRect.height) return;

  preparePreviewSubjectClones();
  const projections=activeSubjects().map(subjectProjection);
  const eyeComposition=previewEyeComposition(frameRect,stageRect,projections);
  const scales=[];

  // Position the visible 1/3 guide against the ACTUAL blue cinema frame.
  const eyeGuide=$('#previewEyeGuide');
  if(eyeGuide && eyeComposition.desiredEyeY!==null){
    eyeGuide.style.top=`${eyeComposition.desiredEyeY}px`;
    eyeGuide.style.left=`${frameRect.left-stageRect.left}px`;
    eyeGuide.style.right='auto';
    eyeGuide.style.width=`${frameRect.width}px`;
  }

  state.subjects.forEach((subject,i)=>{
    const el=i===0?$('#previewSubject'):$(`#previewSubject${i+1}`);
    if(!el) return;
    const active=i<state.subjectCount;
    el.classList.toggle('hidden',!active);
    if(!active) return;

    const p=projections[i];
    if(!p){
      el.classList.add('behind-camera');
      return;
    }
    el.classList.remove('behind-camera');

    const xPx=frameRect.left-stageRect.left + frameRect.width/2 + p.center.x*frameRect.width/2;

    // Optical projection + a single composition correction for the whole group.
    // This guarantees that the average eye line stays exactly at 1/3.
    const headYPx=frameRect.top-stageRect.top + frameRect.height/2 - p.head.y*frameRect.height/2 + eyeComposition.offsetY;
    const eyeYPx=frameRect.top-stageRect.top + frameRect.height/2 - p.eye.y*frameRect.height/2 + eyeComposition.offsetY;
    const feetYPx=frameRect.top-stageRect.top + frameRect.height/2 - p.feet.y*frameRect.height/2 + eyeComposition.offsetY;

    // Keep eyes as the absolute anchor, especially in very close framings.
    // We derive the image height from the projected eye-to-feet span so the
    // mannequin's REAL eye pixels stay exactly on the projected eye line.
    const eyeToFeetPx=Math.abs(feetYPx-eyeYPx);
    const mannequinHeightPx = eyeToFeetPx / (previewFigureMetrics.footRatio - previewFigureMetrics.eyeRatio);

    // Secondary metric still used for plan naming/rough scale.
    const bodyPx=Math.abs(feetYPx-headYPx);

    const wPx = mannequinHeightPx * (previewFigureMetrics.viewWidth/previewFigureMetrics.viewHeight);
    const top = eyeYPx - previewFigureMetrics.eyeRatio * mannequinHeightPx;

    el.style.left=xPx+'px';
    el.style.top=top+'px';
    el.style.width=Math.max(8,wPx)+'px';
    el.style.height=Math.max(30,mannequinHeightPx)+'px';

    scales.push(bodyPx/frameRect.height);
  });

  const measure=$('#previewMeasure');
  if(measure) measure.classList.toggle('hidden',state.subjectCount!==1);
  if(state.subjectCount===1 && measure){
    const s=state.subjects[0];
    const p=projections[0];
    const el=$('#previewSubject');
    if(p && el){
      const r=el.getBoundingClientRect();
      measure.style.left=(r.right-stageRect.left+8)+'px';
      measure.style.top=(r.top-stageRect.top)+'px';
      measure.style.height=r.height+'px';
      $('#previewMeasureText').textContent=s.height.toFixed(2).replace('.',',')+' m';
    }
  }

  const maxScale=scales.length?Math.max(...scales):0;
  const plan=closestPreviewPlan(maxScale);
  const groupD=activeSubjects().reduce((a,s)=>a+subjectDistance(s),0)/state.subjectCount;
  const metrics=previewFrameMetricsAt(groupD);

  const overlayPlan=$('#previewPlanOverlay');
  const overlayMetrics=$('#previewMetricsOverlay');
  if(overlayPlan) overlayPlan.textContent=state.subjectCount>1?`${state.subjectCount} PERSONNES · ${plan.label}`:plan.label;
  if(overlayMetrics){
    overlayMetrics.textContent=`${state.preset.name.replace('Sony ','')} · ${state.focal} mm · centre groupe ${groupD.toFixed(2).replace('.',',')} m`;
  }

  const resultPlan=$('#previewPlanResult');
  const resultSize=$('#previewFrameSizeResult');
  if(resultPlan) resultPlan.textContent=plan.label.replace('PLAN ','');
  if(resultSize) resultSize.textContent=`${metrics.frameWidth.toFixed(2).replace('.',',')} × ${metrics.frameHeight.toFixed(2).replace('.',',')} m`;

  syncPreviewInputs();
  renderSubjectCount();
  renderExtraSubjectControls();

  activeSubjects().forEach((subject,i)=>{
    const el=i===0?$('#previewSubject'):$(`#previewSubject${i+1}`);
    if(el){
      el.classList.remove('dof-net','dof-edge','dof-out');
      const badge=el.querySelector('.preview-person-badge');
      if(badge) badge.textContent=`P${i+1}`;
    }
  });

  $$('.preview-target').forEach((b,i)=>{
    b.classList.toggle('active',previewTargets[i]?.id===plan.id);
  });
}
function renderLenses(){
  const el=$('#lensStrip'); el.innerHTML='';
  lenses.forEach(mm=>{
    const unavailable=isTargetUnavailable(state.sensorWidth,mm);
    const b=document.createElement('button');
    b.className='lens-pill'+(mm===state.focal?' active':'')+(unavailable?' unavailable':'');
    b.textContent=mm;
    if(unavailable){
      b.disabled=true;
      b.title='Champ trop large pour la caméra téléphone calibrée';
    }else{
      b.onclick=()=>{state.focal=mm; renderLenses(); updateAll(); centerActiveLens();};
    }
    el.appendChild(b);
  });
  setTimeout(centerActiveLens,0);
}
function centerElementInsideStrip(strip,el,smooth=true){
  if(!strip || !el) return;
  const target=el.offsetLeft - (strip.clientWidth-el.offsetWidth)/2;
  strip.scrollTo({
    left:Math.max(0,target),
    behavior:smooth?'smooth':'auto'
  });
}
function centerActiveLens(){
  const strip=$('#lensStrip');
  const a=$('#lensStrip .lens-pill.active');
  centerElementInsideStrip(strip,a,true);
}
const LAST_FRAME_CAMERA_BY_BRAND_KEY="bos-frame-last-camera-by-brand-v1";
let cameraPickerBrand=null;

function cameraBrand(p){
  return String(p?.brand||p?.group||'Autre').trim()||'Autre';
}
function cameraShortLabel(p){
  const name=String(p?.name||p?.id||'Caméra').trim();
  const brand=cameraBrand(p);
  return brand && name.toLowerCase().startsWith((brand+' ').toLowerCase())
    ? name.slice(brand.length+1)
    : name;
}
function cameraBrands(){
  const seen=new Set();
  const brands=[];
  presets.forEach(p=>{
    const brand=cameraBrand(p);
    if(!seen.has(brand)){
      seen.add(brand);
      brands.push(brand);
    }
  });
  return brands;
}
function camerasForBrand(brand){
  return presets.filter(p=>cameraBrand(p)===brand);
}
function getLastFrameCameraForBrand(brand){
  try{
    const saved=JSON.parse(localStorage.getItem(LAST_FRAME_CAMERA_BY_BRAND_KEY)||'{}');
    const id=saved?.[brand];
    return camerasForBrand(brand).some(p=>p.id===id)?id:null;
  }catch(_){
    return null;
  }
}
function rememberFrameCameraForBrand(preset){
  if(!preset || preset.id==='custom') return;
  try{
    const saved=JSON.parse(localStorage.getItem(LAST_FRAME_CAMERA_BY_BRAND_KEY)||'{}');
    saved[cameraBrand(preset)]=preset.id;
    localStorage.setItem(LAST_FRAME_CAMERA_BY_BRAND_KEY,JSON.stringify(saved));
  }catch(_){}
}
function applyCinemaPreset(preset){
  if(!preset) return;

  state.preset=preset;
  state.sensorWidth=preset.width;
  cameraPickerBrand=cameraBrand(preset);
  rememberFrameCameraForBrand(preset);
  saveMainCameraSetting();


  if(isTargetUnavailable(state.sensorWidth,state.focal)){
    const first=lenses.find(mm=>!isTargetUnavailable(state.sensorWidth,mm));
    if(first) state.focal=first;
  }

  renderPresets();
  renderLenses();
  updateAll();

}
function renderPresets(){
  const brandsHost=$('#presetBrandMode');
  const select=$('#presetCameraSelect');
  const sensorInfo=$('#presetSensorInfo');
  if(!brandsHost || !select) return;

  const brands=cameraBrands();
  if(!brands.length) return;

  let activeBrand=null;
  if(state.preset?.id!=='custom'){
    activeBrand=cameraBrand(state.preset);
  }
  if(!brands.includes(activeBrand)){
    activeBrand=brands.includes(cameraPickerBrand)?cameraPickerBrand:brands[0];
  }
  cameraPickerBrand=activeBrand;

  brandsHost.innerHTML='';
  brands.forEach(brand=>{
    const b=document.createElement('button');
    b.type='button';
    b.dataset.brand=brand;
    b.textContent=brand;
    b.classList.toggle('active',brand===activeBrand);
    brandsHost.appendChild(b);
  });

  const brandCameras=camerasForBrand(activeBrand);
  select.innerHTML='';

  let selectedId=null;
  if(state.preset?.id!=='custom' && cameraBrand(state.preset)===activeBrand){
    selectedId=state.preset.id;
  }else{
    selectedId=getLastFrameCameraForBrand(activeBrand) || brandCameras[0]?.id || null;
  }

  brandCameras.forEach(p=>{
    const option=document.createElement('option');
    option.value=p.id;
    option.textContent=cameraShortLabel(p);
    select.appendChild(option);
  });

  if(selectedId) select.value=selectedId;

  const shownPreset=presets.find(p=>p.id===select.value);
  if(sensorInfo){
    sensorInfo.textContent=shownPreset
      ? `${shownPreset.width.toFixed(2).replace('.',',')} mm`
      : '—';
  }
}

function renderRatios(){
  const el=$('#ratioList'); el.innerHTML='';
  ratios.forEach(r=>{
    const b=document.createElement('button'); b.type='button';
    b.className='ratio-choice'+(Math.abs(state.ratio-r.value)<.001?' active':'');
    b.textContent=r.label;
    b.onclick=()=>{state.ratio=r.value; renderRatios(); updateAll(); $('#ratioDialog').close();};
    el.appendChild(b);
  });
}
function ratioLabel(v){ return ratios.find(r=>Math.abs(r.value-v)<.001)?.label || v.toFixed(2)+':1'; }
function renderGuideChoices(){
  const el=$('#guideChoices'); el.innerHTML='';
  ratios.filter(r=>r.value!==state.ratio).forEach(r=>{
    const b=document.createElement('button'); b.type='button';
    b.className='guide-chip'+(state.guides.has(r.label)?' active':'');
    b.textContent=r.label;
    b.onclick=()=>{
      state.guides.has(r.label)?state.guides.delete(r.label):state.guides.add(r.label);
      renderGuideChoices(); renderGuides();
    };
    el.appendChild(b);
  });
}
function frameDimensions(ratio, maxW, maxH){
  let w=maxW, h=w/ratio;
  if(h>maxH){h=maxH; w=h*ratio}
  return {w,h};
}
function updateFrame(){
  const vf=$('#cameraStage') || $('.viewfinder');
  const maxW=vf.clientWidth*.92;
  const maxH=vf.clientHeight*.82;
  const {w,h}=frameDimensions(state.ratio,maxW,maxH);
  const f=$('#mainFrame'); f.style.width=w+'px'; f.style.height=h+'px';
  renderGuides();
}
function renderGuides(){
  const layer=$('#guideLayer'); layer.innerHTML='';
  const main=$('#mainFrame');
  const W=main.clientWidth,H=main.clientHeight;
  state.guides.forEach(label=>{
    const r=ratios.find(x=>x.label===label); if(!r)return;
    const {w,h}=frameDimensions(r.value,W,H);
    const d=document.createElement('div'); d.className='guide-frame';
    d.style.width=w+'px'; d.style.height=h+'px';
    d.innerHTML=`<span>${label}</span>`; layer.appendChild(d);
  });
}
function updateReadout(){
  const hf=targetHFov();
  $('#cameraReadout').textContent=state.preset.name.replace('ARRI ','').replace('Sony ','').replace('RED ','');
  if($('#cameraPresetText')) $('#cameraPresetText').textContent=state.preset.name;
  $('#focalReadout').textContent=state.focal+' mm';
  $('#ratioReadout').textContent=ratioLabel(state.ratio).replace(':1','');
  $('#ratioText').textContent=ratioLabel(state.ratio);
  $('#hfovReadout').textContent=hf.toFixed(1)+'°';
}
function containedVideoMetrics(video){
  const sw=video.videoWidth, sh=video.videoHeight;
  const cw=video.clientWidth || 1, ch=video.clientHeight || 1;
  if(!sw || !sh) return {imageW:cw,imageH:ch,left:0,top:0};

  const sourceAspect=sw/sh;
  const boxAspect=cw/ch;
  let imageW,imageH,left,top;

  if(sourceAspect > boxAspect){
    imageW=cw;
    imageH=cw/sourceAspect;
    left=0;
    top=(ch-imageH)/2;
  }else{
    imageH=ch;
    imageW=ch*sourceAspect;
    top=0;
    left=(cw-imageW)/2;
  }
  return {imageW,imageH,left,top};
}

function effectiveDisplayedHFov(){
  return state.sourceFov;
}

function interpolateProCalibration(targetX){
  if(!state.proPoints.length) return null;
  const pts=[...state.proPoints].sort((a,b)=>a.x-b.x);
  const value=p=>({
    j:p.j,
    ox:Number.isFinite(p.ox)?p.ox:0,
    oy:Number.isFinite(p.oy)?p.oy:0
  });

  if(pts.length===1) return {...value(pts[0]),outside:true};

  if(targetX<=pts[0].x) return {...value(pts[0]),outside:true};
  if(targetX>=pts[pts.length-1].x) return {...value(pts[pts.length-1]),outside:true};

  for(let i=0;i<pts.length-1;i++){
    const a=pts[i], b=pts[i+1];
    if(targetX>=a.x && targetX<=b.x){
      const t=(targetX-a.x)/(b.x-a.x);
      return {
        j:a.j+(b.j-a.j)*t,
        ox:(Number.isFinite(a.ox)?a.ox:0)+((Number.isFinite(b.ox)?b.ox:0)-(Number.isFinite(a.ox)?a.ox:0))*t,
        oy:(Number.isFinite(a.oy)?a.oy:0)+((Number.isFinite(b.oy)?b.oy:0)-(Number.isFinite(a.oy)?a.oy:0))*t,
        outside:false
      };
    }
  }
  return {...value(pts[0]),outside:true};
}

function frameSafeMinScale(video,frame,ox=0,oy=0){
  const m=containedVideoMetrics(video);
  const fw=frame.clientWidth || 1;
  const fh=frame.clientHeight || 1;

  // Offset is normalized to frame dimensions.
  // Add the displacement to the required half-extent so the frame remains
  // completely covered by real camera pixels.
  const reqW=fw*(1+2*Math.abs(ox));
  const reqH=fh*(1+2*Math.abs(oy));
  return Math.max(reqW/(m.imageW||1),reqH/(m.imageH||1),0.05);
}

function setVideoTransform(video,frame,scale,ox=0,oy=0){
  const dx=ox*(frame.clientWidth||1);
  const dy=oy*(frame.clientHeight||1);
  video.style.transform=`translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) scale(${scale.toFixed(5)})`;
}

function updateSimulation(){
  const video=$('#video'), frame=$('#mainFrame'), warning=$('#simWarning');
  warning.classList.add('hidden'); warning.textContent='';

  const target=targetHFov();
  const targetX=Math.tan(rad(target)/2);

  if(Number.isFinite(state.maxUsableHFov) && target>state.maxUsableHFov+.05){
    setVideoTransform(video,frame,1,0,0);
    warning.textContent=`FOCALE NON DISPONIBLE · LIMITE ${state.maxUsableLimitLabel || state.maxUsableHFov.toFixed(1)+'°'}`;
    warning.classList.remove('hidden');
    return;
  }
  const metrics=containedVideoMetrics(video);
  const frameFraction=(frame.clientWidth||1)/(metrics.imageW||1);

  // CAL PRO is now a continuous curve of scale + optical centering.
  if(state.proPoints.length){
    const result=interpolateProCalibration(targetX);
    let scale=frameFraction*result.j/targetX;
    const safeMin=frameSafeMinScale(video,frame,result.ox,result.oy);

    if(scale<safeMin){
      scale=safeMin;
      warning.textContent='LIMITE GRAND-ANGLE DU TÉLÉPHONE · ESSAIE LA CAMÉRA ULTRA-GRAND-ANGLE';
      warning.classList.remove('hidden');
    }
    scale=Math.min(12,scale);
    setVideoTransform(video,frame,scale,result.ox,result.oy);

    if(result.outside && state.proPoints.length>=2 && warning.classList.contains('hidden')){
      const focals=state.proPoints.map(p=>p.focal).filter(Number.isFinite);
      if(focals.length){
        warning.textContent=`CAL PRO · HORS PLAGE ÉTALONNÉE ${Math.min(...focals)}–${Math.max(...focals)} mm`;
        warning.classList.remove('hidden');
      }
    }
    return;
  }

  // CAL RAPIDE fallback.
  if(!state.sourceFov){
    setVideoTransform(video,frame,1,0,0);
    if(state.stream){
      warning.textContent='CALIBRATION REQUISE';
      warning.classList.remove('hidden');
    }
    return;
  }

  const currentSourceFov=effectiveDisplayedHFov() || state.sourceFov;
  const sourceTan=Math.tan(rad(currentSourceFov)/2);
  let scale=frameFraction*sourceTan/targetX;
  const safeMin=frameSafeMinScale(video,frame,0,0);

  if(scale<safeMin){
    scale=safeMin;
    warning.textContent='LIMITE GRAND-ANGLE DU TÉLÉPHONE · ESSAIE LA CAMÉRA ULTRA-GRAND-ANGLE';
    warning.classList.remove('hidden');
  }
  setVideoTransform(video,frame,Math.min(12,scale),0,0);
}

function updateAll(){
  updateReadout();
  updateFrame();
  if(state.mode==='preview'){ ensureLightGroupLayout(); updatePreview(); }
  else updateSimulation();
  renderGuideChoices();
}

async function startCamera(deviceId){
  try{
    if(state.stream) state.stream.getTracks().forEach(t=>t.stop());
    const constraints={audio:false,video:deviceId?{deviceId:{exact:deviceId},width:{ideal:1920},height:{ideal:1080}}:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}};
    const stream=await navigator.mediaDevices.getUserMedia(constraints);
    state.stream=stream;
    const track=stream.getVideoTracks()[0];
    const settings=track.getSettings();
    state.deviceId=settings.deviceId || deviceId || null;
    $('#video').srcObject=stream;
    $('#calVideo').srcObject=stream;
    $('#proVideo').srcObject=stream;
    $('#video').onloadedmetadata=()=>{updateFrame();updateSimulation()};
    $('#calVideo').onloadedmetadata=()=>{updateCalLines()};
    $('#proVideo').onloadedmetadata=()=>{updateProFrame();prepareProScale()};
    $('#cameraPlaceholder').classList.add('hidden');

    const devices=await navigator.mediaDevices.enumerateDevices();
    state.devices=devices.filter(d=>d.kind==='videoinput');
    renderDeviceSelect();
    loadCalibration();
    updateAll();
  }catch(err){
    console.error(err);
    $('#cameraPlaceholder').classList.remove('hidden');
    $('#cameraPlaceholder span').textContent='Autorise la caméra dans les réglages du navigateur';
  }
}
function renderDeviceSelect(){
  const sel=$('#deviceSelect'); sel.innerHTML='';
  state.devices.forEach((d,i)=>{
    const o=document.createElement('option'); o.value=d.deviceId;
    o.textContent=d.label || `Caméra ${i+1}`;
    o.selected=d.deviceId===state.deviceId; sel.appendChild(o);
  });
}
function updateCalibrationStatus(){
  const s=$('#calStatus'),d=$('#calDetails');
  const cs=$('#chooserCalStatus'), cd=$('#chooserCalDetails');
  const n=state.proPoints.length;

  if(n>=2){
    s.textContent=`CAL PRO ✓ · ${n} pts`;
    d.textContent=`Courbe réelle active · ${state.orientation}`;
    if(cs) cs.textContent=`CAL PRO · ${n} points`;
    if(cd) cd.textContent=`Profil ${state.orientation} · FRAME interpole entre tes références.`;
  }else if(n===1){
    s.textContent='CAL PRO · 1 pt';
    d.textContent='Ajoute au moins un second point pour interpoler.';
    if(cs) cs.textContent='CAL PRO · 1 point';
    if(cd) cd.textContent='Ajoute 35 / 50 / 85 mm pour fiabiliser la courbe.';
  }else if(state.sourceFov){
    s.textContent='CAL RAPIDE ✓';
    d.textContent=`Calibration rapide active · ${state.orientation}`;
    if(cs) cs.textContent='CAL RAPIDE';
    if(cd) cd.textContent='Calibration physique active. CAL PRO donnera plus de précision.';
  }else{
    s.textContent='Non calibrée';
    d.textContent=`Calibration nécessaire en ${state.orientation}.`;
    if(cs) cs.textContent='Non calibré';
    if(cd) cd.textContent='Aucun point enregistré.';
  }
}

function calibrationContentRect(){
  const preview=$('#calPreview'), video=$('#calVideo');
  const r=preview.getBoundingClientRect();
  const sw=video.videoWidth, sh=video.videoHeight;
  if(!sw || !sh) return {left:0, top:0, width:r.width, height:r.height};

  const sourceAspect=sw/sh;
  const boxAspect=r.width/r.height;
  let width,height,left,top;
  if(sourceAspect > boxAspect){
    width=r.width; height=width/sourceAspect;
    left=0; top=(r.height-height)/2;
  }else{
    height=r.height; width=height*sourceAspect;
    top=0; left=(r.width-width)/2;
  }
  return {left,top,width,height};
}

function setupCalibrationDrag(){
  const preview=$('#calPreview');
  const attach=(el,key)=>{
    const move=(clientX)=>{
      const r=preview.getBoundingClientRect();
      const c=calibrationContentRect();
      let x=(clientX-r.left-c.left)/c.width;
      x=Math.max(0.02,Math.min(.98,x));
      if(key==='calLeft') x=Math.min(x,state.calRight-.03);
      else x=Math.max(x,state.calLeft+.03);
      state[key]=x; updateCalLines();
    };
    el.addEventListener('pointerdown',e=>{el.setPointerCapture(e.pointerId); move(e.clientX)});
    el.addEventListener('pointermove',e=>{if(el.hasPointerCapture(e.pointerId))move(e.clientX)});
  };
  attach($('#calLeft'),'calLeft'); attach($('#calRight'),'calRight');
}
function updateCalLines(){
  const preview=$('#calPreview');
  const r=preview.getBoundingClientRect();
  const c=calibrationContentRect();
  const leftPx=c.left + state.calLeft*c.width;
  const rightPx=c.left + state.calRight*c.width;
  $('#calLeft').style.left=leftPx+'px';
  $('#calRight').style.left=rightPx+'px';
  $('#calLeft').style.top=c.top+'px';
  $('#calLeft').style.height=c.height+'px';
  $('#calLeft').style.bottom='auto';
  $('#calRight').style.top=c.top+'px';
  $('#calRight').style.height=c.height+'px';
  $('#calRight').style.bottom='auto';
  calculateCalibration();
}
function calculateCalibration(){
  const widthM=(parseFloat($('#objectWidth').value)||0)/100;
  const dist=parseFloat($('#objectDistance').value)||0;
  const p=state.calRight-state.calLeft;
  if(widthM<=0||dist<=0||p<=0){$('#calFov').textContent='—'; return null}
  const objectAngle=2*Math.atan(widthM/(2*dist));
  const hfov=2*Math.atan(Math.tan(objectAngle/2)/p);
  const val=deg(hfov);
  $('#calFov').textContent=(val>5&&val<170)?val.toFixed(2)+'°':'—';
  return (val>5&&val<170)?val:null;
}


function targetHFovFor(width,focal){
  return deg(2*Math.atan(width/(2*focal)));
}
function renderProPresetSelect(){
  const sel=$('#proPresetSelect');
  if(!sel) return;
  sel.innerHTML='';

  const groups=[];
  presets.forEach(p=>{
    if(!groups.includes(p.group)) groups.push(p.group);
  });

  groups.forEach(groupName=>{
    const g=document.createElement('optgroup');
    g.label=groupName;
    presets.filter(p=>p.group===groupName).forEach(p=>{
      const o=document.createElement('option');
      o.value=p.id;
      o.textContent=p.name;
      o.selected=p.id===state.proRefPreset.id;
      g.appendChild(o);
    });
    sel.appendChild(g);
  });
}
function renderProLenses(){
  const el=$('#proLensStrip');
  if(!el) return;
  el.innerHTML='';
  lenses.forEach(mm=>{
    const b=document.createElement('button');
    b.type='button';
    b.className='pro-lens'+(mm===state.proRefFocal?' active':'');
    const saved=state.proPoints.some(p=>p.presetId===state.proRefPreset.id && p.focal===mm);
    b.innerHTML=`${mm}${saved?'<i>✓</i>':''}`;
    b.onclick=()=>{
      state.proRefFocal=mm;
      if(window.scrollX) window.scrollTo(0,window.scrollY);
      renderProLenses();
      prepareProScale();
      updateProHUD();
    };
    el.appendChild(b);
  });
  setTimeout(()=>{
    const strip=$('#proLensStrip');
    const a=$('#proLensStrip .pro-lens.active');
    centerElementInsideStrip(strip,a,true);
  },0);
}
function proReferenceHFov(){
  return targetHFovFor(state.proRefPreset.width,state.proRefFocal);
}
function updateProHUD(){
  const hf=proReferenceHFov();
  $('#proTopReference').textContent=`${state.proRefPreset.name} · ${state.proRefFocal} mm · ${state.orientation.toUpperCase()}`;
  if($('#proCompactRef')) $('#proCompactRef').textContent=`${state.proRefPreset.name} · ${state.proRefFocal} mm · ${state.orientation.toUpperCase()}`;
  $('#proTargetFov').textContent=hf.toFixed(1)+'°';
  $('#proFrameLabel').textContent=ratioLabel(state.ratio);
  $('#proScaleReadout').textContent=state.proScale.toFixed(3)+'×';
  if($('#proOffsetXReadout')) $('#proOffsetXReadout').textContent=(state.proOffsetX*100).toFixed(1)+'%';
  if($('#proOffsetYReadout')) $('#proOffsetYReadout').textContent=(state.proOffsetY*100).toFixed(1)+'%';
}
function updateProFrame(){
  const stage=$('#proStage'), f=$('#proFrame');
  if(!stage||!f) return;
  const maxW=stage.clientWidth*.90;
  const maxH=stage.clientHeight*.62;
  const dims=frameDimensions(state.ratio,maxW,maxH);
  f.style.width=dims.w+'px';
  f.style.height=dims.h+'px';
  updateProHUD();
}
function applyProScale(){
  const v=$('#proVideo'), frame=$('#proFrame');
  state.proScale=Math.max(.35,Math.min(8,Number(state.proScale)||1));
  state.proOffsetX=Math.max(-.35,Math.min(.35,Number(state.proOffsetX)||0));
  state.proOffsetY=Math.max(-.35,Math.min(.35,Number(state.proOffsetY)||0));

  const safeMin=frameSafeMinScale(v,frame,state.proOffsetX,state.proOffsetY);
  const warn=$('#proWideWarning');
  if(state.proScale<=safeMin+.004){
    warn.classList.remove('hidden');
  }else{
    warn.classList.add('hidden');
  }

  $('#proScaleSlider').min=Math.max(.35,Math.min(2,safeMin)).toFixed(3);
  if(state.proScale<safeMin) state.proScale=safeMin;

  $('#proScaleSlider').value=state.proScale;
  $('#proOffsetXSlider').value=state.proOffsetX;
  $('#proOffsetYSlider').value=state.proOffsetY;
  $('#proScaleReadout').textContent=state.proScale.toFixed(3)+'×';
  $('#proOffsetXReadout').textContent=(state.proOffsetX*100).toFixed(1)+'%';
  $('#proOffsetYReadout').textContent=(state.proOffsetY*100).toFixed(1)+'%';

  setVideoTransform(v,frame,state.proScale,state.proOffsetX,state.proOffsetY);
}
function findExistingProPoint(){
  return state.proPoints.find(p=>
    p.presetId===state.proRefPreset.id &&
    p.focal===state.proRefFocal
  );
}
function scaleFromProPoint(point){
  const video=$('#proVideo'), frame=$('#proFrame');
  const targetX=Math.tan(rad(proReferenceHFov())/2);
  const metrics=containedVideoMetrics(video);
  const frameFraction=(frame.clientWidth||1)/(metrics.imageW||1);
  return frameFraction*point.j/targetX;
}
function quickEstimateForPro(){
  const video=$('#proVideo'), frame=$('#proFrame');
  const metrics=containedVideoMetrics(video);
  const frameFraction=(frame.clientWidth||1)/(metrics.imageW||1);
  if(!state.sourceFov) return Math.max(frameSafeMinScale(video,frame,0,0),1);
  const targetX=Math.tan(rad(proReferenceHFov())/2);
  const currentSourceFov=effectiveDisplayedHFov() || state.sourceFov;
  const sourceTan=Math.tan(rad(currentSourceFov)/2);
  return Math.max(frameSafeMinScale(video,frame,0,0),frameFraction*sourceTan/targetX);
}
function prepareProScale(){
  updateProFrame();
  const existing=findExistingProPoint();

  if(existing){
    state.proScale=scaleFromProPoint(existing);
    state.proOffsetX=Number.isFinite(existing.ox)?existing.ox:0;
    state.proOffsetY=Number.isFinite(existing.oy)?existing.oy:0;
  }else if(state.proPoints.length){
    const targetX=Math.tan(rad(proReferenceHFov())/2);
    const res=interpolateProCalibration(targetX);
    const pseudo={j:res.j};
    state.proScale=scaleFromProPoint(pseudo);
    state.proOffsetX=res.ox;
    state.proOffsetY=res.oy;
  }else{
    state.proScale=quickEstimateForPro();
    state.proOffsetX=0;
    state.proOffsetY=0;
  }
  applyProScale();
  updateProHUD();
}
function saveCurrentProPoint(){
  const video=$('#proVideo'), frame=$('#proFrame');
  if(!video.videoWidth || !frame.clientWidth) return;
  const hfov=proReferenceHFov();
  const x=Math.tan(rad(hfov)/2);
  const metrics=containedVideoMetrics(video);
  const frameFraction=(frame.clientWidth||1)/(metrics.imageW||1);

  // Normalize zoom against the COMPLETE phone image.
  // Center offsets are stored as a fraction of the cinema frame.
  const j=state.proScale*x/frameFraction;

  saveProPoint({
    x,j,hfov,
    ox:state.proOffsetX,
    oy:state.proOffsetY,
    focal:state.proRefFocal,
    presetId:state.proRefPreset.id,
    presetName:state.proRefPreset.name,
    sensorWidth:state.proRefPreset.width,
    ratio:state.ratio,
    savedAt:new Date().toISOString()
  });
  renderProLenses();
  updateProHUD();
}
function renderProPoints(){
  const el=$('#proPointsList');
  if(!el) return;
  el.innerHTML='';
  if(!state.proPoints.length){
    el.innerHTML='<div class="pro-empty">Aucun point. Commence par 24 mm, puis 35, 50 et 85.</div>';
    return;
  }
  const pts=[...state.proPoints].sort((a,b)=>a.focal-b.focal);
  pts.forEach(p=>{
    const actualIndex=state.proPoints.indexOf(p);
    const row=document.createElement('div');
    row.className='pro-point';
    const cent=(Math.abs(p.ox||0)>.002 || Math.abs(p.oy||0)>.002) ? ` · centre ${(p.ox*100).toFixed(0)}/${(p.oy*100).toFixed(0)}` : '';
    row.innerHTML=`<div><strong>${p.focal} mm</strong><span>${p.presetName} · ${p.hfov.toFixed(1)}°${cent}</span></div><button type="button">×</button>`;
    row.querySelector('button').onclick=()=>{deleteProPoint(actualIndex);renderProLenses()};
    el.appendChild(row);
  });
}
function openProCalibration(){
  const go=()=>{
    window.scrollTo(0,0);
    $('#proVideo').srcObject=state.stream;
    renderProPresetSelect();
    renderProLenses();
    renderProPoints();
    updateWideLimitUI();
    $('#proCalDialog').showModal();
    state.proAdvancedOpen=false;
    $('#proControls').classList.remove('hidden');
    $('#showProControlsBtn').classList.add('hidden');
    setProAdvanced(false);
    requestAnimationFrame(()=>{updateProFrame();prepareProScale()});
  };
  if(!state.stream) startCamera().then(go); else go();
}
function openQuickCalibration(){
  const go=()=>{$('#calDialog').showModal();updateCalLines()};
  if(!state.stream) startCamera().then(go); else go();
}


function setProAdvanced(open){
  state.proAdvancedOpen=!!open;
  const panel=$('#proAdvancedPanel');
  const controls=$('#proControls');
  const btn=$('#toggleProAdvancedBtn');
  panel.classList.toggle('hidden',!state.proAdvancedOpen);
  controls.classList.toggle('expanded',state.proAdvancedOpen);
  btn.textContent=state.proAdvancedOpen?'FERMER':'RÉGLAGES';
  requestAnimationFrame(()=>updateProFrame());
}
function hideProControls(){
  $('#proControls').classList.add('hidden');
  $('#showProControlsBtn').classList.remove('hidden');
  requestAnimationFrame(()=>updateProFrame());
}
function showProControls(){
  $('#proControls').classList.remove('hidden');
  $('#showProControlsBtn').classList.add('hidden');
  requestAnimationFrame(()=>updateProFrame());
}


function updateWideLimitUI(){
  const status=$('#proLimitStatus');
  const details=$('#proLimitDetails');
  const clear=$('#clearWideLimitBtn');
  if(!status || !details || !clear) return;

  if(Number.isFinite(state.maxUsableHFov)){
    status.textContent=state.maxUsableLimitLabel || `${state.maxUsableHFov.toFixed(1)}° max`;
    details.textContent=`Tout cadrage demandant plus de ${state.maxUsableHFov.toFixed(1)}° horizontal sera désactivé.`;
    clear.classList.remove('hidden');
  }else{
    status.textContent='Aucune limite définie';
    details.textContent='Définis la focale la plus large que le téléphone arrive réellement à reproduire.';
    clear.classList.add('hidden');
  }
}
function setCurrentAsWideLimit(){
  const hf=proReferenceHFov();
  state.maxUsableHFov=hf;
  state.maxUsableLimitLabel=`${state.proRefPreset.name} · ${state.proRefFocal} mm`;
  writeCalibrationProfile();
  updateWideLimitUI();
  renderLenses();
  updateSimulation();
}
function clearWideLimit(){
  state.maxUsableHFov=null;
  state.maxUsableLimitLabel=null;
  writeCalibrationProfile();
  updateWideLimitUI();
  renderLenses();
  updateSimulation();
}


function preferredTheme(){
  return localStorage.getItem("bruno-onset-theme") || localStorage.getItem("bruno-set-tools-theme") || "light";
}
function applyTheme(theme,persist=true){
  const dark=theme==="dark";
  document.documentElement.dataset.theme=dark?"dark":"light";
  document.body.classList.toggle("dark",dark);
  document.body.dataset.theme=dark?"dark":"light";

  const themeToggle=$('#themeBtn');
  const themeColor=document.getElementById("themeColor") || document.querySelector('meta[name="theme-color"]');
  if(themeToggle) themeToggle.textContent=dark?"LIGHT":"DARK";
  if(themeColor) themeColor.setAttribute("content",dark?"#111315":"#F3F1EC");

  if(persist){
    localStorage.setItem("bruno-onset-theme",dark?"dark":"light");
    // Transitional compatibility with older BOS/BST builds.
    localStorage.setItem("bruno-set-tools-theme",dark?"dark":"light");
  }
}
function toggleTheme(){
  applyTheme(document.body.classList.contains("dark")?"light":"dark");
}

function setFrameCameraSettingsOpen(open){
  const panel=$('#frameCameraSettingsPanel');
  const toggle=$('#frameCameraSettingsToggle');
  const content=$('#frameCameraSettingsContent');
  if(!panel || !toggle || !content) return;
  panel.classList.toggle('collapsed',!open);
  toggle.setAttribute('aria-expanded',open?'true':'false');
  content.hidden=!open;
}

function registerEvents(){
  $('#startCameraBtn').onclick=()=>startCamera();
  $('#realModeBtn').onclick=()=>setFrameMode('real');
  $('#previewModeBtn').onclick=()=>setFrameMode('preview');

  $('#subjectHeightInput').oninput=e=>{
    const v=parseFloat(e.target.value);
    if(Number.isFinite(v)){
      state.subjects[0].height=Math.max(1.2,Math.min(2.2,v));
      savePreviewSettings();
      updatePreview();
    }
  };
  $('#subjectDistanceInput').oninput=e=>{
    const v=parseFloat(e.target.value);
    if(Number.isFinite(v)){
      state.groupDistance=Math.max(.4,Math.min(30,v));
      rebuildGroupLayout();
      savePreviewSettings();
      updatePreview();
    }
  };
  $('#subjectDistanceSlider').oninput=e=>{
    const v=parseFloat(e.target.value);
    if(Number.isFinite(v)){
      state.groupDistance=Math.max(.4,Math.min(30,v));
      rebuildGroupLayout();
      savePreviewSettings();
      updatePreview();
    }
  };
  $$('#subjectCountSwitch button').forEach(b=>b.onclick=()=>setSubjectCount(Number(b.dataset.count)));
  $('#groupSpreadSlider').oninput=e=>{
    const v=parseFloat(e.target.value);
    if(Number.isFinite(v)){
      state.groupSpread=Math.max(.2,Math.min(2.5,v));
      rebuildGroupLayout();
      savePreviewSettings();
      updatePreview();
    }
  };
  $('#cameraBtn').onclick=()=>{$('#cameraDialog').showModal();updateCalibrationStatus()};
  $('#restartCameraBtn').onclick=()=>startCamera($('#deviceSelect').value);

  $('#calBtn').onclick=()=>openCalibrationChooser();
  $('#openCalFromCamera').onclick=()=>{$('#cameraDialog').close();openCalibrationChooser()};
  $('#openQuickCalBtn').onclick=()=>{$('#calChooserDialog').close();openQuickCalibration()};
  $('#openProCalBtn').onclick=()=>{$('#calChooserDialog').close();openProCalibration()};
  $('#closeProCalBtn').onclick=()=>$('#proCalDialog').close();

  $('#proPresetSelect').onchange=e=>{
    state.proRefPreset=presets.find(p=>p.id===e.target.value)||presets[0];
    renderProLenses(); prepareProScale(); updateProHUD();
  };
  $('#proScaleSlider').oninput=e=>{state.proScale=parseFloat(e.target.value);applyProScale()};
  $('#proMinusBtn').onclick=()=>{state.proScale-=.01;applyProScale()};
  $('#proPlusBtn').onclick=()=>{state.proScale+=.01;applyProScale()};
  $('#toggleProAdvancedBtn').onclick=()=>setProAdvanced(!state.proAdvancedOpen);
  $('#hideProControlsBtn').onclick=()=>hideProControls();
  $('#showProControlsBtn').onclick=()=>showProControls();
  $('#proOffsetXSlider').oninput=e=>{state.proOffsetX=parseFloat(e.target.value);applyProScale()};
  $('#proOffsetYSlider').oninput=e=>{state.proOffsetY=parseFloat(e.target.value);applyProScale()};
  $('#resetProCenterBtn').onclick=()=>{state.proOffsetX=0;state.proOffsetY=0;applyProScale()};
  $('#setWideLimitBtn').onclick=()=>setCurrentAsWideLimit();
  $('#clearWideLimitBtn').onclick=()=>clearWideLimit();
  $('#saveProPointBtn').onclick=()=>saveCurrentProPoint();

  $('#settingsBtn').onclick=()=>$('#settingsDialog').showModal();
  $('#themeBtn').onclick=()=>toggleTheme();

  $('#frameCameraSettingsToggle').onclick=()=>{
    setFrameCameraSettingsOpen(
      $('#frameCameraSettingsToggle').getAttribute('aria-expanded')!=='true'
    );
  };
  $('#presetBrandMode').addEventListener('click',e=>{
    const btn=e.target.closest('button[data-brand]');
    if(!btn) return;

    const brand=btn.dataset.brand;
    cameraPickerBrand=brand;

    const remembered=getLastFrameCameraForBrand(brand);
    const first=camerasForBrand(brand)[0];
    const next=presets.find(p=>p.id===(remembered||first?.id));

    if(next) applyCinemaPreset(next);
    else renderPresets();
  });

  $('#presetCameraSelect').addEventListener('change',e=>{
    const next=presets.find(p=>p.id===e.target.value);
    if(next) applyCinemaPreset(next);
  });
  $('#ratioBtn').onclick=()=>$('#ratioDialog').showModal();
  $('#objectWidth').oninput=calculateCalibration;
  $('#objectDistance').oninput=calculateCalibration;
  $('#saveCalibrationBtn').onclick=()=>{
    const f=calculateCalibration(); if(f){saveCalibration(f);$('#calDialog').close()}
  };
  $('#thirdsToggle').onchange=e=>$('#thirds').classList.toggle('hidden',!e.target.checked);
  $('#centerToggle').onchange=e=>$('#centerCross').classList.toggle('hidden',!e.target.checked);
  $('#resetCalBtn').onclick=()=>{
    const orientationName=state.orientation==='landscape'?'paysage':'portrait';
    const ok=window.confirm(
      `Effacer complètement la calibration ${orientationName} pour cette caméra téléphone ?\n\nLa calibration de l’autre orientation sera conservée.`
    );
    if(ok){
      resetCalibration();
      $('#settingsDialog').close();
    }
  };
  $('#resetCurrentCalibrationBtn').onclick=()=>confirmResetCurrentCalibration();

  addEventListener('resize',()=>{
    const next=innerWidth>=innerHeight?'landscape':'portrait';
    if(next!==state.orientation){
      state.orientation=next;
      loadCalibration();
    }
    requestAnimationFrame(()=>{
      updateFrame();
      updateProFrame();
      updateSimulation();
      if($('#proCalDialog')?.open) prepareProScale();
      if($('#calDialog')?.open) updateCalLines();
      if(state.mode==='preview') updatePreview();
    });
  });
}
function openCalibrationChooser(){
  updateCalibrationStatus();
  updateResetCalibrationUI();
  $('#calChooserDialog').showModal();
}

function init(){
  applyTheme(preferredTheme(),false);
  loadCachedCameraDb();
  loadMainCameraSetting();
  setFrameCameraSettingsOpen(false);
  loadPreviewSettings();
  renderLenses(); renderPresets(); renderRatios(); renderGuideChoices();
  renderProPresetSelect(); renderProLenses(); renderProPoints();
  preparePreviewSubjectClones();
  renderPreviewTargets();
  renderSubjectCount();
  renderExtraSubjectControls();
  setupCalibrationDrag(); registerEvents();
  syncPreviewInputs();
  setFrameMode(state.mode,false);
  updateAll();
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
  refreshCameraDb();
}
init();
