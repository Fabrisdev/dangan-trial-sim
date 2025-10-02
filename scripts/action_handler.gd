extends Node

func wait(_actor: String, args: Array[String]) -> void:
	var amount_with_s := args[0]
	var amount := amount_with_s.substr(0, amount_with_s.length() - 1)
	var seconds = float(amount)
	get_parent().set_asleep(seconds)
	
func focus_on(_actor: String, args: Array[String]) -> void:
	var character_name := args[0]
	var capitalized_character_name := character_name.capitalize()
	var character_head := $"../CharacterManager".get_node(capitalized_character_name).get_node("Head")
	var camera := $"../Camera3D"
	var local_z = character_head.global_transform.basis.z.normalized()
	var distance := 0.7
	var offset = local_z * distance
	#var offset_movement_from_left = 
	camera.global_transform.origin = character_head.global_transform.origin + offset
	camera.look_at(character_head.global_transform.origin, Vector3.UP)
	

func rotate_around(_actor: String, _args: Array[String]) -> void:
	$"../AnimationPlayer".play('rotate_around')
	
func expression(actor: String, args: Array[String]) -> void:
	var pose = args[0]
	$"../CharacterManager".set_expression(actor, pose)

func say(actor: String, args: Array[String]) -> void:
	var text := " ".join(args)
	$"../UI".show_text(actor, text)

func assign(_actor: String, args: Array[String]) -> void:
	var seats = args.map(func(arg: String):
		var character_and_position := arg.split(":")	
		return {
			"character": character_and_position[0],
			"position": character_and_position[1]
		}
	)	
	$"../CharacterManager".assign(seats)
