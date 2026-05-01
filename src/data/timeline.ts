export interface TimelineStep {
  id: number;
  icon: string;
  color: "orange" | "green" | "blue" | "purple" | "red" | "teal" | "indigo";
  title: {
    en: string;
    hi: string;
    te: string;
    ta: string;
    bn: string;
  };
  shortDesc: {
    en: string;
    hi: string;
    te: string;
    ta: string;
    bn: string;
  };
  details: {
    en: string;
    hi: string;
    te: string;
    ta: string;
    bn: string;
  };
  keyFacts: {
    en: string[];
    hi: string[];
    te: string[];
    ta: string[];
    bn: string[];
  };
  officialLink: string;
  officialLinkText: {
    en: string;
    hi: string;
    te: string;
    ta: string;
    bn: string;
  };
  chatPrompt: string;
}

export const electionTimeline: TimelineStep[] = [
  {
    id: 1,
    icon: "📢",
    color: "orange",
    title: {
      en: "Election Announcement",
      hi: "चुनाव की घोषणा",
      te: "ఎన్నికల ఘోషణ",
      ta: "தேர்தல் அறிவிப்பு",
      bn: "নির্বাচন ঘোষণা",
    },
    shortDesc: {
      en: "ECI announces dates, Model Code of Conduct begins",
      hi: "चुनाव आयोग चुनाव की तारीखें घोषित करता है, आचार संहिता लागू होती है",
      te: "ఎన్నికల సంఖ్య తేదీలను ఘోషిస్తుంది, నిర్వాహణ కోడ్ ప్రారంభమవుతుంది",
      ta: "தேர்தல் ஆணையம் தேர்தல் தேதிகளை அறிவிக்கிறது, நடத்தை விதிகள் நাటுப்படுகின்றன",
      bn: "নির্বাচন কমিশন নির্বাচনের তারিখ ঘোষণা করে, আচরণ সংহিতা কার্যকর হয়",
    },
    details: {
      en: "The Election Commission of India (ECI) announces the official dates for elections. The Model Code of Conduct (MCC) is immediately enforced on all political parties and government officials. No government can make major policy announcements, grant new contracts, or transfer officials during this period. This is the starting point of the election cycle.",
      hi: "भारत के चुनाव आयोग (ECI) द्वारा चुनावों की आधिकारिक तारीख घोषित की जाती है। आचार संहिता (MCC) सभी राजनीतिक दलों और सरकारी अधिकारियों पर तुरंत लागू होती है। इस अवधि में कोई भी सरकार बड़ी नीतिगत घोषणाएं नहीं कर सकती।",
      te: "ఎన్నికల సంఖ్య భారతదేశం (ECI) ఎన్నికల అధికారిక తేదీలను ఘోషిస్తుంది. నిర్వాహణ కోడ్ (MCC) సమస్త రాజకీయ పార్టీలు మరియు ప్రభుత్వ అధికారులపై వెంటనే ఆరోపించబడుతుంది.",
      ta: "இந்திய தேர்தல் ஆணையம் (ECI) தேர்தலின் அதிகாரப்பூர்வ தேதிகளை அறிவிக்கிறது. நடத்தை விதிகள் (MCC) அனைத்து அரசியல் கட்சிகள் மற்றும் அரசு அதிகாரிகளுக்கு உடனடியாக பொருந்தும்.",
      bn: "ভারতের নির্বাচন কমিশন (ECI) নির্বাচনের আধিকারিক তারিখ ঘোষণা করে। আচরণ সংহিতা (MCC) সমস্ত রাজনীতিক দল এবং সরকারি কর্মচারীদের উপর অবিলম্বে প্রয়োগ করা হয়।",
    },
    keyFacts: {
      en: [
        "ECI has 6 members including the Chief Election Commissioner",
        "Model Code of Conduct typically lasts 2-3 months",
        "Announcement is usually in mass media and newspapers",
      ],
      hi: [
        "चुनाव आयोग में मुख्य चुनाव आयुक्त सहित 6 सदस्य होते हैं",
        "आचार संहिता आमतौर पर 2-3 महीने तक चलती है",
        "घोषणा आमतौर पर समाचार माध्यमों में की जाती है",
      ],
      te: [
        "ECI ప్రధాన ఎన్నికల సంఖ్యతో 6 సభ్యులను కలిగి ఉంది",
        "నిర్వాహణ కోడ్ సాధారణంగా 2-3 నెలల పాటు ఉంటుంది",
        "ఘోషణ సాధారణంగా మీడియాలో చేయబడుతుంది",
      ],
      ta: [
        "தேர்தல் ஆணையத்தில் முதன்மை தேர்தல் ஆணையர் உட்பட 6 உறுப்பினர்கள் உள்ளனர்",
        "நடத்தை விதிகள் வழக்கமாக 2-3 மாதங்கள் நீடிக்கும்",
        "அறிவிப்பு வழக்கமாக ஊடகங்களில் செய்யப்படுகிறது",
      ],
      bn: [
        "ECI তে প্রধান নির্বাচন কমিশনার সহ 6 সদস্য রয়েছে",
        "আচরণ সংহিতা সাধারণত 2-3 মাস স্থায়ী হয়",
        "ঘোষণা সাধারণত মিডিয়ায় করা হয়",
      ],
    },
    officialLink: "https://eci.gov.in",
    officialLinkText: {
      en: "Visit ECI Website",
      hi: "ECI वेबसाइट देखें",
      te: "ECI వెబ్‌సైట్ చూడండి",
      ta: "ECI வெப்சைட்டைப் பார்க்கவும்",
      bn: "ECI ওয়েবসাইট দেখুন",
    },
    chatPrompt: "Explain the election announcement phase and what Model Code of Conduct means for citizens",
  },
  {
    id: 2,
    icon: "📝",
    color: "green",
    title: {
      en: "Voter Registration",
      hi: "मतदाता पंजीकरण",
      te: "ఓటరు నమోదు",
      ta: "வாக்காளர் பதிவு",
      bn: "ভোটার রেজিস্ট্রেশন",
    },
    shortDesc: {
      en: "New voters can register using Form 6, deadline typically 30 days before voting",
      hi: "नए मतदाता फॉर्म 6 का उपयोग करके पंजीकरण कर सकते हैं",
      te: "కొత్త ఓటరులు ఫారమ్ 6 ఉపయోగించి నమోదు చేయవచ్చు",
      ta: "புதிய வாக்காளர்கள் ஃபாராம் 6 ஐ பயன்படுத்தி பதிவு செய்யலாம்",
      bn: "নতুন ভোটাররা ফর্ম 6 ব্যবহার করে রেজিস্ট্রেশন করতে পারেন",
    },
    details: {
      en: "This is the critical phase where first-time voters can register. You need to fill Form 6 with your personal details, age proof, and address proof. Registration can be done online at nvsp.in or offline at the Booth Level Officer (BLO). The deadline is typically 30 days before voting begins. Corrections to existing voter rolls (Form 8) can also be done during this period.",
      hi: "यह महत्वपूर्ण चरण है जहां नए मतदाता पंजीकरण कर सकते हैं। आपको फॉर्म 6 भरना होगा अपने व्यक्तिगत विवरण, आयु प्रमाण और पता प्रमाण के साथ। पंजीकरण nvsp.in पर ऑनलाइन या Booth Level Officer (BLO) के पास ऑफलाइन किया जा सकता है।",
      te: "ఇది కొత్త ఓటరులు నమోదు చేయగల క్లిష్ట পর్యায়. మీరు ఫారమ్ 6 ను నింపాలి మీ వ్యక్తిగత వివరాలు, వయస్సు రుజువు మరియు చిరునామా రుజువుతో.",
      ta: "இது புதிய வாக்காளர்கள் பதிவு செய்யக்கூடிய গুরুத்வபூর্ணமான கட்டம். நீங்கள் உங்கள் தனிப்பட்ட விவரங்கள், வயது ஆதாரம் மற்றும் முகவரி ஆதாரத்துடன் ஃபாரம் 6 நிரப்ப வேண்டும்.",
      bn: "এটি একটি গুরুত্বপূর্ণ পর্যায় যেখানে নতুন ভোটাররা রেজিস্ট্রেশন করতে পারেন। আপনাকে আপনার ব্যক্তিগত বিবরণ, বয়স প্রমাণ এবং ঠিকানা প্রমাণ সহ ফর্ম 6 পূরণ করতে হবে।",
    },
    keyFacts: {
      en: [
        "Form 6 is the application for new voter registration",
        "Documents needed: Aadhaar, birth certificate, or passport",
        "Address proof: Utility bill, lease agreement, or Aadhaar",
        "Registration is FREE",
      ],
      hi: [
        "फॉर्म 6 नए मतदाता पंजीकरण के लिए आवेदन है",
        "दस्तावेज आवश्यक: आधार, जन्म प्रमाण पत्र, या पासपोर्ट",
        "पता प्रमाण: यूटिलिटी बिल, लीज समझौता, या आधार",
        "पंजीकरण निःशुल्क है",
      ],
      te: [
        "ఫారమ్ 6 కొత్త ఓటరు నమోదు కోసం దరఖాస్తు",
        "అవసరమైన డాక్యుమెంట్‌లు: ఆధార్, పుట్టుక ధృవీకరణ, లేదా పాస్‌పోర్ట్",
        "చిరునామా రుజువు: యూటిలిటీ బిల్లు, లీజ్ ఒప్పందం, లేదా ఆధార్",
        "నమోదు ఉచితం",
      ],
      ta: [
        "ஃபாரம் 6 என்பது புதிய வாக்காளர் பதிவு விண்ணப்பம்",
        "தேவையான ஆவணங்கள்: ஆதார், பிறப்பு சான்றிதழ், அல்லது பாஸ்போர்ட்",
        "முகவரி ஆதாரம்: யூটிலிटி பில், குத்தகை ஒப்பந்தம், அல்லது ஆதார்",
        "பதிவு இலவசம்",
      ],
      bn: [
        "ফর্ম 6 হল নতুন ভোটার রেজিস্ট্রেশনের জন্য আবেদন",
        "প্রয়োজনীয় ডকুমেন্ট: আধার, জন্মসনদ, বা পাসপোর্ট",
        "ঠিকানা প্রমাণ: ইউটিলিটি বিল, লীজ চুক্তি, বা আধার",
        "রেজিস্ট্রেশন বিনামূল্যে",
      ],
    },
    officialLink: "https://nvsp.in",
    officialLinkText: {
      en: "NVSP Portal",
      hi: "NVSP पोर्टल",
      te: "NVSP పోర్టల్",
      ta: "NVSP போர்టல்",
      bn: "NVSP পোর্টাল",
    },
    chatPrompt: "Guide me through voter registration Form 6 step by step. What documents do I need?",
  },
  {
    id: 3,
    icon: "🎯",
    color: "blue",
    title: {
      en: "Candidate Nominations",
      hi: "उम्मीदवार नामांकन",
      te: "అభ్యర్థి నామినేషన్‌లు",
      ta: "வேட்பாளர் பரிந்துரைகள்",
      bn: "প্রার্থী মনোনয়ন",
    },
    shortDesc: {
      en: "Candidates file nominations, typically 14 days before voting",
      hi: "उम्मीदवार नामांकन दाखिल करते हैं",
      te: "అభ్యర్థులు నామినేషన్‌లను నమోదు చేస్తారు",
      ta: "வேட்பாளர்கள் பரிந்துரைகளை சமர్ப்பிக்கின்றனர்",
      bn: "প্রার্থীরা মনোনয়ন জমা দেন",
    },
    details: {
      en: "Candidates from various political parties file their nomination papers at the designated returning officer. Each nomination is scrutinized for eligibility. Candidates must be at least 25 years old (for Lok Sabha and Assembly), citizens of India, and not disqualified under election laws. During this period, the official candidate list is prepared which voters will see on the EVM.",
      hi: "विभिन्न राजनीतिक दलों के उम्मीदवार नामांकन पत्र दाखिल करते हैं। प्रत्येक नामांकन की पात्रता के लिए जांच की जाती है। उम्मीदवार को कम से कम 25 वर्ष का होना चाहिए, भारत का नागरिक होना चाहिए।",
      te: "వివిధ రాజకీయ పార్టీల నుండి అభ్యర్థులు నామినేషన్ పత్రాలను నమోదు చేస్తారు. ప్రతి నామినేషన్ అర్హతకు పరీక్ష చేయబడుతుంది.",
      ta: "பல்வேறு அரசியல் கட்சிகளின் வேட்பாளர்கள் பரிந்துரை ஆவணங்களை சமர்ப்பிக்கின்றனர். ஒவ்வொரு பரிந்துரையும் தகுதிக்கான পরীक்ষা செய்யப்படுகிறது.",
      bn: "বিভিন্ন রাজনৈতিক দলের প্রার্থীরা মনোনয়ন পত্র জমা দেন। প্রতিটি মনোনয়ন যোগ্যতার জন্য পরীক্ষা করা হয়।",
    },
    keyFacts: {
      en: [
        "Candidate must be a citizen of India",
        "Minimum age: 25 years for Lok Sabha/Assembly",
        "Nominations filed at Returning Officer's office",
        "Nominations published in newspapers within 2 days",
      ],
      hi: [
        "उम्मीदवार भारत का नागरिक होना चाहिए",
        "न्यूनतम उम्र: लोक सभा/विधानसभा के लिए 25 वर्ष",
        "नामांकन Returning Officer के कार्यालय में दाखिल किए जाते हैं",
        "नामांकन 2 दिनों के भीतर अखबारों में प्रकाशित होते हैं",
      ],
      te: [
        "అభ్యర్థి భారత్ నాగరికుడు ఉండాలి",
        "కనిష్ఠ వయస్సు: లోక్‌సభ/సభ కోసం 25 సంవత్సరాలు",
        "నామినేషన్‌లు Returning Officer కార్యాలయంలో నమోదు చేయబడ్డాయి",
        "నామినేషన్‌లు 2 రోజుల్లో వార్తాపత్రికలలో ప్రచురితమవుతాయి",
      ],
      ta: [
        "வேட்பாளர் இந்தியாவின் குடிமக்கனாக இருக்க வேண்டும்",
        "குறைந்தபட்ச வயது: பாராளுமன்ற/சட்டசபைக்கு 25 ஆண்டுகள்",
        "பரிந்துரைகள் Returning Officer அலுவலகத்தில் சமர்ப்பிக்கப்பட்டுள்ளன",
        "பரிந்துரைகள் 2 நாட்களுக்குள் செய்திதாள்களில் வெளியிடப்படுகின்றன",
      ],
      bn: [
        "প্রার্থী ভারতের নাগরিক হতে হবে",
        "ন্যূনতম বয়স: লোকসভা/বিধানসভার জন্য 25 বছর",
        "মনোনয়ন Returning Officer এর অফিসে জমা দেওয়া হয়",
        "মনোনয়ন 2 দিনের মধ্যে সংবাদপত্রে প্রকাশিত হয়",
      ],
    },
    officialLink: "https://eci.gov.in",
    officialLinkText: {
      en: "ECI Candidate Info",
      hi: "ECI उम्मीदवार जानकारी",
      te: "ECI అభ్యర్థి సమాచారం",
      ta: "ECI வேட்பாளர் தகவல்",
      bn: "ECI প্রার্থী তথ্য",
    },
    chatPrompt: "What are the eligibility criteria for becoming a candidate in Indian elections?",
  },
  {
    id: 4,
    icon: "📢",
    color: "purple",
    title: {
      en: "Campaign Period",
      hi: "चुनाव प्रचार",
      te: "ఎన్నిక ప్రచారం",
      ta: "தேர்தல் பிரচாரம்",
      bn: "নির্বাচন প্রচারণা",
    },
    shortDesc: {
      en: "Political parties campaign actively, 48-hour silence period before voting",
      hi: "राजनीतिक दल सक्रिय रूप से अभियान चलाते हैं",
      te: "రాజకీయ పార్టీలు చురుకుగా ప్రచారం చేస్తాయి",
      ta: "அரசியல் கட்சிகள் தீவிரமாக பிரச்சாரம் நடத்துகின்றன",
      bn: "রাজনৈতিক দলগুলি সক্রিয়ভাবে প্রচারণা করে",
    },
    details: {
      en: "This is the period of active political campaigning where candidates and parties conduct rallies, meetings, and advertisements. The Model Code of Conduct is strictly enforced during this period. However, 48 hours before polling, all campaigning must stop (silence period). No political meetings, rallies, or advertising is allowed during this 48-hour window to ensure voters can think freely.",
      hi: "यह सक्रिय राजनीतिक अभियान की अवधि है जहां उम्मीदवार और दल रैलियां, बैठकें और विज्ञापन आयोजित करते हैं। मॉडल कोड ऑफ कंडक्ट इस अवधि के दौरान सख्ती से लागू किया जाता है। हालांकि, मतदान से 48 घंटे पहले, सभी अभियान बंद हो जाना चाहिए।",
      te: "ఇది సక్రియ రాజకీయ ప్రచారం యొక్క కాలం, ఇక్కడ అభ్యర్థులు మరియు పార్టీలు ర్যాలీలు, సమావేశాలు మరియు ప్రకటనలను నిర్వహిస్తాయి.",
      ta: "இது சுறுசுறுப்பான அரசியல் பிரச்சாரத்தின் காலம், அங்கு வேட்பாளர்கள் மற்றும் கட்சிகள் ரேலிகள், சந்திப்புகள் மற்றும் விளம்பரங்களை நடத்துகின்றன.",
      bn: "এটি সক্রিয় রাজনৈতিক প্রচারণার সময়কাল যেখানে প্রার্থী এবং দলগুলি র‍্যালি, সভা এবং বিজ্ঞাপন পরিচালনা করে।",
    },
    keyFacts: {
      en: [
        "Campaign typically lasts 10-14 days",
        "48-hour silence period enforced before voting",
        "Model Code of Conduct applies to all candidates",
        "No political meetings allowed 48 hours before polls",
      ],
      hi: [
        "अभियान आमतौर पर 10-14 दिन तक चलता है",
        "मतदान से 48 घंटे पहले मौन अवधि लागू की जाती है",
        "आचार संहिता सभी उम्मीदवारों पर लागू होती है",
        "मतदान से 48 घंटे पहले कोई राजनीतिक बैठक की अनुमति नहीं है",
      ],
      te: [
        "ప్రచారం సాధారణంగా 10-14 రోజులు ఉంటుంది",
        "మతదానం నుండి 48 గంటల ముందు నిశ్చప్త కాలం ఉపయోగించబడుతుంది",
        "నిర్వాహణ కోడ్ సమస్త అభ్యర్థులకు వర్తిస్తుంది",
        "ఎన్నికల 48 గంటల ముందు రాజకీయ సమావేశాలకు అనుమతి లేదు",
      ],
      ta: [
        "பிரச்சாரம் வழக்கமாக 10-14 நாட்கள் நீடிக்கும்",
        "வாக்கெடுப்புக்கு 48 மணிநேரம் முன்பு அமைதிக் காலம் ஜாரி செய்யப்படுகிறது",
        "நடத்தை விதிகள் அனைத்து வேட்பாளர்களுக்கும் பொருந்தும்",
        "ஆட்சியில் 48 மணிநேரம் முன்பு அரசியல் சभைகளுக்கு அனுமதி இல்லை",
      ],
      bn: [
        "প্রচারাভিযান সাধারণত 10-14 দিন স্থায়ী হয়",
        "ভোটদানের 48 ঘন্টা আগে নীরবতা সময়কাল প্রবর্তিত হয়",
        "নৈতিকতা সংহিতা সমস্ত প্রার্থীদের ক্ষেত্রে প্রযোজ্য",
        "ভোটদানের 48 ঘন্টা আগে কোনো রাজনৈতিক সভার অনুমতি নেই",
      ],
    },
    officialLink: "https://eci.gov.in",
    officialLinkText: {
      en: "Campaign Rules",
      hi: "प्रचार नियम",
      te: "ప్రచారం నియమాలు",
      ta: "பிரச்சார விதிகள்",
      bn: "প্রচারাভিযান নিয়ম",
    },
    chatPrompt: "What is the 48-hour silence period and why is it important in elections?",
  },
  {
    id: 5,
    icon: "🗳️",
    color: "red",
    title: {
      en: "Voting Day",
      hi: "मतदान दिवस",
      te: "ఓటింగ్ రోజు",
      ta: "வாக்கெடுப்பு நாள்",
      bn: "ভোটদান দিবস",
    },
    shortDesc: {
      en: "Citizens vote using EVMs, typically 7 AM to 6 PM",
      hi: "नागरिक EVMs का उपयोग करके मतदान करते हैं",
      te: "పూర్తుకులు EVMలను ఉపయోగించి ఓటు వేస్తారు",
      ta: "குடிமக்கள் EVM ஐ பயன்படுத்தி ஓட்டு போடுகின்றனர்",
      bn: "নাগরিকরা EVM ব্যবহার করে ভোট দেন",
    },
    details: {
      en: "This is the main election day. Polling booths across the country open their doors for citizens to cast their votes. You must bring a valid ID (EPIC card, Aadhaar, passport, etc.) to your assigned polling booth. Voting is done using Electronic Voting Machines (EVMs). Each vote generates a paper trail through the VVPAT (Voter Verifiable Paper Audit Trail) which is shown for 7 seconds. The voting process is secret — no one can know who you voted for. If you reject all candidates, you can opt for NOTA (None of the Above).",
      hi: "यह मुख्य चुनाव दिवस है। देश भर में मतदान केंद्र अपने दरवाजे खोलते हैं ताकि नागरिक अपने मत डाल सकें। आपको अपने निर्धारित मतदान केंद्र पर एक वैध आईडी (EPIC कार्ड, आधार, पासपोर्ट, आदि) लानी होगी। वोटिंग इलेक्ट्रॉनिक वोटिंग मशीनों (EVM) का उपयोग करके की जाती है।",
      te: "ఇది ప్రధాన ఎన్నిక రోజు. దేశ్‌బర్ గల పోలింగ్ బూత్‌లు పూర్తుకులు తమ ఓటుకు కాస్ట్ చేయడానికి తమ డోర్‌లను తెరుస్తాయి.",
      ta: "இது முதன்மை தேர்தல் நாள். நாடு முழுவதும் ஓட்டெடுப்பு மையங்கள் தங்கள் கதவுகளைத் திறந்து குடிமக்கள் தங்கள் ஓட்டுகளை பதிவு செய்யுமாறு வாக்கு போடுகின்றன.",
      bn: "এটি প্রধান নির্বাচন দিবস। সারা দেশে ভোটদান কেন্দ্রগুলি নাগরিকদের তাদের ভোট দেওয়ার জন্য তাদের দরজা খোলে।",
    },
    keyFacts: {
      en: [
        "Polling hours: Usually 7 AM to 6 PM (varies by region)",
        "Bring valid ID: EPIC, Aadhaar, passport, ration card, or driver's license",
        "EVM (Electronic Voting Machine) is used for casting votes",
        "VVPAT (Voter Verifiable Paper Audit Trail) shows your vote for 7 seconds",
        "Voting is secret and confidential",
        "NOTA option available if you reject all candidates",
      ],
      hi: [
        "मतदान के घंटे: आमतौर पर सुबह 7 बजे से शाम 6 बजे तक",
        "वैध आईडी लाएं: EPIC, आधार, पासपोर्ट, राशन कार्ड, या ड्राइविंग लाइसेंस",
        "EVM (इलेक्ट्रॉनिक वोटिंग मशीन) का उपयोग किया जाता है",
        "VVPAT आपके वोट को 7 सेकंड के लिए दिखाता है",
        "वोटिंग गोपनीय है",
        "सभी उम्मीदवारों को अस्वीकार करने पर NOTA विकल्प उपलब्ध है",
      ],
      te: [
        "మతదానం గంటలు: సాధారణంగా ఉదయం 7 నుండి సాయంత్రం 6 వరకు",
        "వాలిడ్ ID తీసుకురండి: EPIC, ఆధార్, పాస్‌పోర్ట్, రేషన్ కార్డ్ లేదా డ్రైవింగ్ లైసెన్సు",
        "EVM (ఎలక్ట్రానిక్ వోటింగ్ మెషిన్) ఉపయోగించబడుతుంది",
        "VVPAT మీ ఓటును 7 సెకన్ల పాటు చూపుతుంది",
        "మతదానం రహస్యం",
        "అన్ని అభ్యర్థులను తిరస్కరిస్తే NOTA ఎంపిక అందుబాటులో ఉంది",
      ],
      ta: [
        "ஆட்சி மணிநேரம்: வழக்கமாக காலை 7 மணி முதல் மாலை 6 மணி வரை",
        "செல்லுபடி ஆகும் ID கொண்டு வாருங்கள்: EPIC, ஆதார், பாஸ்போர்ட், மதிப்பாண்டு அட்டை அல்லது ஓட்டுநர் உரிமம்",
        "EVM (மின்னணு ஆட்சி மெশीன்) பயன்படுத்தப்படுகிறது",
        "VVPAT உங்கள் ஓட்டைக் 7 வினாடிகளுக்கு காட்டுகிறது",
        "ஆட்சி ரகசியமாக உள்ளது",
        "அனைத்து வேட்பாளர்களையும் நிராகரிக்கும் போது NOTA விருப்பம் கிடைக்கும்",
      ],
      bn: [
        "ভোটদান সময়: সাধারণত সকাল 7 টা থেকে সন্ধ্যা 6 টা পর্যন্ত",
        "বৈধ আইডি নিন: EPIC, আধার, পাসপোর্ট, রেশন কার্ড বা ড্রাইভিং লাইসেন্স",
        "EVM (ইলেকট্রনিক ভোটিং মেশিন) ব্যবহার করা হয়",
        "VVPAT আপনার ভোট 7 সেকেন্ডের জন্য দেখায়",
        "ভোটদান গোপনীয়",
        "সমস্ত প্রার্থীদের প্রত্যাখ্যান করলে NOTA বিকল্প উপলব্ধ",
      ],
    },
    officialLink: "https://voters.eci.gov.in",
    officialLinkText: {
      en: "Find Your Polling Booth",
      hi: "अपना मतदान केंद्र खोजें",
      te: "మీ పోలింగ్ బూత్ కనుగొనండి",
      ta: "உங்கள் வாக்குச்சாலை கண்டுபிடிக்கவும்",
      bn: "আপনার ভোটদান কেন্দ্র খুঁজুন",
    },
    chatPrompt: "How do I use an EVM? What is VVPAT and how does it work?",
  },
  {
    id: 6,
    icon: "📊",
    color: "teal",
    title: {
      en: "Counting & Results",
      hi: "मतगणना और परिणाम",
      te: "లెక్కింపు మరియు ఫలితాలు",
      ta: "எண்ணுதல் மற்றும் ফলাফல்",
      bn: "গণনা এবং ফলাফল",
    },
    shortDesc: {
      en: "Votes counted, results declared (typically 1-2 weeks after voting)",
      hi: "मतों की गणना की जाती है, परिणाम घोषित किए जाते हैं",
      te: "ఓటులు లెక్కించబడతాయి, ఫలితాలు ఘోషించబడతాయి",
      ta: "ஓட்டுகள் எண்ணப்படுகின்றன, முடிவுகள் ঘোषிக்கப்படுகின்றன",
      bn: "ভোট গণনা করা হয়, ফলাফল ঘোষণা করা হয়",
    },
    details: {
      en: "After voting concludes, the counting of votes begins at designated counting centers. The process is transparent with election observers from all political parties and media present. EVMs are opened under strict security protocols. The candidate with the most votes in the constituency wins. For nationwide Lok Sabha elections, results are aggregated and the party with the most seats forms the government.",
      hi: "मतदान समाप्त होने के बाद, मतों की गणना नामित गणना केंद्रों पर शुरू होती है। यह प्रक्रिया पारदर्शी है और सभी राजनीतिक दलों के चुनाव पर्यवेक्षक और मीडिया मौजूद होते हैं।",
      te: "ఆట ముగిసిన తరువాత, ఓటుల లెక్కింపు నియమిత లెక్కింపు కేంద్రాలలో ప్రారంభమవుతుంది. ఈ ప్రక్రియ పారదర్శకమైనది.",
      ta: "ஆட்சி முடிந்த பிறகு, ஓட்டுகளின் எண்ணுதல் குறிப்பிடப்பட்ட எண்ணும் மையங்களில் தொடங்குகிறது. இந்த செயல்முறை வெளிப்படையாக உள்ளது.",
      bn: "ভোটদান শেষ হওয়ার পরে, ভোট গণনা নির্ধারিত গণনা কেন্দ্রে শুরু হয়। এই প্রক্রিয়া স্বচ্ছ।",
    },
    keyFacts: {
      en: [
        "Counting typically happens 1-2 weeks after voting",
        "Process is transparent with election observers present",
        "Candidate with most votes in constituency wins",
        "ECI announces official results",
        "Winner's certificate issued by Returning Officer",
      ],
      hi: [
        "गणना आमतौर पर मतदान के 1-2 सप्ताह बाद होती है",
        "प्रक्रिया पारदर्शी है",
        "चुनाव क्षेत्र में सबसे अधिक वोट प्राप्त उम्मीदवार जीतता है",
        "ECI आधिकारिक परिणाम घोषित करता है",
        "Returning Officer द्वारा विजेता का प्रमाणपत्र जारी किया जाता है",
      ],
      te: [
        "లెక్కింపు సాధారణంగా ఓటింగ్ తర్వాత 1-2 వారాల్లో జరుగుతుంది",
        "ప్రక్రియ పారదర్శకమైనది",
        "నియోజకమండలంలో అత్యధిక ఓటులను పొందిన అభ్యర్థి విజయం సాధిస్తారు",
        "ECI అధికారిక ఫలితాలను ఘోషిస్తుంది",
        "Returning Officer చేత విజేతకు సర్టిఫికేట్ ఇవ్వబడుతుంది",
      ],
      ta: [
        "எண்ணுதல் வழக்கமாக ஓட்டெடுப்புக்குப் பின் 1-2 வாரங்களில் நடக்கிறது",
        "செயல்முறை வெளிப்படையாக உள்ளது",
        "நির்வாচன மண்டலத்தில் அதிக ஓட்டுகளைப் பெற்ற வேட்பாளர் வெற்றி பெறுகிறார்",
        "ECI அதிகாரப்பூர்வ முடிவுகளை ঘோषிக்கிறது",
        "Returning Officer சிறந்தவர்ப்பற்றி சான்றிதழ் வழங்குகிறார்",
      ],
      bn: [
        "গণনা সাধারণত ভোটদানের 1-2 সপ্তাহ পরে ঘটে",
        "প্রক্রিয়াটি স্বচ্ছ",
        "নির্বাচনী এলাকায় সবচেয়ে বেশি ভোট পাওয়া প্রার্থী জয়ী হন",
        "ECI অফিসিয়াল ফলাফল ঘোষণা করে",
        "Returning Officer দ্বারা বিজয়ীকে সার্টিফিকেট দেওয়া হয়",
      ],
    },
    officialLink: "https://eci.gov.in",
    officialLinkText: {
      en: "Election Results",
      hi: "चुनाव परिणाम",
      te: "ఎన్నిక ఫలితాలు",
      ta: "தேர்தல் ஃபலாফல்",
      bn: "নির্বাচন ফলাফল",
    },
    chatPrompt: "How are votes counted in Indian elections? Is the process transparent?",
  },
  {
    id: 7,
    icon: "🏛️",
    color: "indigo",
    title: {
      en: "Government Formation",
      hi: "सरकार का गठन",
      te: "ప్రభుత్వ ఏర్పాటు",
      ta: "அரசாங்கம் உருவாக்கம்",
      bn: "সরকার গঠন",
    },
    shortDesc: {
      en: "Party with majority forms government, takes oath of office",
      hi: "बहुमत वाली पार्टी सरकार बनाती है",
      te: "ఆ పార్టీ ప్రభుత్వాన్ని ఏర్పాటు చేస్తుంది",
      ta: "பக்ஷம் அரசாங்கம் உருவாக்கும்",
      bn: "বহুমত বিশিষ্ট পক্ষ সরকার গঠন করে",
    },
    details: {
      en: "After results are declared, the party or coalition with the most seats forms the government. The elected representatives take oath of office administered by the President (at national level) or Governor (at state level). The Chief Minister or Prime Minister and their Cabinet ministers are sworn in. The government then begins its tenure with the mandate received from the people.",
      hi: "परिणाम घोषित होने के बाद, सबसे अधिक सीटें प्राप्त करने वाली पार्टी या गठबंधन सरकार बनाता है। चुने हुए प्रतिनिधि राष्ट्रपति (राष्ट्रीय स्तर पर) या राज्यपाल (राज्य स्तर पर) द्वारा दिलाई गई शपथ लेते हैं।",
      te: "ఫలితాలు ఘోషణ కాసరిన తరువాత, చాలా సీట్లను కలిగి ఉన్న పార్టీ లేదా సంకీర్ణం ప్రభుత్వాన్ని ఏర్పాటు చేస్తుంది.",
      ta: "முடிவுகள் ஘ோஷணை செய்யப்பட்ட பின்னர், மிக அதிக இருக்கைகளைக் கொண்ட கட்சி அல்லது கூட்டணி அரசாங்கம் உருவாக்குகிறது.",
      bn: "ফলাফল ঘোষণার পর, সবচেয়ে বেশি আসন প্রাপ্ত পক্ষ বা জোট সরকার গঠন করে।",
    },
    keyFacts: {
      en: [
        "Party/coalition with majority seats forms government",
        "Chief Minister sworn in at state level",
        "Prime Minister sworn in at national level",
        "Cabinet ministers take oath of office",
        "Government's term is typically 5 years",
        "Mid-term elections possible if government loses majority",
      ],
      hi: [
        "बहुमत सीटें रखने वाली पार्टी/गठबंधन सरकार बनाता है",
        "मुख्यमंत्री को राज्य स्तर पर शपथ दिलाई जाती है",
        "प्रधानमंत्री को राष्ट्रीय स्तर पर शपथ दिलाई जाती है",
        "कैबिनेट मंत्रियों को शपथ दिलाई जाती है",
        "सरकार का कार्यकाल आमतौर पर 5 साल होता है",
      ],
      te: [
        "బహుమతి సీట్లను కలిగి ఉన్న పార్టీ/సంకీర్ణం ప్రభుత్వాన్ని ఏర్పాటు చేస్తుంది",
        "ముఖ్యమంత్రి రాష్ట్ర స్థాయిలో శపథ చేస్తారు",
        "ప్రధానమంత్రి జాతీయ స్థాయిలో శపథ చేస్తారు",
        "కేబినెట్ మంత్రులు శపథ చేస్తారు",
        "ప్రభుత్వ పదవీకాలం సాధారణంగా 5 సంవత్సరాలు",
      ],
      ta: [
        "பெரும்பான்மை இருக்கைகளைக் கொண்ட கட்சி/கூட்டணி அரசாங்கம் உருவாக்குகிறது",
        "முதல்வர் மாநில அளவில் சபதம் வாங்குகிறார்",
        "பிரதமர் தேசிய அளவில் சபதம் வாங்குகிறார்",
        "அமைச்சரவை மंत्रीs சபதம் வாங்குகிறார்",
        "அரசாங்கம் வழக்கமாக 5 ஆண்டுகள் கால",
      ],
      bn: [
        "বহুমত আসন সংখ্যাকারী পক্ষ/জোট সরকার গঠন করে",
        "মুখ্যমন্ত্রী রাজ্য স্তরে শপথ নেন",
        "প্রধানমন্ত্রী জাতীয় স্তরে শপথ নেন",
        "মন্ত্রিসভার সদস্যরা শপথ নেন",
        "সরকারের মেয়াদ সাধারণত 5 বছর",
      ],
    },
    officialLink: "https://pib.gov.in",
    officialLinkText: {
      en: "Government Info",
      hi: "सरकार जानकारी",
      te: "ప్రభుత్వ సమాచారం",
      ta: "அரசாங்க தகவல்",
      bn: "সরকার তথ্য",
    },
    chatPrompt: "How does the government form after elections? What happens after votes are counted?",
  },
];
