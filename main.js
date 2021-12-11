prediction1="";
prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">'
    })
}

console.log("ml5.version:", ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LR6_SNUwo/model.json',ModelLoaded);
function ModelLoaded(){
    console.log("model is initialized")
}

function speak(){
synth=window.speechSynthesis;
speak_data1="the first prediction is"+prediction1;
speak_data2="and the second prediction is"+prediction2;
utterthis= new SpeechSynthesisUtterance(speak_data1+speak_data2);
synth.speak(utterthis);
}

function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img, gotresults);
}

function gotresults(error, result){
if (error){
console.error(error);
}
else {
    console.log(result);
    document.getElementById("result_emotion_name").innerHTML=result[0].label;
    document.getElementById("result_emotion_name2").innerHTML=result[1].label;

    prediction1=result[0].label;
    prediction2=result[1].label;

    speak();

    if(result[0].label=="Happy"){
        document.getElementById("update_emoji").innerHTML="&#128522";

    }
    if(result[0].label=="Sad"){
        document.getElementById("update_emoji").innerHTML="&#128532";
        
    }
    if(result[0].label=="Angry"){
        document.getElementById("update_emoji").innerHTML="&#128548";
        
    }

    if(result[1].label=="Happy"){
        document.getElementById("update_emoji2").innerHTML="&#128522";

    }
    if(result[1].label=="Sad"){
        document.getElementById("update_emoji2").innerHTML="&#128532";
        
    }
    if(result[1].label=="Angry"){
        document.getElementById("update_emoji2").innerHTML="&#128548";
        
    }
}
}