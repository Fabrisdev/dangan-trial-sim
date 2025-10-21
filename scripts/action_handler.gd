extends Node

var preloaded_files = {}

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
	$"../Camera3D".rotate_around()
	
func expression(actor: String, args: Array[String]) -> void:
	var pose = args[0]
	$"../CharacterManager".set_expression(actor, pose)

func say(actor: String, args: Array[String]) -> void:
	var should_await = args[0] == 'await=true'
	var text := " ".join(args.slice(1))
	$"../UI".show_text(actor, text)
	if should_await:
		get_parent().set_asleep(-1)

func assign(_actor: String, args: Array[String]) -> void:
	var seats = args.map(func(arg: String):
		var character_and_position := arg.split(":")	
		return {
			"character": character_and_position[0],
			"position": character_and_position[1]
		}
	)	
	$"../CharacterManager".assign(seats)
	
func set_narrator_view(_actor: String, args: Array[String]) -> void:
	var value := args[0]
	$"../Camera3D".narrator_view(value == "true")

func show_debug(_actor: String, _args: Array[String]) -> void:
	$"../DebugWindow".show_debug_window()
	
func play(_actor: String, args: Array[String]) -> void:
	var file_path := args[0]
	var bytes: PackedByteArray
	if preloaded_files.has(file_path):
		bytes = preloaded_files[file_path]
	else:
		var file = FileAccess.open(file_path, FileAccess.READ)
		bytes = file.get_buffer(file.get_length())
		preloaded_files[file_path] = bytes
		push_warning('Consider preloading the file to avoid rereading it and have faster load times. ('+file_path+')')
	var stream: AudioStream
	var lower_path := file_path.to_lower()
	if lower_path.ends_with(".mp3"):
		stream = AudioStreamMP3.new()
		stream.data = bytes
	elif lower_path.ends_with(".ogg"):
		stream = AudioStreamOggVorbis.new()
		stream.data = bytes
	elif lower_path.ends_with(".wav"):
		var wav = AudioStreamWAV.new()
		wav.data = bytes
		stream = wav
	else:
		push_error("Unsupported audio format. Available formats are [mp3, ogg, wav] (" + file_path + ")")
		return
	if args.has('loop'):
		stream.loop = true
	$"../AudioStreamPlayer".stream = stream
	$"../AudioStreamPlayer".play()

func preload_file(_actor: String, args: Array[String]) -> void:
	var file_path := args[0]
	var file := FileAccess.open(file_path, FileAccess.READ)
	var bytes := file.get_buffer(file.get_length())
	preloaded_files[file_path] = bytes

func stop_tracks(_actor: String, _args: Array[String]) -> void:
	$"../AudioStreamPlayer".stop()

func set_mouse_color(_actor: String, args: Array[String]) -> void:
	var color := args[0]
	$"../UI/MouseButton".set_mouse_color(color)
	
func choose(_actor: String, args: Array[String]) -> void:
	get_parent().set_asleep(-1)
	var choices: Array[String] = []
	for choice in args:
		choice = choice.replace('_', ' ')
		choices.push_back(choice)
	$"../UI".choose(choices)
	
func show_ui(_actor: String, args: Array[String]) -> void:
	var should_show = args[0] == 'true'
	$"../UI".show_face_ui(should_show)

func ifanswer(_actor: String, args: Array[String]) -> void:
	var value := " ".join(args)
	var choice_made = $"../UI".choice_made
	if value == choice_made:
		get_parent().set_run_from_and_till("ifanswer -> else")
	else:
		get_parent().set_run_from_and_till("else -> endif")

func run(_actor: String, args: Array[String]) -> void:
	var game_path = args[0]
	var bytes: PackedByteArray
	if preloaded_files.has(game_path):
		bytes = preloaded_files[game_path]
	elif game_path.to_lower().ends_with('.nonstop.yaml'):
		var file = FileAccess.open(game_path, FileAccess.READ)
		bytes = file.get_buffer(file.get_length())
		preloaded_files[game_path] = bytes
		push_warning('Consider preloading the file to avoid rereading it and have faster load times. ('+game_path+')')
	else:
		push_error("Unknown game. Available games are [nonstop] (" + game_path + ")")
		return
	var code := bytes.get_string_from_utf8()
	var parsed_game := YAML.parse(code)
	if parsed_game.has_error():
		push_error(parsed_game.get_error())
		push_error('Error ocurred when parsing game. Please recheck the syntax of the file. ('+game_path+')')
		return
	_run_nonstop(parsed_game.get_data())
	
func _run_nonstop(game) -> void:
	pass
