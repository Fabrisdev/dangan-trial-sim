extends Node2D

signal choice_made(choice: String)
var selected: int = -1
var selected_node: TextureRect
var amount_of_choices = 4
var is_currently_choosing = false
@export var default_position = -650
@export var unselected_position = -683
var input_allowed = false
	
func _ready() -> void:
	hide_all()

func _process(_delta: float) -> void:
	if not input_allowed: return
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
	if Input.is_action_just_pressed("confirm") and selected_node:
		select_option()
	
func choose(replies: Array[String]) -> void:
	input_allowed = true
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
	var tween = create_tween()
	tween.parallel().tween_property(choice_node, "position:x", -683, 0.2).from(-650)
	tween.parallel().tween_property(choice_node, "modulate:a", 1, 0.2).from(0)
	choice_node.get_child(0).text = reply

func hide_all():
	$Option1.visible = false
	$Option2.visible = false
	$Option3.visible = false
	$Option4.visible = false
	
func select_option():
	$SelectEffectPlayer.play()
	selected_node.visible = false
	await get_tree().create_timer(0.05).timeout
	selected_node.visible = true
	await get_tree().create_timer(0.05).timeout
	selected_node.visible = false
	await get_tree().create_timer(0.05).timeout
	selected_node.visible = true
	is_currently_choosing = false
	var choice_selected = selected_node.get_child(0).text
	print('Option chosen: ', choice_selected)
	choice_made.emit(choice_selected)
	hide_all()
	input_allowed = false

func hover_option():
	if selected == -1: return
	if(selected_node): deselect(selected_node)
	selected_node = get_node("Option" + str(selected))
	select(selected_node)
		
func select(node: TextureRect):
	node.texture.atlas.region.position.x = 13
	var tween = create_tween()
	tween.tween_property(node, 'position:x', -793, 0.1)
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
