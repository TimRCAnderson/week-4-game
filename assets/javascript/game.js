$(document).ready(function() {
	var characters = [
	{
		name: "Jeb",
		attack: 12,
		baseAttack: 12,
		health: 140,
		cAttack: 70
	},
	{
		name: "Bob",
		attack: 35,
		baseAttack: 35,
		health: 80,
		cAttack: 20
	},
	{
		name: "Bill",
		attack: 30,
		baseAttack: 30,
		health: 100,
		cAttack: 8
	},
	{
		name: "Valentina",
		attack: 14,
		baseAttack: 14,
		health: 140,
		cAttack: 100
	}];

	var $player;
	var $opponents;
	var $combatant;
	var $comDiv = $("#combatant");
	var $plaDiv = $("#playerZone");
	var $conDiv = $("#controlZone");
	var $oppDiv = $("#opponentZone");
	var $charSel = $("#characterSelect");
	var $restart = $("#restart");
	var $attack = $("#attack");

	function restart()
	{
		$(".reset-hidden").addClass("hidden");
		$(".reset-show").removeClass("hidden");
		$(".nme").off("click");
		$(".character").remove();
		init();
	}

	function combatantSelect() //Determines the enemy combatant and moves it to the combatant div.
	{
		var $this = $(this);
		$combatant = $this;
		$comDiv.append($this.detach());
		$opponents.off("click");
		$comDiv.removeClass("hidden");
		$conDiv.removeClass("hidden");
		$oppDiv.addClass("hidden");
	}

	function charSelect() //determines character and opponents when character is clicked. Places character in player div and opponents in opponents div. Sets opponents onclick to allow selection of your opponent.
	{
		var $this = $(this);
		$charSel.children(".character").off("click");
		$player = $this;
		$("#playerZone").append($this.detach());
		$opponents = $charSel.children(".character").detach();
		$("#opponentZone").append($opponents);
		$charSel.addClass("hidden");
		$plaDiv.removeClass("hidden");
		$oppDiv.removeClass("hidden");
		$opponents.click(combatantSelect);
		$opponents.addClass("nme");
	}

	function attack()
	{
		$combatant.data("health", ($combatant.data("health") - $player.data("attack")));
		$combatant.children(".health").text($combatant.data("health"));
		$player.data("attack", ($player.data("attack") + $player.data("baseAttack")));
		if($combatant.data("health") > 0)
		{
			$player.data("health", ($player.data("health") - $combatant.data("cAttack")));
			$player.children(".health").text($player.data("health"));
			if($player.data("health") <= 0)
			{
				$restart.removeClass("hidden");
				$attack.addClass("hidden");
				$("#loser").removeClass("hidden");
			}
		}
		else
		{
			$combatant.remove();
			if($(".nme").length !== 0)
			{
			$opponents.click(combatantSelect);
			$oppDiv.removeClass("hidden");
			}
			else
			{
				$restart.removeClass("hidden");
				$("#winner").removeClass("hidden");
				$attack.addClass("hidden");
			}

		}
		console.log(($player.data("health") <= 0));
	}

	function init() //creates and adds divs for characters, with data attached.
	{
		for(var i = 0; i < characters.length; i++)
		{
			var $protoCharDiv = $("<div>");
			$protoCharDiv.data(characters[i]);
			console.log($protoCharDiv.data());
			$protoCharDiv.addClass("col-xs-3 character");
			$protoCharDiv.append($("<div>").text($protoCharDiv.data("name")));
			var $picture = $("<img>").attr("src", ("assets/images/" + $protoCharDiv.data("name") + ".png"));
			$picture.addClass("img img-responsive");
			$protoCharDiv.append($picture);
			$protoCharDiv.append(($("<div>").text($protoCharDiv.data("health"))).addClass("health"));
			$protoCharDiv.appendTo($charSel);
			$protoCharDiv.click(charSelect);
		}
	}

	init();
	$attack.click(attack);
	$restart.click(restart);
});