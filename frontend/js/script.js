// $(function()
// {
//     var playerTrack = $("#player-track");
// 	var bgArtwork = $('#bg-artwork');
// 	var bgArtworkUrl;
// 	var albumName = $('#album-name');
// 	var trackName = $('#track-name');
// 	var albumArt = $('#album-art'),
// 		sArea = $('#s-area'),
// 		seekBar = $('#seek-bar'),
// 		trackTime = $('#track-time'),
// 		insTime = $('#ins-time'),
// 		sHover = $('#s-hover'),
// 		playPauseButton = $("#play-pause-button"),
// 		i = playPauseButton.find('i'),
// 		tProgress = $('#current-time'),
// 		tTime = $('#track-length'),
// 		seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
// 		buffInterval = null, tFlag = false;
	
// 	var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;
	
// 	var songs = [{
// 		artist: "Dig Didzay",
// 		name: "Nếu Anh Đi (Cover)",
// 		url: "../assets/Musics/NeuAnhDi.mp3",
// 		picture: "../assets/images/neuemdi.jpg",
// 	},
//     {
// 		artist: "Huy Vạc",
// 		name: "ChanhLongThuongCo2",
// 		url: "../assets/Musics/ChanhLongThuongCo2.mp3",
// 		picture: "../assets/images/neuemdi.jpg",
// 	},
//     {
// 		artist: "X2X",
// 		name: "CoGiangTinh",
// 		url: "../assets/Musics/CoGiangTinh.mp3",
// 		picture: "../assets/images/neuemdi.jpg",
// 	},
//     {
// 		artist: "Yan Nguyen",
// 		name: "ItNhungDaiLau",
// 		url: "../assets/Musics/ItNhungDaiLau.mp3",
// 		picture: "../assets/images/neuemdi.jpg",
// 	}


// ];
	
// 	function shuffle(a) {
// 		var j, x, i;
// 		for (i = a.length - 1; i > 0; i--) {
// 			j = Math.floor(Math.random() * (i + 1));
// 			x = a[i];
// 			a[i] = a[j];
// 			a[j] = x;
// 		}
// 		return a;
// 	}
// 	songs = shuffle(songs);

//     function playPause()
//     {
//         setTimeout(function()
//         {
//             if(audio.paused)
//             {
//                 playerTrack.addClass('active');
//                 albumArt.addClass('active');
//                 checkBuffering();
//                 i.attr('class','fas fa-pause');
//                 audio.play();
//             }
//             else
//             {
//                 playerTrack.removeClass('active');
//                 albumArt.removeClass('active');
//                 clearInterval(buffInterval);
//                 albumArt.removeClass('buffering');
//                 i.attr('class','fas fa-play');
//                 audio.pause();
//             }
//         },300);
//     }

    	
// 	function showHover(event)
// 	{
// 		seekBarPos = sArea.offset(); 
// 		seekT = event.clientX - seekBarPos.left;
// 		seekLoc = audio.duration * (seekT / sArea.outerWidth());
		
// 		sHover.width(seekT);
		
// 		cM = seekLoc / 60;
		
// 		ctMinutes = Math.floor(cM);
// 		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
		
// 		if( (ctMinutes < 0) || (ctSeconds < 0) )
// 			return;
		
//         if( (ctMinutes < 0) || (ctSeconds < 0) )
// 			return;
		
// 		if(ctMinutes < 10)
// 			ctMinutes = '0'+ctMinutes;
// 		if(ctSeconds < 10)
// 			ctSeconds = '0'+ctSeconds;
        
//         if( isNaN(ctMinutes) || isNaN(ctSeconds) )
//             insTime.text('--:--');
//         else
// 		    insTime.text(ctMinutes+':'+ctSeconds);
            
// 		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
		
// 	}

//     function hideHover()
// 	{
//         sHover.width(0);
//         insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);		
//     }
    
//     function playFromClickedPos()
//     {
//         audio.currentTime = seekLoc;
// 		seekBar.width(seekT);
// 		hideHover();
//     }

//     function updateCurrTime()
// 	{
//         nTime = new Date();
//         nTime = nTime.getTime();

//         if( !tFlag )
//         {
//             tFlag = true;
//             trackTime.addClass('active');
//         }

// 		curMinutes = Math.floor(audio.currentTime / 60);
// 		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
		
// 		durMinutes = Math.floor(audio.duration / 60);
// 		durSeconds = Math.floor(audio.duration - durMinutes * 60);
		
// 		playProgress = (audio.currentTime / audio.duration) * 100;
		
// 		if(curMinutes < 10)
// 			curMinutes = '0'+curMinutes;
// 		if(curSeconds < 10)
// 			curSeconds = '0'+curSeconds;
		
// 		if(durMinutes < 10)
// 			durMinutes = '0'+durMinutes;
// 		if(durSeconds < 10)
// 			durSeconds = '0'+durSeconds;
        
//         if( isNaN(curMinutes) || isNaN(curSeconds) )
//             tProgress.text('00:00');
//         else
// 		    tProgress.text(curMinutes+':'+curSeconds);
        
//         if( isNaN(durMinutes) || isNaN(durSeconds) )
//             tTime.text('00:00');
//         else
// 		    tTime.text(durMinutes+':'+durSeconds);
        
//         if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
//             trackTime.removeClass('active');
//         else
//             trackTime.addClass('active');

        
// 		seekBar.width(playProgress+'%');
		
// 		if( playProgress == 100 )
// 		{
// 			i.attr('class','fa fa-play');
// 			seekBar.width(0);
//             tProgress.text('00:00');
//             albumArt.removeClass('buffering').removeClass('active');
//             clearInterval(buffInterval);
// 			selectTrack(1);
// 		}
//     }
    
//     function checkBuffering()
//     {
//         clearInterval(buffInterval);
//         buffInterval = setInterval(function()
//         { 
//             if( (nTime == 0) || (bTime - nTime) > 1000  )
//                 albumArt.addClass('buffering');
//             else
//                 albumArt.removeClass('buffering');

//             bTime = new Date();
//             bTime = bTime.getTime();

//         },100);
//     }

//     function selectTrack(flag)
//     {
//         if( flag == 0 || flag == 1 )
//             ++currIndex;
//         else
//             --currIndex;

//         if( (currIndex > -1) && (currIndex < songs.length) )
//         {
//             if( flag == 0 )
//                 i.attr('class','fa fa-play');
//             else
//             {
//                 albumArt.removeClass('buffering');
//                 i.attr('class','fa fa-pause');
//             }

//             seekBar.width(0);
//             trackTime.removeClass('active');
//             tProgress.text('00:00');
//             tTime.text('00:00');
			
// 			currAlbum = songs[currIndex].name;
//             currTrackName = songs[currIndex].artist;
//             currArtwork = songs[currIndex].picture;

//             audio.src = songs[currIndex].url;
            
//             nTime = 0;
//             bTime = new Date();
//             bTime = bTime.getTime();

//             if(flag != 0)
//             {
//                 audio.play();
//                 playerTrack.addClass('active');
//                 albumArt.addClass('active');
            
//                 clearInterval(buffInterval);
//                 checkBuffering();
//             }

//             albumName.text(currAlbum);
//             trackName.text(currTrackName);
//             $('#album-art img').prop('src', bgArtworkUrl);
//         }
//         else
//         {
//             if( flag == 0 || flag == 1 )
//                 --currIndex;
//             else
//                 ++currIndex;
//         }
//     }

//     function initPlayer()
// 	{	
//         audio = new Audio();

// 		selectTrack(0);
		
// 		audio.loop = false;
		
// 		playPauseButton.on('click',playPause);
		
// 		sArea.mousemove(function(event){ showHover(event); });
		
//         sArea.mouseout(hideHover);
        
//         sArea.on('click',playFromClickedPos);
		
//         $(audio).on('timeupdate',updateCurrTime);

//         playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
//         playNextTrackButton.on('click',function(){ selectTrack(1);});
// 	}
    
// 	initPlayer();
// });



// $(function () {
//     var playerTrack = $("#player-track");
//     var bgArtwork = $('#bg-artwork');
//     var bgArtworkUrl;
//     var albumName = $('#album-name');
//     var trackName = $('#track-name');
//     var albumArt = $('#album-art'),
//         sArea = $('#s-area'),
//         seekBar = $('#seek-bar'),
//         trackTime = $('#track-time'),
//         insTime = $('#ins-time'),
//         sHover = $('#s-hover'),
//         playPauseButton = $("#play-pause-button"),
//         i = playPauseButton.find('i'),
//         tProgress = $('#current-time'),
//         tTime = $('#track-length'),
//         seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
//         buffInterval = null, tFlag = false;

//     var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;

//     var songs = [{
//         artist: "Huy Lạc",
//         name: "Chạnh Lòng Thương Cô 2",
//         url: "Musics/ChanhLongThuongCo2.mp3",
      
//     },
//     {
//         artist: "X2X",
//         name: "Cố Giang Tình",
//         url: "Musics/CoGiangTinh.mp3",
        
//     },
//     {
//         artist: "Erik",
//         name: "Yêu Đương Khó Qúa Thì Chạy Về Khóc Với Anh",
//         url: "Musics/YeuDuongKhoQuaThiChayVeKhocVoiAnh.mp3",
      
//     }
//     ,
//     {
//         artist: "Yan Nguyễn",
//         name: "It nhưng dài lâu",
//         url: "Musics/ItNhungDaiLau.mp3",
      
//     }
//     ];

//     function shuffle(a) {
//         var j, x, i;
//         for (i = a.length - 1; i > 0; i--) {
//             j = Math.floor(Math.random() * (i + 1));
//             x = a[i];
//             a[i] = a[j];
//             a[j] = x;
//         }
//         return a;
//     }
//     songs = shuffle(songs);

//     function playPause() {
//         setTimeout(function () {
//             if (audio.paused) {
//                 playerTrack.addClass('active');
//                 albumArt.addClass('active');
//                 checkBuffering();
//                 i.attr('class', 'fas fa-pause');
//                 audio.play();
//             }
//             else {
//                 playerTrack.removeClass('active');
//                 albumArt.removeClass('active');
//                 clearInterval(buffInterval);
//                 albumArt.removeClass('buffering');
//                 i.attr('class', 'fas fa-play');
//                 audio.pause();
//             }
//         }, 300);
//     }


//     function showHover(event) {
//         seekBarPos = sArea.offset();
//         seekT = event.clientX - seekBarPos.left;
//         seekLoc = audio.duration * (seekT / sArea.outerWidth());

//         sHover.width(seekT);

//         cM = seekLoc / 60;

//         ctMinutes = Math.floor(cM);
//         ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

//         if ((ctMinutes < 0) || (ctSeconds < 0))
//             return;

//         if ((ctMinutes < 0) || (ctSeconds < 0))
//             return;

//         if (ctMinutes < 10)
//             ctMinutes = '0' + ctMinutes;
//         if (ctSeconds < 10)
//             ctSeconds = '0' + ctSeconds;

//         if (isNaN(ctMinutes) || isNaN(ctSeconds))
//             insTime.text('--:--');
//         else
//             insTime.text(ctMinutes + ':' + ctSeconds);

//         insTime.css({ 'left': seekT, 'margin-left': '-21px' }).fadeIn(0);

//     }

//     function hideHover() {
//         sHover.width(0);
//         insTime.text('00:00').css({ 'left': '0px', 'margin-left': '0px' }).fadeOut(0);
//     }

//     function playFromClickedPos() {
//         audio.currentTime = seekLoc;
//         seekBar.width(seekT);
//         hideHover();
//     }

//     function updateCurrTime() {
//         nTime = new Date();
//         nTime = nTime.getTime();

//         if (!tFlag) {
//             tFlag = true;
//             trackTime.addClass('active');
//         }

//         curMinutes = Math.floor(audio.currentTime / 60);
//         curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

//         durMinutes = Math.floor(audio.duration / 60);
//         durSeconds = Math.floor(audio.duration - durMinutes * 60);

//         playProgress = (audio.currentTime / audio.duration) * 100;

//         if (curMinutes < 10)
//             curMinutes = '0' + curMinutes;
//         if (curSeconds < 10)
//             curSeconds = '0' + curSeconds;

//         if (durMinutes < 10)
//             durMinutes = '0' + durMinutes;
//         if (durSeconds < 10)
//             durSeconds = '0' + durSeconds;

//         if (isNaN(curMinutes) || isNaN(curSeconds))
//             tProgress.text('00:00');
//         else
//             tProgress.text(curMinutes + ':' + curSeconds);

//         if (isNaN(durMinutes) || isNaN(durSeconds))
//             tTime.text('00:00');
//         else
//             tTime.text(durMinutes + ':' + durSeconds);

//         if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds))
//             trackTime.removeClass('active');
//         else
//             trackTime.addClass('active');


//         seekBar.width(playProgress + '%');

//         if (playProgress == 100) {
//             i.attr('class', 'fa fa-play');
//             seekBar.width(0);
//             tProgress.text('00:00');
//             albumArt.removeClass('buffering').removeClass('active');
//             clearInterval(buffInterval);
//             selectTrack(1);
//         }
//     }

//     function checkBuffering() {
//         clearInterval(buffInterval);
//         buffInterval = setInterval(function () {
//             if ((nTime == 0) || (bTime - nTime) > 1000)
//                 albumArt.addClass('buffering');
//             else
//                 albumArt.removeClass('buffering');

//             bTime = new Date();
//             bTime = bTime.getTime();

//         }, 100);
//     }

//     function selectTrack(flag) {
//         if (flag == 0 || flag == 1)
//             ++currIndex;
//         else
//             --currIndex;

//         if ((currIndex > -1) && (currIndex < songs.length)) {
//             if (flag == 0)
//                 i.attr('class', 'fa fa-play');
//             else {
//                 albumArt.removeClass('buffering');
//                 i.attr('class', 'fa fa-pause');
//             }

//             seekBar.width(0);
//             trackTime.removeClass('active');
//             tProgress.text('00:00');
//             tTime.text('00:00');

//             currAlbum = songs[currIndex].name;
//             currTrackName = songs[currIndex].artist;
//             currArtwork = songs[currIndex].picture;

//             audio.src = songs[currIndex].url;

//             nTime = 0;
//             bTime = new Date();
//             bTime = bTime.getTime();

//             if (flag != 0) {
//                 audio.play();
//                 playerTrack.addClass('active');
//                 albumArt.addClass('active');

//                 clearInterval(buffInterval);
//                 checkBuffering();
//             }

//             albumName.text(currAlbum);
//             trackName.text(currTrackName);
//             $('#album-art img').prop('src', bgArtworkUrl);
//         }
//         else {
//             if (flag == 0 || flag == 1)
//                 --currIndex;
//             else
//                 ++currIndex;
//         }
//     }

//     function initPlayer() {
//         audio = new Audio();

//         selectTrack(0);

//         audio.loop = false;

//         playPauseButton.on('click', playPause);

//         sArea.mousemove(function (event) { showHover(event); });

//         sArea.mouseout(hideHover);

//         sArea.on('click', playFromClickedPos);

//         $(audio).on('timeupdate', updateCurrTime);

//         playPreviousTrackButton.on('click', function () { selectTrack(-1); });
//         playNextTrackButton.on('click', function () { selectTrack(1); });
//     }

//     initPlayer();
// });



// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Nếu anh đi",
      singer: "Cover",
      path: "../assets/Musics/NeuAnhDi.mp3",
      image: "https://i1.sndcdn.com/artworks-000454538088-cxpc8s-t500x500.jpg"
    },,
    {
      name: "Chạnh Lòng Thương Cô 2",
      singer: "Huy Vạc",
      path: "../assets/Musics/ChanhLongThuongCo2.mp3",
      image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/5/a/b/7/5ab75e0ab3de596ced4d886093cff77d.jpg"
    },
    {
      name: "Chờ Ngày Cưới Em",
      singer: "Phát Hồ, Hương Ly, X2X",
      path: "../assets/Musics/ChoNgayCuoiEm.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/8/6/8/38682a9b538219105ff3323d9d6efbb9.jpg"
    },
    {
      name: "Cố Giang Tình",
      singer: "X2X",
      path:
        "../assets/Musics/CoGiangTinh.mp3",
      image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/8/6/9/3/8693a5e23c19cc58c718d1c9fa4b280a.jpg"
    },
    {
      name: "Cô Thắm Không Về",
      singer: "Phát Hồ",
      path: "../assets/Musics/CoThamKhongVe.mp3",
      image:
        "https://i.scdn.co/image/ab67616d0000b27345db74e5976e5d35f54a8af1"
    },
    {
      name: "Hồng Trần Vương Sầu Cay",
      singer: "Huy Vạc",
      path: "../assets/Musics/HongTranVuongSauCay.mp3",
      image:
        "https://i.ytimg.com/vi/iLVPdVdbjyg/maxresdefault.jpg"
    },
    {
      name: "Ít Nhưng Dài Lâu(Remix)",
      singer: "Chu Thúy Quỳnh, Yan Nguyễn",
      path:
        "../assets/Musics/ItNhungDaiLau.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/e/7/3/e/e73e975898442d29d62b238b61da0dd5.jpg"
    },
    {
      name: "Chạy Về Khóc Với Anh",
      singer: "ERIK",
      path: "../assets/Musics/YeuDuongKhoQuaThiChayVeKhocVoiAnh.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/6/d/e/c6def069a1a885c41fe479358fa7c506.jpg"
    },
    
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    // cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
