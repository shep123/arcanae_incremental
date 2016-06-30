<!-- RESOURCES
Database 1: http://code.tutsplus.com/articles/sql-for-beginners--net-8200
Database 2: http://code.tutsplus.com/articles/sql-for-beginners-part-2--net-8274
Database 3: http://code.tutsplus.com/articles/sql-for-beginners-part-3-database-relationships--net-8561
-->



<!DOCTYPE html>
<html lang="en">
<head>
	<title>Incremental Game One</title>

	<!-- STYLESHEETS -->
	<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">

</head>
<body>
	<div class="container">
		<div class="row click-bar">
			<div class="col-sm-6">
				<form role="form" class="form-inline">
					<div class="form-group">
						<!--<label for="ReaderCommand">Input Character Command"</label>-->
						<!-- <input type="text" class="form-control" id="ReaderCommand" placeholder="What would you like to do?"> -->
						<button id="btn_meditate" type="button" class="btn btn-lg btn-default"><div class="cooldown"></div>meditate</button> <!--<title="Meditating improves your clarity and ability to focus, affecting your study habits and other tasks that require concentration."-->
						<button id="btn_study" type="button" class="btn btn-lg btn-default"><div class="cooldown"></div>study</button> <!--title="Studying does... Meditating or finding parchment, scrolls or books will increase the rate at which you study." -->
						<button id="btn_explore" type="button" class="btn btn-lg btn-default"><div class="cooldown"></div>explore</button> <!--title="Get out and explore the world..."-->
					</div>
				</form>
			</div>
			<div class="col-sm-6">
				<div class="ui-progressbar" id="progress_bar">
					<span>time</span>
				</div>
				<div class="day-display">
					Day: <span id="day">0</span>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-3 totals-column">
				<div class="bookkeeping">
					<h3>Sympathy<!-- Kodoku, Heku, Natural, Greater, Lesser, Illusionary, Childrens, Divine, Physical, alchemy --></h3>
					<ul>
						<li>Focus: <span id="focus">0</span></li>
						<li>Knowledge: <span id="knowledge">0</span></li>
						<li>Experience: <span id="exploration">0</span></li>
					</ul>
				</div>
				<div class="library">
					<h3>Library</h3>
					<ul>
						<li>Parchment: <span id="parchment">0</span></li>
						<li>Scrolls: <span id="scrolls">0</span></li>
						<li>Books: <span id="books">0</span></li>
					</ul>
          <p>Meditate Efficiency: x<span id="meditation_upgrades">0</span><br />Study Efficiency: x<span id="study_upgrades">0</span></p>
				</div>
				<div class="journal">
					<h3>Journal</h3>
					<ul id="journal_display">
						<li>You have logged nothing today.</li>
					</ul>
					<div class="display-gradient"></div>
				</div>
			</div>
			<div class="col-sm-3 upgrades" id="upgrades_btn_display">
								
			</div>
			<div class="col-sm-6 story">
				<p>Your Story Begins...</p>
				<!-- Keep the details vague, let the reader fill in the blanks to cater to their imagination -->
				<ul id="story_display">
					<li>Outside the sky is dark and the rain unrelenting. Time drifts slowly by...</li>
				</ul>
			</div>
		</div>		
	</div>
	<div class="container-fluid bugs">
		<div class="row">
			<div class="col-sm-3">
				<h4>Recommended Games</h4>
				<ul>
					<li>A Dark Room</li>
					<li>Cookie Clicker</li>
					<li><a href="http://fortressclicker.tropicosoftware.com/" target="_blank">Fortress Clicker</a></li>
					<li><a href="http://dhmholley.co.uk/civclicker.html" target="_blank">Civ Clicker</a></li>
				</ul>
			</div>
			<div class="col-sm-9">
				<h4>Bug &amp; Feature List</h2>
				<ol>
					<li>Tooltip timeout: right now the tooltip stays up while clicking and makes reading the sympathy totals impossible until you move your cursor off the button.</li>
					<li>The day timer/bar should be smoothed out.  Currently too choppy.</li>
					<li>The counters are too simple and often times a click count will exceed the harsh === evaluation and get missed entirely causing them never to load. Same goes with upgrade buttons. If an upgrade button becomes active and the user keeps clicking future upgrades won't get checked.</li>
				</ol>
			</div>
		</div>
	</div>
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
	<script src="js/main.js"></script>
</body>
</html>