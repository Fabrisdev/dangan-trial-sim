extends Node2D

var selected: int = -1
var selected_node: TextureRect

func _process(_delta: float) -> void:
	if Input.is_action_just_pressed("up"):
		selected -= 1
		if selected < 1: selected = 4
		hover_option()
	if Input.is_action_just_pressed("down"):
		selected += 1
		if selected > 4 or selected == 0: selected = 1
		hover_option()
	if Input.is_action_just_pressed("confirm"):
		select_option()
		
func select_option():
	$SelectEffectPlayer.play()
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
