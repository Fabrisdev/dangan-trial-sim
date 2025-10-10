extends CanvasLayer

var regex := RegEx.new()

@export var text_speed = 0.015
const actors_to_names := {
	"hina": "Aoi Asahina",
	"hifumi": "Hifumi Yamada",
	"makoto": "Makoto Naegi",
	"narrator": "Narrator"
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
		var is_bb_code = false
		$Text.text = word
		var bb_code = ""
		for letter in word:
			if letter == '[': is_bb_code = true
			$Text.text = text_to_show.strip_edges()
			if is_bb_code: bb_code += letter
			else: 
				text_to_show += letter
				await get_tree().create_timer(text_speed).timeout
			if letter == ']':
				text_to_show += bb_code
				is_bb_code = false
				bb_code = ''
	get_parent().set_can_skip(true)
	$MouseButton.visible = true
	
func show_face(actor: String) -> void:
	if actor == 'narrator':
		show_face_ui(false)
		return
	show_face_ui(true)
	var actor_to_face_id := {
		"makoto": 0,
		"narrator": 0,
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
	
func show_face_ui(show_face: bool) -> void:
	$RotatingText.visible = show_face
	$Face.visible = show_face
	$BorderLeftRed.visible = show_face
	$LargeBar1.visible = show_face
	$LargeBar2.visible = show_face
	$BorderRedRight1.visible = show_face
	$BorderRedRight2.visible = show_face
	$BGRedRight.visible = show_face
	$PolygonBackgroundColor.visible = show_face
	$Polygon2D.visible = show_face
	$CaseNumber.visible = show_face
	$BorderRightRed.visible = show_face
	$LeftRed.visible = show_face
	$BackgroundLeftRed.visible = show_face
	$Polygon2D2.visible = show_face
