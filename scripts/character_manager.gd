extends Node3D

@export_file("*.json")
var expressions_file: String
		
func set_expression(actor: String, pose: String) -> void:
	var file := FileAccess.open(expressions_file, FileAccess.READ)
	var contents := file.get_as_text()
	var expressions = JSON.parse_string(contents)
	var actor_expressions = expressions[actor]
	var frame = actor_expressions.find(pose)
	var character_sprite = get_node(actor.capitalize() + '/AnimatedSprite3D')
	character_sprite.frame = frame

func assign(seats: Array):
	for seat in seats:
		var character_name = seat.character.capitalize()
		var character = get_node(character_name)
		character.rotation_degrees.y = float(seat.position) * 22.5
		character.visible = true
