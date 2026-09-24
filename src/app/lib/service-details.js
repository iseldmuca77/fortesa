/**
 * Extended content for each service page, keyed by the `slug` in SERVICES.
 * seoTitle: the <title> (the layout appends "| Fortesa"); keep it under ~60 characters.
 * seoDescription: the meta description; aim for 150 to 160 characters.
 */
export const SERVICE_DETAILS = {
  "kamera-sigurie": {
    seoTitle: "Kamera Sigurie CCTV në Tiranë: Montim & Monitorim",
    seoDescription:
      "Fortesa monton kamera sigurie (CCTV) për shtëpi, biznese dhe hotele në Tiranë dhe në gjithë Shqipërinë, me monitorim 24/7 nga telefoni dhe mirëmbajtje periodike.",
    intro: [
      "Fortesa projekton dhe monton sisteme kamerash sigurie (CCTV) për shtëpi, biznese, magazina dhe hotele. Zgjedhim kamerat sipas objektit tuaj (IP ose HD, të brendshme ose të jashtme, me pamje nate), i pozicionojmë për mbulim të plotë pa zona të verbëra dhe i lidhim me regjistrues (NVR/DVR) për ruajtjen e pamjeve.",
      "Pas montimit konfigurojmë aksesin nga telefoni dhe kompjuteri, që ta shihni objektin në kohë reale kudo që jeni, dhe ofrojmë mirëmbajtje periodike që sistemi të punojë gjithmonë.",
    ],
    includes: [
      "Vlerësim i objektit dhe propozim i pozicioneve të kamerave",
      "Kamera IP ose HD, të brendshme dhe të jashtme, me pamje nate",
      "Regjistrues NVR/DVR dhe ruajtje e pamjeve sipas nevojës",
      "Konfigurim i aksesit nga telefoni (aplikacion) dhe kompjuteri",
      "Mirëmbajtje, pastrim dhe përditësime periodike",
    ],
    forWhom: "Shtëpi dhe vila, dyqane, zyra, magazina, hotele, komplekse banimi dhe parkingje.",
    faqs: [
      {
        q: "A mund t’i shoh kamerat nga telefoni?",
        a: "Po. Çdo sistem që montojmë konfigurohet me akses nga telefoni dhe kompjuteri, që të shihni pamjet live dhe regjistrimet kudo që jeni.",
      },
      {
        q: "Sa kohë ruhen regjistrimet?",
        a: "Varet nga kapaciteti i diskut dhe numri i kamerave. Zakonisht sistemi dimensionohet për disa javë regjistrim dhe kapaciteti mund të zgjerohet sipas nevojës suaj.",
      },
      {
        q: "A ofroni mirëmbajtje pas montimit?",
        a: "Po. Ofrojmë kontrolle periodike, pastrim të kamerave, përditësime dhe asistencë teknike sa herë që ju nevojitet.",
      },
    ],
  },
  "sisteme-alarmi": {
    seoTitle: "Sisteme Alarmi kundër Vjedhjes dhe Zjarrit në Tiranë",
    seoDescription:
      "Sisteme alarmi me sensorë lëvizjeje, kontakte dyersh dhe sirena, me njoftim të menjëhershëm në telefon. Montim dhe mirëmbajtje nga Fortesa, Tiranë.",
    intro: [
      "Një sistem alarmi i montuar mirë ju njofton në sekondën që dikush hyn pa leje ose kur detektohet tym. Fortesa monton sisteme alarmi me sensorë lëvizjeje, kontakte magnetike për dyer dhe dritare, sensorë thyerjeje xhami dhe sirena të brendshme e të jashtme, të lidhura me një qendër komanduese me tastierë ose telekomandë.",
      "Sistemi lidhet me telefonin tuaj (GSM ose internet) dhe dërgon njoftim të menjëhershëm për çdo ngjarje. Mund të integrohet me kamerat e sigurisë dhe me sistemet e detektimit të zjarrit për një mbrojtje të plotë.",
    ],
    includes: [
      "Qendër alarmi me tastierë, telekomandë ose aplikacion",
      "Sensorë lëvizjeje, kontakte dyersh/dritaresh dhe sensorë xhami",
      "Sirena të brendshme dhe të jashtme",
      "Njoftim në telefon nëpërmjet GSM ose internetit",
      "Integrim me kamerat dhe detektorët e tymit",
    ],
    forWhom:
      "Apartamente, shtëpi, dyqane, zyra, magazina, farmaci dhe objekte të tjera që kërkojnë mbrojtje kundër vjedhjes dhe zjarrit.",
    faqs: [
      {
        q: "A punon alarmi kur ikën energjia elektrike?",
        a: "Po. Qendra e alarmit ka bateri rezervë që e mban sistemin në punë për disa orë në rast ndërprerjeje të energjisë.",
      },
      {
        q: "Si njoftohem kur bie alarmi?",
        a: "Me njoftim në telefon nëpërmjet aplikacionit, me SMS ose me telefonatë automatike, sipas konfigurimit që zgjedhim bashkë.",
      },
      {
        q: "A mund të kombinohet alarmi me kamerat?",
        a: "Po. Alarmi mund të integrohet me kamerat e sigurisë, që në rast ngjarjeje të shihni menjëherë pamjet nga objekti.",
      },
    ],
  },
  "instalime-elektrike": {
    seoTitle: "Instalime Elektrike në Tiranë: Të Plota & Riparime",
    seoDescription:
      "Instalime elektrike të plota për shtëpi, biznese dhe objekte të reja, riparime dhe mirëmbajtje sipas standardeve të sigurisë. Fortesa, Tiranë.",
    intro: [
      "Fortesa kryen instalime elektrike të plota për objekte të reja dhe rikonstruksione: shtrirje kabllosh, kuadro elektrike, priza, çelësa, ndriçim dhe tokëzim, të gjitha sipas standardeve të sigurisë.",
      "Kryejmë gjithashtu riparime të defekteve, zëvendësim të kuadrove dhe automatëve të vjetër dhe mirëmbajtje periodike, që instalimi juaj të jetë i sigurt dhe i besueshëm për vite me radhë.",
    ],
    includes: [
      "Projektim dhe shtrirje e instalimit elektrik për objekte të reja",
      "Kuadro elektrike, automatë dhe mbrojtje diferenciale",
      "Priza, çelësa, ndriçim i brendshëm dhe i jashtëm",
      "Riparim defektesh dhe zëvendësim i instalimeve të vjetra",
      "Mirëmbajtje periodike dhe kontroll sigurie",
    ],
    forWhom: "Apartamente dhe shtëpi, dyqane, zyra, hotele, objekte industriale dhe ndërtime të reja.",
    faqs: [
      {
        q: "A bëni edhe riparime të vogla?",
        a: "Po. Përveç instalimeve të plota, kryejmë riparime defektesh, zëvendësime prizash, çelësash dhe automatësh, si dhe kontrolle sigurie.",
      },
      {
        q: "A mund ta kombinoj instalimin elektrik me kamerat dhe alarmin?",
        a: "Po. Meqë kryejmë edhe instalimet elektrike, edhe sistemet e sigurisë, i planifikojmë së bashku që kabllimi të bëhet një herë dhe pa punime shtesë.",
      },
      {
        q: "A punoni në objekte të reja në ndërtim?",
        a: "Po. Punojmë me ndërtues dhe pronarë që nga faza e projektimit, që instalimi elektrik dhe ai i sigurisë të parashikohen që në fillim.",
      },
    ],
  },
  "gps-per-makina": {
    seoTitle: "GPS për Makina dhe Flota: Gjurmim në Kohë Reale",
    seoDescription:
      "Pajisje GPS për makina dhe flota me gjurmim në kohë reale nga telefoni, histori rrugëtimesh dhe njoftime sigurie. Montim nga Fortesa, Tiranë.",
    intro: [
      "Me pajisjet GPS të Fortesa e dini gjithmonë ku ndodhet makina juaj ose çdo automjet i flotës suaj. Pajisja montohet në mënyrë diskrete në automjet dhe transmeton pozicionin në kohë reale në aplikacionin në telefon ose në kompjuter.",
      "Përveç lokalizimit, sistemi ruan historinë e rrugëtimeve, tregon shpejtësinë dhe ndalesat dhe ju njofton për ngjarje si lëvizje e paautorizuar, dalje nga një zonë e caktuar ose shkëputje e pajisjes.",
    ],
    includes: [
      "Pajisje GPS me montim diskret në automjet",
      "Aplikacion për telefon dhe kompjuter me pozicion në kohë reale",
      "Histori rrugëtimesh, shpejtësi dhe ndalesa",
      "Njoftime për lëvizje të paautorizuar dhe zona të caktuara (geofence)",
      "Menaxhim i flotave me shumë automjete",
    ],
    forWhom:
      "Pronarë makinash, kompani transporti dhe shpërndarjeje, agjenci makinash me qira, ndërtues dhe çdo biznes me flotë automjetesh.",
    faqs: [
      {
        q: "A mund ta gjurmoj makinën nga telefoni?",
        a: "Po. Pozicioni i automjetit dhe historia e rrugëtimeve shihen në çdo moment nga aplikacioni në telefon ose nga kompjuteri.",
      },
      {
        q: "A njoftohem nëse makina lëviz pa lejen time?",
        a: "Po. Sistemi mund të konfigurohet që t’ju njoftojë menjëherë për lëvizje të paautorizuar, dalje nga një zonë e caktuar ose shkëputje të pajisjes.",
      },
      {
        q: "A është i përshtatshëm për një flotë me shumë automjete?",
        a: "Po. Platforma tregon të gjitha automjetet e flotës në një hartë të vetme, me raporte për çdo mjet.",
      },
    ],
  },
  "sisteme-parkingu": {
    seoTitle: "Sisteme Parkingu dhe Tra Automatik në Shqipëri",
    seoDescription:
      "Tra automatik për parkime, sisteme biletarie dhe lexim automatik i targave për biznese, komplekse banimi dhe parkingje publike. Montim nga Fortesa, Tiranë.",
    intro: [
      "Fortesa monton sisteme të plota për menaxhimin e parkingjeve: tra automatik (barriera) me telekomandë, kartë ose lexim automatik të targave, sisteme biletarie me pagesë dhe kontroll të hyrje-daljeve.",
      "Zgjidhjet përshtaten për parkingje private (komplekse banimi, zyra, hotele) dhe publike (parkingje me pagesë, qendra tregtare), me raporte për hyrjet dhe daljet.",
    ],
    includes: [
      "Tra automatik (barriera) për hyrje dhe dalje",
      "Hapje me telekomandë, kartë, kod ose lexim automatik të targave (LPR)",
      "Sisteme biletarie dhe pagese për parkingje publike",
      "Sensorë sigurie që ndalojnë traun kur ka automjet poshtë",
      "Raporte hyrje-daljesh dhe mirëmbajtje periodike",
    ],
    forWhom:
      "Komplekse banimi, hotele, zyra dhe biznese me parking privat, qendra tregtare dhe parkingje publike me pagesë.",
    faqs: [
      {
        q: "Si hapet trau për banorët ose punonjësit?",
        a: "Me telekomandë, kartë, kod ose automatikisht me leximin e targës së regjistruar, sipas zgjidhjes që ju përshtatet.",
      },
      {
        q: "A mund të vendoset sistem me pagesë për parkingun publik?",
        a: "Po. Montojmë sisteme biletarie me pagesë, ku vizitori merr biletë në hyrje dhe paguan sipas kohës së qëndrimit.",
      },
      {
        q: "A është i sigurt trau për makinat dhe këmbësorët?",
        a: "Po. Trarët që montojmë kanë sensorë sigurie që e ndalojnë mbylljen kur ka një automjet ose person poshtë.",
      },
    ],
  },
  "porta-automatike": {
    seoTitle: "Porta Automatike në Tiranë: Motorë & Telekomandë",
    seoDescription:
      "Montim motorësh për porta automatike rrëshqitëse, me kanate dhe garazhi, me telekomandë ose telefon dhe sensorë sigurie. Fortesa, Tiranë dhe në gjithë Shqipërinë.",
    intro: [
      "Fortesa automatizon porta oborri, garazhi dhe ambientesh industriale me motorë të besueshëm për porta rrëshqitëse, me kanate dhe seksionale. Porta hapet dhe mbyllet me telekomandë, nga telefoni ose me kod, pa zbritur nga makina.",
      "Çdo instalim përfshin fotocelula dhe sensorë sigurie që ndalojnë portën kur ka pengesë, si dhe mundësi hapjeje manuale në rast ndërprerjeje të energjisë.",
    ],
    includes: [
      "Motorë për porta rrëshqitëse, me kanate dhe garazhi",
      "Komandim me telekomandë, telefon, kod ose kartë",
      "Fotocelula dhe sensorë sigurie kundër pengesave",
      "Pllaka elektronike komanduese dhe çelës për hapje manuale",
      "Mirëmbajtje dhe riparim i motorëve ekzistues",
    ],
    forWhom: "Shtëpi dhe vila, komplekse banimi, garazhe, biznese dhe objekte industriale.",
    faqs: [
      {
        q: "A mund ta hap portën nga telefoni?",
        a: "Po. Përveç telekomandës, motorët mund të lidhen me aplikacion në telefon ose me modul GSM, që porta të hapet me një telefonatë ose një prekje.",
      },
      {
        q: "Çfarë ndodh kur ikën energjia?",
        a: "Motorët kanë çelës për zhbllokim manual dhe, sipas modelit, mund të pajisen me bateri rezervë.",
      },
      {
        q: "A riparoni motorë të montuar nga të tjerë?",
        a: "Po. Diagnostikojmë dhe riparojmë motorë dhe pllaka komanduese ekzistuese, ose i zëvendësojmë kur nuk riparohen.",
      },
    ],
  },
  "detektim-zjarri": {
    seoTitle: "Sisteme Detektimi Zjarri: Detektorë Tymi & Alarme",
    seoDescription:
      "Sisteme detektimi zjarri me detektorë tymi dhe temperature, qendër alarmi dhe njoftim të menjëhershëm për biznese, industri dhe komplekse banimi. Fortesa, Tiranë.",
    intro: [
      "Zbulimi i hershëm i tymit shpëton jetë dhe pronë. Fortesa projekton dhe monton sisteme detektimi zjarri me detektorë tymi dhe temperature, butona alarmi manualë, sirena dhe qendër alarmi që tregon saktësisht zonën ku është detektuar rreziku.",
      "Sistemet përshtaten për objekte industriale, biznese, hotele dhe komplekse banimi, dhe mund të lidhen me telefonin tuaj ose me sistemin e alarmit ekzistues për njoftim të menjëhershëm.",
    ],
    includes: [
      "Detektorë tymi, temperature dhe gazi sipas ambientit",
      "Qendër alarmi konvencionale ose e adresueshme me tregim zone",
      "Butona alarmi manualë dhe sirena me sinjal zanor dhe pamor",
      "Njoftim i menjëhershëm në telefon ose te sistemi i alarmit",
      "Kontrolle periodike dhe testim i sistemit",
    ],
    forWhom:
      "Objekte industriale dhe magazina, hotele, qendra tregtare, zyra, komplekse banimi dhe çdo objekt ku kërkohet mbrojtje nga zjarri.",
    faqs: [
      {
        q: "Cili është ndryshimi nga një alarm i zakonshëm?",
        a: "Sistemi i detektimit të zjarrit është i dedikuar për tymin dhe temperaturën, mbulon çdo zonë të objektit dhe tregon saktësisht ku është detektuar rreziku, ndërsa alarmi klasik mbron kryesisht nga hyrjet e paautorizuara.",
      },
      {
        q: "A duhet testuar sistemi periodikisht?",
        a: "Po. Rekomandojmë kontrolle dhe testime periodike të detektorëve, sirenave dhe baterive, të cilat i kryejmë ne si pjesë e mirëmbajtjes.",
      },
      {
        q: "A mund të lidhet me alarmin ekzistues?",
        a: "Po. Detektorët e tymit mund të integrohen me sistemin e alarmit që keni, që njoftimet të vijnë në të njëjtin aplikacion.",
      },
    ],
  },
  "rrjete-wifi": {
    seoTitle: "Rrjete Kompjuterike dhe Wi-Fi Profesional në Tiranë",
    seoDescription:
      "Rrjete kompjuterike me kabllim të strukturuar dhe Wi-Fi profesional për zyra, hotele dhe shtëpi, me mbulim të plotë pa shkëputje. Fortesa, Tiranë.",
    intro: [
      "Një rrjet i projektuar mirë është baza për kamerat, telefoninë, bravat elektronike dhe punën e përditshme. Fortesa projekton dhe shtrin rrjete kompjuterike me kabllim të strukturuar (kabllo rrjeti dhe fibër), rack dhe patch panel, switch-e dhe router-a profesionalë.",
      "Për Wi-Fi përdorim access point-e profesionale me menaxhim të centralizuar, që mbulojnë çdo kat dhe dhomë pa shkëputje, me rrjet të veçantë për mysafirët dhe për stafin.",
    ],
    includes: [
      "Projektim i rrjetit dhe kabllim i strukturuar (Cat6/Cat6a dhe fibër)",
      "Rack, patch panel dhe organizim i dhomës teknike",
      "Switch-e dhe router-a profesionalë me ndarje rrjetesh (VLAN)",
      "Wi-Fi profesional me access point-e të menaxhuara dhe roaming pa shkëputje",
      "Rrjet i veçantë për mysafirët, stafin dhe pajisjet e sigurisë",
    ],
    forWhom: "Zyra dhe kompani, hotele dhe restorante, shkolla, komplekse banimi dhe shtëpi të mëdha.",
    faqs: [
      {
        q: "Pse nuk mjafton router-i i internetit?",
        a: "Router-i i ofruesit mbulon vetëm një hapësirë të vogël. Për zyra, hotele ose shtëpi me shumë kate nevojiten access point-e profesionale dhe kabllim i duhur, që sinjali të jetë i plotë kudo.",
      },
      {
        q: "A mund të kenë mysafirët rrjet të veçantë?",
        a: "Po. Krijojmë rrjete të ndara për mysafirët, stafin dhe pajisjet (kamera, brava, telefoni), për siguri dhe performancë.",
      },
      {
        q: "A e planifikoni rrjetin edhe për kamerat dhe telefoninë?",
        a: "Po. Meqë montojmë edhe kamerat, telefoninë dhe bravat elektronike, e projektojmë rrjetin që t’i mbajë të gjitha këto pa probleme.",
      },
    ],
  },
  "telefoni-hoteleri": {
    seoTitle: "Telefoni për Hotele (PBX/VoIP) në Shqipëri",
    seoDescription:
      "Qendra telefonike IP/VoIP për hotele dhe biznese: telefon në çdo dhomë, komunikim me recepsionin dhe integrim me software-in e hotelit. Fortesa, Tiranë.",
    intro: [
      "Fortesa monton qendra telefonike IP/VoIP (PBX) për hotele dhe biznese, me telefon në çdo dhomë dhe zyrë, numra të brendshëm për recepsionin, restorantin dhe stafin, dhe linja të jashtme sipas nevojës.",
      "Sistemi integrohet me software-in e menaxhimit të hotelit (PMS) për aktivizim automatik të telefonit të dhomës në check-in, zgjim me telefon (wake-up call) dhe faturim të thirrjeve, dhe përdor rrjetin ekzistues pa kabllim të veçantë.",
    ],
    includes: [
      "Qendër telefonike IP/VoIP (PBX) fizike ose në cloud",
      "Telefona IP për dhoma, recepsion dhe zyra",
      "Numra të brendshëm, transferim thirrjesh dhe sekretari automatike",
      "Integrim me PMS: check-in/out, wake-up call, faturim thirrjesh",
      "Konfigurim mbi rrjetin ekzistues dhe mirëmbajtje",
    ],
    forWhom:
      "Hotele dhe resorte, biznese me shumë zyra, klinika dhe çdo organizatë që ka nevojë për komunikim të brendshëm.",
    faqs: [
      {
        q: "A duhet kabllim i veçantë për telefoninë?",
        a: "Jo. Telefonia IP përdor rrjetin kompjuterik ekzistues, kështu që çdo prizë rrjeti mund të bëhet prizë telefoni.",
      },
      {
        q: "A mund të telefonojnë mysafirët recepsionin nga dhoma?",
        a: "Po. Çdo dhomë ka numër të brendshëm dhe mund të telefonojë recepsionin, restorantin ose shërbimet e hotelit pa kosto.",
      },
      {
        q: "A integrohet me sistemin e menaxhimit të hotelit?",
        a: "Po. Qendra telefonike integrohet me PMS për aktivizim automatik të telefonit në check-in, wake-up call dhe faturim të thirrjeve në llogarinë e dhomës.",
      },
    ],
  },
  "sisteme-audio": {
    seoTitle: "Sisteme Audio & Muzikë Sfondi për Hotele dhe Zyra",
    seoDescription:
      "Sisteme zëri profesionale (PA) me muzikë sfondi, ndarje në zona dhe njoftime me mikrofon për hotele, restorante dhe zyra. Montim nga Fortesa, Tiranë.",
    intro: [
      "Fortesa monton sisteme profesionale zëri për hotele, restorante, bare, zyra, dyqane dhe ambiente rezidenciale: altoparlantë tavani ose muri, amplifikatorë dhe kontroll të centralizuar për muzikën e sfondit.",
      "Sistemi ndahet në zona (multi-zone), që lobi, restoranti dhe tarraca të kenë muzikë dhe volum të ndryshëm, dhe mund të përdoret për njoftime me mikrofon ose mesazhe emergjence.",
    ],
    includes: [
      "Altoparlantë tavani, muri ose të jashtëm sipas ambientit",
      "Amplifikatorë dhe kontroll i centralizuar i volumit",
      "Ndarje në zona (multi-zone) me burime të ndryshme muzike",
      "Mikrofon për njoftime dhe mesazhe emergjence",
      "Projektim akustik dhe mirëmbajtje",
    ],
    forWhom: "Hotele, restorante dhe bare, dyqane dhe qendra tregtare, zyra, palestra dhe shtëpi.",
    faqs: [
      {
        q: "A mund të ketë çdo ambient muzikë të ndryshme?",
        a: "Po. Me sistemin multi-zone çdo zonë ka burimin dhe volumin e vet, të kontrolluar nga një pikë e vetme ose nga telefoni.",
      },
      {
        q: "A mund të bëj njoftime me mikrofon?",
        a: "Po. Sistemi lejon njoftime me mikrofon në një zonë ose në të gjithë objektin, duke ndërprerë përkohësisht muzikën.",
      },
      {
        q: "A montoni edhe në shtëpi?",
        a: "Po. Montojmë sisteme audio për shtëpi dhe vila, me altoparlantë të fshehur në tavan dhe kontroll nga telefoni.",
      },
    ],
  },
  "brava-elektrike-hoteleri": {
    seoTitle: "Brava Elektronike për Hotele me Kartë & Software",
    seoDescription:
      "Brava elektronike me kartë ose kod për dhoma hoteli dhe zyra, me software menaxhimi për recepsionin dhe kontroll të plotë aksesi. Montim nga Fortesa në Shqipëri.",
    intro: [
      "Bravat elektronike me kartë e bëjnë hotelin tuaj më të sigurt dhe më modern: recepsioni programon kartën për çdo mysafir me datat e qëndrimit, dhe karta çaktivizohet automatikisht në check-out. Fortesa monton brava për dhoma hoteli, zyra dhe ambiente të tjera me akses të kontrolluar.",
      "Sistemi menaxhohet me software, ku shihni kush ka hyrë në çdo dhomë dhe kur, krijoni karta për stafin dhe pastrimin dhe integroheni me sistemin e menaxhimit të hotelit (PMS).",
    ],
    includes: [
      "Brava elektronike me kartë RFID, kod ose telefon",
      "Software menaxhimi për recepsionin dhe programues kartash",
      "Karta për mysafirë, staf dhe pastrim me të drejta të ndryshme",
      "Regjistër i hyrjeve për çdo dhomë",
      "Integrim me sistemin e menaxhimit të hotelit (PMS) dhe kursimtarë energjie",
    ],
    forWhom: "Hotele, bujtina dhe apartamente me qira, zyra dhe ambiente me akses të kufizuar.",
    faqs: [
      {
        q: "Çfarë ndodh kur mysafiri humb kartën?",
        a: "Recepsioni e çaktivizon kartën e humbur me një klik dhe lëshon një të re brenda pak sekondash, pa ndryshuar bravën.",
      },
      {
        q: "A punon brava kur ikën energjia?",
        a: "Po. Bravat elektronike punojnë me bateri të veta dhe kanë çelës mekanik emergjence.",
      },
      {
        q: "A mund të integrohet me software-in e hotelit?",
        a: "Po. Sistemet që montojmë integrohen me sistemet e menaxhimit të hotelit (PMS), që karta të lëshohet direkt nga check-in.",
      },
    ],
  },
};
