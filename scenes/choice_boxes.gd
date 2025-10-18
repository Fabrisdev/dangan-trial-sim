extends Node2D

var selected: int = -1
var selected_node: TextureRect
var amount_of_choices = 4
var is_currently_choosing = false
	
func _ready() -> void:
	hide_all()

func _process(_delta: float) -> void:
	if is_currently_choosing:
		get_parent().get_parent().set_can_skip(false)
	if Input.is_action_just_pressed("up"):
		selected -= 1
		if selected < 1: selected = amount_of_choices
		hover_option()
	if Input.is_action_just_pressed("down"):
		selected += 1
		if selected > amount_of_choices or selected == 0: selected = 1
		hover_option()
	if Input.is_action_just_pressed("confirm"):
		select_option()
		hide_all()
	
func choose(replies: Array[String]) -> void:
	is_currently_choosing = true
	hide_all()
	amount_of_choices = replies.size()
	for reply in replies:
		show_choice(reply)
		
func show_choice(reply: String) -> void:
	for choice_id in range(1, 4+1):
		var choice_node = get_node("Option" + str(choice_id))
		var is_available = choice_node.visible == false
		if is_available:
			_show(reply, choice_node)
			return
			
func _show(reply: String, choice_node: Node) -> void:
	choice_node.visible = true
	choice_node.get_child(0).text = reply

func hide_all():
	$Option1.visible = false
	$Option2.visible = false
	$Option3.visible = false
	$Option4.visible = false
	
func select_option():
	$SelectEffectPlayer.play()
	is_currently_choosing = false
	print('Option chosen: ', selected)

func hover_option():
	if selected == -1: return
	if(selected_node): deselect(selected_node)
	selected_node = get_node("Option" + str(selected))
	select(selected_node)
		
func select(node: TextureRect):
	node.texture.atlas.region.position.x = 13
	node.position.x = -793
	var text_node = node.get_child(0)
	text_node.position.x = 122
	text_node.add_theme_color_override("default_color", Color('4e4e4e'))
	$HoverEffectPlayer.play()
	
func deselect(node: TextureRect):
	node.texture.atlas.region.position.x = 819
	node.position.x = -683
	var text_node = node.get_child(0)
	text_node.position.x = 100
	text_node.add_theme_color_override("default_color", Color('fff'))
