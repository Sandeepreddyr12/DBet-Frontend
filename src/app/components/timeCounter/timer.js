// <!-- component -->

// <div class="min-w-screen min-h-screen bg-yellow-500 flex items-center justify-center px-5 py-5" x-data="beer()" x-init="start()">
//     <div class="text-yellow-100">
//         <h1 class="text-3xl text-center mb-3 font-extralight">When will pubs open in England?*</h1>
//         <div class="text-6xl text-center flex w-full items-center justify-center">
//             <div class="text-2xl mr-1 font-extralight">in</div>
//             <div class="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
//                 <div class="font-mono leading-none" x-text="days">00</div>
//                 <div class="font-mono uppercase text-sm leading-none">Days</div>
//             </div>
//             <div class="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
//                 <div class="font-mono leading-none" x-text="hours">00</div>
//                 <div class="font-mono uppercase text-sm leading-none">Hours</div>
//             </div>
//             <div class="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
//                 <div class="font-mono leading-none" x-text="minutes">00</div>
//                 <div class="font-mono uppercase text-sm leading-none">Minutes</div>
//             </div>
//             <div class="text-2xl mx-1 font-extralight">and</div>
//             <div class="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
//                 <div class="font-mono leading-none" x-text="seconds">00</div>
//                 <div class="font-mono uppercase text-sm leading-none">Seconds</div>
//             </div>
//         </div>
//         <p class="text-sm text-center mt-3">*<a href="https://twitter.com/10DowningStreet/status/1363897254340419587" class="underline hover:text-yellow-200" target="_blank">As per goverment plan</a>. Subject to change.</p>
//     </div>
// </div>

// <script>
// function beer() {
//     return {
//         seconds: '00',
//         minutes: '00',
//         hours: '00',
//         days: '00',
//         distance: 0,
//         countdown: null,
//         beerTime: new Date('May 17, 2021 00:00:00').getTime(),
//         now: new Date().getTime(),
//         start: function() {
//             this.countdown = setInterval(() => {
//                 // Calculate time
//                 this.now = new Date().getTime();
//                 this.distance = this.beerTime - this.now;
//                 // Set Times
//                 this.days = this.padNum( Math.floor(this.distance / (1000*60*60*24)) );
//                 this.hours = this.padNum( Math.floor((this.distance % (1000*60*60*24)) / (1000*60*60)) );
//                 this.minutes = this.padNum( Math.floor((this.distance % (1000*60*60)) / (1000*60)) );
//                 this.seconds = this.padNum( Math.floor((this.distance % (1000*60)) / 1000) );
//                 // Stop
//                 if (this.distance < 0) {
//                     clearInterval(this.countdown);
//                     this.days = '00';
//                     this.hours = '00';
//                     this.minutes = '00';
//                     this.seconds = '00';
//                 }
//             },100);
//         },
//         padNum: function(num) {
//             var zero = '';
//             for (var i = 0; i < 2; i++) {
//                 zero += '0';
//             }
//             return (zero + num).slice(-2);
//         }
//     }
// }
// </script>

// <!-- BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES -->
// <div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
//     <div>
//         <a title="Buy me a beer" href="https://www.buymeacoffee.com/scottwindon" target="_blank" class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
//             <img class="object-cover object-center w-full h-full rounded-full" src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"/>
//         </a>
//     </div>
// </div>