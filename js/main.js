/* WHERE WE LEFT OFF 07/21/2014 */
/* Working on storing data in DOM nodes, specifically buttons that track how much an particular upgrade cost when the button was created
/* jQuery data() API - https://api.jquery.com/data/
/* HTML 5 data attributes - http://ejohn.org/blog/html-5-data-attributes/
/* Eric's jsFiddle 1 - http://jsfiddle.net/RSvrU/1/
/* Eric's jsFiddle 2 - http://jsfiddle.net/RSvrU/4/
/* parseInt() to pull an integer from a string (like from the data attribute you set) - http://www.w3schools.com/jsref/jsref_parseint.asp
/* IIFE - http://gregfranko.com/blog/i-love-my-iife/
/********************************/




/************ With Much Appreciation To  ***********/
/* Samuel Beard (http://truevinecs.co.uk/blog/archives/5) for his examples
/* Michael and his amazing "a Dark Room" (http://adarkroom.doublespeakgames.com/)
/***************************************************/


/************  The Story  ***********/
/* You're an aspiring /whatever/ who has a growing desire to learn the many forms of magic so
/***************************************************/


var meditateTotalClicks = 0, studyTotalClicks = 0, exploreTotalClicks = 0;
var timeInterval = 1, currentTime = 0, currentLight = "day", days = 0, dayLength = 1000;
var multitasking = 2;
var studyUpgradesArray = [], meditateUpgradeArray = [], exploreUpgradeArray = [];

// Drop focus on buttons after they are clicked
$(document).ready(function() { 
    $('input, textarea, select, button').focus(function() {
        this.blur();
    });
});
// Add tooltips for elements with title attribute
$(document).tooltip();


/*** DAY/NIGHT TIMER ***/
var dayCount = setInterval(function increaseTime() {
		var nightFall = Math.round(dayLength * 0.66);

		if(currentTime < dayLength) {
			currentTime++;
			while (currentTime >= nightFall && currentTime < nightFall + 1) {
				$('#story_display').append("<p>Night has come...</p>");
				//console.log(currentTime/dayLength + " Entered night conditional.");
				currentTime++;
				currentLight = "night";
			}
			
			$("#progress_bar").progressbar({
				max: dayLength,
				value: currentTime
			});

			$("#progressbar .ui-progressbar-value").addClass("ui-corner-right");

			var newWidth = (currentTime/dayLength) * 100 + "%";
			//console.log("newWidth = " + newWidth);
			$("#progressbar .ui-progressbar-value").animate({width: newWidth}, "fast");

		} else {
			currentTime = 0;
			days++;
			$("#day").html(days);
			$('#story_display').append("<p>A new sun rises...</p>");
			currentLight = "day";
		}
	},
	timeInterval*1000);



/*** CORE BUTTON FUNCTIONS ***/
/* Meditate increases focus. Meditates increment should be a play on concentration, making studying more efficient, yielding higher knowledge gain in the same amount of time */
$('#btn_meditate').click(function() {
	$(this).prop('disabled', true); // disables the button during cooldown
	$(this).addClass('on-cooldown');
	disableAndCheckMultitasking(this); // disables other buttons if multitasking is not available

	meditateTotalClicks = meditateTotalClicks + meditate.increment;
	checkAndShowStudyUpgrades(study.cost);
	$('#focus').html(meditateTotalClicks);
	
	$('#btn_meditate .cooldown').animate({ // including the second parameter here (context) you prevent jquery from scrubbing the whole DOM.
		width: ['100%', 'linear']
    }, meditate.cooldown, function() {
  		$('.cooldown').css('width', '0%');
  		$('#btn_meditate').removeClass('on-cooldown');
  		$('#btn_meditate').prop('disabled', false); // reenables the button after the cooldown is complete.
      enableIfNotOnCooldown("#btn_meditate");
	});
});
/* Studying increases knowledge. Increment should be an accelerator that increases meditate yield while decreasing time involved. */
$('#btn_study').click(function() {
	if (foundItems.parchment.totalOwned === 0 && foundItems.scroll.totalOwned === 0 && foundItems.book.totalOwned === 0) {
		updateDisplay("story", '<span style="color:red;">If only you had something to study!</span>');
	} else {
		$(this).prop('disabled', true);
		$(this).addClass('on-cooldown');
		disableAndCheckMultitasking(this);

		studyTotalClicks = studyTotalClicks + study.increment + (foundItems.parchment.totalOwned * foundItems.parchment.clickValue);
		checkAndShowStudyUpgrades(study.cost);
		$("#knowledge").html(studyTotalClicks);

		$('#btn_study .cooldown').animate({
		  width: ['100%', 'linear']
    }, study.cooldown, function() {
  		$('.cooldown').css('width', '0%');
  		$('#btn_study').removeClass('on-cooldown');
  		$('#btn_study').prop('disabled', false);
      enableIfNotOnCooldown("#btn_study");
    });
  }
});
/* Exploration increases experience. Exploration should be a total that never decreases or gets spent, but which reveals elements of the game the farther the user journeys.  Perhaps it's diminishing return is handled with a square or cube law similar to if you were expanding territory outward in a circle.*/
$('#btn_explore').click(function() {
	$(this).prop('disabled', true);
	$(this).addClass('on-cooldown');
	disableAndCheckMultitasking(this);

	exploreTotalClicks = exploreTotalClicks + explore.increment;
	checkAndShowExploreUpgrades(explore.cost);
	$("#exploration").html(exploreTotalClicks);

	$('#btn_explore .cooldown').animate({
		width: ['100%', 'linear']
    }, explore.cooldown, function() {
  		$('.cooldown').css('width', '0%');
      $('#btn_explore').removeClass('on-cooldown');
  		$('#btn_explore').prop('disabled', false);
      enableIfNotOnCooldown("#btn_explore");
	});
});



/*** CONDITIONAL FUNCTIONS ***/
function disableAndCheckMultitasking(trigger) {
	var trigger = '#' + $(trigger).attr('id');
  // console.log("disableAndCheckMultitasking function called.  Multitasking = " + multitasking + " and trigger = " + trigger);

	if(multitasking === 0) {
		$('#btn_meditate').prop('disabled', true);
		$('#btn_study').prop('disabled', true);
		$('#btn_explore').prop('disabled', true);
	} else if (multitasking === 1) { // disables 3rd element if two elements are on cooldown
    switch(trigger) {
      case "#btn_meditate":
        $('#btn_meditate').prop('disabled', true);
        if($('#btn_study').prop('disabled') === true) {
          $('#btn_explore').prop('disabled', true);
          break;
        } else if ($('#btn_explore').prop('disabled') === true) {
          $('#btn_study').prop('disabled', true);
          break;
        }
        break;
      case "#btn_study":
        $('#btn_study').prop('disabled', true);
        if($('#btn_meditate').prop('disabled') === true) {
          $('#btn_explore').prop('disabled', true);
          break;
        } else if ($('#btn_explore').prop('disabled') === true) {
          $('#btn_meditate').prop('disabled', true);
          break;
        }
        break;
      case "#btn_explore":
        $('#btn_explore').prop('disabled', true);
        if($('#btn_meditate').prop('disabled') === true) {
          $('#btn_study').prop('disabled', true);
          console.log("if");
          break;
        } else if ($('#btn_study').prop('disabled') === true) {
          $('#btn_meditate').prop('disabled', true);
          console.log("else if");
          break;
        }
        break;
      default:
        console.log("disableAndCheckMultitasking function failed to select 1 of 3 cases");
    }
		$(trigger).prop('disabled', true);
	} else {
		$(trigger).prop('disabled', true);
	}
}

function enableIfNotOnCooldown(trigger) { //renables buttons that were disabled due to other buttons being in use without the multi-tasking upgrade
  switch(trigger) {
    case "#btn_meditate":
      if($('#btn_study').prop('disabled', true) && !$('#btn_study').hasClass('on-cooldown')) {
        $('#btn_study').prop('disabled', false);
      }
      if($('#btn_explore').prop('disabled', true) && !$('#btn_explore').hasClass('on-cooldown')) {
        $('#btn_explore').prop('disabled', false);
      }
      break;

    case "#btn_study":
      if($('#btn_meditate').prop('disabled', true) && !$('#btn_meditate').hasClass('on-cooldown')) {
        $('#btn_meditate').prop('disabled', false);
      }
      if($('#btn_explore').prop('disabled', true) && !$('#btn_explore').hasClass('on-cooldown')) {
        $('#btn_explore').prop('disabled', false);
      }
      break;

    case "#btn_explore":
      if($('#btn_meditate').prop('disabled', true) && !$('#btn_meditate').hasClass('on-cooldown')) {
        $('#btn_meditate').prop('disabled', false);
      }
      if($('#btn_study').prop('disabled', true) && !$('#btn_study').hasClass('on-cooldown')) {
        $('#btn_study').prop('disabled', false);
      } 
      break;
  }
}



/*** UPGRADE FUNCTIONS, OBJECTS, ETC... ***/
/* Button stats */
var meditate = {
	increment: 1,
  cost: 5,
	cooldown:100
},
study = {
	increment: 1,
  cost: 5,
	cooldown: 100
},
explore = {
	increment: 1,
  cost: 5,
	cooldown: 100
};

/* Functions */
function updateDisplay(target, someString) {
	if (target === "journal") {
		$('#journal_display').prepend($('<li>' + someString + '</li>').fadeIn('slow'));
	} else if (target === "story") {
		$('#story_display').append($('<li>' + someString + '</li>').fadeIn('slow'));
	}
};

/* Upgrade Milestones and Display Upgrade Buttons */
function checkAndShowMeditateUpgrades(requiredLevel) {

};
function checkAndShowStudyUpgrades(requiredLevel) {
	if(meditateTotalClicks >= requiredLevel) {
    /* OPTION ONE USING AN ARRAY
    var buttonMarkup = "<button type='button' class='btn btn-sm btn-default btn-improve-study-" + requiredLevel + "''>Improve Study (" + study.cost + " focus)</button>";

    studyUpgradesArray.push([buttonMarkup, requiredLevel]);
    console.log("============== checkAndShowStudyUpgrades called =============");
    for(var i=0; i<studyUpgradesArray.length; i++) {
      for(var j=0; j<studyUpgradesArray[i].length; j++) {
        console.log("i iteration " + i + " with array length " + studyUpgradesArray.length);
        console.log("j iteration " + j + " with array length " + studyUpgradesArray[i].length);
        console.log("studyUpgradesArray: " + studyUpgradesArray[i][j]); 
      }
    }

    $('#upgrades_btn_display').append(studyUpgradesArray[studyUpgradesArray.length - 1][0]);
    */

    /* OPTION TWO USING DATA ATTRIBUTES: http://ejohn.org/blog/html-5-data-attributes/ */
    var buttonMarkup = "<button type='button' class='btn btn-sm btn-default btn-improve-study' data-cost='" + requiredLevel + "''>Improve Study (" + study.cost + " focus)</button>";
    $('#upgrades_btn_display').append(buttonMarkup);

    /* UNIVERSAL DETAILS */
		study.cost = Math.round(study.cost * ((Math.random() + 1) * 1.75));
		console.log("required level was " + requiredLevel + ": with meditateTotalClicks = " + meditateTotalClicks + " and new study cost: " + study.cost);
	} 
};
function checkAndShowExploreUpgrades(requiredLevel) {
	if(exploreTotalClicks === requiredLevel) {
		var rand = (Math.random() * 100) + 1;

		if(rand <= 85) {
			updateDisplay("journal", "You have FOUND A SCRAP OF PARCHMENT!");
			foundItems.parchment.totalOwned++;
			$('#parchment').html(foundItems.parchment.totalOwned);

		} else if (rand > 98) {
			updateDisplay("journal", "You have FOUND A BOOK!");
			foundItems.book.totalOwned++;
			$('#books').html(foundItems.book.totalOwned);
		} else {
			updateDisplay("journal", "You have FOUND A SCROLL!");
			foundItems.scroll.totalOwned++;
			$('#scrolls').html(foundItems.scroll.totalOwned);
		}

		explore.cost = Math.round(explore.cost * ((Math.random() + 1) * 1.75));
		console.log("New explore cost: " + explore.cost);
	};
};

/* Dynamic Buttons (Upgrades, etc...) */
// LEARNING NOTE: the "click()" binding typically used for button actions only works on elements that already exist.  For dynamically loaded buttons like this one use on().  You need to pass the selector parameter to target the specific selector the action is attached to otherwise it is still considered "directly bound" instead of delegated. In this case the jQuery set receives the event then delegates it to elements matching the selector given as an argument. 
$(document.body).on('click', '.btn-improve-study', function() {
	if(meditateTotalClicks >= $(this).data("cost")) {
		study.increment++;
		updateDisplay('journal', 'Due to some ephiphany, discipline, etc. I\'ve become more focused today.'); // STORY NOTE: it would be great to have unique entries here for each entry, from first person.  Make the player feel embedded in the story.
		$('#study_upgrades').html(study.increment);
		meditateTotalClicks = meditateTotalClicks - $(this).data("cost");
		$('#focus').html(meditateTotalClicks);
		$(this).remove();
	} else {
		updateDisplay('journal', 'You are unfocused.');
	}
});


$(document.body).on('click', '.btn-improve-meditate', function() {
	if(meditateTotalClicks >= tempNumber) {
    meditate.increment++;
  	updateDisplay('journal', 'You learned to meditate more efficiently.');
  	$('#study_upgrades').html(meditate.increment);
  	meditateTotalClicks = meditateTotalClicks - meditate.cost;
  	meditate.cost = meditate.cost * 1.5;
  	$(this).remove();
  } else {
    updateDisplay('journal', 'not enough tempNumber');
  }
});



/*** FOUND OBJECTS ***/
// Upgrade value boosts click results, but these items should be able to be spent so that the user has to choose between losing the click upgrades for some other benefit.  Perhaps at the cost of autoclickers (acolytes/interns).
var foundItems = {
	book: {
		name: "Some Randomly Generated Name",
		property: "",
		clickValue: 5,  
		totalOwned: 0
	}, 
	scroll: {
		name: "Some Randomly Generated Name",
		property: "",
		clickValue: 2,
		totalOwned: 0
	},
	parchment: {
		name: "Some Randomly Generated Name",
		property: "",
		clickValue: 0,
		totalOwned: 0
	}
};