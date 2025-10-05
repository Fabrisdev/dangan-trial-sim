extends CanvasLayer

var regex := RegEx.new()

@export var text_speed = 0.015
const actors_to_names := {
	"hina": "Aoi Asahina",
	"hifumi": "Hifumi Yamada",
	"makoto": "Makoto Naegi"
}


func show_text(actor: String, text: String) -> void:
	regex.compile("\\[color=.*?\\](.*?)\\[/color\\]")
	get_parent().set_can_skip(false)
	$MouseButton.visible = false
	show_face(actor)
	$Displayname.text = actors_to_names[actor]
	var text_to_show := ""
	var words := text.split(" ")
	for word in words:
		var lines_before_new_word = $Text.get_line_count()
		$Text.text = text_to_show + " " + word
		var lines_after_new_word = $Text.get_line_count()
		if lines_after_new_word > lines_before_new_word:
			text_to_show += "\n"
		else:
			text_to_show += " "
		for letter in word:
			text_to_show += letter
			$Text.text = text_to_show.strip_edges()
			await get_tree().create_timer(text_speed).timeout
	get_parent().set_can_skip(true)
	$MouseButton.visible = true
	
func show_face(actor: String) -> void:
	var actor_to_face_id := {
		"makoto": 0,
		"hifumi": 5,
		"hina": 9
	}
	var face_id = actor_to_face_id[actor]
	var starting_pos := Vector2(10, 6304)
	var spacing := Vector2(52, 10)
	var face_dimensions := Vector2(158, 328)
	var rows = 7
	var position_in_grid := Vector2(face_id % rows, face_id / rows)
	var final_pos := position_in_grid * face_dimensions + position_in_grid * spacing + starting_pos
	$Face.texture.region = Rect2(final_pos.x, final_pos.y, face_dimensions.x, face_dimensions.y)
