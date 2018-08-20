(function(){

    var video = document.getElementById('video');
    var vendorUrl = window.URL || window.webkitURL;
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var photo = document.getElementById('photo');
    var deg_left;
    var deg_right;
    //////////////////////////////////////////////
    var left_shoulder_score;
    var left_shoulder_position_x;
    var left_shoulder_position_y;

    var left_elbow_score;
    var left_elbow_position_x;
    var left_elbow_position_y;

    var right_shoulder_score;
    var right_shoulder_position_x;
    var right_shoulder_position_y;

    var right_elbow_score;
    var right_elbow_position_x;
    var right_elbow_position_y;

    navigator.getMedia =    navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

    navigator.getMedia({
        video: true,
        audio:false,
        },
        function(stream){
            video.src = vendorUrl.createObjectURL(stream);
            video.play();
        },
        function(error){
    });

    //document.getElementById('capture').addEventListener('click', function(){
    function posenetfunc(){
        context.drawImage(video, 0, 0, 200, 120);
        photo.setAttribute('src', canvas.toDataURL('image/png'));


    /////////////////////////POSENET///////////////////////

    var imageScaleFactor = 0.5;
    var outputStride = 16;
    var flipHorizontal = false;

    var imageElement = document.getElementById('photo');

    posenet.load().then(function(net){
      return net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride)
    }).then(function(pose_tmp){
      pose = pose_tmp;
      //console.log(pose);

      left_shoulder_score = pose.keypoints[5].score;
      left_shoulder_position_x = pose.keypoints[5].position.x;
      left_shoulder_position_y = pose.keypoints[5].position.y;

      left_elbow_score = pose.keypoints[7].score;
      left_elbow_position_x = pose.keypoints[7].position.x;
      left_elbow_position_y = pose.keypoints[7].position.y;

      right_shoulder_score = pose.keypoints[6].score;
      right_shoulder_position_x = pose.keypoints[6].position.x;
      right_shoulder_position_y = pose.keypoints[6].position.y;

      right_elbow_score = pose.keypoints[8].score;
      right_elbow_position_x = pose.keypoints[8].position.x;
      right_elbow_position_y = pose.keypoints[8].position.y;

    })

    console.log("left_shoulder_score :", left_shoulder_score);
    //console.log("left_shoulder_position_x :", left_shoulder_position_x);
    //console.log("left_shoulder_position_y :", left_shoulder_position_y);

    console.log("left_elbow_score :", left_elbow_score);
    //console.log("left_elbow_position_x :", left_elbow_position_x);
    //console.log("left_elbow_position_y :", left_elbow_position_y);

    console.log("right_shoulder_score :", right_shoulder_score);
    //console.log("right_shoulder_position_x :", right_shoulder_position_x);
    //console.log("right_shoulder_position_y :", right_shoulder_position_y);

    console.log("right_elbow_score :", right_elbow_score);
    //console.log("right_elbow_position_x :", right_elbow_position_x);
    //console.log("right_elbow_position_y :", right_elbow_position_y);

    if(left_shoulder_score > 0.75 && left_elbow_score > 0.75){
        var deltaX_left = left_elbow_position_x - left_shoulder_position_x;
        var deltaY_left = left_elbow_position_y - left_shoulder_position_y;
        var rad_left = Math.atan2(deltaY_left, deltaX_left); // In radians
        deg_right = rad_left * (180 / Math.PI);
        console.log("deg left :", deg_right);

    }

    if(right_shoulder_score > 0.75 && right_elbow_score > 0.75){
        var deltaX_right = right_elbow_position_x - right_shoulder_position_x;
        var deltaY_right = right_elbow_position_y - right_shoulder_position_y;
        var rad_right = Math.atan2(deltaY_right, deltaX_right); // In radians
        deg_left = rad_right * (180 / Math.PI);
        console.log("deg right :", deg_left);
    }

    if(deg_left > -20 && deg_left < 40 && deg_right < 125 && deg_right > 100){
        console.log("MOVE LEFT***");
        leftbuttondefault();
    }

    //if(deg_left < -35 && -100 > deg_right && deg_right > -150){
    //if(-40 > deg_right && deg_right > -60){
    if(deg_left > -20 && deg_left < 40 && (deg_right > 135 || deg_right < -160)){
        console.log("MOVE UP***");
        upbuttondefault();
    }

    if(deg_left > 50 && deg_left < 80 && (deg_right > 135 || deg_right < -160)){
        console.log("MOVE RIGHT***");
        rightbuttondefault();
    }

    //if(-100 > deg_right && deg_right > -150){
    //    console.log("MOVE UP2***");
    //}

    //if(deg_left > 65 && deg_right < 115 && deg_right > 100){
    if(deg_left > 50 && deg_left < 80 && deg_right < 125 && deg_right > 100){
        console.log("MOVE Down***");
        downbuttondefault();
    }
    console.log("*****************************");
    /////////////////////////POSENET END///////////////////////
    } //end posenetfunc

    setInterval(posenetfunc, 1000);
    //}); // End of event listener
//var deltaX = x2 - x1;
//var deltaY = y2 - y1;
//var rad = Math.atan2(deltaY, deltaX); // In radians
//var deg = rad * (180 / Math.PI);


    function downbuttondefault(){
         var myvar = document.getElementById("cargo").style.marginTop;
        //document.getElementById("box").style.top = document.getElementById("box").style.top +"50px";
        //myvar = myvar.replace('px','');
        //console.log("runs", myvar);
        var myinteger = parseInt(myvar, 10);
        console.log("runs" , myinteger);
        myinteger = myinteger + 10;
        var mystring = myinteger.toString();
        console.log("runs again" , mystring);
        mystring = mystring + "px";
        console.log("runs again" , mystring);
        document.getElementById("cargo").style.marginTop = mystring;
        if(myinteger == 700){
            document.getElementById("cargo").style.marginTop = "0px";
        }
    }

    function upbuttondefault(){
    	 var myvar = document.getElementById("cargo").style.marginTop;
        //document.getElementById("box").style.top = document.getElementById("box").style.top +"50px";
        //myvar = myvar.replace('px','');
        //console.log("runs", myvar);
        var myinteger = parseInt(myvar, 10);
        console.log("runs" , myinteger);
        myinteger = myinteger - 10;
        var mystring = myinteger.toString();
        console.log("runs again" , mystring);
        mystring = mystring + "px";
        console.log("runs again" , mystring);
        document.getElementById("cargo").style.marginTop = mystring;
        if(myinteger == 0){
        	document.getElementById("cargo").style.marginTop = "700px";
        }
    }

    function rightbuttondefault(){
    	 var myvar = document.getElementById("cargo").style.marginLeft;
        //document.getElementById("box").style.top = document.getElementById("box").style.top +"50px";
        //myvar = myvar.replace('px','');
        //console.log("runs", myvar);
        var myinteger = parseInt(myvar, 10);
        console.log("runs" , myinteger);
        myinteger = myinteger + 10;
        var mystring = myinteger.toString();
        console.log("runs again" , mystring);
        mystring = mystring + "px";
        console.log("runs again" , mystring);
        document.getElementById("cargo").style.marginLeft = mystring;
        if(myinteger == 1200){
        document.getElementById("cargo").style.marginLeft = "0px";
        }
    }

    function leftbuttondefault(){
    	 var myvar = document.getElementById("cargo").style.marginLeft;
        //document.getElementById("box").style.top = document.getElementById("box").style.top +"50px";
        //myvar = myvar.replace('px','');
        //console.log("runs", myvar);
        var myinteger = parseInt(myvar, 10);
        console.log("runs" , myinteger);
        myinteger = myinteger - 10;
        var mystring = myinteger.toString();
        console.log("runs again" , mystring);
        mystring = mystring + "px";
        console.log("runs again" , mystring);
        document.getElementById("cargo").style.marginLeft = mystring;
        if(myinteger == 0){
        document.getElementById("cargo").style.marginLeft = "1200px";
        }
    }

})();