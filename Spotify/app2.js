console.log("Let's write babe..");
let currentsong = new Audio();
let currfolder;
let songs;

function formatSeconds(seconds) {
    if (seconds < 0) {
        throw new Error('Seconds cannot be negative');
    }

    const roundedSeconds = Math.round(seconds);

    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    // to show all the songs in the playlist
    let songUL = document.querySelector(".songslist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + ` <li>
                                <img src="images&svg/music.svg" class="filter" alt="">
                                <div class="info">
                                    <div>${song.replaceAll("%20", " ")}</div>
                                    <div>Shivi</div>
                                </div>
                                <div class="playnow">
                                   <div> Play now</div>
                                    <img src="images&svg/playsong.svg" class="filter" alt="">
                                </div>
                            </li>`;
    }
    // Attach an eventlistner to each song
    Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML);
        })

    })


}

const playmusic = (track, pause = false) => {
    currentsong.src = `/${currfolder}/` + track;
    if (!pause) {
        currentsong.play();
        playsong.src = "images&svg/pause.svg";
    }
    document.querySelector(".songname").innerHTML = decodeURI(track);
    document.querySelector(".songduration").innerHTML = "00:00 / 00:00";
}


async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardBox = document.querySelector(".cardbox");
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0]
            // get the metadata of the folder
            let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
            let response = await a.json();
            // console.log(response);
            cardBox.innerHTML = cardBox.innerHTML + `<div data-folder=${folder} class="card">
                        <div class="image">
                            <img src="/songs/${folder}/cover.jpg" alt="Pritam Da">
                        </div>
                        <div class="artistname">
                           ${response.title}
                        </div>
                        <div class="profession">
                            ${response.des}s
                        </div>
                        <div class="playbutton">
                            <img src="images&svg/play.svg" alt="">
                        </div>
                    </div>`

                }
            }
            
            // load a diffrent playlist whenever a card is clicked
        
            Array.from(document.getElementsByClassName("card")).forEach(e => {
                e.addEventListener("click", async item => {
                    // console.log(item , item.currentTarget.dataset); // if we write console.log(item , item.target.dataset); it will click on the element where we are clicking but we need that in the whole card that whenever we click anywhere in the card it will give us the folder. so we have to write console.log(item , item.currentTarget.dataset);
                    await getsongs(`songs/${item.currentTarget.dataset.folder}`)
                    playmusic(songs[0]);
        
                })
        
            })
}




async function main() {

    // to get the song list
    await getsongs("songs/vibemood")
    playmusic(songs[0], true);

    // display all the albums of the page
    displayAlbums();


    // Attach an eventlistner to play and pause buttons
    playsong.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            playsong.src = "images&svg/pause.svg";
        }
        else {
            currentsong.pause()
            playsong.src = "images&svg/playsong.svg";
        }
    })

    // add eventlistner to nextbutton
    nextsong.addEventListener("click", () => {
        currentsong.pause()
        // console.log("next clicked");

        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);

        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1])
        }

    })

    // add eventlistner to prevbutton

    prevsong.addEventListener("click", () => {
        currentsong.pause();
        // console.log("Prevous button is clicked");
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if ((index - 1) > 0) {
            playmusic(songs[index - 1])
        }

    })

    // For the timeupdate evemt
    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime , currentsong.duration);
        document.querySelector(".songduration").innerHTML = `${formatSeconds(currentsong.currentTime)}/${formatSeconds(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 98 + "%"

    })
    // add to event listner at seekbar
    document.querySelector(".playline").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 98;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 98;
    })

    // Add eventlistner to hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".librarysection").style.left = 0;
    })

    // Add eventlistner to close hamburger
    document.querySelector(".closehamburger").addEventListener("click", () => {
        document.querySelector(".librarysection").style.left = `-100%`
    })


    //add eventlistner to auto next song
    currentsong.addEventListener('ended', () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);

        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1])
        }

    });

          // load a diffrent playlist whenever a card is clicked
        
          Array.from(document.getElementsByClassName("card")).forEach(e => {
            e.addEventListener("click", async item => {
                // console.log(item , item.currentTarget.dataset); // if we write console.log(item , item.target.dataset); it will click on the element where we are clicking but we need that in the whole card that whenever we click anywhere in the card it will give us the folder. so we have to write console.log(item , item.currentTarget.dataset);
                await getsongs(`songs/${item.currentTarget.dataset.folder}`)
    
            })
    
        })

        
}


// Get the input and results container
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');



function filterSongs(searchTerm) {
    // Clear previous results
    resultsContainer.innerHTML = '';

    // If search term is empty, don't show any results
    if (searchTerm.trim() === '') {
        return;
    }

    // Filter songs based on the search term (search is case-insensitive)
    const filteredSongs = songs.filter(song => 
        song.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Show filtered songs
    filteredSongs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.classList.add('result-item');
        songElement.textContent = song.replaceAll('%20', ' '); // Replace '%20' with spaces in song names

        // Add click event to show or play the selected song
        songElement.onclick = () => {
            playmusic(song); // Call the playmusic function to play the selected song
        };

        resultsContainer.appendChild(songElement);
    });

    // If no results, show a 'No Results Found' message
    if (filteredSongs.length === 0) {
        const noResultsElement = document.createElement('div');
        noResultsElement.textContent = 'No Results Found';
        resultsContainer.appendChild(noResultsElement);
    }
}


// Add event listener to the search input
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    filterSongs(searchTerm);
});



main();
