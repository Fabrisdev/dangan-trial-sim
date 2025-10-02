extends Node3D

@export var assignments := {
	"Makoto": 1,
	"Hifumi": 2,
	"Hina": 3
}

func _ready():
	for character in assignments.keys():
		var stand = assignments[character]
		get_node(character).rotation_degrees.y = stand * 22.5
		
func set_expression(actor: String, pose: String) -> void:
	if actor == 'makoto':
		var poses := {
			"shoot": 10,
			"you": 4
		}
		$Makoto/AnimatedSprite3D.frame = poses[pose]
	if actor == "hina":
		var poses := {
			"excited": 14,
			"angry": 15
		}
		$Hina/AnimatedSprite3D.frame = poses[pose]
