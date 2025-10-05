extends Node3D

@export_file("*.trial")
var trial_file: String

var actions_node: Node = preload("uid://b7m08ec1cjdya").new()
var is_sleeping := false
var can_skip := true

func _ready() -> void:
	add_child(actions_node)
	var contents := read_trial_manager_file()
	var lines := contents.split("\n")
	start_manager(lines)
	
func start_manager(lines: Array[String]) -> void:
	for line in lines:
		if line.strip_edges() == '': continue
		if line.begins_with("#"): continue
		while is_sleeping:
			await get_tree().process_frame	
		execute_line(line)
		
func execute_line(line: String) -> void:
	var actor_and_action := extract_actor_and_action(line)
	var actor = actor_and_action.actor
	var action = actor_and_action.action
	execute_action(actor, action)

func execute_action(actor: String, action: Dictionary) -> void:
	var actions := {}
	for method in actions_node.get_method_list():
		var method_name = method['name']
		actions[method_name] = Callable(actions_node, method_name)
	actions[action.name].call(actor, action.args)
	print("Executing: ", action.name, " with args: ", action.args)

func extract_actor_and_action(line: String) -> Dictionary:
	var parts := line.split(':', false, 1)
	var actor := parts[0].strip_edges()
	var action := parts[1].strip_edges().split(' ')
	var action_name := action[0]
	var action_args := action.slice(1,action.size())
	return {
		"actor": actor,
		"action": {
			"name": action_name,
			"args": action_args
		}
	}
	
func read_trial_manager_file() -> String:
	if trial_file.is_empty():
		push_error("No trial file provided. Please add one to the Main scene.")
		return ""
	var file := FileAccess.open(trial_file, FileAccess.READ)
	var content := file.get_as_text()
	return content


func _on_asleep_timer_timeout() -> void:
	is_sleeping = false
	can_skip = true
	pass

# Sets asleep line execution for any amount of time. Set to -1 to make it forever (till click)
func set_asleep(seconds: float):
	is_sleeping = true
	if seconds != -1:
		can_skip = false
		%AsleepTimer.start(seconds)

func _process(_delta: float) -> void:
	if Input.is_action_just_pressed("click") and can_skip:
		is_sleeping = false

func set_can_skip(_can_skip: bool) -> void:
	can_skip = _can_skip
