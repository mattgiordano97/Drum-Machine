/* Constants and global variables */

const drums = [
    'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3'     ,
    'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3'     ,
    'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3'     ,
    'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3'   ,
    'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3'     ,
    'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3'       ,
    'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'   ,
    'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'   ,
    'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'       
];

const chords = [
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
];

const keyBindings = ['q', 'w', 'e', 'a','s', 'd', 'z', 'x', 'c'];

const drumNames = ['Heater 1', 'Heater 2', 'Heater 3', 'Heater 4', 'Clap', 'Open HH', "Kick 'n Hat", 'Closed HH'];
const chordNames = ['Chord 1', 'Chord 2', 'Chord 3', 'Shaker', 'Open HH', 'Closed HH', 'Punchy Kick', 'Side Stick', 'Snare'];

/* Functions */
const switchButtons = (btnOffId, btnOnId) => {
    $(btnOnId).attr('disabled', '');
    $(btnOnId).removeClass('btn-primary');
    $(btnOnId).addClass('btn-secondary');

    $(btnOffId).removeAttr('disabled');
    $(btnOffId).addClass('btn-primary');
    $(btnOffId).removeClass('btn-secondary');
}

/* On document ready */
$(document).ready(function () { 
    // Set audio urls
    $('.clip').find('source').each(function (index) {
        $(this).attr('src', drums[index]);
    });
    // Load audio elements, since you changed urls
    $('.clip').each(function () {
        this.volume = 0.5;
        this.load();
    });

    /* EVENTS */
    // Set buttons to play audio
    $('.drum-pad').on('click', function (event) {
        if ($('#bank-drum-btn').hasClass('btn-primary')) {
            $('#display').text(drumNames[$(this).index('.drum-pad')]);
        }
        else {
            $('#display').text(chordNames[$(this).index('.drum-pad')]);
        }
        

        const thisAudio = $(event.target).find('audio')[0];
        // Pause and restart every other audio
        $('.clip').each(function () { 
            this.pause();
            this.currentTime = 0;
        });

        // Play this audio
        thisAudio.play();
    });

    // Set key bindings to play buttons
    $(document).on('keydown', (e) => {
        if (keyBindings.includes(e.key)) {
            $(`#${e.key.toUpperCase()}`).parent().trigger('click');
        }
    });

    // Power on/off buttons
    $('#power-on-btn').on('click', (e) => {
        // Power off
        $('#display').text('');

        switchButtons('#power-off-btn', '#power-on-btn');
        
        $('.drum-pad').attr('disabled', '');
        $('#bank-drum-btn').attr('disabled', '');
        $('#bank-chord-btn').attr('disabled', '');

        $(document).off('keydown');
    });

    $('#power-off-btn').on('click', (e) => {
        // Power on
        $('#display').text('Power on');

        switchButtons('#power-on-btn', '#power-off-btn');

        $('.drum-pad').removeAttr('disabled');

        $('#bank-drum-btn').hasClass('btn-primary') ? $('#bank-drum-btn').removeAttr('disabled') : '';
        $('#bank-chord-btn').hasClass('btn-primary') ? $('#bank-chord-btn').removeAttr('disabled') : '';

        $(document).on('keydown', (e) => {
            if (keyBindings.includes(e.key)) {
                $(`#${e.key.toUpperCase()}`).parent().trigger('click');
            }
        });
    });

    // Bank buttons
    $('#bank-drum-btn').on('click', function () {
        $('#display').text('Smooth Piano Kit');

        switchButtons('#bank-chord-btn', '#bank-drum-btn');

        $('.clip').find('source').each(function (index) {
            $(this).attr('src', chords[index]);
        });
        $('.clip').each(function () {
            this.load();
        });
    });
    $('#bank-chord-btn').on('click', function () {
        $('#display').text('Heater Kit');

        switchButtons('#bank-drum-btn', '#bank-chord-btn');

        $('.clip').find('source').each(function (index) {
            $(this).attr('src', drums[index]);
        });
        $('.clip').each(function () {
            this.load();
        });
    });

    // Volume range
    $('#volume-range').on('change', (e) => {
        $('#display').text('Volume: ' + e.target.value + "%");

        $('.clip').each(function () {
            this.volume = e.target.value / 100;
        });
    });

    // Display


});

/*
TODO
At page load:
    - set audio urls
    - set power on
    - set bank left
    - set audio 50%
Events:
    - click of active button in Power/Bank switches on/off and changes active button
    - drag volume
Display events:
    - shows diferent events when they happen
*/