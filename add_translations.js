const fs = require('fs');

const enCollab = {
    "academic": {
        "title": "Students & Innovators",
        "items": {
            "0": { "heading": "Hands-on Projects", "desc": "Building real-world prototypes and earning practical engineering experience." },
            "1": { "heading": "Skill Development", "desc": "Deep dives into AI, IoT, and emerging technologies through guided workshops." },
            "2": { "heading": "Industry Exposure", "desc": "Solving live problems from top companies to become career-ready." },
            "3": { "heading": "Mentorship", "desc": "Expert guidance for research, prestigious internships, and startup ventures." }
        }
    },
    "industry": {
        "title": "Industry & Startups",
        "items": {
            "0": { "heading": "Customized Solutions", "desc": "Tailored engineering to solve your most challenging business problems." },
            "1": { "heading": "Core Tech R&D", "desc": "Advanced development in AI, IoT, and high-security system architectures." },
            "2": { "heading": "Rapid Prototyping", "desc": "Moving from initial concept to pilot deployment with extreme speed." },
            "3": { "heading": "Scalable Systems", "desc": "Production-ready, battle-tested solutions designed for market expansion." }
        }
    },
    "startup": {
        "title": "Faculty & Researchers",
        "items": {
            "0": { "heading": "Research Prototypes", "desc": "Converting academic research into functional, industry-grade prototypes." },
            "1": { "heading": "Project Support", "desc": "Assistance with funded project proposals and strategic grant applications." },
            "2": { "heading": "Technology Transfer", "desc": "Direct industry collaboration and commercialization of intellectual capital." },
            "3": { "heading": "Deployment Support", "desc": "Data-driven validation and real-world deployment of academic solutions." }
        }
    }
};

const enBoard = {
    "sukhdevName": "Dr. Sukhdev Singh",
    "sukhdevEdu": "Ph.D. (IIT Patna)",
    "sukhdevRole": "Co-Founder & Director (Research & Strategy)",
    "sukhdevBio": "A passionate researcher and strategic visionary with deep expertise in transforming complex ideas into scalable technological solutions.",
    "sukhdevAch1": "Ph.D. in Computer Science & Engineering from IIT Patna.",
    "sukhdevAch2": "Pioneered research in AI, IoT & Smart Systems.",
    "sukhdevAch3": "Published numerous patents & high-impact research papers.",
    "sangitaName": "Dr. Sangita Roy",
    "sangitaEdu": "Ph.D. (IIT Patna)",
    "sangitaRole": "Co-Founder & Director (Innovation & Technology)",
    "sangitaBio": "An innovative technologist and academician dedicated to developing sustainable, research-led prototypes with real-world industry applications.",
    "sangitaAch1": "Ph.D. in Computer Science & Engineering from IIT Patna.",
    "sangitaAch2": "Expertise in Machine Learning & Health Informatics.",
    "sangitaAch3": "Led multiple technology transfer initiatives & prototype developments."
};

const hiCollab = {
    "academic": {
        "title": "छात्र और नवाचारकर्ता",
        "items": {
            "0": { "heading": "व्यावहारिक प्रोजेक्ट्स", "desc": "वास्तविक दुनिया के प्रोटोटाइप बनाना और व्यावहारिक इंजीनियरिंग अनुभव प्राप्त करना।" },
            "1": { "heading": "कौशल विकास", "desc": "निर्देशित कार्यशालाओं के माध्यम से एआई, आईओटी और उभरती प्रौद्योगिकियों में गहन अध्ययन।" },
            "2": { "heading": "उद्योग अनुभव", "desc": "शीर्ष कंपनियों की वास्तविक समस्याओं को हल करके करियर के लिए तैयार होना।" },
            "3": { "heading": "मेंटरशिप", "desc": "शोध, प्रतिष्ठित इंटर्नशिप और स्टार्टअप वेंचर्स के लिए विशेषज्ञ मार्गदर्शन।" }
        }
    },
    "industry": {
        "title": "उद्योग और स्टार्टअप",
        "items": {
            "0": { "heading": "अनुकूलित समाधान", "desc": "आपकी सबसे चुनौतीपूर्ण व्यावसायिक समस्याओं को हल करने के लिए अनुकूलित इंजीनियरिंग।" },
            "1": { "heading": "कोर टेक अनुसंधान", "desc": "एआई, आईओटी और उच्च सुरक्षा प्रणाली आर्किटेक्चर में उन्नत विकास।" },
            "2": { "heading": "तेज़ प्रोटोटाइपिंग", "desc": "प्रारंभिक अवधारणा से पायलट परिनियोजन तक अत्यधिक गति के साथ बढ़ना।" },
            "3": { "heading": "स्केलेबल सिस्टम", "desc": "बाजार विस्तार के लिए डिज़ाइन किए गए उत्पादन-तैयार, युद्ध-परीक्षणित समाधान।" }
        }
    },
    "startup": {
        "title": "संकाय और शोधकर्ता",
        "items": {
            "0": { "heading": "अनुसंधान प्रोटोटाइप", "desc": "शैक्षणिक अनुसंधान को कार्यात्मक, उद्योग-ग्रेड प्रोटोटाइप में बदलना।" },
            "1": { "heading": "परियोजना समर्थन", "desc": "वित्त पोषित परियोजना प्रस्तावों और रणनीतिक अनुदान आवेदनों के साथ सहायता।" },
            "2": { "heading": "प्रौद्योगिकी हस्तांतरण", "desc": "प्रत्यक्ष उद्योग सहयोग और बौद्धिक पूंजी का व्यवसायीकरण।" },
            "3": { "heading": "परिनियोजन समर्थन", "desc": "डेटा-संचालित सत्यापन और शैक्षणिक समाधानों का वास्तविक दुनिया में परिनियोजन।" }
        }
    }
};

const hiBoard = {
    "sukhdevName": "डॉ. सुखदेव सिंह",
    "sukhdevEdu": "पीएचडी (आईआईटी पटना)",
    "sukhdevRole": "सह-संस्थापक और निदेशक (अनुसंधान और रणनीति)",
    "sukhdevBio": "एक भावुक शोधकर्ता और रणनीतिक दूरदर्शी जो जटिल विचारों को स्केलेबल तकनीकी समाधानों में बदलने में गहरी विशेषज्ञता रखते हैं।",
    "sukhdevAch1": "आईआईटी पटना से कंप्यूटर विज्ञान और इंजीनियरिंग में पीएच.डी।",
    "sukhdevAch2": "एआई, आईओटी और स्मार्ट सिस्टम में अग्रणी शोध।",
    "sukhdevAch3": "कई पेटेंट और उच्च प्रभाव वाले शोध पत्र प्रकाशित किए।",
    "sangitaName": "डॉ. संगीता रॉय",
    "sangitaEdu": "पीएचडी (आईआईटी पटना)",
    "sangitaRole": "सह-संस्थापक और निदेशक (नवाचार और प्रौद्योगिकी)",
    "sangitaBio": "एक नवीन प्रौद्योगिकीविद् और शिक्षाविद जो वास्तविक दुनिया के उद्योग अनुप्रयोगों के साथ टिकाऊ, शोध-आधारित प्रोटोटाइप विकसित करने के लिए समर्पित हैं।",
    "sangitaAch1": "आईआईटी पटना से कंप्यूटर विज्ञान और इंजीनियरिंग में पीएच.डी।",
    "sangitaAch2": "मशीन लर्निंग और स्वास्थ्य सूचना विज्ञान में विशेषज्ञता।",
    "sangitaAch3": "कई प्रौद्योगिकी हस्तांतरण पहलों और प्रोटोटाइप विकास का नेतृत्व किया।"
};

const paCollab = {
    "academic": {
        "title": "ਵਿਦਿਆਰਥੀ ਅਤੇ ਨਵੀਨਤਾਕਾਰੀ",
        "items": {
            "0": { "heading": "ਹੱਥੀਂ ਪ੍ਰੋਜੈਕਟ", "desc": "ਅਸਲ-ਦੁਨੀਆ ਦੇ ਪ੍ਰੋਟੋਟਾਈਪ ਬਣਾਉਣਾ ਅਤੇ ਵਿਹਾਰਕ ਇੰਜੀਨੀਅਰਿੰਗ ਦਾ ਤਜਰਬਾ ਹਾਸਲ ਕਰਨਾ।" },
            "1": { "heading": "ਹੁਨਰ ਵਿਕਾਸ", "desc": "ਗਾਈਡਡ ਵਰਕਸ਼ਾਪਾਂ ਰਾਹੀਂ AI, IoT ਅਤੇ ਉਭਰਦੀਆਂ ਤਕਨੀਕਾਂ ਵਿੱਚ ਡੂੰਘੀ ਜਾਣਕਾਰੀ।" },
            "2": { "heading": "ਉਦਯੋਗ ਦਾ ਤਜਰਬਾ", "desc": "ਕਰੀਅਰ ਲਈ ਤਿਆਰ ਹੋਣ ਲਈ ਚੋਟੀ ਦੀਆਂ ਕੰਪਨੀਆਂ ਦੀਆਂ ਅਸਲ ਸਮੱਸਿਆਵਾਂ ਨੂੰ ਹੱਲ ਕਰਨਾ।" },
            "3": { "heading": "ਮਾਰਗਦਰਸ਼ਨ", "desc": "ਖੋਜ, ਵੱਕਾਰੀ ਇੰਟਰਨਸ਼ਿਪਾਂ ਅਤੇ ਸਟਾਰਟਅੱਪ ਉੱਦਮਾਂ ਲਈ ਮਾਹਰ ਮਾਰਗਦਰਸ਼ਨ।" }
        }
    },
    "industry": {
        "title": "ਉਦਯੋਗ ਅਤੇ ਸਟਾਰਟਅੱਪ",
        "items": {
            "0": { "heading": "ਅਨੁਕੂਲਿਤ ਹੱਲ", "desc": "ਤੁਹਾਡੀਆਂ ਸਭ ਤੋਂ ਚੁਣੌਤੀਪੂਰਨ ਵਪਾਰਕ ਸਮੱਸਿਆਵਾਂ ਨੂੰ ਹੱਲ ਕਰਨ ਲਈ ਅਨੁਕੂਲਿਤ ਇੰਜੀਨੀਅਰਿੰਗ।" },
            "1": { "heading": "ਕੋਰ ਤਕਨੀਕੀ ਖੋਜ", "desc": "AI, IoT, ਅਤੇ ਉੱਚ-ਸੁਰੱਖਿਆ ਸਿਸਟਮ ਆਰਕੀਟੈਕਚਰ ਵਿੱਚ ਉੱਨਤ ਵਿਕਾਸ।" },
            "2": { "heading": "ਤੇਜ਼ ਪ੍ਰੋਟੋਟਾਈਪਿੰਗ", "desc": "ਸ਼ੁਰੂਆਤੀ ਸੰਕਲਪ ਤੋਂ ਪਾਇਲਟ ਤੈਨਾਤੀ ਤੱਕ ਬਹੁਤ ਤੇਜ਼ੀ ਨਾਲ ਵਧਣਾ।" },
            "3": { "heading": "ਸਕੇਲੇਬਲ ਸਿਸਟਮ", "desc": "ਬਜ਼ਾਰ ਦੇ ਵਿਸਥਾਰ ਲਈ ਤਿਆਰ ਕੀਤੇ ਉਤਪਾਦਨ-ਤਿਆਰ, ਯੁੱਧ-ਪ੍ਰਮਾਣਿਤ ਹੱਲ।" }
        }
    },
    "startup": {
        "title": "ਫੈਕਲਟੀ ਅਤੇ ਖੋਜਕਰਤਾ",
        "items": {
            "0": { "heading": "ਖੋਜ ਪ੍ਰੋਟੋਟਾਈਪ", "desc": "ਅਕਾਦਮਿਕ ਖੋਜ ਨੂੰ ਕਾਰਜਸ਼ੀਲ, ਉਦਯੋਗ-ਗ੍ਰੇਡ ਪ੍ਰੋਟੋਟਾਈਪਾਂ ਵਿੱਚ ਬਦਲਣਾ।" },
            "1": { "heading": "ਪ੍ਰੋਜੈਕਟ ਸਹਾਇਤਾ", "desc": "ਫੰਡ ਪ੍ਰਾਪਤ ਪ੍ਰੋਜੈਕਟ ਪ੍ਰਸਤਾਵਾਂ ਅਤੇ ਰਣਨੀਤਕ ਗ੍ਰਾਂਟ ਅਰਜ਼ੀਆਂ ਲਈ ਸਹਾਇਤਾ।" },
            "2": { "heading": "ਤਕਨਾਲੋਜੀ ਟ੍ਰਾਂਸਫਰ", "desc": "ਸਿੱਧਾ ਉਦਯੋਗਿਕ ਸਹਿਯੋਗ ਅਤੇ ਬੌਧਿਕ ਪੂੰਜੀ ਦਾ ਵਪਾਰੀਕਰਨ।" },
            "3": { "heading": "ਤੈਨਾਤੀ ਸਹਾਇਤਾ", "desc": "ਡਾਟਾ-ਅਧਾਰਿਤ ਪ੍ਰਮਾਣਿਕਤਾ ਅਤੇ ਅਕਾਦਮਿਕ ਹੱਲਾਂ ਦੀ ਅਸਲ-ਦੁਨੀਆ ਵਿੱਚ ਤੈਨਾਤੀ।" }
        }
    }
};

const paBoard = {
    "sukhdevName": "ਡਾ. ਸੁਖਦੇਵ ਸਿੰਘ",
    "sukhdevEdu": "ਪੀਐਚਡੀ (ਆਈਆਈਟੀ ਪਟਨਾ)",
    "sukhdevRole": "ਕੋ-ਫਾਊਂਡਰ ਅਤੇ ਡਾਇਰੈਕਟਰ (ਖੋਜ ਅਤੇ ਰਣਨੀਤੀ)",
    "sukhdevBio": "ਇੱਕ ਭਾਵੁਕ ਖੋਜਕਰਤਾ ਅਤੇ ਰਣਨੀਤਕ ਦੂਰਅੰਦੇਸ਼ੀ ਜੋ ਗੁੰਝਲਦਾਰ ਵਿਚਾਰਾਂ ਨੂੰ ਸਕੇਲੇਬਲ ਤਕਨੀਕੀ ਹੱਲਾਂ ਵਿੱਚ ਬਦਲਣ ਵਿੱਚ ਡੂੰਘੀ ਮੁਹਾਰਤ ਰੱਖਦੇ ਹਨ।",
    "sukhdevAch1": "ਆਈਆਈਟੀ ਪਟਨਾ ਤੋਂ ਕੰਪਿਊਟਰ ਸਾਇੰਸ ਅਤੇ ਇੰਜੀਨੀਅਰਿੰਗ ਵਿੱਚ ਪੀਐਚ.ਡੀ.",
    "sukhdevAch2": "AI, IoT ਅਤੇ ਸਮਾਰਟ ਸਿਸਟਮਾਂ ਵਿੱਚ ਮੋਹਰੀ ਖੋਜ।",
    "sukhdevAch3": "ਕਈ ਪੇਟੈਂਟ ਅਤੇ ਉੱਚ-ਪ੍ਰਭਾਵ ਵਾਲੇ ਖੋਜ ਪੱਤਰ ਪ੍ਰਕਾਸ਼ਿਤ ਕੀਤੇ।",
    "sangitaName": "ਡਾ. ਸੰਗੀਤਾ ਰਾਏ",
    "sangitaEdu": "ਪੀਐਚਡੀ (ਆਈਆਈਟੀ ਪਟਨਾ)",
    "sangitaRole": "ਕੋ-ਫਾਊਂਡਰ ਅਤੇ ਡਾਇਰੈਕਟਰ (ਇਨੋਵੇਸ਼ਨ ਅਤੇ ਤਕਨਾਲੋਜੀ)",
    "sangitaBio": "ਇੱਕ ਨਵੀਨਤਾਕਾਰੀ ਤਕਨਾਲੋਜੀ ਮਾਹਰ ਅਤੇ ਅਕਾਦਮਿਕ ਜੋ ਅਸਲ-ਦੁਨੀਆ ਦੇ ਉਦਯੋਗਿਕ ਉਪਯੋਗਾਂ ਦੇ ਨਾਲ ਟਿਕਾਊ, ਖੋਜ-ਆਧਾਰਿਤ ਪ੍ਰੋਟੋਟਾਈਪ ਵਿਕਸਿਤ ਕਰਨ ਲਈ ਸਮਰਪਿਤ ਹਨ।",
    "sangitaAch1": "ਆਈਆਈਟੀ ਪਟਨਾ ਤੋਂ ਕੰਪਿਊਟਰ ਸਾਇੰਸ ਅਤੇ ਇੰਜੀਨੀਅਰਿੰਗ ਵਿੱਚ ਪੀਐਚ.ਡੀ.",
    "sangitaAch2": "ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਅਤੇ ਹੈਲਥ ਇਨਫੋਰਮੈਟਿਕਸ ਵਿੱਚ ਮੁਹਾਰਤ।",
    "sangitaAch3": "ਕਈ ਤਕਨਾਲੋਜੀ ਟ੍ਰਾਂਸਫਰ ਪਹਿਲਕਦਮੀਆਂ ਅਤੇ ਪ੍ਰੋਟੋਟਾਈਪ ਵਿਕਾਸ ਦੀ ਅਗਵਾਈ ਕੀਤੀ।"
};

const bnCollab = {
    "academic": {
        "title": "ছাত্র ও উদ্ভাবক",
        "items": {
            "0": { "heading": "হাতে-কলমে প্রকল্প", "desc": "বাস্তব-বিশ্বের প্রোটোটাইপ তৈরি করা এবং ব্যবহারিক ইঞ্জিনিয়ারিং অভিজ্ঞতা অর্জন করা।" },
            "1": { "heading": "দক্ষতা উন্নয়ন", "desc": "গাইডেড ওয়ার্কশপের মাধ্যমে এআই, আইওটি এবং উদীয়মান প্রযুক্তিতে গভীর জ্ঞান।" },
            "2": { "heading": "শিল্প অভিজ্ঞতা", "desc": "ক্যারিয়ারের জন্য প্রস্তুত হতে শীর্ষ কোম্পানিগুলোর বাস্তব সমস্যা সমাধান করা।" },
            "3": { "heading": "মেন্টরশিপ", "desc": "গবেষণা, মর্যাদাপূর্ণ ইন্টার্নশিপ এবং স্টার্টআপ উদ্যোগের জন্য বিশেষজ্ঞ দিকনির্দেশনা।" }
        }
    },
    "industry": {
        "title": "শিল্প ও স্টার্টআপ",
        "items": {
            "0": { "heading": "কাস্টমাইজড সমাধান", "desc": "আপনার সবচেয়ে চ্যালেঞ্জিং ব্যবসায়িক সমস্যা সমাধানের জন্য কাস্টমাইজড ইঞ্জিনিয়ারিং।" },
            "1": { "heading": "কোর টেক গবেষণা", "desc": "এআই, আইওটি এবং উচ্চ-সুরক্ষা সিস্টেম আর্কিটেকচারে উন্নত বিকাশ।" },
            "2": { "heading": "দ্রুত প্রোটোটাইপিং", "desc": "প্রাথমিক ধারণা থেকে পাইলট স্থাপনে অত্যন্ত দ্রুতগতিতে অগ্রসর হওয়া।" },
            "3": { "heading": "স্কেলেবল সিস্টেম", "desc": "বাজার সম্প্রসারণের জন্য ডিজাইন করা উত্পাদন-প্রস্তুত, পরীক্ষিত সমাধান।" }
        }
    },
    "startup": {
        "title": "শিক্ষক ও গবেষক",
        "items": {
            "0": { "heading": "গবেষণা প্রোটোটাইপ", "desc": "একাডেমিক গবেষণাকে কার্যকরী, শিল্প-মানের প্রোটোটাইপে রূপান্তর করা।" },
            "1": { "heading": "প্রকল্প সমর্থন", "desc": "অর্থায়িত প্রকল্প প্রস্তাব এবং কৌশলগত অনুদান আবেদনের জন্য সহায়তা।" },
            "2": { "heading": "প্রযুক্তি হস্তান্তর", "desc": "সরাসরি শিল্প সহযোগিতা এবং বুদ্ধিবৃত্তিক মূলধনের বাণিজ্যিকীকরণ।" },
            "3": { "heading": "নিয়োগ সমর্থন", "desc": "ডেটা-চালিত যাচাইকরণ এবং একাডেমিক সমাধানগুলোর বাস্তব-বিশ্বে প্রয়োগ।" }
        }
    }
};

const bnBoard = {
    "sukhdevName": "ড. সুখদেব সিং",
    "sukhdevEdu": "পিএইচডি (আইআইটি পাটনা)",
    "sukhdevRole": "সহ-প্রতিষ্ঠাতা ও পরিচালক (গবেষণা ও কৌশল)",
    "sukhdevBio": "একজন উত্সাহী গবেষক এবং কৌশলগত স্বপ্নদর্শী যার জটিল ধারণাগুলোকে স্কেলেবল প্রযুক্তিগত সমাধানে রূপান্তর করতে গভীর দক্ষতা রয়েছে।",
    "sukhdevAch1": "আইআইটি পাটনা থেকে কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিং-এ পিএইচডি।",
    "sukhdevAch2": "এআই, আইওটি এবং স্মার্ট সিস্টেমে অগ্রণী গবেষণা।",
    "sukhdevAch3": "একাধিক পেটেন্ট এবং উচ্চ-প্রভাবশালী গবেষণাপত্র প্রকাশ করেছেন।",
    "sangitaName": "ড. সঙ্গীতা রায়",
    "sangitaEdu": "পিএইচডি (আইআইটি পাটনা)",
    "sangitaRole": "সহ-প্রতিষ্ঠাতা ও পরিচালক (উদ্ভাবন ও প্রযুক্তি)",
    "sangitaBio": "একজন উদ্ভাবনী প্রযুক্তিবিদ এবং শিক্ষাবিদ যিনি বাস্তব-বিশ্বের শিল্প প্রয়োগের সাথে টেকসই, গবেষণা-নেতৃত্বাধীন প্রোটোটাইপ তৈরি করতে নিবেদিত।",
    "sangitaAch1": "আইআইটি পাটনা থেকে কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিং-এ পিএইচডি।",
    "sangitaAch2": "মেশিন লার্নিং এবং হেলথ ইনফরমেটিক্স-এ দক্ষতা।",
    "sangitaAch3": "একাধিক প্রযুক্তি হস্তান্তর উদ্যোগ এবং প্রোটোটাইপ বিকাশে নেতৃত্ব দিয়েছেন।"
};

const files = [
    { path: 'messages/en.json', collab: enCollab, board: enBoard },
    { path: 'messages/hi.json', collab: hiCollab, board: hiBoard },
    { path: 'messages/pa.json', collab: paCollab, board: paBoard },
    { path: 'messages/bn.json', collab: bnCollab, board: bnBoard }
];

for (const file of files) {
    const data = JSON.parse(fs.readFileSync(file.path, 'utf8'));
    data.collaboration = file.collab;
    data.aboutBoard = file.board;
    fs.writeFileSync(file.path, JSON.stringify(data, null, 4));
}

console.log("Updated translation files!");
