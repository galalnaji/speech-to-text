let recognition;

// التحقق من دعم المتصفح لـ Web Speech API
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.interimResults = false;

    // تفعيل وضع التسجيل المستمر
    recognition.continuous = true;
} else {
    alert("ميزة التعرف على الصوت غير مدعومة في هذا المتصفح.");
}

function startRecording() {
    if (!recognition) return;

    recognition.start();

    recognition.onstart = function () {
        console.log("التسجيل بدأ...");
    };

    recognition.onresult = function (event) {
        const transcript = event.results[event.results.length - 1][0].transcript;
        const userInputElement = document.getElementById("userInput");

        // إضافة النص الجديد إلى النص الموجود مسبقًا
        userInputElement.value += transcript + " ";
        console.log("النص المسجل:", transcript);
    };

    recognition.onerror = function (event) {
        console.error("حدث خطأ أثناء التسجيل:", event.error);
        alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
    };

    recognition.onend = function () {
        console.log("التسجيل انتهى.");
        // لا يُعاد تشغيل التسجيل تلقائيًا لتجنب التعارض
    };
}

function stopRecording() {
    if (recognition) {
        recognition.stop();
        console.log("التسجيل توقف.");
    }
}
