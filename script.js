
        let alarmListArr = [];
        const currentDay = document.querySelector('h2');
        const currentTime = document.querySelector('h1');
        const selectMenu = document.querySelectorAll('select');
        const setAlarmBtn = document.querySelector("#alarm-btn");
        const alarmTitle = document.querySelector('h3');
        const alarm = document.querySelector('.alarmList');
        let ring = new Audio("./audio/alarmRing.mp3");
        let alarmCount = 0;
        let alarmTime;
        let isAlarmOn = false;



        

        // set Clock
        function updateClock(){

            //getting hours min and sec
            let date = new Date();

            let dnum = date.getDate();
                day = date.getDay(),
                month = date.getMonth(),
                year = date.getFullYear();
            let h = date.getHours(),
                m = date.getMinutes(),
                s = date.getSeconds();
            let ampm = "AM";


                Number.prototype.pad = function(digits){
                    for(var n = this.toString(); n.length<digits; n=0+n);
                    return n;
                }


                 // set am pm
             if(h > 12 ){
                h = h - 12;
                ampm = "PM";
            }else if(h == 12){
                h = 12;
                ampm = "PM";
            }
        
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var week = ["Sun", "Mon", "Tus", "Wed", "Thur", "Fri", "Sat"];
                var ids =["dayName", "month", "dayNum","year"];
                var values = [week[day], months[month], dnum.pad(2),year];
                
                for(var i=0; i<ids.length;i++){
                    document.getElementById(ids[i]).firstChild.nodeValue = values[i];
                }

               
                for(let i=0; i<alarmListArr.length;i++){
                    if(alarmListArr[i]==`${h.pad(2)}:${m.pad(2)}:${s.pad(2)} ${ampm}`){
                        
                       
                        console.log("Alarm ringing...");
                        // ring.load();
                        ring.play();
                        // ring.loop(true);
                        document.querySelector("#stopAlarm").style.visibility= "visible";
                        setTimeout(()=>{
                            stopAlarm();
                        },120000);
                        
                    }
                }
               

            
           
            
            //if value is 12 set value  to 0
            h = h == 0 ? h = 12 : h
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            s = s < 10 ? "0" + s : s;

           
            
            // currentDay.innerText = `${day}, ${month}, ${year}`;
            currentTime.innerText = `${h} : ${m} : ${s} ${ampm}`;

            

        };


        //Initialise the clock

        function initClock() {
            updateClock();
            window.setInterval("updateClock()",1000);
        }



        //set alarm section


        for (let i = 12; i > 0; i--) {
            i = i < 10 ? "0" + i : i;
            let option = `<option value="${i}">${i}</option>`;
            selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
        }

        for (let i = 59; i >= 0; i--) {
            i = i < 10 ? "0" + i : i;
            let option = `<option value="${i}">${i}</option>`;
            selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
        }

       

        for (let i = 2; i > 0; i--) {
            let ampm = i == 1 ? "AM" : "PM";
            let option = `<option value="${ampm}">${ampm}</option>`;
            selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
        }

        //Set alaram
        function setAlarm(){
            
            let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
            if(time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
                alert("Please, Select Valide Input");
            }else{
                
                document.querySelector("#alarm-h3").innerText = "Alarms";
                
                alarmCount++;
                document.querySelector(".alarmList").innerHTML += `
                <div class="alarmLog" id="alarm${alarmCount}">
                    <span id="span${alarmCount}">${time}</span>
                    <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
                </div>`;
        
                alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
                console.log(alarmTime);
                alarmListArr.push(alarmTime);

            }
        
        }


        //delete alarm

        function deleteAlarm(click_id){
            var element = document.getElementById("alarm"+click_id);
            var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
            alarmListArr.splice(deleteIndex,1);
            element.remove();
            if(alarmListArr.length ==0){
                document.querySelector("#alarm-h3").innerText = "";

            }
        }
        
        

        setAlarmBtn.addEventListener('click',setAlarm);

        //To stop Alarm

        function stopAlarm(){
            console.log("In stop alarm ")
            ring.pause();
            document.querySelector("#stopAlarm").style.visibility= "hidden";

        }
