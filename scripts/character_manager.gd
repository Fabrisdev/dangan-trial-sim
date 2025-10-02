extends Node3D
		
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

func assign(seats: Array):
	for seat in seats:
		var character_name = seat.character.capitalize()
		var character = get_node(character_name)
		character.rotation_degrees.y = float(seat.position) * 22.5
		character.visible = true
